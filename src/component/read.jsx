
import React, { useState, useEffect, useRef } from 'react';
import 'aos/dist/aos.css';

export default function Read() {

  const [blogs, setBlogs] = useState([]);
  const [selectedBlogIndex, setSelectedBlogIndex] = useState(null); // To track which blog to show in the popup
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Load blogs from localStorage on component mount
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  const handleDelete = (index) => {
    // Filter out the blog at the specific index
    const updatedBlogs = blogs.filter((_, i) => i !== index);

    // Update the state with the new array
    setBlogs(updatedBlogs);

    // Update the localStorage with the new array
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };

  const handlePopup = (index) => {
    setSelectedBlogIndex(index); // Set the selected blog index
    setPopupVisible(true); // Show the popup
  };

  const closePopup = () => {
    setPopupVisible(false); // Hide the popup
  };


  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const w = window.innerWidth;
    const h = window.innerHeight;
    const arc = 250;
    const size = 5;
    const speed = 8;
    const colors = ['#00F260', '#00C9FF', 'yellow', '#47E957'];

    let time = 0;
    let parts = [];
    let mouse = { x: 0, y: 0 };

    canvas.width = w;
    canvas.height = h;

    const createParticles = () => {
      parts = [];
      for (let i = 0; i < arc; i++) {
        parts.push({
          x: Math.ceil(Math.random() * w),
          y: Math.ceil(Math.random() * h),
          toX: Math.random() * 9 - 1,
          toY: Math.random() * 2 - 1,
          c: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * size,
          fill: Math.random() < 0.5,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, w, h);

      parts.forEach((particle) => {
        const distanceFactor = getDistanceFactor(mouse, particle);

        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.size * distanceFactor,
          0,
          Math.PI * 2,
          false
        );

        if (particle.fill) {
          ctx.fillStyle = particle.c;
          ctx.fill();
        } else {
          ctx.strokeStyle = particle.c;
          ctx.stroke();
        }

        particle.x += particle.toX * (time * 0.05);
        particle.y += particle.toY * (time * 0.05);

        if (particle.x > w) particle.x = 0;
        if (particle.y > h) particle.y = 0;
        if (particle.x < 0) particle.x = w;
        if (particle.y < 0) particle.y = h;
      });

      if (time < speed) time++;

      requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const getDistanceFactor = (p1, p2) => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.max(Math.min(15 - Math.sqrt(dx * dx + dy * dy) / 10, 10), 1);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    createParticles();
    drawParticles();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}
      />
  


      {isPopupVisible && selectedBlogIndex !== null && (
        <div className="popup" style={{ display: 'block', zIndex: '5', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',   background: '#cdffcd'
          , padding: '20px', borderRadius: '25px', height: '90%', overflow: 'auto', width: '80%' }}>
          <div style={{ padding: '10px' }}>
            <h2>{blogs[selectedBlogIndex].heading}</h2>
            <div style={{}} dangerouslySetInnerHTML={{ __html: blogs[selectedBlogIndex].content }} />
            <button className='button' onClick={() => handleDelete(selectedBlogIndex)}>Delete</button>
            <button className='button' onClick={closePopup}>Close</button>
          </div>
        </div>
      )}


      <div className="card-container">
        <div className='title'><h1>Blog Cards</h1></div>
        <div className='container'>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {blogs.map((blog, index) => (

              <div
                
                style={{
                  padding: '10px',
                  flex: ' calc(33.33% - 20px)',
                  boxSizing: 'border-box', background: 'white', borderRadius: '25px'
                }}>
                <h2 style={{ height: 'auto' }}>{blog.heading}</h2>
                <div style={{ height: '400px', overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: blog.content }} />
                <button className='button' onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => handlePopup(index)} key={index} className="button">Read</button>

              </div>
            ))}
          </div>
        </div>
      </div>

    </div>

  );
}
