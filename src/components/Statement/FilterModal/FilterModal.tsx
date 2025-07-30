import { useState, useEffect } from 'react';
import { FilterModalProps, FilterCriteria } from '../../../types/statement';
import styles from './FilterModal.module.scss';

export default function FilterModal({ open, onClose, onApplyFilters, currentFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterCriteria>({
    category: '',
    dateFrom: '',
    dateTo: '',
    valueMin: '',
    valueMax: '',
    type: ''
  });

  useEffect(() => {
    if (open) {
      setFilters(currentFilters);
    }
  }, [open, currentFilters]);

  const handleFilterChange = (field: keyof FilterCriteria, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    const emptyFilters: FilterCriteria = {
      category: '',
      dateFrom: '',
      dateTo: '',
      valueMin: '',
      valueMax: '',
      type: ''
    };
    setFilters(emptyFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTitle}>
          Filtros
          {getActiveFiltersCount() > 0 && (
            <span className={styles.filterCount}>
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        
        <div className={styles.modalContent}>
          <div className={styles.filterGrid}>
            <div className={styles.filterField}>
              <label htmlFor="category">Categoria</label>
              <select
                id="category"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">Todas</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Moradia">Moradia</option>
                <option value="Saúde">Saúde</option>
                <option value="Estudo">Estudo</option>
                <option value="Transporte">Transporte</option>
              </select>
            </div>

            <div className={styles.filterField}>
              <label htmlFor="type">Tipo</label>
              <select
                id="type"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">Todos</option>
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </select>
            </div>

            <div className={styles.filterField}>
              <label htmlFor="dateFrom">Data Inicial</label>
              <input
                id="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className={styles.filterField}>
              <label htmlFor="dateTo">Data Final</label>
              <input
                id="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className={styles.filterField}>
              <label htmlFor="valueMin">Valor Mínimo</label>
              <input
                id="valueMin"
                type="number"
                value={filters.valueMin}
                onChange={(e) => handleFilterChange('valueMin', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            <div className={styles.filterField}>
              <label htmlFor="valueMax">Valor Máximo</label>
              <input
                id="valueMax"
                type="number"
                value={filters.valueMax}
                onChange={(e) => handleFilterChange('valueMax', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button onClick={handleClearFilters} className={styles.clearButton}>
            Limpar Filtros
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
          <button onClick={handleApplyFilters} className={styles.applyButton}>
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
} 