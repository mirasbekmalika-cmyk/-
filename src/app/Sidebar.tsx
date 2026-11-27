// @ts-nocheck
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { APP_VERSION } from '../lib/supabase-and-topics';
import { useApp } from '../state/app-state';
import { primaryNav, workspaceNav } from '../state/navigation';

function Sidebar({
  close
}) {
  const {
    favorites
  } = useApp();
  return <><Link to="/" className="brand" onClick={close}><span className="brand-symbol"><Icon name="plus" size={28} strokeWidth={3} /></span><span>Неотложка<span className="brand-plus">+</span><small>КЛИНИЧЕСКАЯ МЕТОДИЧКА</small></span></Link><div className="sidebar-body"><div className="nav-caption">НАВИГАЦИЯ</div><nav className="side-nav" aria-label="Основная навигация">{primaryNav.map(t => <NavLink key={t.to} end={t.to === "/"} to={t.to} onClick={close}><Icon name={t.icon} size={20} /><span>{t.label}</span>{t.to === "/catalog" && <small>13</small>}</NavLink>)}</nav><div className="nav-caption workspace-caption">РАБОЧЕЕ ПРОСТРАНСТВО</div><nav className="side-nav" aria-label="Рабочее пространство">{workspaceNav.map(t => <NavLink key={t.to} to={t.to} onClick={close}><Icon name={t.icon} size={20} /><span>{t.label}</span>{t.to === "/favorites" && favorites.length > 0 && <small>{favorites.length}</small>}</NavLink>)}</nav><div className="sidebar-note"><Icon name="shield" size={20} /><strong>Проверяемость — в основе</strong><p>Источники и статус проверки на каждой странице.</p><Link to="/about" onClick={close}>О проекте <Icon name="arrow" size={14} /></Link></div></div><div className="sidebar-bottom"><span className="country-mark">KZ</span><div>Для врачей Казахстана<small>Рабочая версия {APP_VERSION}</small></div></div></>;
}

export { Sidebar };
