import React, { useState } from 'react';
import {
  Building2,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  MapPin,
  Maximize2,
  User,
  Calendar,
  X,
  Sparkles,
} from 'lucide-react';
import { Property } from '../../types';

interface MisInmueblesViewProps {
  properties: Property[];
  onOpenNewRecord: () => void;
  onOpenRoadmap: (title: string, phase: string, desc: string) => void;
}

export const MisInmueblesView: React.FC<MisInmueblesViewProps> = ({
  properties,
  onOpenNewRecord,
  onOpenRoadmap,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Filter properties
  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'alquilado' && p.status === 'Alquilado') ||
      (filterStatus === 'disponible' && p.status === 'Disponible') ||
      (filterStatus === 'reforma' && p.status === 'En reforma');

    return matchesSearch && matchesStatus;
  });

  const totalValuation = properties.reduce((acc, p) => acc + p.valuation, 0);
  const totalRent = properties.reduce((acc, p) => acc + p.monthlyRent, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Sección 02 · Cartera Residencial y Comercial
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Mis Inmuebles</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {properties.length} propiedades en cartera · Valoración conjunta de {totalValuation.toLocaleString('es-ES')} € · {totalRent.toLocaleString('es-ES')} €/mes en rentas.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() =>
              onOpenRoadmap(
                'Planos CAD 2D/3D & Tours Virtuales',
                'Fase 2',
                'En la siguiente fase podrás adjuntar planos arquitectónicos, modelos CAD interactivos y mediciones técnicas por estancia.'
              )
            }
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Planos CAD 2D/3D</span>
          </button>
          <button
            onClick={onOpenNewRecord}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Añadir Inmueble</span>
          </button>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-center justify-between shadow-2xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por alias, dirección o ciudad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Status buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterStatus === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({properties.length})
            </button>
            <button
              onClick={() => setFilterStatus('alquilado')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterStatus === 'alquilado' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Alquilados
            </button>
            <button
              onClick={() => setFilterStatus('reforma')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterStatus === 'reforma' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              En reforma
            </button>
          </div>

          {/* View mode toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-600">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'cards' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
              }`}
            >
              Tarjetas
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
              }`}
            >
              Tabla
            </button>
          </div>
        </div>
      </div>

      {/* Content: Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((property) => {
            const netCashflow = property.monthlyRent - property.monthlyExpenses;

            return (
              <div
                key={property.id}
                onClick={() => setSelectedProperty(property)}
                className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="p-4">
                  {/* Top line: Type and status */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-slate-700">{property.type}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${
                        property.status === 'Alquilado'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : property.status === 'En reforma'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>

                  {/* Title and address */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {property.alias}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 truncate">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span>{property.address}, {property.city}</span>
                  </p>

                  {/* Surface and features */}
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
                    <span><strong>{property.squareMeters}</strong> m²</span>
                    {property.rooms && <span>· <strong>{property.rooms}</strong> dorm.</span>}
                    {property.bathrooms && <span>· <strong>{property.bathrooms}</strong> baños</span>}
                    <span className="ml-auto font-mono text-slate-700">Ref: {property.cadastralRef.slice(0, 7)}...</span>
                  </div>

                  {/* Financial metrics */}
                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Valoración</span>
                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        {property.valuation.toLocaleString('es-ES')} €
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Renta/Mes</span>
                      <span className="text-xs font-bold text-emerald-600 tabular-nums">
                        {property.monthlyRent > 0 ? `${property.monthlyRent} €` : '0 €'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Rent. Bruta</span>
                      <span className="text-xs font-bold text-slate-800 tabular-nums">
                        {property.grossYield}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card footer: Tenant or note */}
                <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate text-[11px]">
                      {property.tenant ? property.tenant : 'Sin inquilino asignado'}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-900 shrink-0">
                    Neto: +{netCashflow} €/m
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Content: Table View */
        <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Inmueble</th>
                  <th className="px-4 py-3">Ubicación</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3 text-right">Superficie</th>
                  <th className="px-4 py-3 text-right">Valoración</th>
                  <th className="px-4 py-3 text-right">Renta</th>
                  <th className="px-4 py-3 text-right">Gastos</th>
                  <th className="px-4 py-3 text-right">Rent. Bruta</th>
                  <th className="px-4 py-3">Inquilino</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedProperty(p)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-slate-900">{p.alias}</td>
                    <td className="px-4 py-3 text-slate-500">{p.city}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                          p.status === 'Alquilado'
                            ? 'bg-emerald-50 text-emerald-700'
                            : p.status === 'En reforma'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">{p.squareMeters} m²</td>
                    <td className="px-4 py-3 text-right font-mono font-medium">{p.valuation.toLocaleString('es-ES')} €</td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-600 font-semibold">{p.monthlyRent} €</td>
                    <td className="px-4 py-3 text-right font-mono text-slate-500">{p.monthlyExpenses} €</td>
                    <td className="px-4 py-3 text-right font-mono font-semibold">{p.grossYield}%</td>
                    <td className="px-4 py-3 truncate max-w-[140px] text-slate-600">{p.tenant || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Property Detail Drawer / Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Ficha Técnica del Inmueble
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedProperty.alias}</h3>
              </div>
              <button
                onClick={() => setSelectedProperty(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Dirección y Catastro</span>
                  <p className="font-semibold text-slate-900">{selectedProperty.address}</p>
                  <p className="text-slate-500">{selectedProperty.postalCode} - {selectedProperty.city}</p>
                  <p className="font-mono text-[11px] text-slate-600 pt-1">Ref: {selectedProperty.cadastralRef}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Estado y Contrato</span>
                  <p className="font-semibold text-slate-900">{selectedProperty.status}</p>
                  <p className="text-slate-500">Inquilino: {selectedProperty.tenant || 'Ninguno'}</p>
                  {selectedProperty.tenantContact && (
                    <p className="text-slate-600">{selectedProperty.tenantContact}</p>
                  )}
                  {selectedProperty.contractEnd && (
                    <p className="text-slate-500 text-[11px]">Vence: {selectedProperty.contractEnd}</p>
                  )}
                </div>
              </div>

              {/* Financial Balance */}
              <div className="p-4 border border-slate-200 rounded-xl space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Rendimiento Financiero Mensual
                </h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">Renta Bruta</span>
                    <span className="font-bold text-emerald-600 font-mono text-sm">{selectedProperty.monthlyRent} €</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">Gastos / Mes</span>
                    <span className="font-bold text-slate-800 font-mono text-sm">{selectedProperty.monthlyExpenses} €</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">Flujo Neto</span>
                    <span className="font-bold text-slate-900 font-mono text-sm">
                      +{selectedProperty.monthlyRent - selectedProperty.monthlyExpenses} €
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">Rentabilidad Neta</span>
                    <span className="font-bold text-slate-900 font-mono text-sm">{selectedProperty.netYield}%</span>
                  </div>
                </div>
              </div>

              {selectedProperty.notes && (
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Notas y Observaciones</span>
                  <p className="text-slate-600 leading-relaxed">{selectedProperty.notes}</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() =>
                  onOpenRoadmap(
                    'Expediente Digital e Histórico de Incidencias',
                    'Fase 2',
                    'En la Fase 2 se habilitará el histórico completo de incidencias, pagos y peritaje fotográfico para este inmueble.'
                  )
                }
                className="text-xs text-slate-600 hover:text-slate-900 font-medium"
              >
                Ver histórico de obras
              </button>
              <button
                onClick={() => setSelectedProperty(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
