# QR Code Email Sender

This project is a web application that allows users to upload a CSV file containing email addresses and serial numbers. The application generates a unique QR code for each entry, combines the serial number, email, and date, and sends an email with the QR code attached to each email address. The QR code is also embedded in the body of the email.

## Features

- Upload a CSV file with email addresses and serial numbers.
- Generate unique QR codes combining serial number, email, and date.
- Send an email with the QR code attached and embedded in the body to each email address in the CSV.
- User-friendly UI for file upload and process initiation.

## Technologies Used

- Node.js
- Express.js
- Nodemailer
- QRCode
- Multer
- csv-parser
- dotenv
- moment

## Prerequisites

- Node.js installed on your machine
- A Gmail account for sending emails
- Git installed on your machine

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/qr-code-email-sender.git
   cd qr-code-email-sender
   
2. Install the dependencies:
npm install

3.Create a .env file in the root directory and add your email credentials:
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

4.Start the server:
node app.js

5.Open your web browser and go to http://localhost:3000.

6.Upload a CSV file with the following format:
csv
email,serial
example1@example.com,121
example2@example.com,122

Click the "Go" button to start the process. The application will generate QR codes, send emails, and log the progress in the console.

Project Structure
app.js: Main server file that sets up the Express server, handles file uploads, generates QR codes, and sends emails.
index.html: HTML file providing the user interface for uploading the CSV file.
style.css: CSS file for styling the HTML elements.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

License
This project is licensed under the MIT License.
