# Cineflix

* Features
<pre>
 - Autentificare cu KeyCloak
 - Diferite abilitati in functie de rol, USER si ADMIN
 * Userul poate:
      - Poate filtra, sorta si cauta filme, avand optiune de paginare
      - Poate rezerva filme, cu data de inceput si data returnare
      - Poate viziona filmele rezervate de el si filtra prin ele
      - Poate returna filme pentru a le putea inchiria si ceilalti
 * Admin poate ( tot ce face userul + inca cateva abilitati ): 
      - Adauga categorii pentru filme si le poate actualiza si sterge
      - Sterge utilizatori si schimbat permisuni pentru utilizatori
</pre>

* How to start the app
  
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

### KEYCLOAK
Aplicatia porneste pe http://localhost:8081/. De aici se va face redirect care pagina de login a keycloak-ului, unde
se va folosi un set de credentiale dintre cele de mai sus.
