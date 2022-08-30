FROM node:14 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod


FROM nginx:alpine
COPY --from=node /app/dist/my-app /usr/share/nginx/html
