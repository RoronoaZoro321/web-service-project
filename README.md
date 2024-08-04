# web-service-project


User Document:

json
Copy code
{
  "_id": ObjectId("60d5f488f1b2c4e3d1f1f1f1"),
  "username": "john_doe",
  "email": "john@example.com",
  "pin": "hashed_password",
  "createdAt": ISODate("2023-01-01T00:00:00Z"),
  "updatedAt": ISODate("2023-01-01T00:00:00Z"),
  "accountIds": [ObjectId("60d5f488f1b2c4e3d1f1f1f2"), ObjectId("60d5f488f1b2c4e3d1f1f1f3")]
}

Account Document:

json
Copy code
{
  "_id": ObjectId("60d5f488f1b2c4e3d1f1f1f2"),
  "userId": ObjectId("60d5f488f1b2c4e3d1f1f1f1"),
  "accountType": "savings",
  "balance": 1000.00,
  "createdAt": ISODate("2023-01-01T00:00:00Z"),
  "updatedAt": ISODate("2023-01-01T00:00:00Z"),
  "transactionIds": [ObjectId("60d5f488f1b2c4e3d1f1f1f4"), ObjectId("60d5f488f1b2c4e3d1f1f1f5")]
}
Transaction Document:

json
Copy code
{
  "_id": ObjectId("60d5f488f1b2c4e3d1f1f1f4"),
  "accountId": ObjectId("60d5f488f1b2c4e3d1f1f1f2"),
  "amount": 200.00,
  "transactionType": "debit",
  "description": "Grocery shopping",
  "transactionDate": ISODate("2023-01-01T10:00:00Z"),
  "createdAt": ISODate("2023-01-01T10:00:00Z"),
  "updatedAt": ISODate("2023-01-01T10:00:00Z")
}
Log Document:

json
Copy code
{
  "_id": ObjectId("60d5f488f1b2c4e3d1f1f1f6"),
  "userId": ObjectId("60d5f488f1b2c4e3d1f1f1f1"),
  "action": "login",
  "timestamp": ISODate("2023-01-01T08:00:00Z"),
  "details": "User logged in from IP 192.168.1.1"
}
