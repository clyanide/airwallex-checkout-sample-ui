import React from 'react';
import Cookies from 'universal-cookie';
import styles from './YourDetails.module.scss';

const YourDetails = ({ setDetailsConfirmed }: any) => {
  const cookies = new Cookies();
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
