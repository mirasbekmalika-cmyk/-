// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { QS1Component } from '../components/common';
import { respiratoryComparisonRows } from '../data/manuals';
import { FaComponent } from '../features/editor-forms';
import { xt } from '../lib/supabase-and-topics';

function RespiratoryComparisonPage() {
  const [s, setS] = React.useState(false);
  return <><nav className="breadcrumbs" aria-label="Хлебные крошки"><Link to="/">Главная</Link><Icon name="chevron" size={12} /><Link to="/system/respiratory">Дыхательная система</Link><Icon name="chevron" size={12} /><span>Сравнение состояний</span></nav><div className="page-heading"><div><div className="eyebrow">ПЕДИАТРИЯ · ДЫХАТЕЛЬНЫЕ СОСТОЯНИЯ</div><h1>Быстрое сравнение состояний</h1><p>Ориентиры для выбора страницы. Таблица не исключает диагноз и не заменяет клиническую оценку.</p></div></div><div className="comparison-tools flow-view-toggle" role="group" aria-label="Вид сравнения"><button className={s ? "" : "active"} aria-pressed={!s} onClick={() => setS(false)}>Карточки</button><button className={s ? "active" : ""} aria-pressed={s} onClick={() => setS(true)}>Таблица</button></div>{s ? <QS1Component /> : <div className="comparison-grid">{respiratoryComparisonRows.map(([t, a, r, o, c]) => {
        const h = xt.find(g => g.id === t);
        return <article key={t} className="comparison-card"><Link to={`/protocol/${t}`}><h2>{h.title}<Icon name="up" size={18} /></h2></Link><dl><div><dt>Распознавание</dt><dd>{a}</dd></div><div><dt>Признаки опасности</dt><dd>{r}</dd></div><div><dt>Первое решение</dt><dd>{o}</dd></div></dl><FaComponent ids={[...c]} p={h} /><Link className="text-link" to={`/protocol/${t}`}>Открыть алгоритм <Icon name="arrow" size={15} /></Link></article>;
      })}</div>}</>;
}

export { RespiratoryComparisonPage };
