FROM nginx:1.25.2

COPY cineflix_front/dist/ /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
