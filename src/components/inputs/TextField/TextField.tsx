import React from 'react';
import styles from './TextField.module.scss';

interface IProps {
  id: string;
  error: boolean;
  errorMessage: string;
  label: string;
}

const TextField = ({
  id, error, errorMessage, label,
}: IProps) => (
  <div>
    <div className={styles.label}>{label}</div>
    <div id={id} className={!error ? styles.input : styles.invalid} />
    <p>{errorMessage}</p>
  </div>
);

export default TextField;
