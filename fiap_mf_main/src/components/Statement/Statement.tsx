import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Delete from "../../images/Delete.svg";
import Edit from "../../images/Edit.svg";
import StatementList from './StatementList/StatementList';

import { getStatementByMonth } from '../../utils/statementUtils';

import styles from "./Statement.module.scss"


export default function Statement(props: StatementProps) {
  const {} = props;

  const [isEditing, setIsEditing] = useState(false);

  const statementsList = [
    {
      type: 'Transferência',
      date: new Date('2024-01-09'),
      moneyValue: -150,
    },
    {
      type: 'Depósito',
      date: new Date('2024-01-21'),
      moneyValue: 1501,
    },
    {
      type: 'Depósito',
      date: new Date('2024-02-17'),
      moneyValue: 1502,
    },
    {
      type: 'Depósito',
      date: new Date('2024-03-15'),
      moneyValue: 1503,
    },
    {
      type: 'Depósito',
      date: new Date('2024-03-13'),
      moneyValue: 1504,
    },
  ]

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
          statementsByMonth={getStatementByMonth(statementsList)}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}

interface StatementProps {
}