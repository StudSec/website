import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx.ts";
import svgo from "lume/plugins/svgo.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import googleFonts from "lume/plugins/google_fonts.ts";

const site = lume({
  src: "./src",
  dest: "_site",
});

site.use(jsx());

// Optimise and add stylesheets
site.use(lightningCss());
site.add("style.css");

// Optimise SVGs
site.use(svgo());
site.add([".svg"]);

site.use(googleFonts({
  fonts: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Press+Start+2P&display=swap",
}));

site.add([".png", ".jpg"]);

export default site;
