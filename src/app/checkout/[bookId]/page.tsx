import { findBookById } from "@/services/books";
import { notFound, redirect } from "next/navigation";
import CheckOutPagePageMain from "../PageMain";
import { cookies } from "next/headers";
import { RedirectType } from "next/dist/client/components/redirect";

export interface CheckoutPageProps {
  params: {
    bookId: string;
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) {
      redirect("/", RedirectType.replace);
    }

    const book = await findBookById(params.bookId, jwt.value);
    return <CheckOutPagePageMain book={book} />;
  } catch (error) {
    notFound();
  }
}
