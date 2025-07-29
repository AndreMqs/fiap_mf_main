import cn from 'classnames';

import styles from "./Menu.module.scss"


export default function Menu(props: MenuProps) {
  const {items, onMenuClick} = props;

  const handleMenuClick = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Menu button clicked:', title);
    onMenuClick(title);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Menu container clicked');
  };

  return (
    <nav 
      id='mainNavigation' 
      className={styles.menuContainer}
      onClick={handleContainerClick}
    >
      {items.map((item) => (
        <button 
          key={item.title}
          className={cn({[styles.itemSelected]: item.selected}, styles.menuItem)} 
          onClick={(e) => handleMenuClick(item.title, e)}
        >
          {item.title}
        </button>
      ))}
    </nav>
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