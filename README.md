# Welcome to FrontEnd Bootcamp 2020!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### New module with routing
> `ng generate module modules/backoffice --route backoffice --module app.module`

### New module without routing
> `ng generate module modules/api-rest --module app.module`

### Nuevo endpoint
> `ng g s modules/api-rest/services/users`

### Nuevo componente ruteado
> `ng g c modules/home/routes/institucion`


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Convenciones

El código en este proyecto sigue los estilos propuestos en [Angular coding style guide](https://angular.io/guide/styleguide).

En el archivo [.editorconfig](./.editorconf) se definen principalmente el estilo y tamaño de identación. Comprobar que el IDE esté utilizando esta configuración. Mas información en [EditorConfig](https://editorconfig.org/).

### Módulos

La aplicación está compuesta por distintos módulos que se pueden agrupar en módulos de infraestructura y del dominio.

Los módulos de infraestructura son utilizados por los del dominio para poder implementar la funcionalidad requerida por el usuario. Proveen acceso al API REST, componentes y funcionalidad de uso común. 

1. `api-rest`: permite acceder a los Endpoints que expone el API REST, incluso expone las interfaces en TypeScript de los tipos de datos de cada Endpoint, tanto para la Petición como para la Respuesta. Los servicios expuestos y sus métodos mantienen el mismo nombre que los Controllers en el backend para permitir una búsqueda rápida.
2. `material`: declara y permite acceder a los componentes de [Material](https://material.angular.io/). Para cada nuevo desarrollo 
de componentes visuales se debera evaluar resolver en primera instancia con lo ofrecido por *Material* antes de aplicar un desarrollo 
custom o inclusión de nuevas librerías. 
3. `presentation`: contiene los componentes visuales diseñados especificamente para este sistema.
4. `core`: contiene funcionalidad central y reutilizable, como por ejemplo Guards, Directivas, Servicios, etc.

El resto de los módulos corresponden al dominio, como por ejemplo camas, historia-clinica, pacientes, etc. 
La estructura de estos módulos está formada por una división en carpetas que debe seguir la siguiente definición:

1. `routes`: siempre requerido, corresponde a los componentes directamente relacionados con cada pagina de la aplicacion a la que le 
corresponde una ruta particular.
2. `components`: depende del reuso y/o modularización dentro del propio módulo, son utilizados por los componentes de *routes*.
3. `services`: Estaran presentes dependiendo si es requerido algun servicio propio del modulo.

##### Idioma 
El codigo debe estar por defecto escrito en idioma inglés, tener en cuenta principalmente nombres de clases, metodos y variables. Pueden 
existir excepciones en caso que algun nombre o denominacion este intrinsecamente relacionado con el dominio del sistema.
Todo texto que sera de visibilidad al cliente (principalmente los que se ubiquen en los archivos de extension html) 
debera utilizar archivos de traduccion para ser mostrados en el idioma 
requerido por el cliente, en este caso español. 
Los nombres de modulos, por lo general correspondientes al dominio del sistema, se definen en español. 


### Assets

##### Traducciones

Los archivos de traducciones estan organizados dentro de la carpeta `i18n` separados para mantener una mejor separacion y orden de todos 
los textos presentes en la aplicacion. 
Existe una carpeta por módulo donde cada una contiene un archivo *es-AR.json* organizado de la siguiente forma:

&nbsp;{  
	&nbsp;&nbsp;&nbsp; "nombre-modulo": {  
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "nombre-submodulo/componente/pantalla": {  
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "NOMBRE_IDENTIFICADOR_TEXTO": "Texto"  
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }  
	&nbsp;&nbsp;&nbsp; }  
&nbsp;}  
  
##### Estilos

En la carpeta `styles` se encuentran los archivos *.scss* correspondientes a los estilos generales o de uso común para la aplicación.

1. `variables`: Define las variables a utilizar.
2. `mixins`: Define mixins de uso comun para aplicar a distintos elementos de la aplicacion.
3. `mat-mixins`: Define mixins de uso comun para aplicar a distintos elementos de Material a customizar.
4. `palettes`: Corresponde a las paletas de colores.
5. `theme`: Configura propiedades del theme como la paleta de colores general y para distintos componentes en particular.


## Objetivos / User Stories 

En esta primer etapa del Bootcamp disponemos de una estructura de proyecto basica como se describió anteriormente, a medida que se vayan 
desarrollando las distintas UserStories se debera analizar mediante alguna grooming la estrategia a utilizar para llevar a cabo su 
solución, definiendo las posibles creaciones o modificaciones de modulos, componentes y servicios. Ante cualquier duda siempre revisar la
 [documentacion](https://angular.io/docs) o consultar con el referente asignado.

La obtencion de datos la realizaremos por medio de la api de nuestro tracker de tareas [Taiga](https://www.taiga.io/) instalado en 
nuestros servidores (http://taiga.pladema.net/).
La documentacion de la api esta disponible [aquí](https://taigaio.github.io/taiga-doc/dist/api.html).


##### Consideraciones:

- Antes de empezar se debe solicitar (al SM o Funcional) permisos de acceso a Taiga.

- Que el desarrollo sea preferentemente orientado a Mobile-First.

- Para el maquetado utilizar la libreria, ya incluida, flex-layout ([documentación](https://github.com/angular/flex-layout)). 
 
- Para el uso de servicios ademas de la documentacion mencionada se pueden usar como guia algun [ejemplo](https://angular.io/tutorial/toh-pt6).


### Construir login 
Crear una pagina con un formulario utilizando reactive form ([documentacion](https://angular.io/guide/reactive-forms)) con los campos 
definidos segun la informacion que necesite el [endpoint correspondiente](https://taigaio.github.io/taiga-doc/dist/api.html#auth-normal-login) validando y controlando posibles errores. Luego del
logueo se debera redirigir a una segunda pantalla (siguente US).
	

### Construir listado de proyectos disponibles
Mensaje de bienvenida con el nombre completo de usuario (obtenido de la respuesta del login). 
Crear una tabla (utilizar lo que provee Material) de [listado de proyectos](https://taigaio.github.io/taiga-doc/dist/api.html#projects-list) pertenecientes al usuario logueado donde cada fila de la tabla tendra un boton *'Ver'* que redireccionara a una 
siguiente pagina (siguiente US).
	

### Construir listado de U. Stories disponibles
Crear una tabla (utilizar lo que provee Material) de [listado de User Stories](https://taigaio.github.io/taiga-doc/dist/api.html#user-stories-list) sin cerrar, pertenecientes al sprint actual del usuario logueado, donde cada fila de la tabla tendra un boton  
*'Ver'* que redireccionara a una siguiente pagina (siguiente US).

	
### Construir listado de tareas disponibles
La pagina debera tener un titulo, correspondiente al de la US y su descripción. 
Ademas se debe crear una tabla (utilizar lo que provee 
Material) de [listado de tareas](https://taigaio.github.io/taiga-doc/dist/api.html#tasks-list) pertenecientes a una US. El encabezado de 
la tabla tendra un boton *'Nueva Tarea'* que redireccionara a una siguiente pagina (siguiente US).
	

### Construir formulario para creacion de nueva tarea
Crear una pagina con un formulario utilizando reactive form y definiendo los campos necesarios segun el [endpoint correspondiente](https://taigaio.github.io/taiga-doc/dist/api.html#tasks-create). Luego del submit del form se debera volver al listado de tareas previo.

### Construir PWA
Permitir el soporte PWA en el proyecto. [Documentación](https://angular.io/guide/service-worker-getting-started). 



