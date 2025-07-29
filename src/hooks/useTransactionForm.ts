import { useState } from 'react';
import { useStore } from '../store/useStore';
import { CSVTransaction, TransactionFormData } from '../types/transaction';

export const useTransactionForm = () => {
  const { addTransaction } = useStore();
  
  const [formData, setFormData] = useState<TransactionFormData>({
    type: '',
    category: '',
    value: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [isFocused, setIsFocused] = useState(false);
  const [inputMode, setInputMode] = useState<'manual' | 'csv'>('manual');
  const [csvTransactions, setCsvTransactions] = useState<CSVTransaction[]>([]);
  const [valueError, setValueError] = useState<string>('');

  const updateFormField = (field: keyof TransactionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData({
      type: '',
      category: '',
      value: '',
      date: new Date().toISOString().split('T')[0]
    });
    setValueError('');
  };

  const clearCSV = () => {
    setCsvTransactions([]);
  };

  return {
    formData,
    isFocused,
    inputMode,
    csvTransactions,
    valueError,
    updateFormField,
    setIsFocused,
    setInputMode,
    setCsvTransactions,
    setValueError,
    clearForm,
    clearCSV,
    addTransaction
  };
}; 