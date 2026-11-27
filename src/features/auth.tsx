// @ts-nocheck
import React from 'react';
import { KbContext, _R } from '../data/catalog';
import { Ub } from '../data/topic-sections';
import { E0, FR, LR, Ms, TR, c1, configured, supabase } from '../lib/supabase-and-topics';
import { Q9, oD } from '../lib/utils';

function useLD() {
  const [user, setUser] = React.useState(null);
  const [t, setT] = React.useState(null);
  const [loading, setLoading] = React.useState(!!supabase);
  const [c, setC] = React.useState("");
  const [g, setG] = React.useState("");
  const [authIssue, setAuthIssue] = React.useState("");
  const [authNotice, setAuthNotice] = React.useState("");
  const [revision, setRevision] = React.useState(0);
  const [recovering, setRecovering] = React.useState(false);
  const DRef = React.useRef(0);
  const ZRef = React.useRef(false);
  const setRecovering_1 = React.useCallback(F => {
    setRecovering(F);
    ZRef.current = F;
    if (!F) {
      Q9(null);
    }
  }, []);
  const refreshPublished = React.useCallback(async () => {
    if (supabase) {
      try {
        const {
          data,
          error
        } = await supabase.from("published_documents").select("id,payload,version,published_at");
        if (error) {
          throw error;
        }
        const B = (data || []).filter(ee => {
          try {
            return ee.id === ee.payload.id && !Ub(ee.payload).length;
          } catch {
            return false;
          }
        });
        _R(B);
        setRevision(ee => ee + 1);
        setC("");
      } catch {
        setC("Не удалось обновить общие статьи. Показана сохранённая версия сайта.");
      }
    }
  }, []);
  const refreshMember = React.useCallback(async () => {
    if (!supabase) {
      return;
    }
    const F = ++DRef.current;
    try {
      const {
        data: {
          user
        },
        error
      } = await supabase.auth.getUser();
      if (F !== DRef.current) {
        return;
      }
      if (error) {
        if (["session_not_found", "refresh_token_not_found", "refresh_token_already_used"].includes(error.code || "") || error.name === "AuthSessionMissingError") {
          setUser(null);
          setT(null);
          setRecovering_1(false);
          setG("");
          return;
        }
        throw error;
      }
      if (!user) {
        setUser(null);
        setT(null);
        setRecovering_1(false);
        setG("");
        return;
      }
      setUser(user);
      const ee = await supabase.from("editorial_memberships").select("*").eq("user_id", user.id).maybeSingle();
      if (F !== DRef.current) {
        return;
      }
      if (ee.error) {
        throw ee.error;
      }
      if (!ee.data) {
        throw Error("MEMBERSHIP_MISSING");
      }
      setT(ee.data);
      setG("");
      const _ = ZRef.current || oD(user.id);
      setRecovering(_);
      if (_) {
        Q9(user.id);
      }
    } catch {
      if (F === DRef.current) {
        setT(null);
        setG("Не удалось проверить права доступа. Проверьте интернет и нажмите «Повторить проверку».");
      }
    } finally {
      if (F === DRef.current) {
        setLoading(false);
      }
    }
  }, [setRecovering_1]);
  React.useEffect(() => {
    if (!supabase) {
      return;
    }
    let F = true;
    let P = false;
    const set = new Set();
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange(Me => {
      if (Me === "PASSWORD_RECOVERY") {
        ZRef.current = true;
        setRecovering(true);
        setAuthNotice("Доступ подтверждён. Задайте новый пароль.");
      }
      if (Me === "SIGNED_OUT") {
        ++DRef.current;
        setUser(null);
        setT(null);
        setRecovering_1(false);
        setG("");
        setLoading(false);
        setAuthNotice("Вы вышли из аккаунта.");
      }
      if (!P) {
        return;
      }
      const ue = setTimeout(() => {
        set.delete(ue);
        if (F) {
          refreshMember();
        }
      }, 0);
      set.add(ue);
    });
    TR().then(async Me => {
      if (F) {
        if (Me.error) {
          setAuthIssue(c1(Me.error, "callback").text);
        } else if (Me.present) {
          if (Me.recovery) {
            ZRef.current = true;
          }
          setAuthNotice(ZRef.current ? "Доступ подтверждён. Задайте новый пароль." : "Email подтверждён. Проверяем доступ к редакции.");
        }
        P = true;
        await refreshMember();
      }
    }).catch(() => {
      if (F) {
        setAuthIssue("Не удалось обработать ссылку. Запросите новое письмо восстановления.");
        setLoading(false);
      }
    });
    refreshPublished();
    const _ = () => {
      refreshMember();
      refreshPublished();
    };
    window.addEventListener("focus", _);
    const Ae = window.setInterval(() => {
      refreshPublished();
      refreshMember();
    }, 45000);
    return () => {
      F = false;
      ++DRef.current;
      subscription.unsubscribe();
      window.removeEventListener("focus", _);
      clearInterval(Ae);
      set.forEach(clearTimeout);
    };
  }, [refreshMember, refreshPublished, setRecovering_1]);
  return {
    configured,
    user,
    member: t,
    loading,
    error: g || c,
    memberError: g,
    authIssue,
    authNotice,
    clearAuthFeedback: () => {
      setAuthIssue("");
      setAuthNotice("");
    },
    revision,
    recovering,
    setRecovering: setRecovering_1,
    refreshMember,
    refreshPublished,
    canEdit: !g && (t?.role === "editor" || t?.role === "admin"),
    isAdmin: !g && t?.role === "admin"
  };
}

