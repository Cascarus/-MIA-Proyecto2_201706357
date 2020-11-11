## Implementación de capacitor y generación de la aplicacion movil

* Instalación de capacitor
```bash
ng add @capacitor/angular
```

* Solucionar error 'spawn npx ENOENT' en Windows 
```bash
npx cap init
```

* Modificar el webDir con la carpeta de salida del compilado de angular en el archivo capacitor.config.json 
```json
{
  "webDir" : "dist/NombreProyecto"
}
```

* Compilar Angular
```bash
ng build --prod --build-optimizer --output-hashing=none
```

* Preparación del entorno para android
```bash
npx cap add android
```

* Compilar dist en android
```bash
npx cap sync 
npx cap copy
npx cap update
npx cap open
```

* Permitir solicitudes http en android archivo manifest
```xml
<application
  android:usesCleartextTraffic="true">
</application> 
```
