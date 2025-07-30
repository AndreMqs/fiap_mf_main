import { useEffect, useState } from "react";

import { Chip } from '@mui/material';

import Delete from "../../../images/Delete.svg";
import { parseMoneyValue } from "../../../utils/stringUtils";
import { SingleStatementProps } from "../../../types/statement";

import styles from "./SingleStatement.module.scss"


export default function SingleStatement(props: SingleStatementProps) {
  const {transaction, isEditing, deleteTransaction} = props;
  const {type, date, value, category} = transaction;
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleDelete = () => {
    deleteTransaction(transaction.id);
  };

  const getInputValue = () => {
    if (isEditing && isFocused) {
      return inputValue;
    }

    const value = parseFloat(inputValue);
    if (Number.isNaN(value)) {
      return parseMoneyValue(0);
    }

    const formattedValue = parseMoneyValue(value);
    return type === 'expense' ? `- ${formattedValue}` : formattedValue;
  }

  const formatDate = (dateString: string) => {
  
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  return (
    <div 
      id='singleStatement' 
      className={styles.singleStatementContainer}
    >
      <div className={styles.leftColumn}>
        <span className={styles.type}>{type === 'income' ? 'Receita' : 'Despesa'}</span>
        <span className={styles.date}>{formatDate(date)}</span>
      </div>

      <div className={styles.rightColumn}>
        <Chip 
          label={category} 
          className={styles.categoryChip}
          size="small"
        />
        <input 
          className={`${styles.inputMoney} ${type === 'expense' ? styles.expenseValue : ''}`}
          type="text" 
          id="money" 
          name="money" 
          readOnly={!isEditing} 
          value={getInputValue()}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
      </div>

      {isEditing && (
        <button 
          className={styles.deleteButton}
          onClick={handleDelete}
          aria-label="Deletar transação"
        >
          <img 
            src={Delete} 
            alt="Deletar" 
            height={16} 
            width={16}
          />
        </button>
      )}
    </div>
  );
}

