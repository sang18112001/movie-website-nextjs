'use client';
import DetailMainMovie from '@/app/components/Detail/DetailMainMovie';
import DetailMedias from '@/app/components/Detail/DetailMedias';
import DetailRecommendation from '@/app/components/Detail/DetailRecommendation';
import React from 'react';
import styles from '../../../styles/detail.module.css';
import { PageProps } from '@/app/utils/types';
import Comments from '@/app/components/common/Comments/Comments';

const Page = ({ params, searchParams }: PageProps) => {
  const id: string = params.id;
  return (
    <div>
      <DetailMainMovie id={id} />
      <div className={styles.webBodyDetail}>
        <DetailMedias id={id} />
        <DetailRecommendation id={id} />
        <Comments id={id} />
      </div>
    </div>
  );
};

export default Page;
