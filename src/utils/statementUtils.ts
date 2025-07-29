import { Transaction } from "../types";

export function getStatementByMonth(transactions: Transaction[]) {
  const monthMap = new Map<string, Transaction[]>();
  transactions.forEach((transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
    const prevItem = monthMap.get(month);
    monthMap.set(month, [...(prevItem ?? []), transaction]);
  });
  return monthMap;
}