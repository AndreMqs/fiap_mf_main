import { capitalize } from "lodash";

import SingleStatement from "../SingleStatement/SingleStatement";

import { StatementListProps } from "../../../types/statement";

import styles from "./StatementList.module.scss"


export default function StatementList(props: StatementListProps) {
  const {statementsByMonth, isEditing, deleteTransaction} = props;

  const renderSingleStatement = (month: string) => {
    return (
      statementsByMonth.get(month)?.map((statement, index) =>
        <SingleStatement 
          transaction={statement} 
          isEditing={isEditing} 
          deleteTransaction={deleteTransaction}
          key={index}
        />
      )
    );
  }

  return (
    <>
      {Array.from(statementsByMonth.keys()).map((month, index) => (
        <div key={index}>
          <span className={styles.month}>{capitalize(month)}</span>
          <div className={styles.listContainer}>
            {renderSingleStatement(month)}
          </div>
        </div>
      ))}
    </>
  );
}

