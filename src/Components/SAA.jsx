import { useState } from 'react';
import { Redirect } from "react-router-dom";
import saaImage from '../Img/saa.jpg';

const SAA = (props) => {
    // Object properties 
    const [myAtt, setMyAtt] = useState({
        hypotenuse: 0,
        adjacent: 0,
        opposite: 0,
        angleA: 0,
        angleC: 0,
        angleB: 0,
        categorization: "",
        classification: "",
        errorMessage: ""
    })
    // Error flag
    const [error, setError] = useState({ foundError: false })
    // Report flag
    const [redirecter, setRedirect] = useState({ redirect: false })
    // Setting props
    const updateAtt = e => {
        setMyAtt({ ...myAtt, [e.target.name]: e.target.value });
    }
    // Validation and error handeling 
    const createAttFunction = e => {
        e.preventDefault();
        // Validation
        if (myAtt.hypotenuse <= 0 || myAtt.angleB <= 0 || myAtt.angleC <= 0) {
            myAtt.errorMessage = "All inputs must be a positive number greater then 0";
            props.setAtt(myAtt);
            return setError({ foundError: true });
        }
        // Error handling
        if (myAtt.angleB + myAtt.angleC <= 180) {
            myAtt.errorMessage = "Angles must be less then 180 degrees";
            props.setAtt(myAtt);
            return setError({ foundError: true });
        }
        // Aglo to find sides 
        myAtt.angleA = 180 - myAtt.angleB - myAtt.angleC;
        var sinA = Math.sin(myAtt.angleA / 180 * Math.PI);
        var sinB = Math.sin(myAtt.angleB / 180 * Math.PI);
        var sinC = Math.sin(myAtt.angleC / 180 * Math.PI);
        var ratio = myAtt.hypotenuse / sinB;
        myAtt.opposite = ratio * sinA;
        myAtt.adjacent = ratio * sinC;
        // Set classification
        myAtt.classification = classifySide(myAtt.hypotenuse, myAtt.opposite, myAtt.adjacent);
        // Set categorization
        myAtt.categorization = classifyAngle(myAtt.angleA, myAtt.angleB, myAtt.angleC);
        
        function classifyAngle(x, y, z) {
            x = Math.floor(x)
            y = Math.floor(y)
            z = Math.floor(z)
            let X = Math.ceil(x)
            let Y = Math.ceil(y)
            let Z = Math.ceil(z)
            if (X === Y && X === Z) return "Equilateral";
            else if (X === Y) return "Isosceles";
            else if (Y === Z) return "Isosceles";
            else if (X === Z) return "Isosceles";
            else if (x === y && x === z) return "Equilateral";
            else if (x === y) return "Isosceles";
            else if (y === z) return "Isosceles";
            else if (x === z) return "Isosceles";
            else return "Scalence";
        }

        function classifySide(x, y, z) {
            x = Math.floor(x)
            y = Math.floor(y)
            z = Math.floor(z)
            let X = Math.ceil(x)
            let Y = Math.ceil(y)
            let Z = Math.ceil(z)
            if (X === 90 || Y === 90 || Z === 90) return "Right Triangle";
            else if (x === 90 || y === 90 || z === 90) return "Right Triangle";
            else if (X > 90 || Y > 90 || Z > 90) return "Obtuse Triangle";
            else if (x > 90 || y > 90 || z > 90) return "Obtuse Triangle";
            else return "Acute Triangle";
        }
        // Set props
        props.setAtt(myAtt);
        // Flip report flag 
        setRedirect({ redirect: true });
    }
    return (
        <div className="container text-center topPad">
            <form onSubmit={createAttFunction}>
                <div><label htmlFor="hypotenuse">Enter Length of side A of the triangle in millimetres</label></div>
                <div><input type="text" name="hypotenuse" onChange={updateAtt} /><span> MM</span></div>
                <div><label htmlFor="angleB">Enter the Angle B of the triangle in degrees</label></div>
                <div><input type="text" name="angleB" onChange={updateAtt} /><span> &#176;</span></div>
                <div><label htmlFor="angleC">Enter the Angle C of the triangle in degrees</label></div>
                <div><input type="text" name="angleC" onChange={updateAtt} /><span> &#176;</span></div>
                <div><input className="btn btn-outline-primary buttonPad" type="submit" value="Submit" /><img src={saaImage} /></div>
            </form>
            {error.foundError ? (<Redirect push to="/error" />) : null}
            {redirecter.redirect ? (<Redirect push to="/report" />) : null}
        </div>
    );
}

export default SAA;