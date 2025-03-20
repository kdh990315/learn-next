import { BookData } from '@/types';

export default async function fetchOneBook(
  id: number,
): Promise<BookData | null> {
  const url = `https://onebite-books-server-main-pi-tawny.vercel.app/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
