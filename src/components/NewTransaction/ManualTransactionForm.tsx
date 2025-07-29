import { parseMoneyValue } from '../../utils/stringUtils';
import { TRANSACTION_TYPES, TRANSACTION_CATEGORIES } from '../../utils/constants';
import Select from '../Select/Select';
import { ManualTransactionFormProps } from '../../types/components';

import styles from './NewTransaction.module.scss';

export const ManualTransactionForm = ({
  formData,
  isFocused,
  valueError,
  onFieldChange,
  onValueChange,
  onFocusChange,
  onClear
}: ManualTransactionFormProps) => {
  const getInputValue = () => {
    if (isFocused) {
      return formData.value;
    }

    const value = parseFloat(formData.value.replace(',', '.'));
    if (Number.isNaN(value) || value <= 0) {
      return parseMoneyValue(0);
    }

    return parseMoneyValue(value);
  };

  return (
    <>
      <span className={styles.selectContainer}>
        <Select 
          value={formData.type}
          placeholder="Selecione o tipo de transação"
          options={TRANSACTION_TYPES}
          onChange={(value) => onFieldChange('type', value)}
        />
      </span>
      <span className={styles.selectContainer}>
        <Select 
          value={formData.category}
          placeholder="Selecione a categoria"
          options={TRANSACTION_CATEGORIES}
          onChange={(value) => onFieldChange('category', value)}
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
          value={formData.date}
          onChange={(e) => onFieldChange('date', e.target.value)}
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
          onChange={(e) => onValueChange(e.target.value)}
          className={`${styles.inputValue} ${valueError ? styles.inputError : ''}`}
          onFocus={() => onFocusChange(true)}
          onBlur={() => onFocusChange(false)}
        />
        {valueError && (
          <span className={styles.errorText}>{valueError}</span>
        )}
      </span>
    </>
  );
}; 