import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import { dataAction } from "../../../features/user/userSlice";
import { userData } from "../../../features/user/userSlice";
import { showForm } from "../../../features/modal/modalSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFormik } from "formik";
import { schema, userObject } from "./schema";

let userId = null;

export default function Index() {
  const user = useSelector((state) => state.users.user);
  const notify = (res) => toast(res);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      formik.setValues({
        firstName: user.firstname,
        lastName: user.lastname,
        contacts: user.contacts,
      });
      userId = user.id;
    }
  }, [user]);

  const handleSubmit = async () => {
    const data = {
      firstName: formik.values.firstName.toLowerCase(),
      lastName: formik.values.lastName.toLowerCase(),
      contacts: formik.values.contacts.toLowerCase(),
    };

    if (userId) {
      const res = await axios.put(`http://3.115.6.236:5000/users/${userId}`,data);

      if (res.status === 200) {
        dispatch(dataAction(data));
        notify("User Updated Successfully!");
      }
    } else {
      const res = await axios.post("http://3.115.6.236:5000/users", data);
      if (res.status === 201) {
        dispatch(dataAction(data));
        notify("User Created Successfully!");
      }
    }

    dispatch(showForm(false));
    dispatch(userData(userObject));
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      contacts: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  const handleCancel = () => {
    dispatch(showForm(false));
    dispatch(userData(userObject));
  };

  return (
    <div
      className={`modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto  flex justify-center items-center `}
      style={{ backgroundColor: "rgba(0,0,0,.8)" }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className=" bg-gray-200 p-5 space-y-5 w-96 rounded-lg">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              {...formik.getFieldProps("firstName")}
              className="px-3 py-2 w-full rounded-md"
              placeholder="Enter First Name"
            />

            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500">*{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              {...formik.getFieldProps("lastName")}
              className="px-3 py-2 w-full rounded-md"
              placeholder="Enter Second Name"
            />

            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500">*{formik.errors.lastName}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="contact">Contact</label>

            <input
              id="contact"
              type="text"
              {...formik.getFieldProps("contacts")}
              className="px-3 py-2 w-full rounded-md"
              placeholder="Enter Contact Number"
            />

            {formik.touched.contacts && formik.errors.contacts ? (
              <div className="text-red-500">*{formik.errors.contacts}</div>
            ) : null}
          </div>

          <div className="flex justify-between">
            <input
              type="submit"
              value="submit"
              className="btn bg-indigo-500 text-white hover:bg-indigo-600"
            />
            <button
              className="btn bg-gray-400 hover:bg-gray-500"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <ToastContainer
        toastStyle={{ backgroundColor: "#22c55e", color: "#ffff" }}
      />
    </div>
  );
}
