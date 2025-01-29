# Packing List API

Ce projet est une **API** permettant de gérer des listes d’objets à emporter lors de voyages (“packing list”), inspirée de l’application **Packr Travel Packing List**.  
Elle offre les fonctionnalités suivantes :  
- **Authentification** (création de compte, connexion, affichage du profil)  
- **Gestion des voyages** (liste, création)  
- **Gestion des items** pour chaque voyage (liste, ajout, mise à jour, suppression, marquage “pris”)  

---

## Sommaire

1. [Technologies utilisées](#technologies-utilisées)  
2. [Prérequis](#prérequis)  
3. [Installation et lancement](#installation-et-lancement)  
4. [Configuration (variables d’environnement)](#configuration-variables-denvironnement)  
5. [Structure du projet](#structure-du-projet)  
6. [Documentation des endpoints](#documentation-des-endpoints)  
7. [Tests rapides](#tests-rapides)  
8. [Contributions et améliorations](#contributions-et-améliorations)  
9. [Licence](#licence)

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
