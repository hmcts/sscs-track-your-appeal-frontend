.PHONY: build npmtest

build: dockerbuild npmtest

dockerbuild:
	docker build -t track-your-appeal-frontend .

npmtest:
	docker run -t track-your-appeal-frontend npm test
