import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineLogout } from '@react-icons/all-files/ai/AiOutlineLogout';
import { FaUserCircle } from '@react-icons/all-files/fa/FaUserCircle';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import clsx from 'clsx';
import styles from '../../styles/header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogOut } from '@/app/redux/userSlice';
import { getAuth } from 'firebase/auth';
import { getUser } from '@/app/redux/store';
const HeaderLoggedBox = () => {
  const dispatch = useDispatch();
  const userState = useSelector(getUser)
  const auth = getAuth();
  const signOutHandler = () => {
    auth.signOut().then(() => {
      dispatch(setUserLogOut());
    });
  };
  const [loggedBox, setLoggedBox] = useState(false);
  return (
    <div className={clsx(styles.headerAccount, styles.accountLogged)}>
      <div className={styles.accountLoggedLogo} onClick={() => setLoggedBox(!loggedBox)}>
        <Image src={userState.avatar || ""} alt="" className={styles.loggedIcon} width={50} height={50}/>
      </div>
      <div className={`${styles.accountLoggedButton} ${loggedBox && 'active-block'}`}>
        <div className={styles.loggedBox}>
          <div className={styles.loggedAccount}>
            <div>
              <Image src={userState.avatar || ""} alt="" className={styles.accountAvt} width={50} height={50} />
            </div>
            <h3 className={styles.accountName}>{userState.name}</h3>
          </div>
          <div className={styles.loggedDashboard}>
            <Link href="/pages/dashboard/account" className={styles.account}>
              <FaUserCircle /> My account
            </Link>
            <Link href="/pages/dashboard/wishlist" className={styles.wishList}>
              <AiFillHeart /> Wish list
            </Link>
            <div className="btn-me log-out" onClick={signOutHandler}>
              <AiOutlineLogout />
              <p style={{ fontSize: '18px' }}>Log out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLoggedBox;
