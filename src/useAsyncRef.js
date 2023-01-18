import { useRef } from "react";

export const useAsyncRef = (obj) => {
  const pendingAwaits = useRef([]);
  const ref = useRef(obj);
  const handler = {
    get(target, prop, receiver) {
      if (prop !== "asyncCurrent") return Reflect.get(target, prop, receiver);

      const getTarget = async () => {
        if (target.current !== null && typeof target.current !== "undefined") {
          return target.current;
        }
        const current = await new Promise((resolve) =>
          pendingAwaits.current.push(resolve)
        );
        return current;
      };
      return getTarget();
    },
    set(target, p, newValue) {
      if (p !== "current") return Reflect.set(target, p, newValue);
      try {
        return Reflect.set(target, p, newValue);
      } finally {
        if (newValue !== null && typeof newValue !== "undefined") {
          while (pendingAwaits.current.length) {
            const resolve = pendingAwaits.current.pop();
            resolve(target.current);
          }
        }
      }
    },
  };
  return new Proxy(ref, handler);
};
