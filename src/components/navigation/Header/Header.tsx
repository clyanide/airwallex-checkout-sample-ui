import React from 'react';
import styles from './Header.module.scss';
import { ReactComponent as MenuIcon } from '../../../assets/svg/menu.svg';
import logo from '../../../assets/logo.png';

const Header = () => (
  <div className={styles.header}>
    <img src={logo} alt="ShoesForYou" className={styles.logo} />
    <div><MenuIcon /></div>
  </div>
);

export default Header;
