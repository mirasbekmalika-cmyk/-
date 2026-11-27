// @ts-nocheck
import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { SearchDialog } from './SearchDialog';
import { Sidebar } from './Sidebar';
import { Icon } from '../components/Icon';
import { AboutPage } from '../pages/AboutPage';
import { AssessmentPage } from '../pages/AssessmentPage';
import { CalculatorsPage } from '../pages/CalculatorsPage';
import { CatalogPage } from '../pages/CatalogPage';
import { ComingSoonPage } from '../pages/ComingSoonPage';
import { EditorPage } from '../pages/EditorPage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProtocolPage } from '../pages/ProtocolPage';
import { RespiratoryComparisonPage } from '../pages/RespiratoryComparisonPage';
import { SavedListPage } from '../pages/SavedListPage';
import { SourcesPage } from '../pages/SourcesPage';
import { SystemPage } from '../pages/SystemPage';
import { TeamPage } from '../pages/TeamPage';
import { useApp } from '../state/app-state';

function AppShell() {
  const [s, setS] = React.useState(false);
  const [t, setT] = React.useState(false);
  const {
    theme,
    setTheme
  } = useApp();
  const c = useLocation();
  const hRef = React.useRef(null);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    setS(false);
    hRef.current?.focus({
      preventScroll: true
    });
  }, [c.pathname]);
  React.useEffect(() => {
    const g = m => {
      if ((m.ctrlKey || m.metaKey) && m.key.toLowerCase() === "k" || m.key === "/" && !(m.target instanceof HTMLInputElement) && !(m.target instanceof HTMLTextAreaElement)) {
        m.preventDefault();
        setT(true);
      }
      if (m.key === "Escape") {
        setS(false);
      }
    };
    window.addEventListener("keydown", g);
    return () => window.removeEventListener("keydown", g);
  }, []);
  return <div className="app-shell"><a href="#main" className="skip-link">Перейти к содержимому</a>{s && <button className="sidebar-scrim" aria-label="Закрыть меню" onClick={() => setS(false)} />}<aside className={`sidebar ${s ? "is-open" : ""}`}><Sidebar close={() => setS(false)} /></aside><div className="main-shell"><header className="topbar"><button className="icon-button mobile-menu" aria-label="Открыть меню" aria-expanded={s} onClick={() => setS(!s)}><Icon name="menu" /></button><button className="global-search" onClick={() => setT(true)}><Icon name="search" size={19} /><span>Найти диагноз, симптом, алгоритм…</span><kbd>⌘ K</kbd></button><div className="top-actions"><Link className="team-top-link" to="/team"><Icon name="users" size={18} /><span>Редакция</span></Link><span className="edition"><span className="dot" /> РАБОЧАЯ ВЕРСИЯ</span><span className="top-divider" /><button className="icon-button" aria-label={theme === "light" ? "Включить тёмную тему" : "Включить светлую тему"} onClick={() => setTheme(theme === "light" ? "dark" : "light")}><Icon name={theme === "light" ? "moon" : "sun"} size={20} /></button><Link className="icon-button" to="/favorites" aria-label="Открыть избранное"><Icon name="bookmark" size={20} /></Link><span className="language-chip" title="Русский язык. Казахская версия готовится.">RU</span></div></header><main id="main" tabIndex={-1} ref={hRef}><Routes><Route path="/team" element=<TeamPage /> /><Route path="/editor" element=<EditorPage /> /><Route path="/editor/:id" element=<EditorPage /> /><Route path="/" element=<HomePage /> /><Route path="/comparison/respiratory" element=<RespiratoryComparisonPage /> /><Route path="/catalog" element=<CatalogPage /> /><Route path="/system/:id" element=<SystemPage /> /><Route path="/assessment" element=<AssessmentPage /> /><Route path="/emergency" element=<AssessmentPage emergency /> /><Route path="/protocol/:id" element=<ProtocolPage /> /><Route path="/calculators" element=<CalculatorsPage /> /><Route path="/favorites" element=<SavedListPage type="favorites" /> /><Route path="/recent" element=<SavedListPage type="recent" /> /><Route path="/sources" element=<SourcesPage /> /><Route path="/about" element=<AboutPage /> /><Route path="/medications" element=<ComingSoonPage type="medications" /> /><Route path="/procedures" element=<ComingSoonPage type="procedures" /> /><Route path="*" element=<NotFoundPage /> /></Routes></main><footer className="site-footer"><span>Неотложка+ <span className="footer-dot">·</span> Электронная клиническая методичка</span><Link to="/about"><Icon name="info" size={14} /> О проекте и статусе материалов</Link></footer></div><Link to="/emergency" className="emergency-fab"><Icon name="zap" size={18} /><span>Экстренные алгоритмы</span><Icon name="arrow" size={15} /></Link>{t && <SearchDialog close={() => setT(false)} />}</div>;
}

export { AppShell };
