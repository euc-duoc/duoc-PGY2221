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

## Creando una navegación simple (Commit E02)

Generaremos una navegación simple entre la [página de login](/ejemplo/src/app/login/login.page.html) y la [página principal](/ejemplo/src/app/home/home.page.html).

### Paso 1: Implementar un formulario simple de login

Para esto, podemos utilizar distintos componentes visuales en la página de login, que en estos momentos está vacía. Como referencia, podemos sacar muchos ejemplos y referencias de componentes en la [web oficial de componentes de Ionic](https://ionicframework.com/docs/components).

1. Creamos un formulario simple usando [listas](https://ionicframework.com/docs/api/list), [items](https://ionicframework.com/docs/api/item), [inputs](https://ionicframework.com/docs/api/input) y [botones](https://ionicframework.com/docs/api/button) en [login.page.html](/ejemplo/src/app/login/login.page.html):

```html
<div id="container">
  <ion-list>
    <ion-item>
      <ion-input 
        labelPlacement="fixed" 
        label="Usuario" 
        placeholder="Ingresar nombre de usuario"
        [(ngModel)]="user.usuario"
      ></ion-input>
    </ion-item>

    <ion-item>
      <ion-input 
        labelPlacement="fixed" 
        type="password" 
        label="Contraseña" 
        placeholder="Ingresar contraseña"
        [(ngModel)]="user.password"
      ></ion-input>
    </ion-item>
  </ion-list>

  <div style="text-align: right;">
    <ion-button 
      slot="end"
      (click)="ingresar()"
    >
      Ingresar
    </ion-button>
  </div>
</div>
```

Acá es importante notar dos cosas:

* Este formulario define un "*modelo*", o dicho de otra forma, un mecanismo de captura de datos a través del formulario. En este caso, tanto el nombre de usuario como la contraseña se capturan en un objeto `user` con las propiedades `[(ngModel)]="user.usuario"` y `[(ngModel)]="user.password"`.

* Se configura el botón del formulario para que ejecute la función `ingresar` cuando se presione, a través de la propiedad `(click)="ingresar()`.

2. Para dar funcionalidad a los elementos descritos antesEstos elementos se conectan con definiciones en la *lógica* de la página, esto es, el archivo [login.page.ts](/ejemplo/src/app/login/login.page.ts):

```typescript
// Imports relevantes
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

// ...

export class LoginPage implements OnInit {
  // Definimos en la clase de la página un objeto 'user', el mismo que capturará los datos en el formulario
  user = {
    usuario: "",
    password: ""
  };

  // Importamos en componente 'Router' a través del constructor
  constructor(private router: Router) {}

  // ...

  // Generamos el método ingresar, el cual se ejecuta al apretar el botón
  ingresar() {
    // 'NavigationExtras' es un componente que me permite traspasar datos entre páginas mediante el atributo 'state'
    let navigationExtras: NavigationExtras = {
      state: {
        // En este caso, se guardan los datos del usuario en el estado
        user: this.user
      }
    };

    // Esto permite navegar a la página principal, pasando los datos capturados
    this.router.navigate(["/home"], navigationExtras);
  }
}
```

### Paso 2: Recibir y utilizar los datos en la página principal

AHora es necesario verificar y utilizar los datos de usuario traspasados desde [login.page.ts](/ejemplo/src/app/login/login.page.ts) hacia [home.page.ts](/ejemplo/src/app/home/home.page.ts):

1. Incorporamos la lógica necesaria en [home.page.ts](/ejemplo/src/app/home/home.page.ts):

```typescript
// Imports relevantes
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ...

export class HomePage {
  // Definimos un objeto 'data' para guardar los datos del usuario ingresado
  data: any;

  // Incorporamos desde el constructor componentes relevantes
  constructor(
    private activeRoute: ActivatedRoute, 
    private router: Router
  ) {
    // Inspeccionamos los datos eventualmente traspasados a través de 'NavigationExtras', guardándolos en el objeto 'data' si aplica
    this.activeRoute.queryParams.subscribe(params => {
      if(this.router.currentNavigation()?.extras.state) {
        this.data = this.router.currentNavigation()?.extras?.state?.['user'];
        console.log(this.data);
      }
      // En otro caso, si no se encuentran datos de login, se redirige automáticamente a dicha página
      else {
        this.router.navigate(["/login"]);
      }
    });
  }
}
```

2. Modificamos la vista en [home.page.html](/ejemplo/src/app/home/home.page.html) para mostrar algún dato del usuario, como prueba, en caso que los mismos hayan sido correctamente cargados:

```html
  <div id="container">
    Bienvenido/a {{data.usuario}}!!
  </div>
```

### Paso 3: Ajustar la ruta de ingreso por defecto

Para la ruta por defecto de nuestra app ("/"), nuestra app. está ingresando a [home.page.html](/ejemplo/src/app/home/home.page.html). Sin embargo, nos interesa que por defecto entre a [login.page.ts](/ejemplo/src/app/login/login.page.ts).

Para ajustar lo anterior, tenemos que hacer un pequeño cambio en [app-routing.module.ts](/ejemplo/src/app/app-routing.module.ts):

```typescript
  {
    path: '',
    redirectTo: 'login', // <-- acá se cambio por 'home'
    pathMatch: 'full'
  },
```