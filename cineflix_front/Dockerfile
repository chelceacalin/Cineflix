FROM nginx:1.25.2

COPY /target/dist/ /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
