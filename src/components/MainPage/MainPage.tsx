import { useState, useCallback, useMemo } from "react";

import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Summary from "../Summary/Summary";
import NewTransaction from "../NewTransaction/NewTransaction";
import Statement from "../Statement/Statement";
import Investments from "../Investments/Investments";
import OtherServices from "../OtherServices/OtherServices";

import styles from "./MainPage.module.scss";
import { Statement as StatementType } from "../../models/Statement";

export default function MainPage() {
  const user = {
    name: "Joana",
    money: 2500,
  };

  const [selectedMenu, setSelectedMenu] = useState("Início");

  const handleMenuClick = useCallback((title: string) => {
    setSelectedMenu(title);
  }, []);

  const [statementsList, setStatementsList] = useState<StatementType[]>([
    {
      type: "Transferência",
      date: new Date("2024-01-09"),
      moneyValue: -150,
    },
    {
      type: "Depósito",
      date: new Date("2024-01-21"),
      moneyValue: 1501,
    },
    {
      type: "Depósito",
      date: new Date("2024-02-17"),
      moneyValue: 1502,
    },
    {
      type: "Depósito",
      date: new Date("2024-03-15"),
      moneyValue: 1503,
    },
    {
      type: "Depósito",
      date: new Date("2024-03-13"),
      moneyValue: 1504,
    },
  ]);

  const addStatement = useCallback(
    (statement: Omit<StatementType, "date"> & { date?: Date }) => {
      setStatementsList((prev) => [
        { ...statement, date: statement.date || new Date() },
        ...prev,
      ]);
    },
    []
  );

  const deleteStatement = useCallback((statement: StatementType) => {
    setStatementsList((prev) =>
      prev.filter(
        (s) =>
          !(
            s.type === statement.type &&
            s.moneyValue === statement.moneyValue &&
            s.date.getTime() === statement.date.getTime()
          )
      )
    );
  }, []);

  const menuItems = useMemo(
    () => [
      {
        title: "Início",
        route: "/inicio",
        selected: selectedMenu === "Início",
      },
      {
        title: "Transferências",
        route: "/inicio",
        selected: selectedMenu === "Transferências",
      },
      {
        title: "Investimentos",
        route: "/inicio",
        selected: selectedMenu === "Investimentos",
      },
      {
        title: "Outros serviços",
        route: "/home",
        selected: selectedMenu === "Outros serviços",
      },
    ],
    [selectedMenu]
  );

  const mainContent = useMemo(() => {
    switch (selectedMenu) {
      case "Investimentos":
        return <Investments />;
      case "Outros serviços":
        return <OtherServices />;
      default:
        return <NewTransaction addStatement={addStatement} />;
    }
  }, [selectedMenu, addStatement]);

  const renderMiddleContent = useCallback(() => {
    return (
      <div
        id="middleContentContainer"
        className={styles.middleContentContainer}
      >
        <Summary username={user.name} money={user.money} />
        {mainContent}
      </div>
    );
  }, [mainContent, user.name, user.money]);

  return (
    <div id="mainContainer" className={styles.flexColumnCenterContainer}>
      <Header items={menuItems} onMenuClick={handleMenuClick} />
      <div id="mainContentContainer" className={styles.mainContentContainer}>
        <Menu items={menuItems} onMenuClick={handleMenuClick} />
        {renderMiddleContent()}
        <Statement
          statementsList={statementsList}
          deleteStatement={deleteStatement}
        />
      </div>
    </div>
  );
}
