import { capitalize } from "lodash";

import SingleStatement from "../SingleStatement/SingleStatement";

import { Statement } from "../../../models/Statement";

import styles from "./StatementList.module.scss"


export default function StatementList(props: StatementListProps) {
  const {statementsByMonth, isEditing, deleteStatement} = props;

  const renderSingleStatement = (month: string) => {
    return (
      statementsByMonth.get(month)?.map((statement, index) =>
        <SingleStatement 
          statement={statement} 
          isEditing={isEditing} 
          deleteStatement={deleteStatement}
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

interface StatementListProps {
  statementsByMonth: Map<string, Statement[]>;
  isEditing: boolean;
  deleteStatement: (statement: Statement) => void;
}