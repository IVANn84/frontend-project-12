lint-frontend:
	make -C frontend lint

install:
	npm ci && cd ./frontend && npm ci

start-frontend:
	make -C frontend start 

start-backend:
	npx start-server 

# start:
# 	npx start-server
start:
	make start-backend  & make start-frontend

deploy:
  cd ./frontend && npm run build:deploy

build:
	npm run build
