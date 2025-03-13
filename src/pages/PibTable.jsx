import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPIBData } from '../services/ibgeService';
import { formatCurrency, formatYear } from '../utils/formatters';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';

const ITEMS_PER_PAGE = 10;

const PibTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ['pibData'],
    queryFn: fetchPIBData
  });

  if (isLoading) {
    return (
      <Layout title="Tabela de PIB por Ano" subtitle="Carregando dados...">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout title="Tabela de PIB por Ano" subtitle="Erro ao carregar dados">
        <div className="text-center p-8 bg-red-50 rounded-lg border border-red-100">
          <p className="text-red-500">
            Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.
          </p>
        </div>
      </Layout>
    );
  }

  // Ordenar dados do mais recente para o mais antigo
  const sortedData = [...data].sort((a, b) => b.year - a.year);

  // Paginação
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <Layout title="Tabela de PIB por Ano" subtitle="Dados históricos do Produto Interno Bruto do Brasil">
      <div className="glassmorphism rounded-xl overflow-hidden shadow-md animate-slide-up transition-smooth">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Ano</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">PIB Total (USD)</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">PIB per Capita (USD)</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr
                  key={item.year}
                  className={`border-b transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                    {formatYear(item.year)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-800">
                    {formatCurrency(item.pibTotal)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-800">
                    {formatCurrency(item.pibPerCapita)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="pagination border-t">
            <button
              className={`pagination-button ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>

            <span className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </span>

            <button
              className={`pagination-button ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            Esta tabela apresenta o PIB total e o PIB per capita do Brasil nos últimos anos,
            ordenados do mais recente para o mais antigo.
          </p>
        </div>

      </div>


    </Layout>
  );
};

export default PibTable; 