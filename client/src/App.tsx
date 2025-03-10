import React, { useEffect, useState } from "react";
import { getUser } from "../services/user";
import { User } from "../types/userType.ts";
import { UserComponent } from "./User.tsx";
import { Header } from "./Header.tsx";

export const App = (): React.JSX.Element => {
  const [user, setUser] = useState<User[]>([]);
  const [themeMode, setThemeMode] = useState<string>("");

  useEffect(() => {
    getUser().then((data) => setUser(data));
    const theme = localStorage.getItem("theme");
    switch(theme){
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
    <>
      <Header themeMode={themeMode} setThemeMode={setThemeMode} />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 md:gap-4 mt-4 container mx-auto transition-all ease-in-out duration-300">
        {user.map((user, id) => (
          <div key={id} className="block transition-all ease-in-out duration-300">
            <UserComponent user={user} themeMode={themeMode}/>
          </div>
        ))}
      </div>
    </>
  );
};
