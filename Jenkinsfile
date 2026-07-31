pipeline{
    stages{
        stage('Api Test'){
            agent{
                docker{
                    image 'mcr.microsoft.com/playwright:v1.50.0-focal'
                }
            }
            steps{
                sh 'npx playwright test'
            }
        }
    }
}