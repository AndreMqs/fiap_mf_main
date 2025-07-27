import { useState } from 'react';
import cn from 'classnames';

import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Avatar from "../../images/Avatar.svg";
import Fechar from "../../images/Fechar.svg";

import styles from "./Header.module.scss"


export default function Header(props: HeaderProps) {
  const {items, onMenuClick} = props;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (title: string) => {
    onMenuClick(title);
    setIsMenuOpen(false);
  };

  const renderDesktopHeader = () => {
    return (
      <span className={styles.userNameContainer}>
        <span className={styles.userName}>Joana da Silva Oliveira</span>
        <img 
          src={Avatar} 
          alt="Avatar" 
          height={40} 
          width={40}
        />
      </span>
    );
  }

  const renderMobileHeader = () => {
    return (
      <div className={styles.mobileHeaderContainer}>
        <IconButton onClick={() => setIsMenuOpen(true)}>
          <MenuIcon className={styles.menuIcon}/>
        </IconButton>
        <img 
          src={Avatar} 
          alt="Avatar" 
          height={40} 
          width={40}
        />
      </div>
    );
  }

  const renderMobileMenu = () => {
    return (
      <div className={styles.mobileMenuContainer} onClick={() => setIsMenuOpen(false)}>
        <div className={styles.mobileMenu}>
          <span className={styles.closeButton}>
            <img 
              src={Fechar} 
              alt="Fechar" 
              height={16} 
              width={16}
            />
          </span>
          {items.map((item) => (
            <button 
              key={item.title}
              className={cn({[styles.itemSelected]: item.selected}, styles.menuItem)} 
              onClick={() => handleMenuClick(item.title)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const getHeader = () => {
    if (typeof window !== "undefined" && window.screen.width <= 425) {
      return renderMobileHeader();
    }

    return renderDesktopHeader();
  }

  return (
    <div id='header' className={styles.header}>
      <div className={styles.headerGrid}>
        {getHeader()}
      </div>
      {isMenuOpen && renderMobileMenu()}
    </div>
  );
}

interface HeaderProps {
  items: {
    title: string;
    route: string;
    selected: boolean;
  }[];
  onMenuClick: (title: string) => void;
}