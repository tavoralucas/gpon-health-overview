// T-017: Attachment dropzone component — multi-file with 5-file limit

import { useState, useRef } from 'react';
import { useUploadAttachment } from '@/services/tickets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES = 5;

interface AttachmentDropzoneProps {
  ticketId: string;
}

export function AttachmentDropzone({ ticketId }: AttachmentDropzoneProps) {
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadAttachment();

  const validateFiles = (files: File[]): File[] | null => {
    const validExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'csv', 'xls', 'xlsx'];

    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!validExts.includes(ext || '')) {
        setError(`Formato não permitido: ${ext}. Use JPG, PNG, GIF, WEBP, PDF, CSV, XLS, XLSX.`);
        return null;
      }
      if (file.size > MAX_SIZE) {
        setError(`Arquivo muito grande: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB). Máximo: 10 MB.`);
        return null;
      }
    }
    return files;
  };

  const uploadFiles = async (files: File[]) => {
    setError('');
    setUploading(true);

    try {
      for (const file of files) {
        await uploadMutation.mutateAsync({ ticketId, file });
      }
    } catch (err) {
      setError('Erro ao fazer upload de um ou mais arquivos.');
    } finally {
      setUploading(false);
    }
  };

  const handleFiles = (files: FileList) => {
    setError('');

    if (files.length > MAX_FILES) {
      setError(`Máximo de ${MAX_FILES} arquivos por vez.`);
      return;
    }

    const fileArray = Array.from(files);
    const validated = validateFiles(fileArray);
    if (validated) {
      uploadFiles(validated);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input so re-selecting the same file triggers onChange
    e.target.value = '';
  };

  return (
    <div>
      <div
        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="text-sm text-muted-foreground">
          Arraste arquivos aqui ou clique para selecionar
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          JPG, PNG, GIF, WEBP, PDF, CSV, XLS, XLSX — Máx. 10 MB por arquivo (máx. {MAX_FILES})
        </p>
        <Input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.csv,.xls,.xlsx"
          multiple
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}

      {uploading && (
        <p className="text-sm text-muted-foreground mt-2">Enviando arquivos...</p>
      )}
    </div>
  );
}
