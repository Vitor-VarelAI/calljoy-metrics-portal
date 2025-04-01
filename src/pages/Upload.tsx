
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Upload as UploadIcon, Rocket } from "lucide-react";
import { toast } from "sonner";

interface FileItem {
  file: File;
  type: "Audio" | "Metadata";
}

const Upload = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.map(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      const type = ['mp3', 'wav'].includes(extension || '') ? 'Audio' : 
                  extension === 'xlsx' ? 'Metadata' : null;
      
      if (!type) {
        toast.error(`Unsupported file type: ${file.name}`);
        return null;
      }
      
      return { file, type };
    }).filter((f): f is FileItem => f !== null);

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startAnalysis = async () => {
    setIsProcessing(true);
    try {
      // TODO: Implement file upload logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      toast.success("Analysis started successfully");
    } catch (error) {
      toast.error("Failed to start analysis");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">📤 Upload Files</h1>
      <p className="text-muted-foreground mb-6">
        Upload call recordings or metadata to begin AI-powered analysis.
      </p>

      <Card className="mb-6">
        <CardContent className="p-0">
          <div
            className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer bg-muted/50"
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <UploadIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg mb-2">
              Drag and drop your files here or click to upload
            </p>
            <p className="text-sm text-muted-foreground">
              Supported formats: .mp3, .wav, .xlsx
            </p>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept=".mp3,.wav,.xlsx"
              multiple
              onChange={handleFileInput}
            />
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Selected Files</CardTitle>
            <CardDescription>
              {files.length} file(s) ready for analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={file.type === 'Audio' ? 'default' : 'secondary'}>
                      {file.type}
                    </Badge>
                    <span className="font-medium">{file.file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        className="w-full"
        size="lg"
        disabled={files.length === 0 || isProcessing}
        onClick={startAnalysis}
      >
        <Rocket className="mr-2 h-4 w-4" />
        {isProcessing ? "Processing..." : "Start Analysis"}
      </Button>
    </div>
  );
};

export default Upload;
