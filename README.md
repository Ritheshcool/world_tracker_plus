World Travel Tracker PLUS
Based on my previous work on the world tracking project, i have added some amazing personalized features which keeps tracks of the countries chosen by the user, more like a personalized netflix account of your name.
A Node.js application that helps keep track of countries visited by different users. Users can add themselves, select their preferred color, and input the countries they've visited.

Table of Contents
1. Introduction

2. Features

3. Installation

4. Usage

5. Contributing

6. License

Introduction:
Travel Tracker is an application built using Node.js, Express, and PostgreSQL. It allows users to add themselves to a list and track the countries they have visited. The app provides an interactive UI for users to input and visualize their travel data.

Features:
-> Add Users: Create a new user with a chosen name and color.

-> Track Countries: Add countries visited by each user.

-> Data Visualization: Displays a list of countries visited by the users.

-> Interactive UI: Easy-to-use interface for adding and managing travel data.

Installation:
Follow these steps to set up the Travel Tracker application on your local machine.

Prerequisites:

Node.js
PostgreSQL
Git

Setup
1. Clone the Repository:
   git clone https://github.com/your-username/travel-tracker.git
   cd travel-tracker
   
2. Install Dependencies:
   npm install
3. Set Up PostgreSQL Database:
       i) Create a PostgreSQL database named world.
      ii) Update the database configuration in the db object in your index.js file with your database credentials.
   const db = new pg.Client({
   user: "postgres",
   host: "localhost",
   database: "world",
   password: "yourpassword",
   port: 5432,
   });
   db.connect();
   
4. Run the Application:
    npm start

Usage: 
1. Open your browser and go to http://localhost:3000.
2. Add a new user by clicking on "Add Family Member".
3. Enter the user's name and select a color.
4. Add the countries visited by the user by entering the country names.

Contributing:
Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

1. Fork it (https://github.com/your-username/travel-tracker)
2. Create your feature branch (git checkout -b feature/your-feature-name)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin feature/your-feature-name)
5. Create a new Pull Request
   
License:
This project is licensed under the MIT License - see the LICENSE file for details.

This README.md file covers the essential information about your Travel Tracker application. Feel free to customize and expand it as needed!


   
