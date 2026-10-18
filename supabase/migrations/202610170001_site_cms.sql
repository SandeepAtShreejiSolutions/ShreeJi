create extension if not exists pgcrypto;

create table if not exists public.site_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  collection text not null check (collection in (
    'services', 'blogs', 'seo_keywords', 'aeo_keywords', 'testimonials',
    'reviews', 'partners', 'clients', 'projects'
  )),
  slug text not null,
  title text not null,
  data jsonb not null default '{}'::jsonb,
  published boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (collection, slug)
);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_site_content_updated_at on public.site_content;
create trigger set_site_content_updated_at
before update on public.site_content
for each row execute function public.set_site_content_updated_at();

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.site_admins
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to anon, authenticated;

alter table public.site_admins enable row level security;
alter table public.site_content enable row level security;

revoke all on public.site_admins from public, anon, authenticated;
grant select on public.site_admins to authenticated;
revoke all on public.site_content from public, anon, authenticated;
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;

drop policy if exists "Admins can read their admin membership" on public.site_admins;
create policy "Admins can read their admin membership"
on public.site_admins for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Public can read published content" on public.site_content;
create policy "Public can read published content"
on public.site_content for select to anon, authenticated
using (published or (select public.is_site_admin()));

drop policy if exists "Admins can insert site content" on public.site_content;
create policy "Admins can insert site content"
on public.site_content for insert to authenticated
with check ((select public.is_site_admin()));

drop policy if exists "Admins can update site content" on public.site_content;
create policy "Admins can update site content"
on public.site_content for update to authenticated
using ((select public.is_site_admin()))
with check ((select public.is_site_admin()));

drop policy if exists "Admins can delete site content" on public.site_content;
create policy "Admins can delete site content"
on public.site_content for delete to authenticated
using ((select public.is_site_admin()));

insert into public.site_content (collection, slug, title, data, published, position)
values
  ('services', 'search-engine-optimization', 'Search Engine Optimization', '{"description":"Dominate search results and drive organic, high-intent traffic to your website.","icon":"Search"}', true, 0),
  ('services', 'social-media-marketing', 'Social Media Marketing', '{"description":"Build a loyal community and boost brand awareness across all major social platforms.","icon":"Share2"}', true, 1),
  ('services', 'web-development', 'Web Development', '{"description":"Custom, high-performance websites built with modern technologies like React and Vite.","icon":"Code"}', true, 2),
  ('services', 'pay-per-click-advertising', 'Pay-Per-Click Advertising', '{"description":"Maximize your ROI with targeted ad campaigns on Google, Facebook, and Instagram.","icon":"Megaphone"}', true, 3),
  ('services', 'mobile-app-solutions', 'Mobile App Solutions', '{"description":"Extend your reach with intuitive and engaging mobile applications for iOS and Android.","icon":"Smartphone"}', true, 4),
  ('services', 'data-analytics', 'Data Analytics', '{"description":"Make informed decisions based on comprehensive tracking and actionable performance reporting.","icon":"BarChart"}', true, 5),
  ('projects', 'e-commerce-growth', 'E-Commerce Growth', '{"category":"SEO & Digital Marketing","metrics":"+150% Organic Traffic","image_url":"https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}', true, 0),
  ('projects', 'saas-launch-platform', 'SaaS Launch Platform', '{"category":"Web Development","metrics":"2x Conversion Rate","image_url":"https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}', true, 1),
  ('projects', 'app-install-campaign', 'App Install Campaign', '{"category":"PPC & Social Media","metrics":"10k+ New Users","image_url":"https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}', true, 2)
on conflict (collection, slug) do nothing;
