import React, { useEffect, useState } from 'react';  
import { Button, message,Select,Spin } from 'antd';  
import { useFormik } from "formik";  
import * as yup from 'yup';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import { useDispatch, useSelector } from 'react-redux';
import { getFileSlice, uploadCsvSheetSlice, uploadExcelSheetSlice, uploadExcelSlice, uploadTxtSheetSlice } from '../../../features/Connections/fileSlice';
import CustomInput from "../../CustomInput";
import { CustomSelectFileType, CustomSelectProject, CustomSelectSheet } from '../../CustomSelect';
 
const FormFile = ({handleOk,loadFile}) => {
    const [allProjects, setAllProjects] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [fileType, setFileType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [sheets, setSheets] = useState([]);
    const dispatch = useDispatch();

    const projects = useSelector(state => state.project.projects);  

    useEffect(()=>{
        setAllProjects(projects);
    },[projects])

    const schema = yup.object().shape({  
        project_id: yup.string().required('Project Selection Required'),  
        fileName: yup.string()  
            .required('File Name Required')  
            .matches(/^(?!_)(?!.*_$)[a-zA-Z0-9_]+$/, 'Invalid File Name'),  
        tableName: yup.string()  
            .required('Table Name Required')  
            .matches(/^(?!_)(?!.*_$)[a-zA-Z0-9_]+$/, 'Invalid Table Name'),   
        file_type: yup.string().required('File Type Selection Required'),  
    });  
 
    const formik = useFormik({  
            initialValues: {  
                project_id: "",
                fileName: "",
                tableName: "",
                file_type: "",
                project_name:'',
                uploaded_fileName:'',
                selected_sheet: ''
            },
            validationSchema : schema,
            onSubmit : (values)=>{
                if(fileType === 'Excel'){
                    if(formik?.values?.selected_sheet) handleFormUploadExcel()
                    else message?.error('Sheet not Selected')
                }
                else if(fileType === 'Text') handleFormUploadText()
                else if(fileType === 'CSV') handleFormUploadCSV()
                else messageApi?.error('Undefined File Type')
            }
    });
    
    const handleFormUploadExcel = async() => {
        setLoading(true);
        if (!file) 
        {
            message?.error('File Not Attached')
            return;
        }    
        const formData = new FormData();
        formData?.append('projectID', formik?.values?.project_id);
        formData?.append('fileName', formik?.values?.fileName); // Append first string
        formData?.append('tableName', formik?.values?.tableName);
        formData?.append('sheet', formik?.values?.selected_sheet);
        formData?.append('file', file);
        
        dispatch(uploadExcelSheetSlice(formData))
        .then((response)=>{
            if(response?.payload?.status === 200){
                message?.success('File Uploded',1)
                handleOk();
                formik?.resetForm();
                
                setFileType(null);
                setFile(null);
                setSheets([]);
                setTimeout(()=>{
                    dispatch(getFileSlice()).then((response)=>{
                        if(response?.payload?.status === 200) loadFile(response);
                        else message?.error('Fetching Files Failed')
                    })
                },1000)
            }
            else message?.error('Error In Uploading File',1)
        })
        setLoading(false);
    }
 
    const  handleFormUploadCSV = async()=>{
        setLoading(true);
        if (!file)
        {
            message?.error('File Not Attached')
            return;
        }    
        const formData = new FormData();
        formData?.append('projectID', formik?.values?.project_id);
        formData?.append('fileName', formik?.values?.fileName);
        formData?.append('delimiter', formik?.values?.delimiter);
        formData?.append('tableName', formik?.values?.tableName);
        formData?.append('sheet', "N/A");
        formData?.append('file', file); 

        dispatch(uploadCsvSheetSlice(formData))
        .then((response)=>{
            if(response?.payload?.status === 200){
                messageApi?.success('File Uploaded')
                handleOk();
                setFileType(null);
                setFile(null);
                setSheets([]);
                formik?.resetForm();
                setTimeout(()=>{
                    dispatch(getFileSlice())
                    .then((response)=>{
                        if(response?.payload?.status === 200) loadFile(response);
                        else message?.error('Fetching Files Failed')
                    })
                 },1000)
            }
            else{
                messageApi?.error('Error Encountered')
            }
        })
        setLoading(false);
    }

    const handleFormUploadText = async()=>{
        if (!file) 
        {
            message?.error('File Not Attached');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData?.append('projectID', formik?.values?.project_id);
        formData?.append('fileName', formik?.values?.fileName);
        formData?.append('delimiter', formik?.values?.delimiter);
        formData?.append('tableName', formik?.values?.tableName);
        formData?.append('sheet', "N/A");
        formData?.append('file', file);
 
        dispatch(uploadTxtSheetSlice(formData))
        .then((response)=>{
            if(response?.payload?.status === 200){
                messageApi.success('File Upload')
                handleOk();
                formik?.resetForm();
                setFileType(null); 
                setFile(null);
                setSheets([]);
                setTimeout(()=>{
                    dispatch(getFileSlice())
                    .then((response)=>{
                        if(response?.payload?.status === 200) loadFile(response);
                        else message.error('Fetching Files Failed')
                    })
                },1000)
            }
            else{
                messageApi.error('Error Encountered')
            }
        })
        setLoading(false);
    }

    const handleFileChangeExcel = (event)=>{
        setLoading(true);
        const file = event?.target?.files[0];
        if (file) {
            if(file?.name?.split('.').pop() === 'xls' || file?.name?.split('.').pop() === 'xlsx'){
                const fileName = file?.name
                formik?.setFieldValue('uploaded_fileName',fileName);
                setFile(file);

                const formData = new FormData();
                formData?.append('file', file);
                dispatch(uploadExcelSlice(formData))
                .then((response)=>{
                    // here error must be handle
                    setSheets(response?.payload?.data);
                    const sheets = response?.payload?.response?.data[0];
                    formik.setFieldValue('selected_sheet',sheets);
                })
            }
            else{
                message?.error('Accepted extensions .xls or .xlsx');
            }
        }
        else 
        {
            message?.error('File Not Attached');
        }
        setLoading(false);
    }

    const handleFileChangeTextAndCsv = (event)=>{
        const file = event?.target?.files[0];
        if (file){
            if((file?.name?.split('.').pop() === 'txt' && fileType === 'Text') || (file?.name?.split('.').pop() === 'csv' && fileType === 'CSV')){
                const fileName = file?.name
                formik?.setFieldValue('uploaded_fileName',fileName);
                setFile(file);
            }
            else{
                message?.error(`Accepted Type ${fileType} `)
            }
        }
        else{
            message?.error('File Not Attached');
        }
    }

    const handleProjectChange = (e)=>{
        formik?.setFieldValue('project_id',e)
    }

    const handleSelectedSheet = (e)=>{
        formik?.setFieldValue('selected_sheet',e)
    }

    const handleFileType = (e)=>{
        formik?.setFieldValue('file_type', e);
        setFileType(e);
        setFile('');
        setSheets([]);  
        formik?.setFieldValue('selected_sheet','');
        formik?.setFieldValue('uploaded_fileName','');
    }
 
  return (
    <Spin spinning={loading} tip="Uploading...">
        {contextHolder}
        <h3 className="text-center"> File</h3>  
        <form onSubmit={formik.handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <CustomSelectProject  touched={formik?.touched?.project_id} error={formik?.errors?.project_id} 
        value={formik?.values?.project_id} handleChange={handleProjectChange} disabled={false} projects={allProjects}/>

        <CustomInput label='File Name' type="text" value={formik?.values?.fileName} name="fileName"
        handleChange={formik?.handleChange} blur={formik?.handleBlur} disabled={false} touched={formik?.touched?.fileName}
        error={formik?.errors?.fileName}/>

        <CustomInput label='Table Name' type="text" value={formik?.values?.tableName} name="tableName"
        handleChange={formik?.handleChange} blur={formik?.handleBlur} disabled={false} touched={formik?.touched?.tableName}
        error={formik?.errors?.tableName}/>

        <CustomSelectFileType value={formik?.values?.file_type} handleChange={handleFileType} 
        touched={formik?.touched?.file_type} error={formik?.errors?.file_type}/>
  
        <div className="row mb-3">  
        <label htmlFor="filePath" className="col-4 col-form-label">File Path</label>  
        <div className="col-8 d-flex align-items-center">  
            <input  
                className="form-control me-2"  
                value={formik?.values?.uploaded_fileName}  
                readOnly  
                style={{ flex: '1 1 auto' }} 
            />  
         { fileType &&  <input  
                type="file"  
                className="form-control"  
                hidden id="browse"  
                onChange={fileType === 'Excel' ? handleFileChangeExcel : handleFileChangeTextAndCsv}  
            />  }
       { fileType &&    <label htmlFor="browse" className="form-control btn btn-outline-secondary" style={{ marginLeft: '5px' }}>  
                Browse  
            </label> 
       } 
        </div>  
        </div>  

        {fileType === 'Excel' &&
        ( <CustomSelectSheet value={formik?.values?.selected_sheet} handleChange={handleSelectedSheet} sheets={sheets}
        touched={formik?.touched?.selected_sheet} error={formik?.errors?.selected_sheet}/>
        )}  

        {fileType === 'Text' && (  
        <CustomInput label='Delimiter' type="text" value={formik?.values?.delimiter} name="delimiter"
        handleChange={formik?.handleChange} blur={formik?.handleBlur} disabled={false} touched={formik?.touched?.delimiter}
        error={formik?.errors?.delimiter}/>
        )}
    
        <div className="d-flex justify-content-end" style={{ marginTop: "10px" }}>  
        {file && <Button type="primary" htmlType='submit'>Upload</Button>}  
        </div>  
    </form>
</Spin>
  )
}
 
export default FormFile