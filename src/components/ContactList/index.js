import React from "react";
import { useDispatch } from "react-redux";
import { dataAction } from "../../features/user/userSlice";
import { showForm } from "../../features/modal/modalSlice";
import { userData } from "../../features/user/userSlice";
import { EditIcon, DeleteIcon } from "../icons/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index({ users }) {
  const dispatch = useDispatch();
  const deleteNotify = (res) => toast(res);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    });
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
                    <p className="text-gray-400 font-semibold">
                      {user.contacts.slice(0, 3)}-{user.contacts.slice(3, 6)}-
                      {user.contacts.slice(6)}
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </button>
                    <button onClick={() => handleDelete(user.id)}>
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
