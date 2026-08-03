import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const LARGE_FILE_WARNING = 5 * 1024 * 1024; // 5 MB
export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

interface ImageDropzoneProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
}

export function ImageDropzone({ file, onChange, error, disabled }: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const selected = files?.[0];
      if (selected) onChange(selected);
    },
    [onChange]
  );

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="sr-only"
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {!file ? (
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background/60 px-6 py-10 text-center transition-all duration-200",
            "hover:border-primary/60 hover:bg-accent/40",
            isDragging && "border-primary bg-accent scale-[1.01]",
            disabled && "pointer-events-none opacity-60"
          )}
        >
          <ImagePlus className="h-7 w-7 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Arraste uma imagem aqui ou clique para selecionar
          </span>
          <span className="text-xs text-muted-foreground">
            JPG, JPEG, PNG, GIF ou WEBP — até 10 MB
          </span>
        </button>
      ) : (
        <div className="animate-scale-in rounded-xl border border-border bg-background p-3">
          <div className="flex items-start gap-3">
            {preview && (
              <img
                src={preview}
                alt={`Pré-visualização de ${file.name}`}
                className="h-20 w-20 shrink-0 rounded-lg border border-border object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {file.type || "tipo desconhecido"} · {formatFileSize(file.size)}
              </p>
              {file.size > LARGE_FILE_WARNING && file.size <= MAX_FILE_SIZE && (
                <p className="mt-1 flex items-center gap-1 text-xs text-[hsl(25,95%,40%)]">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Imagem grande: o envio pode demorar mais.
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Remover imagem"
              disabled={disabled}
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
