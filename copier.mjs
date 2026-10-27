// Site GitHub Pages de Zlababababan (zlababababan.github.io) : pages de confidentialité des jeux Android.
// La source reste docs/privacy.html de chaque jeu : ce script les recopie ici, puis on commite et on pousse.
//   node copier.mjs   (puis : git add -A && git commit -m "…" && git push)
// Adresse d'un jeu : https://zlababababan.github.io/<dossier>/privacy.html
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const W = join(here, "..");
const games = { orbite: "Orbite", birdclimber: "BirdClimberV2", moitie: "Moitie", esquive: "Esquive", etoiles: "Etoiles",
  slidestone: "Glisse", lumirror: "Laser", corkolor: "TriCouleurs" };
// Les adresses déjà publiées gardent leur dossier même si le jeu a été renommé (orbite = Ringhop, etc.).
for (const [dir, project] of Object.entries(games)) {
  const src = join(W, project, "docs", "privacy.html");
  if (!existsSync(src)) { console.log(`${dir} : pas de docs/privacy.html, ignoré`); continue; }
  mkdirSync(join(here, dir), { recursive: true });
  copyFileSync(src, join(here, dir, "privacy.html"));
  console.log(`${dir}/privacy.html ← ${project}/docs/privacy.html`);
}
