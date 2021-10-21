import React from "react";
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useEffect } from "react";

const Loading = (props) => {
    const [redirecter, setRedirect] = useState({ redirect: false })

    useEffect(() => {
        const timer = setTimeout(() => {
            setRedirect({ redirect: true })
        }, 5000);// 5 second to redirect
        return () => clearTimeout(timer);
    }, [])
    return (
        <div className="container text-center">
            <h1 className="loadPad">Triangle Classifier</h1>
            <h2 >By Genuen</h2>
            <h2 className="loadPad">Version 2.0</h2>
            <h3>Copyright 2021 by Genuen LLC</h3>
            {redirecter.redirect ? (<Redirect push to="/selection" />) : null}
        </div>
    );
}

export default Loading;