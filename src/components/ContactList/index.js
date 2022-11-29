import React from "react";
import { useDispatch } from "react-redux";
import { dataAction } from "../../features/user/userSlice";
import { showForm } from "../../features/modal/modalSlice";
import { userData } from "../../features/user/userSlice";
import { EditIcon, DeleteIcon, PhoneIcon } from "../icons/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Index({ users }) {
  const dispatch = useDispatch();
  const deleteNotify = (res) => toast(res);

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://3.115.6.236:5000/users/${id}`);
    if (res.status === 200) {
      dispatch(dataAction(id));
      deleteNotify("User Deleted Successfully!");
    }
  };

  const handleEdit = async (user) => {
    dispatch(showForm(true));
    dispatch(userData(user));
  };

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          {users?.map((user, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-3">
                <div className="flex-bw">
                  <div className="text-2xl">
                    <p className="capitalize font-semibold">
                      {user.firstname} {user.lastname}
                    </p>
                    <div className="flex items-center">
                      <PhoneIcon />
                      <p className="text-gray-400 text-lg font-semibold ml-2">
                        {user.contacts.slice(0, 3)}-{user.contacts.slice(3, 6)}-
                        {user.contacts.slice(6)}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button title="Edit" onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer
        toastStyle={{ backgroundColor: "#22c55e", color: "#ffff" }}
      />
    </div>
  );
}
