import { Icon } from './Icon';

type ReviewStatus = 'draft' | 'in_review' | 'reviewed' | 'approved';

interface ReviewInfo {
  author?: string | null;
  reviewer?: string | null;
  checkedAt?: string | null;
  approvedBy?: string | null;
}

interface Props {
  status?: ReviewStatus | string;
  version?: string;
  review?: ReviewInfo;
}

const LABELS: Record<ReviewStatus, string> = {
  draft: 'Черновик',
  in_review: 'На рецензировании',
  reviewed: 'Проверено рецензентом',
  approved: 'Утверждено',
};

const NOT_SET = 'не назначен';

/**
 * Visible review status for a clinical page.
 * Until a named reviewer signs off, every page says plainly that it is not verified.
 */
export function ReviewStatusBanner({ status = 'draft', version, review = {} }: Props) {
  const verified = (status === 'reviewed' || status === 'approved') && !!review.reviewer && !!review.checkedAt;
  const label = LABELS[status as ReviewStatus] ?? LABELS.draft;

  return (
    <aside className={`status-banner ${verified ? 'is-verified' : 'is-unverified'}`} role="note" aria-label="Статус медицинской проверки">
      <Icon name={verified ? 'shield' : 'alert'} size={20} />
      <div className="status-banner-body">
        <strong>
          {verified ? label : `${label} — медицинская проверка не завершена`}
        </strong>
        {!verified && (
          <p>
            Дозы и алгоритмы на этой странице ещё не проверены независимым рецензентом и не сверены с клиническими протоколами МЗ РК.
            Перед применением сверяйте с действующим протоколом и формуляром учреждения.
          </p>
        )}
        <dl className="status-banner-meta">
          <div><dt>Версия</dt><dd>{version ?? '—'}</dd></div>
          <div><dt>Автор</dt><dd>{review.author || NOT_SET}</dd></div>
          <div><dt>Рецензент</dt><dd>{review.reviewer || NOT_SET}</dd></div>
          <div><dt>Дата проверки</dt><dd>{review.checkedAt || '—'}</dd></div>
        </dl>
      </div>
    </aside>
  );
}
