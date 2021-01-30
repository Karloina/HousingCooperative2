FROM node:12 AS build

# Create app directory
WORKDIR /usr/src/app

COPY . ./

RUN npm install
RUN npm run build


FROM nginx:1.19.6-alpine
COPY nginx_react_default_config /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /var/www/
CMD ["nginx", "-g", "daemon off;"]