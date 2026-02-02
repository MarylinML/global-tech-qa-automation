# Global Tech QA Automation Challenge

Suite de automatización End-to-End para asegurar los flujos críticos de E-commerce y Reservas.

## Arquitectura y Decisiones
- **Framework:** Cypress 13.
- **Patrón:** Page Object Model (POM) para alta mantenibilidad.
- **Frontend:** Cobertura del flujo de ingresos en DemoBlaze (compras VIP).
- **API:** Validación del ciclo de vida de reservas en Restful-Booker (CRUD + Seguridad).
- **CI/CD:** Pipeline configurado con GitHub Actions como Quality Gate.

## Ejecución
1. Instalar dependencias: `npm install`
2. Ejecutar en modo Headless: `npx cypress run`
3. Ejecutar con interfaz: `npx cypress open`

## SQL
- La consulta para el reporte VIP se encuentra en `sql/query.sql`.