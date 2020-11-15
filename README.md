# SubtaskBackend
### Api made based on a Notepad using jwt authentication.
Technologies used:
- NodeJS
- MongoDB with connection to Atlas
- Nodemailer email service

### Observations
This project will only work if you have edited your MongoDB Atlas service username and password in the code.

**A ".env" file with the global variable "MONGO_URL" must be created and a connection url with the database added.**

This url can be found by creating a cluster at https://www.mongodb.com/cloud/atlas

### Scripts
**In the project directory, you can run:**

- yarn dev (using nodemon command)
  Open http://localhost:3333 to view it in the browser.
  
- yarn start (using node command)
  Open http://localhost:3333 to view it in the browser.
