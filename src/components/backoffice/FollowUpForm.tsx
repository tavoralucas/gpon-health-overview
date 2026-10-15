// T-015: Follow-up and internal note creation form

import { useState } from 'react';
import { useCreateFollowup } from '@/services/tickets';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FollowUpFormProps {
  ticketId: string;
}

export function FollowUpForm({ ticketId }: FollowUpFormProps) {
  const [tipo, setTipo] = useState<'followup_publico' | 'nota_interna'>('followup_publico');
  const [conteudo, setConteudo] = useState('');
  const createFollowup = useCreateFollowup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conteudo.trim()) return;

    try {
      await createFollowup.mutateAsync({
        ticket_id: ticketId,
        tipo,
        conteudo: conteudo.trim(),
      });
      setConteudo('');
    } catch (err) {
      console.error('Erro ao criar follow-up:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar acompanhamento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="followup-tipo">Tipo</Label>
            <Select value={tipo} onValueChange={(v) => setTipo(v as any)}>
              <SelectTrigger id="followup-tipo">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="followup_publico">Público (visível para o solicitante)</SelectItem>
                <SelectItem value="nota_interna">Nota interna (apenas backoffice)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="followup-conteudo">
              {tipo === 'nota_interna' ? 'Nota interna' : 'Follow-up público'}
            </Label>
            <Textarea
              id="followup-conteudo"
              placeholder="Escreva seu acompanhamento..."
              rows={3}
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={createFollowup.isPending || !conteudo.trim()}>
            {createFollowup.isPending ? 'Salvando...' : 'Adicionar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
