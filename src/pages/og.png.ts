// @ts-ignore: no types
import sharp from "sharp";
// @ts-ignore: no types
import initYoga from "yoga-wasm-web/asm";
// @ts-ignore: no types
import { html } from "satori-html";
import satori, { init as initSatori } from "satori/wasm";
import HeroBackgroundSrc from "/images/background.png";

const YOGA = initYoga();
initSatori(YOGA);

export const get: APIRoute = async ({ params, request }) => {
  const searchParams = new URL(request.url).searchParams;
  const args = Object.fromEntries(searchParams);
  const html_string = `<div class="container"
    style="height: 100%; 
        width: 100%; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 
        font-size: 32px; 
        font-weight: 600;
        color: #F8F9FA;
        background-image: url("https://www.toptal.com/designers/subtlepatterns/uploads/congruent_outline.png");
   "
   >
  <img src="https://raw.githubusercontent.com/ewels/MultiQC/9b953261d3d684c24eef1827a5ce6718c847a5af/docs/images/MultiQC_logo_darkbg.png" width="489" height="130"/>

  <h1>${args.title}</h1>
</div>
<style>

  h1 {
    margin-top:3rem;
    margin-bottom: 0;
    font-size: 64px;
    font-weight: 500;
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
    "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff"
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
