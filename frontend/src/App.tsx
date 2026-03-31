import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";
import MainLayout from "@/components/layout/MainLayout";
import { ROUTES } from "@/constants/routes";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { ResetPassword } from "@/pages/auth/ResetPassword";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import { VerifyEmail } from "@/pages/auth/VerifyEmail";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Layout routes */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />

          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Public routes */}
        <Route
          path={ROUTES.SIGN_IN}
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route
          path={ROUTES.SIGN_UP}
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path={ROUTES.RESET_PASSWORD}
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
}
