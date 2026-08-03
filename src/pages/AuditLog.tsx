import { useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

interface LogEntry {
  usuario: string;
  email: string;
  operacao: string;
  data: string;
}

const MOCK_LOGS: LogEntry[] = [
  { usuario: "lucas.tavora", email: "lucas.tavora@claro.com.br", operacao: 'Ver Tabela de Dispositivos Conectados - {"serialNumber":"5A544547D4E80D0D"}', data: "18/02/2026 20:27:43" },
  { usuario: "f274229", email: "f274229@brasilcenter.com.br", operacao: 'Conectar Cliente - {"mac":"9C:63:5B:8C:18:32","cityCode":"275"}', data: "18/02/2026 20:27:42" },
  { usuario: "f274229", email: "f274229@brasilcenter.com.br", operacao: 'Pesquisar Cliente por Mac - {"mac":"9C:63:5B:8C:18:32","cityCode":"275"}', data: "18/02/2026 20:27:40" },
  { usuario: "lucas.tavora", email: "lucas.tavora@claro.com.br", operacao: 'Ver Topologia de Rede - {"serialNumber":"5A544547D4E80D0D"}', data: "18/02/2026 20:27:40" },
  { usuario: "f271892", email: "f271892@brasilcenter.com.br", operacao: 'Conectar Cliente - {"mac":"48:D6:82:36:BD:58","cityCode":"076"}', data: "18/02/2026 20:27:23" },
  { usuario: "f271892", email: "f271892@brasilcenter.com.br", operacao: 'Pesquisar Cliente por Mac - {"mac":"48:D6:82:36:BD:58","cityCode":"076"}', data: "18/02/2026 20:27:22" },
  { usuario: "f271892", email: "f271892@brasilcenter.com.br", operacao: 'Pesquisar Cliente por Contrato - {"cityCode":"076","contractNumber":"304871560"}', data: "18/02/2026 20:27:20" },
  { usuario: "f198577", email: "andre.luizaraujo@claro.com.br", operacao: 'Conectar Cliente - {"cityCode":"972","macAddress":"04:8C:16:B0:19:1C","contractNumber":"1045808"}', data: "18/02/2026 20:27:09" },
  { usuario: "z374525", email: "juliosantos@globallvox.com.br", operacao: 'Conectar Cliente - {"cityCode":"733","macAddress":"D4:46:49:B6:CF:EA","contractNumber":"1048900"}', data: "18/02/2026 20:26:58" },
  { usuario: "z374525", email: "juliosantos@globallvox.com.br", operacao: 'Buscar por Clientes - {"cityCode":"733","contractNumber":"1048900","status":"ACTIVE","page":0,"size":10}', data: "18/02/2026 20:26:58" },
  { usuario: "m103456", email: "maria.silva@claro.com.br", operacao: 'Ver Diagnóstico de Acesso - {"mac":"AA:BB:CC:DD:EE:FF"}', data: "18/02/2026 20:26:30" },
  { usuario: "p908123", email: "pedro.costa@brasilcenter.com.br", operacao: 'Atualizar Parâmetro - {"parametro":"QoS Wifi","valor":"85"}', data: "18/02/2026 20:25:55" },
  { usuario: "lucas.tavora", email: "lucas.tavora@claro.com.br", operacao: 'Exportar CSV - {"tipo":"audit-log","registros":500}', data: "18/02/2026 20:25:10" },
  { usuario: "f274229", email: "f274229@brasilcenter.com.br", operacao: 'Pesquisar Cliente por Contrato - {"cityCode":"275","contractNumber":"137427992"}', data: "18/02/2026 20:24:50" },
  { usuario: "r551234", email: "renata.lopes@globallvox.com.br", operacao: 'Conectar Cliente - {"mac":"3C:F9:F0:A6:9C:06","cityCode":"512"}', data: "18/02/2026 20:24:22" },
  { usuario: "r551234", email: "renata.lopes@globallvox.com.br", operacao: 'Ver Saúde Geral - {"uf":"MG","cidade":"ARAGUARI"}', data: "18/02/2026 20:23:45" },
  { usuario: "m103456", email: "maria.silva@claro.com.br", operacao: 'Buscar por Clientes - {"cityCode":"512","status":"ACTIVE","page":1,"size":25}', data: "18/02/2026 20:23:10" },
  { usuario: "z374525", email: "juliosantos@globallvox.com.br", operacao: 'Pesquisar Cliente por Mac - {"mac":"C4:EB:FF:89:7E:F4","cityCode":"194"}', data: "18/02/2026 20:22:30" },
  { usuario: "p908123", email: "pedro.costa@brasilcenter.com.br", operacao: 'Ver Capacidade OLT - {"olt":"GPONA01","uf":"RS"}', data: "18/02/2026 20:21:58" },
  { usuario: "lucas.tavora", email: "lucas.tavora@claro.com.br", operacao: 'Editar Parâmetro - {"parametro":"RSSI (Dados Wi-Fi)","valor":"70"}', data: "18/02/2026 20:21:10" },
  { usuario: "f198577", email: "andre.luizaraujo@claro.com.br", operacao: 'Ver Preditivo - {"uf":"SP","periodo":"30d"}', data: "18/02/2026 20:20:45" },
  { usuario: "r551234", email: "renata.lopes@globallvox.com.br", operacao: 'Ver Estabilidade e Quedas - {"olt":"MUPAB","uf":"SP"}', data: "18/02/2026 20:20:00" },
  { usuario: "f271892", email: "f271892@brasilcenter.com.br", operacao: 'Login - {"ip":"187.75.22.100"}', data: "18/02/2026 20:19:30" },
  { usuario: "m103456", email: "maria.silva@claro.com.br", operacao: 'Logout - {"ip":"177.14.33.55"}', data: "18/02/2026 20:19:00" },
  { usuario: "z374525", email: "juliosantos@globallvox.com.br", operacao: 'Ver Geoestratégia - {"uf":"BA"}', data: "18/02/2026 20:18:25" },
  { usuario: "lucas.tavora", email: "lucas.tavora@claro.com.br", operacao: 'Ver Performance Contratual - {"uf":"MG","periodo":"7d"}', data: "18/02/2026 20:17:50" },
];

const ITEMS_OPTIONS = [10, 25, 50];

const AuditLog = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [operacao, setOperacao] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [ate, setAte] = useState("");
  const [filtrarRecente, setFiltrarRecente] = useState(false);
  const [resultados, setResultados] = useState<LogEntry[] | null>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleBuscar = () => {
    // Validate: if one date is filled, both must be
    const temPeriodo = periodo.trim() !== "";
    const temAte = ate.trim() !== "";
    if (temPeriodo !== temAte) {
      toast({
        title: t('auditLog.dateValidationError'),
        variant: "destructive",
      });
      return;
    }

    let filtered = [...MOCK_LOGS];
    if (nomeUsuario) filtered = filtered.filter((l) => l.usuario.toLowerCase().includes(nomeUsuario.toLowerCase()));
    if (email) filtered = filtered.filter((l) => l.email.toLowerCase().includes(email.toLowerCase()));
    if (operacao) filtered = filtered.filter((l) => l.operacao.toLowerCase().includes(operacao.toLowerCase()));
    if (filtrarRecente) {
      const seen = new Set<string>();
      filtered = filtered.filter((l) => {
        if (seen.has(l.usuario)) return false;
        seen.add(l.usuario);
        return true;
      });
    }

    setResultados(filtered);
    setPage(1);
  };

  const handleLimpar = () => {
    setNomeUsuario("");
    setEmail("");
    setOperacao("");
    setPeriodo("");
    setAte("");
    setFiltrarRecente(false);
    setResultados(null);
    setPage(1);
  };

  const handleExportarCSV = () => {
    if (!resultados) return;
    const header = "Usuário,Email,Operação,Data\n";
    const rows = resultados.map((r) =>
      `"${r.usuario}","${r.email}","${r.operacao.replace(/"/g, '""')}","${r.data}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit-log.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalPages = resultados ? Math.ceil(resultados.length / itemsPerPage) || 1 : 1;
  const paged = resultados ? resultados.slice((page - 1) * itemsPerPage, page * itemsPerPage) : [];
  const totalItens = 26595;
  const totalPags = 2660;

  return (
    <div className="mx-auto max-w-[1300px] px-6 py-8">
      <h1 className="mb-6 text-3xl font-bold text-foreground">{t('pages.auditLog')}</h1>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">{t('auditLog.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm">{t('auditLog.userName')}</Label>
              <Input
                placeholder={t('auditLog.userNamePlaceholder')}
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm">{t('auditLog.email')}</Label>
              <Input
                placeholder={t('auditLog.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm">{t('auditLog.operation')}</Label>
              <Input
                placeholder={t('auditLog.operationPlaceholder')}
                value={operacao}
                onChange={(e) => setOperacao(e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm">{t('auditLog.period')}</Label>
              <input
                type="datetime-local"
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm">{t('auditLog.until')}</Label>
              <input
                type="datetime-local"
                value={ate}
                onChange={(e) => setAte(e.target.value)}
                className="rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="flex items-center gap-2 pb-1">
              <Checkbox
                id="filtrarRecente"
                checked={filtrarRecente}
                onCheckedChange={(v) => setFiltrarRecente(!!v)}
              />
              <Label htmlFor="filtrarRecente" className="cursor-pointer text-sm">
                {t('auditLog.filterRecent')}
              </Label>
            </div>
            <div className="flex gap-3 pb-1">
              <Button
                onClick={handleBuscar}
                className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t('auditLog.search')}
              </Button>
              <Button
                variant="outline"
                onClick={handleLimpar}
                className="rounded-xl border-primary text-primary hover:bg-primary/5"
              >
                {t('auditLog.clear')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      {resultados !== null && (
        <Card>
          <CardContent className="p-0">
            {/* Exportar */}
            <div className="px-6 pt-5 pb-3">
              <Button
                onClick={handleExportarCSV}
                className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Download className="h-4 w-4" />
                {t('auditLog.exportCsv')}
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border hover:bg-transparent">
                    <TableHead className="pl-6 font-semibold text-foreground whitespace-nowrap">{t('auditLog.tableUser')}</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">{t('auditLog.tableEmail')}</TableHead>
                    <TableHead className="font-semibold text-foreground">{t('auditLog.tableOperation')}</TableHead>
                    <TableHead className="pr-6 font-semibold text-foreground whitespace-nowrap">{t('auditLog.tableDate')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paged.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                        {t('auditLog.noResults')}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paged.map((log, i) => (
                      <TableRow key={i} className="border-b border-border/50 hover:bg-muted/30">
                        <TableCell className="pl-6 text-sm whitespace-nowrap">{log.usuario}</TableCell>
                        <TableCell className="text-sm whitespace-nowrap">{log.email}</TableCell>
                        <TableCell className="text-sm max-w-[500px] break-words">{log.operacao}</TableCell>
                        <TableCell className="pr-6 text-sm whitespace-nowrap">{log.data}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Paginação */}
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

              <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                <span>{t('auditLog.pageInfo', { page, total: totalPags.toLocaleString("pt-BR") })}</span>
                <span className="flex items-center gap-2">
                  {t('auditLog.itemsPerPage')}
                  <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setPage(1); }}
                    className="rounded border border-border bg-background px-1 py-0.5 text-sm text-foreground"
                  >
                    {ITEMS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </span>
                <span>{t('auditLog.totalItems', { total: totalItens.toLocaleString("pt-BR") })}</span>
              </div>

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
      )}
    </div>
  );
};

export default AuditLog;
