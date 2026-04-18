# ChatIO — Real-Time Browser Chat

Application de chat en temps réel entre utilisateurs connectés sur le même serveur, développée avec **Node.js**, **Express** et **Socket.IO**.

## ✨ Fonctionnalités

- Création d'un pseudo unique à la connexion
- Messagerie en temps réel (multi-utilisateurs)
- Indicateur de frappe ("X is typing...")
- Liste des utilisateurs connectés en direct
- Déconnexion automatique détectée et propagée

## 🛠️ Stack technique

| Côté | Technologie |
|---|---|
| Serveur | Node.js, Express 4, Socket.IO 2 |
| Client | HTML5, CSS3, jQuery, Socket.IO client |

## 🚀 Installation & lancement

```bash
# Cloner le dépôt
git clone https://github.com/Amar1921/amar-syll-nodejs.git
cd amar-syll-nodejs

# Installer les dépendances
npm install

# Lancer le serveur
npm start
# ou
node server.js

# Ouvrir dans le navigateur
# http://localhost:3080
```

## 📁 Structure du projet

```
├── server.js       # Serveur Express + logique Socket.IO
├── index.html      # Interface client (HTML/CSS/JS)
├── package.json    # Dépendances npm
└── readme.md       # Documentation
```

## 🔗 Liens

- GitHub : [github.com/Amar1921](https://github.com/Amar1921)
- Portfolio : [amarsyll.pro](https://amarsyll.pro)
