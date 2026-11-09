import React, { useState } from 'react';
import { SectionId, Property, DueItem, AlertItem } from './types';
import {
  INITIAL_PROPERTIES,
  INITIAL_METRICS,
  INITIAL_DUES,
  INITIAL_ALERTS,
  INITIAL_THIRD_PARTIES,
  INITIAL_MAINTENANCE,
  INITIAL_DOCUMENTS,
  INITIAL_INVESTMENTS,
} from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { RoadmapModal } from './components/common/RoadmapModal';
import { NewRecordModal } from './components/common/NewRecordModal';

// Views
import { InicioView } from './components/views/InicioView';
import { MisInmueblesView } from './components/views/MisInmueblesView';
import { GestionTercerosView } from './components/views/GestionTercerosView';
import { ReformasView } from './components/views/ReformasView';
import { EconomiaPatrimonioView } from './components/views/EconomiaPatrimonioView';
import { FiscalidadJuridicoView } from './components/views/FiscalidadJuridicoView';
import { InversionesView } from './components/views/InversionesView';
import { DocumentacionView } from './components/views/DocumentacionView';
import { CalendarioAlertasView } from './components/views/CalendarioAlertasView';
import { InformesView } from './components/views/InformesView';
import { ConfiguracionView } from './components/views/ConfiguracionView';

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>('inicio');
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState(false);
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Noviembre 2026');

  // Core reactive data state
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [dues, setDues] = useState<DueItem[]>(INITIAL_DUES);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);

  // Modals state
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
  const [roadmapModal, setRoadmapModal] = useState<{
    isOpen: boolean;
    title: string;
    phase: string;
    desc: string;
  }>({
    isOpen: false,
    title: '',
    phase: '',
    desc: '',
  });

  // Calculate live financial metrics from properties state
  const totalValuation = properties.reduce((acc, p) => acc + p.valuation, 0);
  const totalRent = properties.reduce((acc, p) => acc + p.monthlyRent, 0);
  const totalExpenses = properties.reduce((acc, p) => acc + p.monthlyExpenses, 0);
  const rentedCount = properties.filter((p) => p.status === 'Alquilado').length;
  const totalMortgageDebt = properties.reduce((acc, p) => acc + p.mortgageDebt, 0);
  const liquidCapital = 75000;
  const investmentPortfolio = 165000;
  const estimatedNetWorth = totalValuation + investmentPortfolio + liquidCapital - totalMortgageDebt;

  const currentMetrics = {
    ...INITIAL_METRICS,
    totalProperties: properties.length,
    rentedCount,
    monthlyIncome: totalRent,
    monthlyExpenses: totalExpenses,
    netMonthlyCashflow: totalRent - totalExpenses,
    totalValuation,
    totalMortgageDebt,
    estimatedNetWorth,
    averageGrossYield:
      totalValuation > 0
        ? Number(((totalRent * 12 / totalValuation) * 100).toFixed(1))
        : 0,
    averageNetYield:
      totalValuation > 0
        ? Number((((totalRent - totalExpenses) * 12 / totalValuation) * 100).toFixed(1))
        : 0,
  };

  // Handlers
  const handleOpenRoadmap = (title: string, phase: string, desc: string) => {
    setRoadmapModal({
      isOpen: true,
      title,
      phase,
      desc,
    });
  };

  const handleCloseRoadmap = () => {
    setRoadmapModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleAddProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
  };

  const handleAddDue = (newDue: DueItem) => {
    setDues((prev) => [newDue, ...prev]);
  };

  const handleAddAlert = (newAlert: AlertItem) => {
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const handleToggleDueStatus = (id: string) => {
    setDues((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: d.status === 'Completado' ? 'Pendiente' : 'Completado',
            }
          : d
      )
    );
  };

  const handleDismissAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: true } : a))
    );
  };

  const handleResetData = () => {
    setProperties(INITIAL_PROPERTIES);
    setDues(INITIAL_DUES);
    setAlerts(INITIAL_ALERTS);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* 1. Sidebar Navigation */}
      <Sidebar
        currentSection={currentSection}
        onSelectSection={(id) => setCurrentSection(id)}
        isOpenMobile={isOpenMobileSidebar}
        onCloseMobile={() => setIsOpenMobileSidebar(false)}
        isCollapsed={isCollapsedSidebar}
        onToggleCollapse={() => setIsCollapsedSidebar(!isCollapsedSidebar)}
        propertiesCount={properties.length}
        alertsCount={alerts.filter((a) => !a.resolved).length}
        onOpenRoadmap={handleOpenRoadmap}
      />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
          isCollapsedSidebar ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        {/* 2. Top Header Bar */}
        <TopHeader
          currentSection={currentSection}
          onOpenMobileSidebar={() => setIsOpenMobileSidebar(true)}
          onOpenNewRecordModal={() => setIsNewRecordModalOpen(true)}
          onNavigateSection={(sec) => setCurrentSection(sec)}
          alerts={alerts}
          onDismissAlert={handleDismissAlert}
          selectedMonth={selectedMonth}
          onChangeMonth={setSelectedMonth}
        />

        {/* 3. Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {currentSection === 'inicio' && (
            <InicioView
              metrics={currentMetrics}
              properties={properties}
              dues={dues}
              alerts={alerts}
              onNavigateSection={setCurrentSection}
              onToggleDueStatus={handleToggleDueStatus}
              onDismissAlert={handleDismissAlert}
              onOpenRoadmap={handleOpenRoadmap}
              onOpenNewRecord={() => setIsNewRecordModalOpen(true)}
            />
          )}

          {currentSection === 'inmuebles' && (
            <MisInmueblesView
              properties={properties}
              onOpenNewRecord={() => setIsNewRecordModalOpen(true)}
              onOpenRoadmap={handleOpenRoadmap}
            />
          )}

          {currentSection === 'terceros' && (
            <GestionTercerosView
              thirdParties={INITIAL_THIRD_PARTIES}
              onOpenRoadmap={handleOpenRoadmap}
            />
          )}

          {currentSection === 'reformas' && (
            <ReformasView
              maintenanceList={INITIAL_MAINTENANCE}
              onOpenRoadmap={handleOpenRoadmap}
            />
          )}

          {currentSection === 'patrimonio' && (
            <EconomiaPatrimonioView
              metrics={currentMetrics}
              onOpenRoadmap={handleOpenRoadmap}
            />
          )}

          {currentSection === 'fiscalidad' && (
            <FiscalidadJuridicoView onOpenRoadmap={handleOpenRoadmap} />
          )}

          {currentSection === 'inversiones' && (
            <InversionesView
              investments={INITIAL_INVESTMENTS}
              onOpenRoadmap={handleOpenRoadmap}
            />
          )}

          {currentSection === 'documentacion' && (
            <DocumentacionView
              documents={INITIAL_DOCUMENTS}
              onOpenRoadmap={handleOpenRoadmap}
            />
          )}

          {currentSection === 'calendario' && (
            <CalendarioAlertasView
              dues={dues}
              alerts={alerts}
              onToggleDueStatus={handleToggleDueStatus}
              onDismissAlert={handleDismissAlert}
              onOpenNewRecord={() => setIsNewRecordModalOpen(true)}
              onOpenRoadmap={handleOpenRoadmap}
            />
          )}

          {currentSection === 'informes' && (
            <InformesView
              properties={properties}
              metrics={currentMetrics}
              onOpenRoadmap={handleOpenRoadmap}
            />
          )}

          {currentSection === 'configuracion' && (
            <ConfiguracionView
              properties={properties}
              dues={dues}
              alerts={alerts}
              onResetData={handleResetData}
              onOpenRoadmap={handleOpenRoadmap}
            />
          )}
        </main>
      </div>

      {/* 4. Global Modals */}
      <RoadmapModal
        isOpen={roadmapModal.isOpen}
        onClose={handleCloseRoadmap}
        featureTitle={roadmapModal.title}
        targetPhase={roadmapModal.phase}
        description={roadmapModal.desc}
      />

      <NewRecordModal
        isOpen={isNewRecordModalOpen}
        onClose={() => setIsNewRecordModalOpen(false)}
        onAddProperty={handleAddProperty}
        onAddDue={handleAddDue}
        onAddAlert={handleAddAlert}
        existingProperties={properties}
      />
    </div>
  );
}
