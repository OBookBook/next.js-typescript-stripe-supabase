import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { YouTubeEmbed } from "@next/third-parties/google";

const getDetailLesson = async (
  id: number,
  supabase: SupabaseClient<Database>
) => {
  const { data: lesson, error } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return lesson;
};

const getPremiumContent = async (
  id: number,
  supabase: SupabaseClient<Database>
) => {
  const { data: video, error } = await supabase
    .from("premium_content")
    .select("video_url")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return video;
};

// パラメータの型定義を変更
type Params = Promise<{ id: string }>;

const LessonDetailPage = async ({ params }: { params: Params }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  // paramsを待機して取得
  const { id } = await params;

  const [lesson, video] = await Promise.all([
    getDetailLesson(Number(id), supabase),
    getPremiumContent(Number(id), supabase),
  ]);

  const videoId = video?.video_url?.split("v=")[1];

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">{lesson?.title}</h1>
      <p className="mb-8">{lesson?.description}</p>

      <YouTubeEmbed height={400} videoid={videoId ?? ""} />
    </div>
  );
};

export function generateStaticParams() {
  return [];
}

export default LessonDetailPage;
