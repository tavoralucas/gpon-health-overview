import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const parametros = [
  "QoS Wifi",
  "Qualidade do Canal",
  "QoS Disponibilidade",
  "TX (Dados de Sinais Ópticos)",
  "Disponibilidade QoS Cálculo",
  "Disponibilidade",
  "QoS Geral",
  "RSSI (Dados Wi-Fi)",
  "QoS Acesso",
  "RX (Dados de Sinais Ópticos)",
  "Latência Média",
  "Perda de Pacotes",
  "Jitter",
  "Throughput Download",
  "Throughput Upload",
  "SNR (Relação Sinal-Ruído)",
  "Potência de Transmissão",
  "Taxa de Erros FEC",
  "Uptime do Terminal",
  "Disponibilidade por OLT",
];

const ITEMS_PER_PAGE = 10;

const GestaoParametros = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(parametros.length / ITEMS_PER_PAGE);
  const paged = parametros.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <h1 className="mb-6 text-3xl font-bold text-foreground">Gestão de parâmetros</h1>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-base font-bold text-foreground">Parâmetros disponíveis</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="py-3 pl-6 font-semibold text-foreground">Nome do Parâmetro</TableHead>
                <TableHead className="py-3 pr-6 font-semibold text-foreground">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((param) => (
                <TableRow key={param} className="border-b border-border/50 hover:bg-muted/30">
                  <TableCell className="py-4 pl-6 text-sm text-foreground">{param}</TableCell>
                  <TableCell className="py-4 pr-6">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl border-primary text-primary hover:bg-primary/5"
                      >
                        Ver detalhes
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Editar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary text-primary disabled:opacity-30 hover:bg-primary/5"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-sm text-muted-foreground">
              Página {page} de {totalPages}
            </span>

            <Button
              size="icon"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GestaoParametros;
