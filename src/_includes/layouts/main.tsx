// Read this to learn about the TS types Lume exposes:
// https://lume.land/docs/configuration/using-typescript/

// Taken from: https://lume.land/plugins/jsx/#creating-layouts
export default ({ title, children }: Lume.Data, helpers: Lume.Helpers) => (
  <>
    {{ __html: "<!doctype html>" }}
    <html>
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="assets/Logo_background.svg" />
        <link rel="stylesheet" href="/fonts.css" />
        <link rel="stylesheet" href="/style.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>StudSec{title ? ` — ${title}` : ""}</title>
      </head>

      <body>
        {children}
      </body>
    </html>
  </>
);
