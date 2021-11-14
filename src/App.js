import "./App.css";
import AppNav from "./Components/AppNav";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import RegPage from "./Components/RegPage";
import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/Dashboard";
import CreateEvent from "./Components/CreateEvent";
import { createContext, useState } from "react";

import SingleItem from "./Components/SingleItem";
import PrivateRoute from "./Components/PrivateRoute";
import AddAdmin from "./Components/AddAdmin";
import UserDashboard from "./Components/UserDashboard";
import UserEventBook from "./Components/UserEventBook";
import EventBook from "./Components/EventBook";
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

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RegPage />} />
            <Route path="login" element={<LoginPage />} />

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
              <Route path="EventBook" element={<EventBook />} />
            </Route>

            <Route
              path="userDashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            >
              <Route path="DashboardUser" element={<UserEventBook />} />
            </Route>
            <Route path="*" element={<p>404 Error</p>} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
