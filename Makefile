.PHONY: build install test-unit test-security test-accessibility test-end-to-end

# TODO: Remove when all uses are updated
.PHONY: unittest securitychecks accessibilitytest

build: install unittest accessibilitytest

install:
	npm install
	npm run setup

test-unit:
	npm test

test-coverage:
	npm run coverage

test-security:
	npm run security-checks

test-accessibility:
ifdef JUNIT_REPORT_PATH
	npm install mocha-jenkins-reporter
	npm run pa11y -- --reporter mocha-jenkins-reporter --reporter-options junit_report_packages=true
else
	npm run pa11y
endif

test-end-to-end:
ifdef E2E_OUTPUT_DIR
	npm run smoke-test -- --reporter mochawesome
else
	npm run smoke-test
endif

unittest: test-unit

securitychecks: test-security

accessibilitytest: test-accessibility

testcoverage: test-coverage
