import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import FlatFile from './components/pages/Connections/FlatFile/flatFile';
import MainScreen from './components/pages/MainScreen/MainScreen';
import MySqlForm from './components/pages/Connections/Forms/MySqlForm';
import HanaForm from './components/pages/Connections/Forms/HanaForm';
import ErpForm from './components/pages/Connections/Forms/ErpForm';
import OracleForm from './components/pages/Connections/Forms/OracleForm';
import ViewConnection from './components/pages/Connections/ViewConnections/ViewConnection';
import LandingPage from './components/pages/LandingPage';
import ManageProjects from './components/pages/Project/ManageProjects';
import ViewSapTables from './components/pages/Connections/ViewConnections/ViewSapTables';
import ViewHanaTables from './components/pages/Connections/ViewConnections/ViewHanaTables';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProjectsSlice } from './components/features/Project/projectSlice';
import CreateBussinessRules from './components/pages/Bussiness Rules/createBussinessRules';
import ManageBussinessRules from './components/pages/Bussiness Rules/manageBussinessRules';
import ViewBussinessRule from './components/pages/Bussiness Rules/ViewBussinessRule';
import WorkSpace from './components/pages/WorkSpace/WorkSpace';
import ViewSegmentTables from './components/pages/Bussiness Rules/viewSegmentTables';
import SuccessFactor from './components/pages/Connections/SuccessFactor';
import PageNotFound from './components/pages/PageNotFound';
import ManageSuccessFactors from './components/pages/Connections/manageSuccessFactors';


function App() {

      // const [messageApi,contextHolder] = message?.useMessage();
      
      const dispatch = useDispatch();
      useEffect(()=>{
        dispatch(getProjectsSlice())
      },[dispatch]); 
  
  return (
    <>
    {/* {contextHolder} */}
        <BrowserRouter>
          <Routes>
            {/* MainScreen Route*/}
            <Route path="/" element={<MainScreen/>} >
              <Route index element={<LandingPage/>}/>
              <Route path='/pagenotfound' element={<PageNotFound/>}/>
            </Route>

            {/* Project Routes */}
            <Route path='/project' element={<MainScreen/>}>
            <Route path='manageprojects' element={<ManageProjects/>}/>
            </Route>

            {/* Connections Routes */}
            <Route path="/connections" element={<MainScreen/>}>
              <Route path='mysql' element={<MySqlForm/>}/>
              <Route path='mysql/:id/:project_id' element={<MySqlForm/>}/>
              <Route path='hana' element={<HanaForm/>}/>
              <Route path='hana/:id/:project_id' element={<HanaForm/>}/>
              <Route path='erp' element={<ErpForm/>}/>
              <Route path='erp/:id/:project_id' element={<ErpForm/>}/>
              <Route path='oracle' element={<OracleForm/>}/>
              <Route path='oracle/:id/:project_id' element={<OracleForm/>}/>
              <Route path='flatfile' element={<FlatFile/>} />
              <Route path='view-connections' element={<ViewConnection/>} />
              <Route path='success-factor' element={<SuccessFactor/>} />
              <Route path='success-factor/upload/:id' element={<SuccessFactor/>} />
              <Route path='success-factor/reupload/:id' element={<SuccessFactor/>} />
              <Route path='manage/success-factors' element={<ManageSuccessFactors/>} />
              <Route path='view-tables/saptables/:connection_name/:project_id' element={<ViewSapTables/>} />
              <Route path='view-tables/:id/:conn_name' element={<ViewHanaTables/>} />
            </Route>
            
            {/* Workspace Routes*/}
            <Route path="/workspace" element={<MainScreen/>}>
            <Route index element={<WorkSpace/>}/>
                <Route path='extractions' element={''}/>
                <Route path='cleanse' element={''}/>
                <Route path='cleansedata' element={''}/>
                <Route path='transformdata' element={''}/>
                <Route path='preload' element={''}/>
                <Route path='load' element={''}/>
                <Route path='reconsile' element={''}/>
            </Route>


            <Route path='/bussinessrules' element={<MainScreen/>}>
                  <Route path='viewsegmenttables/:record_details' element={<ViewSegmentTables/>}/>
                  <Route path='create' element={<CreateBussinessRules/>}/>
                  <Route path='create/:project_id' element={<CreateBussinessRules/>}/>
                  <Route path='reupload' element={<CreateBussinessRules/>}/>
                  <Route path='reupload/:project_id' element={<CreateBussinessRules/>}/>
                  <Route path='manage' element={<ManageBussinessRules/>}/>
                  <Route path='views' element={<ViewBussinessRule/>}/>
                  <Route path='views/:project_id/:object_id' element={<ViewBussinessRule/>}/>
            </Route>



          </Routes>

        </BrowserRouter>
    </>
  );
}

export default App;
