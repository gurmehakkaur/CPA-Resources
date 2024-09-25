pipeline {
    agent any

    stages {
        stage('Build Client') {
            steps {
                // Navigate to the client directory and build the app
                dir('client') {
                    sh 'npm install' // Install dependencies if needed
                    sh 'npm run build'
                }
            }
        }

        stage('Start Server') {
            steps {
                // Start the Node.js server
                sh 'node server.js'
            }
        }
    }

    post {
        success {
            echo 'Application built and server started successfully!'
        }
        failure {
            echo 'Build or server start failed!'
        }
    }
}
