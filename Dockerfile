FROM node:22-alpine AS build
WORKDIR /app
ARG ASTRO_CMS_API_URL=http://api:8090
ARG PUBLIC_SITE_URL=http://localhost:3000
ARG PUBLIC_ADMIN_ORIGIN=http://admin:80
ENV ASTRO_CMS_API_URL=$ASTRO_CMS_API_URL
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV PUBLIC_ADMIN_ORIGIN=$PUBLIC_ADMIN_ORIGIN
COPY package*.json ./
RUN npm ci 2>/dev/null || npm install
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ARG ASTRO_CMS_API_URL=http://api:8090
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV ASTRO_CMS_API_URL=$ASTRO_CMS_API_URL
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]
