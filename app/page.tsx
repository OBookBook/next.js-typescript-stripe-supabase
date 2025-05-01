import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"; // cookieを使用すると、SSR になる。※ デフォルトはSSG
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/lib/database.types";

const supabase = createServerComponentClient<Database>({ cookies });
const getAllLessons = async () => {
  const { data: lessons, error } = await supabase.from("lesson").select("*");
  if (error) throw new Error(error.message);

  return lessons;
};

export default async function Home() {
  let lessons;
  try {
    lessons = await getAllLessons();
  } catch (error) {
    console.error(error);
    const errorMessage = (error as Error).message || "エラーが発生しました";

    return <div>エラーが発生しました: {errorMessage}</div>;
  }

  return (
    <main className="w-full max-w-3xl mx-auto my-16 px-2">
      <div className="flex flex-col gap-3">
        {lessons?.map((lesson) => (
          <Link href={`/${lesson.id}/`} key={lesson.id}>
            <Card>
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{lesson.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
