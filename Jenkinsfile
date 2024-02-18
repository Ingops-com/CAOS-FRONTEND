pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'frontend-caos-old'
        CONTAINER_NAME = 'frontend-old'
        LOCAL_PORT = '5778'
        WEB_PORT = '80'
    }

    tools {
        nodejs "NodeJS 20.5.0"
    }

    stages {
        stage('Intall Dependencies Frontend') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'echo "Ruta del repositorio: $(pwd)"'
                    sh 'docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Detener y eliminar el contenedor anterior si existe
                    sh 'docker stop ${CONTAINER_NAME} || true'
                    sh 'docker rm ${CONTAINER_NAME} || true'

                    // Desplegar la aplicación en la máquina Docker con un nombre específico
                    sh 'docker run -d -p ${LOCAL_PORT}:${WEB_PORT} --name ${CONTAINER_NAME} --restart=always ${DOCKER_IMAGE}:${BUILD_NUMBER}'

                    // Limpieza: eliminar imágenes antiguas
                    sh 'docker image prune -f'
                }
            }
        }

    }
    
}
