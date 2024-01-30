lint-frontend:
	make -C frontend lint

install:
	npm ci && cd ./frontend && npm ci

start-frontend:
	make -C frontend start 

start-backend:
	npx start-server 

start:
	npx start-server
	# make start-backend  & make start-frontend

# deploy:
#     npm ci && cd ./frontend && npm ci && npm run build:deploy

build:
    cd ./frontend &&  npm run build:deploy