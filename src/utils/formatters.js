/**
 * Formata um valor numérico para o formato de moeda (dólar)
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Formata um ano como string
 */
export const formatYear = (year) => {
  return year.toString();
};
