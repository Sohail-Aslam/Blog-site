import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';

export default function Write({ }) {
  const [blogs, setBlogs] = useState();
  const [heading, setHeading] = useState('');
  const editorRef = useRef(null);
  const navigate = useNavigate();


  // Load blogs from localStorage on component mount
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  const handleSubmit = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      const newBlog = { heading, content };

      // Add the new blog to the blogs array
      const updatedBlogs = [...blogs, newBlog];

      // Update the state with new blogs
      setBlogs(updatedBlogs);

      // Store the updated blogs array in localStorage
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

      // Clear the heading and content
      setHeading('');
      editorRef.current.setContent('');

      // Navigate to the page where the blog cards are displayed
      navigate('/read');
    }
  };


  return (
    <div style={{ margin: '0 5%', display: 'flex', flexDirection: 'column' }}>
      <input
        className='heading'
        placeholder='Enter Your Heading'
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />
      <Editor
        style={{ margin: '20px' }}
        apiKey='3ndhmpe51ugtoclqyqce7168o8jfdix2tf1toojmh5hykc4g'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code',
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | fontselect fontsizeselect | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | image',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          image_title: true,
          automatic_uploads: true,
          file_picker_types: 'image',
          file_picker_callback: (callback, value, meta) => {
            if (meta.filetype === 'image') {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');

              input.onchange = function () {
                const file = this.files[0];
                const reader = new FileReader();

                reader.onload = function () {
                  const id = 'blobid' + (new Date()).getTime();
                  const blobCache = editorRef.current.editorUpload.blobCache;
                  const base64 = reader.result.split(',')[1];
                  const blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  callback(blobInfo.blobUri(), { title: file.name });
                };

                reader.readAsDataURL(file);
              };

              input.click();
            }
          }
        }}
      />
      <button className='button' onClick={handleSubmit}>Publish</button>
    </div>
  );
}
