import axios from 'axios'
import urls from '../../utils/base_url';


const getLatestVersionService = async(data)=>{
    try {
        const response = await axios?.get(`${urls?.url}getLatestVersion/${data?.project_id}/${data?.object_id}/${data?.segment_id}/`);
        return response;
    } catch (error) {
        console.log(error)
    }
}
 
const getExecuteQueriesService = async(data)=>{
    try {
        // const response = await 
    } catch (error) {
        console.log(error)
    }
}

const workSpaceServices = {
    getLatestVersionService
}

export default workSpaceServices;