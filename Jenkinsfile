pipeline {
  agent any
  stages {
    stage('Clear packages') {
      steps {
        sh 'echo Clearing packages en process'
        sh' ls -l'
        sh 'jq '.dependencies.bcrypt="^5.0.1"' /var/jenkins_home/workspace/productos-backend_nodeJS_master/package.json'
      }
      
    }

  }
}
