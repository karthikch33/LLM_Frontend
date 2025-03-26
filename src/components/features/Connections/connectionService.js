import axios from 'axios'
import urls from '../../utils/base_url'

const checkConnectionService = async (data)=>{
    try {
        const response = await axios.post(`${urls?.url}sapconn/`,data);
        return response;
    } catch (error) {
        return error?.response
    }
}

const checkHanaConnectionService = async (data)=>{
    try {
        const response = await axios.post(`${urls?.url}hanaconn/`,data);
        return response;
    } catch (error) {
        return error?.response
    }
}

const getConnectionService = async ()=>{
    try {
        const response = await axios.get(`${urls?.url}Cget/`);
        return response;
    } catch (error) {
        return error?.response
    }
}

const deleteConnectionService = async (data)=>{
    try {
        const response = await axios.delete(`${urls?.url}Cdelete/${data?.project_id}/${data?.connection_name}/`);
        return response;
    } catch (error) {
        return error?.response
    }
}

const updateConnectionService = async (data)=>{
    try {
        const response = await axios.put(`${urls?.url}Cupdate/${data.project_id}/${data.connection_name}/`,data);
        return response;
    } catch (error) {
        return error?.response
    }
}

const renameConnectionService = async (data)=>{
    try {
        const response = await axios.put(`${urls?.url}Crename/${data?.re_val}/${data?.project_id}/${data?.connection_name}/`,data);
        return response;
    } catch (error) {
        return error?.response
    }
}

const saveConnectionService = async (data)=>{
    try {
        const response = await axios.post(`${urls?.url}Ccreate/`,data);
        return response;
    } catch (error) {
        return error?.response
    }
}

const singleGetConnectionService = async (data)=>{
    try {
        const response = await axios.get(`${urls?.url}CgetSingle/${data?.project_id}/${data?.connection_name}/`);
        return response;
    } catch (error) {
        return error?.response
    }
}

const searchSaptablesService = async (data)=>{
    try {
        const response = await axios.get(`${urls?.url}SAPTableSearch/${data}`);
        return response;
    } catch (error) {
        return error;
    }
}
 
const getSapTablesService = async (data)=>{
    try {
        const response = await axios.get(`${urls?.url}saptables/${data}/`);
        return response;
    } catch (error) {
        return error;
    }
}

const reUploadSuccessFactorsService = async (data)=>{
    try {
        const response = await axios.put(`http://127.0.0.1:8000/reUploadSuccessFactors/${data?.projectId}/`,data?.formData,{
            'headers' : {
                'Content-Type' : 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}

const saveSuccessFactorsService = async(data)=>{
    try {
        const response = await axios.post('http://127.0.0.1:8000/saveSuccessFactors/',data?.formData,{
            'headers':{
                'Content-Type' : 'multipart/form-data'
            }
        })
        return response;
    } catch (error) {
        return error;
    }
}


const connectionServices = {
    checkConnectionService,
    getConnectionService,
    deleteConnectionService,
    renameConnectionService,
    updateConnectionService,
    saveConnectionService,
    singleGetConnectionService,
    checkHanaConnectionService,
    searchSaptablesService,
    getSapTablesService,
    reUploadSuccessFactorsService,
    saveSuccessFactorsService
}

export default connectionServices