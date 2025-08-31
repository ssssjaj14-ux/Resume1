import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, X, Brain, Sparkles } from 'lucide-react';
import { ResumeData } from '../utils/pdfGenerator';
import toast from 'react-hot-toast';

interface ResumeImporterProps {
  onDataImported: (data: ResumeData) => void;
  onClose: () => void;
}

const ResumeImporter: React.FC<ResumeImporterProps> = ({ onDataImported, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [extractedData, setExtractedData] = useState<ResumeData | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [processingStep, setProcessingStep] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragleave' || e.type === 'dragover') {
      setDragActive(e.type !== 'dragleave');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    console.log('Processing file:', file.name, 'Type:', file.type, 'Size:', file.size);
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain'];
    const allowedExtensions = ['.pdf', '.txt'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      toast.error('Please upload a PDF or TXT file');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }
    
    setUploading(true);
    setProcessingStep('Reading file...');
    
    try {
      let text = '';
      const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      
      if (isPDF) {
        // Use client-side PDF parsing for Vercel compatibility
        const arrayBuffer = await file.arrayBuffer();
        text = await extractTextFromPDF(arrayBuffer);
      } else {
        // Handle text files
        text = await file.text();
      }
      
      setExtractedText(text);
      setProcessingStep('Analyzing content...');
      
      const parsedData = await parseResumeText(text);
      setExtractedData(parsedData);
      toast.success('Resume data extracted successfully!');
      
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Failed to process file. Please try again.');
    } finally {
      setUploading(false);
      setProcessingStep('');
    }
  };

  // Client-side PDF text extraction for Vercel compatibility
  const extractTextFromPDF = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    try {
      // Simple PDF text extraction using basic parsing
      const uint8Array = new Uint8Array(arrayBuffer);
      const text = new TextDecoder().decode(uint8Array);
      
      // Extract readable text from PDF content
      const textMatches = text.match(/\(([^)]+)\)/g);
      if (textMatches) {
        return textMatches
          .map(match => match.slice(1, -1))
          .filter(text => text.length > 2 && /[a-zA-Z]/.test(text))
          .join(' ');
      }
      
      // Fallback: try to extract any readable text
      const readableText = text.replace(/[^\x20-\x7E\n]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      if (readableText.length > 50) {
        return readableText;
      }
      
      throw new Error('No readable text found in PDF');
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF. Please try a text file instead.');
    }
  };

  const parseResumeText = async (text: string): Promise<ResumeData> => {
    const resumeData: ResumeData = {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        linkedin: '',
        github: ''
      },
      experience: [],
      education: [],
      skills: [],
      projects: []
    };

    // Extract email with improved patterns
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const emailMatch = text.match(emailPattern);
    if (emailMatch) {
      resumeData.personalInfo.email = emailMatch[0];
    }

    // Extract phone with improved patterns
    const phonePatterns = [
      /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,
      /\+\d{1,3}\s?\d{3}\s?\d{3}\s?\d{4}/,
      /\d{10}/
    ];
    
    for (const pattern of phonePatterns) {
      const phoneMatch = text.match(pattern);
      if (phoneMatch && !phoneMatch[0].includes('2023') && !phoneMatch[0].includes('2024')) {
        resumeData.personalInfo.phone = phoneMatch[0];
        break;
      }
    }

    // Extract name from first meaningful line
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    for (let i = 0; i < Math.min(10, lines.length); i++) {
      const line = lines[i];
      if (line.length > 3 && line.length < 50 && 
          !line.includes('@') && 
          !line.match(/\d{3}/) &&
          line.match(/^[A-Za-z\s\-]+$/) && 
          line.split(' ').length >= 2) {
        resumeData.personalInfo.name = line;
        break;
      }
    }

    // Extract LinkedIn
    const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
    if (linkedinMatch) {
      resumeData.personalInfo.linkedin = `https://${linkedinMatch[0]}`;
    }

    // Extract GitHub
    const githubMatch = text.match(/github\.com\/[\w-]+/i);
    if (githubMatch) {
      resumeData.personalInfo.github = `https://${githubMatch[0]}`;
    }

    // Extract summary/objective
    const summaryKeywords = ['summary', 'objective', 'profile', 'about'];
    for (const keyword of summaryKeywords) {
      const regex = new RegExp(`${keyword}[:\\s]*([^\\n]{50,300})`, 'i');
      const match = text.match(regex);
      if (match) {
        resumeData.personalInfo.summary = match[1].trim();
        break;
      }
    }

    // Extract skills
    const commonSkills = [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Angular', 'Vue.js',
      'HTML', 'CSS', 'TypeScript', 'MongoDB', 'MySQL', 'PostgreSQL',
      'AWS', 'Docker', 'Kubernetes', 'Git', 'Linux', 'Windows',
      'Project Management', 'Leadership', 'Communication', 'Problem Solving'
    ];
    
    const foundSkills = commonSkills.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    );
    resumeData.skills = [...new Set(foundSkills)];

    // Extract experience
    const experiencePattern = /([A-Za-z\s&,.-]+)\s*[-–—]\s*([A-Za-z\s&,.-]+)\s*[-–—]\s*([A-Za-z\s\d\-–—]+)/gi;
    let match;
    while ((match = experiencePattern.exec(text)) !== null && resumeData.experience.length < 5) {
      const title = match[1].trim();
      const company = match[2].trim();
      const duration = match[3].trim();
      
      if (title.length > 3 && title.length < 100 && 
          company.length > 2 && company.length < 100) {
        resumeData.experience.push({
          title,
          company,
          duration,
          description: 'Experience details extracted from resume.'
        });
      }
    }

    // Extract education
    const degreePattern = /(bachelor|master|phd|b\.?s\.?|m\.?s\.?|b\.?a\.?|m\.?a\.?)[^\\n]*([^\\n]*university|college|institute)[^\\n]*(\d{4})/gi;
    let eduMatch;
    while ((eduMatch = degreePattern.exec(text)) !== null && resumeData.education.length < 3) {
      resumeData.education.push({
        degree: eduMatch[1].trim(),
        institution: eduMatch[2].trim(),
        year: eduMatch[3],
        gpa: ''
      });
    }

    return resumeData;
  };

  const handleStartFresh = () => {
    const templateData: ResumeData = {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        linkedin: '',
        github: ''
      },
      experience: [{
        title: '',
        company: '',
        duration: '',
        description: ''
      }],
      education: [{
        degree: '',
        institution: '',
        year: '',
        gpa: ''
      }],
      skills: [],
      projects: []
    };
    
    onDataImported(templateData);
    toast.success('Ready to build your resume!');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <span>Import Resume</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Upload your existing resume to get started quickly
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!extractedData ? (
            <>
              {/* Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading}
                />
                
                <div className="flex flex-col items-center justify-center space-y-4">
                  <motion.div
                    animate={{ y: uploading ? [0, -10, 0] : [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    {uploading && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </motion.div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      {uploading ? 'Processing your resume...' : 'Drop your resume here'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {uploading ? processingStep : 'or click to browse files'}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Supports PDF and TXT files up to 10MB
                    </p>
                  </div>
                  
                  {uploading && (
                    <div className="flex items-center space-x-2 text-blue-600">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                      <span className="text-sm font-medium">AI is analyzing your resume...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Alternative Option */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Don't have a resume file?
                </h4>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartFresh}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
                >
                  <FileText className="w-5 h-5" />
                  <span>Start Building from Scratch</span>
                </motion.button>
              </div>
            </>
          ) : (
            /* Results Display */
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Data extracted successfully!</span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Extracted Information
                </h3>
                
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                    <span className="text-gray-900 dark:text-white">{extractedData.personalInfo.name || 'Not found'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                    <span className="text-gray-900 dark:text-white">{extractedData.personalInfo.email || 'Not found'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                    <span className="text-gray-900 dark:text-white">{extractedData.personalInfo.phone || 'Not found'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Skills:</span>
                    <span className="text-gray-900 dark:text-white">{extractedData.skills.length} found</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Experience:</span>
                    <span className="text-gray-900 dark:text-white">{extractedData.experience.length} entries</span>
                  </div>
                </div>

                {extractedData.skills.length > 0 && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-700 dark:text-gray-300 block mb-2">
                      Skills found:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {extractedData.skills.slice(0, 8).map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 px-2 py-1 rounded-md text-xs">
                          {skill}
                        </span>
                      ))}
                      {extractedData.skills.length > 8 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{extractedData.skills.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Review and edit the extracted data as needed. You can always modify it later.
                </p>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onDataImported(extractedData);
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                >
                  Use This Data
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExtractedData(null)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Try Again
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeImporter;