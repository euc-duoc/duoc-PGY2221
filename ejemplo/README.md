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