# TaskFlow - A To-Do List for Your Office

TaskFlow is a note system with a live chat feature designed for tech companies. It allows team leaders to sign up their team members, assign notes, and manage users. Users can log in, view notes, and participate in the chat.

## Getting Started

You can access TaskFlow directly at [https://taskflow.onrender.com/](https://taskflow.onrender.com/). 

For a local setup, you will need to clone both the backend and frontend repositories:

Backend: [https://github.com/DavidZvonaruv5/WebProject](https://github.com/DavidZvonaruv5/WebProject)

Frontend: [https://github.com/DavidZvonaruv5/WebProjectFrontEnd](https://github.com/DavidZvonaruv5/WebProjectFrontEnd)

After cloning, open each repository in a separate instance of VSCode. Download the provided .env file and place it in the main directory of the backend project. 

install the dependencies: `npm install`    

To start the application, run `npm start` in both repositories.

## Usage

To use TaskFlow, you need to log in to an account. Only an admin can sign you up. This is designed to be a system for tech companies where the team leader signs up each of his team members. 

For example, to log in as an employee, the username is "Dor" and the password is "123456". 

Once logged in, you can view notes, assign notes, and type in the chat. If you're an admin, you can also remove users and view everyone's notes.

## Built With

TaskFlow is a MERN stack project. It uses MongoDB, Express.js, React, and Node.js. The live chat feature is implemented using a real-time database in Firebase.

### Other technologies

We have also implemented a logs system, where each request to the Database will be logged, Errors and execeptions will be logged in a seperate file. We implemented these logs via the file system in JS.

We have defined cors options for our backend, limiting the sites that get make requests to our site, we have also defined allowedOrigins which only these urls will be able to make requests to the site.

We made use of a routes system so that the routes will be displayed and mean something in our project.

In our Database, using MongoDB we save 2 schemas, a user scheme and a note schema.

3 controllers are used to control various HTTP requests in our server, interact with cookies and make requests to the database.

The .env file contains all of information for the database access, access tokens and refresh tokens we use.




## Authors

* **David Zvonaruv**
* **Gal Farfel**
