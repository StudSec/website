# StudSec web prototype

A React + Vite prototype for the StudSec student cybersecurity association website

## Local development

```bash
npm install
npm run dev
```

## Production container

```bash
docker build -t studsec-web .
docker run --rm -p 8080:80 studsec-web
```

Then open `http://localhost:8080`.

The shop and sign-up form are intentionally front-end prototypes. Connect the form to One and replace the cart state with the chosen commerce provider before launch.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

We can also see if enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json` does anything.

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
