import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import ContsctList from '../ContactList/index'

export default function Index() {
    const [search, setsearch] = useState('')
    const [users, setUsers] = useState(null)
    const action = useSelector((state) => state.users.actionType);
console.log(users)
    useEffect(() => {
        const handleSearch = async (search) => {
            let res = null;
            if (search) {
                res = await axios.get(`http://3.115.6.236:5000/users/filter/${search}`);
            }
            else if (search === '') {
                res = await axios.get('http://3.115.6.236:5000/users');
            }
            if (res) {
                const resData =  res.data;
                setUsers(resData);
            }
        }

        handleSearch(search);

    }, [search, action])
    return (
        <div>
            <form action="" className='my-10'>
                <div className="flex items-center p-3 rounded-md space-x-3 border-gray-300 border-2">
                    <span className='text-gray-400'>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '5.33333', overflow: 'visible' }}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
                    </span>
                    <input type="text" onChange={(e) => setsearch(e.target.value)} name="search" className='outline-none w-full' placeholder='Search for contact by last name...' />
                </div>
            </form>
            <ContsctList users={users} />
        </div>
    )
}
