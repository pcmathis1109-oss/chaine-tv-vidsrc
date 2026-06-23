import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '@/components/Navbar';
import { useState } from 'react';
import { useAppStore } from '@/stores/appStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useAppStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={theme}>
        <div className="min-h-screen bg-gray-950 text-white">
          <Navbar onSearch={setSearchQuery} />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-12">
              {/* Hero Section */}
              <section className="rounded-lg overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 p-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Chaîne TV + VidSrc</h1>
                <p className="text-xl text-blue-100 mb-6">
                  Regardez les chaînes TV du monde entier et des milliers de films et séries
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <a
                    href="/channels"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    Explorez les Chaînes
                  </a>
                  <a
                    href="/movies"
                    className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
                  >
                    Regarder Films
                  </a>
                </div>
              </section>

              {/* Features */}
              <section>
                <h2 className="text-3xl font-bold mb-8">Fonctionnalités</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: '10,000+ Chaînes TV',
                      description: 'Accès à toutes les chaînes TV du monde en direct',
                      icon: '📺',
                    },
                    {
                      title: 'Films & Séries',
                      description: 'Catalogue complet de contenu vidéo à la demande',
                      icon: '🎬',
                    },
                    {
                      title: 'Lecteur Professionnel',
                      description: 'Lecteur vidéo avec streaming HLS optimisé',
                      icon: '▶️',
                    },
                    {
                      title: 'Recherche Avancée',
                      description: 'Filtrez par région, langue, catégorie',
                      icon: '🔍',
                    },
                    {
                      title: 'Favoris',
                      description: 'Sauvegardez vos contenus préférés',
                      icon: '⭐',
                    },
                    {
                      title: 'Responsive Design',
                      description: 'Fonctionne parfaitement sur tous les appareils',
                      icon: '📱',
                    },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-blue-600 transition"
                    >
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section className="bg-gray-900 rounded-lg p-12 text-center border border-blue-600">
                <h2 className="text-2xl font-bold mb-4">Prêt à commencer?</h2>
                <p className="text-gray-300 mb-6">
                  Explorez maintenant et profitez d'un streaming illimité
                </p>
                <a
                  href="/channels"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Commencer l'exploration
                </a>
              </section>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 border-t border-gray-800 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-bold mb-4">À propos</h3>
                  <p className="text-gray-400 text-sm">
                    Chaîne TV + VidSrc est une plateforme de streaming gratuite alimentée
                    par IPTV-org et VideoSrc APIs.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Liens</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <a href="#" className="hover:text-white">
                        Accueil
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Chaînes
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Contenu
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Ressources</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <a href="#" className="hover:text-white">
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Signaler un bug
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                <p>&copy; 2024 Chaîne TV + VidSrc. Tous droits réservés.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;