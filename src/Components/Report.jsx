import React from "react";
import sssImage from '../Img/all.jpg';

const Report = (props) => {
    return (
        <div className="container text-center topPad">
            <h3>Length of side A of the triangle is {props.triangle.hypotenuse} millimetres</h3>
            <h3>Length of side B of the triangle is {props.triangle.adjacent} millimetres</h3>
            <h3>Length of side C of the triangle is {props.triangle.opposite} millimetres</h3>
            <h3>Angle of corner <i>a</i> of the triangle in {props.triangle.angleA} degrees</h3>
            <h3>Angle of corner <i>b</i> of the triangle in {props.triangle.angleB} degrees</h3>
            <h3>Angle of corner <i>c</i> of the triangle in {props.triangle.angleC} degrees</h3>
            <h2>Triangle Classification: {props.triangle.classification}</h2>
            <h2>Traingle Categorization: {props.triangle.categorization}</h2>
            <div><a href="http://localhost:3000/selection" className="btn btn-outline-success buttonPad">Finished</a><img src={sssImage} /></div>
        </div>
    );
} 

export default Report;