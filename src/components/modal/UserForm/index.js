import React, { useState, useEffect } from 'react'

import { useDispatch,useSelector } from 'react-redux';
import { dataAction } from '../../../features/user/userSlice'
import { userData } from '../../../features/user/userSlice'


import { showForm } from '../../../features/modal/modalSlice'

let userId=null;
export default function Index() {
    const user = useSelector((state) => state.users.user);

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [contacts, setcontacts] = useState('');

    const dispatch=useDispatch();

    useEffect(()=>{
        if(user){
            setfirstName(user.firstname)
            setlastName(user.lastname)
            setcontacts(user.contacts)
            userId=user.id;
        }
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            firstName,
            lastName,
            contacts,
        }




        if (userId) {
            const res = await fetch(`http://localhost:5000/users/${userId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            dispatch(dataAction(data))
        } else {
            const res = await fetch('http://localhost:5000/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            dispatch(dataAction(data))

        }

        dispatch(showForm(false))
        dispatch(userData({
            firstname:'',
            lastname:'',
            contacts:'',
            id:''
        }))


    }

    const handleCancel=()=>{
        dispatch(showForm(false))
        dispatch(userData({
            firstname:'',
            lastname:'',
            contacts:'',
            id:''
        }))

    }

    return (
        <div className={`modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto  flex justify-center items-center `} style={{ backgroundColor: 'rgba(0,0,0,.8)' }}>
            <form onSubmit={handleSubmit}>
                <div className=' bg-gray-200 p-5 space-y-5 w-96 rounded-lg'>
                    <div>
                        <p>First Name</p>
                        <input type="text" value={firstName} required onChange={(e) => setfirstName(e.target.value)} placeholder='enter first Name' className='px-3 py-2 w-full rounded-md' />
                    </div>
                    <div>
                        <p>Last Name</p>
                        <input type="text" value={lastName} required onChange={(e) => setlastName(e.target.value)} placeholder='enter last Name' className='px-3 py-2 w-full rounded-md' />
                    </div>
                    <div>
                        <p>Contact Number</p>
                        <input type="text" value={contacts} required onChange={(e) => setcontacts(e.target.value)} placeholder='contact number' className='px-3 py-2 w-full rounded-md' />
                    </div>

                    <div className='flex justify-between'>
                        <input type="submit" value='submit' className='btn bg-indigo-500 text-white hover:bg-indigo-600' />
                        <button className='btn bg-gray-400 hover:bg-gray-500' onClick={() => handleCancel()}>Cancel</button>

                    </div>
                </div>

            </form>
        </div>
    )
}
