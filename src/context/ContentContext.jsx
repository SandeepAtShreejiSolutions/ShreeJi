import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { COLLECTIONS, DEFAULT_CONTENT } from '../lib/content';
import { supabase } from '../lib/supabase';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [contentError, setContentError] = useState('');
  const [isLoading, setIsLoading] = useState(Boolean(supabase));

  const refresh = useCallback(async () => {
    if (!supabase) return;
    setIsLoading(true);
    const { data, error } = await supabase.from('site_content')
      .select('id, collection, slug, title, data, published, position')
      .eq('published', true).order('position').order('created_at');
    if (error) {
      setContentError(error.message);
      setIsLoading(false);
      return;
    }
    if (!data) {
      setContentError('Supabase returned no content response.');
      setIsLoading(false);
      return;
    }
    const grouped = Object.fromEntries(COLLECTIONS.map(({ id }) => [id, []]));
    data.forEach((row) => {
      grouped[row.collection] ||= [];
      grouped[row.collection].push({ ...row.data, id: row.id, slug: row.slug, title: row.title, published: row.published, position: row.position });
    });
    setContent((current) => ({ ...current, ...grouped }));
    setContentError('');
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    const load = () => { if (active) refresh(); };
    const onVisibilityChange = () => { if (document.visibilityState === 'visible') load(); };
    load();
    const interval = window.setInterval(load, 30000);
    window.addEventListener('focus', load);
    document.addEventListener('visibilitychange', onVisibilityChange);
    const channel = supabase.channel('site-content-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content' }, load)
      .subscribe();
    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener('focus', load);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      supabase.removeChannel(channel);
    };
  }, [refresh]);

  const value = useMemo(() => ({ content, contentError, isLoading, refresh }), [content, contentError, isLoading, refresh]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  const value = useContext(ContentContext);
  if (!value) throw new Error('useSiteContent must be used inside ContentProvider');
  return value.content;
}

export function useContentStatus() {
  const value = useContext(ContentContext);
  if (!value) throw new Error('useContentStatus must be used inside ContentProvider');
  return { contentError: value.contentError, isLoading: value.isLoading, refresh: value.refresh };
}
