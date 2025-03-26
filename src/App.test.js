// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


// import { useFormik } from 'formik';
// import React, { useCallback, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { createSaveRulesSlice, createVersionRulesSlice, getBussinessRulesSlice, getDataSegmentsSlice, getFetchRulesSlice, getFieldsOnSegmentSlice, getVersionNumberSlice, getVersionRulesSlice } from '../../features/BussinessRules/BussinessRulesSlice';
// import { Button, Form, Input, Select, Spin, Switch, Table, Tooltip } from 'antd';
// import { Option } from 'antd/es/mentions';
// import { IoArrowBackCircleSharp } from "react-icons/io5";
// import {EditableField, EditableArea} from './EditableCell';
// import { useLocation,useNavigate } from 'react-router-dom';
// import { LuSave } from "react-icons/lu";
// import { message } from 'antd';
 
// const ViewBussinessRule = () => {
//     const { Search } = Input;
 
//     const projects = useSelector(state => state.project.projects);
//     const [allProjects,setAllProjects] = useState([]);
//     const [spinner,setSpinner] = useState(false);
//     const [editable, setEditable] = useState(true);
//     const [dataSource,setDataSource] = useState([]);
//     const [messageApi, contextHolder] = message.useMessage();
//     const [alertActive,setAlertActive] = useState(true);
//     const [searchText, setSearchText] = useState('');
//     const [expanded, setExpanded] = React.useState(false);
//     const [rules, setRules] = useState(null);
//     const [rulesSearch,setRulesSearch] = useState(null);
//     const [tip,setTip] = useState('');
   
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const project_details = location?.pathname?.split('/')[3];
//     const object_details = location?.pathname?.split('/')[4];
//     const object_id = object_details?.split('&&')[0];
//     const object_name = object_details?.split('&&')[1];
//     const project_id = project_details?.split('&&')[0];
//     const project_name = project_details?.split('&&')[1];
 
//     useEffect(() => {
//         const handleBeforeUnload = (event) => {
//             event.preventDefault();
//             event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
//         };
//         window.addEventListener('beforeunload', handleBeforeUnload);
//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//         };
//     }, []);
   
 
//     useEffect(()=>{
//         formik.setFieldValue('current_project',project_name);
//         formik.setFieldValue('selected_project',project_id);
//         setExpanded(false);
//         dispatch(getBussinessRulesSlice({ obj_id: project_id }))  
//         .then((response) => {  
//             formik.setFieldValue('objects', response?.payload?.data);  
//         })  
//         .catch((error) => {  
//             console.error("Error fetching business rules:", error);  
//         });  
//     },[project_id])
 
//     useEffect(()=>{
//         formik.setFieldValue('current_object',object_name)
//         formik.setFieldValue('selected_object',object_id)
//         setExpanded(false);
//         const data = {
//             project_id,
//             object_id
//         }
//         dispatch(getDataSegmentsSlice(data))
//         .then((response)=>{
//             formik.setFieldValue('segments', response?.payload?.data);  
//         })
//     },[object_id])
 
//     const formik = useFormik({
//         initialValues:{
//             objects:'',
//             segments:'',
//             versions:'',
//             selected_project:'',
//             selected_object : '',
//             selected_version: '',
//             selected_segment: '',
//             current_project : '',
//             current_object : '',
//             current_version:''
//         },
//     })
 
//     useEffect(()=>{
//         setAllProjects(projects)
//     },[projects])
 
//     const handleInputChange = (index, field, value) => {
//         const updatedRules = [...rules];
//         updatedRules[index-1][field] = value;
//         updatedRules[index-1]['check_box']=true;
//         if(field === 'data_mapping_type' || field === 'rule_status')
//         {
//             setRules(updatedRules);
//         }
//     };
 
 
//     const handleProjectChange = (value) => {  
//         formik.setFieldValue('selected_project', value);
//         formik.setFieldValue('current_project',value);  
//         formik.setFieldValue('selected_object', '');  
//         formik.setFieldValue('current_object', '');  
//         formik.setFieldValue('selected_version', null);  
//         formik.setFieldValue('current_version', '');  
//         formik.setFieldValue('selected_segment', '');
//         formik.setFieldValue('objects',[]);
//         formik.setFieldValue('segments',[]);
//         formik.setFieldValue('versions',[]);
//         setExpanded(false);
//         setRules(null)
 
   
//         dispatch(getBussinessRulesSlice({ obj_id: value }))  // we are project id only but it is named has obj_id
//             .then((response) => {  
//                 formik.setFieldValue('objects', response?.payload?.data);  
//             })  
//             .catch((error) => {  
//                 console.error("Error fetching business rules:", error);  
//             });  
//     };  
 
 
//     const handleObjectChange = (value) =>{
//         // alert(value);
//         formik.setFieldValue('selected_segment', '');
//         formik.setFieldValue('selected_version', null);  
//         formik.setFieldValue('current_version', '');
//         formik.setFieldValue('selected_object',value);
//         formik.setFieldValue('current_object', value);
//         formik.setFieldValue('segments',[]);
//         formik.setFieldValue('versions',[]);
//         setExpanded(false);
//         setRules(null);
 
//         const data = {
//             project_id : formik.values.selected_project,
//             object_id : value
//         }
//         dispatch(getDataSegmentsSlice(data))
//         .then((response)=>{
//             formik.setFieldValue('segments', response?.payload?.data);  
//         })
//       };
 
 
//     const handleSegmentChange  = (value)=>{
//         formik.setFieldValue('selected_version',null);
//         formik.setFieldValue('current_version', '');
//         formik.setFieldValue('selected_segment', value);
//         formik.setFieldValue('versions',[]);
//         setExpanded(false);
//         setRules('');
//         setEditable(false);
//         setSpinner(true);
//         setTip('Fetching...');
 
//         const data = {
//             project_id : formik.values.selected_project,
//             object_id : formik.values.selected_object,
//             segment_id : value
//         }
 
//         dispatch(getFieldsOnSegmentSlice(data))
//         .then((response)=>{
//             const fieldsData = response?.payload?.data
//             // need to handle responses based on response call another api here even went wrong calling the api now
 
//             dispatch(getFetchRulesSlice(data))
//             .then((response)=>{
//                 if(response?.payload?.status === 200)
//                 {
//                     setRules(response?.payload?.data);
//                 }
//                 else if(response?.payload?.status === 404)
//                 {
//                 const mergedFields = []
//                 fieldsData && fieldsData.forEach((field)=>{
//                     mergedFields.push({
//                         version_id : 0 ,
//                         source_table: '',
//                         source_field_name: '',
//                         data_mapping_type:'',
//                         data_mapping_rules: '',
//                         project_id : formik.values.selected_project,
//                         object_id :formik.values.selected_object,
//                         field_id : field?.field_id,
//                         segment_id : value,
//                         target_sap_table: field?.sap_structure,
//                         target_sap_field: field?.fields,
//                         text_description: field?.description,
//                         lookup_table: "",
//                         last_updated_by: 'System',
//                         last_updated_on:'',
//                         rule_status: '',
//                         check_box: false,
//                         isMandatory : field?.isMandatory
//                     })
//                 })
//                 setRules(mergedFields);
//             }
//             getVersionsObject(value)
//         })
//     })
//     formik.setFieldValue('current_version','In Process');
//     setSpinner(false);
     
//     }
 
//     const handleVersionChange = (value)=>{
//         setEditable(true);
//         setExpanded(false);
//         formik.setFieldValue('selected_version',value);
//         formik.setFieldValue('current_version',value);
//         if(value === 'X'){
//             setEditable(false);
//             const data = {
//                 project_id : formik.values.selected_project,
//                 object_id : formik.values.selected_object,
//                 segment_id : formik.values.selected_segment
//              }
//             fetchSaveRules(data);
//         }
//         else{
//             const data = {
//                 project_id : formik.values.selected_project,
//                 object_id : formik.values.selected_object,
//                 segment_id : formik.values.selected_segment,
//                 verison_number : value
//             }
//             dispatch(getVersionRulesSlice(data))
//             .then((resposne)=>{
//                 if(resposne?.payload?.status === 200){
//                     setRules(resposne?.payload?.data)
//                 }
//             })
//             formik.setFieldValue('selected_version',value);
//             formik.setFieldValue('current_version',value);
//         }          
//     }
 
