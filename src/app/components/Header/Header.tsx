'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import styles from '../../styles/header.module.css';
import HeaderSearch from './HeaderSearch';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/store';
import HeaderLogBox from './HeaderLogBox';
import HeaderLoggedBox from './HeaderLoggedBox';
import HeaderNavBar from './HeaderNavBar';

const Header = () => {
  const [shadow, setShadow] = useState(false);
  const userState = useSelector(getUser);
  const { uid } = userState;
  const isBrowser = () => typeof window !== 'undefined';
  if (isBrowser()) window.addEventListener('scroll', () => (window.scrollY > 0 ? setShadow(true) : setShadow(false)));
  return (
    <header className={`${styles.headerWeb} ${shadow ? 'shadow' : ''}`}>
      <div id={styles.menuIcon}>
        <div className="bar1 bar"></div>
        <div className="bar2 bar"></div>
        <div className="bar3 bar"></div>
      </div>
      <Link href="/">
        <span className={styles.webLogo}>
          <Image src={logo || ''} alt="" width={100} height={50} />
        </span>
      </Link>
      <ul className={styles.headerNavbar}>
        <HeaderSearch />
        <HeaderNavBar />
      </ul>
      {uid ? <HeaderLoggedBox /> : <HeaderLogBox />}
    </header>
  );
};

export default Header;
