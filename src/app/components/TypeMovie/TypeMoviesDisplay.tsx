'use client';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { IMG_PATH, NON_IMAGE } from '../../config';
import Link from 'next/link';
import { IMovieDetail, ItemWishlist } from '../../utils/types';
import styles from '../../styles/type.module.css';
import { FaPlay } from '@react-icons/all-files/fa/FaPlay';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { getUser, getWishlist } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import 'firebase/compat/firestore';

import { addToWishlist, removeFromWishlist } from '@/app/redux/wishlistSlice';
const TypeMoviesDisplay = ({ listMovies }: { listMovies: [] }) => {
  const dispatch = useDispatch();
  const wishlistState = useSelector(getWishlist);
  const wishlistArray = wishlistState.items || [];
  const userState = useSelector(getUser);
  const userId = String(userState?.uid);
  const wishlistId = userId ? wishlistArray.map((item) => item.id) : [];
  const toggleWishlist = (e: any, id: string, path: string) => {
    if (userState.uid) {
      wishlistId.includes(id)
        ? dispatch(removeFromWishlist({ id, userId }))
        : dispatch(addToWishlist({ id, userId, path }));
    } else {
      alert('You have to sign in');
    }
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container>
        {listMovies.map((movie: IMovieDetail, index) => (
          <Grid item xs={6} sm={4} md={3} key={index} sx={{ padding: '0px 5px !important' }}>
            <div
              className={styles.bodyCard}
              style={{ backgroundImage: `url(${IMG_PATH + movie.poster_path || NON_IMAGE} ` }}
            >
              <Link href={`pages/detail/${movie.id}`}>
                <button className={styles.cardPlay}>
                  <FaPlay />
                </button>
              </Link>
              <AiFillHeart
                className={`${styles.addWishList} ${wishlistId.includes(String(movie.id)) ? 'active-wishList' : ''}`}
                onClick={(e) => toggleWishlist(e, String(movie.id), movie.poster_path)}
              />
              <div className={styles.cardShadow}></div>
              <div className={styles.cardContent}>
                <div className={styles.voteBox}>
                  <svg viewBox="0 0 36 36" className={styles.circularChart}>
                    <path
                      className="circle"
                      strokeDasharray={`${Math.round(movie.vote_average * 10)}, 100`}
                      d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <p>{movie.vote_average}</p>
                </div>
                <div className={styles.contentYear}>{movie.release_date && movie.release_date.slice(0, 4)}</div>
                <div className={styles.contentName}>{movie.original_title}</div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TypeMoviesDisplay;
