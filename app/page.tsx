import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: lessons, error } = await supabase.from("lesson").select("*");

  if (error) console.error(error);

  return (
    <main className="w-full max-w-3xl mx-auto my-16 px-2">
      {lessons?.map((lesson) => (
        <Link href={`/${lesson.id}/`} key={lesson.id}>
          {lesson.title}
        </Link>
      ))}
    </main>
  );
}
