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
        <li><strong>Revenus de frais</strong> — Chaque transaction vous rapporte les frais que vous fixez (le modèle de configuration est livré à 0 ; 0.6% est un choix courant). À 0.6%, une communauté qui réalise 10 000 $ de transactions mensuelles gagne environ 60 $/mois en frais.</li>
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

      <p>Ces chiffres valent pour Mostro seul. Si LND tourne sur le même VPS, ajoutez au moins 2 Go de RAM, ainsi que le disque dont a besoin son backend Bitcoin (voir 2.2).</p>

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
          <tr><td>Faire tourner LND sur le même VPS</td><td><span class="badge badge-hard">Difficile</span></td><td>VPS plus gros + liquidité</td><td>4 Go+ de RAM, et du disque pour le backend Bitcoin (voir ci-dessous)</td></tr>
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

      <p><strong>Générez un macaroon dédié pour Mostro.</strong> Ne donnez pas votre <code>admin.macaroon</code> à Mostro : il accorde un contrôle total sur votre nœud et ses fonds. Créez un macaroon ne contenant que les permissions que Mostro utilise réellement (lire les infos du nœud, lister les canaux pour le rapport de santé, créer/régler/annuler des hold invoices, envoyer et suivre des paiements).</p>
      <p>Choisissez d'abord un root key ID qui n'est pas déjà utilisé. Révoquer un macaroon révoque tous les macaroons partageant son ID : en réutiliser un emporterait des identifiants sans rapport. L'ID 0 appartient aux macaroons de LND, choisissez donc un nombre libre non nul et notez-le :</p>
      <pre><code>lncli listmacaroonids</code></pre>
      <p>Créez ensuite le macaroon avec l'ID choisi (<code>7</code> dans cet exemple, remplacez par le vôtre) :</p>
      <pre><code>lncli bakemacaroon --root_key_id 7 \\
  --save_to /root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon \\
  info:read invoices:read invoices:write offchain:read offchain:write</code></pre>
      <p>Ce macaroon ne peut ni ouvrir ou fermer des canaux, ni déplacer des fonds on-chain, ni modifier la configuration de votre nœud. En cas de fuite, révoquez-le avec <code>lncli deletemacaroonid 7</code>, en utilisant le même ID que celui de sa création, et créez-en un nouveau.</p>

      <p><strong>Si vous ne pouvez pas écrire dans le répertoire de données de LND</strong> (un conteneur, un nœud-en-boîte, un nœud hébergé), omettez <code>--save_to</code> : <code>lncli</code> affiche alors le macaroon en hexadécimal, et vous le convertissez en fichier là où Mostro tourne. <code>lncli</code> peut aussi le créer depuis une autre machine, en pointant vers le nœud avec ses identifiants admin :</p>
      <pre><code>lncli --rpcserver=NODE_ADDRESS:10009 --tlscertpath=tls.cert --macaroonpath=admin.macaroon \\
  bakemacaroon --root_key_id 7 info:read invoices:read invoices:write offchain:read offchain:write
