import React, { useEffect, useState } from 'react';  
import { Input, Popover, Select } from 'antd';
import { CiEdit } from "react-icons/ci";
import { Option } from 'antd/es/mentions';
import { FaPaperPlane } from 'react-icons/fa';  
import TextArea from 'antd/es/input/TextArea';

export const EditableField = (props) => { 
    const { value, onUpdate,disabled,source } = props 
    const [inputValueSource, setInputValueSource] = useState(value); 

    useEffect(() => {  
        setInputValueSource(value);
    }, [value]);  

    const changeValue = (e) => {  
            // if (source === "source_field_name") {  
            //     if (e?.target?.value?.includes(" ")){  
            //         setInputValueSource(e?.target?.value.split(' ')[0]);
            //         alert("No Space is Allowed");
            //         return;
            //     } 
            // }  
            setInputValueSource(e?.target?.value);  
    };  

    const handleBlur = () => {
        onUpdate(inputValueSource);
        setInputValueSource('')
    };  

    return (  
        <div>        
        <Input  
            style={{   
                width: 150,   
                height: 50,   
                borderRadius: "0px",   
                border: "none" 
            }}    
            className='disabled-button'
            disabled={disabled}
            value={inputValueSource}
            onChange={(e) => changeValue(e)} 
            onBlur={handleBlur}
        />  
        </div>
    );  
};

export const EditableArea = (props) => { 
    const { value, onUpdate,disabled } = props 
    const [inputValueSource, setInputValueSource] = useState(value); 
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const hide = () => {
      setClicked(false);
      setHovered(false);
    };
    const handleHoverChange = (open) => {
        setHovered(open);
        setClicked(false);
      };

      const handleClickChange = (open) => {
        setHovered(false);
        setClicked(open);
      };

    useEffect(() => {  
        setInputValueSource(value);
    }, [value]);  

    const handleBlur = () => {  
        onUpdate(inputValueSource);
    };  

    return (  
        <div style={{cursor:"pointer"}}>
            <Popover
      style={{ width: 500 }}
      content={<textarea  
                disabled={disabled}
                    className="fixed-height-textarea disabled-button" 
                    value={inputValueSource}  
                    onChange={(e) => setInputValueSource(e?.target?.value)}  
                    rows="3"  
                    style={{ width: 450, height: 100 }}  
                    onBlur={handleBlur}
                />}
      title="Data Mapping Rules"
      trigger="hover"
      open={hovered}
      onOpenChange={handleHoverChange}
    >
        <Popover
            content={<textarea  
                disabled={disabled}
                    className="fixed-height-textarea"  
                    value={inputValueSource}  
                    onChange={(e) => setInputValueSource(e?.target?.value)}  
                    rows="3"  
                    style={{ width: 450, height: 100 }}  
                    onBlur={handleBlur}
                /> }
            title="Data Mapping Rules"
            trigger="click"
            open={clicked}
            onOpenChange={handleClickChange}
            >
               {inputValueSource?.length > 0 ? <CiEdit style={{color:"blue",fontSize:"20px"}}/>  :  <CiEdit style={{fontSize:"20px"}}/>} 
        </Popover>
        </Popover>
        </div>
    );  
};

export const EditableChat = (props) =>{
    const {onUpdate}  = props
    const [message,setMessage] = useState();
    const sendMessage = (message)=>{
        onUpdate(message);
        setMessage('');
    }
    const handleKeyDown = (e) => {  
        if (e?.shiftKey !== true && e?.key === 'Enter') {  
          e.preventDefault(); 
          sendMessage(e?.target?.value);
        }  
      };  
    return(
    <div className="border-top p-3">  
              <div className="position-relative">   
                <TextArea  
                  className="form-control fixed-height-textarea"  
                  value={message}  
                  placeholder='Type Your Message'  
                  onChange={(e) => setMessage(e?.target?.value)}  
                  onKeyDown={handleKeyDown} 
                  id="exampleFormControlTextarea1"   
                  rows="3"  
                  style={{ paddingRight: '40px' }}   
                />  
                <button  
                  onClick={()=>sendMessage(message)}  
                  className="btn btn-primary position-absolute"  
                  style={{   
                    bottom: '10px',   
                    right: '10px',   
                    zIndex: 1         
                  }}  
                >  
                  <FaPaperPlane />      
                </button>  
              </div>  
            </div>  
    )
}

export const EditableSelectMappingType = (props)=>{
    const {handleChange,value,disabled} = props
  return(
    <div style={{ padding: 10 }}>  
        <Select  
            onChange={handleChange}  
            style={{ width: 100 }}
            value={value}
            disabled={disabled}
        >  
            <Option value='1:1'>1:1</Option>  
            <Option value='Constant'>Constant</Option>  
            <Option value='LLM'>LLM</Option>  
        </Select>  
    </div>
  )
}

export const EditableSelectRuleStatus = (props)=>{
  const {disabled,value,handleChange} = props;
  return(
    <div style={{ padding: 10 }}>  
          <Select  
          disabled={disabled}
              value={value}  
              onChange={handleChange}  
              style={{ width: 100 }}  
          >  
              <Option value='Completed'>Completed</Option>  
              <Option value='In Progress'>In Progress</Option>  
              <Option value='To Start'>To Start</Option>  
              <Option value='On Hold'>On Hold</Option>  
          </Select>  
      </div>  
  )
}
