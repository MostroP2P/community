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
        <li><strong>Entrate da commissioni</strong> — Ogni operazione ti genera la commissione che hai impostato (il template parte da 0; lo 0,6% è una scelta comune). Con lo 0,6%, una comunità che fa $10.000 in operazioni mensili guadagna ~$60/mese in commissioni.</li>
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

      <p>Queste cifre valgono per il solo Mostro. Se LND gira sullo stesso VPS, aggiungi almeno 2 GB di RAM e il disco che serve al suo backend Bitcoin (vedi 2.2).</p>

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
          <tr><td>Eseguire LND sullo stesso VPS</td><td><span class="badge badge-hard">Difficile</span></td><td>VPS più grande + liquidità</td><td>4GB+ RAM e disco per il backend Bitcoin (vedi sotto)</td></tr>
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

      <p><strong>Genera un macaroon dedicato per Mostro.</strong> Non dare a Mostro il tuo <code>admin.macaroon</code>: concede il controllo totale sul tuo nodo e sui suoi fondi. Crea un macaroon che contenga solo i permessi che Mostro usa davvero (leggere le info del nodo, elencare i canali per il report di salute, creare/regolare/annullare hold invoice, inviare e tracciare pagamenti).</p>
      <p>Scegli prima un root key ID non ancora in uso. Revocare un macaroon revoca tutti i macaroon che condividono il suo ID, quindi riutilizzarne uno porterebbe via credenziali estranee. L'ID 0 appartiene ai macaroon di LND, quindi scegli un numero libero diverso da zero e annotalo:</p>
      <pre><code>lncli listmacaroonids</code></pre>
      <p>Poi crea il macaroon con l'ID che hai scelto (<code>7</code> in questo esempio, sostituisci con il tuo):</p>
      <pre><code>lncli bakemacaroon --root_key_id 7 \\
  --save_to /root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon \\
  info:read invoices:read invoices:write offchain:read offchain:write</code></pre>
      <p>Questo macaroon non può aprire o chiudere canali, spostare fondi on-chain né modificare la configurazione del tuo nodo. Se dovesse trapelare, revocalo con <code>lncli deletemacaroonid 7</code>, usando lo stesso ID con cui l'hai creato, e generane uno nuovo.</p>

      <p><strong>Se non puoi scrivere nella directory dati di LND</strong> (un container, un nodo-in-a-box, un nodo ospitato), ometti <code>--save_to</code>: <code>lncli</code> stamperà allora il macaroon in esadecimale, e lo trasformi in un file dove gira Mostro. <code>lncli</code> può anche generarlo da un'altra macchina, puntata al nodo con le sue credenziali admin:</p>
      <pre><code>lncli --rpcserver=NODE_ADDRESS:10009 --tlscertpath=tls.cert --macaroonpath=admin.macaroon \\
  bakemacaroon --root_key_id 7 info:read invoices:read invoices:write offchain:read offchain:write
