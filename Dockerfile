FROM node:18.18-alpine3.18 AS builder
ADD . /app
RUN apk add bash
RUN apk add --no-cache \
        python3 \
        py3-pip \
    && pip3 install --upgrade pip \
    && pip3 install \
        awscli \
    && rm -rf /var/cache/apk/*
RUN apk add --update alpine-sdk
RUN apk add chromium \
    harfbuzz
WORKDIR /app
COPY package*.json /app/
RUN npm install -g typescript
RUN npm install
COPY src ./src
COPY tsconfig.json ./
RUN npx prisma generate
RUN npm run build

##

FROM node:18.18-alpine3.18
RUN apk add bash
RUN apk add --no-cache \
        python3 \
        py3-pip \
    && pip3 install --upgrade pip \
    && pip3 install \
        awscli \
    && rm -rf /var/cache/apk/*
RUN apk add --update alpine-sdk
RUN apk add chromium \
    harfbuzz
RUN apk update
RUN apk upgrade
ADD . /app
WORKDIR /app

COPY package*.json /app/
RUN npm install pm2 -g
RUN npm install
COPY --from=builder ./app/dist/ .

RUN chmod +x /app/entrypoint.sh
EXPOSE 50051
CMD ["npx", "prisma", "db", "push"]
ENTRYPOINT ["/bin/bash", "-c", "/app/entrypoint.sh"]

