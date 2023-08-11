# cineflix

# Pentru Front-End in folderul cineflix_front:
# npm i sau npm i vite --save-dev
# Pt run : npm run dev

### FLYWAYDB
# Flyway - tool de migrare al bazei de date
# Ne genereaza un tabel nou numit flyway_schema_history in care avem informatii despre migrarile anterioare
# Migrarile se afla in src->main->resources->migration
# Nu modificati fisierul existent, creati un fisier aditional care respecta structura V1_nrVersiune_nrBug
# In acela copiati continutul fisierului anterior si puneti codul de generare aditional pe care il luati
# din database
# Aveti grija sa nu puneti aceeasi versiune cand dai push, vorbiti cu colegii