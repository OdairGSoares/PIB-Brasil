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
        <div className="text-center p-4 sm:p-8 bg-red-50 rounded-lg border border-red-100">
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
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      background: 'transparent'
    },
    stroke: {
      width: [3, 3],
      curve: 'smooth'
    },
    colors: ['#0066CC', '#00CC99'],
    title: {
      text: 'Evolução do PIB Brasileiro',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 500,
        color: '#263238'
      },
      margin: 10
    },
    subtitle: {
      text: '(em dólares)',
      align: 'center',
      style: {
        fontSize: '14px',
        color: '#666'
      }
    },
    xaxis: {
      categories: years,
      title: {
        text: 'Anos',
        style: {
          fontSize: '12px',
          fontWeight: 400
        }
      },
      labels: {
        style: {
          fontSize: '11px'
        },
        rotateAlways: false,
        rotate: -45,
        trim: true,
        maxHeight: 120
      },
      tickAmount: window.innerWidth < 768 ? 6 : undefined
    },
    yaxis: [
      {
        title: {
          text: 'PIB Total (USD)',
          style: {
            fontSize: '12px',
            fontWeight: 400
          }
        },
        labels: {
          formatter: function(value) {
            return formatCurrency(value);
          },
          style: {
            fontSize: '11px'
          },
          minWidth: 0
        },
        forceNiceScale: true,
        decimalsInFloat: 0
      },
      {
        opposite: true,
        title: {
          text: 'PIB per Capita (USD)',
          style: {
            fontSize: '12px',
            fontWeight: 400
          }
        },
        labels: {
          formatter: function(value) {
            return formatCurrency(value);
          },
          style: {
            fontSize: '11px'
          },
          minWidth: 0
        },
        forceNiceScale: true,
        decimalsInFloat: 0
      }
    ],
    tooltip: {
      y: {
        formatter: function(value) {
          return formatCurrency(value);
        }
      },
      shared: true,
      intersect: false,
      followCursor: true
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      floating: false,
      offsetY: -5,
      fontSize: '13px',
      markers: {
        width: 12,
        height: 12,
        radius: 6
      }
    },
    grid: {
      borderColor: '#e0e0e0',
      row: {
        colors: ['#f8f9fa', 'transparent'],
        opacity: 0.5
      },
      padding: {
        right: window.innerWidth < 768 ? 10 : 30,
        left: window.innerWidth < 768 ? 10 : 30
      }
    },
    markers: {
      size: window.innerWidth < 768 ? 3 : 4,
      hover: {
        size: window.innerWidth < 768 ? 5 : 6
      }
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 400
          },
          legend: {
            position: 'bottom',
            offsetY: 10
          }
        }
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 350,
            toolbar: {
              tools: {
                download: true,
                selection: false,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true
              }
            }
          },
          legend: {
            position: 'bottom',
            offsetY: 5,
            fontSize: '12px'
          },
          markers: {
            size: 3
          }
        }
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 300,
            toolbar: {
              tools: {
                download: true,
                selection: false,
                zoom: false,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true
              }
            }
          },
          title: {
            style: {
              fontSize: '14px'
            }
          },
          subtitle: {
            style: {
              fontSize: '12px'
            }
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
      <div className="glassmorphism rounded-xl p-2 sm:p-4 md:p-6 shadow-lg animate-slide-up transition-smooth">
        <div className="chart-container w-full overflow-hidden">
          <Chart 
            options={chartOptions} 
            series={chartSeries} 
            type="line" 
            height={window.innerWidth < 480 ? 300 : window.innerWidth < 768 ? 350 : 500} 
            className="w-full"
          />
        </div>
        
        <div className="mt-4 sm:mt-6 md:mt-8 text-center px-2 sm:px-4">
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
            Este gráfico apresenta a evolução do PIB total brasileiro e do PIB per capita ao longo dos anos,
            permitindo observar as tendências de crescimento econômico do país.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PibChart; 