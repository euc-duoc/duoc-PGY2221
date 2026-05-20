# Proyecto inicial de ejemplo

Este proyecto parte desde la experiencia de aprendizaje 1 y avanza progresivamente según las temáticas abordadas.

Para trabajar con la herramienta que se ve en el curso ([Ionic framework](https://ionicframework.com/)), es necesario:

1. Tener instalado [Node.js](https://nodejs.org/).
2. Comprobar la instalación anterior ejecutando en consola de comandos:
```bash
node -v
```
Debe mostrar la versión respectiva instalada.

3. Instalar Ionic a través de:
```bash
npm i -g @ionic/cli
```

4. Comprobar la instalación anterior a través de:
```bash
ionic
```
En donde debe aparecer el menú principal de configuración de proyectos de Ionic:

```bash
  (_) ___  _ __ (_) ___
  | |/ _ \| '_ \| |/ __|
  | | (_) | | | | | (__
  |_|\___/|_| |_|_|\___| CLI 7.2.1


  Usage:

    $ ionic <command> [<args>] [--help] [--verbose] [--quiet] [--no-interactive] [--no-color] [--confirm] [options]

  Global Commands:

    completion ...................... (experimental) Enables tab-completion for Ionic CLI commands.
    config <subcommand> ............. Manage CLI and project config values (subcommands: get, set, unset)
    info ............................ Print project, system, and environment information
    init ............................ (beta) Initialize existing projects with Ionic
    live-update <subcommand> ........ (paid) Ionic Live Updates functionality (subcommands: manifest)
    login ........................... Log in to Ionic
    logout .......................... Log out of Ionic
    signup .......................... Create an Ionic account
    ssh <subcommand> ................ (deprecated) Commands for configuring SSH keys (subcommands: add, delete,
                                      generate, list, setup, use)
    start ........................... Create a new project

  Project Commands:

    You are not in a project directory.
```

## App móvil base (commit inicial "Repositorio base")

Para inicializar un proyecto básico en Ionic, seguir los siguientes pasos:

1. Crear el proyecto con un nombre específico (en este caso, usaremos el nombre `ejemplo`):
```bash
ionic start ejemplo
```
**Nota**: esto creará una carpeta `ejemplo` en la carpeta en donde actualmente se esté ejecutando el comando, y generará los archivos del proyecto en dicha carpeta.

2. Lo anterior mostrará un wizard paso a paso para ir construyendo el ejemplo. Algunas opciones importantes son:
```bash
? Framework: Angular
```

```bash
? Starter template: blank
```

```bash
? Would you like to build your app with Standalone Components or NgModules?
 Standalone components are the default way to build with Angular that simplifies the way you build your app.
 To learn more, visit the Angular docs:
 https://angular.dev/guide/components

 NgModules
```

`NgModules` es el sistema de gestión de paquetes que usaremos en el curso para los ejemplos.

Con todo lo anterior, el wizard estará instalando una serie de artefactos hasta que mostrará lo siguiente:

```bash
Your Ionic app is ready! 
```

Con eso ya tenemos una app móvil básica funcionando en la carpeta `ejemplo`. Para ejecutarla, simplemente coloca en la consola:

```bash
ionic serve
```

Lo cual inicializará la app. y abrirá en tu navegador la url http://localhost:8100/home.

Para visualizarla como dispositivo móvil (ej.: smartphone), es recomendado activar el modo responsivo de las Herramientas de desarrollador que tenga tu navegador de preferencia. Algunas referencias:

* [Para Firefox](https://www-browserstack-com.translate.goog/guide/enable-responsive-design-mode-in-safari-and-firefox?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc).
* [Para Chrome](https://developer.chrome.com/docs/devtools/device-mode).

## Creando páginas para la app (Commit E01)

Procedemos a crear una página "Login" para nuestra nueva app. Para eso:

1. Posicionarse con la consola de comandos en la carpeta del proyecto

```bash
cd ejemplo
```
2. Ejecutar la creación de componentes para Ionic
```bash
ionic generate
```
3. Lo anterior mostrará diversas opciones para crear componentes en la app. Elegir la opción `page`:
```bash
? What would you like to generate? page
```

4. Seleccionar un nombre para la nueva página. Usar formato [CamelCase](https://es.wikipedia.org/wiki/Camel_case):
```bash
? Name/path of page: Login
```

Lo anterior ejecutará comandos que crearán la nueva página en el proyecto, terminando así:
```bash
[OK] Generated page!
```

5. Configurar la nueva página para que sea compatible con `NgModules`. Para eso, ir a la [carpeta login de la nueva página](/src/app/login/) y editar el archivo [login.page.ts](/src/app/login/login.page.ts), incorporando lo siguiente:

```javascript
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false // <- Agregar esta línea!
})
```

6. Ejecutar la app con ```ionic serve``` y revisar en tu navegador la página en http://localhost:8100/login. Con esto aparecerá una nueva página de tu app con encabezado "Login".

7. Puedes probar modificaciones en tu nueva página modificando el archivo [login.page.html](/src/app/login/login.page.html). Por ejemplo, puedes modificar la cabecera por defecto de la siguiente forma:

```html
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>Mi página de Login!</ion-title> <!-- Puedes modificar esta línea -->
  </ion-toolbar>
</ion-header>
```

Si tenías abierta la app en el terminal, puedes comprobar en http://localhost:8100/login que los cambios se reflejan automáticamente.