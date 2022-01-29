import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Project from "../pages/Project";
import Organization from "../pages/Organization";
import OrganizationDashboard from "../pages/OrganizationDashboard";
import Bug from "../pages/Bug";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signIn" element={<Auth />} />
      <Route path="/project/:projectId" element={<Project />} />
      <Route
        path="/organizations"
        element={
          <ProtectedRoute>
            <Organization />
          </ProtectedRoute>
        }
      />
      <Route path="/organizations/:orgId" element={<OrganizationDashboard />} />
      <Route path="/bug/:bugId" element={<Bug />} />
    </Routes>
  );
};

export default Router;
