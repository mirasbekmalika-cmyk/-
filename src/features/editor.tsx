// @ts-nocheck
import { ReviewStatusBanner } from '../components/ReviewStatusBanner';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { Icon } from '../components/Icon';
import { Lb, Y1, su } from '../data/catalog';
import { zh } from '../data/topic-sections';
import { useTeam } from './auth';
import { EaComponent, FaComponent, IuComponent } from './editor-forms';
import { Y8, e2 } from '../lib/flow-and-images';
import { useApp } from '../state/app-state';

function G1Component({
  id
}) {
  if (useTeam().canEdit) {
    return <Link className="button" to={`/editor/${id}`}><Icon name="file" size={16} />Редактировать статью</Link>;
  }
  return null;
}

const j8 = `
.av-guide{color:#203249;font:inherit;margin:24px 0;min-width:0}.av-guide *{box-sizing:border-box}.av-panel{background:#fff;border:1px solid #dfe7ef;border-radius:22px;padding:26px;margin:20px 0;scroll-margin-top:90px}.av-panel h2{margin:0 0 9px;font-size:clamp(22px,3vw,29px);color:#152c45;line-height:1.35}.av-sub{color:#64748b;margin:0 0 22px;line-height:1.6}.av-tag{display:inline-block;color:#107b70;background:#e4f5f1;border-radius:8px;padding:4px 10px;margin-right:10px;font-size:15px;vertical-align:middle}.av-pat-grid{display:grid;grid-template-columns:minmax(240px,.8fr) minmax(0,1.2fr);gap:26px;align-items:center}.av-triangle{margin:0;min-width:0;text-align:center}.av-triangle svg{display:block;width:100%;max-width:390px;height:auto;margin:auto}.av-triangle figcaption{font-size:14px;color:#64748b;line-height:1.5}.av-domains{display:grid;gap:14px}.av-domain{padding:18px 20px;border-radius:15px;border-left:4px solid var(--av-color);background:var(--av-bg)}.av-domain h3{font-size:20px;color:var(--av-color);margin:0 0 8px;line-height:1.4}.av-domain p,.av-points p{margin:4px 0;line-height:1.65}.av-appearance{--av-color:#4966c3;--av-bg:#eef1fd}.av-breathing{--av-color:#107f78;--av-bg:#eaf7f5}.av-circulation{--av-color:#a7621c;--av-bg:#fff5e9}.av-steps{list-style:none!important;margin:0!important;padding:0!important;display:grid;gap:12px}.av-step{display:grid;grid-template-columns:64px minmax(180px,.9fr) minmax(0,1.3fr);gap:18px;align-items:center;background:var(--av-bg);padding:18px;border-radius:16px;margin:0!important}.av-letter{display:grid;place-items:center;width:64px;height:64px;border-radius:14px;background:var(--av-color);color:white;font-size:38px;font-weight:750;line-height:1}.av-name h3{font-size:21px;line-height:1.4;margin:0 0 5px;color:#203249}.av-name small{font-size:15px;color:var(--av-color)}.av-points{font-size:16px;min-width:0}.av-a{--av-color:#4265c5;--av-bg:#edf1fd}.av-b{--av-color:#087f85;--av-bg:#e9f7f7}.av-c{--av-color:#b26620;--av-bg:#fff4e6}.av-d{--av-color:#8054b9;--av-bg:#f4eefc}.av-e{--av-color:#a34c6c;--av-bg:#fbedf3}.av-urgent{padding:20px 24px;border-radius:17px;background:#153e4a;color:#fff;margin-top:22px;line-height:1.65}.av-urgent strong{display:block;font-size:20px;margin-bottom:5px}.av-urgent p{margin:0;color:#d2e7e9}.av-foot{font-size:14px;color:#64748b;line-height:1.6}.av-nav{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px}.av-nav a{padding:9px 16px;border:1px solid #dfe7ef;border-radius:10px;text-decoration:none;color:#176b78;background:#fff}.av-nav a:hover{background:#eaf7f5}.av-nav a:focus-visible{outline:3px solid #087f85;outline-offset:3px}
@media(max-width:1000px){.av-step{grid-template-columns:58px minmax(0,1fr)}.av-letter{width:58px;height:58px}.av-points{grid-column:2}.av-pat-grid{grid-template-columns:1fr}.av-triangle svg{max-width:330px}}
@media(max-width:520px){.av-panel{padding:18px 14px;border-radius:17px}.av-step{padding:14px;gap:10px 13px;grid-template-columns:48px minmax(0,1fr)}.av-letter{width:48px;height:48px;font-size:30px;border-radius:11px}.av-name h3{font-size:18px}.av-points{grid-column:1/-1;font-size:16px}.av-domain{padding:15px}.av-domain h3{font-size:19px}.av-urgent{padding:18px}.av-urgent strong{font-size:18px}.av-guide{margin:18px 0}}
@media print{.av-nav{display:none}.av-panel{break-inside:avoid}.av-step,.av-domain{break-inside:avoid} .av-guide{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
`;

