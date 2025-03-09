import React, { useState } from "react";
import { User } from "../types/userType";

interface UserComponentsProps {
  user: User;
}

export const UserComponent = ({
  user,
}: UserComponentsProps): React.JSX.Element => {
  const [value, setValue] = useState<boolean>(false);
  return (
    <section className="bg-gray-200 p-4 m-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">{user.username}</h1>
      <p className="text-lg font-semibold text-gray-600 ml-0.5">
        Name: {user.name}
      </p>
      <p className="text-md font-semibold text-gray-600 mb-2 ml-0.5 -mt-2.5">
        Email: {user.email}
      </p>
      <div className={`${value ? "visible" : "size-0 invisible"}`}>
        <div
          className={`p-4 rounded-xl bg-gray-300 text-md inline-flex flex-col mb-3 mt-1 ml-1 ${
            value
              ? "opacity-100 transition-all ease-in-out duration-400"
              : "opacity-0 -translate-y-2 collapse"
          }`}
        >
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Company Name: {user.company.name}</p>
        </div>
      </div>
      <button
        onClick={() => setValue(!value)}
        className="hover:bg-teal-800 text-white text-1xl font-bold p-2 bg-teal-600 rounded-lg transition ease-in-out duration-300"
      >
        {value ? "Close info..." : "More info..."}
      </button>
    </section>
  );
};
