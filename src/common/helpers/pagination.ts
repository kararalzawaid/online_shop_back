export const getStartIndex = (page, limit) => {
  return (page - 1) * limit;
};

export const getLimitIndex = limit => {
  return parseInt(limit);
};