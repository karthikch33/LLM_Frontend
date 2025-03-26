import axios from 'axios'

const getFileService = async ()=>{
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/fget/');
        return response;
    } catch (error) {
        return error;
    }
}

const deleteFileService = async (data)=>{
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/fdelete/${data?.project_id}/${data?.file_name}/`);
        return response;
    } catch (error) {
        return error;
    }
}

const renameFileService = async (data)=>{
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/frename/${data?.re_val}/${data?.project_id}/${data?.file_name}/`,data);
        return response;
    } catch (error) {
        return error;
    }
}

const uploadExcelSheetService = async (formData)=>{
    try {
        const response = await axios.post("http://127.0.0.1:8000/xlsx/", formData);
        return response;
    } catch (error) {
        return error;
    }
}

const uploadCsvSheetService = async (formData)=>{
    try {
        const response = await axios.post("http://127.0.0.1:8000/csv/",formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        })
        return response;
    } catch (error) {
        return error;
    }
}

const uploadTxtSheetService = async (formData)=>{
    try {
        const response = await axios.post("http://127.0.0.1:8000/txt/",formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        })
        return response;
    } catch (error) {
        return error;
    }
}

const uploadExcelService = async(formData)=>{
    try {
        const response = await axios.post('http://127.0.0.1:8000/excel/',formData,{
            headers:{
                'Content-Type' :'multipart/form-data'
            }
        })
        return response;
    } catch (error) {
        return error;
    }
    
}

const fileServices = {
    getFileService,
    deleteFileService,
    renameFileService,
    uploadExcelSheetService,
    uploadCsvSheetService,
    uploadTxtSheetService,
    uploadExcelService
}

export default fileServices