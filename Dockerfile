from node:latest as build
workdir /usr/local/app
copy ./ /usr/local/app/
run npm install
run npm run build 
from nginx:latest
copy --from=build /usr/local/app/dist/thoughtful-front /usr/share/nginx/html
expose 80