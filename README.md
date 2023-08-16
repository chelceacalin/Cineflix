# Cineflix

### FRONTEND
Pentru Front-End in folderul cineflix_front:
```bash
npm i sau npm i vite --save-dev
```
Pentru run: 
```bash
npm run dev
```

### FLYWAYDB
Flyway - tool de migrare al bazei de date.  
Ne genereaza un tabel nou numit flyway_schema_history in care avem informatii despre migrarile anterioare.  
Migrarile se afla in src->main->resources->migration.  
Nu modificati fisierul existent, creati un fisier aditional care respecta structura V1_nrVersiune_nrBug!  
In acela copiati continutul fisierului anterior si puneti codul de generare aditional pe care il luati
din database.  
Aveti grija sa nu puneti aceeasi versiune cand dati push, vorbiti cu colegii!

### KEYCLOAK
Se poate accesa link-ul de keycloak: https://keycloak-internship.kdev2.esolutions.ro/auth/. Se vor folosi 
credentialele primite.  
  
Utilizatorii deja existenti pe keycloak:  
1. User doar cu username:
   1. username: user;
   2. password: user.
2. Username cu username, firstname, lastname, email:
   1. username: user_cineflix;
   2. password: user.
  
Aplicatia porneste pe http://localhost:8081/. De aici se va face redirect care pagina de login a keycloak-ului, unde
se va folosi un set de credentiale dintre cele de mai sus.