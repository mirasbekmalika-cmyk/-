// @ts-nocheck
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { XIComponent } from '../components/catalog-cards';
import { Breadcrumbs, EmptyState, PageHeader } from '../components/common';
import { xt } from '../lib/supabase-and-topics';
import { useApp } from '../state/app-state';

function SavedListPage({
  type
}) {
  const {
    favorites,
    recent
  } = useApp();
  const r = (type === "favorites" ? favorites : recent).map(o => xt.find(c => c.id === o)).filter(o => !!o);
  return <><Breadcrumbs items={[{
      label: type === "favorites" ? "Избранное" : "Недавно открытые"
    }]} /><PageHeader title={type === "favorites" ? "Избранные материалы" : "Недавно открытые"} description={type === "favorites" ? "Сохранённые вами страницы для быстрого доступа." : "Последние восемь страниц на этом устройстве."} />{r.length ? <div className="protocol-list">{r.map(o => <XIComponent key={o.id} p={o} />)}</div> : <EmptyState icon={type === "favorites" ? "bookmark" : "history"} title={type === "favorites" ? "Сохраните нужное под рукой" : "Пока здесь пусто"} action=<Link className="button primary" to="/catalog">Открыть каталог <Icon name="arrow" size={15} /></Link>>{type === "favorites" ? "Нажмите на закладку рядом с протоколом — он появится на этой странице." : "Откройте протокол, и он появится в истории."}</EmptyState>}</>;
}

export { SavedListPage };
