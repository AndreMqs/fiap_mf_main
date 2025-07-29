import { useEffect, useState } from "react";

import Delete from "../../../images/Delete.svg";

import { parseMoneyValue } from "../../../utils/stringUtils";import { SingleStatementProps } from "../../../types/statement";

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

    return parseMoneyValue(value);
  }

  return (
    <div 
      id='singleStatement' 
      className={styles.singleStatementContainer}
    >
      <span className={styles.typeAndDateContainer}>
        <span className={styles.type}>{type === 'income' ? 'Receita' : 'Despesa'}</span>
        <span className={styles.date}>{new Date(date).toLocaleDateString()}</span>
        <span className={styles.category}>{category}</span>
      </span>

      <div className={styles.valueAndDeleteContainer}>
        <input 
          className={styles.inputMoney}
          type="text" 
          id="money" 
          name="money" 
          readOnly={!isEditing} 
          value={getInputValue()}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
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
    </div>
  );
}

