.PHONY: build install test-unit test-security test-accessibility test-end-to-end

# TODO: Remove when all uses are updated
.PHONY: unittest securitychecks accessibilitytest

build: install test-unit test-accessibility

install:
	yarn install

test-unit:
	yarn test

test-coverage:
	yarn coverage

test-accessibility:
	yarn pa11y
endif

test-end-to-end:
ifdef E2E_OUTPUT_DIR
	yarn smoke-test -- --reporter mochawesome
else
	yarn smoke-test
endif

sonarscan:
	yarn sonar-scan

zapscan:
	yarn security-scan
