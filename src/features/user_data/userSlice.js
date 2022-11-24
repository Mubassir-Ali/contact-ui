import {createSlice} from '@reduxjs/toolkit';

const initialState={
    actionType:'getUsers',
}

export const userSlice=createSlice({
    name:'users',
    initialState,
    reducers: {
        dataAction: (state,actions)=>{
            state.actionType=actions.payload;
        },
    }
})

export const {dataAction} =userSlice.actions;
export default userSlice.reducer;
