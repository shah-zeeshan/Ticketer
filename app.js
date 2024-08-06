require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');
const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files (CSS)
app.use(express.static(path.join(__dirname)));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Debugging statements
console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS ? 'Loaded' : 'Not Loaded');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendQrCodeEmail(email, qrCodePath) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Attendance QR Code',
    html: `
      <p>Please scan this QR code to mark your attendance:</p>
      <img src="cid:qrCode" alt="QR Code" />
    `,
    attachments: [
      {
        filename: path.basename(qrCodePath),
        path: qrCodePath,
        cid: 'qrCode' // same cid value as in the html img src
      }
    ]
  };

  await transporter.sendMail(mailOptions);
}

app.post('/upload-csv', upload.single('csv-file'), (req, res) => {
  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      console.log('Reading email:', data.email);  // Debugging statement
      results.push(data);
    })
    .on('end', async () => {
      const date = moment().format('DDMMYYYY');
      for (let i = 0; i < results.length; i++) {
        const email = results[i].email;
        const serialNumber = i + 1;
        const qrData = `${serialNumber}_${email}_${date}`;
        const qrCodePath = `./qrcodes/${email}.png`;

        try {
          await QRCode.toFile(qrCodePath, qrData);
          await sendQrCodeEmail(email, qrCodePath);
        } catch (error) {
          console.error(`Failed to send QR code to ${email}:`, error);
        }
      }
      res.send('QR codes sent successfully!');
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
