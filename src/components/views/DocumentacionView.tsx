import React, { useState } from 'react';
import {
  FolderArchive,
  Search,
  FileText,
  Download,
  Eye,
  Filter,
  Sparkles,
  Shield,
  X,
} from 'lucide-react';
import { DocumentItem } from '../../types';

interface DocumentacionViewProps {
  documents: DocumentItem[];
  onOpenRoadmap: (title: string, phase: string, desc: string) => void;
}

export const DocumentacionView: React.FC<DocumentacionViewProps> = ({
  documents,
  onOpenRoadmap,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  const filtered = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.propertyAlias.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      selectedCategory === 'all' || doc.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const handleSimulatedDownload = (doc: DocumentItem) => {
    // Generate a quick simulated text blob file for user download
    const dummyContent = `JUSTIFICANTE DOCUMENTAL DE GESTIÓN PATRIMONIAL\n\nTítulo: ${doc.title}\nInmueble: ${doc.propertyAlias}\nCategoría: ${doc.category}\nFecha de Registro: ${doc.date}\nEstado: Documento Válido y Cotejado en Archivo Central.\n\n---\nMi Gestor Inmobiliario y Patrimonial (Gestión Privada)`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.title.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Sección 08 · Archivo Digital Seguro
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Documentación</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Escrituras notariales, contratos de arrendamiento, pólizas de seguros y certificados técnicos.
          </p>
        </div>

        <button
          onClick={() =>
            onOpenRoadmap(
              'Documentación Inteligente & Extracción OCR con IA',
              'Fase 3',
              'En futuras fases la aplicación incorporará lectura inteligente de escrituras, recibos del IBI y contratos mediante IA para autocumplimentar datos automáticamente.'
            )
          }
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Extracción OCR con IA (Fase 3)</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-center justify-between shadow-2xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título o inmueble..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              selectedCategory === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todos ({documents.length})
          </button>
          <button
            onClick={() => setSelectedCategory('Escritura')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              selectedCategory === 'Escritura' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Escrituras
          </button>
          <button
            onClick={() => setSelectedCategory('Contrato')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              selectedCategory === 'Contrato' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contratos
          </button>
          <button
            onClick={() => setSelectedCategory('Póliza Seguro')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              selectedCategory === 'Póliza Seguro' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Seguros
          </button>
          <button
            onClick={() => setSelectedCategory('Certificado Energético')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              selectedCategory === 'Certificado Energético' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Técnicos & CEE
          </button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-5 rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 rounded-md">
                  {doc.category}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{doc.fileSize} · {doc.fileType}</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{doc.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">Inmueble: <strong className="text-slate-700">{doc.propertyAlias}</strong></p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">Reg: {doc.date}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                  title="Previsualizar"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSimulatedDownload(doc)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                  title="Descargar copia cotejada"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900 truncate max-w-xs">{previewDoc.title}</h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200/80">
                <div className="flex justify-between">
                  <span className="text-slate-400">Inmueble:</span>
                  <span className="font-semibold text-slate-900">{previewDoc.propertyAlias}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Categoría:</span>
                  <span className="font-semibold text-slate-900">{previewDoc.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fecha de Registro:</span>
                  <span className="font-mono">{previewDoc.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tamaño del archivo:</span>
                  <span className="font-mono">{previewDoc.fileSize} ({previewDoc.fileType})</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-[11px] flex items-center gap-2">
                <Shield className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Documento validado y protegido. Copia archivada en el repositorio privado.</span>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  handleSimulatedDownload(previewDoc);
                  setPreviewDoc(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Descargar Documento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
