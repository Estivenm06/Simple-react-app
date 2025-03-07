import React, { useEffect, useState } from "react";
import "./styles.css";
import { getUser } from "../services/user";
import { User } from "../types/userType.ts";

export const App = () => {
  const [user, setUser] = useState<User[]>([]);
  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);
  if (!user.length)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-center bg-black text-white p-5 font-bold text-6xl">
          Loading...
        </h1>
      </div>
    );
 // xl is 2rem, lg is 1.5rem, md is 1.125rem, sm is 1rem, xs is 0.875rem
  return (
    <>
    <h1 className="bg-black text-white text-center p-4 font-bold text-6xl">Hello React</h1>
      {user.map((user, id) => (
        <div key={id} className="bg-gray-200 p-4 m-4 rounded-lg">
            <h1 className="text-2xl font-bold">User {id+1}</h1>
            <p className="text-lg xs:text-center">
                {user.name} - {user.email}
            </p>
        </div>
      ))}
    </>
  );
};
