This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run this project locally clone first the project:

```bash
git clone https://github.com/cx559824/undetectable-ai.git
```

Go (cd) into the project:

```bash
cd undetectable-ai
```

Then run, npm install:

```bash
npm install
```

Create a .env file in the project root and add the following:

```bash
# This project uses Supabase so go to Supabase and create your database to have your credentials
DATABASE_URL="postgres://postgres.<PROJECT-ID>:<PASSWORD>@<LOCATION>:6543/postgres?pgbouncer=true"
# Direct connection to the database. Used for migrations.
# The DIRECT_URL will also be from Supabase
DIRECT_URL=

# Generate a random string. This is needed for the auth flow
# just type in the terminal "openssl rand -hex 32" then paste it here
AUTH_SECRET=

# For GitHub and Google OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Undetectable AI API key
UNDETECTABLE_AI_API_KEY=

# Your live domain
NEXT_PUBLIC_APP_URL=

RESEND_API_KEY=
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.
