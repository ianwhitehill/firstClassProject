import { useState } from 'react';
import Image from '../Img/t.PNG';

const Main = () => {
    const [myAtt, setMyAtt] = useState({
        hypotenuse: null,
        adjacent: null,
        opposite: null,
        angleA: null,
        angleC: null,
        angleB: null,
        classificationS: null,
        classificationA: null,
        title: "Input",
        message: "Please enter three parameters of the triangle, at least one of which is a length of the side. Values must be positive and greater then 0."
    })
    const updateAtt = e => {
        setMyAtt({ ...myAtt, [e.target.name]: e.target.value });
    }
    const refresh = () => {
        setMyAtt({ ...myAtt, hypotenuse: null,
            adjacent: null,
            opposite: null,
            angleA: null,
            angleC: null,
            angleB: null,
            classificationS: null,
            classificationA: null,
            title: "Input",
            message: "Please enter three parameters of the triangle, at least one of which is a length of the side. Values must be positive and greater then 0." });
            window.location.reload(false);
    }
    if (myAtt.hypotenuse !== null || myAtt.angleB !== null || myAtt.angleC !== null || myAtt.angleA !== null || myAtt.opposite !== null || myAtt.adjacent !== null) {

        var sides = (myAtt.opposite !== null) + (myAtt.hypotenuse !== null) + (myAtt.adjacent !== null);
        var angles = (myAtt.angleA !== null) + (myAtt.angleB !== null) + (myAtt.angleC !== null);
        if (sides == 0) myAtt.message = "Give at least one side length";
        else if (sides == 3) {
            if (myAtt.opposite + myAtt.hypotenuse <= myAtt.adjacent || myAtt.hypotenuse + myAtt.adjacent <= myAtt.opposite || myAtt.adjacent + myAtt.opposite <= myAtt.hypotenuse) {
                myAtt.message = "No solution";
                myAtt.title = "Error";
            }

            myAtt.angleA = solveAngle(myAtt.hypotenuse, myAtt.adjacent, myAtt.opposite);
            myAtt.angleB = solveAngle(myAtt.adjacent, myAtt.opposite, myAtt.hypotenuse);
            myAtt.angleC = solveAngle(myAtt.opposite, myAtt.hypotenuse, myAtt.adjacent);
            myAtt.classificationA = classifyAngle(myAtt.angleA, myAtt.angleB, myAtt.angleC);
            myAtt.classificationS = classifySide(myAtt.hypotenuse, myAtt.opposite, myAtt.adjacent);
            if (myAtt.hypotenuse > 0 && myAtt.angleB > 0 && myAtt.angleC > 0 && myAtt.angleA > 0 && myAtt.opposite > 0 && myAtt.adjacent > 0) {
                myAtt.title = "Solution";
                myAtt.message = ("Side classification: (" + myAtt.classificationS + ") Angle classification: (" + myAtt.classificationA + ") a: (" + myAtt.opposite + ") b: (" + myAtt.hypotenuse + ") c: (" + myAtt.adjacent + ") A: (" + myAtt.angleA + ") B: (" + myAtt.angleB + ") C: (" + myAtt.angleC + ")");
            }
        } else if (angles == 2) {
            if (myAtt.angleA === null) myAtt.angleA = 180 - myAtt.angleB - myAtt.angleC;
            if (myAtt.angleB === null) myAtt.angleB = 180 - myAtt.angleC - myAtt.angleA;
            if (myAtt.angleC === null) myAtt.angleC = 180 - myAtt.angleA - myAtt.angleB;
            if (myAtt.angleA <= 0 || myAtt.angleB <= 0 || myAtt.angleC <= 0) {
                myAtt.title = "Error";
                myAtt.message = "No solution";
            }
            var sinA = Math.sin(degToRad(myAtt.angleA));
            var sinB = Math.sin(degToRad(myAtt.angleB));
            var sinC = Math.sin(degToRad(myAtt.angleC));

            var ratio;
            if (myAtt.opposite !== null) { ratio = myAtt.opposite / sinA }
            if (myAtt.hypotenuse !== null) { ratio = myAtt.hypotenuse / sinB }
            if (myAtt.adjacent !== null) { ratio = myAtt.adjacent / sinC }
            if (myAtt.opposite === null) myAtt.opposite = ratio * sinA;
            if (myAtt.hypotenuse === null) myAtt.hypotenuse = ratio * sinB;
            if (myAtt.adjacent === null) myAtt.adjacent = ratio * sinC;
            myAtt.classificationA = classifyAngle(myAtt.angleA, myAtt.angleB, myAtt.angleC);
            myAtt.classificationS = classifySide(myAtt.hypotenuse, myAtt.opposite, myAtt.adjacent);
            if (myAtt.hypotenuse > 0 && myAtt.angleB > 0 && myAtt.angleC > 0 && myAtt.angleA > 0 && myAtt.opposite > 0 && myAtt.adjacent > 0) {
                myAtt.title = "Solution";
                myAtt.message = ("Side classification: (" + myAtt.classificationS + ") Angle classification: (" + myAtt.classificationA + ") a: (" + myAtt.opposite + ") b: (" + myAtt.hypotenuse + ") c: (" + myAtt.adjacent + ") A: (" + myAtt.angleA + ") B: (" + myAtt.angleB + ") C: (" + myAtt.angleC + ")");
            }
        } else if (myAtt.angleA !== null && myAtt.opposite === null || myAtt.angleB !== null && myAtt.hypotenuse === null || myAtt.angleC !== null && myAtt.adjacent === null) {
            if (myAtt.angleA !== null && myAtt.angleA >= 180 || myAtt.angleB !== null && myAtt.angleB >= 180 || myAtt.angleC !== null && myAtt.angleC >= 180) {
                myAtt.title = "Error";
                myAtt.message = "No solution";
            }
            if (myAtt.opposite === null) myAtt.opposite = solveSide(myAtt.hypotenuse, myAtt.adjacent, myAtt.angleA);
            if (myAtt.hypotenuse === null) myAtt.hypotenuse = solveSide(myAtt.adjacent, myAtt.opposite, myAtt.angleB);
            if (myAtt.adjacent === null) myAtt.adjacent = solveSide(myAtt.opposite, myAtt.hypotenuse, myAtt.angleC);
            if (myAtt.angleA === null) myAtt.angleA = solveAngle(myAtt.hypotenuse, myAtt.adjacent, myAtt.opposite);
            if (myAtt.angleB === null) myAtt.angleB = solveAngle(myAtt.adjacent, myAtt.opposite, myAtt.hypotenuse);
            if (myAtt.angleC === null) myAtt.angleC = solveAngle(myAtt.opposite, myAtt.hypotenuse, myAtt.adjacent);
            myAtt.classificationA = classifyAngle(myAtt.angleA, myAtt.angleB, myAtt.angleC);
            myAtt.classificationS = classifySide(myAtt.hypotenuse, myAtt.opposite, myAtt.adjacent);
            if (myAtt.hypotenuse > 0 && myAtt.angleB > 0 && myAtt.angleC > 0 && myAtt.angleA > 0 && myAtt.opposite > 0 && myAtt.adjacent > 0) {
                myAtt.title = "Solution";
                myAtt.message = ("Side classification: (" + myAtt.classificationS + ") Angle classification: (" + myAtt.classificationA + ") a: (" + myAtt.opposite + ") b: (" + myAtt.hypotenuse + ") c: (" + myAtt.adjacent + ") A: (" + myAtt.angleA + ") B: (" + myAtt.angleB + ") C: (" + myAtt.angleC + ")");
            }
        } else {
            var knownSide, knownAngle, partialSide;
            if (myAtt.opposite !== null && myAtt.angleA !== null) { knownSide = myAtt.opposite; knownAngle = myAtt.angleA; }
            if (myAtt.hypotenuse !== null && myAtt.angleB !== null) { knownSide = myAtt.hypotenuse; knownAngle = myAtt.angleB; }
            if (myAtt.adjacent !== null && myAtt.angleC !== null) { knownSide = myAtt.adjacent; knownAngle = myAtt.angleC; }
            if (myAtt.opposite !== null && myAtt.angleA === null) partialSide = myAtt.opposite;
            if (myAtt.hypotenuse !== null && myAtt.angleB === null) partialSide = myAtt.hypotenuse;
            if (myAtt.adjacent !== null && myAtt.angleC === null) partialSide = myAtt.adjacent;
            if (knownAngle >= 180) {
                myAtt.title = "Error";
                myAtt.message = "No solution";
            }
            var ratio = knownSide / Math.sin(degToRad(knownAngle));
            var temp = partialSide / ratio;
            var partialAngle, unknownSide, unknownAngle;
            if (temp > 1 || knownAngle >= 90 && knownSide <= partialSide) {
                myAtt.title = "Error";
                myAtt.message = "No solution";
            }
            else if (temp == 1 || knownSide >= partialSide) {
                partialAngle = radToDeg(Math.asin(temp));
                unknownAngle = 180 - knownAngle - partialAngle;
                unknownSide = ratio * Math.sin(degToRad(unknownAngle));
            } else {
                var partialAngle0 = radToDeg(Math.asin(temp));
                var partialAngle1 = 180 - partialAngle0;
                var unknownAngle0 = 180 - knownAngle - partialAngle0;
                var unknownAngle1 = 180 - knownAngle - partialAngle1;
                var unknownSide0 = ratio * Math.sin(degToRad(unknownAngle0));
                var unknownSide1 = ratio * Math.sin(degToRad(unknownAngle1));
                partialAngle = [partialAngle0, partialAngle1];
                unknownAngle = [unknownAngle0, unknownAngle1];
                unknownSide = [unknownSide0, unknownSide1];
            }
            if (myAtt.opposite !== null && myAtt.angleA === null) myAtt.angleA = partialAngle;
            if (myAtt.hypotenuse !== null && myAtt.angleB === null) myAtt.angleB = partialAngle;
            if (myAtt.adjacent !== null && myAtt.angleC === null) myAtt.angleC = partialAngle;
            if (myAtt.opposite === null && myAtt.angleA === null) { myAtt.opposite = unknownSide; myAtt.angleA = unknownAngle; }
            if (myAtt.hypotenuse === null && myAtt.angleB === null) { myAtt.hypotenuse = unknownSide; myAtt.angleB = unknownAngle; }
            if (myAtt.adjacent === null && myAtt.angleC === null) { myAtt.adjacent = unknownSide; myAtt.angleC = unknownAngle; }
            myAtt.classificationA = classifyAngle(myAtt.angleA, myAtt.angleB, myAtt.angleC);
            myAtt.classificationS = classifySide(myAtt.hypotenuse, myAtt.opposite, myAtt.adjacent);
            if (myAtt.hypotenuse > 0 && myAtt.angleB > 0 && myAtt.angleC > 0 && myAtt.angleA > 0 && myAtt.opposite > 0 && myAtt.adjacent > 0) {
                myAtt.title = "Solution";
                myAtt.message = ("Side classification: (" + myAtt.classificationS + ") Angle classification: (" + myAtt.classificationA + ") a: (" + myAtt.opposite + ") b: (" + myAtt.hypotenuse + ") c: (" + myAtt.adjacent + ") A: (" + myAtt.angleA + ") B: (" + myAtt.angleB + ") C: (" + myAtt.angleC + ")");
            }
        }

        function classifyAngle(x, y, z) {
            x = Math.floor(x)
            y = Math.floor(y)
            z = Math.floor(z)
            let X = Math.ceil(x)
            let Y = Math.ceil(y)
            let Z = Math.ceil(z)
            if (X == Y && X == Z) return "Equilateral";
            else if (X == Y) return "Isosceles";
            else if (Y == Z) return "Isosceles";
            else if (X == Z) return "Isosceles";
            else if (x == y && x == z) return "Equilateral";
            else if (x == y) return "Isosceles";
            else if (y == z) return "Isosceles";
            else if (x == z) return "Isosceles";
            else return "Scalence";
        }

        function classifySide(x, y, z) {
            x = Math.floor(x)
            y = Math.floor(y)
            z = Math.floor(z)
            let X = Math.ceil(x)
            let Y = Math.ceil(y)
            let Z = Math.ceil(z)
            if (X == 90 || Y == 90 || Z == 90) return "Right Triangle";
            else if (x == 90 || y == 90 || z == 90) return "Right Triangle";
            else if (X > 90 || Y > 90 || Z > 90) return "Obtuse Triangle";
            else if (x > 90 || y > 90 || z > 90) return "Obtuse Triangle";
            else return "Acute Triangle";
        }

        function degToRad(x) {
            return x / 180 * Math.PI;
        }

        function radToDeg(x) {
            return x / Math.PI * 180;
        }

        function solveSide(a, b, C) {
            C = degToRad(C);
            if (C > 0.001)
                return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C));
            else
                return Math.sqrt((a - b) * (a - b) + a * b * C * C * (1 - C * C / 12));
        }

        function solveAngle(a, b, c) {
            var temp = (a * a + b * b - c * c) / (2 * a * b);
            if (-1 <= temp && temp <= 0.9999999)
                return radToDeg(Math.acos(temp));
            else if (temp <= 1) return radToDeg(Math.sqrt((c * c - (a - b) * (a - b)) / (a * b)));
            else {
                myAtt.title = "Error";
                myAtt.message = "No solution";
            }
        }
    }
    return (
        <div className="container">
            <div>
                <img className="col-md-6" src={Image} />
            </div>
            <div className="row">
                <div className="col-md-2">
                    <h3>Variable</h3>
                    <div><label htmlFor="opposite">Side <i>a</i> in millimetres:</label><input type="number" name="opposite" onChange={updateAtt} /></div>
                    <div><label htmlFor="hypotenuse">Side <i>b</i> in millimetres:</label><input type="number" name="hypotenuse" onChange={updateAtt} /></div>
                    <div><label htmlFor="adjacent">Side <i>c</i> in millimetres:</label><input type="number" name="adjacent" onChange={updateAtt} /></div>
                    <div><label htmlFor="angleA">Angle <i>A</i> in degrees:</label><input type="number" name="angleA" onChange={updateAtt} /></div>
                    <div><label htmlFor="angleB">Angle <i>B</i> in degrees:</label><input type="number" name="angleB" onChange={updateAtt} /></div>
                    <div><label htmlFor="angleC">Angle <i>C</i> in degrees:</label><input type="number" name="angleC" onChange={updateAtt} /></div>
                </div>
                <div className="col-md-4">
                    <h3>{myAtt.title}</h3>
                    <p>{myAtt.message}</p>
                    <button  className="btn btn-dark buttonPad" onClick={refresh}>Refresh</button>
                </div>
            </div>
        </div>
    );
}

export default Main;