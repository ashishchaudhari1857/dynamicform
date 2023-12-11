import React, { useState } from "react";

const FileUploadComponent = ({ size }) => {
  const [singleFile, setSingleFile] = useState(null);

  const validateFileSize = (file) => {
    const maxSizeInBytes = size * 1024 * 1024; // 5 MB
    console.log(size, "in");
    return file.size <= maxSizeInBytes;
  };

  const validateFileFormat = (file) => {
    const allowedFormats = ['image/jpeg', 'image/png', 'application/pdf'];
    return allowedFormats.includes(file.type);
  };

  const handleSingleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && validateFileSize(file) && validateFileFormat(file)) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setSingleFile(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setSingleFile(null);
      alert(`upload the file below ${size} MB`);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleSingleFileChange} />
      {singleFile && <img src={singleFile} alt="Uploaded Image" width="200" />}
    </div>
  );
};

export default FileUploadComponent;
