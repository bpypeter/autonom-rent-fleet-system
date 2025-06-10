
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationId: string;
  reservationCode: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  reservationId,
  reservationCode
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ];

  const allowedExtensions = ['.docx', '.pdf', '.jpg', '.jpeg', '.png'];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): boolean => {
    if (!allowedTypes.includes(file.type)) {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        toast.error(`Tipul de fișier ${file.name} nu este permis. Doar: ${allowedExtensions.join(', ')}`);
        return false;
      }
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      toast.error(`Fișierul ${file.name} este prea mare. Mărimea maximă: 10MB`);
      return false;
    }

    return true;
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    
    Array.from(files).forEach(file => {
      if (validateFile(file)) {
        const uploadedFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploading'
        };
        
        newFiles.push(uploadedFile);
        
        // Simulare upload
        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === uploadedFile.id 
                ? { ...f, status: 'success' } 
                : f
            )
          );
          toast.success(`Fișierul ${file.name} a fost încărcat cu succes!`);
        }, Math.random() * 2000 + 1000);
      }
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return <File className="w-4 h-4" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
        return <div className="w-4 h-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Încărcare Documente - {reservationCode}
          </DialogTitle>
          <DialogDescription>
            Încărcați documentele completate și semnate pentru finalizarea rezervării
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Tipuri de fișiere acceptate:</h4>
            <div className="flex flex-wrap gap-2">
              {allowedExtensions.map(ext => (
                <Badge key={ext} variant="secondary" className="text-xs">
                  {ext}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Mărimea maximă per fișier: 10MB
            </p>
          </div>

          <Card 
            className={`border-2 border-dashed transition-colors ${
              isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <CardContent className="p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Trageți fișierele aici sau
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  Selectați fișiere
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={allowedExtensions.join(',')}
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Fișiere încărcate:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {uploadedFiles.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      {getFileIcon(file.name)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      {getStatusIcon(file.status)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Închide
            </Button>
            <Button 
              onClick={() => {
                toast.success('Documentele au fost trimise pentru verificare!');
                onClose();
              }}
              disabled={uploadedFiles.filter(f => f.status === 'success').length === 0}
              className="flex-1"
            >
              Finalizează încărcarea
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
