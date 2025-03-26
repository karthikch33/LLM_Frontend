import React, { useEffect, useState } from 'react';   
import { Button, ConfigProvider, Input, input, message, Select, Spin } from 'antd';  
import { useFormik } from "formik";  
import * as yup from 'yup';  
import { useLocation, useNavigate } from 'react-router-dom';  
import { useDispatch, useSelector } from 'react-redux';  
import { checkHanaConnectionSlice, saveConnectionSlice, singleGetConnectionSlice, updateConnectionSlice } from '../../../features/Connections/connectionSlice';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import { toast, ToastContainer } from 'react-toastify';
import { createStyles } from 'antd-style';
import CustomInput from "../../CustomInput";
import { CustomSelectProject } from '../../CustomSelect';

const HanaForm = () => {  
    const [allProjects, setAllProjects] = useState([]);  
    const [messageApi, contextHolder] = message.useMessage();  
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();  
    const location = useLocation();  
    const dispatch = useDispatch();  

    const getConnectionName = location.pathname.split('/')[3] || null;  
    const getProjectId = location.pathname.split('/')[4] || null;  

    const projects = useSelector(state => state.project.projects);  

    useEffect(() => {  
        setAllProjects(projects);  
    }, [projects]);  

    useEffect(() => {  
        if(getConnectionName !== null && getProjectId !== null)
        fetchConnection();  
    }, [getConnectionName, getProjectId]);  


     const useStyle = createStyles(({ prefixCls, css }) => ({
            linearGradientButtonSave: css`
              &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
                > span {
                  position: relative;
                }
          
                &::before {
                  content: '';
                  background: linear-gradient(135deg, #6253e1, #04befe);
                  position: absolute;
                  inset: -1px;
                  opacity: 1;
                  transition: all 0.3s;
                  border-radius: inherit;
                }
          
                &:hover::before {
                  opacity: 0;
                }
              }
    `  
     }));
     const { styles } = useStyle();

    const schema = yup.object().shape({  
        project_id: yup.string().required('Project Selection Required'),   
        connection_name : yup.string().required('Connection Name Required ')
        .matches(/^(?!_)(?!.*_$)[a-zA-Z0-9_]+$/, 'Invalid Connection Name'),   
         host: yup.string()  
        .matches(  
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,   
        'Must be a valid IP address'  
        ).required('Provide Host Number'),  
        port: yup.number().required('Port Required'),  
        username: yup.string().required('Username Required')
        .matches(/^(?!_)(?!.*_$)[a-zA-Z0-9_]+$/, 'Invalid Username Name'),
        password: yup.string().required('Password Required'),  
    });  

    const formik = useFormik({  
        initialValues: {  
            project_id: "",  
            connection_name: getProjectId || '', 
            host: '10.56.7.40',  
            port: "30015",  
            username: "",  
            password: ""  
        },  
        validationSchema: schema,  
        onSubmit: async (values) => {  
            setLoading(true);
            dispatch(checkHanaConnectionSlice(values))
            .then((response)=>{
                console.log(response);
                if(response?.payload?.status === 404){
                const popUpClose = messageApi.error(  
                <div className='d-flex flex-column'>  
                    <label>Invalid Credentials. Do you still want to save?</label>  
                    <div className='d-flex justify-content-center w-100 gap-4 mt-3'>  
                        <Button  style={{ width: "100px", padding: "10px" }} className='p-2'  
                            onClick={async () => { 
                                values.status = 'InActive'; 
                                getConnectionName === null ? await saveConnection(values) : await updateConnection(values);
                                popUpClose();
                            }}> Yes </Button>  
                        <Button  style={{ width: "100px", padding: "10px" }} className='align-center'  
                            onClick={() => {  
                                popUpClose();   
                            }}>  No  </Button>  
                    </div>  
                </div>, 0);  
                            }  
                        else if(response?.payload?.status === 200){
                                values.status = 'Active'; 
                                getConnectionName === null ?  saveConnection(values) : updateConnection(values);;  
                        }
            })
            .catch((error)=>{
                console.log(error);
            })
            .finally(()=>{
                setLoading(false);
            })
        }  
    });

    const fetchConnection = async () => {   
        const singleConnectionData ={  
            project_id: getProjectId,  
            connection_name: getConnectionName  
        };   
        dispatch(singleGetConnectionSlice(singleConnectionData))
        .then((response)=>{
            if(response?.payload?.status === 200)
            {
            const requiredFields = response?.payload?.data;
            formik.setValues({  
                project_id: requiredFields?.project_id,  
                connection_name: requiredFields?.connection_name,  
                host: requiredFields?.host,  
                port: requiredFields?.port,  
                username: requiredFields?.username,
                password: ''  
            }); 
            }
            else 
            {
                navigate('/pagenotfound')
            }
        })   
    };  
 
    const saveConnection = async (values) => {  
        dispatch(saveConnectionSlice({...values,connection_type:"Hana"}))
        .then((response)=>{
            if(response?.payload?.status === 201){
                toast.success(`${response?.payload?.data?.connection_name} Created Successfully`);
                setTimeout(()=>{
                    navigate('/connections/view-connections')
                },2000)
            }
            else if(response?.payload?.status === 406)
            {
                toast?.error(`Connection Already Exists`);
            }
            else{
                toast?.error('Connection Creation Failed');
            }
        })  
    };  

    const updateConnection = async (values) => {  
        dispatch(updateConnectionSlice({...values,connection_type:"Hana"}))
        .then((response)=>{
            if(response?.payload?.status === 202){
                toast.success(`${response?.payload?.data?.connection_name} Updated Successfully`);
                setTimeout(()=>{
                    navigate('/connections/view-connections')
                },2000)
            }
            else if(response?.payload?.status === 406)
            {
                toast?.error(`Connection Already Exists`);
            }
            else{
                toast?.error('Connection Creation Failed');
            }
        })   
    };  

    const handleProjectChange = (e)=>{
        formik?.setFieldValue('project_id',e)
    }

    return (  
        <Spin spinning={loading} tip='Connecting to Hana...'>
        {contextHolder}
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
            <div className="bg-light border rounded shadow mt-4">   
                <h3 className="text-center mt-3"> HANA Connection</h3>  
                <form onSubmit={formik.handleSubmit} style={{width:"390px", paddingLeft:"30px", paddingRight:"15px",paddingBottom:"30px", paddingTop:"10px"}}>

                    <div style={{height:"280px",overflow:"auto"}}>
                    <CustomSelectProject  touched={formik?.touched?.project_id} error={formik?.errors?.project_id} 
                    value={formik?.values?.project_id} handleChange={handleProjectChange} disabled={false} projects={allProjects}/>
                    
                    <CustomInput label='Connection' name='connection_name' value={formik?.values?.connection_name}
                     handleChange={formik?.handleChange} disabled = {getConnectionName !== null}  type="text"
                     touched={formik?.touched?.connection_name} error={formik?.errors?.connection_name} blur={formik?.handleBlur}/>
                    
                    <CustomInput label='Host' name='host' type="text"
                     value={formik?.values?.host} handleChange={formik?.handleChange} disabled={false}
                     touched={formik?.touched?.host} error={formik?.errors?.host} blur={formik?.handleBlur}/>

                    <CustomInput label='Port' name='port' type="text"
                     value={formik?.values?.port} handleChange={formik?.handleChange} disabled={false}
                     touched={formik?.touched?.port} error={formik?.errors?.port} blur={formik?.handleBlur}/>
                    
                    <CustomInput label='Username' name='username' type="text"
                     value={formik?.values?.username} handleChange={formik?.handleChange} disabled={false}
                     touched={formik?.touched?.username} error={formik?.errors?.username} blur={formik?.handleBlur}/>

                    <CustomInput label='Password' name='password' type="password"
                     value={formik?.values?.password} handleChange={formik?.handleChange} disabled={false}
                     touched={formik?.touched?.password} error={formik?.errors?.password} blur={formik?.handleBlur}/>
            </div>
                                      
            <div className='d-flex justify-content-center mt-3 gap-4'>  
                    <ConfigProvider
                    button={{
                        className: styles?.linearGradientButtonSave,
                    }}
                    >
                        <Button type='primary' htmlType='submit'>
                        {getConnectionName !== null ? 'Update' : 'Save'}
                        </Button>  
                    </ConfigProvider>
                   
                        <Button onClick={() => navigate("/connections/view-connections")} type='primary' danger>
                            Cancel
                        </Button>
            </div>   
                </form>   
            </div>  
        </div>   
        </Spin>
    );  
}  

export default HanaForm;