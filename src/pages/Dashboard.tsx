import { useState } from "react";
import { Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { clientes } from "@/data/mockClientes";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

type SearchType = "mac" | "contrato";

interface ResultItem {
  mac: string;
  contrato: number;
  operadora: number;
}

const Dashboard = () => {
  const { t } = useTranslation();
  const [searchType, setSearchType] = useState<SearchType>("contrato");
  const [codigoOperadora, setCodigoOperadora] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const navigate = useNavigate();

  const handlePesquisar = () => {
    const filtered = clientes.filter((c) => {
      const opMatch =
        codigoOperadora.trim() === "" ||
        String(c.operadora).includes(codigoOperadora.trim());

      if (searchType === "contrato") {
        const contratoMatch =
          searchValue.trim() === "" ||
          String(c.contrato).includes(searchValue.trim());
        return opMatch && contratoMatch;
      } else {
        const macMatch =
          searchValue.trim() === "" ||
          c.mac.toLowerCase().includes(searchValue.trim().toLowerCase());
        return opMatch && macMatch;
      }
    });

    setResults(
      filtered.map((c) => ({
        mac: c.mac,
        contrato: c.contrato,
        operadora: c.operadora,
      }))
    );
  };

  const handleCancelar = () => {
    setCodigoOperadora("");
    setSearchValue("");
    setResults(null);
  };

  const handleTypeChange = (val: string) => {
    setSearchType(val as SearchType);
    setSearchValue("");
    setResults(null);
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-start bg-muted/40 px-4 pt-20">
      {/* Search Card */}
      <Card className="w-full max-w-[480px] rounded-2xl shadow-md">
        <CardContent className="px-8 py-7">
          {/* Header */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(142,60%,90%)]">
              <Search className="h-5 w-5 text-[hsl(142,60%,35%)]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{t('dashboard.searchClient')}</h2>
              <p className="text-sm text-muted-foreground">
                {t('dashboard.selectType')}
              </p>
            </div>
          </div>

          {/* Radio */}
          <RadioGroup
            value={searchType}
            onValueChange={handleTypeChange}
            className="mb-5 flex gap-6"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value="mac"
                id="mac"
                className="border-2 border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:text-primary"
              />
              <Label htmlFor="mac" className="cursor-pointer text-sm font-medium text-foreground">
                {t('dashboard.macAddress')}
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value="contrato"
                id="contrato"
                className="border-2 border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:text-primary"
              />
              <Label htmlFor="contrato" className="cursor-pointer text-sm font-medium text-foreground">
                {t('dashboard.contractNumber')}
              </Label>
            </div>
          </RadioGroup>

          {/* Input: Código da operadora */}
          <div className="relative mb-4">
            {codigoOperadora && (
              <p className="absolute -top-2.5 left-4 z-10 bg-card px-1 text-xs text-muted-foreground">
                {t('dashboard.enterOperatorCode')}
              </p>
            )}
            <div className="relative">
              <Input
                placeholder={t('dashboard.enterOperatorCode')}
                value={codigoOperadora}
                onChange={(e) => setCodigoOperadora(e.target.value)}
                className="rounded-xl pr-9"
              />
              {codigoOperadora && (
                <button
                  onClick={() => setCodigoOperadora("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Input: MAC or Contrato */}
          <div className="relative mb-6">
            {searchValue && (
              <p className="absolute -top-2.5 left-4 z-10 bg-card px-1 text-xs text-muted-foreground">
                {searchType === "mac"
                  ? t('dashboard.enterMacAddress')
                  : t('dashboard.enterContractNumber')}
              </p>
            )}
            <div className="relative">
              <Input
                placeholder={
                  searchType === "mac"
                    ? t('dashboard.enterMacAddress')
                    : t('dashboard.enterContractNumber')
                }
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="rounded-xl pr-9"
              />
              {searchValue && (
                <button
                  onClick={() => setSearchValue("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleCancelar}
              className="rounded-xl border-primary text-primary hover:bg-primary/5"
            >
              {t('common.cancel')}
            </Button>
            <Button
              onClick={() => navigate("/cliente-detalhe")}
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t('common.search')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results !== null && (
        <Card className="mt-4 w-full max-w-[480px] rounded-2xl shadow-md">
          <CardContent className="px-8 py-6">
            <h3 className="mb-1 text-base font-bold text-foreground">{t('dashboard.searchResults')}</h3>
            <p className="mb-4 text-sm text-muted-foreground border-b border-border pb-3">
              {t('common.found', { count: results.length })}
            </p>

            {results.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('common.noResults')}</p>
            ) : (
              <ul className="divide-y divide-border/50">
                {results.map((r) => (
                  <li key={r.mac} className="flex items-center justify-between py-3">
                    <span className="font-mono text-sm text-foreground">{r.mac}</span>
                    <button className="text-sm font-medium text-primary underline underline-offset-2 hover:text-primary/80">
                      {t('common.select')}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
