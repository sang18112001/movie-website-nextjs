import React, { Fragment, useEffect, useState } from 'react'
import { getAPI } from '../../api/movieAPI';
import Link from 'next/link';
import { IMovieDetail } from '../../utils/types';
import styles from '../../styles/homepage.module.css';
import { IMG_PATH } from '../../config';
import { Grid, Box } from '@mui/material';
import Image from 'next/image'

const HomeTopRated = () => {
  const [topRated, setTopRated] = useState<IMovieDetail[]>([]);
  useEffect(() => {
    getAPI.moviesDisplay('top_rated').then((data) => setTopRated(data.results));
  }, []);
  return (
    <Fragment>
      <div className="body-container">
        <div className="movies-container">
          <div className={styles.typeOfMoviesHeader}>
            <div>TOP RATED</div>
          </div>
          <Box sx={{ width: '100%' }}>
            <Grid container>
              {topRated.map((movie, index) => {
                if (index <= 7) {
                  return (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <div className={styles.topRatedMain}>
                        <div className={styles.topRatedBox}>
                          <div className={styles.topRatedNum}>{index + 1}</div>
                          <div className={styles.topRatedImg}>
                            <Link href="#">
                              <Image src={IMG_PATH + movie.poster_path || ""} alt="" width={100} height={100}/>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Box>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeTopRated