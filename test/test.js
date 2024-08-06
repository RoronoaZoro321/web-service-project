const {
    hashSensitiveData,
    verifyHashedData,
    authenticateRequest,
    validateTransactionAmount,
    validateTransactionAddress,
    processTransaction,
  } = require('./app');
  
  const jwt = require('jsonwebtoken');
  
  describe('Payment Management Unit Tests', () => {
    test('Hash sensitive data', async () => {
      const data = 'userPIN1234';
      const hashedData = await hashSensitiveData(data);
      expect(hashedData).not.toBe(data);
    });
  
    test('Verify hashed data - valid data', async () => {
      const data = 'userPIN1234';
      const hashedData = await hashSensitiveData(data);
      const isMatch = await verifyHashedData(data, hashedData);
      expect(isMatch).toBe(true);
    });
  
    test('Verify hashed data - invalid data', async () => {
      const data = 'userPIN1234';
      const hashedData = await hashSensitiveData(data);
      const isMatch = await verifyHashedData('wrongPIN', hashedData);
      expect(isMatch).toBe(false);
    });
  
    test('Authenticate requests with valid token', () => {
      const token = jwt.sign({ userId: 1 }, 'secretKey');
      const decoded = authenticateRequest(token);
      expect(decoded).toHaveProperty('userId', 1);
    });
  
    test('Authenticate requests with invalid token', () => {
      const token = 'invalidToken';
      const decoded = authenticateRequest(token);
      expect(decoded).toBeNull();
    });
  
    test('Validate transaction amount - valid amount', () => {
      const amount = 50;
      const balance = 100;
      expect(() => validateTransactionAmount(amount, balance)).not.toThrow();
    });
  
    test('Validate transaction amount - invalid amount', () => {
      const amount = 150;
      const balance = 100;
      expect(() => validateTransactionAmount(amount, balance)).toThrow('Invalid transaction amount');
    });
  
    test('Validate transaction address - valid address', () => {
      const address = '0xAbC1234567890dEF1234567890abcdef12345678';
      expect(() => validateTransactionAddress(address)).not.toThrow();
    });
  
    test('Validate transaction address - invalid address', () => {
      const address = 'invalidAddress';
      expect(() => validateTransactionAddress(address)).toThrow('Invalid transaction address');
    });
  
    test('Process transaction - successful', () => {
      const fromAccount = { balance: 100 };
      const toAccount = { balance: 50, address: '0xAbC1234567890dEF1234567890abcdef12345678' };
      const amount = 50;
  
      const result = processTransaction(fromAccount, toAccount, amount);
  
      expect(result.fromAccount.balance).toBe(50);
      expect(result.toAccount.balance).toBe(100);
    });
  
    test('Process transaction - invalid amount', () => {
      const fromAccount = { balance: 100 };
      const toAccount = { balance: 50, address: '0xAbC1234567890dEF1234567890abcdef12345678' };
      const amount = 150;
  
      expect(() => processTransaction(fromAccount, toAccount, amount)).toThrow('Invalid transaction amount');
    });
  
    test('Process transaction - invalid address', () => {
      const fromAccount = { balance: 100 };
      const toAccount = { balance: 50, address: 'invalidAddress' };
      const amount = 50;
  
      expect(() => processTransaction(fromAccount, toAccount, amount)).toThrow('Invalid transaction address');
    });
  });
  