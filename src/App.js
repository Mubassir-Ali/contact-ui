import { useState, useEffect } from 'react'
// import Contacts from './components/contacts';
import ContactList from './components/ContactList/index'
import UserForm from './components/modal/UserForm';

import { useSelector,useDispatch } from 'react-redux';
import { showForm } from './features/modal/modalSlice'


import './App.css';


function App() {
  // const [users, setUsers] = useState(null)
  // const [showForm, setShowForm] = useState(false)
  const dispatch =useDispatch();
  const [search, setsearch] = useState('')
  const action = useSelector((state) => state.users.actionType);
  const showFormModal = useSelector((state) => state.modal.show);

  

  console.log('redux state', action);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const res = await fetch('http://localhost:5000/users');
  //     const users = await res.json();
  //     setUsers(users);
  //   }

  //   getUser();

  // }, [action])

  // useEffect(()=>{
  //   const handleSearch = async (value) => {
  //     setsearch(value);
  //     let res=null;
  //     if (search) {
  //       console.log(search);
  //       res = await fetch(`http://localhost:5000/users/filter/${search}`);
  //     }
  //     else if(search===''){
  //       res = await fetch('http://localhost:5000/users');
  //     }
  //     if(res){

  //       const resData = await res.json();
  //       setUsers(resData);
  //     }
  //   }

  //   handleSearch();

  // },[search])

  return (
    <div className="container relative mx-auto space-y-10">
      <header className='text-center text-5xl '>
        <h1>Phone Book App</h1>
      </header>
      <div className="flex-bw">
        <p className='text-3xl font-semibold'>Contacts</p>
        <button className='btn text-white bg-blue-500 hover:bg-blue-600' onClick={() => dispatch(showForm(true))}>+ Add Contact</button>
      </div>

      <form action="" className='my-10'>
        <div className="flex items-center p-3 rounded-md space-x-3 border-gray-300 border-2">
          <span className='text-gray-400'>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '5.33333', overflow: 'visible' }}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
          </span>
          <input type="text" onChange={(e) => setsearch(e.target.value)} name="search" className='outline-none w-full' placeholder='Search for contact by last name...' />
        </div>
      </form>

      {/* <table className='w-full border-collapse border border-gray-300'>
        <tbody>
          {
            users?.map((item, index) => (
              <tr key={index}>
                <td className='border border-gray-300 p-3'>
                  <Contacts firstName={item.firstname} lastName={item.lastname} contacts={item.contacts} id={item.id} />
                </td>

              </tr>
            ))

          }

        </tbody>
      </table> */}

      <ContactList/>

      {
        showFormModal && <UserForm />
      }


    </div>
  );
}

export default App;
