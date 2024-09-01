
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Nav from "./nav.jsx";

import Write from './component/write';
import Read from './component/read';

export default function App() {
    

    return (
        <BrowserRouter>
           <Nav/>
            <Routes>
                <Route path="/write" element={<Write />} />
                <Route path="/read" element={<Read />} />
            </Routes>
        </BrowserRouter>
    );
}
