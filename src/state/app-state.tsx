// @ts-nocheck
import React from 'react';

function readStored(s, e) {
  try {
    const t = localStorage.getItem(`neotlozhka:${s}`);
    if (t) {
      return JSON.parse(t);
    }
    return e;
  } catch {
    return e;
  }
}

function usePersistentState(s, e) {
  const [t, setT] = React.useState(() => readStored(s, e));
  React.useEffect(() => {
    try {
      localStorage.setItem(`neotlozhka:${s}`, JSON.stringify(t));
    } catch {}
  }, [s, t]);
  return [t, setT];
}

const AppContext = React.createContext(null);

function useAppStateValue() {
  const [s, setTheme] = usePersistentState("theme", "light");
  const [favorites, a] = usePersistentState("favorites", []);
  const [recent, o] = usePersistentState("recent", []);
  const [c, setFontSize] = usePersistentState("fontSize", 16);
  const [age, setAge] = usePersistentState("age", "all");
  React.useEffect(() => {
    document.documentElement.dataset.theme = s;
    document.documentElement.style.fontSize = `${c}px`;
  }, [s, c]);
  return {
    theme: s,
    setTheme,
    favorites,
    recent,
    fontSize: c,
    setFontSize,
    age,
    setAge,
    toggleFavorite: C => a(A => {
      if (A.includes(C)) {
        return A.filter(b => b !== C);
      }
      return [...A, C];
    }),
    addRecent: C => o(A => {
      if (A[0] === C) {
        return A;
      }
      return [C, ...A.filter(b => b !== C)].slice(0, 8);
    })
  };
}

function AppProvider({
  children
}) {
  const value = useAppStateValue();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useApp() {
  const s = React.useContext(AppContext);
  if (!s) {
    throw Error("AppProvider is required");
  }
  return s;
}

export { AppContext, AppProvider, readStored, useApp, useAppStateValue, usePersistentState };
