import React, { useState } from 'react';
import { PlusCircle, Building2, Receipt, AlertTriangle, X } from 'lucide-react';
import { Property, DueItem, AlertItem } from '../../types';

interface NewRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (prop: Property) => void;
  onAddDue: (due: DueItem) => void;
  onAddAlert: (alert: AlertItem) => void;
  existingProperties: Property[];
}

export const NewRecordModal: React.FC<NewRecordModalProps> = ({
  isOpen,
  onClose,
  onAddProperty,
  onAddDue,
  onAddAlert,
  existingProperties,
}) => {
  const [activeTab, setActiveTab] = useState<'property' | 'due' | 'alert'>('property');

  // Form states
  const [propAlias, setPropAlias] = useState('');
  const [propType, setPropType] = useState<Property['type']>('Piso residencial');
  const [propAddress, setPropAddress] = useState('');
  const [propCity, setPropCity] = useState('Madrid');
  const [propValuation, setPropValuation] = useState(220000);
  const [propRent, setPropRent] = useState(1150);
  const [propExpenses, setPropExpenses] = useState(180);
  const [propStatus, setPropStatus] = useState<Property['status']>('Alquilado');
  const [propTenant, setPropTenant] = useState('');

  // Due form state
  const [dueTitle, setDueTitle] = useState('');
  const [dueAmount, setDueAmount] = useState(150);
  const [dueCategory, setDueCategory] = useState<DueItem['category']>('Comunidad');
  const [dueProperty, setDueProperty] = useState(existingProperties[0]?.alias || 'Ático Salamanca');
  const [dueDate, setDueDate] = useState('2026-11-28');
  const [dueType, setDueType] = useState<DueItem['type']>('expense');

  // Alert form state
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDesc, setAlertDesc] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<AlertItem['severity']>('media');
  const [alertProp, setAlertProp] = useState(existingProperties[0]?.alias || 'General');

  if (!isOpen) return null;

  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propAlias || !propAddress) return;

    const grossYield = propValuation > 0 ? Number(((propRent * 12 / propValuation) * 100).toFixed(1)) : 0;
    const netYield = propValuation > 0 ? Number((((propRent - propExpenses) * 12 / propValuation) * 100).toFixed(1)) : 0;

    const newProp: Property = {
      id: `prop-${Date.now()}`,
      alias: propAlias,
      type: propType,
      address: propAddress,
      city: propCity,
      postalCode: '28001',
      cadastralRef: 'REF-' + Math.floor(100000 + Math.random() * 900000),
      squareMeters: 85,
      rooms: 2,
      bathrooms: 1,
      valuation: Number(propValuation),
      mortgageDebt: 0,
      monthlyRent: Number(propRent),
      monthlyExpenses: Number(propExpenses),
      status: propStatus,
      tenant: propTenant || undefined,
      grossYield,
      netYield,
      notes: 'Registrado desde Centro de Control.',
    };

    onAddProperty(newProp);
    onClose();
  };

  const handleDueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dueTitle) return;

    const newDue: DueItem = {
      id: `due-${Date.now()}`,
      title: dueTitle,
      category: dueCategory,
      propertyAlias: dueProperty,
      propertyId: 'custom',
      date: dueDate,
      amount: Number(dueAmount),
      type: dueType,
      status: 'Pendiente',
    };

    onAddDue(newDue);
    onClose();
  };

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle) return;

    const newAlert: AlertItem = {
      id: `alert-${Date.now()}`,
      title: alertTitle,
      description: alertDesc || 'Recordatorio programado por el usuario.',
      propertyAlias: alertProp,
      severity: alertSeverity,
      date: new Date().toISOString().split('T')[0],
      actionLabel: 'Ver detalle',
      targetSection: 'inicio',
      resolved: false,
    };

    onAddAlert(newAlert);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Añadir Nuevo Registro</h3>
              <p className="text-xs text-slate-500">Selecciona el tipo de apunte que deseas incorporar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('property')}
            className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'property'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Nuevo Inmueble
          </button>
          <button
            onClick={() => setActiveTab('due')}
            className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'due'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            Ingreso / Gasto
          </button>
          <button
            onClick={() => setActiveTab('alert')}
            className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'alert'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Alerta o Tarea
          </button>
        </div>

        {/* Content forms */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {activeTab === 'property' && (
            <form onSubmit={handlePropertySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Nombre o Alias del Inmueble *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Piso Gran Vía, Local Bilbao..."
                  value={propAlias}
                  onChange={(e) => setPropAlias(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Tipo de Activo</label>
                  <select
                    value={propType}
                    onChange={(e) => setPropType(e.target.value as Property['type'])}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="Piso residencial">Piso residencial</option>
                    <option value="Ático">Ático</option>
                    <option value="Local comercial">Local comercial</option>
                    <option value="Plaza de garaje">Plaza de garaje</option>
                    <option value="Chalet">Chalet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Ciudad</label>
                  <input
                    type="text"
                    required
                    value={propCity}
                    onChange={(e) => setPropCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Dirección Completa *</label>
                <input
                  type="text"
                  required
                  placeholder="Calle, número, piso y puerta"
                  value={propAddress}
                  onChange={(e) => setPropAddress(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Valoración (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={propValuation}
                    onChange={(e) => setPropValuation(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Renta (€/mes)</label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={propRent}
                    onChange={(e) => setPropRent(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Gastos (€/mes)</label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={propExpenses}
                    onChange={(e) => setPropExpenses(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Estado</label>
                  <select
                    value={propStatus}
                    onChange={(e) => setPropStatus(e.target.value as Property['status'])}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="Alquilado">Alquilado</option>
                    <option value="Disponible">Disponible</option>
                    <option value="En reforma">En reforma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Nombre Inquilino (si aplica)</label>
                  <input
                    type="text"
                    placeholder="Opcional"
                    value={propTenant}
                    onChange={(e) => setPropTenant(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Guardar Inmueble
                </button>
              </div>
            </form>
          )}

          {activeTab === 'due' && (
            <form onSubmit={handleDueSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Concepto o Título *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Seguro multirriesgo, Cuota derrama..."
                  value={dueTitle}
                  onChange={(e) => setDueTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Tipo de Movimiento</label>
                  <select
                    value={dueType}
                    onChange={(e) => setDueType(e.target.value as DueItem['type'])}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="expense">Gasto / Pago</option>
                    <option value="income">Ingreso / Cobro</option>
                    <option value="tax">Impuesto / Tributo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Importe (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    required
                    value={dueAmount}
                    onChange={(e) => setDueAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Inmueble Vinculado</label>
                  <select
                    value={dueProperty}
                    onChange={(e) => setDueProperty(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    {existingProperties.map((p) => (
                      <option key={p.id} value={p.alias}>
                        {p.alias}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Categoría</label>
                  <select
                    value={dueCategory}
                    onChange={(e) => setDueCategory(e.target.value as DueItem['category'])}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="Alquiler">Alquiler</option>
                    <option value="Seguro">Seguro</option>
                    <option value="IBI / Impuesto">IBI / Impuesto</option>
                    <option value="Comunidad">Comunidad</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                    <option value="Hipoteca">Hipoteca</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Fecha de Vencimiento</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Guardar Vencimiento
                </button>
              </div>
            </form>
          )}

          {activeTab === 'alert' && (
            <form onSubmit={handleAlertSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Título de la Alerta / Recordatorio *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Revisión anual caldera, Reclamación comunidad..."
                  value={alertTitle}
                  onChange={(e) => setAlertTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Descripción o Notas</label>
                <textarea
                  rows={2}
                  placeholder="Detalles adicionales sobre la gestión requerida..."
                  value={alertDesc}
                  onChange={(e) => setAlertDesc(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Inmueble / Ámbito</label>
                  <select
                    value={alertProp}
                    onChange={(e) => setAlertProp(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="General">Patrimonio General</option>
                    {existingProperties.map((p) => (
                      <option key={p.id} value={p.alias}>
                        {p.alias}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Prioridad</label>
                  <select
                    value={alertSeverity}
                    onChange={(e) => setAlertSeverity(e.target.value as AlertItem['severity'])}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="baja">Baja (Informativa)</option>
                    <option value="media">Media (Gestión próxima)</option>
                    <option value="alta">Alta (Acción prioritaria)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Guardar Alerta
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
