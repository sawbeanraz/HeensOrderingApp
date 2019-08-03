# Build the React application
FROM node:10.10 AS app_builder
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY ./packages/app/package.json .
RUN yarn install
COPY ./packages/app/ .
RUN yarn build

# Node application
FROM node:10.10
RUN mkdir -p /usr/HeenOrderingApp
WORKDIR /usr/HeensOrderingApp
COPY ./packages/api/package.json .
RUN yarn install

COPY ./packages/api/ .

COPY --from=app_builder /usr/app/build ./public

RUN npm link

# EXPOSE 5000
CMD yarn start

