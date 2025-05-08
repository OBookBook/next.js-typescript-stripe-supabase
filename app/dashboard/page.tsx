import { Database } from "@/lib/database.types";
import {
  createServerComponentClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getProfileDate = async (supabase: SupabaseClient<Database>) => {
  const { data: profile } = await supabase.from("profile").select("*").single();

  return profile;
};

const DashboardPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const profile = await getProfileDate(supabase);

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">ユーザー管理ダッシュボード</h1>
      <div>
        {profile?.is_subscribed
          ? `プラン契約中:${profile?.interval}`
          : "プラン加入"}
      </div>
      <button>サブスクリプション管理</button>
    </div>
  );
};

export default DashboardPage;
