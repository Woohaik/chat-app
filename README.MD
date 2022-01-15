# Chat app - Supra-Chat

El proyecto cliente fue generado a partir de una [plantilla](https://create-react-app.dev/docs/custom-templates/) que agrega el service worker y manifest al hacer el build. [(Plantilla Utilizada)](https://create-react-app.dev/docs/making-a-progressive-web-app/)
#
### Requerimientos:

* Node 14+
* Npm 


## Instalación

El cliente y servidor están en carpetas separadas y ambos deben instalar sus dependencias y construir para su ejecución.



**Cliente:** ```./client```

**Servidor:** ```./server```

Empezando por el servidor: ```./server```: 
- 
*El Servidor debe de estar ene ejecución para el funcionamiento del cliente*

### 1- Instalar y Ejecutar Servidor

- Desde La carpeta root del proyecto acceder al servidor.

```bash
cd ./server
```
- Instalar dependencias y Ejecutar el servidor- 
*El Servidor Utiliza el Puerto 4000*

```bash
npm install
npm run dev
```

### 2- Instalar y Ejecutar Cliente

- Abriendo otra terminal para dejar corriendo el proceso del servidor
- Ahora regresar al cliente al root y entrar al cliente: ```./client```

```bash
cd ../client
```
- Instalar Dependencias

```bash
npm install
```
- Construir proyecto

```bash
npm run build
```

- Servir Contenido Estatico en el navegador

```bash
npm run serve
```

Se mostrara el puerto en el que esta corriendo la aplicación.

![served](https://user-images.githubusercontent.com/74992119/149621486-6e900c17-29af-4a64-837d-a35660646a03.png)


Acceder en el navegador la direccion: ```localhost:${PUERTO}```.

