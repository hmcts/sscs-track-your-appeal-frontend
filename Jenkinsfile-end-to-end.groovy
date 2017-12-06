node("Slave1") {
    env.https_proxy = ""
    env.http_proxy = ""
    env.E2E_FRONTEND_URL = "http://www.sscs.sandbox.reform.ukc.hmcts.net"
    env.EMAIL_MAC_SECRET_TEXT=""
    env.API_BASE_URL ="http://sscs-track-your-appeal-api.internal"
    env.E2E_OUTPUT_DIR = "${env.JENKINS_HOME}/testResults/"
    env.npm_config_tmp = "${pwd()}/.tmp"

    stage("Run smoke tests") {
        ws('workspace/track-your-appeal/smoke-tests') {
            git url: 'https://github.com/hmcts/track-your-appeal-frontend.git', branch: "$BRANCH"
            echo "Running Smoke Tests using Codeceptjs"
            wrap([$class: 'Xvfb']) {
                sh "make test-end-to-end"
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
}
