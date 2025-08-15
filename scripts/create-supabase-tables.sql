-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  numero INTEGER UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  posicion VARCHAR(50) NOT NULL,
  edad INTEGER NOT NULL,
  altura VARCHAR(10),
  peso VARCHAR(10),
  nacionalidad VARCHAR(50),
  fecha_nacimiento DATE,
  lugar_nacimiento VARCHAR(100),
  foto TEXT,
  
  -- Estadísticas de la temporada
  partidos_jugados INTEGER DEFAULT 0,
  goles INTEGER DEFAULT 0,
  asistencias INTEGER DEFAULT 0,
  tarjetas_amarillas INTEGER DEFAULT 0,
  tarjetas_rojas INTEGER DEFAULT 0,
  minutos_jugados INTEGER DEFAULT 0,
  
  -- Habilidades técnicas (0-100)
  velocidad INTEGER DEFAULT 50,
  resistencia INTEGER DEFAULT 50,
  fuerza INTEGER DEFAULT 50,
  tecnica INTEGER DEFAULT 50,
  pase INTEGER DEFAULT 50,
  regate INTEGER DEFAULT 50,
  defensa INTEGER DEFAULT 50,
  porteria INTEGER DEFAULT 50,
  
  -- Información adicional
  biografia TEXT,
  logros TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  contenido TEXT NOT NULL,
  resumen TEXT,
  imagen_portada TEXT,
  imagenes_adicionales TEXT[],
  autor VARCHAR(100) DEFAULT 'Admin',
  categoria VARCHAR(50) DEFAULT 'General',
  tags TEXT[],
  publicado BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_players_posicion ON players(posicion);
CREATE INDEX IF NOT EXISTS idx_players_numero ON players(numero);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON players
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
