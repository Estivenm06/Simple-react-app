import React, { useEffect, useState } from "react";
import { getAll } from "../services/user.js";
import { User } from "../types/userType.js";

import { BrowserRouter as Router, Route, Routes } from "react-router";
import { SingleUser } from "./pages/SingleUser.jsx";
import {Home} from "./pages/Home.jsx";

export const App = (): React.JSX.Element => {
  const [themeMode, setThemeMode] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    getAll().then((data: User[]) => setUsers(data));
        const theme = localStorage.getItem("theme");
        switch (theme) {
          case "dark":
            setThemeMode("dark");
            localStorage.setItem("theme", "dark");
            break;
          case "light":
            setThemeMode("light");
            localStorage.setItem("theme", "light");
            break;
          default:
            setThemeMode("light");
            localStorage.setItem("theme", "light");
            break;
        }
  }, []);

  if (!users.length)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-center bg-stone-300 rounded-xl shadow text-white p-5 font-bold text-6xl">
          Loading...
        </h1>
      </div>
    );

  return (
    <Router>
        <Routes>
          <Route index path="/" element={<Home user={users} setUsers={setUsers} themeMode={themeMode} setThemeMode={setThemeMode} modal={modal} setModal={setModal} />} />
          <Route path='/users/:id' element={<SingleUser setUsers={setUsers} themeMode={themeMode} setThemeMode={setThemeMode} modal={modal} setModal={setModal}/>} />
        </Routes>
    </Router>
  );
};
