// @ts-nocheck
import { Link, useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { Icon } from '../components/Icon';
import { B9, Y1 } from '../data/catalog';
import { Ub } from '../data/topic-sections';
import { useTeam } from '../features/auth';
import { I8Component, IuComponent, M8Component, MiComponent, N8, R8Component, V8Component, W81, Y81, k8 } from '../features/editor-forms';
import { supabase, xt } from '../lib/supabase-and-topics';

function EditorPage() {
  const {
    id
  } = useParams();
  const e = useNavigate();
  const t = useTeam();
  const a = xt.find(O => O.id === id) || xt[0];
  const [r, setR] = React.useState(() => B9(a));
  const [c, setC] = React.useState("");
  const [g, setG] = React.useState(0);
  const [C, setC_1] = React.useState(0);
  const [b, setB] = React.useState("");
  const [v, setV] = React.useState("basic");
  const [M, setM] = React.useState(false);
  const [D, setD] = React.useState(false);
  const [k, setK] = React.useState("");
  const [T, setT] = React.useState("");
  const [P, setP] = React.useState([]);
  const [ee, setEe] = React.useState(0);
  const [Ae, setAe] = React.useState(false);
  const ue = !!(c && JSON.stringify(r) !== c);
  const re = React.useMemo(() => Ub(r), [r]);
  React.useEffect(() => {
    let O = true;
    async function oe() {
      const G = B9(a);
      setR(G);
      setC(JSON.stringify(G));
      setG(0);
      setP([]);
      setB("");
      setK("");
      setT("");
      setV("basic");
      if (!supabase || !t.canEdit) {
        return;
      }
      setD(true);
      const [Q, $] = await Promise.all([supabase.from("editorial_documents").select("*").eq("id", a.id).maybeSingle(), supabase.from("published_documents").select("version").eq("id", a.id).maybeSingle()]);
      if (O) {
        if (Q.error) {
          setT("Не удалось загрузить общую правку. Сохранение отключено; попробуйте обновить статью.");
        } else if (Q.data) {
          setR(Q.data.payload);
          setC(JSON.stringify(Q.data.payload));
          setG(Q.data.version);
        }
        setC_1($.data?.version || 0);
        setD(false);
      }
    }
    oe();
    return () => {
      O = false;
    };
  }, [a.id, t.user?.id, t.canEdit, ee]);
  React.useEffect(() => {
    const O = G => {
      if (ue) {
        G.preventDefault();
        G.returnValue = "";
      }
    };
    const oe = G => {
      if (!ue || G.defaultPrevented || G.button !== 0 || G.ctrlKey || G.metaKey) {
        return;
      }
      const Q = G.target instanceof Element ? G.target.closest("a") : null;
      if (!(!Q || Q.target === "_blank" || Q.href === location.href || window.confirm("Есть несохранённые изменения. Перейти без сохранения?"))) {
        G.preventDefault();
        G.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", O);
    document.addEventListener("click", oe, true);
    return () => {
      window.removeEventListener("beforeunload", O);
      document.removeEventListener("click", oe, true);
    };
  }, [ue]);
  async function J() {
    if (!supabase) {
      return;
    }
    const O = await supabase.from("editorial_revisions").select("*").eq("document_id", a.id).order("version", {
      ascending: false
    }).limit(50);
    if (O.error) {
      setT("Не удалось загрузить историю.");
    } else {
      setP(O.data);
    }
  }
  async function q() {
    if (!(!supabase || !t.canEdit || re.length || D)) {
      setM(true);
      setT("");
      setK("");
      try {
        const O = await supabase.rpc("save_editorial_document", {
          p_id: a.id,
          p_payload: r,
          p_expected_version: g,
          p_note: b.trim() || "Редакционная правка"
        });
        if (O.error) {
          throw O.error;
        }
        const oe = Array.isArray(O.data) ? O.data[0] : O.data;
        setR(oe.payload);
        setC(JSON.stringify(oe.payload));
        setG(oe.version);
        setB("");
        setK(`Правка ${oe.version} сохранена для редакции. Публикация выполняется отдельно.`);
      } catch (error) {
        const oe = error.code;
        setT(oe === "40001" ? "Конфликт версий: статью уже изменил другой соавтор. Ваш текст остаётся на экране. Скачайте свою правку и загрузите актуальную версию для сравнения." : "Не удалось сохранить. Проверьте подключение и доступ к редакции. Ваши изменения остаются на экране.");
      } finally {
        setM(false);
      }
    }
  }
  async function ie() {
    if (!supabase || !t.isAdmin || ue || g === 0) {
      return;
    }
    setM(true);
    setT("");
    const O = await supabase.rpc("publish_editorial_document", {
      p_id: a.id,
      p_expected_version: g
    });
    if (O.error) {
      setT(O.error.code === "40001" ? "Статья уже изменена. Обновите правку перед публикацией." : "Не удалось опубликовать. Проверьте права и подключение.");
    } else {
      setC_1(g);
      await t.refreshPublished();
      setK(`Версия ${g} опубликована и доступна читателям.`);
    }
    setM(false);
  }
  async function upload(O, oe) {
    if (!supabase || !t.user || !t.canEdit) {
      return;
    }
    setT("");
    if (!["image/png", "image/jpeg", "image/webp", "image/gif"].includes(O.type) || O.size > 5242880) {
      setT("Выберите PNG, JPEG, WebP или GIF размером до 5 МБ.");
      return;
    }
    const G = `${t.user.id}/${crypto.randomUUID()}.${O.type === "image/jpeg" ? "jpg" : O.type.split("/")[1]}`;
    setM(true);
    try {
      (await createImageBitmap(O)).close();
      const $ = await supabase.storage.from("article-images").upload(G, O, {
        contentType: O.type,
        upsert: false
      });
      if ($.error) {
        throw $.error;
      }
      const te = supabase.storage.from("article-images").getPublicUrl(G).data.publicUrl;
      setR(xe => ({
        ...xe,
        illustrations: [...(xe.illustrations || []).filter(be => be.slot !== oe), {
          slot: oe,
          url: te,
          caption: Y1(a.id)[oe] || "Иллюстрация к статье"
        }]
      }));
      setK("Изображение загружено. Сохраните правку, чтобы добавить его в статью.");
    } catch {
      setT("Не удалось загрузить изображение. Проверьте формат, соединение и доступ.");
    } finally {
      setM(false);
    }
  }
  function onClick() {
    const O = new Blob([JSON.stringify(r, null, 2)], {
      type: "application/json"
    });
    const oe = URL.createObjectURL(O);
    const aElement = document.createElement("a");
    aElement.href = oe;
    aElement.download = `${a.id}-my-edit.json`;
    aElement.click();
    setTimeout(() => URL.revokeObjectURL(oe), 1000);
  }
  const p_1 = {
    ...a,
    ...r,
    articleDetail: r.detail,
    illustrations: r.illustrations
  };
  if (!t.configured || !t.loading && !t.canEdit) {
    return <div className="content-card"><h1>Редактор материалов</h1><p>{t.configured ? "Для редактирования войдите в аккаунт с доступом соавтора." : "Совместная редакция ожидает подключения базы команды."}</p><Link className="button primary" to="/team">Открыть редакцию</Link></div>;
  }
  if (t.loading) {
    return <p role="status">Проверяем доступ к редактору…</p>;
  }
  return <div className="editor-page"><nav className="breadcrumbs"><Link to="/team">Редакция</Link><Icon name="chevron" size={12} /><span>Редактор</span></nav><div className="page-heading"><div><div className="eyebrow">РЕДАКТОР МАТЕРИАЛОВ</div><h1>{a.title}</h1><p>{a.age === "adult" ? "Взрослые" : "Педиатрия"} · Правка {g} · {C ? `Опубликована ${C}` : "Исходная версия на сайте"}</p></div></div><label className="editor-field">Выбрать статью<select aria-label="Выбрать статью для редактирования" value={a.id} onChange={O => {
        if (!(ue && !window.confirm("В этой статье есть несохранённые изменения. Перейти к другой статье?"))) {
          e(`/editor/${O.target.value}`);
        }
      }}>{xt.map(O => <option key={O.id} value={O.id}>{O.age === "adult" ? "Взрослые" : "Дети"} · {O.title}</option>)}</select></label><div className="editor-toolbar"><div className="editor-save-state" role="status">{D ? "Загрузка…" : ue ? "Есть несохранённые изменения" : "Без несохранённых изменений"}</div><button className="button primary" disabled={M || D || re.length > 0 || !ue && g > 0 || T.startsWith("Не удалось загрузить общую")} onClick={() => {
        q();
      }}>{M ? "Подождите…" : "Сохранить правку"}</button>{t.isAdmin && <button className="button" disabled={M || D || ue || g === 0 || C === g} onClick={() => {
        ie();
      }}>Опубликовать</button>}<button className="button" onClick={() => setAe(O => !O)}>{Ae ? "Закрыть предпросмотр" : "Предпросмотр"}</button><Link className="text-link" to={`/protocol/${a.id}`}>Открыть на сайте</Link></div>{k && <div className="editorial-status" role="status">{k}</div>}{T && <div className="editorial-error" role="alert"><p>{T}</p><div className="editor-inline-actions"><button className="button small" onClick={onClick}>Скачать свою правку</button><button className="button small" onClick={() => {
          if (!ue || window.confirm("Загрузить текущую общую версию? Несохранённые изменения на экране будут заменены.")) {
            setEe(O => O + 1);
          }
        }}>Загрузить актуальную версию</button></div></div>}{re.length > 0 && <details className="editor-validation"><summary>Перед сохранением нужно исправить: {re.length}</summary><ul>{re.map(O => <li key={O}>{O}</li>)}</ul></details>}<MiComponent label="Что изменено" value={b} onChange={setB} /><nav className="editor-tabs" aria-label="Разделы редактора">{N8.filter(([O]) => O !== "detail" || !!r.detail).map(([O, oe]) => <button key={O} className={v === O ? "active" : ""} aria-current={v === O ? "page" : undefined} onClick={() => {
        setV(O);
        if (O === "history") {
          J();
        }
      }}>{oe}</button>)}</nav><div className="editor-body"><div className="content-card editor-workspace"><fieldset disabled={M || D} className="editor-form-fieldset">{v === "basic" && <I8Component value={r} setValue={setR} />}{v === "detail" && <W81 value={r} setValue={setR} />}{v === "content" && <Y81 value={r} setValue={setR} />}{v === "flow" && <V8Component value={r} setValue={setR} />}{v === "references" && <M8Component value={r} setValue={setR} />}{v === "images" && <R8Component value={r} setValue={setR} upload={upload} busy={M} />}{v === "history" && <div><h2>История правок</h2><p>Показаны последние 50 правок. Восстановление загружает прежний текст в редактор. Сохранение создаст новую версию; предыдущая история сохранится.</p><button className="button small" onClick={() => {
              J();
            }}>Обновить историю</button>{P.length ? P.map(O => <article key={O.id} className="editor-revision"><h3>Правка {O.version}{O.version === C ? " · Опубликована" : ""}</h3><p>{O.author_name} · {k8(O.created_at)}</p><p>{O.change_note}</p><button className="button small" onClick={() => {
                if (!(ue && !window.confirm("Заменить несохранённый текст выбранной версией?"))) {
                  setR(structuredClone(O.payload));
                  setB(`Восстановление правки ${O.version}`);
                  setK("Прежняя версия загружена. Нажмите «Сохранить правку», чтобы создать новую версию.");
                }
              }}>Восстановить в редактор</button></article>) : <p>После первого сохранения здесь появятся версии статьи.</p>}</div>}</fieldset></div>{Ae && <aside className="content-card editor-preview"><span className="eyebrow">ПРЕДПРОСМОТР ПРАВКИ</span><h2>{r.title}</h2><p>{r.summary}</p>{r.flow.length > 0 && <IuComponent p={p_1} editorial={false} />}<h3>Клиническая картина</h3><p>{r.detail?.clinical}</p>{r.clinicalContent.map((O, oe) => <section key={oe}><h3>{O.heading}</h3><p>{O.text}</p></section>)}{r.illustrations?.map(O => <figure key={O.slot}><img className="editor-image-preview" src={O.url} alt={O.caption} /><figcaption>{O.caption}</figcaption></figure>)}</aside>}</div></div>;
}

export { EditorPage };