const G8 = '<section class="av-panel" aria-label="PAT — первое впечатление"><h2><span class="av-tag">01</span>PAT · Первое впечатление</h2><p class="av-sub">Визуально и на слух, без оборудования</p><div class="av-pat-grid"><figure class="av-triangle"><svg viewBox="0 0 400 360" role="img" aria-label="Треугольник PAT: внешний вид, работа дыхания, кровообращение по коже"><path d="M200 58L48 300H352Z" fill="#f5f9fd" stroke="#dfe7ef"/><path d="M200 58L48 300" stroke="#5776d6" stroke-width="11" stroke-linecap="round"/><path d="M200 58L352 300" stroke="#13978e" stroke-width="11" stroke-linecap="round"/><path d="M48 300H352" stroke="#d38130" stroke-width="11" stroke-linecap="round"/><g fill="white" stroke-width="4"><circle cx="200" cy="58" r="11" stroke="#5776d6"/><circle cx="48" cy="300" r="11" stroke="#d38130"/><circle cx="352" cy="300" r="11" stroke="#13978e"/></g><g font-family="Arial,sans-serif" text-anchor="middle"><text x="200" y="35" font-size="21" font-weight="700" fill="#4966c3">Внешний вид</text><text x="200" y="188" font-size="43" font-weight="700" fill="#152c45">PAT</text><text x="200" y="218" font-size="17" fill="#64748b">Оценка с порога</text><text x="320" y="178" font-size="17" fill="#107f78" transform="rotate(58 320 178)">Работа дыхания</text><text x="200" y="334" font-size="18" fill="#a7621c">Кровообращение по коже</text></g></svg><figcaption>Три компонента оцениваются вместе</figcaption></figure><div class="av-domains"><div class="av-domain av-appearance"><h3>Внешний вид</h3><p>Тонус · контакт · утешаемость</p><p>Взгляд · речь или плач</p></div><div class="av-domain av-breathing"><h3>Работа дыхания</h3><p>Втяжения · поза · раздувание крыльев носа</p><p>Патологические дыхательные шумы</p></div><div class="av-domain av-circulation"><h3>Кровообращение по коже</h3><p>Бледность · мраморность · цианоз</p></div></div></div></section>';

const T8 = [["a", "A", "Airway", "Дыхательные пути", "Проходимость · голос или плач", "Стридор · признаки обструкции"], ["b", "B", "Breathing", "Дыхание", "Частота и работа дыхания · экскурсия грудной клетки", "Аускультация · SpO₂"], ["c", "C", "Circulation", "Кровообращение", "Пульс · капиллярное наполнение · температура кожи", "Артериальное давление · кровотечение"], ["d", "D", "Disability", "Неврологический статус", "Сознание по AVPU · зрачки · судороги", "Глюкоза крови"], ["e", "E", "Exposure", "Полный осмотр", "Сыпь · травмы · температура тела", "Предотвращение переохлаждения"]];

const F8 = `<section class="av-panel" aria-label="ABCDE — первичный осмотр"><h2><span class="av-tag">02</span>ABCDE · Первичный осмотр</h2><p class="av-sub">На каждом этапе: оценка → необходимая помощь → повторная оценка</p><ol class="av-steps">${T8.map(([s, e, t, a, r, o]) => `<li class="av-step av-${s}"><span class="av-letter" aria-hidden="true">${e}</span><div class="av-name"><h3>${e} · ${a}</h3><small lang="en">${t}</small></div><div class="av-points"><p>${r}</p><p>${o}</p></div></li>`).join("")}</ol></section>`;

