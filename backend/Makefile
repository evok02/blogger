.DEFAULT_GOAL := run

.PHONY: run build test fmt vet

fmt:
	@go fmt ./...

vet: fmt
	@go vet ./...

build: vet
	@go build -o ./bin/api .

run: build
	@./bin/api

test: vet
	@go test -v ./... 
