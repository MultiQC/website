// @ts-ignore: no types
import sharp from "sharp";
// @ts-ignore: no types
import initYoga from "yoga-wasm-web/asm";
// @ts-ignore: no types
import { html } from "satori-html";
import satori, { init as initSatori } from "satori/wasm";

const YOGA = initYoga();
initSatori(YOGA);

export const get: APIRoute = async ({ params, request }) => {
  const searchParams = new URL(request.url).searchParams;
  const args = Object.fromEntries(searchParams);
  const title = args.title ? args.title : "";
  // TODO: Switch to production URL when ready
  const url_base = "https://astro--multiqc.netlify.app";
  const html_string = `
  <div class="container" style="
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-weight: 600;
        color: #F8F9FA;
        background-image: url("${url_base}/images/background.png");
   ">
    <div style="display: flex; justify-content: center; align-items: center; height:40%; margin-top: 50px; margin-bottom:10px;">
      <img src="${url_base}/logos/multiqc_logo_darkbg.png" style="width: 800px;" />
    </div>
    <div style="display: flex; flex-direction:column; justify-content: center; width: 100%; align-items: center; padding: 40px 0; margin-top:10px; margin-bottom: 50px; background-color: rgba(0,0,0,0.2);">
      ${args.section ? `<h2>Documentation: ${args.section}</h2>` : ""}
      <h1>${title}</h1>
    </div>
  </div>
  <style>
    h1 {
      font-size: 80px;
      font-weight: 500;
      text-align: left;
      width: 100%;
      padding-left: 100px;
      margin: 0;
    }
    h2 {
      font-size: 40px;
      text-transform: uppercase;
      color: #67A3DE;
      text-align: left;
      width: 100%;
      padding-left: 100px;
      margin: 0 0 30px 0;
    }
  </style>`;
  const imageOptions = { site: request.url, width: 1200, height: 630, debug: false };
  const jsx = html(html_string);
  const buffer = await generateImage(jsx, imageOptions);

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "max-age=31536000, immutable",
    },
  });
};

type ImageOptions = {
  site: string;
  width: number;
  height: number;
  debug?: boolean;
};

async function generateImage(jsx: any, { width, height, debug }: ImageOptions) {
  const roboto500 = await fetch(
    "https://cdn.jsdelivr.net/npm/@fontsource/roboto/files/roboto-latin-500-normal.woff"
  ).then((res) => res.arrayBuffer());
  const svg = await satori(jsx, {
    debug: debug,
    width: width,
    height: height,
    fonts: [
      {
        name: "Roboto",
        data: roboto500,
        weight: 500,
        style: "normal",
      },
    ],
  });

  return await sharp(Buffer.from(svg)).png().toBuffer();
}
