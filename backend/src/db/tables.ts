import type { DB } from "./db";

export const createTables = async (db: DB) => {
  db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    categories TEXT NOT NULL,
    tags TEXT NOT NULL,
    public BOOLEAN NOT NULL,
    published_at TEXT 
  );

  CREATE TABLE IF NOT EXISTS project_participants (
    project_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, user_id)
  );

`);

  db.exec(`
  CREATE INDEX IF NOT EXISTS idx_projects_public ON projects(public);
  CREATE INDEX IF NOT EXISTS idx_projectParticipants_projectId ON project_participants(project_id);
  CREATE INDEX IF NOT EXISTS idx_projectParticipants_userId ON project_participants(user_id);
`);
};
