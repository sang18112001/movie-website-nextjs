'use client'
import HomeTopRated from './components/Home/HomeTopRated';
import HomePopularity from './components/Home/HomePopularity';
import HomeGridMovie from './components/Home/HomeGridMovie';
import HomeGenres from './components/Home/HomeGenres';

export default function Page() {
  return (
    <>
      <HomePopularity />
      <HomeTopRated />
      <HomeGridMovie grid={'now_playing'}/>
      <HomeGridMovie grid={'up_coming'}/>
      {/* <HomeGenres /> */}
    </>
  );
}
  