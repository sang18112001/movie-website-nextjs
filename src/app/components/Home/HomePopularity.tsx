import React, { Fragment, useEffect, useState } from 'react'
import { getAPI } from '../../api/movieAPI';
import Link from 'next/link';
import { IMovieDetail } from '../../utils/types';
import clsx from 'clsx'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../../styles/homepage.module.css';
import { FaRegPlayCircle } from "@react-icons/all-files/fa/FaRegPlayCircle";
import { IMG_PATH } from '../../config';
import Image from 'next/image'

interface PopularitySliderProps {
   popularity: any[];
   setImagePath: (path: string) => void;
   setIndexMovie: (index: number) => void;
}

const PopularitySlider = ({ popularity, setImagePath, setIndexMovie }: PopularitySliderProps): JSX.Element => {
   const [card, setCard] = useState<number>(0);
   const settings = {
      dots: false,
      slidesToShow: 2,
      slidesToScroll: 2,
   };

   return (
      <div className={styles.movieSlider}>
         <Slider {...settings}>
            {popularity.map((movie, index) => {
               return (
                  <div key={index} className={styles.sliderItem} onClick={() => setImagePath(IMG_PATH + movie.backdrop_path)}>
                     <Image
                        className={card === index ? '' : styles.opacityImage}
                        src={IMG_PATH + movie.poster_path || ""}
                        alt=""
                        onClick={() => {
                           setCard(index);
                           setIndexMovie(index);
                        }}
                        width={100}
                        height={250}
                     />
                  </div>
               );
            })}
         </Slider>
      </div>
   );
};

const HomePopularity = (): JSX.Element => {
   const [popularity, setPopularity] = useState<IMovieDetail[]>([]);
   const [imagePath, setImagePath] = useState<string>('');
   const [indexMovie, setIndexMovie] = useState<number>(0);
   useEffect(() => {
      getAPI.moviesDisplay('popularity').then((data: any) => {
         setPopularity(data.results);
         setImagePath(IMG_PATH + data.results[0].backdrop_path);
      });
   }, []);
   return (
      <Fragment>
         <div className={clsx(styles.bodyContainer, styles.popularity)}>
            <div className={clsx(styles.moviesContainer, styles.first)}>
               <PopularitySlider popularity={popularity} setImagePath={setImagePath} setIndexMovie={setIndexMovie} />
               <div className={styles.mainMovies}>
                  <Image src={imagePath || ""} alt="" fill/>
                  {popularity[indexMovie] && (
                     <div className={styles.movie}>
                        <div className={styles.movieMain}>
                           <h2>{popularity[indexMovie].original_title}</h2>
                           <div className={styles.movieYearVote}>
                              <span className={styles.year}>{popularity[indexMovie].release_date}</span>
                              <span className={styles.vote}>{popularity[indexMovie].vote_average}</span>
                           </div>
                           <div className={styles.movieDetail}>
                              <Link href="">
                                 <button className="btn-me">
                                    <FaRegPlayCircle />
                                    <span>Watch Now</span>
                                 </button>
                              </Link>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default HomePopularity;