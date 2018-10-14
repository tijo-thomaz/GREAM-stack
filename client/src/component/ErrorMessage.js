import React from 'react';

const ErrorMessage =(props)=>{
    return(<span className="help-block text-danger"><i className="icon-cancel-circle2 position-left"></i>{props.error.message}</span>)
}


export default ErrorMessage;