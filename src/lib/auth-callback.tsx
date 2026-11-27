// @ts-nocheck


function SR(s) {
  const e = new URL(s);
  const t = e.hash.slice(1);
  const a = new URLSearchParams(e.search);
  new URLSearchParams(t.startsWith("/") ? t.replace(/^[^?#&]*(?:[?#&]|$)/, "") : t).forEach((o, c) => {
    if (!a.has(c)) {
      a.set(c, o);
    }
  });
  return {
    present: ["code", "access_token", "refresh_token", "error", "error_code", "error_description"].some(o => a.has(o)),
    code: a.get("code"),
    accessToken: a.get("access_token"),
    refreshToken: a.get("refresh_token"),
    type: a.get("type"),
    error: a.get("error_code") || a.get("error") || (a.has("error_description") ? "auth_callback_failed" : null)
  };
}

async function xR(s, e) {
  const t = SR(e);
  if (!t.present) {
    return {
      present: false,
      recovery: false,
      error: null
    };
  }
  if (t.error) {
    return {
      present: true,
      recovery: false,
      error: {
        code: t.error
      }
    };
  }
  try {
    const a = t.code ? await s.auth.exchangeCodeForSession(t.code) : t.accessToken && t.refreshToken ? await s.auth.setSession({
      access_token: t.accessToken,
      refresh_token: t.refreshToken
    }) : {
      error: {
        code: "auth_callback_failed"
      }
    };
    return {
      present: true,
      recovery: !a.error && t.type === "recovery",
      error: a.error
    };
  } catch (error) {
    return {
      present: true,
      recovery: false,
      error
    };
  }
}

export { SR, xR };
