#!groovy

properties(
  [[$class: 'GithubProjectProperty', displayName: 'track your appeal frontend', projectUrlStr: 'http://git.reform.hmcts.net/sscs/track-your-appeal-frontend/'],
   pipelineTriggers([
     [$class: 'hudson.triggers.TimerTrigger', spec  : 'H 1 * * *']
   ])]
)

@Library('Reform')
import uk.gov.hmcts.Ansible
import uk.gov.hmcts.Packager
import uk.gov.hmcts.RPMTagger

def packager = new Packager(this, 'sscs')
def ansible = new Ansible(this, 'sscs')

def channel = '#sscs-tech'

timestamps {
    milestone()
    lock(resource: "track-your-appeal-frontend-${env.BRANCH_NAME}", inversePrecedence: true) {
        node {
            try {
                def trackYourAppealFrontendRPMVersion
                def version
                def ansibleCommitId

                _env_vars = []

                stage("Checkout") {
                    deleteDir()
                    checkout scm
                }

                stage("Install") {
                    sh 'make install'
                }

                stage("Security") {
                    sh 'make test-security'
                }

                stage("Unit test") {
                    sh 'make test-unit'
                }

                stage("Sonarscan") {
                    sh 'make sonarscan'
                }

                stage("Code coverage") {
                    sh 'make test-coverage'
                    publishHTML([
                            allowMissing         : false,
                            alwaysLinkToLastBuild: true,
                            keepAll              : true,
                            reportDir            : 'test/coverage/html/lcov-report',
                            reportFiles          : 'index.html',
                            reportName           : 'HTML Report'
                    ])
                }

                stage("a11y test") {
                    withEnv(["JUNIT_REPORT_PATH='test-reports.xml'"]) {
                        try {
                            sh 'make test-accessibility'
                        } finally {
                            step([$class: 'JUnitResultArchiver', testResults: env.JUNIT_REPORT_PATH])
                        }
                    }
                }

                stage('Package application (RPM)') {
                        trackYourAppealFrontendRPMVersion = packager.nodeRPM('track-your-appeal-frontend')
                        version = "{track_your_appeal_frontend_version: ${trackYourAppealFrontendRPMVersion}}"
                    onMaster {
                        packager.publishNodeRPM('track-your-appeal-frontend')
                    }
                }

                //noinspection GroovyVariableNotAssigned It is guaranteed to be assigned
                RPMTagger rpmTagger = new RPMTagger(this,
                'track-your-appeal-frontend',
                packager.rpmName('track-your-appeal-frontend', trackYourAppealFrontendRPMVersion),
                'sscs-local'
                )

                onMaster {
                  milestone()
                  lock(resource: "sscs-frontend-dev-deploy", inversePrecedence: true) {
                    stage('Deploy to DEV') {
                      ansibleCommitId = ansible.runDeployPlaybook(version, 'dev')
                      rpmTagger.tagDeploymentSuccessfulOn('dev')
                      rpmTagger.tagAnsibleCommit(ansibleCommitId)
                    }
                    stage('Smoke Test (Dev)') {
                      ws('workspace/sscsHealthCheck/build') {
                        git url: 'git@git.reform.hmcts.net:sscs/track-your-appeal-frontend.git'
                        env.SSCS_TYA_FRONTEND_URL = "https://www-" + 'dev' + ".sscs.reform.hmcts.net/"
                        env.SSCS_TYA_BACKEND_URL="https://track-your-appeal-api-dev.sscs.reform.hmcts.net:4204/"
                        sh 'make install'
                        sh 'make health-check'
                        deleteDir()
                      }
                    }
                  }
                  milestone()
                }

            } catch (Throwable err) {
                notifyBuildFailure channel: channel
                throw err
            }
        }
    }
    notifyBuildFixed channel: channel
}

def api_url() {
  return "https://track-your-appeal-api-dev.sscs.reform.hmcts.net:4204"
}
