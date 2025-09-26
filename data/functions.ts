export const convertPaginationLimit = (count = 0, limit = 15) => {
  return Math.ceil(count / limit);
};
