# StudSec web prototype

A prototype for the StudSec student cybersecurity association website,
based on the [Lume][lume] static site generator.

[lume]: https://lume.land

## Local development

First, install the [Deno runtime][deno]. Then, run this command:

[deno]: https://deno.land

```shell-session
$ deno task serve
```

Then open http://localhost:3000.

## Production build

```shell-session
$ deno task build
```

The generated files will be placed in the `./_site` directory.

The shop and sign-up form are intentionally front-end prototypes. Connect the form to One and replace the cart state with the chosen commerce provider before launch.


## TODO:

Protect links from bots

Change the emails (leave only one?)

Make pop-ups for the committees

Make easy way to make promo pop ups for calendar events

Link shop to prototype

Link sign-up form to prototype

Add easy way to make picture gallery
