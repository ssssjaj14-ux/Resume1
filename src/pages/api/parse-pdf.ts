import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import { promises as fs } from 'fs';
import pdf from 'pdf-parse';

// Enable debug logging
const DEBUG = process.env.NODE_ENV !== 'production';

// Simple logger
const logger = {
  info: (...args: any[]) => DEBUG && console.log('[INFO]', ...args),
  error: (...args: any[]) => console.error('[ERROR]', ...args),
  debug: (...args: any[]) => DEBUG && console.log('[DEBUG]', ...args)
};

export const config = {
  api: {
    bodyParser: false, // Disable default body parser, using formidable
    responseLimit: '10mb', // Increase response size limit for large PDFs
  },
};

// Configure formidable
const form = formidable({
  maxFileSize: 10 * 1024 * 1024, // 10MB
  filter: ({ mimetype }) => {
    const allowedTypes = ['application/pdf', 'text/plain'];
    return !mimetype || allowedTypes.includes(mimetype);
  }
});

const parseForm = (req: NextApiRequest): Promise<{ fields: any; files: any }> => {
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        logger.error('Form parsing error:', err);
        return reject(err);
      }
      logger.debug('Form parsed successfully');
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  logger.info(`Received ${req.method} request to ${req.url}`);

  if (req.method !== 'POST') {
    logger.error(`Method ${req.method} not allowed`);
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed',
      allowedMethods: ['POST']
    });
  }

  try {
    logger.debug('Parsing form data...');
    const { files } = await parseForm(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      logger.error('No file found in request');
      return res.status(400).json({ 
        success: false,
        message: 'No file uploaded or invalid file type' 
      });
    }

    logger.debug(`Processing file: ${file.originalFilename} (${file.mimetype}, ${file.size} bytes)`);
    
    try {
      // Read the file content
      logger.debug('Reading file buffer...');
      const fileBuffer = await fs.readFile(file.filepath);
      
      // Parse PDF or text file
      logger.debug('Parsing file content...');
      let text: string;
      
      if (file.mimetype === 'application/pdf') {
        const pdfData = await pdf(fileBuffer);
        text = pdfData.text;
      } else {
        // Handle text files
        text = fileBuffer.toString('utf-8');
      }
      
      logger.debug(`Successfully extracted ${text.length} characters`);
      
      // Clean up the temporary file
      try {
        await fs.unlink(file.filepath);
        logger.debug('Temporary file cleaned up');
      } catch (cleanupError) {
        logger.error('Error cleaning up temp file:', cleanupError);
        // Don't fail the request if cleanup fails
      }

      // Return the extracted text
      return res.status(200).json({ 
        success: true,
        text: text,
        fileName: file.originalFilename,
        fileSize: file.size
      });
      
    } catch (parseError) {
      logger.error('Error processing file:', parseError);
      
      // Clean up the temporary file in case of error
      try {
        if (file?.filepath) {
          await fs.unlink(file.filepath).catch(e => 
            logger.error('Error during error cleanup:', e)
          );
        }
      } catch (cleanupError) {
        logger.error('Error during error cleanup:', cleanupError);
      }
      
      throw parseError;
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Error in API handler:', error);
    
    return res.status(500).json({ 
      success: false,
      message: 'Failed to process file',
      error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
    });
  }
}
