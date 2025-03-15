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
# RUN npm install dotenv
COPY src ./src
COPY tsconfig.json ./
RUN npx prisma generate
RUN npm run build

##RUN npm run build

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
# RUN npm install dotenv
COPY --from=builder ./app/dist/ .

RUN chmod +x /app/entrypoint.sh
EXPOSE 50051
CMD ["npx", "prisma", "db", "push"]
ENTRYPOINT ["/bin/bash", "-c", "/app/entrypoint.sh"]

# FROM node:18.18-alpine3.18

# EXPOSE 50051

# ADD . /app

# WORKDIR /app

# RUN apk add bash

# RUN apk update

# RUN apk upgrade

# COPY package*.json /app/

# COPY tsconfig.json /app/

# COPY src ./src/

# RUN npm install

# RUN npx prisma generate

# COPY . .

# RUN npm run build

# RUN npm install pm2 -g

# RUN chmod +x /app/entrypoint.sh

# CMD ["npx", "prisma", "db", "push"]

# ENTRYPOINT ["/bin/bash", "-c", "/app/entrypoint.sh"]
# # CMD ["npm", "run", "start:migrate"]