# copiez l'hexadécimal affiché, puis :
echo "PASTE_THE_HEX_HERE" | xxd -r -p > mostro.macaroon   # apt install -y xxd si absent</code></pre>

      <h4>Comment Mostro se connecte à LND</h4>
      <p>Mostro parle au port gRPC de LND (10009 par défaut) et s'authentifie avec <code>tls.cert</code> et le macaroon. Trois choses à savoir avant de choisir où faire tourner LND :</p>
      <ul>
        <li><strong>Par défaut, LND n'écoute que sur <code>localhost</code>.</strong> Un Mostro sur la même machine l'atteint à <code>https://127.0.0.1:10009</code> ; tout le reste (un conteneur Docker, un autre serveur) demande les étapes supplémentaires ci-dessous.</li>
        <li><strong>Mostro épingle le certificat.</strong> Il accepte exactement le certificat de <code>tls.cert</code> et ignore le nom d'hôte, donc vous n'avez pas besoin de <code>tlsextraip</code> ni de <code>tlsextradomain</code>. Mais si LND régénère son certificat (il expire après environ 14 mois), copiez le nouveau <code>tls.cert</code> vers Mostro et redémarrez-le, sinon il s'arrête au démarrage avec <code>Ln node error</code>.</li>
        <li><strong>Pas de Tor pour ce lien.</strong> Mostro ne peut pas joindre LND via Tor ni via un proxy SOCKS. Un LND distant doit être joignable par le réseau : utilisez un VPN.</li>
      </ul>

      <h4>LND sur le même VPS</h4>
      <p>Installez LND en suivant le guide officiel (<a href="https://docs.lightning.engineering/lightning-network-tools/lnd/run-lnd" target="_blank" rel="noopener noreferrer">docs.lightning.engineering</a>), avec ses binaires de release. LND a besoin d'une vue de la chaîne Bitcoin, et ce choix détermine la taille de votre VPS :</p>
      <table class="guide-table">
        <thead><tr><th>Backend</th><th>Disque</th><th>Compromis</th></tr></thead>
        <tbody>
          <tr><td><code>bitcoind</code>, nœud complet</td><td>Plus de 700 Go</td><td>Le plus robuste. La synchronisation initiale prend des jours.</td></tr>
          <tr><td><code>bitcoind</code>, élagué</td><td>Des dizaines de Go</td><td>Supporté par LND et robuste ; la synchronisation initiale prend toujours des jours.</td></tr>
          <tr><td><code>neutrino</code></td><td>Quelques Go</td><td>Pas de nœud Bitcoin et un démarrage rapide, mais dépend des pairs auprès desquels il se synchronise. Un nœud neutrino bloqué pendant environ 21 heures est la raison pour laquelle Mostro surveille désormais la synchronisation de LND (5.4). Si vous l'utilisez, pointez-le vers des nœuds Bitcoin de confiance avec <code>neutrino.connect</code> et configurez les alertes de santé.</td></tr>
        </tbody>
      </table>
      <p>Rendez ensuite LND joignable depuis Mostro. Avec l'installation native (Option C), rien ne change : utilisez <code>https://127.0.0.1:10009</code>. Avec Docker (Options A et B), le conteneur est un hôte distinct, choisissez donc l'une des deux voies :</p>
      <ul>
        <li><strong>Réseau hôte (le plus simple).</strong> Lancez le conteneur avec <code>--network host</code> au lieu de <code>--add-host=host.docker.internal:host-gateway</code> (dans compose, <code>network_mode: host</code> au lieu de <code>extra_hosts</code>) et définissez <code>lnd_grpc_host = 'https://127.0.0.1:10009'</code>. LND continue de n'écouter que sur <code>localhost</code>.</li>
        <li><strong>Gardez le réseau bridge</strong> et <code>host.docker.internal</code>, comme dans l'Option A. LND doit alors écouter au-delà de <code>localhost</code> (ajoutez <code>rpclisten=0.0.0.0:10009</code> à <code>lnd.conf</code>) et votre pare-feu doit garder le port 10009 fermé à Internet, par exemple <code>ufw allow from 172.16.0.0/12 to any port 10009 proto tcp</code> suivi de <code>ufw deny 10009/tcp</code>.</li>
      </ul>

      <h4>LND sur un autre serveur ou à la maison</h4>
      <p>Reliez les deux machines avec un VPN comme <a href="https://www.wireguard.com/" target="_blank" rel="noopener noreferrer">WireGuard</a> ou <a href="https://tailscale.com/" target="_blank" rel="noopener noreferrer">Tailscale</a>, faites écouter LND sur son adresse VPN (<code>rpclisten=VPN_IP:10009</code>) et définissez <code>lnd_grpc_host = 'https://VPN_IP:10009'</code>. Copiez <code>tls.cert</code> et le macaroon sur le serveur Mostro. Ouvrir le port 10009 à Internet fonctionne aussi, mais le macaroon est alors la seule barrière entre le monde et votre nœud : évitez-le. Un nœud à la maison doit rester en ligne 24h/24, 7j/7 : une coupure de courant ou une connexion qui tombe laisse les transactions de vos utilisateurs en attente.</p>

      <h4>Nœud-en-boîte (Start9, Umbrel, RaspiBlitz)</h4>
      <p>Ces systèmes installent et mettent à jour LND pour vous, généralement sur un petit ordinateur à la maison. Sur <strong>StartOS</strong>, le plus simple est le paquet Mostro lui-même, qui se connecte au service LND de la même boîte. Pour utiliser le LND de la boîte depuis un Mostro sur un VPS, utilisez la configuration VPN ci-dessus. Chaque système affiche les détails de connexion de LND dans sa propre interface (sur StartOS, dans les propriétés du service LND) ; <code>lncli</code> s'exécute généralement dans le conteneur LND — sur Umbrel, par exemple, <code>sudo docker exec -it lightning_lnd_1 lncli ...</code> (vérifiez le nom avec <code>sudo docker ps</code>). Créez le macaroon en hexadécimal comme montré plus haut.</p>

      <h4>Voltage (LND hébergé)</h4>
      <p>Voltage fait tourner LND pour vous. Téléchargez <code>tls.cert</code> et le macaroon admin depuis le tableau de bord du nœud, utilisez-les uniquement pour créer le macaroon restreint de Mostro depuis votre propre machine (voir plus haut), et faites pointer <code>lnd_grpc_host</code> vers l'adresse gRPC affichée par le tableau de bord, port 10009. Vous fournissez et gérez toujours la liquidité.</p>

      <h4>Réglages de LND qui affectent Mostro</h4>
      <ul>
        <li><code>invoices.holdexpirydelta</code> (par défaut 12) : si vous l'augmentez, augmentez <code>escrow_deadline_margin_blocks</code> pour qu'il reste d'au moins 6 blocs au-dessus (4.9).</li>
        <li><code>max-cltv-expiry</code> (par défaut 2016) : le <code>payment_cltv_limit</code> de Mostro ne doit pas le dépasser (4.9).</li>
        <li>Gardez en sécurité la seed du portefeuille de LND et la sauvegarde des canaux : voir 5.6.</li>
      </ul>`,
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
        <li>Vous avez besoin de capacité <strong>sortante</strong> (pour payer les acheteurs) et de capacité <strong>entrante</strong> (pour recevoir des vendeurs). Chaque transaction reçoit d'abord les sats du vendeur, puis paie l'acheteur : gardez donc au moins votre <code>max_order_amount</code> (4.3) de capacité dans chaque direction</li>
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
      <p><strong>Si LND est sur le même VPS</strong> (LND doit accepter la connexion du conteneur, ou utilisez plutôt le réseau hôte : voir 2.2) :</p>
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
        <li><code>Mostro pubkey: npub1... (hex ...)</code> — L'identité de votre nœud. Notez le npub : c'est ce dont les utilisateurs et les autres outils ont besoin</li>
        <li><code>Settings correctly loaded!</code> — La configuration est valide</li>
        <li><code>Transport: nip44 (protocol v2, event kind 14)</code> — Protocole utilisé (voir 4.8)</li>
        <li><code>Recorded Lightning node identity &lt;pubkey&gt;</code> — LND joint (premier démarrage uniquement)</li>
        <li><code>Published health event: status ok, seq N</code> — Répété chaque minute. Au moins un relais a accepté le rapport de santé du nœud (voir 5.4)</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Note</div>
        <p>Il n'existe pas de message « connecté à LND » ni « connecté au relais ». Mostro contacte LND pendant le démarrage : un daemon qui passe le démarrage a donc joint LND. L'échec, lui, est bruyant : il journalise <code>Ln node error</code> et s'arrête. Après le démarrage, il interroge LND toutes les 15 secondes et journalise <code>LND did not answer GetInfo</code> s'il cesse de répondre ; les paiements sortants attendent alors son retour (5.4). Pour les relais, la ligne de l'événement de santé est votre signal : <code>No relay accepted the health event</code> signifie qu'aucun ne l'a accepté.</p>
      </div>

      <div class="callout tip">
        <div class="callout-title">💡 Dépannage</div>
        <p>Si vous voyez <code>Permission denied (os error 13)</code>, réajustez les permissions : <code>chown -R 1000:1000 ~/mostro-config</code> et redémarrez : <code>docker restart mostro</code>.</p>
      </div>

      <p>🎉 <strong>Félicitations !</strong> Si vous voyez des connexions réussies dans les logs, votre nœud Mostro fonctionne !</p>

      <h4>Alternative : Docker Compose</h4>
      <p>Au lieu d'une longue commande <code>docker run</code>, vous pouvez décrire le conteneur dans un fichier compose. Il lance la même image avec les mêmes réglages, et la mise à jour se résume à changer le tag sur une ligne. Créez <code>~/mostro-docker/compose.yml</code> :</p>
      <pre><code>mkdir -p ~/mostro-docker
nano ~/mostro-docker/compose.yml</code></pre>
      <pre><code>services:
  mostro:
    image: mostrop2p/mostro:{{version}}
    container_name: mostro
    restart: unless-stopped
    extra_hosts:
      - "host.docker.internal:host-gateway"  # seulement si LND tourne sur ce VPS
    volumes:
      - \${HOME}/mostro-config:/config</code></pre>
      <p>Démarrez-le et suivez les logs :</p>
      <pre><code>docker compose -f ~/mostro-docker/compose.yml up -d
docker compose -f ~/mostro-docker/compose.yml logs -f mostro</code></pre>
      <p>Choisissez l'un ou l'autre : <code>docker run</code> <strong>ou</strong> compose, pas les deux. Pour mettre à jour l'un ou l'autre, voyez 5.5.</p>

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
      <p>Modifiez les mêmes paramètres que dans l'Option A, Étape 8, avec une différence : <code>make docker-build</code> copie votre macaroon vers <code>config/lnd/admin.macaroon</code>, quel que soit son nom d'origine ; faites donc pointer Mostro vers ce fichier :</p>
      <pre><code>lnd_macaroon_file = '/config/lnd/admin.macaroon'  # c'est toujours votre mostro.macaroon restreint, sous un autre nom</code></pre>

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
        <li>Envoyé automatiquement à l'adresse Lightning <code>dev@pay.mostro.foundation</code> ; il n'y a rien à configurer</li>
        <li>Payé uniquement quand votre LND tourne sur <strong>mainnet</strong>. Sur testnet, signet ou regtest, les montants sont toujours calculés, mais rien n'est payé et le log indique <code>dev fee payments are disabled</code></li>
        <li>Un paiement échoué est retenté pour chaque ordre, à intervalles d'une minute jusqu'à une heure</li>
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
        <li><strong><code>min_payment_amount</code> :</strong> Transaction minimale en satoshis. 1 000 ou 10 000 est plus pratique que 100. Les deux limites sont vérifiées sur les sats que l'ordre déplace réellement, prime ou décote comprise.</li>
        <li><strong><code>max_orders_per_response</code> :</strong> Nombre maximum d'ordres que Mostro renvoie en une seule requête. Si un utilisateur accumule plus d'ordres que cette limite (par exemple lors de la restauration de sa session depuis le client mobile), il recevra une erreur <code>cant-do: too_many_requests</code> et ne pourra pas récupérer ses ordres. Si vos utilisateurs tradent fréquemment, augmentez cette valeur (par exemple 50 ou 100). La valeur par défaut de 10 peut être insuffisante.</li>
        <li><strong><code>fiat_currencies_accepted</code> :</strong> Utilisez les <a href="https://en.wikipedia.org/wiki/ISO_4217" target="_blank" rel="noopener noreferrer">codes ISO 4217</a>, en MAJUSCULES : la correspondance est exacte. Un tableau vide <code>[]</code> accepte toutes les devises. Depuis la v0.20.2, la liste peut aussi contenir les stablecoins <code>USDT</code>, <code>USDC</code> et <code>DOC</code>, ainsi que du bitcoin sur d'autres réseaux (<code>BTC</code>, <code>LBTC</code>, <code>RBTC</code>) — voir 4.12.</li>
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
expiration_hours = 24        # Durée pendant laquelle un ordre non pris reste dans le carnet
max_expiration_days = 15     # Expiration la plus longue qu'un créateur peut demander
expiration_seconds = 900     # Temps pendant lequel un ordre pris peut attendre la hold invoice
                             # ou la facture de l'acheteur avant de retourner au carnet (15 min)

[lightning]
hold_invoice_expiration_window = 300  # Délai dont dispose le preneur pour payer la facture ou en fournir une de paiement (5 min)
hold_invoice_cltv_delta = 144         # Durée de vie de l'escrow, en blocs (~1 jour)</code></pre>

      <p>Notez que <code>hold_invoice_expiration_window</code> appartient à <code>[lightning]</code> : écrit sous <code>[mostro]</code>, il est ignoré en silence. Il doit être supérieur à 0, et c'est aussi l'expiration de la facture de caution d'un preneur.</p>

      <p>Une fois les sats du vendeur verrouillés, l'acheteur dispose d'environ <code>hold_invoice_cltv_delta - escrow_deadline_margin_blocks</code> blocs pour envoyer le paiement : 144 − 24 = 120 blocs, soit environ 20 heures, avec les valeurs par défaut. Quand ce délai s'écoule, Mostro annule la transaction si l'acheteur n'a jamais marqué le paiement comme envoyé, ou ouvre un litige s'il l'a fait (voir 4.9). Les utilisateurs voient le compte à rebours dans l'application.</p>`,
    },
    'antispam': {
      title: `4.6 Anti-Spam`,
      nav: `Anti-Spam`,
      html: `      <pre><code>[mostro]
pow = 0  # 0 = désactivé ; 10-20 = modéré. Commencez avec 0.</code></pre>

      <p>Un filtre plus fin est <code>pow_first_contact</code>. <code>pow</code> s'applique à tous les messages, tandis que <code>pow_first_contact</code> ne s'applique qu'aux expéditeurs étrangers à une transaction active et est vérifié avant déchiffrement. Les transactions en cours restent ainsi peu coûteuses, alors que les inconnus doivent fournir un vrai travail :</p>
      <pre><code>[mostro]
pow = 0                  # transactions en cours
pow_first_contact = 16   # nouveaux ordres et prises depuis des clés inconnues</code></pre>
      <p>Les clients doivent miner au moins autant. Les utilisateurs de mostro-cli doivent régler <code>POW</code> (ou <code>-p</code>) sur votre valeur, sinon leurs nouveaux ordres et prises sont ignorés sans réponse.</p>

      <p>Un moyen de dissuasion plus fort contre ceux qui prennent des ordres puis disparaissent est la caution anti-abus (voir 4.11).</p>`,
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
      </div>

      <p>Outre le mode maintenance, le RPC porte les appels de réputation <code>RevokeReputationImports</code> et <code>RebindReputationExport</code> (voir 4.13). Les deux ne sont acceptés que depuis le loopback, et mostro-cli n'a pas encore de commande pour eux : utilisez <code>grpcurl</code>. mostro-cli n'envoie <code>MOSTRO_RPC_TOKEN</code> qu'à une adresse loopback ou via <code>https://</code>, jamais en clair vers un hôte distant.</p>`,
    },
    'transport': {
      title: `4.8 Protocole de Transport`,
      nav: `Transport`,
      html: `      <p>Depuis la v0.19.0, un nœud Mostro ne parle <strong>que</strong> le protocole v2 : événements kind 14 signés, contenu chiffré NIP-44. Le protocole v1 (gift wraps NIP-59, kind 1059) a été supprimé, et il n'y a plus rien à choisir. Laissez la ligne <code>transport</code> hors de <code>settings.toml</code> ; le modèle ne l'a plus.</p>

      <table class="guide-table">
        <thead><tr><th>Ligne dans settings.toml</th><th>Résultat</th></tr></thead>
        <tbody>
          <tr><td>aucune</td><td>Protocole v2. Recommandé.</td></tr>
          <tr><td><code>transport = "nip44"</code></td><td>Protocole v2. Accepté et sans effet.</td></tr>
          <tr><td><code>transport = "gift-wrap"</code></td><td><strong>Mostro refuse de démarrer</strong>, avec une erreur qui vous dit de supprimer la ligne.</td></tr>
        </tbody>
      </table>

      <p>Votre nœud annonce <code>protocol_version</code> 2 dans son événement d'info kind 38385. Tous les clients actuels parlent v2 : l'application Mostro, Mostrix 0.3.1 ou plus récent, mostro-cli 0.16.2 ou plus récent et Bosstro. Un client qui ne parle que v1, comme une ancienne version de Mostro Mobile, n'obtient aucune réponse de votre nœud : demandez à vos utilisateurs de mettre à jour.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Mise à jour depuis la v0.18.x</div>
        <p>Si votre <code>settings.toml</code> contient encore <code>transport = "gift-wrap"</code>, supprimez cette ligne avant de mettre à jour. Le seul moyen de continuer à servir des clients protocole v1 est de rester sur mostrod 0.18.x, qui ne reçoit plus de correctifs.</p>
      </div>`,
    },
    'ln-safety': {
      title: `4.9 Limites de Sécurité Lightning`,
      nav: `Limites Lightning`,
      html: `      <p>Ces réglages de <code>[lightning]</code> bornent la durée pendant laquelle vos canaux peuvent rester verrouillés et le nombre de paiements non résolus simultanés. Ils ont tous une valeur par défaut : un fichier de configuration d'une version antérieure démarre donc en général toujours, mais un modèle récent les inclut et il vaut la peine de les connaître.</p>

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
          <tr><td><code>escrow_deadline_margin_blocks</code></td><td>Marge de sécurité avant que LND n'annule automatiquement une hold invoice acceptée. Quand la chaîne s'approche à cette distance, Mostro annule la transaction ou ouvre un litige tant que l'escrow existe encore. Depuis la v0.20.0, Mostro <strong>refuse de démarrer</strong> s'il n'est pas d'au moins 18 (le <code>invoices.holdexpirydelta</code> par défaut de LND, 12, plus 6 blocs de marge) et inférieur à <code>hold_invoice_cltv_delta</code>. Si vous avez relevé <code>holdexpirydelta</code>, gardez vous-même cette marge au moins 6 blocs au-dessus. La valeur est publiée dans votre événement d'info.</td></tr>
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

      <p>Les opérateurs servant le peso cubain peuvent ajouter El Toque pour le CUP et le MLC du marché informel. C'est un opt-in, limité à ces deux devises, et il faut un token gratuit : un El Toque activé sans <code>token</code> refuse de démarrer.</p>

      <p>Gardez <code>publish_to_nostr = true</code>. Outre l'alimentation des autres nœuds, les taux publiés indiquent à l'application Mostro quelles devises votre nœud peut valoriser au prix du marché : un code absent de ces taux n'est proposé qu'à prix fixe. Pour valoriser les stablecoins et le bitcoin sur d'autres réseaux, voyez 4.12.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Ajouter un bloc [price] change de moteur de prix</div>
        <p>Dès que <code>settings.toml</code> contient une table <code>[price]</code> ou <code>[price.providers.*]</code>, Mostro utilise le moteur multi-sources et ignore <code>bitcoin_price_api_url</code>. Assurez-vous qu'au moins une source de marché (Yadio, CoinGecko, Currency API, Blockchain.com…) est activée, sinon votre nœud n'a aucun taux fiat et refuse tous les ordres au prix du marché. Surveillez dans le log de démarrage les avertissements qui commencent par <code>price:</code>.</p>
      </div>`,
    },
    'optional-blocks': {
      title: `4.11 Autres Blocs Facultatifs`,
      nav: `Blocs facultatifs`,
      html: `      <p>D'autres blocs que vous pouvez rencontrer dans un modèle récent. Aucun n'est obligatoire. Trois d'entre eux ont leur propre section : <code>[price.providers.pegged]</code> (4.12), <code>[reputation_import]</code> / <code>[reputation_export]</code> (4.13) et <code>[health]</code> (5.4). <code>serbero_pubkey</code>, dans <code>[mostro]</code>, est traité en 5.10.</p>

      <p><strong>Rétention des événements.</strong> Combien de temps Mostro conserve chaque type d'événement avant expiration. Omettez le bloc entièrement pour accepter les valeurs par défaut.</p>
      <pre><code>[expiration]
order_days = 30        # événements d'ordres (kind 38383)
rating_days = 90       # historique de réputation (kind 38384)
dispute_days = 90      # litiges, conservés plus longtemps pour l'audit (kind 38386)
fee_audit_days = 365   # transparence des frais (kind 8383)
dm_days = 30           # messages directs du protocole v2 (kind 14)</code></pre>

      <h4>Cautions anti-abus</h4>
      <p><code>[anti_abuse_bond]</code> demande aux preneurs, aux créateurs ou aux deux de verrouiller une petite hold invoice Lightning à côté de la transaction. Les utilisateurs honnêtes la récupèrent intacte ; un solveur peut confisquer la caution de celui qui a agi de mauvaise foi, et une part revient à la contrepartie honnête. Les utilisateurs la voient comme un « dépôt » dans l'application, et la documentation utilisateur l'explique dans son chapitre <em>Dépôt anti-abus</em>. Toutes les phases sont livrées ; il est désactivé par défaut.</p>
      <pre><code>[anti_abuse_bond]
enabled = true
amount_pct = 0.01                 # caution = max(1% de l'ordre, base_amount_sats)
base_amount_sats = 1000
apply_to = "take"                 # "take" | "make" | "both"
slash_on_waiting_timeout = false  # confisque aussi à qui laisse expirer son étape
slash_node_share_pct = 0.5        # part d'une caution confisquée que garde le nœud
payout_claim_window_days = 15     # délai dont dispose le gagnant pour réclamer sa part
maker_bond_payment_timeout_seconds = 900
# bond_cltv_delta = 432           # voir ci-dessous</code></pre>
      <ul>
        <li>Un créateur qui n'a pas encore payé la caution peut annuler l'ordre, et un ordre impayé expire après <code>maker_bond_payment_timeout_seconds</code>.</li>
        <li>Une caution de créateur reste verrouillée tant que l'ordre repose dans le carnet : un ordre n'y reste donc au plus que <code>bond_cltv_delta - hold_invoice_cltv_delta - 144</code> blocs (environ 24 h avec les valeurs par défaut), quel que soit <code>expiration_hours</code>.</li>
        <li><code>bond_cltv_delta</code> doit être supérieur à <code>hold_invoice_cltv_delta + 144</code> et d'au plus 864. En v0.20.2, sa valeur par défaut est fixe, 432 : si vous avez relevé <code>hold_invoice_cltv_delta</code> à 288 ou plus, définissez-le explicitement, sinon Mostro refuse de démarrer.</li>
        <li>Les solveurs confisquent avec l'option de caution lorsqu'ils règlent ou annulent (Mostrix, Bosstro, ou <code>mostro-cli admsettle/admcancel --slashseller/--slashbuyer</code>).</li>
      </ul>
      <p>Lisez le <code>docs/ANTI_ABUSE_BOND.md</code> du projet avant de l'activer sur un nœud en production, et annoncez-le d'abord à vos utilisateurs.</p>

      <h4>Historique du payeur (expérimental)</h4>
      <p><code>[payer_history]</code> combat l'arnaque par triangulation, où un acheteur paie depuis le compte bancaire d'un tiers. L'acheteur s'engage sur un hash du compte depuis lequel il paiera (<code>declare-payer</code>), le vendeur peut le comparer à l'expéditeur figurant sur son relevé, et Mostro n'en conserve qu'un HMAC. À partir de la v0.20.2, seule la déclaration est câblée : la porte <code>require_declaration</code> et l'historique montré aux vendeurs ne sont pas encore implémentés, et aucun client publié n'envoie <code>declare-payer</code>. Laissez-le désactivé pour l'instant.</p>
      <pre><code># [payer_history]
# enabled = false
# require_declaration = false</code></pre>

      <h4>Escrow Cashu</h4>
      <p><code>[cashu]</code> est un mode expérimental qui fonctionne sans LND et place l'escrow des transactions dans des tokens Cashu. Il n'est pas encore utilisable pour de vraies transactions — les actions de trade après la prise sont toujours refusées — et il ne peut pas être combiné aux cautions anti-abus. Depuis la v0.19.3, le créateur choisit la mint pour chaque ordre dans une liste autorisée :</p>
      <pre><code># [cashu]
# enabled = false
# mint_urls = ["https://mint.example.com"]   # [] vide = n'importe quelle mint avec un hôte public
# escrow_locktime_days = 15</code></pre>
      <p>L'ancienne clé unique <code>mint_url</code> est rejetée : une configuration qui la contient ne se charge pas.</p>`,
    },
    'pegged': {
      title: `4.12 Stablecoins et Bitcoin sur d'autres réseaux`,
      nav: `Stablecoins et autres BTC`,
      html: `      <p>Depuis la v0.20.2, un nœud peut proposer des transactions contre six codes qui ne sont pas des devises fiat : des stablecoins en dollars, et du bitcoin sur d'autres réseaux. Des sats Lightning sont toujours d'un côté de la transaction ; l'autre côté est payé on-chain, sur Liquid, sur Rootstock ou sur le réseau du stablecoin, directement entre les deux utilisateurs.</p>

      <table class="guide-table">
        <thead><tr><th>Code</th><th>Ce que c'est</th><th>Valorisé comme</th><th>Montant de l'ordre en</th></tr></thead>
        <tbody>
          <tr><td><code>USDT</code></td><td>Tether USD</td><td>1 USD</td><td>coins entiers</td></tr>
          <tr><td><code>USDC</code></td><td>USD Coin</td><td>1 USD</td><td>coins entiers</td></tr>
          <tr><td><code>DOC</code></td><td>Dollar on Chain (Rootstock)</td><td>1 USD</td><td>coins entiers</td></tr>
          <tr><td><code>BTC</code></td><td>Bitcoin on-chain</td><td>1 sat = 1 sat</td><td>sats</td></tr>
          <tr><td><code>LBTC</code></td><td>L-BTC sur Liquid</td><td>1 sat = 1 sat</td><td>sats</td></tr>
          <tr><td><code>RBTC</code></td><td>RBTC sur Rootstock</td><td>1 sat = 1 sat</td><td>sats</td></tr>
        </tbody>
      </table>

      <ul>
        <li>Les <strong>stablecoins</strong> sont indexés 1:1 sur le dollar : un ordre USDT au prix du marché est donc valorisé exactement comme un ordre USD, prime comprise. Le taux USD vient de vos sources de prix habituelles (4.10) ; aucune API supplémentaire n'est appelée.</li>
        <li><strong>BTC, LBTC et RBTC</strong> sont cotés 1:1 en sats, ils n'ont donc besoin d'aucune API de prix. Un ordre de 100 000 signifie 100 000 sats de l'actif (0,001 RBTC). Au prix du marché, la prime est le prix du swap : un ordre de vente (le créateur vend des sats Lightning) de 100 000 sats de RBTC avec une prime de 1% verrouille 99 000 sats Lightning, et le vendeur reçoit 100 000 sats de RBTC.</li>
        <li>Aucun autre code n'est pris en charge : DAI, EURC et les autres sont refusés au démarrage si vous les listez dans <code>only</code>.</li>
      </ul>

      <h4>L'activer</h4>
      <p>Il vous faut mostrod v0.20.2 ou plus récent. Deux réglages fonctionnent ensemble : <code>fiat_currencies_accepted</code> dit quels codes les ordres peuvent utiliser, et le fournisseur <code>pegged</code> dit lesquels ont un prix de marché.</p>
      <pre><code>[mostro]
# Gardez vos devises fiat et ajoutez les nouveaux codes, en MAJUSCULES
fiat_currencies_accepted = ['USD', 'EUR', 'USDT', 'USDC', 'DOC', 'LBTC', 'RBTC']

# Une source de prix de marché pour le fiat (et donc pour les stablecoins).
# Obligatoire en v0.20.2 dès que vous ajoutez une table [price.providers.*].
[price.providers.yadio]
enabled = true
url = "https://api.yadio.io"

[price.providers.pegged]
enabled = true
only = ["USDT", "USDC", "DOC", "LBTC", "RBTC"]   # ou except = ["BTC"] ; sans l'un ni l'autre, les six</code></pre>
      <p>Redémarrez Mostro et vérifiez le log. Si vous voyez <code>price: the pegged provider quotes ... but fiat_currencies_accepted does not list them</code>, ajoutez les codes manquants : un code coté mais non accepté publie un taux mais refuse tous les ordres. Un <code>fiat_currencies_accepted = []</code> vide accepte tous les codes.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ N'ajoutez pas le bloc pegged seul en v0.20.2</div>
        <p>Toute table <code>[price.providers.*]</code> fait passer le nœud au moteur de prix multi-sources et abandonne l'ancien <code>bitcoin_price_api_url</code>. En v0.20.2, une table <code>pegged</code> sans source de marché à côté laisse le nœud sans taux fiat : les ordres au prix du marché en USD, EUR et USDT sont tous refusés. Activez toujours au moins une source de marché, comme dans l'exemple ci-dessus. (La prochaine version conserve automatiquement l'ancienne source Yadio dans ce cas.) En v0.20.1 ou plus ancien, n'ajoutez pas du tout le bloc : le fournisseur n'y existe pas.</p>
      </div>

      <p><strong>Prix fixe uniquement.</strong> Pour accepter un code sans le valoriser au prix du marché, listez-le dans <code>fiat_currencies_accepted</code> et laissez-le hors de <code>only</code>. Les utilisateurs doivent alors fixer un montant de sats. C'est un choix judicieux pour le <code>BTC</code> on-chain, où les frais de réseau rendent les petits ordres au prix du marché malcommodes.</p>

      <h4>Ce que voient vos utilisateurs</h4>
      <p>L'application Mostro 2.1.2 et plus récent affiche ces codes dans le sélecteur de devises sous <em>Stablecoins</em> et <em>Bitcoin sur d'autres réseaux</em>, mais seulement ceux que votre nœud accepte. Les montants BTC, LBTC et RBTC se saisissent en sats. Le moyen de paiement nomme le réseau (<code>USDT (Tron)</code>, <code>USDC (Base)</code>, <code>DOC (Rootstock)</code>, <code>LBTC (Liquid)</code>…), le vendeur partage une adresse de réception dans le chat de la transaction, et l'acheteur y colle l'ID de transaction après avoir payé. Mostro ne vérifie jamais le réseau ni l'adresse. mostro-cli et Mostrix ne peuvent pour l'instant créer que des ordres à prix fixe dans ces codes.</p>

      <h4>Les litiges demandent d'autres preuves</h4>
      <p>Briefez vos solveurs avant d'activer cela. Il n'y a pas de relevé bancaire : la preuve est l'ID de transaction collé dans le chat, que le solveur vérifie dans un explorateur de blocs du réseau concerné. Pour Liquid, l'acheteur doit partager le lien <em>unblinded</em> (non masqué), car Liquid cache les montants. Les transferts sont irréversibles, un paiement sur le mauvais réseau peut être perdu, et l'acheteur paie les frais de réseau : le vendeur doit recevoir le montant complet. Le vendeur ne doit libérer qu'après confirmation du transfert. Le délai est le même que pour le fiat (environ 120 blocs avec les valeurs par défaut, voir 4.5) : un transfert on-chain à faibles frais peut donc le manquer.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Si un stablecoin perd son ancrage</div>
        <p>Il n'existe pas encore de garde-fou automatique contre le dépeg. Si l'USDT ou l'USDC s'éloigne d'un dollar, retirez-le de <code>only</code>, ou ajoutez-le à <code>except</code> si vous n'utilisez pas <code>only</code> (gardez-le dans <code>fiat_currencies_accepted</code> si vous voulez encore des ordres à prix fixe) et redémarrez.</p>
      </div>`,
    },
    'reputation': {
      title: `4.13 Import et export de réputation`,
      nav: `Import de réputation`,
      html: `      <p>Les utilisateurs peuvent apporter chez vous la réputation acquise ailleurs — sur le bot Telegram <strong>@lnp2pBot</strong> ou sur un autre nœud Mostro —, pour qu'un trader qui déménage ne reparte pas de zéro. Trois chiffres voyagent : le nombre d'évaluations reçues, la note moyenne et la date de la première transaction. Ils arrivent sous forme d'<em>attestation</em> : un petit événement Nostr (kind 38388) signé par la source, adressé à l'identité de l'utilisateur et valable 7 jours. Votre nœud les ajoute à la réputation propre de l'utilisateur, et les contreparties voient un chiffre unique fusionné.</p>
      <p>Les deux sens sont optionnels et désactivés par défaut. L'import exige mostrod v0.20.0 ou plus récent ; l'export, v0.20.1 ou plus récent. Les utilisateurs ont besoin de l'application Mostro en <strong>mode réputation</strong> : en mode confidentialité totale, il n'y a aucune identité pour porter une réputation.</p>

      <h4>Importer depuis lnp2pBot</h4>
      <p>lnp2pBot signe ses attestations avec une clé dédiée. Ajoutez-la à votre liste de confiance :</p>
      <pre><code>[reputation_import]
enabled = true
max_lifetime_seconds = 604800   # attestation la plus longue acceptée (7 jours ; 30 au maximum)

[[reputation_import.issuers]]
name = "lnp2pbot"               # ne renommez jamais une entrée qui a déjà des imports
keys = ["000004ac730537f1cf7d91f4f584a498a530a0205d35e816ebbaf23aec61e459"]
# npub1qqqqftrnq5mlrnmaj860tp9ynzjnpgpqt567s9hthter4mrpu3vsrta3em</code></pre>
      <p>Redémarrez Mostro. Votre événement d'info (kind 38385) porte maintenant un tag <code>reputation_import_issuers</code>, ce qui permet à l'application de savoir qu'elle peut proposer l'import sur votre nœud. Plusieurs nœuds de communautés font déjà confiance à cette clé.</p>
      <p>Le bot exporte un compte ayant au moins 10 transactions terminées et 5 évaluations reçues, et qui n'est pas banni. L'utilisateur part de l'application (<em>Paramètres → Réseau → Réputation → Importer la réputation → L'obtenir de lnp2pBot</em>), confirme dans Telegram que le npub correspond, et recolle le message envoyé par le bot.</p>

      <h4>Faire confiance à un autre nœud Mostro</h4>
      <p>Un nœud qui exporte annonce sa clé de signature dans le tag <code>reputation_issuer</code> de son événement d'info. Lisez-le avec la commande de 5.4 (cherchez ce tag), confirmez-le auprès de l'opérateur, et ajoutez une entrée pour lui :</p>
      <pre><code>[[reputation_import.issuers]]
name = "mostro-example"         # un nom local stable de votre choix
keys = ["&lt;that node's reputation_issuer key, npub or hex&gt;"]</code></pre>
      <ul>
        <li>Le <code>name</code> est ce sur quoi les imports sont dédupliqués. Ne renommez jamais une entrée qui a déjà des imports : Mostro refuse de démarrer si une clé passe à un autre nom.</li>
        <li>Une clé ne peut appartenir qu'à une seule entrée. Pour suivre une rotation de clé, ajoutez la nouvelle clé à la même entrée et retirez l'ancienne une fois ses attestations expirées.</li>
        <li>Ne faites confiance qu'à des sources de confiance : un gros historique importé pèse plus lourd que les évaluations locales.</li>
      </ul>
      <p>Un utilisateur peut importer une fois depuis chaque source sur chaque nœud, et l'import ne peut pas être annulé par l'utilisateur. Les chiffres sont un instantané : les évaluations ultérieures sur la source ne suivent pas.</p>

      <h4>Exporter depuis votre nœud</h4>
      <p>L'export permet à vos utilisateurs d'emporter vers un autre nœud la réputation acquise <em>sur le vôtre</em>. Seules les évaluations reçues sur votre nœud voyagent, jamais celles importées. L'utilisateur doit avoir 10 transactions terminées et 5 évaluations reçues sur votre nœud, et ne pas être banni.</p>
      <p>Les attestations sont signées avec une clé dédiée, jamais la clé de votre nœud. Générez-en une et gardez-la à côté du nsec, dans l'environnement ou dans <code>&lt;config-dir&gt;/.env</code> :</p>
      <pre><code># Disposition Docker Hub ; sinon, utilisez votre propre répertoire de configuration
echo "MOSTRO_REPUTATION_ISSUER_SK=$(openssl rand -hex 32)" >> ~/mostro-config/.env
sudo chown 1000:1000 ~/mostro-config/.env
chmod 600 ~/mostro-config/.env</code></pre>
      <pre><code>[reputation_export]
enabled = true
issuer_key_env = "MOSTRO_REPUTATION_ISSUER_SK"
lifetime_seconds = 604800       # 1 à 604800 (7 jours)</code></pre>
      <p>Mostro refuse de démarrer si la variable est absente ou invalide, si elle contient la clé de votre propre nœud, ou si sa clé publique figure aussi dans votre liste <code>[reputation_import]</code>. Une fois lancé, votre événement d'info porte le tag <code>reputation_issuer</code> : partagez cette clé avec les opérateurs qui veulent faire confiance à votre nœud. Sauvegardez la clé avec vos autres secrets. Si elle fuit, n'importe qui peut fabriquer des attestations au nom de votre nœud jusqu'à ce que les autres opérateurs la retirent et révoquent les imports.</p>

      <h4>Révoquer des imports et ré-associer des exports</h4>
      <p>Deux appels RPC d'administration (4.7) traitent les cas rares. Ils ne sont acceptés que depuis le loopback ; ajoutez <code>-H 'authorization: Bearer &lt;token&gt;'</code> si vous avez défini <code>auth_token</code>. Lancez-les depuis un checkout du dépôt <code>mostro</code>, qui contient <code>proto/admin.proto</code>.</p>
      <p><strong>La clé d'un émetteur de confiance a fuité.</strong> Retirez d'abord la clé de son entrée et redémarrez, puis annulez chaque import signé avec elle (ajoutez <code>"imported_after": &lt;unix time&gt;</code> pour le limiter aux plus récents) :</p>
      <pre><code>grpcurl -plaintext -import-path proto -proto admin.proto \\
  -d '{"issuer_key": "&lt;npub or hex&gt;", "reason": "key leaked"}' \\
  127.0.0.1:50051 mostro.admin.v1.AdminService/RevokeReputationImports</code></pre>
      <p>Chaque import est annulé exactement, les évaluations reçues depuis sont conservées, et les utilisateurs peuvent importer à nouveau avec une attestation de la nouvelle clé.</p>
      <p><strong>Un utilisateur a perdu l'identité à laquelle son export est lié.</strong> Le premier export lie le compte à une identité ; la déplacer exige normalement une autorisation signée avec l'ancienne identité, que produit l'application. Si l'ancienne identité a disparu, vous pouvez la déplacer vous-même après avoir vérifié la personne :</p>
      <pre><code>grpcurl -plaintext -import-path proto -proto admin.proto \\
  -d '{"identity": "&lt;old npub&gt;", "new_identity": "&lt;new npub&gt;", "reason": "support ticket"}' \\
  127.0.0.1:50051 mostro.admin.v1.AdminService/RebindReputationExport</code></pre>
      <p>Un utilisateur qui restaure les mêmes 12 mots garde la même identité et n'a besoin de rien de tout cela.</p>`,
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
        <li><strong>Résolution</strong> — L'arbitre décide : libérer vers l'acheteur, ou rembourser le vendeur. Avec les cautions anti-abus activées (4.11), l'arbitre peut aussi confisquer la caution de celui qui a agi de mauvaise foi.</li>
      </ol>

      <p>L'arbitre écrit à chaque partie sur un chat de litige privé, que l'application Mostro affiche sous <em>Chat → Litiges</em>. Chaque partie peut aussi partager la clé de son chat de transaction avec l'arbitre, qui lit alors cette conversation dans l'onglet Observer de Mostrix ou dans Bosstro. Les parties peuvent encore terminer la transaction elles-mêmes : si le vendeur libère, ou si les deux conviennent d'une annulation coopérative, Mostro clôt le litige de lui-même et en informe l'arbitre.</p>

      <p>Si vous faites tourner <strong>Serbero</strong> (5.10), il alerte vos arbitres dès l'ouverture d'un litige et peut faire les premiers pas avec les parties. Il ne décide jamais et ne déplace jamais de fonds.</p>

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

      <p>Un <code>npub1...</code> nu sans suffixe devient read-write par défaut, de même que l'enregistrement via l'interface RPC. Commencez un nouvel arbitre en <code>:read</code> le temps qu'il apprenne le processus, puis réenregistrez-le en read-write quand vous avez confiance en son jugement. Un solveur read-write peut reprendre un litige détenu par un solveur en lecture seule (ou par Serbero).</p>

      <p>Vos arbitres peuvent travailler depuis un terminal avec Mostrix (5.2) ou depuis un téléphone Android avec Bosstro (5.11).</p>`,
    },
    'mostrix': {
      title: `5.2 Mostrix — Votre outil d'administration`,
      nav: `Mostrix`,
      html: `      <p>Mostrix est un client Mostro en terminal (TUI) avec deux modes : un mode <strong>utilisateur</strong> pour échanger, et un mode <strong>admin</strong> pour la résolution des litiges — prendre les litiges, discuter avec les deux parties, régler ou annuler, confisquer des cautions et ajouter des solveurs. Si vous faites tourner un nœud Mostro, vous avez besoin de Mostrix. Il parle à votre nœud uniquement via Nostr, jamais via l'interface RPC.</p>

      <h4>Option A : Télécharger le binaire pré-compilé (Recommandé)</h4>
      <p>Téléchargez la dernière version pour votre plateforme depuis <a href="https://github.com/MostroP2P/mostrix/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a> :</p>

      <pre><code># Linux (x86_64)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-unknown-linux-musl

# Linux (ARM64 / Raspberry Pi 4 et 5, OS 64 bits)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-unknown-linux-musl

# Linux (ARMv7 / Raspberry Pi OS 32 bits)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-armv7-unknown-linux-gnueabi

# macOS (Apple Silicon / Intel)
curl -LO https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-apple-darwin
curl -LO https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-apple-darwin

# FreeBSD : mostrix-x86_64-unknown-freebsd
# Windows : téléchargez mostrix-x86_64-pc-windows-msvc.exe depuis la page des releases</code></pre>

      <p>Vérifiez le téléchargement avant de l'exécuter, comme expliqué juste en dessous.</p>

      <div class="callout tip">
        <div class="callout-title">🔐 Vérifiez la Release</div>
        <p>Vérifiez toujours le binaire avant de l'exécuter. Importez les clés des mainteneurs une seule fois :</p>
        <pre><code>curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/negrunch.asc | gpg --import
curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/arkanoider.asc | gpg --import</code></pre>
        <p>Les signatures sont des fichiers détachés nommés <code>manifest.txt.sig.&lt;mainteneur&gt;</code>. Les releases récentes ne portent que <code>manifest.txt.sig.arkanoider</code> (clé <code>2E98 6CA1 C5E7 EA16 35CD 059C 4989 CC74 15A4 3AEC</code>) : consultez la page de la release et téléchargez celles qui y figurent réellement :</p>
        <pre><code>wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt
wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt.sig.arkanoider

# Vérifiez chaque signature téléchargée
gpg --verify manifest.txt.sig.arkanoider manifest.txt

# Puis comparez l'empreinte du binaire au manifest
# (les lignes du manifest portent un préfixe artifact-&lt;target&gt;/, retiré ici)
sed 's#  artifact-[^/]*/#  #' manifest.txt | sha256sum -c --ignore-missing</code></pre>
        <p>Une signature valide provenant d'une clé de mainteneur que vous jugez fiable suffit. Si un <code>wget</code> renvoie 404, c'est simplement que cette signature n'a pas été publiée pour cette release : ne prenez pas un fichier absent pour un fichier vérifié.</p>
      </div>

      <p>Seulement une fois qu'une signature et l'empreinte concordent, rendez le binaire exécutable et lancez-le :</p>
      <pre><code>chmod +x mostrix-x86_64-unknown-linux-musl
./mostrix-x86_64-unknown-linux-musl</code></pre>

      <h4>Option B : Compiler depuis le code source</h4>
      <p>Si vous préférez compiler depuis le code source ou avez besoin d'une plateforme non disponible dans les releases :</p>

      <pre><code># Installer les dépendances (Ubuntu/Debian)
sudo apt install -y cmake build-essential pkg-config

# Installer Rust (si pas déjà installé ; Mostrix demande la 1.97 ou plus récente)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Cloner et compiler
git clone https://github.com/MostroP2P/mostrix.git
cd mostrix
cargo build --release

# Exécuter
./target/release/mostrix</code></pre>

      <h4>Premier lancement et configuration</h4>
      <p>Au premier lancement, Mostrix crée <code>~/.mostrix/</code> avec une base de données contenant une nouvelle seed de 12 mots et un <code>settings.toml</code>, puis affiche une fenêtre <strong>Backup New Keys</strong> avec les 12 mots. Notez-les. Un <code>settings.toml</code> placé à côté du binaire a la priorité (mode portable).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Important : Pointez Mostrix vers votre nœud</div>
        <p>La configuration générée pointe vers le nœud public par défaut de Mostro. Passez à <strong>votre propre nœud</strong> : <strong>Settings → Select Mostro Instance</strong>, puis collez le npub ou l'hex de votre nœud, ou modifiez <code>mostro_pubkey</code> dans <code>~/.mostrix/settings.toml</code> et redémarrez.</p>
      </div>

      <p>Pour le mode admin (résolution des litiges), les clés pertinentes sont :</p>
      <pre><code># ~/.mostrix/settings.toml
mostro_pubkey = "VOTRE_PUBKEY_MOSTRO"        # hex ou npub
nsec_privkey  = "nsec1..."                   # votre identité de trader, dérivée de la seed — ne pas modifier
admin_privkey = "nsec1..."                   # la clé d'un solveur enregistré — voir ci-dessous
relays = ["wss://relay.mostro.network"]
currencies_filter = []                       # vide = afficher toutes les devises
user_mode = "admin"                          # ou Settings → Switch Mode
# trusted_dm_senders = ["npub1..."]          # le npub de Serbero, pour voir ses rapports (5.10)</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Quelle clé mettre dans admin_privkey ?</div>
        <p>Mostro accepte les actions de litige venant de sa propre clé (le <code>nsec_privkey</code> du daemon) et des clés de solveurs enregistrés. Toute autre clé est rejetée. Seule la clé du daemon peut <em>ajouter</em> des solveurs : utilisez-la uniquement pour cela et gardez-la sur le serveur. Pour le travail quotidien sur les litiges, enregistrez une clé de solveur — read-write pour régler ou annuler — et mettez celle-là dans <code>admin_privkey</code>. Ne réutilisez jamais <code>nsec_privkey</code>.</p>
        <pre><code>ADMIN_NSEC=nsec1&lt;daemon-key&gt; MOSTRO_PUBKEY=&lt;node-npub&gt; \\
  RELAYS=wss://relay.mostro.network \\
  mostro-cli admaddsolver -n npub1solver...</code></pre>
        <p>L'option <strong>Settings → Add Dispute Solver</strong> de Mostrix fait la même chose, avec Gauche/Droite pour choisir Read ou Read-Write (Read-Write par défaut).</p>
      </div>

      <h4>Le mode admin en pratique</h4>
      <ul>
        <li><strong>Disputes Pending</strong> : Entrée prend un litige. <kbd>Ctrl+T</kbd> en reprend un à Serbero.</li>
        <li><strong>Disputes Management</strong> : Tab fait défiler les chats BUYER, SELLER et SERBERO. <kbd>Shift+F</kbd> finalise : payer l'acheteur, rembourser le vendeur, et confisquer une caution quand le nœud en a.</li>
        <li><strong>Observer</strong> : collez la clé du chat de transaction qu'une partie a partagée pour lire sa conversation.</li>
        <li><strong>Settings → Link Watchdog</strong> : lie le solveur à mostro-watchdog (5.3), pour qu'il reçoive un ping Telegram privé quand une partie écrit dans un litige qu'il a pris.</li>
        <li><kbd>Ctrl+H</kbd> affiche l'aide contextuelle. Quittez depuis l'onglet <strong>Exit</strong>.</li>
      </ul>`,
    },
    'watchdog': {
      title: `5.3 mostro-watchdog — Alertes Telegram pour les litiges et la santé du nœud`,
      nav: `mostro-watchdog`,
      html: `      <p><code>mostro-watchdog</code> est un bot Telegram pour votre équipe d'administration. Il surveille votre nœud via Nostr et publie dans un groupe ou un canal privé :</p>
      <ul>
        <li><strong>Litiges :</strong> un message par litige, envoyé à l'ouverture puis modifié au fil de l'eau (pris, étapes de Serbero, reprise, résolution). Chaque modification reçoit une courte réponse pour que les téléphones sonnent quand même.</li>
        <li><strong>Santé du nœud :</strong> une alerte quand Mostro cesse de <em>fonctionner</em>, et pas seulement quand il cesse de tourner : un événement d'info devenu silencieux, le mode maintenance et, avec Mostro v0.20.0 ou plus récent, LND désynchronisé ou en retard sur la chaîne, paiements d'acheteurs bloqués ou en échec, HTLC proches de l'expiration et canaux inactifs. Seuls les changements sont publiés : une alerte, des rappels tant qu'elle dure, et « résolu ».</li>
        <li><strong>Progression de Serbero</strong> sur chaque litige, si vous faites tourner Serbero (5.10).</li>
        <li><strong>Pings privés aux solveurs</strong> quand une partie leur écrit dans un litige qu'ils ont pris.</li>
      </ul>

      <p><strong>Option A : script d'installation (recommandé).</strong> Il télécharge la dernière release, la vérifie avec <code>manifest.txt</code> et l'installe dans <code>/usr/local/bin</code> :</p>
      <pre><code>curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash
# ou dans un autre répertoire :
curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash -s -- --install-dir ~/.local/bin</code></pre>

      <p><strong>Option B : téléchargement manuel du binaire</strong></p>
      <pre><code># Linux x86_64 (Intel/AMD) ; utilisez mostro-watchdog-linux-aarch64 sur ARM64
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/mostro-watchdog-linux-x86_64
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/manifest.txt
sha256sum -c manifest.txt --ignore-missing
chmod +x mostro-watchdog-linux-x86_64
sudo mv mostro-watchdog-linux-x86_64 /usr/local/bin/mostro-watchdog</code></pre>
      <p>Les binaires macOS et Windows sont aussi sur la page des releases.</p>

      <p><strong>Option C : compiler depuis les sources</strong></p>
      <pre><code>sudo apt install -y cmake pkg-config libssl-dev
git clone https://github.com/MostroP2P/mostro-watchdog.git
cd mostro-watchdog
cargo build --release
sudo cp target/release/mostro-watchdog /usr/local/bin/</code></pre>

      <h4>Configuration</h4>
      <p>Le watchdog garde son état (<code>disputes.db</code>) à côté de <code>config.toml</code> : donnez-lui donc un répertoire à lui.</p>
      <pre><code>sudo useradd --system --home-dir /var/lib/mostro-watchdog --shell /usr/sbin/nologin mostro-watchdog
sudo install -d -o mostro-watchdog -g mostro-watchdog -m 700 /var/lib/mostro-watchdog
curl -LO https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/config.example.toml
sudo install -o mostro-watchdog -g mostro-watchdog -m 600 config.example.toml /var/lib/mostro-watchdog/config.toml
sudo nano /var/lib/mostro-watchdog/config.toml</code></pre>
      <pre><code>[mostro]
pubkey = "VOTRE_PUBKEY_MOSTRO"         # hex ou npub

[nostr]
# Relais d'amorçage : le watchdog y lit la liste de relais de votre nœud (NIP-65),
# puis suit les relais que votre nœud annonce.
relays = ["wss://relay.mostro.network", "wss://nos.lol"]

[telegram]
bot_token = "VOTRE_TOKEN_BOT"          # fourni par @BotFather
chat_id = -1001234567890              # votre groupe ou canal d'administration

[health]
info_silence_threshold = 900          # 3 × publish_mostro_info_interval de Mostro (300 par défaut)
mostro_health_enabled = true          # nécessite Mostro v0.20.0+
event_alert_threshold = 0             # voir ci-dessous</code></pre>
      <p>Pour trouver <code>chat_id</code>, ajoutez le bot au groupe, envoyez-y un message et ouvrez <code>https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code>.</p>
      <p>L'ancienne alerte « silence d'événements » se déclenche dès qu'aucun événement de litige n'est arrivé pendant deux heures, ce qui, sur la plupart des nœuds, n'est qu'un après-midi calme. Les contrôles d'info et de santé détectent de façon fiable un nœud arrêté : <code>0</code> la désactive donc.</p>

      <h4>La clé Nostr du watchdog</h4>
      <p>Les détails de santé, les alertes Serbero, les pings aux solveurs et le heartbeat du watchdog lui-même exigent une clé à lui, passée uniquement par l'environnement :</p>
      <pre><code>sudo sh -c 'umask 077; echo "WATCHDOG_NOSTR_PRIVATE_KEY=$(openssl rand -hex 32)" > /etc/mostro-watchdog.env'</code></pre>
      <p>Sauvegardez ce fichier. Au démarrage, le watchdog journalise sa clé publique. Mettez-la dans le <code>settings.toml</code> de Mostro et redémarrez Mostro, afin que votre liquidité, vos échecs de paiement et l'expiration de vos HTLC soient chiffrés pour le seul watchdog :</p>
      <pre><code>[health]
watchdog_pubkey = "WATCHDOG_PUBKEY"   # hex ou npub</code></pre>
      <p>Cela ajoute un tag <code>p</code> public à votre événement de santé, qui relie votre nœud à la clé du watchdog. Sans cela, le watchdog alerte quand même sur le statut public.</p>

      <h4>Le lancer comme service</h4>
      <pre><code># /etc/systemd/system/mostro-watchdog.service
[Unit]
Description=mostro-watchdog
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=mostro-watchdog
WorkingDirectory=/var/lib/mostro-watchdog
EnvironmentFile=/etc/mostro-watchdog.env
ExecStart=/usr/local/bin/mostro-watchdog --config /var/lib/mostro-watchdog/config.toml
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target</code></pre>
      <pre><code>sudo systemctl daemon-reload
sudo systemctl enable --now mostro-watchdog
journalctl -u mostro-watchdog -f</code></pre>

      <h4>Facultatif : Serbero et alertes aux solveurs</h4>
      <p>Ajoutez une section vide pour chacune de celles que vous voulez. Les deux utilisent la clé ci-dessus :</p>
      <pre><code>[serbero]                 # les étapes de Serbero sur le message de chaque litige
[solver_notifications]    # pings privés aux solveurs</code></pre>
      <p>Pour Serbero, ajoutez aussi la clé publique <strong>hex</strong> du watchdog au <code>config.toml</code> de Serbero comme observateur — jamais comme solveur — et redémarrez Serbero. Les observateurs reçoivent une ligne par étape, jamais ce que les parties ont écrit. Le watchdog trouve Serbero tout seul grâce au <code>serbero_pubkey</code> de votre nœud (5.10).</p>
      <pre><code>[[observers]]
pubkey = "WATCHDOG_PUBKEY_HEX"</code></pre>
      <p>Pour les pings aux solveurs, chaque solveur envoie <code>/link</code> au bot dans un chat privé et saisit le code dans Mostrix 0.3.6 ou plus récent, sous <strong>Settings → Link Watchdog</strong>. Le bot ne répond aux commandes que dans les chats privés : <code>/version</code>, <code>/link</code>, <code>/unlink</code>, <code>/status</code>.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Surveillez le watchdog</div>
        <p>Un canal silencieux ne prouve pas que le watchdog est vivant. Vous pouvez en faire tourner un second sur une autre machine, chacun avec sa <strong>propre</strong> <code>WATCHDOG_NOSTR_PRIVATE_KEY</code> et la clé publique de l'autre dans <code>[health].peer_watchdogs</code>. Les alertes de santé peuvent aussi aller dans un chat à part avec <code>[health].alerts_chat_id</code>. Le <code>config.example.toml</code> du projet documente chaque option.</p>
      </div>`,
    },
    'monitoring': {
      title: `5.4 Surveillance et santé du nœud`,
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

      <h4>Tourner n'est pas fonctionner</h4>
      <p>En octobre 2026, le LND d'un nœud en production a cessé de suivre la chaîne pendant environ 21 heures. Mostro a continué de tourner et d'accepter des transactions, mais tous les paiements aux acheteurs ont échoué. Un contrôle de processus, de port ou un robot de disponibilité auraient affiché du vert tout du long.</p>
      <p>Depuis la v0.20.0, Mostro contrôle cela lui-même. Chaque minute, il publie un <strong>événement de santé</strong> signé (kind 38389) avec un statut global (<code>ok</code>, <code>degraded</code> ou <code>down</code>), un état pour chaque contrôle (<code>lnd_sync</code>, <code>payouts</code>, <code>relays</code>, <code>database</code>) et la hauteur de bloc de LND. Il est activé par défaut ; ce bloc ne montre que les valeurs par défaut :</p>
      <pre><code>[health]
enabled = true                  # publier l'événement de santé (kind 38389)
interval = 60                   # secondes entre deux publications, de 30 à 3600
watchdog_pubkey = ""            # la clé de votre watchdog : les métriques détaillées lui sont chiffrées (5.3)
lnd_unsynced_fail_after = 600   # doit être supérieur à 60
auto_maintenance_on_lnd_unsynced = true
lnd_resynced_clear_after = 300</code></pre>
      <p>Quand LND cesse d'être synchronisé, Mostro protège vos utilisateurs tout seul :</p>
      <ul>
        <li>Après 60 secondes, les paiements sortants (paiements aux acheteurs, frais de développement, paiements de cautions) <strong>attendent</strong> au lieu d'échouer. Un paiement en attente ne consomme pas l'une des tentatives de paiement de l'acheteur, et il part dès que LND récupère.</li>
        <li>Après <code>lnd_unsynced_fail_after</code> secondes, Mostro passe en mode maintenance avec la raison <code>lnd_unsynced</code> : plus de nouveaux ordres ni de prises, tandis que les transactions ouvertes peuvent encore se terminer. Il quitte la maintenance une fois LND synchronisé depuis <code>lnd_resynced_clear_after</code> secondes. Une maintenance activée par vous (5.8) n'est jamais levée automatiquement.</li>
      </ul>
      <p>Le log raconte l'histoire : <code>LND reports synced_to_chain = false ...; outgoing payments wait after 60s</code>, puis <code>maintenance mode ON (reason lnd_unsynced)</code>, et plus tard <code>LND is synced to chain again</code> et <code>maintenance mode OFF</code>. Vérifiez LND avec <code>lncli getinfo</code> (<code>synced_to_chain</code>, <code>block_height</code>). Définissez <code>auto_maintenance_on_lnd_unsynced = false</code> pour refuser la maintenance automatique.</p>
      <p>Mostro ne sait que ce que son propre LND lui dit, et un nœud bloqué sur une chaîne périmée ne le sait pas toujours. C'est pourquoi les deux lecteurs ci-dessous comparent sa hauteur de bloc à celle d'explorateurs publics :</p>
      <ul>
        <li><strong>Alertes privées :</strong> mostro-watchdog (5.3) prévient votre Telegram quand quelque chose casse et quand c'est rétabli.</li>
        <li><strong>Page de statut publique :</strong> <a href="https://status.mostro.network" target="_blank" rel="noopener noreferrer">status.mostro.network</a> montre l'état en direct et la disponibilité sur 90 jours de chaque Mostro listé. Vos utilisateurs la voient aussi.</li>
      </ul>

      <h4>La page de statut publique</h4>
      <p>La page (<a href="https://github.com/MostroP2P/semaforo" target="_blank" rel="noopener noreferrer">Semáforo</a>) lit les événements de santé directement sur les relais et les vérifie dans le navigateur du visiteur, sans backend. Chaque nœud reçoit une couleur :</p>
      <table class="guide-table">
        <thead><tr><th>Couleur</th><th>Quand</th></tr></thead>
        <tbody>
          <tr><td>🟢 Opérationnel</td><td>Statut <code>ok</code>, un événement récent, et LND à moins de 3 blocs de retard sur les explorateurs</td></tr>
          <tr><td>🟡 Dégradé</td><td>Statut <code>degraded</code>, mode maintenance, ou aucune hauteur de bloc indépendante avec laquelle comparer</td></tr>
          <tr><td>🔴 Hors service</td><td>Statut <code>down</code>, LND à 3 blocs de retard ou plus, ou aucun événement valide récemment (« Not reporting »)</td></tr>
          <tr><td>⚪ Non surveillé</td><td>Listé, mais pas encore censé publier</td></tr>
        </tbody>
      </table>
      <p>Sous chaque nœud, 90 barres quotidiennes et un chiffre de disponibilité proviennent d'échantillons pris toutes les 10 minutes.</p>
      <p><strong>Faire lister votre nœud.</strong> Seuls les nœuds sélectionnés sont affichés, car n'importe qui peut signer un événement toujours vert :</p>
      <ol>
        <li>Votre nœud est listé comme communauté sur ce site.</li>
        <li>Il fait tourner Mostro v0.20.0 ou plus récent avec l'événement de santé activé, et publie sur au moins un de <code>wss://relay.mostro.network</code>, <code>wss://mostro-p2p.tech</code> ou <code>wss://relay.shadowbip.com</code>.</li>
        <li>Ouvrez une issue ou une pull request sur <a href="https://github.com/MostroP2P/semaforo" target="_blank" rel="noopener noreferrer">MostroP2P/semaforo</a> pour l'ajouter à <code>trusted.json</code> avec sa pubkey hex, son nom, sa région et son réseau. Votre avatar est copié depuis la photo de profil de votre profil Nostr.</li>
      </ol>

      <h4>Vérifier votre nœud depuis l'extérieur</h4>
      <p>Votre nœud republie un événement d'info (kind 38385) qui le décrit : frais, devises, version de protocole, indicateur de maintenance, réglages de caution, clés Serbero et de réputation. Le lire, ainsi que l'événement de santé, depuis un relais est le moyen le plus rapide de confirmer que le monde extérieur voit bien ce que vous croyez.</p>
      <pre><code>cargo install nostreq nostcat
# Événement d'info
nostreq --kinds 38385 --limit 1 --authors VOTRE_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq
# Événement de santé : statut, contrôles, hauteur de bloc LND
nostreq --kinds 38389 --limit 1 --authors VOTRE_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq '.tags'</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Les contrôles d'hôte restent utiles</div>
        <p>Un ping d'hôte (<a href="https://uptimerobot.com/" target="_blank" rel="noopener noreferrer">UptimeRobot</a> ou équivalent) vous dit toujours quand le VPS lui-même est injoignable. Il ne peut pas vous dire si Mostro paie les acheteurs ; l'événement de santé, si.</p>
      </div>`,
    },
    'updating': {
      title: `5.5 Mettre à jour Mostro`,
      nav: `Mise à jour`,
      html: `      <p>Mettre à jour remplace le binaire <code>mostrod</code> et rien d'autre : <code>settings.toml</code> et <code>mostro.db</code> restent en place. Les migrations de la base de données s'appliquent d'elles-mêmes au démarrage de la nouvelle version, il n'y a donc aucune étape supplémentaire.</p>

      <h4>Avant de mettre à jour</h4>
      <ol>
        <li><strong>Lisez les <a href="https://github.com/MostroP2P/mostro/releases" target="_blank" rel="noopener noreferrer">notes de version</a></strong> de la version visée. Votre <code>settings.toml</code> n'est jamais écrasé : comparez-le avec le nouveau <code>settings.tpl.toml</code>. La plupart des nouvelles fonctions restent désactivées tant que vous ne les ajoutez pas, mais un bloc absent prend ses valeurs par défaut, et certaines sont activées (l'événement de santé de 5.4, par exemple).</li>
        <li><strong>Sauvegardez la base de données</strong> avec les commandes de 5.6. Cette sauvegarde est nécessaire pour revenir en arrière.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Si vous venez de la v0.18.x</div>
        <p>Vérifiez ceci avant de démarrer la nouvelle version, sinon elle peut refuser de démarrer :</p>
        <ul>
          <li>Supprimez toute ligne <code>transport = "gift-wrap"</code> (4.8). Les utilisateurs d'anciens clients protocole v1 doivent mettre à jour.</li>
          <li><code>escrow_deadline_margin_blocks</code> doit valoir au moins 18 et rester inférieur à <code>hold_invoice_cltv_delta</code> (4.9).</li>
          <li>Sous <code>[cashu]</code>, <code>mint_url</code> est devenu <code>mint_urls = [...]</code> (4.11).</li>
          <li>Avec les cautions anti-abus activées et un <code>hold_invoice_cltv_delta</code> de 288 ou plus, définissez <code>bond_cltv_delta</code> explicitement (4.11).</li>
          <li>Depuis la v0.20.0, l'événement de santé est publié par défaut, et Mostro peut passer seul en maintenance quand LND est désynchronisé (5.4).</li>
        </ul>
      </div>

      <h4>Docker Hub (<code>docker run</code>)</h4>
      <pre><code>export MOSTRO_TAG={{version}}
