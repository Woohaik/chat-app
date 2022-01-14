# Chat app

El proyecto cliente fue generado apartir de una plantilla que agrega el service worker y manifest al hacer el build.


## Instalación

El cliente y servidor estan en carpetas separadas y ambos deben instalar sus dependencias y construir para su ejecucion.

Cliente: ./client
Servidor: ./server

Empezando por el servidor: ./server

cd ./server

npm install

npm run dev

Ahora regresar al cliente: ./client abriendo otra terminal para dejar corriendo el proceso del server

cd ..

npm install

npm run build

npm run serve

Se mostrara el puerto en el que esta corriendo la aplicación

Poner en el navegador la direccion: localhost:${PUERTO}

