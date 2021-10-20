import React from "react";
import sssImage from '../Img/sss.jpg';

const Report = (props) => {
    return (
        <div className="container">
            <h3>Length of side A of the triangle is {props.triangle.hypotenuse} millimetres</h3>
            <h3>Length of side B of the triangle is {props.triangle.adjacent} millimetres</h3>
            <h3>Length of side C of the triangle is {props.triangle.opposite} millimetres</h3>
            <h3>Angle of corner A of the triangle in {props.triangle.angleA} degrees</h3>
            <h3>Angle of corner B of the triangle in {props.triangle.angleB} degrees</h3>
            <h3>Angle of corner C of the triangle in {props.triangle.angleC} degrees</h3>
            <h2>Triangle Classification: {props.triangle.classification}</h2>
            <h2>Traingle Categorization: {props.triangle.categorization}</h2>
            <div><a href="http://localhost:3000/selection" className="btn btn-outline-success buttonPad">Finished</a><img src={sssImage} /></div>
        </div>
    );
} 

export default Report;