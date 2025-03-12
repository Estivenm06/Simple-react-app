import React, { useEffect, useState } from "react";
import { Switch } from "@mui/material";

interface HeaderProps {
  themeMode: string;
  setThemeMode: React.Dispatch<React.SetStateAction<string>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({
  themeMode,
  setThemeMode,
  setModal
}: HeaderProps): React.JSX.Element => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
    if (checked) {
      setThemeMode("light");
      localStorage.setItem("theme", "light");
    } else {
      setThemeMode("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const darkMode = () => {
      if (themeMode === "light") {
        setChecked(false);
      } else {
        setChecked(true);
      }
    };
    darkMode();
  }, [themeMode]);

  return (
    <header
      className={`transition-all ease-in-out duration-300 text-white pb-3 py-3 p-5 shadow-md ${
        themeMode.toLowerCase() === "light" ? "bg-blue-500" : "bg-stone-700"
      }`}
    >
      <div className="flex items-center font-bold transition-all ease-in-out duration-300">
        <h1 className="text-2xl md:text-3xl xl:text-4xl mr-5 capitalize transition-all ease-in-out duration-300">user information</h1>
        <button className="text-md capitalize ml-auto mr-1 bg-gray-500 text-gray px-1 md:px-3 py-1 rounded-lg transition-all ease-in-out duration-300"
        onClick={() => setModal(true)}
        >
          add user
        </button>
        <p className=" md:text-lg capitalize transition-all ease-in-out duration-300">
          {checked ? "light mode" : "dark mode"}
          <Switch checked={checked} onChange={handleChange} />
        </p>
      </div>
    </header>
  );
};
