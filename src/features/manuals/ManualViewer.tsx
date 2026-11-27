// @ts-nocheck
import React from 'react';
import { getDocument } from 'pdfjs-dist';
import { Icon } from '../../components/Icon';
import { Modal } from '../../components/Modal';
import { normalizeSearch } from '../../data/catalog';
import { getManual, setupPdfWorker } from '../../data/manuals';

function ManualViewer({
  protocolId
}) {
  const e = getManual(protocolId);
  const [t, setT] = React.useState(null);
  const [r, setR] = React.useState("");
  const [c, setC] = React.useState(1);
  const [g, setG] = React.useState("1");
  const [C, setC_1] = React.useState(1);
  const [b, setB] = React.useState("");
  const [v, setV] = React.useState(true);
  const [M, setM] = React.useState(false);
  const [D, setD] = React.useState(true);
  const [k, setK] = React.useState("");
  const [T, setT_1] = React.useState("");
  const [P, setP] = React.useState(700);
  const eeRef = React.useRef(null);
  const _RefRef = React.useRef(null);
  const AeRef = React.useRef(null);
  const [Me, setMe] = React.useState(0);
  React.useEffect(() => {
    if (!e) {
      return;
    }
    setupPdfWorker();
    const ye = e.url;
    setR(ye);
    const O = getDocument({
      url: e.url,
      useSystemFonts: true,
      isEvalSupported: false,
      useWasm: false
    });
    let oe = true;
    O.promise.then(G => {
      if (oe) {
        setT(G);
      }
    }).catch(() => {
      if (oe) {
        setK("Не удалось открыть встроенный просмотр. Откройте или скачайте оригинальный PDF.");
        setD(false);
      }
    });
    return () => {
      oe = false;
      AeRef.current?.cancel();
      O.destroy();
    };
  }, [e]);
  React.useEffect(() => {
    const _Ref_current = _RefRef.current;
    if (!_Ref_current || !v) {
      return;
    }
    const ye = new ResizeObserver(O => setP(Math.max(200, O[0].contentRect.width - 32)));
    ye.observe(_Ref_current);
    return () => ye.disconnect();
  }, [v, M]);
  React.useEffect(() => {
    if (!t || !v || !eeRef.current) {
      return;
    }
    let ae = false;
    const eeRef_current = eeRef.current;
    setD(true);
    setK("");
    setMe(0);
    setT_1("");
    const AeRef_current = AeRef.current;
    AeRef_current?.cancel();
    (async () => {
      if (AeRef_current) {
        await AeRef_current.promise.catch(() => {});
      }
      const oe = await t.getPage(c);
      if (ae) {
        return;
      }
      const G = oe.getViewport({
        scale: 1
      });
      const Q = Math.min(P, 1100) * C;
      const $ = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = oe.getViewport({
        scale: Q / G.width * $
      });
      eeRef_current.width = Math.ceil(viewport.width);
      eeRef_current.height = Math.ceil(viewport.height);
      eeRef_current.style.width = `${Q}px`;
      eeRef_current.style.height = `${viewport.height / $}px`;
      const xe = oe.render({
        canvas: eeRef_current,
        viewport
      });
      AeRef.current = xe;
      await xe.promise;
      if (ae) {
        return;
      }
      setMe(c);
      setD(false);
      const be = await oe.getTextContent();
      if (!ae) {
        setT_1(be.items.map(Le => {
          if ("str" in Le) {
            return Le.str + (Le.hasEOL ? `
` : " ");
          }
          return "";
        }).join(""));
      }
    })().catch(oe => {
      if (!ae && oe?.name !== "RenderingCancelledException") {
        setK("Просмотр страницы недоступен. Откройте или скачайте оригинальный PDF.");
        setD(false);
      }
    });
    return () => {
      ae = true;
      AeRef.current?.cancel();
    };
  }, [t, c, P, C, v, M]);
  if (!e) {
    return null;
  }
  const re = ae => {
    const ye = Math.max(1, Math.min(e.pages, Math.round(ae)));
    setC(ye);
    setG(String(ye));
    _RefRef.current?.scrollTo({
      top: 0,
      left: 0
    });
  };
  const J = e.bookmarks.filter(ae => normalizeSearch(`${ae.label} ${ae.keywords}`).includes(normalizeSearch(b)));
  const q = e.bookmarks.filter(ae => ae.page <= c).at(-1)?.page;
  const ie = <div className="manual-toolbar"><div className="manual-pagination"><button type="button" className="icon-button" aria-label="Предыдущая страница PDF" disabled={c <= 1} onClick={() => re(c - 1)}><Icon name="back" size={17} /></button><form onSubmit={ae => {
        ae.preventDefault();
        const ye = Number(g);
        if (Number.isInteger(ye) && ye >= 1 && ye <= e.pages) {
          re(ye);
        } else {
          setG(String(c));
        }
      }}><label>Стр. <input aria-label="Номер страницы PDF" type="number" min={1} max={e.pages} value={g} onChange={ae => setG(ae.target.value)} onBlur={() => {
            const ae = Number(g);
            if (Number.isInteger(ae) && ae >= 1 && ae <= e.pages) {
              re(ae);
            } else {
              setG(String(c));
            }
          }} /><span> / {e.pages}</span></label></form><button type="button" className="icon-button" aria-label="Следующая страница PDF" disabled={c >= e.pages} onClick={() => re(c + 1)}><Icon name="arrow" size={17} /></button></div><div className="manual-zoom"><button type="button" className="icon-button" aria-label="Уменьшить страницу PDF" disabled={C <= 0.75} onClick={() => setC_1(ae => ae - 0.25)}><Icon name="zoomOut" size={17} /></button><button type="button" className="manual-fit" title="Подогнать по ширине" onClick={() => setC_1(1)}>{Math.round(C * 100)}%</button><button type="button" className="icon-button" aria-label="Увеличить страницу PDF" disabled={C >= 2} onClick={() => setC_1(ae => ae + 0.25)}><Icon name="zoomIn" size={17} /></button></div><button type="button" className="button manual-expand" onClick={() => setM(!M)}><Icon name={M ? "x" : "maximize"} size={16} />{M ? "Свернуть" : "На весь экран"}</button></div>;
  const Re = <div className="manual-reader-body"><aside className="manual-contents" aria-label={`Оглавление методички ${protocolId === "pals" ? "PALS" : "BLS"}`}><div className="manual-contents-heading"><Icon name="list" size={17} /><h3>Быстрый переход</h3><span>{e.bookmarks.length}</span></div><label className="manual-toc-search"><Icon name="search" size={16} /><input aria-label="Поиск темы в оглавлении PDF" placeholder="Найти тему…" value={b} onChange={ae => setB(ae.target.value)} /></label><nav className="manual-bookmarks" aria-label="Темы в PDF">{J.map(ae => <button key={ae.page} type="button" className={q === ae.page ? "active" : ""} aria-current={q === ae.page ? "location" : undefined} onClick={() => re(ae.page)}><span>{ae.label}</span><small>{ae.page}</small></button>)}</nav>{!J.length && <p className="manual-no-results" role="status">Тема не найдена. Измените запрос.</p>}<p className="manual-page-note">Указаны страницы PDF. Номера внутри оригинала могут отличаться.</p></aside><div className="manual-document">{ie}<div className="manual-canvas-wrap" ref={_RefRef} aria-busy={D}>{D && <div className="manual-loading" role="status">Открываем страницу {c}…</div>}{k && <div className="manual-error" role="alert"><Icon name="info" size={24} /><p>{k}</p>{r && <a className="button" href={r} download={e.filename}>Скачать PDF</a>}</div>}<canvas ref={eeRef} style={{
          visibility: Me === c && !k ? "visible" : "hidden"
        }} role="img" aria-label={`${e.title}, страница ${c} из ${e.pages}. Текст доступен под документом.`} /></div><div className="manual-document-footer"><span aria-live="polite">Страница {c} из {e.pages}</span>{r && <a href={`${r}#page=${c}`} target="_blank" rel="noreferrer">Открыть оригинал <Icon name="external" size={13} /></a>}</div><details key={`${c}-${M}`} className="manual-page-text"><summary>Текст страницы {c}</summary><pre>{T || "Текст загружается или отсутствует на этой странице."}</pre></details></div></div>;
  return <section className={`manual-panel ${e.archive ? "manual-archive" : ""}`} aria-labelledby={`manual-${e.id}-title`}><header className="manual-header"><span className="manual-header-icon"><Icon name="book" size={26} /></span><div className="manual-heading"><div className="manual-eyebrow">ИСХОДНОЕ ПОСОБИЕ · PDF</div><h2 id={`manual-${e.id}-title`}>{e.title}</h2><p>{e.author && `${e.author} · `}{e.publisher}</p><div className="manual-tags"><span>{e.pages} страниц</span><span>{e.language}</span><span>{e.edition}</span></div></div><div className="manual-header-actions">{r && <a className="button" href={r} download={e.filename}><Icon name="download" size={16} />Скачать PDF</a>}<button type="button" className="button" aria-expanded={v} onClick={() => setV(!v)}><Icon name="chevronDown" size={16} />{v ? "Скрыть просмотр" : "Читать методичку"}</button></div></header><div className="manual-source-notice"><Icon name={e.archive ? "alert" : "info"} size={19} /><div><strong>{e.archive ? "Архивная редакция · 2005" : "Учебный материал · медицинская проверка не проведена"}</strong><p>{e.notice}</p><a href={e.guidelineUrl} target="_blank" rel="noreferrer">{e.guidelineLabel}<Icon name="external" size={13} /></a></div></div>{v && (M ? <Modal title={`${e.title} · ${e.archive ? "архив 2005" : "2026.01"}`} wide onClose={() => setM(false)}><div className="manual-fullscreen-body">{Re}</div></Modal> : Re)}</section>;
}

export { ManualViewer };