function L8(only) {
  return `<div class="av-guide">${only === "abcde" ? "" : G8}${only === "pat" ? "" : F8}<aside class="av-urgent"><strong>Угроза жизни выявлена — действуйте сразу</strong><p>Позовите помощь. Не откладывайте вмешательство до завершения всего осмотра.</p></aside><p class="av-foot">PAT помогает сформировать первое впечатление; ABCDE — системно оценить ребёнка.</p></div>`;
}

function PbComponent({
  only
}) {
  return <><style>{j8}</style><div dangerouslySetInnerHTML={{
      __html: L8(only)
    }} /></>;
}

function T2Component({
  topicId,
  index,
  description,
  shared
}) {
  const r = useTeam();
  const o = `${topicId}:${index}`;
  const c = React.useId();
  const hRef = React.useRef(0);
  const [g, setG] = React.useState(null);
  const [C, setC] = React.useState("");
  const [b, setB] = React.useState("");
  React.useEffect(() => {
    let w = true;
    setG(null);
    setB("");
    hRef.current++;
    Y8(o).then(M => {
      if (w) {
        setG(M || null);
      }
    }).catch(() => {});
    return () => {
      w = false;
      hRef.current++;
    };
  }, [o]);
  React.useEffect(() => {
    if (!g) {
      setC("");
      return;
    }
    const w = URL.createObjectURL(g);
    setC(w);
    return () => URL.revokeObjectURL(w);
  }, [g]);
  async function v(w) {
    if (!w) {
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(w.type)) {
      setB("Выберите PNG, JPEG, WebP или GIF.");
      return;
    }
    if (w.size > 5 * 1024 * 1024) {
      setB("Размер изображения должен быть не больше 5 МБ.");
      return;
    }
    const hRef_current = hRef.current;
    setB("");
    try {
      await createImageBitmap(w).then(R => R.close());
      await e2(o, w);
      if (hRef.current === hRef_current) {
        setG(w);
      }
    } catch {
      if (hRef.current === hRef_current) {
        setB("Не удалось сохранить изображение. Проверьте формат и доступное место в браузере.");
      }
    }
  }
  if (shared) {
    return <figure className="topic-image-slot has-image"><img src={shared.url} alt={shared.caption} /><figcaption>{shared.caption}</figcaption>{r.canEdit && <Link className="button small" to={`/editor/${topicId}`}>Изменить в редакторе</Link>}</figure>;
  }
  if (r.configured) {
    return <figure className="topic-image-slot"><div className="topic-image-empty"><Icon name="image" size={30} /><span>Место для изображения {index + 1}</span><p>{description}</p></div>{r.canEdit && <Link className="button small" to={`/editor/${topicId}`}>Добавить в редакторе</Link>}</figure>;
  }
  return <figure className={`topic-image-slot ${C ? "has-image" : ""}`}>{C ? <img src={C} alt={description} /> : <div className="topic-image-empty"><Icon name="image" size={30} /><span>Место для изображения {index + 1}</span><p>{description}</p></div>}<figcaption>{description}</figcaption><div className="topic-image-controls"><label htmlFor={c} className="button small">{C ? "Заменить изображение" : "Добавить изображение"}</label><input id={c} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={w => {
        v(w.target.files?.[0]);
        w.target.value = "";
      }} />{C && <button className="text-link" onClick={async () => {
        try {
          await e2(o, null);
          setG(null);
          setB("");
        } catch {
          setB("Не удалось удалить изображение.");
        }
      }}>Убрать</button>}</div><small className="topic-image-storage">Сохраняется только в этом браузере · до 5 МБ</small>{b && <p role="alert" className="topic-image-error">{b}</p>}</figure>;
}

function I2Component({
  title,
  rows
}) {
  return <div className="clinical-table-card"><div className="table-heading"><h3>{title}</h3></div><div className="table-scroll" tabIndex={0} role="region" aria-label={title}><table><thead><tr><th scope="col">Состояние</th><th scope="col">Клинические ориентиры</th></tr></thead><tbody>{rows.map(([t, a]) => <tr key={t}><th scope="row">{t}</th><td>{a}</td></tr>)}</tbody></table></div></div>;
}

