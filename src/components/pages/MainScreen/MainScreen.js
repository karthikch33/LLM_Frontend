import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import { Button, Dropdown, Layout, Menu, theme } from 'antd';
import { GiHamburgerMenu } from 'react-icons/gi';    
import { HiDatabase  } from "react-icons/hi";     
import { SiCrehana } from "react-icons/si";
import { Outlet } from 'react-router-dom';  
import { SiMysql } from "react-icons/si";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { MdInsertDriveFile   } from "react-icons/md";
import { TbPlugConnected } from "react-icons/tb"
import { BsFillEyeFill   } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { FaDiagramProject } from "react-icons/fa6";
import { SiOracle } from "react-icons/si";
import { SiCodefactor } from "react-icons/si";
import { LiaUserCircleSolid } from "react-icons/lia";
import { SiEnterprisedb } from "react-icons/si";   
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { BiSolidFileExport } from 'react-icons/bi';
import { GrTransaction } from 'react-icons/gr';
import { PiSignOutThin } from "react-icons/pi";
import { AiOutlineDashboard } from 'react-icons/ai';
import { FaLink } from "react-icons/fa6";
import { ToastContainer } from 'react-toastify';
import { IoHomeOutline } from 'react-icons/io5';

const items = [  
  {  
    key: '/',  
    icon: <IoHomeOutline  className='fs-4' />,  
    label: 'Home',
  }, 
  { 
    key:'/project/manageprojects',
    icon: <FaDiagramProject  className='fs-4'/>,  
    label: 'Project',
  },   
  {  
    icon: <FaLink  className='fs-4' />,  
    label: 'Connections',
    children:[
      {
        key:'/connections',
        icon: <TbPlugConnected className='fs-4' />,  
        label: 'Create Connections',
        children:[ {  
          key: '/connections/Erp',  
          icon: <SiEnterprisedb  className='fs-4'/>,  
          label: 'ERP',  
        }, 
        {  
          key: '/connections/flatfile',  
          icon: <MdInsertDriveFile  className='fs-4' />,  
          label: 'Files',
        },    
        {  
          key:'/database',
          icon: <HiDatabase  className='fs-4' />,  
          label: 'Database',
          children:[
            {  
              key: '/connections/Hana',  
              icon: <SiCrehana  className='fs-4'/>,  
              label: 'HANA',  
            }, 
            {
              key: '/connections/MySql',
              icon: <SiMysql className='fs-4' />,  
              label: 'MySQL'
            },
            {
              key: '/connections/Oracle',
              icon: <SiOracle className='fs-4' />,  
              label: 'Oracle'
            }
            ]   
        }]
      },
      {
        key: '/connections/view-connections',
        icon: <BsFillEyeFill className='fs-4' />,  
        label: 'Manage Connections'
      },        
      {
        key: '/connections/manage/success-factors',
        icon: <SiCodefactor className='fs-4' />,  
        label: 'Success Factor'
      }        
    ]},  
  {  
    key: '/bussinessrules/manage',  
    icon: <i className={'fas fa-scale-balanced'}></i> ,  
    label: 'Bussiness Rules',
  },    
  {
    key: '/reports',
    icon: <TbReportAnalytics className='fs-4' />,  
    label: 'Reports'
  },
  {
    key : '/workspace',
     icon:<i className={'fas fa-blog'}></i>,  
    label: 'My WorkSpace',
    children:[
      {  
        key: '/workspace',  
        icon: <BiSolidFileExport className='fs-4' />,  
        label: 'WorkSpace'  
      },  
      {  
        key: '/workspace/extractions',  
        icon: <BiSolidFileExport className='fs-4' />,  
        label: 'Extractions'  
      },  
      {  
        key: '/workspace/cleanse',  
        icon: <GrTransaction className='fs-4' />,  
        label: 'Cleanse'  
      },  
      {  
        key: '/workspace/cleansedata',  
        icon: <AiOutlineDashboard className='fs-4' />,  
        label: 'Cleanse Data'  
      },  
      {  
        key: '/workspace/transformdata',  
        icon: <AiOutlineDashboard className='fs-4' />,  
        label: 'Transform Data'  
      }  ,
      {  
        key: '/workspace/preload',  
        icon: <AiOutlineDashboard className='fs-4' />,  
        label: 'Preload'  
      } ,
      {  
        key: '/workspace/load',  
        icon: <AiOutlineDashboard className='fs-4' />,  
        label: 'Load'  
      }
    ]
  }
  
];

const profileItems = [  
  {  
    key: '/username',  
    label: 'Karthik Aditya',
  },  
  {  
    key: '/signout',  
    icon: <PiSignOutThin /> ,  
    label: 'Sign Out',
  },  
];  

const MainScreen = () => 
 {  
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);  
  const [selectedKey, setSelectedKey] = useState('1'); // Add state for the selected key  
  const {  
    token: { colorBgContainer },  
  } = theme.useToken();  

  const handleMenuClick = (e) => {  
    setSelectedKey(e.key); 
    navigate(e.key);
  };  

  const returnHome = () => {
    navigate('/');
  }


  return (  
    <div>  
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
          <Header style={{ padding: 0,maxHeight:"50px" }} className='d-flex justify-content-between ps-3 pe-5'>  
          <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between',width:"100%" }}>
            <div>
              <img src='https://mma.prnewswire.com/media/844530/YASH_Technologies_Logo.jpg?p=publish' className='rounded-circle' alt='logo' style={{width:'45px', height:"45px"}}/>
            <Button  
            type="text"  
            icon={collapsed ? <GiHamburgerMenu /> : <GiHamburgerMenu />}  
            onClick={() => setCollapsed(!collapsed)}  
            style={{  
              fontSize: '16px',
              width: 64,  
              height: 64,  
              marginLeft: collapsed ? '20px' : '165px' // Add some space between buttons
            }}  
          />
          
            </div>
            <div>
                  <Dropdown  
        overlay={  
          <Menu>  
            {profileItems.map(item => (  
              <Menu.Item key={item.key}>  
                {item.icon} {item.label}  
              </Menu.Item>  
            ))}  
          </Menu>  
        }  
        placement="bottomRight"  
        arrow  
      >   
        <LiaUserCircleSolid style={{ width: "30px", height: "30px",cursor:"pointer" }} />  
      </Dropdown>  
            </div>
    </div>
          </Header>  
         
      <Layout hasSider>  
        <Sider trigger={null} collapsible collapsed={collapsed} className='main-part' theme='dark'>  
          <Menu  
            theme="dark"  
            mode="inline"  
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick} 
            items={items}  
          />  
        </Sider>  
        <Layout>  
          <Content  
            style={{  
              margin: '24px 16px',  
              padding: 24,  
              // minHeight: 280,
              overflowY:"scroll",  
              // border:"10px solid red",
              background: colorBgContainer,  
            }}  
          >  
            <Outlet/>  
          </Content>  
        </Layout>  
      </Layout>  
    </div>     
  )    
};  

export default MainScreen;