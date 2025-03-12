import React from "react";
import { FormikValues } from "formik";

interface PagesProps {
  pageName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputs: Array<string>;
  formik: FormikValues;
  page: number;
  pageNumber: number;
}

export const Pages = ({
  pageName,
  onChange,
  inputs,
  formik,
  page,
  pageNumber,
}: PagesProps) => {
  return (
    <div
      className={`${
        page === pageNumber
          ? "opacity-100 flex flex-col justify-center gap-2 p-5 transition-all ease-in-out duration-500"
          : "opacity-0 size-0 invisible "
      }`}
    >
      <h2 className="text-3xl md:text-3xl uppercase">{pageName}</h2>
      {inputs.map((input, id) => (
        <div key={id} className="flex flex-col">
          <label htmlFor={input} className="text-black font-semibold">
            {input.charAt(0).toUpperCase() + input.slice(1)}
          </label>
          <input
            type={input === "email" ? "email" : "text"}
            className="p-2 rounded-lg bg-stone-300 text-black transition-all ease-in-out duration-500"
            onChange={onChange}
            id={input}
            name={input}
            placeholder={`Insert your ${input}`}
            value={formik.values[input]}
          />
          {formik.errors[input] && formik.touched[input] ? (
            <div className="text-red-500">{formik.errors[input]}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
