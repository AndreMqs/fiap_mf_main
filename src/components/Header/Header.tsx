import { useState } from 'react';
import cn from 'classnames';

import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Avatar from "../../images/Avatar.svg";
import Fechar from "../../images/Fechar.svg";

import { HeaderProps } from "../../types/header";

import { useUser } from "../../hooks/useParentApp";

import styles from "./Header.module.scss"


export default function Header(props: HeaderProps) {
  const {items, onMenuClick} = props;
  const { getUserName } = useUser();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onMenuClick(title);
    setIsMenuOpen(false);
  };

  const renderDesktopHeader = () => {
    return (
      <span className={styles.userNameContainer}>
        <span className={styles.userName}>{getUserName()}</span>
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
              onClick={(e) => handleMenuClick(item.title, e)}
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
    <header id='appHeader' className={styles.header}>
      <div className={styles.headerGrid}>
        {getHeader()}
      </div>
      {isMenuOpen && renderMobileMenu()}
    </header>
  );
}

