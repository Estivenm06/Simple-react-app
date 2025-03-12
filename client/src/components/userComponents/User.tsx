import React, { useState } from "react";
import { User } from "../../../types/userType.js";
import {NavigateFunction, useNavigate} from 'react-router';
import { deleteUser } from "../../../services/user.js";

interface UserComponentsProps {
  user: User;
  themeMode: string;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

export const UserComponent = ({
  user,
  themeMode,
  setUsers
}: UserComponentsProps): React.JSX.Element => {
  const [value, setValue] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate()

  const handleDelete = (id: number): void => {
    deleteUser(id).then(() => 
    window.alert('You deleted this user.'))
    setUsers((prevValue: User[]) => {
    return prevValue.filter((userItem) => userItem.id !== id);
    });
      
  }

  return (
    <section
      className={`transition-all ease-in-out duration-300 p-4 m-4 rounded-lg shadow-md ${
        themeMode === "dark"
          ? "bg-stone-400 text-gray-900"
          : "bg-gray-100 text-black"
      }`}
    >
      <button onClick={() => navigate(`/user/${user.id}`)} className="hover:text-gray-200 text-3xl font-bold transition-all ease-in-out duration-300">{user.username}</button>
      <p className="text-lg font-semibold text-gray-800 ml-0.5">
        Name: {user.name}
      </p>
      <p className="text-md font-semibold text-gray-800 mb-2 ml-0.5 -mt-2.5">
        Email: {user.email}
      </p>
      <div className={`${value ? "visible" : "size-0 invisible"}`}>
        <div
          className={`p-4 rounded-xl text-md inline-flex flex-col mb-3 mt-1 ml-1 ${
            value
              ? "opacity-100 transition-all ease-in-out duration-400"
              : "opacity-0 -translate-y-2 collapse"
          } ${
            themeMode === "dark"
              ? "bg-stone-500 text-gray-200"
              : "bg-gray-300 text-black"
          }`}
        >
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Company Name: {user.company.name}</p>
        </div>
      </div>
      <div className="flex justify-between capitalize text-white transition-all ease-in-out duration-300">
      <button
        onClick={() => setValue(!value)}
        className="hover:bg-teal-900 text-1xl px-3 py-1 bg-teal-600 rounded-lg transition-all ease-in-out duration-300 capitalize"
      >
        {value ? "close info..." : "more info..."}
      </button>
      <button onClick={() => {handleDelete(user.id)}} className="hover:bg-red-900 text-1xl px-3 py-1 bg-red-600 rounded-lg transition-all ease-in-out duration-300 capitalize">
          delete user
      </button>
      </div>
    </section>
  );
};
