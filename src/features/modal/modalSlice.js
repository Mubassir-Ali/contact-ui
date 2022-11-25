import {createSlice} from '@reduxjs/toolkit';

const initialState={
    show:false,
}

export const modalSlice=createSlice({
    name:'modal',
    initialState,
    reducers: {
        showForm: (state,actions)=>{
            state.show=actions.payload;
        },
    }
})

export const {showForm} =modalSlice.actions;
export default modalSlice.reducer;
