import axios from 'axios'
import urls from '../../utils/base_url'

const createProjectService = async(data)=>{
    try {
        const response = await axios.post(`${urls?.url}Pcreate/`,data);
        return response;
    } catch (error) {
        return error
    }
}

const getProjectsService = async()=>{
    try {
        const response = await axios.get(`${urls?.url}Pget/`);
        return response;
    } catch (error) {
        return error
    }
}

const updateProjectService = async (data)=>{
    try {
        const response = await axios.put(`${urls?.url}PUpdate/${data.project_id}/`,data);
        return response;
    } catch (error) {
        return error
    }
}

const deleteProjectService = async (data)=>{
    try {
        const response = await axios.delete(`${urls?.url}PDelete/${data.project_id}/`)
        return response;
    } catch (error) {
        return error
    }
}

export const projectServices = {
    createProjectService,
    getProjectsService,
    updateProjectService,
    deleteProjectService
}