-- Crear tabla para próximos partidos
CREATE TABLE IF NOT EXISTS proximos_partidos (
  id SERIAL PRIMARY KEY,
  rival VARCHAR(100) NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  local BOOLEAN NOT NULL DEFAULT true,
  competicion VARCHAR(50) DEFAULT 'Liga',
  estadio VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla para últimos resultados
CREATE TABLE IF NOT EXISTS ultimos_resultados (
  id SERIAL PRIMARY KEY,
  rival VARCHAR(100) NOT NULL,
  fecha DATE NOT NULL,
  goles_favor INTEGER NOT NULL DEFAULT 0,
  goles_contra INTEGER NOT NULL DEFAULT 0,
  local BOOLEAN NOT NULL DEFAULT true,
  competicion VARCHAR(50) DEFAULT 'Liga',
  estadio VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar algunos datos de ejemplo para próximos partidos
INSERT INTO proximos_partidos (rival, fecha, hora, local, competicion, estadio) VALUES
('CD Esperanza', '2024-03-22', '18:00', true, 'Liga', 'Campo Municipal Los Leones'),
('Atlético Villa', '2024-03-29', '16:30', false, 'Liga', 'Estadio Villa'),
('Real Unión', '2024-04-05', '19:00', true, 'Liga', 'Campo Municipal Los Leones'),
('Deportivo Mar', '2024-04-12', '17:00', false, 'Copa', 'Estadio del Mar');

-- Insertar algunos datos de ejemplo para últimos resultados
INSERT INTO ultimos_resultados (rival, fecha, goles_favor, goles_contra, local, competicion, estadio) VALUES
('Real Deportivo', '2024-03-15', 3, 0, true, 'Liga', 'Campo Municipal Los Leones'),
('CD Atlético', '2024-03-08', 1, 2, false, 'Liga', 'Estadio Atlético'),
('Villa FC', '2024-03-01', 2, 1, true, 'Liga', 'Campo Municipal Los Leones'),
('Sporting Club', '2024-02-23', 0, 1, false, 'Copa', 'Estadio Sporting');

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para actualizar updated_at
CREATE TRIGGER update_proximos_partidos_updated_at 
    BEFORE UPDATE ON proximos_partidos 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ultimos_resultados_updated_at 
    BEFORE UPDATE ON ultimos_resultados 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
