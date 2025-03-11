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
      className={`transition-all ease-in-out duration-300 text-white p-5 shadow-md ${
        themeMode.toLowerCase() === "light" ? "bg-blue-500" : "bg-stone-700"
      }`}
    >
      <div className="container mx-auto flex font-bold transition-all ease-in-out duration-300 items-center">
        <h1 className="text-3xl xl:text-4xl capitalize">user information</h1>
        <button className="text-lg capitalize ml-auto mr-5 bg-gray-500 text-gray px-3 py-1 rounded-lg"
        onClick={() => setModal(true)}
        >
          add user
        </button>
        <p className="text-lg capitalize">
          {checked ? "light mode" : "dark mode"}
          <Switch checked={checked} onChange={handleChange} />
        </p>
      </div>
    </header>
  );
};
