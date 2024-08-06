const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function hashSensitiveData(data) {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(data, saltRounds);
  return hashed;
}

async function verifyHashedData(data, hashed) {
  const match = await bcrypt.compare(data, hashed);
  return match;
}

function authenticateRequest(token) {
  try {
    const decoded = jwt.verify(token, 'secretKey');
    return decoded;
  } catch (error) {
    return null;
  }
}

function validateTransactionAmount(amount, balance) {
  if (amount <= 0 || amount > balance) {
    throw new Error('Invalid transaction amount');
  }
  return true;
}

function validateTransactionAddress(address) {
  const isValid = /^(0x)?[0-9a-f]{40}$/i.test(address);
  if (!isValid) {
    throw new Error('Invalid transaction address');
  }
  return true;
}

function processTransaction(fromAccount, toAccount, amount) {
  validateTransactionAmount(amount, fromAccount.balance);
  validateTransactionAddress(toAccount.address);

  fromAccount.balance -= amount;
  toAccount.balance += amount;

  return { fromAccount, toAccount };
}

module.exports = {
  hashSensitiveData,
  verifyHashedData,
  authenticateRequest,
  validateTransactionAmount,
  validateTransactionAddress,
  processTransaction,
};
