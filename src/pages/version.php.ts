import type { APIRoute } from "astro";
import mqc_releases from "../multiqc_releases.json";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function log_call(version: string) {
  async function main() {
    // get last id from db
    const last_id = await prisma.version_check.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    await prisma.version_check.create({
      data: {
        version: version as string,
        date: new Date() as Date,
        id: last_id ? last_id.id + 1 : 1,
      },
    });

    // get monday of the current week
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day == 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff)).toISOString().split("T")[0];
    const row_key = monday + "_" + version;
    // check if row_key is already in db
    const version_check = await prisma.version_check_weekly.findFirst({
      where: {
        row_key: row_key,
      },
    });
    if (version_check) {
      // update
      await prisma.version_check_weekly.update({
        where: {
          row_key: row_key,
        },
        data: {
          num_checks: version_check.num_checks + 1,
        },
      });
    }
    // create
    else {
      await prisma.version_check_weekly.create({
        data: {
          row_key: row_key,
          num_checks: 1,
        },
      });
    }
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
  const version = new URL(request.url).searchParams.get("v");
  log_call(version);
  return new Response(mqc_releases.latest, {
    headers: { "content-type": "text/plain" },
    status: 200,
  });
};
