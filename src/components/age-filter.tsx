// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { J9, normalizeSearch, su } from '../data/catalog';
import { xt } from '../lib/supabase-and-topics';

function W8Component({
  age,
  setAge
}) {
  const t = xt.filter(g => g.systemId === "respiratory");
  const [a, setA] = React.useState("");
  const [o, setO] = React.useState("all");
  const h = t.filter(g => (age === "all" || g.age === age) && (o === "all" || su(g.id) === o) && normalizeSearch([g.title, g.english, g.summary, ...g.keywords].join(" ")).includes(normalizeSearch(a)));
  return <div className="resp-landing"><nav className="breadcrumbs" aria-label="Хлебные крошки"><Link to="/">Главная</Link><Icon name="chevron" size={12} /><Link to={`/catalog?age=${age}`}>Каталог</Link><Icon name="chevron" size={12} /><span>Дыхательная система</span></nav><header className="resp-landing-title"><span className="large-system-icon"><Icon name="lungs" size={34} /></span><div><div className="eyebrow">КЛИНИЧЕСКАЯ БИБЛИОТЕКА</div><h1>Дыхательная система</h1><p>Симптомы, заболевания и критические состояния. Взрослые, дети и новорождённые.</p></div></header><div className="resp-landing-controls"><div className="catalog-age-switch" role="group" aria-label="Возраст пациента">{[["all", "Все"], ["pediatric", "Дети"], ["adult", "Взрослые"]].map(([g, m]) => <button key={g} className={age === g ? "is-active" : ""} aria-pressed={age === g} onClick={() => setAge(g)}><Icon name={g === "adult" ? "users" : g === "pediatric" ? "baby" : "grid"} size={17} />{m}</button>)}</div><label className="inline-search"><Icon name="search" size={17} /><input aria-label="Поиск дыхательных тем" placeholder="Состояние, симптом или термин…" value={a} onChange={g => setA(g.target.value)} /></label></div><div className="resp-category-filter"><label htmlFor="resp-category">Раздел</label><select id="resp-category" value={o} onChange={g => setO(g.target.value)}><option value="all">Все разделы</option>{J9.map(([g, m]) => <option key={g} value={g}>{m}</option>)}</select><span role="status">Найдено: {h.length} страниц</span></div>{age !== "adult" && <div className="resp-start"><div><h2>Первичная оценка и реанимация</h2><p>Педиатрические инструменты</p></div><nav aria-label="Первичная оценка и реанимация">{[["pat", "PAT"], ["abcde", "ABCDE"], ["pediatric-bls", "BLS"], ["pals", "PALS"]].map(([g, m]) => <Link key={g} className="button small" to={`/protocol/${g}`}>{m}<Icon name="arrow" size={13} /></Link>)}</nav><Link className="text-link" to="/comparison/respiratory?age=pediatric">Сравнить 7 детских неотложных состояний<Icon name="arrow" size={13} /></Link></div>}{J9.map(([g, m]) => {
      const C = h.filter(A => su(A.id) === g);
      return C.length > 0 && <section key={g} className="resp-library-group"><div className="section-line resp-list-title"><h2>{m}</h2><span className="muted">{C.length}</span></div><div className="resp-card-grid">{C.map(A => <article key={A.id} className="resp-card"><span className={`resp-patient-tag ${A.age}`}>{su(A.id) === "neonatal" ? "Новорождённые" : A.age === "adult" ? "Взрослые" : "Дети"}</span><Link className="resp-card-title" to={`/protocol/${A.id}`}><div><h3>{A.title}</h3><small>{A.english}</small></div><Icon name="up" size={18} /></Link><p>{A.summary}</p><div className="resp-card-links">{[["emergency", "Тактика"], ["algorithm", "Алгоритм"], ["diagnostics", "Диагностика"]].map(([b, I]) => <Link key={b} className="text-link" to={`/protocol/${A.id}?section=${b}`}>{I}<Icon name="arrow" size={13} /></Link>)}</div></article>)}</div></section>;
    })}{!h.length && <div className="empty"><h3>Темы не найдены</h3><button className="button" onClick={() => {
        setA("");
        setO("all");
      }}>Сбросить поиск и раздел</button></div>}</div>;
}

export { W8Component };
