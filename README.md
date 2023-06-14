# E-commerce-AdminPanel

# FullSatckAdminPage-Backend

## Description

This project was built to help you start E-commerce FullSatckAdminPage-Backend  with a boilerplate which is fully ready for most of the basic back end tasks such as authorization, authentication, email confirmation and CRUD

## Technology used
* Express.js
* PostgresSQL
* Sequelize, Sequelize-cli
* Nodemailer
* Bcrypt
* Joi
* Dotenv
* Cors
* Jsonwebtoken

## Features

* User registration and login
* Authentication via JWT
* Email confirmation
* CRUD for users, proructs, categories
* PostgreSQL database
* Seeding

### Installing

```
git clone https://github.com/vilena81/FullSatckAdminPage-Backend.git
cd .. e-commerce
npm install
```

## Getting Started

* Download database from `https://www.postgresql.org` and choose a username and password for it. 
* To create database execute npx `sequelize-cli db:create`
* To migrate 
``` Execute npx sequelize-cli```
* Add your username and password to the config.json file
* Make a temporary gmail account for testing purposes
* Enable 2 factor authentication and click on app passwords 
* Add your email and password for the app in the .env file
* Example
EMAIL_SENDER='yourchosenemail@gmail.com'
EMAIL_PASSWORD='password
* Create a random string as JWT secret from ```https://codebeautify.org/generate-random-string```
* Copy it and place in in your .env file
* Example
TOKEN_SECRET="yourrandomlygeneratedsecret"
* Start the application
```
nodemon server.js
```
* Register via http://localhost:8000/register with username, email, and password in the body as JSON format via Postman or any alternatives
* If successful, you should get a verification email
* Email link should look like this - `Click http://localhost:8000/verified?token=${token}`
* Opening the link will change your username confirmed field to true and show confirmed message in the response
* Login via http://localhost:8000/login with the same email and password
* Your response should have a JSON token
* Place it inside the Headers-Authorization 
* Make a request to http://localhost:8000/users
* If you get 200 OK and {"users": []} as a result, everything was successul
* From there you can edit the app based on your needs
* If you want to seed your post database with some random information, run node seed.js in the seeds folder, click "y" to delete all previous recrods or anything else to just add data without deleting anything

