# LatinoGangJS

Aplicación de block-based coding que con base en bloques que utilizan la sintaxis del lenguaje de programación [Latino](https://www.lenguajelatino.org/) permite crear estructuras que serán traducidas a código en JavaScript, esto con la intención de apoyar al aprendizaje de las instrucciones básicas de JS para personas principalmente hispanohablantes.

---

## Requerimientos

### Para ejecución

- Tener instalado docker y el plugin de docker compose.

### Para desarrollo

- [Node.js](https://nodejs.org/en/) de la versión 18.20 en adelante.

- > Pendiente de definir requerimientos del backend

---

## Instalación del proyecto


Clonar el repositorio del proyecto ingresando en una terminal el comando:

```sh
git clone {link del proyecto}
```

### Para ejecución

1. Iniciar el contenedor con el comando:

    ```sh
    docker compose up -d
    ```
2. Dentro del navegador, ingresar la siguiente url para poder ver el proyecto: http://localhost:5001/

### Para desarrollo


Para el desarrollo, será necesario cambiar la rama activa con el comando: 

```sh
git checkout develop
```

#### Front End

1. Ingresar a la carpeta del front end.
    
    > Para sistemas basados en Unix:

    ```sh
    cd LatinoGangJS_FE
    ```

    > Para Windows:

    ```sh
    cd ./LatinoGangJS_FE
    ```

2. Instalar las librerías con el comando: 

    ```sh
    npm i
    ```

    > Nota: en caso de presentarse inconvenientes al momento de instalar las librerías, se recomienda intentarlo con la [versión 18 de Node.js](https://nodejs.org/en/blog/release/v18.20.3).

3. Por último para iniciar el servidor de desarrollo, ejecutar:

    ```sh
    npm run dev
    ```

4. Dentro del navegador, ingresar la siguiente url para poder ver el proyecto: http://localhost:5173/

---

### Consideraciones

1. Para el correcto funcionamiento de la aplicación, el puerto 5001 no puede estar ocupado.
