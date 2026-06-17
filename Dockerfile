FROM nginx:alpine

# Copie du site statique
COPY . /usr/share/nginx/html

# Config nginx : cache des assets + pages HTML servies directement
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    if ($host = www.betalis.fr) { return 301 https://betalis.fr$request_uri; }\n\
    location / { try_files $uri $uri.html $uri/ =404; }\n\
    location ~* \\.(png|jpg|jpeg|svg|ico|webp|woff2?)$ { expires 30d; add_header Cache-Control "public"; }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
