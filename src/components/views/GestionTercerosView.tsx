import React, { useState } from 'react';
import {
  Users,
  Search,
  Phone,
  Mail,
  Building,
  Plus,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ThirdParty } from '../../types';

interface GestionTercerosViewProps {
  thirdParties: ThirdParty[];
  onOpenRoadmap: (title: string, phase: string, desc: string) => void;
}

export const GestionTercerosView: React.FC<GestionTercerosViewProps> = ({
  thirdParties,
  onOpenRoadmap,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [partiesList, setPartiesList] = useState<ThirdParty[]>(thirdParties);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for adding a third party
  const [name, setName] = useState('');
  const [role, setRole] = useState<ThirdParty['role']>('Inquilino');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [relatedProperty, setRelatedProperty] = useState('Ático Salamanca');

  const filtered = partiesList.filter((tp) => {
    const matchesSearch =
      tp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tp.relatedProperty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tp.company && tp.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole =
      roleFilter === 'all' ||
      (roleFilter === 'inquilino' && tp.role === 'Inquilino') ||
      (roleFilter === 'administrador' && tp.role === 'Administrador') ||
      (roleFilter === 'profesional' && (tp.role === 'Asesor Fiscal' || tp.role === 'Contratista' || tp.role === 'Arquitecto' || tp.role === 'Aseguradora'));

    return matchesSearch && matchesRole;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const newParty: ThirdParty = {
      id: `tp-${Date.now()}`,
      name,
      role,
      company: company || undefined,
      phone,
      email: email || 'contacto@gestor.privado',
      relatedProperty,
      contractStatus: 'Activo',
      notes: 'Contacto registrado en Fase 1.',
    };

    setPartiesList([newParty, ...partiesList]);
    setShowAddModal(false);
    setName('');
    setPhone('');
    setEmail('');
    setCompany('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Sección 03 · Directorio de Contactos & Colaboradores
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Gestión de Terceros</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Inquilinos, administradores de fincas, despachos fiscales, seguros y empresas de mantenimiento.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() =>
              onOpenRoadmap(
                'Administración de Propiedades de Terceros',
                'Fase 2',
                'En futuras fases podrás gestionar y liquidar comisiones de propiedades pertenecientes a otros propietarios o socios familiares.'
              )
            }
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Gestión para Terceros</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo Contacto</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-center justify-between shadow-2xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, empresa o inmueble..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              roleFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todos ({partiesList.length})
          </button>
          <button
            onClick={() => setRoleFilter('inquilino')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              roleFilter === 'inquilino' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Inquilinos
          </button>
          <button
            onClick={() => setRoleFilter('administrador')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              roleFilter === 'administrador' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Administradores
          </button>
          <button
            onClick={() => setRoleFilter('profesional')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              roleFilter === 'profesional' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Asesores y Proveedores
          </button>
        </div>
      </div>

      {/* Grid of contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tp) => (
          <div
            key={tp.id}
            className="bg-white p-5 rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${
                    tp.role === 'Inquilino'
                      ? 'bg-blue-50 text-blue-700'
                      : tp.role === 'Administrador'
                      ? 'bg-purple-50 text-purple-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tp.role}
                </span>
                <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {tp.contractStatus}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900">{tp.name}</h3>
              {tp.company && (
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{tp.company}</span>
                </p>
              )}

              <div className="mt-3 p-2.5 bg-slate-50 rounded-lg space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`tel:${tp.phone}`} className="hover:text-slate-900 font-mono">
                    {tp.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{tp.email}</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Inmueble:</span> {tp.relatedProperty}
              </div>

              {tp.notes && (
                <p className="mt-2 text-[11px] text-slate-500 italic bg-white border border-slate-100 p-2 rounded">
                  "{tp.notes}"
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Verificado</span>
              <button
                onClick={() =>
                  onOpenRoadmap(
                    'Mensajería Directa & Comunicaciones Certificadas',
                    'Fase 2',
                    'En la siguiente fase podrás enviar burofaxes online, notificaciones fehacientes de renta y avisos automatizados a través del sistema.'
                  )
                }
                className="text-slate-800 font-semibold hover:underline"
              >
                Enviar comunicado
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Contact */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Añadir Tercero / Colaborador</h3>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez, Administraciones Madrid..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Rol</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as ThirdParty['role'])}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="Inquilino">Inquilino</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Asesor Fiscal">Asesor Fiscal</option>
                    <option value="Contratista">Contratista</option>
                    <option value="Arquitecto">Arquitecto</option>
                    <option value="Aseguradora">Aseguradora</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Empresa (opcional)</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Teléfono *</label>
                  <input
                    type="text"
                    required
                    placeholder="+34 600..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Inmueble Vinculado</label>
                <input
                  type="text"
                  value={relatedProperty}
                  onChange={(e) => setRelatedProperty(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Guardar Contacto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
