import type { APIRoute } from "astro";
import mqc_releases from "../multiqc_releases.json";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function log_call(version: string) {
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
  let remote_version = "";
  const version = new URL(request.url).searchParams.get("v");
  if (!version) {
    remote_version = "no_version";
  } else {
    // If there are any spaces, take the first part (old versions of MultiQC could give the commit hash)
    remote_version = version.split(" ")[0];
    // Collect the dev if it was in the original so that we can append it later
    const dev = version.indexOf("dev") > 0 ? "dev" : "";
    // Strip dev0 so that we don't pick up the 0
    remote_version = remote_version.replace("dev0", "");
    // Remove anything that's not numeric or a decimal
    remote_version = remote_version.replace(/[^\d\.]/g, "");
    // Remove trailing decimal
    remote_version = remote_version.replace(/\\.$/, "");
    // Put back the 'dev' if we had it
    remote_version += dev;
  }
  if (remote_version == "") {
    remote_version = "other";
  }
  log_call(remote_version);
  return new Response(mqc_releases.latest, {
    headers: { "content-type": "text/plain" },
    status: 200,
  });
};
