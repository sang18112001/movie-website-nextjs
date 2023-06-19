'use client';
import React, { useRef, useState } from 'react';
import styles from '../../styles/userAccount.module.css';
import SignIn from '@/app/components/User/SignIn';
import SignUp from '@/app/components/User/SignUp';
import Image from 'next/image'
const UserAccount = () => {
  const [checkSignBox, setCheckSignBox] = useState<boolean>(true);
  return (
    <div className={styles.webAccountBody}>
      <div className={styles.containerImage}>
        <Image src="https://wallpaper.dog/large/20493446.jpg " alt="" fill/>
      </div>
      <div className={styles.containerSign}>
        <div className={styles.signTitle}>
          <div
            className={`${styles.signInTitle} ${!checkSignBox && 'inactive-sign'} sign-up-to-in`}
            onClick={() => setCheckSignBox(!checkSignBox)}
          >
            Sign in
          </div>
          <div
            className={`${styles.signUpTitle} ${checkSignBox && 'inactive-sign'} sign-in-to-up`}
            onClick={() => setCheckSignBox(!checkSignBox)}
          >
            Sign up
          </div>
        </div>
        {checkSignBox ? <SignIn /> : <SignUp setCheckSignBox={setCheckSignBox} />}
      </div>
    </div>
  );
};

export default UserAccount;
