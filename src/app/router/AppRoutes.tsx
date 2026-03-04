// routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.tsx";
import PublicRoute from "./PublicRoute.tsx";

import LoginPage from "../../features/auth/pages/LoginPage.tsx";
import RegisterPage from "../../features/auth/pages/RegisterPage.tsx";
import DashboardPage from "../../features/dashboard/pages/DashboardPage.tsx";
import Home from "../../pages/Home.tsx";
import NotFound from "../../pages/NotFound.tsx";

// Employee pages
import EmployeeList from "../../features/employees/pages/EmployeeList.tsx";
import EmployeeCreate from "../../features/employees/pages/EmployeeCreate.tsx";
import EmployeeEdit from "../../features/employees/pages/EmployeeEdit.tsx";

// Packet pages
import PacketList from "../../features/packets/pages/PacketList.tsx";
import PacketCreate from "../../features/packets/pages/PacketCreate.tsx";
import PacketEdit from "../../features/packets/pages/PacketEdit.tsx";

// Client pages
import ClientList from "../../features/clients/pages/ClientList.tsx";
import ClientCreate from "../../features/clients/pages/ClientCreate.tsx";
import ClientEdit from "../../features/clients/pages/ClientEdit.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Home />} />
      </Route>

      {/* Private pages */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Employee routes */}
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/create" element={<EmployeeCreate />} />
        <Route path="/employees/:id/edit" element={<EmployeeEdit />} />

        {/* Client routes */}
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/create" element={<ClientCreate />} />
        <Route path="/clients/:id/edit" element={<ClientEdit />} />

        {/* Packet routes */}
        <Route path="/packets" element={<PacketList />} />
        <Route path="/packets/create" element={<PacketCreate />} />
        <Route path="/packets/:id/edit" element={<PacketEdit />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
