// @ts-nocheck
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Breadcrumbs, EmptyState, NmComponent, PageHeader, ScComponent } from '../components/common';
import { getManual } from '../data/manuals';
import { PbComponent } from '../features/editor';
import { xt } from '../lib/supabase-and-topics';
import { useAgeFilter } from '../state/navigation';

function AssessmentPage({
  emergency = false
}) {
  const {
    age,
    setAge
  } = useAgeFilter();
  return <><Breadcrumbs items={[{
      label: emergency ? "Экстренные алгоритмы" : "Первичная оценка"
    }]} /><PageHeader eyebrow={emergency ? "ЭКСТРЕННЫЙ РАЗДЕЛ" : "ОБЩИЕ ИНСТРУМЕНТЫ"} title={emergency ? "Реанимационные алгоритмы" : "Первичная оценка и реанимация"} description="Самостоятельные инструменты. Выбор определяется клинической ситуацией."><NmComponent /></PageHeader><div className="info-note"><Icon name="info" /><p>PAT, ABCDE, Pediatric BLS и PALS не образуют обязательную последовательность для каждого пациента. PAT — визуальная оценка ребёнка; ABCDE — системный первичный осмотр.</p></div>{age !== "adult" && !emergency && <PbComponent />}{age === "adult" ? <EmptyState icon="users" title="Взрослые алгоритмы готовятся">Для взрослых предусмотрена отдельная структура, без переноса педиатрических рекомендаций.<br /><button className="button" onClick={() => setAge("pediatric")}>Показать детские материалы</button></EmptyState> : <div className="assessment-page-grid">{xt.filter(a => a.systemId === "initial" && (!emergency || a.kind === "resuscitation")).map(a => <Link key={a.id} to={`/protocol/${a.id}`} className="assessment-large"><span className="assessment-large-icon"><Icon name={a.id === "pat" ? "triangle" : a.id === "abcde" ? "list" : "heart"} size={29} /></span><div className="eyebrow">{a.kind === "resuscitation" ? "РЕАНИМАЦИЯ" : "ПЕРВИЧНАЯ ОЦЕНКА"}</div><h2>{a.short}</h2><p>{a.english}</p><div className="indications"><strong>{a.id === "pat" || a.id === "abcde" ? "Визуальная схема" : getManual(a.id) ? "Исходное пособие" : a.kind === "resuscitation" ? "Клинические показания" : "Содержание инструмента"}</strong><span>{a.id === "pat" ? "Три компонента первого впечатления" : a.id === "abcde" ? "Пять этапов первичного осмотра" : getManual(a.id) ? `${getManual(a.id).pages} страниц · PDF внутри раздела` : "Будут добавлены после проверки источников."}</span></div><div className="assessment-large-bottom"><ScComponent>{a.id === "pat" || a.id === "abcde" ? "Схема добавлена" : getManual(a.id) ? getManual(a.id).archive ? "Архивная методичка" : "Методичка добавлена" : undefined}</ScComponent><Icon name="arrow" size={18} /></div></Link>)}</div>}{emergency && <Link className="button" to="/assessment"><Icon name="back" size={16} /> PAT и ABCDE</Link>}<div className="draft-notice"><Icon name="lock" /><div><strong>Статус общих алгоритмов</strong><span>В BLS и PALS доступны исходные PDF с указанием редакции. PAT и ABCDE представлены наглядными схемами; утверждённых протоколов в этой версии нет.</span></div></div></>;
}

export { AssessmentPage };
