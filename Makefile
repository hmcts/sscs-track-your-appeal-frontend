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

test-security:
	yarn security-checks

test-accessibility:
ifdef JUNIT_REPORT_PATH
	yarn pa11y -- --reporter mocha-jenkins-reporter --reporter-options junit_report_packages=true
else
	yarn pa11y
endif

test-end-to-end:
ifdef E2E_OUTPUT_DIR
	yarn smoke-test -- --reporter mochawesome
else
	yarn smoke-test
endif

