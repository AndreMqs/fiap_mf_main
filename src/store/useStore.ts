import { create } from 'zustand';
import { api } from '../services/api';
import { StoreState } from '../types/store';
import { TransactionFormData } from '../types/api';
import { useUser } from '../hooks/useParentApp';

export const useStore = create<StoreState>((set, get) => ({
  user: null,
  transactions: [],
  isLoading: false,
  error: null,

  fetchUser: async () => {
    const { getUserName } = useUser();
    set({ isLoading: true, error: null });
    try {
      const user = {...await api.fetchUser(), name: getUserName()};
      set({ user, isLoading: false });
    } catch (error) {
      console.error('Error fetching user:', error);
      set({ error: 'Erro ao carregar dados do usuário', isLoading: false });
    }
  },

  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const transactions = await api.fetchTransactions();
      set({ transactions, isLoading: false });
    } catch {
      set({ error: 'Erro ao carregar transações', isLoading: false });
    }
  },

  addTransaction: async (transactionData: TransactionFormData) => {
    set({ isLoading: true, error: null });
    try {
      const newTransaction = await api.addTransaction(transactionData);
      set(state => ({
        transactions: [newTransaction, ...state.transactions],
        isLoading: false,
      }));
    } catch {
      set({ error: 'Erro ao adicionar transação', isLoading: false });
    }
  },

  deleteTransaction: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await api.deleteTransaction(id);
      set(state => ({
        transactions: state.transactions.filter(t => t.id !== id),
        isLoading: false,
      }));
    } catch {
      set({ error: 'Erro ao deletar transação', isLoading: false });
    }
  },

  getTotalIncome: () => {
    const { transactions } = get();
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0);
  },

  getTotalExpense: () => {
    const { transactions } = get();
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0);
  },

  getCategoryData: () => {
    const { transactions } = get();
    const categoryMap = new Map<string, number>();
    
    transactions.forEach(transaction => {
      const current = categoryMap.get(transaction.category) || 0;
      categoryMap.set(transaction.category, current + transaction.value);
    });

    const colors = ['#2196F3', '#9C27B0', '#E91E63', '#FF9800', '#4CAF50'];
    
    return Array.from(categoryMap.entries()).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  },
})); 