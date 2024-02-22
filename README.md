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

    `git clone [repository_url]`

2. **Navigate to the Project Directory:**

    `cd [project_directory]`

3. **Install Dependencies:**

    `npm i`

4. **Run the Project:**

    `npm run dev`


5. **Environment Configuration:**

    Create a `.env` file in the root directory of the project and add the following line:

    `VITE_API_URL=http://localhost:8000/api`

# Future Improvements

While the current version of the project provides essential functionality, there are several areas that could be enhanced with more time and resources. Here are some potential improvements and features to consider for future releases:

1. **Error Handling and API Resilience:**
   Implement robust error handling mechanisms for API calls to ensure graceful handling of errors, informative user feedback, and increased application resilience.

2. **User Profiles:**
   Introduce user profiles to allow users to customize their experience and provide additional information.

3. **Real-time Updates:**
   Implement real-time updates for the dashboard, ensuring users receive immediate notifications about new events or changes.

4. **Enhanced Event Filtering:**
   Improve event filtering options on the dashboard, allowing users to sort and search for events more efficiently.

5. **Mobile Responsiveness:**
   Optimize the application for mobile devices to provide a seamless experience across a variety of screen sizes.

6. **Testing and Optimization:**
   Conduct comprehensive testing and optimization to ensure the application's performance, scalability, and reliability.

7. **Rich Text Event Descriptions:**
   Allow users to add rich text descriptions when creating events, providing more detailed information.

8. **Calendar Display:**
   Introduce a calendar view on the events page, enabling users to switch between list view and calendar view for a more visual representation of their scheduled events.

9. **Event Status and Cancellation:**
   Implement an event status key (e.g., active, completed, canceled) to provide users with more nuanced control over event management. Users can cancel events instead of only deleting them.

10. **Invitation Management:**
    Allow users to accept or decline event invitations, providing a more interactive and user-friendly approach to managing their event associations.



