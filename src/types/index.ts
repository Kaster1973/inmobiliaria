export type SectionId =
  | 'inicio'
  | 'inmuebles'
  | 'terceros'
  | 'reformas'
  | 'patrimonio'
  | 'fiscalidad'
  | 'inversiones'
  | 'documentacion'
  | 'calendario'
  | 'informes'
  | 'configuracion';

export interface Property {
  id: string;
  alias: string;
  type: 'Piso residencial' | 'Ático' | 'Local comercial' | 'Plaza de garaje' | 'Chalet';
  address: string;
  city: string;
  postalCode: string;
  cadastralRef: string;
  squareMeters: number;
  rooms?: number;
  bathrooms?: number;
  valuation: number;
  mortgageDebt: number;
  monthlyRent: number;
  monthlyExpenses: number;
  status: 'Alquilado' | 'Disponible' | 'En reforma';
  tenant?: string;
  tenantContact?: string;
  contractStart?: string;
  contractEnd?: string;
  grossYield: number;
  netYield: number;
  notes?: string;
}

export interface DueItem {
  id: string;
  title: string;
  category: 'Alquiler' | 'Seguro' | 'IBI / Impuesto' | 'Comunidad' | 'Mantenimiento' | 'Hipoteca';
  propertyAlias: string;
  propertyId: string;
  date: string;
  amount: number;
  type: 'income' | 'expense' | 'tax';
  status: 'Pendiente' | 'Completado';
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  propertyAlias: string;
  propertyId?: string;
  severity: 'alta' | 'media' | 'baja';
  date: string;
  actionLabel: string;
  targetSection: SectionId;
  resolved: boolean;
}

export interface ThirdParty {
  id: string;
  name: string;
  role: 'Inquilino' | 'Administrador' | 'Asesor Fiscal' | 'Contratista' | 'Arquitecto' | 'Aseguradora';
  company?: string;
  phone: string;
  email: string;
  relatedProperty: string;
  contractStatus: 'Activo' | 'En revisión' | 'Vencido';
  notes: string;
}

export interface MaintenanceProject {
  id: string;
  title: string;
  propertyAlias: string;
  category: 'Reforma Integral' | 'Climatización' | 'Fontanería' | 'Carpintería' | 'Eficiencia Energética' | 'Mantenimiento' | 'Mantenimiento General';
  budget: number;
  spent: number;
  contractor: string;
  startDate: string;
  estimatedEnd: string;
  status: 'Presupuestado' | 'En curso' | 'Finalizado';
  progressPct: number;
  tasksCompleted: number;
  totalTasks: number;
}

export interface FinancialMetric {
  totalProperties: number;
  rentedCount: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netMonthlyCashflow: number;
  averageGrossYield: number;
  averageNetYield: number;
  totalValuation: number;
  totalMortgageDebt: number;
  liquidCapital: number;
  investmentPortfolio: number;
  estimatedNetWorth: number;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Escritura' | 'Contrato' | 'Póliza Seguro' | 'Tributario' | 'Certificado Energético' | 'Acta Comunidad';
  propertyAlias: string;
  date: string;
  fileSize: string;
  fileType: 'PDF' | 'DOC' | 'IMG';
}

export interface InvestmentAsset {
  id: string;
  name: string;
  category: 'Inmuebles Directos' | 'SOCIMI' | 'Fondo Inmobiliario' | 'Bonos / Deuda' | 'Tesorería';
  value: number;
  percentage: number;
  annualYield: number;
  liquidity: 'Inmediata' | 'Media (1-3 meses)' | 'Baja (> 1 año)';
  notes: string;
}
