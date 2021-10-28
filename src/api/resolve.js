export const resolve = async (promise) => {
  const resolved = {
    data: undefined,
    error: undefined,
  };

  try {
    resolved.data = await promise;
  } catch (e) {
    resolved.error = e;
  }

  console.log(resolved);
  return resolved;
};
