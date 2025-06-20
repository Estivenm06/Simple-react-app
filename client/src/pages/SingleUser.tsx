import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router";
import { getUser } from "../../services/user.js";
import { User } from "../../types/userType.js";
import { Header } from "../components/header/Header.jsx";
import SingleUserComponents from "../components/userComponents/SingleUserComponents.jsx";
import { CreateUserForm } from "../components/createUser/CreateUserForm.jsx";

interface SingleUserProps {
  themeMode: string;
  setThemeMode: React.Dispatch<React.SetStateAction<string>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

export const SingleUser = ({
  setThemeMode,
  themeMode,
  modal,
  setModal,
  setUsers
}: SingleUserProps): React.JSX.Element => {
  const [user, setUser] = useState<User>();
  const params = useParams<{ id: string }>();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      if (params.id === undefined) {
        navigate("/");
        return;
      } else if (params.id.length === 0) {
        navigate("/");
        return;
      }
      getUser(params.id).then((data: User) => setUser(data));
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-center bg-stone-300 rounded-xl shadow text-white p-5 font-bold text-6xl">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <>
      <Header
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        setModal={setModal}
      />
      <div
        className={`flex flex-col justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${
          modal ? "block" : "hidden"
        }`}
      >
        <CreateUserForm setModal={setModal} setUsers={setUsers} />
      </div>
      <div className="flex flex-col justify-center h-screen">
        <SingleUserComponents user={user} />
      </div>
    </>
  );
};
