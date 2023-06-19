import React, { useEffect, useState } from 'react';
import { IRecommendations } from '../../utils/types';
import { getAPI } from '../../api/movieAPI';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IMG_PATH } from '../../config';
import Link from 'next/link';
import styles from '../../styles/detail.module.css';

function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return <div className={`${className} rightArrow`} onClick={onClick} />;
}

function SamplePrevArrow(props: any) {
  const { className, onClick } = props;
  return <div className={`${className} leftArrow`} onClick={onClick} />;
}
const DetailRecommendation = ({ id }: { id: string }) => {
  const [recommendation, setRecommendation] = useState<IRecommendations | undefined>();
  useEffect(() => {
    getAPI.movieDetail(id, '/recommendations').then((data) => setRecommendation(data));
  }, [id]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className={styles.movieRecommendation}>
      <h4 className={styles.contentTitle}>Recommendations</h4>
      <div className={styles.recommendMain}>
        <Slider {...settings}>
          {recommendation?.results.map((item, index) => {
            const newImagePath = item.backdrop_path
              ? IMG_PATH + item.backdrop_path
              : 'https://archive.org/download/no-photo-available/no-photo-available.png';
            return (
              <div className={styles.recommendItem} key={index}>
                <Link href={`pages/detail/${item.id}`}>
                  <Image
                    src={newImagePath || ""}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default DetailRecommendation;
