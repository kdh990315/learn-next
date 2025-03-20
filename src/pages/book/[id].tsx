import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css';
import fetchOneBook from '@/lib/fetch-one-book';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    fallback: true,
    //false : 사전 렌더링이 되지 않은 페이지 들어오면 묻지도 따지지도 않고 notfound페이지
    //blocking: SSR 방식으로 실시간으로 페이지 생성(사전 랜더링)
    //true: fallback 상태의 페이지(props 데이터가 없는 상태의 페이지)부터 생성해 보내준다.
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id as string;
  const book = await fetchOneBook(+id);

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
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
        <div>로딩중입니다.</div>
      </>
    );
  }

  if (!book) return '문제가 발생했습니다. 다시 시도해주세요.';

  return (
    <>
      <Head>
        <title>한입북스 - {book.title}</title>
        <meta property="og:image" content={book.coverImgUrl} />
        <meta property="og:title" content={book.title} />
        <meta property="og:description" content={book.description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${book.coverImgUrl}')` }}
        >
          <img src={book.coverImgUrl} />
        </div>
        <div className={style.title}>{book.title}</div>
        <div className={style.subTitle}>{book.subTitle}</div>
        <div className={style.author}>
          {book.author} | {book.publisher}
        </div>

        <div className={style.description}>{book.description}</div>
      </div>
    </>
  );
}
