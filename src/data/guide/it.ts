import type { GuideTranslation } from './types';

/**
 * it translation of the node guide.
 *
 * `{{version}}` and `{{updated}}` are replaced at render time with the
 * current Mostro release tag and its month. Section order and heading levels
 * live in `./sections.ts`, not here.
 */
const it: GuideTranslation = {
  meta: {
    title: `Guida alla Configurazione del Nodo — Mostro Community`,
    description: `Guida completa per eseguire il tuo nodo Mostro P2P per lo scambio di Bitcoin.`,
    h1: `Eseguire il Tuo Nodo Mostro`,
    versionLine: `Mostro {{version}} — Guida della Comunità · {{updated}}`,
    tocTitle: `In questa pagina`,
    tocButton: `📑 Indice`,
    credit: `      <div style="text-align:center; margin-top:48px; padding:24px; border-top:1px solid var(--border);">
        <p>Questa guida è mantenuta dalla comunità Mostro. Hai trovato un errore o vuoi migliorarla?<br>
        I contributi sono benvenuti su <a href="https://github.com/MostroP2P/community" target="_blank" rel="noopener noreferrer">github.com/MostroP2P/community</a></p>
        <p style="color:var(--text-secondary); margin-top:12px;">Ultimo aggiornamento: {{updated}} · Mostro {{version}}</p>
      </div>`,
  },

  sections: {
    'what-is-mostro': {
      title: `1. Cos'è Mostro e perché la tua comunità dovrebbe eseguirne uno?`,
      nav: `1. Cos'è Mostro?`,
      navShort: `1. Cos'è Mostro?`,
      html: `      <p>Mostro è un <strong>exchange peer-to-peer di Bitcoin</strong> che permette alle persone di comprare e vendere Bitcoin utilizzando valute locali (dollari, euro, pesos — qualsiasi valuta) senza dover fornire documenti d'identità (KYC). Pensalo come un marketplace decentralizzato dove acquirenti e venditori possono commerciare direttamente.</p>

      <p>Funziona utilizzando due tecnologie:</p>
      <ul>
        <li><strong>Lightning Network</strong> — un livello di pagamento rapido e a basso costo per Bitcoin (pensalo come la corsia preferenziale di Bitcoin per pagamenti piccoli e veloci)</li>
        <li><strong>Nostr</strong> — un protocollo di comunicazione resistente alla censura (pensalo come un sistema di messaggistica che nessuno può spegnere)</li>
      </ul>

      <p>Mostro agisce come un <strong>coordinatore di custodia</strong> — trattiene i Bitcoin del venditore in una "cassaforte" temporanea (chiamata hold invoice) fino a quando l'acquirente conferma di aver inviato il pagamento in valuta locale. Mostro non controlla mai realmente i fondi di nessuno; li trattiene solo brevemente durante lo scambio.</p>`,
    },
    'why-run': {
      title: `Perché la tua comunità vorrebbe eseguire un nodo Mostro?`,
      nav: `Perché un nodo?`,
      html: `      <ol>
        <li><strong>Entrate da commissioni</strong> — Ogni operazione ti genera una commissione (0,6% di default). Se la tua comunità fa $10.000 in operazioni mensili, sono ~$60/mese in commissioni.</li>
        <li><strong>Trading P2P senza KYC</strong> — I membri della tua comunità possono comprare e vendere Bitcoin senza fornire documenti d'identità. Particolarmente importante in regioni con valute instabili o regolamentazioni restrittive.</li>
        <li><strong>Dispute nella tua lingua</strong> — Quando un'operazione va storta, la <em>tua</em> comunità la risolve, nella <em>tua</em> lingua, comprendendo i <em>tuoi</em> metodi di pagamento locali.</li>
        <li><strong>Indipendenza</strong> — Nessuna azienda può chiudere il tuo exchange. Nessun governo può fare pressione su un singolo operatore per chiuderlo.</li>
        <li><strong>Personalizzazione</strong> — Tu scegli quali valute supportare, quali metodi di pagamento consentire e quali commissioni applicare.</li>
      </ol>`,
    },
    'how-it-works': {
      title: `Come funziona Mostro (Semplificato)`,
      nav: `Come funziona`,
      html: `      <div class="flow-diagram">
        <div class="flow-step"><span class="step-num">1.</span> Alice vuole VENDERE Bitcoin per $50 USD <span class="arrow">→</span> Crea un ordine su Mostro</div>
        <div class="flow-step"><span class="step-num">2.</span> Bob vuole COMPRARE Bitcoin con $50 USD <span class="arrow">→</span> Vede l'ordine di Alice e lo prende</div>
        <div class="flow-step"><span class="step-num">3.</span> Mostro crea una "cassaforte" (hold invoice) <span class="arrow">→</span> Alice invia i suoi Bitcoin nella cassaforte</div>
        <div class="flow-step"><span class="step-num">4.</span> Bob invia $50 ad Alice tramite bonifico, Zelle, contanti, ecc. <span class="arrow">→</span> Bob preme "Fiat Inviato" nella sua app</div>
        <div class="flow-step"><span class="step-num">5.</span> Alice conferma di aver ricevuto i $50 <span class="arrow">→</span> Preme "Rilascia"</div>
        <div class="flow-step"><span class="step-num">6.</span> Mostro rilascia i Bitcoin dalla cassaforte a Bob <span class="arrow">→</span> Operazione completata! ✓</div>
      </div>

      <p>Se qualcosa va storto (es: Bob dice di aver pagato ma Alice non ha ricevuto), una delle parti può aprire una <strong>disputa</strong>, e gli arbitri assegnati della tua comunità indagano e risolvono.</p>`,
    },
    'prerequisites': {
      title: `2. Prerequisiti — Cosa ti serve prima di iniziare`,
      nav: `2. Prerequisiti`,
      navShort: `2. Prerequisiti`,
      html: ``,
    },
    'vps': {
      title: `2.1 Un Server (VPS)`,
      nav: `Server (VPS)`,
      html: `      <p>Un <strong>VPS</strong> (Virtual Private Server) è un computer in un data center che funziona 24/7. Ne affitterai uno per ospitare il tuo nodo Mostro.</p>

      <p><strong>Specifiche minime:</strong></p>
      <table class="guide-table">
        <thead><tr><th>Risorsa</th><th>Minimo</th><th>Raccomandato</th></tr></thead>
        <tbody>
          <tr><td>CPU</td><td>2 vCPU (condivise)</td><td>2+ vCPU</td></tr>
          <tr><td>RAM</td><td>2 GB</td><td>4 GB</td></tr>
          <tr><td>Storage</td><td>60 GB SSD</td><td>100 GB SSD</td></tr>
          <tr><td>Banda</td><td>3 TB/mese</td><td>3+ TB/mese</td></tr>
          <tr><td>SO</td><td>Ubuntu 22.04+ LTS</td><td>Ubuntu 24.04 LTS</td></tr>
        </tbody>
      </table>

      <p><strong>Costo mensile stimato:</strong> $10–$24/mese.</p>

      <p><strong>Provider VPS popolari:</strong></p>
      <ul>
        <li><a href="https://www.hostinger.com/" target="_blank" rel="noopener noreferrer">Hostinger</a> — da ~$7/mese (prezzo promozionale; il rinnovo potrebbe essere più alto) (KVM 2: 2 vCPU, 8GB RAM, 100GB NVMe, 8TB banda) · Accetta Bitcoin</li>
        <li><a href="https://www.hetzner.com/" target="_blank" rel="noopener noreferrer">Hetzner</a> — €3,49-8/mese (CX23 da €3,49, buon rapporto qualità-prezzo, basato in UE)</li>
        <li><a href="https://www.digitalocean.com/" target="_blank" rel="noopener noreferrer">Digital Ocean</a> — $24/mese (4GB RAM, 2 CPU, 80GB SSD) o $32/mese (4GB RAM, 2 Intel CPU, 120GB NVMe)</li>
        <li><a href="https://www.ovhcloud.com/" target="_blank" rel="noopener noreferrer">OVH</a> — ~$6-12/mese</li>
        <li><a href="https://www.linode.com/" target="_blank" rel="noopener noreferrer">Linode/Akamai</a> — $12/mese</li>
        <li><a href="https://www.lunanode.com/" target="_blank" rel="noopener noreferrer">Lunanode</a> — Accetta pagamenti in Bitcoin</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Consiglio</div>
        <p>Molti provider VPS accettano pagamenti in Bitcoin. Cerca questa opzione se vuoi mantenere coerenza con la filosofia Bitcoin.</p>
      </div>

      <p>Devi sentirti a tuo agio nel connetterti a un server tramite SSH. Se non l'hai mai fatto, cerca un tutorial su "Connettersi via SSH a un VPS" — è più semplice di quanto sembri.</p>`,
    },
    'lnd': {
      title: `2.2 Un Nodo Lightning Network (LND)`,
      nav: `Nodo Lightning (LND)`,
      html: `      <p>Lightning Network è un sistema "layer 2" costruito su Bitcoin che permette pagamenti rapidi e economici. Per eseguire Mostro, hai bisogno di un <strong>nodo LND</strong> (Lightning Network Daemon) — il software Lightning specifico con cui Mostro lavora.</p>

      <p><strong>Le tue opzioni:</strong></p>
      <table class="guide-table">
        <thead><tr><th>Opzione</th><th>Difficoltà</th><th>Costo</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>Usare un nodo LND esistente</td><td><span class="badge badge-easy">Facile</span></td><td>Gratis (se ne hai uno)</td><td>Meglio se qualcuno ne ha già uno</td></tr>
          <tr><td>Eseguire LND sullo stesso VPS</td><td><span class="badge badge-hard">Difficile</span></td><td>Stesso VPS + liquidità</td><td>Richiede VPS con 4GB+ RAM</td></tr>
          <tr><td>Soluzione nodo-in-a-box</td><td><span class="badge badge-medium">Medio</span></td><td>$200-600 + liquidità</td><td><a href="https://start9.com/" target="_blank" rel="noopener noreferrer">Start9</a>, <a href="https://umbrel.com/" target="_blank" rel="noopener noreferrer">Umbrel</a>, <a href="https://raspiblitz.org/" target="_blank" rel="noopener noreferrer">RaspiBlitz</a></td></tr>
          <tr><td>StartOS con pacchetto Mostro</td><td><span class="badge badge-easy">Più facile</span></td><td>$300-600 + liquidità</td><td>Start9 ha un pacchetto Mostro con un clic</td></tr>
          <tr><td>Usare Voltage.cloud</td><td><span class="badge badge-easy">Facile</span></td><td>Da ~$20/mese + liquidità</td><td><a href="https://voltage.cloud/" target="_blank" rel="noopener noreferrer">Voltage</a> — LND ospitato con infrastruttura gestita</td></tr>
        </tbody>
      </table>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>Mostro richiede specificamente <strong>LND</strong> (non CLN/Core Lightning, non Eclair, non LDK). Assicurati che il tuo nodo Lightning esegua LND.</p>
      </div>

      <p><strong>Cosa ti serve dal tuo nodo LND:</strong></p>
      <ul>
        <li>Il file <code>tls.cert</code> (un certificato di sicurezza)</li>
        <li>Un file <code>mostro.macaroon</code> dedicato (un token di autenticazione con solo i permessi di cui Mostro ha bisogno, vedi sotto)</li>
        <li>L'indirizzo gRPC (tipicamente <code>https://127.0.0.1:10009</code> se sulla stessa macchina)</li>
      </ul>

      <p><strong>Genera un macaroon dedicato per Mostro.</strong> Non dare a Mostro il tuo <code>admin.macaroon</code>: concede il controllo totale sul tuo nodo e sui suoi fondi. Crea un macaroon che contenga solo i permessi che Mostro usa davvero (leggere le info del nodo, creare/regolare/annullare hold invoice, inviare e tracciare pagamenti).</p>
      <p>Scegli prima un root key ID non ancora in uso. Revocare un macaroon revoca tutti i macaroon che condividono il suo ID, quindi riutilizzarne uno porterebbe via credenziali estranee. L'ID 0 appartiene ai macaroon di LND, quindi scegli un numero libero diverso da zero e annotalo:</p>
      <pre><code>lncli listmacaroonids</code></pre>
      <p>Poi crea il macaroon con l'ID che hai scelto (<code>7</code> in questo esempio, sostituisci con il tuo):</p>
      <pre><code>lncli bakemacaroon --root_key_id 7 \\
  --save_to /root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon \\
  info:read invoices:read invoices:write offchain:read offchain:write</code></pre>
      <p>Questo macaroon non può aprire o chiudere canali, spostare fondi on-chain né modificare la configurazione del tuo nodo. Se dovesse trapelare, revocalo con <code>lncli deletemacaroonid 7</code>, usando lo stesso ID con cui l'hai creato, e generane uno nuovo.</p>`,
    },
    'liquidity': {
      title: `2.3 Liquidità Lightning`,
      nav: `Liquidità`,
      html: `      <p>Per facilitare le operazioni, il tuo nodo Lightning ha bisogno di <strong>canali</strong> con Bitcoin al loro interno. Pensa ai canali Lightning come tunnel di pagamento pre-finanziati. I Bitcoin all'interno di questi canali sono la tua "liquidità".</p>

      <p><strong>Quanta ne serve?</strong></p>
      <table class="guide-table">
        <thead><tr><th>Volume di trading obiettivo</th><th>Liquidità suggerita</th><th>BTC approssimativi</th></tr></thead>
        <tbody>
          <tr><td>Comunità piccola (poche operazioni/giorno)</td><td>1–5 milioni di sat</td><td>0,01–0,05 BTC</td></tr>
          <tr><td>Comunità media</td><td>5–20 milioni di sat</td><td>0,05–0,20 BTC</td></tr>
          <tr><td>Comunità attiva</td><td>20–100 milioni di sat</td><td>0,20–1,0 BTC</td></tr>
        </tbody>
      </table>

      <div class="callout tip">
        <div class="callout-title">💡 Nota sulla Liquidità Lightning</div>
        <p>I Bitcoin nei tuoi canali Lightning sono bloccati <strong>onchain</strong> ma restano altamente spendibili via Lightning Network. Molti servizi accettano pagamenti Lightning — dai bar ai provider VPS — rendendo la tua liquidità piuttosto flessibile per l'uso quotidiano.</p>
      </div>

      <p><strong>Inizia in piccolo, cresci gradualmente.</strong> Inizia con quanto basta per le esigenze iniziali della tua comunità e monitora il feedback. Quando i trader segnalano ordini falliti per capacità insufficiente, quello è il tuo segnale per aggiungerne di più. Ascolta la tua comunità.</p>

      <p><strong>Ottenere liquidità:</strong></p>
      <ul>
        <li>Apri canali verso nodi ben connessi (usa <a href="https://lightningnetwork.plus/" target="_blank" rel="noopener noreferrer">Lightning Network+</a> o <a href="https://amboss.space/" target="_blank" rel="noopener noreferrer">Amboss</a> per trovare buoni peer)</li>
        <li>Ti serve capacità <strong>in uscita</strong> (per pagare gli acquirenti) e capacità <strong>in entrata</strong> (per ricevere dai venditori)</li>
        <li>Ottenere liquidità in entrata è solitamente più difficile — considera <a href="https://lightning.engineering/loop/" target="_blank" rel="noopener noreferrer">Lightning Loop</a>, <a href="https://amboss.space/magma" target="_blank" rel="noopener noreferrer">Magma</a>, o servizi di scambio canali</li>
      </ul>`,
    },
    'nostr-keys': {
      title: `2.4 Chiavi Nostr`,
      nav: `Chiavi Nostr`,
      html: `      <p>Il tuo nodo Mostro ha bisogno della propria identità sulla rete Nostr — una coppia di chiavi crittografiche con una chiave pubblica (l'indirizzo del tuo nodo) e una chiave privata (il tuo segreto).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>Non riutilizzare mai le chiavi Nostr tra istanze di Mostro. Ogni nodo ha bisogno della propria identità unica.</p>
      </div>

      <p><strong>Generare chiavi Nostr sicure localmente con rana:</strong></p>
      <pre><code># Installare Rust (se non già installato)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Installare rana - generatore locale di chiavi Nostr
cargo install rana

# Generare una nuova coppia di chiavi (con frase seed di 12 parole)
rana --generate 12</code></pre>

      <p>Rana genererà la tua chiave privata (nsec), chiave pubblica (npub) e una frase seed di backup. <strong>Conserva tutto in modo sicuro!</strong> Nota: eseguire <code>rana</code> senza argomenti avvia il mining PoW (difficoltà 10) che può richiedere minuti — usa <code>--generate</code> per la generazione istantanea. Non generare mai chiavi importanti usando servizi online.</p>`,
    },
    'skill-level': {
      title: `2.5 Livello di conoscenza tecnica`,
      nav: `Livello tecnico`,
      html: `      <table class="guide-table">
        <thead><tr><th>Attività</th><th>Difficoltà</th><th>Conoscenze necessarie</th></tr></thead>
        <tbody>
          <tr><td>Affittare un VPS</td><td><span class="badge badge-easy">Facile</span></td><td>Carta di credito, navigazione web di base</td></tr>
          <tr><td>Connettersi via SSH</td><td><span class="badge badge-easy">Facile</span></td><td>Seguire istruzioni, digitare comandi</td></tr>
          <tr><td>Installare Docker</td><td><span class="badge badge-medium">Medio</span></td><td>Copiare e incollare comandi, risoluzione problemi di base</td></tr>
          <tr><td>Eseguire Mostro (Docker)</td><td><span class="badge badge-medium">Medio</span></td><td>Modificare file di configurazione, capire i percorsi</td></tr>
          <tr><td>Eseguire Mostro (nativo)</td><td><span class="badge badge-hard">Difficile</span></td><td>Amministrazione Linux, compilazione software, systemd</td></tr>
          <tr><td>Configurare LND da zero</td><td><span class="badge badge-hard">Difficile</span></td><td>Conoscenza significativa di Linux e reti</td></tr>
          <tr><td>Gestire la liquidità Lightning</td><td><span class="badge badge-hard">Difficile</span></td><td>Comprendere l'economia dei canali Lightning</td></tr>
        </tbody>
      </table>

      <p><strong>💡 Il nostro consiglio:</strong> Se la tua comunità ha qualcuno a proprio agio con la riga di comando Linux, può gestire l'installazione con Docker. La compilazione nativa richiede esperienza di amministrazione di sistema. La configurazione del nodo Lightning è la parte più complessa — considera di chiedere aiuto a qualcuno con esperienza, o di usare una soluzione nodo-in-a-box.</p>`,
    },
    'setup': {
      title: `3. Installazione Passo per Passo`,
      nav: `3. Installazione passo per passo`,
      navShort: `3. Installazione`,
      html: `      <p>Tutte le opzioni di installazione condividono gli stessi primi passaggi. Poi scegli l'opzione che preferisci:</p>
      <ul>
        <li><strong>Opzione A (Docker Hub):</strong> La più veloce. Nessuna compilazione, nessun clone. <strong>Raccomandata per la maggior parte.</strong></li>
        <li><strong>Opzione B (Docker Build):</strong> Costruisci l'immagine localmente dal repository.</li>
        <li><strong>Opzione C (Compilazione nativa):</strong> Più controllo, meglio per sysadmin esperti.</li>
      </ul>

      <p>Tutte presuppongono che tu abbia già: ✅ Un VPS con Ubuntu · ✅ Accesso SSH · ✅ Un nodo LND funzionante.</p>`,
    },
    'common-steps': {
      title: `Passaggi Comuni (per tutte e 3 le opzioni)`,
      nav: `Passaggi comuni`,
      html: `      <h4>Passo 1: Connettiti al tuo VPS</h4>
      <pre><code>ssh root@IL_TUO_INDIRIZZO_IP_VPS</code></pre>

      <h4>Passo 2: Aggiorna il sistema</h4>
      <pre><code># Scaricare le informazioni più recenti sui pacchetti
apt update

# Installare tutti gli aggiornamenti disponibili
apt upgrade -y</code></pre>

      <h4>Passo 3: Installare Docker e Docker Compose</h4>
      <div class="callout tip">
        <div class="callout-title">💡 Nota</div>
        <p>Docker è necessario per le opzioni A e B. Se compili manualmente (Opzione C), puoi saltare questo passaggio.</p>
      </div>
      <pre><code># Installare Docker con lo script ufficiale
curl -fsSL https://get.docker.com | sh

# Verificare che Docker sia installato
docker --version

# Verificare Docker Compose
docker compose version</code></pre>

      <h4>Passo 4: Installare strumenti aggiuntivi</h4>
      <pre><code>apt install -y git make</code></pre>

      <p>✅ <strong>Passaggi comuni completati.</strong> Ora scegli la tua opzione di installazione:</p>`,
    },
    'option-a': {
      title: `Opzione A: Docker Hub (La più veloce — Raccomandata)`,
      nav: `Opzione A: Docker Hub`,
      html: `      <p>Esegui Mostro direttamente da Docker Hub senza clonare il repository o compilare. Perfetto per deployment su VPS.</p>

      <h4>Passo 5: Creare la directory di configurazione</h4>
      <pre><code>mkdir -p ~/mostro-config/lnd</code></pre>

      <h4>Passo 6: Ottenere il template di configurazione</h4>
      <pre><code>curl -sL https://raw.githubusercontent.com/MostroP2P/mostro/{{version}}/settings.tpl.toml \\
  -o ~/mostro-config/settings.toml</code></pre>

      <h4>Passo 7: Copiare le credenziali LND</h4>
      <pre><code>cp /percorso/del/tuo/tls.cert ~/mostro-config/lnd/tls.cert
cp /percorso/del/tuo/mostro.macaroon ~/mostro-config/lnd/mostro.macaroon</code></pre>

      <p>Se LND è sulla <strong>stessa macchina</strong>, i percorsi tipici sono:</p>
      <ul>
        <li><code>/root/.lnd/tls.cert</code></li>
        <li><code>/root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon</code></li>
      </ul>

      <h4>Passo 8: Modificare la configurazione</h4>
      <pre><code>nano ~/mostro-config/settings.toml</code></pre>

      <p><strong>Modifiche necessarie:</strong></p>
      <pre><code>[lightning]
lnd_cert_file = '/config/lnd/tls.cert'
lnd_macaroon_file = '/config/lnd/mostro.macaroon'
lnd_grpc_host = 'https://host.docker.internal:10009'  # Se LND sullo stesso VPS
# O usare 'https://IL_TUO_IP_LND:10009' se LND su server diverso

[database]
url = "sqlite:///config/mostro.db"  # mostrod usa sempre &lt;directory-di-config&gt;/mostro.db

[nostr]
nsec_privkey = 'LA_TUA_CHIAVE_NSEC_QUI'
relays = ['wss://relay.mostro.network', 'wss://nos.lol']

[mostro]
fee = 0.006                    # 0,6% commissione per operazione
max_order_amount = 1000000     # Ordine massimo in sat
min_payment_amount = 100       # Ordine minimo in sat
fiat_currencies_accepted = ['USD', 'EUR']  # Le tue valute</code></pre>

      <p>Salvare: <code>Ctrl+X</code>, poi <code>Y</code>, poi <code>Invio</code>.</p>

      <h4>Passo 9: Impostare i permessi</h4>
      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>Evita <code>chmod 777</code>. Usa permessi minimi.</p>
      </div>
      <pre><code>sudo chown -R 1000:1000 ~/mostro-config
chmod 700 ~/mostro-config
chmod 600 ~/mostro-config/settings.toml
chmod 600 ~/mostro-config/lnd/mostro.macaroon</code></pre>

      <h4>Passo 10: Eseguire il container</h4>
      <p><strong>Se LND è sullo stesso VPS:</strong></p>
      <pre><code>docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:{{version}}</code></pre>

      <p><strong>Se LND è su un server diverso:</strong></p>
      <pre><code>docker run -d --name mostro \\
  --restart unless-stopped \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:{{version}}</code></pre>

      <h4>Passo 11: Controllare i log</h4>
      <pre><code>docker logs -f mostro</code></pre>

      <p>Cerca questi messaggi:</p>
      <ul>
        <li><code>Settings correctly loaded!</code> — La configurazione è valida</li>
        <li><code>Transport: nip44 (protocol v2, event kind 14)</code> — Protocollo in uso (vedi 4.8)</li>
        <li><code>Connected to 'wss://...'</code> — Relay Nostr stabilito</li>
        <li><code>Recorded Lightning node identity &lt;pubkey&gt;</code> — LND raggiunto (solo al primo avvio)</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Nota</div>
        <p>Non esiste un messaggio "connesso a LND". Mostro contatta LND durante l'avvio, quindi un daemon che continua a girare ha già la connessione funzionante. Il fallimento invece è rumoroso: registra <code>Ln node error</code> e termina.</p>
      </div>

      <div class="callout tip">
        <div class="callout-title">💡 Risoluzione problemi</div>
        <p>Se vedi <code>Permission denied (os error 13)</code>, riapplica i permessi: <code>chown -R 1000:1000 ~/mostro-config</code> e riavvia: <code>docker restart mostro</code>.</p>
      </div>

      <p>🎉 <strong>Congratulazioni!</strong> Se vedi connessioni riuscite nei log, il tuo nodo Mostro è in funzione!</p>

      <h4>Aggiornamento (Docker Hub)</h4>
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
        <div class="callout-title">🔒 Nota di Sicurezza</div>
        <p>Usa sempre un tag di versione specifico (es. <code>mostrop2p/mostro:{{version}}</code>) invece di <code>:latest</code> per controllare i deployment.</p>
      </div>`,
    },
    'option-b': {
      title: `Opzione B: Docker Build (Costruire l'immagine localmente)`,
      nav: `Opzione B: Docker Build`,
      html: `      <h4>Passo 5: Scaricare Mostro</h4>
      <pre><code>cd /opt
git clone https://github.com/MostroP2P/mostro.git
cd mostro</code></pre>

      <h4>Passo 6: Configurare i file</h4>
      <pre><code>cd docker
mkdir -p config
cp ../settings.tpl.toml config/settings.toml</code></pre>

      <h4>Passo 7: Modificare il file di configurazione</h4>
      <pre><code>nano config/settings.toml</code></pre>
      <p>Modifica le stesse impostazioni dell'Opzione A, Passo 8.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Se LND gira sulla stessa VPS</div>
        <p>A differenza dell'Opzione A, il <code>docker/compose.yml</code> del repository non mappa <code>host.docker.internal</code>, quindi su Linux quel nome non si risolve dentro il container. Aggiungi il mapping al servizio <code>mostro</code> prima di compilare:</p>
        <pre><code>    extra_hosts:
      - "host.docker.internal:host-gateway"</code></pre>
        <p>Oppure punta <code>lnd_grpc_host</code> all'IP locale dell'host. Nota che <code>make docker-build</code> compila anche l'immagine StartOS, che una VPS non necessita: costa solo tempo di compilazione.</p>
      </div>

      <h4>Passo 8: Costruire l'immagine Docker</h4>
      <pre><code>cd ..
LND_CERT_FILE=/root/.lnd/tls.cert \\
LND_MACAROON_FILE=/root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon \\
make docker-build</code></pre>

      <h4>Passo 9: Avviare Mostro</h4>
      <pre><code># Avvia Mostro e il relay incluso. \`make docker-up\` da solo avvia
# anche l'immagine StartOS, che su una VPS non serve.
docker compose -f docker/compose.yml up -d mostro nostr-relay

# Controlla lo stato
docker compose -f docker/compose.yml ps

# Vedi i log
docker compose -f docker/compose.yml logs -f mostro</code></pre>

      <p>🎉 <strong>Congratulazioni!</strong> Se vedi connessioni riuscite, il tuo nodo Mostro è in funzione!</p>`,
    },
    'option-c': {
      title: `Opzione C: Compilazione Nativa (Per operatori tecnici)`,
      nav: `Opzione C: Nativo`,
      html: `      <h4>Passo 5: Installare Rust</h4>
      <pre><code>curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source /root/.cargo/env
rustc --version
cargo --version</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>NON installare Rust tramite <code>apt install rustc</code>. Usa sempre <code>rustup</code>. Il pacchetto di sistema è spesso obsoleto.</p>
      </div>

      <h4>Passo 6: Installare le dipendenze di compilazione</h4>
      <pre><code>apt install -y cmake build-essential libsqlite3-dev libssl-dev \\
  pkg-config git sqlite3 protobuf-compiler</code></pre>

      <h4>Passo 7: Scaricare e compilare Mostro</h4>
      <pre><code>cd /opt
git clone https://github.com/MostroP2P/mostro.git
cd mostro
cargo build --release</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Consiglio</div>
        <p>Se la compilazione fallisce per mancanza di RAM, aggiungi spazio swap:</p>
      </div>
      <pre><code>fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile</code></pre>

      <h4>Passi 8–10: Installare, inizializzare e pulire</h4>
      <pre><code>install target/release/mostrod /usr/local/bin
cargo clean  # Risparmia 2+ GB di spazio</code></pre>

      <h4>Passi 11–12: Creare utente e configurare</h4>
      <pre><code>adduser --disabled-login mostro
mkdir -p /opt/mostro
cp settings.tpl.toml /opt/mostro/settings.toml
nano /opt/mostro/settings.toml</code></pre>
      <p>Modifica le stesse impostazioni dell'Opzione A, Passo 8.</p>

      <h4>Passi 13–15: Test, permessi e servizio systemd</h4>
      <pre><code># Test di esecuzione
/usr/local/bin/mostrod -d /opt/mostro

# Impostare i permessi
chown -R mostro:mostro /opt/mostro</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 La procedura guidata interattiva</div>
        <p>Se esegui <code>mostrod</code> senza un <code>settings.toml</code> nella directory indicata e sei su un terminale, ti propone un menu di configurazione che può costruire il file per te e scrivere il nsec in un <code>.env</code>. Senza terminale (Docker, systemd, CI) copia il template, stampa dove l'ha messo e termina perché tu lo modifichi.</p>
      </div>

      <p>Creare il servizio systemd:</p>
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

      <p>🎉 <strong>Congratulazioni!</strong> Il tuo nodo Mostro è in esecuzione come servizio di sistema.</p>`,
    },
    'configuration': {
      title: `4. Configurazione in Dettaglio`,
      nav: `4. Configurazione`,
      navShort: `4. Configurazione`,
      html: `      <p>Il file <code>settings.toml</code> controlla tutto del tuo nodo Mostro.</p>`,
    },
    'cfg-nostr': {
      title: `4.1 Chiavi Nostr — L'identità del tuo nodo`,
      nav: `Chiavi Nostr`,
      html: `      <pre><code>[nostr]
nsec_privkey = 'LA_TUA_CHIAVE_NSEC'
relays = [
  'wss://relay.mostro.network',
  'wss://nos.lol',
  'wss://relay.nostr.band'
]</code></pre>

      <p><strong>Quali relay usare?</strong></p>
      <ul>
        <li><code>wss://relay.mostro.network</code> — Relay proprio di Mostro, raccomandato</li>
        <li><code>wss://nos.lol</code> — Relay affidabile e ben connesso</li>
        <li>Aggiungi 3–5 relay per affidabilità. Più relay = migliore disponibilità ma più banda.</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Consiglio</div>
        <p>Puoi anche far girare il tuo relay Nostr accanto a Mostro. La via Docker Build (Opzione B) ne include uno nel suo <code>compose.yml</code>; l'Opzione A e la compilazione nativa no.</p>
      </div>


      <h4>Tenere la chiave fuori da settings.toml</h4>
      <p>Mostro legge la chiave anche dalla variabile d'ambiente <code>MOSTRO_NSEC_PRIVKEY</code>. La precedenza è: variabile d'ambiente, poi <code>&lt;directory-di-config&gt;/.env</code>, poi <code>settings.toml</code>.</p>
      <pre><code># ~/mostro-config/.env  (chmod 600) — caricato automaticamente all'avvio
MOSTRO_NSEC_PRIVKEY=nsec1...

# Docker
docker run -e MOSTRO_NSEC_PRIVKEY=nsec1... ...

# Unità systemd
Environment="MOSTRO_NSEC_PRIVKEY=nsec1..."</code></pre>
      <p>Lasciare <code>nsec_privkey</code> in <code>settings.toml</code> funziona ancora. Se usi il file <code>.env</code>, fanne il backup con la stessa cura della configurazione.</p>`,
    },
    'fees': {
      title: `4.2 Commissioni — Come generi entrate`,
      nav: `Commissioni`,
      html: `      <pre><code>[mostro]
fee = 0.006
dev_fee_percentage = 0.30</code></pre>

      <p><strong>Commissione di trading</strong> (<code>fee</code>): Percentuale addebitata per operazione, divisa tra acquirente e venditore.</p>
      <ul>
        <li><code>0.006</code> = 0,6% (ciascuna parte paga 0,3%)</li>
        <li><code>0.01</code> = 1,0% (ciascuna parte paga 0,5%)</li>
        <li><code>0</code> = gratis (buono per far crescere la base utenti)</li>
      </ul>

      <p><strong>Esempio:</strong> In un'operazione da 100.000 sat con <code>fee = 0.006</code>: L'acquirente paga 300 sat, il venditore paga 300 sat, il tuo nodo guadagna 600 sat in totale.</p>

      <p><strong>Commissione di sviluppo</strong> (<code>dev_fee_percentage</code>): Una percentuale delle <em>tue</em> entrate da commissioni che va allo sviluppo di Mostro.</p>
      <ul>
        <li><code>0.30</code> = 30% (default) — su 600 sat, 180 vanno al fondo di sviluppo</li>
        <li>Minimo: 10% (<code>0.10</code>), Massimo: 100% (<code>1.0</code>)</li>
        <li>Pagata dal tuo nodo dai suoi guadagni, non addebitata agli utenti</li>
        <li>Tutti i pagamenti verificabili pubblicamente tramite eventi Nostr (kind 8383)</li>
      </ul>

      <div class="callout important">
        <div class="callout-title">📝 Nota</div>
        <p>Impostare <code>dev_fee_percentage</code> sotto <code>0.10</code> impedirà a Mostro di avviarsi. Questo minimo assicura un finanziamento sostenibile dello sviluppo.</p>
      </div>`,
    },
    'limits': {
      title: `4.3 Limiti degli ordini e valute`,
      nav: `Limiti`,
      html: `      <pre><code>[mostro]
max_order_amount = 1000000
min_payment_amount = 100
max_orders_per_response = 10
fiat_currencies_accepted = ['USD', 'EUR', 'ARS', 'CUP']</code></pre>

      <ul>
        <li><strong><code>max_order_amount</code>:</strong> Operazione più grande in satoshi. Configuralo in base alla capacità dei tuoi canali Lightning.</li>
        <li><strong><code>min_payment_amount</code>:</strong> Operazione minima in satoshi. 1.000 o 10.000 è più pratico di 100.</li>
        <li><strong><code>max_orders_per_response</code>:</strong> Numero massimo di ordini che Mostro restituisce in una singola query. Se un utente accumula più ordini di questo limite (ad esempio durante il ripristino della sessione dal client mobile), riceverà un errore <code>cant-do: too_many_requests</code> e non potrà recuperare i suoi ordini. Se i tuoi utenti operano frequentemente, aumenta questo valore (ad esempio 50 o 100). Il valore predefinito di 10 potrebbe non essere sufficiente.</li>
        <li><strong><code>fiat_currencies_accepted</code>:</strong> Usa <a href="https://en.wikipedia.org/wiki/ISO_4217" target="_blank" rel="noopener noreferrer">codici ISO 4217</a>. Array vuoto <code>[]</code> accetta tutte le valute.</li>
      </ul>`,
    },
    'profile': {
      title: `4.4 Profilo del nodo (Opzionale ma raccomandato)`,
      nav: `Profilo del nodo`,
      html: `      <pre><code>[mostro]
name = "LatAm Mostro"
about = "Exchange P2P di Bitcoin per l'America Latina. Supporto in spagnolo."
picture = "https://esempio.com/il-tuo-logo.png"
website = "https://sito-della-tua-comunita.com"</code></pre>

      <p>Questi configurano il profilo del tuo Mostro su Nostr (NIP-01 kind 0 metadata). I client mostrano queste informazioni affinché gli utenti sappiano su quale Mostro stanno operando.</p>`,
    },
    'timeouts': {
      title: `4.5 Tempi e scadenza`,
      nav: `Tempi`,
      html: `      <pre><code>[mostro]
expiration_hours = 24        # Quanto tempo un ordine resta aperto
expiration_seconds = 900     # Tempo per completare (15 min)
hold_invoice_expiration_window = 300  # Tempo che ha il taker per pagare la fattura o fornirne una di incasso (5 min)</code></pre>`,
    },
    'antispam': {
      title: `4.6 Anti-Spam`,
      nav: `Anti-Spam`,
      html: `      <pre><code>[mostro]
pow = 0  # 0 = disabilitato; 10-20 = moderato. Inizia con 0.</code></pre>`,
    },
    'rpc': {
      title: `4.7 Interfaccia RPC di Amministrazione (Opzionale)`,
      nav: `RPC Admin`,
      html: `      <pre><code>[rpc]
enabled = false
listen_address = "127.0.0.1"
port = 50051
# auth_token = "una-stringa-lunga-e-casuale"</code></pre>

      <p>Questa interfaccia gRPC serve agli strumenti dell'operatore: <code>grpcurl</code>, e <code>mostro-cli</code> per la modalità manutenzione (<code>admsetmaintenance</code>, <code>admmaintenancestatus</code>, <code>admcancelpending</code>). Mostrix <strong>non</strong> la usa: lavora su Nostr, quindi non ti serve l'RPC per risolvere le dispute.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Sicurezza</div>
        <p>Mantieni <code>listen_address</code> su <code>"127.0.0.1"</code> e non esporre mai la porta a internet. Imposta <code>auth_token</code> ogni volta che la porta è raggiungibile da qualcosa che non sia la macchina locale, come un tunnel SSH o un container sidecar: una connessione inoltrata arriva come loopback, quindi l'indirizzo di ascolto da solo non è autorizzazione. Con un token impostato, ogni chiamata che modifica lo stato deve portare l'header <code>authorization: Bearer &lt;token&gt;</code>.</p>
      </div>`,
    },
    'transport': {
      title: `4.8 Protocollo di Trasporto`,
      nav: `Trasporto`,
      html: `      <p>Un nodo Mostro parla <strong>un solo</strong> protocollo, scelto qui:</p>
      <pre><code>[mostro]
transport = "nip44"</code></pre>

      <table class="guide-table">
        <thead><tr><th>Valore</th><th>Protocollo</th><th>Kind visibile sul relay</th><th>Stato</th></tr></thead>
        <tbody>
          <tr><td><code>"nip44"</code></td><td>v2 — eventi kind 14 firmati con contenuto cifrato NIP-44</td><td><code>14</code></td><td>Predefinito, anche per una config senza riga <code>transport</code></td></tr>
          <tr><td><code>"gift-wrap"</code></td><td>v1 — gift wrap NIP-59</td><td><code>1059</code></td><td>Deprecato, solo opt-in, rimosso in v0.19.0</td></tr>
        </tbody>
      </table>

      <p>Il tuo nodo annuncia quale protocollo parla nel suo evento info kind 38385, quindi i client compatibili scelgono il formato da soli. Mostro Mobile, Mostrix e mostro-cli supportano v2.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Solo se devi servire client vecchi</div>
        <p>Scrivi <code>transport = "gift-wrap"</code> solo per continuare a servire client che parlano soltanto il protocollo v1 durante la transizione. Non viene mai selezionato automaticamente e scompare in v0.19.0, dopodiché il tuo nodo gira solo in v2. Lascia il valore predefinito se non hai una ragione precisa.</p>
      </div>

      <p>Il trasporto v2 permette anche un filtro anti-spam più fine di quello in 4.6. <code>pow</code> si applica a ogni messaggio, mentre <code>pow_first_contact</code> si applica solo ai mittenti estranei a un'operazione attiva e viene verificato prima della decifratura. Così le operazioni in corso restano economiche mentre agli sconosciuti costa lavoro reale:</p>
      <pre><code>[mostro]
pow = 0                  # operazioni in corso
pow_first_contact = 16   # nuovi ordini e prese da chiavi sconosciute</code></pre>`,
    },
    'ln-safety': {
      title: `4.9 Limiti di Sicurezza Lightning`,
      nav: `Limiti Lightning`,
      html: `      <p>Queste impostazioni di <code>[lightning]</code> limitano quanto a lungo i tuoi canali possono restare bloccati e quanti pagamenti possono essere irrisolti contemporaneamente. Hanno tutte un valore predefinito, quindi un file di configurazione di una versione precedente si avvia ancora, ma un template nuovo le include e vale la pena conoscerle.</p>

      <pre><code>[lightning]
max_final_cltv_expiry_delta = 144
escrow_deadline_margin_blocks = 24
max_inflight_payouts = 100
max_inflight_payouts_per_destination = 10
payment_cltv_limit = 1008
allow_node_change = false</code></pre>

      <table class="guide-table">
        <thead><tr><th>Impostazione</th><th>Cosa protegge</th></tr></thead>
        <tbody>
          <tr><td><code>max_final_cltv_expiry_delta</code></td><td>Rifiuta una fattura di pagamento il cui CLTV finale permetterebbe al beneficiario di trattenere i tuoi sat troppo a lungo. 144 blocchi (circa un giorno) è il massimo che chiedono i wallet reali. Non impostarlo mai a 0: rifiuterebbe ogni fattura.</td></tr>
          <tr><td><code>escrow_deadline_margin_blocks</code></td><td>Margine di sicurezza prima che LND annulli automaticamente una hold invoice accettata. Deve superare comodamente <code>invoices.holdexpirydelta</code> del tuo nodo, che per default è 12.</td></tr>
          <tr><td><code>max_inflight_payouts</code></td><td>Tetto ai pagamenti irrisolti su tutto il nodo, così un beneficiario che non liquida mai non può esaurire i tuoi slot HTLC. Un pagamento frenato viene ritardato, mai scartato.</td></tr>
          <tr><td><code>max_inflight_payouts_per_destination</code></td><td>Lo stesso tetto per pubkey di destinazione, ed è il più efficace dei due.</td></tr>
          <tr><td><code>payment_cltv_limit</code></td><td>Tetto al timelock totale di una rotta di pagamento. Non deve superare <code>--max-cltv-expiry</code> del tuo LND e deve stare almeno 576 blocchi sopra <code>max_final_cltv_expiry_delta</code>, altrimenti i pagamenti legittimi falliscono con "no route".</td></tr>
          <tr><td><code>allow_node_change</code></td><td>Guardia all'avvio in caso di cambio di nodo Lightning. Lascialo su <code>false</code> e vedi 5.8.</td></tr>
        </tbody>
      </table>

      <p>Nota anche che <code>max_routing_fee</code>, nel blocco <code>[mostro]</code>, ora ha come default <code>0.002</code> (0,2%).</p>`,
    },
    'price': {
      title: `4.10 Fonti del Prezzo di Bitcoin`,
      nav: `Fonti di prezzo`,
      html: `      <p>Mostro ha bisogno di un tasso BTC/fiat per quotare gli ordini. Senza un blocco <code>[price]</code> usa una sola fonte, Yadio, tramite il ormai deprecato <code>bitcoin_price_api_url</code>. Aggiungere il blocco ti dà più fonti, combinate per mediana e con scarto dei valori anomali, così un'API caduta o che restituisce un numero sbagliato non muove i tuoi prezzi.</p>

      <pre><code>[price]
update_interval_seconds = 300
max_price_staleness_seconds = 1800
outlier_threshold_pct = 5.0        # scarta una fonte a questa distanza dalla mediana (servono 3+ fonti)
provider_timeout_seconds = 10
provider_failure_threshold = 3     # fallimenti prima di mettere una fonte in pausa
provider_failure_cooldown_seconds = 120
publish_to_nostr = true            # pubblica i tassi aggregati come kind 30078

[price.providers.yadio]
enabled = true
url = "https://api.yadio.io"

[price.providers.coingecko]
enabled = true
url = "https://api.coingecko.com/api/v3"
# api_key = "CG-xxxx"              # opzionale, alza i limiti di frequenza

[price.providers.currency_api]
enabled = true
url = "https://currency-api.pages.dev/v1"
fallback_urls = ["https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1"]
except = ["CUP", "MLC"]            # solo tasso ufficiale, non mischiare con fonti informali

[price.providers.blockchain]
enabled = true
url = "https://blockchain.info"</code></pre>

      <p>Ogni fonte accetta <code>only</code> o <code>except</code> per limitare a quali valute contribuisce, e <code>fallback_urls</code> per mirror provati quando la URL principale fallisce. Una fonte abilitata a cui manca un segreto richiesto fallisce all'avvio invece di non produrre silenziosamente alcuna quotazione.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Se le API di prezzo sono bloccate nel tuo paese</div>
        <p>Puoi prendere i tassi da Nostr invece che via HTTP, pubblicati da nodi Mostro di cui ti fidi. Riusa i relay già presenti in <code>[nostr]</code>, quindi funziona dovunque il tuo nodo raggiunga già un relay. Con più nodi fidati vince l'evento valido più recente.</p>
        <pre><code>[price.providers.nostr]
enabled = true
trusted_nodes = [
    # pubkey hex dei nodi Mostro di cui ti fidi per tassi accurati
]</code></pre>
      </div>

      <p>Gli operatori che servono il peso cubano possono aggiungere El Toque per CUP e MLC del mercato informale. È opt-in, limitato a queste due valute, e richiede un token gratuito: un El Toque abilitato senza <code>token</code> si rifiuta di partire.</p>`,
    },
    'optional-blocks': {
      title: `4.11 Altri Blocchi Opzionali`,
      nav: `Blocchi opzionali`,
      html: `      <p>Altri tre blocchi che potresti incontrare in un template recente. Nessuno è obbligatorio.</p>

      <p><strong>Ritenzione degli eventi.</strong> Quanto tempo Mostro conserva ogni tipo di evento prima che scada. Ometti del tutto il blocco per accettare i valori predefiniti.</p>
      <pre><code>[expiration]
order_days = 30        # eventi degli ordini (kind 38383)
rating_days = 90       # storico della reputazione (kind 38384)
dispute_days = 90      # dispute, conservate più a lungo per l'audit (kind 38386)
fee_audit_days = 365   # trasparenza delle commissioni (kind 8383)
dm_days = 30           # messaggi diretti del protocollo v2 (kind 14)</code></pre>

      <p><strong>Le cauzioni anti-abuso</strong> (<code>[anti_abuse_bond]</code>) possono richiedere una cauzione tramite hold invoice ai taker, ai maker o a entrambi, così abbandonare un'operazione ha un costo. Disabilitato per default e ancora in rilascio a fasi. Leggi il <code>docs/ANTI_ABUSE_BOND.md</code> del progetto prima di abilitarlo su un nodo in produzione.</p>

      <p><strong>L'escrow Cashu</strong> (<code>[cashu]</code>) è una modalità sperimentale che gira senza LND e tiene l'escrow in token Cashu su una singola mint. Non è ancora utilizzabile per operare davvero, le azioni di trade vengono ancora rifiutate, e non si può combinare con le cauzioni anti-abuso. Menzionato qui perché sappia cos'è quel blocco quando lo vedi.</p>`,
    },
    'operating': {
      title: `5. Gestione del Tuo Nodo Mostro`,
      nav: `5. Gestione del nodo`,
      navShort: `5. Gestione`,
      html: ``,
    },
    'disputes': {
      title: `5.1 Come funzionano le dispute`,
      nav: `Dispute`,
      html: `      <p>Le dispute sono la tua responsabilità operativa più importante.</p>

      <p><strong>Quando si verificano le dispute?</strong></p>
      <ul>
        <li>L'acquirente dice di aver pagato, il venditore dice di non aver ricevuto</li>
        <li>Il venditore si rifiuta di rilasciare i Bitcoin dopo aver ricevuto il pagamento</li>
        <li>Una delle parti smette di rispondere</li>
      </ul>

      <p><strong>Il processo di disputa:</strong></p>
      <ol>
        <li><strong>L'utente apre una disputa</strong> — Una delle parti clicca "Disputa" nel client</li>
        <li><strong>Mostro segna l'ordine</strong> — Lo stato cambia in "Disputa", i fondi restano bloccati</li>
        <li><strong>L'arbitro prende il caso</strong> — Un admin assegnato al tuo nodo indaga</li>
        <li><strong>Indagine</strong> — Comunica con entrambe le parti, richiede prove</li>
        <li><strong>Risoluzione</strong> — L'arbitro decide: rilasciare all'acquirente, o rimborsare al venditore</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>Scegli i tuoi arbitri con cura. Hanno il potere di decidere dove vanno i fondi bloccati. Scegli membri fidati e imparziali della comunità. Si raccomandano 2-3 arbitri.</p>
      </div>


      <h4>Livelli di permesso dei solver</h4>

      <p>Un solver può essere registrato in sola lettura o con pieni poteri. Entrambi i livelli possono prendere una disputa e parlare con le parti, ma solo un solver read-write può decidere dove va il denaro.</p>

      <table class="guide-table">
        <thead><tr><th>Registrato come</th><th>Può</th><th>Non può</th></tr></thead>
        <tbody>
          <tr><td><code>npub1...:read</code></td><td>Prendere una disputa, leggerla, scrivere a entrambe le parti</td><td>Liquidare o annullare l'ordine</td></tr>
          <tr><td><code>npub1...:read-write</code></td><td>Tutto, incluso liquidare e annullare</td><td>—</td></tr>
        </tbody>
      </table>

      <p>Un <code>npub1...</code> nudo senza suffisso diventa read-write per default, e lo stesso vale per la registrazione tramite l'interfaccia RPC. Fai partire un nuovo arbitro con <code>:read</code> mentre impara il processo, poi registralo di nuovo come read-write quando ti fidi del suo giudizio.</p>`,
    },
    'mostrix': {
      title: `5.2 Mostrix — Il tuo strumento di amministrazione`,
      nav: `Mostrix`,
      html: `      <p>Mostrix è un client basato su terminale (TUI) per la risoluzione delle dispute. Se esegui un nodo Mostro, hai bisogno di Mostrix.</p>

      <h4>Opzione A: Scarica il binario pre-compilato (Raccomandato)</h4>
      <p>Scarica l'ultima versione per la tua piattaforma da <a href="https://github.com/MostroP2P/mostrix/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a>:</p>

      <pre><code># Linux (x86_64)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-unknown-linux-musl

# Linux (ARM64 / Raspberry Pi 4)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-unknown-linux-musl

# Windows
# Scarica mostrix-x86_64-pc-windows-gnu.exe dalla pagina delle release</code></pre>

      <p>Verifica il download prima di eseguirlo, come spiegato subito sotto.</p>

      <div class="callout tip">
        <div class="callout-title">🔐 Verifica la Release</div>
        <p>Verifica sempre il binario prima di eseguirlo. Importa le chiavi dei manutentori una sola volta:</p>
        <pre><code>curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/negrunch.asc | gpg --import
curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/arkanoider.asc | gpg --import</code></pre>
        <p>Le firme sono file separati chiamati <code>manifest.txt.sig.&lt;manutentore&gt;</code>. Non tutte le release ne portano due, quindi controlla la pagina della release e scarica quelle effettivamente elencate:</p>
        <pre><code>wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt
wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt.sig.arkanoider

# Verifica ogni firma che hai scaricato
gpg --verify manifest.txt.sig.arkanoider manifest.txt

# Poi confronta l'hash del binario con il manifest
shasum -a 256 mostrix-x86_64-unknown-linux-musl
grep mostrix-x86_64-unknown-linux-musl manifest.txt</code></pre>
        <p>Una firma valida da una chiave di manutentore di cui ti fidi è sufficiente. Se un <code>wget</code> restituisce 404, quella firma semplicemente non è stata pubblicata per quella release: non trattare un file assente come uno verificato.</p>
      </div>

      <p>Solo quando una firma e l'hash tornano, rendi eseguibile il binario e avvialo:</p>
      <pre><code>chmod +x mostrix-x86_64-unknown-linux-musl
./mostrix-x86_64-unknown-linux-musl</code></pre>

      <h4>Opzione B: Compila dal codice sorgente</h4>
      <p>Se preferisci compilare dal codice sorgente o hai bisogno di una piattaforma non disponibile nelle release:</p>

      <pre><code># Installa le dipendenze (Ubuntu/Debian)
sudo apt install -y cmake build-essential pkg-config

# Installa Rust (se non già installato)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Clona e compila
git clone https://github.com/MostroP2P/mostrix.git
cd mostrix
cargo build --release

# Esegui
./target/release/mostrix</code></pre>

      <h4>Primo avvio e configurazione</h4>
      <p>Al primo avvio, Mostrix <strong>genera automaticamente</strong> un file <code>~/.mostrix/settings.toml</code> con valori predefiniti sensati, inclusa una nuova coppia di chiavi Nostr. Il tuo <code>npub</code> generato verrà mostrato nel terminale.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante: Configura la tua pubkey Mostro</div>
        <p>La configurazione auto-generata usa la <strong>pubkey ufficiale di Mostro</strong> per default. Devi cambiarla con la <strong>pubkey del tuo nodo Mostro</strong>:</p>
        <pre><code># Modifica la configurazione
nano ~/.mostrix/settings.toml

# Cambia questa riga con la pubkey del TUO nodo Mostro:
mostro_pubkey = "LA_TUA_PUBKEY_MOSTRO_HEX"</code></pre>
      </div>

      <p>Per la modalità admin (risoluzione dispute), configura anche:</p>
      <pre><code># ~/.mostrix/settings.toml
mostro_pubkey = "LA_TUA_PUBKEY_MOSTRO_HEX"
nsec_privkey = "nsec1la_tua_chiave_personale"  # Auto-generata al primo avvio
admin_privkey = "nsec1la_tua_chiave_admin"        # Il nsec del daemon stesso — vedi sotto
relays = ["wss://relay.mostro.network"]
currencies_filter = []                          # Vuoto = mostra tutte le valute
user_mode = "admin"                             # Abilita modalità admin</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Quale chiave va in admin_privkey?</div>
        <p>Mostro riconosce l'operatore dalla <strong>propria</strong> chiave, quindi <code>admin_privkey</code> deve essere il <code>nsec_privkey</code> del daemon, quello la cui pubkey hai messo in <code>mostro_pubkey</code>. Una chiave personale viene rifiutata.</p>
        <p>Quella chiave è l'identità del tuo nodo, quindi evita di portarla in giro su un laptop. Registra invece una chiave di solver separata e usa quella per le dispute. Solo la chiave dell'operatore può aggiungere solver:</p>
        <pre><code>ADMIN_NSEC=nsec1... mostro-cli admaddsolver -n npub1solver...</code></pre>
        <p>L'opzione <strong>Settings → Add Dispute Solver</strong> di Mostrix fa la stessa cosa.</p>
      </div>`,
    },
    'watchdog': {
      title: `5.3 mostro-watchdog — Notifiche dispute su Telegram`,
      nav: `mostro-watchdog`,
      html: `      <p><code>mostro-watchdog</code> monitora il tuo nodo Mostro per le dispute e invia avvisi istantanei tramite Telegram. Essenziale per tempi di risposta rapidi.</p>

      <p><strong>Opzione A: Installazione automatica (Raccomandata)</strong></p>
      <pre><code># Scarica ed esegui lo script di installazione
curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash</code></pre>

      <p><strong>Opzione B: Download manuale del binario</strong></p>
      <pre><code># Linux x86_64 (Intel/AMD)
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/mostro-watchdog-linux-x86_64
chmod +x mostro-watchdog-linux-x86_64
sudo mv mostro-watchdog-linux-x86_64 /usr/local/bin/mostro-watchdog

# Linux ARM64 (Raspberry Pi, server ARM)
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/mostro-watchdog-linux-aarch64
chmod +x mostro-watchdog-linux-aarch64
sudo mv mostro-watchdog-linux-aarch64 /usr/local/bin/mostro-watchdog</code></pre>

      <p><strong>Opzione C: Compilare dal codice sorgente</strong></p>
      <pre><code>git clone https://github.com/MostroP2P/mostro-watchdog.git
cd mostro-watchdog
cargo build --release
sudo cp target/release/mostro-watchdog /usr/local/bin/</code></pre>

      <p><strong>Configurazione:</strong></p>
      <pre><code>cp config.example.toml config.toml
nano config.toml</code></pre>

      <pre><code>[mostro]
pubkey = "LA_TUA_PUBKEY_MOSTRO"

[nostr]
relays = ["wss://relay.mostro.network", "wss://nos.lol"]

[telegram]
bot_token = "IL_TUO_BOT_TOKEN"
chat_id = -1001234567890</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Consiglio</div>
        <p>Esegui <code>mostro-watchdog</code> come servizio systemd accanto al tuo nodo Mostro per il monitoraggio 24/7.</p>
      </div>`,
    },
    'monitoring': {
      title: `5.4 Monitoraggio dell'uptime`,
      nav: `Monitoraggio`,
      html: `      <p>Il tuo nodo deve essere in funzione 24/7.</p>

      <pre><code># Nativo
systemctl status mostro.service
journalctl -u mostro -f
journalctl -u mostro | grep -E "(error|warn|connected)" --ignore-case

# Docker Hub (Opzione A)
docker ps --filter name=mostro
docker logs -f mostro

# Docker Build (Opzione B)
docker compose -f /opt/mostro/docker/compose.yml ps
docker compose -f /opt/mostro/docker/compose.yml logs -f mostro</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Consiglio pro</div>
        <p>Configura un monitor di uptime semplice usando <a href="https://uptimerobot.com/" target="_blank" rel="noopener noreferrer">UptimeRobot</a> (livello gratuito) o un cron job che ti avvisi se Mostro va offline.</p>
      </div>


      <h4>Controllare il tuo nodo dall'esterno</h4>
      <p>Il tuo nodo ripubblica un evento info (kind 38385) che lo descrive: commissioni, valute, versione del protocollo, flag di manutenzione. Leggerlo da un relay è il modo più rapido di confermare che il mondo esterno vede quello che credi.</p>
      <pre><code>cargo install nostreq nostcat
nostreq --kinds 38385 --limit 1 --authors LA_TUA_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq</code></pre>`,
    },
    'updating': {
      title: `5.5 Aggiornare Mostro`,
      nav: `Aggiornamento`,
      html: `      <p><strong>Docker Hub:</strong></p>
      <pre><code>export MOSTRO_TAG={{version}}
docker stop mostro
docker rm mostro
docker pull mostrop2p/mostro:$MOSTRO_TAG
docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:$MOSTRO_TAG</code></pre>

      <p><strong>Docker Build:</strong></p>
      <pre><code>cd /opt/mostro
git fetch --tags
git checkout {{version}}
make docker-build
make docker-down
make docker-up</code></pre>

      <p><strong>Nativo:</strong></p>
      <pre><code>cd /opt/mostro
git fetch --tags
git checkout {{version}}
cargo build --release
install target/release/mostrod /usr/local/bin
cargo clean
systemctl restart mostro.service</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Consiglio</div>
        <p>Fai sempre un backup del database prima di aggiornare.</p>
      </div>

      <div class="callout important">
        <div class="callout-title">⚠️ Non cambiare nodo Lightning nello stesso momento</div>
        <p>Aggiornare Mostro è sicuro in qualsiasi momento. Puntarlo a un nodo Lightning <strong>diverso</strong> non lo è: drena prima l'escrow, vedi 5.8.</p>
      </div>`,
    },
    'backups': {
      title: `5.6 Backup`,
      nav: `Backup`,
      html: `      <p>File critici da salvare: <code>settings.toml</code>, il file <code>.env</code> se ci tieni il tuo nsec (vedi 4.1), e <code>mostro.db</code> (storico ordini, reputazione).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Non copiare un database attivo con cp</div>
        <p>SQLite lavora in modalità WAL, quindi le scritture recenti stanno in <code>mostro.db-wal</code> finché non vengono consolidate. Copiare solo <code>mostro.db</code> mentre Mostro è in esecuzione può produrre un backup a cui mancano le operazioni più recenti. Usa il comando di backup nativo di SQLite, che è sicuro su un database attivo e scrive un unico file coerente.</p>
      </div>

      <pre><code># Backup manuale — Docker Hub:
mkdir -p /root/mostro-backups
sqlite3 ~/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp ~/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp ~/mostro-config/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null

# Backup manuale — Docker Build (Opzione B):
sqlite3 /opt/mostro/docker/config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/docker/config/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)

# Backup manuale — Nativo:
sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)</code></pre>

      <p><strong>Backup giornaliero automatico</strong> (aggiungi al crontab con <code>crontab -e</code>):</p>
      <pre><code># Docker Hub (Opzione A):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /root/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /root/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d)

# Docker Build (Opzione B):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/docker/config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/docker/config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d)

# Nativo (Opzione C):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d)</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Critico</div>
        <p>La tua <code>nsec_privkey</code> in <code>settings.toml</code> È l'identità del tuo nodo. Se la perdi, perdi la tua reputazione e tutti gli utenti devono riconnettersi a una nuova identità. <strong>Conserva una copia offline.</strong></p>
      </div>`,
    },
    'activity': {
      title: `5.7 Revisione dell'attività delle operazioni`,
      nav: `Attività`,
      html: `      <pre><code># Contare tutti gli ordini
sqlite3 /percorso/di/mostro.db "SELECT COUNT(*) FROM orders;"

# Operazioni recenti riuscite
sqlite3 /percorso/di/mostro.db "SELECT id, fiat_code, fiat_amount, amount, fee, status, created_at FROM orders WHERE status = 'success' ORDER BY created_at DESC LIMIT 10;"

# Ordini in attesa
sqlite3 /percorso/di/mostro.db "SELECT id, fiat_code, fiat_amount, status, created_at FROM orders WHERE status = 'pending';"

# Ricavi da commissioni: orders.fee memorizza la metà di ciascuna parte, quindi la commissione lorda del nodo è fee*2 e la dev fee viene sottratta da essa
sqlite3 /percorso/di/mostro.db "SELECT SUM(fee*2) AS gross_fees, SUM(dev_fee) AS dev_fees, SUM(fee*2 - COALESCE(dev_fee, 0)) AS net_fees FROM orders WHERE status = 'success';"</code></pre>`,
    },
    'ln-migration': {
      title: `5.8 Modalità Manutenzione e Cambio di Nodo Lightning`,
      nav: `Cambiare nodo LN`,
      html: `      <p>Le hold invoice, le cauzioni e i pagamenti in volo appartengono al nodo Lightning che li ha creati. Puntare Mostro a un altro nodo mentre qualcosa di tutto questo è aperto lascerebbe quelle operazioni in sospeso, quindi il daemon <strong>si rifiuta di partire</strong> quando vede una nuova identità LND con escrow ancora legato alla precedente:</p>
      <pre><code>REFUSING TO START: Lightning node changed from ... but escrow is still bound to the old node</code></pre>

      <p>La modalità manutenzione è il modo per drenare prima. Mentre è attiva, nuovi ordini e prese vengono rifiutati e le operazioni aperte continuano a funzionare, così l'escrow può liquidarsi. Richiede l'interfaccia RPC abilitata (vedi 4.7).</p>

      <ol>
        <li>Annuncia la finestra ai tuoi utenti con ampio preavviso.</li>
        <li>Attiva la modalità manutenzione: <code>mostro-cli admsetmaintenance -e true -r "LN node migration"</code>.</li>
        <li>Interroga <code>mostro-cli admmaintenancestatus</code> finché non riporta <code>drained = true</code>. Gli ordini in attesa scadono da soli; per accorciare il drenaggio puoi annullarne uno con <code>mostro-cli admcancelpending -o &lt;order-id&gt;</code>, che libera subito la cauzione del creatore. Annuncialo prima, è l'ordine dell'utente. Chiudi le dispute di lunga durata come sempre.</li>
        <li>Tieni online il nodo <strong>vecchio</strong> per tutto il tempo. Deve ancora completare i pagamenti in volo.</li>
        <li>Ferma Mostro e fai il backup di <code>mostro.db</code>.</li>
        <li>Punta <code>[lightning]</code> al nodo nuovo e lascia <code>allow_node_change = false</code>.</li>
        <li>Avvia Mostro. Registra la nuova pubkey. Disattiva la modalità manutenzione e prova con un ordine.</li>
        <li>Solo adesso dismetti il nodo vecchio.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ allow_node_change</div>
        <p>Mettilo a <code>true</code> solo per il disaster recovery, quando il nodo vecchio è perso definitivamente. Lascia consapevolmente irrisolte le operazioni coinvolte. Spostare lo stesso nodo su un altro host non è un cambio di nodo e non richiede nulla di tutto questo.</p>
      </div>`,
    },
    'operator-cli': {
      title: `5.9 Comandi da Operatore con mostro-cli`,
      nav: `CLI operatore`,
      html: `      <p>Mostrix è il modo comodo per lavorare le dispute, ma <code>mostro-cli</code> copre lo stesso terreno da shell e ha alcuni comandi che Mostrix non ha. I comandi di disputa sono firmati con una chiave Nostr che passi come <code>ADMIN_NSEC</code>, e deve essere quella del daemon stesso o di un solver registrato.</p>

      <pre><code># Lavoro sulle dispute (via Nostr, richiede ADMIN_NSEC)
export ADMIN_NSEC=nsec1...
mostro-cli listdisputes
mostro-cli admtakedispute -d &lt;dispute-id&gt;
mostro-cli admsenddm -p &lt;npub&gt; -m "messaggio a una parte"
mostro-cli admsettle -o &lt;order-id&gt;      # rilascia all'acquirente
mostro-cli admcancel -o &lt;order-id&gt;      # rimborsa il venditore

# Registra un arbitro, eventualmente in sola lettura
mostro-cli admaddsolver -n npub1...:read</code></pre>

      <p>Un altro gruppo di comandi passa dal gRPC di amministrazione invece che da Nostr, quindi richiedono <code>MOSTRO_RPC_URL</code> e <code>MOSTRO_RPC_TOKEN</code> anziché <code>ADMIN_NSEC</code>, e l'interfaccia RPC abilitata (vedi 4.7).</p>

      <pre><code>export MOSTRO_RPC_URL=http://127.0.0.1:50051
export MOSTRO_RPC_TOKEN=il-tuo-token-auth

mostro-cli admsetmaintenance -e true -r "motivo"
mostro-cli admmaintenancestatus
mostro-cli admcancelpending -o &lt;order-id&gt;</code></pre>

      <p><code>admcancelpending</code> vale la pena conoscerlo anche fuori da una migrazione. Annulla un ordine ancora in attesa o in attesa della cauzione di un taker, avvisa il maker e libera tutte le sue cauzioni in un colpo. Usalo per un ordine chiaramente abbandonato o quotato male, e avvisa prima il maker: è il suo ordine, e questa non è una risoluzione di disputa.</p>`,
    },
    'costs': {
      title: `6. Analisi dei Costi`,
      nav: `6. Analisi dei costi`,
      navShort: `6. Costi`,
      html: `      <h3>Costi operativi mensili</h3>
      <table class="guide-table">
        <thead><tr><th>Voce</th><th>Costo mensile</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>VPS (server)</td><td>$10–24</td><td>Dipende dal provider e dalle specifiche</td></tr>
          <tr><td>Nome di dominio (opzionale)</td><td>$1–2</td><td>Per un sito web/identità</td></tr>
          <tr><td>Commissioni on-chain canali Lightning</td><td>Variabile</td><td>Apertura/chiusura canali</td></tr>
          <tr><td><strong>Totale mensile</strong></td><td><strong>$11–26</strong></td><td>Esclusa liquidità Lightning</td></tr>
        </tbody>
      </table>

      <h3>Costi una tantum / di capitale</h3>
      <table class="guide-table">
        <thead><tr><th>Voce</th><th>Costo</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>Liquidità Lightning</td><td>0,01–1,0+ BTC</td><td>Bloccata nei canali; recuperata alla chiusura</td></tr>
          <tr><td>Hardware del nodo (se self-hosted)</td><td>$0–600</td><td>Gratis se usi VPS; $300-600 per Start9/Umbrel</td></tr>
          <tr><td>Tempo di configurazione</td><td>4–16 ore</td><td>A seconda del livello di esperienza</td></tr>
        </tbody>
      </table>

      <h3>Potenziale di entrate</h3>
      <table class="guide-table">
        <thead><tr><th>Volume mensile</th><th>Commissione (0,6%)</th><th>Commissione dev (30%)</th><th>Il tuo reddito netto</th></tr></thead>
        <tbody>
          <tr><td>$1.000</td><td>~$6</td><td>~$1,80</td><td>~$4,20</td></tr>
          <tr><td>$10.000</td><td>~$60</td><td>~$18</td><td>~$42</td></tr>
          <tr><td>$50.000</td><td>~$300</td><td>~$90</td><td>~$210</td></tr>
          <tr><td>$100.000</td><td>~$600</td><td>~$180</td><td>~$420</td></tr>
        </tbody>
      </table>

      <div class="callout important">
        <div class="callout-title">📝 Realtà</div>
        <p>La maggior parte dei nodi nuovi impiega mesi per costruire volume di operazioni. Non aspettarti profitti immediati. Il vero valore spesso viene dal fornire un servizio alla tua comunità, con le commissioni come bonus.</p>
      </div>

      <h3>Impegno di tempo</h3>
      <table class="guide-table">
        <thead><tr><th>Attività</th><th>Frequenza</th><th>Tempo</th></tr></thead>
        <tbody>
          <tr><td>Monitoraggio (controllare log, stato)</td><td>Giornaliero</td><td>5–10 min</td></tr>
          <tr><td>Risoluzione dispute</td><td>Al bisogno</td><td>15–60 min per disputa</td></tr>
          <tr><td>Aggiornamenti</td><td>Mensile</td><td>15–30 min</td></tr>
          <tr><td>Gestione liquidità</td><td>Settimanale</td><td>15–30 min</td></tr>
          <tr><td><strong>Stima settimanale totale</strong></td><td></td><td><strong>1–3 ore</strong></td></tr>
        </tbody>
      </table>`,
    },
    'faq': {
      title: `7. Domande Frequenti`,
      nav: `7. Domande frequenti`,
      navShort: `7. FAQ`,
      html: `      <h3>Devo essere uno sviluppatore per eseguire un nodo Mostro?</h3>
      <p>No, ma devi sentirti a tuo agio con le operazioni base da riga di comando (digitare comandi, modificare file di testo). Il percorso Docker (Opzione A) è progettato per essere accessibile.</p>

      <h3>Posso eseguire Mostro su un Raspberry Pi?</h3>
      <p>Tecnicamente sì (usando Start9 o simili), ma non è raccomandato per la produzione a causa delle limitazioni di CPU e RAM. Un VPS è più affidabile.</p>

      <h3>Posso usare Core Lightning (CLN) invece di LND?</h3>
      <p>No. Mostro attualmente supporta solo LND, perché dipende dall'implementazione specifica delle hold invoice di LND. Il supporto per altre implementazioni potrebbe arrivare in futuro.</p>

      <h3>Come si connettono gli utenti al mio Mostro?</h3>
      <p>Gli utenti hanno bisogno di un'app client Mostro (come Mostro Mobile o mostro-cli) e della chiave pubblica del tuo Mostro (npub). Aggiungono la tua npub al loro client, e il client comunica attraverso i relay Nostr. Non serve una connessione diretta.</p>

      <h3>Posso eseguire più istanze di Mostro?</h3>
      <p>Sì, ma ognuna ha bisogno della propria coppia di chiavi Nostr, nodo LND (o almeno canali/liquidità separati), e configurazione.</p>

      <h3>È legale?</h3>
      <p>Dipende molto dalla tua giurisdizione. Mostro è software per il trading peer-to-peer. In alcune giurisdizioni, operare un exchange P2P può richiedere licenze. <strong>Verifica le normative locali e chiedi consulenza legale.</strong></p>

      <h3>Quanta banda usa Mostro?</h3>
      <p>Pochissima — principalmente piccoli eventi Nostr. Qualche GB al mese è tipico anche con volumi moderati.</p>

      <h3>Cosa succede se il mio nodo va offline?</h3>
      <p>Gli ordini in attesa alla fine scadono. Le operazioni attive con fondi bloccati continuano quando torni online. Se sei offline troppo a lungo, gli utenti potrebbero perdere fiducia. Dalla v0.18.3 esiste anche una scadenza per l'escrow: se il nodo resta giù abbastanza a lungo perché la hold invoice si avvicini al suo orizzonte CLTV, LND la annulla e il venditore viene rimborsato automaticamente.</p>

      <h3>Posso cambiare la mia chiave Nostr in seguito?</h3>
      <p>Puoi, ma perderai l'identità e la reputazione del tuo nodo. Gli utenti lo vedranno come un nuovo Mostro. Tratta la tua chiave come la tua identità di marca.</p>

      <h3>Posso perdere soldi eseguendo un nodo Mostro?</h3>
      <p>Sì, è possibile: i fondi dei canali Lightning potrebbero essere a rischio per bug (raro); la chiusura forzata dei canali durante periodi di commissioni alte può essere costosa; i costi del VPS sono continui.</p>

      <h3>La liquidità Lightning è "a rischio"?</h3>
      <p>La tua liquidità Lightning è tua. Non è a rischio da parte di Mostro stesso — le hold invoice sono blocchi temporanei. Tuttavia, si applicano i rischi standard di Lightning Network (chiusure forzate, canali bloccati, bug).</p>

      <h3>Quando raggiungerò il pareggio?</h3>
      <p>Dipende dai tuoi costi e dal volume di operazioni. Con $20/mese di costi e 0,6% di commissione, hai bisogno di ~$5.000/mese in operazioni per coprire i costi (prima della commissione di sviluppo). La maggior parte delle comunità impiega 3–6 mesi per costruire un volume significativo.</p>

      <h3>Posso spostare Mostro su un altro nodo Lightning?</h3>
      <p>Sì, ma non modificando la configurazione e riavviando. L'escrow è legato al nodo che l'ha creato, quindi prima lo si drena in modalità manutenzione, e il daemon si rifiuta di partire se salti questo passaggio. Spostare lo stesso nodo su un altro host non è un cambio di nodo e non richiede nulla di particolare. Vedi 5.8.</p>`,
    },
    'security': {
      title: `8. Considerazioni di Sicurezza`,
      nav: `8. Sicurezza`,
      navShort: `8. Sicurezza`,
      html: `      <div class="callout important">
        <div class="callout-title">⚠️ Avviso software in fase iniziale</div>
        <p><strong>Mostro è in una fase iniziale di sviluppo.</strong> Sebbene il team lavori duramente per garantire l'affidabilità, potrebbero esserci bug non scoperti — inclusi bug di sicurezza che potrebbero risultare in perdita di fondi. <strong>Gli sviluppatori non sono responsabili di alcuna perdita di denaro dovuta a bug del software.</strong></p>
        <p>Mostro è open-source e il suo codice è aperto a verifiche. Incoraggiamo le comunità a promuovere e finanziare audit di sicurezza indipendenti.</p>
        <p>Detto questo, <strong>il meccanismo centrale di custodia tramite hold invoice di Lightning è stato testato in battaglia dal 2021</strong>, quando @lnp2pBot ha implementato per primo questo tipo di custodia. Migliaia di operazioni sono state completate con successo.</p>
      </div>

      <h3>Tieni la Chiave del Tuo Nodo Fuori Portata</h3>

      <p>La tua <code>nsec_privkey</code> è l'identità del tuo nodo, e chiunque la possieda può impersonare il tuo Mostro. Preferisci fornirla tramite la variabile d'ambiente <code>MOSTRO_NSEC_PRIVKEY</code> o un file <code>.env</code> con <code>chmod 600</code> invece di lasciarla in <code>settings.toml</code> (vedi 4.1). Non portarla nemmeno su un laptop per gestire le dispute: registra una chiave di solver separata per quello (vedi 5.2).</p>

      <h3>Operare sotto regimi autoritari</h3>

      <p>Se operi in un paese con un governo autoritario, <strong>la privacy non è opzionale — è un requisito di sicurezza.</strong></p>

      <ol>
        <li><strong>Esegui il tuo nodo Mostro dietro Tor e/o una VPN.</strong> Questo nasconde l'IP del tuo server dai relay Nostr.</li>
        <li><strong>Se Tor/VPN non è possibile</strong> (comune nei paesi in via di sviluppo con internet lento), <strong>pubblica eventi solo su relay che possiedi o di cui ti fidi.</strong></li>
        <li><strong>Fai molta attenzione a quali relay usi.</strong> In futuro, i governi potrebbero creare relay Nostr specificamente per raccogliere indirizzi IP.</li>
        <li><strong>Considera anche la privacy del tuo nodo Lightning.</strong> Eseguire LND dietro Tor è possibile e raccomandato in ambienti sensibili.</li>
      </ol>

      <div class="callout tip">
        <div class="callout-title">💡 Consiglio</div>
        <p>La bellezza del fatto che Mostro sia decentralizzato è che anche se un nodo viene spento, gli altri continuano a funzionare. Ma la prevenzione è sempre meglio del recupero. Prendi la privacy sul serio fin dal primo giorno.</p>
      </div>`,
    },
    'troubleshooting': {
      title: `9. Risoluzione dei Problemi`,
      nav: `9. Risoluzione dei problemi`,
      navShort: `9. Problemi`,
      html: `      <h3>Mostro non si avvia</h3>

      <h4><code>dev_fee_percentage (0.05) is below minimum (0.1)</code></h4>
      <p>Imposta <code>dev_fee_percentage</code> ad almeno <code>0.10</code> in settings.toml.</p>

      <h4>File di configurazione o database non trovato</h4>
      <p>Assicurati che il flag <code>-d</code> punti alla directory contenente <code>settings.toml</code>. Per Docker Hub: verifica che <code>~/mostro-config/settings.toml</code> esista.</p>

      <h4>Mostro termina all'avvio con <code>Ln node error</code></h4>
      <ul>
        <li>Verifica che LND sia in esecuzione: <code>lncli getinfo</code></li>
        <li>Controlla che <code>lnd_grpc_host</code> corrisponda all'indirizzo del tuo LND</li>
        <li>Verifica che i percorsi di <code>tls.cert</code> e <code>mostro.macaroon</code> siano corretti</li>
        <li>Verifica che il macaroon abbia i permessi indicati in 2.2</li>
        <li>Docker + LND sull'host: usa <code>host.docker.internal</code>. L'Opzione B richiede inoltre il mapping <code>extra_hosts</code>.</li>
      </ul>

      <h4><code>REFUSING TO START: Lightning node changed</code></h4>
      <p>Mostro punta a un'identità LND diversa mentre c'è ancora escrow aperto sulla precedente. Ricollega il nodo vecchio e drenalo prima di cambiare. Vedi 5.8.</p>

      <h4>I client non vedono i miei ordini o non riescono a scrivere al mio nodo</h4>
      <p>Controlla la riga <code>Transport:</code> nei tuoi log. Un nodo su <code>nip44</code> è invisibile ai client che parlano solo il protocollo v1, e un nodo su <code>gift-wrap</code> è invisibile ai client v2. Vedi 4.8.</p>

      <h4>I pagamenti falliscono con "no route"</h4>
      <p>Controlla <code>payment_cltv_limit</code>. Deve stare almeno 576 blocchi sopra <code>max_final_cltv_expiry_delta</code> e non deve superare <code>--max-cltv-expiry</code> del tuo LND. Vedi 4.9.</p>

      <h3>Problemi di connessione</h3>

      <h4>Mostro si avvia ma non si connette ai relay</h4>
      <ul>
        <li>Controlla le URL dei relay (devono iniziare con <code>wss://</code>)</li>
        <li>Assicurati che il firewall del tuo VPS permetta connessioni in uscita sulla porta 443</li>
        <li>Prova con relay diversi — alcuni potrebbero essere temporaneamente offline</li>
      </ul>

      <h3>Problemi con le operazioni</h3>

      <h4>Un utente riceve "cant-do: too_many_requests" durante il ripristino della sessione</h4>
      <p>Questo accade quando l'utente ha più ordini (storici + attivi) del valore di <code>max_orders_per_response</code> nella tua configurazione. Il client prova a recuperare tutti gli ordini in una volta e Mostro lo rifiuta. <strong>Non è un ban né un blocco temporaneo</strong> — continuerà a succedere finché non aggiusti il valore.</p>
      <pre><code># In settings.toml, aumenta il limite:
max_orders_per_response = 50  # il default è 10, il massimo 255
</code></pre>

      <p>Il valore sta in un singolo byte, quindi <code>255</code> è il tetto. Se un utente ha più ordini di così, deve ripulire il suo storico invece che tu continui ad alzare il limite.</p>

      <h4>Gli ordini non appaiono nei client</h4>
      <ul>
        <li>Controlla le connessioni ai relay nei log</li>
        <li>Assicurati che i client usino gli stessi relay del tuo nodo</li>
      </ul>

      <h4>Pagamenti falliti</h4>
      <ul>
        <li>Controlla la liquidità: <code>lncli listchannels</code></li>
        <li>Assicurati di avere sufficiente capacità in uscita</li>
        <li>Controlla l'impostazione <code>max_routing_fee</code></li>
      </ul>

      <h3>Problemi di database</h3>

      <h4>Errori database bloccato</h4>
      <pre><code>ps aux | grep mostrod
# Se ci sono processi multipli, termina quelli extra:
kill &lt;PID&gt;</code></pre>

      <h3>Ottenere aiuto</h3>

      <ol>
        <li><strong>Controlla prima i log</strong> — la maggior parte degli errori spiega cosa è andato storto</li>
        <li><strong>Telegram (Sviluppatori):</strong> <a href="https://t.me/mostro_dev" target="_blank" rel="noopener noreferrer">@mostro_dev</a></li>
        <li><strong>Telegram (Comunità):</strong> <a href="https://t.me/MostroP2P" target="_blank" rel="noopener noreferrer">@MostroP2P</a></li>
        <li><strong>GitHub Issues:</strong> <a href="https://github.com/MostroP2P/mostro/issues" target="_blank" rel="noopener noreferrer">github.com/MostroP2P/mostro/issues</a></li>
        <li><strong>DeepWiki:</strong> <a href="https://deepwiki.com/MostroP2P/mostro" target="_blank" rel="noopener noreferrer">deepwiki.com/MostroP2P/mostro</a></li>
      </ol>

      <p>Quando chiedi aiuto, includi sempre: la tua versione di Mostro, l'output rilevante dei log, e cosa hai già provato.</p>

      <!-- ===== APPENDIX ===== -->`,
    },
    'appendix': {
      title: `Appendice: Riferimento Rapido`,
      nav: `Appendice`,
      html: `      <h3>Posizioni importanti dei file</h3>
      <table class="guide-table">
        <thead><tr><th>File</th><th>Docker Hub</th><th>Nativo</th></tr></thead>
        <tbody>
          <tr><td>Configurazione</td><td><code>~/mostro-config/settings.toml</code></td><td><code>/opt/mostro/settings.toml</code></td></tr>
          <tr><td>Database</td><td><code>~/mostro-config/mostro.db</code></td><td><code>/opt/mostro/mostro.db</code></td></tr>
          <tr><td>Cert LND</td><td><code>~/mostro-config/lnd/tls.cert</code></td><td>Varia (controlla config LND)</td></tr>
          <tr><td>Macaroon LND</td><td><code>~/mostro-config/lnd/mostro.macaroon</code></td><td>Varia (controlla config LND)</td></tr>
          <tr><td>Servizio</td><td>N/A</td><td><code>/etc/systemd/system/mostro.service</code></td></tr>
          <tr><td>Log</td><td><code>docker logs -f mostro</code></td><td><code>journalctl -u mostro</code></td></tr>
        </tbody>
      </table>

      <h3>Comandi essenziali</h3>
      <pre><code># Docker
docker logs -f mostro         # Vedere i log
docker restart mostro          # Riavviare
docker stop mostro             # Fermare

# Nativo (systemd)
systemctl start mostro         # Avviare
systemctl stop mostro          # Fermare
systemctl restart mostro       # Riavviare
systemctl status mostro        # Vedere lo stato
journalctl -u mostro -f        # Vedere i log

# Database
sqlite3 mostro.db "SELECT COUNT(*) FROM orders;"                           # Totale ordini
sqlite3 mostro.db "SELECT COUNT(*) FROM orders WHERE status='success';"    # Operazioni riuscite
sqlite3 mostro.db "SELECT SUM(fee*2 - COALESCE(dev_fee, 0)) FROM orders WHERE status='success';"  # Commissioni nette trattenute dal nodo</code></pre>

      <h3>Configurazione raccomandata per nodi nuovi</h3>
      <pre><code>[mostro]
fee = 0.006
max_order_amount = 500000
min_payment_amount = 1000
expiration_hours = 24
expiration_seconds = 900
pow = 0
dev_fee_percentage = 0.30
fiat_currencies_accepted = ['USD']  # Cambia con la tua valuta locale

[nostr]
relays = [
  'wss://relay.mostro.network',
  'wss://nos.lol',
  'wss://relay.nostr.band'
]</code></pre>`,
    },
  },
};

export default it;
