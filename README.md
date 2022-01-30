# Bug Tracker
This is the monorepo for the Bug Tracker project which is a part of the Tri-NIT Hackathon

Video link: https://drive.google.com/file/d/1dC23CSzAdYPeDXIf0EAhToty88nuH1sV/view?usp=sharing

Doc link: https://docs.google.com/document/d/1iW_Iydl3CAWHa6kSpHmd9UG2OPbGCQha0nhTMUYTNV8/edit?usp=sharing

Requirements:
- Node.js
- PostgreSQL

Sync prisma schema with your db:

```bash
# Run Migrations
cd apps/api && yarn prisma migrate dev

# Make a new migration
cd apps/api && yarn prisma migrate dev --name name_of_migration
```

To get started, run the following commands in the root directory:
```bash
# Installs all dependencies of the workspaces
yarn

# Starts the api dev server
yarn dev:api

# Starts the react dev server
yarn dev:frontend
```
