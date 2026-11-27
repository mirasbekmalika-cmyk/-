// @ts-nocheck


const u1 = "neotlozhka-recovery-v1";

function Q9(id) {
  try {
    if (id) {
      sessionStorage.setItem(u1, JSON.stringify({
        id,
        until: Date.now() + 1800000
      }));
    } else {
      sessionStorage.removeItem(u1);
    }
  } catch {}
}

function oD(s) {
  try {
    const e = JSON.parse(sessionStorage.getItem(u1) || "null");
    return e?.id === s && e.until > Date.now();
  } catch {
    return false;
  }
}

const Yb = s => `${s}-${crypto.randomUUID().slice(0, 8)}`;

export { Q9, Yb, oD, u1 };
