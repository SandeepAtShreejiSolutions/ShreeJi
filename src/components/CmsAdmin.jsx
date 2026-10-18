import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, LogOut, Plus, Save, Trash2 } from 'lucide-react';
import { COLLECTIONS, FIELDS, slugify } from '../lib/content';
import { hasSupabaseConfig, supabase } from '../lib/supabase';

const emptyForm = () => ({ title: '', published: false, data: {} });

function SetupNotice() {
  return <main className="cms-setup-page"><div className="cms-setup-card">
    <a href="/" className="cms-back"><ArrowLeft size={18} /> Back to website</a>
    <h1>Connect your CMS</h1>
    <p>This site is ready for a shared Supabase CMS. Add the public project URL and publishable key to your deployment environment, then run the included database migration.</p>
    <pre>VITE_SUPABASE_URL=https://your-project.supabase.co<br />VITE_SUPABASE_ANON_KEY=your-publishable-key</pre>
    <p>See <code>README.md</code> for database setup and instructions for creating the first admin account. Never put a service role key in the website.</p>
  </div></main>;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setError('');
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) setError(loginError.message);
    else onLogin(data.session);
    setBusy(false);
  };
  return <main className="cms-login-page"><form className="cms-login-card" onSubmit={submit}>
    <a href="/" className="cms-back"><ArrowLeft size={18} /> Back to website</a>
    <h1>ShreeG CMS</h1><p className="text-muted">Sign in with your authorized administrator account.</p>
    <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="username" /></label>
    <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>
    {error && <p className="cms-error" role="alert">{error}</p>}
    <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
  </form></main>;
}

