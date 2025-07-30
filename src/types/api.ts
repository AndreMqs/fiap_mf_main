export interface User {
  id: number;
  name: string;
  balance: number;
}

export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  value: number;
  category: 'Alimentação' | 'Moradia' | 'Saúde' | 'Estudo' | 'Transporte';
  date: string;
}

export interface TransactionFormData {
  type: 'income' | 'expense';
  value: number;
  category: 'Alimentação' | 'Moradia' | 'Saúde' | 'Estudo' | 'Transporte';
  date: string;
} 