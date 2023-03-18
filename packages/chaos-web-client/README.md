## Getting Started

- Run `cp '.env.example' '.env'` and fill in the environment variables
- Run the development server:

  ```bash
  pnpm dev
  ```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Commands

| Command           | Description                                                                                                                             |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`        | Runs `next dev` to start [Next.js](https://nextjs.org/) in development mode                                                             |
| `pnpm build`      | Runs `next build` to build the application for production usage                                                                         |
| `pnpm format`     | Formats sources with [Prettier](https://prettier.io/)                                                                                   |
| `pnpm lint`       | Runs `next lint` to set up [Next.js](https://nextjs.org/)' built-in ESLint configuration                                                |
| `pnpm msw:init`   | Generates and places the [Service Worker file](./public/mockServiceWorker.js) into the [public directory](./public) of the application. |
| `pnpm start`      | Runs `next start` to start a [Next.js](https://nextjs.org/) production server                                                           |
| `pnpm test:types` | Runs TypeScript to perform a type-check                                                                                                 |

## Environmental Variables

| Name                       | Required | Default Value | Description                                                                                                                                                                                              |
| :------------------------- | :------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NEXT_PUBLIC_CHAOS_BASE_URL | ✅       | `''`          | Specifies the URL of the Chaos API                                                                                                                                                                       |
| NEXT_PUBLIC_USE_MOCKS      | ❌       | `false`       | This feature enables mocking of the API layer. Once it's enabled (by setting it to true), [MSW](https://mswjs.io/) will start, and all handlers in the [mocks](./src/mocks) directory will be initiated. |
