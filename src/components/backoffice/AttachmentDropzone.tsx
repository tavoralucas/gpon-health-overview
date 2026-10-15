// T-017: Attachment dropzone component

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

interface AttachmentDropzoneProps {
  ticketId: string;
}

export function AttachmentDropzone({ ticketId }: AttachmentDropzoneProps) {
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadAttachment();

  const handleFile = async (file: File) => {
    setError('');

    // Validate type
    const ext = file.name.split('.').pop()?.toLowerCase();
    const validExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'csv', 'xls', 'xlsx'];
    if (!validExts.includes(ext || '')) {
      setError(`Formato não permitido: ${ext}. Use JPG, PNG, GIF, WEBP, PDF, CSV, XLS, XLSX.`);
      return;
    }

    // Validate size
    if (file.size > MAX_SIZE) {
      setError(`Arquivo muito grande: ${(file.size / (1024 * 1024)).toFixed(1)} MB. Máximo: 10 MB.`);
      return;
    }

    try {
      await uploadMutation.mutateAsync({ ticketId, file });
    } catch (err) {
      setError('Erro ao fazer upload do arquivo.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
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
          Arraste um arquivo aqui ou clique para selecionar
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          JPG, PNG, GIF, WEBP, PDF, CSV, XLS, XLSX — Máx. 10 MB por arquivo
        </p>
        <Input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.csv,.xls,.xlsx"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}

      {uploadMutation.isLoading && (
        <p className="text-sm text-muted-foreground mt-2">Enviando arquivo...</p>
      )}
    </div>
  );
}
