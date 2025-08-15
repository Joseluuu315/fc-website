-- Crear tabla para tracking de visitas
CREATE TABLE IF NOT EXISTS visits (
  id SERIAL PRIMARY KEY,
  page_url VARCHAR(255) NOT NULL,
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_visits_created_at ON visits(created_at);
CREATE INDEX IF NOT EXISTS idx_visits_page_url ON visits(page_url);

-- Crear función para obtener estadísticas de visitas
CREATE OR REPLACE FUNCTION get_visit_stats()
RETURNS TABLE (
  total_visits BIGINT,
  visits_today BIGINT,
  visits_this_week BIGINT,
  visits_this_month BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_visits,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as visits_today,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as visits_this_week,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as visits_this_month
  FROM visits;
END;
$$ LANGUAGE plpgsql;
