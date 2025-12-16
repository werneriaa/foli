# Föli Pysäkkiopas

Real-time bus stop information for Turku, Finland using Föli's open data.

**Live version:** [foli.werneri.com](https://foli.werneri.com)


## How to use

First run command to install all packages

```bash
npm install
```

To start development run command

```bash
npm run dev
```

If you are using Visual Studio Code, you can you use Run and Debug.
In file launch.json you can edit configurations

## Docker

Build and run with Docker:

```bash
docker build -t foli .
docker run -p 3000:3000 foli
```

# Tests

Run tests with command

```bash
npx playwright test
```

When you are running tests make sure that your local development enviroment is running at port 3000

# Feature considerations

- Translations
- Map which shows the location of the stop
- Unit tests and integration
- More E2E tests
- Add GitHub actions CI/CD
