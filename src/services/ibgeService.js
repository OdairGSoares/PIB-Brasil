import axios from 'axios';

// URL base da API
const BASE_URL = 'https://servicodados.ibge.gov.br/api/v3';

// Constantes para o PIB total e per capita (Produto Interno Bruto)
// Usando o agregado 6784 (Produto Interno Bruto) que contém os dados do PIB
const PIB_AGREGADO = '6784';
const PIB_TOTAL_VARIAVEL = '9808';  // Variável para PIB total
const PIB_PER_CAPITA_VARIAVEL = '9810';  // Variável para PIB per capita

/**
 * Busca os dados do PIB brasileiro total e per capita
 */
export const fetchPIBData = async () => {
  try {
    console.log('Iniciando busca de dados do PIB');
    
    // Requisição para obter dados do PIB total
    const pibTotalResponse = await axios.get(
      `${BASE_URL}/agregados/${PIB_AGREGADO}/variaveis/${PIB_TOTAL_VARIAVEL}?localidades=BR`
    );
    
    // Requisição para obter dados do PIB per capita
    const pibPerCapitaResponse = await axios.get(
      `${BASE_URL}/agregados/${PIB_AGREGADO}/variaveis/${PIB_PER_CAPITA_VARIAVEL}?localidades=BR`
    );
    
    console.log('Resposta PIB total:', pibTotalResponse.data);
    console.log('Resposta PIB per capita:', pibPerCapitaResponse.data);
    
    // Extrair os dados do primeiro resultado e primeira série (para o Brasil)
    const pibTotalData = pibTotalResponse.data[0]?.resultados?.[0]?.series?.[0]?.serie || {};
    const pibPerCapitaData = pibPerCapitaResponse.data[0]?.resultados?.[0]?.series?.[0]?.serie || {};
    
    console.log('PIB total processado:', pibTotalData);
    console.log('PIB per capita processado:', pibPerCapitaData);
    
    // Verificar se temos dados antes de prosseguir
    if (Object.keys(pibTotalData).length === 0 || Object.keys(pibPerCapitaData).length === 0) {
      throw new Error('Dados do PIB não encontrados na resposta da API');
    }
    
    // Obter os anos (chaves) dos dados do PIB total
    const years = Object.keys(pibTotalData);
    
    // Mapear os dados por ano
    const pibData = years.map(year => ({
      year: parseInt(year),
      pibTotal: parseFloat(pibTotalData[year].replace(/\./g, '').replace(',', '.')),
      pibPerCapita: parseFloat(pibPerCapitaData[year].replace(/\./g, '').replace(',', '.'))
    }));
    
    // Ordenar por ano (do mais antigo para o mais recente)
    return pibData.sort((a, b) => a.year - b.year);
    
  } catch (error) {
    console.error('Erro ao buscar dados do PIB:', error);
    throw new Error('Não foi possível carregar os dados do PIB');
  }
};
