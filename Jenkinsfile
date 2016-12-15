 node {
     env.https_proxy="http://172.16.200.254:3128/"
     env.http_proxy="http://172.16.200.254:3128/"
     env.npm_config_tmp="${pwd()}/.tmp"

     stage "Checkout"
     git url: 'git@10.196.60.5:SSCS/track-your-appeal-frontend.git', branch: "$BRANCH"

     stage "Install dependencies"
     sh "npm install"

     stage "Run unit tests"
     sh "npm test"

     stage "Run accessibility tests"
     sh "npm run pa11y"

     stage "Deploy"
     build job: 'testing-always-pass'

     stage "Run smoke tests"
     build job: 'testsscse2e'

 }
