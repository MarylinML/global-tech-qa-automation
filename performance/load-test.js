import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * @description Prueba de carga para validar el performance del listado de reservas.
 * Escenario: 20 usuarios concurrentes durante 30 segundos.
 * Criterio de aceptación (SLA): El 95% de las peticiones deben ser menores a 800ms.
 */
export const options = {
  vus: 20, 
  duration: '30s',
  thresholds: {
    // Si más del 5% de las peticiones tarda más de 800ms, el test falla.
    http_req_duration: ['p(95)<800'], 
  },
};

export default function () {
  const url = 'https://restful-booker.herokuapp.com/booking';
  
  const res = http.get(url);

  // Validación de disponibilidad
  check(res, {
    'status is 200': (r) => r.status === 200,
    'transaction time OK': (r) => r.timings.duration < 800,
  });

  sleep(1); // Simula el tiempo de espera de un usuario real (pacing)
}