import { useState } from "react";
import cn from "classnames";

import Eye from "../../images/Eye.svg";

import { parseDateString } from "../../utils/dateUtils";
import { parseMoneyValue } from "../../utils/stringUtils";

import styles from "./Summary.module.scss"


export default function Summary(props: SummaryProps) {
  const {username, money} = props;
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const date = new Date();

  const getMoneyValue = () => {
    if (isBalanceVisible) {
      return parseMoneyValue(money);
    }

    return '.';
  }

  const renderTitle = () => {
    return (
      <div className={styles.summaryTitle}>
        <span className={styles.userName}>
          {`Olá, ${username}! :)`}
        </span>
        <span className={styles.date}>
          {parseDateString(date)}
        </span>
      </div>
    );
  }

  const renderMoney = () => {
    return (
      <div className={styles.moneyContainer}>
        <span className={styles.moneyHeader}>
          <span className={styles.balance}>
            Saldo
          </span>
          <img
            src={Eye}
            alt="Olho" 
            height={20}
            width={20}
            onClick={() => setIsBalanceVisible(!isBalanceVisible)}
          />
        </span>
        <span className={styles.balanceContainer}>
          <span className={styles.accountType}>
            Conta Corrente
          </span>
          <span className={cn(styles.moneyText, {[styles.hideMoney]: !isBalanceVisible})}>
            {getMoneyValue()}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div id='summary' className={styles.summaryContainer}>
      {renderTitle()}
      {renderMoney()}
    </div>
  );
}

interface SummaryProps {
  username: string;
  money: number;
}