# TypeError Cannot read properties of undefined (reading 'replace')
->  try print console.log(process.env.DATABASE); 
if undefined then see if it point to the correct file or not
```
const DB = DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);
```


# MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms at Timeout.<anonymous>
-> db password changed or ip address changed, so need to update the ip address in the mongodb atlas
