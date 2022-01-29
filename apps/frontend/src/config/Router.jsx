import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Project from "../pages/Project";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signIn" element={<Auth />} />
      <Route path="/project/:projectId" element={<Project />} />
    </Routes>
  );
};

export default Router;
