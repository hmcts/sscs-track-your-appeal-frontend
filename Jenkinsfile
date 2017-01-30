
node {
    env.BRANCH_NAME = get_branch_name(env)
    env.https_proxy="http://172.16.200.254:3128/"
    env.http_proxy="http://172.16.200.254:3128/"
    env.npm_config_tmp="${pwd()}/.tmp"
    env.APP_NAME = 'track-your-appeal-frontend'
    env.LIMIT = 'sscs_web_nodejs'
    env.EXTRA_VARS = "nodejs_app_name=${env.APP_NAME} sscs_track_your_appeal_frontend_branch=${env.BRANCH_NAME} ${env.ENV_VARS?:''}"

    stage "Checkout"
    git url: 'git@10.196.60.5:SSCS/track-your-appeal-frontend.git', branch: env.BRANCH_NAME

    stage "Install dependencies"
    sh "npm install"
    sh "npm run setup"

    stage "Run unit tests"
    sh "npm test"

    stage "Run accessibility tests"
    env.JUNIT_REPORT_PATH = "test-reports.xml"
        try {
            sh '''
              npm install mocha-jenkins-reporter
              npm run pa11y -- --reporter mocha-jenkins-reporter --reporter-options junit_report_packages=true
            '''
        } finally {
            step([$class: 'JUnitResultArchiver', testResults: env.JUNIT_REPORT_PATH])
        }

    stage "Deploy"
    deploy(env, env.BRANCH_NAME)

    stage "Run smoke tests"
    build job: 'sscs-track-your-appeal-frontend-smoketests'

    stage "Deploy master"
    deploy(env, 'master')
}

def get_branch_name(env) {
    if (env.BRANCH_NAME != null) {
        println('Found branch name from env.BRANCH_NAME')
        env.BRANCH_NAME
    } else if (env.gitlabTargetBranch != null) {
        println('Found branch name from env.gitlabTargetBranch')
        env.gitlabTargetBranch
    } else if (BRANCH != '') {
        println('Found branch name from parameter BRANCH')
        BRANCH
    } else {
        sh 'env | sort'
        error 'Could not determine branch name'
    }
}

def deploy(env, branch_name) {
    def deploy_result = build job: 'sscs-track-your-appeal-deploy', parameters: [
        [$class: 'StringParameterValue', name: 'APP_NAME', value: env.APP_NAME],
        [$class: 'StringParameterValue', name: 'BRANCH_NAME', value: branch_name],
        [$class: 'StringParameterValue', name: 'LIMIT', value: env.LIMIT],
        [$class: 'StringParameterValue', name: 'EXTRA_VARS', value: env.EXTRA_VARS],
    ]
    if (deploy_result.result == 'UNSTABLE') {
        currentBuild.result = 'UNSTABLE'
        error "Could not deploy the branch. See the deploy job for who has the lock"
    }
}
