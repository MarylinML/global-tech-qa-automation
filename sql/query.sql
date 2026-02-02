/* Reporte de Usuarios VIP
Objetivo: Identificar clientes con compras > $500 en los últimos 30 días.
Tablas involucradas: Users (u), Orders (o).
*/

SELECT 
    u.id AS user_id, 
    u.name AS customer_name, 
    SUM(o.total_amount) AS total_spent
FROM Users u
JOIN Orders o ON u.id = o.user_id
WHERE o.status = 'completed' -- Solo ventas finalizadas (asegura integridad de ingresos)
  AND o.purchase_date >= (CURRENT_DATE - INTERVAL '30 days') -- Filtro de tiempo reciente
GROUP BY u.id, u.name
HAVING SUM(o.total_amount) > 500 -- Criterio de negocio para perfil VIP
ORDER BY total_spent DESC; -- Priorizar mayores compradores