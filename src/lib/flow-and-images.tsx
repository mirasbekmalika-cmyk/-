// @ts-nocheck


function D8(s, e, t) {
  const a = s.y + 60;
  const r = e.y - 5;
  const o = (a + e.y) / 2;
  const c = t.filter(C => C.id !== s.id && C.id !== e.id);
  const h = (C, A, b) => c.some(I => C > I.x - 115 && C < I.x + 115 && Math.max(A, b) > I.y - 10 && Math.min(A, b) < I.y + 70);
  const g = (C, A, b) => c.some(I => C > I.y - 10 && C < I.y + 70 && Math.max(A, b) > I.x - 115 && Math.min(A, b) < I.x + 115);
  if (e.y <= s.y || h(s.x, a, o) || g(o, s.x, e.x) || h(e.x, o, r)) {
    const C = s.x < 360 ? 25 : 695;
    return {
      path: `M${s.x} ${a}V${a + 22}H${C}V${e.y - 22}H${e.x}V${r}`,
      labelX: (s.x + C) / 2,
      labelY: a + 13
    };
  }
  return {
    path: `M${s.x} ${a}V${o}H${e.x}V${r}`,
    labelX: s.x === e.x ? s.x + 35 : (s.x + e.x) / 2,
    labelY: o - 10
  };
}

let V8;

function zb() {
  return V8 ||= new Promise((resolve, reject) => {
    const t = indexedDB.open("neotlozhka-topic-images", 1);
    t.onupgradeneeded = () => t.result.createObjectStore("images");
    t.onsuccess = () => resolve(t.result);
    t.onerror = () => reject(t.error);
  });
}

async function Y8(s) {
  const e = await zb();
  return new Promise((resolve, reject) => {
    const r = e.transaction("images", "readonly").objectStore("images").get(s);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

async function e2(s, e) {
  const t = await zb();
  return new Promise((resolve, reject) => {
    const o = t.transaction("images", "readwrite");
    const c = o.objectStore("images");
    if (e) {
      c.put(e, s);
    } else {
      c.delete(s);
    }
    o.oncomplete = () => resolve();
    o.onerror = () => reject(o.error);
  });
}

export { D8, V8, Y8, e2, zb };
