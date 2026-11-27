// @ts-nocheck
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { HomeAssessmentSection, SystemCard } from '../components/catalog-cards';
import { NmComponent, PageHeader, ScComponent } from '../components/common';
import { ql, xt } from '../lib/supabase-and-topics';
import { useApp } from '../state/app-state';

function HomePage() {
  const {
    recent,
    age
  } = useApp();
  return <><PageHeader eyebrow="КЛИНИЧЕСКИЙ НАВИГАТОР" title="Нужная информация. В нужный момент." description="Электронная клиническая методичка по неотложной медицине."><NmComponent /></PageHeader><HomeAssessmentSection /><div className="catalog-heading"><div><h2>Каталог неотложных состояний</h2><p>От первичной оценки к алгоритму по системе органов</p></div><Link to="/catalog" className="text-link">Открыть каталог <Icon name="arrow" size={16} /></Link></div><div className="systems-grid">{ql.slice(0, 6).filter(t => age === "all" || t.ageGroups.includes(age)).map(t => <SystemCard key={t.id} system={t} />)}</div><Link to="/catalog" className="view-all">Все 13 систем органов <Icon name="chevronDown" size={16} /></Link><div className="home-bottom"><section className="respiratory-preview"><div className="section-line"><h2><Icon name="lungs" size={20} /> Первый раздел в работе</h2><ScComponent blue>Педиатрия</ScComponent></div><h3>Дыхательная система</h3><p>Семь статей по неотложным состояниям дыхательной системы у детей.</p><div className="topic-chips"><Link to="/protocol/severe-pneumonia">Тяжёлая пневмония</Link><Link to="/protocol/croup">Круп</Link><Link to="/protocol/bronchiolitis">Бронхиолит</Link><Link to="/system/respiratory">Все темы <Icon name="arrow" size={13} /></Link></div><Link to="/system/respiratory" className="text-link">Перейти в раздел <Icon name="arrow" size={15} /></Link></section><section className="recent-panel"><h2><Icon name="history" size={20} /> Недавно открытые</h2>{recent.length ? <div>{recent.slice(0, 3).map(t => {
            const a = xt.find(r => r.id === t);
            if (a) {
              return <Link key={t} to={`/protocol/${t}`} className="recent-row"><Icon name="file" size={17} /><span>{a.short || a.title}</span><Icon name="chevron" size={14} /></Link>;
            }
            return null;
          })}</div> : <div className="recent-empty"><Icon name="clock" size={25} /><p>Ваши последние материалы<br />появятся здесь</p></div>}</section></div><div className="draft-notice"><Icon name="shield" size={19} /><div><strong>Разрабатываем вместе с врачами</strong><span>Дыхательные темы, алгоритмы и клинические случаи собраны в едином формате.</span></div><Link to="/about" aria-label="Подробнее о статусе методички"><Icon name="up" size={19} /></Link></div></>;
}

export { HomePage };
