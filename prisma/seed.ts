import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // テストデータの作成
  const lessons = [
    {
      title: "React入門",
      description: "Reactの基本的な使い方を学びます。",
    },
    {
      title: "TypeScript基礎",
      description: "TypeScriptの基本的な型システムを学びます。",
    },
    {
      title: "Next.js実践",
      description: "Next.jsを使用した実践的なアプリケーション開発を学びます。",
    },
  ];

  // 既存のデータを削除
  await prisma.lesson.deleteMany();

  // テストデータを挿入
  for (const lesson of lessons) {
    await prisma.lesson.create({
      data: lesson,
    });
  }

  console.log("テストデータの作成が完了しました。");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
