CREATE TABLE IF NOT EXISTS visitors (
  id SERIAL PRIMARY KEY,
  visitor_name VARCHAR(100) NOT NULL,
  visitor_company VARCHAR(100),
  visiting_department VARCHAR(100) NOT NULL,
  checkin_time TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'checked-in',
  metadata JSONB
);

CREATE INDEX IF NOT EXISTS idx_visitors_checkin_time ON visitors(checkin_time DESC);
CREATE INDEX IF NOT EXISTS idx_visitors_status ON visitors(status);
