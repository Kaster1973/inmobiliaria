import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Receipt,
  Wallet,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Users,
  Hammer,
  Scale,
  FolderArchive,
  FileSpreadsheet,
} from 'lucide-react';
import {
  FinancialMetric,
  DueItem,
  AlertItem,
  Property,
  SectionId,
} from '../../types';
import { MONTHLY_HISTORY } from '../../data/mockData';

interface InicioViewProps {
  metrics: FinancialMetric;
  properties: Property[];
  dues: DueItem[];
  alerts: AlertItem[];
  onNavigateSection: (section: SectionId) => void;
  onToggleDueStatus: (id: string) => void;
  onDismissAlert: (id: string) => void;
  onOpenRoadmap: (title: string, phase: string, desc: string) => void;
  onOpenNewRecord: () => void;
}

export const InicioView: React.FC<InicioViewProps> = ({
  metrics,
  properties,
  dues,
  alerts,
  onNavigateSection,
  onToggleDueStatus,
  onDismissAlert,
  onOpenRoadmap,
  onOpenNewRecord,
}) => {
  const [chartView, setChartView] = useState<'cashflow' | 'income'>('cashflow');

  const pendingDues = dues.filter((d) => d.status === 'Pendiente').slice(0, 5);
  const activeAlerts = alerts.filter((a) => !a.resolved);

  // Department quick shortcuts
  const departmentShortcuts = [
    {
      id: 'inmuebles' as SectionId,
      title: 'Mis Inmuebles',
      desc: `${properties.length} activos · ${metrics.rentedCount} arrendados`,
      icon: Building2,
      badge: 'Inventario',
    },
    {
      id: 'terceros' as SectionId,
      title: 'Gestión de Terceros',
      desc: 'Inquilinos, comunidades y administradores',
      icon: Users,
      badge: 'Contactos',
    },
    {
      id: 'reformas' as SectionId,
      title: 'Reformas y Obras',
      desc: '1 obra en curso · 2 finalizadas',
      icon: Hammer,
      badge: 'Mantenimiento',
    },
    {
      id: 'fiscalidad' as SectionId,
      title: 'Fiscalidad & Jurídico',
      desc: 'Calendario tributario e índices IPC',
      icon: Scale,
      badge: 'Tributación',
    },
    {
      id: 'documentacion' as SectionId,
      title: 'Documentación',
      desc: 'Escrituras, contratos y seguros',
      icon: FolderArchive,
      badge: 'Archivo',
    },
    {
      id: 'informes' as SectionId,
      title: 'Informes & Renta',
      desc: 'Rentabilidades y balance mensual',
      icon: FileSpreadsheet,
      badge: 'Reportes',
    },
  ];

  // SVG Chart calculation for 6 months
  const maxVal = Math.max(...MONTHLY_HISTORY.map((m) => Math.max(m.income, m.expenses))) * 1.15;
  const chartHeight = 160;
  const chartWidth = 520;
  const barWidth = 36;
  const stepX = chartWidth / MONTHLY_HISTORY.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Welcome Banner / Overview Kicker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Centro de Control</span>
            <span>·</span>
            <span>Fase 1 Operativa</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Resumen General del Patrimonio
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Vista ejecutiva de rendimientos, flujos monetarios y calendario de vencimientos.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() =>
              onOpenRoadmap(
                'Visor CAD 2D/3D y Simulaciones',
                'Fase 2',
                'El módulo para visualizar planos arquitectónicos CAD 2D/3D, modelos de reforma y simulaciones de mercado se incorporará en la Fase 2 previa autorización.'
              )
            }
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Planos CAD & IA (Fase 2)</span>
          </button>
          <button
            onClick={onOpenNewRecord}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <span>+ Registrar Apunte</span>
          </button>
        </div>
      </div>

      {/* 5 Core Required Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* 1. Número de Inmuebles */}
        <div 
          onClick={() => onNavigateSection('inmuebles')}
          className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium text-slate-600">Inmuebles</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-center">
              <Building2 className="w-4 h-4 text-slate-700 group-hover:text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {metrics.totalProperties}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
            <span className="font-semibold text-emerald-600">{metrics.rentedCount} alquilados</span>
            <span>·</span>
            <span>1 en reforma</span>
          </div>
        </div>

        {/* 2. Ingresos Mensuales */}
        <div 
          onClick={() => onNavigateSection('patrimonio')}
          className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium text-slate-600">Ingresos / Mes</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-emerald-600 group-hover:text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {metrics.monthlyIncome.toLocaleString('es-ES')} €
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
            <span className="text-emerald-600 font-medium">+4,2%</span>
            <span>vs trimestre anterior</span>
          </div>
        </div>

        {/* 3. Gastos Mensuales */}
        <div 
          onClick={() => onNavigateSection('patrimonio')}
          className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium text-slate-600">Gastos / Mes</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-slate-800 group-hover:text-white transition-colors flex items-center justify-center">
              <Receipt className="w-4 h-4 text-slate-700 group-hover:text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {metrics.monthlyExpenses.toLocaleString('es-ES')} €
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
            <span>Flujo neto:</span>
            <span className="font-semibold text-slate-800 tabular-nums">
              +{(metrics.monthlyIncome - metrics.monthlyExpenses).toLocaleString('es-ES')} €
            </span>
          </div>
        </div>

        {/* 4. Rentabilidad */}
        <div 
          onClick={() => onNavigateSection('informes')}
          className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium text-slate-600">Rentabilidad</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-slate-700 group-hover:text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {metrics.averageGrossYield}%
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
            <span>Bruta media</span>
            <span>·</span>
            <span className="font-semibold text-emerald-600">{metrics.averageNetYield}% neta</span>
          </div>
        </div>

        {/* 5. Patrimonio Estimado */}
        <div 
          onClick={() => onNavigateSection('patrimonio')}
          className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer group shadow-2xs sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium text-slate-600">Patrimonio Neto</span>
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {metrics.estimatedNetWorth.toLocaleString('es-ES')} €
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500 truncate">
            <span>Activos: {(metrics.totalValuation + metrics.investmentPortfolio + metrics.liquidCapital).toLocaleString('es-ES')} €</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Cashflow chart & Portfolio Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (7 cols): Cashflow Evolution Chart */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Evolución del Flujo Monetario</h3>
              <p className="text-xs text-slate-500">Ingresos por alquiler vs Gastos y cuotas operativas</p>
            </div>

            {/* Toggle visual */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
              <button
                onClick={() => setChartView('cashflow')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  chartView === 'cashflow' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                Ingresos vs Gastos
              </button>
              <button
                onClick={() => setChartView('income')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  chartView === 'income' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                Beneficio Neto
              </button>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="w-full overflow-x-auto pt-2">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight + 35}`}
              className="w-full h-44 select-none"
            >
              {/* Grid lines */}
              <line x1="30" y1="20" x2={chartWidth} y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="30" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="#f1f5f9" strokeWidth="1" />
              <line x1="30" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#e2e8f0" strokeWidth="1" />

              {MONTHLY_HISTORY.map((item, index) => {
                const xCenter = 50 + index * stepX;
                const incomeH = (item.income / maxVal) * chartHeight;
                const expensesH = (item.expenses / maxVal) * chartHeight;
                const netH = (item.net / maxVal) * chartHeight;

                if (chartView === 'cashflow') {
                  return (
                    <g key={item.month}>
                      {/* Income Bar */}
                      <rect
                        x={xCenter - 16}
                        y={chartHeight - incomeH}
                        width={barWidth / 2.3}
                        height={incomeH}
                        rx="3"
                        className="fill-slate-800 hover:fill-slate-700 transition-colors cursor-pointer"
                      >
                        <title>{`${item.month}: Ingreso ${item.income} €`}</title>
                      </rect>

                      {/* Expenses Bar */}
                      <rect
                        x={xCenter + 2}
                        y={chartHeight - expensesH}
                        width={barWidth / 2.3}
                        height={expensesH}
                        rx="3"
                        className="fill-amber-500/80 hover:fill-amber-500 transition-colors cursor-pointer"
                      >
                        <title>{`${item.month}: Gasto ${item.expenses} €`}</title>
                      </rect>

                      {/* Label Month */}
                      <text
                        x={xCenter}
                        y={chartHeight + 20}
                        textAnchor="middle"
                        className="text-[11px] font-medium fill-slate-500 font-sans"
                      >
                        {item.month}
                      </text>
                    </g>
                  );
                } else {
                  return (
                    <g key={item.month}>
                      {/* Net Bar */}
                      <rect
                        x={xCenter - 14}
                        y={chartHeight - netH}
                        width={28}
                        height={netH}
                        rx="4"
                        className="fill-emerald-600 hover:fill-emerald-500 transition-colors cursor-pointer"
                      >
                        <title>{`${item.month}: Beneficio Neto ${item.net} €`}</title>
                      </rect>

                      {/* Label Value */}
                      <text
                        x={xCenter}
                        y={chartHeight - netH - 6}
                        textAnchor="middle"
                        className="text-[10px] font-semibold fill-slate-700 font-mono"
                      >
                        {item.net}€
                      </text>

                      {/* Label Month */}
                      <text
                        x={xCenter}
                        y={chartHeight + 20}
                        textAnchor="middle"
                        className="text-[11px] font-medium fill-slate-500 font-sans"
                      >
                        {item.month}
                      </text>
                    </g>
                  );
                }
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-slate-800 rounded-xs" />
                Ingresos (Media: 8.525 €)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-amber-500/80 rounded-xs" />
                Gastos (Media: 1.860 €)
              </span>
            </div>
            <button
              onClick={() => onNavigateSection('patrimonio')}
              className="font-medium text-slate-800 hover:underline flex items-center gap-1"
            >
              Ver desglose completo <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Asset & Wealth Breakdown */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">Estructura Patrimonial</h3>
              <span className="text-xs text-slate-500 font-mono">1.710.000 € Neto</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Distribución consolidada entre inmuebles, inversiones y pasivos hipotecarios.
            </p>

            {/* Visual stacked bar */}
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex mb-4">
              <div style={{ width: '82%' }} className="bg-slate-900" title="Inmuebles: 82%" />
              <div style={{ width: '10%' }} className="bg-emerald-600" title="Inversiones financieras: 10%" />
              <div style={{ width: '8%' }} className="bg-blue-500" title="Tesorería: 8%" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                  <span className="font-medium text-slate-800">Inmuebles (8 activos)</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-900 tabular-nums">1.880.000 €</span>
                  <span className="text-slate-400 text-[11px] block">88,7%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="font-medium text-slate-800">Inversiones & SOCIMIs</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-900 tabular-nums">165.000 €</span>
                  <span className="text-slate-400 text-[11px] block">7,8%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="font-medium text-slate-800">Tesorería y Liquidez</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-900 tabular-nums">75.000 €</span>
                  <span className="text-slate-400 text-[11px] block">3,5%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-1.5 bg-amber-50/60 p-2 rounded-lg border border-amber-200/50">
                <div className="flex items-center gap-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-amber-700" />
                  <span className="font-medium text-amber-900">Deuda Hipotecaria Total</span>
                </div>
                <span className="font-semibold text-amber-900 tabular-nums">-410.000 €</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">Apalancamiento prudente (21,8%)</span>
            <button
              onClick={() => onNavigateSection('patrimonio')}
              className="text-xs font-semibold text-slate-900 hover:underline flex items-center gap-1"
            >
              Auditoría patrimonial <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Próximos Vencimientos & Alertas Importantes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Próximos Vencimientos */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">Próximos Vencimientos</h3>
            </div>
            <button
              onClick={() => onNavigateSection('calendario')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline flex items-center gap-1"
            >
              Ver calendario <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingDues.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No hay vencimientos pendientes en los próximos 15 días.
              </div>
            ) : (
              pendingDues.map((due) => (
                <div key={due.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => onToggleDueStatus(due.id)}
                      className="p-1 rounded-md text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                      title="Marcar como atendido/pagado"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{due.title}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span>{due.propertyAlias}</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5 font-mono text-slate-600">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {due.date}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`font-semibold tabular-nums text-xs ${
                        due.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                      }`}
                    >
                      {due.type === 'income' ? '+' : '-'}
                      {due.amount} €
                    </span>
                    <span className="text-[10px] text-slate-500 block uppercase tracking-wide">
                      {due.category}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Control de pagos y cobros domiciliados</span>
            <button
              onClick={onOpenNewRecord}
              className="text-slate-900 font-medium hover:underline"
            >
              + Añadir recordatorio
            </button>
          </div>
        </div>

        {/* Alertas Importantes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">Alertas Importantes</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
              {activeAlerts.length} avisos activos
            </span>
          </div>

          <div className="space-y-3">
            {activeAlerts.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                Todas las alertas están resueltas. No hay avisos críticos.
              </div>
            ) : (
              activeAlerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-slate-50 transition-colors text-xs"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          alert.severity === 'alta'
                            ? 'bg-rose-500'
                            : alert.severity === 'media'
                            ? 'bg-amber-500'
                            : 'bg-blue-400'
                        }`}
                      />
                      <span>{alert.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                      {alert.date}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 mb-2 leading-relaxed">
                    {alert.description}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {alert.propertyAlias}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDismissAlert(alert.id)}
                        className="text-[11px] text-slate-500 hover:text-slate-800"
                      >
                        Descartar
                      </button>
                      <button
                        onClick={() => onNavigateSection(alert.targetSection)}
                        className="text-[11px] font-semibold text-slate-900 hover:underline flex items-center gap-0.5"
                      >
                        {alert.actionLabel} <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Avisos legales, contractuales e ITE</span>
            <button
              onClick={() => onNavigateSection('calendario')}
              className="text-slate-900 font-medium hover:underline"
            >
              Gestionar todas
            </button>
          </div>
        </div>
      </div>

      {/* Accesos Rápidos a los Departamentos */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Accesos Rápidos a los Departamentos</h3>
            <p className="text-xs text-slate-500">Accede directamente a la gestión especializada de cada área</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {departmentShortcuts.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.id}
                onClick={() => onNavigateSection(dept.id)}
                className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-slate-700 group-hover:text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                      {dept.badge}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-slate-800">
                      {dept.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{dept.desc}</p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0 mt-1" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
