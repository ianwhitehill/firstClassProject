import { useState } from 'react';
import { Redirect } from "react-router-dom";
import ssaImage from '../Img/ssa.jpg';

const SSA = (props) => {
    // Object Properties 
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
    //  Setting Props
    const updateAtt = e => {
        setMyAtt({ ...myAtt, [e.target.name]: e.target.value });
    }
    // Validation and error handling
    const createAttFunction = e => {
        e.preventDefault();
        // Validation
        if (myAtt.hypotenuse <= 0 || myAtt.adjacent <= 0 || myAtt.angleC <= 0) {
            myAtt.errorMessage = "All inputs must be a positive number greater then 0";
            props.setAtt(myAtt);
            // Flip error flag
            return setError({ foundError: true });
        }
        // Error checking 
        if (myAtt.angleC >= 180) {
            myAtt.errorMessage = "Angle must be less then 180 degrees";
            props.setAtt(myAtt);
            // Flip error flag
            return setError({ foundError: true });
        }
        // Algo to find sides 
        var ratio = myAtt.adjacent / Math.sin(myAtt.angleC / 180 * Math.PI);
        var temp = myAtt.hypotenuse / ratio;
        var unknownSide, unknownAngle;
        var knownSide = myAtt.hypotenuse
        if (temp == 1 || myAtt.adjacent >= myAtt.hypotenuse) {
            knownSide = radToDeg(Math.asin(temp));
            unknownAngle = 180 - myAtt.angleC - knownSide;
            unknownSide = ratio * Math.sin(unknownAngle / 180 * Math.PI);
        } else {
            var partialAngle0 = radToDeg(Math.asin(temp));
            var partialAngle1 = 180 - partialAngle0;
            var unknownAngle0 = 180 - myAtt.angleC - partialAngle0;
            var unknownAngle1 = 180 - myAtt.angleC - partialAngle1;
            var unknownSide0 = ratio * Math.sin(unknownAngle0 / 180 * Math.PI);
            var unknownSide1 = ratio * Math.sin(unknownAngle1 / 180 * Math.PI);
            knownSide = [partialAngle0, partialAngle1];
            unknownAngle = [unknownAngle0, unknownAngle1];
            unknownSide = [unknownSide0, unknownSide1];
        }
        myAtt.opposite = unknownSide;

        myAtt.angleA = solveAngle(myAtt.hypotenuse, myAtt.adjacent, myAtt.opposite);

        myAtt.angleB = solveAngle(myAtt.adjacent, myAtt.opposite, myAtt.hypotenuse);

        // Set classification
        myAtt.classification = classifySide(myAtt.hypotenuse, myAtt.opposite, myAtt.adjacent);
        // Set categorization
        myAtt.categorization = classifyAngle(myAtt.angleA, myAtt.angleB, myAtt.angleC);

        // Set props
        props.setAtt(myAtt);
        // Flip report flag 
        setRedirect({ redirect: true });

        function radToDeg(x) {
            return x / Math.PI * 180;
        }

        function solveAngle(a, b, c) {
            var temp = (a * a + b * b - c * c) / (2 * a * b);
            if (-1 <= temp && temp <= 0.9999999) return radToDeg(Math.acos(temp));
            else return radToDeg(Math.sqrt((c * c - (a - b) * (a - b)) / (a * b)));
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
            {error.foundError ? (<Redirect push to="/error" />) : null}
            <form onSubmit={createAttFunction}>
                <div><label htmlFor="hypotenuse">Enter Length of side A of the triangle in millimetres</label></div>
                <div><input type="text" name="hypotenuse" onChange={updateAtt} /><span> MM</span></div>
                <div><label htmlFor="adjacent">Enter Length of side B of the triangle in millimetres</label></div>
                <div><input type="text" name="adjacent" onChange={updateAtt} /><span> MM</span></div>
                <div><label htmlFor="angleC">Enter the Angle C of the triangle in degrees</label></div>
                <div><input type="text" name="angleC" onChange={updateAtt} /><span> &#176;</span></div>
                <div><input className="btn btn-outline-primary buttonPad" type="submit" value="Submit" /><img src={ssaImage} /></div>
            </form>
            {redirecter.redirect ? (<Redirect push to="/report" />) : null}
        </div>
    );
}

export default SSA;