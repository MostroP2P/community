import type { GuideTranslation } from './types';

/**
 * fr translation of the node guide.
 *
 * `{{version}}` and `{{updated}}` are replaced at render time with the
 * current Mostro release tag and its month. Section order and heading levels
 * live in `./sections.ts`, not here.
 */
const fr: GuideTranslation = {
  meta: {
    title: `Guide de Configuration de Nœud — Mostro Community`,
    description: `Guide complet pour faire tourner votre propre nœud Mostro d'échange P2P de Bitcoin.`,
    h1: `Faire Tourner Votre Propre Nœud Mostro`,
    versionLine: `Mostro {{version}} — Guide de la Communauté · {{updated}}`,
    tocTitle: `Sur cette page`,
    tocButton: `📑 Sommaire`,
    credit: `      <div style="text-align:center; margin-top:48px; padding:24px; border-top:1px solid var(--border);">
        <p>Ce guide est maintenu par la communauté Mostro. Vous avez trouvé une erreur ou souhaitez l'améliorer ?<br>
        Les contributions sont les bienvenues sur <a href="https://github.com/MostroP2P/community" target="_blank" rel="noopener noreferrer">github.com/MostroP2P/community</a></p>
        <p style="color:var(--text-secondary); margin-top:12px;">Dernière mise à jour : {{updated}} · Mostro {{version}}</p>
      </div>`,
  },

  sections: {
    'what-is-mostro': {
      title: `1. Qu'est-ce que Mostro et pourquoi votre communauté devrait en faire tourner un ?`,
      nav: `1. Qu'est-ce que Mostro ?`,
      navShort: `1. Qu'est-ce que Mostro ?`,
      html: `      <p>Mostro est un <strong>exchange peer-to-peer de Bitcoin</strong> qui permet aux gens d'acheter et de vendre du Bitcoin en utilisant des monnaies locales (dollars, euros, francs — n'importe quelle devise) sans avoir à fournir de pièce d'identité (KYC). Pensez-y comme un marché décentralisé où acheteurs et vendeurs peuvent échanger directement.</p>

      <p>Il fonctionne grâce à deux technologies :</p>
      <ul>
        <li><strong>Lightning Network</strong> — une couche de paiements rapides et peu coûteux pour Bitcoin (pensez-y comme la voie express de Bitcoin pour les petits paiements agiles)</li>
        <li><strong>Nostr</strong> — un protocole de communication résistant à la censure (pensez-y comme un système de messagerie que personne ne peut éteindre)</li>
      </ul>

      <p>Mostro agit comme un <strong>coordinateur de séquestre</strong> — il retient le Bitcoin du vendeur dans un « coffre-fort » temporaire (appelé hold invoice) jusqu'à ce que l'acheteur confirme avoir envoyé le paiement en monnaie locale. Mostro ne contrôle jamais réellement les fonds de quiconque ; il les retient brièvement pendant la transaction.</p>`,
    },
    'why-run': {
      title: `Pourquoi votre communauté voudrait-elle faire tourner un nœud Mostro ?`,
      nav: `Pourquoi un nœud ?`,
      html: `      <ol>
        <li><strong>Revenus de frais</strong> — Chaque transaction vous rapporte des frais (0.6% par défaut). Si votre communauté réalise 10 000 $ de transactions mensuelles, cela représente environ 60 $/mois en frais.</li>
        <li><strong>Trading P2P sans KYC</strong> — Les membres de votre communauté peuvent acheter et vendre du Bitcoin sans fournir de pièce d'identité. Particulièrement important dans les régions aux monnaies instables ou aux réglementations restrictives.</li>
        <li><strong>Litiges dans votre langue</strong> — Quand une transaction tourne mal, <em>votre</em> communauté la résout, dans <em>votre</em> langue, en comprenant <em>vos</em> méthodes de paiement locales.</li>
        <li><strong>Indépendance</strong> — Aucune entreprise ne peut fermer votre exchange. Aucun gouvernement ne peut faire pression sur un opérateur unique pour le faire fermer.</li>
        <li><strong>Personnalisation</strong> — Vous choisissez quelles devises supporter, quelles méthodes de paiement autoriser et quels frais facturer.</li>
      </ol>`,
    },
    'how-it-works': {
      title: `Comment fonctionne Mostro (Simplifié)`,
      nav: `Comment ça marche`,
      html: `      <div class="flow-diagram">
        <div class="flow-step"><span class="step-num">1.</span> Alice veut VENDRE du Bitcoin pour 50 $ USD <span class="arrow">→</span> Elle crée un ordre sur Mostro</div>
        <div class="flow-step"><span class="step-num">2.</span> Bob veut ACHETER du Bitcoin avec 50 $ USD <span class="arrow">→</span> Il voit l'ordre d'Alice et le prend</div>
        <div class="flow-step"><span class="step-num">3.</span> Mostro crée un « coffre-fort » (hold invoice) <span class="arrow">→</span> Alice envoie ses Bitcoin dans le coffre-fort</div>
        <div class="flow-step"><span class="step-num">4.</span> Bob envoie 50 $ à Alice par virement bancaire, Zelle, espèces, etc. <span class="arrow">→</span> Bob appuie sur « Fiat Envoyé » dans son app</div>
        <div class="flow-step"><span class="step-num">5.</span> Alice confirme qu'elle a reçu les 50 $ <span class="arrow">→</span> Elle appuie sur « Libérer »</div>
        <div class="flow-step"><span class="step-num">6.</span> Mostro libère les Bitcoin du coffre-fort vers Bob <span class="arrow">→</span> Transaction terminée ! ✓</div>
      </div>

      <p>Si quelque chose tourne mal (ex : Bob dit qu'il a payé mais Alice n'a pas reçu), l'une ou l'autre partie peut ouvrir un <strong>litige</strong>, et les arbitres désignés de votre communauté enquêtent et résolvent le problème.</p>`,
    },
    'prerequisites': {
      title: `2. Prérequis — Ce dont vous avez besoin avant de commencer`,
      nav: `2. Prérequis`,
      navShort: `2. Prérequis`,
      html: ``,
    },
    'vps': {
      title: `2.1 Un Serveur (VPS)`,
      nav: `Serveur (VPS)`,
      html: `      <p>Un <strong>VPS</strong> (Serveur Privé Virtuel) est un ordinateur dans un centre de données qui fonctionne 24h/24 et 7j/7. Vous en louerez un pour héberger votre nœud Mostro.</p>

      <p><strong>Spécifications minimales :</strong></p>
      <table class="guide-table">
        <thead><tr><th>Ressource</th><th>Minimum</th><th>Recommandé</th></tr></thead>
        <tbody>
          <tr><td>CPU</td><td>2 vCPUs (partagés)</td><td>2+ vCPUs</td></tr>
          <tr><td>RAM</td><td>2 Go</td><td>4 Go</td></tr>
          <tr><td>Stockage</td><td>60 Go SSD</td><td>100 Go SSD</td></tr>
          <tr><td>Bande passante</td><td>3 To/mois</td><td>3+ To/mois</td></tr>
          <tr><td>OS</td><td>Ubuntu 22.04+ LTS</td><td>Ubuntu 24.04 LTS</td></tr>
        </tbody>
      </table>

      <p><strong>Coût mensuel estimé :</strong> 10–24 $/mois.</p>

      <p><strong>Fournisseurs VPS populaires :</strong></p>
      <ul>
        <li><a href="https://www.hostinger.com/" target="_blank" rel="noopener noreferrer">Hostinger</a> — à partir d'environ 7 $/mois (prix promotionnel ; le renouvellement peut être plus élevé) (KVM 2 : 2 vCPU, 8 Go RAM, 100 Go NVMe, 8 To de bande passante) · Accepte le Bitcoin</li>
        <li><a href="https://www.hetzner.com/" target="_blank" rel="noopener noreferrer">Hetzner</a> — 3,49–8 €/mois (CX23 à partir de 3,49 €, bon rapport qualité-prix, basé dans l'UE)</li>
        <li><a href="https://www.digitalocean.com/" target="_blank" rel="noopener noreferrer">Digital Ocean</a> — 24 $/mois (4 Go RAM, 2 CPUs, 80 Go SSD) ou 32 $/mois (4 Go RAM, 2 Intel CPUs, 120 Go NVMe)</li>
        <li><a href="https://www.ovhcloud.com/" target="_blank" rel="noopener noreferrer">OVH</a> — environ 6–12 $/mois</li>
        <li><a href="https://www.linode.com/" target="_blank" rel="noopener noreferrer">Linode/Akamai</a> — 12 $/mois</li>
        <li><a href="https://www.lunanode.com/" target="_blank" rel="noopener noreferrer">Lunanode</a> — Accepte les paiements en Bitcoin</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Conseil</div>
        <p>De nombreux fournisseurs de VPS acceptent les paiements en Bitcoin. Recherchez cette option si vous souhaitez rester cohérent avec la philosophie Bitcoin.</p>
      </div>

      <p>Vous devez être à l'aise pour vous connecter à un serveur par SSH. Si vous ne l'avez jamais fait, cherchez un tutoriel « Se connecter en SSH à un VPS » — c'est plus simple qu'il n'y paraît.</p>`,
    },
    'lnd': {
      title: `2.2 Un Nœud Lightning Network (LND)`,
      nav: `Nœud Lightning (LND)`,
      html: `      <p>Lightning Network est un système « couche 2 » construit sur Bitcoin qui permet des paiements rapides et peu coûteux. Pour faire tourner Mostro, vous avez besoin d'un <strong>nœud LND</strong> (Lightning Network Daemon) — le logiciel Lightning spécifique avec lequel Mostro fonctionne.</p>

      <p><strong>Vos options :</strong></p>
      <table class="guide-table">
        <thead><tr><th>Option</th><th>Difficulté</th><th>Coût</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Utiliser un nœud LND existant</td><td><span class="badge badge-easy">Facile</span></td><td>Gratuit (si vous en avez un)</td><td>Idéal si quelqu'un en a déjà un</td></tr>
          <tr><td>Faire tourner LND sur le même VPS</td><td><span class="badge badge-hard">Difficile</span></td><td>Même VPS + liquidité</td><td>Nécessite un VPS avec 4 Go+ de RAM</td></tr>
          <tr><td>Solution nœud-en-boîte</td><td><span class="badge badge-medium">Moyen</span></td><td>200–600 $ + liquidité</td><td><a href="https://start9.com/" target="_blank" rel="noopener noreferrer">Start9</a>, <a href="https://umbrel.com/" target="_blank" rel="noopener noreferrer">Umbrel</a>, <a href="https://raspiblitz.org/" target="_blank" rel="noopener noreferrer">RaspiBlitz</a></td></tr>
          <tr><td>StartOS avec le paquet Mostro</td><td><span class="badge badge-easy">Plus facile</span></td><td>300–600 $ + liquidité</td><td>Start9 dispose d'un paquet Mostro en un clic</td></tr>
          <tr><td>Utiliser Voltage.cloud</td><td><span class="badge badge-easy">Facile</span></td><td>À partir d'environ 20 $/mois + liquidité</td><td><a href="https://voltage.cloud/" target="_blank" rel="noopener noreferrer">Voltage</a> — LND hébergé avec infrastructure gérée</td></tr>
        </tbody>
      </table>

      <div class="callout important">
        <div class="callout-title">⚠️ Important</div>
        <p>Mostro requiert spécifiquement <strong>LND</strong> (pas CLN/Core Lightning, pas Eclair, pas LDK). Assurez-vous que votre nœud Lightning fait tourner LND.</p>
      </div>

      <p><strong>Ce dont vous avez besoin de votre nœud LND :</strong></p>
      <ul>
        <li>Le fichier <code>tls.cert</code> (un certificat de sécurité)</li>
        <li>Un fichier <code>mostro.macaroon</code> dédié (un jeton d'authentification avec uniquement les permissions dont Mostro a besoin, voir ci-dessous)</li>
        <li>L'adresse gRPC (typiquement <code>https://127.0.0.1:10009</code> si sur la même machine)</li>
      </ul>

      <p><strong>Générez un macaroon dédié pour Mostro.</strong> Ne donnez pas votre <code>admin.macaroon</code> à Mostro : il accorde un contrôle total sur votre nœud et ses fonds. Créez un macaroon ne contenant que les permissions que Mostro utilise réellement (lire les infos du nœud, créer/régler/annuler des hold invoices, envoyer et suivre des paiements).</p>
      <p>Choisissez d'abord un root key ID qui n'est pas déjà utilisé. Révoquer un macaroon révoque tous les macaroons partageant son ID : en réutiliser un emporterait des identifiants sans rapport. L'ID 0 appartient aux macaroons de LND, choisissez donc un nombre libre non nul et notez-le :</p>
      <pre><code>lncli listmacaroonids</code></pre>
      <p>Créez ensuite le macaroon avec l'ID choisi (<code>7</code> dans cet exemple, remplacez par le vôtre) :</p>
      <pre><code>lncli bakemacaroon --root_key_id 7 \\
  --save_to /root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon \\
  info:read invoices:read invoices:write offchain:read offchain:write</code></pre>
      <p>Ce macaroon ne peut ni ouvrir ou fermer des canaux, ni déplacer des fonds on-chain, ni modifier la configuration de votre nœud. En cas de fuite, révoquez-le avec <code>lncli deletemacaroonid 7</code>, en utilisant le même ID que celui de sa création, et créez-en un nouveau.</p>`,
    },
    'liquidity': {
      title: `2.3 Liquidité Lightning`,
      nav: `Liquidité`,
      html: `      <p>Pour faciliter les transactions, votre nœud Lightning a besoin de <strong>canaux</strong> avec du Bitcoin dedans. Pensez aux canaux Lightning comme des tunnels de paiement pré-financés. Le Bitcoin dans ces canaux est votre « liquidité ».</p>

      <p><strong>Combien en faut-il ?</strong></p>
      <table class="guide-table">
        <thead><tr><th>Volume de trading visé</th><th>Liquidité suggérée</th><th>BTC approximatif</th></tr></thead>
        <tbody>
          <tr><td>Petite communauté (quelques transactions/jour)</td><td>1–5 millions de sats</td><td>0.01–0.05 BTC</td></tr>
          <tr><td>Communauté moyenne</td><td>5–20 millions de sats</td><td>0.05–0.20 BTC</td></tr>
          <tr><td>Communauté active</td><td>20–100 millions de sats</td><td>0.20–1.0 BTC</td></tr>
        </tbody>
      </table>

      <div class="callout tip">
        <div class="callout-title">💡 Note sur la Liquidité Lightning</div>
        <p>Le Bitcoin dans vos canaux Lightning est bloqué <strong>onchain</strong> mais reste hautement dépensable via le Lightning Network. De nombreux services acceptent les paiements Lightning — des cafés aux fournisseurs VPS — rendant votre liquidité assez flexible pour un usage quotidien.</p>
      </div>

      <p><strong>Commencez petit, grandissez progressivement.</strong> Commencez avec suffisamment pour les besoins initiaux de votre communauté et surveillez les retours. Quand les traders signalent que les ordres échouent par manque de capacité, c'est votre signal pour en ajouter. Écoutez votre communauté.</p>

      <p><strong>Obtenir de la liquidité :</strong></p>
      <ul>
        <li>Ouvrez des canaux vers des nœuds bien connectés (utilisez <a href="https://lightningnetwork.plus/" target="_blank" rel="noopener noreferrer">Lightning Network+</a> ou <a href="https://amboss.space/" target="_blank" rel="noopener noreferrer">Amboss</a> pour trouver de bons pairs)</li>
        <li>Vous avez besoin de capacité <strong>sortante</strong> (pour payer les acheteurs) et de capacité <strong>entrante</strong> (pour recevoir des vendeurs)</li>
        <li>Obtenir de la liquidité entrante est généralement plus difficile — envisagez <a href="https://lightning.engineering/loop/" target="_blank" rel="noopener noreferrer">Lightning Loop</a>, <a href="https://amboss.space/magma" target="_blank" rel="noopener noreferrer">Magma</a>, ou des services d'échange de canaux</li>
      </ul>`,
    },
    'nostr-keys': {
      title: `2.4 Clés Nostr`,
      nav: `Clés Nostr`,
      html: `      <p>Votre nœud Mostro a besoin de sa propre identité sur le réseau Nostr — une paire de clés cryptographiques avec une clé publique (l'adresse de votre nœud) et une clé privée (votre secret).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Important</div>
        <p>Ne réutilisez jamais des clés Nostr entre instances de Mostro. Chaque nœud a besoin de sa propre identité unique.</p>
      </div>

      <p><strong>Générer des clés Nostr sécurisées localement avec rana :</strong></p>
      <pre><code># Installer Rust (si pas déjà installé)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Installer rana - générateur local de clés Nostr
cargo install rana

# Générer une nouvelle paire de clés (avec phrase mnémonique de 12 mots)
rana --generate 12</code></pre>

      <p>Rana générera votre clé privée (nsec), votre clé publique (npub) et une phrase mnémonique de sauvegarde. <strong>Conservez le tout en lieu sûr !</strong> Note : lancer <code>rana</code> sans arguments démarre le minage PoW (difficulté 10) qui peut prendre plusieurs minutes — utilisez <code>--generate</code> pour une génération instantanée. Ne générez jamais de clés importantes via des services en ligne.</p>`,
    },
    'skill-level': {
      title: `2.5 Niveau de connaissances techniques`,
      nav: `Niveau technique`,
      html: `      <table class="guide-table">
        <thead><tr><th>Tâche</th><th>Difficulté</th><th>Connaissances requises</th></tr></thead>
        <tbody>
          <tr><td>Louer un VPS</td><td><span class="badge badge-easy">Facile</span></td><td>Carte bancaire, navigation web basique</td></tr>
          <tr><td>Se connecter en SSH</td><td><span class="badge badge-easy">Facile</span></td><td>Suivre des instructions, taper des commandes</td></tr>
          <tr><td>Installer Docker</td><td><span class="badge badge-medium">Moyen</span></td><td>Copier-coller des commandes, dépannage basique</td></tr>
          <tr><td>Faire tourner Mostro (Docker)</td><td><span class="badge badge-medium">Moyen</span></td><td>Éditer des fichiers de configuration, comprendre les chemins</td></tr>
          <tr><td>Faire tourner Mostro (natif)</td><td><span class="badge badge-hard">Difficile</span></td><td>Administration Linux, compilation de logiciels, systemd</td></tr>
          <tr><td>Configurer LND depuis zéro</td><td><span class="badge badge-hard">Difficile</span></td><td>Connaissances significatives en Linux et réseaux</td></tr>
          <tr><td>Gérer la liquidité Lightning</td><td><span class="badge badge-hard">Difficile</span></td><td>Comprendre l'économie des canaux Lightning</td></tr>
        </tbody>
      </table>

      <p><strong>💡 Notre recommandation :</strong> Si votre communauté compte quelqu'un à l'aise avec la ligne de commande Linux, il peut gérer l'installation avec Docker. La compilation native nécessite de l'expérience en administration système. La configuration du nœud Lightning est la partie la plus complexe — envisagez de demander l'aide de quelqu'un d'expérimenté, ou d'utiliser une solution nœud-en-boîte.</p>`,
    },
    'setup': {
      title: `3. Installation Pas à Pas`,
      nav: `3. Installation pas à pas`,
      navShort: `3. Installation`,
      html: `      <p>Toutes les options d'installation partagent les mêmes premières étapes. Choisissez ensuite l'option qui vous convient :</p>
      <ul>
        <li><strong>Option A (Docker Hub) :</strong> La plus rapide. Pas de compilation, pas de clonage. <strong>Recommandée pour la plupart.</strong></li>
        <li><strong>Option B (Docker Build) :</strong> Vous construisez l'image localement depuis le dépôt.</li>
        <li><strong>Option C (Compilation native) :</strong> Plus de contrôle, mieux pour les administrateurs expérimentés.</li>
      </ul>

      <p>Toutes supposent que vous avez déjà : ✅ Un VPS avec Ubuntu · ✅ Un accès SSH · ✅ Un nœud LND fonctionnel.</p>`,
    },
    'common-steps': {
      title: `Étapes Communes (pour les 3 options)`,
      nav: `Étapes communes`,
      html: `      <h4>Étape 1 : Connectez-vous à votre VPS</h4>
      <pre><code>ssh root@VOTRE_ADRESSE_IP_VPS</code></pre>

      <h4>Étape 2 : Mettez à jour le système</h4>
      <pre><code># Télécharger les dernières informations de paquets
apt update

# Installer toutes les mises à jour disponibles
apt upgrade -y</code></pre>

      <h4>Étape 3 : Installer Docker et Docker Compose</h4>
      <div class="callout tip">
        <div class="callout-title">💡 Note</div>
        <p>Docker est nécessaire pour les options A et B. Si vous compilez manuellement (Option C), vous pouvez sauter cette étape.</p>
      </div>
      <pre><code># Installer Docker avec le script officiel
curl -fsSL https://get.docker.com | sh

# Vérifier que Docker est installé
docker --version

# Vérifier Docker Compose
docker compose version</code></pre>

      <h4>Étape 4 : Installer les outils supplémentaires</h4>
      <pre><code>apt install -y git make</code></pre>

      <p>✅ <strong>Étapes communes terminées.</strong> Choisissez maintenant votre option d'installation :</p>`,
    },
    'option-a': {
      title: `Option A : Docker Hub (La plus rapide — Recommandée)`,
      nav: `Option A : Docker Hub`,
      html: `      <p>Lancez Mostro directement depuis Docker Hub sans cloner le dépôt ni compiler. Parfait pour les déploiements sur VPS.</p>

      <h4>Étape 5 : Créer le répertoire de configuration</h4>
      <pre><code>mkdir -p ~/mostro-config/lnd</code></pre>

      <h4>Étape 6 : Obtenir le modèle de configuration</h4>
      <pre><code>curl -sL https://raw.githubusercontent.com/MostroP2P/mostro/{{version}}/settings.tpl.toml \\
  -o ~/mostro-config/settings.toml</code></pre>

      <h4>Étape 7 : Copier les identifiants LND</h4>
      <pre><code>cp /chemin/vers/votre/tls.cert ~/mostro-config/lnd/tls.cert
cp /chemin/vers/votre/mostro.macaroon ~/mostro-config/lnd/mostro.macaroon</code></pre>

      <p>Si LND est sur la <strong>même machine</strong>, les chemins typiques sont :</p>
      <ul>
        <li><code>/root/.lnd/tls.cert</code></li>
        <li><code>/root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon</code></li>
      </ul>

      <h4>Étape 8 : Modifier la configuration</h4>
      <pre><code>nano ~/mostro-config/settings.toml</code></pre>

      <p><strong>Modifications requises :</strong></p>
      <pre><code>[lightning]
lnd_cert_file = '/config/lnd/tls.cert'
lnd_macaroon_file = '/config/lnd/mostro.macaroon'
lnd_grpc_host = 'https://host.docker.internal:10009'  # Si LND sur le même VPS
# Ou utiliser 'https://VOTRE_IP_LND:10009' si LND sur un serveur différent

[database]
url = "sqlite:///config/mostro.db"  # mostrod utilise toujours &lt;répertoire-de-config&gt;/mostro.db

[nostr]
nsec_privkey = 'VOTRE_CLE_NSEC_ICI'
relays = ['wss://relay.mostro.network', 'wss://nos.lol']

[mostro]
fee = 0.006                    # 0.6% de frais par transaction
max_order_amount = 1000000     # Ordre maximum en sats
min_payment_amount = 100       # Ordre minimum en sats
fiat_currencies_accepted = ['USD', 'EUR']  # Vos devises</code></pre>

      <p>Enregistrer : <code>Ctrl+X</code>, puis <code>Y</code>, puis <code>Entrée</code>.</p>

      <h4>Étape 9 : Ajuster les permissions</h4>
      <div class="callout important">
        <div class="callout-title">⚠️ Important</div>
        <p>Évitez <code>chmod 777</code>. Utilisez des permissions minimales.</p>
      </div>
      <pre><code>sudo chown -R 1000:1000 ~/mostro-config
chmod 700 ~/mostro-config
chmod 600 ~/mostro-config/settings.toml
chmod 600 ~/mostro-config/lnd/mostro.macaroon</code></pre>

      <h4>Étape 10 : Lancer le conteneur</h4>
      <p><strong>Si LND est sur le même VPS :</strong></p>
      <pre><code>docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:{{version}}</code></pre>

      <p><strong>Si LND est sur un serveur différent :</strong></p>
      <pre><code>docker run -d --name mostro \\
  --restart unless-stopped \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:{{version}}</code></pre>

      <h4>Étape 11 : Vérifier les logs</h4>
      <pre><code>docker logs -f mostro</code></pre>

      <p>Recherchez ces messages :</p>
      <ul>
        <li><code>Settings correctly loaded!</code> — La configuration est valide</li>
        <li><code>Transport: nip44 (protocol v2, event kind 14)</code> — Protocole utilisé (voir 4.8)</li>
        <li><code>Connected to 'wss://...'</code> — Relais Nostr établi</li>
        <li><code>Recorded Lightning node identity &lt;pubkey&gt;</code> — LND joint (premier démarrage uniquement)</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Note</div>
        <p>Il n'existe pas de message « connecté à LND ». Mostro contacte LND pendant le démarrage : un daemon qui continue de tourner a donc une connexion fonctionnelle. L'échec, lui, est bruyant : il journalise <code>Ln node error</code> et s'arrête.</p>
      </div>

      <div class="callout tip">
        <div class="callout-title">💡 Dépannage</div>
        <p>Si vous voyez <code>Permission denied (os error 13)</code>, réajustez les permissions : <code>chown -R 1000:1000 ~/mostro-config</code> et redémarrez : <code>docker restart mostro</code>.</p>
      </div>

      <p>🎉 <strong>Félicitations !</strong> Si vous voyez des connexions réussies dans les logs, votre nœud Mostro fonctionne !</p>

      <h4>Mise à jour (Docker Hub)</h4>
      <pre><code>export MOSTRO_TAG={{version}}
docker pull mostrop2p/mostro:$MOSTRO_TAG
docker stop mostro
docker rm mostro
docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:$MOSTRO_TAG</code></pre>

      <div class="callout security">
        <div class="callout-title">🔒 Note de Sécurité</div>
        <p>Utilisez toujours un tag de version spécifique (ex. <code>mostrop2p/mostro:{{version}}</code>) au lieu de <code>:latest</code> pour contrôler les déploiements.</p>
      </div>`,
    },
    'option-b': {
      title: `Option B : Docker Build (Construire l'image localement)`,
      nav: `Option B : Docker Build`,
      html: `      <h4>Étape 5 : Télécharger Mostro</h4>
      <pre><code>cd /opt
git clone https://github.com/MostroP2P/mostro.git
cd mostro</code></pre>

      <h4>Étape 6 : Configurer les fichiers</h4>
      <pre><code>cd docker
mkdir -p config
cp ../settings.tpl.toml config/settings.toml</code></pre>

      <h4>Étape 7 : Modifier le fichier de configuration</h4>
      <pre><code>nano config/settings.toml</code></pre>
      <p>Modifiez les mêmes paramètres que dans l'Option A, Étape 8.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Si LND tourne sur le même VPS</div>
        <p>Contrairement à l'Option A, le <code>docker/compose.yml</code> du dépôt ne mappe pas <code>host.docker.internal</code> : sous Linux, ce nom ne se résout donc pas dans le conteneur. Ajoutez le mappage au service <code>mostro</code> avant de construire :</p>
        <pre><code>    extra_hosts:
      - "host.docker.internal:host-gateway"</code></pre>
        <p>Ou pointez <code>lnd_grpc_host</code> vers l'IP locale de l'hôte. Notez que <code>make docker-build</code> construit aussi l'image StartOS, dont un VPS n'a pas besoin : cela ne coûte que du temps de compilation.</p>
      </div>

      <h4>Étape 8 : Construire l'image Docker</h4>
      <pre><code>cd ..
LND_CERT_FILE=/root/.lnd/tls.cert \\
LND_MACAROON_FILE=/root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon \\
make docker-build</code></pre>

      <h4>Étape 9 : Démarrer Mostro</h4>
      <pre><code># Démarre Mostro et le relais inclus. \`make docker-up\` seul démarre
# aussi l'image StartOS, inutile sur un VPS.
docker compose -f docker/compose.yml up -d mostro nostr-relay

# Vérifier l'état
docker compose -f docker/compose.yml ps

# Voir les logs
docker compose -f docker/compose.yml logs -f mostro</code></pre>

      <p>🎉 <strong>Félicitations !</strong> Si vous voyez des connexions réussies, votre nœud Mostro fonctionne !</p>`,
    },
    'option-c': {
      title: `Option C : Compilation Native (Pour opérateurs techniques)`,
      nav: `Option C : Natif`,
      html: `      <h4>Étape 5 : Installer Rust</h4>
      <pre><code>curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source /root/.cargo/env
rustc --version
cargo --version</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Important</div>
        <p>N'installez PAS Rust via <code>apt install rustc</code>. Utilisez toujours <code>rustup</code>. Le paquet système est souvent obsolète.</p>
      </div>

      <h4>Étape 6 : Installer les dépendances de compilation</h4>
      <pre><code>apt install -y cmake build-essential libsqlite3-dev libssl-dev \\
  pkg-config git sqlite3 protobuf-compiler</code></pre>

      <h4>Étape 7 : Télécharger et compiler Mostro</h4>
      <pre><code>cd /opt
git clone https://github.com/MostroP2P/mostro.git
cd mostro
cargo build --release</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Conseil</div>
        <p>Si la compilation échoue par manque de RAM, ajoutez de l'espace swap :</p>
      </div>
      <pre><code>fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile</code></pre>

      <h4>Étapes 8–10 : Installer, initialiser et nettoyer</h4>
      <pre><code>install target/release/mostrod /usr/local/bin
cargo clean  # Économise 2+ Go d'espace</code></pre>

      <h4>Étapes 11–12 : Créer un utilisateur et configurer</h4>
      <pre><code>adduser --disabled-login mostro
mkdir -p /opt/mostro
cp settings.tpl.toml /opt/mostro/settings.toml
nano /opt/mostro/settings.toml</code></pre>
      <p>Modifiez les mêmes paramètres que dans l'Option A, Étape 8.</p>

      <h4>Étapes 13–15 : Test, permissions et service systemd</h4>
      <pre><code># Test d'exécution
/usr/local/bin/mostrod -d /opt/mostro

# Définir les permissions
chown -R mostro:mostro /opt/mostro</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 L'assistant de configuration interactif</div>
        <p>Si vous lancez <code>mostrod</code> sans <code>settings.toml</code> dans le répertoire visé et que vous êtes sur un terminal, il propose un menu de configuration capable de construire le fichier pour vous et d'écrire le nsec dans un <code>.env</code>. Sans terminal (Docker, systemd, CI), il copie le modèle, affiche où il l'a placé et s'arrête pour que vous l'éditiez.</p>
      </div>

      <p>Créer le service systemd :</p>
      <pre><code># /etc/systemd/system/mostro.service
[Unit]
Description=Mostro daemon
After=network.target

[Service]
Type=simple
User=mostro
WorkingDirectory=/home/mostro
Environment=RUST_LOG=info
ExecStart=/usr/local/bin/mostrod -d /opt/mostro
Restart=on-failure

[Install]
WantedBy=multi-user.target</code></pre>

      <pre><code>systemctl daemon-reload
systemctl enable mostro.service
systemctl start mostro.service
systemctl status mostro.service</code></pre>

      <p>🎉 <strong>Félicitations !</strong> Votre nœud Mostro tourne en tant que service système.</p>`,
    },
    'configuration': {
      title: `4. Configuration en Détail`,
      nav: `4. Configuration`,
      navShort: `4. Configuration`,
      html: `      <p>Le fichier <code>settings.toml</code> contrôle tout sur votre nœud Mostro.</p>`,
    },
    'cfg-nostr': {
      title: `4.1 Clés Nostr — L'identité de votre nœud`,
      nav: `Clés Nostr`,
      html: `      <pre><code>[nostr]
nsec_privkey = 'VOTRE_CLE_NSEC'
relays = [
  'wss://relay.mostro.network',
  'wss://nos.lol',
  'wss://relay.nostr.band'
]</code></pre>

      <p><strong>Quels relays utiliser ?</strong></p>
      <ul>
        <li><code>wss://relay.mostro.network</code> — Relay propre à Mostro, recommandé</li>
        <li><code>wss://nos.lol</code> — Relay fiable et bien connecté</li>
        <li>Ajoutez 3–5 relays pour la fiabilité. Plus de relays = meilleure disponibilité mais plus de bande passante.</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Conseil</div>
        <p>Vous pouvez aussi faire tourner votre propre relais Nostr à côté de Mostro. La voie Docker Build (Option B) en inclut un dans son <code>compose.yml</code> ; l'Option A et la compilation native non.</p>
      </div>


      <h4>Garder la clé hors de settings.toml</h4>
      <p>Mostro lit aussi la clé depuis la variable d'environnement <code>MOSTRO_NSEC_PRIVKEY</code>. L'ordre de priorité est : variable d'environnement, puis <code>&lt;répertoire-de-config&gt;/.env</code>, puis <code>settings.toml</code>.</p>
      <pre><code># ~/mostro-config/.env  (chmod 600) — chargé automatiquement au démarrage
MOSTRO_NSEC_PRIVKEY=nsec1...

# Docker
docker run -e MOSTRO_NSEC_PRIVKEY=nsec1... ...

# Unité systemd
Environment="MOSTRO_NSEC_PRIVKEY=nsec1..."</code></pre>
      <p>Laisser <code>nsec_privkey</code> dans <code>settings.toml</code> fonctionne toujours. Si vous utilisez le fichier <code>.env</code>, sauvegardez-le avec autant de soin que la configuration.</p>`,
    },
    'fees': {
      title: `4.2 Frais — Comment vous générez des revenus`,
      nav: `Frais`,
      html: `      <pre><code>[mostro]
fee = 0.006
dev_fee_percentage = 0.30</code></pre>

      <p><strong>Frais de transaction</strong> (<code>fee</code>) : Pourcentage prélevé par transaction, réparti entre acheteur et vendeur.</p>
      <ul>
        <li><code>0.006</code> = 0.6% (chaque partie paie 0.3%)</li>
        <li><code>0.01</code> = 1.0% (chaque partie paie 0.5%)</li>
        <li><code>0</code> = gratuit (bon pour développer votre base d'utilisateurs)</li>
      </ul>

      <p><strong>Exemple :</strong> Sur une transaction de 100 000 sats avec <code>fee = 0.006</code> : L'acheteur paie 300 sats, le vendeur paie 300 sats, votre nœud gagne 600 sats au total.</p>

      <p><strong>Frais de développement</strong> (<code>dev_fee_percentage</code>) : Un pourcentage de <em>vos</em> revenus de frais qui va au développement de Mostro.</p>
      <ul>
        <li><code>0.30</code> = 30% (par défaut) — sur 600 sats, 180 vont au fonds de développement</li>
        <li>Minimum : 10% (<code>0.10</code>), Maximum : 100% (<code>1.0</code>)</li>
        <li>Payé par votre nœud sur ses revenus, non facturé aux utilisateurs</li>
        <li>Tous les paiements sont vérifiables publiquement via des événements Nostr (kind 8383)</li>
      </ul>

      <div class="callout important">
        <div class="callout-title">📝 Note</div>
        <p>Définir <code>dev_fee_percentage</code> en dessous de <code>0.10</code> empêchera Mostro de démarrer. Ce minimum assure un financement durable du développement.</p>
      </div>`,
    },
    'limits': {
      title: `4.3 Limites d'ordres et devises`,
      nav: `Limites`,
      html: `      <pre><code>[mostro]
max_order_amount = 1000000
min_payment_amount = 100
max_orders_per_response = 10
fiat_currencies_accepted = ['USD', 'EUR', 'ARS', 'CUP']</code></pre>

      <ul>
        <li><strong><code>max_order_amount</code> :</strong> Transaction maximale en satoshis. Configurez-la en fonction de la capacité de vos canaux Lightning.</li>
        <li><strong><code>min_payment_amount</code> :</strong> Transaction minimale en satoshis. 1 000 ou 10 000 est plus pratique que 100.</li>
        <li><strong><code>max_orders_per_response</code> :</strong> Nombre maximum d'ordres que Mostro renvoie en une seule requête. Si un utilisateur accumule plus d'ordres que cette limite (par exemple lors de la restauration de sa session depuis le client mobile), il recevra une erreur <code>cant-do: too_many_requests</code> et ne pourra pas récupérer ses ordres. Si vos utilisateurs tradent fréquemment, augmentez cette valeur (par exemple 50 ou 100). La valeur par défaut de 10 peut être insuffisante.</li>
        <li><strong><code>fiat_currencies_accepted</code> :</strong> Utilisez les <a href="https://en.wikipedia.org/wiki/ISO_4217" target="_blank" rel="noopener noreferrer">codes ISO 4217</a>. Un tableau vide <code>[]</code> accepte toutes les devises.</li>
      </ul>`,
    },
    'profile': {
      title: `4.4 Profil du nœud (Optionnel mais recommandé)`,
      nav: `Profil du nœud`,
      html: `      <pre><code>[mostro]
name = "LatAm Mostro"
about = "Exchange P2P de Bitcoin pour l'Amérique latine. Support en espagnol."
picture = "https://exemple.com/votre-logo.png"
website = "https://site-de-votre-communaute.com"</code></pre>

      <p>Ceux-ci configurent le profil de votre Mostro sur Nostr (NIP-01 kind 0 metadata). Les clients affichent ces informations pour que les utilisateurs sachent sur quel Mostro ils échangent.</p>`,
    },
    'timeouts': {
      title: `4.5 Délais et expiration`,
      nav: `Délais`,
      html: `      <pre><code>[mostro]
expiration_hours = 24        # Durée pendant laquelle un ordre reste ouvert
expiration_seconds = 900     # Temps pour compléter (15 min)
hold_invoice_expiration_window = 300  # Délai dont dispose le preneur pour payer la facture ou en fournir une de paiement (5 min)</code></pre>`,
    },
    'antispam': {
      title: `4.6 Anti-Spam`,
      nav: `Anti-Spam`,
      html: `      <pre><code>[mostro]
pow = 0  # 0 = désactivé ; 10-20 = modéré. Commencez avec 0.</code></pre>`,
    },
    'rpc': {
      title: `4.7 Interface RPC d'Administration (Optionnel)`,
      nav: `RPC Admin`,
      html: `      <pre><code>[rpc]
enabled = false
listen_address = "127.0.0.1"
port = 50051
# auth_token = "une-longue-chaine-aleatoire"</code></pre>

      <p>Cette interface gRPC sert aux outils de l'opérateur : <code>grpcurl</code>, et <code>mostro-cli</code> pour le mode maintenance (<code>admsetmaintenance</code>, <code>admmaintenancestatus</code>, <code>admcancelpending</code>). Mostrix ne l'utilise <strong>pas</strong> : il passe par Nostr, vous n'avez donc pas besoin du RPC pour résoudre les litiges.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Sécurité</div>
        <p>Gardez <code>listen_address</code> sur <code>"127.0.0.1"</code> et n'exposez jamais le port à internet. Définissez <code>auth_token</code> dès que le port est joignable autrement que depuis la machine locale, par exemple via un tunnel SSH ou un conteneur sidecar : une connexion transférée arrive en loopback, l'adresse d'écoute ne constitue donc pas une autorisation. Avec un token défini, chaque appel modifiant l'état doit porter l'en-tête <code>authorization: Bearer &lt;token&gt;</code>.</p>
      </div>`,
    },
    'transport': {
      title: `4.8 Protocole de Transport`,
      nav: `Transport`,
      html: `      <p>Un nœud Mostro parle <strong>un seul</strong> protocole, choisi ici :</p>
      <pre><code>[mostro]
transport = "nip44"</code></pre>

      <table class="guide-table">
        <thead><tr><th>Valeur</th><th>Protocole</th><th>Kind visible sur le relais</th><th>Statut</th></tr></thead>
        <tbody>
          <tr><td><code>"nip44"</code></td><td>v2 — événements kind 14 signés, contenu chiffré NIP-44</td><td><code>14</code></td><td>Par défaut, y compris pour une config sans ligne <code>transport</code></td></tr>
          <tr><td><code>"gift-wrap"</code></td><td>v1 — gift wraps NIP-59</td><td><code>1059</code></td><td>Déprécié, opt-in uniquement, supprimé en v0.19.0</td></tr>
        </tbody>
      </table>

      <p>Votre nœud annonce le protocole qu'il parle dans son événement d'info kind 38385 : les clients compatibles choisissent donc le bon format d'eux-mêmes. Mostro Mobile, Mostrix et mostro-cli prennent en charge v2.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Uniquement si vous devez servir d'anciens clients</div>
        <p>N'écrivez <code>transport = "gift-wrap"</code> que pour continuer à servir les clients limités au protocole v1 pendant la transition. Ce mode n'est jamais sélectionné automatiquement et disparaît en v0.19.0, après quoi votre nœud ne tourne qu'en v2. Laissez la valeur par défaut sauf raison précise.</p>
      </div>

      <p>Le transport v2 permet aussi un filtre anti-spam plus fin que celui de 4.6. <code>pow</code> s'applique à tous les messages, tandis que <code>pow_first_contact</code> ne s'applique qu'aux expéditeurs étrangers à une transaction active et est vérifié avant déchiffrement. Les transactions en cours restent ainsi peu coûteuses, alors que les inconnus doivent fournir un vrai travail :</p>
      <pre><code>[mostro]
pow = 0                  # transactions en cours
pow_first_contact = 16   # nouveaux ordres et prises depuis des clés inconnues</code></pre>`,
    },
    'ln-safety': {
      title: `4.9 Limites de Sécurité Lightning`,
      nav: `Limites Lightning`,
      html: `      <p>Ces réglages de <code>[lightning]</code> bornent la durée pendant laquelle vos canaux peuvent rester verrouillés et le nombre de paiements non résolus simultanés. Ils ont tous une valeur par défaut : un fichier de configuration d'une version antérieure démarre donc toujours, mais un modèle récent les inclut et il vaut la peine de les connaître.</p>

      <pre><code>[lightning]
max_final_cltv_expiry_delta = 144
escrow_deadline_margin_blocks = 24
max_inflight_payouts = 100
max_inflight_payouts_per_destination = 10
payment_cltv_limit = 1008
allow_node_change = false</code></pre>

      <table class="guide-table">
        <thead><tr><th>Réglage</th><th>Ce qu'il protège</th></tr></thead>
        <tbody>
          <tr><td><code>max_final_cltv_expiry_delta</code></td><td>Rejette une facture de paiement dont le CLTV final laisserait le bénéficiaire retenir vos sats trop longtemps. 144 blocs (environ un jour) est le maximum demandé par les vrais portefeuilles. Ne le mettez jamais à 0 : cela rejette toutes les factures.</td></tr>
          <tr><td><code>escrow_deadline_margin_blocks</code></td><td>Marge de sécurité avant que LND n'annule automatiquement une hold invoice acceptée. Doit dépasser confortablement le <code>invoices.holdexpirydelta</code> de votre nœud, qui vaut 12 par défaut.</td></tr>
          <tr><td><code>max_inflight_payouts</code></td><td>Plafond de paiements non résolus sur l'ensemble du nœud, pour qu'un bénéficiaire qui ne règle jamais ne puisse pas épuiser vos slots HTLC. Un paiement freiné est retardé, jamais abandonné.</td></tr>
          <tr><td><code>max_inflight_payouts_per_destination</code></td><td>Le même plafond par pubkey de destination, et le plus efficace des deux.</td></tr>
          <tr><td><code>payment_cltv_limit</code></td><td>Plafond du timelock total d'une route de paiement. Ne doit pas dépasser le <code>--max-cltv-expiry</code> de votre LND et doit se situer au moins 576 blocs au-dessus de <code>max_final_cltv_expiry_delta</code>, sinon les paiements légitimes échouent avec « no route ».</td></tr>
          <tr><td><code>allow_node_change</code></td><td>Garde-fou au démarrage en cas de changement de nœud Lightning. Laissez-le à <code>false</code> et voyez 5.8.</td></tr>
        </tbody>
      </table>

      <p>Notez aussi que <code>max_routing_fee</code>, dans le bloc <code>[mostro]</code>, vaut désormais <code>0.002</code> (0,2 %) par défaut.</p>`,
    },
    'price': {
      title: `4.10 Sources de Prix du Bitcoin`,
      nav: `Sources de prix`,
      html: `      <p>Mostro a besoin d'un taux BTC/fiat pour valoriser les ordres. Sans bloc <code>[price]</code>, il utilise une seule source, Yadio, via le désormais déprécié <code>bitcoin_price_api_url</code>. Ajouter le bloc vous donne plusieurs sources, combinées par médiane avec écartement des valeurs aberrantes : une API en panne ou renvoyant un mauvais chiffre ne déplace donc pas vos prix.</p>

      <pre><code>[price]
update_interval_seconds = 300
max_price_staleness_seconds = 1800
outlier_threshold_pct = 5.0        # écarte une source à cette distance de la médiane (3+ sources requises)
provider_timeout_seconds = 10
provider_failure_threshold = 3     # échecs avant mise en pause d'une source
provider_failure_cooldown_seconds = 120
publish_to_nostr = true            # publie les taux agrégés en kind 30078

[price.providers.yadio]
enabled = true
url = "https://api.yadio.io"

[price.providers.coingecko]
enabled = true
url = "https://api.coingecko.com/api/v3"
# api_key = "CG-xxxx"              # facultatif, relève les limites de débit

[price.providers.currency_api]
enabled = true
url = "https://currency-api.pages.dev/v1"
fallback_urls = ["https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1"]
except = ["CUP", "MLC"]            # taux officiel seulement, à ne pas mélanger aux sources informelles

[price.providers.blockchain]
enabled = true
url = "https://blockchain.info"</code></pre>

      <p>Chaque source accepte <code>only</code> ou <code>except</code> pour limiter les devises auxquelles elle contribue, et <code>fallback_urls</code> pour des miroirs essayés quand l'URL principale échoue. Une source activée à laquelle manque un secret requis échoue au démarrage plutôt que de ne produire aucune cotation en silence.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Si les API de prix sont bloquées dans votre pays</div>
        <p>Vous pouvez prendre les taux sur Nostr plutôt qu'en HTTP, publiés par des nœuds Mostro auxquels vous faites confiance. Cela réutilise les relais déjà présents dans <code>[nostr]</code> et fonctionne donc partout où votre nœud atteint déjà un relais. Avec plusieurs nœuds de confiance, l'événement valide le plus récent l'emporte.</p>
        <pre><code>[price.providers.nostr]
enabled = true
trusted_nodes = [
    # pubkeys hex des nœuds Mostro auxquels vous faites confiance pour des taux exacts
]</code></pre>
      </div>

      <p>Les opérateurs servant le peso cubain peuvent ajouter El Toque pour le CUP et le MLC du marché informel. C'est un opt-in, limité à ces deux devises, et il faut un token gratuit : un El Toque activé sans <code>token</code> refuse de démarrer.</p>`,
    },
    'optional-blocks': {
      title: `4.11 Autres Blocs Facultatifs`,
      nav: `Blocs facultatifs`,
      html: `      <p>Trois autres blocs que vous pouvez rencontrer dans un modèle récent. Aucun n'est obligatoire.</p>

      <p><strong>Rétention des événements.</strong> Combien de temps Mostro conserve chaque type d'événement avant expiration. Omettez le bloc entièrement pour accepter les valeurs par défaut.</p>
      <pre><code>[expiration]
order_days = 30        # événements d'ordres (kind 38383)
rating_days = 90       # historique de réputation (kind 38384)
dispute_days = 90      # litiges, conservés plus longtemps pour l'audit (kind 38386)
fee_audit_days = 365   # transparence des frais (kind 8383)
dm_days = 30           # messages directs du protocole v2 (kind 14)</code></pre>

      <p><strong>Les cautions anti-abus</strong> (<code>[anti_abuse_bond]</code>) peuvent exiger une caution par hold invoice des preneurs, des créateurs ou des deux, pour qu'abandonner une transaction ait un coût. Désactivé par défaut et encore déployé par phases. Lisez le <code>docs/ANTI_ABUSE_BOND.md</code> du projet avant de l'activer sur un nœud en production.</p>

      <p><strong>L'escrow Cashu</strong> (<code>[cashu]</code>) est un mode expérimental qui fonctionne sans LND et place l'escrow dans des tokens Cashu sur une seule mint. Il n'est pas encore utilisable pour de vraies transactions, les actions de trade sont toujours refusées, et il ne peut pas être combiné aux cautions anti-abus. Mentionné ici pour que vous sachiez de quoi il s'agit en le voyant.</p>`,
    },
    'operating': {
      title: `5. Exploitation de Votre Nœud Mostro`,
      nav: `5. Exploitation du nœud`,
      navShort: `5. Exploitation`,
      html: ``,
    },
    'disputes': {
      title: `5.1 Comment fonctionnent les litiges`,
      nav: `Litiges`,
      html: `      <p>Les litiges sont votre responsabilité opérationnelle la plus importante.</p>

      <p><strong>Quand les litiges surviennent-ils ?</strong></p>
      <ul>
        <li>L'acheteur dit qu'il a payé, le vendeur dit qu'il n'a pas reçu</li>
        <li>Le vendeur refuse de libérer les Bitcoin après avoir reçu le paiement</li>
        <li>L'une des parties cesse de répondre</li>
      </ul>

      <p><strong>Le processus de litige :</strong></p>
      <ol>
        <li><strong>L'utilisateur ouvre un litige</strong> — L'une des parties clique sur « Litige » dans le client</li>
        <li><strong>Mostro marque l'ordre</strong> — Le statut passe à « Litige », les fonds restent bloqués</li>
        <li><strong>L'arbitre prend le cas</strong> — Un admin assigné à votre nœud enquête</li>
        <li><strong>Investigation</strong> — Communication avec les deux parties, demande de preuves</li>
        <li><strong>Résolution</strong> — L'arbitre décide : libérer vers l'acheteur, ou rembourser le vendeur</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Important</div>
        <p>Choisissez vos arbitres avec soin. Ils ont le pouvoir de décider où vont les fonds bloqués. Choisissez des membres de confiance et impartiaux de la communauté. 2-3 arbitres sont recommandés.</p>
      </div>


      <h4>Niveaux de permission des solveurs</h4>

      <p>Un solveur peut être enregistré en lecture seule ou avec les pleins pouvoirs. Les deux niveaux peuvent prendre un litige et parler aux parties, mais seul un solveur read-write peut décider où va l'argent.</p>

      <table class="guide-table">
        <thead><tr><th>Enregistré comme</th><th>Peut</th><th>Ne peut pas</th></tr></thead>
        <tbody>
          <tr><td><code>npub1...:read</code></td><td>Prendre un litige, le lire, écrire aux deux parties</td><td>Régler ou annuler l'ordre</td></tr>
          <tr><td><code>npub1...:read-write</code></td><td>Tout, y compris régler et annuler</td><td>—</td></tr>
        </tbody>
      </table>

      <p>Un <code>npub1...</code> nu sans suffixe devient read-write par défaut, de même que l'enregistrement via l'interface RPC. Commencez un nouvel arbitre en <code>:read</code> le temps qu'il apprenne le processus, puis réenregistrez-le en read-write quand vous avez confiance en son jugement.</p>`,
    },
    'mostrix': {
      title: `5.2 Mostrix — Votre outil d'administration`,
      nav: `Mostrix`,
      html: `      <p>Mostrix est un client basé sur le terminal (TUI) pour la résolution des litiges. Si vous faites tourner un nœud Mostro, vous avez besoin de Mostrix.</p>

      <h4>Option A : Télécharger le binaire pré-compilé (Recommandé)</h4>
      <p>Téléchargez la dernière version pour votre plateforme depuis <a href="https://github.com/MostroP2P/mostrix/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a> :</p>

      <pre><code># Linux (x86_64)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-unknown-linux-musl
chmod +x mostrix-x86_64-unknown-linux-musl
./mostrix-x86_64-unknown-linux-musl

# Linux (ARM64 / Raspberry Pi 4)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-unknown-linux-musl
chmod +x mostrix-aarch64-unknown-linux-musl
./mostrix-aarch64-unknown-linux-musl

# Windows
# Téléchargez mostrix-x86_64-pc-windows-gnu.exe depuis la page des releases</code></pre>

      <div class="callout tip">
        <div class="callout-title">🔐 Vérifiez la Release</div>
        <p>Vérifiez toujours le binaire avant de l'exécuter. Importez les clés des mainteneurs une seule fois :</p>
        <pre><code>curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/negrunch.asc | gpg --import
curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/arkanoider.asc | gpg --import</code></pre>
        <p>Les signatures sont des fichiers détachés nommés <code>manifest.txt.sig.&lt;mainteneur&gt;</code>. Toutes les releases ne portent pas les deux : consultez la page de la release et téléchargez celles qui y figurent réellement :</p>
        <pre><code>wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt
wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt.sig.arkanoider

# Vérifiez chaque signature téléchargée
gpg --verify manifest.txt.sig.arkanoider manifest.txt

# Puis comparez l'empreinte du binaire au manifest
shasum -a 256 mostrix-x86_64-unknown-linux-musl
grep mostrix-x86_64-unknown-linux-musl manifest.txt</code></pre>
        <p>Une signature valide provenant d'une clé de mainteneur que vous jugez fiable suffit. Si un <code>wget</code> renvoie 404, c'est simplement que cette signature n'a pas été publiée pour cette release : ne prenez pas un fichier absent pour un fichier vérifié.</p>
      </div>

      <h4>Option B : Compiler depuis le code source</h4>
      <p>Si vous préférez compiler depuis le code source ou avez besoin d'une plateforme non disponible dans les releases :</p>

      <pre><code># Installer les dépendances (Ubuntu/Debian)
sudo apt install -y cmake build-essential pkg-config

# Installer Rust (si pas déjà installé)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Cloner et compiler
git clone https://github.com/MostroP2P/mostrix.git
cd mostrix
cargo build --release

# Exécuter
./target/release/mostrix</code></pre>

      <h4>Premier lancement et configuration</h4>
      <p>Au premier lancement, Mostrix <strong>génère automatiquement</strong> un fichier <code>~/.mostrix/settings.toml</code> avec des valeurs par défaut raisonnables, incluant une nouvelle paire de clés Nostr. Votre <code>npub</code> généré sera affiché dans le terminal.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Important : Configurez votre pubkey Mostro</div>
        <p>La configuration auto-générée utilise la <strong>pubkey officielle de Mostro</strong> par défaut. Vous devez la changer pour la <strong>pubkey de votre propre nœud Mostro</strong> :</p>
        <pre><code># Éditer la configuration
nano ~/.mostrix/settings.toml

# Changez cette ligne pour la pubkey de VOTRE nœud Mostro :
mostro_pubkey = "VOTRE_PUBKEY_MOSTRO_HEX"</code></pre>
      </div>

      <p>Pour le mode admin (résolution des litiges), configurez également :</p>
      <pre><code># ~/.mostrix/settings.toml
mostro_pubkey = "VOTRE_PUBKEY_MOSTRO_HEX"
nsec_privkey = "nsec1votre_cle_personnelle"  # Auto-générée au premier lancement
admin_privkey = "nsec1votre_cle_admin"        # Le nsec du daemon lui-même — voir ci-dessous
relays = ["wss://relay.mostro.network"]
currencies_filter = []                        # Vide = afficher toutes les devises
user_mode = "admin"                           # Activer le mode admin</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Quelle clé mettre dans admin_privkey ?</div>
        <p>Mostro reconnaît l'opérateur par sa <strong>propre</strong> clé : <code>admin_privkey</code> doit donc être le <code>nsec_privkey</code> du daemon, celui dont la pubkey figure dans <code>mostro_pubkey</code>. Une clé personnelle est rejetée.</p>
        <p>Cette clé est l'identité de votre nœud : évitez de la transporter sur un ordinateur portable. Enregistrez plutôt une clé de solveur distincte et utilisez-la pour les litiges. Seule la clé de l'opérateur peut ajouter des solveurs :</p>
        <pre><code>ADMIN_NSEC=nsec1... mostro-cli admaddsolver -n npub1solver...</code></pre>
        <p>L'option <strong>Settings → Add Dispute Solver</strong> de Mostrix fait la même chose.</p>
      </div>`,
    },
    'watchdog': {
      title: `5.3 mostro-watchdog — Notifications de litiges sur Telegram`,
      nav: `mostro-watchdog`,
      html: `      <p><code>mostro-watchdog</code> surveille votre nœud Mostro pour les litiges et envoie des alertes instantanées par Telegram. Essentiel pour des temps de réponse rapides.</p>

      <p><strong>Option A : Installation automatique (Recommandée)</strong></p>
      <pre><code># Téléchargez et exécutez le script d'installation
curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash</code></pre>

      <p><strong>Option B : Téléchargement manuel du binaire</strong></p>
      <pre><code># Linux x86_64 (Intel/AMD)
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/mostro-watchdog-linux-x86_64
chmod +x mostro-watchdog-linux-x86_64
sudo mv mostro-watchdog-linux-x86_64 /usr/local/bin/mostro-watchdog

# Linux ARM64 (Raspberry Pi, serveurs ARM)
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/mostro-watchdog-linux-aarch64
chmod +x mostro-watchdog-linux-aarch64
sudo mv mostro-watchdog-linux-aarch64 /usr/local/bin/mostro-watchdog</code></pre>

      <p><strong>Option C : Compiler depuis les sources</strong></p>
      <pre><code>git clone https://github.com/MostroP2P/mostro-watchdog.git
cd mostro-watchdog
cargo build --release
sudo cp target/release/mostro-watchdog /usr/local/bin/</code></pre>

      <p><strong>Configuration :</strong></p>
      <pre><code>cp config.example.toml config.toml
nano config.toml</code></pre>

      <pre><code>[mostro]
pubkey = "VOTRE_PUBKEY_MOSTRO"

[nostr]
relays = ["wss://relay.mostro.network", "wss://nos.lol"]

[telegram]
bot_token = "VOTRE_TOKEN_BOT"
chat_id = -1001234567890</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Conseil</div>
        <p>Faites tourner <code>mostro-watchdog</code> comme service systemd à côté de votre nœud Mostro pour une surveillance 24h/24 et 7j/7.</p>
      </div>`,
    },
    'monitoring': {
      title: `5.4 Surveillance de la disponibilité`,
      nav: `Surveillance`,
      html: `      <p>Votre nœud doit fonctionner 24h/24 et 7j/7.</p>

      <pre><code># Natif
systemctl status mostro.service
journalctl -u mostro -f
journalctl -u mostro | grep -E "(error|warn|connected)" --ignore-case

# Docker Hub (Option A)
docker ps --filter name=mostro
docker logs -f mostro

# Docker Build (Option B)
docker compose -f /opt/mostro/docker/compose.yml ps
docker compose -f /opt/mostro/docker/compose.yml logs -f mostro</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Conseil pro</div>
        <p>Configurez une surveillance simple avec <a href="https://uptimerobot.com/" target="_blank" rel="noopener noreferrer">UptimeRobot</a> (gratuit) ou une tâche cron qui vous alerte si Mostro tombe en panne.</p>
      </div>


      <h4>Vérifier votre nœud depuis l'extérieur</h4>
      <p>Votre nœud republie un événement d'info (kind 38385) qui le décrit : frais, devises, version de protocole, indicateur de maintenance. Le lire depuis un relais est le moyen le plus rapide de confirmer que le monde extérieur voit bien ce que vous croyez.</p>
      <pre><code>cargo install nostreq nostcat
nostreq --kinds 38385 --limit 1 --authors VOTRE_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq</code></pre>`,
    },
    'updating': {
      title: `5.5 Mettre à jour Mostro`,
      nav: `Mise à jour`,
      html: `      <p><strong>Docker Hub :</strong></p>
      <pre><code>export MOSTRO_TAG={{version}}
docker stop mostro
docker rm mostro
docker pull mostrop2p/mostro:$MOSTRO_TAG
docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:$MOSTRO_TAG</code></pre>

      <p><strong>Docker Build :</strong></p>
      <pre><code>cd /opt/mostro
git fetch --tags
git checkout {{version}}
make docker-build
make docker-down
make docker-up</code></pre>

      <p><strong>Natif :</strong></p>
      <pre><code>cd /opt/mostro
git fetch --tags
git checkout {{version}}
cargo build --release
install target/release/mostrod /usr/local/bin
cargo clean
systemctl restart mostro.service</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Conseil</div>
        <p>Sauvegardez toujours votre base de données avant de mettre à jour.</p>
      </div>

      <div class="callout important">
        <div class="callout-title">⚠️ Ne changez pas de nœud Lightning en même temps</div>
        <p>Mettre Mostro à jour est sûr à tout moment. Le pointer vers un <strong>autre</strong> nœud Lightning ne l'est pas : videz l'escrow d'abord, voyez 5.8.</p>
      </div>`,
    },
    'backups': {
      title: `5.6 Sauvegardes`,
      nav: `Sauvegardes`,
      html: `      <p>Fichiers critiques à sauvegarder : <code>settings.toml</code>, le fichier <code>.env</code> si vous y gardez votre nsec (voir 4.1), et <code>mostro.db</code> (historique des ordres, réputation).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Ne copiez pas une base active avec cp</div>
        <p>SQLite fonctionne en mode WAL : les écritures récentes vivent dans <code>mostro.db-wal</code> jusqu'à leur consolidation. Copier seulement <code>mostro.db</code> pendant que Mostro tourne peut produire une sauvegarde privée des transactions les plus récentes. Utilisez la commande de sauvegarde propre à SQLite, sûre sur une base active et qui écrit un fichier unique et cohérent.</p>
      </div>

      <pre><code># Sauvegarde manuelle — Docker Hub :
mkdir -p /root/mostro-backups
sqlite3 ~/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp ~/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp ~/mostro-config/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null

# Sauvegarde manuelle — Native :
sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)</code></pre>

      <p><strong>Sauvegarde quotidienne automatique</strong> (à ajouter au crontab avec <code>crontab -e</code>) :</p>
      <pre><code># Docker Hub (Option A) :
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /root/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /root/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d)

# Native (Option C) / Docker Build (Option B) :
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d)</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Critique</div>
        <p>Votre <code>nsec_privkey</code> dans <code>settings.toml</code> EST l'identité de votre nœud. Si vous la perdez, vous perdez votre réputation et tous les utilisateurs doivent se reconnecter à une nouvelle identité. <strong>Conservez une copie hors ligne.</strong></p>
      </div>`,
    },
    'activity': {
      title: `5.7 Vérifier l'activité des transactions`,
      nav: `Activité`,
      html: `      <pre><code># Compter tous les ordres
sqlite3 /chemin/vers/mostro.db "SELECT COUNT(*) FROM orders;"

# Transactions réussies récentes
sqlite3 /chemin/vers/mostro.db "SELECT id, fiat_code, fiat_amount, amount, fee, status, created_at FROM orders WHERE status = 'success' ORDER BY created_at DESC LIMIT 10;"

# Ordres en attente
sqlite3 /chemin/vers/mostro.db "SELECT id, fiat_code, fiat_amount, status, created_at FROM orders WHERE status = 'pending';"

# Revenus des frais : orders.fee stocke la moitié de chaque partie, donc les frais bruts du nœud sont fee*2 et le dev fee en est déduit
sqlite3 /chemin/vers/mostro.db "SELECT SUM(fee*2) AS gross_fees, SUM(dev_fee) AS dev_fees, SUM(fee*2 - COALESCE(dev_fee, 0)) AS net_fees FROM orders WHERE status = 'success';"</code></pre>`,
    },
    'ln-migration': {
      title: `5.8 Mode Maintenance et Changement de Nœud Lightning`,
      nav: `Changer de nœud LN`,
      html: `      <p>Les hold invoices, les cautions et les paiements en vol appartiennent au nœud Lightning qui les a créés. Pointer Mostro vers un autre nœud alors que l'un d'eux est encore ouvert laisserait ces transactions en suspens : le daemon <strong>refuse donc de démarrer</strong> quand il voit une nouvelle identité LND avec de l'escrow encore lié à l'ancienne :</p>
      <pre><code>REFUSING TO START: Lightning node changed from ... but escrow is still bound to the old node</code></pre>

      <p>Le mode maintenance permet de vider d'abord. Tant qu'il est actif, les nouveaux ordres et prises sont refusés et les transactions ouvertes continuent, afin que l'escrow puisse se régler. Il exige l'interface RPC activée (voir 4.7).</p>

      <ol>
        <li>Annoncez la fenêtre à vos utilisateurs bien à l'avance.</li>
        <li>Activez le mode maintenance : <code>mostro-cli admsetmaintenance -e true -r "LN node migration"</code>.</li>
        <li>Interrogez <code>mostro-cli admmaintenancestatus</code> jusqu'à ce qu'il indique <code>drained = true</code>. Les ordres en attente expirent d'eux-mêmes ; pour raccourcir la vidange, vous pouvez en annuler un avec <code>mostro-cli admcancelpending -o &lt;order-id&gt;</code>, ce qui libère aussitôt la caution du créateur. Annoncez-le d'abord, c'est l'ordre de l'utilisateur. Clôturez les litiges de longue durée comme d'habitude.</li>
        <li>Gardez l'<strong>ancien</strong> nœud en ligne tout du long. Il doit encore terminer les paiements en vol.</li>
        <li>Arrêtez Mostro et sauvegardez <code>mostro.db</code>.</li>
        <li>Pointez <code>[lightning]</code> vers le nouveau nœud et laissez <code>allow_node_change = false</code>.</li>
        <li>Démarrez Mostro. Il enregistre la nouvelle pubkey. Désactivez le mode maintenance et testez avec un ordre.</li>
        <li>Ce n'est qu'alors que vous pouvez décommissionner l'ancien nœud.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ allow_node_change</div>
        <p>Ne le passez à <code>true</code> que pour une reprise après sinistre, quand l'ancien nœud est définitivement perdu. Cela laisse sciemment les transactions concernées non résolues. Déplacer le même nœud vers un autre hôte n'est pas un changement de nœud et ne nécessite rien de tout cela.</p>
      </div>`,
    },
    'operator-cli': {
      title: `5.9 Commandes d'Opérateur avec mostro-cli`,
      nav: `CLI opérateur`,
      html: `      <p>Mostrix est la façon confortable de traiter les litiges, mais <code>mostro-cli</code> couvre le même terrain depuis un shell et possède quelques commandes que Mostrix n'a pas. Les commandes de litige sont signées avec une clé Nostr passée en <code>ADMIN_NSEC</code>, qui doit être celle du daemon lui-même ou celle d'un solveur enregistré.</p>

      <pre><code># Traitement des litiges (via Nostr, nécessite ADMIN_NSEC)
export ADMIN_NSEC=nsec1...
mostro-cli listdisputes
mostro-cli admtakedispute -d &lt;dispute-id&gt;
mostro-cli admsenddm -p &lt;npub&gt; -m "message à une partie"
mostro-cli admsettle -o &lt;order-id&gt;      # libérer vers l'acheteur
mostro-cli admcancel -o &lt;order-id&gt;      # rembourser le vendeur

# Enregistrer un arbitre, éventuellement en lecture seule
mostro-cli admaddsolver -n npub1...:read</code></pre>

      <p>Un autre groupe de commandes passe par le gRPC d'administration plutôt que par Nostr : elles nécessitent <code>MOSTRO_RPC_URL</code> et <code>MOSTRO_RPC_TOKEN</code> au lieu d'<code>ADMIN_NSEC</code>, et l'interface RPC activée (voir 4.7).</p>

      <pre><code>export MOSTRO_RPC_URL=http://127.0.0.1:50051
export MOSTRO_RPC_TOKEN=votre-token-auth

mostro-cli admsetmaintenance -e true -r "motif"
mostro-cli admmaintenancestatus
mostro-cli admcancelpending -o &lt;order-id&gt;</code></pre>

      <p><code>admcancelpending</code> mérite d'être connu en dehors d'une migration. Il annule un ordre encore en attente ou attendant la caution d'un preneur, prévient le créateur et libère toutes ses cautions d'un coup. Utilisez-le pour un ordre clairement abandonné ou mal valorisé, et prévenez le créateur d'abord : c'est son ordre, et ce n'est pas une résolution de litige.</p>`,
    },
    'costs': {
      title: `6. Détail des Coûts`,
      nav: `6. Détail des coûts`,
      navShort: `6. Coûts`,
      html: `      <h3>Coûts opérationnels mensuels</h3>
      <table class="guide-table">
        <thead><tr><th>Poste</th><th>Coût mensuel</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>VPS (serveur)</td><td>10–24 $</td><td>Dépend du fournisseur et des spécifications</td></tr>
          <tr><td>Nom de domaine (optionnel)</td><td>1–2 $</td><td>Pour un site web/identité</td></tr>
          <tr><td>Frais onchain des canaux Lightning</td><td>Variable</td><td>Ouverture/fermeture de canaux</td></tr>
          <tr><td><strong>Total mensuel</strong></td><td><strong>11–26 $</strong></td><td>Hors liquidité Lightning</td></tr>
        </tbody>
      </table>

      <h3>Coûts uniques / de capital</h3>
      <table class="guide-table">
        <thead><tr><th>Poste</th><th>Coût</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Liquidité Lightning</td><td>0.01–1.0+ BTC</td><td>Bloqué dans les canaux ; récupéré à la fermeture</td></tr>
          <tr><td>Matériel du nœud (si auto-hébergé)</td><td>0–600 $</td><td>Gratuit si VPS ; 300-600 $ pour Start9/Umbrel</td></tr>
          <tr><td>Temps de configuration</td><td>4–16 heures</td><td>Selon le niveau d'expérience</td></tr>
        </tbody>
      </table>

      <h3>Potentiel de revenus</h3>
      <table class="guide-table">
        <thead><tr><th>Volume mensuel</th><th>Frais (0.6%)</th><th>Contribution dev (30%)</th><th>Revenu net</th></tr></thead>
        <tbody>
          <tr><td>1 000 $</td><td>~6 $</td><td>~1,80 $</td><td>~4,20 $</td></tr>
          <tr><td>10 000 $</td><td>~60 $</td><td>~18 $</td><td>~42 $</td></tr>
          <tr><td>50 000 $</td><td>~300 $</td><td>~90 $</td><td>~210 $</td></tr>
          <tr><td>100 000 $</td><td>~600 $</td><td>~180 $</td><td>~420 $</td></tr>
        </tbody>
      </table>

      <div class="callout important">
        <div class="callout-title">📝 Réalité</div>
        <p>La plupart des nœuds nouveaux mettent des mois à construire du volume. N'attendez pas de rentabilité immédiate. La vraie valeur vient souvent du service rendu à votre communauté, les frais étant un bonus.</p>
      </div>

      <h3>Engagement en temps</h3>
      <table class="guide-table">
        <thead><tr><th>Tâche</th><th>Fréquence</th><th>Temps</th></tr></thead>
        <tbody>
          <tr><td>Surveillance (vérifier les logs, le statut)</td><td>Quotidien</td><td>5–10 min</td></tr>
          <tr><td>Résolution de litiges</td><td>Selon les besoins</td><td>15–60 min par litige</td></tr>
          <tr><td>Mises à jour</td><td>Mensuel</td><td>15–30 min</td></tr>
          <tr><td>Gestion de la liquidité</td><td>Hebdomadaire</td><td>15–30 min</td></tr>
          <tr><td><strong>Estimation hebdomadaire totale</strong></td><td></td><td><strong>1–3 heures</strong></td></tr>
        </tbody>
      </table>`,
    },
    'faq': {
      title: `7. Questions Fréquentes`,
      nav: `7. Questions fréquentes`,
      navShort: `7. FAQ`,
      html: `      <h3>Faut-il être développeur pour faire tourner un nœud Mostro ?</h3>
      <p>Non, mais vous devez être à l'aise avec les opérations basiques en ligne de commande (taper des commandes, éditer des fichiers texte). La voie Docker (Option A) est conçue pour être accessible.</p>

      <h3>Puis-je faire tourner Mostro sur un Raspberry Pi ?</h3>
      <p>Techniquement oui (via Start9 ou similaire), mais ce n'est pas recommandé pour la production en raison des limitations de CPU et de RAM. Un VPS est plus fiable.</p>

      <h3>Puis-je utiliser Core Lightning (CLN) au lieu de LND ?</h3>
      <p>Non. Mostro ne supporte actuellement que LND, car il dépend de l'implémentation spécifique des hold invoices de LND. Le support d'autres implémentations pourrait arriver à l'avenir.</p>

      <h3>Comment les utilisateurs se connectent-ils à mon Mostro ?</h3>
      <p>Les utilisateurs ont besoin d'une application cliente Mostro (comme Mostro Mobile ou mostro-cli) et de la clé publique de votre Mostro (npub). Ils ajoutent votre npub dans leur client, et le client communique via les relays Nostr. Aucune connexion directe n'est nécessaire.</p>

      <h3>Puis-je faire tourner plusieurs instances de Mostro ?</h3>
      <p>Oui, mais chacune nécessite sa propre paire de clés Nostr, son nœud LND (ou au moins des canaux/liquidité séparés) et sa configuration.</p>

      <h3>Est-ce légal ?</h3>
      <p>Cela dépend beaucoup de votre juridiction. Mostro est un logiciel d'échange peer-to-peer. Dans certaines juridictions, opérer un exchange P2P peut nécessiter des licences. <strong>Consultez les réglementations locales et un conseiller juridique.</strong></p>

      <h3>Quelle bande passante utilise Mostro ?</h3>
      <p>Très peu — principalement de petits événements Nostr. Quelques Go par mois est typique même avec un volume modéré.</p>

      <h3>Que se passe-t-il si mon nœud se déconnecte ?</h3>
      <p>Les ordres en attente finissent par expirer. Les transactions actives avec des fonds bloqués continuent quand vous revenez en ligne. Si vous êtes hors ligne trop longtemps, les utilisateurs peuvent perdre confiance. Depuis la v0.18.3, il existe aussi une échéance pour l'escrow : si le nœud reste hors ligne assez longtemps pour que la hold invoice approche son horizon CLTV, LND l'annule et le vendeur est remboursé automatiquement.</p>

      <h3>Puis-je changer ma clé Nostr après ?</h3>
      <p>Vous pouvez, mais vous perdrez l'identité et la réputation de votre nœud. Les utilisateurs le verront comme un nouveau Mostro. Traitez votre clé comme votre identité de marque.</p>

      <h3>Puis-je perdre de l'argent en faisant tourner un nœud Mostro ?</h3>
      <p>Oui, c'est possible : les fonds dans les canaux Lightning pourraient être à risque à cause de bugs (rare) ; la fermeture forcée de canaux pendant des périodes de frais élevés peut être coûteuse ; les coûts VPS sont continus.</p>

      <h3>La liquidité Lightning est-elle « à risque » ?</h3>
      <p>Votre liquidité Lightning est la vôtre. Elle n'est pas en danger à cause de Mostro en soi — les hold invoices sont des blocages temporaires. Cependant, les risques standard du Lightning Network s'appliquent (fermetures forcées, canaux bloqués, bugs).</p>

      <h3>Quand atteindrai-je le seuil de rentabilité ?</h3>
      <p>Cela dépend de vos coûts et du volume de transactions. Avec 20 $/mois de coûts et 0.6% de frais, vous avez besoin d'environ 5 000 $/mois en transactions pour couvrir les coûts (avant la contribution au développement). La plupart des communautés mettent 3–6 mois à atteindre un volume significatif.</p>

      <h3>Puis-je déplacer Mostro vers un autre nœud Lightning ?</h3>
      <p>Oui, mais pas en modifiant la configuration puis en redémarrant. L'escrow est lié au nœud qui l'a créé : on le vide d'abord en mode maintenance, et le daemon refuse de démarrer si vous sautez cette étape. Déplacer le même nœud vers un autre hôte n'est pas un changement de nœud et ne demande rien de particulier. Voyez 5.8.</p>`,
    },
    'security': {
      title: `8. Considérations de Sécurité`,
      nav: `8. Sécurité`,
      navShort: `8. Sécurité`,
      html: `      <div class="callout important">
        <div class="callout-title">⚠️ Avertissement — logiciel en phase précoce</div>
        <p><strong>Mostro est en phase précoce de développement.</strong> Bien que l'équipe travaille dur pour assurer la fiabilité, des bugs non découverts peuvent exister — y compris des bugs de sécurité pouvant entraîner une perte de fonds. <strong>Les développeurs ne sont pas responsables de toute perte d'argent due à des bugs logiciels.</strong></p>
        <p>Mostro est open source et son code est ouvert aux audits. Nous encourageons les communautés à promouvoir et financer des audits de sécurité indépendants.</p>
        <p>Cela dit, <strong>le mécanisme central de séquestre utilisant les hold invoices Lightning a été éprouvé depuis 2021</strong>, quand @lnp2pBot a implémenté pour la première fois ce type de séquestre. Des milliers de transactions ont été réalisées avec succès.</p>
      </div>

      <h3>Gardez la Clé de Votre Nœud Hors d'Atteinte</h3>

      <p>Votre <code>nsec_privkey</code> est l'identité de votre nœud, et quiconque la détient peut usurper votre Mostro. Préférez la fournir par la variable d'environnement <code>MOSTRO_NSEC_PRIVKEY</code> ou par un fichier <code>.env</code> en <code>chmod 600</code> plutôt que de la laisser dans <code>settings.toml</code> (voir 4.1). Ne l'emportez pas non plus sur un portable pour traiter les litiges : enregistrez une clé de solveur distincte pour cela (voir 5.2).</p>

      <h3>Opérer sous des régimes autoritaires</h3>

      <p>Si vous opérez dans un pays avec un gouvernement autoritaire, <strong>la confidentialité n'est pas optionnelle — c'est une exigence de sécurité.</strong></p>

      <ol>
        <li><strong>Faites tourner votre nœud Mostro derrière Tor et/ou un VPN.</strong> Cela masque l'IP de votre serveur vis-à-vis des relays Nostr.</li>
        <li><strong>Si Tor/VPN n'est pas possible</strong> (courant dans les pays en développement avec un internet lent), <strong>publiez uniquement des événements sur des relays que vous possédez ou en lesquels vous avez confiance.</strong></li>
        <li><strong>Soyez très prudent avec les relays que vous utilisez.</strong> À l'avenir, les gouvernements pourraient créer des relays Nostr spécifiquement pour collecter des adresses IP.</li>
        <li><strong>Pensez également à la confidentialité de votre nœud Lightning.</strong> Faire tourner LND derrière Tor est possible et recommandé dans les environnements sensibles.</li>
      </ol>

      <div class="callout tip">
        <div class="callout-title">💡 Conseil</div>
        <p>La beauté de Mostro étant décentralisé est que même si un nœud est arrêté, les autres continuent de fonctionner. Mais la prévention est toujours préférable à la guérison. Prenez la confidentialité au sérieux dès le premier jour.</p>
      </div>`,
    },
    'troubleshooting': {
      title: `9. Dépannage`,
      nav: `9. Dépannage`,
      navShort: `9. Dépannage`,
      html: `      <h3>Mostro ne démarre pas</h3>

      <h4><code>dev_fee_percentage (0.05) is below minimum (0.1)</code></h4>
      <p>Définissez <code>dev_fee_percentage</code> à au moins <code>0.10</code> dans settings.toml.</p>

      <h4>Fichier de configuration ou base de données introuvable</h4>
      <p>Assurez-vous que le flag <code>-d</code> pointe vers le répertoire contenant <code>settings.toml</code>. Pour Docker Hub : vérifiez que <code>~/mostro-config/settings.toml</code> existe.</p>

      <h4>Mostro s'arrête au démarrage avec <code>Ln node error</code></h4>
      <ul>
        <li>Vérifiez que LND tourne : <code>lncli getinfo</code></li>
        <li>Vérifiez que <code>lnd_grpc_host</code> correspond à l'adresse de votre LND</li>
        <li>Vérifiez que les chemins de <code>tls.cert</code> et <code>mostro.macaroon</code> sont corrects</li>
        <li>Vérifiez que le macaroon porte bien les permissions de 2.2</li>
        <li>Docker + LND sur l'hôte : utilisez <code>host.docker.internal</code>. L'Option B exige en plus le mappage <code>extra_hosts</code>.</li>
      </ul>

      <h4><code>REFUSING TO START: Lightning node changed</code></h4>
      <p>Mostro pointe vers une autre identité LND alors que de l'escrow est encore ouvert sur l'ancienne. Reconnectez l'ancien nœud et videz-le avant de changer. Voyez 5.8.</p>

      <h4>Les clients ne voient pas mes ordres, ou ne peuvent pas écrire à mon nœud</h4>
      <p>Vérifiez la ligne <code>Transport:</code> dans vos logs. Un nœud en <code>nip44</code> est invisible pour les clients limités au protocole v1, et un nœud en <code>gift-wrap</code> est invisible pour les clients v2. Voyez 4.8.</p>

      <h4>Les paiements échouent avec « no route »</h4>
      <p>Vérifiez <code>payment_cltv_limit</code>. Il doit se situer au moins 576 blocs au-dessus de <code>max_final_cltv_expiry_delta</code> et ne pas dépasser le <code>--max-cltv-expiry</code> de votre LND. Voyez 4.9.</p>

      <h3>Problèmes de connexion</h3>

      <h4>Mostro démarre mais ne se connecte pas aux relays</h4>
      <ul>
        <li>Vérifiez les URLs des relays (doivent commencer par <code>wss://</code>)</li>
        <li>Assurez-vous que le pare-feu de votre VPS autorise les connexions sortantes sur le port 443</li>
        <li>Essayez avec différents relays — certains peuvent être temporairement en panne</li>
      </ul>

      <h3>Problèmes de transactions</h3>

      <h4>Un utilisateur reçoit "cant-do: too_many_requests" lors de la restauration de session</h4>
      <p>Cela se produit lorsque l'utilisateur a plus d'ordres (historiques + actifs) que la valeur de <code>max_orders_per_response</code> dans votre configuration. Le client essaie de récupérer tous ses ordres d'un coup et Mostro le rejette. <strong>Ce n'est pas un bannissement ni un blocage temporaire</strong> — cela continuera tant que vous n'ajustez pas la valeur.</p>
      <pre><code># Dans settings.toml, augmentez la limite :
max_orders_per_response = 50  # 10 par défaut, maximum 255
</code></pre>

      <p>La valeur tient sur un seul octet : <code>255</code> est donc le plafond. Si un utilisateur a plus d'ordres que cela, il doit purger son historique plutôt que vous continuiez à relever la limite.</p>

      <h4>Les ordres n'apparaissent pas dans les clients</h4>
      <ul>
        <li>Vérifiez les connexions aux relays dans les logs</li>
        <li>Assurez-vous que les clients utilisent les mêmes relays que votre nœud</li>
      </ul>

      <h4>Paiements échouant</h4>
      <ul>
        <li>Vérifiez la liquidité : <code>lncli listchannels</code></li>
        <li>Assurez-vous d'avoir suffisamment de capacité sortante</li>
        <li>Vérifiez le paramètre <code>max_routing_fee</code></li>
      </ul>

      <h3>Problèmes de base de données</h3>

      <h4>Erreurs de base de données verrouillée</h4>
      <pre><code>ps aux | grep mostrod
# S'il y a plusieurs processus, supprimez les extras :
kill &lt;PID&gt;</code></pre>

      <h3>Obtenir de l'aide</h3>

      <ol>
        <li><strong>Vérifiez les logs d'abord</strong> — la plupart des erreurs expliquent ce qui a mal tourné</li>
        <li><strong>Telegram (Développeurs) :</strong> <a href="https://t.me/mostro_dev" target="_blank" rel="noopener noreferrer">@mostro_dev</a></li>
        <li><strong>Telegram (Communauté) :</strong> <a href="https://t.me/MostroP2P" target="_blank" rel="noopener noreferrer">@MostroP2P</a></li>
        <li><strong>GitHub Issues :</strong> <a href="https://github.com/MostroP2P/mostro/issues" target="_blank" rel="noopener noreferrer">github.com/MostroP2P/mostro/issues</a></li>
        <li><strong>DeepWiki :</strong> <a href="https://deepwiki.com/MostroP2P/mostro" target="_blank" rel="noopener noreferrer">deepwiki.com/MostroP2P/mostro</a></li>
      </ol>

      <p>Quand vous demandez de l'aide, incluez toujours : votre version de Mostro, les logs pertinents, et ce que vous avez déjà essayé.</p>

      <!-- ===== APPENDIX ===== -->`,
    },
    'appendix': {
      title: `Annexe : Référence Rapide`,
      nav: `Annexe`,
      html: `      <h3>Emplacements importants des fichiers</h3>
      <table class="guide-table">
        <thead><tr><th>Fichier</th><th>Docker Hub</th><th>Natif</th></tr></thead>
        <tbody>
          <tr><td>Configuration</td><td><code>~/mostro-config/settings.toml</code></td><td><code>/opt/mostro/settings.toml</code></td></tr>
          <tr><td>Base de données</td><td><code>~/mostro-config/mostro.db</code></td><td><code>/opt/mostro/mostro.db</code></td></tr>
          <tr><td>Cert LND</td><td><code>~/mostro-config/lnd/tls.cert</code></td><td>Variable (voir config LND)</td></tr>
          <tr><td>Macaroon LND</td><td><code>~/mostro-config/lnd/mostro.macaroon</code></td><td>Variable (voir config LND)</td></tr>
          <tr><td>Service</td><td>N/A</td><td><code>/etc/systemd/system/mostro.service</code></td></tr>
          <tr><td>Logs</td><td><code>docker logs -f mostro</code></td><td><code>journalctl -u mostro</code></td></tr>
        </tbody>
      </table>

      <h3>Commandes essentielles</h3>
      <pre><code># Docker
docker logs -f mostro         # Voir les logs
docker restart mostro          # Redémarrer
docker stop mostro             # Arrêter

# Natif (systemd)
systemctl start mostro         # Démarrer
systemctl stop mostro          # Arrêter
systemctl restart mostro       # Redémarrer
systemctl status mostro        # Voir le statut
journalctl -u mostro -f        # Voir les logs

# Base de données
sqlite3 mostro.db "SELECT COUNT(*) FROM orders;"                           # Total des ordres
sqlite3 mostro.db "SELECT COUNT(*) FROM orders WHERE status='success';"    # Transactions réussies
sqlite3 mostro.db "SELECT SUM(fee*2 - COALESCE(dev_fee, 0)) FROM orders WHERE status='success';"  # Frais nets conservés par le nœud</code></pre>

      <h3>Configuration recommandée pour les nouveaux nœuds</h3>
      <pre><code>[mostro]
fee = 0.006
max_order_amount = 500000
min_payment_amount = 1000
expiration_hours = 24
expiration_seconds = 900
pow = 0
dev_fee_percentage = 0.30
fiat_currencies_accepted = ['USD']  # Changez pour votre devise locale

[nostr]
relays = [
  'wss://relay.mostro.network',
  'wss://nos.lol',
  'wss://relay.nostr.band'
]</code></pre>`,
    },
  },
};

export default fr;