# Téléchargez d'abord : le nœud reste en service pendant le téléchargement
docker pull mostrop2p/mostro:$MOSTRO_TAG
docker stop mostro
docker rm mostro
docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:$MOSTRO_TAG</code></pre>
      <p>Utilisez les mêmes options qu'à l'installation (retirez <code>--add-host</code> si LND est sur un autre serveur). Si vous ne vous en souvenez plus, consultez <code>docker inspect mostro</code> avant de supprimer le conteneur.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ <code>docker restart</code> n'est pas une mise à jour</div>
        <p><code>docker restart</code> relance le même conteneur, avec l'image à partir de laquelle il a été créé. Pour lancer une nouvelle version, il faut recréer le conteneur : <code>docker rm</code> + <code>docker run</code>, ou <code>docker compose up -d</code> après avoir changé le tag.</p>
      </div>

      <h4>Docker Hub (Docker Compose)</h4>
      <pre><code>export MOSTRO_TAG={{version}}
COMPOSE=~/mostro-docker/compose.yml
# Pointez la ligne image vers le nouveau tag, puis vérifiez-la
sed -i "s|image: mostrop2p/mostro:.*|image: mostrop2p/mostro:$MOSTRO_TAG|" $COMPOSE
grep image: $COMPOSE
docker compose -f $COMPOSE pull
# Recrée le conteneur puisque l'image a changé
docker compose -f $COMPOSE up -d</code></pre>

      <h4>Docker Build</h4>
      <pre><code>cd /opt/mostro