//     const handleSubmit = () => {
//         new Promise((resolve) => {
//             setSpinner(true);
//             setTip('Saving...');
//             resolve();
//         }).then(() => {
//             dispatch(createSaveRulesSlice(rules)).then((response) => {
//                 if (response?.payload?.status === 200) {
//                     const data = {
//                         project_id: formik.values.selected_project,
//                         object_id: formik.values.selected_object,
//                         segment_id: formik.values.selected_segment
//                     };
//                     fetchSaveRules(data);
//                     setExpanded(false);
//                     message.success('In Process Version Changes Saved');
//                 } else {
//                     message.error('Error in Saving');
//                 }
//                 setSpinner(false);
//             });
//         });
//     };
 
//     const handleVersion = () => {
//         new Promise((resolve) => {
//             setSpinner(true);
//             setTip('Creating Version...');
//             resolve();
//         }).then(() => {
//                 console.log(rules)
//                 dispatch(createSaveRulesSlice(rules)).then(  (response) => {
//                     if (response?.payload?.status === 200) {
//                         dispatch(createVersionRulesSlice(rules)).then((response) => {
//                             if (response?.payload?.status === 201) {
//                                 formik.resetForm();
//                                 setSpinner(false);
//                                 setExpanded(false);
//                                 setRules('');
//                                 message.success("Version " + response?.payload?.data[0]?.version_id + " Created Successfully");
//                             } else {
//                                 message.error("Failed to Create new version");
//                                 setSpinner(false);
//                             }
//                         })
                       
 
//                     } else {
//                         message.error('Error in Saving While Creating Version');
//                         setSpinner(false);
//                     }
//                 });
//         });
//     };
 
//     const getVersionsObject = (value)=>{
//         const data = {
//             project_id : formik.values.selected_project,
//             object_id  : formik.values.selected_object,
//             segment_id : value
//         }
//         dispatch(getVersionNumberSlice(data))
//         .then((response)=>{
//             formik.setFieldValue('versions',response?.payload?.data);
//         })
       
//     }
 
//     const fetchSaveRules = (data)=>{
//         setSpinner(true);
//         setTip('Fetching...')
//         dispatch(getFetchRulesSlice(data))
//         .then((response)=>{
//             if(response?.payload?.status === 200){
//                 console.log(response?.payload?.data);
//                 setRules(response?.payload?.data)
//             }
//         })
//         setSpinner(false);
//     }
 
//     const columns = [  
//         // {  
//         //     title: 'Rule',  
//         //     dataIndex: 'displayIndex',  
//         //     key: 'displayIndex',  
//         // },  
//         {  
//             title: 'Source Table',  
//             dataIndex: 'source_table',  
//             key: 'source_table',  
//             render: (_,record) => (  
//                 <EditableField  
//                     value={record.source_table}  
//                     onUpdate={(newValue) => handleInputChange(record?.displayIndex, 'source_table', newValue)}
//                     disabled={editable}
//                 />  
//             )  
//         },  
//         {  
//             title: 'Source Field Name',  
//             dataIndex: 'source_field_name',  
//             key: 'source_field_name',  
//             render: (_, record) => (  
//                 <EditableField  
//                     value={record.source_field_name}  
//                     onUpdate={(newValue) => handleInputChange(record?.displayIndex, 'source_field_name', newValue)}
//                     disabled={editable}  
//                 />
//             )  
//         },  
//         {  
//             title: 'Data Mapping Type',  
//             dataIndex: 'data_mapping_type',  
//             key: 'data_mapping_type',  
//             render: (_, record) => (  
//                 <div style={{ padding: 10 }}>  
//                     <Select  
//                         onChange={(value) => handleInputChange(record?.displayIndex, 'data_mapping_type', value)}  
//                         style={{ width: 100 }}
//                         value={record?.data_mapping_type}
//                         disabled={editable}
//                     >  
//                         <Option value='1:1'>1:1</Option>  
//                         <Option value='Constant'>Constant</Option>  
//                         <Option value='LLM'>LLM</Option>  
//                     </Select>  
//                 </div>  
//             )  
//         },  
//         {  
//             title: 'Rules',  
//             dataIndex: 'data_mapping_rules',  
//             key: 'data_mapping_rules',  
//             render: (_, record) => (  
//                     <EditableArea
//                      value={record?.data_mapping_rules}
//                      disabled={editable}
//                      onUpdate={(newValue)=>handleInputChange(record?.displayIndex,'data_mapping_rules',newValue)}
//                     />
//             )  
//         },  
//         {  
//             title: 'Target SAP Table',  
//             dataIndex: 'target_sap_table',  
//             key: 'target_sap_table',  
//         },  
//         {  
//             title: 'Target SAP Field',  
//             dataIndex: 'target_sap_field',  
//             key: 'target_sap_field',  
//         },  
//         {  
//             title: 'Text Description',  
//             dataIndex: 'text_description',  
//             key: 'text_description',  
//         },  
//         {  
//             title: 'Look Up Table',  
//             dataIndex: 'lookup_table',  
//             key: 'lookup_table',  
//             render: (_, record) => (  
//                 <EditableField      
//                 value={record.lookup_table}  
//                 disabled={editable}
//                 onUpdate={(newValue) => handleInputChange(record?.displayIndex, 'lookup_table', newValue)}  
//             />
//             )  
//         },  
//         {  
//             title: 'Rule Status',  
//             dataIndex: 'rule_status',  
//             key: 'rule_status',  
//             render: (_, record) => (  
//                 <div style={{ padding: 10 }}>  
//                     <Select  
//                     disabled={editable}
//                         value={record?.rule_status}  
//                         onChange={(value) => handleInputChange(record?.displayIndex, 'rule_status', value)}  
//                         style={{ width: 100 }}  
//                     >  
//                         <Option value='Completed'>Completed</Option>  
//                         <Option value='In Progress'>In Progress</Option>  
//                         <Option value='To Start'>To Start</Option>  
//                         <Option value='On Hold'>On Hold</Option>  
//                     </Select>  
//                 </div>  
//             )  
//         }  
//     ];  
   
//     const createDataSourceExpand = () => {  
//         setExpanded(!expanded);  
//         setSpinner(true);
//         const updatedValues = [];  
//         rules && rules.forEach((rule, index) => {  
//             updatedValues.push({ ...rule, displayIndex: index + 1 });  
//         });  
 
//         if(!expanded){
//             setDataSource(updatedValues);
//             setSpinner(false);
//             return;
//         }
//         const temp = updatedValues.filter((record) => record?.isMandatory === 'True');
//         setSpinner(false);
//         setDataSource(temp);  
//     };

//     const createDataSource = (expanded) => 
//     {
//         setTip('Fetching..')
//         const updatedValues = []
//         rules &&  rules.forEach((rule, index) => {  
//             updatedValues.push({...rule,  displayIndex: index + 1})
//         });
//         if(expanded){
//          return updatedValues
//         }
//         const temp = updatedValues.filter((record)=> record?.isMandatory ==='True')
//         return temp;
//     };
 
 
//     useEffect(()=>{
//         const updatedValues = createDataSource(true);
//         const filteredData = updatedValues && updatedValues.filter(item => (
//             item?.target_sap_field?.toLowerCase().includes(searchText.toLowerCase()) ||
//             item?.target_sap_table?.toLowerCase().includes(searchText.toLowerCase())
//         ));
//         setRulesSearch(filteredData)
//     },[rules])

//     const handleSearch = (e)=>{
//         setSearchText(e)
//         const updatedValues = createDataSource(true);
//         const filteredData = updatedValues && updatedValues.filter(item => (
//             item?.target_sap_field?.toLowerCase().includes(e.toLowerCase()) ||
//             item?.target_sap_table?.toLowerCase().includes(e.toLowerCase())
//         ));
//         setRulesSearch(filteredData)
//     }

