// @ts-ignore: no types
import sharp from "sharp";
// @ts-ignore: no types
import { html } from "satori-html";
import satori, { init as initSatori } from "satori/wasm";
import initYoga from "yoga-wasm-web/asm";
import Logo from "../icons/multiqc_logo_light.svg";
import HeroBackgroundSrc from "/images/background.png";

export const prerender = true;

const YOGA = initYoga();
initSatori(YOGA);

export const get: APIRoute = async ({ params, request }) => {
  const html_string = `<div class="container"
    style="height: 100%; 
        width: 100%; 
        display: flex; 
        flex-direction: column; 
        align-items: flex-start; 
        justify-content: center; 
        font-size: 32px; 
        font-weight: 600;
        background-color: #333;
        color: #F5F5F5;
   "
   >
   <div style="display: flex; flex-direction: column; 
        align-items: center; 
        justify-content: center;  
        height:68%; 
        width:100vw; 
        background-image: url('https://www.toptal.com/designers/subtlepatterns/uploads/congruent_outline.png');">

   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 588 162.32">
   <g transform="scale(2.5)">
  <path fill="#fff" d="M19.66,9.55L30.53,41h0.18l11-31.44H52.86V52.21H44.3V39.49l0.82-18.84-0.18,0L33.52,52.21H27.78L16.41,20.74l-0.18,0,0.82,18.72V52.21H8.5V9.55H19.66Z" transform="translate(-3.53 -6.5)"/><path
    fill="#fff"
    d="M79.52,47.64a10.64,10.64,0,0,1-3.72,3.84,9.92,9.92,0,0,1-5.19,1.35,9.9,9.9,0,0,1-7.84-3.21q-2.83-3.21-2.83-10V20.51h8.53V39.74q0,3.47,1.17,5a4.1,4.1,0,0,0,3.46,1.51,8.51,8.51,0,0,0,3.52-.66,5.93,5.93,0,0,0,2.4-2V20.51h8.55v31.7H80.28Z"
    transform="translate(-3.53 -6.5)"/><path fill="#fff" d="M103,52.21H94.46V6.5H103v45.7Z" transform="translate(-3.53 -6.5)"/><path
    fill="#fff"
    d="M120.21,12.74v7.76h5.33v6h-5.33V42.66a3.73,3.73,0,0,0,.76,2.64,2.71,2.71,0,0,0,2.05.79,7.86,7.86,0,0,0,1.16-.07,10.05,10.05,0,0,0,1.13-.25L126,51.94a17.18,17.18,0,0,1-2.52.66,15.19,15.19,0,0,1-2.67.22q-4.42,0-6.81-2.43t-2.39-7.7V26.51H107v-6h4.63V12.74h8.55Z"
    transform="translate(-3.53 -6.5)"/><path fill="#fff" d="M140,12.92h-8.55V6.5H140v6.42Zm0,39.29h-8.55V20.51H140v31.7Z" transform="translate(-3.53 -6.5)"/><path fill="#fff" d="M167.93,9.55a21.64,21.64,0,1,0,21.64,21.64A21.64,21.64,0,0,0,167.93,9.55Zm0,36.28a14.65,14.65,0,1,1,14.65-14.65A14.65,14.65,0,0,1,167.93,45.84Z" transform="translate(-3.53 -6.5)"/><polygon fill="#fff" points="196.89 58.32 186.14 58.32 176.44 46.58 182.78 41.33 196.89 58.32"/><rect fill="#fff" x="184.35" y="44.73" width="3.48" height="18.63" transform="translate(4.73 124.51) rotate(-39.6)"/><path fill="#fff" d="M217.41,42.17a14.64,14.64,0,1,1-.5-22.39q2.63-2.31,5.35-4.59a21.57,21.57,0,0,0-33.14,5,23.83,23.83,0,0,1,0,22,21.59,21.59,0,0,0,34.18,4C221.33,45,219.37,43.61,217.41,42.17Z" transform="translate(-3.53 -6.5)"/><rect fill="#fff" x="163.27" y="17.6" width="2.27" height="14.17"/><rect fill="#fff" x="157.33" y="23.55" width="14.17" height="2.27"/><polygon fill="#be1622" points="226.6 52.32 194.14 52.32 195.97 54.32 228.26 54.32 226.6 52.32"/><polygon fill="#009640" points="229.91 56.32 197.81 56.32 199.64 58.32 231.57 58.32 229.91 56.32"/><polygon fill="#be1622" points="1.65 54.32 179.83 54.32 178.02 52.32 0 52.32 1.65 54.32"/><path fill="#009640" d="M8.49,64.82H187c-0.16-.15-0.31-0.29-0.46-0.45l-1.4-1.55H6.83Z" transform="translate(-3.53 -6.5)"/><polygon fill="#1d71b8" points="8.27 62.32 234.87 62.32 233.22 60.32 6.62 60.32 8.27 62.32"/>
    </g></svg>

  </div>
  <div style="display:flex; 
        flex-direction: column; 
        align-items: flex-start; 
        margin-left: 5rem;" >
  <h1 style="margin-bottom:0">${params.og
    .replaceAll("-", " ")
    .replace(/\w\S*/g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })}</h1>
    <h2>${args.subtitle ? args.subtitle : ""}</h2>
    </div>

</div>
<style>

  h1 {
    font-size: 48px;
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

const postsImport = import.meta.glob("../../../MultiQC/docs/core/**/*.md");
let posts = Object.values(postsImport).map(async (post) => await post());

export async function getStaticPaths() {
  let params = [];
  for await (const post of posts) {
    if (!post.frontmatter.social_image) {
      params.push({
        params: { og: post.frontmatter.title.toLowerCase().replaceAll(" ", "-") },
        props: { post: post, subtitle: post.frontmatter.subtitle, title: post.frontmatter.title },
      });
    }
  }
  return params;
}