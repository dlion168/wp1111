FROM node:16-alpine

EXPOSE 4000
EXPOSE 3000

COPY . /app
WORKDIR /app

RUN corepack enable
RUN yarn install:prod
RUN yarn build

CMD ["yarn", "deploy"]
CMD ["yarn", ""]