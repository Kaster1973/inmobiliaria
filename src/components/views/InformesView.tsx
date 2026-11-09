import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Sparkles,
  TrendingUp,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { Property, FinancialMetric } from '../../types';

interface InformesViewProps {
  properties: Property[];
  metrics: FinancialMetric;
  onOpenRoadmap: (title: string, phase: string, desc: string) => void;
}

export const InformesView: React.FC<InformesViewProps> = ({
  properties,
  metrics,
  onOpenRoadmap,
}) => {
  const [selectedReport, setSelectedReport] = useState<'rentability' | 'cashflow' | 'fiscal'>('rentability');

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    // Generate clean CSV representation of the active properties
    const headers = 'Inmueble,Tipo,Ciudad,Valoracion,RentaMensual,GastosMensuales,FlujoNeto,RentabilidadBruta,RentabilidadNeta\n';
    const rows = properties
      .map(
        (p) =>
          `"${p.alias}","${p.type}","${p.city}",${p.valuation},${p.monthlyRent},${p.monthlyExpenses},${p.monthlyRent - p.monthlyExpenses},"${p.grossYield}%","${p.netYield}%"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Informe_Inmuebles_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs print:hidden">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Sección 10 · Inteligencia de Negocio & Reportes Ejecutivos
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Informes</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Cuadros comparativos de rentabilidad neta, balance de explotación y sumarios fiscales.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Informe</span>
          </button>
        </div>
      </div>

      {/* Report selector tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white p-2 rounded-xl shadow-2xs print:hidden">
        <button
          onClick={() => setSelectedReport('rentability')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedReport === 'rentability'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Comparativa de Rentabilidades
        </button>
        <button
          onClick={() => setSelectedReport('cashflow')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedReport === 'cashflow'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Cuenta de Pérdidas y Ganancias
        </button>
        <button
          onClick={() => setSelectedReport('fiscal')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedReport === 'fiscal'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Sumario Fiscal Anual (IRPF)
        </button>
      </div>

      {/* Report Container */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
        {/* Printable Letterhead */}
        <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
              GESTIÓN PRIVADA DE PATRIMONIO E INMUEBLES
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              {selectedReport === 'rentability'
                ? 'Informe Comparativo de Rentabilidad y Rendimiento Inmobiliario'
                : selectedReport === 'cashflow'
                ? 'Estado de Explotación y Flujo de Caja Consolidado'
                : 'Sumario Fiscal de Rendimientos del Capital Inmobiliario (IRPF)'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Fecha de emisión: {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })} · Moneda: EUR (€)
            </p>
          </div>
          <div className="text-right text-xs text-slate-400 font-mono">
            REF: INF-2026-F1
          </div>
        </div>

        {/* 1. Rentability Report */}
        {selectedReport === 'rentability' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Renta Bruta Anualizada</span>
                <span className="font-bold text-slate-900 font-mono text-base">
                  {(metrics.monthlyIncome * 12).toLocaleString('es-ES')} €
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Gastos Anualizados</span>
                <span className="font-bold text-slate-900 font-mono text-base">
                  {(metrics.monthlyExpenses * 12).toLocaleString('es-ES')} €
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Rentabilidad Bruta Media</span>
                <span className="font-bold text-slate-900 font-mono text-base">{metrics.averageGrossYield}%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase">Rentabilidad Neta Media</span>
                <span className="font-bold text-emerald-600 font-mono text-base">{metrics.averageNetYield}%</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-y border-slate-200">
                  <tr>
                    <th className="px-3 py-2.5">Inmueble</th>
                    <th className="px-3 py-2.5">Tipo</th>
                    <th className="px-3 py-2.5 text-right">Valoración</th>
                    <th className="px-3 py-2.5 text-right">Renta Mes</th>
                    <th className="px-3 py-2.5 text-right">Gastos Mes</th>
                    <th className="px-3 py-2.5 text-right">Flujo Neto Mes</th>
                    <th className="px-3 py-2.5 text-right">Rent. Bruta</th>
                    <th className="px-3 py-2.5 text-right">Rent. Neta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {properties.map((p) => {
                    const netMonthly = p.monthlyRent - p.monthlyExpenses;
                    return (
                      <tr key={p.id}>
                        <td className="px-3 py-2.5 font-semibold text-slate-900">{p.alias}</td>
                        <td className="px-3 py-2.5 text-slate-500">{p.type}</td>
                        <td className="px-3 py-2.5 text-right font-mono">{p.valuation.toLocaleString('es-ES')} €</td>
                        <td className="px-3 py-2.5 text-right font-mono font-medium text-emerald-600">{p.monthlyRent} €</td>
                        <td className="px-3 py-2.5 text-right font-mono text-slate-500">{p.monthlyExpenses} €</td>
                        <td className="px-3 py-2.5 text-right font-mono font-bold text-slate-900">+{netMonthly} €</td>
                        <td className="px-3 py-2.5 text-right font-mono">{p.grossYield}%</td>
                        <td className="px-3 py-2.5 text-right font-mono font-semibold text-slate-800">{p.netYield}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. Cashflow Statement */}
        {selectedReport === 'cashflow' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200/80">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs">Partidas de Explotación</h4>
              <div className="divide-y divide-slate-200">
                <div className="flex justify-between py-2">
                  <span className="font-semibold text-slate-800">(+) Ingresos Brutos por Renta (Anual)</span>
                  <span className="font-mono font-bold text-emerald-600">+{(metrics.monthlyIncome * 12).toLocaleString('es-ES')} €</span>
                </div>
                <div className="flex justify-between py-2 text-slate-600">
                  <span>(-) Gastos de Comunidad de Propietarios</span>
                  <span className="font-mono">-{(480 * 12).toLocaleString('es-ES')} €</span>
                </div>
                <div className="flex justify-between py-2 text-slate-600">
                  <span>(-) Pólizas de Seguros Multirriesgo</span>
                  <span className="font-mono">-{(210 * 12).toLocaleString('es-ES')} €</span>
                </div>
                <div className="flex justify-between py-2 text-slate-600">
                  <span>(-) Mantenimientos y Reparaciones</span>
                  <span className="font-mono">-{(290 * 12).toLocaleString('es-ES')} €</span>
                </div>
                <div className="flex justify-between py-2 text-slate-600">
                  <span>(-) Intereses de Deuda Hipotecaria</span>
                  <span className="font-mono">-{(840 * 12).toLocaleString('es-ES')} €</span>
                </div>
                <div className="flex justify-between py-2.5 font-bold text-slate-900 bg-white px-2 mt-2 rounded">
                  <span>(=) Beneficio Neto de Explotación (EBITDA Inmobiliario)</span>
                  <span className="font-mono text-emerald-600">
                    +{((metrics.monthlyIncome - metrics.monthlyExpenses) * 12).toLocaleString('es-ES')} €
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Fiscal Summary */}
        {selectedReport === 'fiscal' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200/80">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                Cálculo de Rendimiento Neto Reducible (IRPF)
              </h4>
              <p className="text-slate-600">
                Resumen para entrega al asesor tributario con el desglose de ingresos íntegros y partidas deducibles según la normativa fiscal del IRPF.
              </p>
              <div className="divide-y divide-slate-200 pt-2">
                <div className="flex justify-between py-2">
                  <span className="font-medium">Ingresos Íntegros Computables</span>
                  <span className="font-mono font-bold">+{(metrics.monthlyIncome * 12).toLocaleString('es-ES')} €</span>
                </div>
                <div className="flex justify-between py-2 text-slate-600">
                  <span>Deducción: Amortización 3% s/ Construcción</span>
                  <span className="font-mono">- 33.840 €</span>
                </div>
                <div className="flex justify-between py-2 text-slate-600">
                  <span>Deducción: Tributos Locales (IBI + Basuras)</span>
                  <span className="font-mono">- 3.450 €</span>
                </div>
                <div className="flex justify-between py-2 text-slate-600">
                  <span>Deducción: Gastos de Financiación y Reparación</span>
                  <span className="font-mono">- 8.920 €</span>
                </div>
                <div className="flex justify-between py-2.5 font-bold text-slate-900 bg-white px-2 mt-2 rounded">
                  <span>Rendimiento Neto Previo a Reducciones por Arrendamiento Habitual</span>
                  <span className="font-mono text-slate-900">
                    +{(metrics.monthlyIncome * 12 - 33840 - 3450 - 8920).toLocaleString('es-ES')} €
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Informe confidencial para uso exclusivo del titular patrimonial.</span>
          <button
            onClick={() =>
              onOpenRoadmap(
                'Simulaciones Predictivas con Inteligencia Artificial',
                'Fase 3',
                'En futuras fases la aplicación incorporará proyecciones a 5, 10 y 20 años considerando revalorización de activos, inflación e impacto de amortizaciones extraordinarias.'
              )
            }
            className="text-slate-800 font-semibold hover:underline flex items-center gap-1 print:hidden"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Simulaciones con IA (Fase 3)
          </button>
        </div>
      </div>
    </div>
  );
};
