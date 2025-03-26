import React, { useEffect, useState } from 'react';  
import {  Table, Button, Radio, message, Modal, Input, Select } from 'antd';  
import CustomModel from './CustomModel';  
import { useNavigate } from 'react-router-dom';  
import {useFormik} from 'formik'
import * as yup from 'yup'
import { toast,ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteConnectionSlice, getConnectionSlice, renameConnectionSlice } from '../../../features/Connections/connectionSlice';
import CustomInput from "../../CustomInput";
import { CustomSelectManageProjects } from '../../CustomSelect';

const ViewConnection = () => {  

    const {Search} = Input;

    const [allProjects, setAllProjects] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedKey, setSelectedKey] = useState(null); 
    const [selectedRecord,setSelectedRecord] = useState(null);  
    const [selectProjectId,setSelectedProjectId] = useState(0);
    const [partialConnectionsData,setPartialConnectionsData] = useState([]);
    const [connectionsData,setConnectionsData] = useState([]);
    const [alertActive,setAlertActive] = useState(true);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);  
    const [openRenameModal, setOpenRenameModal] = useState(false);

    const navigate = useNavigate();   
    const dispatch = useDispatch();

    const projects = useSelector(state => state?.project?.projects);

    useEffect(() => { 
        loadConnections()
     }, []);

    useEffect(()=>{
        setAllProjects(projects);
    },[projects])

    const schema = yup.object({
        connection_name : yup.string().required('Connection Name Required')
                          .matches(/^(?!_)(?!.*_$)[a-zA-Z0-9_]+$/, 'Invalid Connection Name'),
    })

    const formik = useFormik({
        initialValues:{
            connection_name:"",
            project_id_select:""
        },
        validationSchema:schema,
        onSubmit:(values)=>{
            handleRename()
            formik?.resetForm();
        }
    })

    const loadConnections = ()=>{
        dispatch(getConnectionSlice())   
        .then((response)=>{
            if(response?.payload?.status === 200)
            { 
                const connections = response?.payload?.data;
                let filteredData = []
                if(selectProjectId)
                {
                    const project_id = Number(selectProjectId);
                    filteredData = connections?.filter(item => item?.project_id === project_id);
                }
                else filteredData = connections;
                setPartialConnectionsData(connections);
                setConnectionsData(filteredData);
            }
            else{
                message?.error('Failed to Load Connections');
            }
        })
    }

    const columns = [   
        {  
            title: 'Select',  
            dataIndex: 'selecteditem',  
            render: (text, record) => (  
                <div style={{display:'flex',justifyContent:'center'}}>
                <Radio  
                    checked={selectedKey === record?.id}  
                    onChange={() => handleRadioChange(record)}   
                />  
                </div>
            )  
        },  
        {  
            title: 'Connection Name',  
            dataIndex: 'connection_name',  
            key: 'connection_name',  
            render: (text, record) => (
                <button className="link-button" onClick={()=>getTables(record)} style={{width:"100%",background:'none',border:"none",padding:"0",textDecoration:"underline",textAlign:"start"}}>{record.connection_name}</button>                  
            )
        },  
        {  
            title: 'Connection Type',  
            dataIndex: 'connection_type',  
            key: 'connection_type',  
        },  
        {  
            title: 'Username',  
            dataIndex: 'username',  
            key: 'username',  
        },  
        {  
            title: 'Host',  
            dataIndex: 'host',  
            key: 'host',  
        },  
        {  
            title: 'Connection Status',  
            dataIndex: 'connection_status',  
            key: 'connection_status',  
            render: (i,record) => (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft:'18px' }}>  
                    <span className={`circle ${record?.status === "Active" ? 'green' : 'red'}`}></span>      
                    <p className='mb-2 ml-2'>{record?.status === "Active" ? 'Active' :'InActive'}</p>  
                </div>  
            ),   
        } 
    ];   
    
    const handleEditNavigation = ()=>{
        if(selectedRecord === null)
        {
            if(alertActive){
            messageApi?.info('Please Select a Connection')
            setAlertActive(false);
            setTimeout(()=>setAlertActive(true),3000);
            }
        }
        else{
            navigate(`/connections/${selectedRecord?.connection_type}/${selectedRecord?.connection_name}/${selectedRecord?.project_id}`);
        }
        setSelectedKey('');
        setSelectedRecord(null);
    }

    const handleConnectionDelete = ()=>{
        if(selectedRecord === null){
            if(alertActive){
                messageApi?.info('Please Select a Connection')
                setAlertActive(false);
                setTimeout(()=>setAlertActive(true),3000);
                }
        }
       else{
           setOpenDeleteModal(true);
       }
    }

    const handleConnectionRename = () => {  
        if(selectedRecord === null){
            if(alertActive){
                messageApi?.info('Please Select a Connection')
                setAlertActive(false);
                setTimeout(()=>setAlertActive(true),3000);
                }
        }
        else{
        formik?.setFieldValue('connection_name',selectedRecord?.connection_name);
        setOpenRenameModal(true);
        }
    };

    const handleValidateConnection = ()=>{ 
        // setSelectedKey('');
        // setSelectedRecord('');
    }
    
    const hideDeleteModal = () => {  
        setOpenDeleteModal(false);  
    };  

    const hideRenameModal = () => {  
        setOpenRenameModal(false);  
        formik?.resetForm();
    };
    
    const handleDelete = ()=>{
        dispatch(deleteConnectionSlice(selectedRecord))
        .then((response)=>{
            toast?.success(`${response?.payload.data} has been deleted`);
        })
        .catch((error)=>{
            toast?.error("Deletion Failed");
        })
        setTimeout(()=>{
            loadConnections()
        },1000)
        hideDeleteModal(false);
        setSelectedKey(null);
        setSelectedRecord(null);
    }

    const handleRename = ()=>{
        const rename_data = {
            re_val : formik?.values?.connection_name,
            ...selectedRecord
        }
        dispatch(renameConnectionSlice(rename_data))
        .then((response)=>{
            if(response?.payload?.status === 404){
                toast?.info(`Name Already Exists`);
            }
            else if(response?.payload?.status === 202){
                toast?.success(`${response?.payload?.data} Connection Renamed`);
                setTimeout(()=>{
                    loadConnections()
                },1000)
                hideRenameModal(false);
                setSelectedKey(null);
                setSelectedRecord(null);
            }
            else{
                toast?.error('Rename Failed');
                hideRenameModal(false);
                setSelectedKey(null);
                setSelectedRecord(null);
            }
        })
    }   

    const getTables = async (field)=>{
        if(field?.status==='InActive'){
            alert("Your Status is Inactive");
        }  
        else{
            if(field?.connection_type==='Erp'){
                 navigate(`/connections/view-tables/saptables/${field?.connection_name}/${field?.project_id}`);
            }
            else{
            navigate(`/connections/view-tables/${field?.project_id}/${field?.connection_name}`);
        }
    }
    }

    const handleSearch = (e)=>{
        let filteredData = []
        if(selectProjectId)
        {
            filteredData = partialConnectionsData?.filter(item => (
            item?.project_id === selectProjectId && (
                item?.connection_name?.toLowerCase()?.includes(e?.toLowerCase()) || item?.connection_type?.toLowerCase()?.includes(e?.toLowerCase()) ||
                item?.username?.toLowerCase()?.includes(e?.toLowerCase()) ||item?.host?.toLowerCase()?.includes(e?.toLowerCase()) )
            ))
        }
        else{
            filteredData = partialConnectionsData?.filter(item => (
                item?.connection_name?.toLowerCase()?.includes(e?.toLowerCase()) || item?.connection_type?.toLowerCase()?.includes(e?.toLowerCase()) ||
                item?.username?.toLowerCase()?.includes(e?.toLowerCase()) ||item?.host?.toLowerCase()?.includes(e?.toLowerCase()) )
            )
        }
        setConnectionsData(filteredData);
    }

    const handleSearchChange = (e)=>{
        if(!e?.target?.value){
            let filteredData = []
            const project_id = Number(selectProjectId);
            if(project_id) filteredData = partialConnectionsData?.filter(item => item?.project_id === project_id);
            else filteredData = partialConnectionsData
            setConnectionsData(filteredData);
        }
    }

    const handleProjectSelect = (e)=>{
        setSelectedProjectId(Number(e))
        if(e)
        {
            const project_id = Number(e);
            const filteredProjects = partialConnectionsData?.filter(item => item?.project_id === project_id);
            setConnectionsData(filteredProjects);
        }
        else setConnectionsData(partialConnectionsData);
        setSelectedKey(null)
        setSelectedRecord(null);
    }

    const handleRadioChange = (record) => {  
        setSelectedKey(record?.id); 
        setSelectedRecord(record);
    }; 

    return (  
        <div className='w-100 me-1'>  
            <ToastContainer
            position='top-center'
            autoClose={2500}
            hideProgressBar={false}
            closeOnClick
            newestOnTop={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
            />
            {contextHolder}
            <div className="container-fluid">  
                <div className="options_header" style={{ overflowX: "auto"}}>  
                    <label style={{ color: "skyblue", fontSize: "20px",marginRight:"10px"  }}>Connections</label> 
                    <CustomSelectManageProjects value={selectProjectId} handleChange={handleProjectSelect} projects={allProjects}/>   
                    <Button onClick={handleEditNavigation} style={{ fontSize: '14px', marginRight:"10px" }}>  
                        Edit  
                    </Button>  
                    <Button  onClick={handleConnectionDelete} style={{ fontSize: '14px', marginRight:"10px" }}>  
                        Delete  
                    </Button>  
                    <Button onClick={handleConnectionRename} style={{ fontSize: '14px', marginRight:"10px" }}>  
                        Rename  
                    </Button>  
                    <Button onClick={handleValidateConnection} style={{ fontSize: '14px', marginRight:"10px" }}>  
                        Validate Connection  
                    </Button>  
                    <Search  
                    placeholder="Search by Name, Type, Username, or Host"  
                    onSearch={(e) => handleSearch(e)}  
                    enterButton  
                    onChange={(e) => handleSearchChange(e)}  
                    style={{ minWidth: "300px", maxWidth: "300px", marginRight: "10px", marginBottom: "1px", maxHeight: "32px" }} />  
                </div>  
            </div>

            <Table  
                columns={columns}  
                dataSource={connectionsData} // Use the filtered data  
                pagination={{  
                    pageSize: 10,  
                }}  
                style={{overflowX:"auto",marginTop:"10px"}}
            />  


            <CustomModel
              title={<>Delete { selectedRecord?.connection_name !== undefined ?  <span style={{ color: "red",display:"inline" }}>"{` `} {selectedRecord?.connection_name}{` `} "</span>:''} {` `}Connection</>}
              hideModal={hideDeleteModal} 
              open={openDeleteModal}
              performAction = {handleDelete}
              onCancel={hideDeleteModal}
              okText="OK"
              cancelText="CANCEL"
            />

            <Modal
                title={<>Rename { selectedRecord?.connection_name !== undefined ?  <span style={{ color: "red",display:"inline" }}>"{` `} {selectedRecord?.connection_name}{` `} "</span>:''} {` `}Connection</>}
                open={openRenameModal}
                onOk={formik?.handleSubmit}
                onCancel={hideRenameModal}
                hideModal={hideRenameModal}
                okText="OK"
                cancelText="CANCEL"
            >
                <form onSubmit={formik?.handleSubmit}>
                <CustomInput label='Rename' type="text" value={formik?.values?.connection_name} name="connection_name"
                handleChange={formik?.handleChange} blur={formik?.handleBlur} disabled={false} touched={formik?.touched?.connection_name}
                error={formik?.errors?.connection_name}/> 
                </form>  
            </Modal>
        </div>  
    )
}
export default ViewConnection;