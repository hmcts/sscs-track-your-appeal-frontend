.PHONY: build dockerbuild installdependencies unittest accessibilitytest

build: install unittest accessibilitytest

install:
	npm install
	npm run setup

unittest:
	npm test

securitychecks:
	npm run security-checks

accessibilitytest:
	npm run pa11y

