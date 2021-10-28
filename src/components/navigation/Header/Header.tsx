import React from 'react';
import styles from './Header.module.scss';
import { ReactComponent as MenuIcon } from '../../../assets/svg/menu.svg';

const Header = () => (
  <div className={styles.header}>
    <h3>ShoesForYou</h3>
    <div><MenuIcon /></div>
  </div>
);

export default Header;
