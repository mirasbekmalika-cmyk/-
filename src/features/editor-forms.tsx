// @ts-nocheck
import React from 'react';
import { Icon } from '../components/Icon';
import { Modal } from '../components/Modal';
import { Y1 } from '../data/catalog';
import { rD } from '../data/topic-sections';
import { D8 } from '../lib/flow-and-images';
import { Yb } from '../lib/utils';

function MiComponent({
  label: label_1,
  value,
  onChange,
  area = false,
  rows = 4
}) {
  return <label className="editor-field"><span>{label_1}</span>{area ? <textarea rows={rows} value={value} onChange={o => onChange(o.target.value)} /> : <input value={value} onChange={o => onChange(o.target.value)} />}</label>;
}

function BuComponent({
  value,
  selected,
  onChange
}) {
  return <fieldset className="editor-sources"><legend>Источники для этого блока</legend>{value.references.length ? value.references.map(a => <label key={a.id}><input type="checkbox" checked={selected.includes(a.id)} onChange={r => onChange(r.target.checked ? [...selected, a.id] : selected.filter(o => o !== a.id))} />{a.title || "Новый источник"}</label>) : <small>Сначала добавьте источники во вкладке «Источники».</small>}</fieldset>;
}

function I8Component({
  value,
  setValue
}) {
  return <div className="editor-fields">{[["title", "Название"], ["english", "Название на английском"], ["summary", "Главное за минуту"], ["scope", "Возраст и область применения"]].map(([t, a]) => <MiComponent key={t} label={a} area={t === "summary" || t === "scope"} value={value[t] || ""} onChange={r => setValue(o => ({
      ...o,
      [t]: r
    }))} />)}</div>;
}

function Q91({
  label,
  rows,
  onChange
}) {
  return <section className="editor-pairs"><h3>{label}</h3>{rows.map((a, r) => <div key={r} className="editor-pair"><MiComponent label="Название" value={a[0]} onChange={o => onChange(rows.map((c, h) => {
        if (h === r) {
          return [o, c[1]];
        }
        return c;
      }))} /><MiComponent label="Пояснение" area value={a[1]} onChange={o => onChange(rows.map((c, h) => {
        if (h === r) {
          return [c[0], o];
        }
        return c;
      }))} /><button className="text-link" onClick={() => onChange(rows.filter((o, c) => c !== r))}>Убрать строку</button></div>)}<button className="button small" onClick={() => onChange([...rows, ["", ""]])}>Добавить строку</button></section>;
}

function W81({
  value,
  setValue
}) {
  const value_detail = value.detail;
  if (value_detail) {
    return <div className="editor-fields">{[["clinical", "Клиническая картина"], ["monitoring", "Повторная оценка"], ["escalation", "Эскалация помощи"], ["scenario", "Учебный случай"], ["question", "Вопрос к случаю"], ["answer", "Разбор случая"]].map(([a, r]) => <MiComponent key={a} label={r} area value={value_detail[a]} onChange={o => setValue(c => ({
        ...c,
        detail: {
          ...c.detail,
          [a]: o
        }
      }))} />)}<Q91 label="Оценка тяжести" rows={value_detail.severity} onChange={severity => setValue(r => ({
        ...r,
        detail: {
          ...r.detail,
          severity
        }
      }))} /><Q91 label="Механизмы и дифференциальная диагностика" rows={value_detail.alternatives} onChange={alternatives => setValue(r => ({
        ...r,
        detail: {
          ...r.detail,
          alternatives
        }
      }))} /><BuComponent value={value} selected={value_detail.sources} onChange={sources => setValue(r => ({
        ...r,
        detail: {
          ...r.detail,
          sources
        }
      }))} /></div>;
  }
  return <p>Для этой страницы используйте вкладку «Текст и таблицы».</p>;
}

const _9 = [["critical", "Ключевая информация"], ["primary", "Первичная оценка"], ["diagnostics", "Диагностика"], ["treatment", "Лечение"], ["routing", "Маршрутизация"]];

