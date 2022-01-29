import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signIn" element={<Auth />} />
    </Routes>
  );
};

export default Router;