function P8Component({
  p: p_1
}) {
  const to_1 = `/system/respiratory?age=${p_1.age}`;
  const t = Y1(p_1.id);
  const a = Lb(p_1);
  const {
    favorites,
    toggleFavorite,
    fontSize,
    setFontSize
  } = useApp();
  const g = useLocation();
  const [m, setM] = React.useState("algorithm");
  const [A, setA] = React.useState("");
  function I(D) {
    setM(D);
    document.getElementById(`resp-${D}`)?.scrollIntoView({
      block: "start",
      behavior: "instant"
    });
  }
  React.useEffect(() => {
    setA("");
    const D = new URLSearchParams(g.search).get("section");
    setM(D || "algorithm");
    const Z = requestAnimationFrame(() => {
      if (D && zh.some(([k]) => k === D)) {
        I(D);
      }
    });
    return () => cancelAnimationFrame(Z);
  }, [p_1.id, g.search]);
  const v = A.trim().toLocaleLowerCase("ru").replaceAll("ё", "е");
  const w = {
    clinical: `${a.clinical} ${p_1.clinicalContent.filter(D => D.sectionId === "critical").map(D => `${D.heading} ${D.text}`).join(" ")}`,
    severity: a.severity.flat().join(" "),
    emergency: `${a.monitoring} ${p_1.clinicalContent.filter(D => ["primary", "treatment"].includes(D.sectionId)).map(D => `${D.heading} ${D.text}`).join(" ")} ${(p_1.tables || []).filter(D => D.sectionId === "treatment").flatMap(D => [D.title, ...D.rows.flat()]).join(" ")}`,
    escalation: a.escalation,
    diagnostics: `${a.alternatives.flat().join(" ")} ${p_1.clinicalContent.filter(D => D.sectionId === "diagnostics").map(D => `${D.heading} ${D.text}`).join(" ")}`,
    routing: p_1.clinicalContent.filter(D => D.sectionId === "routing").map(D => `${D.heading} ${D.text}`).join(" "),
    algorithm: p_1.flow.map(D => `${D.label} ${D.detail}`).join(" "),
    case: [a.scenario, a.question, a.answer].join(" "),
    references: p_1.references.map(D => `${D.title} ${D.publisher}`).join(" ")
  };
  const M = v ? zh.filter(([D, Z]) => `${Z} ${w[D]}`.toLocaleLowerCase("ru").replaceAll("ё", "е").includes(v)) : [];
  const R = {
    clinical: <><div className="clinical-block"><h3>Распознавание</h3><p>{a.clinical}</p></div><EaComponent p={p_1} sectionId="critical" editorial={false} showTables={false} /></>,
    severity: <><I2Component title="Клинические признаки тяжести" rows={a.severity} /><FaComponent p={p_1} ids={a.sources} editorial={false} /></>,
    emergency: <><EaComponent p={p_1} sectionId="primary" editorial={false} /><EaComponent p={p_1} sectionId="treatment" editorial={false} /><div className="clinical-block"><h3>Повторная оценка</h3><p>{a.monitoring}</p></div></>,
    escalation: <div className="clinical-block critical-block"><h3><Icon name="alert" size={18} />Когда усиливать помощь</h3><p>{a.escalation}</p><FaComponent p={p_1} ids={a.sources} editorial={false} /></div>,
    diagnostics: <><EaComponent p={p_1} sectionId="diagnostics" editorial={false} /><I2Component title="Механизмы и дифференциальная диагностика" rows={a.alternatives} /><FaComponent p={p_1} ids={a.sources} editorial={false} /></>,
    routing: <EaComponent p={p_1} sectionId="routing" editorial={false} />,
    algorithm: <div className="flow-panel"><IuComponent p={p_1} editorial={false} /></div>,
    case: <div className="resp-case"><div className="resp-summary"><span className="eyebrow">УЧЕБНЫЙ СЦЕНАРИЙ</span><p>{a.scenario}</p></div><h3>{a.question}</h3><h3>Разбор и тактика</h3><p>{a.answer}</p><FaComponent p={p_1} ids={a.sources} editorial={false} /></div>,
    references: <ol className="reference-list">{p_1.references.map(D => <li key={D.id}><strong>{D.title}</strong><p>{D.publisher} · {D.version}</p><a href={D.url} target="_blank" rel="noreferrer">Открыть рекомендацию <Icon name="external" size={14} /></a></li>)}</ol>
  };
  return <article className="resp-topic" style={{
    "--topic-size": `${fontSize}px`
  }}><nav className="breadcrumbs" aria-label="Хлебные крошки"><Link to="/">Главная</Link><Icon name="chevron" size={12} /><Link to={to_1}>Дыхательная система</Link><Icon name="chevron" size={12} /><span>{p_1.title}</span></nav><header className="resp-topic-header"><div className="eyebrow">{su(p_1.id) === "neonatal" ? "НОВОРОЖДЁННЫЕ" : p_1.age === "adult" ? "ВЗРОСЛЫЕ" : "ПЕДИАТРИЯ"} · ДЫХАТЕЛЬНАЯ СИСТЕМА</div><h1>{p_1.title}</h1><p>{p_1.english}</p><div className="resp-topic-actions"><G1Component id={p_1.id} /><span>Обновлено {p_1.updatedAt}</span><button className="button" type="button" aria-pressed={favorites.includes(p_1.id)} onClick={() => toggleFavorite(p_1.id)}><Icon name="bookmark" size={16} />{favorites.includes(p_1.id) ? "В избранном" : "В избранное"}</button><button className="button" type="button" onClick={() => window.print()}><Icon name="print" size={16} />Печать</button><button className="button" type="button" disabled={fontSize <= 14} onClick={() => setFontSize(fontSize - 1)} aria-label="Уменьшить шрифт">A−</button><button className="button" type="button" disabled={fontSize >= 20} onClick={() => setFontSize(fontSize + 1)} aria-label="Увеличить шрифт">A+</button></div></header><div className="resp-topic-layout"><aside className="resp-outline"><p>В ЭТОЙ ТЕМЕ</p><nav aria-label="Оглавление дыхательной темы">{zh.map(([D, Z], k) => <button key={D} type="button" onClick={() => I(D)} aria-current={m === D ? "location" : undefined}><small>{String(k + 1).padStart(2, "0")}</small>{Z}</button>)}</nav><Link className="text-link" to={to_1}><Icon name="back" size={15} />Все дыхательные темы</Link></aside><div className="resp-reading"><label className="inline-search resp-search"><Icon name="search" size={17} /><input aria-label="Поиск внутри темы" placeholder="Найти внутри темы…" value={A} onChange={D => setA(D.target.value)} />{A && <button type="button" className="icon-button" aria-label="Очистить поиск" onClick={() => setA("")}><Icon name="x" size={15} /></button>}</label>{v && <div className="resp-matches" aria-live="polite">{M.length ? M.map(([D, Z]) => <button key={D} className="button small" type="button" onClick={() => I(D)}>{Z}<Icon name="arrow" size={13} /></button>) : <p>Совпадений нет.</p>}</div>}<ReviewStatusBanner status={p_1.status} version={p_1.version} review={p_1.review} /><div className="resp-summary"><strong><Icon name="zap" size={18} />Главное за минуту</strong><p>{p_1.summary}</p><div>{[["emergency", "Лечение"], ["algorithm", "Алгоритм"], ["routing", "Маршрут"]].map(([D, Z]) => <button key={D} className="text-link" type="button" onClick={() => I(D)}>{Z}<Icon name="arrow" size={14} /></button>)}</div></div>{p_1.scope && <p className="resp-scope">{p_1.scope}</p>}{zh.map(([D, Z], k) => <section key={D} className="resp-section" id={`resp-${D}`} aria-labelledby={`resp-title-${D}`}><h2 id={`resp-title-${D}`}><span>{String(k + 1).padStart(2, "0")}</span>{Z}</h2>{R[D]}{D === "clinical" && t[0] && <T2Component key={`${p_1.id}-0`} topicId={p_1.id} index={0} description={t[0]} shared={p_1.illustrations?.find(j => j.slot === 0)} />}{D === "diagnostics" && t[1] && <T2Component key={`${p_1.id}-1`} topicId={p_1.id} index={1} description={t[1]} shared={p_1.illustrations?.find(j => j.slot === 1)} />}</section>)}<Link className="button" to={to_1}><Icon name="back" size={16} />К дыхательным темам</Link></div></div></article>;
}

export { F8, G1Component, G8, I2Component, L8, P8Component, PbComponent, T2Component, T8, j8 };
