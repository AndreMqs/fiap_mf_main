import { CSVTransactionPreviewProps } from '../../types/components';

import styles from './NewTransaction.module.scss';

export const CSVTransactionPreview = ({ transactions, onClear }: CSVTransactionPreviewProps) => {
  if (transactions.length === 0) return null;

  return (
    <>
      <div className={styles.csvPreview}>
        <h4>Transações carregadas ({transactions.length}):</h4>
        {transactions.map((transaction, index) => (
          <div key={index} className={`${styles.transactionPreview} ${transaction.type}`}>
            <div className={styles.transactionInfo}>
              <span className={styles.type}>
                {transaction.type === 'income' ? 'Receita' : 'Despesa'}
              </span>
              <span className={styles.category}>{transaction.category}</span>
              <span className={styles.date}>{transaction.date}</span>
            </div>
            <span className={`${styles.value} ${transaction.type}`}>
              R$ {transaction.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}; 