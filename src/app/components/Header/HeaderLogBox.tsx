import clsx from 'clsx';
import React from 'react';
import styles from '../../styles/header.module.css';
import { FaUserCircle } from '@react-icons/all-files/fa/FaUserCircle';
import { FaUserPlus } from '@react-icons/all-files/fa/FaUserPlus';
import Link from 'next/link';


const HeaderLogBox = () => {
  return (
    <div className={clsx(styles.headerAccount, styles.accountLog)}>
      <div className={styles.accountLogLogo}>
        <FaUserCircle />
      </div>
      <div className={styles.accountLogButton}>
        <div className={styles.logBox}>
          <Link href="/pages/userAccount">
            <button className="btn-me">
              <FaUserPlus />
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogBox;
