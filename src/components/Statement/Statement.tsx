import { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import Edit from "../../images/Edit.svg";
import Filter from "../../images/Filter.svg";
import StatementList from './StatementList/StatementList';
import FilterModal from './FilterModal/FilterModal';
import { getStatementByMonth } from '../../utils/statementUtils';
import { filterTransactions, getActiveFiltersCount } from '../../utils/filterUtils';
import { StatementProps, FilterCriteria } from '../../types/statement';

import styles from "./Statement.module.scss"

export default function Statement(props: StatementProps) {
  const { transactions, deleteTransaction } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterCriteria>({
    category: '',
    dateFrom: '',
    dateTo: '',
    valueMin: '',
    valueMax: '',
    type: ''
  });
  const [displayedTransactions, setDisplayedTransactions] = useState<typeof transactions>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 1;

  const filteredTransactions = filterTransactions(transactions, activeFilters);
  const activeFiltersCount = getActiveFiltersCount(activeFilters);

  useEffect(() => {
    setDisplayedTransactions([]);
    setHasMore(filteredTransactions.length > 0);
  }, [activeFilters]);

  useEffect(() => {
    const initialItems = filteredTransactions.slice(0, 5); 
    setDisplayedTransactions(initialItems);
    const newHasMore = filteredTransactions.length > 5;
    setHasMore(newHasMore);
  }, [filteredTransactions.length]);

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 300));
    
    const currentLength = displayedTransactions.length;
    const newItems = filteredTransactions.slice(currentLength, currentLength + ITEMS_PER_PAGE);
    
    setDisplayedTransactions(prev => [...prev, ...newItems]);
    
    const nextLength = currentLength + ITEMS_PER_PAGE;
    const newHasMore = nextLength < filteredTransactions.length;
    
    setHasMore(newHasMore);
    setIsLoading(false);
  };

  const handleApplyFilters = (filters: FilterCriteria) => {
    setActiveFilters(filters);
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <div id='statement' className={styles.statementContainer}>
      <div className={styles.statementHeader}>
        <span className={styles.headerTitle}>Extrato</span>
        <span className={styles.headerButtonsContainer}>
          <IconButton className={styles.headerButton} onClick={() => setIsEditing(!isEditing)}>
            <img 
              src={Edit} 
              alt="Editar" 
              height={22} 
              width={22}
            />
          </IconButton>
          <Badge 
            badgeContent={activeFiltersCount} 
            color="primary"
            invisible={activeFiltersCount === 0}
          >
            <IconButton className={styles.headerButton} onClick={handleOpenFilterModal}>
              <img 
                src={Filter} 
                alt="Filtros" 
                height={22} 
                width={22}
              />
            </IconButton>
          </Badge>
        </span>
      </div>
      <div className={styles.statementsListContainer}>
        <StatementList 
          statementsByMonth={getStatementByMonth(displayedTransactions)}
          isEditing={isEditing}
          deleteTransaction={deleteTransaction}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          isLoading={isLoading}
        />
      </div>
      
      <FilterModal
        open={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
        currentFilters={activeFilters}
      />
    </div>
  );
}

