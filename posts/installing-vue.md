# Installing Vue

First step in creating a Vue application is to make sure you have an updated version of Node.js. Next run the following command:

```
npm init vue@latest
```

The command installs and executes `create-vue` which is the official Vue project scaffolding tool. You will be provided with optional features which are:

```
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

Next is changing into the project folder and serving the server:
```
cd <your-project-name>
npm install
npm run dev
```

For more information on Vue installation, look at the [official documentation](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)