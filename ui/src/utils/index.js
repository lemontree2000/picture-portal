export const createImagePrefix = (url, file) => {
  // TODO 宽高还需提供
  return {
    normal: url,
    html: `<img src="${url}" alt="${file.name}" width="200" data-width="200" data-height="200">`,
    md: `![${file.name}](${url})`
  };
};
