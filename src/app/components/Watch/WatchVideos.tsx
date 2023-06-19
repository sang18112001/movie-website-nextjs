'use client'
import { useEffect, useState } from 'react';
import { getAPI } from '../../api/movieAPI';
import styles from '../../styles/watch.module.css';
const WatchVideo = ({ id }: { id: string }): JSX.Element => {
  const [video, setVideo] = useState();
  useEffect(() => {
    getAPI.movieDetail(id, '/videos').then((data) => setVideo(data.results[0]));
  }, [id]);
  if (video) {
    return (
      <div className={styles.watchingVideo}>
        <iframe
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/{video.key}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  return <></>
};

export default WatchVideo;
