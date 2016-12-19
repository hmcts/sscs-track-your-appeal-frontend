node("Slave1") {
    env.https_proxy = "http://172.16.200.254:3128/"
    env.http_proxy = "http://172.16.200.254:3128/"
    env.E2E_FRONTEND_URL = "http://www.sscs.sandbox.reform.ukc.hmcts.net/prototype-6"
    env.E2E_OUTPUT_DIR = "${env.JENKINS_HOME}/testResults/"
    env.npm_config_tmp = "${pwd()}/.tmp"

    stage "Run smoke tests"
    ws('workspace/track-your-appeal/smoke-tests') {
        git url: 'git@10.196.60.5:SSCS/track-your-appeal-frontend.git', branch: "$BRANCH"
        echo "Running Smoke Tests using Codeceptjs"
        wrap([$class: 'Xvfb']) {
            sh '''
                npm install
                npm run smoke-test -- --reporter mochawesome
            '''
        }
    }

    publishHTML(target: [
        alwaysLinkToLastBuild: true,
        reportDir            : "${env.JENKINS_HOME}/testResults/",
        reportFiles          : "mochawesome.html",
        reportName           : "Functional Test Report"
    ])

    ws('workspace/track-your-appeal/smoke-tests') {
        deleteDir()
    }
}
