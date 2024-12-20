export const prerender = false;
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
  const url_base = "https://multiqc.info";
  const html_string = `
  <div class="container wrapper">
    <div class="logo_container">
      <img src="${url_base}/logos/multiqc_logo_darkbg.png" style="width: 800px;" />
    </div>
    <div class="text_container">
      ${args.section ? `<div class="section"><h2>${args.section}</h2></div>` : ""}
      <div class="title"><h1>${title}</h1></div>
    </div>
  </div>
  <style>
    .wrapper {
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
    }
    .logo_container {
      display: flex;
      align-items: center;
      height:40%;
      margin-top: 50px;
      margin-bottom:30px;
    }
    .text_container {
      display: flex;
      flex-direction:column;
      width: 100%;
      align-items: center;
      margin-top:10px;
      margin-bottom: 50px;
      background-color: rgba(0,0,0,0.2);
      border-top: 2px solid #67A3DE66;
      border-bottom: 2px solid #67A3DE66;
    }
    .title {
      display: flex;
      flex-direction:column;
      align-items: center;
      width: 100%;
      padding: 30px 100px;
    }
    .title h1 {
      font-size: 80px;
      font-weight: 500;
      margin: 0;
    }
    .section {
      display: flex;
      flex-direction:column;
      align-items: center;
      width: 100%;
      padding: 30px 100px 0;
      margin-bottom: -10px;
    }
    .section h2 {
      font-size: 40px;
      text-transform: uppercase;
      color: #67A3DE;
      margin: 0;
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
