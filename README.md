# next.js-typescript-stripe-supabase

- npx create-next-app@14

- supabase

  - RLS
  - supabase CLI
    - Generating TypeScript Types: https://supabase.com/docs/guides/api/rest/generating-types
      - npx supabase login
      - npx supabase gen types typescript --project-id "$PROJECT_REF" > lib/database.types.ts
        - ※ projectID ➡ https://supabase.com/dashboard/project/"$PROJECT_REF"/settings/general

- prsima

  - npx prisma generate
  - npx prisma db push

  - npm run prisma:seed
