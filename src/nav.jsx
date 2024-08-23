import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Nav() {

    return (
        <div className="menu">
        <div className="tab-container">
            <p  className="tab-text">Write</p>
            <img src="/tabs.png" height='64px' width='280px' alt="tabs" />
        </div>
        <div className="tab-container">
            <p className="tab-text">View</p>
            <img src="/tabs.png" height='64px' width='280px' alt="tabs" />
        </div>
    </div>

    )
}

export default Nav
