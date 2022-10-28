const convertKeyValueToObject = (data) => {
  let result = {};
  for (let i of data) {
    result[i.key] = (result[i.key] || '') + i.value + ',';
  }
  return result;
};

export { convertKeyValueToObject };
