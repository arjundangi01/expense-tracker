# Expense Tracker Assignment Description

## Live Link - https://spectacular-youtiao-8b37f7.netlify.app/


# Approach
### Front End Approach:

I developed the front end of the expense tracker using React and Tailwind CSS to create a seamless user experience. The application begins with a secure login and signup page. Without authentication, users cannot access the dashboard, ensuring data privacy.

Upon successful login, users are redirected to the home page where they can view the total expenses and monthly budget limit. The home page features three tabs:

1. Table: Users can view their monthly expenses in a tabular format by selecting the desired month and year.
2. Add: This tab allows users to input new expenses and set a budget limit for the selected month.
3. Dashboard: A visually intuitive representation of monthly expenses using a pie chart, powered by the Chart.js library.

### Back End Approach:

For user authentication, I employed JSON Web Tokens (JWT) to securely manage user sessions. The application is built using Node.js, Express, and MongoDB for robust back-end functionality. The backend architecture includes separate routes for user and expense management.

User routes handle login and signup, utilizing the bcrypt package to securely hash passwords. JWT is then used to verify tokens for authenticated access.

Expense routes provide APIs for adding and deleting expenses, as well as setting budget limits. MongoDB stores the data efficiently. Upon user login, expenses are fetched based on the user ID obtained from the token. Further, data is tailored based on the selected month in the front end.

## Features -
1. Login and Sginup
2. Add Expenses based on category
3. Filter Expenses based on category and month
4. View Monthly Expenses Total Amount
5. Add Monthly Budget Limit ( but user can add expenses more than limit )
6. View Expense in Pie Chart

## Tech Used 
 ### Frontend - 
 React JS, Tailwind CSS, Javascript, Chart Js
 ### Backend - 
 Node, Express, MongoDB, Javascript

# How to Start
### Frontend 
1. run command - ' npm i ' to install dependencies
2. run command -  npm start  to start project locally
3. ENV Setup - you need to write REACT_APP_BASE_URL in env file <br/>
Base URL can be 1. LOCAL = http://localhost:8080 2. DEPLOYED Backend URL =https://easy-rose-cheetah-hat.cyclic.app <br/>
NOTE* - make sure there is no '/' at the end of url.

### Backend
1. run command - ' npm i ' to install dependencies
2. run command -  npm run dev to start project locally
3. ENV Setup - ENV varibles in env file are <br/>
PORT=8080 and MONGO_URI= mongodb+srv://userName*:password*@cluster0.k4captk.mongodb.net  <br/>
NOTE* - make sure there is no '/' at the end of url.

