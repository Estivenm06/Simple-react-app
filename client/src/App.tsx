import React, { useEffect, useState } from "react";
import { getUser } from "../services/user";
import { User } from "../types/userType.ts";
import { UserComponent } from "./User.tsx";

export const App = (): React.JSX.Element => {
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

  return (
    <>
      <h1 className="bg-black text-white text-center p-4 font-bold text-6xl">
        Hello React
      </h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 md:gap-4 mt-4">
      {user.map((user, id) => (
          <div key={id} className="block container mx-auto">
            <UserComponent user={user} />
          </div>
      ))}
      </div>
    </>
  );
};
