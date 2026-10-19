import { useEffect, useState } from "react";

export function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return hash;
}