function TeamProvider({
  children
}) {
  const e = useLD();
  return <KbContext.Provider value={e}>{children}</KbContext.Provider>;
}

function useTeam() {
  const s = React.useContext(KbContext);
  if (!s) {
    throw Error("TeamProvider missing");
  }
  return s;
}

function HD1Component({
  email,
  busy,
  cooldown,
  onResend,
  onChange,
  onLogin
}) {
  return <div className="auth-confirmation"><span className="auth-mail-icon" aria-hidden="true">✉</span><h2>Проверьте почту</h2><p>Запрос на регистрацию принят для адреса</p><strong className="auth-email">{email}</strong><ol><li>Откройте письмо «Неотложка+» и нажмите ссылку подтверждения.</li><li>Вернитесь на сайт и войдите с вашим паролем.</li><li>Администратор выдаст доступ к редактированию.</li></ol><p className="muted">Письмо может прийти через несколько минут. Проверьте папку «Спам». Если аккаунт уже есть, перейдите ко входу или восстановите пароль.</p><div className="auth-actions"><button className="button primary" onClick={onLogin}>Перейти ко входу</button><button className="button" disabled={busy || cooldown > 0} onClick={onResend}>{busy ? "Отправляем…" : cooldown > 0 ? `Повторить отправку через ${cooldown} с` : "Отправить письмо повторно"}</button><button className="text-link" disabled={busy} onClick={onChange}>Изменить email</button></div></div>;
}

