import React from 'react';
import {
  TrendingUp,
  PieChart,
  ShieldCheck,
  Building,
  Sparkles,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { InvestmentAsset } from '../../types';

interface InversionesViewProps {
  investments: InvestmentAsset[];
  onOpenRoadmap: (title: string, phase: string, desc: string) => void;
}

export const InversionesView: React.FC<InversionesViewProps> = ({
  investments,
  onOpenRoadmap,
}) => {
  const totalInvested = investments.reduce((acc, i) => acc + i.value, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Sección 07 · Cartera de Activos & Diversificación
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Inversiones</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Exposición inmobiliaria directa, activos cotizados (SOCIMIs) e instrumentos de renta fija.
          </p>
        </div>

        <button
          onClick={() =>
            onOpenRoadmap(
              'Análisis de Mercado & Algoritmos de Oportunidades',
              'Fase 3',
              'En futuras fases se integrará un rastreador de oportunidades inmobiliarias, cálculo automatizado de TIR neta y comparador de precios de compra/alquiler por zona geográfica.'
            )
          }
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Análisis de Mercado & TIR (Fase 3)</span>
        </button>
      </div>

      {/* Asset Allocation Overview */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">Distribución de la Cartera Total</h3>
          <span className="text-xs font-bold text-slate-900 font-mono">
            {totalInvested.toLocaleString('es-ES')} € Consolidados
          </span>
        </div>

        {/* Visual progress bar */}
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex mb-4">
          <div style={{ width: '88.7%' }} className="bg-slate-900" title="Inmuebles Directos: 88.7%" />
          <div style={{ width: '3.1%' }} className="bg-emerald-600" title="SOCIMIs: 3.1%" />
          <div style={{ width: '2.6%' }} className="bg-purple-600" title="Fondos Inmobiliarios: 2.6%" />
          <div style={{ width: '2.1%' }} className="bg-blue-600" title="Bonos / Tesoro: 2.1%" />
          <div style={{ width: '3.5%' }} className="bg-amber-500" title="Tesorería: 3.5%" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-lg">
            <span className="text-[10px] text-slate-400 block font-medium">Inmuebles Físicos</span>
            <span className="font-bold text-slate-900 font-mono">1.880.000 €</span>
            <span className="text-[11px] text-slate-500 block">88,7% · Rend. 6,8%</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg">
            <span className="text-[10px] text-slate-400 block font-medium">SOCIMIs Cotizadas</span>
            <span className="font-bold text-slate-900 font-mono">65.000 €</span>
            <span className="text-[11px] text-emerald-600 font-medium block">3,1% · Rend. 5,4%</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg">
            <span className="text-[10px] text-slate-400 block font-medium">Fondos Inmobiliarios</span>
            <span className="font-bold text-slate-900 font-mono">55.000 €</span>
            <span className="text-[11px] text-slate-500 block">2,6% · Rend. 4,8%</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg">
            <span className="text-[10px] text-slate-400 block font-medium">Bonos & Tesoro</span>
            <span className="font-bold text-slate-900 font-mono">45.000 €</span>
            <span className="text-[11px] text-slate-500 block">2,1% · Rend. 3,1%</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg">
            <span className="text-[10px] text-slate-400 block font-medium">Tesorería Operativa</span>
            <span className="font-bold text-slate-900 font-mono">75.000 €</span>
            <span className="text-[11px] text-slate-500 block">3,5% · Rend. 2,5%</span>
          </div>
        </div>
      </div>

      {/* Assets detail list */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Detalle de Posiciones de Inversión</h3>
        <div className="space-y-3">
          {investments.map((asset) => (
            <div
              key={asset.id}
              className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 rounded-md">
                    {asset.category}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Liquidez: {asset.liquidity}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{asset.name}</h4>
                <p className="text-xs text-slate-500">{asset.notes}</p>
              </div>

              <div className="flex items-center md:flex-col md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6 shrink-0 gap-1">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Valor Actual</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    {asset.value.toLocaleString('es-ES')} €
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Rentabilidad Anual</span>
                  <span className="text-xs font-bold text-emerald-600 font-mono flex items-center gap-0.5 justify-end">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +{asset.annualYield}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
