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
                sh '''
                    npm ci
                    npx playwright test test-api
                '''
            }
            post{
                always{
                    publishHTML(target:[
                        reportName: 'Report - API Testing',
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html'
                    ])
                }
            }
        }
        stage('E2E Test'){
            agent{
                docker{
                    image 'mcr.microsoft.com/playwright:v1.62.0-noble'
                    reuseNode true
                }
            }
            steps{
                sh '''
                    npx playwright test test-e2e
                '''
            }
            post{
                always{
                    publishHTML(target:[
                        reportName: 'Report - E2E Testing',
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html'
                    ])
                }
            }
        }
    }
}