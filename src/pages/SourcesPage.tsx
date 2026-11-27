// @ts-nocheck
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Breadcrumbs, HSComponent, PageHeader } from '../components/common';
import { xt } from '../lib/supabase-and-topics';

function SourcesPage() {
  return <><Breadcrumbs items={[{
      label: "Источники"
    }]} /><PageHeader title="Источники и рецензирование" description="Прозрачное происхождение каждой клинической рекомендации." /><div className="metrics-grid"><div><strong>{xt.filter(s => s.status === "reviewed" || s.status === "approved").length}</strong><span>Проверенных протоколов</span></div><div><strong>{new Set(xt.flatMap(s => s.references.map(e => e.url))).size}</strong><span>Добавленных источников</span></div><div><strong>{xt.filter(s => s.status === "draft" || s.status === "in_review").length}</strong><span>Страниц в подготовке</span></div></div><div className="content-card"><h2>Методички по реанимации</h2><p>Два исходных PDF доступны внутри соответствующих разделов. Статус их медицинского рецензирования указан отдельно.</p><div className="primary-links"><Link className="primary-link" to="/protocol/pediatric-bls"><Icon name="book" /><strong>Pediatric BLS</strong><span>RCUK · архив 2005 · 15 страниц</span><Icon name="arrow" size={16} /></Link><Link className="primary-link" to="/protocol/pals"><Icon name="book" /><strong>PALS</strong><span>Satori · 2026.01 · 76 страниц</span><Icon name="arrow" size={16} /></Link></div></div><HSComponent /><div className="content-card"><h2>Как проверяется материал</h2><ol className="editorial-steps">{[["Исходный документ", "Сохраняем документ автора, версию и содержание без потери медицинского смысла."], ["Сопоставление с рекомендациями", "Отдельно проверяем протоколы МЗ РК и подходящие международные руководства."], ["Медицинское рецензирование", "Показываем расхождения, фиксируем рецензента и дату проверки."], ["Публикация с явным статусом", "Разделяем черновик, проверенный материал и формально утверждённую версию."]].map(([s, e], t) => <li key={s}><span>{String(t + 1).padStart(2, "0")}</span><div><strong>{s}</strong><p>{e}</p></div></li>)}</ol></div><div className="info-note"><Icon name="info" /><p>Прежний сайт использован как референс навигации. Его медицинское содержание не перенесено автоматически и не считается проверенным.</p></div></>;
}

export { SourcesPage };
