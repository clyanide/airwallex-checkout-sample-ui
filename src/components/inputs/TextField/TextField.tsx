/* eslint-disable react/require-default-props */
import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import styles from './TextField.module.scss';

interface IProps {
  id: string;
  error: boolean;
  errorMessage: string;
  label: string;
  mountable: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const TextField = ({
  id, error, errorMessage, label, mountable, value, onChange,
}: IProps) => (

  <div>
    {mountable
      ? (
        <div>
          <div className={styles.label}>{label}</div>
          <div id={id} className={!error ? styles.input : styles.invalid} />
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div>
          <div className={styles.label}>{label}</div>
          <input
            id={id}
            value={value}
            onChange={onChange}
            className={!error ? styles.input : styles.invalid}
          />
          <p>{errorMessage}</p>
        </div>
      )}
  </div>
);

export default TextField;
