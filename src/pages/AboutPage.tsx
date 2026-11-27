// @ts-nocheck
import { Icon } from '../components/Icon';
import { Breadcrumbs, PageHeader } from '../components/common';
import { APP_VERSION, updatedAt } from '../lib/supabase-and-topics';

function AboutPage() {
  return <><Breadcrumbs items={[{
      label: "О проекте"
    }]} /><PageHeader title="Неотложка+" description="Электронная клиническая методичка по неотложной медицине для врачей Казахстана." /><div className="content-card about-card"><span className="large-system-icon"><Icon name="cross" size={32} /></span><h2>Информация, которую легко найти и проверить</h2><p>Проект объединяет первичную оценку, клинические протоколы и наглядные алгоритмы. Дыхательная система включает симптомы, заболевания и критические состояния с отдельными возрастными страницами.</p><h3>Статус текущей версии</h3><p>Это рабочая версия {APP_VERSION}. Дыхательная библиотека расширена: взрослые, дети и новорождённые; единое оглавление, алгоритмы и места для изображений. PAT и ABCDE представлены наглядными схемами. В BLS и PALS добавлены исходные PDF с оглавлением: архивная редакция RCUK 2005 и учебное пособие Satori 2026.01. Редакционные алгоритмы BLS/PALS ещё не подготовлены. Независимая медицинская проверка не проводилась. Проект не имеет статуса официально утверждённой республиканской методички.</p><h3>Постепенное расширение</h3><p>Предусмотрены взрослые и педиатрические разделы, русский и казахский языки, расчётные модули и последующая офлайн-работа. Сейчас интерфейс доступен на русском; офлайн-режим ещё не включён.</p><div className="about-meta"><span><Icon name="calendar" size={16} /> Обновление структуры: {updatedAt}</span><span><Icon name="monitor" size={16} /> Избранное и настройки сохраняются на устройстве</span></div><a href="https://emergencymedicinekz.netlify.app/#/" target="_blank" rel="noreferrer" className="text-link">Прежняя версия сайта <Icon name="external" size={15} /></a></div></>;
}

export { AboutPage };