function UD1Component() {
  const s = useTeam();
  const [e, setE] = React.useState("login");
  const [a, setA] = React.useState(null);
  const [o, setO] = React.useState(null);
  const [h, setH] = React.useState("");
  const [m, setM] = React.useState(false);
  const [A, setA_1] = React.useState("");
  const [I, setI] = React.useState("");
  const [w, setW] = React.useState("");
  const [R, setR] = React.useState("");
  const [Z, setZ] = React.useState(false);
  const [j, setJ] = React.useState("");
  const [F, setF] = React.useState("");
  const [B, setB] = React.useState("");
  const [_, set_] = React.useState(0);
  const [Me, setMe] = React.useState(false);
  const [re, setRe] = React.useState({});
  const qRef = React.useRef(null);
  const ieRef = React.useRef(false);
  React.useEffect(() => {
    if (j || F || B || h || s.authIssue || s.authNotice) {
      qRef.current?.focus();
      qRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    }
  }, [j, F, B, h, s.authIssue, s.authNotice]);
  React.useEffect(() => {
    if (!_) {
      return;
    }
    const $ = window.setTimeout(() => set_(te => Math.max(0, te - 1)), 1000);
    return () => clearTimeout($);
  }, [_]);
  function Re($) {
    s.clearAuthFeedback();
    setE($);
    setB("");
    setH("");
    setJ("");
    setO(null);
    setF("");
    setM(false);
    setMe(false);
    setRe({});
    setW("");
    setR("");
  }
  async function ae() {
    if (!(!supabase || ieRef.current || _ > 0)) {
      ieRef.current = true;
      setZ(true);
      setJ("");
      setF("");
      try {
        const $ = await supabase.auth.resend({
          type: "signup",
          email: B || Ms(A),
          options: {
            emailRedirectTo: E0()
          }
        });
        if ($.error) {
          throw $.error;
        }
        setF("Запрос на повторную отправку принят. Проверьте почту и папку «Спам».");
        set_(60);
        setA("signup");
      } catch (error) {
        const te = c1(error, "resend");
        setO(te);
        setJ(te.text);
      } finally {
        setZ(false);
        ieRef.current = false;
      }
    }
  }
  async function onSubmit($) {
    $.preventDefault();
    if (!supabase || ieRef.current) {
      return;
    }
    const te = {};
    if (!s.recovering && !LR(Ms(A))) {
      te.email = "Введите корректный email, например name@example.com.";
    }
    if (e === "signup" && !s.recovering && !I.trim()) {
      te.name = "Введите имя и фамилию.";
    }
    if ((s.recovering || e !== "reset") && !w) {
      te.password = "Введите пароль.";
    }
    if ((s.recovering || e === "signup") && w.length < 10) {
      te.password = "Пароль должен содержать не менее 10 символов.";
    }
    if ((s.recovering || e === "signup") && w !== R) {
      te.confirm = "Пароли не совпадают. Повторите пароль ещё раз.";
    }
    setRe(te);
    setF("");
    setJ("");
    setO(null);
    s.clearAuthFeedback();
    if (e === "reset" && a === "reset" && _ > 0) {
      setJ(`Подождите ${_} секунд перед повторным запросом письма.`);
      return;
    }
    if (Object.keys(te).length) {
      setJ("Исправьте отмеченные поля. Данные сохранены.");
      return;
    }
    ieRef.current = true;
    setZ(true);
    const xe = s.recovering ? "update" : e;
    try {
      if (s.recovering && s.user) {
        const be = await supabase.auth.updateUser({
          password: w
        });
        if (be.error) {
          throw be.error;
        }
        s.setRecovering(false);
        setF("Пароль успешно изменён. Вы вошли в аккаунт.");
      } else if (e === "reset") {
        const be = await supabase.auth.resetPasswordForEmail(Ms(A), {
          redirectTo: E0()
        });
        if (be.error) {
          throw be.error;
        }
        setH(Ms(A));
        set_(60);
        setA("reset");
        setF("Запрос на восстановление принят.");
      } else if (e === "signup") {
        const be = await supabase.auth.signUp({
          email: Ms(A),
          password: w,
          options: {
            data: {
              display_name: I.trim()
            },
            emailRedirectTo: E0()
          }
        });
        if (be.error) {
          if (["user_already_exists", "email_exists"].includes(be.error.code || "")) {
            setE("login");
            setF("Этот email уже зарегистрирован. Войдите с прежним паролем или нажмите «Забыли пароль?».");
            setW("");
            setR("");
            return;
          }
          throw be.error;
        }
        if (FR(be.data)) {
          setB("");
          setE("login");
          setF("Этот email уже зарегистрирован. Войдите с прежним паролем или нажмите «Забыли пароль?».");
        } else if (be.data.session) {
          setF("Аккаунт создан. Вы вошли в редакцию; доступ к статьям выдаст администратор.");
          await s.refreshMember();
        } else {
          setB(Ms(A));
          set_(60);
          setA("signup");
        }
      } else {
        const be = await supabase.auth.signInWithPassword({
          email: Ms(A),
          password: w
        });
        if (be.error) {
          throw be.error;
        }
        setF("Вы успешно вошли в редакцию.");
        await s.refreshMember();
      }
      setW("");
      setR("");
    } catch (error) {
      const Le = c1(error, xe);
      setO(Le);
      setJ(Le.text);
    } finally {
      setZ(false);
      ieRef.current = false;
    }
  }
  const s_recovering = s.recovering;
  const oe = j || s.authIssue;
  const G = F || s.authNotice;
  const QComponent = $ => re[$] && <small className="auth-field-error" id={`auth-${$}-error`}>{re[$]}</small>;
  return <section className="content-card team-auth auth-panel" aria-busy={Z}><div ref={qRef} tabIndex={-1} className="auth-feedback">{oe && <div className="editorial-error" role="alert"><strong>{o?.action === "reset" ? "Нужно восстановить доступ" : "Не удалось продолжить"}</strong><p>{oe}</p>{(o?.action === "reset" || s.authIssue) && <button className="button small" disabled={Z} onClick={() => {
          if (s.user?.email) {
            setA_1(s.user.email);
          }
          Re("reset");
        }}>Восстановить пароль</button>}{o?.action === "resend" && <button className="button small" disabled={Z || _ > 0} onClick={() => {
          ae();
        }}>{_ > 0 ? `Повторить через ${_} с` : "Отправить подтверждение повторно"}</button>}</div>}{G && !oe && <div className="editorial-status" role="status"><strong>{G}</strong></div>}{B && !s.user && <HD1Component email={B} busy={Z} cooldown={_} onResend={() => {
        ae();
      }} onChange={() => {
        setB("");
        setJ("");
        setF("");
      }} onLogin={() => Re("login")} />}{h && <div className="auth-confirmation"><h2>Проверьте письмо восстановления</h2><strong className="auth-email">{h}</strong><p>Если аккаунт существует, на этот адрес придёт ссылка. Откройте ссылку из нового письма — после перехода должна появиться форма «Новый пароль». Сам переход по ссылке не меняет пароль: введите его дважды и нажмите «Сохранить пароль».</p><p>Проверьте папку «Спам». Повторная регистрация не меняет пароль существующего аккаунта.</p><div className="auth-actions"><button className="button primary" onClick={() => Re("login")}>Перейти ко входу</button><button className="button" disabled={Z || _ > 0} onClick={() => {
            setH("");
            setF("");
          }}>{_ > 0 ? `Запросить новое письмо через ${_} с` : "Запросить новое письмо"}</button><button className="text-link" onClick={() => {
            setH("");
            setF("");
          }}>Изменить email</button></div></div>}</div>{(!s.user || s_recovering || e === "reset") && !B && !h && <><h2>{s_recovering ? "Новый пароль" : e === "signup" ? "Создать аккаунт соавтора" : e === "reset" ? "Восстановить пароль" : "Войти в редакцию"}</h2><p>{s_recovering ? "Введите новый уникальный пароль. После сохранения можно будет работать с редакцией." : e === "signup" ? "Создайте аккаунт по email и паролю. Доступ к редактированию выдаёт администратор." : e === "reset" ? "Отправим ссылку для восстановления доступа." : "Войдите, чтобы работать со статьями и алгоритмами."}</p>{!s_recovering && <div className="flow-view-toggle" aria-label="Вход или регистрация">{["login", "signup"].map($ => <button key={$} disabled={Z} aria-pressed={e === $} className={e === $ ? "active" : ""} onClick={() => Re($)}>{$ === "login" ? "Войти" : "Зарегистрироваться"}</button>)}</div>}<form noValidate onSubmit={onSubmit}><fieldset disabled={Z} className="editor-form-fieldset">{!s_recovering && e === "signup" && <label>Имя и фамилия<input aria-label="Имя и фамилия" required maxLength={120} autoComplete="name" value={I} aria-invalid={!!re.name} aria-describedby={re.name ? "auth-name-error" : undefined} onChange={$ => setI($.target.value)} />{QComponent("name")}</label>}{!s_recovering && <label>Email<input aria-label="Email" required maxLength={254} type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} value={A} aria-invalid={!!re.email} aria-describedby={re.email ? "auth-email-error" : undefined} onChange={$ => setA_1($.target.value)} />{QComponent("email")}</label>}{(s_recovering || e !== "reset") && <label>Пароль<input aria-label="Пароль" onKeyUp={$ => setM($.getModifierState("CapsLock"))} required type={Me ? "text" : "password"} autoComplete={e === "signup" || s_recovering ? "new-password" : "current-password"} value={w} aria-invalid={!!re.password} aria-describedby={re.password ? "auth-password-error" : "auth-password-hint"} onChange={$ => setW($.target.value)} />{QComponent("password")}<small id="auth-password-hint">{e === "signup" || s_recovering ? "Не менее 10 символов. Используйте уникальный пароль." : "Пароль, указанный при регистрации."}</small></label>}{(s_recovering || e === "signup") && <label>Повторите пароль<input aria-label="Повторите пароль" onKeyUp={$ => setM($.getModifierState("CapsLock"))} required type={Me ? "text" : "password"} autoComplete="new-password" value={R} aria-invalid={!!re.confirm} aria-describedby={re.confirm ? "auth-confirm-error" : undefined} onChange={$ => setR($.target.value)} />{QComponent("confirm")}</label>}{m && <p role="status">Включён Caps Lock. Проверьте регистр букв в пароле.</p>}{(s_recovering || e !== "reset") && <label className="auth-show-password"><input type="checkbox" checked={Me} onChange={$ => setMe($.target.checked)} />Показать пароль</label>}<button className="button primary auth-submit" disabled={Z} type="submit">{Z ? s_recovering ? "Сохраняем пароль…" : e === "signup" ? "Создаём аккаунт…" : e === "reset" ? "Отправляем письмо…" : "Проверяем данные…" : s_recovering ? "Сохранить пароль" : e === "signup" ? "Создать аккаунт" : e === "reset" ? "Отправить письмо" : "Войти"}</button>{s_recovering && <button type="button" className="text-link" onClick={() => {
            setW("");
            setR("");
            s.setRecovering(false);
            s.clearAuthFeedback();
            setF("Вы вошли в аккаунт. Пароль не изменён.");
          }}>Продолжить без смены пароля</button>}{!s_recovering && <button className="text-link" type="button" onClick={() => Re(e === "reset" ? "login" : "reset")}>{e === "reset" ? "Вернуться ко входу" : "Забыли пароль?"}</button>}</fieldset></form></>}</section>;
}

export { HD1Component, TeamProvider, UD1Component, useLD, useTeam };
