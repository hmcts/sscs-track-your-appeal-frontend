.PHONY: build dockerbuild installdependencies unittest accessibilitytest

build: install unittest accessibilitytest

install:
	npm install
	npm run setup

unittest:
	npm test

accessibilitytest:
	npm run pa11y

