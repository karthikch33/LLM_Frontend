import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { projectServices } from "./projectService";

const initialState ={
    isError:false,
    isSucess:false,
    isPending:false,
    projects: []
}

export const resetState = createAction("Reset_all")

export const createProjectSlice = createAsyncThunk('project/createproject',async (data,thunkAPI)=>{
    try {
        return await projectServices.createProjectService(data);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
})
export const getProjectsSlice = createAsyncThunk('project/getproject',async (thunkAPI)=>{
    try {
        return await projectServices.getProjectsService();
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
})

export const updateProjectsSlice = createAsyncThunk('project/updateproject',async (data,thunkAPI)=>{
    // console.log(data);
    try {
        return await projectServices.updateProjectService(data);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
})

export const deleteProjectsSlice = createAsyncThunk('project/deleteproject',async (data,thunkAPI)=>{
    try {
        console.log(data);
        return await projectServices.deleteProjectService(data);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
})

const projectSlice = createSlice({
    name:"project",
    initialState:initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getProjectsSlice.pending,(state)=>{
            state.isError = false;
            state.isPending = true;
            state.isSucess = false;
        }).addCase(getProjectsSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isPending = false;
            state.isSucess = true;
            state.projects = action?.payload?.data;
            if(action?.payload?.status === 404)
            {
                toast?.error('Failed To Fetch Projects')
            }
        }).addCase(getProjectsSlice.rejected,(state)=>{
            state.isError = true;
            state.isPending = false;
            state.isSucess = false;
        })

        builder.addCase(updateProjectsSlice.pending,(state)=>{
            state.isError = false;
            state.isPending = true;
            state.isSucess = false;
        }).addCase(updateProjectsSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isPending = false;
            state.isSucess = true;
        }).addCase(updateProjectsSlice.rejected,(state)=>{
            state.isError = true;
            state.isPending = false;
            state.isSucess = false;
        })

        builder.addCase(deleteProjectsSlice.pending,(state)=>{
            state.isError = false;
            state.isPending = true;
            state.isSucess = false;
        }).addCase(deleteProjectsSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isPending = false;
            state.isSucess = true;
        }).addCase(deleteProjectsSlice.rejected,(state)=>{
            state.isError = true;
            state.isPending = false;
            state.isSucess = false;
        })

        builder.addCase(createProjectSlice.pending,(state)=>{
            state.isError = false;
            state.isPending = true;
            state.isSucess = false;
        }).addCase(createProjectSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isPending = false;
            state.isSucess = true;            
        }).addCase(createProjectSlice.rejected,(state)=>{
            state.isError = true;
            state.isPending = false;
            state.isSucess = false;
        })
    }
})


export default projectSlice.reducer