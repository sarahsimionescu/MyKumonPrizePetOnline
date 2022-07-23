# MyKumonPrizePetOnline
A full MERN web app I created to encourage students at my local kumon center to complete their homework! This is the updated version of last year's Java program.

Two options:
1. Use serverless version hosted by MongoDB (with-mongodb-serverless) locked by a secret that is returned when the admin (kumon instructor) provides a password
2. Use local node.js server (with-node.js-backend) that connects to the MongoDB database through a secure username and password

## The Story
Last summer, I was a Math and English instructor at my local Kumon center. A student of mine who struggled to find motivation to complete her work inspired me to developed a program in my free time using Java called "The Grantham Plaza Kumon Prize Pet," where students would adopt a virtual pet, log their completed homework and receive prizes! The center continued to use my program even when I moved on to university. This summer I returned with newly developed skills to create a full MERN-stack applicaiton of my old game. Once again, I worked closely with instructors to develop exactly what they were looking for in a web-app!
## Screenshots
(more avaiiable in 'screenshots' folder)
![Alt text](screenshots/main-screenshot.png?raw=true )
![Alt text](screenshots/student-screnshot.png?raw=true )
![Alt text](screenshots/congrats-screenshot.png?raw=true )
## How to Use
### Set-up Front-end
1. Install Node.js https://nodejs.org/en/download/
2. In your terminal write...
    ```
    npx create-react-app my-kumon-prize-pet
    cd my-kumon-prize-pet
    ```
3. Select which backend method you would like to use, go into its respective folder and replace the public and src folders in your app with the ones in this repository
4. To start the front end server... 
    ```
    npm start
    ```
5. Open http://localhost:3000 in your browser (at this point, things will not work properly until you have set-up your backend server)
### Set-up Back-end
1. Create a Mongodb Atlas database
2. Add a user and a corresponding username and password to access your MongoDB Atlas database
Select one of the following options to connect to this database...
#### With MongoDB Serverless
1. Go to MongoDB 'App Services' and create a new project
2. Go to HTTPS Endpoints and create the following endpoints with the corresponding functions included in the 'mongodb-https-endpoint-functions' folder, and **secure functions accessing the database with a secret**

| HTTP Method | Endpoint Route | Linked Function (in mongodb-https-endpoint-functions) | Secure function with the secret? |
|---|---|---|---|
| GET | /students/authenticate | authenticate.js | No (this function is used to provide the secret to authenticated users) |
| GET | /students/get | get.js | Yes |
| GET | /students/getUsernames | getUsernames.js | Yes |
| POST | /students/add | add.js | Yes |
| POST | /students/update | update.js | Yes |

3. Make sure to enter the necessary information required in the .env and https endpoint functions to connect to your mongodb ATLAS database

#### With Node.js Backend
1. Create the 'backend' folder in your React app
2. In your terminal write...
    ```
    cd backend
    npm install express cors mongoose dotenv
    npm install -g nodemon
    ```
3. Add all of the files from the 'backend' in folder in this respository into your 'backend' folder
4. Make sure to enter the necessary information required in the .env file to connect to your mongodb ATLAS database
5. To start the server, run...
    ```
    cd backend
    nodemon server.js
    ```

## Notes
*The cartoon cat and dog images are from GIPHY and all credit goes to the original artists.*
