import WatchContent from '@/app/components/Watch/WatchContent';
import WatchVideo from '@/app/components/Watch/WatchVideos';
import React from 'react';
import styles from '../../../styles/watch.module.css'
import WatchType from '@/app/components/Watch/WatchType';
interface WatchVideoProps {
  params: {
    id: string;
  };
}
const Page = ({ params }: WatchVideoProps) => {
  return (
    <div id={styles.webWatchingBody}>
      <div className={styles.watchingLeft}>
        <WatchVideo id={params.id} />
        <WatchContent id={params.id} />
        {/* <Comments id={id} /> */}
      </div>
      <div className={styles.watchingRight}>
        <WatchType id={params.id} type={'now_playing'} />
        <WatchType id={params.id} type={'top_rated'} />
      </div>
    </div>
  );
};

export default Page;
