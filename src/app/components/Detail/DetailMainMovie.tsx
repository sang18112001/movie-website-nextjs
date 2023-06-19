'use client';
import React, { useEffect, useState } from 'react';
import { ICasts, IMovieDetail } from '../../utils/types';
import { IMG_PATH } from '../../config';
import Link from 'next/link';
import styles from '../../styles/detail.module.css';
import { FaChessQueen } from '@react-icons/all-files/fa/FaChessQueen';
import { FaPlay } from '@react-icons/all-files/fa/FaPlay';
import { getAPI } from '../../api/movieAPI';

const DetailMainMovie = ({ id }: { id: string }): JSX.Element =>  {
  const [movie, setMovie] = useState<IMovieDetail | undefined>();
  const [casts, setCasts] = useState<ICasts>();
  useEffect(() => {
    getAPI.movieDetail(id, '').then((data) => setMovie(data));
    getAPI.movieDetail(id, '/credits').then((data) => setCasts(data));
  }, [id]);
  if (movie && casts?.cast) {
    return (
      <div className={styles.movieContainer}>
        <div className={styles.movieImage} style={{ backgroundImage: `url(${IMG_PATH + movie.backdrop_path})` }}></div>
        <div className={styles.movieContent}>
          <div className={styles.image}>
            <div
              className={styles.contentImg}
              style={{ backgroundImage: `url(${IMG_PATH + movie.poster_path})` }}
            ></div>
          </div>
          <div className={styles.detail}>
            <div className={styles.subTitle}>
              <span className={styles.freeIcon}>
                <FaChessQueen />
              </span>
              <span>Free .</span>
              <span>Feature film .</span>
              <span>{movie.release_date.slice(0, 4)}</span>
            </div>
            <h1>{movie.original_title}</h1>
            <div className={styles.genreName}>
              {movie.genres.map((genre, index) => (
                <p key={index}>{genre.name}</p>
              ))}
            </div>
            <div className="movie-casts">
              <p className={styles.titleCast}>CASTS</p>
              <div className={styles.castsContent}>
                {casts.cast.slice(0, 10).map((cast, index) => (
                  <div className={styles.cast} key={index}>
                    <div
                      className={styles.castAvt}
                      style={{ backgroundImage: `url(${IMG_PATH + cast.profile_path})` }}
                    ></div>
                    <div className={styles.castName}>
                      <p className={styles.originalName}>{cast.original_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Link href={`/pages/watch/${movie.id}`}>
              <button className="btn-me">
                <FaPlay />
                PLAY
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return <></>
};

export default DetailMainMovie;
