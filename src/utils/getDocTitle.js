const docTitles = {
  'compatibility': 'Updating for compatibility',
};

const getDocTitle = (slug) => {
  return docTitles[slug];
};

export default getDocTitle;
