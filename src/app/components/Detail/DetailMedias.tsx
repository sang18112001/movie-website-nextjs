import React, { useEffect, useRef, useState } from 'react';
import { IMG_PATH } from '../../config';
import Image from 'next/image';
import { IMedias } from '../../utils/types';
import { getAPI } from '../../api/movieAPI';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/detail.module.css';
interface MediaProps {
  mediaRef: string;
  medias: IMedias;
}

const ShowMedias = ({ mediaRef, medias }: MediaProps) => {
  const { backdrops, posters } = medias;
  const getMedias = mediaRef === 'backdrops' ? backdrops : posters;
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    arrows: false,
    slidesToShow: mediaRef === 'backdrops' ? 2 : 5,
    slidesToScroll: 3,
  };
  const numMedias = getMedias.length < 20 ? getMedias.length : 20;
  return (
    <div>
      <Slider {...settings}>
        {getMedias.slice(0, numMedias).map((media, index) => (
          <div className={styles.imageContainer} key={index}>
            <Image
              alt=""
              src={IMG_PATH + media.file_path || ""}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const DetailMedias = ({ id }: { id: string }) => {
  const [medias, setMedias] = useState<IMedias>({ backdrops: [], posters: [] });
  useEffect(() => {
    getAPI.movieDetail(id, '/images').then((data) => setMedias(data));
  }, [id]);
  const [mediaRef, setMediaRef] = useState<string>('backdrops');
  const backdropsRef = useRef<HTMLDivElement>(null);
  const postersRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (backdropsRef.current && postersRef.current) {
      backdropsRef.current.addEventListener('click', () => {
        if (backdropsRef.current && postersRef.current) {
          setMediaRef(backdropsRef.current.id);
          backdropsRef.current.classList.add('active-media');
          postersRef.current.classList.remove('active-media');
        }
      });
      postersRef.current.addEventListener('click', () => {
        if (backdropsRef.current && postersRef.current) {
          setMediaRef(postersRef.current.id);
          backdropsRef.current.classList.remove('active-media');
          postersRef.current.classList.add('active-media');
        }
      });
    }
  }, []);
  return (
    <div style={{ marginTop: '20px', borderBottom: '1px solid #eee' }}>
      <ul className={styles.media}>
        <li className={styles.title}>
          <h4 className={styles.contentTitle}>Media</h4>
        </li>
        <li className="">
          <p id="backdrops" className={`active-media ${styles.buttonMedia}`} ref={backdropsRef}>
            Backdrops
          </p>
        </li>
        <li className="">
          <p id="media" className={styles.buttonMedia} ref={postersRef}>
            Posters
          </p>
        </li>
      </ul>
      <div className={styles.mediaBox}>
        <div className="media-content">
          <div className={`${styles.subMedia} ${mediaRef} active-block`}>
            <ShowMedias mediaRef={mediaRef} medias={medias} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMedias;