function Y81({
  value,
  setValue
}) {
  return <div className="editor-fields">{value.clinicalContent.map((t, a) => <section key={a} className="editor-item"><div className="section-line"><h3>Текстовый блок {a + 1}</h3><button className="text-link" onClick={() => setValue(r => ({
          ...r,
          clinicalContent: r.clinicalContent.filter((o, c) => c !== a)
        }))}>Убрать блок</button></div><label className="editor-field">Раздел<select value={t.sectionId} onChange={r => setValue(o => ({
          ...o,
          clinicalContent: o.clinicalContent.map((c, h) => {
            if (h === a) {
              return {
                ...c,
                sectionId: r.target.value
              };
            }
            return c;
          })
        }))}>{_9.map(([r, o]) => <option key={r} value={r}>{o}</option>)}</select></label><MiComponent label="Заголовок" value={t.heading} onChange={r => setValue(o => ({
        ...o,
        clinicalContent: o.clinicalContent.map((c, h) => {
          if (h === a) {
            return {
              ...c,
              heading: r
            };
          }
          return c;
        })
      }))} /><MiComponent label="Текст" area rows={7} value={t.text} onChange={r => setValue(o => ({
        ...o,
        clinicalContent: o.clinicalContent.map((c, h) => {
          if (h === a) {
            return {
              ...c,
              text: r
            };
          }
          return c;
        })
      }))} /><label className="editor-check"><input type="checkbox" checked={!!t.critical} onChange={r => setValue(o => ({
          ...o,
          clinicalContent: o.clinicalContent.map((c, h) => {
            if (h === a) {
              return {
                ...c,
                critical: r.target.checked
              };
            }
            return c;
          })
        }))} />Выделить как критически важное</label><BuComponent value={value} selected={t.sourceIds} onChange={r => setValue(o => ({
        ...o,
        clinicalContent: o.clinicalContent.map((c, h) => {
          if (h === a) {
            return {
              ...c,
              sourceIds: r
            };
          }
          return c;
        })
      }))} /></section>)}<button className="button" onClick={() => setValue(t => ({
      ...t,
      clinicalContent: [...t.clinicalContent, {
        sectionId: "treatment",
        heading: "",
        text: "",
        sourceIds: t.references.slice(0, 1).map(a => a.id)
      }]
    }))}>Добавить текстовый блок</button><h2>Таблицы</h2>{(value.tables || []).map((t, a) => <section key={a} className="editor-item"><MiComponent label="Название таблицы" value={t.title} onChange={r => setValue(o => ({
        ...o,
        tables: o.tables.map((c, h) => {
          if (h === a) {
            return {
              ...c,
              title: r
            };
          }
          return c;
        })
      }))} /><label className="editor-field">Раздел<select value={t.sectionId} onChange={r => setValue(o => ({
          ...o,
          tables: o.tables.map((c, h) => {
            if (h === a) {
              return {
                ...c,
                sectionId: r.target.value
              };
            }
            return c;
          })
        }))}>{_9.map(([r, o]) => <option key={r} value={r}>{o}</option>)}</select></label><div className="editor-table-scroll"><table><thead><tr>{t.columns.map((r, o) => <th key={o}><input aria-label={`Заголовок столбца ${o + 1}`} value={r} onChange={c => setValue(h => ({
                  ...h,
                  tables: h.tables.map((g, m) => {
                    if (m === a) {
                      return {
                        ...g,
                        columns: g.columns.map((C, A) => {
                          if (A === o) {
                            return c.target.value;
                          }
                          return C;
                        })
                      };
                    }
                    return g;
                  })
                }))} /></th>)}<th>Строка</th></tr></thead><tbody>{t.rows.map((r, o) => <tr key={o}>{r.map((c, h) => <td key={h}><textarea aria-label={`Строка ${o + 1}, столбец ${h + 1}`} rows={3} value={c} onChange={g => setValue(m => ({
                  ...m,
                  tables: m.tables.map((C, A) => {
                    if (A === a) {
                      return {
                        ...C,
                        rows: C.rows.map((b, I) => {
                          if (I === o) {
                            return b.map((v, w) => {
                              if (w === h) {
                                return g.target.value;
                              }
                              return v;
                            });
                          }
                          return b;
                        })
                      };
                    }
                    return C;
                  })
                }))} /></td>)}<td><button className="text-link" onClick={() => setValue(c => ({
                  ...c,
                  tables: c.tables.map((h, g) => {
                    if (g === a) {
                      return {
                        ...h,
                        rows: h.rows.filter((m, C) => C !== o)
                      };
                    }
                    return h;
                  })
                }))}>Убрать</button></td></tr>)}</tbody></table></div><div className="editor-inline-actions"><button className="button small" onClick={() => setValue(r => ({
          ...r,
          tables: r.tables.map((o, c) => {
            if (c === a) {
              return {
                ...o,
                rows: [...o.rows, o.columns.map(() => "")]
              };
            }
            return o;
          })
        }))}>Добавить строку</button><button className="button small" onClick={() => setValue(r => ({
          ...r,
          tables: r.tables.map((o, c) => {
            if (c === a) {
              return {
                ...o,
                columns: [...o.columns, "Новый столбец"],
                rows: o.rows.map(h => [...h, ""])
              };
            }
            return o;
          })
        }))}>Добавить столбец</button><button className="text-link" onClick={() => setValue(r => ({
          ...r,
          tables: r.tables.filter((o, c) => c !== a)
        }))}>Убрать таблицу</button></div><MiComponent label="Примечание" area value={t.note || ""} onChange={note => setValue(o => ({
        ...o,
        tables: o.tables.map((c, h) => {
          if (h === a) {
            return {
              ...c,
              note
            };
          }
          return c;
        })
      }))} /><BuComponent value={value} selected={t.sourceIds} onChange={r => setValue(o => ({
        ...o,
        tables: o.tables.map((c, h) => {
          if (h === a) {
            return {
              ...c,
              sourceIds: r
            };
          }
          return c;
        })
      }))} /></section>)}<button className="button" onClick={() => setValue(t => ({
      ...t,
      tables: [...(t.tables || []), {
        title: "",
        sectionId: "treatment",
        columns: ["Показатель", "Значение"],
        rows: [["", ""]],
        sourceIds: t.references.slice(0, 1).map(a => a.id)
      }]
    }))}>Добавить таблицу</button></div>;
}

