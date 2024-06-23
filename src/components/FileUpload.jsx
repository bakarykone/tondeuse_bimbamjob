import React from 'react';

function FileUpload({ onFileLoaded }) {
  const handleFileRead = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result)
      onFileLoaded(e.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <input type="file" onChange={handleFileRead} />
  );
}

export default FileUpload;