// T-024: Agent management page (admin only)

import { useState } from 'react';
import { useAgentes, useInviteAgente, useUpdateAgente } from '@/services/agentes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendente',
  active: 'Ativo',
  disabled: 'Desativado',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  disabled: 'bg-red-100 text-red-800',
};

export function AgentesPage() {
  const { t } = useTranslation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const { data: agentes, isLoading } = useAgentes();
  const inviteAgente = useInviteAgente();
  const updateAgente = useUpdateAgente();

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) return;
    try {
      await inviteAgente.mutateAsync({ name: nome.trim(), email: email.trim() });
      setNome('');
      setEmail('');
    } catch (err) {
      console.error('Erro ao convidar agente:', err);
    }
  };

  const handleRoleChange = async (id: string, role: string) => {
    try {
      await updateAgente.mutateAsync({ id, role: role as 'agente' | 'admin' });
    } catch (err) {
      console.error('Erro ao alterar role:', err);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'disabled' ? 'active' : 'disabled';
    try {
      await updateAgente.mutateAsync({ id, status: newStatus });
    } catch (err) {
      console.error('Erro ao alterar status:', err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestão de Agentes</h1>

      <Card>
        <CardHeader>
          <CardTitle>Convidar agente</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInvite} className="flex gap-4 items-end">
            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium">Nome</label>
              <Input
                placeholder="Nome do agente"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium">E-mail</label>
              <Input
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={inviteAgente.isLoading}>
              {inviteAgente.isLoading ? 'Convidando...' : 'Convidar'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Agentes cadastrados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 text-center text-muted-foreground">Carregando...</div>
          ) : agentes && agentes.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentes.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>
                      <Select
                        value={agent.role}
                        onValueChange={(v) => handleRoleChange(agent.id, v)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agente">Agente</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge className={STATUS_COLORS[agent.status] || ''}>
                        {STATUS_LABELS[agent.status] || agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusToggle(agent.id, agent.status)}
                      >
                        {agent.status === 'disabled' ? 'Ativar' : 'Desativar'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              Nenhum agente cadastrado.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