const CmsAdmin = () => {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [adminAccess, setAdminAccess] = useState('checking');
  const [collection, setCollection] = useState(COLLECTIONS[0].id);
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const collectionInfo = useMemo(() => COLLECTIONS.find((item) => item.id === collection), [collection]);

  const checkAdminAccess = useCallback(async (userId) => {
    const { data, error: accessError } = await supabase.from('site_admins')
      .select('user_id').eq('user_id', userId).maybeSingle();
    setAdminAccess(accessError ? 'error' : data ? 'allowed' : 'missing');
  }, []);

  useEffect(() => {
    if (!supabase) { setCheckingSession(false); return undefined; }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session); setCheckingSession(false);
      if (data.session) checkAdminAccess(data.session.user.id);
      else setAdminAccess('missing');
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession) checkAdminAccess(nextSession.user.id);
      else setAdminAccess('missing');
    });
    return () => subscription.unsubscribe();
  }, [checkAdminAccess]);

  const loadEntries = useCallback(async () => {
    if (!session) return;
    setLoading(true); setError('');
    const { data, error: queryError } = await supabase.from('site_content')
      .select('id, collection, slug, title, data, published, position, updated_at')
      .eq('collection', collection).order('position').order('updated_at', { ascending: false });
    if (queryError) setError(`${queryError.message}. Confirm this signed-in user is listed in site_admins.`);
    else setEntries(data || []);
    setLoading(false);
  }, [collection, session]);

  useEffect(() => { loadEntries(); }, [loadEntries]);

  if (!hasSupabaseConfig) return <SetupNotice />;
  if (checkingSession) return <main className="cms-login-page"><p>Checking session…</p></main>;
  if (!session) return <Login onLogin={setSession} />;

  const updateField = (key, value) => setForm((current) => ({ ...current, data: { ...current.data, [key]: value } }));
  const startNew = () => { setEditingId(null); setForm(emptyForm()); setError(''); setMessage(''); };
  const editEntry = (entry) => {
    setEditingId(entry.id);
    setForm({ title: entry.title, published: entry.published, data: entry.data || {} });
    setError(''); setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const saveEntry = async (event) => {
    event.preventDefault(); setLoading(true); setError(''); setMessage('');
    const base = { collection, slug: slugify(form.title), title: form.title.trim(), data: form.data, published: form.published };
    const result = editingId
      ? await supabase.from('site_content').update(base).eq('id', editingId).select('id').single()
      : await supabase.from('site_content').insert({ ...base, position: entries.length }).select('id').single();
    if (result.error?.code === '42501') {
      setError(`Supabase blocked this write. This account needs CMS access. Run the SQL shown above in your Supabase SQL Editor, then select “Check access again”. (${result.error.message})`);
    } else if (result.error) setError(result.error.message);
    else { setMessage('Saved. Published content will appear on the website.'); setEditingId(result.data.id); await loadEntries(); }
    setLoading(false);
  };
  const deleteEntry = async (entry) => {
    if (!window.confirm(`Delete “${entry.title}”? This cannot be undone.`)) return;
    setError(''); setMessage(''); setLoading(true);
    const { error: deleteError } = await supabase.from('site_content').delete().eq('id', entry.id);
    if (deleteError) setError(deleteError.message);
    else { if (editingId === entry.id) startNew(); setMessage('Entry deleted.'); await loadEntries(); }
    setLoading(false);
  };

  return <main className="cms-page">
    <header className="cms-header"><a href="/" className="brand-link"><img src="/shreeg-circular-logo.png" alt="" /> ShreeG CMS</a>
      <div className="cms-account"><span>{session.user.email}</span><button type="button" className="cms-quiet-button" onClick={() => supabase.auth.signOut()}><LogOut size={17} /> Sign out</button></div>
    </header>
    <div className="cms-layout">
      <aside className="cms-sidebar"><h2>Content</h2>
        {COLLECTIONS.map((item) => <button key={item.id} type="button" className={item.id === collection ? 'cms-nav-item is-active' : 'cms-nav-item'} onClick={() => { setCollection(item.id); startNew(); }}>{item.label}</button>)}
      </aside>
      <section className="cms-main">
        <div className="cms-heading-row"><div><p className="cms-eyebrow">Content manager</p><h1>{collectionInfo.label}</h1></div>
          <button className="btn btn-primary" type="button" onClick={startNew}><Plus size={18} /> Add {collectionInfo.singular}</button>
        </div>
        {adminAccess === 'missing' && <div className="cms-access-warning" role="alert">
          <strong>This account has not been granted CMS access yet.</strong>
          <p>In Supabase, open <b>SQL Editor → New query</b> and run:</p>
          <pre>insert into public.site_admins (user_id) values ('{session.user.id}') on conflict (user_id) do nothing;</pre>
          <button type="button" className="cms-quiet-button" onClick={() => checkAdminAccess(session.user.id)}>Check access again</button>
        </div>}
        {adminAccess === 'error' && <div className="cms-access-warning" role="alert">
          <strong>Could not check this account’s CMS access.</strong>
          <p>Confirm you ran the CMS database migration, including the <code>site_admins</code> table and its read policy.</p>
          <button type="button" className="cms-quiet-button" onClick={() => checkAdminAccess(session.user.id)}>Retry access check</button>
        </div>}
        <div className="cms-work-grid">
          <div className="cms-list-panel">
            <h2>Entries <span>{entries.length}</span></h2>
            {loading && <p className="text-muted">Loading…</p>}
            {!loading && entries.length === 0 && <p className="text-muted">No entries yet. Add your first {collectionInfo.singular.toLowerCase()}.</p>}
            {entries.map((entry) => <div className="cms-entry-row" key={entry.id}>
              <button type="button" className="cms-entry-select" onClick={() => editEntry(entry)}><strong>{entry.title}</strong><span>{entry.published ? 'Published' : 'Draft'}</span></button>
              <button type="button" className="cms-delete-button" aria-label={`Delete ${entry.title}`} onClick={() => deleteEntry(entry)}><Trash2 size={17} /></button>
            </div>)}
          </div>
          <form className="cms-form" onSubmit={saveEntry}>
            <div className="cms-form-heading"><h2>{editingId ? 'Edit entry' : `Add ${collectionInfo.singular}`}</h2><label className="cms-publish-toggle"><input type="checkbox" checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} /> Published</label></div>
            <label>Title<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label>
            <p className="cms-slug-hint">Internal URL slug: {slugify(form.title) || 'your-title'}</p>
            {(FIELDS[collection] || []).map(([key, label, type]) => <label key={key}>{label}
              {type === 'checkbox'
                ? <input type="checkbox" checked={Boolean(form.data[key])} onChange={(event) => updateField(key, event.target.checked)} />
                : type === 'textarea'
                ? <textarea rows={key === 'content' || key === 'answer' || key === 'description' ? 6 : 3} value={form.data[key] || ''} onChange={(event) => updateField(key, event.target.value)} />
                : <input type={type} min={type === 'number' ? '1' : undefined} max={type === 'number' ? '5' : undefined} value={form.data[key] || ''} onChange={(event) => updateField(key, event.target.value)} />}
            </label>)}
            {error && <p className="cms-error" role="alert">{error}</p>}{message && <p className="cms-success" role="status">{message}</p>}
            <button className="btn btn-primary" type="submit" disabled={loading || adminAccess !== 'allowed' || !form.title.trim()}><Save size={17} /> {loading ? 'Saving…' : 'Save entry'}</button>
          </form>
        </div>
      </section>
    </div>
  </main>;
};

export default CmsAdmin;
