# Packing List API

Ce projet est une **API** permettant de gérer des listes d’objets à emporter lors de voyages (“packing list”).
Elle offre les fonctionnalités suivantes :  
- **Authentification** (création de compte, connexion, affichage du profil)  
- **Gestion des voyages** (liste, création)  
- **Gestion des items** pour chaque voyage (liste, ajout, mise à jour, suppression, marquage “pris”)  

---

## Sommaire

1. [Technologies utilisées](#technologies-utilisées)  
2. [Prérequis](#prérequis)  
3. [Installation et lancement](#installation-et-lancement)   
4. [Tests rapides](#tests-rapides)

---

## Technologies utilisées

- **Node.js** & **Express.js 5**  
- **MongoDB** via **Mongoose** (base de données locale libre)  
- **jsonwebtoken** pour la gestion des JWT  
- **zod** pour la validation des données  
- **bcrypt** pour le chiffrement des mots de passe  
- **nodemon** (en dev) pour recharger automatiquement le serveur

---

## Prérequis

- **Node.js** (version >= 14)  
- **npm** (ou **yarn**)  
- **MongoDB** (ou un autre SGBD local si vous préférez – modifiez alors l’ORM/config)  

---

## Installation et lancement

1. **Cloner** ce dépôt :

   ```bash
   git clone https://github.com/LucasRambert4/TrackingListApi.git
   cd TrackingListApi

---

## Tests Rapides

1. Inscription
   POST /auth/register
   Body JSON :
   {
     "email": "test@example.com",
     "password": "secret123"
   }

2. Connexion
   POST /auth/login
   Body JSON :
   {
     "email": "test@example.com",
     "password": "secret123"
   }
   → Retourne { "token": "..." }

3. Récupérer le profil
   GET /auth/me
   Headers:
     Authorization: Bearer <token>

4. Créer un voyage
   POST /voyages
   Headers:
     Authorization: Bearer <token>
   Body JSON :
   {
     "destination": "Paris",
     "startDate": "2025-01-01",
     "endDate": "2025-01-05"
   }

5. Lister les voyages
   GET /voyages
   Headers:
     Authorization: Bearer <token>

6. Ajouter un item
   POST /voyages/<voyageId>/items
   Headers:
     Authorization: Bearer <token>
   Body JSON :
   {
     "name": "Chaussures",
     "quantity": 1
   }

7. Modifier un item (ex: marquer “pris”)
   PATCH /voyages/<voyageId>/items/<itemId>
   Headers:
     Authorization: Bearer <token>
   Body JSON :
   {
     "isTaken": true
   }

8. Supprimer un item
   DELETE /voyages/<voyageId>/items/<itemId>
   Headers:
     Authorization: Bearer <token>
   → Réponse 204 si succès.
