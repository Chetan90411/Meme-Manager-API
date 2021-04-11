<h1>Meme API</h1>

<p>An API which you can use in your project to create a Meme Page</p>


This is a full featured Meme Management REST API back-end built with Node.js and MongoDB. Features include:
<ul>
    <li>Pagination and filtering of server responses to avoid slow page load times.</li>
    <li>Full CRUD features for User and Meme instances.</li>
    <li>Hash encryption of passwords and access management with JWT tokens.</li>
    <li>Restricted user access to CRUD operations based on JWT tokens.</li>
    <li>Added Email Support when a user enters the database for the first time and when delete his account</li>
</ul>

>User Routes : 

| Methods | Endpoint          | Access | Description                      | 
|---------|-------------------|--------|----------------------------------|
|   POST  |  /users           | Public | Creating new user                |
|   POST  |  /users/login     | Private| Logging a user                   |
|   POST  |  /users/logout    | Private| Logging out user current session |
|   POST  |  /users/logoutAll | Private| Logging out user of all sessions |
|   GET   |  /users/me        | Private| Read user public information     |
|   DELETE|  /users/me        | Private| Deleting user profile            |
|   PATCH |  /users/me        | Private| Updating user profile            |
|   POST  |  /users/me/avatar | Private| Uploading profile Image          |
|   DELETE|  /users/me/avatar | Private| Deleting profile Image           |
|   GET   |  /users/:id/avatar | Private| Get  profile image               |


>Meme Routes: 

| Methods | Endpoint          | Access | Description                            | 
|---------|-------------------|--------|----------------------------------------|
|   POST  |  /memes           | Private| Creating a new meme                    |
|   GET   |  /memes           | Private| Get memes of the current user          |
|   GET   |  /memes/:id       | Private| Get a particular meme with given id    |
|   DELETE|  /memes/:id       | Private| Delete meme with id                    |
|   PATCH |  /memes/:id       | Private| Update meme with given id              |


<h6>How to Use the API</h6>
Step 1 :  Insert the following lines in dev.env file in the config folder, replacing all <content> with your own information:

```
PORT=<port number>
sendgrid_API_KEY=<api key>
secretKey=<a secret key for generating JSON Web Token(JWT)>
mongo_URL=<mongodb connection string>
```

Step 2 : Clone the project and run npm install
Step 3 : Run your mongodb server 
Step 4 : (npm run dev) in terminal 