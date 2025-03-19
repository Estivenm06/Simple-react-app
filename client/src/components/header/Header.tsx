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
  setModal,
}: HeaderProps): React.JSX.Element => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = (): void => {
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
      className={`transition-all ease-in-out duration-300 text-white md:p-5 p-2 shadow-md ${
        themeMode.toLowerCase() === "light" ? "bg-blue-500" : "bg-stone-700"
      }`}
    >
      {" "}
      <div className="flex flex-row transition-all ease-in-out duration-300 container mx-auto px-5">
        <h1 className="text-center m-auto md:w-full flex flex-start font-bold sm:text-2xl md:text-3xl xl:text-4xl capitalize transition-all ease-in-out duration-300">
          user information
        </h1>
        <div className="flex flex-row gap-2 w-full justify-end items-center ml-5">
          <button
            className="text-xs md:text-1xl lg:text-lg font-semibold capitalize bg-gray-500 text-gray px-3 py-2 md:px-5 lg:px-3 lg:py-1 rounded-lg transition-all ease-in-out duration-300"
            onClick={() => setModal(true)}
          >
            add user
          </button>
          <h6 className="font-semibold text-xs md:text-sm lg:text-lg capitalize transition-all ease-in-out duration-300">
            {checked ? "light mode" : "dark mode"}
            <Switch size="medium" checked={checked} onChange={handleChange} />
          </h6>
        </div>
      </div>
    </header>
  );
};