function V8Component({
  value,
  setValue
}) {
  const t = (a, r) => setValue(o => ({
    ...o,
    flow: o.flow.map((c, h) => {
      if (h === a) {
        return {
          ...c,
          ...r
        };
      }
      return c;
    })
  }));
  return <div className="editor-fields"><p>Первый блок — вход в алгоритм. У решения должны быть минимум две подписанные ветви. После удаления блока проверьте переходы.</p>{value.flow.map((a, r) => <section key={a.id} className="editor-item"><div className="section-line"><h3>Блок {r + 1}</h3><button className="text-link" onClick={() => setValue(o => ({
          ...o,
          flow: rD(o.flow, a.id)
        }))}>Убрать блок</button></div><MiComponent label="Название на схеме" area rows={2} value={a.label} onChange={o => t(r, {
        label: o
      })} /><MiComponent label="Действие или условие" area rows={5} value={a.detail} onChange={o => t(r, {
        detail: o
      })} /><div className="editor-two-columns"><label className="editor-field">Тип<select value={a.kind} onChange={o => t(r, {
            kind: o.target.value
          })}><option value="step">Действие</option><option value="decision">Решение с ветвями</option></select></label><label className="editor-field">Колонка схемы<select value={a.x} onChange={o => t(r, {
            x: Number(o.target.value)
          })}><option value={150}>Слева</option><option value={360}>По центру</option><option value={570}>Справа</option>{![150, 360, 570].includes(a.x) && <option value={a.x}>Текущая позиция</option>}</select></label><label className="editor-field">Высота в схеме<input type="number" min={0} max={20000} value={a.y} onChange={o => t(r, {
            y: Number(o.target.value)
          })} /></label></div><label className="editor-check"><input type="checkbox" checked={!!a.critical} onChange={o => t(r, {
          critical: o.target.checked
        })} />Критически важный блок</label><h4>Переходы</h4>{a.next.map((o, c) => <div key={c} className="editor-edge"><label className="editor-field">Следующий блок<select value={o} onChange={h => {
            const next = [...a.next];
            const edgeLabels = {
              ...a.edgeLabels
            };
            next[c] = h.target.value;
            edgeLabels[h.target.value] = edgeLabels[o] || "";
            delete edgeLabels[o];
            t(r, {
              next,
              edgeLabels
            });
          }}>{value.flow.filter(h => !a.next.includes(h.id) || h.id === o).map(h => <option key={h.id} value={h.id}>{h.label.replaceAll(`
`, " ") || "Новый блок"}</option>)}</select></label><MiComponent label="Условие перехода" value={a.edgeLabels?.[o] || ""} onChange={h => t(r, {
          edgeLabels: {
            ...a.edgeLabels,
            [o]: h
          }
        })} /><button className="text-link" onClick={() => t(r, {
          next: a.next.filter((h, g) => g !== c),
          edgeLabels: Object.fromEntries(Object.entries(a.edgeLabels || {}).filter(([h]) => h !== o))
        })}>Убрать переход</button></div>)}<button className="button small" disabled={!value.flow.some(o => o.id !== a.id && !a.next.includes(o.id))} onClick={() => {
        const o = value.flow.find(c => c.id !== a.id && !a.next.includes(c.id));
        t(r, {
          next: [...a.next, o.id],
          edgeLabels: {
            ...a.edgeLabels,
            [o.id]: ""
          }
        });
      }}>Добавить переход</button><BuComponent value={value} selected={a.sourceIds} onChange={o => t(r, {
        sourceIds: o
      })} /></section>)}<button className="button" onClick={() => setValue(a => ({
      ...a,
      flow: [...a.flow, {
        id: Yb("step"),
        label: "Новый блок",
        detail: "",
        kind: "step",
        x: 360,
        y: a.flow.length ? Math.max(...a.flow.map(r => r.y)) + 140 : 20,
        next: [],
        sourceIds: a.references.slice(0, 1).map(r => r.id)
      }]
    }))}>Добавить блок алгоритма</button></div>;
}

