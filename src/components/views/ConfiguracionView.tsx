import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  Info,
} from 'lucide-react';
import { Property, DueItem, AlertItem } from '../../types';

interface ConfiguracionViewProps {
  properties: Property[];
  dues: DueItem[];
  alerts: AlertItem[];
  onResetData: () => void;
  onOpenRoadmap: (title: string, phase: string, desc: string) => void;
}

export const ConfiguracionView: React.FC<ConfiguracionViewProps> = ({
  properties,
  dues,
  alerts,
  onResetData,
  onOpenRoadmap,
}) => {
  const [ownerName, setOwnerName] = useState('Gestión Patrimonial Privada');
  const [currency, setCurrency] = useState('EUR (€)');
  const [region, setRegion] = useState('Comunidad de Madrid (Régimen Común)');
  const [alertDays, setAlertDays] = useState(15);
  const [saveBanner, setSaveBanner] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 3000);
  };

  const handleExportJSON = () => {
    const backupData = {
      app: 'Mi Gestor Inmobiliario y Patrimonial',
      version: '1.0-Fase1',
      date: new Date().toISOString(),
      properties,
      dues,
      alerts,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_patrimonio_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Sección 11 · Parámetros del Sistema & Gobernanza
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Configuración</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Ajustes de la aplicación, umbrales de alerta y estado de las fases del proyecto.
          </p>
        </div>

        <button
          onClick={handleExportJSON}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Copia de Seguridad JSON</span>
        </button>
      </div>

      {saveBanner && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Preferencias guardadas correctamente en la sesión local.</span>
        </div>
      )}

      {/* Roadmap & Phases Control */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Hoja de Ruta del Proyecto & Autorización de Fases</h3>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Fase 1: Activa y en Evaluación
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Siguiendo tus directrices: <strong>tú eres quien toma las decisiones y autoriza cada nueva fase</strong>. La arquitectura del sistema está organizada de forma modular para crecer sin rehacer el núcleo.
        </p>

        <div className="space-y-3 pt-2">
          {/* Phase 1 */}
          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80 flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h4 className="font-bold text-slate-900">
                  Fase 1: Centro de Control, Navegación y Departamentos (Actual)
                </h4>
                <p className="text-slate-600 mt-0.5">
                  Centro de Control con KPIs, panel lateral de 11 secciones, inventario de inmuebles, balance patrimonial, vencimientos y alertas.
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded shrink-0">
              Desplegada
            </span>
          </div>

          {/* Phase 2 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h4 className="font-bold text-slate-900">
                  Fase 2: Gestión Integral de Terceros, Reformas y Planos CAD 2D/3D
                </h4>
                <p className="text-slate-500 mt-0.5">
                  Administración de inmuebles ajenos, liquidación a terceros, visor de planos de planta interactivos CAD 2D/3D y seguimiento fotográfico de obras.
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                onOpenRoadmap(
                  'Fase 2: CAD 2D/3D & Gestión de Terceros',
                  'Fase 2',
                  'Se activará cuando revises y autorices el Centro de Control actual.'
                )
              }
              className="px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded hover:bg-slate-50 shrink-0"
            >
              Pendiente Visto Bueno
            </button>
          </div>

          {/* Phase 3 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3 text-xs opacity-80">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h4 className="font-bold text-slate-900">
                  Fase 3: Documentación Inteligente OCR & Automatizaciones
                </h4>
                <p className="text-slate-500 mt-0.5">
                  Extracción de escrituras e IBI con IA, sincronización con Open Banking y avisos automatizados.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-400 shrink-0">Planificada</span>
          </div>

          {/* Phase 4 & 5 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3 text-xs opacity-70">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                4-5
              </span>
              <div>
                <h4 className="font-bold text-slate-900">
                  Fases 4 y 5: Análisis de Mercado, Inteligencia Artificial & Simulaciones
                </h4>
                <p className="text-slate-500 mt-0.5">
                  Algoritmos de valoración inmobiliaria predictiva, comparador de mercado y asistente fiscal personalizado.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-400 shrink-0">Futura</span>
          </div>
        </div>
      </div>

      {/* System Preferences Form */}
      <form onSubmit={handleSavePreferences} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Preferencias de Gestión Privada</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Nombre o Alias del Titular</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Divisa Principal</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
            >
              <option value="EUR (€)">EUR (€) - Euro</option>
              <option value="USD ($)">USD ($) - Dólar Estadounidense</option>
              <option value="GBP (£)">GBP (£) - Libra Esterlina</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Región / Comunidad Fiscal</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
            >
              <option value="Comunidad de Madrid (Régimen Común)">Comunidad de Madrid (Régimen Común)</option>
              <option value="Cataluña">Cataluña</option>
              <option value="Comunidad Valenciana">Comunidad Valenciana</option>
              <option value="Andalucía">Andalucía</option>
              <option value="País Vasco / Navarra (Régimen Foral)">País Vasco / Navarra (Régimen Foral)</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Anticipación de Alertas de Vencimiento (Días)</label>
            <input
              type="number"
              min="5"
              max="60"
              value={alertDays}
              onChange={(e) => setAlertDays(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center border-t border-slate-100">
          <button
            type="button"
            onClick={onResetData}
            className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Restablecer Datos de Demostración
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};
