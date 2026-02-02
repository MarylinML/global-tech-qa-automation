# Global Tech QA Automation Challenge

Suite de automatización End-to-End para asegurar los flujos críticos de E-commerce y Reservas.

## Arquitectura y Decisiones
- **Framework:** Cypress 13.
- **Patrón:** Page Object Model (POM) para desacoplar la capa de datos de la capa de pruebas.
- **Frontend (Protección del Ingreso):** Se implementó una **lógica dinámica** que recorre el catálogo de "Monitors", captura los precios en tiempo real y selecciona automáticamente el artículo de mayor valor. Esto asegura que el flujo de ingresos VIP esté protegido independientemente de cambios en el stock.
- **Manejo de Asincronía:** En lugar de pausas fijas (`wait`), se utilizaron **esperas reactivas y aserciones de visibilidad**, optimizando el tiempo de ejecución en el pipeline.
- **API (Integridad y Seguridad):** Validación del ciclo de vida completo (CRUD) en Restful-Booker, incluyendo una prueba de seguridad que valida el rechazo de operaciones (DELETE) con tokens inválidos.
- **CI/CD:** Pipeline configurado con GitHub Actions que actúa como **Quality Gate**, impidiendo despliegues si los flujos críticos fallan.

## Ejecución
1. Instalar dependencias: `npm install`
2. Ejecutar en modo Headless: `npx cypress run`
3. Ejecutar con interfaz: `npx cypress open`

## SQL
- La consulta para el reporte VIP se encuentra en `sql/query.sql`.

### Performance Testing (Bonus)
Se incluyó un script de carga utilizando **k6** para validar el SLA (Service Level Agreement) del endpoint de reservas.
- **Carga:** 20 VUs (Virtual Users).
- **Umbral:** p(95) < 800ms.
- **Ubicación:** `performance/load-test.js`