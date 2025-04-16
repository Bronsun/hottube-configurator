import { Navigate, Route, Routes } from "react-router";
import NotFound from "./pages/404";
import MainLayout from "./components/Layout/MainLayout";
import { ROUTES } from "./constants/routes";
import ConfiguratorPage from "./pages/Configurator/ConfiguratorPage";
import HottubDetailPage from "./pages/Configurator/HottubeDetailPage";
import AdminPage from "./pages/Admin/AdminPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path={ROUTES.HOME}
          element={<Navigate to={ROUTES.CONFIGURATOR} replace />}
        />
        <Route path={ROUTES.CONFIGURATOR} element={<ConfiguratorPage />} />
        <Route path={`${ROUTES.CONFIGURATOR}/:hottubId`} element={<HottubDetailPage />} />
        <Route path={ROUTES.ADMIN} element={<AdminPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;