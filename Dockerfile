FROM nginxinc/nginx-unprivileged:1.20.1
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
