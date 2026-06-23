# Chaîne TV + VidSrc 🎬📺

Un site web moderne pour regarder **toutes les chaînes TV du monde** et **tous les films/séries**.

## Fonctionnalités 🌟

- 📺 **Chaînes TV Live** - Accès à plus de 10,000 chaînes TV du monde entier via l'API IPTV-org
- 🎬 **Films & Séries** - Catalogue complet de films et séries via l'API VideoSrc
- 🎨 **Interface Moderne** - Design responsive et intuitif avec Tailwind CSS
- 🔍 **Recherche Avancée** - Filtrez par région, langue, catégorie
- ⭐ **Favoris** - Sauvegardez vos chaînes et contenus préférés
- 📱 **Responsive Design** - Fonctionne sur tous les appareils
- 🎥 **Lecteur Vidéo Professionnel** - Lecteur HTML5 avec contrôles avancés
- 🌙 **Mode Sombre** - Confort visuel optimisé

## Stack Technique 🛠️

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Tailwind CSS + Shadcn/ui
- **State Management**: Zustand
- **API Client**: Axios + React Query
- **Video Player**: HLS.js + Custom Player
- **Build Tool**: Vite

## Installation 📦

```bash
# Cloner le projet
git clone https://github.com/pcmathis1109-oss/chaine-tv-vidsrc.git
cd chaine-tv-vidsrc

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build pour la production
npm run build
```

## Variables d'environnement 🔐

Créez un fichier `.env.local`:

```env
VITE_IPTV_ORG_API=https://iptv-org.github.io/api
VITE_VIDEOSRC_API=https://api.videosrc.net
VITE_APP_NAME=Chaîne TV + VidSrc
```

## Structure du Projet 📁

```
├── src/
│   ├── components/       # Composants React réutilisables
│   ├── pages/           # Pages principales
│   ├── services/        # Services API
│   ├── stores/          # Zustand stores (state management)
│   ├── types/           # Types TypeScript
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utilitaires
│   └── App.tsx          # Point d'entrée
├── public/              # Assets statiques
├── package.json
└── vite.config.ts
```

## APIs Utilisées 🔗

### IPTV-org
- Documentation: https://iptv-org.github.io/api/
- Gratuit et open-source
- 10,000+ chaînes TV
- Base de données constamment mise à jour

### VideoSrc
- Documentation: https://www.videosrc.net/api
- Accès aux films, séries, et contenus vidéo
- Liens de streaming fiables

## Utilisation 🚀

1. **Accueil** - Vue d'ensemble des chaînes populaires et contenus tendance
2. **Chaînes TV** - Parcourez et recherchez les chaînes par région
3. **Contenu** - Films et séries avec descriptions détaillées
4. **Lecteur** - Lecteur vidéo professionnel avec streaming HLS
5. **Favoris** - Accédez rapidement à vos contenus préférés

## Contributeurs 👥

Contributions bienvenues! Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour les directives.

## Licence 📄

MIT - Voir [LICENSE](LICENSE) pour les détails.

## Support 💬

Pour toute question ou problème, ouvrez une [issue](https://github.com/pcmathis1109-oss/chaine-tv-vidsrc/issues).

---

**Profitez du streaming! 🎉**
