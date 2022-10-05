export const rejector = async (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("internet"));
    }, duration);
  });
};
