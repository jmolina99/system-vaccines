******** PROCESO DE CONSTRUCCIÓN y EJECUCIÓN ********
1. Análisis de las historias de usuario
    - Al leer detenidamente los requerimentos del proyecto, procedo a modelar las entidades y atributos solicitados; esto debido para un mejor manejo de los datos
2. Instalación ambiente de desarrollo Angular
    - Habiendo leído y comprendido cada requerimiento, genero un nuevo proyecto Angular por medio de angular cli con el comando ng new nombre_proyecto
3. Instalación de dependencias necesarias para el desarrollo
    - Con el proyecto Angular compilado, procedo a instalar las librerías necesarias para el desarrollo del proyecto, por ejemplo: para el diseño del HTML por medio de clases, instalo Tailwindcss para los estilos de las pantallas
4. Creación de modelos
    - Antes de crear los componentes respectivos, creo los modelos por cada entidad; ejemplo Employee
5. Creación de componentes acorde a los requerimientos
    - Uno a uno, voy creando los componentes distribuyendo ordenadamente entre el dashboard, el login, etc., estos mediante el comando ng generate component nombre_componente
6. Creación de rutas para cada componente
    - Habiendo creado el componente, creo la ruta respectiva para la vista de dicho componente, aún así hay casos como el Sidebar que solo uso el Selector <app-sidebar></app-sidebar> para presentarlo en la pantalla del componente deseado
7. Creación de servicios para consumir las APIs del backend
    - Luego de crear el componente junto a sus rutas, se necesita la persistencia de datos por parte del Backend, en este caso usando node js con express, cosumo sus APIs para listar, crear, actualizar y eliminar algún dato almacenado en la base de datos, en este caso MongoDB
8. Diseño HTML para las vistas de los componentes
    - Cosumiendo las APIs del servidor y obteniendo los datos necesarios, diseño y presento dicha información de una manera amigable para el usuario: Administrador y Empleado
9. Testeo de funcionamiento
    - Culminados el diseño y uso de la información en la vista, se realiza su parcial prueba que todo se encuetre en orden y en funcionamiento
