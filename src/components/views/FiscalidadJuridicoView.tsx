import React from 'react';
import {
  Scale,
  FileCheck,
  Calendar,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Percent,
} from 'lucide-react';

interface FiscalidadJuridicoViewProps {
  onOpenRoadmap: (title: string, phase: string, desc: string) => void;
}

export const FiscalidadJuridicoView: React.FC<FiscalidadJuridicoViewProps> = ({
  onOpenRoadmap,
}) => {
  const taxModels = [
    {
      model: 'Modelo 303 (IVA Trimestral)',
      scope: 'Local Comercial Eixample (Barcelona)',
      deadline: '20 Enero / 20 Abril / 20 Julio / 20 Octubre',
      status: 'Al corriente (3T presentado)',
      desc: 'Liquidación trimestral del 21% de IVA repercutido con deducción de gastos afectos al local.',
    },
    {
      model: 'Modelo 115 (Retenciones Arrendamiento)',
      scope: 'Arrendatario comercial declara retención 19%',
      deadline: 'Trimestral',
      status: 'Control de certificados fiscales',
      desc: 'Supervisión de que el arrendatario deposita correctamente las retenciones del 19% en la AEAT.',
    },
    {
      model: 'IRPF (Rendimientos del Capital Inmobiliario)',
      scope: 'Declaración de la Renta anual',
      deadline: 'Campaña Mayo - Junio 2027',
      status: 'Deducciones calculadas en tiempo real',
      desc: 'Deducción legal del 3% por amortización de la construcción, IBI, seguros, comunidad y gastos financieros.',
    },
    {
      model: 'Impuesto sobre Bienes Inmuebles (IBI)',
      scope: 'Todos los inmuebles (Ayuntamientos)',
      deadline: 'Periodo voluntario Otoño',
      status: 'Cobros domiciliados con bonificación',
      desc: 'Gestión de valor catastral y revisión periódica de coeficientes municipales.',
    },
  ];

  const legalSafeguards = [
    {
      title: 'Actualizaciones de Renta según IPC / IGC',
      rule: 'Ley de Arrendamientos Urbanos (LAU)',
      detail: 'Cláusula contractual aplicable tras cada 12 meses de vigencia con preaviso mínimo de 30 días.',
      activeCount: '1 contrato pendiente este mes (Piso Chamberí)',
    },
    {
      title: 'Depósito de Fianzas Obligatorias',
      rule: 'Organismos Autonómicos (IVIMA / Incasòl)',
      detail: '1 mensualidad en viviendas de uso habitual y 2 mensualidades en contratos de uso distinto al de vivienda.',
      activeCount: '100% de fianzas depositadas y resguardadas',
    },
    {
      title: 'Certificados de Eficiencia Energética (CEE)',
      rule: 'Real Decreto 390/2021',
      detail: 'Obligatoriedad de disponer de etiqueta energética válida en vigor (vigencia 10 años).',
      activeCount: 'Todos los activos residenciales con CEE vigente',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Sección 06 · Cumplimiento Normativo & Hacienda
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Fiscalidad y Jurídico</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Control de modelos tributarios, optimización de gastos deducibles y marco legal de arrendamientos.
          </p>
        </div>

        <button
          onClick={() =>
            onOpenRoadmap(
              'Simulador Fiscal de IRPF y Presentación Telemática',
              'Fase 2',
              'En la siguiente fase podrás calcular automáticamente la cuota estimada de IRPF y generar los borradores tributarios oficiales listos para importar en la AEAT.'
            )
          }
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Simulador Fiscal AEAT (Fase 2)</span>
        </button>
      </div>

      {/* Deductible expenses highlight banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2 mb-2">
          <Percent className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Optimización de Deducciones Fiscales en Arrendamientos (IRPF)
          </h3>
        </div>
        <p className="text-xs text-slate-600 mb-4">
          Resumen de partidas imputables como gasto deducible para minorar el rendimiento neto del capital inmobiliario:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="font-bold text-slate-900 block mb-0.5">Amortización Inmueble</span>
            <p className="text-slate-600">3% anual sobre el mayor valor entre coste de adquisición o valor catastral de la construcción.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="font-bold text-slate-900 block mb-0.5">Gastos de Financiación</span>
            <p className="text-slate-600">Intereses de préstamos hipotecarios y gastos de formalización asociados al activo.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="font-bold text-slate-900 block mb-0.5">Tributos y Tasas Locales</span>
            <p className="text-slate-600">Recibos del IBI, tasas de basuras y tributos no repercutibles al inquilino.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="font-bold text-slate-900 block mb-0.5">Conservación y Comunidad</span>
            <p className="text-slate-600">Reparaciones, cuotas ordinarias comunitarias y primas de seguros multirriesgo.</p>
          </div>
        </div>
      </div>

      {/* Tax models calendar */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Calendario y Modelos Tributarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {taxModels.map((item) => (
            <div
              key={item.model}
              className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-900">{item.model}</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.status}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block mb-2 font-medium">{item.scope}</span>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {item.deadline}
                </span>
                <button
                  onClick={() =>
                    onOpenRoadmap(
                      'Histórico de Declaraciones Tributarias',
                      'Fase 2',
                      'En la siguiente fase podrás adjuntar los PDFs justificantes sellados por la Agencia Tributaria.'
                    )
                  }
                  className="font-semibold text-slate-800 hover:underline"
                >
                  Ver justificante
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal & LAU Compliance Safeguards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Garantías Legales y Normativa LAU</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {legalSafeguards.map((safeguard) => (
            <div
              key={safeguard.title}
              className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-2"
            >
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                {safeguard.rule}
              </span>
              <h4 className="text-xs font-bold text-slate-900">{safeguard.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{safeguard.detail}</p>
              <div className="pt-2 text-[11px] text-emerald-700 font-medium">
                {safeguard.activeCount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
