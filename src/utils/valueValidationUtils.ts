export const useValueValidation = () => {
  const validateValue = (value: string): { isValid: boolean; error: string } => {
    const validPattern = /^[0-9.,-]*$/;
    if (value && !validPattern.test(value)) {
      return { isValid: false, error: 'Apenas números são permitidos' };
    }
    

    const numericValue = parseFloat(value.replace(',', '.'));
    if (value && (Number.isNaN(numericValue) || numericValue <= 0)) {
      return { isValid: false, error: 'Valor deve ser maior que zero' };
    }
    
    return { isValid: true, error: '' };
  };

  const filterInvalidCharacters = (value: string): string => {
    return value.replace(/[^0-9.,-]/g, '');
  };

  const parseNumericValue = (value: string): number => {
    return parseFloat(value.replace(',', '.'));
  };

  return {
    validateValue,
    filterInvalidCharacters,
    parseNumericValue
  };
}; 