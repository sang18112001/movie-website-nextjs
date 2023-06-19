'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/dashboard.module.css';
import Account from '@/app/components/Dashboard/Account';
import Wishlist from '@/app/components/Dashboard/Wishlist';
import { AiOutlineLogout } from '@react-icons/all-files/ai/AiOutlineLogout';
import { FaUserCircle } from '@react-icons/all-files/fa/FaUserCircle';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { useSelector } from 'react-redux';
import { getUser } from '@/app/redux/store';
import { PageProps } from '@/app/utils/types';
const Page = ({ params }: PageProps) => {
  const query: string = params.id;
  const checkQuery = query === 'account';
  const userState = useSelector(getUser);
  return (
    <div id={styles.webBodyDashboard}>
      <div className={styles.dashboardMain}>
        <div className={styles.dashboardHeader}>
          <div className={styles.dashboardInfo}>
            <div>
              <Image
                alt=""
                src={userState.avatar || ""}
                className="account_avt"
                width={50}
                height={50}
                style={{ borderRadius: '50%' }}
              />
            </div>
            <h2 className="account_name">{userState.name}</h2>
          </div>
          <div className={styles.dashboardMenu}>
            <Link
              href="pages/dashboard/account"
              className={`${styles.dashboardAccount} ${checkQuery && 'active-dashboard'}`}
            >
              <FaUserCircle /> Account
            </Link>
            <Link
              href="pages/dashboard/wishlist"
              className={`${styles.dashboardWishlist} ${!checkQuery && 'active-dashboard'}`}
            >
              <AiFillHeart /> Wishlist
            </Link>
            <Link href="/" className={styles.dashboardLogOut} onClick={() => localStorage.setItem('signUser', '')}>
              <AiOutlineLogout />
              <p>Log out</p>
            </Link>
          </div>
        </div>
        <div className={styles.dashboardBox}>{checkQuery ? <Account /> : <Wishlist />}</div>
      </div>
    </div>
  );
};

export default Page;
