import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import fileServices from "./fileService";
import { toast } from "react-toastify";
 
const initialState ={
    isError:false,
    isSucess:false,
    isPending:false,
    file_connections : [],
}
 
export const getFileSlice = createAsyncThunk('file/getfile',async (thunkAPI)=>{
    try {
        return await fileServices.getFileService();
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
})
 
export const deleteFileSlice = createAsyncThunk('file/deletefile',async (data,thunkAPI)=>{
    try {
        return await fileServices.deleteFileService(data);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
})
 
export const renameFileSlice = createAsyncThunk('file/renamefile',async (data,thunkAPI)=>{
    try {
        return await fileServices.renameFileService(data);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
})

export const uploadExcelSheetSlice = createAsyncThunk('file/uploadexcelsheet',async (formdata,thunkAPI)=>{
    try {
        return await fileServices.uploadExcelSheetService(formdata);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
})

export const uploadCsvSheetSlice = createAsyncThunk('file/uploadcsvsheet',async (formdata,thunkAPI)=>{
    try {
        return await fileServices.uploadCsvSheetService(formdata);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
})

export const uploadTxtSheetSlice = createAsyncThunk('file/uploadtxtsheet',async (formdata,thunkAPI)=>{
    try {
        return await fileServices.uploadTxtSheetService(formdata);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
})

export const uploadExcelSlice = createAsyncThunk('file/uploadexcel',async (formdata,thunkAPI)=>{
    try {
        return await fileServices.uploadExcelService(formdata);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
})
 
 
export const resetState = createAction("Reset_all")
 
const fileSlice = createSlice({
    name:"connection",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
 
        builder.addCase(getFileSlice.pending,(state)=>{
            state.isError = false;
            state.isPending = true;
            state.isSucess = false;
        }).addCase(getFileSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSucess = true;
            state.isPending = false;
            state.file_connections = action?.payload;
        }).addCase(getFileSlice.rejected,(state)=>{
            state.isError = true;
            state.isPending = false;
            state.isSucess = false;
        })
 
        builder.addCase(deleteFileSlice.pending,(state)=>{
            state.isError = false;
            state.isPending = true;
            state.isSucess = false;
        }).addCase(deleteFileSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSucess = true;
            state.isPending = false;                
        }).addCase(deleteFileSlice.rejected,(state)=>{
            state.isError = true;
            state.isPending = false;
            state.isSucess = false;
        })
 
        builder.addCase(renameFileSlice.pending,(state)=>{
            state.isError = false;
            state.isPending = true;
            state.isSucess = false;
        }).addCase(renameFileSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSucess = true;
            state.isPending = false; 
        }).addCase(renameFileSlice.rejected,(state)=>{
            state.isError = true;
            state.isPending = false;
            state.isSucess = false;
        })

        builder.addCase(uploadExcelSheetSlice.pending,(state)=>{
            state.isError = false;
            state.isPending = true;
            state.isSucess = false;
        }).addCase(uploadExcelSheetSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSucess = true;
            state.isPending = false; 
        }).addCase(uploadExcelSheetSlice.rejected,(state)=>{
            state.isError = true;
            state.isPending = false;
            state.isSucess = false;
        })

        builder.addCase(uploadCsvSheetSlice.pending,(state)=>{
            state.isError = false;
            state.isPending = true;
            state.isSucess = false;
        }).addCase(uploadCsvSheetSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSucess = true;
            state.isPending = false; 
        }).addCase(uploadCsvSheetSlice.rejected,(state)=>{
            state.isError = true;
            state.isPending = false;
            state.isSucess = false;
        })

        builder.addCase(uploadTxtSheetSlice.pending,(state)=>{
            state.isError = false;
            state.isPending = true;
            state.isSucess = false;
        }).addCase(uploadTxtSheetSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSucess = true;
            state.isPending = false; 
        }).addCase(uploadTxtSheetSlice.rejected,(state)=>{
            state.isError = true;
            state.isPending = false;
            state.isSucess = false;
        })

        builder.addCase(uploadExcelSlice.pending,(state)=>{
            state.isError = false;
            state.isPending = true;
            state.isSucess = false;
        }).addCase(uploadExcelSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSucess = true;
            state.isPending = false; 
        }).addCase(uploadExcelSlice.rejected,(state)=>{
            state.isError = true;
            state.isPending = false;
            state.isSucess = false;
        })



    }
})
 
export default fileSlice.reducer