import { useEffect, useState } from "react";

import { parseMoneyValue } from "../../../utils/stringUtils";
import Delete from "../../../images/Delete.svg";

import { Statement } from "../../../models/Statement";

import styles from "./SingleStatement.module.scss"


export default function SingleStatement(props: SingleStatementProps) {
  const {statement, isEditing, deleteStatement} = props;
  const {type, date, moneyValue} = statement;
  const [inputValue, setInputValue] = useState<string>(moneyValue.toString());
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputValue(moneyValue.toString());
  }, [moneyValue]);

  const handleDelete = () => {
    deleteStatement(statement);
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
        <span className={styles.type}>{type}</span>
        <span className={styles.date}>{date.toLocaleDateString()}</span>
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

interface SingleStatementProps {
  statement: Statement;
  isEditing: boolean;
  deleteStatement: (statement: Statement) => void;
}