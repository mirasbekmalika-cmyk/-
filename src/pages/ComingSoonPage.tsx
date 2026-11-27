// @ts-nocheck
import { Breadcrumbs, EmptyState, PageHeader } from '../components/common';

function ComingSoonPage({
  type
}) {
  const e = type === "medications";
  return <><Breadcrumbs items={[{
      label: e ? "Препараты" : "Процедуры"
    }]} /><PageHeader title={e ? "Лекарственные препараты" : "Процедуры"} description="Раздел сохранён из навигации прежней версии сайта." /><EmptyState icon={e ? "pill" : "syringe"} title="Материалы готовятся">{e ? "Карточки препаратов, дозировки, ограничения и ссылки на протоколы будут добавлены только после проверки источников." : "Показания, порядок выполнения, ограничения и схемы процедур будут добавлены после медицинского рецензирования."}</EmptyState></>;
}

export { ComingSoonPage };
