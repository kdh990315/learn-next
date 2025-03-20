import { ReactNode } from 'react';
import style from './index.module.css';
import SearchableLayout from './componenets/searchable-layout';
import BookItem from './componenets/book-item';
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

export const getStaticProps = async () => {
  console.log('인덱스 페이지');

  const [allbooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allbooks,
      recoBooks,
    },
  };
};

export default function Home({
  allbooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
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
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