function M8Component({
  value,
  setValue
}) {
  return <div className="editor-fields">{value.references.map((t, a) => <section key={t.id} className="editor-item">{[["title", "Название источника"], ["publisher", "Организация или автор"], ["version", "Редакция"], ["url", "Ссылка HTTPS"]].map(([r, o]) => <MiComponent key={r} label={o} value={t[r]} onChange={c => setValue(h => ({
        ...h,
        references: h.references.map((g, m) => {
          if (m === a) {
            return {
              ...g,
              [r]: c
            };
          }
          return g;
        })
      }))} />)}<button className="text-link" onClick={() => setValue(r => ({
        ...r,
        references: r.references.filter(o => o.id !== t.id)
      }))}>Убрать источник</button></section>)}<button className="button" onClick={() => setValue(t => ({
      ...t,
      references: [...t.references, {
        id: Yb("ref"),
        title: "",
        publisher: "",
        url: "",
        year: null,
        version: ""
      }]
    }))}>Добавить источник</button><p className="muted">После удаления источника укажите новый в связанных блоках перед сохранением.</p></div>;
}

function R8Component({
  value,
  setValue,
  upload,
  busy
}) {
  const r = Y1(value.id);
  const o = (c, h) => setValue(g => {
    const m = g.illustrations?.find(C => C.slot === c) || {
      slot: c,
      url: "",
      caption: r[c] || "Иллюстрация"
    };
    return {
      ...g,
      illustrations: [...(g.illustrations || []).filter(C => C.slot !== c), {
        ...m,
        ...h
      }]
    };
  });
  return <div className="editor-fields"><p>Изображения редакции сохраняются вместе со статьёй и после публикации видны всем читателям.</p>{[0, 1].map(c => {
      const h = value.illustrations?.find(g => g.slot === c);
      return <section key={c} className="editor-item"><h3>Изображение {c + 1}</h3><p>{r[c] || "Иллюстрация к статье"}</p>{h?.url && <img className="editor-image-preview" src={h.url} alt={h.caption} />}<label className="editor-field">Выбрать изображение<input disabled={busy} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={g => {
            const m = g.target.files?.[0];
            if (m) {
              upload(m, c);
            }
            g.target.value = "";
          }} /></label>{h && <><MiComponent label="Подпись и описание" value={h.caption} onChange={caption => o(c, {
            caption
          })} /><button className="text-link" onClick={() => setValue(g => ({
            ...g,
            illustrations: (g.illustrations || []).filter(m => m.slot !== c)
          }))}>Убрать из статьи</button></>}</section>;
    })}</div>;
}

