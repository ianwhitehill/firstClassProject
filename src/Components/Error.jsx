import React from "react";

const Error = (props) => {
    return (
        <div  className="container">
            <h1>Error:</h1>
            <h3>{props.triangle.errorMessage}</h3>
			<div><a href="http://localhost:3000/selection" className="btn btn-outline-danger">Acknowledge</a></div>
        </div>
    );
} 

export default Error;