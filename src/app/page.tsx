'use client'
import HomeTopRated from './components/Home/HomeTopRated';
import HomePopularity from './components/Home/HomePopularity';
import HomeGridMovie from './components/Home/HomeGridMovie';

export default function Page() {
  return (
    <div style={{marginBottom: '30px'}}>
      <HomePopularity />
      <HomeTopRated />
      <HomeGridMovie grid={'now_playing'}/>
      <HomeGridMovie grid={'up_coming'}/>
    </div>
  );
}
  