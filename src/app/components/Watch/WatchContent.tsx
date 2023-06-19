'use client';
import { Fragment, useEffect, useState } from 'react';
import { getAPI } from '../../api/movieAPI';
import { IMG_PATH } from '../../config';
import { IMovieDetail } from '../../utils/types';
import styles from '../../styles/watch.module.css';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import { FaRegStar } from '@react-icons/all-files/fa/FaRegStar';
import Image from 'next/image';

const WatchContent = ({ id }: { id: string }): JSX.Element => {
  const [content, setContent] = useState<IMovieDetail>();
  useEffect(() => {
    getAPI.movieDetail(id).then((data) => setContent(data));
  }, [id]);
  const HandleStars = ({ numStars }: { numStars: number }) => {
    const numbersArray = Array.from({ length: 10 }, (_, index) => index);
    return (
      <div className={styles.addStar}>
        {numbersArray.map((numStar, index) =>
          numStar < numStars ? <FaStar key={index} /> : <FaRegStar key={index} />,
        )}
      </div>
    );
  };
  if (content) {
    return (
      <Fragment>
        <div className={styles.watchingContent}>
          <div className={styles.contentImage}>
            <Image
              src={IMG_PATH + content.poster_path || ""}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className={styles.contentMain}>
            <h4 className={styles.contentName}>{content.original_title}</h4>
            <div className={styles.contentMore}>
              <p>{content.release_date}</p>
              <p>{content.runtime} minutes</p>
            </div>
            <div className={styles.contentVote}>
              <div className={styles.voteNumber}>{content.vote_average}</div>
              <div className={styles.voteAdd}>
                <HandleStars numStars={Math.round(content.vote_average)} />
                <p className={styles.addtext}>{content.vote_count} votes</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.watchingOverview}>
          <h4 className={styles.contentTitle}>Overview</h4>
          <p className={styles.overviewText}>{content.overview}</p>
        </div>
      </Fragment>
    );
  }
  return <></>;
};

export default WatchContent;
