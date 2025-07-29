import { useMemo } from 'react';
import CSVUpload from '../CSVUpload/CSVUpload';
import { ModeSelector } from './ModeSelector';
import { ManualTransactionForm } from './ManualTransactionForm';
import { CSVTransactionPreview } from './CSVTransactionPreview';
import { useTransactionForm } from '../../hooks/useTransactionForm';
import { useValueValidation } from '../../utils/valueValidationUtils';
import { createTransactionFromForm, createTransactionsFromCSV, getButtonText, isFormValid } from '../../utils/transactionUtils';
import { NewTransactionProps } from '../../types/components';
import { CSVTransaction } from '../../types/transaction';
import styles from "./NewTransaction.module.scss";

export default function NewTransaction({ 
  onTransactionAdded, 
  className = '', 
  disabled = false 
}: NewTransactionProps) {
  const {
    formData,
    isFocused,
    inputMode,
    csvTransactions,
    valueError,
    updateFormField,
    setIsFocused,
    setInputMode,
    setCsvTransactions,
    setValueError,
    clearForm,
    clearCSV,
    addTransaction
  } = useTransactionForm();

  const { validateValue, filterInvalidCharacters } = useValueValidation();

  const isMobile = useMemo(() => 
    typeof window !== "undefined" && window.screen.width <= 425, 
    []
  );

  const handleFinishTransaction = () => {
    if (inputMode === 'manual') {
      const transaction = createTransactionFromForm(
        formData.type,
        formData.category,
        formData.value,
        formData.date
      );
      addTransaction(transaction);
      clearForm();
      onTransactionAdded?.();
    } else if (inputMode === 'csv' && csvTransactions.length > 0) {
      const transactions = createTransactionsFromCSV(csvTransactions);
      transactions.forEach(addTransaction);
      clearCSV();
      setInputMode('manual');
      onTransactionAdded?.();
    }
  };

  const handleCSVTransactionsLoaded = (transactions: CSVTransaction[]) => {
    setCsvTransactions(transactions);
  };

  const handleValueChange = (value: string) => {
    const filteredValue = filterInvalidCharacters(value);
    updateFormField('value', filteredValue);
    const validation = validateValue(filteredValue);
    setValueError(validation.error);
  };



  const buttonText = getButtonText(isMobile, inputMode, csvTransactions.length);
  const formIsValid = isFormValid(inputMode, formData, valueError, csvTransactions);

  return (
    <div id='newTransaction' className={`${styles.transactionContainer} ${className}`}>
      <div className={styles.transactionContent}>
        <span className={styles.title}>Nova transação</span>
        
        <ModeSelector 
          currentMode={inputMode}
          onModeChange={setInputMode}
        />

        {inputMode === 'manual' ? (
          <ManualTransactionForm
            formData={formData}
            isFocused={isFocused}
            valueError={valueError}
            onFieldChange={updateFormField}
            onValueChange={handleValueChange}
            onFocusChange={setIsFocused}
            onClear={clearForm}
          />
        ) : (
          <>
            <CSVUpload onTransactionsLoaded={handleCSVTransactionsLoaded} />
            <CSVTransactionPreview 
              transactions={csvTransactions}
              onClear={clearCSV}
            />
          </>
        )}

        <button 
          className={styles.finishTransaction}
          onClick={handleFinishTransaction}
          disabled={!formIsValid || disabled}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

