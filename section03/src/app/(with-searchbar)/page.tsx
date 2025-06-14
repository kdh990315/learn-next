import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";

// export const dynamic = "force-static";
// 특정 페이지의 유형을 강제로 static 및 dynamic으로 설정
// 1. auto: 기본값, 아무것도 강제하지 않음.
// 2. force-static: 페이지를 강제로 static으로 설정
// 3. force-dynamic: 페이지를 강제로 dynamic으로 설정
// 4. error: 페이지를 강제로 static으로 설정하지만 static으로 렌더링하던 중 오류가 발생한다면
// 빌드타임에 오류를 반환한다.

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    {
      next: { revalidate: 3 },
    }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book}></BookItem>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks></RecoBooks>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
