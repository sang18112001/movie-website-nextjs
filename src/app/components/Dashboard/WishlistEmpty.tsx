import emptyImage from '../../assets/images/wishlistEmpty_1.png';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/dashboard.module.css';
const WishlistEmpty = () => {
  return (
    <div className={styles.wishlistEmptyBox}>
      <div className={styles.wishlistEmptyImage}>
        <Image alt="" src={emptyImage || ""} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className={styles.wishlistEmptyMain}>
        <h3 className={styles.wishlistEmptyTitle}>Oops! Your list is empty!</h3>
        <p className={styles.wishlistEmptyContent}>Looks like you have not added anything to your list yet.</p>
      </div>
      <Link href="/popularity" className={styles.wishlistEmptyBtn}>
        <button>Explore now</button>
      </Link>
    </div>
  );
};

export default WishlistEmpty;
