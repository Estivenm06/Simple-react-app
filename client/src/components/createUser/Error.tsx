import React from "react";
interface ErrorProp {
  error: string | null;
}

export const Error = ({ error }: ErrorProp): React.JSX.Element | undefined => {
  return (
    <div
      className={`container mx-auto w-2/3 rounded-lg bg-red-500 mb-5 text-white text-center font-bold text-1xl transition-all ease-in-out duration-500
    ${
      error !== null
        ? "opacity-100 visible p-3"
        : "opacity-0 collapse size-0 p-0"
    }`}
    >
      {error}
    </div>
  );
};
