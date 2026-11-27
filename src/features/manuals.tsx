// @ts-nocheck
import { Icon } from '../components/Icon';
import { getManual } from '../data/manuals';

function OSComponent({
  protocolId
}) {
  const e = getManual(protocolId);
  if (e) {
    return <div className="content-card manual-source-info"><h3>{e.title}</h3><p>{e.author && `${e.author} · `}{e.publisher} · {e.edition} · {e.pages} страниц.</p><p>{e.archive ? "Архивный первоисточник. Для действующих подходов приведена отдельная ссылка RCUK 2025." : "Учебный первоисточник. Издатель, версия и ограничения указаны в блоке методички."}</p><button type="button" className="text-link" onClick={() => document.getElementById(`manual-${e.id}-title`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })}>К исходной методичке <Icon name="up" size={15} /></button><a className="text-link" href={e.guidelineUrl} target="_blank" rel="noreferrer">{e.guidelineLabel}<Icon name="external" size={14} /></a></div>;
  }
  return null;
}

const X0 = [{
  id: "document",
  label: "Исходный документ",
  hint: "Материал автора",
  detail: "Здесь будет ссылка на загруженный документ, его версия и дата. Исходные материалы ещё не загружены."
}, {
  id: "assessment",
  label: "Оценка состояния",
  hint: "Критерии после проверки",
  detail: "Клинические признаки и критерии тяжести будут извлечены из источников и согласованы с рецензентом."
}, {
  id: "decision",
  label: "Точка решения",
  hint: "Условие после проверки",
  detail: "Условие ветвления и пороговые значения будут добавлены после проверки клинических рекомендаций."
}, {
  id: "branch-a",
  label: "Ветвь A",
  hint: "Тактика после проверки",
  detail: "Содержание этой ветви пока не определено. Она демонстрирует только возможности интерфейса."
}, {
  id: "branch-b",
  label: "Ветвь B",
  hint: "Тактика после проверки",
  detail: "Содержание этой ветви пока не определено. Она демонстрирует только возможности интерфейса."
}, {
  id: "reassessment",
  label: "Повторная оценка",
  hint: "Критерии после проверки",
  detail: "Частота и критерии повторной оценки будут указаны в индивидуальном алгоритме заболевания."
}];

export { OSComponent, X0 };
