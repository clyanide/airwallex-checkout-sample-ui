import React from 'react';
import styles from './ContinueButton.module.scss';
import { ReactComponent as RightChevronIcon } from '../../../assets/svg/right-chevron.svg';

interface IProps {
  onClick: React.MouseEventHandler;
  disabled: boolean;
  label: string;
}
const ContinueButton = ({
  onClick, disabled, label,
}:IProps) => (
  <button type="button" onClick={disabled ? () => { console.log('Button disabled'); } : onClick} className={disabled ? styles.inactive : styles.active}>
    <div />
    <div className={styles.label}>
      <p>
        {label}
      </p>
    </div>
    <div className={styles.icon}>
      <RightChevronIcon />
    </div>
  </button>
);
export default ContinueButton;
