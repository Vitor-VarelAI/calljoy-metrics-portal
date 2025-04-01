
import React, { useState } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Alert } from '../ui/alert';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');

  const validateFile = (file: File) => {
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/wave'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!allowedTypes.includes(file.type)) {
      setError('Apenas ficheiros MP3 e WAV são permitidos');
      return false;
    }

    if (file.size > maxSize) {
      setError('O ficheiro não pode exceder 50MB');
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(validateFile);
    setFiles(validFiles);
    setError('');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(validateFile);
      setFiles(validFiles);
      setError('');
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary cursor-pointer"
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Arraste ficheiros ou clique para selecionar
        </p>
        <input
          type="file"
          onChange={handleFileSelect}
          accept=".mp3,.wav"
          multiple
          className="hidden"
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </Alert>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
              <span className="text-sm truncate">{file.name}</span>
              <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={handleUpload} className="w-full">
            Iniciar Análise
          </Button>
        </div>
      )}
    </div>
  );
};
