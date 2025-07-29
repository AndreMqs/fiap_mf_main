import { Transaction } from './api';

export interface Statement {
  type: string;
  date: Date;
  moneyValue: number;
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
} 