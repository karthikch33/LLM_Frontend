import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import BussinessRulesServices from './BussinessRulesService'

const initialState = {
    isError: false,
    isSuccess : false,
    isLoading : false,
    rules:[]
}

export const createBussinessRulesSlice = createAsyncThunk('bussinessrules/create',async (formData,thunkAPI)=>{
    try {
        return await BussinessRulesServices.createBussinessRulesService(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateBussinessRulesSlice = createAsyncThunk('bussiness/update',async(updateData,thunkAPI)=>{
    try {
        return await BussinessRulesServices.updateBussinessRulesService(updateData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteBussinessRulesSlice = createAsyncThunk('bussiness/delete',async(deleteData,thunkAPI)=>{
    try {
        return await BussinessRulesServices.deleteBussinessRulesService(deleteData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getSingleBussinessRulesSlice = createAsyncThunk('bussiness/getsingle', async(getData,thunkAPI)=>{
    try {
        return await BussinessRulesServices.getSingleBussinessRulesService(getData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getBussinessRulesSlice = createAsyncThunk('bussiness/get', async(getData,thunkAPI)=>{
    try {
        return await BussinessRulesServices.getBussinessRulesService(getData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getDataSegmentsSlice = createAsyncThunk('bussiness/getdatasegments', async(data,thunkAPI)=>{
    try {
        return await BussinessRulesServices.getDataSegmentsService(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getFetchRulesSlice = createAsyncThunk('bussiness/getfetchrules', async(data,thunkAPI)=>{
    try {
        return await BussinessRulesServices.getFetchRulesService(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createSaveRulesSlice = createAsyncThunk('bussiness/createsaverules', async(data,thunkAPI)=>{
    try {
        return await BussinessRulesServices.createSaveRulesService(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createVersionRulesSlice = createAsyncThunk('bussiness/createversionrules', async(data,thunkAPI)=>{
    try {
        return await BussinessRulesServices.createVersionRulesService(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getVersionNumberSlice = createAsyncThunk('bussiness/getversionnumber', async(data,thunkAPI)=>{
    try {
        return await BussinessRulesServices.getVersionNumberService(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getVersionRulesSlice = createAsyncThunk('bussiness/getversionrules', async(data,thunkAPI)=>{
    try {
        return await BussinessRulesServices.getVersionRulesService(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getDataObjectSegmentSlice = createAsyncThunk('bussiness/getOsegements', async(data,thunkAPI)=>{
    try {
        return await BussinessRulesServices.getDataObjectSegmentService(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getTableSlice = createAsyncThunk('bussiness/gettable', async(data,thunkAPI)=>{
    try {
        return await BussinessRulesServices.getTableService(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getFieldsOnSegmentSlice = createAsyncThunk('bussiness/getfieldonsegment', async(data,thunkAPI)=>{
    try {
        return await BussinessRulesServices.getFieldsOnSegmentService(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const uploadFileNameFetchSlice = createAsyncThunk('bussiness/filenamefetch',async(formData,thunkAPI)=>{
    try {
        return await BussinessRulesServices.uploadFileNameFetchService(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const applyOneToOneSlice = createAsyncThunk('bussiness/applyonetoone',async(data,thunkAPI)=>{
    try {
        return await BussinessRulesServices.applyOneToOneService(data);
    } catch (error) {
        return thunkAPI?.rejectWithValue(error);
    }
})

const BussinesRulesSlice = createSlice({
    name:'Bussiness_rules',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createBussinessRulesSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(createBussinessRulesSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action?.payload);
        })
        .addCase(createBussinessRulesSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })
        
        builder.addCase(updateBussinessRulesSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(updateBussinessRulesSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action?.payload);
        })
        .addCase(updateBussinessRulesSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

        
        builder.addCase(deleteBussinessRulesSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(deleteBussinessRulesSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action?.payload);
        })
        .addCase(deleteBussinessRulesSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

        builder.addCase(applyOneToOneSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(applyOneToOneSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(applyOneToOneSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

        builder.addCase(getTableSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(getTableSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action?.payload);
        })
        .addCase(getTableSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

        builder.addCase(getSingleBussinessRulesSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(getSingleBussinessRulesSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action?.payload);
        })
        .addCase(getSingleBussinessRulesSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

        builder.addCase(getDataObjectSegmentSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(getDataObjectSegmentSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action?.payload);
        })
        .addCase(getDataObjectSegmentSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

        builder.addCase(getBussinessRulesSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(getBussinessRulesSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.rules = action?.payload?.data;
        })
        .addCase(getBussinessRulesSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

        builder.addCase(createVersionRulesSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(createVersionRulesSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(createVersionRulesSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })
        builder.addCase(getVersionNumberSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(getVersionNumberSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(getVersionNumberSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

        builder.addCase(getVersionRulesSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(getVersionRulesSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(getVersionRulesSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

        builder.addCase(getDataSegmentsSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(getDataSegmentsSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(getDataSegmentsSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

        builder.addCase(createSaveRulesSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(createSaveRulesSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(createSaveRulesSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })
        
        builder.addCase(getFieldsOnSegmentSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(getFieldsOnSegmentSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(getFieldsOnSegmentSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

        builder.addCase(getFetchRulesSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(getFetchRulesSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(getFetchRulesSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

        builder.addCase(uploadFileNameFetchSlice.pending,(state)=>{
            state.isSuccess = false;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(uploadFileNameFetchSlice.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action?.payload);
        })
        .addCase(uploadFileNameFetchSlice.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
        })

    } 
})

export default BussinesRulesSlice.reducer;