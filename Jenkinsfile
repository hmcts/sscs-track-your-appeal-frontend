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
        sh "make unittest"
    }
}

stage("Security checks") {
    node {
        sh "make securitychecks"
    }
}

stage("Pa11y tests") {
    node {
        withEnv(["JUNIT_REPORT_PATH='test-reports.xml'"]) {
            try {
                sh '''
                    npm install mocha-jenkins-reporter
                    npm run pa11y -- --reporter mocha-jenkins-reporter --reporter-options junit_report_packages=true
                '''
            } finally {
                step([$class: 'JUnitResultArchiver', testResults: env.JUNIT_REPORT_PATH])
            }
        }
    }
}
