import { Navigate, Route, Routes } from "react-router";
import DashboardPage from "./pages/Panel/DashboardPage";
import NotFound from "./pages/404";
import PanelLayout from "./components/Layout/PanelLayout";
import LoginLayout from "./components/Layout/LoginLayout";
import LoginPage from "./pages/Onboarding/LoginPage";
import ForgotPasswordPage from "./pages/Onboarding/ForgotPasswordPage";
import RegisterPage from "./pages/Onboarding/RegisterPage";
import OTPPage from "./pages/Onboarding/OTPPage";
import { ROUTES } from "./constants/routes";
import { ProtectedRoute, UnprotectedRoute } from "./context/Auth/RouteWrapper";
import LoginFlowPage from "./pages/Onboarding/LoginFlowPage";
import ManageAccountPage from "./pages/Panel/ManageAccountPage";
import TripsPage from "./pages/Panel/TripsPage";
import ReceiptsPage from "./pages/Panel/ReceiptsPage";
import PassesPage from "./pages/Panel/PassesPage";
import VouchersPage from "./pages/Panel/VouchersPage";
import PersonalDataPage from "./pages/Panel/ManageAccount/PersonalDataPage";
import DocumentsPage from "./pages/Panel/ManageAccount/DocumentsPage";
import ContactsPage from "./pages/Panel/ManageAccount/ContactsPage";
import ShippingAddressPage from "./pages/Panel/ManageAccount/ShippingAddressPage";
import BuyPassPage from "./pages/Panel/Passes/BuyPassPage";

function App() {
  return (
    <Routes>
      <Route
        element={
          <UnprotectedRoute>
            <LoginLayout />
          </UnprotectedRoute>
        }
      >
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.FLOW} element={<LoginFlowPage />} />
        <Route path={ROUTES.OTP} element={<OTPPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <PanelLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path={ROUTES.HOME}
          element={<Navigate to={ROUTES.PANEL} replace />}
        />
        <Route path={ROUTES.PANEL} element={<DashboardPage />} />
     
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