# copia l'esadecimale che stampa, poi:
echo "PASTE_THE_HEX_HERE" | xxd -r -p > mostro.macaroon   # apt install -y xxd se manca</code></pre>

      <h4>Come si connette Mostro a LND</h4>
      <p>Mostro parla con la porta gRPC di LND (10009 per impostazione predefinita) e si autentica con <code>tls.cert</code> e il macaroon. Ci sono tre cose da sapere prima di scegliere dove far girare LND:</p>
      <ul>
        <li><strong>Per impostazione predefinita LND ascolta solo su <code>localhost</code>.</strong> Un Mostro sulla stessa macchina lo raggiunge a <code>https://127.0.0.1:10009</code>; qualsiasi altro caso (un container Docker, un altro server) richiede i passaggi aggiuntivi qui sotto.</li>
        <li><strong>Mostro fissa il certificato (pinning).</strong> Accetta esattamente il certificato in <code>tls.cert</code> e ignora il nome host, quindi non servono <code>tlsextraip</code> né <code>tlsextradomain</code>. Ma se LND rigenera il suo certificato (scade dopo circa 14 mesi), copia il nuovo <code>tls.cert</code> su Mostro e riavvialo, altrimenti si ferma all'avvio con <code>Ln node error</code>.</li>
        <li><strong>Niente Tor per questo collegamento.</strong> Mostro non può raggiungere LND tramite Tor o un proxy SOCKS. Un LND remoto deve essere raggiungibile via rete: usa una VPN.</li>
      </ul>

      <h4>LND sullo stesso VPS</h4>
      <p>Installa LND seguendo la guida ufficiale (<a href="https://docs.lightning.engineering/lightning-network-tools/lnd/run-lnd" target="_blank" rel="noopener noreferrer">docs.lightning.engineering</a>), usando i suoi binari di release. LND ha bisogno di una vista della blockchain Bitcoin, e questa scelta decide la dimensione del tuo VPS:</p>
      <table class="guide-table">
        <thead><tr><th>Backend</th><th>Disco</th><th>Compromesso</th></tr></thead>
        <tbody>
          <tr><td><code>bitcoind</code>, nodo completo</td><td>Più di 700 GB</td><td>Il più robusto. La sincronizzazione iniziale richiede giorni.</td></tr>
          <tr><td><code>bitcoind</code>, pruned</td><td>Decine di GB</td><td>Supportato da LND e robusto; la sincronizzazione iniziale richiede comunque giorni.</td></tr>
          <tr><td><code>neutrino</code></td><td>Pochi GB</td><td>Nessun nodo Bitcoin e avvio rapido, ma dipende dai peer da cui si sincronizza. Un nodo neutrino rimasto bloccato per circa 21 ore è il motivo per cui Mostro ora monitora la sincronizzazione di LND (5.4). Se lo usi, puntalo a nodi Bitcoin di cui ti fidi con <code>neutrino.connect</code> e configura gli avvisi di salute.</td></tr>
        </tbody>
      </table>
      <p>Poi rendi LND raggiungibile da Mostro. Con l'installazione nativa (Opzione C) non cambia nulla: usa <code>https://127.0.0.1:10009</code>. Con Docker (Opzioni A e B) il container è un host separato, quindi scegli una di queste strade:</p>
      <ul>
        <li><strong>Rete host (la più semplice).</strong> Esegui il container con <code>--network host</code> invece di <code>--add-host=host.docker.internal:host-gateway</code> (in compose, <code>network_mode: host</code> invece di <code>extra_hosts</code>) e imposta <code>lnd_grpc_host = 'https://127.0.0.1:10009'</code>. LND continua ad ascoltare solo su <code>localhost</code>.</li>
        <li><strong>Mantieni la rete bridge</strong> e <code>host.docker.internal</code>, come nell'Opzione A. Allora LND deve ascoltare oltre <code>localhost</code> (aggiungi <code>rpclisten=0.0.0.0:10009</code> a <code>lnd.conf</code>) e il tuo firewall deve tenere la porta 10009 chiusa a internet, per esempio <code>ufw allow from 172.16.0.0/12 to any port 10009 proto tcp</code> seguito da <code>ufw deny 10009/tcp</code>.</li>
      </ul>

      <h4>LND su un altro server o a casa</h4>
      <p>Collega le due macchine con una VPN come <a href="https://www.wireguard.com/" target="_blank" rel="noopener noreferrer">WireGuard</a> o <a href="https://tailscale.com/" target="_blank" rel="noopener noreferrer">Tailscale</a>, fai ascoltare LND sul suo indirizzo VPN (<code>rpclisten=VPN_IP:10009</code>) e imposta <code>lnd_grpc_host = 'https://VPN_IP:10009'</code>. Copia <code>tls.cert</code> e il macaroon sul server di Mostro. Aprire la porta 10009 a internet funziona comunque, ma allora il macaroon è l'unica cosa che separa il mondo dal tuo nodo: evitalo. Un nodo a casa deve restare online 24/7: un blackout o una connessione che cade lasciano in attesa gli scambi dei tuoi utenti.</p>

      <h4>Nodo-in-a-box (Start9, Umbrel, RaspiBlitz)</h4>
      <p>Questi sistemi installano e aggiornano LND per te, di solito su un piccolo computer a casa. Su <strong>StartOS</strong> la via più semplice è il pacchetto Mostro stesso, che si collega al servizio LND sulla stessa box. Per usare l'LND della box da un Mostro su un VPS, usa la configurazione VPN descritta sopra. Ogni sistema mostra i dettagli di connessione di LND nella propria interfaccia (su StartOS, nelle proprietà del servizio LND); <code>lncli</code> di solito gira dentro il container di LND, su Umbrel per esempio <code>sudo docker exec -it lightning_lnd_1 lncli ...</code> (controlla il nome con <code>sudo docker ps</code>). Genera il macaroon in esadecimale come mostrato sopra.</p>

      <h4>Voltage (LND ospitato)</h4>
      <p>Voltage gestisce LND per te. Scarica <code>tls.cert</code> e il macaroon admin dalla dashboard del nodo, usali solo per generare il macaroon limitato di Mostro dalla tua macchina (vedi sopra) e punta <code>lnd_grpc_host</code> all'indirizzo gRPC che mostra la dashboard, porta 10009. La liquidità resta da fornire e gestire a te.</p>

      <h4>Impostazioni di LND che influenzano Mostro</h4>
      <ul>
        <li><code>invoices.holdexpirydelta</code> (predefinito 12): se lo aumenti, aumenta anche <code>escrow_deadline_margin_blocks</code> in modo che resti di almeno 6 blocchi sopra (4.9).</li>
        <li><code>max-cltv-expiry</code> (predefinito 2016): il <code>payment_cltv_limit</code> di Mostro non deve superarlo (4.9).</li>
        <li>Conserva al sicuro il seed del wallet di LND e il backup dei canali: vedi 5.6.</li>
      </ul>`,
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
        <li>Ti serve capacità <strong>in uscita</strong> (per pagare gli acquirenti) e capacità <strong>in entrata</strong> (per ricevere dai venditori). Ogni scambio prima riceve i sat del venditore e poi paga l'acquirente, quindi mantieni almeno il tuo <code>max_order_amount</code> (4.3) di capacità in ciascuna direzione</li>
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
      <p><strong>Se LND è sullo stesso VPS</strong> (LND deve accettare la connessione del container, oppure usa la rete host: vedi 2.2):</p>
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
        <li><code>Mostro pubkey: npub1... (hex ...)</code> — L'identità del tuo nodo. Annota la npub: è ciò che servirà a utenti e altri strumenti</li>
        <li><code>Settings correctly loaded!</code> — La configurazione è valida</li>
        <li><code>Transport: nip44 (protocol v2, event kind 14)</code> — Protocollo in uso (vedi 4.8)</li>
        <li><code>Recorded Lightning node identity &lt;pubkey&gt;</code> — LND raggiunto (solo al primo avvio)</li>
        <li><code>Published health event: status ok, seq N</code> — Ripetuto ogni minuto. Almeno un relay ha accettato il report di salute del nodo (vedi 5.4)</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Nota</div>
        <p>Non esiste un messaggio "connesso a LND" né "connesso al relay". Mostro contatta LND durante l'avvio, quindi un daemon che supera l'avvio ha raggiunto LND. Il fallimento invece è rumoroso: registra <code>Ln node error</code> e termina. Dopo l'avvio interroga LND ogni 15 secondi e registra <code>LND did not answer GetInfo</code> se smette di rispondere; i pagamenti in uscita restano in attesa finché non torna (5.4). Per i relay, il segnale è la riga dell'evento di salute: <code>No relay accepted the health event</code> significa che nessuno lo ha accettato.</p>
      </div>

      <div class="callout tip">
        <div class="callout-title">💡 Risoluzione problemi</div>
        <p>Se vedi <code>Permission denied (os error 13)</code>, riapplica i permessi: <code>chown -R 1000:1000 ~/mostro-config</code> e riavvia: <code>docker restart mostro</code>.</p>
      </div>

      <p>🎉 <strong>Congratulazioni!</strong> Se vedi connessioni riuscite nei log, il tuo nodo Mostro è in funzione!</p>

      <h4>Alternativa: Docker Compose</h4>
      <p>Invece di un lungo comando <code>docker run</code> puoi descrivere il container in un file compose. Esegue la stessa immagine con le stesse impostazioni, e aggiornare diventa cambiare il tag su una riga. Crea <code>~/mostro-docker/compose.yml</code>:</p>
      <pre><code>mkdir -p ~/mostro-docker
nano ~/mostro-docker/compose.yml</code></pre>
      <pre><code>services:
  mostro:
    image: mostrop2p/mostro:{{version}}
    container_name: mostro
    restart: unless-stopped
    extra_hosts:
      - "host.docker.internal:host-gateway"  # solo se LND gira su questo VPS
    volumes:
      - \${HOME}/mostro-config:/config</code></pre>
      <p>Avvialo e segui i log:</p>
      <pre><code>docker compose -f ~/mostro-docker/compose.yml up -d
docker compose -f ~/mostro-docker/compose.yml logs -f mostro</code></pre>
      <p>Scegline uno: <code>docker run</code> <strong>oppure</strong> compose, non entrambi. Per aggiornare l'uno o l'altro, vedi 5.5.</p>

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
      <p>Modifica le stesse impostazioni dell'Opzione A, Passo 8, con una differenza: <code>make docker-build</code> copia il tuo macaroon in <code>config/lnd/admin.macaroon</code>, qualunque fosse il nome originale, quindi punta Mostro lì:</p>
      <pre><code>lnd_macaroon_file = '/config/lnd/admin.macaroon'  # è sempre il tuo mostro.macaroon ristretto, con un altro nome</code></pre>

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
        <li>Inviata automaticamente all'indirizzo Lightning <code>dev@pay.mostro.foundation</code>; non c'è nulla da configurare</li>
        <li>Pagata solo quando il tuo LND gira su <strong>mainnet</strong>. Su testnet, signet o regtest gli importi vengono comunque calcolati, ma non si paga nulla e il log dice <code>dev fee payments are disabled</code></li>
        <li>Un pagamento fallito viene ritentato per ordine, a intervalli da un minuto fino a un'ora</li>
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
        <li><strong><code>min_payment_amount</code>:</strong> Operazione minima in satoshi. 1.000 o 10.000 è più pratico di 100. Entrambi i limiti si verificano sui sat che l'ordine sposta davvero, premio o sconto inclusi.</li>
        <li><strong><code>max_orders_per_response</code>:</strong> Numero massimo di ordini che Mostro restituisce in una singola query. Se un utente accumula più ordini di questo limite (ad esempio durante il ripristino della sessione dal client mobile), riceverà un errore <code>cant-do: too_many_requests</code> e non potrà recuperare i suoi ordini. Se i tuoi utenti operano frequentemente, aumenta questo valore (ad esempio 50 o 100). Il valore predefinito di 10 potrebbe non essere sufficiente.</li>
        <li><strong><code>fiat_currencies_accepted</code>:</strong> Usa <a href="https://en.wikipedia.org/wiki/ISO_4217" target="_blank" rel="noopener noreferrer">codici ISO 4217</a>, in MAIUSCOLO: la corrispondenza è esatta. Array vuoto <code>[]</code> accetta tutte le valute. Dalla v0.20.2 la lista può contenere anche le stablecoin <code>USDT</code>, <code>USDC</code> e <code>DOC</code>, e bitcoin su altre reti (<code>BTC</code>, <code>LBTC</code>, <code>RBTC</code>) — vedi 4.12.</li>
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
expiration_hours = 24        # Quanto tempo un ordine non preso resta nel book
max_expiration_days = 15     # Scadenza massima che un maker può chiedere
expiration_seconds = 900     # Quanto può attendere un ordine preso la hold invoice
                             # o la fattura dell'acquirente prima di tornare nel book (15 min)

[lightning]
hold_invoice_expiration_window = 300  # Tempo che ha il taker per pagare la fattura o fornirne una di incasso (5 min)
hold_invoice_cltv_delta = 144         # Durata dell'escrow, in blocchi (~1 giorno)</code></pre>

      <p>Nota che <code>hold_invoice_expiration_window</code> appartiene a <code>[lightning]</code>: scritto sotto <code>[mostro]</code> viene ignorato in silenzio. Deve essere maggiore di 0, ed è anche la scadenza della fattura della cauzione di un taker.</p>

      <p>Una volta bloccati i sat del venditore, l'acquirente ha circa <code>hold_invoice_cltv_delta - escrow_deadline_margin_blocks</code> blocchi per inviare il pagamento: 144 − 24 = 120 blocchi, circa 20 ore, con i valori predefiniti. Allo scadere, Mostro annulla l'operazione se l'acquirente non ha mai segnato il pagamento come inviato, oppure apre una disputa se lo ha fatto (vedi 4.9). Gli utenti vedono il conto alla rovescia nell'app.</p>`,
    },
    'antispam': {
      title: `4.6 Anti-Spam`,
      nav: `Anti-Spam`,
      html: `      <pre><code>[mostro]
pow = 0  # 0 = disabilitato; 10-20 = moderato. Inizia con 0.</code></pre>

      <p>Un filtro più fine è <code>pow_first_contact</code>. <code>pow</code> si applica a ogni messaggio, mentre <code>pow_first_contact</code> si applica solo ai mittenti estranei a un'operazione attiva e viene verificato prima della decifratura. Così le operazioni in corso restano economiche mentre agli sconosciuti costa lavoro reale:</p>
      <pre><code>[mostro]
pow = 0                  # operazioni in corso
pow_first_contact = 16   # nuovi ordini e prese da chiavi sconosciute</code></pre>
      <p>I client devono minare almeno quel valore. Chi usa mostro-cli deve impostare <code>POW</code> (o <code>-p</code>) al tuo valore, altrimenti i nuovi ordini e le prese vengono scartati senza risposta.</p>

      <p>Un deterrente più forte contro chi prende ordini e poi sparisce è la cauzione anti-abuso (vedi 4.11).</p>`,
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
      </div>

      <p>Oltre alla modalità manutenzione, l'RPC espone le chiamate di reputazione <code>RevokeReputationImports</code> e <code>RebindReputationExport</code> (vedi 4.13). Entrambe sono accettate solo da loopback e mostro-cli non ha ancora un comando per loro: usa <code>grpcurl</code>. mostro-cli invia <code>MOSTRO_RPC_TOKEN</code> solo a un indirizzo loopback o su <code>https://</code>, mai in chiaro a un host remoto.</p>`,
    },
    'transport': {
      title: `4.8 Protocollo di Trasporto`,
      nav: `Trasporto`,
      html: `      <p>Dalla v0.19.0 un nodo Mostro parla <strong>solo</strong> il protocollo v2: eventi kind 14 firmati con contenuto cifrato NIP-44. Il protocollo v1 (gift wrap NIP-59, kind 1059) è stato rimosso e non c'è più nulla da scegliere. Lascia fuori la riga <code>transport</code> da <code>settings.toml</code>; il template non ce l'ha più.</p>

      <table class="guide-table">
        <thead><tr><th>Riga in settings.toml</th><th>Risultato</th></tr></thead>
        <tbody>
          <tr><td>nessuna</td><td>Protocollo v2. Raccomandato.</td></tr>
          <tr><td><code>transport = "nip44"</code></td><td>Protocollo v2. Accettata e innocua.</td></tr>
          <tr><td><code>transport = "gift-wrap"</code></td><td><strong>Mostro si rifiuta di partire</strong>, con un errore che ti dice di eliminare la riga.</td></tr>
        </tbody>
      </table>

      <p>Il tuo nodo annuncia <code>protocol_version</code> 2 nel suo evento info kind 38385. Tutti i client attuali parlano v2: la Mostro App, Mostrix 0.3.1 o successivo, mostro-cli 0.16.2 o successivo e Bosstro. Un client che parla solo v1, come una vecchia build di Mostro Mobile, non riceve alcuna risposta dal tuo nodo: chiedi ai tuoi utenti di aggiornare.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Aggiornamento dalla v0.18.x</div>
        <p>Se il tuo <code>settings.toml</code> dice ancora <code>transport = "gift-wrap"</code>, elimina quella riga prima di aggiornare. L'unico modo per continuare a servire i client protocollo v1 è restare su mostrod 0.18.x, che non riceve più correzioni.</p>
      </div>`,
    },
    'ln-safety': {
      title: `4.9 Limiti di Sicurezza Lightning`,
      nav: `Limiti Lightning`,
      html: `      <p>Queste impostazioni di <code>[lightning]</code> limitano quanto a lungo i tuoi canali possono restare bloccati e quanti pagamenti possono essere irrisolti contemporaneamente. Hanno tutte un valore predefinito, quindi un file di configurazione di una versione precedente di solito si avvia ancora, ma un template nuovo le include e vale la pena conoscerle.</p>

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
          <tr><td><code>escrow_deadline_margin_blocks</code></td><td>Margine di sicurezza prima che LND annulli automaticamente una hold invoice accettata. Quando la catena si avvicina a questo punto, Mostro annulla l'operazione o apre una disputa mentre l'escrow esiste ancora. Dalla v0.20.0 Mostro <strong>si rifiuta di partire</strong> a meno che non sia almeno 18 (il valore predefinito di LND per <code>invoices.holdexpirydelta</code>, 12, più 6 blocchi di margine) e inferiore a <code>hold_invoice_cltv_delta</code>. Se hai alzato <code>holdexpirydelta</code>, mantieni tu questo margine ad almeno 6 blocchi sopra. Il valore è pubblicato nel tuo evento info.</td></tr>
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

      <p>Gli operatori che servono il peso cubano possono aggiungere El Toque per CUP e MLC del mercato informale. È opt-in, limitato a queste due valute, e richiede un token gratuito: un El Toque abilitato senza <code>token</code> si rifiuta di partire.</p>

      <p>Mantieni <code>publish_to_nostr = true</code>. Oltre ad alimentare gli altri nodi, i tassi pubblicati dicono alla Mostro App quali valute il tuo nodo sa quotare a prezzo di mercato: un codice che manca da lì viene offerto solo a prezzo fisso. Per quotare le stablecoin e bitcoin su altre reti, vedi 4.12.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Aggiungere qualsiasi blocco [price] cambia il motore dei prezzi</div>
        <p>Appena <code>settings.toml</code> ha una tabella <code>[price]</code> o <code>[price.providers.*]</code>, Mostro usa il motore multi-fonte e ignora <code>bitcoin_price_api_url</code>. Assicurati che almeno una fonte di mercato (Yadio, CoinGecko, Currency API, Blockchain.com…) sia abilitata, altrimenti il tuo nodo non ha un tasso fiat e rifiuta ogni ordine a prezzo di mercato. Controlla nel log di avvio gli avvisi che iniziano con <code>price:</code>.</p>
      </div>`,
    },
    'optional-blocks': {
      title: `4.11 Altri Blocchi Opzionali`,
      nav: `Blocchi opzionali`,
      html: `      <p>Altri blocchi che potresti incontrare in un template recente. Nessuno è obbligatorio. Tre di loro hanno una sezione dedicata: <code>[price.providers.pegged]</code> (4.12), <code>[reputation_import]</code> / <code>[reputation_export]</code> (4.13) e <code>[health]</code> (5.4). <code>serbero_pubkey</code>, in <code>[mostro]</code>, è trattato in 5.10.</p>

      <p><strong>Ritenzione degli eventi.</strong> Quanto tempo Mostro conserva ogni tipo di evento prima che scada. Ometti del tutto il blocco per accettare i valori predefiniti.</p>
      <pre><code>[expiration]
order_days = 30        # eventi degli ordini (kind 38383)
rating_days = 90       # storico della reputazione (kind 38384)
dispute_days = 90      # dispute, conservate più a lungo per l'audit (kind 38386)
fee_audit_days = 365   # trasparenza delle commissioni (kind 8383)
dm_days = 30           # messaggi diretti del protocollo v2 (kind 14)</code></pre>

      <h4>Cauzioni anti-abuso</h4>
      <p><code>[anti_abuse_bond]</code> chiede ai taker, ai maker o a entrambi di bloccare una piccola hold invoice Lightning accanto all'operazione. Gli utenti onesti la riavono intatta; un solver può confiscare la cauzione di chi ha agito in malafede, e una quota va alla controparte onesta. Gli utenti la vedono come un "deposito" nell'app, e la documentazione utente la spiega nel capitolo <em>Deposito anti-abuso</em>. Tutte le fasi sono state rilasciate; è disabilitata per default.</p>
      <pre><code>[anti_abuse_bond]
enabled = true
amount_pct = 0.01                 # cauzione = max(1% dell'ordine, base_amount_sats)
base_amount_sats = 1000
apply_to = "take"                 # "take" | "make" | "both"
slash_on_waiting_timeout = false  # confisca anche a chi lascia scadere il proprio passaggio
slash_node_share_pct = 0.5        # quota della cauzione confiscata che il nodo trattiene
payout_claim_window_days = 15     # tempo che ha il vincitore per reclamare la sua quota
maker_bond_payment_timeout_seconds = 900
# bond_cltv_delta = 432           # vedi sotto</code></pre>
      <ul>
        <li>Un maker che non ha ancora pagato la cauzione può annullare l'ordine, e un ordine non pagato scade dopo <code>maker_bond_payment_timeout_seconds</code>.</li>
        <li>La cauzione di un maker resta bloccata mentre l'ordine riposa nel book, quindi un ordine vi resta al massimo <code>bond_cltv_delta - hold_invoice_cltv_delta - 144</code> blocchi (circa 24 h con i valori predefiniti), qualunque cosa dica <code>expiration_hours</code>.</li>
        <li><code>bond_cltv_delta</code> deve essere sopra <code>hold_invoice_cltv_delta + 144</code> e al massimo 864. Nella v0.20.2 il suo default è un 432 fisso, quindi se hai alzato <code>hold_invoice_cltv_delta</code> a 288 o più, impostalo esplicitamente o Mostro si rifiuta di partire.</li>
        <li>I solver confiscano con l'opzione cauzione quando liquidano o annullano (Mostrix, Bosstro, oppure <code>mostro-cli admsettle/admcancel --slashseller/--slashbuyer</code>).</li>
      </ul>
      <p>Leggi il <code>docs/ANTI_ABUSE_BOND.md</code> del progetto prima di abilitarla su un nodo in produzione, e annunciala prima ai tuoi utenti.</p>

      <h4>Storico del pagatore (sperimentale)</h4>
      <p><code>[payer_history]</code> combatte la truffa della triangolazione, in cui un acquirente paga dal conto bancario di un terzo. L'acquirente si impegna con un hash del conto da cui pagherà (<code>declare-payer</code>), il venditore può confrontarlo con il mittente nel suo estratto conto, e Mostro conserva solo un HMAC. Alla v0.20.2 è collegata solo la dichiarazione: il controllo <code>require_declaration</code> e lo storico mostrato ai venditori non sono ancora implementati, e nessun client rilasciato invia <code>declare-payer</code>. Per ora lascialo spento.</p>
      <pre><code># [payer_history]
# enabled = false
# require_declaration = false</code></pre>

      <h4>Escrow Cashu</h4>
      <p><code>[cashu]</code> è una modalità sperimentale che gira senza LND e tiene l'escrow in token Cashu. Non è ancora utilizzabile per operare davvero — le azioni di trade dopo la presa vengono ancora rifiutate — e non si può combinare con le cauzioni anti-abuso. Dalla v0.19.3 il maker sceglie la mint per ogni ordine da una lista consentita:</p>
      <pre><code># [cashu]
# enabled = false
# mint_urls = ["https://mint.example.com"]   # [] vuoto = qualsiasi mint con host pubblico
# escrow_locktime_days = 15</code></pre>
      <p>La vecchia chiave singola <code>mint_url</code> viene rifiutata: una configurazione che la contiene non si carica.</p>`,
    },
    'pegged': {
      title: `4.12 Stablecoin e Bitcoin su Altre Reti`,
      nav: `Stablecoin e altri BTC`,
      html: `      <p>Dalla v0.20.2 un nodo può offrire operazioni contro sei codici che non sono valute fiat: stablecoin in dollari e bitcoin su altre reti. I sat Lightning sono sempre un lato dell'operazione; l'altro lato viene pagato on-chain, su Liquid, su Rootstock o sulla rete della stablecoin, direttamente tra i due utenti.</p>

      <table class="guide-table">
        <thead><tr><th>Codice</th><th>Cos'è</th><th>Quotato come</th><th>Importo dell'ordine in</th></tr></thead>
        <tbody>
          <tr><td><code>USDT</code></td><td>Tether USD</td><td>1 USD</td><td>monete intere</td></tr>
          <tr><td><code>USDC</code></td><td>USD Coin</td><td>1 USD</td><td>monete intere</td></tr>
          <tr><td><code>DOC</code></td><td>Dollar on Chain (Rootstock)</td><td>1 USD</td><td>monete intere</td></tr>
          <tr><td><code>BTC</code></td><td>Bitcoin on-chain</td><td>1 sat = 1 sat</td><td>sat</td></tr>
          <tr><td><code>LBTC</code></td><td>L-BTC su Liquid</td><td>1 sat = 1 sat</td><td>sat</td></tr>
          <tr><td><code>RBTC</code></td><td>RBTC su Rootstock</td><td>1 sat = 1 sat</td><td>sat</td></tr>
        </tbody>
      </table>

      <ul>
        <li><strong>Le stablecoin</strong> sono agganciate 1:1 al dollaro, quindi un ordine USDT a prezzo di mercato è quotato esattamente come un ordine USD, premio incluso. Il tasso USD viene dalle tue normali fonti di prezzo (4.10); non viene chiamata nessuna API aggiuntiva.</li>
        <li><strong>BTC, LBTC e RBTC</strong> sono quotati 1:1 in sat, quindi non servono affatto API di prezzo. Un ordine da 100.000 significa 100.000 sat dell'asset (0,001 RBTC). A prezzo di mercato il premio è il prezzo dello swap: un ordine di vendita (il creatore vende sat Lightning) per 100.000 sat di RBTC con un premio dell'1% blocca 99.000 sat Lightning, e il venditore riceve 100.000 sat di RBTC.</li>
        <li>Nessun altro codice è supportato: DAI, EURC e gli altri vengono rifiutati all'avvio se li elenchi sotto <code>only</code>.</li>
      </ul>

      <h4>Abilitarlo</h4>
      <p>Ti serve mostrod v0.20.2 o successivo. Due impostazioni lavorano insieme: <code>fiat_currencies_accepted</code> dice quali codici possono usare gli ordini, e il provider <code>pegged</code> dice quali di loro hanno un prezzo di mercato.</p>
      <pre><code>[mostro]
# Mantieni le tue valute fiat e aggiungi i nuovi codici, in MAIUSCOLO
fiat_currencies_accepted = ['USD', 'EUR', 'USDT', 'USDC', 'DOC', 'LBTC', 'RBTC']

# Una fonte di prezzo di mercato per il fiat (e quindi per le stablecoin).
# Obbligatoria nella v0.20.2 appena aggiungi una qualsiasi tabella [price.providers.*].
[price.providers.yadio]
enabled = true
url = "https://api.yadio.io"

[price.providers.pegged]
enabled = true
only = ["USDT", "USDC", "DOC", "LBTC", "RBTC"]   # oppure except = ["BTC"]; senza nessuno dei due, tutti e sei</code></pre>
      <p>Riavvia Mostro e controlla il log. Se vedi <code>price: the pegged provider quotes ... but fiat_currencies_accepted does not list them</code>, aggiungi i codici mancanti: un codice quotato ma non accettato pubblica un tasso ma rifiuta ogni ordine. Un <code>fiat_currencies_accepted = []</code> vuoto accetta tutti i codici.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Non aggiungere il blocco pegged da solo nella v0.20.2</div>
        <p>Qualsiasi tabella <code>[price.providers.*]</code> porta il nodo al motore di prezzi multi-fonte e abbandona il vecchio <code>bitcoin_price_api_url</code>. Nella v0.20.2 una tabella <code>pegged</code> senza una fonte di mercato accanto lascia il nodo senza tassi fiat: tutti gli ordini a prezzo di mercato in USD, EUR e USDT vengono rifiutati. Abilita sempre almeno una fonte di mercato, come nell'esempio sopra. (La prossima versione mantiene automaticamente la vecchia fonte Yadio in quel caso.) Nella v0.20.1 o precedenti, non aggiungere affatto il blocco: il provider lì non esiste.</p>
      </div>

      <p><strong>Solo prezzo fisso.</strong> Per accettare un codice senza quotarlo a mercato, elencalo in <code>fiat_currencies_accepted</code> e lascialo fuori da <code>only</code>. Gli utenti dovranno allora impostare un importo fisso di sat. È una scelta sensata per il <code>BTC</code> on-chain, dove le commissioni di rete rendono scomodi i piccoli ordini a prezzo di mercato.</p>

      <h4>Cosa vedono i tuoi utenti</h4>
      <p>La Mostro App 2.1.2 e successive mostra questi codici nel selettore di valuta sotto <em>Stablecoin</em> e <em>Bitcoin su altre reti</em>, ma solo quelli che il tuo nodo accetta. Gli importi in BTC, LBTC e RBTC si inseriscono in sat. Il metodo di pagamento indica la rete (<code>USDT (Tron)</code>, <code>USDC (Base)</code>, <code>DOC (Rootstock)</code>, <code>LBTC (Liquid)</code>…), il venditore condivide un indirizzo di ricezione nella chat dell'operazione, e l'acquirente vi incolla l'ID della transazione dopo aver pagato. Mostro non verifica mai né la rete né l'indirizzo. Per ora mostro-cli e Mostrix possono creare solo ordini a prezzo fisso in questi codici.</p>

      <h4>Le dispute richiedono prove diverse</h4>
      <p>Informa i tuoi solver prima di abilitarlo. Non c'è nessun estratto conto bancario: la prova è l'ID della transazione incollato nella chat, che il solver controlla in un block explorer di quella rete. Per Liquid l'acquirente deve condividere il link <em>unblinded</em>, perché Liquid nasconde gli importi. I trasferimenti sono irreversibili, un pagamento sulla rete sbagliata può andare perso, e l'acquirente paga la commissione di rete: il venditore deve ricevere l'importo intero. Il venditore dovrebbe rilasciare solo dopo la conferma del trasferimento. La finestra è la stessa del fiat (circa 120 blocchi con i valori predefiniti, vedi 4.5), quindi un trasferimento on-chain a commissione bassa può non rispettarla.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Se una stablecoin perde l'aggancio</div>
        <p>Non esiste ancora una protezione automatica dal depeg. Se USDT o USDC si allontana da un dollaro, toglila da <code>only</code>, o aggiungila a <code>except</code> se non usi <code>only</code> (lasciala in <code>fiat_currencies_accepted</code> se vuoi ancora ordini a prezzo fisso) e riavvia.</p>
      </div>`,
    },
    'reputation': {
      title: `4.13 Importazione ed esportazione della reputazione`,
      nav: `Import reputazione`,
      html: `      <p>Gli utenti possono portare nel tuo nodo la reputazione guadagnata altrove — sul bot Telegram <strong>@lnp2pBot</strong> o su un altro nodo Mostro — così chi si trasferisce non riparte da zero. Viaggiano tre dati: il numero di valutazioni ricevute, la valutazione media e la data della prima operazione. Arrivano come <em>attestazione</em>: un piccolo evento Nostr (kind 38388) firmato dalla fonte, indirizzato all'identità dell'utente e valido per 7 giorni. Il tuo nodo li somma alla reputazione dell'utente, e le controparti vedono un'unica cifra unita.</p>
      <p>Entrambe le direzioni sono opt-in e spente per default. L'importazione richiede mostrod v0.20.0 o successivo; l'esportazione, v0.20.1 o successivo. Gli utenti hanno bisogno della Mostro App in <strong>modalità reputazione</strong>: in modalità privacy totale non esiste un'identità che possa portare una reputazione.</p>

      <h4>Importare da lnp2pBot</h4>
      <p>lnp2pBot firma le attestazioni con una chiave dedicata. Aggiungila alla tua lista di fiducia:</p>
      <pre><code>[reputation_import]
enabled = true
max_lifetime_seconds = 604800   # attestazione più longeva che accetti (7 giorni; al massimo 30)

[[reputation_import.issuers]]
name = "lnp2pbot"               # non rinominare mai una voce che ha già importazioni
keys = ["000004ac730537f1cf7d91f4f584a498a530a0205d35e816ebbaf23aec61e459"]
# npub1qqqqftrnq5mlrnmaj860tp9ynzjnpgpqt567s9hthter4mrpu3vsrta3em</code></pre>
      <p>Riavvia Mostro. Il tuo evento info (kind 38385) porta ora un tag <code>reputation_import_issuers</code>, ed è così che l'app sa di poter offrire l'importazione sul tuo nodo. Diversi nodi di comunità si fidano già di questa chiave.</p>
      <p>Il bot esporta un account con almeno 10 operazioni completate e 5 valutazioni ricevute che non sia bannato. L'utente parte dall'app (<em>Impostazioni → Rete → Reputazione → Importa reputazione → Ottienila da lnp2pBot</em>), conferma su Telegram che la npub corrisponde e incolla il messaggio che il bot gli invia.</p>

      <h4>Fidarsi di un altro nodo Mostro</h4>
      <p>Un nodo che esporta annuncia la sua chiave di firma nel tag <code>reputation_issuer</code> del suo evento info. Leggilo con il comando in 5.4 (cerca quel tag), confermalo con l'operatore e aggiungi una voce per lui:</p>
      <pre><code>[[reputation_import.issuers]]
name = "mostro-example"         # un nome locale stabile a tua scelta
keys = ["&lt;that node's reputation_issuer key, npub or hex&gt;"]</code></pre>
      <ul>
        <li>Il <code>name</code> è ciò su cui si deduplicano le importazioni. Non rinominare mai una voce che ha già importazioni: Mostro si rifiuta di partire se una chiave passa a un altro nome.</li>
        <li>Una chiave può appartenere a una sola voce. Per seguire una rotazione di chiave, aggiungi la nuova chiave alla stessa voce e rimuovi la vecchia quando le sue attestazioni sono scadute.</li>
        <li>Fidati solo di fonti di cui ti fidi: un grande storico importato pesa più delle valutazioni locali.</li>
      </ul>
      <p>Un utente può importare una volta da ciascuna fonte su ciascun nodo, e l'importazione non può essere annullata dall'utente. Le cifre sono un'istantanea: le valutazioni successive sulla fonte non vengono seguite.</p>

      <h4>Esportare dal tuo nodo</h4>
      <p>L'esportazione permette ai tuoi utenti di portare la reputazione guadagnata <em>sul tuo nodo</em> in un altro. Viaggiano solo le valutazioni ricevute sul tuo nodo, mai quelle importate. L'utente ha bisogno di 10 operazioni completate e 5 valutazioni ricevute sul tuo nodo, e non deve essere bannato.</p>
      <p>Le attestazioni sono firmate con una chiave dedicata, mai con quella del tuo nodo. Generane una e tienila accanto al nsec, nell'ambiente o in <code>&lt;config-dir&gt;/.env</code>:</p>
      <pre><code># Layout Docker Hub; altrimenti usa la tua directory di configurazione
echo "MOSTRO_REPUTATION_ISSUER_SK=$(openssl rand -hex 32)" >> ~/mostro-config/.env
sudo chown 1000:1000 ~/mostro-config/.env
chmod 600 ~/mostro-config/.env</code></pre>
      <pre><code>[reputation_export]
enabled = true
issuer_key_env = "MOSTRO_REPUTATION_ISSUER_SK"
lifetime_seconds = 604800       # da 1 a 604800 (7 giorni)</code></pre>
      <p>Mostro si rifiuta di partire se la variabile manca o non è valida, se contiene la chiave del tuo nodo, o se la sua chiave pubblica è anche nella tua lista <code>[reputation_import]</code>. Una volta in funzione, il tuo evento info porta il tag <code>reputation_issuer</code>: condividi quella chiave con gli operatori che vogliono fidarsi del tuo nodo. Fai il backup della chiave insieme agli altri segreti. Se trapela, chiunque può coniare attestazioni a nome del tuo nodo finché gli altri operatori non la rimuovono e revocano le importazioni.</p>

      <h4>Revocare le importazioni e ricollegare le esportazioni</h4>
      <p>Due chiamate RPC di amministrazione (4.7) gestiscono i casi rari. Sono accettate solo da loopback; aggiungi <code>-H 'authorization: Bearer &lt;token&gt;'</code> se hai impostato <code>auth_token</code>. Eseguile da un checkout del repository <code>mostro</code>, che contiene <code>proto/admin.proto</code>.</p>
      <p><strong>La chiave di un emittente di fiducia è trapelata.</strong> Prima rimuovi la chiave dalla sua voce e riavvia, poi annulla ogni importazione firmata con essa (aggiungi <code>"imported_after": &lt;unix time&gt;</code> per limitarti a quelle recenti):</p>
      <pre><code>grpcurl -plaintext -import-path proto -proto admin.proto \\
  -d '{"issuer_key": "&lt;npub or hex&gt;", "reason": "key leaked"}' \\
  127.0.0.1:50051 mostro.admin.v1.AdminService/RevokeReputationImports</code></pre>
      <p>Ogni importazione viene annullata esattamente, le valutazioni ricevute da allora vengono mantenute, e gli utenti possono importare di nuovo con un'attestazione della nuova chiave.</p>
      <p><strong>Un utente ha perso l'identità a cui è legata la sua esportazione.</strong> La prima esportazione lega l'account a una identità; spostarlo richiede normalmente un'autorizzazione firmata con la vecchia identità, che l'app produce. Se la vecchia identità è persa, puoi spostarlo tu stesso dopo aver verificato la persona:</p>
      <pre><code>grpcurl -plaintext -import-path proto -proto admin.proto \\
  -d '{"identity": "&lt;old npub&gt;", "new_identity": "&lt;new npub&gt;", "reason": "support ticket"}' \\
  127.0.0.1:50051 mostro.admin.v1.AdminService/RebindReputationExport</code></pre>
      <p>Un utente che ripristina le stesse 12 parole mantiene la stessa identità e non ha bisogno di nulla di tutto questo.</p>`,
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
        <li><strong>Risoluzione</strong> — L'arbitro decide: rilasciare all'acquirente, o rimborsare al venditore. Con le cauzioni anti-abuso abilitate (4.11), l'arbitro può anche confiscare la cauzione di chi ha agito in malafede.</li>
      </ol>

      <p>L'arbitro scrive a ciascuna parte su una chat di disputa privata, che la Mostro App mostra sotto <em>Chat → Dispute</em>. Ciascuna parte può anche condividere con l'arbitro la chiave della propria chat dell'operazione, e l'arbitro legge allora quella conversazione nella scheda Observer di Mostrix o in Bosstro. Le parti possono comunque chiudere l'operazione da sole: se il venditore rilascia, o se entrambe concordano un annullamento cooperativo, Mostro chiude da sé la disputa e avvisa l'arbitro.</p>

      <p>Se esegui <strong>Serbero</strong> (5.10), questo avvisa i tuoi arbitri nel momento in cui si apre una disputa e può compiere i primi passi con le parti. Non decide né sposta mai fondi.</p>

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

      <p>Un <code>npub1...</code> nudo senza suffisso diventa read-write per default, e lo stesso vale per la registrazione tramite l'interfaccia RPC. Fai partire un nuovo arbitro con <code>:read</code> mentre impara il processo, poi registralo di nuovo come read-write quando ti fidi del suo giudizio. Un solver read-write può rilevare una disputa che un solver in sola lettura (o Serbero) sta seguendo.</p>

      <p>I tuoi arbitri possono lavorare da un terminale con Mostrix (5.2) o da un telefono Android con Bosstro (5.11).</p>`,
    },
    'mostrix': {
      title: `5.2 Mostrix — Il tuo strumento di amministrazione`,
      nav: `Mostrix`,
      html: `      <p>Mostrix è un client Mostro da terminale (TUI) con due modalità: una modalità <strong>utente</strong> per operare e una modalità <strong>admin</strong> per la risoluzione delle dispute — prendere le dispute, parlare con entrambe le parti, liquidare o annullare, confiscare cauzioni e aggiungere solver. Se esegui un nodo Mostro, hai bisogno di Mostrix. Parla con il tuo nodo solo via Nostr, mai tramite l'interfaccia RPC.</p>

      <h4>Opzione A: Scarica il binario pre-compilato (Raccomandato)</h4>
      <p>Scarica l'ultima versione per la tua piattaforma da <a href="https://github.com/MostroP2P/mostrix/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a>:</p>

      <pre><code># Linux (x86_64)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-unknown-linux-musl

# Linux (ARM64 / Raspberry Pi 4 e 5, SO a 64 bit)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-unknown-linux-musl

# Linux (ARMv7 / Raspberry Pi OS a 32 bit)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-armv7-unknown-linux-gnueabi

# macOS (Apple Silicon / Intel)
curl -LO https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-apple-darwin
curl -LO https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-apple-darwin

# FreeBSD: mostrix-x86_64-unknown-freebsd
# Windows: scarica mostrix-x86_64-pc-windows-msvc.exe dalla pagina delle release</code></pre>

      <p>Verifica il download prima di eseguirlo, come spiegato subito sotto.</p>

      <div class="callout tip">
        <div class="callout-title">🔐 Verifica la Release</div>
        <p>Verifica sempre il binario prima di eseguirlo. Importa le chiavi dei manutentori una sola volta:</p>
        <pre><code>curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/negrunch.asc | gpg --import
curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/arkanoider.asc | gpg --import</code></pre>
        <p>Le firme sono file separati chiamati <code>manifest.txt.sig.&lt;manutentore&gt;</code>. Le release recenti portano solo <code>manifest.txt.sig.arkanoider</code> (chiave <code>2E98 6CA1 C5E7 EA16 35CD 059C 4989 CC74 15A4 3AEC</code>), quindi controlla la pagina della release e scarica quelle effettivamente elencate:</p>
        <pre><code>wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt
wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt.sig.arkanoider

# Verifica ogni firma che hai scaricato
gpg --verify manifest.txt.sig.arkanoider manifest.txt

# Poi confronta l'hash del binario con il manifest
# (le righe del manifest hanno un prefisso artifact-&lt;target&gt;/, qui rimosso)
sed 's#  artifact-[^/]*/#  #' manifest.txt | sha256sum -c --ignore-missing</code></pre>
        <p>Una firma valida da una chiave di manutentore di cui ti fidi è sufficiente. Se un <code>wget</code> restituisce 404, quella firma semplicemente non è stata pubblicata per quella release: non trattare un file assente come uno verificato.</p>
      </div>

      <p>Solo quando una firma e l'hash tornano, rendi eseguibile il binario e avvialo:</p>
      <pre><code>chmod +x mostrix-x86_64-unknown-linux-musl
./mostrix-x86_64-unknown-linux-musl</code></pre>

      <h4>Opzione B: Compila dal codice sorgente</h4>
      <p>Se preferisci compilare dal codice sorgente o hai bisogno di una piattaforma non disponibile nelle release:</p>

      <pre><code># Installa le dipendenze (Ubuntu/Debian)
sudo apt install -y cmake build-essential pkg-config

# Installa Rust (se non già installato; Mostrix richiede la 1.97 o successiva)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Clona e compila
git clone https://github.com/MostroP2P/mostrix.git
cd mostrix
cargo build --release

# Esegui
./target/release/mostrix</code></pre>

      <h4>Primo avvio e configurazione</h4>
      <p>Al primo avvio Mostrix crea <code>~/.mostrix/</code> con un database che contiene un nuovo seed di 12 parole e un <code>settings.toml</code>, poi mostra un popup <strong>Backup New Keys</strong> con le 12 parole. Annotale. Un <code>settings.toml</code> messo accanto al binario ha la precedenza (modalità portatile).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante: Punta Mostrix al tuo nodo</div>
        <p>La configurazione generata punta al nodo pubblico predefinito di Mostro. Passa al <strong>tuo nodo</strong>: <strong>Settings → Select Mostro Instance</strong>, poi incolla la npub o l'hex del tuo nodo, oppure modifica <code>mostro_pubkey</code> in <code>~/.mostrix/settings.toml</code> e riavvia.</p>
      </div>

      <p>Per la modalità admin (risoluzione dispute), le chiavi rilevanti sono:</p>
      <pre><code># ~/.mostrix/settings.toml
mostro_pubkey = "LA_TUA_PUBKEY_MOSTRO"         # hex o npub
nsec_privkey  = "nsec1..."                   # la tua identità di trader, derivata dal seed — non modificarla
admin_privkey = "nsec1..."                   # la chiave di un solver registrato — vedi sotto
relays = ["wss://relay.mostro.network"]
currencies_filter = []                       # vuoto = mostra tutte le valute
user_mode = "admin"                          # oppure Settings → Switch Mode
# trusted_dm_senders = ["npub1..."]          # la npub di Serbero, per vedere i suoi report (5.10)</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Quale chiave va in admin_privkey?</div>
        <p>Mostro accetta le azioni di disputa dalla propria chiave (il <code>nsec_privkey</code> del daemon) e dalle chiavi dei solver registrati. Qualsiasi altra chiave viene rifiutata. Solo la chiave del daemon può <em>aggiungere</em> solver, quindi usala solo per quello e tienila sul server. Per il lavoro quotidiano sulle dispute, registra una chiave di solver — read-write per liquidare o annullare — e metti quella in <code>admin_privkey</code>. Non riusare mai <code>nsec_privkey</code>.</p>
        <pre><code>ADMIN_NSEC=nsec1&lt;daemon-key&gt; MOSTRO_PUBKEY=&lt;node-npub&gt; \\
  RELAYS=wss://relay.mostro.network \\
  mostro-cli admaddsolver -n npub1solver...</code></pre>
        <p>L'opzione <strong>Settings → Add Dispute Solver</strong> di Mostrix fa la stessa cosa, con Sinistra/Destra per scegliere Read o Read-Write (default Read-Write).</p>
      </div>

      <h4>La modalità admin in pratica</h4>
      <ul>
        <li><strong>Disputes Pending</strong>: Invio prende una disputa. <kbd>Ctrl+T</kbd> ne rileva una da Serbero.</li>
        <li><strong>Disputes Management</strong>: Tab scorre le chat BUYER, SELLER e SERBERO. <kbd>Shift+F</kbd> finalizza: paga l'acquirente, rimborsa il venditore e confisca una cauzione quando il nodo ne ha.</li>
        <li><strong>Observer</strong>: incolla la chiave della chat dell'operazione che una parte ha condiviso per leggere la sua conversazione.</li>
        <li><strong>Settings → Link Watchdog</strong>: collega il solver a mostro-watchdog (5.3), così riceve un ping Telegram privato quando una parte scrive in una disputa che ha preso.</li>
        <li><kbd>Ctrl+H</kbd> mostra l'aiuto contestuale. Esci dalla scheda <strong>Exit</strong>.</li>
      </ul>`,
    },
    'watchdog': {
      title: `5.3 mostro-watchdog — Avvisi Telegram per dispute e salute del nodo`,
      nav: `mostro-watchdog`,
      html: `      <p><code>mostro-watchdog</code> è un bot Telegram per il tuo team di admin. Osserva il tuo nodo via Nostr e scrive su un gruppo o canale privato:</p>
      <ul>
        <li><strong>Dispute:</strong> un messaggio per disputa, inviato quando si apre e modificato man mano che procede (presa in carico, passi di Serbero, rilevamento, risoluzione). Ogni modifica riceve una breve risposta, così i telefoni suonano comunque.</li>
        <li><strong>Salute del nodo:</strong> un avviso quando Mostro smette di <em>funzionare</em>, non solo di girare: un evento info diventato silenzioso, la modalità manutenzione e, con Mostro v0.20.0 o successivo, LND non sincronizzato o indietro sulla catena, pagamenti agli acquirenti bloccati o falliti, HTLC vicini alla scadenza e canali inattivi. Vengono pubblicati solo i cambiamenti: un avviso, promemoria finché dura e "risolto".</li>
        <li><strong>Avanzamento di Serbero</strong> su ogni disputa, se esegui Serbero (5.10).</li>
        <li><strong>Ping privati ai solver</strong> quando una parte scrive loro in una disputa che hanno preso.</li>
      </ul>

      <p><strong>Opzione A: script di installazione (raccomandato).</strong> Scarica l'ultima release, la verifica con <code>manifest.txt</code> e installa in <code>/usr/local/bin</code>:</p>
      <pre><code>curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash
# oppure in un'altra directory:
curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash -s -- --install-dir ~/.local/bin</code></pre>

      <p><strong>Opzione B: download manuale del binario</strong></p>
      <pre><code># Linux x86_64 (Intel/AMD); usa mostro-watchdog-linux-aarch64 su ARM64
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/mostro-watchdog-linux-x86_64
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/manifest.txt
sha256sum -c manifest.txt --ignore-missing
chmod +x mostro-watchdog-linux-x86_64
sudo mv mostro-watchdog-linux-x86_64 /usr/local/bin/mostro-watchdog</code></pre>
      <p>Sulla pagina delle release ci sono anche i binari per macOS e Windows.</p>

      <p><strong>Opzione C: compilare dal codice sorgente</strong></p>
      <pre><code>sudo apt install -y cmake pkg-config libssl-dev
git clone https://github.com/MostroP2P/mostro-watchdog.git
cd mostro-watchdog
cargo build --release
sudo cp target/release/mostro-watchdog /usr/local/bin/</code></pre>

      <h4>Configurazione</h4>
      <p>Il watchdog tiene il suo stato (<code>disputes.db</code>) accanto a <code>config.toml</code>, quindi dagli una directory tutta sua:</p>
      <pre><code>sudo useradd --system --home-dir /var/lib/mostro-watchdog --shell /usr/sbin/nologin mostro-watchdog
sudo install -d -o mostro-watchdog -g mostro-watchdog -m 700 /var/lib/mostro-watchdog
curl -LO https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/config.example.toml
sudo install -o mostro-watchdog -g mostro-watchdog -m 600 config.example.toml /var/lib/mostro-watchdog/config.toml
sudo nano /var/lib/mostro-watchdog/config.toml</code></pre>
      <pre><code>[mostro]
pubkey = "LA_TUA_PUBKEY_MOSTRO"         # hex o npub

[nostr]
# Relay di bootstrap: il watchdog legge da loro la lista di relay del tuo nodo (NIP-65),
# poi segue i relay che il tuo nodo annuncia.
relays = ["wss://relay.mostro.network", "wss://nos.lol"]

[telegram]
bot_token = "IL_TUO_BOT_TOKEN"          # da @BotFather
chat_id = -1001234567890              # il tuo gruppo o canale admin

[health]
info_silence_threshold = 900          # 3 × publish_mostro_info_interval di Mostro (300 per default)
mostro_health_enabled = true          # richiede Mostro v0.20.0+
event_alert_threshold = 0             # vedi sotto</code></pre>
      <p>Per trovare <code>chat_id</code>, aggiungi il bot al gruppo, scrivi un messaggio e apri <code>https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code>.</p>
      <p>Il vecchio avviso "event silence" scatta ogni volta che per due ore non arriva nessun evento di disputa, il che sulla maggior parte dei nodi è solo un pomeriggio tranquillo. I controlli info e health rilevano in modo affidabile un nodo fermo, quindi <code>0</code> lo disattiva.</p>

      <h4>La chiave Nostr del watchdog</h4>
      <p>I dettagli sulla salute, gli avvisi di Serbero, i ping ai solver e il heartbeat del watchdog stesso richiedono una chiave propria, passata solo tramite l'ambiente:</p>
      <pre><code>sudo sh -c 'umask 077; echo "WATCHDOG_NOSTR_PRIVATE_KEY=$(openssl rand -hex 32)" > /etc/mostro-watchdog.env'</code></pre>
      <p>Fai il backup di quel file. All'avvio il watchdog registra la sua chiave pubblica. Mettila nel <code>settings.toml</code> di Mostro e riavvia Mostro, così la tua liquidità, i fallimenti dei pagamenti e le scadenze HTLC sono cifrati per il solo watchdog:</p>
      <pre><code>[health]
watchdog_pubkey = "WATCHDOG_PUBKEY"   # hex o npub</code></pre>
      <p>Questo aggiunge al tuo evento di salute un tag pubblico <code>p</code> che collega il tuo nodo alla chiave del watchdog. Senza, il watchdog avvisa comunque sullo stato pubblico.</p>

      <h4>Eseguirlo come servizio</h4>
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

      <h4>Opzionale: Serbero e avvisi ai solver</h4>
      <p>Aggiungi una sezione vuota per ciascuno che vuoi. Entrambi usano la chiave qui sopra:</p>
      <pre><code>[serbero]                 # i passi di Serbero sul messaggio di ogni disputa
[solver_notifications]    # ping privati ai solver</code></pre>
      <p>Per Serbero, aggiungi anche la chiave pubblica <strong>hex</strong> del watchdog al <code>config.toml</code> di Serbero come osservatore — mai come solver — e riavvia Serbero. Gli osservatori ricevono una riga per passo, mai ciò che hanno scritto le parti. Il watchdog trova Serbero da solo tramite il <code>serbero_pubkey</code> del tuo nodo (5.10).</p>
      <pre><code>[[observers]]
pubkey = "WATCHDOG_PUBKEY_HEX"</code></pre>
      <p>Per i ping ai solver, ogni solver invia <code>/link</code> al bot in una chat privata e inserisce il codice in Mostrix 0.3.6 o successivo, sotto <strong>Settings → Link Watchdog</strong>. Il bot risponde ai comandi solo nelle chat private: <code>/version</code>, <code>/link</code>, <code>/unlink</code>, <code>/status</code>.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Controlla il watchdog</div>
        <p>Un canale silenzioso non prova che il watchdog sia vivo. Puoi eseguirne un secondo su un'altra macchina, ciascuno con la <strong>propria</strong> <code>WATCHDOG_NOSTR_PRIVATE_KEY</code> e la chiave pubblica dell'altro in <code>[health].peer_watchdogs</code>. Gli avvisi di salute possono anche andare a una chat dedicata con <code>[health].alerts_chat_id</code>. Il <code>config.example.toml</code> del progetto documenta ogni opzione.</p>
      </div>`,
    },
    'monitoring': {
      title: `5.4 Monitoraggio e salute del nodo`,
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

      <h4>Essere in funzione non significa funzionare</h4>
      <p>Nell'ottobre 2026 l'LND di un nodo in produzione ha smesso di seguire la catena per circa 21 ore. Mostro continuava a girare e ad accettare operazioni, ma ogni pagamento a un acquirente falliva. Un controllo del processo, della porta o un robot di uptime sarebbero rimasti verdi per tutto il tempo.</p>
      <p>Dalla v0.20.0 Mostro lo controlla da sé. Ogni minuto pubblica un <strong>evento di salute</strong> firmato (kind 38389) con uno stato generale (<code>ok</code>, <code>degraded</code> o <code>down</code>), uno stato per ogni controllo (<code>lnd_sync</code>, <code>payouts</code>, <code>relays</code>, <code>database</code>) e l'altezza di blocco di LND. È attivo per default; questo blocco mostra solo i valori predefiniti:</p>
      <pre><code>[health]
enabled = true                  # pubblica l'evento di salute (kind 38389)
interval = 60                   # secondi tra una pubblicazione e l'altra, da 30 a 3600
watchdog_pubkey = ""            # la chiave del tuo watchdog: le metriche dettagliate sono cifrate per lei (5.3)
lnd_unsynced_fail_after = 600   # deve essere maggiore di 60
auto_maintenance_on_lnd_unsynced = true
lnd_resynced_clear_after = 300</code></pre>
      <p>Quando LND smette di essere sincronizzato, Mostro protegge da solo i tuoi utenti:</p>
      <ul>
        <li>Dopo 60 secondi, i pagamenti in uscita (pagamenti agli acquirenti, commissioni di sviluppo, pagamenti delle cauzioni) <strong>attendono</strong> invece di fallire. Un pagamento in attesa non consuma uno dei tentativi di pagamento dell'acquirente, e parte appena LND si riprende.</li>
        <li>Dopo <code>lnd_unsynced_fail_after</code> secondi, Mostro entra in modalità manutenzione con il motivo <code>lnd_unsynced</code>: niente nuovi ordini né prese, mentre le operazioni aperte possono ancora concludersi. Esce dalla manutenzione quando LND è sincronizzato da <code>lnd_resynced_clear_after</code> secondi. La manutenzione che hai attivato tu (5.8) non viene mai tolta automaticamente.</li>
      </ul>
      <p>Il log racconta la storia: <code>LND reports synced_to_chain = false ...; outgoing payments wait after 60s</code>, poi <code>maintenance mode ON (reason lnd_unsynced)</code>, e più tardi <code>LND is synced to chain again</code> e <code>maintenance mode OFF</code>. Controlla LND con <code>lncli getinfo</code> (<code>synced_to_chain</code>, <code>block_height</code>). Imposta <code>auto_maintenance_on_lnd_unsynced = false</code> per rinunciare alla manutenzione automatica.</p>
      <p>Mostro sa solo ciò che gli dice il suo LND, e un nodo bloccato su una catena obsoleta non sempre se ne accorge. Per questo i due lettori qui sotto confrontano la sua altezza di blocco con gli explorer pubblici:</p>
      <ul>
        <li><strong>Avvisi privati:</strong> mostro-watchdog (5.3) avvisa il tuo Telegram quando qualcosa si rompe e quando rientra.</li>
        <li><strong>Pagina di stato pubblica:</strong> <a href="https://status.mostro.network" target="_blank" rel="noopener noreferrer">status.mostro.network</a> mostra lo stato in tempo reale e l'uptime a 90 giorni di ogni Mostro elencato. Lo vedono anche i tuoi utenti.</li>
      </ul>

      <h4>La pagina di stato pubblica</h4>
      <p>La pagina (<a href="https://github.com/MostroP2P/semaforo" target="_blank" rel="noopener noreferrer">Semáforo</a>) legge gli eventi di salute direttamente dai relay e li verifica nel browser del visitatore, senza backend. Ogni nodo riceve un colore:</p>
      <table class="guide-table">
        <thead><tr><th>Colore</th><th>Quando</th></tr></thead>
        <tbody>
          <tr><td>🟢 Operativo</td><td>Stato <code>ok</code>, un evento recente, e LND meno di 3 blocchi indietro rispetto agli explorer</td></tr>
          <tr><td>🟡 Degradato</td><td>Stato <code>degraded</code>, modalità manutenzione, o nessuna altezza di blocco indipendente con cui confrontarsi</td></tr>
          <tr><td>🔴 Giù</td><td>Stato <code>down</code>, LND 3 o più blocchi indietro, o nessun evento valido di recente ("Not reporting")</td></tr>
          <tr><td>⚪ Non monitorato</td><td>Elencato, ma non ci si aspetta ancora che pubblichi</td></tr>
        </tbody>
      </table>
      <p>Sotto ogni nodo, 90 barre giornaliere e una cifra di uptime vengono da campioni presi ogni 10 minuti.</p>
      <p><strong>Farsi elencare.</strong> Vengono mostrati solo nodi selezionati, perché chiunque può firmare un evento sempre verde:</p>
      <ol>
        <li>Il tuo nodo è elencato come comunità su questo sito.</li>
        <li>Esegue Mostro v0.20.0 o successivo con l'evento di salute attivo, e pubblica su almeno uno tra <code>wss://relay.mostro.network</code>, <code>wss://mostro-p2p.tech</code> o <code>wss://relay.shadowbip.com</code>.</li>
        <li>Apri una issue o una pull request su <a href="https://github.com/MostroP2P/semaforo" target="_blank" rel="noopener noreferrer">MostroP2P/semaforo</a> per aggiungerlo a <code>trusted.json</code> con la sua pubkey hex, nome, regione e rete. Il tuo avatar viene copiato dalla foto del tuo profilo Nostr.</li>
      </ol>

      <h4>Controllare il tuo nodo dall'esterno</h4>
      <p>Il tuo nodo ripubblica un evento info (kind 38385) che lo descrive: commissioni, valute, versione del protocollo, flag di manutenzione, impostazioni delle cauzioni, chiavi di Serbero e della reputazione. Leggere questo e l'evento di salute da un relay è il modo più rapido di confermare che il mondo esterno vede quello che credi.</p>
      <pre><code>cargo install nostreq nostcat
# Evento info
nostreq --kinds 38385 --limit 1 --authors LA_TUA_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq
# Evento di salute: stato, controlli, altezza di blocco di LND
nostreq --kinds 38389 --limit 1 --authors LA_TUA_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq '.tags'</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 I controlli sull'host servono ancora</div>
        <p>Un ping all'host (<a href="https://uptimerobot.com/" target="_blank" rel="noopener noreferrer">UptimeRobot</a> o simili) ti dice ancora quando il VPS stesso è irraggiungibile. Non può dirti se Mostro sta pagando gli acquirenti; l'evento di salute sì.</p>
      </div>`,
    },
    'updating': {
      title: `5.5 Aggiornare Mostro`,
      nav: `Aggiornamento`,
      html: `      <p>Aggiornare sostituisce il binario <code>mostrod</code> e nient'altro: <code>settings.toml</code> e <code>mostro.db</code> restano dove sono. Le migrazioni del database si applicano da sole all'avvio della nuova versione, quindi non ci sono passi aggiuntivi.</p>

      <h4>Prima di aggiornare</h4>
      <ol>
        <li><strong>Leggi le <a href="https://github.com/MostroP2P/mostro/releases" target="_blank" rel="noopener noreferrer">note di rilascio</a></strong> della versione a cui passi. Il tuo <code>settings.toml</code> non viene mai sovrascritto: confrontalo con il nuovo <code>settings.tpl.toml</code>. La maggior parte delle nuove funzioni resta spenta finché non le aggiungi, ma un blocco mancante prende i valori predefiniti, e alcuni sono attivi (l'evento di salute di 5.4, per esempio).</li>
        <li><strong>Fai un backup del database</strong> con i comandi di 5.6. Ti serve per tornare indietro.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Se arrivi dalla v0.18.x</div>
        <p>Controlla questi punti prima di avviare la nuova versione, o potrebbe rifiutarsi di partire:</p>
        <ul>
          <li>Elimina qualsiasi riga <code>transport = "gift-wrap"</code> (4.8). Gli utenti con vecchi client protocollo v1 devono aggiornare.</li>
          <li><code>escrow_deadline_margin_blocks</code> deve essere almeno 18 e inferiore a <code>hold_invoice_cltv_delta</code> (4.9).</li>
          <li>Sotto <code>[cashu]</code>, <code>mint_url</code> è diventato <code>mint_urls = [...]</code> (4.11).</li>
          <li>Con le cauzioni anti-abuso attive e <code>hold_invoice_cltv_delta</code> pari o superiore a 288, imposta <code>bond_cltv_delta</code> esplicitamente (4.11).</li>
          <li>Dalla v0.20.0 l'evento di salute viene pubblicato per default, e Mostro può entrare da solo in manutenzione quando LND non è sincronizzato (5.4).</li>
        </ul>
      </div>

      <h4>Docker Hub (<code>docker run</code>)</h4>
      <pre><code>export MOSTRO_TAG={{version}}
# Scarica prima: il nodo resta attivo durante il download
docker pull mostrop2p/mostro:$MOSTRO_TAG
docker stop mostro
docker rm mostro
docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:$MOSTRO_TAG</code></pre>
      <p>Usa gli stessi flag dell'installazione (togli <code>--add-host</code> se LND è su un altro server). Se non li ricordi, controlla <code>docker inspect mostro</code> prima di rimuovere il container.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ <code>docker restart</code> non è un aggiornamento</div>
        <p><code>docker restart</code> riavvia lo stesso container, con l'immagine da cui è stato creato. Per eseguire una nuova versione il container va ricreato: <code>docker rm</code> + <code>docker run</code>, oppure <code>docker compose up -d</code> dopo aver cambiato il tag.</p>
      </div>

      <h4>Docker Hub (Docker Compose)</h4>
      <pre><code>export MOSTRO_TAG={{version}}
COMPOSE=~/mostro-docker/compose.yml
# Punta la riga image al nuovo tag e controllala
sed -i "s|image: mostrop2p/mostro:.*|image: mostrop2p/mostro:$MOSTRO_TAG|" $COMPOSE
grep image: $COMPOSE
docker compose -f $COMPOSE pull
# Ricrea il container perché l'immagine è cambiata
docker compose -f $COMPOSE up -d</code></pre>

      <h4>Docker Build</h4>
      <pre><code>cd /opt/mostro
git fetch --tags
git checkout {{version}}
make docker-build
make docker-down
make docker-up</code></pre>

      <h4>Nativo</h4>
      <pre><code>cd /opt/mostro
git fetch --tags
git checkout {{version}}
cargo build --release
install target/release/mostrod /usr/local/bin
cargo clean
systemctl restart mostro.service</code></pre>

      <h4>Verificare la nuova versione</h4>
      <pre><code># Docker Hub (docker run)
docker exec mostro mostrod --version
docker logs -f mostro

# Docker Hub (Docker Compose)
docker compose -f ~/mostro-docker/compose.yml exec mostro mostrod --version
docker compose -f ~/mostro-docker/compose.yml logs -f mostro

# Docker Build
docker compose -f /opt/mostro/docker/compose.yml exec mostro mostrod --version
docker compose -f /opt/mostro/docker/compose.yml logs -f mostro

# Nativo
mostrod --version
journalctl -u mostro -f</code></pre>
      <p>Cerca gli stessi messaggi di avvio della prima esecuzione (Passo 11 dell'Opzione A).</p>

      <h4>Tornare indietro</h4>
      <p>Se la nuova versione dà problemi, torna al tag precedente. La nuova versione potrebbe aver già migrato il database, e un <code>mostrod</code> più vecchio può rifiutarsi di avviarsi con esso, quindi ripristina il backup fatto prima di aggiornare:</p>
      <pre><code>docker stop mostro
docker rm mostro
# sostituisci YYYYMMDD con la data del backup fatto prima di aggiornare
BACKUP=/root/mostro-backups/mostro.db.YYYYMMDD
cp "$BACKUP" ~/mostro-config/mostro.db
rm -f ~/mostro-config/mostro.db-wal ~/mostro-config/mostro.db-shm
chown 1000:1000 ~/mostro-config/mostro.db
# poi avvia il tag precedente: stesso comando docker run,
# oppure rimetti il vecchio tag in compose.yml ed esegui docker compose up -d</code></pre>
      <p>Docker Build e nativo funzionano allo stesso modo: torna al tag precedente, ricompila e ripristina il database prima di avviare.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Non cambiare nodo Lightning nello stesso momento</div>
        <p>Aggiornare Mostro è sicuro in qualsiasi momento. Puntarlo a un nodo Lightning <strong>diverso</strong> non lo è: drena prima l'escrow, vedi 5.8.</p>
      </div>`,
    },
    'backups': {
      title: `5.6 Backup`,
      nav: `Backup`,
      html: `      <p>File critici da salvare: <code>settings.toml</code>, il file <code>.env</code> se ci tieni il tuo nsec (vedi 4.1) o la chiave di esportazione della reputazione (4.13), e <code>mostro.db</code> (storico ordini, reputazione). Se abiliti lo storico del pagatore (4.11), tieni i backup del database separati dal nsec: lo storico è indicizzato con esso.</p>

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
cp /opt/mostro/docker/config/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null

# Backup manuale — Nativo:
sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp /opt/mostro/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null</code></pre>

      <p><strong>Backup giornaliero automatico</strong> (aggiungi al crontab con <code>crontab -e</code>):</p>
      <pre><code># Docker Hub (Opzione A):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /root/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /root/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d); cp /root/mostro-config/.env /root/mostro-backups/env.$(date +\\%Y\\%m\\%d) 2>/dev/null

# Docker Build (Opzione B):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/docker/config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/docker/config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d); cp /opt/mostro/docker/config/.env /root/mostro-backups/env.$(date +\\%Y\\%m\\%d) 2>/dev/null

# Nativo (Opzione C):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d); cp /opt/mostro/.env /root/mostro-backups/env.$(date +\\%Y\\%m\\%d) 2>/dev/null</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Critico</div>
        <p>La tua <code>nsec_privkey</code> in <code>settings.toml</code> È l'identità del tuo nodo. Se la perdi, perdi la tua reputazione e tutti gli utenti devono riconnettersi a una nuova identità. <strong>Conserva una copia offline.</strong></p>
      </div>

      <h4>Se gestisci il tuo LND</h4>
      <p>I backup di Mostro non coprono il tuo nodo Lightning. I fondi nei tuoi canali dipendono da due backup di LND:</p>
      <ul>
        <li><strong>Il seed del wallet</strong> (24 parole, più la passphrase se l'hai impostata), mostrato una sola volta alla creazione del wallet. Scrivilo e conservalo offline.</li>
        <li><strong>Il backup statico dei canali</strong>, <code>channel.backup</code> (per esempio <code>~/.lnd/data/chain/bitcoin/mainnet/channel.backup</code>). LND lo riscrive ogni volta che un canale si apre o si chiude, quindi copialo regolarmente fuori dalla macchina, per esempio nello stesso job cron dei backup di Mostro. Con il seed e questo file puoi chiudere i tuoi canali e recuperare i fondi su un nuovo nodo.</li>
      </ul>
      <p>Non fare mai il backup né il ripristino di <code>channel.db</code> per recuperare i canali: una copia obsoleta fa trasmettere al tuo nodo stati vecchi, e i peer possono prendersi tutti i fondi di quei canali. I sistemi nodo-in-a-box e Voltage hanno funzioni di backup proprie; attivale. La documentazione di LND tratta il recupero in dettaglio (<a href="https://docs.lightning.engineering/lightning-network-tools/lnd/recovery-planning-for-failure" target="_blank" rel="noopener noreferrer">recovery planning</a>).</p>`,
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

      <p>La modalità manutenzione è il modo per drenare prima. Mentre è attiva, nuovi ordini e prese vengono rifiutati e le operazioni aperte continuano a funzionare, così l'escrow può liquidarsi. Richiede l'interfaccia RPC abilitata (vedi 4.7), e la chiamata è accettata solo da loopback: eseguila sull'host del nodo, oppure tramite <code>ssh -N -L 50051:127.0.0.1:50051 user@node</code>.</p>
      <p>Mostro può anche entrare da solo in manutenzione, con il motivo <code>lnd_unsynced</code>, quando LND perde la sincronizzazione (5.4). Se attivi la manutenzione mentre quella è in corso, diventa tua e il daemon non la toglierà; non puoi usare <code>lnd_unsynced</code> come tuo motivo.</p>

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
      html: `      <p>Mostrix è il modo comodo per lavorare le dispute, e <code>mostro-cli</code> copre le basi da shell, più alcuni comandi da operatore che Mostrix non ha. I comandi di disputa sono firmati con una chiave Nostr che passi come <code>ADMIN_NSEC</code>, e deve essere quella del daemon stesso o di un solver registrato. La CLI non legge alcun file di configurazione: imposta il tuo nodo e i relay nell'ambiente, e metti i flag globali prima del sottocomando.</p>

      <pre><code># Lavoro sulle dispute (via Nostr)
export MOSTRO_PUBKEY=npub1...            # il tuo nodo
export RELAYS=wss://relay.mostro.network
export ADMIN_NSEC=nsec1...
mostro-cli listdisputes
mostro-cli admtakedispute -d &lt;dispute-id&gt;     # stampa le pubkey di acquirente e venditore
mostro-cli getadmindm -s 120
mostro-cli admsenddm -p &lt;party-pubkey&gt; -m "messaggio a una parte"
mostro-cli admsettle -o &lt;order-id&gt; [--slashseller] [--slashbuyer]   # rilascia all'acquirente
mostro-cli admcancel -o &lt;order-id&gt; [--slashseller] [--slashbuyer]   # rimborsa il venditore

# Registra un arbitro, eventualmente in sola lettura
mostro-cli admaddsolver -n npub1...:read</code></pre>

      <p>I flag di confisca contano solo con le cauzioni anti-abuso (4.11). Nota l'ortografia: <code>--slashseller</code>, non <code>--slash-seller</code>. <code>admsenddm</code> invia un messaggio diretto dalla chiave admin; non è la chat per disputa che usano la Mostro App, Mostrix e Bosstro, quindi per parlare con le parti preferisci quei client.</p>

      <p>Un altro gruppo di comandi passa dal gRPC di amministrazione invece che da Nostr, quindi richiedono l'interfaccia RPC abilitata (vedi 4.7) anziché <code>ADMIN_NSEC</code>. <code>MOSTRO_RPC_URL</code> vale per default <code>http://127.0.0.1:50051</code>, e <code>MOSTRO_RPC_TOKEN</code> serve solo se hai impostato <code>auth_token</code>.</p>

      <pre><code>export MOSTRO_RPC_URL=http://127.0.0.1:50051
export MOSTRO_RPC_TOKEN=il-tuo-token-auth

mostro-cli admsetmaintenance -e true -r "motivo"
mostro-cli admmaintenancestatus
mostro-cli admcancelpending -o &lt;order-id&gt;</code></pre>

      <p><code>admcancelpending</code> vale la pena conoscerlo anche fuori da una migrazione. Annulla un ordine ancora in attesa o in attesa di una cauzione, avvisa il maker e libera tutte le sue cauzioni in un colpo. Usalo per un ordine chiaramente abbandonato o quotato male, e avvisa prima il maker: è il suo ordine, e questa non è una risoluzione di disputa.</p>

      <p>mostro-cli non ha ancora comandi per l'importazione e l'esportazione della reputazione, lo storico del pagatore o l'evento di salute: usa <code>grpcurl</code> per le RPC di reputazione (4.13) e i comandi in 5.4 per l'evento di salute. Installalo con <code>cargo install mostro-cli</code> (Rust 1.97 o successivo) oppure prendi un binario dalle <a href="https://github.com/MostroP2P/mostro-cli/releases" target="_blank" rel="noopener noreferrer">sue release</a>; esegui <code>mostro-cli &lt;command&gt; --help</code> per ogni flag.</p>`,
    },
    'serbero': {
      title: `5.10 Serbero — Assistente per le dispute`,
      nav: `Serbero`,
      html: `      <p><a href="https://github.com/MostroP2P/serbero" target="_blank" rel="noopener noreferrer">Serbero</a> è un assistente opzionale per le dispute del tuo nodo. Lo esegui accanto a Mostro, con una chiave Nostr tutta sua. Fa due lavori:</p>
      <ul>
        <li><strong>Notifica (sempre attiva).</strong> Ogni solver che elenchi riceve un messaggio diretto entro pochi secondi da una nuova disputa, con promemoria ogni 15 minuti finché qualcuno non la prende.</li>
        <li><strong>Mediazione (opt-in, pilota).</strong> Serbero prende la disputa, chiede all'acquirente se ha pagato e al venditore se i soldi sono arrivati, dà loro il tempo di concludere da soli l'operazione, e altrimenti passa il caso a un solver umano con un riepilogo e la trascrizione completa.</li>
      </ul>
      <p>Serbero non sposta mai fondi e non decide mai una disputa. Mostro lo registra come solver in <strong>sola lettura</strong>, quindi non può liquidare né annullare, e qualsiasi solver read-write può rilevare una disputa da lui in qualsiasi momento. Se Serbero è fermo, Mostro e i tuoi solver lavorano esattamente come prima. Tieni almeno un solver umano read-write.</p>

      <h4>Installazione</h4>
      <p>Ogni release ha binari per Linux (x86_64, aarch64) e macOS (Apple silicon), ciascuno con un file SHA-256. I nomi dei file portano la versione:</p>
      <pre><code>V=$(curl -fsSL https://api.github.com/repos/MostroP2P/serbero/releases/latest | grep -m1 '"tag_name"' | cut -d'"' -f4)
A=serbero-$V-x86_64-unknown-linux-gnu        # aarch64-unknown-linux-gnu su ARM64
curl -LO https://github.com/MostroP2P/serbero/releases/download/$V/$A.tar.gz
curl -LO https://github.com/MostroP2P/serbero/releases/download/$V/$A.tar.gz.sha256
shasum -a 256 -c $A.tar.gz.sha256
tar -xzf $A.tar.gz && cd $A        # serbero, config.sample.toml, deploy/</code></pre>
      <p>Con Rust installato funziona anche <code>cargo install serbero --locked</code>. Un'immagine Docker (<code>ghcr.io/mostrop2p/serbero</code>) e un file compose sono descritti nel README del progetto.</p>

      <h4>Configurazione</h4>
      <pre><code>cp config.sample.toml config.toml
nano config.toml</code></pre>
      <pre><code>[serbero]
private_key_env = "SERBERO_PRIVATE_KEY"   # indica il nome del segreto; la chiave non va mai in questo file
db_path = "serbero.db"

[mostro]
pubkey = "LA_TUA_PUBKEY_MOSTRO_HEX"
relays = ["wss://relay.mostro.network", "wss://nos.lol"]   # i relay su cui pubblica il tuo nodo

# Una voce per ogni solver umano: la pubkey hex della chiave che usa il suo client
# (Mostrix: admin_privkey). Non elencare mai la chiave di Serbero.
[[solvers]]
pubkey = "SOLVER_PUBKEY_HEX"
permission = "write"

[notify]
renotify_after = "15m"

[mediation]
enabled = false</code></pre>

      <h4>Eseguirlo come servizio</h4>
      <p>Il progetto include un'unità systemd rinforzata. Scaricala da <code>main</code>: la copia dentro l'archivio v0.2.5 richiede systemd 251 e non parte su Ubuntu 22.04.</p>
      <pre><code>sudo useradd --system --home-dir /var/lib/serbero --shell /usr/sbin/nologin serbero
sudo install -m 755 serbero /usr/local/bin/serbero
sudo install -d -m 755 /etc/serbero
sudo install -m 644 config.toml /etc/serbero/config.toml
sudo install -d -m 700 /etc/serbero/credentials
sudo sh -c 'umask 077; openssl rand -hex 32 > /etc/serbero/credentials/serbero_private_key'
curl -fsSLO https://raw.githubusercontent.com/MostroP2P/serbero/main/deploy/serbero.service
sudo install -m 644 serbero.service /etc/systemd/system/serbero.service
sudo systemctl daemon-reload && sudo systemctl enable --now serbero
journalctl -u serbero -f        # annota la npub che registra all'avvio</code></pre>
      <p>Fai il backup offline di <code>/etc/serbero/credentials/serbero_private_key</code>. È l'identità di Serbero: se la perdi devi registrare una nuova npub.</p>

      <h4>Registrarlo sul tuo nodo</h4>
      <p>Mostro v0.19.1 o successivo registra Serbero per te. Aggiungi la sua npub al blocco <code>[mostro]</code> del tuo <code>settings.toml</code> e riavvia Mostro:</p>
      <pre><code>[mostro]
serbero_pubkey = "npub1..."   # la chiave di Serbero, npub o hex</code></pre>
      <p>All'avvio Mostro registra quella chiave come solver in sola lettura e la annuncia nel suo evento info. Quell'annuncio è il modo in cui la Mostro App etichetta i messaggi di Serbero e in cui mostro-watchdog lo trova. Il log lo conferma: <code>Serbero npub1... configured: registered as a read-only solver</code>.</p>
      <div class="callout important">
        <div class="callout-title">⚠️ Non aggiungere Serbero con admaddsolver</div>
        <p>Una npub nuda aggiunta con <code>admaddsolver</code> diventa read-write (5.1), e Mostro si rifiuta allora di partire con <code>REFUSING TO START: serbero_pubkey ... is a solver with write permission</code>. Rifiuta anche una chiave che appartiene a un utente che non è un solver, e la chiave del tuo nodo. Dai a Serbero una chiave tutta sua e lascia che <code>serbero_pubkey</code> la registri.</p>
      </div>

      <h4>I tuoi solver leggono Serbero in Mostrix</h4>
      <p>Mostrix 0.3.5 o successivo mostra i messaggi di Serbero in un pannello <strong>SERBERO</strong> per ogni disputa, ma solo da mittenti di cui il solver si fida. Nel <code>~/.mostrix/settings.toml</code> di ogni solver:</p>
      <pre><code>trusted_dm_senders = ["npub1..."]   # la npub di Serbero</code></pre>
      <p>La pubkey dell'<code>admin_privkey</code> del solver deve essere esattamente quella di una voce <code>[[solvers]]</code>, e Mostrix deve leggere almeno uno dei relay di Serbero. Per rilevare un caso, premi <kbd>Ctrl+T</kbd> su un passaggio di consegne; richiede il permesso read-write, e Serbero smette subito di scrivere. Bosstro (5.11) non mostra ancora i riepiloghi di Serbero.</p>

      <h4>Attivare la mediazione (pilota)</h4>
      <p>La mediazione parte spenta. Quando è attiva, Serbero prende ogni nuova disputa e si presenta a entrambe le parti come assistente automatico, nella loro lingua (inglese, spagnolo o portoghese), con una breve domanda alla volta. Quando entrambe hanno risposto, dà loro 30 minuti per sistemare da sole l'operazione, poi passa il caso ai tuoi solver. Non dice mai a nessuno di rilasciare o annullare.</p>
      <p>Per leggere le risposte, Serbero interroga un modello giudice (Jev di TypeSafe) sul <strong>tuo</strong> account a pagamento. Il giudice riceve i ruoli dell'operazione, l'importo, la valuta e il metodo di pagamento, e il testo dei messaggi — mai le chiavi pubbliche. Chiedi al provider zero conservazione dei dati, e avvisa i tuoi utenti che i messaggi di disputa sono elaborati da un servizio automatico. Il README spiega la chiave API e la tabella delle soglie; imposta <code>enabled = true</code> sotto <code>[mediation]</code> e riavvia, e il log dice <code>mediation ready</code> oppure perché no.</p>
      <p>I messaggi delle parti sono eventi kind 14: usa più di un relay, e solo relay che li conservano, altrimenti i messaggi inviati mentre Serbero è offline vanno persi. Per pubblicare l'avanzamento di Serbero sul Telegram del tuo team, registra mostro-watchdog come osservatore (5.3). Fai il backup di <code>serbero.db</code> in modo privato: contiene le conversazioni delle dispute.</p>`,
    },
    'bosstro': {
      title: `5.11 Bosstro — Risolvere le dispute dal telefono`,
      nav: `Bosstro`,
      html: `      <p><a href="https://github.com/MostroP2P/bosstro" target="_blank" rel="noopener noreferrer">Bosstro</a> è l'app Android per i solver delle dispute. Porta su un telefono il lato admin di Mostrix: un solver vede le dispute in attesa del tuo nodo, ne prende una, parla con l'acquirente e il venditore (immagini e PDF inclusi), legge la chat privata delle parti quando una di loro ne condivide la chiave e, con permesso read-write, paga l'acquirente o rimborsa il venditore, con l'opzione cauzione quando il tuo nodo ne ha.</p>
      <p>È uno strumento per i tuoi solver, non per operare, e non detiene mai la chiave del tuo nodo. La registrazione dei solver avviene ancora da Mostrix o da <code>mostro-cli</code> (5.2).</p>

      <h4>Installazione e verifica</h4>
      <p>Android 7.0 o successivo. Scarica l'APK da <a href="https://github.com/MostroP2P/bosstro/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a>: <code>arm64-v8a</code> per quasi ogni telefono, <code>armeabi-v7a</code> per uno vecchio a 32 bit. Verificalo con il file di checksum della release:</p>
      <pre><code>sha256sum -c SHA256SUMS.txt --ignore-missing</code></pre>
      <p>Il checksum prova solo che il download è completo. Il certificato di firma prova chi l'ha compilato, e Android rifiuta un aggiornamento firmato con qualsiasi altra chiave. Confrontalo con <a href="https://github.com/soupslurpr/AppVerifier" target="_blank" rel="noopener noreferrer">AppVerifier</a>:</p>
      <pre><code>foundation.mostro.bosstro
63:92:27:84:C2:E3:2A:F4:B6:03:0F:5E:2A:18:1F:74:9B:F6:95:E5:2F:1C:A8:45:7E:98:CB:05:D2:9E:B3:4B</code></pre>

      <h4>Aggiungere un solver</h4>
      <ol>
        <li>Il solver apre Bosstro, tocca <strong>Create new account</strong> (oppure <strong>Log in</strong> con un nsec di solver esistente) e ti invia la npub. Quella chiave non deve servire a nient'altro — mai la chiave di un'app di trading, o i due ruoli risultano collegati in pubblico.</li>
        <li>La registri tu, in sola lettura per cominciare (5.1):
          <pre><code>ADMIN_NSEC=nsec1... mostro-cli admaddsolver -n npub1solver...:read</code></pre></li>
        <li>Il solver sceglie il tuo nodo in Bosstro: Mostro, una comunità dalla lista, oppure la tua pubkey e i tuoi relay. Bosstro capisce dalle risposte del tuo nodo se la chiave è un solver e con quale permesso.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Limiti attuali</div>
        <p>Bosstro parla solo il protocollo v2 (4.8). La versione 0.1 non mostra i riepiloghi di consegna di Serbero e non ha ancora notifiche push, quindi i solver che lavorano con Serbero hanno ancora bisogno di Mostrix per quelli. Un solver read-write può rilevare una disputa da Serbero in Bosstro.</p>
      </div>`,
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
      <p>Molte persone eseguono LND su un Raspberry Pi 4 o 5 con un SSD, tramite Start9, Umbrel o RaspiBlitz, e il pacchetto Mostro di StartOS può girare accanto. Per un nodo da cui dipende la tua comunità, un VPS è più affidabile di una connessione e di un'alimentazione domestiche. Una via di mezzo comune è LND a casa e Mostro su un VPS, collegati tramite VPN (vedi 2.2).</p>

      <h3>Posso usare Core Lightning (CLN) invece di LND?</h3>
      <p>No. Mostro attualmente supporta solo LND, perché dipende dall'implementazione specifica delle hold invoice di LND. Il supporto per altre implementazioni potrebbe arrivare in futuro.</p>

      <h3>Come si connettono gli utenti al mio Mostro?</h3>
      <p>Gli utenti hanno bisogno di un client Mostro — la <a href="https://github.com/MostroP2P/app" target="_blank" rel="noopener noreferrer">Mostro App</a> per Android, iOS, desktop e web, oppure mostro-cli o Mostrix — e della chiave pubblica del tuo Mostro (npub). Nell'app vanno su <em>Impostazioni → Rete → Nodo Mostro → Aggiungi il tuo nodo</em> e incollano la tua npub; i nodi elencati su questo sito vi compaiono già. Il client comunica attraverso i relay Nostr. Non serve una connessione diretta.</p>

      <h3>Il mio nodo può ancora servire i vecchi client (protocollo v1)?</h3>
      <p>No. Dalla v0.19.0 Mostro parla solo il protocollo v2 (4.8). Gli utenti con un vecchio client devono passare alla Mostro App o a un Mostrix o mostro-cli attuale.</p>

      <h3>I miei utenti possono scambiare USDT, Liquid o Rootstock invece del fiat?</h3>
      <p>Sì, dalla v0.20.2: USDT, USDC, DOC, BTC on-chain, LBTC e RBTC. Li abiliti uno per uno, e i tuoi solver devono sapere come verificare quei trasferimenti. Vedi 4.12.</p>

      <h3>Gli utenti possono portare la loro reputazione da lnp2pBot o da un altro Mostro?</h3>
      <p>Sì, se ti fidi della fonte. Attiva l'importazione della reputazione e aggiungi la chiave di lnp2pBot, o quella di un nodo Mostro di cui ti fidi (4.13). Puoi anche lasciare che i tuoi utenti esportino la reputazione guadagnata sul tuo nodo.</p>

      <h3>Posso eseguire più istanze di Mostro?</h3>
      <p>Sì, ma ognuna ha bisogno della propria coppia di chiavi Nostr, nodo LND (o almeno canali/liquidità separati), e configurazione.</p>

      <h3>È legale?</h3>
      <p>Dipende molto dalla tua giurisdizione. Mostro è software per il trading peer-to-peer. In alcune giurisdizioni, operare un exchange P2P può richiedere licenze. <strong>Verifica le normative locali e chiedi consulenza legale.</strong></p>

      <h3>Quanta banda usa Mostro?</h3>
      <p>Pochissima — principalmente piccoli eventi Nostr. Qualche GB al mese è tipico anche con volumi moderati.</p>

      <h3>Cosa succede se il mio nodo va offline?</h3>
      <p>Gli ordini in attesa alla fine scadono. Le operazioni attive con fondi bloccati continuano quando torni online. Se sei offline troppo a lungo, gli utenti potrebbero perdere fiducia. Dalla v0.18.3 esiste anche una scadenza per l'escrow: se il nodo resta giù abbastanza a lungo perché la hold invoice si avvicini al suo orizzonte CLTV, LND la annulla e il venditore viene rimborsato automaticamente. Se è il tuo LND a perdere la sincronizzazione mentre Mostro continua a girare, i pagamenti attendono invece di fallire e, dopo 10 minuti, il nodo entra da solo in manutenzione finché LND non si riprende (5.4).</p>

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
        <li><strong>Considera anche la privacy del tuo nodo Lightning.</strong> Eseguire LND dietro Tor è possibile e raccomandato in ambienti sensibili. Il tuo evento info pubblica la pubkey di LND e gli indirizzi che annuncia, quindi fai annunciare a LND solo indirizzi Tor.</li>
        <li><strong>Sappi cosa pubblica il tuo nodo.</strong> L'evento di salute (5.4) è pubblico: stato, altezza di blocco e rete di LND, versione di Mostro. Impostare un <code>watchdog_pubkey</code> aggiunge un tag che collega il tuo nodo a quella chiave. Disattivalo con <code>[health] enabled = false</code> se ti importa più di questo che del monitoraggio.</li>
        <li><strong>Le variabili proxy non bastano.</strong> Le ricerche di indirizzi Lightning ignorano deliberatamente <code>HTTP_PROXY</code>/<code>HTTPS_PROXY</code>. Per nascondere l'IP del server, instrada l'intera macchina attraverso Tor o una VPN.</li>
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

      <h4><code>transport = "gift-wrap" (protocol v1) is no longer supported</code></h4>
      <p>Elimina la riga <code>transport</code> da <code>settings.toml</code>. Vedi 4.8.</p>

      <h4><code>escrow_deadline_margin_blocks (X) must be at least 18 ...</code> oppure <code>... must be below hold_invoice_cltv_delta</code></h4>
      <p>Imposta il margine tra 18 e <code>hold_invoice_cltv_delta</code>; il 24 del template con 144 va bene. Vedi 4.9.</p>

      <h4><code>unknown field mint_url</code></h4>
      <p>In <code>[cashu]</code>, rinominala in <code>mint_urls = ["..."]</code>. Vedi 4.11.</p>

      <h4><code>anti_abuse_bond.bond_cltv_delta ... must be above hold_invoice_cltv_delta + 144</code> oppure <code>... must be at most 864</code></h4>
      <p>Imposta <code>bond_cltv_delta</code> esplicitamente entro quei limiti. Nella v0.20.2, le cauzioni più un <code>hold_invoice_cltv_delta</code> pari o superiore a 288 incappano in questo con il valore predefinito. Vedi 4.11.</p>

      <h4><code>REFUSING TO START: serbero_pubkey ...</code></h4>
      <p>La chiave di Serbero è già un solver read-write, appartiene a un utente, o è la chiave del tuo nodo. Dai a Serbero una chiave tutta sua. Vedi 5.10.</p>

      <h4>Le impostazioni di reputazione bloccano l'avvio</h4>
      <p>I nomi degli emittenti devono essere unici e ogni chiave valida ed elencata una sola volta; la chiave di un emittente non deve mai passare a un altro nome una volta che ha importazioni. Con l'esportazione attiva, <code>MOSTRO_REPUTATION_ISSUER_SK</code> deve essere impostata, valida, diversa dalla chiave del tuo nodo e non presente nella tua lista di importazione. Vedi 4.13.</p>

      <h4>I client non vedono i miei ordini o non riescono a scrivere al mio nodo</h4>
      <p>Il tuo nodo parla solo il protocollo v2. Un utente con un vecchio client che parla solo il protocollo v1 non riceve risposta e deve aggiornare (4.8). Controlla anche che i client e il tuo nodo condividano almeno un relay.</p>

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

      <h4>I pagamenti non partono, ma non c'è nessun errore</h4>
      <p>Controlla se LND è sincronizzato: <code>lncli getinfo</code>. Finché non lo è, Mostro trattiene i pagamenti di proposito e li reinvia appena LND si riprende (5.4).</p>

      <h4>Gli utenti ricevono rifiuti per "manutenzione" anche se non l'ho mai abilitata</h4>
      <p><code>mostro-cli admmaintenancestatus</code> mostra il motivo. <code>lnd_unsynced</code> significa che Mostro l'ha attivata perché LND ha perso la sincronizzazione; la toglie da sola 5 minuti dopo che LND è di nuovo sincronizzato (5.4).</p>

      <h4>Le commissioni di sviluppo non vengono mai pagate</h4>
      <p>Su testnet, signet o regtest è previsto: le commissioni di sviluppo si pagano solo su mainnet (4.2).</p>

      <h4>Gli ordini a prezzo di mercato in una valuta vengono rifiutati</h4>
      <p>Il tuo nodo non ha un tasso per essa. Controlla gli avvisi <code>price:</code> nel log di avvio: un blocco <code>[price]</code> senza fonti di mercato abilitate, o una stablecoin quotata ma non elencata in <code>fiat_currencies_accepted</code>, sono le cause più comuni. Vedi 4.10 e 4.12.</p>

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
