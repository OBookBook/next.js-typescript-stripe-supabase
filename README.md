# next.js-typescript-stripe-supabase

- npx create-next-app@14

- supabase

  - RLS
  - supabase CLI
    - Generating TypeScript Types: https://supabase.com/docs/guides/api/rest/generating-types
      - npx supabase login
      - npx supabase gen types typescript --project-id "$PROJECT_REF" > lib/database.types.ts
        - ※ projectID ➡ https://supabase.com/dashboard/project/"$PROJECT_REF"/settings/general
  - Supabase Authentication OAuth 認証(GitHub)
    - https://github.com/OBookBook/next.js-typescript-stripe-supabase/issues/1

- prsima

  - npx prisma generate
  - npx prisma db push

  - npm run prisma:seed

- generate 32 byte

  - node -e "console.log(crypto.randomBytes(32).toString('hex'))"

- Error Tips
  - https://github.com/prisma/prisma/discussions/22091
