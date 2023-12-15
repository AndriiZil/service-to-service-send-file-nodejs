'use strict';

const axios = require('axios');
const fs = require('node:fs');
const path = require('node:path');
const FormData = require('form-data');

const pdfFilePath = path.join(__dirname, 'example.txt'); // Replace with the path to your PDF file
const receiverUrl = 'http://localhost:4000/upload'; // Replace with the URL of the receiver application's upload endpoint

async function sendPdfFile() {
  try {
    const pdfFileStream = fs.createReadStream(pdfFilePath);

    const formData = new FormData();
    formData.append('pdf', pdfFileStream);

    console.log(formData);

    const response = await axios.post(receiverUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    console.log('PDF file sent successfully');
  } catch (error) {
    console.error('Error sending PDF file:', error);
  }
}

sendPdfFile();
