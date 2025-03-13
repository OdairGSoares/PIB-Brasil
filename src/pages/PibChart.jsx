import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPIBData } from '../services/ibgeService';
import { formatCurrency } from '../utils/formatters';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import Chart from 'react-apexcharts';

const PibChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pibData'],
    queryFn: fetchPIBData
  });

  if (isLoading) {
    return (
      <Layout title="Evolução do PIB Brasileiro" subtitle="Carregando dados...">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout title="Evolução do PIB Brasileiro" subtitle="Erro ao carregar dados">
        <div className="text-center p-8 bg-red-50 rounded-lg border border-red-100">
          <p className="text-red-500">
            Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.
          </p>
        </div>
      </Layout>
    );
  }

  // Preparar dados para o gráfico
  const years = data.map(item => item.year);
  const pibTotalSeries = data.map(item => item.pibTotal);
  const pibPerCapitaSeries = data.map(item => item.pibPerCapita);

  // Configurações do gráfico
  const chartOptions = {
    chart: {
      type: 'line',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: true
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    stroke: {
      width: [3, 3],
      curve: 'smooth'
    },
    colors: ['#0066CC', '#00CC99'],
    title: {
      text: 'Evolução do PIB Brasileiro (em dólares)',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 500,
        color: '#263238'
      }
    },
    xaxis: {
      categories: years,
      title: {
        text: 'Anos',
        style: {
          fontSize: '14px',
          fontWeight: 400
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'PIB Total (USD)',
          style: {
            fontSize: '14px',
            fontWeight: 400
          }
        },
        labels: {
          formatter: function(value) {
            return formatCurrency(value);
          }
        }
      },
      {
        opposite: true,
        title: {
          text: 'PIB per Capita (USD)',
          style: {
            fontSize: '14px',
            fontWeight: 400
          }
        },
        labels: {
          formatter: function(value) {
            return formatCurrency(value);
          }
        }
      }
    ],
    tooltip: {
      y: {
        formatter: function(value) {
          return formatCurrency(value);
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      floating: false,
      offsetY: -5,
      labels: {
        useSeriesColors: false
      }
    },
    grid: {
      borderColor: '#e0e0e0',
      row: {
        colors: ['#f8f9fa', 'transparent'],
        opacity: 0.5
      }
    },
    markers: {
      size: 4,
      hover: {
        size: 6
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: 'bottom',
            offsetY: 10
          }
        }
      }
    ]
  };

  const chartSeries = [
    {
      name: 'PIB Total',
      data: pibTotalSeries
    },
    {
      name: 'PIB per Capita',
      data: pibPerCapitaSeries
    }
  ];

  return (
    <Layout title="Evolução do PIB Brasileiro" subtitle="Análise Temporal do Produto Interno Bruto">
      <div className="glassmorphism rounded-xl p-6 shadow-lg animate-slide-up transition-smooth">
        <div className="chart-container">
          <Chart 
            options={chartOptions} 
            series={chartSeries} 
            type="line" 
            height={500} 
          />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto">
            Este gráfico apresenta a evolução do PIB total brasileiro e do PIB per capita ao longo dos anos,
            permitindo observar as tendências de crescimento econômico do país.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PibChart; 