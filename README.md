# README

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for?

To showcase an example database setup in Express, NodeJS, TypeScript and using mongo as db

### How do I get set up?

- Check if Node is installed running: node -v otherwise install it https://nodejs.org/en/
- Check if you have mongo installed on your machine and run it using: "mongo"
- Create a folder to download the project using terminal: "mkDir node-mongo-users"
- Change directory to the recently created folder using terminal: "cd node-mongo-users"
- Clone the project using terminal: "git clone <project-directory>"
- Run "npm i" in Visual Studio Code's terminal
- To start the project run "npm run start"

```
PROJECT SHOULD BE RUNNING IN http://localhost:9001/api
```

### Users endpoints

GET

```
http://localhost:9001/api/user
```

GET BY ID

```
http://localhost:9001/api/user/:id
```

POST

```
http://localhost:9001/api/user
```

PUT - UPDATE USER

```
http://localhost:9001/api/user/:id
```

DELETE

```
http://localhost:9001/api/user/:id
```

#### Example post for a user

Can copy paste the following example as raw in postman:

```
{
    "name": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "gender": 1,
    "phoneNumber": "+521234444",
    "status": 1,
    "address": {
        "city": "Santo Domingo",
        "country": "Dominican Republic",
        "street": "Av. 27 de Febrero"
    }
}
```

### Who do I talk to?

Repo owner or admin