const S8 = s => {
  if (s.publisher.includes("Royal Children")) {
    return "RCH";
  }
  if (s.publisher.includes("Queensland")) {
    return "Queensland";
  }
  if (s.publisher.includes("Canadian")) {
    return "CPS";
  }
  if (s.publisher.includes("Trang")) {
    return "CCHS";
  }
  if (s.publisher.includes("Sans Front")) {
    return "MSF";
  }
  return s.publisher;
};

function FaComponent({
  ids,
  p: p_1,
  editorial = true
}) {
  const [a, setA] = React.useState(null);
  return <><div className="source-links">{ids.map(o => {
        const c = p_1.references.find(h => h.id === o);
        if (c) {
          return <button key={o} className="source-link" onClick={() => setA(c)} aria-label={`Источник: ${c.title}`}><Icon name="book" size={12} />{S8(c)}{c.year ? ` · ${c.year}` : ""}</button>;
        }
        return <span key={o}>Источник требует уточнения</span>;
      })}</div>{a && <Modal title="Первоисточник" onClose={() => setA(null)}><div className="source-dialog"><h3>{a.title}</h3><p>{a.publisher}</p><p>{a.year || "Год публикации не указан"} · {a.version}</p>{a.locator && <p><strong>Раздел:</strong> {a.locator}</p>}{editorial && <p>Редакторская сверка: {a.accessedAt}.</p>}<a className="button primary" href={a.url} target="_blank" rel="noreferrer">Открыть оригинал <Icon name="external" size={15} /></a></div></Modal>}</>;
}

function EaComponent({
  p: p_1,
  sectionId,
  editorial = true,
  showTables = true
}) {
  const r = p_1.clinicalContent.filter(c => c.sectionId === sectionId);
  const o = showTables ? (p_1.tables || []).filter(c => c.sectionId === sectionId) : [];
  return <><div className="clinical-blocks">{r.map((c, h) => <div key={h} className={`clinical-block ${c.critical ? "critical-block" : ""}`}><h3>{c.critical && <Icon name="alert" size={18} />} {c.heading}</h3><p>{c.text}</p>{editorial && <div className="content-basis">{c.basis === "external" ? "Дополнено по внешним рекомендациям" : "Адаптация исходного материала со сверкой"}</div>}<FaComponent ids={c.sourceIds} p={p_1} editorial={editorial} /></div>)}</div>{o.map((c, h) => <div key={h} className="clinical-table-card"><div className="table-heading"><h3>{c.title}</h3><span><Icon name="sliders" size={13} /> Таблица прокручивается</span></div><div className="table-scroll" tabIndex={0} role="region" aria-label={c.title}><table><thead><tr>{c.columns.map(g => <th key={g} scope="col">{g}</th>)}</tr></thead><tbody>{c.rows.map((g, m) => <tr key={m}>{g.map((C, A) => {
                if (A === 0) {
                  return <th key={A} scope="row">{C}</th>;
                }
                return <td key={A}>{C}</td>;
              })}</tr>)}</tbody></table></div>{c.note && <p className="clinical-table-note"><Icon name="info" size={15} />{c.note}</p>}<div className="table-sources">{editorial && <span className="content-basis">Схема по указанным внешним источникам</span>}<FaComponent ids={c.sourceIds} p={p_1} editorial={editorial} /></div></div>)}</>;
}

