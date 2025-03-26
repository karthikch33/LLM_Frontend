import { useFormik } from 'formik';
import React, { useEffect, useState, useRef  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBussinessRulesSlice, getDataSegmentsSlice, getFieldsOnSegmentSlice, getTableSlice, getVersionNumberSlice } from '../../features/BussinessRules/BussinessRulesSlice';
import { Form, Input, Select, Splitter, Table, Tooltip } from 'antd';
import Switch from '@mui/material/Switch';
import { Option } from 'antd/es/mentions';
import { FaDownload } from "react-icons/fa6";
import * as XLSX from 'xlsx';
import { EditableArea, EditableChat, EditableField, EditableSelectMappingType, EditableSelectRuleStatus } from '../Bussiness Rules/EditableCell';

import axios from 'axios';
import { message } from 'antd';
import { getLatestVersionSlice } from '../../features/WorkSpace/workSpaceSlice';

const WorkSpace = () => {
     const { Search } = Input;
    const projects = useSelector(state => state.project.projects);
    const [allProjects,setAllProjects] = useState([]);
    const [spinner,setSpinner] = useState(false);
    const [tabledata,setTableData] = useState([]);
    const [rulesSearch,setRulesSearch] = useState(null);
    const [rules, setRules] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [fields,setFields] = useState([]);
    const [alertActive,setAlertActive] = useState(true);
    const [messageApi,contextHolder] = message?.useMessage();

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues:{
            objects:'',
            segments:'',
            selected_project:'',
            selected_object : '',
            selected_segment: '',
            current_project : '',
            current_object : '',
        },
    })

    useEffect(()=>{
        const filteredProjects = projects?.filter(item => item?.project_type === 'dmc')
        setAllProjects(filteredProjects);
    },[projects])

     useEffect(()=>{
      setRulesSearch(createDataSource(expanded))
      },[rules])

    const columns = [
        {  
            title: 'Source Table',  
            dataIndex: 'source_table',  
            key: 'source_table',  
            render: (_,record) => (  
                <EditableField  
                    value={record.source_table}  
                    disabled={true}
                />  
            )  
        },  
        {  
            title: 'Source Field Name',  
            dataIndex: 'source_field_name',  
            key: 'source_field_name',  
            render: (_, record) => (  
                <EditableField  
                    value={record.source_field_name}  
                    disabled={true}
                    source='source_field_name'  
                />
            )  
        },  
        {  
            title: 'Mapping Type',  
            dataIndex: 'data_mapping_type',  
            key: 'data_mapping_type',  
            render: (_, record) => (  
                <EditableSelectMappingType handleChange={''}
                value={record?.data_mapping_type} disabled={true}/>  
            )  
        },  
        {  
            title: 'Rules',  
            dataIndex: 'data_mapping_rules',  
            key: 'data_mapping_rules',  
            render: (_, record) => (  
                    <EditableArea
                     value={record?.data_mapping_rules}
                     disabled={true}
                    />
            )  
        },  
        {  
            title: 'Target SAP Table',  
            dataIndex: 'target_sap_table',  
            key: 'target_sap_table',  
        },  
        {  
            title: 'Target SAP Field',  
            dataIndex: 'target_sap_field',  
            key: 'target_sap_field',  
        },  
        {  
            title: 'Text Description',  
            dataIndex: 'text_description',  
            key: 'text_description',  
        },  
        {  
            title: 'Look Up Table',  
            dataIndex: 'lookup_table',  
            key: 'lookup_table',  
            render: (_, record) => (  
                <EditableField      
                value={record.lookup_table}  
                disabled={true}
            />
            )  
        },  
        {  
            title: 'Rule Status',  
            dataIndex: 'rule_status',  
            key: 'rule_status',  
            render: (_, record) => (  
                <EditableSelectRuleStatus value={record?.rule_status} disabled={true}
                handleChange={''}/>
            )  
        }  
    ]; 
 
    const handleProjectChange = (value) => {  
        formik.resetForm();
        setExpanded(false);
        setRules(null)
        formik.setFieldValue('selected_project', value);
        formik.setFieldValue('current_project',value);
        const data = {
          obj_id : value,
          project_type : 'dmc'
      }
        dispatch(getBussinessRulesSlice(data))  // we are project id only but it is named has obj_id
        .then((response) => {  
          const filteredObjects = response?.payload?.data?.filter((item)=> item?.project_id === value);
          formik.setFieldValue('objects', filteredObjects);
        })
    };
 
    const handleObjectChange = (value) =>{
        formik.setFieldValue('selected_segment', '');
        formik.setFieldValue('selected_version', null);  
        formik.setFieldValue('current_version', '');
        formik.setFieldValue('selected_object',value);
        formik.setFieldValue('current_object', value);
        formik.setFieldValue('segments',[]);
        formik.setFieldValue('versions',[]);
        setExpanded(false);
        setRules(null);
 
        const data = {
            project_id : formik.values.selected_project,
            object_id : value
        }
        dispatch(getDataSegmentsSlice(data))
        .then((response)=>{
            formik.setFieldValue('segments', response?.payload?.data);  
        })
    };

    const handleSegmentChange  = (value)=>{
        formik.setFieldValue('selected_version',null);
        formik.setFieldValue('current_version', '');
        formik.setFieldValue('selected_segment', value);
        formik.setFieldValue('versions',[]);
        setExpanded(false);
        new Promise((resolve)=>{
                setSpinner(!spinner)
                resolve();
            })
            .then(()=>{
                dispatch(getFieldsOnSegmentSlice({project_id:formik.values.selected_project,object_id:formik.values.selected_object,segment_id:value}))
                .then((response)=>{
                    if(response?.payload?.status === 200){
                        setFields(response?.payload?.data);
                        getVersionsObject(value)
                    }})
                        
                formik.setFieldValue('current_version','In Process');
            })
            setRules(null);
            setSpinner(false);
    }

    const getVersionsObject = (value)=>{
        const data = {
                project_id : formik.values.selected_project,
                object_id  : formik.values.selected_object,
                segment_id : value
            }
            dispatch(getVersionNumberSlice(data))
            .then((response)=>{
                formik.setFieldValue('versions',response?.payload?.data);   
                const newData = {...data , 'verison_number' : response?.payload?.data?.length}
                dispatch(getLatestVersionSlice(newData))
                .then((response)=>{
                    if(response?.payload?.status === 200)
                    {
                      setRules(response?.payload?.data);
                      dispatch(getTableSlice(newData))
                      .then((response)=>{
                        setTableData(response?.payload?.data);
                      })
                    }
                    else{
                       if(alertActive){
                         messageApi.error("No Data Found");
                         setAlertActive(false);
                         setTimeout(()=> setAlertActive(true),3000);
                       }
                    }
                })
            })
    }

    const createDataSource = (expanded) => 
        {
            if(expanded){
                return rules;
            }
            return rules && rules.filter((record)=> record?.isMandatory ==='True') // try optimzation here why filter always
    };
   
    const createDataSourceExpand = () => {  
        setExpanded(!expanded);  
        setRulesSearch(createDataSource(!expanded)); 
    };

    const handleSearch = (e)=>{
        const updatedValues = createDataSource(expanded);
        const filteredData = updatedValues && updatedValues.filter(item => (
            item?.target_sap_field?.toLowerCase().includes(e.toLowerCase()) ||
            item?.target_sap_table?.toLowerCase().includes(e.toLowerCase()) ||
            item?.text_description?.toLowerCase().includes(e.toLowerCase())
        ));
        setRulesSearch(filteredData)
    }

    const handleSearchChange = (e)=>{
        if(!e.target.value)
         setRulesSearch(createDataSource(expanded))
    }


    const handleExcelSheet = ()=>{
        const worksheet = XLSX.utils.json_to_sheet(tabledata);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'table_data.xlsx');
      }
    // // ------------------------------------------------------------------------------------------------------------------------
    const [messagess, setMessages] = useState([]);  
    
      const getFormattedTime = () => {  
        const now = new Date();  
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });  
      };  
    
      const handleSendMessage = (messages) => {  
        if (messages.trim()) {  
          setMessages(prev => [  
            ...prev,   
            {   
              id: Date.now(),   
              text: messages,   
              sender: 'me',   
              type: 'sent',     
              time: getFormattedTime()   
            }  
          ]);  
          try {
            axios.post(`http://127.0.0.1:8000/api/execute_queries/${formik.values.selected_project}/${formik.values.selected_object}/${formik.values.selected_segment}/`,
                {"prompt":messages.toString()}
            )
              .then(response => {
                if (response.status === 200) {
                  // First API call was successful (status 200)
                  console.log("First API call successful!");
                  // Perform the second API call here
                  axios.get(`http://127.0.0.1:8000/api/getTable/${formik.values.selected_project}/${formik.values.selected_object}/${formik.values.selected_segment}/`) // Replace with your second endpoint
                    .then(secondResponse => {
                      console.log("Second API call successful!", secondResponse.data);
                      setTableData(secondResponse.data);
                      // Handle the response from the second API call
                    })
                    .catch(secondError => {
                      console.error("Error in second API call:", secondError);
                      // Handle errors from the second API call
                    });
                } else {
                  console.error("First API call failed with status:", response.status);
                  // Handle other status codes (e.g., 400, 500)
                }
              })
              .catch(error => {
                console.error("Error in first API call:", error);
                // Handle errors from the first API call
              });
          } catch (error) {
            console.error("Unexpected error:", error);
            // Handle any unexpected errors (e.g., network issues)
          }
        }  
      };  
      const messagessEndRef = useRef(null);  

      // Scroll to the top whenever messagess change  
      useEffect(() => {  
        if (messagessEndRef.current) {  
            messagessEndRef.current.scrollTop = messagessEndRef.current.scrollHeight;
        }  
      }, [messagess]);  
    
    // //   -------------------------------------------------------------------------------------------------------

  return (
    <div className="container-fluid" style={{ width: "95.5vw" }}>  
    {contextHolder}
    <div className='row w-100 d-flex justify-content-between mt-2'>  

    <Form className="options_header"> 
    <Form.Item>
    <label style={{ color: "skyblue", fontSize: "20px",marginRight:"20px",marginLeft:"10px" }}>WorkSpace</label> 
    </Form.Item>
    <Form.Item label="Project" className="mb-0"> 
        <Select  
        style={{ width: 150 }}   
        onChange={handleProjectChange}  
        key={formik.values.current_project || undefined}  
        value={formik.values.current_project || undefined}  
        dropdownStyle={{ maxHeight: 200, overflowY: 'auto' }}  
        >  
        {allProjects?.map((project) => (  
            <Option key={project?.project_id} value={project?.project_id}>  
            {project?.project_name}  
            </Option>  
        ))}  
        </Select>  
    </Form.Item>  

    <Form.Item label="Object" className="mb-0">
        <Select  
        style={{ width: 150 }}   
        key={formik.values.selected_object || undefined}  
        value={formik.values.current_object || undefined}  
        onChange={handleObjectChange}  
        dropdownStyle={{ maxHeight: 200, overflowY: 'auto' }}  
        >  
        {formik.values.objects && formik.values.objects?.map((object) => (  
            <Option key={object?.obj_id} value={object?.obj_id}>  
            {object?.obj_name}  
            </Option>  
        ))}  
        </Select>  
    </Form.Item>  

    <Form.Item label="Segment" className="mb-0">
        <Select  
        style={{ width: 200 }}  
        onChange={handleSegmentChange}  
        value={formik.values.selected_segment || undefined}  
        dropdownStyle={{ maxHeight: 200, overflowY: 'auto' }}  
        >  
        {formik.values.segments && formik.values.segments?.map((segment) => (  
            <Option key={segment?.segment_id} value={segment?.segment_id}>  
            {segment?.segement_name}  
            </Option>  
        ))}  
        </Select>  
    </Form.Item>  

    <Form.Item>
    <Tooltip title="Export Target Table" color={'black'} key={'black'}>
    <FaDownload style={{color:'blue',cursor:'pointer'}} onClick={handleExcelSheet}/>
    </Tooltip>
    </Form.Item>

    <Form.Item>  
                <Tooltip title="Show All Fields" color={'black'} key={'black'}>  
                    <Switch checked={expanded} onChange={createDataSourceExpand} size='small'/>  
                </Tooltip>  
            </Form.Item>

    <Form.Item>
        <Search placeholder="Search by Sap Table Sap Field" 
            onSearch={(e)=>handleSearch(e)}
            enterButton 
            onChange={(e)=>handleSearchChange(e)}
            style={{ minWidth:"180px", maxWidth:"180px", marginRight:"10px",marginBottom:"1px",maxHeight: "32px"}} 
            />
    </Form.Item>    
    </Form>
    </div> 

    <div className="row" style={{ height: "78vh" }}>  
        <Splitter
        layout="horizontal"  
        lazy
        style={{ height: 470, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
        >
            <Splitter.Panel collapsible defaultSize="30%" min="10%" max="70%">  
      <div className="col-12 col-md-3 d-flex flex-column h-100 w-100">  
        <div className="flex-grow-1 border rounded shadow-sm overflow-hidden">  
          <div className="d-flex flex-column h-100 bg-light">       
            <div className="flex-grow-1 overflow-auto p-3" ref={messagessEndRef}>  
              {messagess.map(msg => ( // Render messagess in normal order  
                <div  
                  key={msg.id}  
                  className={`d-flex ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}  
                >  
                  <div className={`p-1 rounded ${msg.type === 'sent' ? 'text-dark' : 'bg-light text-dark'}`} style={{fontSize:"10px"}}>  
                    {msg.text}  
                    <div className={`small text-end ${msg.type === 'sent' ? 'text-muted' : 'text-secondary'}`} style={{fontSize:"8px"}}>  
                      {msg.time}  
                    </div>  
                  </div>  
                </div>  
              ))}  
            </div>  
            <EditableChat onUpdate={handleSendMessage}/>
          </div>  
        </div>  
      </div>  
    </Splitter.Panel>    

      <div className="col-12 col-md-9 d-flex flex-column h-100">  
        <Splitter  
            layout="vertical"  
            lazy
            style={{  
            flex: 1,
            height: 200,
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',  
            }}  
        >  
            <Splitter.Panel style={{flex: 1}} collapsible defaultSize="40%" min="10%" max="70%"> 

            <div className="table-container mb-3 flex-grow-1 scrollbar">  
                <Table  
                columns={columns}  
                dataSource={rulesSearch || []}
                className="WorkSpaceTable"  
                pagination={{ pageSize: 7, showQuickJumper: true, showSizeChanger: false }}  
                />  
            </div>  
            </Splitter.Panel>  

            <Splitter.Panel style={{flex: 1}} collapsible> {/* Allow second panel to grow */}  
            <div className="table-container2 flex-grow-1 rounded scrollbar">  
                <Table  
                dataSource={tabledata || []}  
                className="WorkSpaceTargetTable"
                pagination={{ pageSize: 13, showQuickJumper: true, showSizeChanger: false}}  
                >  
                {fields.map((i) => (  
                    <Table.Column  
                    title={i['fields']}  
                    dataIndex={i['fields']}  
                    key={i['fields']}  
                    />  
                ))}  
                </Table>  
            </div>  
            </Splitter.Panel>  
        </Splitter>  
    </div>  

      </Splitter>
    </div>
  </div>  
  )
}

export default WorkSpace