//     const handleSearchChange = (e)=>
//         {
//         // setSearchText(e.target.value)
//         if(!e.target.value)
//         {
//             const updatedValues = createDataSource(true);
//             const filteredData = updatedValues && updatedValues.filter(item => (
//                 item?.target_sap_field?.toLowerCase().includes(e?.target?.value?.toLowerCase()) ||
//                 item?.target_sap_table?.toLowerCase().includes(e?.target?.value?.toLowerCase())
//             ));
//             setRulesSearch(filteredData)
//         }
//     }
 
//     // const filteredData = dataSource && dataSource.filter(item => (
//     //     item?.target_sap_field?.toLowerCase().includes(searchText.toLowerCase()) ||
//     //     item?.target_sap_table?.toLowerCase().includes(searchText.toLowerCase())
//     // ));
 
//   return (
//     <Spin spinning={spinner} tip={tip}>
//         {contextHolder}
//     <div className='container'>
//         <div className="filters mt-3">
//             <Form className='options_header'>
//                 <Form.Item style={{marginRight:10}}>
//                 <IoArrowBackCircleSharp style={{fontSize:"20px",cursor:"pointer"}} onClick={()=>navigate('/bussinessrules/manage')}/>
//                 </Form.Item>
//                 <Form.Item label='Project' className='' style={{minWidth: 160, maxWidth: 160,marginRight:10 }}>
//                     <Select
//                     style={{ width: 100}}
//                     onChange={handleProjectChange}
//                     key={formik.values.current_project || undefined}
//                     value={formik.values.current_project || undefined}
//                     >
//                         {
//                             allProjects && allProjects.map((project)=>{
//                                 return <Option
//                                  key={project?.project_id}
//                                  value={project?.project_id}
//                                 >
//                                    {project?.project_name}
//                                 </Option>
//                             })
//                         }
//                     </Select>
//                 </Form.Item>
//                 <Form.Item label='Object' className='' style={{ minWidth: 160, maxWidth: 160, marginRight:10 }}>
//                         <Select
//                         style={{width : 100}}
//                         key={formik.values.selected_object || undefined}
//                         value={formik.values.current_object || undefined}
//                         onChange={handleObjectChange}
//                         >
//                             {
//                               formik.values.objects &&  formik.values.objects.map((object)=>{
//                                     return <Option
//                                      key={object?.obj_id}
//                                      value={object?.obj_id}
//                                     >
//                                         {object?.obj_name}
//                                     </Option>
//                                 })
//                             }
//                         </Select>
//                 </Form.Item>
//                 <Form.Item label='Segment' className='' style={{ minWidth: 200, maxWidth: 200,marginRight:10 }}>
//                     <Select
//                     style={{width : 130}}
//                     onChange={handleSegmentChange}
//                     value={formik.values.selected_segment || undefined}
//                     >
//                         {
//                             formik.values.segments && formik.values.segments?.map((segment)=>{
//                                 return <Option
//                                  key={segment?.segment_id}
//                                  value={segment?.segment_id}
//                                 >
//                                     {segment?.segement_name}
//                                 </Option>
//                             })
//                         }
//                     </Select>
//                 </Form.Item>
//                 <Form.Item label='Version' className='' style={{ minWidth: 160, maxWidth: 160,marginRight:10 }}>
//                         <Select
//                          style={{marginRight:10}}
//                          key={formik.values.selected_version || undefined}
//                          value={ formik.values.current_version || undefined}
//                          onChange={handleVersionChange}
//                         >
//                             {
//                                 formik.values.versions && formik.values.versions?.map((version)=>{
//                                     return <Option
//                                     value={version?.ind}
//                                     key={version?.ind}
//                                     >
//                                         {"v"+version?.ind}
//                                     </Option>
//                                 })
//                             }
//                             {
                           
//                              <Option
//                                 value='X'
//                                 key='X'
//                                 >
//                                     In Process
//                                 </Option>
//                             }
//                         </Select>
//                 </Form.Item>
//                 <Form.Item>
//                 <LuSave onClick={handleSubmit} style={{marginRight:"10px",fontSize:"20px",cursor:"pointer",color:"blue"}}/>
//                 </Form.Item>
//                 <Form.Item>
//                 <img onClick={handleVersion} style={{marginRight:10,maxWidth:"20px",maxHeight:"20px",cursor:"pointer"}} src={'https://cdn-icons-png.flaticon.com/512/5376/5376391.png'}/>
//                 </Form.Item>
//                 <Form.Item style={{ minWidth: 30, maxWidth: 30,marginRight:10 }}>
//                 <Tooltip title="Show All" color={'black'} key={'black'}>
//                 <Switch
//                     checked={expanded}
//                     onChange={createDataSourceExpand}
//                 />
//                 </Tooltip>
//                 </Form.Item>
//                 <Form.Item>
//                 <Search placeholder="Search by Sap Table Sap Field" 
//                  onSearch={(e)=>handleSearch(e)}
//                  enterButton 
//                  onChange={(e)=>handleSearchChange(e)}
//                  style={{ minWidth:"100px", maxWidth:"100px", marginRight:"10px",marginBottom:"1px",maxHeight: "32px"}}
//                  />

//                 </Form.Item>
//             </Form>
//         </div>
//         <div className='bussiness_rules_table container-fluid'>
//             <Table
//              columns={columns}
//              dataSource={rulesSearch || []}
//             //  dataSource={filteredData || []}
//              scroll={{x:950,y: "70vh" }}
//              style={{overflowX:"auto"}}
//              rowClassName={(record, index) => ((record?.rule_status==='Completed' ? 'lightgreen' : record?.rule_status==='In Progress' ? 'lightyellow' : record?.rule_status==='To Start' ? 'lightred' : record?.rule_status==='On Hold' ? 'lightblue' : ''))}
//              pagination={
//                 {
//                     pageSize:6,
//                     pageSizeOptions:[],
//                     showQuickJumper:true,
//                     showSizeChanger:false,
//                 }
//              }
//              />
//         </div>
//     </div>
//     </Spin>
//   )
// }
 
// export default ViewBussinessRule

