# Project Overview

## Description
This project is a web application designed to facilitate event management, with a focus on user authentication and interaction. The frontend is built using **React** and **TypeScript**, leveraging **Vite** as the build tool. **Material UI** has been employed for styling, ensuring a sleek and responsive user interface. Global state management is achieved through **Redux**, while **React Router DOM** handles navigation.

## Features
- **Authentication:** The application includes Login and Sign-up pages for user authentication.
- **Dashboard:** Upon successful authentication, users are directed to a dashboard that displays a list of events associated with them.
- **Event Association:** Users can be associated with events either by creating them or by receiving invitations.
- **Event Management:** The dashboard allows users to create new events, view event details, and perform operations like editing or deleting events they have created.

# Setup Instructions

To set up and run this project, follow these steps:

1. **Clone the Repository:**

git clone [repository_url]

2. **Navigate to the Project Directory:**

cd [project_directory]

3. **Install Dependencies:**

npm i

4. **Run the Project:**

npm run dev


5. **Environment Configuration:**

Create a `.env` file in the root directory of the project and add the following line:

VITE_API_URL=http://localhost:8000/api

