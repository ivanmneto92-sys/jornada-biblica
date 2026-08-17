-- Jornada Bíblica: perfis de usuário e progresso da jornada
-- Execute este script no SQL Editor do seu projeto Supabase.

-- 1. Perfis: um registro por usuário autenticado, criado automaticamente no cadastro.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: usuário vê e edita apenas o próprio perfil"
  on public.profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- cria o perfil automaticamente quando um novo usuário se cadastra
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Progresso da jornada: um registro por usuário + dia (1 a 73).
create table if not exists public.day_records (
  user_id uuid not null references auth.users (id) on delete cascade,
  day integer not null check (day between 1 and 73),
  completed boolean not null default false,
  completed_at timestamptz,
  checks jsonb not null default '{}'::jsonb,
  summary text not null default '',
  question text not null default '',
  verse text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, day)
);

alter table public.day_records enable row level security;

create policy "day_records: usuário vê e edita apenas os próprios registros"
  on public.day_records for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists day_records_user_id_idx on public.day_records (user_id);
