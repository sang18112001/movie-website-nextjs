import React from 'react';
import styles from '../../styles/header.module.css';
import { typeMovies } from '../../contants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderNavBar = () => {
   const pathName = usePathname();

  return (
    <ul className={styles.headerMenu}>
      {typeMovies.map((type, index) => {
        return (
          <li key={index}>
            <Link href={type.path} className={pathName == type.path ? 'active-menu' : ''}>
              {type.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default HeaderNavBar;
