-- ---------------------------------------------------------------------------
-- Story Authoring & Creator Studio (Phase 2)
-- ---------------------------------------------------------------------------

-- Index submitted_by to quickly fetch an author's stories
create index if not exists stories_submitted_by_idx on public.stories (submitted_by);

-- 1. Authors can view their own stories regardless of status (pending, published, etc.)
create policy "Authors can view own stories"
  on public.stories for select
  to authenticated
  using (auth.uid() = submitted_by);

-- 2. Authenticated users can submit new stories with submitted_by = auth.uid()
create policy "Authenticated users can submit stories"
  on public.stories for insert
  to authenticated
  with check (auth.uid() = submitted_by);

-- 3. Authors can update their own stories
create policy "Authors can update own stories"
  on public.stories for update
  to authenticated
  using (auth.uid() = submitted_by)
  with check (auth.uid() = submitted_by);

-- 4. Authors can delete or request removal of their own stories
create policy "Authors can delete own stories"
  on public.stories for delete
  to authenticated
  using (auth.uid() = submitted_by);
