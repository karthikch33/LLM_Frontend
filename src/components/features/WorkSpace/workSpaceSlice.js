import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import workSpaceServices from "./workSpaceService";

const initialState = {
    isError : false,
    isPending : false,
    isSuccess : false,
}

export const getLatestVersionSlice = createAsyncThunk("workSpace/getLatestVersion", async(data,thunkAPI)=>{
    try {
        return await workSpaceServices?.getLatestVersionService(data);
    } catch (error) {
        thunkAPI?.rejectWithValue(error);
    }
})

const workSpaceSlice = createSlice({
    name : "workSpace",
    initialState : initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(getLatestVersionSlice.pending,(state,action)=>{
            state.isError = false;
            state.isPending = true;
            state.isSuccess = false;
        })
        .addCase(getLatestVersionSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isPending = false;
            state.isSuccess = true;
        })
        .addCase(getLatestVersionSlice?.rejected,(state,action)=>{
            state.isError = true;
            state.isPending = false;
            state.isSuccess = false;
        })
    }
})

export default workSpaceSlice?.reducer