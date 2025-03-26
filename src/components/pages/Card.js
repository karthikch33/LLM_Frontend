import React from 'react';  
import '@fortawesome/fontawesome-free/css/all.min.css';   
import { Link } from 'react-router-dom';  

const Card = ({ title, description, icon, link }) => {  
  const cardStyle = {  
    backgroundColor: '#fff',  
    borderRadius: '10px',  
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  
    textAlign: 'center',  
    transition: 'transform 0.2s',  
    marginBottom:"10px",
    width: '90%',   
    maxWidth: '300px', 
  };  
   
  const iconStyle = {  
    fontSize: '2rem', // Reduced icon size for a smaller card  
    color: '#4a90e2',   
    marginTop: '20px',   
  };  
   
  const titleStyle = {  
    fontSize: '1.25rem', // Adjusted title size  
    margin: '10px 0',  
    color: '#333',  
  };  
   
  const descriptionStyle = {  
    padding: '0 10px', // Reduced padding for description  
    color: '#666',  
    marginBottom: '20px',   
  };  
   
  return (  
    <Link to={link} style={{ textDecoration: 'none' }}>  
      <div style={cardStyle} className="card">  
        <i className={icon} style={iconStyle}></i>  
        <h3 style={titleStyle}>{title}</h3>  
        <p style={descriptionStyle}>{description}</p>  
      </div>  
    </Link>  
  );  
};  
   
export default Card;