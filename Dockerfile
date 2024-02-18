# Usa la imagen oficial de Apache
FROM httpd:latest

# Copia los archivos de la aplicación web al directorio de documentos de Apache
COPY ./dist/ /usr/local/apache2/htdocs/
