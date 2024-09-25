pipeline {
    agent any

    stages {
        stage('Clean') {
            steps {
                // Clean previous builds if necessary
                sh 'rm -rf client/build' // Adjust this path based on your project structure
            }
        }

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
                script {
                    // Start the Node.js server and capture output
                    def output = sh(script: 'node server.js', returnStatus: true)
                    if (output != 0) {
                        error "Server failed to start"
                    }
                }
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
        cleanup {
            // Clean up actions, if needed
            echo 'Cleaning up...'
        }
    }
}
