import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Plus,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { SectionId, AlertItem } from '../../types';

interface TopHeaderProps {
  currentSection: SectionId;
  onOpenMobileSidebar: () => void;
  onOpenNewRecordModal: () => void;
  onNavigateSection: (section: SectionId) => void;
  alerts: AlertItem[];
  onDismissAlert: (id: string) => void;
  selectedMonth: string;
  onChangeMonth: (month: string) => void;
}

const SECTION_LABELS: Record<SectionId, { title: string; subtitle: string }> = {
  inicio: {
    title: 'Centro de Control',
    subtitle: 'Resumen integral de patrimonio e inmuebles',
  },
  inmuebles: {
    title: 'Mis Inmuebles',
    subtitle: 'Inventario de activos, rentas y estado de ocupación',
  },
  terceros: {
    title: 'Gestión de Terceros',
    subtitle: 'Inquilinos, administradores, asesores y proveedores',
  },
  reformas: {
    title: 'Reformas y Mantenimiento',
    subtitle: 'Seguimiento de obras, presupuestos y tareas activas',
  },
  patrimonio: {
    title: 'Economía y Patrimonio',
    subtitle: 'Flujo de caja, balance patrimonial y amortizaciones',
  },
  fiscalidad: {
    title: 'Fiscalidad y Jurídico',
    subtitle: 'Obligaciones tributarias, modelos e índices oficiales',
  },
  inversiones: {
    title: 'Inversiones',
    subtitle: 'Cartera inmobiliaria directa, SOCIMIs y liquidez',
  },
  documentacion: {
    title: 'Documentación',
    subtitle: 'Archivo organizado de escrituras, contratos y pólizas',
  },
  calendario: {
    title: 'Calendario y Alertas',
    subtitle: 'Vencimientos de cobros, pagos e inspecciones',
  },
  informes: {
    title: 'Informes',
    subtitle: 'Cuadros ejecutivos de rentabilidad y evolución',
  },
  configuracion: {
    title: 'Configuración',
    subtitle: 'Parámetros del sistema y hoja de ruta autorizada',
  },
};

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentSection,
  onOpenMobileSidebar,
  onOpenNewRecordModal,
  onNavigateSection,
  alerts,
  onDismissAlert,
  selectedMonth,
  onChangeMonth,
}) => {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const activeAlerts = alerts.filter((a) => !a.resolved);
  const currentMeta = SECTION_LABELS[currentSection];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left zone: Mobile toggle & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 truncate">
          <button
            onClick={() => onNavigateSection('inicio')}
            className="hover:text-slate-900 transition-colors font-medium hidden sm:inline"
          >
            Gestor Privado
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden sm:inline" />
          <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">
            {currentMeta.title}
          </h1>
        </div>
      </div>

      {/* Right zone: Period selector, Alerts popover & New Record CTA */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Month selector */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200/70 rounded-lg text-xs font-medium text-slate-700 transition-colors">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={selectedMonth}
            onChange={(e) => onChangeMonth(e.target.value)}
            className="bg-transparent border-none text-xs font-medium text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="Noviembre 2026">Noviembre 2026 (Actual)</option>
            <option value="Octubre 2026">Octubre 2026</option>
            <option value="Septiembre 2026">Septiembre 2026</option>
            <option value="Total Ejercicio 2026">Total Ejercicio 2026</option>
          </select>
        </div>

        {/* Alerts trigger */}
        <div className="relative">
          <button
            onClick={() => setIsAlertsOpen(!isAlertsOpen)}
            className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            title="Alertas y avisos"
            aria-label="Ver alertas pendientes"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {activeAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Alerts dropdown */}
          {isAlertsOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsAlertsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Alertas del Sistema</span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-800 rounded-md">
                      {activeAlerts.length} pendientes
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsAlertsOpen(false);
                      onNavigateSection('calendario');
                    }}
                    className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1"
                  >
                    Ver todas <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {activeAlerts.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                      No hay alertas pendientes en este momento.
                    </div>
                  ) : (
                    activeAlerts.map((alert) => (
                      <div key={alert.id} className="p-3.5 hover:bg-slate-50 transition-colors text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <AlertTriangle
                              className={`w-3.5 h-3.5 shrink-0 ${
                                alert.severity === 'alta'
                                  ? 'text-rose-500'
                                  : alert.severity === 'media'
                                  ? 'text-amber-500'
                                  : 'text-slate-400'
                              }`}
                            />
                            <span className="font-semibold text-slate-900">{alert.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0">{alert.date}</span>
                        </div>
                        <p className="text-slate-600 mt-1 line-clamp-2 text-[11px]">{alert.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {alert.propertyAlias}
                          </span>
                          <button
                            onClick={() => onDismissAlert(alert.id)}
                            className="text-[11px] text-slate-500 hover:text-slate-800 hover:underline"
                          >
                            Resolver
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Primary CTA: Nuevo Registro */}
        <button
          onClick={onOpenNewRecordModal}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nuevo Registro</span>
        </button>
      </div>
    </header>
  );
};
