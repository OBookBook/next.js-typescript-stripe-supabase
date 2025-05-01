import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient({ cookies });
const getDetailLesson = async (id: number) => {
  const { data: lesson, error } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return lesson;
};

const LessonDetailPage = async ({ params }: { params: { id: number } }) => {
  const lesson = await getDetailLesson(params.id);
  console.log(lesson);

  return <div>page</div>;
};

export default LessonDetailPage;
