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
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

export const Home = ({ user, themeMode, setThemeMode, setModal, setUsers, modal }: HomeProps): React.JSX.Element => {

  return (
    <>
      <Header themeMode={themeMode} setThemeMode={setThemeMode} setModal={setModal} />
      <div className={`fixed flex flex-col justify-center top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${modal ? "block" : "hidden"}`}>
        <CreateUserForm setModal={setModal} setUsers={setUsers} />
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 md:gap-4 mt-4 container mx-auto transition-all ease-in-out duration-300">
        {user.map((user, id) => (
          <div
            key={id}
            className="block transition-all ease-in-out duration-300"
          >
            <UserComponent user={user} themeMode={themeMode} setUsers={setUsers} />
          </div>
        ))}
      </div>
    </>
  );
};
