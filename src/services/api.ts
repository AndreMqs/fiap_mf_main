import { User, Transaction, TransactionFormData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('API_BASE_URL loaded:', API_BASE_URL);

export const api = {
  async fetchUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/user`);
    if (!response.ok) {
      throw new Error('Erro ao carregar dados do usuário');
    }
    const user = await response.json();
    return user;
  },

  async fetchTransactions(): Promise<Transaction[]> {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    if (!response.ok) {
      throw new Error('Erro ao carregar transações');
    }
    return response.json();
  },

  async addTransaction(transactionData: TransactionFormData): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...transactionData,
        id: Date.now(),
      }),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao adicionar transação');
    }
    return response.json();
  },

  async deleteTransaction(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Erro ao deletar transação');
    }
  },
}; 