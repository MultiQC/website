import type { APIRoute } from "astro";
import fetch from "node-fetch";

export const get: APIRoute = async ({ request }) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  async function pypiStats() {
    const url = "https://api.pepy.tech/api/v2/projects/multiqc";
    const response = await fetch(url);
    let totalDownloads = null;
    const downloadsByVersion: Record<string, number> = {};

    if (response.status === 200) {
      const data = await response.json();
      totalDownloads = data.total_downloads;
      for (const date in data.downloads) {
        const dateDownloadsByVersion = data.downloads[date];
        for (const version in dateDownloadsByVersion) {
          if (downloadsByVersion[version]) {
            downloadsByVersion[version] += dateDownloadsByVersion[version];
          } else {
            downloadsByVersion[version] = dateDownloadsByVersion[version];
          }
        }
      }
    } else {
      console.error("Failed to fetch data from pepy.tech");
    }
    return {
      pypi: totalDownloads,
      pypi_by_version: downloadsByVersion,
    };
  }

  async function biocondaStats() {
    const url =
      "https://raw.githubusercontent.com/bioconda/bioconda-plots/main/plots/multiqc/versions.json";
    const response = await fetch(url);
    const downloadsByVersion: Record<string, number> = {};

    if (response.status === 200) {
      const data = await response.json();
      for (const version of data) {
        downloadsByVersion[version["version"]] = version["total"];
      }
    } else {
      console.error("Failed to fetch data from bioconda");
    }

    return {
      bioconda: Object.values(downloadsByVersion).reduce((a, b) => a + b, 0),
      bioconda_by_version: downloadsByVersion,
    };
  }

  async function githubClonesStats() {
    const url = "https://api.github.com/repos/ewels/MultiQC/traffic/clones";
    const headers = { Authorization: `token ${GITHUB_TOKEN}` };

    const response = await fetch(url, { headers });
    let cloneCount = 0;

    if (response.status === 200) {
      const data = await response.json();
      cloneCount = data.count || 0;
    } else {
      console.error(
        `Failed to fetch data from GitHub, status code: ${response.status}, url: ${url}`
      );
    }
    return { github_clones: cloneCount };
  }

  async function githubReleasesStats() {
    const url = "https://api.github.com/repos/ewels/MultiQC/releases";
    const headers = { Authorization: `token ${GITHUB_TOKEN}` };

    const response = await fetch(url, { headers });
    const downloadsByVersion: Record<string, number> = {};

    if (response.status === 200) {
      const data = await response.json();
      for (const release of data) {
        const version = release["tag_name"];
        for (const asset of release["assets"]) {
          if (downloadsByVersion[version]) {
            downloadsByVersion[version] += asset["download_count"];
          } else {
            downloadsByVersion[version] = asset["download_count"];
          }
        }
      }
    } else {
      console.error(
        `Failed to fetch release data from GitHub, status code: ${response.status}, url: ${url}`
      );
    }

    return {
      github_releases: Object.values(downloadsByVersion).reduce((a, b) => a + b, 0),
      github_releases_by_version: downloadsByVersion,
    };
  }

  async function fetchDockerhubCount(repo: string) {
    const url = `https://hub.docker.com/v2/repositories/${repo}`;
    const response = await fetch(url);

    if (response.status !== 200) {
      console.error(
        `Failed to fetch data from DockerHub, status code: ${response.status}, url: ${url}`
      );
      return null;
    }

    const data = await response.json();
    return data.pull_count || 0;
  }

  async function fetchQuayCount(repo: string) {
    const url = `https://quay.io/api/v1/repository/${repo}`;
    const response = await fetch(url);

    if (response.status !== 200) {
      console.error(
        `Failed to fetch data from Quay.io, status code: ${response.status}, url: ${url}`
      );
      return null;
    }

    const data = await response.json();
    return data.pull_count || 0;
  }

  async function dockerhubStats() {
    return { dockerhub: await fetchDockerhubCount("ewels/multiqc/") };
  }

  async function biocontainersAWS() {
    const url = "https://api.us-east-1.gallery.ecr.aws/getRepositoryCatalogData";
    const headers = { "Content-Type": "application/json" };
    const data = { registryAliasName: "biocontainers", repositoryName: "multiqc" };

    const response = await fetch(url, { headers, method: "POST", body: JSON.stringify(data) });

    if (response.status !== 200) {
      console.error(`Failed to fetch data from ${url}:`, response.status, await response.text());
      return null;
    }

    try {
      const responseData = await response.json();
      return responseData["insightData"]["downloadCount"];
    } catch (error) {
      console.error(
        `Cannot extract insightData/downloadCount from response:`,
        await response.text()
      );
      return null;
    }
  }

  async function biocontainersStats() {
    const dockerhubCount = await fetchDockerhubCount("biocontainers/multiqc/");
    const quayCount = await fetchQuayCount("biocontainers/multiqc/");
    const awsCount = await biocontainersAWS();

    return {
      biocontainers_dockerhub: dockerhubCount,
      biocontainers_quay: quayCount,
      biocontainers_aws: awsCount,
      biocontainers: [dockerhubCount, quayCount, awsCount]
        .filter((v) => v !== null)
        .reduce((a, b) => a + b, 0),
    };
  }

  try {
    const stats = {};
    // Merge all stats into the stats object.
    Object.assign(stats, await pypiStats());
    Object.assign(stats, await biocondaStats());
    Object.assign(stats, await githubClonesStats());
    Object.assign(stats, await dockerhubStats());
    Object.assign(stats, await biocontainersStats());

    return {
      status: 200,
      body: JSON.stringify(stats, null, 2),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: JSON.stringify({ error: "Failed to fetch stats" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
