import React, { useEffect, useState } from 'react';
import TypeMoviesDisplay from './TypeMoviesDisplay';
import { Pagination } from '@mui/material';
import { getAPI } from '../../api/movieAPI';
import styles from '../../styles/type.module.css';
import { ISearchParams } from '../../utils/types';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface getParams {
  type: string;
  searchParams: ISearchParams;
}
const TypeMoviesContainer = ({ type, searchParams }: getParams) => {
  const pathName = usePathname();
  const router = useRouter();
  const { genre, language, year, page } = searchParams;
  const [listMovies, setListMovies] = useState<[]>([]);
  const [countPage, setCountPage] = useState(0);
  const setData = (data: any) => {
    setListMovies(data.results);
    setCountPage(data.total_pages);
  };
  useEffect(() => {
    getAPI.moviesDisplay(type).then((data) => setData(data));
  }, [type]);
  useEffect(() => {
    getAPI.moviesDisplay(type, page, genre, language, year).then((data) => setData(data));
  }, [type, genre, language, year, page]);
  return (
    <>
      <div className={styles.movieContainer}>
        <TypeMoviesDisplay listMovies={listMovies} />
      </div>
      <div className={styles.buttonPages}>
        <Pagination
          count={countPage < 200 ? countPage : 200}
          variant="outlined"
          shape="rounded"
          boundaryCount={2}
          siblingCount={1}
          page={page ? Number(page) : 1}
          onChange={(e, value) =>
            router.push(`${pathName}?genre=${genre || ''}&language=${language || ''}&year=${year || ''}&page=${value}`)
          }
        />
      </div>
    </>
  );
};

export default TypeMoviesContainer;
