import { Transaction } from '../types/api';
import { FilterCriteria } from '../types/statement';

export function filterTransactions(transactions: Transaction[], filters: FilterCriteria): Transaction[] {
  return transactions.filter(transaction => {

    if (filters.category && transaction.category !== filters.category) {
      return false;
    }

    if (filters.type && transaction.type !== filters.type) {
      return false;
    }

    if (filters.dateFrom || filters.dateTo) {
      // Usar comparação de strings para evitar problemas de fuso horário
      const transactionDateStr = transaction.date;
      
      if (filters.dateFrom) {
        if (transactionDateStr < filters.dateFrom) {
          return false;
        }
      }
      
      if (filters.dateTo) {
        if (transactionDateStr > filters.dateTo) {
          return false;
        }
      }
    }

    if (filters.valueMin || filters.valueMax) {
      const value = transaction.value;
      
      if (filters.valueMin) {
        const minValue = parseFloat(filters.valueMin);
        if (value < minValue) {
          return false;
        }
      }
      
      if (filters.valueMax) {
        const maxValue = parseFloat(filters.valueMax);
        if (value > maxValue) {
          return false;
        }
      }
    }

    return true;
  });
}

export function getActiveFiltersCount(filters: FilterCriteria): number {
  return Object.values(filters).filter(value => value !== '').length;
} 