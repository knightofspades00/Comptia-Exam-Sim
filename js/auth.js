/* =========================================================================
   Student session — "login" stored locally
   No password. The student types name + class period at the landing page;
   it's saved in localStorage so they don't have to re-enter on every attempt.
   ------------------------------------------------------------------------- */

const SESSION_KEY = 'sim_student_session';
const ATTEMPTS_KEY = 'sim_attempts';

window.SessionStore = {
  get() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  },
  set(student) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      name: (student.name || '').trim(),
      classPeriod: (student.classPeriod || '').trim(),
      loggedInAt: new Date().toISOString()
    }));
  },
  clear() {
    localStorage.removeItem(SESSION_KEY);
  },
  isValid(s) {
    return s && s.name && s.name.length >= 2;
  }
};

window.AttemptsStore = {
  getAll() {
    try {
      const raw = localStorage.getItem(ATTEMPTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  },
  add(attempt) {
    const list = window.AttemptsStore.getAll();
    list.unshift(attempt);
    // keep last 20
    const trimmed = list.slice(0, 20);
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(trimmed));
  },
  clear() {
    localStorage.removeItem(ATTEMPTS_KEY);
  }
};
