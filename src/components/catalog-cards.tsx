// @ts-nocheck
import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { S1, SI, ScComponent, am, to } from './common';
import { $R, Yl, normalizeSearch, ro } from '../data/catalog';
import { EaComponent } from '../features/editor-forms';
import { useApp } from '../state/app-state';

function HomeAssessmentSection() {
  const {
    age
  } = useApp();
  return <section className="assessment-block"><div className="section-line"><div className="section-title"><span className="tiny-square" /><h2>Первичная оценка и реанимация</h2><span className="age-pill"><Icon name={age === "adult" ? "users" : "baby"} size={13} /> {age === "adult" ? "Взрослые" : "Дети"}</span></div><Link to="/assessment" className="text-link">Все алгоритмы <Icon name="arrow" size={15} /></Link></div>{age === "adult" ? <div className="adult-placeholder"><Icon name="users" size={28} /><div><h3>Взрослые алгоритмы — следующий этап</h3><p>Отдельный раздел будет наполнен после проверки источников.</p></div><Link to="/assessment" className="text-link">Педиатрические алгоритмы <Icon name="arrow" size={15} /></Link></div> : <><div className="assessment-inner"><div className="assessment-intro"><span className="eyebrow">С ЧЕГО НАЧАТЬ</span><h3>Быстрая оценка. <br />Понятный следующий шаг.</h3><p>PAT и ABCDE — отдельные инструменты первичной оценки.</p><span className="intro-note"><Icon name="info" size={14} /> Содержание готовится к проверке</span></div><div className="assessment-cards">{$R.map((e, t) => <Link key={e.id} to={`/protocol/${e.id}`} className="assessment-card"><div className="assessment-card-top"><span className="assessment-number">0{t + 1}</span><Icon name="up" size={18} /></div><div className="assessment-glyph">{e.id === "pat" ? <svg width="69" height="53" viewBox="0 0 69 53" aria-hidden="true"><path d="M34.5 5L63 48H6Z" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="34.5" cy="5" r="4" fill="currentColor" /><circle cx="63" cy="48" r="4" fill="currentColor" /><circle cx="6" cy="48" r="4" fill="currentColor" /></svg> : <div className="abcde-glyph">{["A", "B", "C", "D", "E"].map(a => <span key={a}>{a}</span>)}</div>}</div><h3>{e.label}</h3><p>{e.title}</p><small>{e.subtitle}</small></Link>)}</div></div><div className="resuscitation-strip"><span className="resuscitation-label"><Icon name="heart" size={19} /> Реанимационные алгоритмы</span><div className="resuscitation-links"><Link to="/protocol/pediatric-bls">Pediatric BLS <Icon name="arrow" size={15} /></Link><span /><Link to="/protocol/pals">PALS <Icon name="arrow" size={15} /></Link></div><Link to="/emergency" className="indication-link">Показания и статус <Icon name="chevron" size={14} /></Link></div></>}</section>;
}

function SystemCard({
  system,
  patientAge,
  query = ""
}) {
  const {
    age,
    setAge
  } = useApp();
  const o = patientAge || age;
  if (o !== "all" && !system.ageGroups.includes(o)) {
    return null;
  }
  const c = am(system.id, o);
  const h = query ? c.filter(C => normalizeSearch([C.title, C.english, ...C.keywords].join(" ")).includes(normalizeSearch(query))) : [];
  const g = !!patientAge;
  const m = c.some(S1);
  return <Link to={`/system/${system.id}?age=${o}`} onClick={() => setAge(o)} className={`system-card ${g ? "catalog-system-card" : ""} ${m ? "system-featured" : ""} ${system.id === "neonatal" ? "neonatal-card" : ""}`}><span className="system-icon"><Icon name={system.icon} size={23} /></span><span className="system-card-main"><span className="system-card-topline"><span className={`catalog-age-tag age-${o}`}>{ro(o)}</span>{g && c.length > 0 && <span className="catalog-topic-count">{to(c.length, ["тема", "темы", "тем"])}</span>}</span><h3>{system.title}</h3><p className={m ? "has-project" : ""}>{SI(c)}</p>{system.id === "neonatal" && <small className="neonatal-note">Только детский раздел</small>}{h.length > 0 && <small className="catalog-match">По запросу: {h.map(C => C.title).join(", ")}</small>}</span><Icon name="chevron" size={17} /></Link>;
}

function XIComponent({
  p,
  index
}) {
  const {
    favorites,
    toggleFavorite
  } = useApp();
  return <div className="protocol-row">{index !== undefined && <span className="row-index">{String(index + 1).padStart(2, "0")}</span>}<Link to={`/protocol/${p.id}`} className="protocol-row-link"><span><strong>{p.title}</strong><small>{p.english} <span>·</span> {ro(p.age)}</small></span><ScComponent>{Yl[p.status]}</ScComponent><Icon name="chevron" size={18} /></Link><button className={`icon-button favorite ${favorites.includes(p.id) ? "is-favorite" : ""}`} aria-label={`${favorites.includes(p.id) ? "Удалить из избранного" : "В избранное"}: ${p.title}`} aria-pressed={favorites.includes(p.id)} onClick={() => toggleFavorite(p.id)}><Icon name="bookmark" size={18} /></button></div>;
}

function K2Component({
  section: section_1,
  p: p_1
}) {
  if (p_1.clinicalContent.some(t => t.sectionId === section_1.id)) {
    return <section id={section_1.id} className="protocol-section"><h2>{section_1.title}</h2><EaComponent p={p_1} sectionId={section_1.id} /></section>;
  }
  return <section id={section_1.id} className="protocol-section"><h2>{section_1.title}</h2><div className="placeholder-grid">{section_1.items.map((t, a) => <details key={t} className="placeholder-detail"><summary><span className="detail-number">{String(a + 1).padStart(2, "0")}</span>{t}<Icon name="plus" size={16} /></summary><p>Материал готовится. Содержание будет добавлено после проверки исходного документа и медицинского рецензирования.</p></details>)}</div></section>;
}

export { HomeAssessmentSection, K2Component, SystemCard, XIComponent };
