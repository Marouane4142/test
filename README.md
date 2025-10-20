```markdown
# AutoLink - Marketplace voitures entre particuliers

Stack:
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + PostCSS (@tailwindcss/postcss)
- Framer Motion pour les animations
- Lucide React pour les icônes

Démarrage rapide (Windows CMD / PowerShell):
1. npm install
2. npm run dev
3. Ouvrir http://localhost:3000

Remarques:
- Remplace public/logo.svg par ton logo.
- Couleurs principales:
  - Fonds: #23292C et #346565
  - Accent: #FFAA00
  - Base: #FFFFFF
- Auth et backend: modal login est mock. Je peux t'aider à brancher NextAuth / API / DB (Postgres, SQLite) si tu veux.

Si tu rencontres des erreurs d'installation (peer deps), fais d'abord :
- Nettoyage :
  - Windows CMD:
    rmdir /s /q node_modules
    del /f /q package-lock.json
  - PowerShell:
    Remove-Item -Recurse -Force node_modules, package-lock.json

- Puis réinstallation (si conflit) :
  npm install --legacy-peer-deps

Ou installe d'abord eslint@8 puis réessaie :
  npm install -D eslint@8
```