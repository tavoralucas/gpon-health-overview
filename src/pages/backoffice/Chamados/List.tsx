import { CircuitState, LoadingRows } from '@/components/effects/Connectivity';
// T-010: Chamados list page with filters and pagination

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTickets, type TicketFilters } from '@/services/tickets';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'novo', label: 'Novo' },
  { value: 'atribuido', label: 'Atribuído' },
  { value: 'atendimento', label: 'Em atendimento' },
  { value: 'espera', label: 'Em espera' },
  { value: 'resolvido', label: 'Resolvido' },
  { value: 'fechado', label: 'Fechado' },
  { value: 'reaberto', label: 'Reaberto' },
];

const PRIORIDADE_OPTIONS = [
  { value: 'all', label: 'Todas' },
  { value: 'baixa', label: 'Baixa' },
  { value: 'media', label: 'Média' },
  { value: 'alta', label: 'Alta' },
  { value: 'critica', label: 'Crítica' },
];

const TIPO_OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'problema_tecnico', label: 'Problema Técnico' },
  { value: 'novo_acesso_individual', label: 'Novo Acesso Individual' },
  { value: 'novo_acesso_lote', label: 'Novo Acesso em Lote' },
];

const ORIGEM_OPTIONS = [
  { value: 'all', label: 'Todas' },
  { value: 'publico', label: 'Público' },
  { value: 'manual', label: 'Manual' },
];

const PRIORIDADE_COLORS: Record<string, string> = {
  baixa: 'bg-gray-100 text-gray-800',
  media: 'bg-blue-100 text-blue-800',
  alta: 'bg-yellow-100 text-yellow-800',
  critica: 'bg-red-100 text-red-800',
};

const STATUS_COLORS: Record<string, string> = {
  novo: 'bg-gray-100 text-gray-800',
  atribuido: 'bg-blue-100 text-blue-800',
  atendimento: 'bg-yellow-100 text-yellow-800',
  espera: 'bg-orange-100 text-orange-800',
  resolvido: 'bg-green-100 text-green-800',
  fechado: 'bg-gray-100 text-gray-600',
  reaberto: 'bg-red-100 text-red-800',
};

export function ChamadosListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TicketFilters>({
    page: 1,
    pageSize: 20,
    sortBy: 'created_at',
    sortOrder: 'desc',
  });
  const [searchText, setSearchText] = useState('');

  const { data, isLoading, error } = useTickets(filters);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value && value !== 'all' ? value : undefined, page: 1 }));
  };

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: searchText || undefined, page: 1 }));
  };

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const clearFilters = () => {
    setSearchText('');
    setStartDate(undefined);
    setEndDate(undefined);
    setFilters({ page: 1, pageSize: 20, sortBy: 'created_at', sortOrder: 'desc' });
  };

  const applyDateFilter = () => {
    setFilters((prev) => ({
      ...prev,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
      page: 1,
    }));
  };

  const totalPages = data ? Math.ceil(data.count / (filters.pageSize || 20)) : 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chamados</h1>
        <Button onClick={() => navigate('/backoffice/chamados/novo')}>
          Novo Chamado
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-1">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={filters.status || 'all'}
                onValueChange={(v) => handleFilterChange('status', v)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Prioridade</label>
              <Select
                value={filters.prioridade || 'all'}
                onValueChange={(v) => handleFilterChange('prioridade', v)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORIDADE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Tipo</label>
              <Select
                value={filters.tipo || 'all'}
                onValueChange={(v) => handleFilterChange('tipo', v)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  {TIPO_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Origem</label>
              <Select
                value={filters.origem || 'all'}
                onValueChange={(v) => handleFilterChange('origem', v)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  {ORIGEM_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Período (criação)</label>
              <div className="flex gap-2 items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-[140px] justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-1 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Data inicial"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => { setStartDate(date); if (date) setTimeout(applyDateFilter, 0); }}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-muted-foreground">até</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-[140px] justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-1 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Data final"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => { setEndDate(date); if (date) setTimeout(applyDateFilter, 0); }}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-1 flex-1 min-w-[200px]">
              <label className="text-sm font-medium">Busca</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Buscar por código, título, solicitante..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button variant="outline" onClick={handleSearch}>
                  Buscar
                </Button>
              </div>
            </div>

            <Button variant="ghost" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingRows />
          ) : error ? (
            <CircuitState tone="error" title="Erro ao carregar chamados" message="Tente novamente em instantes." />
          ) : data?.data && data.data.length > 0 ? (
            <>
              <Table className="bo-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Agente</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.map((ticket) => (
                    <TableRow
                      key={ticket.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/backoffice/chamados/${ticket.id}`)}
                    >
                      <TableCell className="font-mono text-sm">{ticket.numero}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{ticket.titulo}</TableCell>
                      <TableCell className="text-sm">{ticket.tipo}</TableCell>
                      <TableCell className="text-sm">{ticket.solicitante_nome}</TableCell>
                      <TableCell>
                        <Badge className={PRIORIDADE_COLORS[ticket.prioridade] || ''}>
                          {ticket.prioridade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={STATUS_COLORS[ticket.status] || ''}>
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{ticket.atribuido_a || '-'}</TableCell>
                      <TableCell className="text-sm">{ticket.origem}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(ticket.created_at).toLocaleDateString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between p-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {data.count} chamados encontrados
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={(filters.page || 1) <= 1}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, page: (prev.page || 1) - 1 }))
                    }
                  >
                    Anterior
                  </Button>
                  <span className="text-sm">
                    Página {filters.page || 1} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={(filters.page || 1) >= totalPages}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, page: (prev.page || 1) + 1 }))
                    }
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              Nenhum chamado encontrado.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
