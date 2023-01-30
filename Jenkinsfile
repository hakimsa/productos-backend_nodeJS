pipeline {
  agent any
  stages {
    stage('Clear packages') {
      steps {
        sh 'echo Clearing packages en process'
        sh' ls -l'
        sh 'jq '.dependencies[].bcrypt="^5.0.1"' package.json'
      }
      
    }

  }
}
