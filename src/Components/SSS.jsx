import { useState } from 'react';
import { Redirect } from "react-router-dom";
import sssImage from '../Img/sss.jpg';

const SSS = (props) => {
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
    // Error Flag
    const [error, setError] = useState({ foundError: false })
    // Report Flag
    const [redirecter, setRedirect] = useState({ redirect: false })
    // Setting props 
    const updateAtt = e => {
        setMyAtt({...myAtt, [e.target.name]: e.target.value});
    }
    // Validation and redirect 
    const createAttFunction = e => {
        e.preventDefault();
        // Error checking 
        if(myAtt.hypotenuse <= 0 || myAtt.adjacent <= 0 || myAtt.opposite <= 0){
            myAtt.errorMessage = "All inputs must be a positive number greater then 0";
            props.setAtt(myAtt);
            // Flipping Error flag
            return setError({ foundError: true });
        }
        myAtt.angleA = solveAngle(myAtt.hypotenuse, myAtt.adjacent, myAtt.opposite);
        myAtt.angleB = solveAngle(myAtt.adjacent, myAtt.opposite, myAtt.hypotenuse);
        myAtt.angleC = solveAngle(myAtt.opposite, myAtt.hypotenuse, myAtt.adjacent);
        // Set classification
        myAtt.classification = classifySide(myAtt.hypotenuse, myAtt.opposite, myAtt.adjacent);
        // Set categorization
        myAtt.categorization = classifyAngle(myAtt.angleA, myAtt.angleB, myAtt.angleC);

        // Setting Props 
        props.setAtt(myAtt);
        
        // Flip Report flag
        setRedirect({ redirect: true });

        function solveAngle(a, b, c) {
            var temp = (a * a + b * b - c * c) / (2 * a * b);
            if (-1 <= temp && temp <= 0.9999999) return radToDeg(Math.acos(temp));
            else return radToDeg(Math.sqrt((c * c - (a - b) * (a - b)) / (a * b)));
        }

        function radToDeg(x) {
            return x / Math.PI * 180;
        }

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
    }
    return (
        <div className="container text-center topPad">
            {error.foundError ? (<Redirect push to = "/error"/>) : null}
            <form onSubmit={createAttFunction}>
                <div><label htmlFor="hypotenuse">Enter Length of side A of the triangle in millimetres</label></div>
                <div><input type="text" name="hypotenuse" onChange={updateAtt}/><span> MM</span></div>
                <div><label htmlFor="adjacent">Enter Length of side B of the triangle in millimetres</label></div>
                <div><input type="text" name="adjacent" onChange={updateAtt}/><span> MM</span></div>
                <div><label htmlFor="opposite">Enter Length of side C of the triangle in millimetres</label></div>
                <div><input type="text" name="opposite" onChange={updateAtt}/><span> MM</span></div>
                <div><input className="btn btn-outline-primary buttonPad" type="submit" value="Submit" /><img src={sssImage} /></div>
            </form>
            {redirecter.redirect ? (<Redirect push to = "/report"/>) : null}
        </div>
    );
}

export default SSS;
