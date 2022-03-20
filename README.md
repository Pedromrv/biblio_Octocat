# Biblioteca Octocat

## Requisitos para este proyecto

* Manipulación dinámica del DOM
* Manejo de ES6
* Asincronía
* Sin frameworks ni librerias externas en la medida de lo posible
* Gestión del proyecto en Github desde el principio. Uso de ramas.
* Código limpio, buenas prácticas
* Diseño responsive, mobile first, semántica HTML5

## Opcional

* Otras APIs, Local Storage, Firebase, PWA...
* En general, cualquier extra será bien recibido para que investiguéis por vuestra cuenta, siempre y cuando tenga sentido

## Especificaciones(Fase I):

* Incluir una animación mientras esperamos la carga del contenido.
* Al cargar la web deben de aparecer todas las listas con los siguientes datos:
   - Nombre completo de la lista
   - Fecha del libro más antiguo en la lista
   - Fecha del último libro incorporado
   - Frecuencia de actualización
   - Link para poder cargar la lista
* Al pinchar en el link de una lista especifica, el DOM debe cambiar e incluir los siguientes datos:
* Un botón para volver atras y recargar la disposición anterior
* Los libros deben estar organizados según el orden de la lista oficial
* Incluir
   - Carátula del libro
   - Cantidad de semanas que lleva en la lista
   - Descripción
   - Titulo y la posición que ocupa en la lista ( #1 titulo.... #2 titulo....)
   -  Link para poder comprar el libro en amazon (debe abrirse en otra pestaña)

## Especificaciones (Fase II - Firebase):

* Autenticación con Firebase auth: Los usuarios que se autentiquen podrán guardar sus favoritos
* Añadir un botón de favoritos en cada libro
* Los favoritos se guardarán en en Firebase Firestore
* Necesitarás una vista extra en el front para que cada usuario pueda ver sus favoritos
