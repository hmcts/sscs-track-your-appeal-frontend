#!groovy

stage("Checkout") {
    node {
        checkout scm
    }
}

stage("Install dependencies") {
    node {
        sh "make install"
    }
}

stage("Unit tests") {
    node {
        sh "make test-unit"
    }
}

stage("Security checks") {
    node {
        sh "make test-security"
    }
}

stage("Pa11y tests") {
    node {
        withEnv(["JUNIT_REPORT_PATH='test-reports.xml'"]) {
            try {
                sh "make test-accessibility"
            } finally {
                step([$class: 'JUnitResultArchiver', testResults: env.JUNIT_REPORT_PATH])
            }
        }
    }
}
