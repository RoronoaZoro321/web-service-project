const express = require('express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const http = require('http'); // Use https if the SOAP service uses HTTPS

const app = express();
app.use(bodyParser.json());

// Endpoint to handle REST requests
app.post('/rest-to-soap', async (req, res) => {
  try {
    const restData = req.body;
    
    // Convert REST data to SOAP XML
    const soapRequest = buildSoapRequest(restData);

    // Send SOAP request to transaction-service
    const soapResponse = await sendSoapRequest(soapRequest);

    // Parse SOAP response
    const jsonResponse = await parseSoapResponse(soapResponse);

    // Send JSON response back to REST client
    res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to build SOAP request from REST data
function buildSoapRequest(restData) {
  const builder = new xml2js.Builder({ headless: true });
  const xml = builder.buildObject({
    'soapenv:Envelope': {
      $: {
        'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
        'xmlns:tran': 'http://www.example.com/transaction-service',
      },
      'soapenv:Header': {},
      'soapenv:Body': {
        'tran:TransactionRequest': {
          'tran:SenderId': restData.senderId,
          'tran:ReceiverId': restData.receiverId,
          'tran:Amount': restData.amount,
        },
      },
    },
  });
  return xml;
}

// Function to send SOAP request
function sendSoapRequest(soapRequest) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1', // Replace 'localhost' with actual hostname or IP
      port: 3003, // Replace with actual port if different
      path: '/api/v1/transaction/transactions', // Replace with actual path
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(soapRequest),
      },
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(soapRequest);
    req.end();
  });
}

// Function to parse SOAP response to JSON
function parseSoapResponse(soapResponse) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(soapResponse, { explicitArray: false }, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result['soapenv:Envelope']['soapenv:Body']);
    });
  });
}

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
