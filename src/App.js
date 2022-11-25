import { useSelector, useDispatch } from 'react-redux';
import { showForm } from './features/modal/modalSlice'
import Users from './components/filterUser/index';
import UserForm from './components/modal/UserForm';

import { ContactIcon } from './components/icons/index'
import './App.css';


function App() {
  const dispatch = useDispatch()
  const showFormModal = useSelector((state) => state.modal.show);

  return (
    <div className="container mt-10 xl:w-4/5  mx-auto space-y-10">
      <header className='text-center text-3xl flex justify-center items-center '>
        <ContactIcon />
        <div>
          <h1>Phone Book App</h1>

        </div>
      </header>

      <div className="flex-bw">
        <p className='text-3xl font-semibold'>Contacts</p>
        <button className='btn text-white bg-blue-500 hover:bg-blue-600' onClick={() => dispatch(showForm(true))}>+ Add Contact</button>
      </div>

      <Users />

      {
        showFormModal && <UserForm />
      }


    </div>
  );
}

export default App;
