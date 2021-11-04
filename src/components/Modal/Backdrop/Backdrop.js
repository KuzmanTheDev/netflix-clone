import React from 'react';
import  './Backdrop.css';


const Backdrop = ({visible}) =>{
    return(
       visible ? <div className ='Backdrop'></div> : null
    );
}

export default Backdrop;