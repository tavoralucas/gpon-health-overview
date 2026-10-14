import { useCallback, useRef, useState } from "react";
import { FileSpreadsheet, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { formatFileSize } from "./ImageDropzone";
import { CABECALHOS_LOTE, MAX_LOTE_SIZE, validarCabecalhos, validarCabecalhosCsv } from "./novo-acesso-schema";

const EXCEL_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

async function lerCabecalhos(arquivo: File): Promise<string | null> {
  const nome = arquivo.name.toLowerCase();
  if (nome.endsWith(".csv")) {
    const texto = await arquivo.text();
    return validarCabecalhosCsv(texto.split(/\r?\n/)[0] ?? "");
  }
  if (nome.endsWith(".xlsx") || nome.endsWith(".xls") || EXCEL_TYPES.includes(arquivo.type)) {
    const buffer = await arquivo.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const primeiraAba = workbook.Sheets[workbook.SheetNames[0]];
    const linhas = XLSX.utils.sheet_to_json<string[]>(primeiraAba, { header: 1, range: 0, blankrows: false });
    const primeiraLinha = (linhas[0] ?? []).map((c) => String(c).trim());
    return validarCabecalhos(primeiraLinha);
  }
  return "Formato inválido. Envie um arquivo .csv ou .xlsx.";
}

interface ArquivoLoteDropzoneProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
}

export function ArquivoLoteDropzone({ file, onChange, error, disabled }: ArquivoLoteDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [erroArquivo, setErroArquivo] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      const selected = files?.[0];
      if (!selected) return;

      const nome = selected.name.toLowerCase();
      if (!nome.endsWith(".csv")) {
        setErroArquivo("Formato inválido. Envie um arquivo .csv.");
        onChange(null);
        return;
      }
      if (selected.size > MAX_LOTE_SIZE) {
        setErroArquivo("O arquivo deve ter no máximo 5 MB.");
        onChange(null);
        return;
      }

      const texto = await selected.text();
      const primeiraLinha = texto.split(/\r?\n/)[0] ?? "";
      const erroCabecalho = validarCabecalhosCsv(primeiraLinha);
      if (erroCabecalho) {
        setErroArquivo(erroCabecalho);
        onChange(null);
        return;
      }

      setErroArquivo(null);
      onChange(selected);
    },
    [onChange]
  );

  const handleRemove = () => {
    onChange(null);
    setErroArquivo(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const mensagemErro = erroArquivo ?? error;

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="sr-only"
        disabled={disabled}
        onChange={(e) => {
          void handleFiles(e.target.files);
          e.target.value = "";
        }}
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
            void handleFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background/60 px-4 py-8 text-center transition-all duration-200",
            "hover:border-primary/60 hover:bg-accent/40",
            isDragging && "border-primary bg-accent scale-[1.01]",
            disabled && "pointer-events-none opacity-60"
          )}
        >
          <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Arraste o arquivo CSV aqui ou clique para selecionar
          </span>
          <span className="text-xs text-muted-foreground">
            Colunas obrigatórias: {CABECALHOS_LOTE.join(", ")} — até 5 MB
          </span>
        </button>
      ) : (
        <div className="animate-scale-in rounded-xl border border-border bg-background p-3">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-accent">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                CSV válido · {formatFileSize(file.size)}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Remover arquivo"
              disabled={disabled}
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {mensagemErro && <p className="text-sm font-medium text-destructive">{mensagemErro}</p>}
    </div>
  );
}
