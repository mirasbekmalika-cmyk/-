// @ts-nocheck
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Modal } from '../components/Modal';
import { EmptyState } from '../components/common';
import { eD, ro } from '../data/catalog';
import { useApp } from '../state/app-state';

function SearchDialog({
  close
}) {
  const [e, setE] = React.useState("");
  const {
    age
  } = useApp();
  const r = eD(e, age);
  const o = useNavigate();
  return <Modal title="Быстрый поиск" onClose={close}><div className="search-dialog"><label className="search-field"><Icon name="search" /><input autoFocus aria-label="Поисковый запрос" placeholder="Диагноз, симптом или аббревиатура…" value={e} onChange={c => setE(c.target.value)} />{e && <button aria-label="Очистить поиск" className="icon-button" onClick={() => setE("")}><Icon name="x" size={16} /></button>}</label><div className="search-meta"><span>{ro(age)} · названия и ключевые слова</span><kbd>Esc</kbd></div>{e ? <div className="search-results" aria-live="polite">{r.length ? <><div className="small-label">НАЙДЕНО: {r.length}</div>{r.map(c => <button key={`${c.type}-${c.id}`} className="search-result" onClick={() => {
            o(c.path);
            close();
          }}><span className="result-icon"><Icon name={c.type === "system" ? "grid" : "file"} size={19} /></span><span><strong>{c.title}</strong><small>{c.subtitle}</small></span><Icon name="arrow" size={17} /></button>)}</> : <EmptyState title="Ничего не найдено" icon="search">Попробуйте другой термин или измените возрастную группу на главной странице.</EmptyState>}</div> : <><p className="small-label">ПОПРОБУЙТЕ НАЙТИ</p><div className="chips">{["Стридор", "Одышка", "Астма", "PAT", "ABCDE"].map(c => <button key={c} onClick={() => setE(c)}>{c}</button>)}</div></>}<p className="search-foot"><Icon name="info" size={14} /> Поиск показывает материалы, а не клинические рекомендации.</p></div></Modal>;
}

export { SearchDialog };
