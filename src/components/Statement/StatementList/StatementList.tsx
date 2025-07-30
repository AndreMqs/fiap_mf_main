import { capitalize } from "lodash";

import { CircularProgress } from '@mui/material';

import SingleStatement from "../SingleStatement/SingleStatement";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { StatementListProps } from "../../../types/statement";

import styles from "./StatementList.module.scss"

export default function StatementList(props: StatementListProps) {
  const {
    statementsByMonth, 
    isEditing, 
    deleteTransaction, 
    onLoadMore, 
    hasMore = false, 
    isLoading = false
  } = props;

  const loadingRef = useInfiniteScroll({
    onLoadMore: onLoadMore || (() => {}),
    hasMore,
    isLoading,
    threshold: 50
  });

  const renderSingleStatement = (month: string) => {
    return (
      statementsByMonth.get(month)?.map((statement, index) =>
        <SingleStatement 
          transaction={statement} 
          isEditing={isEditing} 
          deleteTransaction={deleteTransaction}
          key={`${month}-${statement.id}-${index}`}
        />
      )
    );
  }

  return (
    <div className={styles.statementListWrapper}>
      {Array.from(statementsByMonth.keys()).map((month) => (
        <div key={month}>
          <span className={styles.month}>{capitalize(month)}</span>
          <div className={styles.listContainer}>
            {renderSingleStatement(month)}
          </div>
        </div>
      ))}
      
      <div ref={loadingRef} className={styles.loadingContainer}>
        {isLoading && (
          <CircularProgress 
            size={24} 
            className={styles.loadingSpinner}
          />
        )}
        {!isLoading && hasMore && (
          <div style={{ height: '20px' }}></div>
        )}
      </div>
    </div>
  );
}

