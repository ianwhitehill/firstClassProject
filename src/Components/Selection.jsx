import React from "react";

const Selection = (props) => {
    return (
        <div className="container text-center topPad">
            <h1>Select Method for Classification</h1>
            <div><a href="http://localhost:3000/SSS" className="btn btn-outline-dark buttonPad">Length of all sides known</a></div>
            <div><a href="http://localhost:3000/SSA" className="btn btn-outline-dark buttonPad">Length of Two sides and One Angle</a></div>
            <div><a href="http://localhost:3000/SAA" className="btn btn-outline-dark buttonPad">Length of One side and Two Angle</a></div>
        </div>
    );
}

export default Selection;