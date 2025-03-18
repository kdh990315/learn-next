import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import style from './[id].module.css';
import fetchOneBook from '@/lib/fetch-one-book';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params!.id;
  const book = await fetchOneBook(+id);
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!book) return '문제가 발생했습니다. 다시 시도해주세요.';

  return (
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
  );
}
