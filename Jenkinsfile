pipeline{
    agent any
    stages{
        stage('Api Test'){
            agent{
                docker{
                    image 'mcr.microsoft.com/playwright:v1.62.0-noble'
                }
            }
            steps{
                sh 'npx playwright test'
            }
        }
    }
}