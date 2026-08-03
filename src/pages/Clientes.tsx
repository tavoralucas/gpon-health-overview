import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { clientes, totalItens, totalPaginas } from "@/data/mockClientes";

const ITEMS_OPTIONS = [10, 25, 50];

const Clientes = () => {
  const { t } = useTranslation();
  const [codigoOperadora, setCodigoOperadora] = useState("");
  const [enderecoMac, setEnderecoMac] = useState("");
  const [contrato, setContrato] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [modeloTerminal, setModeloTerminal] = useState("");
  const [noOlt, setNoOlt] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleLimpar = () => {
    setCodigoOperadora("");
    setEnderecoMac("");
    setContrato("");
    setEstado("");
    setCidade("");
    setModeloTerminal("");
    setNoOlt("");
    setStatus("Ativo");
    setPage(1);
  };

  const filtered = useMemo(() => {
    return clientes.filter((c) => {
      if (codigoOperadora && !String(c.operadora).includes(codigoOperadora)) return false;
      if (enderecoMac && !c.mac.toLowerCase().includes(enderecoMac.toLowerCase())) return false;
      if (contrato && !String(c.contrato).includes(contrato)) return false;
      if (estado && !c.estado.toLowerCase().includes(estado.toLowerCase())) return false;
      if (cidade && !c.cidade.toLowerCase().includes(cidade.toLowerCase())) return false;
      if (modeloTerminal && !c.modeloTerminal.toLowerCase().includes(modeloTerminal.toLowerCase())) return false;
      if (noOlt && !c.noOlt.toLowerCase().includes(noOlt.toLowerCase())) return false;
      if (status && status !== "Todos" && c.status !== status) return false;
      return true;
    });
  }, [codigoOperadora, enderecoMac, contrato, estado, cidade, modeloTerminal, noOlt, status]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paged = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      {/* Header */}
      <h1 className="mb-6 text-3xl font-bold text-foreground">{t("clientes.title")}</h1>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">{t("clientes.filters")}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {t('clientes.filterDescription')}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Código da operadora */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-foreground">Código da operadora</Label>
              <Input
                placeholder="Digite o código da operadora"
                value={codigoOperadora}
                onChange={(e) => setCodigoOperadora(e.target.value)}
              />
            </div>

            {/* Endereço MAC */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-foreground">Endereço MAC</Label>
              <Input
                placeholder="Digite o endereço MAC"
                value={enderecoMac}
                onChange={(e) => setEnderecoMac(e.target.value)}
              />
            </div>

            {/* Contrato */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-foreground">Contrato</Label>
              <Input
                placeholder="Digite o número do contrato"
                value={contrato}
                onChange={(e) => setContrato(e.target.value)}
              />
            </div>

            {/* Estado */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-foreground">Estado</Label>
              <Input
                placeholder="Digite um estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              />
            </div>

            {/* Cidade */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-foreground">Cidade</Label>
              <Input
                placeholder="Digite uma cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>

            {/* Modelo terminal */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-foreground">Modelo terminal</Label>
              <Input
                placeholder="Digite um modelo de terminal"
                value={modeloTerminal}
                onChange={(e) => setModeloTerminal(e.target.value)}
              />
            </div>

            {/* Nó/OLT */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-foreground">Nó/OLT</Label>
              <Input
                placeholder="Digite um nó/OLT"
                value={noOlt}
                onChange={(e) => setNoOlt(e.target.value)}
              />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-foreground">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder={t("clientes.select")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">{t("clientes.all")}</SelectItem>
                  <SelectItem value="Ativo">{t("clientes.active")}</SelectItem>
                  <SelectItem value="Inativo">{t("clientes.inactive")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Botões */}
          <div className="mt-6 flex gap-3">
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Search className="h-4 w-4" />
              {t('clientes.search')}
            </Button>
            <Button
              variant="outline"
              onClick={handleLimpar}
              className="gap-2 border-primary text-primary hover:bg-primary/5"
            >
              <X className="h-4 w-4" />
              {t('clientes.clear')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">Ações</TableHead>
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">Contrato</TableHead>
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">Operadora</TableHead>
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">MAC</TableHead>
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">Status</TableHead>
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">Modelo do terminal</TableHead>
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">Download(Mbps)</TableHead>
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">Upload(Mbps)</TableHead>
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">Nó/OLT</TableHead>
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">CEP</TableHead>
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">Cidade</TableHead>
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">Estado</TableHead>
                  <TableHead className="font-semibold text-foreground whitespace-nowrap">Endereço</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((cliente) => (
                  <TableRow key={cliente.contrato} className="border-b border-border/50 hover:bg-muted/40">
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/5 font-medium px-4"
                      >
                        {t('clientes.connect')}
                      </Button>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{cliente.contrato}</TableCell>
                    <TableCell>{cliente.operadora}</TableCell>
                    <TableCell className="whitespace-nowrap font-mono text-sm">{cliente.mac}</TableCell>
                    <TableCell>
                      <span
                        className={
                          cliente.status === "Ativo"
                            ? "text-[hsl(142,60%,35%)] font-medium"
                            : "text-muted-foreground font-medium"
                        }
                      >
                        {cliente.status}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[180px] text-sm">{cliente.modeloTerminal}</TableCell>
                    <TableCell>{cliente.download}</TableCell>
                    <TableCell>{cliente.upload}</TableCell>
                    <TableCell className="whitespace-nowrap font-mono text-sm">{cliente.noOlt}</TableCell>
                    <TableCell>{cliente.cep.toString().padStart(8, "0")}</TableCell>
                    <TableCell className="whitespace-nowrap">{cliente.cidade}</TableCell>
                    <TableCell>{cliente.estado}</TableCell>
                    <TableCell className="whitespace-nowrap">{cliente.endereco}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginação */}
          <div className="flex flex-col items-center gap-2 border-t border-border py-4 sm:flex-row sm:justify-between sm:px-6">
            {/* Prev */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary text-primary disabled:opacity-30 hover:bg-primary/5"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Info */}
            <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
              <span>
                {t('clientes.pageOf', { page: page, total: totalPaginas.toLocaleString('pt-BR') })}
              </span>
              <span className="flex items-center gap-2">
                {t('clientes.itemsPerPage')}
                <select
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setPage(1); }}
                  className="rounded border border-border bg-background px-1 py-0.5 text-sm text-foreground"
                >
                  {ITEMS_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </span>
              <span>{t('clientes.totalItems', { total: totalItens.toLocaleString('pt-BR') })}</span>
            </div>

            {/* Next */}
            <Button
              size="icon"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
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

export default Clientes;
