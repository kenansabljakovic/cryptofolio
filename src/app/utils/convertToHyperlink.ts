const convertToHyperlink = (description: string): string => {
  const regex = /<a href="([^"]+)">([^<]+)<\/a>/gi;
  return description.replace(regex, (match, href, text) => {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });
};

export default convertToHyperlink;
