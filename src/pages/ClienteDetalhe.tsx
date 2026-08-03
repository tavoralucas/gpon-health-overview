import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, RotateCcw, Gauge, Wifi, Monitor, Network, AlertCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const clienteData = {
  status: "Online",
  nivelTX: "2.64",
  nivelRX: "-19.87",
  tecnologia: "GPON",
  ultimoEvento: "19/02/2026 (08:12:01)",
  causaEvento: "Energia",
  noOlt: "MUPAB",
  oltName: "MAUDTCOLT01",
  mac: "68:9E:29:BD:13:47",
  contrato: "137427992",
  upTime: "13h 4m",
  nomeCidade: "833 - Maua / SP",
  modelo: "F6600P",
  serial: "5A544547D7B76DFA",
  cpu: "7%",
  memoria: "359.63 MB / 512 MB",
  versaoSoftware: "V9.1.10P4N5",
  qosGeral: "5.8",
  qosWifi: "0.0",
  qosAcesso: "9.3",
  qosDisponibilidade: "0.0",
  downloadMedido: "311.20",
  downloadContratual: "350.00 Mbps",
  uploadMedido: "180.70",
  uploadContratual: "175.00 Mbps",
  rede24: {
    nome: "ROSANGELA68",
    canal: "4",
    seguranca: "WPA2-Personal",
    largura: "40",
    protocolo: "b,g,n,ax",
    ativa: true,
  },
  rede50: {
    nome: "ROSANGELA68",
    canal: "48",
    seguranca: "WPA2-Personal",
    largura: "80",
    protocolo: "a,n,ac,ax",
    ativa: true,
  },
};

