// @ts-nocheck
import { Link, useParams } from 'react-router-dom';
import React from 'react';
import { Icon } from '../components/Icon';
import { QpComponent } from '../components/TopicIllustrations';
import { K2Component } from '../components/catalog-cards';
import { Breadcrumbs, PageHeader, QSComponent, ScComponent } from '../components/common';
import { P9, Yl } from '../data/catalog';
import { getManual } from '../data/manuals';
import { G1Component, P8Component, PbComponent } from '../features/editor';
import { EaComponent, IuComponent, X8Component, Z8Component } from '../features/editor-forms';
import { OSComponent } from '../features/manuals';
import { ManualViewer } from '../features/manuals/ManualViewer';
import { ql, xt } from '../lib/supabase-and-topics';
import { NotFoundPage } from './NotFoundPage';
import { useApp } from '../state/app-state';

function ProtocolPage() {
  const {
    id
  } = useParams();
  const e = xt.find(b => b.id === id);
  const {
    favorites,
    toggleFavorite,
    addRecent,
    fontSize,
    setFontSize
  } = useApp();
  const [h, setH] = React.useState("critical");
  React.useEffect(() => {
    if (id && xt.some(b => b.id === id)) {
      addRecent(id);
    }
    setH("critical");
  }, [id]);
  if (!e) {
    return <NotFoundPage />;
  }
  if (e.id === "pat" || e.id === "abcde") {
    return <article className="protocol-page"><Breadcrumbs items={[{
        label: "Первичная оценка",
        to: "/assessment"
      }, {
        label: e.short || e.title
      }]} /><PageHeader eyebrow="ПЕДИАТРИЯ" title={e.title} description={e.summary || e.english} /><div className="protocol-actions"><G1Component id={e.id} /><button className="button" onClick={() => toggleFavorite(e.id)} aria-pressed={favorites.includes(e.id)}><Icon name="bookmark" size={17} />{favorites.includes(e.id) ? "В избранном" : "В избранное"}</button><button className="button" onClick={() => window.print()}><Icon name="print" size={17} /> Печать</button><Link className="button" to={`/protocol/${e.id === "pat" ? "abcde" : "pat"}`}>{e.id === "pat" ? "К ABCDE" : "К PAT"} <Icon name="arrow" size={16} /></Link></div>{e.flow.length > 0 ? <IuComponent p={e} editorial={false} /> : <PbComponent only={e.id} />}<QpComponent p={e} /><EaComponent p={e} sectionId="critical" editorial={false} /><EaComponent p={e} sectionId="primary" editorial={false} /><EaComponent p={e} sectionId="diagnostics" editorial={false} /><EaComponent p={e} sectionId="treatment" editorial={false} /><EaComponent p={e} sectionId="routing" editorial={false} /><Link className="button" to="/assessment"><Icon name="back" size={16} /> Первичная оценка и реанимация</Link></article>;
  }
  if (e.systemId === "respiratory") {
    return <P8Component p={e} />;
  }
  const m = ql.find(b => b.id === e.systemId);
  const C = [{
    id: "critical",
    label: "Ключевое"
  }, {
    id: "algorithm",
    label: "Алгоритм"
  }, {
    id: "diagnostics",
    label: "Диагностика"
  }, {
    id: "treatment",
    label: "Лечение"
  }, {
    id: "routing",
    label: "Маршрутизация"
  }, {
    id: "references",
    label: "Источники"
  }];
  const A = b => {
    setH(b);
    document.getElementById(b)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start"
    });
  };
  return <article className="protocol-page"><Breadcrumbs items={[{
      label: m?.title || "Первичная оценка",
      to: m ? `/system/${m.id}` : "/assessment"
    }, {
      label: e.short || e.title
    }]} /><div className="protocol-meta"><span className="age-pill"><Icon name="baby" size={14} /> Педиатрия</span><span>Версия {e.version}</span><span><Icon name="calendar" size={14} /> Структура обновлена {e.updatedAt}</span></div><PageHeader title={e.title} description={e.english} /><div className="protocol-actions"><G1Component id={e.id} /><button className={`button ${favorites.includes(e.id) ? "selected-button" : ""}`} onClick={() => toggleFavorite(e.id)} aria-pressed={favorites.includes(e.id)}><Icon name="bookmark" size={17} />{favorites.includes(e.id) ? "В избранном" : "В избранное"}</button><button className="button" onClick={() => window.print()}><Icon name="print" size={17} /> Печать</button><div className="font-controls"><Icon name="type" size={18} /><button disabled={fontSize <= 14} onClick={() => setFontSize(Math.max(14, fontSize - 1))} aria-label="Уменьшить шрифт">A−</button><span>{fontSize}</span><button disabled={fontSize >= 20} onClick={() => setFontSize(Math.min(20, fontSize + 1))} aria-label="Увеличить шрифт">A+</button></div></div><div className="review-banner"><span className="review-banner-icon"><Icon name="filecheck" size={23} /></span><div><strong>{Yl[e.status]}</strong><p>{e.status === "in_review" ? "Клиническое содержание добавлено и сопоставлено с источниками. Требуется независимое медицинское рецензирование; материал не утверждён." : e.status === "draft" ? getManual(e.id) ? "Исходное пособие доступно ниже. Его добавление не означает утверждения клинического алгоритма; редакционный протокол ещё не подготовлен." : "Требуется медицинская проверка. Клинические рекомендации и назначения ещё не добавлены." : "Сведения о медицинской проверке и источниках — в конце страницы."}</p></div><ScComponent>{e.status === "draft" ? "Черновик" : Yl[e.status]}</ScComponent></div>{e.scope && <div className="protocol-scope"><Icon name="users" size={18} /><div><strong>Область применения</strong><p>{e.scope}</p></div></div>}{e.summary && <div className="protocol-summary">{e.summary}</div>}<ManualViewer key={e.id} protocolId={e.id} /><QpComponent p={e} /><nav className="protocol-tabs" aria-label="Оглавление протокола">{C.map(b => <button key={b.id} className={h === b.id ? "active" : ""} onClick={() => A(b.id)}>{b.label}</button>)}</nav><K2Component p={e} section={P9[0]} /><section className="protocol-section"><div className="section-line"><h2>Первичная оценка</h2><span className="muted small">Общие инструменты</span></div><EaComponent p={e} sectionId="primary" /><div className="primary-links">{["pat", "abcde"].filter(b => b !== id).map(b => <Link key={b} className="primary-link" to={`/protocol/${b}`}><Icon name={b === "pat" ? "triangle" : "list"} size={21} /><strong>{b.toUpperCase()}</strong><span>{b === "pat" ? "Pediatric Assessment Triangle" : "Primary Assessment and Stabilization"}</span><Icon name="arrow" size={16} /></Link>)}</div><p className="section-footnote">{e.clinicalContent.length ? "Страницы PAT/ABCDE пока содержат шаблоны. Клинические первоисточники приведены в каждом блоке этой карточки." : "Компоненты оценки для этого состояния будут выделены после медицинской проверки."}</p></section><section id="algorithm" className="protocol-section algorithm-section"><div className="section-line"><h2>Алгоритм действий</h2><span className="mono-label">{e.flow.length ? "ИНДИВИДУАЛЬНАЯ СХЕМА · ПРОЕКТ" : "СХЕМА / ПРЕДПРОСМОТР"}</span></div><div className="flow-panel"><>{e.flow.length ? <IuComponent p={e} /> : <QSComponent title={e.short || e.title} />}</></div></section>{P9.slice(1).map(section => <K2Component key={section.id} p={e} section={section} />)}<section id="references" className="protocol-section"><h2>Источники и рецензирование</h2><Z8Component p={e} />{getManual(e.id) ? <OSComponent protocolId={e.id} /> : <X8Component p={e} />}<dl className="review-grid">{[["Клинические источники", getManual(e.id) ? "Исходный PDF и ссылка на рекомендации — выше" : e.references.length ? `${e.references.length} — см. список выше` : "Не добавлены"], ["Редакторская сверка источников", e.evidenceCheckedAt || "Не проводилась"], ["Год / версия источника", getManual(e.id) ? getManual(e.id).edition : e.references.length ? "Указаны для каждого источника" : "—"], ["Исходный документ", getManual(e.id) ? `${getManual(e.id).filename} · встроен в страницу` : e.sourceDocument ? "Загружен; доступен для сравнения" : "Не загружен"], ["Автор материала", getManual(e.id) ? getManual(e.id).author || getManual(e.id).publisher : e.review.author || "Не указан"], ["Медицинский рецензент", e.review.reviewer || "Не назначен"], ["Последняя медицинская проверка", e.review.checkedAt || "Не проводилась"], ["Статус утверждения", e.status === "approved" && e.review.approvedBy ? `Утверждено: ${e.review.approvedBy}` : "Не утверждено"]].map(([b, I]) => <div key={b}><dt>{b}</dt><dd>{I}</dd></div>)}</dl></section><div className="protocol-end"><Link to={m ? `/system/${m.id}` : "/assessment"} className="button"><Icon name="back" size={16} /> К разделу</Link><button className="text-link" onClick={() => A("algorithm")}>Вернуться к алгоритму <Icon name="up" size={16} /></button></div></article>;
}

export { ProtocolPage };
