import React, { useState } from 'react';
import {
  CalendarClock,
  Calendar as CalendarIcon,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Filter,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { DueItem, AlertItem } from '../../types';

interface CalendarioAlertasViewProps {
  dues: DueItem[];
  alerts: AlertItem[];
  onToggleDueStatus: (id: string) => void;
  onDismissAlert: (id: string) => void;
  onOpenNewRecord: () => void;
  onOpenRoadmap: (title: string, phase: string, desc: string) => void;
}

export const CalendarioAlertasView: React.FC<CalendarioAlertasViewProps> = ({
  dues,
  alerts,
  onToggleDueStatus,
  onDismissAlert,
  onOpenNewRecord,
  onOpenRoadmap,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const activeAlerts = alerts.filter((a) => !a.resolved);

  // November 2026 has 30 days. Nov 1, 2026 was a Sunday (offset 6 for Monday-first calendar)
  const daysInMonth = 30;
  const startDayOffset = 6; // Sunday

  const getEventsForDay = (day: number) => {
    const formattedDay = `2026-11-${String(day).padStart(2, '0')}`;
    const dayDues = dues.filter((d) => d.date === formattedDay);
    const dayAlerts = alerts.filter((a) => a.date === formattedDay);
    return { dayDues, dayAlerts };
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Sección 09 · Planificación Temporal & Notificaciones
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Calendario y Alertas</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Agenda mensual de cobros, vencimientos impositivos, cuotas de préstamos y revisiones técnicas.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() =>
              onOpenRoadmap(
                'Sincronización con Google Calendar & Notificaciones WhatsApp/SMS',
                'Fase 2',
                'En la siguiente fase podrás sincronizar automáticamente todos los vencimientos con tu Google Calendar personal y recibir alertas automáticas por WhatsApp o email.'
              )
            }
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Sync Google Calendar (Fase 2)</span>
          </button>
          <button
            onClick={onOpenNewRecord}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo Recordatorio</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Monthly Calendar (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-slate-800" />
              <h3 className="text-sm font-bold text-slate-900">Noviembre 2026</h3>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Cobro
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block ml-2" /> Vencimiento
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block ml-2" /> Alerta
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
              <div key={d} className="py-1.5 font-bold text-slate-400 text-[11px] uppercase">
                {d}
              </div>
            ))}

            {/* Empty offset days */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16 rounded-lg bg-slate-50/40 opacity-40" />
            ))}

            {/* Days of November */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const { dayDues, dayAlerts } = getEventsForDay(day);
              const hasEvents = dayDues.length > 0 || dayAlerts.length > 0;
              const isSelected = selectedDay === day;

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(isSelected ? null : day)}
                  className={`h-16 p-1 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : hasEvents
                      ? 'border-slate-200 bg-white hover:border-slate-300'
                      : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-semibold font-mono ${hasEvents ? 'text-slate-900' : 'text-slate-400'}`}>
                      {day}
                    </span>
                    {day === 9 && (
                      <span className="text-[9px] px-1 bg-slate-900 text-white rounded font-medium">Hoy</span>
                    )}
                  </div>

                  {/* Badges indicators */}
                  <div className="space-y-0.5">
                    {dayDues.map((d) => (
                      <div
                        key={d.id}
                        className={`text-[9px] truncate px-1 rounded font-medium ${
                          d.type === 'income'
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-amber-50 text-amber-800'
                        }`}
                        title={d.title}
                      >
                        {d.amount}€ {d.category}
                      </div>
                    ))}
                    {dayAlerts.map((a) => (
                      <div
                        key={a.id}
                        className="text-[9px] truncate px-1 rounded font-medium bg-rose-50 text-rose-800"
                        title={a.title}
                      >
                        {a.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedDay && (
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Eventos para el {selectedDay} de Noviembre 2026:</span>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="text-[11px] text-slate-500 hover:text-slate-800"
                >
                  Cerrar
                </button>
              </div>
              {(() => {
                const { dayDues, dayAlerts } = getEventsForDay(selectedDay);
                if (dayDues.length === 0 && dayAlerts.length === 0) {
                  return <p className="text-slate-500">No hay movimientos ni citas programadas para este día.</p>;
                }
                return (
                  <div className="space-y-1">
                    {dayDues.map((d) => (
                      <div key={d.id} className="flex justify-between py-1 border-b border-slate-200/60">
                        <span>{d.title} ({d.propertyAlias})</span>
                        <span className="font-mono font-semibold">{d.amount} €</span>
                      </div>
                    ))}
                    {dayAlerts.map((a) => (
                      <div key={a.id} className="flex justify-between py-1 text-amber-800">
                        <span>Aviso: {a.title}</span>
                        <span className="font-medium">Prioridad {a.severity}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Right: Active Alerts & Obligations List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">Alertas Activas del Sistema</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                {activeAlerts.length} pendientes
              </span>
            </div>

            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900">{alert.title}</span>
                    <span
                      className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        alert.severity === 'alta'
                          ? 'bg-rose-100 text-rose-800'
                          : alert.severity === 'media'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">{alert.description}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <span className="text-[10px] text-slate-500 font-mono">Límite: {alert.date}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDismissAlert(alert.id)}
                        className="text-[11px] text-slate-500 hover:text-slate-800"
                      >
                        Descartar
                      </button>
                      <button
                        onClick={() => onDismissAlert(alert.id)}
                        className="text-[11px] font-semibold text-slate-900 hover:underline"
                      >
                        Marcar Resuelta
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vencimientos del Mes */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Relación de Pagos y Cobros (Noviembre)</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {dues.map((due) => (
                <div key={due.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      onClick={() => onToggleDueStatus(due.id)}
                      className={`p-1 rounded transition-colors ${
                        due.status === 'Completado'
                          ? 'text-emerald-600 bg-emerald-50'
                          : 'text-slate-300 hover:text-emerald-600'
                      }`}
                      title={due.status === 'Completado' ? 'Marcado como completado' : 'Marcar como completado'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <div className="truncate">
                      <span className={`block font-medium truncate ${due.status === 'Completado' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {due.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{due.date} · {due.propertyAlias}</span>
                    </div>
                  </div>
                  <span className={`font-mono font-semibold shrink-0 ${due.type === 'income' ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {due.type === 'income' ? '+' : '-'}{due.amount} €
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
