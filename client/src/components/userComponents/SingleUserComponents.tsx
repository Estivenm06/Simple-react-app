import React from "react";
import { User } from "../../../types/userType";
import { useNavigate } from "react-router";

interface UserComponentsProps {
  user: User;
}

const UserComponents = ({ user }: UserComponentsProps) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl shadow-xl bg-gray-100 p-10 w-96 mx-auto">
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white font-bold px-4 py-2 mb-12 rounded-md hover:bg-blue-600 uppercase"
      >
        Back to Home
      </button>
      <h1 className="text-3xl mb-2 text-center uppercase">User Details</h1>
      <div className="flex flex-col capitalize">
      <img
        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.username}`}
        alt="avatar"
        className="w-32 h-32 rounded-full shadow-md border-4 border-gray-200 mx-auto"
      />
      <h1 className="text-2xl font-bold mt-1 text-center">name: {user.name}</h1>
      <h2 className="text-lg font-semibold mt-4">email: {user.email}</h2>
      <h3 className="text-lg font-semibold mt-1">username: {user.username}</h3>
      <h4 className="text-lg font-semibold mt-1">phone: {user.phone}</h4>
      <h5 className="text-lg font-semibold mt-1">website: <button onClick={() => navigate(`http://${user.website}`)}>{user.website}</button></h5>

      </div>
    </div>
  );
};

export default UserComponents;
