import { ReactNode } from 'react';
import style from './index.module.css';
import SearchableLayout from './componenets/searchable-layout';

export default function Home() {
  return (
    <h1 className={style.h1}>인덱스</h1>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}