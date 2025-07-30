import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { CSVTransaction } from '../../types/transaction';
import { CSVUploadProps } from '../../types/components';
import styles from './CSVUpload.module.scss';

export default function CSVUpload({ onTransactionsLoaded }: CSVUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (csvText: string): CSVTransaction[] => {
    const lines = csvText.split('\n');
    const transactions: CSVTransaction[] = [];
    
    const dataLines = lines.slice(1);
    
    for (const line of dataLines) {
      if (line.trim() === '') continue;
      
      const columns = line.split(',').map(col => col.trim().replace(/"/g, ''));
      
      if (columns.length >= 4) {
        const [type, value, category, date] = columns;
        
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
          throw new Error(`Valor inválido na linha: ${line}`);
        }
        
        transactions.push({
          type: type.toLowerCase() === 'receita' ? 'income' : 'expense',
          value: parsedValue,
          category: category,
          date: date
        });
      }
    }
    
    return transactions;
  };

  const handleFile = async (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Por favor, selecione apenas arquivos CSV.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const text = await file.text();
      const transactions = parseCSV(text);
      
      if (transactions.length === 0) {
        setError('Nenhuma transação válida encontrada no arquivo CSV.');
        return;
      }
      
      onTransactionsLoaded(transactions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar arquivo CSV.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.csvUploadContainer}>
      <div
        className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        <div className={styles.uploadContent}>
          {isLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <span>Processando arquivo...</span>
            </div>
          ) : (
            <>
              <div className={styles.uploadIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Arraste e solte seu arquivo CSV aqui</h3>
              <p>ou clique para selecionar</p>
              <div className={styles.csvInfo}>
                <p>Formato esperado: tipo,valor,categoria,data</p>
                <p>Exemplo: Receita,1500.00,Alimentação,2024-01-15</p>
              </div>
            </>
          )}
        </div>
      </div>
      
      {error && (
        <div className={styles.error}>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
} 