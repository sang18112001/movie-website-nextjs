import React, { MouseEventHandler } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Image from 'next/image';
import { IMG_PATH } from '@/app/config';
import { FaBookmark } from '@react-icons/all-files/fa/FaBookmark';
import styles from '../../styles/dashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/app/redux/store';
import { removeFromWishlist } from '@/app/redux/wishlistSlice';
import { ItemWishlist } from '../../utils/types';

const WishlistExist = ({ wishlist }: { wishlist: ItemWishlist[] }) => {
  const userState = useSelector(getUser)
  const dispatch = useDispatch();
  const userId = String(userState?.uid);
  const removeWishlist = (id: string) => {
    dispatch(removeFromWishlist({ id, userId }));
  }
  return (
    <>
      <h1 className={styles.wishListHeader}>
        <span style={{ fontSize: '34px' }}>Your favourite</span>
      </h1>
      <Box sx={{ width: '100%' }}>
        <Grid container>
          {wishlist.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <div className={styles.wishListItem}>
                <div className={styles.wishListSubItem}>
                  <FaBookmark className={'active-wishList'} style={{ fontSize: '22px' }} onClick={() => removeWishlist(item.id)}/>
                  <Link href="">
                    <Image
                      alt=""
                      src={IMG_PATH + item.path || ""}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Link>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default WishlistExist;
