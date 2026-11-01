This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Backend API

Copy `.env.example` to `.env.local` to configure
`NEXT_PUBLIC_API_URL=http://localhost:5000/api`.
Start the backend from `kk-backend` with `npm run dev`, then restart the frontend
development server so Next.js loads the API URL. Login and registration use the
backend authentication routes; other API routes need to be implemented by the backend
before their frontend features can use them.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## GitHub and deployment

Commit the application source, `public/` assets, `package.json`, `package-lock.json`,
TypeScript/Next.js configuration, `.gitignore`, `.env.example`, and this README.
Do not commit `.env.local` or other real environment files, `.npmrc`, credentials,
`node_modules/`, `.next/`, build output, or TypeScript build caches. `.env.example`
contains only a local API URL; set `NEXT_PUBLIC_API_URL` to your deployed backend
URL in your hosting provider's environment settings. This value is public in the
browser bundle, so never put secrets in `NEXT_PUBLIC_*` variables.

For a clean install and production build, run `npm ci` and `npm run build`.
