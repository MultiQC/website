import type { APIRoute } from "astro";
import mqc_releases from "../multiqc_releases.json";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
// get all version checks
const version_checks = prisma.version_check
  .findMany()
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

async function log_call(version: string) {
  console.log("Called - 1");
  async function main() {
    console.log("Called - 2");
    // await prisma.version_check
    //   .findMany()
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //     process.exit(1);
    //   });
    console.log("Called - 2.5");
    console.log({
      data: {
        version: version,
        date: new Date(),
      },
    });
    console.log(
      prisma
        .$connect()
        .then(() => console.log("connected"))
        .catch((e) => console.log(e))
    );
    await prisma.version_check.create({
      data: {
        version: version as string,
        date: new Date() as Date,
      },
    });
    console.log("Called - 3");

    // get monday of the current week
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day == 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff)).toISOString().split("T")[0];
    const row_key = monday + "_" + version;
    // check if row_key is already in db
    // const version_check = await prisma.version_check_weekly.findFirst({
    //   where: {
    //     row_key: row_key,
    //   },
    // });
    // if (version_check) {
    //   // update
    //   await prisma.version_check_weekly.update({
    //     where: {
    //       row_key: row_key,
    //     },
    //     data: {
    //       num_checks: version_check.num_checks + 1,
    //     },
    //   });
    // }
    // // create
    // else {
    //   await prisma.version_check_weekly.create({
    //     data: {
    //       row_key: row_key,
    //       num_checks: 1,
    //     },
    //   });
    // }
  }

  console.log("Called - 4");
  main()
    .then(async () => {
      console.log("Called - 5");
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.log("Called - 6");
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

export const get: APIRoute = async ({ params, request }) => {
  console.log("Called - 7");
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
  console.log("Called - 8");

  // await version_checks;

  await log_call(remote_version);
  console.log("Called - 9");
  return new Response(mqc_releases.latest, {
    headers: { "content-type": "text/plain" },
    status: 200,
  });
};
