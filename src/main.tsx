import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "@/components/router/PageLayout";
import LoginPage from "@views/LoginPage.tsx";
import EventsPage from "@/views/EventsPage";
import Loading from "@/components/router/Loading";
import ProtectedRoute from "@/components/router/ProtectedRoute";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "@themes/theme.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@redux/store";
import SignUpPage from "@/views/SignUpPage";
import CreateEventPage from "./views/CreateEventPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventDetailsPage from "./views/EventDetailsPage";
import EditEventPage from "./views/EditEventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/events",
        element: (
          <ProtectedRoute>
            <EventsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/events/create",
        element: (
          <ProtectedRoute>
            <CreateEventPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/events/:eventId",
        element: (
          <ProtectedRoute>
            <EventDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/events/:eventId/edit",
        element: (
          <ProtectedRoute>
            <EditEventPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Loading />}>
          <ThemeProvider theme={appTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <RouterProvider router={router} />
            </LocalizationProvider>
          </ThemeProvider>
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
