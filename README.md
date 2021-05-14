# Lektion 12 maj

## Övningar

Bygg en "skapa konto" - sida där en användare kan mata in:
* Användarnamn
* Lösenord
* E-post
* Förnamn och efternamn

Lösenordet ska hashas och hashen ska sparas med användaren i databasen.
Använd ```bcrypt.hash(password, saltRounds)```. En användare ska också få rollen user i databasen.

Gör sedan om login-funktionen så du kontrollerar lösenordet med ```bcrypt.compare(password, hash)``` istället.

## Artiklar

Middlewares: https://expressjs.com/en/guide/writing-middleware.html

Tutorial på Bcrypt: https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt

Bcrypt: https://www.npmjs.com/package/bcrypt

## Videor

## Inspelningar

https://drive.google.com/drive/folders/1ZajgAwqFB6yZDgVZhSbqmNNglBbaQY8z?usp=sharing
