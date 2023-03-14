export const get: APIRoute = ({ params, request }) => {
  return new Response("TODO: GET THE LATEST VERSION", {
    headers: { "content-type": "text/plain" },
    status: 200,
  });
};
