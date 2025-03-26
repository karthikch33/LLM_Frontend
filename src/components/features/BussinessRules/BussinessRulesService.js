import axios from 'axios'
import urls from '../../utils/base_url'

export const createBussinessRulesService = async (formData)=>{
    try {
         const response = await axios.post(`${urls?.url}ObjCreate/`, formData, {
             headers: {
                        'Content-Type': 'multipart/form-data'
                    }
        })
        return response;
     }
     catch(error){
        return error;
       };
}

export const updateBussinessRulesService = async (updateData)=>{
    try {
        const response = await axios.put(`${urls?.url}ObjUpdate/${updateData?.get('object_id')}/`,updateData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        })
        return response;
    } catch (error) {
        return error;
    }
}

export const deleteBussinessRulesService = async (deleteData)=>{
    try {
        const response = await axios.delete(`${urls?.url}ObjDelete/${deleteData?.obj_id}/`, deleteData);
        return response;
    } catch (error) {
        return error;
    }
}

export const getSingleBussinessRulesService = async (getData)=>{
    try {
        const response = await axios.get(`${urls?.url}ObjGet/${getData?.obj_id}/`);
        return response;
    } catch (error) {
        return error;
    }
}

export const getBussinessRulesService = async (getData)=>{
    try {
        const response = await axios.get(`${urls?.url}PdataObject/${getData?.obj_id}/${getData?.project_type}/`);
        return response;
    } catch (error) {
        return error;
    }
}

export const uploadFileNameFetchService = async (formData)=>{
    try {
        const response = await axios.post(`${urls?.excelUrl}`,formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        })
        return response;
    } catch (error) {
        return error
    }
}

export const getDataSegmentsService = async(data)=>{
    try {
        const response = await axios.get(`${urls?.url}Osegements/${data?.project_id}/${data?.object_id}/`)
        return response;
    } catch (error) {
        return error;
    }
}

export const getFieldsOnSegmentService = async(data)=>{
    try {
        const response = await axios.get(`${urls?.url}Sfields/${data?.project_id}/${data?.object_id}/${data?.segment_id}/` )
        return response;
    } catch (error) {
        return error;
    }
}

export const getFetchRulesService = async(data)=>{
    try {
        const response = await axios.get(`${urls?.url}GetSaveRules/${data?.project_id}/${data?.object_id}/${data?.segment_id}/`);
        return response;
    } catch (error) {
        return error;
    }
}

export const createSaveRulesService = async(data)=>{
    const formatedData = JSON.stringify(data);
    try {
        const response = await axios.post(`${urls?.url}CreateSaveRules/`, formatedData ,{
            headers :{
                'Content-Type' :'application/json'
            }
        }
        )
        return response;
    } catch (error) {
        return error;
    }
}

export const createVersionRulesService = async(data)=>{
    try {
        const response = await axios.post(`${urls?.url}VersionRuleCreate/`,data,{
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        return response;
    } catch (error) {
        return error
    }
}

export const getVersionNumberService = async(data)=>{
    try {
        const response = await axios.get(`${urls?.url}RuleVersions/${data?.project_id}/${data?.object_id}/${data?.segment_id}/`);
        return response;
    } catch (error) {
        return error;
    }
}

export const getVersionRulesService = async(data)=>{
    try {
        console.log(data);
        const response =  axios.get(`${urls?.url}VersionData/${data?.project_id}/${data?.object_id}/${data?.segment_id}/${data?.verison_number}/`);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const getTableService = async(data) =>{
    try {
        const response = await axios.get(`${urls?.url}getTable/${data?.project_id}/${data?.object_id}/${data?.segment_id}/`);
        return response;
    } catch (error) {
        return error;
    }
}

export const getDataObjectSegmentService = async(data)=>{
    try {
        const response = await axios.get(`${urls?.url}Osegements/${data?.project_id}/${data?.object_id}/`);
        return response;
    } catch (error) {
        return error;
    }
}

export const applyOneToOneService = async(data)=>{
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/applyOneToOne/${data?.project_id}/${data?.object_id}/${data?.segment_id}/`)
        return response;
    } catch (error) {
        return error;
    }
}

const BussinessRulesServices = {
    createBussinessRulesService,
    updateBussinessRulesService,
    deleteBussinessRulesService,
    getSingleBussinessRulesService,
    getBussinessRulesService,
    getDataSegmentsService,
    createSaveRulesService,
    getDataObjectSegmentService,
    uploadFileNameFetchService,
    createVersionRulesService,
    getFieldsOnSegmentService,
    getFetchRulesService,
    getVersionNumberService,
    getTableService,
    getVersionRulesService,
    applyOneToOneService
}

export default BussinessRulesServices;