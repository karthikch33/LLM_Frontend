import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {  Link, useLocation, useNavigate } from 'react-router-dom';
import {  Button, Input, message, Spin } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createBussinessRulesSlice, getSingleBussinessRulesSlice, updateBussinessRulesSlice, uploadFileNameFetchSlice } from '../../features/BussinessRules/BussinessRulesSlice';
import CustomInput from "../CustomInput"

const CreateBussinessRules = () => {


    const navigate = useNavigate();  
    const [uploadedFileName, setUploadedFileName] = useState('');  
    const [messageApi, contextHolder] = message.useMessage();
    const [file, setFile] = useState(null);  
    const [loading, setLoading] = useState(false);
    const validObjectNames = ['Product','Customer','Address','Email Information','Company Information','Basic User Information','Job Relations Information','Job Information','Employment Information','Emergency Contact',
        'Supplier',
        'Purchase Info Records',
        'Source List',
        'Contracts',
        'Scheduling Agreements',
        'Sales Order',
        'Purchase Order',
        'Inventory',
        'Customer Material Info Records',
        'Production Version',
        'Equipment',
        'Functional Location'];


    const location = useLocation();
    const operation = location.pathname.split('/')[2] || null;
    const getObjectId = location.pathname.split('/')[3] || null; 
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
            if (validObjectNames.find((name) => name === values.data_object_name.trim())) {  
                operation === 'create'  ? createBussinessRules(values) : updateBussinessRules(values);  
            }   
            else {  
                messageApi.error('Invalid Data Object Name');  
            }  
        }  
    });  

    const updateBussinessRules = (values)=>{
        if(!file) return;
        const formData = new FormData();
        formData.append('file',file);
        formData.append('obj_name',values.data_object_name);
        formData.append('object_id',getObjectId);
        formData.append('file_name',file?.name.toString());
        formData.append('project_id',values?.project_id);
        setLoading(true);

        dispatch(updateBussinessRulesSlice(formData))
        .then((response)=>{
            if(response?.payload?.status === 200){
                toast.success(`${response?.payload?.data?.obj_name} is Updated Successfully`);
                setTimeout(()=>{
                    navigate('/bussinessrules/manage');
                },2000)
            }
            else if(response?.payload?.status === 406){
                toast.info(`Data Object Name Exists`);
            }
            else if(response?.payload?.status === 404){
                toast.info(`Updation Failed`);
            }
            else{
                toast.error('Updation Failed'); 
            }
            setLoading(false);
        })
    }

    const createBussinessRules = (values)=>{
        if(!file) return;
        const formData = new FormData();
        formData.append('file',file);
        formData.append('template_name',values.filePath);
        formData.append('project_id',getObjectId);
        formData.append('obj_name',values?.data_object_name);
        setLoading(true);

        
        dispatch(createBussinessRulesSlice(formData))
        .then((response)=>{
            if(response?.payload?.status === 200){
                toast.success(`${response?.payload?.data?.obj_name} is Created Successfully`);
                setTimeout(()=>{
                    navigate('/bussinessrules/manage');
                },2000)
            }
            else if(response?.payload?.status === 406){
                toast.info(`Data Object Name Exists`);
            }
            else if(response?.payload?.status === 404){
                toast.error(`Creation Failed`);
            }
            else{
                toast.error('Creation Failed');
            }
            setLoading(false);
        })
    }

    useEffect(()=>{
        if(getObjectId !== null && operation === 'reupload')
        dispatch(getSingleBussinessRulesSlice({obj_id : getObjectId}))
        .then((response)=>{
            if(response?.payload?.status === 200){
                console.log(response?.payload?.data);
                formik.setFieldValue('data_object_name', response?.payload?.data?.obj_name);  
                formik.setFieldValue('project_id', response?.payload?.data?.project_id);  
                formik.setFieldValue('filePath', response?.payload?.data.template_name);  
                setFile(response?.payload?.data?.file);
            }
        })
    },[getObjectId])


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const uploadedFileExtension = selectedFile ? selectedFile?.name.split('.')[1].toLowerCase() : null;
        
        if(uploadedFileExtension === 'xlsx' || uploadedFileExtension === 'xls')
        {
            setUploadedFileName(selectedFile?.name);
            setFile(selectedFile);  
            formik.setFieldValue('filePath', selectedFile?.name);

            const formData = new FormData();
            formData.append('file',selectedFile);


            dispatch(uploadFileNameFetchSlice(formData))
            .then((response)=>{
                if(response?.payload?.data){
                    formik.setFieldValue('data_object_name', response?.payload?.data);
                }
                else if(response?.payload?.status === 415){
                    toast.error(`Please Upload Only DMC File`);
                }
            })
        }
        else{
            toast.error('UnSupported File Format Only xlsx or xls')
        }
    };  

    const handleExport = ()=>{
        const link = document.createElement('a');
        link.href = `https://go.microsoft.com/fwlink/?LinkID=521962`;
        // link.href = `${process.env.PUBLIC_URL}/myfile.xlsx`;
        link.setAttribute('download', 'myfile.pdf'); 
        console.log(link);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

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
                        <h3 className="text-center">{operation === 'create' ? 'Create' : 'Reupload'} Data Mapping Rules</h3>  
                        <form onSubmit={formik.handleSubmit} className="form-container">   

                        <CustomInput label='Data Object Name' name='data_object_name' value={formik?.values?.data_object_name}
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
                            <Link onClick={handleExport}>Download Sample DMC </Link> 
                            <div className='d-flex justify-content-around mt-3 gap-3'>  
                                <Button type='primary' htmlType='submit'>{operation === 'create' ? 'Upload' : 'ReUpload'}</Button>  
                                <Button type='primary' onClick={() => navigate("/bussinessrules/manage")} danger>Cancel</Button>  
                            </div>  
                        </form>    
                    </div>  
                </div>   
            </div>  
        </Spin>  
    );
}

export default CreateBussinessRules