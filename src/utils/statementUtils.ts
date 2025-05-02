import { Statement } from "../models/Statement";

export function getStatementByMonth(statementsList: Statement[]) {
  const monthMap = new Map<string, Statement[]>();
  statementsList.forEach((statement) => {
    const month = statement.date.toLocaleString('default', { month: 'long' });
    const prevItem = monthMap.get(month);
    monthMap.set(month, [...(prevItem ?? []), statement]);
  });
  return monthMap;
}