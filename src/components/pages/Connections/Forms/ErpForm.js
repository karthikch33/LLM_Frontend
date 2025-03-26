import React, { useEffect, useState } from 'react';  
import {  Button, input, Select, message, Form , Space, Input, ConfigProvider, Spin} from 'antd';
import { ErrorMessage, useFormik } from "formik";  
import * as yup from 'yup';  
import { useLocation, useNavigate } from 'react-router-dom';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import { useDispatch, useSelector } from 'react-redux';
import { checkConnectionSlice, saveConnectionSlice, singleGetConnectionSlice, updateConnectionSlice } from '../../../features/Connections/connectionSlice';
import { toast, ToastContainer } from 'react-toastify';
import { createStyles } from 'antd-style';
import CustomInput from "../../CustomInput";
import { CustomSelectProject } from '../../CustomSelect';

const ErpForm = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  
    const location = useLocation();  
    const dispatch = useDispatch();

    const projects = useSelector(state => state.project.projects);  

    // Extracting connection details from URL  
    const getConnectionName = location.pathname.split('/')[3] || null;  
    const getProjectId = location.pathname.split('/')[4] || null;

    useEffect(()=>{
        setAllProjects(projects);
    },[projects])
 
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

    // Validation Schema  
    const schema = yup.object().shape({  
        project_id: yup.string().required('Project Selection Required'),  
        connection_name : yup.string().required('Connection Name Required')
        .matches(/^(?!_)(?!.*_$)[a-zA-Z0-9_]+$/, 'Invalid Connection Name'), 
        host: yup.string()  
        .matches(  
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,   
          'Must be a valid IP address'  
        ).required('Provide Host Number'),
        sysnr: yup.number('Must Be a number').required('System Number Required'),  
        client: yup.number().required('Client Required'),  
        username: yup.string().required('Username Required')
        .matches(/^(?!_)(?!.*_$)[a-zA-Z0-9_]+$/, 'Invalid Username Name'),
        password: yup.string().required('Password Required'),  
    });
    
    const formik = useFormik({  
        initialValues: {  
            project_id: "",  
            connection_name: "",  
            connection_type: "",  
            host: "34.194.191.113",  
            sysnr: "01",  
            client: "100",  
            username: "",  
            password: "",  
            status: "Inactive",   
        },  
        validationSchema: schema, 
        validateOnChange: true,
        validateOnBlur: true, 
        onSubmit: async (values) => {
            setLoading(true);
            dispatch(checkConnectionSlice(values))  
            .then((response) => {  
                    if (response?.payload?.status === 404) {
                    const popUpClose = messageApi?.error(  
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
            }
            )   
            .catch(()=>{
                toast.error('Connection Failed')
            })
            .finally(()=>{
                setLoading(false);
            })
        }  
    }); 
    
        // Save connection  
    const saveConnection = async (values) => {  
            dispatch(saveConnectionSlice({...values,connection_type:"Erp"}))
            .then((response)=>{
                if(response?.payload?.status === 201){
                    toast.success(`${response?.payload?.data?.connection_name} Created Successfully`);
                    setTimeout(()=>{
                        navigate('/connections/view-connections')
                    },2000)
                }
                else if(response?.payload?.status === 406)
                {
                    toast.error(`Connection Already Exists`);
                }
                else{
                    toast.error('Connection Creation Failed');
                }
            })
        };  
    
        // Update connection  
    const updateConnection = async (values) => {  
           dispatch(updateConnectionSlice({...values,connection_type:"Erp"}))
           .then((response)=>{
            if(response?.payload?.status === 202){
                toast.success(`${response?.payload?.data?.connection_name} Updated Successfully`);
                setTimeout(()=>{
                    navigate('/connections/view-connections')
                },2000)
    
            }
            else if(response?.payload?.status === 406)
            {
                toast.error(`Connection Already Exists`);
            }
            else{
                toast.error('Connection Creation Failed');
            }
        })
        };  

    // Fetch connection details if editing  
    const fetchConnection = async () => { 
        const singleConnectionData = {
            project_id : getProjectId,
            connection_name : getConnectionName
        } 
        dispatch(singleGetConnectionSlice(singleConnectionData))
        .then((response)=>{
            console.log(response);
            if(response?.payload?.status === 200)
            {
                const connectionDetails = response?.payload?.data
                formik.setValues({  
                    project_id: connectionDetails?.project_id,  
                    connection_name: connectionDetails?.connection_name,  
                    connection_type: connectionDetails?.connection_type,  
                    host: connectionDetails?.host,  
                    sysnr: connectionDetails?.sysnr,  
                    client: connectionDetails?.client,  
                    username: connectionDetails?.username,  
                    password: "",
                    status: connectionDetails?.status,
                });
            }
            else 
            {
                navigate('/pagenotfound')
            }
        })    
    };

    const handleProjectChange = (e)=>{
        formik.setFieldValue('project_id',e);
    }

    return (  
        <Spin tip='Connecting To SAP...' spinning={loading}>
        {contextHolder}
        <ToastContainer
          position='top-center'
          autoClose={1000}
          hideProgressBar={true}
          closeOnClick={true}
          newestOnTop={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          />
        <div className="d-flex justify-content-center align-items-center mt-4">  
            <div className="bg-light border rounded shadow" >  
                <h3 className="text-center mt-3"> SAP Connection</h3>  
                <form onSubmit={formik.handleSubmit} style={{width:"390px", paddingLeft:"30px", paddingRight:"15px",paddingBottom:"30px", paddingTop:"10px"}}>
                    <div style={{height:"330px",overflow:"auto"}}>
                    <CustomSelectProject  touched={formik?.touched?.project_id} error={formik?.errors?.project_id} 
                    value={formik?.values?.project_id} handleChange={handleProjectChange} disabled={false} projects={allProjects}/> 

                    <CustomInput label='Connection' name='connection_name' value={formik?.values?.connection_name}
                     handleChange={formik?.handleChange} disabled = {getConnectionName !== null} type="text" 
                     touched={formik?.touched?.connection_name} error={formik?.errors?.connection_name} blur={formik?.handleBlur}/>

                    <CustomInput label='Host' name='host' type="text"
                     value={formik?.values?.host} handleChange={formik?.handleChange} disabled={false}
                     touched={formik?.touched?.host} error={formik?.errors?.host} blur={formik?.handleBlur}/>

                    <CustomInput label='SYSNR' name='sysnr' type="text"
                     value={formik?.values?.sysnr} handleChange={formik?.handleChange} disabled={false}
                     touched={formik?.touched?.sysnr} error={formik?.errors?.sysnr} blur={formik?.handleBlur}/>

                    <CustomInput label='Client' name='client' type="text"
                     value={formik?.values?.client} handleChange={formik?.handleChange} disabled={false}
                     touched={formik?.touched?.client} error={formik?.errors?.client} blur={formik?.handleBlur}/>
                     
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
   
export default ErpForm;