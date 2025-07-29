import { useState } from 'react';

import Select from '../Select/Select';
import { parseMoneyValue } from '../../utils/stringUtils';
import { TRANSACTION_TYPES, TRANSACTION_CATEGORIES } from '../../utils/constants';
import { useStore } from '../../store/useStore';

import styles from "./NewTransaction.module.scss"


export default function NewTransaction() {
  const { addTransaction } = useStore();
  
  const transactionOptions = TRANSACTION_TYPES;
  const categoryOptions = TRANSACTION_CATEGORIES;
  
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isFocused, setIsFocused] = useState(false);

  const handleFinishTransaction = () => {
    if (selectedType && selectedCategory && inputValue && selectedDate) {
      const value = parseFloat(inputValue.replace(/[^\d.-]/g, ''));
      if (!Number.isNaN(value)) {
        addTransaction({
          type: selectedType === 'Receita' ? 'income' : 'expense',
          value: value,
          category: selectedCategory as 'Alimentação' | 'Moradia' | 'Saúde' | 'Estudo' | 'Transporte',
          date: selectedDate,
        });
        setSelectedType('');
        setSelectedCategory('');
        setInputValue('');
        setSelectedDate('');
      }
    }
  };

  const getButtonText = () => {
    if (typeof window !== "undefined" && window.screen.width <= 425) {
      return 'Concluir';
    }

    return 'Concluir transação';
  }

  const getInputValue = () => {
    if (isFocused) {
      return inputValue;
    }

    const value = parseFloat(inputValue);
    if (Number.isNaN(value)) {
      return parseMoneyValue(0);
    }

    return parseMoneyValue(value);
  }

  return (
    <div id='newTransaction' className={styles.transactionContainer}>
      <div className={styles.transactionContent}>
        <span className={styles.title}>Nova transação</span>
        <span className={styles.selectContainer}>
          <Select 
            value={selectedType}
            placeholder="Selecione o tipo de transação"
            options={transactionOptions}
            onChange={setSelectedType}
          />
        </span>
        <span className={styles.selectContainer}>
          <Select 
            value={selectedCategory}
            placeholder="Selecione a categoria"
            options={categoryOptions}
            onChange={setSelectedCategory}
          />
        </span>
        <span className={styles.inputContainer}>
          <label 
            htmlFor="date" 
            id='date' 
            className={styles.inputLabel}
          >
            Data
          </label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className={styles.inputValue}
          />
        </span>
        <span className={styles.inputContainer}>
          <label 
            htmlFor="value" 
            id='value' 
            className={styles.inputLabel}
          >
            Valor
          </label>
          <input 
            type="text" 
            value={getInputValue()}
            onChange={e => setInputValue(e.target.value)}
            className={styles.inputValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </span>
        <button 
          className={styles.finishTransaction}
          onClick={handleFinishTransaction}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}