git fetch --tags
git checkout {{version}}
make docker-build
make docker-down
make docker-up</code></pre>

      <h4>Natif</h4>
      <pre><code>cd /opt/mostro
git fetch --tags
git checkout {{version}}
cargo build --release
install target/release/mostrod /usr/local/bin
cargo clean
systemctl restart mostro.service</code></pre>

      <h4>Vérifier la nouvelle version</h4>
      <pre><code># Docker Hub (docker run)
docker exec mostro mostrod --version
docker logs -f mostro

# Docker Hub (Docker Compose)
docker compose -f ~/mostro-docker/compose.yml exec mostro mostrod --version
docker compose -f ~/mostro-docker/compose.yml logs -f mostro

# Docker Build
docker compose -f /opt/mostro/docker/compose.yml exec mostro mostrod --version
docker compose -f /opt/mostro/docker/compose.yml logs -f mostro

# Natif
mostrod --version
journalctl -u mostro -f</code></pre>
      <p>Cherchez les mêmes messages de démarrage qu'au premier lancement (Étape 11 de l'Option A).</p>

      <h4>Revenir en arrière</h4>
      <p>Si la nouvelle version pose problème, revenez au tag précédent. La nouvelle version a peut-être déjà migré la base de données, et un <code>mostrod</code> plus ancien peut refuser de démarrer avec elle : restaurez donc la sauvegarde faite avant la mise à jour :</p>
      <pre><code>docker stop mostro
