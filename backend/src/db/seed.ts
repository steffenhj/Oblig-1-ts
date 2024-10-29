import fs from "node:fs/promises";
import { join } from "node:path";
import type { DB } from "./db";
import type { User } from "@/features/users/types/types";
import type { Project } from "@/types";

export const seed = async (db: DB) => {
    console.log("Printing import.meta.dirname: ", import.meta.dirname)
  const path = join(import.meta.dirname, "data.json");
  const file = await fs.readFile(path, "utf-8");
  const { users, projects } = JSON.parse(file) as {
    users: User[];
    projects: ((Project & { participants: string[] })[]);
  };

  const insertUser = db.prepare(`
    INSERT INTO users (id, email, name) VALUES (?, ?, ?)
  `);

  const insertProject = db.prepare(`
    INSERT INTO projects (id, title, description, categories, tags, public, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertProjectParticipant = db.prepare(`
    INSERT INTO project_participants (project_id, user_id) VALUES (?, ?)
  `);

  db.transaction(() => {
    for (const user of users) {
      insertUser.run(user.id, user.email, user.name);
    }

    for (const project of projects) {
      insertProject.run(
        project.id,
        project.title,
        project.description,
        project.categories,
        project.tags,
        project.public ? 1 : 0,
        project.published_at
      );

      for (const participantId of project.participants) {
        insertProjectParticipant.run(project.id, participantId);
      }
    }
  })();
};
