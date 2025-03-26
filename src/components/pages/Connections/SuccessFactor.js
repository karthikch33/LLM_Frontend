import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {  useLocation, useNavigate } from 'react-router-dom';
import {  Button, Input, message, Spin } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { reUploadSuccessFactorsSlice, saveSuccessFactorsSlice } from '../../features/Connections/connectionSlice';
import CustomInput from "../CustomInput";

const CreateSuccessFactor = () => {
    const navigate = useNavigate();  
    const [uploadedFileName, setUploadedFileName] = useState('');  
    const [messageApi, contextHolder] = message.useMessage();
    const [file, setFile] = useState(null);  
    const [loading, setLoading] = useState(false);
    
    const location = useLocation();
    const operation = location.pathname.split('/')[3] || null;
    const projectId = location.pathname.split('/')[4] || null; 
    const dispatch = useDispatch();


    const formik = useFormik({  
        initialValues: {  
            data_object_name: '',  
            filePath: '',
            project_id:''
        },  
        validationSchema: Yup.object({  
            data_object_name: Yup.string().required('Required'),  
            filePath: Yup.string().required('File is required'),  
        }),  
        onSubmit: (values) => {   
                operation === 'upload'  ? createSuccessFactor(values) : updateSuccessFactor(values);
        }  
    });  

    const updateSuccessFactor =async (values)=>{
        if(!file) return;
        const formData = new FormData();
        formData.append('file',file);
        formData.append('template_name',values?.data_object_name);
        setLoading(true);
        
        const data = {
            projectId : projectId,
            formData : formData
        }

        dispatch(reUploadSuccessFactorsSlice(data))
        .then((response)=>{
            if(response.payload?.status === 200)
            {
                message.success('Uploaded')
                navigate('/connections/manage/success-factors')
            }
            else if(response.payload?.status === 406)
            {
                message?.error('Not Acceptable')
            }
            else{
                message?.error('Error')
            }
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    const createSuccessFactor =async (values)=>{
        if(!file) return;
        const formData = new FormData();
        formData.append('file',file);
        formData.append('template_name',values?.data_object_name);
        formData.append('project_id',projectId);
        setLoading(true);

        const data = {
            formData : formData
        }

        dispatch(saveSuccessFactorsSlice(data))
        .then((response)=>{
            if(response.payload?.status === 200)
            {
                message.success('Uploaded')
                navigate('/connections/manage/success-factors')
            }
            else if(response.payload?.status === 406)
            {
                message.error('Not Acceptable')
            }
            else{
                message.error('Error')
            }
        })
        .finally(()=>{
            setLoading(false);
        })
        
    }


    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        const uploadedFileExtension = selectedFile ? selectedFile?.name.split('.')[1].toLowerCase() : null;
        
        if(uploadedFileExtension === 'csv')
        {
            setUploadedFileName(selectedFile?.name);
            setFile(selectedFile);  
            formik.setFieldValue('filePath', selectedFile?.name);
            formik.setFieldValue('data_object_name', selectedFile?.name.split('.')[0]);
        }
        else{
            toast.error('UnSupported File Format Only xlsx or xls')
        }
    };  

    return (  
        <Spin spinning={loading} tip="Uploading...">  
        {contextHolder}
            <div className='p-2 m-2'>  
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
                    <div className="bg-light border rounded shadow p-4" style={{ width: "500px" }}>  
                        <h3 className="text-center">{operation === 'reupload' ? "ReUpload" + " Success Factors" : "Upload" + " Success Factors"}</h3>  
                        <form onSubmit={formik.handleSubmit} className="form-container">

                        <CustomInput label='Template Name' name='data_object_name' value={formik?.values?.data_object_name}
                     handleChange={formik?.handleChange} disabled = {false} type="text" 
                     touched={formik?.touched?.data_object_name} error={formik?.errors?.data_object_name} blur={formik?.handleBlur}/> 

                    <div className="row my-3">  
                        <label htmlFor="filePath" className="col-sm-4 col-form-label">File Path</label>  
                        <div className="col-sm-8 d-flex align-items-center">  
                            <input  
                                className="form-control me-2"  
                                value={uploadedFileName}  
                                readOnly  
                                name="filePath"
                                style={{ flex: '1 1 auto' }}   
                            />  
                            <input  
                                type="file"  
                                className="form-control"  
                                hidden id="browse"  
                                onChange={handleFileChange}  
                            />  
                            <label htmlFor="browse" className="form-control btn btn-outline-secondary" style={{ marginLeft: '5px', cursor: 'pointer' }}>  
                                Browse    
                            </label>  
                        </div>  
                            </div>  
                            {formik.touched.filePath && formik.errors.filePath && (  
                                <div className="error">{formik.errors.filePath}</div>  
                            )}
    
                            <div className='d-flex justify-content-around mt-3 gap-3'> 
                            <Button type='primary' htmlType='submit'>{operation === 'create' ? 'ReUpload' : 'Upload'}</Button>  
                            <Button type='primary'  onClick={() => navigate("/connections/manage/success-factors")} danger>Cancel</Button>   
                            </div>  
                        </form>    
                    </div>  
                </div>   
            </div>  
        </Spin>  
    );
}

export default CreateSuccessFactor;