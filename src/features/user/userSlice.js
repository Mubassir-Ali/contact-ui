import {createSlice} from '@reduxjs/toolkit';

const initialState={
    actionType:'getUsers',
    user:{
        firstname:'',
        lastname:'',
        contacts:'',
        id:''
    }
}

export const userSlice=createSlice({
    name:'users',
    initialState,
    reducers: {
        dataAction: (state,actions)=>{
            state.actionType=actions.payload;
        },
        userData:(state,actions)=>{
            state.user=actions.payload;
        }

    }
})

export const {dataAction, userData,usersList} =userSlice.actions;
export default userSlice.reducer;
