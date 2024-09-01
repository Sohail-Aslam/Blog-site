
import { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css';

export default function Nav() {
    const editorRef = useRef(null);

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const [activeTab, setActiveTab] = useState('write'); 

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }
   

    return (
        <>
             <div className="menu">
             <div className={`tab-container ${activeTab === 'write' ? 'active' : ''}`}>
          <p className="tab-text">
          Write
          </p>
          <Link to="/write" onClick={() => handleTabClick('write')}> <img 
            className='tab-img' 
            src="/tabs.png" 
            height='50px' 
            width='205px' 
            alt="Write tab" 
            onClick={() => handleTabClick('write')} 
          /></Link>
         
        </div>
        <div className={`tab-container ${activeTab === 'read' ? 'active' : ''}`}>
          <p className="tab-text">
           View
          </p>
          <Link to="/read" onClick={() => handleTabClick('read')}> <img 
            className='tab-img' 
            src="/tabs.png" 
            height='50px' 
            width='205px' 
            alt="View tab" 
            onClick={() => handleTabClick('read')} 
            
          /></Link>
         
        </div>
      </div>

            
        </>
    );
}

