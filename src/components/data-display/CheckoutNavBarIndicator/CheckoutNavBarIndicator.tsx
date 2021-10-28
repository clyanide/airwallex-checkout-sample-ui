import React from 'react';
import { ReactComponent as DoneIcon } from '../../../assets/svg/done.svg';
import { ReactComponent as OneActiveIcon } from '../../../assets/svg/one-active.svg';
import { ReactComponent as OneInactiveIcon } from '../../../assets/svg/one-inactive.svg';
import { ReactComponent as TwoActiveIcon } from '../../../assets/svg/two-active.svg';
import { ReactComponent as TwoInactiveIcon } from '../../../assets/svg/two-inactive.svg';
import { ReactComponent as ThreeActiveIcon } from '../../../assets/svg/three-active.svg';
import { ReactComponent as ThreeInactiveIcon } from '../../../assets/svg/three-inactive.svg';
import styles from './CheckoutNavBarButton.module.scss';

const ACTIVE_ICONS = {
  one: <OneActiveIcon />,
  two: <TwoActiveIcon />,
  three: <ThreeActiveIcon />,
};

const INACTIVE_ICONS = {
  one: <OneInactiveIcon />,
  two: <TwoInactiveIcon />,
  three: <ThreeInactiveIcon />,
};

const CheckoutNavBarButton = ({
  done, iconNumber, active, caption,
}: any) => {
  const resolveIcon = () => {
    if (done) {
      return <DoneIcon />;
    }

    const iconDict = active ? ACTIVE_ICONS : INACTIVE_ICONS;
    switch (iconNumber) {
      case 1:
        return iconDict.one;
      case 2:
        return iconDict.two;
      case 3:
        return iconDict.three;
      default:
        break;
    }

    return undefined;
  };

  return (
    <div className={active ? styles.active : styles.inactive}>
      {resolveIcon()}
      <p>{caption}</p>
    </div>
  );
};

export default CheckoutNavBarButton;
