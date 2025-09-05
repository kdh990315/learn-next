"use server";

import { delay } from "@/util/delay";
import { revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  console.log(bookId, content, author);

  if (!content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요.",
    };
  }

  try {
    await delay(2000);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // revalidatePath(`/book/${bookId}`);
    revalidateTag(`review-${bookId}`);

    return {
      status: true,
      message: "리뷰가 등록되었습니다.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다. ${error}`,
    };
  }
}
