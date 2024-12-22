import React from "react";

interface FileUploaderProps {
  onUpload: (content: string, name: string) => void; // `name` hinzugefügt
  multiple?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, multiple = false }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onUpload(content, file.name); // Name der Datei zurückgeben
      };
      reader.readAsText(file);
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" multiple={multiple} onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
