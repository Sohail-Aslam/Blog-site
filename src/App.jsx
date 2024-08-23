import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Read from './component/read.jsx';
import Write from './component/write.jsx';
import Nav from "./nav.jsx";

import './App.css';

function Blog() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/read" element={<Read />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Blog;
