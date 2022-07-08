FROM kthse/kth-nodejs:16.0.0

RUN mkdir mkdir -p /application

WORKDIR /application
ENV NODE_PATH /application

ENV TZ Europe/Stockholm

COPY ["package.json", "package.json"]
COPY ["package-lock.json", "package-lock.json"]

COPY ["config", "config"]
COPY ["i18n", "i18n"]
COPY ["public", "public"]
COPY ["server", "server"]

COPY ["app.js", "app.js"]
COPY ["build.sh", "build.sh"]
COPY ["webpack.config.js", "webpack.config.js"]

RUN chmod a+rx build.sh && \
    chown -R node:node /application

USER node

RUN npm pkg delete scripts.prepare && \
    npm ci --unsafe-perm && \
    npm run build && \
    npm prune --production 

EXPOSE 3000

CMD ["npm", "start"]