import React, { useEffect, useState } from "react";
import { getAll } from "../services/user";
import { User } from "../types/userType.ts";

import { BrowserRouter as Router, Route, Routes } from "react-router";
import { SingleUser } from "./pages/SingleUser.tsx";
import {Home} from "./pages/Home.tsx";

export const App = (): React.JSX.Element => {
  const [themeMode, setThemeMode] = useState<string>("");
  const [user, setUser] = useState<User[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    getAll().then((data) => setUser(data));
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

  if (!user.length)
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
          <Route index path="/" element={<Home user={user} themeMode={themeMode} setThemeMode={setThemeMode} modal={modal} setModal={setModal} />} />
          <Route path='/user/:id' element={<SingleUser themeMode={themeMode} setThemeMode={setThemeMode} modal={modal} setModal={setModal}/>} />
        </Routes>
    </Router>
  );
};
