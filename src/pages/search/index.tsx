import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import SearchableLayout from '../componenets/searchable-layout';
import Books from '@/mock/books.json';
import BookItem from '../componenets/book-item';

export default function Page() {
  return (
    <div>
      {Books.map((book) => (
        <BookItem key={book.id} {...book}></BookItem>
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
