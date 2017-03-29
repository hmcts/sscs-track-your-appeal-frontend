.PHONY: build install test-unit test-security test-accessibility test-end-to-end

# TODO: Remove when all uses are updated
.PHONY: unittest securitychecks accessibilitytest

build: install unittest accessibilitytest

install:
	yarn install
	yarn run setup

test-unit:
	yarn test

test-coverage:
	yarn run coverage

test-security:
	yarn run security-checks

test-accessibility:
ifdef JUNIT_REPORT_PATH
	yarn add mocha-jenkins-reporter
	yarn run pa11y -- --reporter mocha-jenkins-reporter --reporter-options junit_report_packages=true
else
	yarn run pa11y
endif

test-end-to-end:
ifdef E2E_OUTPUT_DIR
	yarn run smoke-test -- --reporter mochawesome
else
	yarn run smoke-test
endif

unittest: test-unit

securitychecks: test-security

accessibilitytest: test-accessibility

testcoverage: test-coverage
