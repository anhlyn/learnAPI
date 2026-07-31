pipeline{
    agent any
    stages{
        stage('stage 01'){
            steps{
                sh 'echo "This is STAGE 01"'
            }
        }
        stage('Parallel Stage'){
            parallel{
                stage('stage 02'){
                    steps{
                        sh 'echo "This is STAGE 02"'
                    }
                }
                stage('stage 03'){
                    steps{
                        sh 'echo "This is STAGE 03"'
                    }
                }
            }
        }
        stage('Deployment Stage'){
            steps{
                sh 'echo "Deployment stage here"'
            }
        }
    }
}