'use client';
import TypeMoviesContainer from '@/app/components/TypeMovie/TypeMoviesContainer';
import TypeMoviesHeader from '@/app/components/TypeMovie/TypeMoviesHeader';
import styles from '../../../styles/type.module.css';
import { ISearchParams } from '@/app/utils/types';

interface IPageParams {
  params: {
    id: string;
  }
  searchParams : ISearchParams
}
export default function Page({ params, searchParams }: IPageParams) {
  return (
    <div id={styles.webTypeBody}>
      <TypeMoviesHeader type={params.id} />
      <TypeMoviesContainer type={params.id} searchParams={searchParams} />
    </div>
  );
}
