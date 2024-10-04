import React, { useState, useEffect } from 'react';
import './App.css'; // Importa el archivo CSS

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  // Carga los archivos desde el Local Storage al iniciar la aplicación
  useEffect(() => {
    const storedFiles = localStorage.getItem('files');
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles));
    }
  }, []);

  // Guarda los archivos en el Local Storage cuando cambian
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

  // Función para obtener la vista previa del archivo
  const getFilePreview = (file: File) => {
    const fileType = file.type.split('/')[0]; // Obtiene el tipo de archivo
    const fileUrl = URL.createObjectURL(file); // Crea una URL para el archivo

    if (fileType === 'image') {
      return <img src={fileUrl} alt={file.name} style={{ width: '50px', height: '50px', borderRadius: '5px' }} />;
    }

    return <span>{getFileIcon(file.name)}</span>; // Si no es una imagen, muestra un ícono
  };

  // Función para devolver un ícono según la extensión del archivo
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop();
    switch (extension) {
      case 'pdf':
        return '📄'; // Ícono para PDF
      case 'doc':
      case 'docx':
        return '📝'; // Ícono para Word
      case 'ppt':
      case 'pptx':
        return '📊'; // Ícono para PowerPoint
      case 'xls':
      case 'xlsx':
        return '📈'; // Ícono para Excel
      case 'txt':
        return '🗒️'; // Ícono para Texto
      default:
        return '📁'; // Ícono genérico
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
        style={{ display: 'none' }} // Ocultar el input
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
    </div>
  );
};

export default App;
