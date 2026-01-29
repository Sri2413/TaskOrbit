TaskOrbit

TaskOrbit is a modern task management and reminder application built with React for the frontend and Node.js + Express + MongoDB for the backend. It allows users to create tasks, set future reminders, and optionally receive email/SMS notifications. The app ensures that tasks can only be scheduled for the future, preventing accidental past reminders.

Available Scripts

In the project directory, you can run:

npm start (Frontend)

Runs the React app in development mode.
Open http://localhost:3000
 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.


npm run backend (Backend)

Runs the Node.js backend server in development mode.
Make sure you have a .env file in the backend folder with the following variables:

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone

Start the backend:

node server.js


The server runs by default on http://localhost:5000
.

npm run build (Frontend)

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed.

Features

Add, update, and delete tasks

Only allows future reminders

Optional email & SMS notifications

JWT-based authentication

Modern and responsive UI


TaskOrbit/
├─ backend/
│  ├─ models/
│  │  └─ Tasks.js
│  ├─ routes/
│  │  ├─ authRoutes.js
│  │  └─ taskRoutes.js
│  ├─ middleware/
│  │  └─ authMiddleware.js
│  ├─ utils/
│  │  ├─ emailServices.js
│  │  └─ smsService.js
│  ├─ jobs/
│  │  └─ remainderJob.js
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ Pages/
│  │  │  └─ AddTask.js
│  │  ├─ Components/
│  │  ├─ App.js
│  │  └─ index.js
│  └─ package.json
├─ .gitignore
└─ README.md


Learn More

You can learn more about React in the React documentation
.
To learn Node.js, check the Node.js docs
.
For MongoDB, visit the MongoDB documentation
.

Deployment

You can deploy the frontend using services like Netlify, Vercel, or GitHub Pages, and the backend using Heroku, Railway, or any cloud server.

License

This project is licensed under the MIT License – see the LICENSE
 file for details.

Made with ❤️ by Srikanth

LinkedIn: https://www.linkedin.com/in/srikanth-b-8654a8237/

GitHub: https://github.com/Sri2413