// import React, { useEffect, useState } from 'react';  
// import { Input, Table, Button, Modal, Form, Space, message, Radio } from 'antd';  
// import { useSelector, useDispatch } from 'react-redux';  
// import { useFormik } from "formik";  
// import * as yup from "yup";  
// import { deleteProjectsSlice, getProjectsSlice, updateProjectsSlice } from '../../features/Project/projectSlice';  
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const ManageProjects = () => {  
//     const [searchText, setSearchText] = useState('');  
//     const [open, setOpen] = useState(false);  
//     const [open2, setOpen2] = useState(false);  
//     const [selectedKey, setSelectedKey] = useState(null);  
//     const [selectedRecord, setSelectedRecord] = useState(null);
//     const [alertActive,setAlertActive] = useState(true);  
//     // const [projectData,setProjectData] = useState();
//     const dispatch = useDispatch();  
//     const [messageApi, contextHolder] = message.useMessage();
//     const projects = useSelector(state => state.project.projects);  
//     const [data, setData] = useState([]);  
//     const {Search} = Input

//     const schema = yup.object().shape({  
//         project_name: yup.string().required("Project Name is required")
//         .required('Please enter your project Name!')  
//         .matches(/^[a-zA-Z_][a-zA-Z0-9_]*$/, 'Project name must start with a letter or underscore & can only contain letters, numbers, and underscores.')  
//         .trim()  
//         .notOneOf(['_', ''], 'Project name cannot be just an underscore or empty.')  
//         .test('no-start-end-underscore', 'Underscore cannot be at the start or end of project name.', (value) => {  
//             return value && !(value.startsWith('_') || value.endsWith('_'));  
//         })  
//         .test('no-spaces', 'Spaces are not allowed in project name.', (value) => {  
//             return value && !/\s/.test(value);  
//         }),  
//         description: yup.string().required("description is required"),  
//     });  

//     const formik = useFormik({  
//         initialValues: {  
//             project_name: "",  
//             description: "",  
//         },  
//         validationSchema: schema,  
//         onSubmit: (values) => {  
//             handleEditSubmit(values);  
//             hideModal();  
//             setSelectedKey('');
//         },  
//         enableReinitialize: true,
//     });  

//     const handleRadioChange = (record) => {  
//         setSelectedKey(record.project_id);  
//         setSelectedRecord(record);  
//     };  

//     const showModal = () => { 
//         if(selectedRecord === null)
//             {
//                 if(alertActive){
//                 messageApi.info('Please Select a Project')
//                 setAlertActive(false);
//                 setTimeout(()=>setAlertActive(true),3000);
//                 }
//             }
//         else{
//             formik.setValues({  
//                 project_name: selectedRecord.project_name,  
//                 description: selectedRecord.description,  
//             });  
//             setOpen(true);  
//         }
//     };  

//     const hideModal = () => {  
//       setOpen(false);  
//   };  

//     const handleEditSubmit = (values) => {  
//         if (!selectedRecord) {  
//             messageApi.info('Please Select a Project');  
//             return;  
//         }  
//         dispatch(updateProjectsSlice({ ...values, project_id: selectedRecord.project_id }))
//         .then((response)=>{
//             if(response?.payload?.status === 200){
//                 toast.success(`Project ${response?.payload?.data?.project_name} Updated Successfully`);
//             }
//             else{
//                 toast.error(`Project Name already exists`);
//             }
//         })
//         setTimeout(() => {  
//             try {
//                 dispatch(getProjectsSlice());  
//             } catch (error) {
//                 toast.error('Project Fectch Failed');                
//             }
//         }, 1000);  
//         setSelectedRecord(null);
//         setOpen(false);  
//     };  

//     const showModal2 = ()=>{
//         if(selectedRecord === null)
//             {
//                 if(alertActive){
//                 messageApi.info('Please Select a Project')
//                 setAlertActive(false);
//                 setTimeout(()=>setAlertActive(true),3000);
//                 }
//             }
//       else{
//       setOpen2(true);
//       }
//     }

//     const hideModal2 = () => {  
//       setOpen2(false); 
//   };  

//     const handleDelete = () => {  
//         if (selectedRecord) {  
//             dispatch(deleteProjectsSlice({project_id : selectedRecord.project_id}))
//             .then((response)=>{
//                 if(response?.payload?.status === 202){
//                     toast.success(`${response?.payload?.data?.project_name} is deleted`);
//                 }  
//                 else{
//                     toast.error('Deletion Failed');
//                 }
//             })
//             .catch(()=>{
//                 toast.error('Server Error')
//             })
//             setTimeout(()=>{
//                 try {
//                     dispatch(getProjectsSlice())
//                 } catch (error) {
//                     toast.error('Project Fectch Failed');
//                 }
//             },1000)  
//             setSelectedRecord(null);
//             setOpen2(false);  
//         }
//     };  

//     const columns = [  
//       {  
//           title: 'Select',  
//           dataIndex: 'selecteditem',  
//           render: (text, record) => (  
//               <div style={{ display: 'flex', justifyContent: 'center' }}>  
//                   <Radio  
//                       checked={selectedKey === record.project_id}  
//                       onChange={() => handleRadioChange(record)}  
//                   />  
//               </div>  
//           )  
//       },  
//       {  
//           title: 'Project Name',  
//           dataIndex: 'project_name',  
//           key: 'project_name',  
//       },  
//       {  
//           title: 'description',  
//           dataIndex: 'description',  
//           key: 'description',  
//       },  
//       {  
//           title: 'Created By',  
//           dataIndex: 'created_by',  
//           key: 'created_by',  
//       },  
//       {  
//           title: 'Created On',  
//           dataIndex: 'created_at',  
//           key: 'created_at',  
//       }  
//   ];  


//       useEffect(() => {  
//         try {
//             dispatch(getProjectsSlice());    
//         } catch (error) {
//             toast.error('Project Fectch Failed');
//         }
//     }, [dispatch]);  

//     useEffect(() => {  
//         setData(projects);  
//     }, [projects]); 

//     const projectData = []

//     Array.isArray(data) && data.forEach((field,i)=>{
//       projectData.push({
//         project_id : field?.project_id,
//         project_name : field?.project_name,
//         description : field?.description,
//         created_at : field?.created_at,
//         created_by : field?.created_by,
//       })
//     })

//     function formatDateString(isoDate) {  
//         const date = new Date(isoDate);  
//         const day = String(date.getDate()).padStart(2, '0');  
//         const month = String(date.getMonth() + 1).padStart(2, '0');  
//         const year = date.getFullYear();  
//         const hours = String(date.getHours()).padStart(2, '0');  
//         const minutes = String(date.getMinutes()).padStart(2, '0');  
//         const seconds = String(date.getSeconds()).padStart(2, '0');  
    
//         return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;  
//     }  
    
//     const projectsIterate = projectData.map((field) => ({  
//         project_id: field?.project_id,  
//         project_name: field?.project_name,  
//         description: field?.description,  
//         created_at: formatDateString(field?.created_at),  
//         created_by: field?.created_by,  
//     }));  

//     const handleSearchChange = (e)=>{
//         if(!e.target.value)
//          setSearchText(e.target.value)
//     }
    

//     // Filter data based on search text  
//     const filteredData = projectsIterate?.filter(item =>(
//         item.project_name.toLowerCase().includes(searchText.toLowerCase()) ||  
//         item.description.toLowerCase().includes(searchText.toLowerCase()) ||
//         item.created_by.toLowerCase().includes(searchText.toLowerCase())
//     ));  

//     const navigate = useNavigate();

//     return (  
//         <div className='p-2 m-2'>  
//         <ToastContainer
//                   position='top-center'
//                   autoClose={1000}
//                   hideProgressBar={true}
//                   closeOnClick
//                   newestOnTop={true}
//                   rtl={false}
//                   pauseOnFocusLoss
//                   draggable
//                   pauseOnHover
//                   theme='light'
//                   />
//         {contextHolder}    

//             <div className="container-fluid">  
//             <div className="d-flex justify-content-end align-items-center mb-2">  
//                 <div className="d-flex mx-4 gap-3">  
//                     <Button onClick={()=>navigate('/project/createproject')} className='primary' style={{  
//                         fontSize: '14px'  
//                     }}>  
//                         Create  
//                     </Button>  
//                     <Button onClick={showModal} className='primary' style={{  
//                         fontSize: '14px'  
//                     }} >  
//                         Edit  
//                     </Button>  
//                     <Button onClick={showModal2} className='type-primary' style={{ fontSize: '14px' }}>  
//                         Delete  
//                     </Button>  
//                 </div>  
//                   <Search  
//                 placeholder="Search by Project Name, Created By or Description"  
//                 onSearch={(e) => setSearchText(e)}  
//                 enterButton  
//                 onChange={(e) => handleSearchChange(e)}  
//                 style={{ minWidth: "300px", maxWidth: "300px", marginRight: "10px", marginBottom: "1px", maxHeight: "32px" }}  
//             />    
//             </div>

//                 <Table  
//                     columns={columns}  
//                     dataSource={filteredData}  
//                     pagination={{ pageSize: 10 }}  
//                     style={{overflowX:"auto"}}
//                 />  

//                 <Modal  
//                 //{ selectedRecord?.project_name !== undefined ?  <span style={{ color: "red",display:"inline" }}>"{` `} {selectedRecord?.project_name}{` `} "</span>:''} {` `}
//                     title={<>Edit Project</>} 
//                     onCancel={hideModal}  
//                     open={open}
//                     footer={null}  
//                 >  
//                     <form onSubmit={formik.handleSubmit} className="max-w-[300px] mx-auto"> 
//                         <label>Project Name :</label> 
//                         <Form.Item  validateStatus={formik.errors.project_name ? "error" : ""} help={formik.errors.project_name}>  
//                             <Input  
//                                 name="project_name"  
//                                 placeholder="Enter Project Name"  
//                                 value={formik.values.project_name}  
//                                 onChange={formik.handleChange}  
//                             />  
//                         </Form.Item>  
//                         <label>Description :</label>
//                         <Form.Item validateStatus={formik.errors.description ? "error" : ""} help={formik.errors.description}>  
//                             <Input  
//                                 name="description"  
//                                 placeholder="Enter description"  
//                                 value={formik.values.description}  
//                                 onChange={formik.handleChange}  
//                             />  
//                         </Form.Item>  

//                         <Form.Item>  
//                             <Space>  
//                                 <Button type="primary" htmlType="submit">  
//                                     Submit
//                                 </Button>  
//                                 <Button onClick={hideModal}>Cancel</Button>  
//                             </Space>  
//                         </Form.Item>  
//                     </form>  
//                 </Modal>  

//                 <Modal  
//                     title={<>Delete  { selectedRecord?.project_name !== undefined ?  <span style={{ color: "red",display:"inline" }}>"{` `} {selectedRecord?.project_name}{` `} "</span>:''} {` `}Project</>} 
//                     open={open2}  
//                     onOk={handleDelete}  
//                     onCancel={hideModal2}  
//                     okText="Yes, Delete"  
//                     cancelText="Cancel"  
//                 >  
//                 </Modal>  
//             </div>  
//         </div>  
//     );  
// };  

// // export default ManageProjects;

// import React, { useEffect, useState } from 'react';  
// import {  Table, Button, Radio, message, Modal, Input } from 'antd';  
// import CustomModel from './CustomModel';  
// import { Link, useNavigate } from 'react-router-dom';  
// import {useFormik} from 'formik'
// import * as yup from 'yup'
// import { toast,ToastContainer } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteConnectionSlice, getConnectionSlice, renameConnectionSlice } from '../../../features/Connections/connectionSlice';

// const ViewConnection = () => {  

//     const [searchText, setSearchText] = useState('');  
//     const [allProjects, setAllProjects] = useState([]);
//     const [messageApi, contextHolder] = message.useMessage();
//     const [selectedKey, setSelectedKey] = useState(null); 
//     const [selectedRecord,setSelectedRecord] = useState(null);  
//     const [selectOption,setSelectOption] = useState();
//     const [alertActive,setAlertActive] = useState(true);
//     const [open, setOpen] = useState(false);  
//     const [open2, setOpen2] = useState(false);  
//     const navigate = useNavigate();

//     const handleRadioChange = (record) => {  
//         setSelectedKey(record.id); 
//         setSelectedRecord(record);
//     };  
    

//     const dispatch = useDispatch();
//     const {connections} = useSelector((state)=>state.connection)
//     const projects = useSelector(state => state.project.projects);

//     const schema = yup.object({
//         connection_name : yup.string().required('Connection Name Required')
//                            .matches(/^(?!_)(?!.*_$)[a-zA-Z0-9_]+$/, 'Invalid Connection Name'),
//     })


//     const formik = useFormik({
//         initialValues:{
//             connection_name:"",
//             project_id_select:""
//         },
//         validationSchema:schema,
//         onSubmit:(values)=>{
//             handleRename()
//         }
//     })

//     useEffect(() => { 
//         dispatch(getConnectionSlice())   
//      }, []);

//     const columns = [   
//         {  
//             title: 'Select',  
//             dataIndex: 'selecteditem',  
//             render: (text, record) => (  
//                 <div style={{display:'flex',justifyContent:'center'}}>
//                 <Radio  
//                     checked={selectedKey === record.id}  
//                     onChange={() => handleRadioChange(record)}   
//                 />  
//                 </div>
//             )  
//         },  
//         {  
//             title: 'Connection Name',  
//             dataIndex: 'connection_name',  
//             key: 'connection_name',  
//             render: (text, record) => (
//                 <button className="link-button" onClick={()=>getTables(record)} style={{width:"100%",background:'none',border:"none",padding:"0",textDecoration:"underline"}}>{record.connection_name}</button>                  
//             )
//         },  
//         {  
//             title: 'Connection Type',  
//             dataIndex: 'connection_type',  
//             key: 'connection_type',  
//         },  
//         {  
//             title: 'Username',  
//             dataIndex: 'username',  
//             key: 'username',  
//         },  
//         {  
//             title: 'Host',  
//             dataIndex: 'host',  
//             key: 'host',  
//         },  
//         {  
//             title: 'Connection Status',  
//             dataIndex: 'connection_status',  
//             key: 'connection_status',  
//             render: (status) => (
//                 <div style={{ display: 'flex', alignItems: 'center', marginLeft:'18px' }}>  
//                     <span className={`circle ${status === "Active" ? 'green' : 'red'}`}></span>      
//                     <p className='mb-2 ml-2'>{status === "Active" ? 'Active' :'InActive'}</p>  
//                 </div>  
//             ),   
//         } 
//     ];  

//      useEffect(()=>{
//             setAllProjects(projects);
//         },[projects])
     

//     const conns = []

    
//     Array.isArray(connections?.data) && connections?.data.forEach((field,i)=>{
//         conns.push({
//          id: field.id,  
//         connection_type: field.connection_type,  
//         connection_name: field.connection_name,  
//         username: field.username,  
//         host: field.host,
//         project_id : field.project_id,  
//         connection_status: field.status  
//         })
//     })

//     const connectionsIterate =  conns?.map(field => ({  
//         id: field.id,  
//         connection_type: field.connection_type,  
//         connection_name: field.connection_name,
//         // <a onClick={()=>{getTables(field)}} style={{textDecoration:'underline',color:'blue'}}>
//         // {field.connection_name}
//         // </a>,    
//         username: field.username,  
//         host: field.host,
//         project_id : field.project_id,  
//         connection_status: field.connection_status  
//     }));  
    
    

//     // Filter data based on search text  
//     const filteredData = connectionsIterate?.filter(item => (
//         item.connection_type.toLowerCase().includes(searchText.toLowerCase()) ||
//         item.username.toLowerCase().includes(searchText.toLowerCase()) ||  
//         item.host.toLowerCase().includes(searchText.toLowerCase())  ||  
//         item?.connection_name.toLowerCase().includes(searchText.toLowerCase())
//     ))

//     const filterSelectOptions = filteredData?.filter(item =>{ 
//         if(selectOption?.target?.value){  
//             return item.project_id === Number(selectOption?.target?.value);  
//           } 
//           return true;
// });
    
//     const handleProjectSelect = (e)=>{
//         setSelectOption(e);
//     }
        
//     const handleEditNavigation = ()=>{
//         if(selectedRecord === null)
//         {
//             if(alertActive){
//             messageApi.info('Please Select a Connection')
//             setAlertActive(false);
//             setTimeout(()=>setAlertActive(true),3000);
//             }
//         }
//         else{
//             navigate(`/connections/${selectedRecord?.connection_type}/${selectedRecord.connection_name}/${selectedRecord?.project_id}`);
//         }
//         setSelectedKey('');
//         setSelectedRecord(null);
//     }   
    
//     const showModal = ()=>{
//         if(selectedRecord === null){
//             if(alertActive){
//                 messageApi.info('Please Select a Connection')
//                 setAlertActive(false);
//                 setTimeout(()=>setAlertActive(true),3000);
//                 }
//         }
//        else{
//            setOpen(true);
//        }
//     }
    
//     const hideModal = () => {  
//         setOpen(false);  
//     }; 

//     const handleDelete = ()=>{
//         dispatch(deleteConnectionSlice(selectedRecord))
//         .then((response)=>{
//             toast.success(`${response?.payload.data} has been deleted`);
//             setSelectedKey('');
//             setSelectedRecord('');
//         })
//         .catch((error)=>{
//             toast.error("Deletion Failed");
//             })
//             setTimeout(()=>{
//                 dispatch(getConnectionSlice())
//             },1000)
//         hideModal(false);
//         setSelectedKey('');
//         setSelectedRecord('');
//     } 
    
//     const showModal2 = () => {  
//         if(selectedRecord === null){
//             if(alertActive){
//                 messageApi.info('Please Select a Connection')
//                 setAlertActive(false);
//                 setTimeout(()=>setAlertActive(true),3000);
//                 }
//         }
//         else{
//         formik.values.connection_name = selectedRecord?.connection_name;
//         setOpen2(true);
//         }
//     };  


//     const hideModal2 = () => {  
//         setOpen2(false);  
//     };    

//     const handleRename = ()=>{
//         const rename_data = {
//             re_val : formik.values.connection_name,
//             ...selectedRecord
//         }
//         dispatch(renameConnectionSlice(rename_data))
//         .then((response)=>{
//             if(response?.payload?.status === 404){
//                 toast.info(`${response?.payload?.data} is Already Exists`);
//             }
//             else if(response?.payload?.status === 202){
//                 toast.success(`${response?.payload?.data} Connection Renamed`);
//                 setSelectedRecord('');
//                 dispatch(getConnectionSlice())

//             }
//             else{
//                 toast.error('Rename Failed');
//             }
//         })
//         setSelectedKey('');
//         setSelectedRecord('');
//         hideModal2(false);
//     }   

//     const handleValidateConnection = ()=>{
        
//         // setSelectedKey('');
//         // setSelectedRecord('');
//     }

//     const getTables = async (field)=>{
//         console.log(field);
//         if(field.connection_status==='Inactive'){
//             alert("Your Status is Inactive");
//         }  
//         else{
//             if(field.connection_type==='Erp'){
//                  navigate(`/connections/view-tables`);
//             }
//             else{
 
//             navigate(`/connections/view-tables/${field.project_id}/${field.connection_name}`);
//         }
//     }
//     }

//     return (  
//         <div className='p-2 m-2'>  
//             <ToastContainer
//                     position='top-center'
//                     autoClose={1000}
//                     hideProgressBar={true}
//                     closeOnClick
//                     newestOnTop={true}
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                     theme='light'
//                     />
//                      {contextHolder}
//             <div className="container-fluid">  
//                 <div className="options_header" style={{ overflowX: "auto"}}>  
//                     <label style={{ color: "skyblue", fontSize: "20px",marginRight:"10px"  }}>Connections</label>  
//                     <select  
//                         name="project_id"   
//                         className='form-select'   
//                         style={{ minWidth:"200px", maxWidth:"250px", padding: "3px", marginRight:"10px",maxHeight: "32px" }}   
//                         onChange={handleProjectSelect}   
//                     >  
//                         <option value="" style={{ textAlign: "center" }}>Select Project</option>   
//                         {allProjects && allProjects.map((option) => (  
//                             <option key={option?.project_id} value={option?.project_id} style={{ textAlign: "center" }}>{option?.project_name}</option>  
//                         ))}  
//                     </select>  
//                     <Button onClick={handleEditNavigation} style={{ fontSize: '14px', marginRight:"10px" }}>  
//                         Edit  
//                     </Button>  
//                     <Button  onClick={showModal} style={{ fontSize: '14px', marginRight:"10px" }}>  
//                         Delete  
//                     </Button>  
//                     <Button onClick={showModal2} style={{ fontSize: '14px', marginRight:"10px" }}>  
//                         Rename  
//                     </Button>  
//                     <Button onClick={handleValidateConnection} style={{ fontSize: '14px', marginRight:"10px" }}>  
//                         Validate Connection  
//                     </Button>  
//                     <Input  
//                         placeholder="Search by Name, Type, Username, or Host"  
//                         value={searchText}  
//                         className='search-input'   
//                         style={{ minWidth:"200px", maxWidth:"230px", marginRight:"10px",marginBottom:"1px",maxHeight: "32px"}}   
//                         onChange={(e) => setSearchText(e.target.value)}  
//                     />  
//                 </div>  
//             </div>

//             <Table  
//                 columns={columns}  
//                 dataSource={filterSelectOptions} // Use the filtered data  
//                 pagination={{  
//                     pageSize: 10,  
//                 }}  
//                 style={{overflowX:"auto",marginTop:"10px"}}
//             />  


//             <CustomModel
//               title={<>Delete { selectedRecord?.connection_name !== undefined ?  <span style={{ color: "red",display:"inline" }}>"{` `} {selectedRecord?.connection_name}{` `} "</span>:''} {` `}Connection</>}
//               hideModal={hideModal} 
//               open={open}
//               performAction = {handleDelete}
//               onCancel={hideModal}
//               okText="OK"
//               cancelText="CANCEL"
//             />

//             <Modal
//                 title={<>Rename { selectedRecord?.connection_name !== undefined ?  <span style={{ color: "red",display:"inline" }}>"{` `} {selectedRecord?.connection_name}{` `} "</span>:''} {` `}Connection</>}
//                 open={open2}
//                 onOk={handleRename}
//                 onCancel={hideModal2}
//                 hideModal={hideModal2}
//                 okText="OK"
//                 footer={null}
//                 cancelText="CANCEL"
//             >
//                 <form onSubmit={formik.handleSubmit}>  
//                     <div className="row mt-3 d-flex align-items-center" >  
//                         <label htmlFor="connection_name" className='col-4'>Rename</label> 
//                         <div className='col-8'>
//                         <Input
//                             type="text" 
//                             className='form-control' 
//                             name="connection_name"  
//                             value={formik.values.connection_name}  
//                             onChange={formik.handleChange('connection_name')}  
//                         />  
//                         </div>
//                     </div>  

//                     <div className='row'>
//                         <label className='col-4'></label>
//                         <div className='col-8'>
//                         <div className="error" style={{overflowX:"auto"}}>
//                             {formik.touched.connection_name && formik.errors.connection_name}
//                         </div>  
//                         </div>
//                     </div>

//                     <div className='d-flex justify-content-end mt-2 gap-4'>  
//                     <Button type="primary" htmlType="submit">  
//                         OK
//                     </Button>  
//                     <Button onClick={hideModal2}>Cancel</Button>
//                     </div>   
//                     </form>  
//             </Modal>
//         </div>  
//     )
// }
// export default ViewConnection;
// -----------------------------------------------------------------------------------------------------------------------------------
// WorkSpace
    // //   -------------------------------------------------------------------------------------------------------
// import { useFormik } from 'formik';
// import React, { useEffect, useState, useRef  } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { getBussinessRulesSlice, getDataSegmentsSlice, getFieldsOnSegmentSlice, getTableSlice, getVersionNumberSlice, getVersionRulesSlice } from '../../features/BussinessRules/BussinessRulesSlice';
// import { Button, Form, Input, Select, Splitter, Table, Tooltip } from 'antd';
// import { Option } from 'antd/es/mentions';
// import { FaDownload } from "react-icons/fa6";
// import ChatUI from '../SampleForm';
// import * as XLSX from 'xlsx';
// import { EditableArea, EditableField } from '../Bussiness Rules/EditableCell';
// import { FaPaperPlane } from 'react-icons/fa';  
// import axios from 'axios';

// const WorkSpace = () => {
//      const { Search } = Input;
//     const projects = useSelector(state => state.project.projects);
//     const [allProjects,setAllProjects] = useState([]);
//     const [spinner,setSpinner] = useState(false);
//     const [searchText, setSearchText] = useState('');
//     const [dataSource,setDataSource] = useState([]);
//     const [tabledata,setTableData] = useState([]);
//     const [rules, setRules] = useState(null);
//     const [fields,setFields] = useState([]);
//     const [editable, setEditable] = useState(true);
//     const [tip,setTip] = useState('');

//     const dispatch = useDispatch();

//     const formik = useFormik({
//         initialValues:{
//             objects:'',
//             segments:'',
//             selected_project:'',
//             selected_object : '',
//             selected_segment: '',
//             current_project : '',
//             current_object : '',
//         },

//     })

//     useEffect(()=>{
//         setAllProjects(projects)
//     },[projects])


//     const columns = [  
//             // {  
//             //     title: 'Rule',  
//             //     dataIndex: 'displayIndex',  
//             //     key: 'displayIndex',  
//             // },  
//             {  
//                 title: 'Source Table',  
//                 dataIndex: 'source_table',  
//                 key: 'source_table',  
//                 render: (_,record) => (  
//                     <EditableField  
//                         value={record.source_table}  
//                         // onUpdate={(newValue) => handleInputChange(record?.displayIndex, 'source_table', newValue)} 
//                         disabled={editable} 
//                     />  
//                 )  
//             },  
//             {  
//                 title: 'Source Field Name',  
//                 dataIndex: 'source_field_name',  
//                 key: 'source_field_name',  
//                 render: (_, record) => (  
//                     <EditableField  
//                         value={record.source_field_name}  
//                         // onUpdate={(newValue) => handleInputChange(record?.displayIndex, 'source_field_name', newValue)} 
//                         disabled={editable}  
//                     /> 
//                 )  
//             },  
//             {  
//                 title: 'Data Mapping Type',  
//                 dataIndex: 'data_mapping_type',  
//                 key: 'data_mapping_type',  
//                 render: (_, record) => (  
//                     <div style={{ padding: 10 }}>  
//                         <Select  
//                             // onChange={(value) => handleInputChange(record?.displayIndex, 'data_mapping_type', value)}  
//                             style={{ width: 100 }} 
//                             value={record?.data_mapping_type} 
//                             disabled={editable} 
//                         >  
//                             <Option value='1:1'>1:1</Option>  
//                             <Option value='Constant'>Constant</Option>  
//                             <Option value='LLM'>LLM</Option>  
//                         </Select>  
//                     </div>  
//                 )  
//             },  
//             {  
//                 title: 'Rules',  
//                 dataIndex: 'data_mapping_rules',  
//                 key: 'data_mapping_rules',  
//                 render: (_, record) => (  
//                         <EditableArea
//                          value={record?.data_mapping_rules}
//                          disabled={editable} 
//                         //  onUpdate={(newValue)=>handleInputChange(record?.displayIndex,'data_mapping_rules',newValue)}
//                         />
//                 )  
//             },  
//             {  
//                 title: 'Target SAP Table',  
//                 dataIndex: 'target_sap_table',  
//                 key: 'target_sap_table',  
//             },  
//             {  
//                 title: 'Target SAP Field',  
//                 dataIndex: 'target_sap_field',  
//                 key: 'target_sap_field',  
//             },  
//             {  
//                 title: 'Text Description',  
//                 dataIndex: 'text_description',  
//                 key: 'text_description',  
//             },  
//             {  
//                 title: 'Look Up Table',  
//                 dataIndex: 'lookup_table',  
//                 key: 'lookup_table',  
//                 render: (_, record) => (  
//                     <EditableField      
//                     value={record.lookup_table}  
//                     disabled={editable} 
//                     // onUpdate={(newValue) => handleInputChange(record?.displayIndex, 'lookup_table', newValue)}  
//                 />
//                 )  
//             },  
//             {  
//                 title: 'Rule Status',  
//                 dataIndex: 'rule_status',  
//                 key: 'rule_status',  
//                 render: (_, record) => (  
//                     <div style={{ padding: 10 }}>  
//                         <Select  
//                         disabled={editable} 
//                             value={record?.rule_status}  
//                             // onChange={(value) => handleInputChange(record?.displayIndex, 'rule_status', value)}  
//                             style={{ width: 100 }}  
//                         >  
//                             <Option value='Completed'>Completed</Option>  
//                             <Option value='In Progress'>In Progress</Option>  
//                             <Option value='To Start'>To Start</Option>  
//                             <Option value='On Hold'>On Hold</Option>  
//                         </Select>  
//                     </div>  
//                 )  
//             }  
//         ]; 

//     const handleProjectChange = (value)=>{
//         formik.setFieldValue('selected_project', value);
//         formik.setFieldValue('current_project',value);  
//         formik.setFieldValue('selected_object', '');  
//         formik.setFieldValue('current_object', '');
//         formik.setFieldValue('selected_segment', '');
//         formik.setFieldValue('objects',[]);
//         formik.setFieldValue('segments',[]);
//         setRules(null);

//         dispatch(getBussinessRulesSlice({ obj_id: value }))  // we are project id only but it is named has obj_id
//             .then((response) => {  
//                 formik.setFieldValue('objects', response?.payload?.data);  
//             })  
//             .catch((error) => {  
//                 console.error("Error fetching business rules:", error);  
//             });  
        
//     }

//     const handleObjectChange = (value)=>{
//         formik.setFieldValue('selected_segment', '');
//         formik.setFieldValue('selected_object',value);
//         formik.setFieldValue('current_object', value);
//         formik.setFieldValue('segments',[]);
//         setRules(null);

//         const data = {
//             project_id : formik.values.selected_project,
//             object_id : value
//         }
//         dispatch(getDataSegmentsSlice(data))
//         .then((response)=>{
//             formik.setFieldValue('segments', response?.payload?.data);  
//         })
//     }

//     const handleSegmentChange = (value)=>{
//         formik.setFieldValue('selected_version',null);
//         formik.setFieldValue('current_version', '');
//         formik.setFieldValue('selected_segment', value);
//         formik.setFieldValue('versions',[]);
//         setRules('');
//         new Promise((resolve)=>{
//             setSpinner(!spinner)
//             resolve();
//         })
//         .then(()=>{
//             dispatch(getFieldsOnSegmentSlice({project_id:formik.values.selected_project,object_id:formik.values.selected_object,segment_id:value}))
//             .then((response)=>{
//                 if(response?.payload?.status === 200){
//                     setFields(response?.payload?.data);
//                     getVersionsObject(value)
//                 }})
                    
//             formik.setFieldValue('current_version','In Process');
//         })
//         setSpinner(false);
//     }

//     const getVersionsObject = (value)=>{
//             const data = {
//                 project_id : formik.values.selected_project,
//                 object_id  : formik.values.selected_object,
//                 segment_id : value
//             }
//             dispatch(getVersionNumberSlice(data))
//             .then((response)=>{
//                 formik.setFieldValue('versions',response?.payload?.data);   
//                 const newData = {...data , 'verison_number' : response?.payload?.data.length}
//                 dispatch(getVersionRulesSlice(newData))
//                 .then((response)=>{
//                     if(response?.payload?.status === 200){
//                         setRules(response?.payload?.data);
//                         dispatch(getTableSlice(data))
//                         .then((response)=>{
//                             setTableData(response?.payload?.data); // validations required
//                         })
//                     }
//                 })
//             })
//     }

//     const createDataSource = (expanded) => {
//         setTip('Fetching..')
//         const updatedValues = []
//         rules &&  rules.forEach((rule, index) => {  
//             updatedValues.push({...rule,  displayIndex: index + 1})
//         });
//         if(expanded){
//          return updatedValues
//         }
//         const temp = updatedValues.filter((record)=> record?.isMandatory ==='True')
//         return temp;
//     };

//      useEffect(()=>{
//             setDataSource(createDataSource(true));
//         },[rules])

//     const filteredData = dataSource && dataSource.filter(item => (
//         item?.target_sap_field?.toLowerCase().includes(searchText.toLowerCase()) ||
//         item?.target_sap_table?.toLowerCase().includes(searchText.toLowerCase()) ||
//         item?.text_description?.toLowerCase().includes(searchText.toLowerCase())
//     ));

//     const handleSearch = (e)=>{
//         setSearchText(e)
//     }

//     const handleSearchChange = (e)=>{
//         if(!e.target.value){
//             setSearchText(e.target.value)
//         }
//     }

//     const handleExcelSheet = ()=>{
//         const worksheet = XLSX.utils.json_to_sheet(tabledata);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//         XLSX.writeFile(workbook, 'table_data.xlsx');
//       }
    // // ------------------------------------------------------------------------------------------------------------------------
    // const [message, setMessage] = useState('');  
    //   const [messages, setMessages] = useState([]);  
    
    //   const getFormattedTime = () => {  
    //     const now = new Date();  
    //     return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });  
    //   };  
    
    //   const handleSendMessage = () => {  
    //     if (message.trim()) {  
    //       setMessages(prev => [  
    //         ...prev,   
    //         {   
    //           id: Date.now(),   
    //           text: message,   
    //           sender: 'me',   
    //           type: 'sent',     
    //           time: getFormattedTime()   
    //         }  
    //       ]);  
    //       try {
    //         axios.post(`http://127.0.0.1:8000/api/execute_queries/`,
    //             {"prompt":message.toString()}
    //         )
    //           .then(response => {
    //             if (response.status === 200) {
    //               // First API call was successful (status 200)
    //               console.log("First API call successful!");
    //               // Perform the second API call here
    //               axios.get(`http://127.0.0.1:8000/api/getTable/${formik.values.selected_project}/${formik.values.selected_object}/${formik.values.selected_segment}/`) // Replace with your second endpoint
    //                 .then(secondResponse => {
    //                   console.log("Second API call successful!", secondResponse.data);
    //                   setTableData(secondResponse.data);
    //                   // Handle the response from the second API call
    //                 })
    //                 .catch(secondError => {
    //                   console.error("Error in second API call:", secondError);
    //                   // Handle errors from the second API call
    //                 });
    //             } else {
    //               console.error("First API call failed with status:", response.status);
    //               // Handle other status codes (e.g., 400, 500)
    //             }
    //           })
    //           .catch(error => {
    //             console.error("Error in first API call:", error);
    //             // Handle errors from the first API call
    //           });
    //       } catch (error) {
    //         console.error("Unexpected error:", error);
    //         // Handle any unexpected errors (e.g., network issues)
    //       }
    //       setMessage('');  
    //     }  
    //   };  
    //   const messagesEndRef = useRef(null);  

    //   // Scroll to the top whenever messages change  
    //   useEffect(() => {  
    //     if (messagesEndRef.current) {  
    //         messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    //     }  
    //   }, [messages]);  
    
    // //   -------------------------------------------------------------------------------------------------------

//   return (
//   <div className="container-fluid" style={{ width: "95.5vw" }}>  
//     <div className='row w-100 d-flex justify-content-between mt-2'>  

//     <Form className="options_header"> 
//     <Form.Item>
//     <label style={{ color: "skyblue", fontSize: "20px",marginRight:"20px",marginLeft:"10px" }}>WorkSpace</label> 
//     </Form.Item>
//     <Form.Item label="Project" className="mb-0"> 
//         <Select  
//         style={{ width: 150 }}   
//         onChange={handleProjectChange}  
//         key={formik.values.current_project || undefined}  
//         value={formik.values.current_project || undefined}  
//         dropdownStyle={{ maxHeight: 200, overflowY: 'auto' }}  
//         >  
//         {allProjects?.map((project) => (  
//             <Option key={project?.project_id} value={project?.project_id}>  
//             {project?.project_name}  
//             </Option>  
//         ))}  
//         </Select>  
//     </Form.Item>  

//     <Form.Item label="Object" className="mb-0">
//         <Select  
//         style={{ width: 150 }}   
//         key={formik.values.selected_object || undefined}  
//         value={formik.values.current_object || undefined}  
//         onChange={handleObjectChange}  
//         dropdownStyle={{ maxHeight: 200, overflowY: 'auto' }}  
//         >  
//         {formik.values.objects && formik.values.objects?.map((object) => (  
//             <Option key={object?.obj_id} value={object?.obj_id}>  
//             {object?.obj_name}  
//             </Option>  
//         ))}  
//         </Select>  
//     </Form.Item>  

//     <Form.Item label="Segment" className="mb-0">
//         <Select  
//         style={{ width: 200 }}  
//         onChange={handleSegmentChange}  
//         value={formik.values.selected_segment || undefined}  
//         dropdownStyle={{ maxHeight: 200, overflowY: 'auto' }}  
//         >  
//         {formik.values.segments && formik.values.segments?.map((segment) => (  
//             <Option key={segment?.segment_id} value={segment?.segment_id}>  
//             {segment?.segement_name}  
//             </Option>  
//         ))}  
//         </Select>  
//     </Form.Item>  

//     <Form.Item>
//     <Tooltip title="Export Target Table" color={'black'} key={'black'}>
//     <FaDownload style={{color:'blue',cursor:'pointer'}} onClick={handleExcelSheet}/>
//     </Tooltip>
//     </Form.Item>

//     <Form.Item>
//         <Search placeholder="Search by Sap Table Sap Field" 
//             onSearch={(e)=>handleSearch(e)}
//             enterButton 
//             onChange={(e)=>handleSearchChange(e)}
//             style={{ minWidth:"180px", maxWidth:"180px", marginRight:"10px",marginBottom:"1px",maxHeight: "32px"}} 
//             />
//     </Form.Item>

    
//     </Form>  

//     </div> 
//     <div className="row" style={{ height: "78vh" }}>  
//         <Splitter
//         layout="horizontal"  
//         lazy
//         style={{ height: 470, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
//         >
//             <Splitter.Panel collapsible defaultSize="40%" min="10%" max="70%">  
//       <div className="col-12 col-md-3 d-flex flex-column h-100 w-100">  
//         <div className="flex-grow-1 border rounded shadow-sm overflow-hidden">  
//           <div className="d-flex flex-column h-100 bg-light">       
//             <div className="flex-grow-1 overflow-auto p-3" ref={messagesEndRef}>  
//               {messages.map(msg => ( // Render messages in normal order  
//                 <div  
//                   key={msg.id}  
//                   className={`d-flex ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}  
//                 >  
//                   <div className={`p-1 rounded ${msg.type === 'sent' ? 'text-dark' : 'bg-light text-dark'}`} style={{fontSize:"10px"}}>  
//                     {msg.text}  
//                     <div className={`small text-end ${msg.type === 'sent' ? 'text-muted' : 'text-secondary'}`} style={{fontSize:"8px"}}>  
//                       {msg.time}  
//                     </div>  
//                   </div>  
//                 </div>  
//               ))}  
//             </div>  
//             <div className="border-top p-3">  
//               <div className="position-relative">   
//                 <textarea  
//                   className="form-control fixed-height-textarea"  
//                   value={message}  
//                   placeholder='Type Your Message'  
//                   onChange={(e) => setMessage(e.target.value)}  
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}  
//                   id="exampleFormControlTextarea1"   
//                   rows="3"  
//                   style={{ paddingRight: '40px' }}   
//                 />  
//                 <button  
//                   onClick={handleSendMessage}  
//                   className="btn btn-primary position-absolute"  
//                   style={{   
//                     bottom: '10px',   
//                     right: '10px',   
//                     zIndex: 1         
//                   }}  
//                 >  
//                   <FaPaperPlane />  
//                 </button>  
//               </div>  
//             </div>  
//           </div>  
//         </div>  
//       </div>  
//     </Splitter.Panel>    

