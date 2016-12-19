
node {
    env.BRANCH_NAME = get_branch_name(env)
    env.https_proxy="http://172.16.200.254:3128/"
    env.http_proxy="http://172.16.200.254:3128/"
    env.npm_config_tmp="${pwd()}/.tmp"

    stage "Checkout"
    git url: 'git@10.196.60.5:SSCS/track-your-appeal-frontend.git', branch: env.BRANCH_NAME

    stage "Install dependencies"
    sh "npm install"
    sh "npm run generate-assets"

    stage "Run unit tests"
    sh "npm test"

    stage "Run accessibility tests"
    sh "npm run pa11y"

    stage "Deploy"
    def deploy_result = build job: 'sscs-track-your-appeal-deploy', parameters: [
        [$class: 'StringParameterValue', name: 'APP_NAME', value: 'track-your-appeal-frontend'],
        [$class: 'StringParameterValue', name: 'BRANCH_NAME', value: env.BRANCH_NAME],
        [$class: 'StringParameterValue', name: 'LIMIT', value: 'sscs_web_nodejs'],
        [$class: 'StringParameterValue', name: 'EXTRA_VARS', value: "sscs_track_your_appeal_frontend_branch=${env.BRANCH_NAME}"],
    ]
    if (deploy_result.result == 'UNSTABLE') {
        println('Could not deploy the branch. See the deploy job for who has the lock')
        currentBuild.result = 'UNSTABLE'
        return
    }

    stage "Run smoke tests"
    build job: 'sscs-track-your-appeal-frontend-smoketests'
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
