import cn from 'classnames';

import styles from "./Menu.module.scss"


export default function Menu(props: MenuProps) {
  const {items, onMenuClick} = props;

  return (
    <div id='menu' className={styles.menuContainer}>
      {items.map((item) => (
        <button 
          key={item.title}
          className={cn({[styles.itemSelected]: item.selected}, styles.menuItem)} 
          onClick={() => onMenuClick(item.title)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}

interface MenuProps {
  items: {
    title: string;
    route: string;
    selected: boolean;
  }[];
  onMenuClick: (title: string) => void;
}