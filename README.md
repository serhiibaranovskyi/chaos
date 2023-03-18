# Chaos

- [API](./packages/chaos-api)
- [Web Client](./packages/chaos-web-client)

## Quick Start

- [Set up API](./packages/chaos-api/README.md)
- [Set up Web Client](./packages/chaos-web-client/README.md#getting-started)
- Run `pnpm dev:api`
- Run `pnpm dev:client`
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result 🎉

## Commands

| Command           | Description                                                                    |
| :---------------- | :----------------------------------------------------------------------------- |
| `pnpm dev:api`    | Starts API server in development mode                                          |
| `pnpm dev:client` | Starts Web Client in development mode                                          |
| `pnpm build`      | Executes the `build` command within every package that includes it             |
| `pnpm format`     | Formats sources within every package that contains the `format` command        |
| `pnpm lint`       | Lints sources within every package that contains the `lint` command            |
| `pnpm test`       | Executes the `test` command within every package that includes it              |
| `pnpm test:types` | Runs type-checking within every package that contains the `test:types` command |
