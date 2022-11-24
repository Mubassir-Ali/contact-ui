import React,{useState} from 'react';
import UserForm from '../modal/UserForm'

import { useDispatch } from 'react-redux';
import { dataAction } from '../../features/user_data/userSlice'


export default function Index(props) {
    const [showForm, setShowForm] = useState(false)
    const { firstName, lastName, contacts,id } = props

    const dispatch = useDispatch();

    const handleDelete=async()=>{
        const res=await fetch(`http://localhost:5000/users/${id}`,
        {
            method: 'DELETE',
        }
        )

        if(res){
            dispatch(dataAction('deleteUser'))

        }

    }

    const handleEdit=async(id)=>{
        setShowForm(true)

    }
    return (
        <div className='flex-bw'>
            <div className='text-2xl'>
                <p className='capitalize font-semibold'>{firstName} {lastName}</p>
                <p className='text-gray-400 font-semibold'>{contacts}</p>
            </div>

            <div className="flex space-x-4">
                <button onClick={()=>handleEdit(id)}>Edit</button>
                <button onClick={()=>handleDelete()}>Delete</button>
            </div>

            {
        showForm && <UserForm actionType="Update User" setShowFormState={setShowForm} id={id}/>
      }

        </div>
    )
}
