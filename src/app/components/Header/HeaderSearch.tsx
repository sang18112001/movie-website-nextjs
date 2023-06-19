import { useRef, useState } from 'react';
import { IMovieDetail } from '../../utils/types';
import styles from '../../styles/header.module.css';
import Link from 'next/link';
import { IMG_PATH } from '../../config';
import { getAPI } from '../../api/movieAPI';
import Image from 'next/image';

interface ShowSearchBoxProps {
  searchedMovies: IMovieDetail[];
}

const ShowSearchBox = ({ searchedMovies }: ShowSearchBoxProps): JSX.Element => {
  return (
    <ul className={`${styles.headerSearchItems} active-block`}>
      {searchedMovies.length !== 0 ? (
        searchedMovies.map((movie, index) => {
          return (
            <li className={styles.item} key={index}>
              <Link href="">
                <div style={{ position: 'relative', padding: '18%' }}>
                  <Image alt="" src={IMG_PATH + movie.poster_path || ""} width={100} height={100} />
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.itemTitle}>{movie.original_title}</div>
                  <div className={styles.itemId}>ID: {movie.id}</div>
                </div>
              </Link>
            </li>
          );
        })
      ) : (
        <h1>Do not have results</h1>
      )}
    </ul>
  );
};

const HeaderSearch = (): JSX.Element => {
  const searchTag = useRef<HTMLInputElement>(null);
  const [searchedMovies, setSearchedMovies] = useState<IMovieDetail[]>([]);

  const getAPISearch = async (item: string) => {
    getAPI.moviesSearch(item).then((data: any) => setSearchedMovies(data.results));
  };

  return (
    <div className={styles.headerSearch}>
      <input type="text" placeholder="Search" onChange={(e) => getAPISearch(e.target.value)} ref={searchTag} />
      {searchTag.current && searchTag.current.value ? <ShowSearchBox searchedMovies={searchedMovies} /> : null}
    </div>
  );
};

export default HeaderSearch;
