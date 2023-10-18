# Block Schema App 


### You can view live demo [here](https://olegsyng.github.io/block-schema/)


## Task Description

Please complete the test task by recreating the behaviour shown on the video below.

[![Watch the video](https://img.youtube.com/vi/tFpBmtBv98U/maxresdefault.jpg)](https://youtu.be/tFpBmtBv98U)

Complete the task in pure TYPESCRIPT with high attention to detail. You may obviously use HTML, CSS, SCSS. You may use REACT, but do not use any third-party packages/plugins.

You are required to recreate what you see on the video exactly as it is, being creative and adding something of your own will make you standout from other candidates.

This task is purely to test your abilities and has no direct relation to our project. Ideally the task shouldn't take you longer than a few hours of non-stop coding, however, you have two to three days to complete the test task and submit it via a GitHub repo and send the link. It will be a great advantage for you if you can deploy the test task on a free hosting service (such as Versel, GitHub Pages, etc.)



## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