const QoSValue = ({ value, label }: { value: string; label: string }) => {
  const { t } = useTranslation();
  const num = parseFloat(value);
  const color = num === 0 ? "text-[hsl(0,72%,51%)]" : num < 6 ? "text-[hsl(0,72%,51%)]" : "text-[hsl(158,64%,40%)]";
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-4xl font-bold ${color}`}>{value}</span>
      <button className="text-left text-xs text-[hsl(0,72%,51%)] underline underline-offset-2 hover:opacity-80">
        {t('clienteDetalhe.moreInfo')}
      </button>
    </div>
  );
};

const SpeedGauge = ({ value, label, contratual, color }: { value: string; label: string; contratual: string; color: string }) => {
  const { t } = useTranslation();
  return (
  <div className="flex flex-col items-center gap-1">
    <div
      className="relative flex h-20 w-20 items-center justify-center rounded-full border-[6px]"
      style={{ borderColor: color, borderBottomColor: "transparent", transform: "rotate(-45deg)" }}
    >
      <div style={{ transform: "rotate(45deg)" }} className="flex flex-col items-center leading-tight">
        <span className="text-[9px] text-muted-foreground">{label}</span>
        <span className="text-lg font-bold text-foreground">{value}</span>
        <span className="text-[9px] text-muted-foreground">{t('clienteDetalhe.mbps')}</span>
      </div>
    </div>
    <div className="mt-1 text-center">
      <p className="text-sm font-medium text-foreground">{label === "Download" ? t('clienteDetalhe.downloadContractual') : t('clienteDetalhe.uploadContractual')}</p>
      <p className="text-sm font-semibold" style={{ color }}>{contratual}</p>
    </div>
  </div>
  );
};

const dispositivosConectados = [
  {
    nome: "CAP",
    tipo: "🖨️ Roteador",
    mac: "68:9e:29:bd:13:47",
    ip: "192.168.0.1",
    tipoConexao: "-",
    tecnologia: "MESH",
    sinal: null,
  },
  {
    nome: "NET833132919000473",
    tipo: "🔧 Desconhecido",
    mac: "88:0f:a2:9a:55:a1",
    ip: "192.168.0.5",
    tipoConexao: "2.4 GHz",
    tecnologia: "MESH",
    sinal: -29,
  },
];

type ModalView = "table" | "topology";

const TopologyView = () => {
  const { t } = useTranslation();
  return (
  <div className="flex flex-col gap-6">
    {/* Diagram */}
    <div className="relative flex justify-center overflow-x-auto">
      <svg width="720" height="280" viewBox="0 0 720 280" className="min-w-[600px]">
        {/* Root node */}
        <circle cx="360" cy="48" r="32" fill="white" stroke="#9ca3af" strokeWidth="2" />
        <text x="360" y="44" textAnchor="middle" fontSize="18" fill="#6b7280">📶</text>

        {/* Horizontal line from root */}
        <line x1="120" y1="80" x2="620" y2="80" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5,4" />
        {/* Vertical from root to horizontal */}
        <line x1="360" y1="80" x2="360" y2="80" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5,4" />

        {/* Vertical drops from horizontal to child nodes */}
        {[120, 210, 280, 350, 420, 490, 560, 620, 680].map((x, i) => (
          i < 9 && <line key={i} x1={[120,210,280,350,420,490,560,630,700][i]} y1="80" x2={[120,210,280,350,420,490,560,630,700][i]} y2="148" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray={i === 0 ? "0" : "5,4"} />
        ))}

        {/* Child nodes */}
        {/* Node 0 - blue router */}
        <circle cx="120" cy="180" r="32" fill="white" stroke="#3b82f6" strokeWidth="2.5" />
        <text x="120" y="176" textAnchor="middle" fontSize="16" fill="#3b82f6">📶</text>

        {/* Node 1 - orange TV */}
        <circle cx="210" cy="180" r="32" fill="white" stroke="#f97316" strokeWidth="2.5" />
        <text x="210" y="176" textAnchor="middle" fontSize="16" fill="#f97316">🖥</text>

        {/* Node 2 - orange TV */}
        <circle cx="280" cy="180" r="32" fill="white" stroke="#f97316" strokeWidth="2.5" />
        <text x="280" y="176" textAnchor="middle" fontSize="16" fill="#f97316">🖥</text>

        {/* Node 3 - orange TV */}
        <circle cx="350" cy="180" r="32" fill="white" stroke="#f97316" strokeWidth="2.5" />
        <text x="350" y="176" textAnchor="middle" fontSize="16" fill="#f97316">🖥</text>

        {/* Node 4 - orange TV */}
        <circle cx="420" cy="180" r="32" fill="white" stroke="#f97316" strokeWidth="2.5" />
        <text x="420" y="176" textAnchor="middle" fontSize="16" fill="#f97316">🖥</text>

        {/* Node 5 - gray TV */}
        <circle cx="490" cy="180" r="32" fill="white" stroke="#9ca3af" strokeWidth="2.5" />
        <text x="490" y="176" textAnchor="middle" fontSize="16" fill="#9ca3af">🖥</text>

        {/* Node 6 - green TV */}
        <circle cx="560" cy="180" r="32" fill="white" stroke="#22c55e" strokeWidth="2.5" />
        <text x="560" y="176" textAnchor="middle" fontSize="16" fill="#22c55e">🖥</text>

        {/* Node 7 - green TV */}
        <circle cx="630" cy="180" r="32" fill="white" stroke="#22c55e" strokeWidth="2.5" />
        <text x="630" y="176" textAnchor="middle" fontSize="16" fill="#22c55e">🖥</text>

        {/* Node 8 - gray TV */}
        <circle cx="700" cy="180" r="32" fill="white" stroke="#9ca3af" strokeWidth="2.5" />
        <text x="700" y="176" textAnchor="middle" fontSize="16" fill="#9ca3af">📱</text>

        {/* Child of first node (blue router → blue router) via ethernet */}
        <line x1="120" y1="212" x2="120" y2="248" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="120" cy="260" r="20" fill="white" stroke="#3b82f6" strokeWidth="2.5" />
        <text x="120" y="256" textAnchor="middle" fontSize="12" fill="#3b82f6">📶</text>
      </svg>
    </div>

    {/* Legend */}
    <div className="flex flex-wrap items-start gap-8 border-t border-border pt-4 text-xs">
      <div>
        <p className="mb-1 font-bold text-foreground">{t('clienteDetalhe.legend')}</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-[hsl(0,72%,51%)]" /> {t('clienteDetalhe.bad')}</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-[hsl(25,95%,53%)]" /> {t('clienteDetalhe.regular')}</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-[hsl(142,71%,45%)]" /> {t('clienteDetalhe.good')}</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-[hsl(217,91%,60%)]" /> {t('clienteDetalhe.ethernet')}</span>
        </div>
      </div>
      <div>
        <p className="mb-1 font-bold text-foreground">{t('clienteDetalhe.connection')}</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <svg width="28" height="8"><line x1="0" y1="4" x2="28" y2="4" stroke="#374151" strokeWidth="1.5" strokeDasharray="3,3" /></svg>
            {t('clienteDetalhe.conn24')}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="28" height="8"><line x1="0" y1="4" x2="28" y2="4" stroke="#374151" strokeWidth="1.5" strokeDasharray="6,3" /></svg>
            {t('clienteDetalhe.conn50')}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="28" height="8"><line x1="0" y1="4" x2="28" y2="4" stroke="#374151" strokeWidth="1.5" /></svg>
            {t('clienteDetalhe.connEthernet')}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const ClienteDetalhe = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState<ModalView>("table");

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{t('pages.clienteDetalhe')}</h1>
        <Button
          onClick={() => navigate("/dashboard")}
          className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {t('clienteDetalhe.searchNew')}
        </Button>
      </div>

      {/* Informações sobre o modem */}
      <Card className="mb-4 rounded-xl shadow-sm">
        <CardContent className="p-6">
          <h2 className="mb-4 text-base font-bold text-foreground">{t('clienteDetalhe.modemInfo')}</h2>
          <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.status')}</p>
              <span className="mt-1 inline-block rounded-full bg-[hsl(142,60%,35%)] px-3 py-0.5 text-xs font-semibold text-white">
                {t('clienteDetalhe.online')}
              </span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.txLevel')}</p>
              <div className="mt-1 flex items-center gap-1">
                <span className="inline-block rounded-full bg-[hsl(142,60%,35%)] px-2 py-0.5 text-xs font-semibold text-white">
                  {clienteData.nivelTX}
                </span>
                <Copy className="h-3.5 w-3.5 cursor-pointer text-muted-foreground hover:text-foreground" />
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.rxLevel')}</p>
              <div className="mt-1 flex items-center gap-1">
                <span className="inline-block rounded-full bg-[hsl(142,60%,35%)] px-2 py-0.5 text-xs font-semibold text-white">
                  {clienteData.nivelRX}
                </span>
                <Copy className="h-3.5 w-3.5 cursor-pointer text-muted-foreground hover:text-foreground" />
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.technology')}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{clienteData.tecnologia}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.lastEvent')}</p>
              <div className="mt-1 flex items-center gap-1">
                <p className="text-sm font-medium text-foreground">{clienteData.ultimoEvento}</p>
                <Copy className="h-3.5 w-3.5 cursor-pointer text-muted-foreground hover:text-foreground" />
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.eventCause')}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{clienteData.causaEvento}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.nodeOlt')}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{clienteData.noOlt}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.oltName')}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{clienteData.oltName}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.mac')}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{clienteData.mac}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.contract')}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{clienteData.contrato}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.uptime')}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{clienteData.upTime}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.cityName')}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{clienteData.nomeCidade}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.model')}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{clienteData.modelo}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.serial')}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{clienteData.serial}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.cpu')}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{clienteData.cpu}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('clienteDetalhe.memory')}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{clienteData.memoria}</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs text-muted-foreground">{t('clienteDetalhe.softwareVersion')}</p>
            <p className="mt-1 text-sm font-medium text-foreground">{clienteData.versaoSoftware}</p>
          </div>
        </CardContent>
      </Card>

      {/* QoS Row */}
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        <Card className="col-span-1 rounded-xl shadow-sm">
          <CardContent className="p-4">
            <QoSValue value={clienteData.qosGeral} label={t('clienteDetalhe.qosGeral')} />
          </CardContent>
        </Card>
        <Card className="col-span-1 rounded-xl shadow-sm">
          <CardContent className="p-4">
            <QoSValue value={clienteData.qosWifi} label={t('clienteDetalhe.qosWifi')} />
          </CardContent>
        </Card>
        <Card className="col-span-1 rounded-xl shadow-sm">
          <CardContent className="p-4">
            <QoSValue value={clienteData.qosAcesso} label={t('clienteDetalhe.qosAccess')} />
          </CardContent>
        </Card>
        <Card className="col-span-1 rounded-xl shadow-sm">
          <CardContent className="p-4">
            <QoSValue value={clienteData.qosDisponibilidade} label={t('clienteDetalhe.qosAvailability')} />
          </CardContent>
        </Card>
        <Card className="col-span-1 cursor-pointer rounded-xl bg-primary shadow-sm transition-opacity hover:opacity-90">
          <CardContent className="flex flex-col gap-2 p-4">
            <RotateCcw className="h-5 w-5 text-primary-foreground" />
            <p className="text-sm font-semibold text-primary-foreground">{t('clienteDetalhe.runSpeedTest')}</p>
            <p className="text-xs text-primary-foreground/80">{t('clienteDetalhe.speedTestHint')}</p>
          </CardContent>
        </Card>
        <Card className="col-span-1 cursor-pointer rounded-xl border-2 border-primary shadow-sm transition-opacity hover:opacity-90">
          <CardContent className="flex flex-col gap-2 p-4">
            <RotateCcw className="h-5 w-5 text-primary" />
            <p className="text-sm font-semibold text-primary">{t('clienteDetalhe.testHistory')}</p>
            <p className="text-xs text-muted-foreground">{t('clienteDetalhe.testHistoryHint')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Velocidades + Wi-Fi */}
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Velocidades */}
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="mb-6 text-center text-sm font-semibold text-foreground">{t('clienteDetalhe.speedsTitle')}</h3>
            <div className="flex flex-col gap-6">
              <SpeedGauge
                value={clienteData.downloadMedido}
                label="Download"
                contratual={clienteData.downloadContratual}
                color="hsl(158,64%,40%)"
              />
              <SpeedGauge
                value={clienteData.uploadMedido}
                label="Upload"
                contratual={clienteData.uploadContratual}
                color="hsl(218,80%,50%)"
              />
            </div>
          </CardContent>
        </Card>

        {/* Rede 2.4 GHz */}
        <Card className="rounded-xl bg-[hsl(142,30%,97%)] shadow-sm">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-[hsl(142,60%,35%)]">{t('clienteDetalhe.network24')}</h3>
              <span className="flex items-center gap-1 rounded-full bg-[hsl(142,60%,35%)] px-2 py-0.5 text-xs font-medium text-white">
                {t('clienteDetalhe.active')} ✓
              </span>
            </div>
            <div className="flex items-start justify-between">
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">{t('clienteDetalhe.networkName')}:</p>
                  <p className="font-bold text-foreground">{clienteData.rede24.nome}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('clienteDetalhe.currentChannel')}:</p>
                  <p className="font-bold text-foreground">{clienteData.rede24.canal}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('clienteDetalhe.security')}:</p>
                  <p className="font-bold text-foreground">{clienteData.rede24.seguranca}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('clienteDetalhe.channelWidth')}:</p>
                  <p className="font-bold text-foreground">{clienteData.rede24.largura}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('clienteDetalhe.protocol')}:</p>
                  <p className="font-bold text-foreground">{clienteData.rede24.protocolo}</p>
                </div>
              </div>
              <button className="text-sm font-medium text-foreground underline underline-offset-2 hover:opacity-70">
                {t('clienteDetalhe.edit')}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Rede 5.0 GHz */}
        <Card className="rounded-xl bg-[hsl(218,30%,97%)] shadow-sm">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-[hsl(218,80%,50%)]">{t('clienteDetalhe.network50')}</h3>
              <span className="flex items-center gap-1 rounded-full bg-[hsl(142,60%,35%)] px-2 py-0.5 text-xs font-medium text-white">
                {t('clienteDetalhe.active')} ✓
              </span>
            </div>
            <div className="flex items-start justify-between">
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">{t('clienteDetalhe.networkName')}:</p>
                  <p className="font-bold text-foreground">{clienteData.rede50.nome}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('clienteDetalhe.currentChannel')}:</p>
                  <p className="font-bold text-foreground">{clienteData.rede50.canal}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('clienteDetalhe.security')}:</p>
                  <p className="font-bold text-foreground">{clienteData.rede50.seguranca}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('clienteDetalhe.channelWidth')}:</p>
                  <p className="font-bold text-foreground">{clienteData.rede50.largura}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('clienteDetalhe.protocol')}:</p>
                  <p className="font-bold text-foreground">{clienteData.rede50.protocolo}</p>
                </div>
              </div>
              <button className="text-sm font-medium text-foreground underline underline-offset-2 hover:opacity-70">
                {t('clienteDetalhe.edit')}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equipamentos */}
      <Card className="rounded-xl shadow-sm">
        <CardContent className="p-6">
          <h2 className="mb-4 text-base font-bold text-foreground">{t('clienteDetalhe.equipments')}</h2>
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{t('clienteDetalhe.quantityFound')}:</p>
                  <p className="text-sm font-bold text-foreground">{t('clienteDetalhe.equipmentsCount', { count: 2 })}</p>
                </div>
              </div>
              <button
            onClick={() => { setModalOpen(true); setModalView("table"); }}
                className="text-sm font-medium text-primary underline underline-offset-2 hover:opacity-80"
              >
                {t('clienteDetalhe.access')}
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Network className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-foreground">{t('clienteDetalhe.accessTopology')}</p>
              </div>
              <button className="text-sm font-medium text-primary underline underline-offset-2 hover:opacity-80">
                {t('clienteDetalhe.access')}
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-sm text-foreground">{t('clienteDetalhe.distantEquipments')}</p>
                  <p className="text-sm font-bold text-foreground">{t('clienteDetalhe.equipmentsCount', { count: 0 })}</p>
                </div>
              </div>
              <button className="text-sm font-medium text-primary underline underline-offset-2 hover:opacity-80">
                {t('clienteDetalhe.access')}
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">{t('clienteDetalhe.signalHistory')}</p>
              </div>
              <span className="text-sm text-muted-foreground">{t('clienteDetalhe.disabled')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Dispositivos Conectados */}
      <Dialog open={modalOpen} onOpenChange={(open) => { setModalOpen(open); if (!open) setModalView("table"); }}>
        <DialogContent className="max-w-5xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              {modalView === "table" ? t('clienteDetalhe.connectedDevices') : t('clienteDetalhe.networkTopology')}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {modalView === "table"
                ? t('clienteDetalhe.modalTableDesc')
                : t('clienteDetalhe.modalTopologyDesc')}
            </DialogDescription>
          </DialogHeader>

          {/* Toggle button */}
          <button
            onClick={() => setModalView(modalView === "table" ? "topology" : "table")}
            className="mb-3 text-sm font-medium text-[hsl(0,72%,51%)] underline underline-offset-2 hover:opacity-80 text-left w-fit"
          >
            {modalView === "table" ? t('clienteDetalhe.viewTopology') : t('clienteDetalhe.viewTable')}
          </button>

          {modalView === "table" ? (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-4 py-2.5 text-left font-semibold">{t('clienteDetalhe.deviceName')}</th>
                    <th className="px-4 py-2.5 text-left font-semibold">Tipo</th>
                    <th className="px-4 py-2.5 text-left font-semibold">MAC</th>
                    <th className="px-4 py-2.5 text-left font-semibold">IP</th>
                    <th className="px-4 py-2.5 text-left font-semibold">{t('clienteDetalhe.connectionType')}</th>
                    <th className="px-4 py-2.5 text-left font-semibold">Tecnologia</th>
                    <th className="px-4 py-2.5 text-center font-semibold">Sinal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {dispositivosConectados.map((d, i) => (
                    <tr key={i} className="hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3 text-foreground">{d.nome}</td>
                      <td className="px-4 py-3 text-foreground">{d.tipo}</td>
                      <td className="px-4 py-3 font-mono text-foreground">{d.mac}</td>
                      <td className="px-4 py-3 text-foreground">{d.ip}</td>
                      <td className="px-4 py-3 text-foreground">{d.tipoConexao}</td>
                      <td className="px-4 py-3 text-foreground">{d.tecnologia}</td>
                      <td className="px-4 py-3 text-center">
                        {d.sinal === null ? (
                          <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">-</span>
                        ) : (
                          <span className="inline-block rounded-full bg-[hsl(142,60%,35%)] px-3 py-1 text-xs font-semibold text-white">
                            {d.sinal}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <TopologyView />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClienteDetalhe;
