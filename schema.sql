-- Design Catalog database schema (run once in D1 console)
CREATE TABLE IF NOT EXISTS counters (
  ptype TEXT NOT NULL,
  code TEXT NOT NULL,
  bucket INTEGER NOT NULL,
  seq INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (ptype, code, bucket)
);
CREATE TABLE IF NOT EXISTS designs (
  sku TEXT PRIMARY KEY,
  ptype TEXT NOT NULL,
  code TEXT NOT NULL,
  bucket INTEGER NOT NULL,
  w INTEGER NOT NULL,
  h INTEGER NOT NULL,
  added TEXT NOT NULL,
  live INTEGER NOT NULL DEFAULT 0,
  hash TEXT,
  ck INTEGER
);
CREATE INDEX IF NOT EXISTS idx_designs_hash ON designs(hash);
CREATE INDEX IF NOT EXISTS idx_designs_pc ON designs(ptype, code, bucket, sku);

-- Visibility control: collections hidden per print type
CREATE TABLE IF NOT EXISTS hidden (
  ptype TEXT NOT NULL,
  code TEXT NOT NULL,
  PRIMARY KEY (ptype, code)
);

CREATE TABLE IF NOT EXISTS dlmarks (
  ptype TEXT NOT NULL,
  code TEXT NOT NULL,
  last_dl TEXT NOT NULL,
  PRIMARY KEY (ptype, code)
);

-- Customer accounts (catalog access gate) — added July 2026
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  pass TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  created TEXT NOT NULL
);
