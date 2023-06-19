import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link';
import styles from '../../styles/homepage.module.css';
import { Grid, Box } from '@mui/material';
import { genreList } from '../../contants'
import Image from 'next/image'

const HomeGenres = () => {
   return (
      <Fragment>
         <div className="body-container">
            <div className="movies-container">
               <div className={styles.typeOfMoviesHeader}>
                  <div>GENRES</div>
               </div>
               <Box sx={{padding: '0px', margin:' 0px -10px'}}>
                  <Grid container >
                     {genreList.map((genre, index) => {
                        return (
                           <Grid item xs={6} sm={4} md={3} xl={2} style={{ padding: "0px 10px" }} key={index}>
                              <Link href="">
                                 <div className={styles.genresBox}>
                                    <Image src={genre.genre_path || ""} alt="" width={100} height={100}/>
                                    <p>{genre.genre_name}</p>
                                 </div>
                              </Link>
                           </Grid>
                        );
                     })}
                  </Grid>
               </Box>
            </div>
         </div>
      </Fragment>
   );
};
export default HomeGenres;
