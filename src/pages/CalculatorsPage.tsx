// @ts-nocheck
import React from 'react';
import { Icon } from '../components/Icon';
import { Modal } from '../components/Modal';
import { Breadcrumbs, EmptyState, PageHeader, ScComponent } from '../components/common';
import { Y9 } from '../data/catalog';

function CalculatorsPage() {
  const [s, setS] = React.useState(null);
  return <><Breadcrumbs items={[{
      label: "Калькуляторы"
    }]} /><PageHeader title="Клинические калькуляторы" description="Раздел для валидированных расчётов с проверкой единиц и ограничений." /><div className="info-note"><Icon name="lock" /><p>Расчёты станут доступны после проверки формул и клинических источников. Непроверенные формулы не используются.</p></div><div className="calculator-grid">{Y9.map(t => <button key={t.id} className="calculator-card" onClick={() => setS(t.id)}><span className="system-icon"><Icon name={t.icon} size={26} /></span><h2>{t.title}</h2><p>{t.description}</p><div><ScComponent>В подготовке</ScComponent><Icon name="arrow" size={17} /></div></button>)}</div><div className="checklist-card"><h2>Что будет в каждом калькуляторе</h2><div>{["Проверенный источник формулы", "Явные единицы измерения", "Диапазоны и ограничения ввода", "Объяснение результата"].map(t => <span key={t}><Icon name="check" size={17} />{t}</span>)}</div></div>{s && <Modal title={Y9.find(t => t.id === s).title} onClose={() => setS(null)}><EmptyState icon="calculator" title="Формула ожидает проверки">Исходные данные и расчёт появятся после выбора валидированного источника и медицинского рецензирования.</EmptyState></Modal>}</>;
}

export { CalculatorsPage };
