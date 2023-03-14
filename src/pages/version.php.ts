import type { APIRoute } from "astro";
import mqc_releases from "../multiqc_releases.json";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function log_call(version) {
  console.log(version);

  async function main() {
    // ... you will write your Prisma Client queries here
    console.log("HELLO");
  }

  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

export const get: APIRoute = ({ params, request }) => {
  console.log(params);
  log_call(params);
  return new Response(mqc_releases.latest, {
    headers: { "content-type": "text/plain" },
    status: 200,
  });
};
