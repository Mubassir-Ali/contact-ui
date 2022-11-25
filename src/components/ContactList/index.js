import React from 'react'
import { useDispatch } from 'react-redux';
import { dataAction } from '../../features/user/userSlice';
import { showForm } from '../../features/modal/modalSlice';
import { userData } from '../../features/user/userSlice';


export default function Index({users}) {
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' })
        if (res) {
            dispatch(dataAction('deleteUser'))
        }
    }

    const handleEdit = async (user) => {
        dispatch(showForm(true))
        dispatch(userData(user))
    }

    return (
        <div>
            <table className='w-full border-collapse border border-gray-300'>
                <tbody>
                    {
                        users?.map((user, index) => (
                            <tr key={index}>
                                <td className='border border-gray-300 p-3'>
                                    <div className='flex-bw'>
                                        <div className='text-2xl'>
                                            <p className='capitalize font-semibold'>{user.firstname} {user.lastname}</p>
                                            <p className='text-gray-400 font-semibold'>{user.contacts}</p>
                                        </div>

                                        <div className="flex space-x-4">
                                            <button onClick={() => handleEdit(user)}>Edit</button>
                                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
