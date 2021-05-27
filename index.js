const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminJPEGRecompress = require("imagemin-jpeg-recompress");
const imageminPngquant = require("imagemin-pngquant");
const imageminZopfli = require("imagemin-zopfli");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminSvgo = require("imagemin-svgo");
const { extendDefaultPlugins } = require("svgo");
const c = require("ansi-colors");

console.log("-----------------------");
console.log(c.bgBlue.white("Optimizing in process... Please wait 😃"));
console.log("-----------------------");
(async () => {
  await imagemin(["src/**/*.{jpg,jpeg,png,gif,svg}"], {
    destination: "optimized",
    plugins: [
      //--------------
      // For PNG
      //--------------
      imageminPngquant({
        speed: 4,
        quality: [0.9, 1],
      }),
      //--------------
      // For PNG also, this works together with above method like a layer step
      //--------------
      imageminZopfli({ more: true }),

      //--------------
      // For JPG + JPEG
      //--------------
      imageminMozjpeg({ quality: 70 }),
      /**
       *
       * * Sometimes imageminMozjpeg() make your image become larger because it has a bug
       * * In that case, comment it out and uncomment imageminJPEGRecompress() below and use this instead.
       *
       */
      // imageminJPEGRecompress({ target: 0.7 }),

      //--------------
      // For GIF
      //--------------
      imageminGifsicle({ optimizationLevel: 1 }),

      //--------------
      // For SVG
      //--------------
      imageminSvgo({
        plugins: extendDefaultPlugins([
          { name: "removeViewBox", active: false },
          { name: "removeUnusedNS", active: false },
          { name: "removeUselessStrokeAndFill", active: false },
          { name: "cleanupIDs", active: false },
          { name: "removeComments", active: true },
          { name: "removeEmptyAttrs", active: true },
          { name: "removeEmptyText", active: true },
          { name: "collapseGroups", active: true },
        ]),
      }),
    ],
  });
  console.log(c.bgGreen.white("🎉 Done!!! ✅ Your Images Is Optimized. 😎"));
})();
