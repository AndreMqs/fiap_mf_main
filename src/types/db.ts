import { User, Transaction } from './index';

export interface Database {
  user: User;
  transactions: Transaction[];
}


declare module '*.json' {
  const value: Database;
  export default value;
} 