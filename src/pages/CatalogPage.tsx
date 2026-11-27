// @ts-nocheck
import React from 'react';
import { Icon } from '../components/Icon';
import { Breadcrumbs, CatalogAgeTabs, CatalogGroup, DI, PageHeader, am, e7 } from '../components/common';
import { normalizeSearch } from '../data/catalog';
import { useAgeFilter } from '../state/navigation';

function CatalogPage() {
  const [s, setS] = React.useState("");
  const {
    age,
    setAge
  } = useAgeFilter();
  const r = normalizeSearch(s);
  const o = (h, g) => !r || normalizeSearch(`${h.title} ${h.summary} ${am(h.id, g).map(m => [m.title, m.english, ...m.keywords].join(" ")).join(" ")}`).includes(r);
  const c = DI.filter(h => age === "all" || age === h.id);
  return <><Breadcrumbs items={[{
      label: "Каталог состояний"
    }]} /><PageHeader eyebrow="КЛИНИЧЕСКИЕ РАЗДЕЛЫ" title="Каталог состояний" description="Выберите возраст пациента, затем систему органов или состояние." /><div className="catalog-controls"><CatalogAgeTabs age={age} setAge={setAge} /><label className="inline-search catalog-search"><Icon name="search" size={18} /><input aria-label="Поиск разделов и состояний" placeholder="Система, состояние или симптом…" value={s} onChange={h => setS(h.target.value)} />{s && <button type="button" className="icon-button" aria-label="Очистить поиск по каталогу" onClick={() => setS("")}><Icon name="x" size={16} /></button>}</label></div><div className="catalog-age-sections">{c.map(group => {
        const g = e7(group.id);
        return <CatalogGroup key={group.id} group={group} systems={g.filter(m => o(m, group.id))} query={s.trim()} fullCount={g.length} setAge={setAge} />;
      })}</div><div className="info-note catalog-status-note"><Icon name="info" size={18} /><p>«В подготовке» — тема без готового содержания. «На рецензировании» — проект, ожидающий медицинской проверки. Проверенные и утверждённые материалы учитываются отдельно.</p></div></>;
}

export { CatalogPage };
