import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Summary from '../Summary/Summary';
import NewTransaction from '../NewTransaction/NewTransaction';
import Statement from '../Statement/Statement';

import styles from "./MainPage.module.scss"


export default function MainPage(props: MainPageProps) {
  const user = {
    name: 'Joana',
    money: 2500,
  };

  const menuItems = [
    {
      title: 'Início',
      route: '/inicio',
      selected: true,
    },
    {
      title: 'Transferências',
      route: '/inicio',
      selected: false,
    },
    {
      title: 'Investimentos',
      route: '/inicio',
      selected: false,
    },
    {
      title: 'Outros serviços',
      route: '/home',
      selected: false,
    },
  ];

  const renderMiddleContent = () => {
    return (
      <div id='middleContentContainer' className={styles.middleContentContainer}>
        <Summary
          username={user.name}
          money={user.money}
        />
        <NewTransaction/>
      </div>
    );
  };

  return (
    <div id='mainContainer' className={styles.flexColumnCenterContainer}>
      <Header items={menuItems}/>
      <div id='mainContentContainer' className={styles.mainContentContainer}>
        <Menu items={menuItems}/>
        {renderMiddleContent()}
        <Statement />
      </div>
    </div>
  );
}

interface MainPageProps {
}