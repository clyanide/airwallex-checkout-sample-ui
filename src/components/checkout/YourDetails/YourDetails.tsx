import React from 'react';
import styles from './YourDetails.module.scss';

interface IProps {
  setDetailsConfirmed: CallableFunction
}

const YourDetails = ({ setDetailsConfirmed }: IProps) => {
  const handleNextButton = () => {
    setDetailsConfirmed();
  };

  return (
    <div className={styles.body}>
      <div>Imagine you have already entered your details on this page</div>
      <button type="button" onClick={handleNextButton}>
        Next
      </button>
    </div>
  );
};

export default YourDetails;
