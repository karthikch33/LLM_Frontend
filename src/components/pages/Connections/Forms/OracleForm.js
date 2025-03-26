import React, { useEffect, useState } from 'react'; 
import { Button, Input} from 'antd';  
import { Alert } from 'antd';
import { useFormik } from "formik";
import * as yup from 'yup'
import {useLocation, useNavigate} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';  
import { checkConnectionSlice, saveConnectionSlice, singleGetConnectionSlice, updateConnectionSlice } from '../../../features/Connections/connectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getProjectsSlice } from '../../../features/Project/projectSlice';

// Change Api for Oracle these are SAP Connections


const OracleForm = () => {

    const [allProjects, setAllProjects] = useState([]);  
    const navigate = useNavigate();  
    const location = useLocation();  

    // Extracting connection details from URL  
    const getConnectionType = location.pathname.split('/')[2] || null;  
    const getConnectionName = location.pathname.split('/')[3] || null;  
    const getProjectId = location.pathname.split('/')[4];  

    const dispatch = useDispatch();
    const {connectionStatus, singleConnection} = useSelector(state=>state.connection);
    const projects = useSelector(state => state.project.projects);  

    let schema = yup.object().shape({
         project_id: yup.string().required('Project Selection Required'), 
         connection_name :yup.string().required("Connection Name Required"),
        dsn:yup.string().required('Dsn Required'),
        username:yup.string().required('Username Required'),
        password:yup.string().required('Password Required'),
    })


    const formik = useFormik({
        initialValues:{
            project_id: getProjectId || '',  
            connectionname: getConnectionName || '',
            dsn:"",
            username:"",
            password:""
        },
        validationSchema:schema,
        onSubmit:async (values)=>{
        dispatch(checkConnectionSlice(values));
                    setTimeout(async ()=>{
                            if (connectionStatus && getConnectionName === null) {  
                                values.status = 'Active';
                                await saveConnection(values);  
                            } else if(getConnectionName === null){  
                                await saveConnection(values);  
                            }  
        
                            if (getConnectionName !== null) {  
                                if(connectionStatus){
                                    values.status = 'Active';
                                    await updateConnection(values);  
                                }
                                else{
                                    await updateConnection(values);  
                                }
                            }
                            navigate('/connections/view-connections');
                    },1000)
                }})

    useEffect(()=>{
          setAllProjects(projects);
      },[projects])

    useEffect(() => {  
            fetchConnection(); // Fetch connection only if we're in edit mode  
        }, [getConnectionName, getProjectId]);  


     useEffect(()=>{
         if(getProjectId !== undefined) {
            formik.values.connectionname = getProjectId
            }
        else{

           }
     },[getProjectId])

     useEffect(()=>{
        if (getConnectionName && singleConnection) {  
            formik.setValues({  
                project_id: singleConnection.data.project_id,  
                connection_name: singleConnection.data.connection_name,  
                dsn : singleConnection.data.dsn,
                username: singleConnection.data.username,  
            });
    } 
},[singleConnection])
 // Fetch connection details if editing  
    const fetchConnection = async () => { 
        const singleConnectionData = {
            project_id : getProjectId,
            connection_name : getConnectionName
        } 
        dispatch(singleGetConnectionSlice(singleConnectionData));   
    };     

    // Save connection  
        const saveConnection = async (values) => {  
            dispatch(saveConnectionSlice(values));
        };  
    
        // Update connection  
        const updateConnection = async (values) => {  
           dispatch(updateConnectionSlice(values)); 
        };  

    return (  
        <>
        <ToastContainer
          position='top-center'
          autoClose={1000}
          hideProgressBar={true}
          closeOnClick
          newestOnTop={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          />
        <div className="d-flex justify-content-center"> 
        <div className="bg-light border rounded shadow p-4" style={{ width: '400px' }}> 
            <h3 className="text-center mb-4"> Oracle Connection</h3>  
            <form onSubmit={formik.handleSubmit} className="form-container">  
            <div className="form-group">  
                        <label htmlFor="project_id">Project Name</label>  
                        <select  
                            name="project_id"
                            className='w-100 form-select'
                            style={{marginLeft:"10px"}}
                            value={formik.values.project_id}  
                            onChange={formik.handleChange('project_id')}  
                            disabled={getConnectionName !== null}  
                        >  
                            <option value="">Select Project</option>    
                            {allProjects && allProjects.map((option) => (  
                                <option key={option?.project_id}   value={option?.project_id}>{option?.project_name}</option>  
                            ))}  
                        </select>  
                        <div className="error">{formik.touched.project_id && formik.errors.project_id}</div>  
                    </div>  
            <div className="form-group">  
                <label htmlFor="exampleInputEmail1">Connection Name </label>
                <Input  
                    type="text"  
                    value={formik.values.connectionname}  
                    name="connectionname"  
                    onChange={formik.handleChange('connectionname')}  
                />   
                <div className="error">  
                    {  
                        formik.touched.connectionname && formik.errors.connectionname  
                    }  
                </div>  
            </div>  
            <div className="form-group">  
                <label htmlFor="exampleInputEmail1">DSN</label>  
                <Input  
                    type="text"  
                    value={formik.values.dsn}  
                    name="dsn"  
                    onChange={formik.handleChange('dsn')}  
                />   
                <div className="error">  
                    {  
                        formik.touched.dsn && formik.errors.dsn  
                    }  
                </div>  
            </div>  
            <div className="form-group">  
                <label htmlFor="exampleInputEmail1">Username</label>  
                <Input  
                type="text"  
                value={formik.values.username}  
                name="username"  
                onChange={formik.handleChange('username')}   
                />   
                <div className="error">  
                    {  
                        formik.touched.username && formik.errors.username  
                    }  
                </div>  
            </div>   
            <div className="form-group">  
                <label htmlFor="exampleInputEmail1">Password</label>  
                <Input  
                    type="password"  
                    value={formik.values.password}  
                    name="password"  
                    onChange={formik.handleChange('password')}  
                />   
                <div className="error">  
                    {  
                        formik.touched.password && formik.errors.password  
                    }  
                </div>  
            </div>   
            <div className='d-flex justify-content-around w-75 mt-2'>
            <input type="submit" className="btn btn-primary" value={getProjectId === '' ? 'Edit' : 'Save'}/>  
            <input type="submit" className="btn btn-danger" value={'Cancel'}/>  
            </div>
        </form> 
        </div>  
    </div>  
    </> 
    );  
}

export default OracleForm