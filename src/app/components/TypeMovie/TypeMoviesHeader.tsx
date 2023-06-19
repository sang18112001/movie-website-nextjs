'use client';
import React, { useState } from 'react';
import { genreArray, languageArray, yearArray } from '../../contants';
import styles from '../../styles/type.module.css';
import { RiFilter2Fill } from '@react-icons/all-files/ri/RiFilter2Fill';
import { RiFilterOffFill } from '@react-icons/all-files/ri/RiFilterOffFill';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
const TypeMoviesHeader = ({ type }: { type: string }) => {
  const newTitleMovie = type.split('_').join(' ').toUpperCase();
  const pathName = usePathname();
  const router = useRouter();
  const [genre, setGenre] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [year, setYear] = useState<string>('');
  return (
    <div className={styles.moviesBodyHeader}>
      <div className={styles.moviesTitle}>
        <span>{newTitleMovie}</span>
      </div>
      <div className={styles.moviesFilter}>
        <span className={styles.moviesTotal}></span>
        <div className={styles.moviesSelection}>
          <select className="filter" onChange={(e) => setGenre(e.target.value.split('-')[1])}>
            {genreArray.map((genre) => (
              <option key={genre.id} value={`-${genre.id}`}>
                {genre.name}
              </option>
            ))}
          </select>
          <select className="filter" onChange={(e) => setLanguage(e.target.value.split('-')[1])}>
            {languageArray.map((language) => (
              <option key={language.id} value={`-${language.id}`}>
                {language.name}
              </option>
            ))}
          </select>
          <select className="filter" onChange={(e) => setYear(e.target.value.split('-')[1])}>
            {yearArray.map((year) => (
              <option key={year.id} value={`-${year.id}`}>
                {year.name}
              </option>
            ))}
          </select>
          <div className={styles.buttonFilter}>
            <div
              className={styles.filterPerform}
              onClick={() => router.push(`${pathName}?genre=${genre}&language=${language}&year=${year}&page=1`)}
            >
              <RiFilter2Fill />
              <span>Filter</span>
            </div>
            <div className={styles.filterRemove} onClick={() => router.push(`${pathName}`)}>
              <RiFilterOffFill />
              <span>Clear</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeMoviesHeader;
