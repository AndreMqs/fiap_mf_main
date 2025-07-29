import { useState } from 'react';
import IconButton from '@mui/material/IconButton';


import Delete from "../../images/Delete.svg";
import Edit from "../../images/Edit.svg";
import StatementList from './StatementList/StatementList';

import { getStatementByMonth } from '../../utils/statementUtils';
import { StatementProps } from '../../types/statement';

import styles from "./Statement.module.scss"


export default function Statement(props: StatementProps) {
  const { transactions, deleteTransaction } = props;

  const [isEditing, setIsEditing] = useState(false);

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
          <IconButton className={styles.headerButton}>
            <img 
              src={Delete} 
              alt="Deletar" 
              height={40} 
              width={40}
            />
          </IconButton>
        </span>
      </div>
      <div className={styles.statementsListContainer}>
        <StatementList 
          statementsByMonth={getStatementByMonth(transactions)}
          isEditing={isEditing}
          deleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
}

