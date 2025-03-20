import { ReactNode } from 'react';
import style from './index.module.css';
import SearchableLayout from './componenets/searchable-layout';
import BookItem from './componenets/book-item';
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';
import Head from 'next/head';

export const getStaticProps = async () => {
  const [allbooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allbooks,
      recoBooks,
    },
    // revalidate: 3, //3초마다 업데이트
  };
};

export default function Home({
  allbooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요."
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book}></BookItem>
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allbooks.map((book) => (
            <BookItem key={book.id} {...book}></BookItem>
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
