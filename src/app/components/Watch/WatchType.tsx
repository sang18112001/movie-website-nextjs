'use client';
import { useEffect, useState } from 'react';
import { getAPI } from '../../api/movieAPI';
import styles from '../../styles/watch.module.css';
import Link from 'next/link';
import { IMG_PATH } from '../../config';
import { IMovieDetail } from '../../utils/types';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import Image from 'next/image'

const WatchType = ({ id, type }: { id: string; type: string }) => {
  const newTitleMovie = type.split('_').join(' ').toUpperCase();
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  useEffect(() => {
    getAPI.moviesDisplay('now_playing').then((data) => setMovies(data.results));
  }, []);
  return (
    <div className={styles.watching}>
      <div className={styles.typeTitle}>
        <span>{newTitleMovie}</span>
      </div>
      <div className={styles.typeContent}>
        {movies.map((movie, index) => {
          if (index < 5) {
            return (
              <Link key={index} className={styles.boxContent} href={`/detail/${movie.id}`}>
                <div className={styles.contentImg}>
                  <Image alt="" src={IMG_PATH + movie.poster_path || ""} width={100} height={100} />
                </div>
                <div className={styles.contentPrimary}>
                  <h5 className={styles.mainTitle}>{movie.original_title}</h5>
                  <div className={styles.mainInfo}>
                    <div className={styles.infoVote}>
                      <FaStar/>
                      <span>{movie.vote_average}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default WatchType;