function Z8Component({
  p: p_1
}) {
  const [e, setE] = React.useState(false);
  return <>{p_1.sourceDocument && <div className="source-document-card"><span className="result-icon"><Icon name="file" size={21} /></span><div><strong>Исходный документ загружен</strong><p>{p_1.sourceDocument.fileName}</p></div><button className="button small" onClick={() => setE(true)}>Читать исходный текст <Icon name="external" size={14} /></button></div>}{p_1.reviewNotes?.length ? <div className="review-notes"><div className="section-line"><h3>Изменения после сверки</h3><span>{p_1.reviewNotes.length} замечаний</span></div>{p_1.reviewNotes.map((a, r) => <details key={r} className={`review-note note-${a.level}`}><summary><span className="note-tag">{a.level === "critical" ? "Исправлено" : a.level === "local" ? "Для согласования" : "Уточнено"}</span>{a.title}<Icon name="chevronDown" size={15} /></summary><div><p><strong>В исходном материале:</strong> {a.original}</p><p><strong>В этой редакции:</strong> {a.resolution}</p>{a.sourceIds.length > 0 && <FaComponent ids={a.sourceIds} p={p_1} />}</div></details>)}</div> : null}{e && p_1.sourceDocument && <Modal title="Исходный авторский текст" wide onClose={() => setE(false)}><div className="original-warning"><Icon name="alert" size={20} /><div><strong>Текст до редакторской сверки</strong><p>Может содержать ошибки и несогласованные дозировки. Это источник для сравнения, а не действующая лечебная карточка. Исправления перечислены на странице протокола.</p></div></div><div className="original-text"><h3>{p_1.sourceDocument.fileName}</h3><pre>{p_1.sourceDocument.extractedText}</pre></div></Modal>}</>;
}

function X8Component({
  p: p_1
}) {
  if (p_1.references.length) {
    return <ol className="reference-list">{p_1.references.map(e => <li key={e.id} id={`source-${e.id}`}><strong>{e.title}</strong><p>{e.publisher} · {e.year || "Год публикации не указан"} · {e.version}</p>{e.locator && <p>{e.locator}</p>}<p className="source-accessed">Редакторская сверка {e.accessedAt}</p><a href={e.url} target="_blank" rel="noreferrer">Оригинал рекомендации <Icon name="external" size={14} /></a></li>)}</ol>;
  }
  return <div className="sources-empty"><Icon name="book" size={24} /><div><strong>Источники пока не добавлены</strong><p>Исходный документ и рекомендации будут связаны с конкретными блоками протокола.</p></div></div>;
}

