import React from "react";
import { UserComponent } from "../components/userComponents/User.jsx";
import { Header } from "../components/header/Header.jsx";
import { User } from "../../types/userType.js";
import { CreateUserForm } from "../components/createUser/CreateUserForm.jsx";

interface HomeProps {
  user: User[];
  themeMode: string;
  setThemeMode: React.Dispatch<React.SetStateAction<string>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const Home = ({
  user,
  themeMode,
  setThemeMode,
  setModal,
  setUsers,
  modal,
}: HomeProps): React.JSX.Element => {

  return (
    <>
      <div
        className={`transition-all ease-in-out duration-200 fixed justify-center content-center w-full h-dvh ${
          modal ? "opacity-100 bg-gray-500/50" : "opacity-0 sr-only"
        }`}
      >
        <CreateUserForm setModal={setModal} setUsers={setUsers} />
      </div>
      <Header
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        setModal={setModal}
      />
      <div className="container grid md:grid-cols-2 xl:grid-cols-3 md:gap-4 mt-5 mx-auto transition-all ease-in-out duration-300">
        {user.map((user, id) => (
          <div key={id} className="transition-all ease-in-out duration-300">
            <UserComponent
              user={user}
              themeMode={themeMode}
              setUsers={setUsers}
            />
          </div>
        ))}
      </div>
    </>
  );
};
