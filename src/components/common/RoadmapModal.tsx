import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, X } from 'lucide-react';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureTitle?: string;
  targetPhase?: string;
  description?: string;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({
  isOpen,
  onClose,
  featureTitle = 'Funcionalidad Avanzada',
  targetPhase = 'Fase 2',
  description = 'Esta herramienta está programada en la hoja de ruta y se incorporará progresivamente una vez que revises y autorices el Centro de Control actual.',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{targetPhase} Planificada</span>
              <h3 className="text-base font-semibold text-slate-900">{featureTitle}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            {description}
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Estado de desarrollo actual</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Fase 1 (Activa):</strong> Centro de Control, navegación completa, indicadores financieros y estructura de departamentos operativa.</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <span><strong>Arquitectura preparada:</strong> La base de datos y esquemas de información están listos para recibir esta función sin rehacer el sistema.</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 italic">
            Como indicaste en las instrucciones: tú tomas las decisiones y autorizas cada nueva fase paso a paso.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Entendido, volver al Centro de Control
          </button>
        </div>
      </div>
    </div>
  );
};
