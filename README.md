# Front-end's Bootcamp

Este proyecto sirve como base para poder implementar las funcionalidades requeridas en el Bootcamp de Front-end. Se provee una estructura inicial de un proyecto de front-end [Angular](https://angular.io) con bibliotecas auxiliares para temas como traducciones, layout, etc.

El proyecto fue creado con [Angular CLI](https://www.npmjs.com/package/@angular/cli#usage). Se recomienda utilizar los comandos de esta herramienta para la creación de los distintos building blocks de Angular.

## Angular

[Angular](https://angular.io/guide/what-is-angular) es un framework de diseño de aplicaciones y una plataforma de desarrollo para construir single-page applications (SPA) construido con [TypeScript](https://www.typescriptlang.org/).

Angular hace uso de distintas bibliotecas como [rxJS](https://rxjs.dev/guide/overview) y provee una guía de cómo codear dentro de la plataforma en [coding style guide](https://angular.io/guide/styleguide).

## UX/UI

Se utiliza [Angular Material](https://material.angular.io) como biblioteca de componentes que implementa la especificación de [Material Design](https://material.io/design) para el desarrollo de interfaces de usuario. Dichos componentes pueden explorarse y observar el modo de uso desde [acá](https://material.angular.io/components/categories)

### Layout

El layout puede ser definido con `css` tradicional, pero se recomienda utilizar la biblioteca [angular-flex-layout](https://github.com/angular/flex-layout) incluida en el proyecto. Esta ofrece un conjunto de directivas de Angular para alinear el contenido visual.

### Theming

En la carpeta `assets/styles` se ubican los archivos de estilos de la aplicación. En el archivo `theme.scss` se encuentra la configuración de [temas de Angular Material](https://material.angular.io/guide/theming)
## Traducciones

Las traducciones se encuentran implementadas por medio de [ngx-translate](https://github.com/ngx-translate/core).

Los archivos de traducciones están organizados dentro de la carpeta `i18n` como archivos `json`, uno por cada lenguaje que se quiere traducir, con el siguiente formato:

```json
{
    "nombre-modulo": {
       "nombre-submodulo/componente/pantalla": 
	   {
         "NOMBRE_IDENTIFICADOR_TEXTO": "Texto"
       }
    }
}
```