function IuComponent({
  p: p_1,
  editorial = true
}) {
  const [t, setT] = React.useState(null);
  const [r, setR] = React.useState(false);
  const [c, setC] = React.useState(() => {
    if (window.matchMedia("(max-width:720px)").matches) {
      return "steps";
    }
    return "diagram";
  });
  React.useEffect(() => {
    setT(null);
    setR(false);
  }, [p_1.id]);
  const g = React.useId().replace(/:/g, "");
  const m = Math.max(240, ...p_1.flow.map(A => A.y + 100));
  const CComponent = A => <div className="clinical-flow-wrapper"><div className="flow-view-toggle" role="group" aria-label="Вид алгоритма"><button className={c === "diagram" ? "active" : ""} aria-pressed={c === "diagram"} onClick={() => setC("diagram")}><Icon name="grid" size={15} /> Схема</button><button className={c === "steps" ? "active" : ""} aria-pressed={c === "steps"} onClick={() => setC("steps")}><Icon name="list" size={15} /> Шаги</button></div>{editorial && <div className="flow-draft-label"><Icon name="filecheck" size={14} /> Проект алгоритма · требуется медицинское рецензирование</div>}{c === "steps" && <p className="flow-steps-note">Здесь показаны все ветви схемы. Следуйте условиям перехода; список не является последовательностью обязательных действий.</p>}{c === "diagram" ? <div className="clinical-flow-scroll" tabIndex={0} aria-label="Схема алгоритма, доступна прокрутка"><svg className="clinical-flow-svg" viewBox={`0 0 720 ${m}`} role="group" aria-label={`Алгоритм: ${p_1.title}`}><defs><marker id={`${g}-${A}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="currentColor" strokeWidth="1.4" /></marker></defs>{p_1.flow.flatMap(b => b.next.map(I => {
          const v = p_1.flow.find(M => M.id === I);
          if (!v) {
            return null;
          }
          const w = D8(b, v, p_1.flow);
          return <g key={`${b.id}-${I}`}><path d={w.path} fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd={`url(#${g}-${A})`} />{b.edgeLabels?.[I] && <text className="edge-label" x={w.labelX} y={w.labelY} textAnchor="middle" fontSize="11">{b.edgeLabels[I]}</text>}</g>;
        }))}{p_1.flow.map(b => <g key={b.id} role="button" tabIndex={0} aria-label={b.label.replace(/\n/g, " ")} aria-pressed={t?.id === b.id} onClick={() => setT(b)} onKeyDown={I => {
          if (I.key === "Enter" || I.key === " ") {
            I.preventDefault();
            setT(b);
          }
        }} className={`clinical-flow-node ${t?.id === b.id ? "selected" : ""} ${b.critical ? "critical-node" : ""}`}><rect x={b.x - 105} y={b.y} width={210} height={60} rx={b.kind === "decision" ? 17 : 7} strokeDasharray={b.kind === "decision" ? "4 3" : undefined} />{b.label.split(`
`).map((I, v, w) => <text key={v} x={b.x} y={b.y + 31 + (v - (w.length - 1) / 2) * 16} textAnchor="middle" dominantBaseline="middle">{I}</text>)}</g>)}</svg></div> : <ol className="flow-step-list">{p_1.flow.map((b, I) => <li key={b.id}><button className={`${t?.id === b.id ? "selected" : ""} ${b.critical ? "critical-step" : ""}`} aria-pressed={t?.id === b.id} onClick={() => setT(b)}><span className="step-index">{String(I + 1).padStart(2, "0")}</span><span><strong>{b.label.replace(/\n/g, " ")}</strong>{b.next.length > 0 && <small>{b.next.map(v => `${b.edgeLabels?.[v] ? `${b.edgeLabels[v]}: ` : ""}${p_1.flow.find(w => w.id === v)?.label.replace(/\n/g, " ")}`).join(" / ")}</small>}</span><Icon name="chevron" size={15} /></button>{t?.id === b.id && <div className="flow-step-expanded"><p>{b.detail}</p><FaComponent ids={b.sourceIds} p={p_1} editorial={editorial} /></div>}</li>)}</ol>}{c === "diagram" && <div className={`flow-detail ${t?.critical ? "critical-flow-detail" : ""}`} aria-live="polite"><Icon name={t?.critical ? "alert" : "info"} size={18} /><div><strong>{t?.label.replace(/\n/g, " ") || "Выберите этап алгоритма"}</strong><p>{t?.detail || "Нажмите на блок или шаг, чтобы прочитать действие, условия перехода и первоисточники."}</p>{t && <FaComponent ids={t.sourceIds} p={p_1} editorial={editorial} />}</div></div>}</div>;
  return <><div className="flow-toolbar"><div>{editorial ? `Версия ${p_1.version} · сверка источников ${p_1.evidenceCheckedAt}` : p_1.title}</div><div className="flex gap-2"><button className="button small" onClick={() => setR(true)}><Icon name="maximize" size={16} /> На весь экран</button><button className="icon-button" onClick={() => window.print()} aria-label="Распечатать протокол с алгоритмом"><Icon name="print" size={17} /></button></div></div>{CComponent("inline")}{r && <Modal title={`${p_1.title} · алгоритм`} wide onClose={() => setR(false)}>{CComponent("full")}</Modal>}</>;
}

const N8 = [["basic", "Главное"], ["detail", "Разделы статьи"], ["content", "Текст и таблицы"], ["flow", "Алгоритм"], ["images", "Изображения"], ["references", "Источники"], ["history", "История"]];

const k8 = created_at => new Date(created_at).toLocaleString("ru-RU", {
  timeZone: "Asia/Almaty"
});

export { BuComponent, EaComponent, FaComponent, I8Component, IuComponent, M8Component, MiComponent, N8, Q91, R8Component, S8, V8Component, W81, X8Component, Y81, Z8Component, _9, k8 };
