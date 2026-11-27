// @ts-nocheck
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/common';

function NotFoundPage() {
  return <EmptyState icon="search" title="Страница не найдена" action=<Link to="/" className="button primary">На главную</Link>>Проверьте адрес или откройте каталог состояний.</EmptyState>;
}

export { NotFoundPage };
