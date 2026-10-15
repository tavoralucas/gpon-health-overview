// T-018: KpiCard component

import { CountUp } from '@/components/effects/Connectivity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KpiCardProps {
  title: string;
  value: number | string;
  description?: string;
}

export function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <Card className="bo-kpi">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }} >{typeof value === 'number' ? <CountUp value={value} /> : value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