docker rm mostro
# remplacez YYYYMMDD par la date de la sauvegarde faite avant la mise à jour
BACKUP=/root/mostro-backups/mostro.db.YYYYMMDD
cp "$BACKUP" ~/mostro-config/mostro.db
rm -f ~/mostro-config/mostro.db-wal ~/mostro-config/mostro.db-shm
chown 1000:1000 ~/mostro-config/mostro.db
# puis lancez le tag précédent : même commande docker run,
# ou remettez l'ancien tag dans compose.yml et lancez docker compose up -d</code></pre>
      <p>Docker Build et natif fonctionnent de la même façon : revenez au tag précédent, recompilez et restaurez la base de données avant de démarrer.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Ne changez pas de nœud Lightning en même temps</div>
        <p>Mettre Mostro à jour est sûr à tout moment. Le pointer vers un <strong>autre</strong> nœud Lightning ne l'est pas : videz l'escrow d'abord, voyez 5.8.</p>
      </div>`,
    },
    'backups': {
      title: `5.6 Sauvegardes`,
      nav: `Sauvegardes`,
      html: `      <p>Fichiers critiques à sauvegarder : <code>settings.toml</code>, le fichier <code>.env</code> si vous y gardez votre nsec (voir 4.1) ou votre clé d'export de réputation (4.13), et <code>mostro.db</code> (historique des ordres, réputation). Si vous activez l'historique du payeur (4.11), gardez les sauvegardes de la base séparées du nsec : l'historique est indexé par celui-ci.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Ne copiez pas une base active avec cp</div>
        <p>SQLite fonctionne en mode WAL : les écritures récentes vivent dans <code>mostro.db-wal</code> jusqu'à leur consolidation. Copier seulement <code>mostro.db</code> pendant que Mostro tourne peut produire une sauvegarde privée des transactions les plus récentes. Utilisez la commande de sauvegarde propre à SQLite, sûre sur une base active et qui écrit un fichier unique et cohérent.</p>
      </div>

      <pre><code># Sauvegarde manuelle — Docker Hub :