//       <div className="col-12 col-md-9 d-flex flex-column h-100">  
//         <Splitter  
//             layout="vertical"  
//             lazy
//             style={{  
//             flex: 1,
//             height: 200,
//             boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',  
//             }}  
//         >  
//             <Splitter.Panel style={{flex: 1}} collapsible defaultSize="40%" min="10%" max="70%"> 

//             <div className="table-container mb-3 flex-grow-1 scrollbar">  
//                 <Table  
//                 columns={columns}  
//                 dataSource={filteredData || []}
//                 className="WorkSpaceTable"  
//                 pagination={{ pageSize: 7, showQuickJumper: true, showSizeChanger: false }}  
//                 />  
//             </div>  
//             </Splitter.Panel>  

//             <Splitter.Panel style={{flex: 1}} collapsible> {/* Allow second panel to grow */}  
//             <div className="table-container2 flex-grow-1 rounded scrollbar">  
//                 <Table  
//                 dataSource={tabledata || []}  
//                 className="WorkSpaceTargetTable"
//                 pagination={{ pageSize: 13, showQuickJumper: true, showSizeChanger: false}}  
//                 >  
//                 {fields.map((i) => (  
//                     <Table.Column  
//                     title={i['fields']}  
//                     dataIndex={i['fields']}  
//                     key={i['fields']}  
//                     />  
//                 ))}  
//                 </Table>  
//             </div>  
//             </Splitter.Panel>  
//         </Splitter>  
//     </div>  

//       </Splitter>
//     </div>
//   </div>  
//   )
// }

// export default WorkSpace