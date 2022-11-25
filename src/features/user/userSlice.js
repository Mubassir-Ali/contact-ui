import {createSlice} from '@reduxjs/toolkit';

const initialState={
    actionType:'getUsers',
    user:{
        firstname:'',
        lastname:'',
        contacts:'',
        id:''
    }
    // user:{}
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

export const {dataAction, userData} =userSlice.actions;
export default userSlice.reducer;
