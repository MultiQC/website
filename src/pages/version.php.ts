import mqc_releases from "../multiqc_releases.json";

export const get: APIRoute = ({ params, request }) => {
  return new Response(mqc_releases.latest, {
    headers: { "content-type": "text/plain" },
    status: 200,
  });
};
