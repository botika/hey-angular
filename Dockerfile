FROM node
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist/pokemonAngular /usr/share/nginx/html
