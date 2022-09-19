import { page1 } from "./dummyData";
import { page2 } from "./dummyData";

export const getData = async ({ key, page }) => {
  return new Promise((resolve, reject) => {
    if (key === "d18e8bda03ac488ab643b24428a95b1d") {
      setTimeout(() => {
        resolve({ code: "apiKeyExhausted" });
      }, 100);
    } else if (key === "c73c59d68ffb4226961c3efb31ef8a66") {
      if (page === 1) {
        setTimeout(() => {
          resolve(page1);
        }, 100);
      } else if (page === 2) {
        setTimeout(() => {
          resolve(page2);
        }, 100);
      } else {
        setTimeout(() => {
          resolve({ code: "maximumResultsReached" });
        }, 100);
      }
    }
  });
};
