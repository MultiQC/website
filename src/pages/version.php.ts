export const get: APIRoute = ({ params, request }) => {
  return {
    headers: { "Content-Type": "text/plain" },
    body: "Latest version is...?",
  };
};
