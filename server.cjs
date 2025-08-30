const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const pdfParse = require('pdf-parse');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(fileUpload());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'PDF Parser Backend is running' });
});

app.post('/api/parse-pdf', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const pdfFile = req.files.file;
  try {
    const data = await pdfParse(pdfFile.data);
    res.json({ text: data.text });
  } catch (err) {
    console.error('PDF parsing error:', err);
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
});

app.listen(PORT, () => {
  console.log(`PDF parser backend running on port ${PORT}`);
}); 