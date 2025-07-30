import { Transaction } from './api';

export interface Statement {
  type: string;
  date: Date;
  moneyValue: number;
}

export interface FilterCriteria {
  category: string;
  dateFrom: string;
  dateTo: string;
  valueMin: string;
  valueMax: string;
  type: string;
}

export interface StatementProps {
  transactions: Transaction[];
  deleteTransaction: (id: number) => Promise<void>;
}

export interface SingleStatementProps {
  transaction: Transaction;
  isEditing: boolean;
  deleteTransaction: (id: number) => Promise<void>;
}

export interface StatementListProps {
  statementsByMonth: Map<string, Transaction[]>;
  isEditing: boolean;
  deleteTransaction: (id: number) => Promise<void>;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterCriteria) => void;
  currentFilters: FilterCriteria;
} 