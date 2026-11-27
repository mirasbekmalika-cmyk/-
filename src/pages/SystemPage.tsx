// @ts-nocheck
import { Link, useParams } from 'react-router-dom';
import React from 'react';
import { Icon } from '../components/Icon';
import { W8Component } from '../components/age-filter';
import { XIComponent } from '../components/catalog-cards';
import { Breadcrumbs, EmptyState, NmComponent, PageHeader, SI, am, to } from '../components/common';
import { Yl, normalizeSearch, ro } from '../data/catalog';
import { ql } from '../lib/supabase-and-topics';
import { NotFoundPage } from './NotFoundPage';
import { useAgeFilter } from '../state/navigation';

function SystemPage() {
  const {
    id
  } = useParams();
  const e = ql.find(w => w.id === id);
  const [t, setT] = React.useState("");
  const [r, setR] = React.useState("all");
  const {
    age,
    setAge
  } = useAgeFilter();
  const g = e && (e.ageGroups.length === 1 ? age !== e.ageGroups[0] : age !== "all" && !e.ageGroups.includes(age));
  React.useEffect(() => {
    setT("");
    setR("all");
  }, [id, age]);
  React.useEffect(() => {
    if (g && e) {
      setAge(e.ageGroups[0]);
    }
  }, [id, age, g]);
  if (!e) {
    return <NotFoundPage />;
  }
  if (g) {
    return <EmptyState icon="baby" title="Открываем детский раздел">Новорождённые и младенцы относятся к педиатрии.</EmptyState>;
  }
  if (id === "respiratory") {
    return <W8Component age={age} setAge={setAge} />;
  }
  const m = e.ageGroups.length === 1 ? e.ageGroups[0] : age;
  const C = am(id, m);
  const A = C.filter(w => normalizeSearch([w.title, w.english, ...w.keywords].join(" ")).includes(normalizeSearch(t)) && (r === "all" || w.status === r));
  const b = C.some(w => w.age === "pediatric");
  const length = A.filter(w => w.sourceDocument).length;
  const description = m === "adult" ? "Материалы для взрослых пациентов. Раздел готовится к наполнению." : id === "respiratory" ? `${m === "all" ? "Дети: " : ""}${to(C.length, ["тема", "темы", "тем"])} · ${SI(C)}${m === "all" ? ". Материалы для взрослых готовятся." : ""}` : e.summary;
  return <><Breadcrumbs items={[{
      label: "Каталог",
      to: `/catalog?age=${m}`
    }, {
      label: ro(m),
      to: `/catalog?age=${m}`
    }, {
      label: e.title
    }]} /><div className="system-page-title"><span className="large-system-icon"><Icon name={e.icon} size={34} /></span><PageHeader eyebrow={ro(m).toLocaleUpperCase("ru")} title={e.title} description={description}>{e.ageGroups.length > 1 ? <NmComponent /> : <span className="catalog-age-tag age-pediatric">Только дети</span>}</PageHeader></div>{id === "respiratory" && b && <div className="system-banner"><Icon name="stethoscope" size={22} /><div><strong>Педиатрическая первичная оценка</strong><p>Общие инструменты и реанимационные алгоритмы для детей — в отдельном разделе.</p></div><Link className="button" to="/assessment?age=pediatric">PAT / ABCDE / BLS / PALS <Icon name="arrow" size={15} /></Link></div>}{id === "respiratory" && b && <div className="system-tools"><Link className="button" to="/comparison/respiratory?age=pediatric"><Icon name="grid" size={16} /> Сравнить детские дыхательные состояния</Link><Link className="text-link" to="/sources">Реестр рецензирования <Icon name="arrow" size={15} /></Link></div>}<div className="filter-bar"><label className="inline-search"><Icon name="search" size={18} /><input placeholder="Поиск в разделе…" aria-label="Поиск в разделе" value={t} onChange={w => setT(w.target.value)} /></label><label className="status-filter"><Icon name="sliders" size={16} /><select aria-label="Статус медицинской проверки" value={r} onChange={w => setR(w.target.value)}><option value="all">Все статусы</option>{...Object.entries(Yl).map(([w, M]) => <option key={w} value={w}>{M}</option>)}</select></label></div>{A.length ? <div className="protocol-list">{A.map((w, index) => <XIComponent key={w.id} p={w} index={index} />)}</div> : <EmptyState icon={e.icon} title={t || r !== "all" ? "Материалы не найдены" : m === "adult" ? "Взрослые протоколы готовятся" : "Материалы этого раздела готовятся"}>{t || r !== "all" ? "Измените поисковый запрос или статус материала." : "После загрузки и проверки документов здесь появятся протоколы для этой группы пациентов."}</EmptyState>}{length > 0 && <div className="info-note"><Icon name="filecheck" /><p>Страницы с загруженными документами содержат редакционные проекты. Они требуют независимого медицинского рецензирования и локального согласования в РК.</p></div>}</>;
}

export { SystemPage };
