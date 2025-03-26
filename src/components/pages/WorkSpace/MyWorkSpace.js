import React, { useEffect, useState } from 'react';
import { Table, Input, Select, Form,Button } from 'antd';
import axios from 'axios';
import './MyWorkSpace.css';
import ChatUI from '../SampleForm';
 
const { Option } = Select;
 
const MyWorkSpace = () => {
 
  const [tabledata,setTableData] = useState([]);
 
  const [selectedRules, setSelectedRules] = useState([]);
  const [rules, setRules] = useState([]);
  const [projects,setprojects] = useState([]);
  const [objects,setObjects] = useState([]);
  const [segments,setsegments] = useState([]);
  const [fields,setfields] = useState([]);
  const [versions,setVersions] = useState([]);
  const [vPress,setvPress] = useState(true);
  const [editable, setEditable] = useState(true);
 
  const [feildFlag,setFeildFlag]=useState(false);
  const [ruleFlag,setRuleFlag]=useState(false);
 
  const [selectedProject, setSelectedProject] = useState(null); // Store selected project
  const [selectedObject,setselectedObject] = useState();
  const [selectedSegment,setselectedSegment] = useState();
  const [selectedVersion,setselectedVersion] = useState();
  // const [enabelPopUp, setEnabelPopUp] = useState(false);
 
  const[dataBaseFlag,setdataBaseFlag] = useState(true);
  const [tick, setTick ] = useState(false);
 
 
 
 
  const fetchProjects = async()=>{
    const response = await axios.get("http://127.0.0.1:8000/api/Pget/");
    setprojects(response.data);
  }
 
  useEffect(()=>{
    fetchProjects();
  },[])
 
 
 
  const handleCheckboxChange = (index) => {
    setTick(!tick)
    const updatedRules = [...rules];
    updatedRules[index].check_box = !updatedRules[index].check_box;
    setRules(updatedRules);
 
    const updatedSelectedRules = updatedRules.filter((rule) => rule.check_box);
    setSelectedRules(updatedSelectedRules);
  };
 
  const handleInputChange = (index, field, value) => {
    const updatedRules = [...rules];
    updatedRules[index][field] = value;
    setRules(updatedRules);
  };
 
 
  const handleProjectChange = (value) => {
    setSelectedProject(value);
    setselectedObject();
    setselectedSegment();
    setselectedVersion();
 
 
  };
 
  const fetchObjects = async ()=>{
    try{
      const response = await axios.get(`http://127.0.0.1:8000/api/PdataObject/${selectedProject}/`);
      setObjects(response?.data);
    }
    catch{
 
    }
  }
 
  useEffect(()=>{
    fetchObjects();
  },[selectedProject])
 
 
  const handleSegmentChange = (value) => {
    setselectedSegment(value);
    setselectedVersion();
    setEditable(true);
 
  };
  const handleObjectChange = (value) => {
    setselectedObject(value);
    setselectedSegment();
    setselectedVersion();
  };
 
  const fetchSegments = async ()=>{
    try{
      const response = await axios.get(`http://127.0.0.1:8000/api/Osegements/${selectedProject}/${selectedObject}/`)
      console.log("dddddsssss",response?.data)
      setsegments(response?.data);
    }
    catch{
 
    }
   
  }
  useEffect(()=>{
    fetchSegments();
  },[selectedObject])
 
 
  const fetchfields = async()=>{
    try{
      const response = await axios.get(`http://127.0.0.1:8000/api/Sfields/${selectedProject}/${selectedObject}/${selectedSegment}/` );
      setfields(response?.data);
      setFeildFlag(!feildFlag);
    }
    catch{
      
    }  
  };
  useEffect(()=>{
    fetchfields();
  },[selectedSegment])
 
 
  const getTableData = async ()=>{
    try{
    const response = await axios.get(`http://127.0.0.1:8000/api/getTable/${selectedProject}/${selectedObject}/${selectedSegment}/`)
    setTableData(response?.data);
    console.log("table dataa",response?.data);
  }
    catch{
    }
  }
    useEffect(()=>{
      fetchfields();
      getTableData();
    },[selectedSegment]); 
 
    function mergeData( fieldData) {
      const mergedData = [];
      fieldData.forEach((field) => {
        mergedData.push({
          version_id : 0 ,
          source_table: '',
          source_field_name: '',
          data_mapping_type:'',
          data_mapping_rules: '',
          project_id : selectedProject,
          object_id : selectedObject,
          field_id : field.field_id,
          segment_id : selectedSegment,
          target_sap_table: field.sap_structure,
          target_sap_field: field.fields,
          text_description: field.description,
          lookup_table: "",
          last_updated_by: 'System',
          last_updated_on:'',
          rule_status: '',
          check_box: field.isMandatory,
          isMandatory : field.isMandatory
        });
      });
      return [ ...mergedData];
    }
    useEffect(()=>{
      const temp = mergeData(fields);
        setRules(temp);
    },[dataBaseFlag]);
   
    const fetchRules = async (projectId, objectId, segmentId) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/GetSaveRules/${projectId}/${objectId}/${segmentId}/`);
        // setdataBaseFlag(!dataBaseFlag);
        return response.data;
      } catch (error) {
        // const temp = mergeData(fields);
        // setRules(temp);
        setdataBaseFlag(!dataBaseFlag);
      }
   
    };
      useEffect(()=>{
        const data = fetchRules(selectedProject,selectedObject,selectedSegment);
        data.then((data)=>{
          setRules(data);
          console.log("ffffffffffffdggg",data);
        })
      },[selectedSegment])
  useEffect(() => {
    if (selectedSegment) {
      try{
      const fetchRules = async () => {
const response = await axios.get(`http://127.0.0.1:8000/api/GetSaveRules/${selectedProject}/${selectedObject}/${selectedSegment}/`);
        setRules(response.data);
        console.log("rruuuulytres",response.data);
      };
      fetchRules().then(()=>{}).catch(()=>{
        const data =mergeData(fields);
        setRules(data);
      });
    }
      catch{
        const data =mergeData(fields);
        setRules(data);
      }
    }
  }, [selectedSegment]);
 
 
  return (
    <div className='container-fluid' style={{ width: "95.5vw" }}>
      <div className='row w-100 d-flex justify-content-between my-3'>
        <Form layout="inline" className="filter-form">
          <Form.Item label="Project Name">
            <Select style={{ width: 200 }} onChange={setSelectedProject} value={selectedProject}>
              {projects.map(project => (
                <Option key={project.project_id} value={project.project_id}>{project.project_name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Data Object">
            <Select style={{ width: 200 }} onChange={handleObjectChange} value={selectedObject}>
              {objects.map(object => (
                <Option key={object.obj_id} value={object.obj_id}>{object.obj_name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Data Segment">
            <Select style={{ width: 200 }} onChange={handleSegmentChange} value={selectedSegment}>
              {segments.map(segment => (
                <Option key={segment.segment_id} value={segment.segment_id}>{segment.segement_name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
      <div className='row' style={{ width: "100%", height: "73.5vh", border: '1px solid green', display: "flex" }}>
        <div className='col-md-3 border border-primary' style={{ height: "100%", padding: "0px" }}>
          <ChatUI props={{ project_id: selectedProject, object_id: selectedObject, segment_id: selectedSegment }} />
        </div>
        <div className='col-md-9 border border-warning' style={{ height: "100%", padding: "0px", display: "flex", flexDirection: "column" }}>
          <div className='table-container' style={{ overflowY: 'auto', flex: 1, width: '100%', maxHeight: '50%' }}>
            <Table dataSource={rules} pagination={true} rowKey="field_id">
              <Table.Column title="Source Table" dataIndex="source_table" key="source_table" render={(text, record) => <Input value={text} onChange={(e) => { record.source_table = e.target.value; setRules([...rules]); }} />} />
              <Table.Column title="Source Field Name" dataIndex="source_field_name" key="source_field_name" render={(text, record) => <Input value={text} onChange={(e) => { record.source_field_name = e.target.value; setRules([...rules]); }} />} />
              <Table.Column title="Data Mapping Type" dataIndex="data_mapping_type" key="data_mapping_type"/>
              <Table.Column title="Data Mapping Rules" dataIndex="data_mapping_rules" key="data_mapping_rules" render={(text, record) => <Input value={text} onChange={(e) => { record.data_mapping_rules = e.target.value; setRules([...rules]); }} />} />
              <Table.Column title="Target SAP Table" dataIndex="target_sap_table" key="target_sap_table" />
              <Table.Column title="Target SAP Field" dataIndex="target_sap_field" key="target_sap_field" />
              <Table.Column title="Text Description" dataIndex="text_description" key="text_description" />
              <Table.Column title="Look Up Table" dataIndex="lookup_table" key="lookup_table" />
              <Table.Column title="Last Updated By" dataIndex="last_updated_by" key="last_updated_by" />
              <Table.Column title="Last Updated On" dataIndex="last_updated_on" key="last_updated_on" />
              {/* <Table.Column title="Rule Status" dataIndex="last_updated_on" key="last_updated_on" /> */}
            </Table>
          </div>
          <div className='border border-secondary ' style={{ flex: 1, display: 'flex' }}>
          <div className='table-container' style={{ overflowY: 'auto', flex: 1, width: '100%', maxHeight: '75%' }}>
          <Table dataSource={tabledata} pagination={{pageSize:5}}>
              {
                fields.map((i)=><Table.Column title={i['fields']} dataIndex={i['fields']} key={i['fields']} />)
              }
              </Table>
          </div>
       
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default MyWorkSpace;