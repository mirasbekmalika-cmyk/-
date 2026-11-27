// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { UD1Component, useTeam } from '../features/auth';
import { supabase } from '../lib/supabase-and-topics';

const H9 = {
  pending: "Ожидает доступа",
  editor: "Соавтор",
  admin: "Администратор"
};

function TeamPage() {
  const s = useTeam();
  const [e, setE] = React.useState(false);
  const [a, setA] = React.useState("");
  const [o, setO] = React.useState([]);
  async function h() {
    if (!supabase || !s.isAdmin) {
      return;
    }
    const m = await supabase.from("editorial_memberships").select("*").order("created_at");
    if (m.error) {
      setA("Не удалось загрузить команду.");
    } else {
      setO(m.data);
    }
  }
  React.useEffect(() => {
    h();
  }, [s.isAdmin]);
  async function g(m, role) {
    if (!supabase) {
      return;
    }
    setE(true);
    setA("");
    const A = await supabase.from("editorial_memberships").update({
      role
    }).eq("user_id", m.user_id).select("user_id");
    if (A.error) {
      setA(A.error.message.includes("LAST_ADMIN") ? "Нельзя убрать последнего администратора." : "Не удалось изменить доступ.");
    } else if (!A.data?.length) {
      setA("Изменение не применено. Проверьте права администратора.");
    }
    await h();
    setE(false);
  }
  return <div className="team-page"><nav className="breadcrumbs"><Link to="/">Главная</Link><Icon name="chevron" size={12} /><span>Редакция</span></nav><div className="page-heading"><div><div className="eyebrow">СОВМЕСТНАЯ РАБОТА</div><h1>Редакция «Неотложка+»</h1><p>Общие статьи, алгоритмы и история изменений.</p></div></div>{s.configured ? s.loading ? <div role="status"><p>Проверяем доступ… Это может занять несколько секунд.</p></div> : <><UD1Component />{s.user && !s.recovering && <><section className="content-card team-account"><div><h2>{s.member?.display_name || "Ваш аккаунт"}</h2><p>{s.user.email}</p><span className="age-pill">{H9[s.member?.role || "pending"]}</span></div><button className="button" disabled={e} onClick={async () => {
            setA("");
            if ((await supabase?.auth.signOut({
              scope: "local"
            }))?.error) {
              setA("Не удалось выйти. Повторите попытку.");
            }
          }}>Выйти</button></section>{s.memberError ? <div className="info-note"><p>Вы вошли, но права доступа пока не удалось проверить.</p><button className="button" onClick={() => {
            s.refreshMember();
          }}>Повторить проверку</button></div> : s.canEdit ? <div className="content-card"><h2>Работа с материалами</h2><p>Редактируйте текст, таблицы, источники и переходы алгоритмов. Сохранённая правка доступна редакции; читатели увидят её после публикации администратором.</p><Link className="button primary" to="/editor">Открыть редактор <Icon name="arrow" size={16} /></Link></div> : <div className="info-note"><Icon name="clock" /><div><strong>Ожидаем доступ соавтора</strong><p>Регистрация выполнена. Администратор увидит заявку в списке команды.</p><button className="button small" onClick={() => {
              s.refreshMember();
            }}>Проверить доступ</button></div></div>}</>}{s.isAdmin && <section className="content-card"><div className="section-line"><h2>Команда</h2><button className="button small" onClick={() => {
            h();
          }}>Обновить</button></div><p>Выдавайте доступ только своим соавторам. Приостановка доступа сохраняет историю их изменений.</p><div className="team-members">{o.map(m => <article key={m.user_id}><div><strong>{m.display_name}</strong><small>{m.email}</small></div><label>Роль<select aria-label={`Роль: ${m.display_name}`} value={m.role} disabled={e || m.user_id === s.user?.id} onChange={C => {
                g(m, C.target.value);
              }}>{Object.entries(H9).map(([C, A]) => <option key={C} value={C}>{A}</option>)}</select></label></article>)}</div></section>}</> : <div className="content-card editorial-connect"><Icon name="users" size={36} /><h2>Командная редакция готова к подключению</h2><p>Для регистрации и общих изменений администратору нужно завершить настройку базы команды. Читать статьи можно уже сейчас.</p><Link className="button" to="/system/respiratory?age=all">Открыть статьи</Link></div>}{(a || s.error) && <div className="editorial-error" role="alert">{a || s.error}</div>}</div>;
}

export { H9, TeamPage };
