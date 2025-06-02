import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NewUser, User } from "../../../types/userType.js";
import { createUser } from "../../../services/user.js";
import { Pages } from "./Pages.jsx";
import { ErrorComponent } from "./Error.jsx";

interface CreateUserProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}


export const CreateUserForm = ({ setModal, setUsers }: CreateUserProps): React.JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const inputsPage1: Array<string> = ["name", "username", "email", "phone"];
  const inputsPage2: Array<string> = ["city", "suite", "street", "zipcode"];
  const inputsPage3: Array<string> = [
    "website",
    "companyName",
    "catchPhrase",
    "bs",
  ];

  const handlePage = (page: number): void => {
    setPage(page);
    if (page === 2) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            formik.setFieldValue("lat", position.coords.latitude);
            formik.setFieldValue("lng", position.coords.longitude);
          },
          (error: GeolocationPositionError) => {
            if (error.code === error.PERMISSION_DENIED) {
              setError("User denied the request for Geolocation.");
              setTimeout(() => {
                setError(null);
              }, 5000);
            }
          }
        );
      } else {
        setError("Geolocation is not supported by this browser");
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    }
  };

  const handleError = ({message}: {message: string }): void => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      city: "",
      suite: "",
      street: "",
      zipcode: "",
      phone: "",
      website: "",
      companyName: "",
      catchPhrase: "",
      bs: "",
      lat: "",
      lng: "",
    },
    validationSchema: Yup.object().shape({
      //Page1
      name: Yup.string().required(() => handleError({message: "Name is required"})),
      username: Yup.string().required(() => handleError({message: "Username is required"})),
      email: Yup.string().email(() => handleError({message: "Invalid email"})).required(() => handleError({message: "Email is required"})),
      phone: Yup.string().required(() => handleError({message: "Phone is required"})),
      //Page2
      city: Yup.string().required(() => handleError({message: "City is required"})),
      suite: Yup.string().required(() => handleError({message: "Suite is required"})),
      street: Yup.string().required(() => handleError({message: "Street is required"})),
      zipcode: Yup.string().required(() => handleError({message: "Zip Code is required"})),
      //Page3
      website: Yup.string().required(() => handleError({message: "Website is required"})),
      companyName: Yup.string().required(() => handleError({message: "Company Name is required"})),
      catchPhrase: Yup.string().required(() => handleError({message: "Catch Phrase is required"})),
      bs: Yup.string().required(() => handleError({message: "Bs is required"})),
      //Permission
      lat: Yup.string().required(() => handleError({message: "Your location is required"})),
      lng: Yup.string().required("Lng is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (values) {
          const user: NewUser = {
            name: values.name,
            username: values.username,
            email: values.email,
            address: {
              geo: {
                lat: values.lat,
                lng: values.lng,
              },
              city: values.city,
              suite: values.suite,
              street: values.street,
              zipcode: values.zipcode,
            },
            phone: values.phone,
            website: values.website,
            company: {
              name: values.companyName,
              catchPhrase: values.catchPhrase,
              bs: values.bs,
            },
          };
          await createUser(user)
          .then((response) => {
            if(typeof(response) === 'string'){
              setError(response)
              setTimeout(() => {
                setError(null)
              }, 5000)
            }
            if(typeof(response) === 'object'){
              window.alert('User created succesfully.')
              setUsers((prevValues: User[]) => prevValues.concat(response))
              setModal(false)
            }
          }
          )
          .catch((error) => {setError(error); setTimeout(() => {setError(null);}, 5000);});
        } else {
          setError("Check all fields or allow location permission.");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setTimeout(() => {
            setError(null);
          }, 5000);
        }
      }
    },
  });

  return (
    <form
      className={`container mx-auto shadow-xl rounded-lg w-80 lg:w-2/6 md:w-1/2 p-5 transition-all ease-in-out duration-500 bg-gray-100`}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex justify-between p-5 transition-all ease-in-out duration-500">
        <h1 className={`text-2xl md:text-4xl uppercase font-semibold`}>
          Create User
        </h1>
        <button
          type="button"
          className="bg-black hover:bg-gray-500 text-white font-bold hover:text-black transition-all ease-in-out duration-500 rounded-full px-2 md:px-4"
          onClick={() => setModal(false)}
        >
          X
        </button>
      </div>

      <>
        <Pages
          pageName="Information"
          onChange={formik.handleChange}
          inputs={inputsPage1}
          formik={formik}
          page={page}
          pageNumber={1}
        />
        <Pages
          pageName="Address"
          onChange={formik.handleChange}
          page={page}
          pageNumber={2}
          inputs={inputsPage2}
          formik={formik}
        />
        <Pages
          pageName="Company"
          onChange={formik.handleChange}
          page={page}
          pageNumber={3}
          inputs={inputsPage3}
          formik={formik}
        />
      </>
      <ErrorComponent error={error} />
      <div className="flex flex-row gap-5 transition-all ease-in-out duration-500">
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          className={`${
            page === 1
              ? "opacity-0 size-0 invisible"
              : "opacity-100 bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-500 rounded-lg w-full py-3 text-white font-bold uppercase"
          }`}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => handlePage(page + 1)}
          className={`${
            page === 3
              ? "opacity-0 size-0 invisible"
              : "opacity-100 bg-blue-500 hover:bg-blue-700 transition-all duration-500 ease-in-out rounded-lg w-full py-3 text-white font-bold uppercase"
          }`}
        >
          Next
        </button>
        <button
          className={`${
            page === 3
              ? "opacity-100 bg-green-500 hover:bg-green-700 transition-all ease-in-out duration-500 rounded-lg w-full py-3 text-white font-bold uppercase block"
              : "opacity-0 size-0 invisible"
          }`}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
