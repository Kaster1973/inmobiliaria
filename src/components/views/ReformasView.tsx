import React, { useState } from 'react';
import {
  Hammer,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  Compass,
  Layers,
  Euro,
} from 'lucide-react';
import { MaintenanceProject } from '../../types';

interface ReformasViewProps {
  maintenanceList: MaintenanceProject[];
  onOpenRoadmap: (title: string, phase: string, desc: string) => void;
}

export const ReformasView: React.FC<ReformasViewProps> = ({
  maintenanceList,
  onOpenRoadmap,
}) => {
  const [projects, setProjects] = useState<MaintenanceProject[]>(maintenanceList);
  const [showModal, setShowModal] = useState(false);

  // New project state
  const [title, setTitle] = useState('');
  const [propertyAlias, setPropertyAlias] = useState('Chalet Collado Villalba');
  const [category, setCategory] = useState<MaintenanceProject['category']>('Eficiencia Energética');
  const [budget, setBudget] = useState(12000);
  const [contractor, setContractor] = useState('Climatizaciones Pro S.L.');

  const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = projects.reduce((acc, p) => acc + p.spent, 0);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newProject: MaintenanceProject = {
      id: `maint-${Date.now()}`,
      title,
      propertyAlias,
      category,
      budget: Number(budget),
      spent: 0,
      contractor,
      startDate: new Date().toISOString().split('T')[0],
      estimatedEnd: '2027-01-31',
      status: 'Presupuestado',
      progressPct: 0,
      tasksCompleted: 0,
      totalTasks: 4,
    };

    setProjects([newProject, ...projects]);
    setShowModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Sección 04 · Obras, Averías y Puesta a Punto
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Reformas y Mantenimiento</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Control de presupuestos, certificación de obra y mantenimiento preventivo por activo.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() =>
              onOpenRoadmap(
                'Visor CAD 2D/3D & Modelado BIM de Reformas',
                'Fase 2',
                'En la siguiente fase podrás importar planos en formato DWG/DXF/IFC, ver renders 3D de las estancias y comparar el estado previo con la reforma propuesta.'
              )
            }
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Planos CAD 2D/3D</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo Proyecto</span>
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">Presupuesto Asignado Total</span>
          <div className="text-xl font-bold text-slate-900 tabular-nums">
            {totalBudget.toLocaleString('es-ES')} €
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">En {projects.length} actuaciones registradas</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">Gasto Ejecutado / Certificado</span>
          <div className="text-xl font-bold text-slate-900 tabular-nums">
            {totalSpent.toLocaleString('es-ES')} €
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
            {((totalSpent / totalBudget) * 100).toFixed(0)}% del presupuesto consumido
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">Saldo Disponible</span>
          <div className="text-xl font-bold text-slate-900 tabular-nums">
            {(totalBudget - totalSpent).toLocaleString('es-ES')} €
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Sin desvíos presupuestarios detectados</span>
        </div>
      </div>

      {/* Notice Card about Phase 2 CAD */}
      <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Módulo CAD 2D/3D en preparación (Fase 2)</h4>
            <p className="text-xs text-slate-300">
              Estructura técnica lista para albergar planos de planta, cotas y mediciones por partida.
            </p>
          </div>
        </div>
        <button
          onClick={() =>
            onOpenRoadmap(
              'Integración CAD y Gestión Técnica',
              'Fase 2',
              'Este módulo integrará planos 2D vectoriales y modelos 3D interactivos, permitiendo asignar cada partida presupuestaria directamente al espacio físico.'
            )
          }
          className="px-3.5 py-1.5 text-xs font-semibold bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
        >
          Detalles de la Fase 2
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Actuaciones y Obras Registradas</h3>
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${
                      project.status === 'En curso'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : project.status === 'Finalizado'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {project.category}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900">{project.title}</h4>
                <p className="text-xs text-slate-500">
                  Inmueble: <strong className="text-slate-800">{project.propertyAlias}</strong> · Contratista: {project.contractor}
                </p>

                {/* Progress bar */}
                <div className="pt-2 max-w-md">
                  <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
                    <span>Avance de obra ({project.tasksCompleted}/{project.totalTasks} hitos)</span>
                    <span className="font-semibold">{project.progressPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        project.progressPct === 100 ? 'bg-emerald-500' : 'bg-slate-800'
                      }`}
                      style={{ width: `${project.progressPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Financial Box */}
              <div className="flex items-center md:flex-col md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6 shrink-0 gap-1">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Presupuesto</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    {project.budget.toLocaleString('es-ES')} €
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Ejecutado</span>
                  <span className="text-xs font-bold text-slate-700 font-mono">
                    {project.spent.toLocaleString('es-ES')} €
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Registrar Proyecto de Reforma</h3>
            <form onSubmit={handleAddProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Título de la Obra *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Cambio de ventanas Climalit, Reforma baño..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Inmueble</label>
                  <input
                    type="text"
                    value={propertyAlias}
                    onChange={(e) => setPropertyAlias(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as MaintenanceProject['category'])}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="Eficiencia Energética">Eficiencia Energética</option>
                    <option value="Reforma Integral">Reforma Integral</option>
                    <option value="Climatización">Climatización</option>
                    <option value="Fontanería">Fontanería</option>
                    <option value="Carpintería">Carpintería</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Presupuesto (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Contratista</label>
                  <input
                    type="text"
                    value={contractor}
                    onChange={(e) => setContractor(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Guardar Obra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
