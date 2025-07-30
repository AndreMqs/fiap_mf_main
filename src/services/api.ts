import { User, Transaction, TransactionFormData } from '../types';
import dbData from '../../db.json';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async fetchUser(): Promise<User> {
    await delay(300); 
    return dbData.user;
  },

  async fetchTransactions(): Promise<Transaction[]> {
    await delay(300); 
    return dbData.transactions.map(transaction => ({
      id: typeof transaction.id === 'string' ? parseInt(transaction.id) : transaction.id,
      type: transaction.type as 'income' | 'expense',
      value: transaction.value,
      category: transaction.category as 'Alimentação' | 'Moradia' | 'Saúde' | 'Estudo' | 'Transporte',
      date: transaction.date
    }));
  },

  async addTransaction(transactionData: TransactionFormData): Promise<Transaction> {
    await delay(300); 
    
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now(),
    };
    
    // Adicionar à lista local (em uma aplicação real, isso seria persistido)
    dbData.transactions.push(newTransaction);
    
    return newTransaction;
  },

  async deleteTransaction(id: number): Promise<void> {
    await delay(300); // Simular delay de rede
    
    const index = dbData.transactions.findIndex(t => 
      typeof t.id === 'string' ? parseInt(t.id) === id : t.id === id
    );
    if (index !== -1) {
      dbData.transactions.splice(index, 1);
    }
  },
}; 