import React from 'react';
import './Button.css'

export default props => {
    return (
       <button className={`
        button 
        ${props.operation ? 'operation': ''} 
        ${props.triple ? 'triple': ''} 
        ${props.double ? 'double': ''} 
       `}
        onClick={(e) => {props.click(props.label);}}
       >
           {props.label}
           </button>
    )
}