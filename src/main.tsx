import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "@components/PageLayout.tsx";
import LoginPage from "@views/LoginPage.tsx";
import Loading from "@components/Loading.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "@themes/theme.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      // {
      //   index: true,
      //   element: <LandingPage />,
      // },
      // {
      //   path: "/transfer/send",
      //   element: (
      //     <ProtectedRoute>
      //       <SendMoney />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/transfer/history",
      //   element: (
      //     <ProtectedRoute>
      //       <TransferHistory />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/refer",
      //   element: (
      //     <ProtectedRoute>
      //       <ReferFriends />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <ThemeProvider theme={appTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>
);
