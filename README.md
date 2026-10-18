# ShreeG Solutions website and CMS

This is the public ShreeG Solutions website, built with React and Vite. Its shared content manager is available at `/admin` and uses Supabase Auth and Postgres.

## CMS content

The CMS manages business services, blog posts, SEO keywords, AEO questions and answers, testimonials, reviews, partners, clients, and projects. Published entries are shown on the public website. Draft entries stay private. Published SEO entries update the page keywords and metadata; published AEO question and answer entries appear on the site and generate FAQ structured data.

The site content is focused on AI-enabled software across ecommerce, business workflows, web and mobile apps, model adaptation, product design, and development. After running the migration, run [`supabase/seed/20261018_ai_content_refresh.sql`](supabase/seed/20261018_ai_content_refresh.sql) in the Supabase SQL Editor to publish ten matching blogs, SEO keywords, AEO answers, and refreshed services, projects, and testimonials. The Indian-name testimonial examples are fictional personas, visibly labeled as illustrative and not real client endorsements; replace them with approved customer feedback before presenting endorsements as real.

## Connect Supabase

1. Create a Supabase project. In its SQL Editor, run [`supabase/migrations/202610170001_site_cms.sql`](supabase/migrations/202610170001_site_cms.sql).
2. In Supabase Auth, turn off public signups and create an administrator user. Copy that user’s UUID from the Auth users list.
3. In the SQL Editor, grant that account CMS access:

   ```sql
   insert into public.site_admins (user_id)
   values ('YOUR_AUTH_USER_UUID')
   on conflict (user_id) do nothing;
   ```

4. Copy `.env.example` to `.env.local`, then set the project URL and **publishable** key from the Supabase project’s API settings. Never use a secret or service-role key in this frontend.
5. Restart the Vite development server. Open `/admin` and sign in with the administrator user.
6. Add the same two environment variables to the website’s production deployment. Configure the host to send `/admin`, `/blogs/*`, and `/stories/*` routes to `index.html` so the CMS and content detail pages load on direct visits.

The SQL migration enables row-level security. Public visitors can read published content; only user IDs added to `site_admins` can create, edit, publish, or delete content.

## Local development

```sh
npm install
npm run dev
```

Without Supabase environment variables, the public site uses bundled fallback service and project content, and `/admin` displays the connection setup steps.
