# lint-frontend:
# 	make -C frontend lint

install:
	npm ci && cd ./frontend && npm ci

deploy:
	npm ci && cd ./frontend && npm run build:deploy

# build:
# 	npm run build

# startDev:
# 	make start-backend & make start-frontend

# start-frontend:
# 	make -C frontend start 

# start-backend:
# 	npx start-server 

startDev:
	make start-backend & make start-frontend

build:
	npm run build

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	npx start-server -s ./frontend/build 