mkdir -p /root/mostro-backups
sqlite3 ~/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp ~/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp ~/mostro-config/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null

# Sauvegarde manuelle — Docker Build (Option B) :
sqlite3 /opt/mostro/docker/config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/docker/config/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp /opt/mostro/docker/config/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null

# Sauvegarde manuelle — Native :
sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp /opt/mostro/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null</code></pre>

      <p><strong>Sauvegarde quotidienne automatique</strong> (à ajouter au crontab avec <code>crontab -e</code>) :</p>
      <pre><code># Docker Hub (Option A) :
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /root/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /root/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d); cp /root/mostro-config/.env /root/mostro-backups/env.$(date +\\%Y\\%m\\%d) 2>/dev/null

# Docker Build (Option B) :
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/docker/config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/docker/config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d); cp /opt/mostro/docker/config/.env /root/mostro-backups/env.$(date +\\%Y\\%m\\%d) 2>/dev/null

# Native (Option C) :
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d); cp /opt/mostro/.env /root/mostro-backups/env.$(date +\\%Y\\%m\\%d) 2>/dev/null</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Critique</div>
        <p>Votre <code>nsec_privkey</code> dans <code>settings.toml</code> EST l'identité de votre nœud. Si vous la perdez, vous perdez votre réputation et tous les utilisateurs doivent se reconnecter à une nouvelle identité. <strong>Conservez une copie hors ligne.</strong></p>
      </div>

      <h4>Si vous faites tourner votre propre LND</h4>
      <p>Les sauvegardes de Mostro ne couvrent pas votre nœud Lightning. Les fonds de vos canaux dépendent de deux sauvegardes de LND :</p>
      <ul>
        <li><strong>La seed du portefeuille</strong> (24 mots, plus la passphrase si vous en avez défini une), affichée une seule fois à la création du portefeuille. Notez-la hors ligne.</li>
        <li><strong>La sauvegarde statique des canaux</strong>, <code>channel.backup</code> (par exemple <code>~/.lnd/data/chain/bitcoin/mainnet/channel.backup</code>). LND la réécrit à chaque ouverture ou fermeture de canal, copiez-la donc régulièrement hors de la machine, par exemple dans la même tâche cron que les sauvegardes de Mostro. Avec la seed et ce fichier, vous pouvez fermer vos canaux et récupérer les fonds sur un nouveau nœud.</li>
      </ul>
      <p>Ne sauvegardez ni ne restaurez jamais <code>channel.db</code> pour récupérer des canaux : une copie obsolète fait diffuser à votre nœud d'anciens états, et les pairs peuvent prendre tous les fonds de ces canaux. Les systèmes nœud-en-boîte et Voltage ont leurs propres fonctions de sauvegarde ; activez-les. La documentation de LND couvre la récupération en détail (<a href="https://docs.lightning.engineering/lightning-network-tools/lnd/recovery-planning-for-failure" target="_blank" rel="noopener noreferrer">planification de la récupération</a>).</p>`,
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

      <p>Le mode maintenance permet de vider d'abord. Tant qu'il est actif, les nouveaux ordres et prises sont refusés et les transactions ouvertes continuent, afin que l'escrow puisse se régler. Il exige l'interface RPC activée (voir 4.7), et l'appel n'est accepté que depuis le loopback : lancez-le sur l'hôte du nœud, ou via <code>ssh -N -L 50051:127.0.0.1:50051 user@node</code>.</p>
      <p>Mostro peut aussi passer seul en maintenance, avec la raison <code>lnd_unsynced</code>, quand LND se désynchronise (5.4). Si vous activez la maintenance pendant que celle-ci est active, elle devient la vôtre et le daemon ne la lèvera pas ; vous ne pouvez pas utiliser <code>lnd_unsynced</code> comme votre propre raison.</p>

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
      html: `      <p>Mostrix est la façon confortable de traiter les litiges, et <code>mostro-cli</code> couvre l'essentiel depuis un shell, plus quelques commandes d'opérateur que Mostrix n'a pas. Les commandes de litige sont signées avec une clé Nostr passée en <code>ADMIN_NSEC</code>, qui doit être celle du daemon lui-même ou celle d'un solveur enregistré. Le CLI ne lit aucun fichier de configuration : définissez votre nœud et vos relais dans l'environnement, et placez les options globales avant la sous-commande.</p>

      <pre><code># Traitement des litiges (via Nostr)
export MOSTRO_PUBKEY=npub1...            # votre nœud
export RELAYS=wss://relay.mostro.network
export ADMIN_NSEC=nsec1...
mostro-cli listdisputes
mostro-cli admtakedispute -d &lt;dispute-id&gt;     # affiche les pubkeys de l'acheteur et du vendeur
mostro-cli getadmindm -s 120
mostro-cli admsenddm -p &lt;party-pubkey&gt; -m "message à une partie"
mostro-cli admsettle -o &lt;order-id&gt; [--slashseller] [--slashbuyer]   # libérer vers l'acheteur
mostro-cli admcancel -o &lt;order-id&gt; [--slashseller] [--slashbuyer]   # rembourser le vendeur

# Enregistrer un arbitre, éventuellement en lecture seule
mostro-cli admaddsolver -n npub1...:read</code></pre>

      <p>Les options de confiscation ne comptent qu'avec les cautions anti-abus (4.11). Notez l'orthographe : <code>--slashseller</code>, pas <code>--slash-seller</code>. <code>admsenddm</code> envoie un message direct depuis la clé admin ; ce n'est pas le chat par litige qu'utilisent l'application Mostro, Mostrix et Bosstro : privilégiez donc ces clients pour parler aux parties.</p>

      <p>Un autre groupe de commandes passe par le gRPC d'administration plutôt que par Nostr : elles nécessitent l'interface RPC activée (voir 4.7) plutôt qu'<code>ADMIN_NSEC</code>. <code>MOSTRO_RPC_URL</code> vaut par défaut <code>http://127.0.0.1:50051</code>, et <code>MOSTRO_RPC_TOKEN</code> n'est nécessaire que si vous avez défini <code>auth_token</code>.</p>

      <pre><code>export MOSTRO_RPC_URL=http://127.0.0.1:50051
export MOSTRO_RPC_TOKEN=votre-token-auth

mostro-cli admsetmaintenance -e true -r "motif"
mostro-cli admmaintenancestatus
mostro-cli admcancelpending -o &lt;order-id&gt;</code></pre>

      <p><code>admcancelpending</code> mérite d'être connu en dehors d'une migration. Il annule un ordre encore en attente ou attendant une caution, prévient le créateur et libère toutes ses cautions d'un coup. Utilisez-le pour un ordre clairement abandonné ou mal valorisé, et prévenez le créateur d'abord : c'est son ordre, et ce n'est pas une résolution de litige.</p>

      <p>mostro-cli n'a pas encore de commandes pour l'import et l'export de réputation, l'historique du payeur ou l'événement de santé : utilisez <code>grpcurl</code> pour les RPC de réputation (4.13) et les commandes de 5.4 pour l'événement de santé. Installez-le avec <code>cargo install mostro-cli</code> (Rust 1.97 ou plus récent) ou prenez un binaire dans <a href="https://github.com/MostroP2P/mostro-cli/releases" target="_blank" rel="noopener noreferrer">ses releases</a> ; lancez <code>mostro-cli &lt;command&gt; --help</code> pour chaque option.</p>`,
    },
    'serbero': {
      title: `5.10 Serbero — Assistant de litiges`,
      nav: `Serbero`,
      html: `      <p><a href="https://github.com/MostroP2P/serbero" target="_blank" rel="noopener noreferrer">Serbero</a> est un assistant facultatif pour les litiges de votre nœud. Vous le faites tourner à côté de Mostro, avec une clé Nostr à lui. Il a deux missions :</p>
      <ul>
        <li><strong>Notifier (toujours actif).</strong> Chaque solveur que vous listez reçoit un message direct quelques secondes après un nouveau litige, avec des rappels toutes les 15 minutes jusqu'à ce que quelqu'un le prenne.</li>
        <li><strong>Médier (optionnel, pilote).</strong> Serbero prend le litige, demande à l'acheteur s'il a payé et au vendeur si l'argent est arrivé, leur laisse le temps de terminer eux-mêmes la transaction, et sinon confie le cas à un solveur humain avec un résumé et la transcription complète.</li>
      </ul>
      <p>Serbero ne déplace jamais de fonds et ne tranche jamais un litige. Mostro l'enregistre comme solveur en <strong>lecture seule</strong> : il ne peut donc ni régler ni annuler, et tout solveur read-write peut lui reprendre un litige à tout moment. Si Serbero est arrêté, Mostro et vos solveurs fonctionnent exactement comme avant. Gardez au moins un solveur humain read-write.</p>

      <h4>Installer</h4>
      <p>Chaque release propose des binaires pour Linux (x86_64, aarch64) et macOS (Apple silicon), chacun avec un fichier SHA-256. Les noms de fichier portent la version :</p>
      <pre><code>V=$(curl -fsSL https://api.github.com/repos/MostroP2P/serbero/releases/latest | grep -m1 '"tag_name"' | cut -d'"' -f4)
A=serbero-$V-x86_64-unknown-linux-gnu        # aarch64-unknown-linux-gnu sur ARM64
curl -LO https://github.com/MostroP2P/serbero/releases/download/$V/$A.tar.gz
curl -LO https://github.com/MostroP2P/serbero/releases/download/$V/$A.tar.gz.sha256
shasum -a 256 -c $A.tar.gz.sha256
tar -xzf $A.tar.gz && cd $A        # serbero, config.sample.toml, deploy/</code></pre>
      <p>Avec Rust installé, <code>cargo install serbero --locked</code> fonctionne aussi. Une image Docker (<code>ghcr.io/mostrop2p/serbero</code>) et un fichier compose sont décrits dans le README du projet.</p>

      <h4>Configurer</h4>
      <pre><code>cp config.sample.toml config.toml
nano config.toml</code></pre>
      <pre><code>[serbero]
private_key_env = "SERBERO_PRIVATE_KEY"   # nomme le secret ; la clé ne va jamais dans ce fichier
db_path = "serbero.db"

[mostro]
pubkey = "VOTRE_MOSTRO_PUBKEY_HEX"
relays = ["wss://relay.mostro.network", "wss://nos.lol"]   # relais sur lesquels votre nœud publie

# Une entrée par solveur humain : la pubkey hex de la clé que son client utilise
# (Mostrix : admin_privkey). Ne listez jamais la clé de Serbero lui-même.
[[solvers]]
pubkey = "SOLVER_PUBKEY_HEX"
permission = "write"

[notify]
renotify_after = "15m"

[mediation]
enabled = false</code></pre>

      <h4>Le lancer comme service</h4>
      <p>Le projet fournit une unité systemd durcie. Téléchargez-la depuis <code>main</code> : la copie contenue dans l'archive v0.2.5 exige systemd 251 et ne démarre pas sur Ubuntu 22.04.</p>
      <pre><code>sudo useradd --system --home-dir /var/lib/serbero --shell /usr/sbin/nologin serbero
sudo install -m 755 serbero /usr/local/bin/serbero
sudo install -d -m 755 /etc/serbero
sudo install -m 644 config.toml /etc/serbero/config.toml
sudo install -d -m 700 /etc/serbero/credentials
sudo sh -c 'umask 077; openssl rand -hex 32 > /etc/serbero/credentials/serbero_private_key'
curl -fsSLO https://raw.githubusercontent.com/MostroP2P/serbero/main/deploy/serbero.service
sudo install -m 644 serbero.service /etc/systemd/system/serbero.service
sudo systemctl daemon-reload && sudo systemctl enable --now serbero
journalctl -u serbero -f        # notez le npub qu'il journalise au démarrage</code></pre>
      <p>Sauvegardez <code>/etc/serbero/credentials/serbero_private_key</code> hors ligne. C'est l'identité de Serbero : si vous la perdez, vous devez enregistrer un nouveau npub.</p>

      <h4>L'enregistrer sur votre nœud</h4>
      <p>Mostro v0.19.1 ou plus récent enregistre Serbero pour vous. Ajoutez son npub au bloc <code>[mostro]</code> de votre <code>settings.toml</code> et redémarrez Mostro :</p>
      <pre><code>[mostro]
serbero_pubkey = "npub1..."   # la clé de Serbero, npub ou hex</code></pre>
      <p>Au démarrage, Mostro enregistre cette clé comme solveur en lecture seule et l'annonce dans son événement d'info. Cette annonce permet à l'application Mostro d'étiqueter les messages de Serbero et à mostro-watchdog de le trouver. Le log le confirme : <code>Serbero npub1... configured: registered as a read-only solver</code>.</p>
      <div class="callout important">
        <div class="callout-title">⚠️ N'ajoutez pas Serbero avec admaddsolver</div>
        <p>Un npub nu ajouté avec <code>admaddsolver</code> devient read-write (5.1), et Mostro refuse alors de démarrer avec <code>REFUSING TO START: serbero_pubkey ... is a solver with write permission</code>. Il refuse aussi une clé appartenant à un utilisateur qui n'est pas solveur, et la clé de votre propre nœud. Donnez à Serbero une clé à lui et laissez <code>serbero_pubkey</code> l'enregistrer.</p>
      </div>

      <h4>Vos solveurs lisent Serbero dans Mostrix</h4>
      <p>Mostrix 0.3.5 ou plus récent affiche les messages de Serbero dans un panneau <strong>SERBERO</strong> pour chaque litige, mais seulement ceux d'expéditeurs auxquels le solveur fait confiance. Dans le <code>~/.mostrix/settings.toml</code> de chaque solveur :</p>
      <pre><code>trusted_dm_senders = ["npub1..."]   # le npub de Serbero</code></pre>
      <p>La pubkey de l'<code>admin_privkey</code> du solveur doit être exactement celle d'une entrée <code>[[solvers]]</code>, et Mostrix doit lire au moins l'un des relais de Serbero. Pour reprendre un cas, appuyez sur <kbd>Ctrl+T</kbd> sur un transfert ; cela exige la permission read-write, et Serbero cesse aussitôt d'écrire. Bosstro (5.11) n'affiche pas encore les résumés de Serbero.</p>

      <h4>Activer la médiation (pilote)</h4>
      <p>La médiation est livrée désactivée. Activée, Serbero prend chaque nouveau litige et se présente aux deux parties comme un assistant automatisé, dans leur langue (anglais, espagnol ou portugais), une courte question à la fois. Quand les deux ont répondu, il leur laisse 30 minutes pour régler la transaction eux-mêmes, puis confie le cas à vos solveurs. Il ne dit jamais à personne de libérer ou d'annuler.</p>
      <p>Pour lire les réponses, Serbero interroge un modèle juge (Jev de TypeSafe) sur <strong>votre propre</strong> compte payant. Le juge reçoit les rôles de la transaction, le montant, la devise et le moyen de paiement, ainsi que le texte des messages — jamais les clés publiques. Demandez au fournisseur une rétention de données nulle, et prévenez vos utilisateurs que les messages de litige sont traités par un service automatisé. Le README explique la clé d'API et le tableau des seuils ; définissez <code>enabled = true</code> sous <code>[mediation]</code> et redémarrez, et le log indique <code>mediation ready</code> ou pourquoi ce n'est pas le cas.</p>
      <p>Les messages des parties sont des événements kind 14 : utilisez plus d'un relais, et seulement des relais qui les stockent, sinon les messages envoyés pendant que Serbero est hors ligne sont perdus. Pour publier la progression de Serbero sur le Telegram de votre équipe, enregistrez mostro-watchdog comme observateur (5.3). Sauvegardez <code>serbero.db</code> en privé : il contient les conversations des litiges.</p>`,
    },
    'bosstro': {
      title: `5.11 Bosstro — Résoudre des litiges depuis un téléphone`,
      nav: `Bosstro`,
      html: `      <p><a href="https://github.com/MostroP2P/bosstro" target="_blank" rel="noopener noreferrer">Bosstro</a> est l'application Android pour les solveurs de litiges. Elle apporte le côté admin de Mostrix sur un téléphone : un solveur voit les litiges en attente de votre nœud, en prend un, discute avec l'acheteur et le vendeur (images et PDF compris), lit le chat propre des parties quand l'une d'elles partage sa clé et, avec la permission read-write, paie l'acheteur ou rembourse le vendeur, avec l'option de caution quand votre nœud en a.</p>
      <p>C'est un outil pour vos solveurs, pas pour échanger, et il ne détient jamais la clé de votre nœud. L'enregistrement des solveurs se fait toujours depuis Mostrix ou <code>mostro-cli</code> (5.2).</p>

      <h4>Installer et vérifier</h4>
      <p>Android 7.0 ou plus récent. Téléchargez l'APK depuis <a href="https://github.com/MostroP2P/bosstro/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a> : <code>arm64-v8a</code> pour presque tous les téléphones, <code>armeabi-v7a</code> pour un ancien modèle 32 bits. Comparez-le au fichier de sommes de contrôle de la release :</p>
      <pre><code>sha256sum -c SHA256SUMS.txt --ignore-missing</code></pre>
      <p>La somme de contrôle prouve seulement que le téléchargement est complet. Le certificat de signature prouve qui l'a compilé, et Android refuse une mise à jour signée avec une autre clé. Comparez-le avec <a href="https://github.com/soupslurpr/AppVerifier" target="_blank" rel="noopener noreferrer">AppVerifier</a> :</p>
      <pre><code>foundation.mostro.bosstro
63:92:27:84:C2:E3:2A:F4:B6:03:0F:5E:2A:18:1F:74:9B:F6:95:E5:2F:1C:A8:45:7E:98:CB:05:D2:9E:B3:4B</code></pre>

      <h4>Ajouter un solveur</h4>
      <ol>
        <li>Le solveur ouvre Bosstro, touche <strong>Create new account</strong> (ou <strong>Log in</strong> avec un nsec de solveur existant) et vous envoie le npub. Cette clé ne doit servir à rien d'autre — jamais la clé d'une application de trading, sinon les deux rôles sont reliés publiquement.</li>
        <li>Vous l'enregistrez, en lecture seule pour commencer (5.1) :
          <pre><code>ADMIN_NSEC=nsec1... mostro-cli admaddsolver -n npub1solver...:read</code></pre></li>
        <li>Le solveur choisit votre nœud dans Bosstro : Mostro, une communauté de la liste, ou votre propre pubkey et vos relais. Bosstro apprend, d'après les réponses de votre nœud, si la clé est celle d'un solveur et avec quelle permission.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Limites actuelles</div>
        <p>Bosstro ne parle que le protocole v2 (4.8). La version 0.1 n'affiche pas les résumés de transfert de Serbero et n'a pas encore de notifications push : les solveurs qui travaillent avec Serbero ont donc encore besoin de Mostrix pour cela. Un solveur read-write peut reprendre un litige à Serbero dans Bosstro.</p>
      </div>`,
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
      <p>Beaucoup de gens font tourner LND sur un Raspberry Pi 4 ou 5 avec un SSD, via Start9, Umbrel ou RaspiBlitz, et le paquet Mostro de StartOS peut tourner à côté. Pour un nœud dont dépend votre communauté, un VPS est plus fiable qu'une connexion et une alimentation domestiques. Un compromis courant : LND à la maison et Mostro sur un VPS, reliés par un VPN (voir 2.2).</p>

      <h3>Puis-je utiliser Core Lightning (CLN) au lieu de LND ?</h3>
      <p>Non. Mostro ne supporte actuellement que LND, car il dépend de l'implémentation spécifique des hold invoices de LND. Le support d'autres implémentations pourrait arriver à l'avenir.</p>

      <h3>Comment les utilisateurs se connectent-ils à mon Mostro ?</h3>
      <p>Les utilisateurs ont besoin d'un client Mostro — l'<a href="https://github.com/MostroP2P/app" target="_blank" rel="noopener noreferrer">application Mostro</a> pour Android, iOS, ordinateur et web, ou mostro-cli ou Mostrix — et de la clé publique de votre Mostro (npub). Dans l'application, ils vont dans <em>Paramètres → Réseau → Nœud Mostro → Ajouter votre propre nœud</em> et collent votre npub ; les nœuds listés sur ce site y apparaissent déjà. Le client communique via les relays Nostr. Aucune connexion directe n'est nécessaire.</p>

      <h3>Mon nœud peut-il encore servir d'anciens clients (protocole v1) ?</h3>
      <p>Non. Depuis la v0.19.0, Mostro ne parle que le protocole v2 (4.8). Les utilisateurs d'un ancien client doivent passer à l'application Mostro ou à un Mostrix ou mostro-cli récent.</p>

      <h3>Mes utilisateurs peuvent-ils échanger de l'USDT, du Liquid ou du Rootstock au lieu du fiat ?</h3>
      <p>Oui, depuis la v0.20.2 : USDT, USDC, DOC, BTC on-chain, LBTC et RBTC. Vous les activez un par un, et vos solveurs doivent savoir vérifier ces transferts. Voyez 4.12.</p>

      <h3>Les utilisateurs peuvent-ils apporter leur réputation de lnp2pBot ou d'un autre Mostro ?</h3>
      <p>Oui, si vous faites confiance à la source. Activez l'import de réputation et ajoutez la clé de lnp2pBot, ou celle d'un nœud Mostro de confiance (4.13). Vous pouvez aussi laisser vos utilisateurs exporter la réputation acquise sur votre nœud.</p>

      <h3>Puis-je faire tourner plusieurs instances de Mostro ?</h3>
      <p>Oui, mais chacune nécessite sa propre paire de clés Nostr, son nœud LND (ou au moins des canaux/liquidité séparés) et sa configuration.</p>

      <h3>Est-ce légal ?</h3>
      <p>Cela dépend beaucoup de votre juridiction. Mostro est un logiciel d'échange peer-to-peer. Dans certaines juridictions, opérer un exchange P2P peut nécessiter des licences. <strong>Consultez les réglementations locales et un conseiller juridique.</strong></p>

      <h3>Quelle bande passante utilise Mostro ?</h3>
      <p>Très peu — principalement de petits événements Nostr. Quelques Go par mois est typique même avec un volume modéré.</p>

      <h3>Que se passe-t-il si mon nœud se déconnecte ?</h3>
      <p>Les ordres en attente finissent par expirer. Les transactions actives avec des fonds bloqués continuent quand vous revenez en ligne. Si vous êtes hors ligne trop longtemps, les utilisateurs peuvent perdre confiance. Depuis la v0.18.3, il existe aussi une échéance pour l'escrow : si le nœud reste hors ligne assez longtemps pour que la hold invoice approche son horizon CLTV, LND l'annule et le vendeur est remboursé automatiquement. Si c'est votre LND qui se désynchronise alors que Mostro continue de tourner, les paiements attendent au lieu d'échouer et, au bout de 10 minutes, le nœud passe seul en maintenance jusqu'à ce que LND récupère (5.4).</p>

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
        <li><strong>Pensez également à la confidentialité de votre nœud Lightning.</strong> Faire tourner LND derrière Tor est possible et recommandé dans les environnements sensibles. Votre événement d'info publie la pubkey de LND et les adresses qu'il annonce : faites donc annoncer à LND uniquement des adresses Tor.</li>
        <li><strong>Sachez ce que votre nœud publie.</strong> L'événement de santé (5.4) est public : statut, hauteur de bloc et réseau de LND, version de Mostro. Définir un <code>watchdog_pubkey</code> ajoute un tag qui relie votre nœud à cette clé. Désactivez-le avec <code>[health] enabled = false</code> si cela compte plus que la surveillance.</li>
        <li><strong>Les variables de proxy ne suffisent pas.</strong> Les résolutions d'adresses Lightning ignorent volontairement <code>HTTP_PROXY</code>/<code>HTTPS_PROXY</code>. Pour masquer l'IP du serveur, faites passer toute la machine par Tor ou un VPN.</li>
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

      <h4><code>transport = "gift-wrap" (protocol v1) is no longer supported</code></h4>
      <p>Supprimez la ligne <code>transport</code> de <code>settings.toml</code>. Voyez 4.8.</p>

      <h4><code>escrow_deadline_margin_blocks (X) must be at least 18 ...</code> ou <code>... must be below hold_invoice_cltv_delta</code></h4>
      <p>Réglez la marge entre 18 et <code>hold_invoice_cltv_delta</code> ; les 24 du modèle avec 144 conviennent. Voyez 4.9.</p>

      <h4><code>unknown field mint_url</code></h4>
      <p>Dans <code>[cashu]</code>, renommez-le en <code>mint_urls = ["..."]</code>. Voyez 4.11.</p>

      <h4><code>anti_abuse_bond.bond_cltv_delta ... must be above hold_invoice_cltv_delta + 144</code> ou <code>... must be at most 864</code></h4>
      <p>Définissez <code>bond_cltv_delta</code> explicitement dans ces bornes. En v0.20.2, des cautions avec un <code>hold_invoice_cltv_delta</code> de 288 ou plus déclenchent cette erreur avec la valeur par défaut. Voyez 4.11.</p>

      <h4><code>REFUSING TO START: serbero_pubkey ...</code></h4>
      <p>La clé de Serbero est déjà un solveur read-write, appartient à un utilisateur, ou est la clé de votre propre nœud. Donnez à Serbero une clé à lui. Voyez 5.10.</p>

      <h4>Des réglages de réputation empêchent le démarrage</h4>
      <p>Les noms d'émetteurs doivent être uniques et chaque clé valide et listée une seule fois ; la clé d'un émetteur ne doit jamais passer à un autre nom une fois qu'elle a des imports. Avec l'export activé, <code>MOSTRO_REPUTATION_ISSUER_SK</code> doit être définie, valide, différente de la clé de votre nœud et absente de votre propre liste d'import. Voyez 4.13.</p>

      <h4>Les clients ne voient pas mes ordres, ou ne peuvent pas écrire à mon nœud</h4>
      <p>Votre nœud ne parle que le protocole v2. Un utilisateur d'un ancien client limité au protocole v1 n'obtient aucune réponse et doit mettre à jour (4.8). Vérifiez aussi que les clients et votre nœud partagent au moins un relais.</p>

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

      <h4>Les paiements ne partent pas, mais il n'y a aucune erreur</h4>
      <p>Vérifiez si LND est synchronisé : <code>lncli getinfo</code>. Tant qu'il ne l'est pas, Mostro retient les paiements volontairement et les renvoie dès que LND récupère (5.4).</p>

      <h4>Les utilisateurs reçoivent des refus « maintenance » alors que je ne l'ai jamais activée</h4>
      <p><code>mostro-cli admmaintenancestatus</code> montre la raison. <code>lnd_unsynced</code> signifie que Mostro l'a activée parce que LND s'est désynchronisé ; il la lève de lui-même 5 minutes après que LND est de nouveau synchronisé (5.4).</p>

      <h4>Les frais de développement ne sont jamais payés</h4>
      <p>Sur testnet, signet ou regtest, c'est normal : les frais de développement ne sont payés que sur mainnet (4.2).</p>

      <h4>Les ordres au prix du marché dans une devise sont refusés</h4>
      <p>Votre nœud n'a aucun taux pour elle. Vérifiez les avertissements <code>price:</code> du log de démarrage : un bloc <code>[price]</code> sans source de marché activée, ou un stablecoin coté mais absent de <code>fiat_currencies_accepted</code>, en sont les causes habituelles. Voyez 4.10 et 4.12.</p>

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
