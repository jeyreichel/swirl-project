FROM node:alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

ENV NEXT_PUBLIC_SUPABASE_URL=https://dtegvflegddjhscfvlkw.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZWd2ZmxlZ2RkamhzY2Z2bGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY5MzM0NTAsImV4cCI6MjAwMjUwOTQ1MH0.nVnpMsRkXWXSXnQ9x3ONDmHGRhYiOgoGpbOHxQtlubI
ENV NEXT_PUBLIC_POLYLAB_URL=https://api.polylab.zip/api

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
EXPOSE 3000
CMD [ "pnpm", "start" ]
