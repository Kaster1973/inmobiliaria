import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  Hammer,
  Wallet,
  Scale,
  TrendingUp,
  FolderArchive,
  CalendarClock,
  FileSpreadsheet,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles,
} from 'lucide-react';
import { SectionId } from '../../types';

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
}

interface SidebarProps {
  currentSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  propertiesCount: number;
  alertsCount: number;
  onOpenRoadmap: (title: string, phase: string, desc: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  isOpenMobile,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
  propertiesCount,
  alertsCount,
  onOpenRoadmap,
}) => {
  const navItems: NavItem[] = [
    { id: 'inicio', label: 'Inicio', icon: LayoutDashboard },
    { id: 'inmuebles', label: 'Mis Inmuebles', icon: Building2, badge: propertiesCount },
    { id: 'terceros', label: 'Gestión de Terceros', icon: Users },
    { id: 'reformas', label: 'Reformas y Mantenimiento', icon: Hammer },
    { id: 'patrimonio', label: 'Economía y Patrimonio', icon: Wallet },
    { id: 'fiscalidad', label: 'Fiscalidad y Jurídico', icon: Scale },
    { id: 'inversiones', label: 'Inversiones', icon: TrendingUp },
    { id: 'documentacion', label: 'Documentación', icon: FolderArchive },
    { id: 'calendario', label: 'Calendario y Alertas', icon: CalendarClock, badge: alertsCount > 0 ? alertsCount : undefined },
    { id: 'informes', label: 'Informes', icon: FileSpreadsheet },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];

  const handleNavClick = (id: SectionId) => {
    onSelectSection(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-slate-900 text-slate-200 border-r border-slate-800 transition-all duration-200 ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700/60 flex items-center justify-center shrink-0 shadow-xs">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <span className="block text-sm font-bold tracking-tight text-white truncate">
                  GESTOR INMOBILIARIO
                </span>
                <span className="block text-[11px] text-slate-400 font-medium tracking-wide">
                  & Patrimonial
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2">
            {!isCollapsed && (
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Departamentos
              </span>
            )}
          </div>

          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-left relative group cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-400 rounded-r-full" />
                )}

                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />

                {!isCollapsed && (
                  <span className="truncate flex-1">
                    <span className="text-[11px] text-slate-400 mr-2 font-mono">{String(index + 1).padStart(2, '0')}.</span>
                    {item.label}
                  </span>
                )}

                {!isCollapsed && item.badge !== undefined && (
                  <span
                    className={`ml-auto px-2 py-0.5 text-[10px] font-semibold rounded-md font-mono ${
                      item.id === 'calendario'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Phase 1 Roadmap Footnote */}
        <div className="p-3 border-t border-slate-800 shrink-0">
          {!isCollapsed ? (
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Fase 1 Activa
                </span>
                <span className="text-[10px] text-slate-400 font-mono">v1.0</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug mb-2">
                Centro de Control y navegación esencial para validación.
              </p>
              <button
                onClick={() =>
                  onOpenRoadmap(
                    'Hoja de Ruta del Proyecto',
                    'Fases 2 a 5',
                    'El plan contempla incorporar progresivamente: Gestión inmobiliaria avanzada, administración de terceros, planos CAD 2D/3D, fiscalidad automatizada, informes ejecutivos e IA. Cada módulo se iniciará con tu autorización expresa.'
                  )
                }
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                Ver Hoja de Ruta
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                onOpenRoadmap(
                  'Hoja de Ruta',
                  'Fases Futuras',
                  'Fase 1 activa. Las siguientes ampliaciones requerirán tu visto bueno.'
                )
              }
              className="w-full p-2 flex justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Fase 1 Activa"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
