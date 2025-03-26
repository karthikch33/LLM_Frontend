import { Input } from 'antd'
import React from 'react'

const CustomInput = (props) => {
    const {label,type,name,value,handleChange,blur,disabled,touched,error,placeholder} = props
  return (
   <>
    <div className="row mt-3 d-flex align-items-center" >  
        <label htmlFor="connection_name" className='col-4'>{label}</label> 
        <div className='col-8'>
        <Input
            type={type}
            name={name} 
            value={value}  
            onChange={handleChange}
            placeholder={placeholder}
            onBlur={blur}
            disabled={disabled}   
        />  
        </div>
    </div>    

    <div className='row'>
        <label className='col-4'></label>
        <div className='col-8'>
        <div className="error" style={{overflowX:"auto"}}>
            {touched && error}
        </div>  
        </div>
    </div>
   </>
  )
}


export default CustomInput