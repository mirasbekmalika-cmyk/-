// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { Modal } from './Modal';
import { SystemCard } from './catalog-cards';
import { respiratoryComparisonRows } from '../data/manuals';
import { FaComponent } from '../features/editor-forms';
import { X0 } from '../features/manuals';
import { ql, xt } from '../lib/supabase-and-topics';
import { useAgeFilter } from '../state/navigation';

function QSComponent({
  title
}) {
  const [e, setE] = React.useState(null);
  const [a, setA] = React.useState(false);
  const o = <div className="flow-content"><div className="template-label"><Icon name="info" size={15} /> Шаблон визуализации · не клинический алгоритм</div><p className="flow-intro">Алгоритм будет добавлен после рецензирования. Выберите блок, чтобы посмотреть его назначение.</p><div className="flow-canvas"><svg className="flow-lines" viewBox="0 0 720 480" aria-hidden="true" preserveAspectRatio="none"><defs><marker id={a ? "arrow-full" : "arrow-inline"} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="currentColor" strokeWidth="1.4" /></marker></defs><g stroke="currentColor" fill="none" strokeWidth="1.5" markerEnd={`url(#${a ? "arrow-full" : "arrow-inline"})`}><path d="M360 69V102" /><path d="M360 158V191" /><path d="M290 231H172V299" /><path d="M430 231H548V299" /><path d="M172 359V395H360V417" /><path d="M548 359V395H360" /></g></svg>{X0.map(c => <button key={c.id} className={`flow-node node-${c.id} ${e === c.id ? "selected" : ""}`} onClick={() => setE(c.id)} aria-pressed={e === c.id}><span>{c.label}</span><small>{c.hint}</small></button>)}<span className="branch-label branch-a">Вариант A</span><span className="branch-label branch-b">Вариант B</span></div><div className="flow-detail" aria-live="polite"><Icon name={e ? "file" : "info"} size={18} /><div><strong>{e ? X0.find(c => c.id === e)?.label : "Интерактивная схема"}</strong><p>{e ? X0.find(c => c.id === e)?.detail : "Все блоки доступны для выбора. Схема показывает структуру будущего алгоритма без лечебных рекомендаций."}</p></div></div></div>;
  return <><div className="flow-toolbar"><div><span className="dot muted-dot" /> Содержание ожидает проверки</div><div className="flex gap-2"><button className="button small" onClick={() => setA(true)}><Icon name="maximize" size={16} /> <span>На весь экран</span></button><button className="icon-button" onClick={() => window.print()} aria-label="Распечатать алгоритм"><Icon name="print" size={18} /></button></div></div>{o}{a && <Modal title={`${title} · схема`} wide onClose={() => setA(false)}>{o}</Modal>}</>;
}

function HSComponent() {
  const s = xt.filter(e => e.systemId === "respiratory");
  return <div className="review-overview content-card"><h2>Дыхательные темы</h2><p>Клинические статьи с оглавлением, алгоритмами и учебными случаями.</p><ul>{s.map(e => <li key={e.id}><Link className="text-link" to={`/protocol/${e.id}`}>{e.title}<Icon name="arrow" size={14} /></Link></li>)}</ul></div>;
}

function QS1Component() {
  return <div className="clinical-table-card"><div className="table-scroll" tabIndex={0} role="region" aria-label="Сравнительная таблица дыхательных состояний"><table className="comparison-table"><thead><tr><th>Состояние</th><th>Распознавание</th><th>Признаки опасности</th><th>Первое решение</th></tr></thead><tbody>{respiratoryComparisonRows.map(([s, e, t, a, r]) => {
            const o = xt.find(c => c.id === s);
            return <tr key={s}><th scope="row"><Link className="text-link" to={`/protocol/${s}`}>{o.title}</Link><FaComponent ids={[...r]} p={o} /></th><td>{e}</td><td>{t}</td><td>{a}</td></tr>;
          })}</tbody></table></div></div>;
}

function ScComponent({
  children,
  blue = false
}) {
  return <span className={`badge ${blue ? "badge-blue" : ""}`}><span className="dot" />{children || "Материал готовится"}</span>;
}

const DI = [{
  id: "pediatric",
  title: "Детские состояния",
  short: "Дети",
  icon: "baby",
  caption: "ПЕДИАТРИЯ",
  description: "Включая новорождённых и младенцев"
}, {
  id: "adult",
  title: "Взрослые состояния",
  short: "Взрослые",
  icon: "users",
  caption: "ВЗРОСЛЫЕ ПАЦИЕНТЫ",
  description: "Отдельные протоколы для взрослых пациентов"
}];

const to = (s, e) => `${s} ${e[s % 100 >= 11 && s % 100 <= 14 ? 2 : s % 10 === 1 ? 0 : s % 10 >= 2 && s % 10 <= 4 ? 1 : 2]}`;

