// @ts-nocheck
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { useApp } from './app-state';

const primaryNav = [{
  to: "/",
  label: "Главная",
  icon: "home"
}, {
  to: "/catalog",
  label: "Каталог состояний",
  icon: "grid"
}, {
  to: "/assessment",
  label: "Первичная оценка",
  icon: "stethoscope"
}, {
  to: "/calculators",
  label: "Калькуляторы",
  icon: "calculator"
}];

const workspaceNav = [{
  to: "/team",
  label: "Редакция и соавторы",
  icon: "users"
}, {
  to: "/favorites",
  label: "Избранное",
  icon: "bookmark"
}, {
  to: "/recent",
  label: "Недавно открытые",
  icon: "history"
}, {
  to: "/medications",
  label: "Препараты",
  icon: "pill"
}, {
  to: "/procedures",
  label: "Процедуры",
  icon: "syringe"
}, {
  to: "/sources",
  label: "Источники",
  icon: "book"
}];

function useAgeFilter() {
  const s = useApp();
  const e = useLocation();
  const t = useNavigate();
  const a = new URLSearchParams(e.search).get("age");
  const r = a === "all" || a === "pediatric" || a === "adult";
  const age = r ? a : s.age;
  React.useEffect(() => {
    if (r && a !== s.age) {
      s.setAge(a);
    }
    if (!r && (e.pathname === "/catalog" || e.pathname.startsWith("/system/"))) {
      const c = new URLSearchParams(e.search);
      c.set("age", s.age);
      t({
        pathname: e.pathname,
        search: `?${c}`
      }, {
        replace: true
      });
    }
  }, [a, r, s.age, s.setAge, e.pathname, e.search, t]);
  return {
    age,
    setAge: c => {
      s.setAge(c);
      const h = new URLSearchParams(e.search);
      h.set("age", c);
      t({
        pathname: e.pathname,
        search: `?${h}`
      }, {
        replace: true
      });
    }
  };
}

export { primaryNav, useAgeFilter, workspaceNav };
