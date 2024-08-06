/**
 * @param selector the css selector
 * @param timeout the timeout is millisecond
 */
export default function waitForElement(selector: string, timeout: number = 2000): Promise<Element> {
  const loopTime = 100;
  let tryCount = 0;
  const limitCount = timeout / loopTime;
  const limitCountOption = (limitCount < 1) ? 1 : limitCount;

  function tryCheck(resolve: (value: Element | PromiseLike<Element>) => void, reject: (reason?: any) => void): void {
      if (tryCount < limitCountOption) {
          const element = document.querySelector(selector);
          if (element != null) {
              return resolve(element);
          }
          setTimeout(() => {
              tryCheck(resolve, reject);
          }, loopTime);
      } else {
          reject(new Error("Not found element match the selector:" + selector));
      }
      tryCount++;
  }

  return new Promise((resolve, reject) => {
      tryCheck(resolve, reject);
  });
}