const e7 = s => ql.filter(e => s === "all" || e.ageGroups.includes(s));

const am = (s, e) => xt.filter(t => t.systemId === s && (e === "all" || t.age === e));

const S1 = s => !!(s.clinicalContent?.length || s.flow?.length || s.tables?.length);

const SI = s => {
  if (!s.length) {
    return "Материалы готовятся";
  }
  const length = s.filter(r => S1(r) && r.status === "draft").length;
  const length_1 = s.filter(r => !S1(r) && r.status === "draft").length;
  const a = [];
  if (length) {
    a.push(to(length, ["проект", "проекта", "проектов"]));
  }
  for (const [r, o] of [["in_review", "на рецензировании"], ["reviewed", "проверено"], ["approved", "утверждено"]]) {
    const c = s.filter(h => h.status === r).length;
    if (c) {
      a.push(`${c} ${o}`);
    }
  }
  if (length_1) {
    a.push(`${length_1} в подготовке`);
  }
  return a.join(" · ");
};

function CatalogAgeTabs({
  age,
  setAge
}) {
  return <div className="catalog-age-switch" role="group" aria-label="Возраст пациента в каталоге">{[{
      id: "all",
      short: "Все разделы",
      icon: "grid"
    }, ...DI].map(t => <button key={t.id} type="button" className={age === t.id ? "is-active" : ""} aria-pressed={age === t.id} onClick={() => setAge(t.id)}><Icon name={t.icon} size={18} />{t.short}</button>)}</div>;
}

function CatalogGroup({
  group,
  systems,
  query,
  fullCount
}) {
  const length = xt.filter(o => o.kind === "condition" && o.age === group.id).length;
  return <section className={`catalog-patient-section catalog-${group.id}`} aria-labelledby={`catalog-${group.id}-title`} data-patient-age={group.id}><header className="catalog-section-header"><span className="catalog-group-icon"><Icon name={group.icon} size={28} /></span><div className="catalog-group-heading"><span className="catalog-kicker">{group.caption}</span><h2 id={`catalog-${group.id}-title`}>{group.title}</h2><p>{group.description}</p></div><div className="catalog-group-count"><strong>{fullCount}</strong><span>{to(fullCount, ["раздел", "раздела", "разделов"]).split(" ").slice(1).join(" ")}</span></div></header><div className="catalog-section-note"><Icon name={length ? "filecheck" : "clock"} size={16} /><p>{length ? `${to(length, ["тема", "темы", "тем"])} по дыхательной системе. Статус каждого материала указан в карточке.` : "Материалы этой возрастной группы готовятся."}</p>{group.id === "pediatric" && <Link to="/assessment?age=pediatric">Первичная оценка<Icon name="arrow" size={14} /></Link>}</div>{query && <p className="catalog-results-count" role="status">{`Совпадения: ${to(systems.length, ["раздел", "раздела", "разделов"])} из ${fullCount}`}</p>}{systems.length ? <div className="systems-grid full-catalog">{systems.map(o => <SystemCard key={o.id} system={o} patientAge={group.id} query={query} />)}</div> : <div className="catalog-no-results"><Icon name="search" size={22} /><p>{`По запросу «${query}» в разделе «${group.short}» ничего не найдено.`}</p></div>}</section>;
}

function NmComponent() {
  const {
    age,
    setAge
  } = useAgeFilter();
  return <label className="age-select"><Icon name="users" size={16} /><select aria-label="Возрастная группа" value={age} onChange={t => setAge(t.target.value)}><option value="all">Все пациенты</option><option value="pediatric">Дети</option><option value="adult">Взрослые</option></select><Icon name="chevronDown" size={14} /></label>;
}

function EmptyState({
  icon = "file",
  title,
  children,
  action
}) {
  return <div className="empty"><span className="empty-icon"><Icon name={icon} size={28} /></span><h3>{title}</h3><p>{children}</p>{action}</div>;
}

function Breadcrumbs({
  items
}) {
  return <nav className="breadcrumbs" aria-label="Хлебные крошки"><Link to="/">Главная</Link>{items.map((e, t) => <span key={t}><Icon name="chevron" size={12} />{e.to ? <Link to={e.to}>{e.label}</Link> : <span aria-current="page">{e.label}</span>}</span>)}</nav>;
}

function PageHeader({
  eyebrow,
  title,
  description,
  children
}) {
  return <div className="page-heading"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{children}</div>;
}

export { Breadcrumbs, CatalogAgeTabs, CatalogGroup, DI, EmptyState, HSComponent, NmComponent, PageHeader, QS1Component, QSComponent, S1, SI, ScComponent, am, e7, to };
