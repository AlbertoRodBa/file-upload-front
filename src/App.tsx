import React, { useState, useEffect } from 'react';
import './App.css'; 

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const storedFiles = localStorage.getItem('files');
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(files));
  }, [files]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files as FileList);
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Simulación de subida de archivos
  const handleUploadFiles = () => {
    if (files.length === 0) {
      alert('No hay archivos para subir.');
      return;
    }

    // Simulación de proceso de subida
    setTimeout(() => {
      alert('Archivos "subidos" exitosamente (simulado).');
    }, 1000); // Simula un retraso de subida
  };

  const getFilePreview = (file: File) => {
    const fileType = file.type.split('/')[0];
    const fileUrl = URL.createObjectURL(file);

    if (fileType === 'image') {
      return <img src={fileUrl} alt={file.name} style={{ width: '50px', height: '50px', borderRadius: '5px' }} />;
    }

    return <span>{getFileIcon(file.name)}</span>;
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'ppt':
      case 'pptx':
        return '📊';
      case 'xls':
      case 'xlsx':
        return '📈';
      case 'txt':
        return '🗒️';
      default:
        return '📁';
    }
  };

  return (
    <div className="container">
      <h1>Gestor de Archivos</h1>
      <label htmlFor="file-upload" className="button">
        Seleccionar Archivos
      </label>
      <input
        id="file-upload"
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <h2>Archivos Cargados:</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {getFilePreview(file)}
            <span style={{ marginLeft: '10px' }}>{file.name}</span>
            <button className="remove-button" onClick={() => handleRemoveFile(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button className="upload-button" onClick={handleUploadFiles}>Subir Archivos</button>
    </div>
  );
};

export default App;
