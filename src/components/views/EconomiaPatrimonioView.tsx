import React from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  PiggyBank,
  CreditCard,
  Sparkles,
  PieChart,
} from 'lucide-react';
import { FinancialMetric } from '../../types';

interface EconomiaPatrimonioViewProps {
  metrics: FinancialMetric;
  onOpenRoadmap: (title: string, phase: string, desc: string) => void;
}

export const EconomiaPatrimonioView: React.FC<EconomiaPatrimonioViewProps> = ({
  metrics,
  onOpenRoadmap,
}) => {
  const totalAssets = metrics.totalValuation + metrics.investmentPortfolio + metrics.liquidCapital;
  const netWorth = totalAssets - metrics.totalMortgageDebt;
  const leverageRatio = ((metrics.totalMortgageDebt / metrics.totalValuation) * 100).toFixed(1);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Sección 05 · Balance Patrimonial y Tesorería
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Economía y Patrimonio</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Auditoría de activos, amortización de pasivos financieros y balance de flujo neto mensual.
          </p>
        </div>

        <button
          onClick={() =>
            onOpenRoadmap(
              'Sincronización Bancaria Automática (Open Banking)',
              'Fase 2',
              'En la siguiente fase podrás vincular de forma segura tus cuentas bancarias mediante normativa PSD2 para conciliar ingresos y recibos automáticamente.'
            )
          }
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Conexión Bancaria PSD2 (Fase 2)</span>
        </button>
      </div>

      {/* 3 Pillar Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Activo Total */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Activo Bruto Total</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {totalAssets.toLocaleString('es-ES')} €
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Inmuebles (1.880k €) + Fondos (165k €) + Tesorería (75k €)
          </p>
        </div>

        {/* Pasivo Total */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Deuda / Pasivo Exigible</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {metrics.totalMortgageDebt.toLocaleString('es-ES')} €
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ratio de endeudamiento sobre activos: <strong className="text-slate-800">{leverageRatio}%</strong>
          </p>
        </div>

        {/* Patrimonio Neto */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Patrimonio Neto Limpio</span>
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {netWorth.toLocaleString('es-ES')} €
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            Solvencia del 80,7% sobre el volumen total
          </p>
        </div>
      </div>

      {/* Detailed Balance Table & Monthly Cashflow Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Balance Sheet Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Desglose del Balance Patrimonial</h3>

          <div className="space-y-3 text-xs">
            {/* Activos Inmobiliarios */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-700" />
                  Activos Inmobiliarios (8 Unidades)
                </span>
                <span className="font-mono">{metrics.totalValuation.toLocaleString('es-ES')} €</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Valoración conservadora a precios de mercado actuales de Madrid, Barcelona, Valencia y Sevilla.
              </p>
            </div>

            {/* Inversiones Financieras */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-emerald-600" />
                  Inversiones Financieras & SOCIMIs
                </span>
                <span className="font-mono">{metrics.investmentPortfolio.toLocaleString('es-ES')} €</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Merlin Properties SOCIMI, Fondos inmobiliarios cotizados y Letras del Tesoro a 12 meses.
              </p>
            </div>

            {/* Cuentas de Tesorería */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  Fondo de Reserva y Cuentas Operativas
                </span>
                <span className="font-mono">{metrics.liquidCapital.toLocaleString('es-ES')} €</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Liquidez inmediata disponible para pagos corrientes, derramas extraordinarias e imprevistos.
              </p>
            </div>

            {/* Pasivos */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-bold text-amber-900">
                <span>Pasivo Hipotecario Pendiente</span>
                <span className="font-mono">- {metrics.totalMortgageDebt.toLocaleString('es-ES')} €</span>
              </div>
              <p className="text-[11px] text-amber-800/80">
                Capital pendiente en 4 préstamos hipotecarios a tipo fijo medio del 1,75%.
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Cashflow Statement */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Cuenta de Flujo de Caja Mensual</h3>
            <span className="text-xs font-semibold text-emerald-600 font-mono">
              +{(metrics.monthlyIncome - metrics.monthlyExpenses).toLocaleString('es-ES')} € Netos/mes
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Total Ingresos Brutos por Renta</span>
              <span className="font-semibold text-emerald-600 font-mono">+{metrics.monthlyIncome.toLocaleString('es-ES')} €</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Cuotas Comunitarias de Propietarios</span>
              <span className="font-semibold text-slate-800 font-mono">- 480 €</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Pólizas y Seguros Multirriesgo (Prorrateo)</span>
              <span className="font-semibold text-slate-800 font-mono">- 210 €</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Fondo para Mantenimientos y Averías</span>
              <span className="font-semibold text-slate-800 font-mono">- 290 €</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Intereses y Cuotas Hipotecarias</span>
              <span className="font-semibold text-slate-800 font-mono">- 840 €</span>
            </div>

            <div className="pt-2 flex items-center justify-between font-bold text-slate-900 text-sm">
              <span>Superávit Operativo Neto</span>
              <span className="font-mono text-emerald-600">
                +{(metrics.monthlyIncome - metrics.monthlyExpenses).toLocaleString('es-ES')} €
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 leading-relaxed">
            El flujo neto generado permite amortizar anticipadamente capital o acumular tesorería para futuras oportunidades de adquisición.
          </div>
        </div>
      </div>
    </div>
  );
};
