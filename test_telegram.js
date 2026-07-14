const fetch = require('node-fetch');
const token = '8886885060:AAECUYufrMRMsa5gNLbrKEfSm1mixKMnJIc';
const chat_id = '-5002808223';
const message = 'Test message from server';

async function test() {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chat_id,
      text: message,
      parse_mode: 'HTML',
    }),
  });
  
  const data = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', data);
}
test();
