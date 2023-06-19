import { useEffect, useState } from "react";
import { IMG_PATH } from "../../config";
import { Fragment } from "react";
import Link from 'next/link';
import { getAPI } from '../../api/movieAPI';
import { IMovieDetail } from '../../utils/types';
import styles from '../../styles/homepage.module.css';
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight";

const HomeGridMovie = ({ grid }: { grid: string }): JSX.Element => {
   const [gridMovie, setGridMovie] = useState<IMovieDetail[]>([]);
   useEffect(() => {
      getAPI.moviesDisplay(grid).then((data) => setGridMovie(data.results));
   }, [grid]);
   return (
      <Fragment>
         <div className="body-container">
            <div className="movies-container">
               <div className={styles.typeOfMoviesHeader}>
                  <div>NOW PLAYING</div>
                  <Link href="now_playing" id={styles.loadMore}>
                     <button >
                        Show All
                        <FaChevronRight />
                     </button>
                  </Link>
               </div>
               <div className={styles.movieType}>
                  <div>
                     <div className={styles.gridImage}>
                        {gridMovie.map((movie, index) => {
                           if (index <= 11) {
                              return (
                                 <Link href="" key={index}>
                                    <div className={styles.box} style={{ backgroundImage: `url("${IMG_PATH + movie.backdrop_path}")` }}>
                                       <div>{movie.original_title}</div>
                                    </div>
                                 </Link>
                              );
                           }
                        })}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default HomeGridMovie