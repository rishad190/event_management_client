import "./App.css";
import AppNav from "./Components/AppNav";
import { BrowserRouter, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import RegPage from "./Components/RegPage";
import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/Dashboard";
import CreateEvent from "./Components/CreateEvent";
import { createContext, useState } from "react";

import SingleItem from "./Components/SingleItem";
import PrivateRoute from "./Components/PrivateRoute";
import AddAdmin from "./Components/AddAdmin";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    image: "",
    error: "",
    success: false,
    isAdmin: false,
  });
  console.log(user);
  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <BrowserRouter>
          <LinkBox />
          <Routes>
            <Route path="/" element={<RegPage />} />
            <Route path="login" element={<LoginPage />} />
            {/* <Route
              path="admin"
              element={
                <PrivateRoute user={user}>
                  <AppNav />
                </PrivateRoute>
              }
            /> */}
            <Route
              path="admin"
              element={
                <PrivateRoute>
                  <AppNav />
                </PrivateRoute>
              }
            >
              <Route path="Dashboard" element={<Dashboard />}>
                <Route path=":id" element={<SingleItem />} />
              </Route>
              <Route path="CreateEvent" element={<CreateEvent />} />
              <Route path="AddAdmin" element={<AddAdmin />} />
            </Route>

            <Route path="*" element={<p>404 Error</p>} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;

const LinkBox = () => {
  return (
    <div>
      <Link to="/admin">Dashboard</Link>
    </div>
  );
};
