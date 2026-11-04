import type { GuideTranslation } from './types';

/**
 * en translation of the node guide.
 *
 * `{{version}}` and `{{updated}}` are replaced at render time with the
 * current Mostro release tag and its month. Section order and heading levels
 * live in `./sections.ts`, not here.
 */
const en: GuideTranslation = {
  meta: {
    title: `How to Run a Mostro Node — Complete Setup Guide for P2P Bitcoin Exchange`,
    description: `Step-by-step guide to running your own Mostro P2P Bitcoin exchange node. Docker & native installation, Lightning Network setup, configuration, dispute resolution, and monitoring.`,
    h1: `Running Your Own Mostro Node`,
    versionLine: `Mostro {{version}} — Community Guide · {{updated}}`,
    tocTitle: `On this page`,
    tocButton: `📑 Table of Contents`,
    credit: `      <div style="text-align:center; margin-top:48px; padding:24px; border-top:1px solid var(--border);">
        <p>This guide is maintained by the Mostro community. Found an error or want to improve it?<br>
        Contributions are welcome at <a href="https://github.com/MostroP2P/community" target="_blank" rel="noopener noreferrer">github.com/MostroP2P/community</a></p>
        <p style="color:var(--text-secondary); margin-top:12px;">Last updated: {{updated}} · Mostro {{version}}</p>
      </div>`,
  },

  sections: {
    'what-is-mostro': {
      title: `1. What is Mostro and Why Should Your Community Run One?`,
      nav: `1. What is Mostro?`,
      navShort: `1. What is Mostro?`,
      html: `      <p>Mostro is a <strong>peer-to-peer Bitcoin exchange</strong> that lets people buy and sell Bitcoin using local currencies (dollars, euros, pesos — any currency) without needing to provide identity documents (KYC). Think of it as a decentralized marketplace where buyers and sellers can trade directly.</p>

      <p>It works using two technologies:</p>
      <ul>
        <li><strong>Lightning Network</strong> — a fast, low-cost Bitcoin payment layer (think of it as Bitcoin's express lane for small, quick payments)</li>
        <li><strong>Nostr</strong> — a censorship-resistant communication protocol (think of it as a messaging system that nobody can shut down)</li>
      </ul>

      <p>Mostro acts as an <strong>escrow coordinator</strong> — it holds the seller's Bitcoin in a temporary "lock box" (called a hold invoice) until the buyer confirms they've sent the local currency payment. Mostro never actually controls anyone's funds; it just holds them briefly during the trade.</p>`,
    },
    'why-run': {
      title: `Why Would Your Community Want to Run a Mostro Node?`,
      nav: `Why run a node?`,
      html: `      <ol>
        <li><strong>Fee income</strong> — Every trade earns you the fee you set (the template ships 0; 0.6% is a common choice). At 0.6%, a community doing $10,000 in monthly trades earns ~$60/month in fees.</li>
        <li><strong>P2P trading without KYC</strong> — Your community members can buy and sell Bitcoin without providing identity documents. Especially important in regions with unstable currencies or restrictive regulations.</li>
        <li><strong>Disputes in your language</strong> — When a trade goes wrong, <em>your</em> community resolves it, in <em>your</em> language, understanding <em>your</em> local payment methods.</li>
        <li><strong>Independence</strong> — No company can shut down your exchange. No government can pressure a single operator to close it.</li>
        <li><strong>Customization</strong> — You choose which currencies to support, what payment methods to allow, and what fees to charge.</li>
      </ol>`,
    },
    'how-it-works': {
      title: `How Mostro Works (Simplified)`,
      nav: `How it works`,
      html: `      <div class="flow-diagram">
        <div class="flow-step"><span class="step-num">1.</span> Alice wants to SELL Bitcoin for $50 USD <span class="arrow">→</span> She creates an order on Mostro</div>
        <div class="flow-step"><span class="step-num">2.</span> Bob wants to BUY Bitcoin with $50 USD <span class="arrow">→</span> He sees Alice's order and takes it</div>
        <div class="flow-step"><span class="step-num">3.</span> Mostro creates a "lock box" (hold invoice) <span class="arrow">→</span> Alice sends her Bitcoin into the lock box</div>
        <div class="flow-step"><span class="step-num">4.</span> Bob sends $50 to Alice via bank transfer, Zelle, cash, etc. <span class="arrow">→</span> Bob clicks "Fiat Sent" in his app</div>
        <div class="flow-step"><span class="step-num">5.</span> Alice confirms she received the $50 <span class="arrow">→</span> She clicks "Release"</div>
        <div class="flow-step"><span class="step-num">6.</span> Mostro releases the Bitcoin from the lock box to Bob <span class="arrow">→</span> Trade complete! ✓</div>
      </div>

      <p>If something goes wrong (e.g., Bob says he paid but Alice didn't receive it), either party can open a <strong>dispute</strong>, and your community's assigned arbiters investigate and resolve it.</p>`,
    },
    'prerequisites': {
      title: `2. Prerequisites — What You Need Before Starting`,
      nav: `2. Prerequisites`,
      navShort: `2. Prerequisites`,
      html: ``,
    },
    'vps': {
      title: `2.1 A Server (VPS)`,
      nav: `Server (VPS)`,
      html: `      <p>A <strong>VPS</strong> (Virtual Private Server) is a computer in a data center that runs 24/7. You'll rent one to host your Mostro node.</p>

      <p><strong>Minimum specs:</strong></p>
      <table class="guide-table">
        <thead><tr><th>Resource</th><th>Minimum</th><th>Recommended</th></tr></thead>
        <tbody>
          <tr><td>CPU</td><td>2 vCPUs (shared)</td><td>2+ vCPUs</td></tr>
          <tr><td>RAM</td><td>2 GB</td><td>4 GB</td></tr>
          <tr><td>Storage</td><td>60 GB SSD</td><td>100 GB SSD</td></tr>
          <tr><td>Bandwidth</td><td>3 TB/month</td><td>3+ TB/month</td></tr>
          <tr><td>OS</td><td>Ubuntu 22.04+ LTS</td><td>Ubuntu 24.04 LTS</td></tr>
        </tbody>
      </table>

      <p><strong>Estimated monthly cost:</strong> $10–$24/month.</p>

      <p><strong>Popular VPS providers:</strong></p>
      <ul>
        <li><a href="https://www.hostinger.com/" target="_blank" rel="noopener noreferrer">Hostinger</a> — from ~$7/month (promotional price; renewal may be higher) (KVM 2: 2 vCPU, 8GB RAM, 100GB NVMe, 8TB bandwidth) · Accepts Bitcoin</li>
        <li><a href="https://www.hetzner.com/" target="_blank" rel="noopener noreferrer">Hetzner</a> — €3.49-8/month (CX23 from €3.49, good value, EU-based)</li>
        <li><a href="https://www.digitalocean.com/" target="_blank" rel="noopener noreferrer">Digital Ocean</a> — $24/month (4GB RAM, 2 CPUs, 80GB SSD) or $32/month (4GB RAM, 2 Intel CPUs, 120GB NVMe)</li>
        <li><a href="https://www.ovhcloud.com/" target="_blank" rel="noopener noreferrer">OVH</a> — ~$6-12/month</li>
        <li><a href="https://www.linode.com/" target="_blank" rel="noopener noreferrer">Linode/Akamai</a> — $12/month</li>
        <li><a href="https://www.lunanode.com/" target="_blank" rel="noopener noreferrer">Lunanode</a> — Accepts Bitcoin payments</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Tip</div>
        <p>Many VPS providers accept Bitcoin payments. Look for that option if you want to stay consistent with the Bitcoin ethos.</p>
      </div>

      <p>You need to be comfortable connecting to a server via SSH. If you've never done it, search for a tutorial on "Connect to a VPS via SSH" — it's simpler than it sounds.</p>`,
    },
    'lnd': {
      title: `2.2 A Lightning Network Node (LND)`,
      nav: `Lightning Node (LND)`,
      html: `      <p>Lightning Network is a "layer 2" system built on top of Bitcoin that enables fast, cheap payments. To run Mostro, you need an <strong>LND node</strong> (Lightning Network Daemon) — the specific Lightning software that Mostro works with.</p>

      <p><strong>Your options:</strong></p>
      <table class="guide-table">
        <thead><tr><th>Option</th><th>Difficulty</th><th>Cost</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Use an existing LND node</td><td><span class="badge badge-easy">Easy</span></td><td>Free (if you have one)</td><td>Best if someone already has one</td></tr>
          <tr><td>Run LND on the same VPS</td><td><span class="badge badge-hard">Hard</span></td><td>Same VPS + liquidity</td><td>Requires VPS with 4GB+ RAM</td></tr>
          <tr><td>Node-in-a-box solution</td><td><span class="badge badge-medium">Medium</span></td><td>$200-600 + liquidity</td><td><a href="https://start9.com/" target="_blank" rel="noopener noreferrer">Start9</a>, <a href="https://umbrel.com/" target="_blank" rel="noopener noreferrer">Umbrel</a>, <a href="https://raspiblitz.org/" target="_blank" rel="noopener noreferrer">RaspiBlitz</a></td></tr>
          <tr><td>StartOS with Mostro package</td><td><span class="badge badge-easy">Easiest</span></td><td>$300-600 + liquidity</td><td>Start9 has a one-click Mostro package</td></tr>
          <tr><td>Use Voltage.cloud</td><td><span class="badge badge-easy">Easy</span></td><td>From ~$20/month + liquidity</td><td><a href="https://voltage.cloud/" target="_blank" rel="noopener noreferrer">Voltage</a> — Hosted LND with managed infrastructure</td></tr>
        </tbody>
      </table>

      <div class="callout important">
        <div class="callout-title">⚠️ Important</div>
        <p>Mostro specifically requires <strong>LND</strong> (not CLN/Core Lightning, not Eclair, not LDK). Make sure your Lightning node runs LND.</p>
      </div>

      <p><strong>What you need from your LND node:</strong></p>
      <ul>
        <li>The <code>tls.cert</code> file (a security certificate)</li>
        <li>A dedicated <code>mostro.macaroon</code> file (an authentication token with only the permissions Mostro needs, see below)</li>
        <li>The gRPC address (typically <code>https://127.0.0.1:10009</code> if on the same machine)</li>
      </ul>

      <p><strong>Generate a dedicated macaroon for Mostro.</strong> Do not give Mostro your <code>admin.macaroon</code>: it grants full control over your node and its funds. Bake a macaroon that carries only the permissions Mostro actually uses (read node info, list channels for the health report, create/settle/cancel hold invoices, send and track payments).</p>
      <p>First pick a root key ID that is not already in use. Revoking a macaroon revokes every macaroon sharing its ID, so reusing one would take out unrelated credentials. ID 0 belongs to LND's own macaroons, so choose a free non-zero number and write it down:</p>
      <pre><code>lncli listmacaroonids</code></pre>
      <p>Then bake the macaroon with the ID you chose (<code>7</code> in this example — substitute yours):</p>
      <pre><code>lncli bakemacaroon --root_key_id 7 \\
  --save_to /root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon \\
  info:read invoices:read invoices:write offchain:read offchain:write</code></pre>
      <p>This macaroon cannot open or close channels, move on-chain funds, or change your node's configuration. If it ever leaks, revoke it with <code>lncli deletemacaroonid 7</code> — using the same ID you baked it with — and bake a new one.</p>`,
    },
    'liquidity': {
      title: `2.3 Lightning Liquidity`,
      nav: `Liquidity`,
      html: `      <p>To facilitate trades, your Lightning node needs <strong>channels</strong> with Bitcoin in them. Think of Lightning channels as pre-funded payment tunnels. The Bitcoin inside these channels is your "liquidity".</p>

      <p><strong>How much do you need?</strong></p>
      <table class="guide-table">
        <thead><tr><th>Target trading volume</th><th>Suggested liquidity</th><th>Approximate BTC</th></tr></thead>
        <tbody>
          <tr><td>Small community (few trades/day)</td><td>1–5 million sats</td><td>0.01–0.05 BTC</td></tr>
          <tr><td>Medium community</td><td>5–20 million sats</td><td>0.05–0.20 BTC</td></tr>
          <tr><td>Active community</td><td>20–100 million sats</td><td>0.20–1.0 BTC</td></tr>
        </tbody>
      </table>

      <div class="callout tip">
        <div class="callout-title">💡 Note on Lightning Liquidity</div>
        <p>The Bitcoin in your Lightning channels is locked <strong>onchain</strong> but remains highly spendable via Lightning Network. Many services accept Lightning payments — from coffee shops to VPS providers — making your liquidity quite flexible for everyday use.</p>
      </div>

      <p><strong>Start small, grow incrementally.</strong> Begin with enough for your community's initial needs and monitor feedback. When traders report orders failing due to insufficient capacity, that's your signal to add more. Listen to your community.</p>

      <p><strong>Getting liquidity:</strong></p>
      <ul>
        <li>Open channels to well-connected nodes (use <a href="https://lightningnetwork.plus/" target="_blank" rel="noopener noreferrer">Lightning Network+</a> or <a href="https://amboss.space/" target="_blank" rel="noopener noreferrer">Amboss</a> to find good peers)</li>
        <li>You need <strong>outbound</strong> capacity (to pay buyers) and <strong>inbound</strong> capacity (to receive from sellers)</li>
        <li>Getting inbound liquidity is usually harder — consider <a href="https://lightning.engineering/loop/" target="_blank" rel="noopener noreferrer">Lightning Loop</a>, <a href="https://amboss.space/magma" target="_blank" rel="noopener noreferrer">Magma</a>, or channel swap services</li>
      </ul>`,
    },
    'nostr-keys': {
      title: `2.4 Nostr Keys`,
      nav: `Nostr Keys`,
      html: `      <p>Your Mostro node needs its own identity on the Nostr network — a cryptographic key pair with a public key (your node's address) and a private key (your secret).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Important</div>
        <p>Never reuse Nostr keys between Mostro instances. Each node needs its own unique identity.</p>
      </div>

      <p><strong>Generating secure Nostr keys locally with rana:</strong></p>
      <pre><code># Install Rust (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Install rana - local Nostr key generator
cargo install rana

# Generate a new key pair (with 12-word seed phrase)
rana --generate 12</code></pre>

      <p>Rana will generate your private key (nsec), public key (npub), and a backup seed phrase. <strong>Keep everything safe!</strong> Note: running <code>rana</code> without arguments starts PoW mining (difficulty 10) which can take minutes — use <code>--generate</code> for instant generation. Never generate important keys using online services.</p>`,
    },
    'skill-level': {
      title: `2.5 Technical Skill Level`,
      nav: `Skill level`,
      html: `      <table class="guide-table">
        <thead><tr><th>Task</th><th>Difficulty</th><th>Required knowledge</th></tr></thead>
        <tbody>
          <tr><td>Rent a VPS</td><td><span class="badge badge-easy">Easy</span></td><td>Credit card, basic web browsing</td></tr>
          <tr><td>Connect via SSH</td><td><span class="badge badge-easy">Easy</span></td><td>Follow instructions, type commands</td></tr>
          <tr><td>Install Docker</td><td><span class="badge badge-medium">Medium</span></td><td>Copy-paste commands, basic troubleshooting</td></tr>
          <tr><td>Run Mostro (Docker)</td><td><span class="badge badge-medium">Medium</span></td><td>Edit config files, understand paths</td></tr>
          <tr><td>Run Mostro (native)</td><td><span class="badge badge-hard">Hard</span></td><td>Linux administration, software compilation, systemd</td></tr>
          <tr><td>Set up LND from scratch</td><td><span class="badge badge-hard">Hard</span></td><td>Significant Linux and networking knowledge</td></tr>
          <tr><td>Manage Lightning liquidity</td><td><span class="badge badge-hard">Hard</span></td><td>Understanding Lightning channel economics</td></tr>
        </tbody>
      </table>

      <p><strong>💡 Our recommendation:</strong> If your community has someone comfortable with the Linux command line, they can handle the Docker installation. Native compilation requires system administration experience. Lightning node setup is the most complex part — consider asking someone experienced for help, or using a node-in-a-box solution.</p>`,
    },
    'setup': {
      title: `3. Step-by-Step Setup`,
      nav: `3. Step-by-step setup`,
      navShort: `3. Setup`,
      html: `      <p>All installation options share the same first steps. Then choose your preferred option:</p>
      <ul>
        <li><strong>Option A (Docker Hub):</strong> Fastest. No compiling, no cloning. <strong>Recommended for most.</strong></li>
        <li><strong>Option B (Docker Build):</strong> Build the image locally from the repository.</li>
        <li><strong>Option C (Native Build):</strong> More control, better for experienced sysadmins.</li>
      </ul>

      <p>All assume you already have: ✅ A VPS with Ubuntu · ✅ SSH access · ✅ A working LND node.</p>`,
    },
    'common-steps': {
      title: `Common Steps (for all 3 options)`,
      nav: `Common steps`,
      html: `      <h4>Step 1: Connect to your VPS</h4>
      <pre><code>ssh root@YOUR_VPS_IP_ADDRESS</code></pre>

      <h4>Step 2: Update the system</h4>
      <pre><code># Download the latest package information
apt update

# Install all available updates
apt upgrade -y</code></pre>

      <h4>Step 3: Install Docker and Docker Compose</h4>
      <div class="callout tip">
        <div class="callout-title">💡 Note</div>
        <p>Docker is required for options A and B. If you're compiling manually (Option C), you can skip this step.</p>
      </div>
      <pre><code># Install Docker using the official script
curl -fsSL https://get.docker.com | sh

# Verify Docker is installed
docker --version

# Verify Docker Compose
docker compose version</code></pre>

      <h4>Step 4: Install additional tools</h4>
      <pre><code>apt install -y git make</code></pre>

      <p>✅ <strong>Common steps completed.</strong> Now choose your installation option:</p>`,
    },
    'option-a': {
      title: `Option A: Docker Hub (Fastest — Recommended)`,
      nav: `Option A: Docker Hub`,
      html: `      <p>Run Mostro directly from Docker Hub without cloning the repository or compiling. Perfect for VPS deployments.</p>

      <h4>Step 5: Create configuration directory</h4>
      <pre><code>mkdir -p ~/mostro-config/lnd</code></pre>

      <h4>Step 6: Get the configuration template</h4>
      <pre><code>curl -sL https://raw.githubusercontent.com/MostroP2P/mostro/{{version}}/settings.tpl.toml \\
  -o ~/mostro-config/settings.toml</code></pre>

      <h4>Step 7: Copy LND credentials</h4>
      <pre><code>cp /path/to/your/tls.cert ~/mostro-config/lnd/tls.cert
cp /path/to/your/mostro.macaroon ~/mostro-config/lnd/mostro.macaroon</code></pre>

      <p>If LND is on the <strong>same machine</strong>, typical paths are:</p>
      <ul>
        <li><code>/root/.lnd/tls.cert</code></li>
        <li><code>/root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon</code></li>
      </ul>

      <h4>Step 8: Edit the configuration</h4>
      <pre><code>nano ~/mostro-config/settings.toml</code></pre>

      <p><strong>Required changes:</strong></p>
      <pre><code>[lightning]
lnd_cert_file = '/config/lnd/tls.cert'
lnd_macaroon_file = '/config/lnd/mostro.macaroon'
lnd_grpc_host = 'https://host.docker.internal:10009'  # If LND on same VPS
# Or use 'https://YOUR_LND_IP:10009' if LND on different server

[database]
url = "sqlite:///config/mostro.db"  # mostrod always uses &lt;config-dir&gt;/mostro.db

[nostr]
nsec_privkey = 'YOUR_NSEC_KEY_HERE'
relays = ['wss://relay.mostro.network', 'wss://nos.lol']

[mostro]
fee = 0.006                    # 0.6% fee per trade
max_order_amount = 1000000     # Maximum order in sats
min_payment_amount = 100       # Minimum order in sats
fiat_currencies_accepted = ['USD', 'EUR']  # Your currencies</code></pre>

      <p>Save: <code>Ctrl+X</code>, then <code>Y</code>, then <code>Enter</code>.</p>

      <h4>Step 9: Fix permissions</h4>
      <div class="callout important">
        <div class="callout-title">⚠️ Important</div>
        <p>Avoid <code>chmod 777</code>. Use least privilege.</p>
      </div>
      <pre><code>sudo chown -R 1000:1000 ~/mostro-config
chmod 700 ~/mostro-config
chmod 600 ~/mostro-config/settings.toml
chmod 600 ~/mostro-config/lnd/mostro.macaroon</code></pre>

      <h4>Step 10: Run the container</h4>
      <p><strong>If LND is on the same VPS:</strong></p>
      <pre><code>docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:{{version}}</code></pre>

      <p><strong>If LND is on a different server:</strong></p>
      <pre><code>docker run -d --name mostro \\
  --restart unless-stopped \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:{{version}}</code></pre>

      <h4>Step 11: Check the logs</h4>
      <pre><code>docker logs -f mostro</code></pre>

      <p>Look for these messages:</p>
      <ul>
        <li><code>Mostro pubkey: npub1... (hex ...)</code> — Your node's identity. Write the npub down: it is what users and other tools need</li>
        <li><code>Settings correctly loaded!</code> — Configuration is valid</li>
        <li><code>Transport: nip44 (protocol v2, event kind 14)</code> — Wire protocol in use (see 4.8)</li>
        <li><code>Recorded Lightning node identity &lt;pubkey&gt;</code> — LND reached (first run only)</li>
        <li><code>Published health event: status ok, seq N</code> — Repeated every minute. At least one relay accepted the node's health report (see 5.4)</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Note</div>
        <p>There is no "connected to LND" or "connected to relay" message. Mostro contacts LND while starting up, so a daemon that gets past startup has reached LND. Failure is loud instead: it logs <code>Ln node error</code> and exits. After startup it polls LND every 15 seconds and logs <code>LND did not answer GetInfo</code> if it stops answering; outgoing payments then wait until it is back (5.4). For relays, the health-event line is your signal: <code>No relay accepted the health event</code> means none of them took it.</p>
      </div>

      <div class="callout tip">
        <div class="callout-title">💡 Troubleshooting</div>
        <p>If you see <code>Permission denied (os error 13)</code>, re-apply permissions: <code>chown -R 1000:1000 ~/mostro-config</code> and restart: <code>docker restart mostro</code>.</p>
      </div>

      <p>🎉 <strong>Congratulations!</strong> If you see successful connections in the logs, your Mostro node is running!</p>

      <h4>Alternative: Docker Compose</h4>
      <p>Instead of a long <code>docker run</code> command you can describe the container in a compose file. It runs the same image with the same settings, and updating becomes a one-line tag change. Create <code>~/mostro-docker/compose.yml</code>:</p>
      <pre><code>mkdir -p ~/mostro-docker
nano ~/mostro-docker/compose.yml</code></pre>
      <pre><code>services:
  mostro:
    image: mostrop2p/mostro:{{version}}
    container_name: mostro
    restart: unless-stopped
    extra_hosts:
      - "host.docker.internal:host-gateway"  # only if LND runs on this VPS
    volumes:
      - \${HOME}/mostro-config:/config</code></pre>
      <p>Start it and follow the logs:</p>
      <pre><code>docker compose -f ~/mostro-docker/compose.yml up -d
docker compose -f ~/mostro-docker/compose.yml logs -f mostro</code></pre>
      <p>Pick one: <code>docker run</code> <strong>or</strong> compose, not both. To update either of them, see 5.5.</p>

      <div class="callout security">
        <div class="callout-title">🔒 Security Note</div>
        <p>Always use a specific version tag (e.g., <code>mostrop2p/mostro:{{version}}</code>) instead of <code>:latest</code> to control deployments.</p>
      </div>`,
    },
    'option-b': {
      title: `Option B: Docker Build (Build image locally)`,
      nav: `Option B: Docker Build`,
      html: `      <h4>Step 5: Download Mostro</h4>
      <pre><code>cd /opt
git clone https://github.com/MostroP2P/mostro.git
cd mostro</code></pre>

      <h4>Step 6: Set up configuration files</h4>
      <pre><code>cd docker
mkdir -p config
cp ../settings.tpl.toml config/settings.toml</code></pre>

      <h4>Step 7: Edit the configuration file</h4>
      <pre><code>nano config/settings.toml</code></pre>
      <p>Edit the same settings as Option A, Step 8, with one difference: <code>make docker-build</code> copies your macaroon to <code>config/lnd/admin.macaroon</code>, whatever its original name, so point Mostro there:</p>
      <pre><code>lnd_macaroon_file = '/config/lnd/admin.macaroon'  # still your restricted mostro.macaroon, under another name</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ If LND runs on the same VPS</div>
        <p>Unlike Option A, the repository's <code>docker/compose.yml</code> does not map <code>host.docker.internal</code>, so on Linux that name does not resolve inside the container. Add the mapping to the <code>mostro</code> service before building:</p>
        <pre><code>    extra_hosts:
      - "host.docker.internal:host-gateway"</code></pre>
        <p>Or point <code>lnd_grpc_host</code> at the host's LAN IP instead. Note that <code>make docker-build</code> also builds the StartOS image, which a VPS does not need — it only costs build time.</p>
      </div>

      <h4>Step 8: Build the Docker image</h4>
      <pre><code>cd ..
LND_CERT_FILE=/root/.lnd/tls.cert \\
LND_MACAROON_FILE=/root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon \\
make docker-build</code></pre>

      <h4>Step 9: Start Mostro</h4>
      <pre><code># Start Mostro and the bundled relay. Plain \`make docker-up\` also
# starts the StartOS image, which you don't need on a VPS.
docker compose -f docker/compose.yml up -d mostro nostr-relay

# Check status
docker compose -f docker/compose.yml ps

# View logs
docker compose -f docker/compose.yml logs -f mostro</code></pre>

      <p>🎉 <strong>Congratulations!</strong> If you see successful connections, your Mostro node is running!</p>`,
    },
    'option-c': {
      title: `Option C: Native Build (For Technical Operators)`,
      nav: `Option C: Native`,
      html: `      <h4>Step 5: Install Rust</h4>
      <pre><code>curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source /root/.cargo/env
rustc --version
cargo --version</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Important</div>
        <p>Do NOT install Rust via <code>apt install rustc</code>. Always use <code>rustup</code>. The system package is often outdated.</p>
      </div>

      <h4>Step 6: Install build dependencies</h4>
      <pre><code>apt install -y cmake build-essential libsqlite3-dev libssl-dev \\
  pkg-config git sqlite3 protobuf-compiler</code></pre>

      <h4>Step 7: Download and compile Mostro</h4>
      <pre><code>cd /opt
git clone https://github.com/MostroP2P/mostro.git
cd mostro
cargo build --release</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Tip</div>
        <p>If compilation fails due to low RAM, add swap space:</p>
      </div>
      <pre><code>fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile</code></pre>

      <h4>Steps 8–10: Install, initialize, and clean</h4>
      <pre><code>install target/release/mostrod /usr/local/bin
cargo clean  # Saves 2+ GB of space</code></pre>

      <h4>Steps 11–12: Create user and configure</h4>
      <pre><code>adduser --disabled-login mostro
mkdir -p /opt/mostro
cp settings.tpl.toml /opt/mostro/settings.toml
nano /opt/mostro/settings.toml</code></pre>
      <p>Edit the same settings as Option A, Step 8.</p>

      <h4>Steps 13–15: Test, permissions, and systemd service</h4>
      <pre><code># Test run
/usr/local/bin/mostrod -d /opt/mostro

# Set permissions
chown -R mostro:mostro /opt/mostro</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 The interactive setup wizard</div>
        <p>If you run <code>mostrod</code> with no <code>settings.toml</code> in the target directory and you are on a terminal, it offers a setup menu that can build the config for you and write the nsec to a <code>.env</code> file. Without a terminal — Docker, systemd, CI — it copies the template, prints where it put it, and exits so you can edit it.</p>
      </div>

      <p>Create the systemd service:</p>
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

      <p>🎉 <strong>Congratulations!</strong> Your Mostro node is running as a system service.</p>`,
    },
    'configuration': {
      title: `4. Configuration In Depth`,
      nav: `4. Configuration`,
      navShort: `4. Configuration`,
      html: `      <p>The <code>settings.toml</code> file controls everything about your Mostro node.</p>`,
    },
    'cfg-nostr': {
      title: `4.1 Nostr Keys — Your Node's Identity`,
      nav: `Nostr Keys`,
      html: `      <pre><code>[nostr]
nsec_privkey = 'YOUR_NSEC_KEY'
relays = [
  'wss://relay.mostro.network',
  'wss://nos.lol',
  'wss://relay.nostr.band'
]</code></pre>

      <p><strong>Which relays to use?</strong></p>
      <ul>
        <li><code>wss://relay.mostro.network</code> — Mostro's own relay, recommended</li>
        <li><code>wss://nos.lol</code> — Reliable and well-connected relay</li>
        <li>Add 3–5 relays for reliability. More relays = better availability but more bandwidth.</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Tip</div>
        <p>You can also run your own Nostr relay alongside Mostro. The Docker Build path (Option B) bundles one in its <code>compose.yml</code>; Option A and the native build do not.</p>
      </div>


      <h4>Keeping the key out of settings.toml</h4>
      <p>Mostro also reads the key from the <code>MOSTRO_NSEC_PRIVKEY</code> environment variable. Precedence is: environment variable, then <code>&lt;config-dir&gt;/.env</code>, then <code>settings.toml</code>.</p>
      <pre><code># ~/mostro-config/.env  (chmod 600) — loaded automatically at startup
MOSTRO_NSEC_PRIVKEY=nsec1...

# Docker
docker run -e MOSTRO_NSEC_PRIVKEY=nsec1... ...

# systemd unit
Environment="MOSTRO_NSEC_PRIVKEY=nsec1..."</code></pre>
      <p>Leaving <code>nsec_privkey</code> in <code>settings.toml</code> still works. If you use the <code>.env</code> file, back it up as carefully as the config itself.</p>`,
    },
    'fees': {
      title: `4.2 Fees — How You Earn Revenue`,
      nav: `Fees`,
      html: `      <pre><code>[mostro]
fee = 0.006
dev_fee_percentage = 0.30</code></pre>

      <p><strong>Trading fee</strong> (<code>fee</code>): Percentage charged per trade, split between buyer and seller.</p>
      <ul>
        <li><code>0.006</code> = 0.6% (each party pays 0.3%)</li>
        <li><code>0.01</code> = 1.0% (each party pays 0.5%)</li>
        <li><code>0</code> = free (good for growing your user base)</li>
      </ul>

      <p><strong>Example:</strong> On a 100,000 sat trade with <code>fee = 0.006</code>: The buyer pays 300 sats, the seller pays 300 sats, your node earns 600 sats total.</p>

      <p><strong>Development fee</strong> (<code>dev_fee_percentage</code>): A percentage of <em>your</em> fee earnings that goes to Mostro development.</p>
      <ul>
        <li><code>0.30</code> = 30% (default) — out of 600 sats, 180 go to the development fund</li>
        <li>Minimum: 10% (<code>0.10</code>), Maximum: 100% (<code>1.0</code>)</li>
        <li>Paid by your node from its earnings, not charged to users</li>
        <li>Sent automatically to the Lightning address <code>dev@pay.mostro.foundation</code>; there is nothing to configure</li>
        <li>Paid only when your LND runs on <strong>mainnet</strong>. On testnet, signet or regtest the amounts are still computed, but nothing is paid and the log says <code>dev fee payments are disabled</code></li>
        <li>A failed payment is retried per order, from one minute up to one hour apart</li>
        <li>All payments publicly auditable via Nostr events (kind 8383)</li>
      </ul>

      <div class="callout important">
        <div class="callout-title">📝 Note</div>
        <p>Setting <code>dev_fee_percentage</code> below <code>0.10</code> will prevent Mostro from starting. This minimum ensures sustainable development funding.</p>
      </div>`,
    },
    'limits': {
      title: `4.3 Order Limits and Currencies`,
      nav: `Limits`,
      html: `      <pre><code>[mostro]
max_order_amount = 1000000
min_payment_amount = 100
max_orders_per_response = 10
fiat_currencies_accepted = ['USD', 'EUR', 'ARS', 'CUP']</code></pre>

      <ul>
        <li><strong><code>max_order_amount</code>:</strong> Largest trade in satoshis. Set based on your Lightning channel capacity.</li>
        <li><strong><code>min_payment_amount</code>:</strong> Minimum trade in satoshis. 1,000 or 10,000 is more practical than 100. Both limits are checked against the sats the order really moves, premium or discount included.</li>
        <li><strong><code>max_orders_per_response</code>:</strong> Maximum number of orders Mostro returns in a single query. If a user has more orders than this limit (e.g. when restoring their session from the mobile client), they will receive a <code>cant-do: too_many_requests</code> error and won't be able to recover their orders. If your users trade frequently, increase this value (e.g. 50 or 100). The default of 10 may not be enough.</li>
        <li><strong><code>fiat_currencies_accepted</code>:</strong> Use <a href="https://en.wikipedia.org/wiki/ISO_4217" target="_blank" rel="noopener noreferrer">ISO 4217 codes</a>, in UPPERCASE: the match is exact. Empty array <code>[]</code> accepts all currencies. Since v0.20.2 the list can also hold the stablecoins <code>USDT</code>, <code>USDC</code> and <code>DOC</code>, and bitcoin on other networks (<code>BTC</code>, <code>LBTC</code>, <code>RBTC</code>) — see 4.12.</li>
      </ul>`,
    },
    'profile': {
      title: `4.4 Node Profile (Optional but Recommended)`,
      nav: `Node Profile`,
      html: `      <pre><code>[mostro]
name = "LatAm Mostro"
about = "P2P Bitcoin exchange for Latin America. Spanish support."
picture = "https://example.com/your-logo.png"
website = "https://your-community-site.com"</code></pre>

      <p>These set your Mostro's profile on Nostr (NIP-01 kind 0 metadata). Clients display this information so users know which Mostro they're trading on.</p>`,
    },
    'timeouts': {
      title: `4.5 Timing and Expiration`,
      nav: `Timeouts`,
      html: `      <pre><code>[mostro]
expiration_hours = 24        # How long an untaken order stays in the book
max_expiration_days = 15     # Longest expiration a maker may ask for
expiration_seconds = 900     # How long a taken order may wait for the hold invoice
                             # or the buyer's invoice before it returns to the book (15 min)

[lightning]
hold_invoice_expiration_window = 300  # Time a taker has to pay the invoice or add a payout one (5 min)
hold_invoice_cltv_delta = 144         # Lifetime of the escrow, in blocks (~1 day)</code></pre>

      <p>Note that <code>hold_invoice_expiration_window</code> belongs to <code>[lightning]</code>: written under <code>[mostro]</code> it is silently ignored. It must be greater than 0, and it is also the expiry of a taker's bond invoice.</p>

      <p>Once the seller's sats are locked, the buyer has roughly <code>hold_invoice_cltv_delta - escrow_deadline_margin_blocks</code> blocks to send the payment: 144 − 24 = 120 blocks, about 20 hours, with the defaults. When that runs out, Mostro cancels the trade if the buyer never marked the payment as sent, or opens a dispute if they did (see 4.9). Users see the countdown in the app.</p>`,
    },
    'antispam': {
      title: `4.6 Anti-Spam`,
      nav: `Anti-Spam`,
      html: `      <pre><code>[mostro]
pow = 0  # 0 = disabled; 10-20 = moderate. Start with 0.</code></pre>

      <p>A sharper gate is <code>pow_first_contact</code>. <code>pow</code> applies to every message, while <code>pow_first_contact</code> applies only to senders that are not part of an active trade and is checked before decryption. That keeps ongoing trades cheap while charging strangers real work:</p>
      <pre><code>[mostro]
pow = 0                  # ongoing trades
pow_first_contact = 16   # new orders and takes from unknown keys</code></pre>
      <p>Clients must mine at least that much. mostro-cli users have to set <code>POW</code> (or <code>-p</code>) to your value, or their new orders and takes are dropped without an answer.</p>

      <p>A stronger deterrent against people who take orders and walk away is the anti-abuse bond (see 4.11).</p>`,
    },
    'rpc': {
      title: `4.7 RPC Admin Interface (Optional)`,
      nav: `RPC Admin`,
      html: `      <pre><code>[rpc]
enabled = false
listen_address = "127.0.0.1"
port = 50051
# auth_token = "a-long-random-string"</code></pre>

      <p>This gRPC interface is for operator tooling: <code>grpcurl</code>, and <code>mostro-cli</code> for maintenance mode (<code>admsetmaintenance</code>, <code>admmaintenancestatus</code>, <code>admcancelpending</code>). Mostrix does <strong>not</strong> use it — it works over Nostr, so you do not need RPC for dispute resolution.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Security</div>
        <p>Keep <code>listen_address</code> as <code>"127.0.0.1"</code> and never expose the port to the internet. Set <code>auth_token</code> whenever the port is reachable through anything other than the local machine, such as an SSH tunnel or a sidecar container: a forwarded connection arrives as loopback, so the bind address alone is not authorization. With a token set, every mutating call must carry the header <code>authorization: Bearer &lt;token&gt;</code>.</p>
      </div>

      <p>Besides maintenance mode, the RPC carries the reputation calls <code>RevokeReputationImports</code> and <code>RebindReputationExport</code> (see 4.13). Both are accepted from loopback only, and mostro-cli has no command for them yet: use <code>grpcurl</code>. mostro-cli sends <code>MOSTRO_RPC_TOKEN</code> only to a loopback address or over <code>https://</code>, never in clear text to a remote host.</p>`,
    },
    'transport': {
      title: `4.8 Wire Protocol (Transport)`,
      nav: `Transport`,
      html: `      <p>Since v0.19.0 a Mostro node speaks <strong>only</strong> protocol v2: signed kind-14 events with NIP-44 encrypted content. Protocol v1 (NIP-59 gift wraps, kind 1059) was removed, and there is nothing to choose any more. Leave the <code>transport</code> line out of <code>settings.toml</code>; the template no longer has it.</p>

      <table class="guide-table">
        <thead><tr><th>Line in settings.toml</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td>none</td><td>Protocol v2. Recommended.</td></tr>
          <tr><td><code>transport = "nip44"</code></td><td>Protocol v2. Accepted and harmless.</td></tr>
          <tr><td><code>transport = "gift-wrap"</code></td><td><strong>Mostro refuses to start</strong>, with an error that tells you to delete the line.</td></tr>
        </tbody>
      </table>

      <p>Your node advertises <code>protocol_version</code> 2 in its kind 38385 info event. All current clients speak v2: the Mostro App, Mostrix 0.3.1 or later, mostro-cli 0.16.2 or later and Bosstro. A client that only speaks v1, such as an old Mostro Mobile build, gets no answer from your node: ask your users to update.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Upgrading from v0.18.x</div>
        <p>If your <code>settings.toml</code> still says <code>transport = "gift-wrap"</code>, delete that line before you update. The only way to keep serving protocol-v1 clients is to stay on mostrod 0.18.x, which no longer receives fixes.</p>
      </div>`,
    },
    'ln-safety': {
      title: `4.9 Lightning Safety Limits`,
      nav: `Lightning limits`,
      html: `      <p>These <code>[lightning]</code> settings bound how long your channels can stay locked and how many payouts can be unresolved at once. They all have defaults, so a config file from an older version usually still starts, but a fresh template ships them and they are worth knowing.</p>

      <pre><code>[lightning]
max_final_cltv_expiry_delta = 144
escrow_deadline_margin_blocks = 24
max_inflight_payouts = 100
max_inflight_payouts_per_destination = 10
payment_cltv_limit = 1008
allow_node_change = false</code></pre>

      <table class="guide-table">
        <thead><tr><th>Setting</th><th>What it protects</th></tr></thead>
        <tbody>
          <tr><td><code>max_final_cltv_expiry_delta</code></td><td>Rejects a payout invoice whose final CLTV would let the payee sit on your sats too long. 144 blocks (about a day) is the top of what real wallets ask for. Never set it to 0 — that rejects every invoice.</td></tr>
          <tr><td><code>escrow_deadline_margin_blocks</code></td><td>Safety margin before LND auto-cancels an accepted hold invoice. When the chain gets this close, Mostro cancels the trade or opens a dispute while the escrow still exists. Since v0.20.0 Mostro <strong>refuses to start</strong> unless it is at least 18 (LND's default <code>invoices.holdexpirydelta</code> of 12 plus 6 blocks of headroom) and below <code>hold_invoice_cltv_delta</code>. If you raised <code>holdexpirydelta</code>, keep this margin at least 6 blocks above it yourself. The value is published in your info event.</td></tr>
          <tr><td><code>max_inflight_payouts</code></td><td>Ceiling on unresolved payments across the node, so a payee who never settles cannot exhaust your HTLC slots. A gated payout is delayed, never dropped.</td></tr>
          <tr><td><code>max_inflight_payouts_per_destination</code></td><td>The same ceiling per destination pubkey, and the sharper of the two.</td></tr>
          <tr><td><code>payment_cltv_limit</code></td><td>Ceiling on the total timelock of a payout route. Must not exceed your LND's <code>--max-cltv-expiry</code>, and must sit at least 576 blocks above <code>max_final_cltv_expiry_delta</code> or honest payouts fail with "no route".</td></tr>
          <tr><td><code>allow_node_change</code></td><td>Boot guard for a changed Lightning node. Leave it <code>false</code> and see 5.8.</td></tr>
        </tbody>
      </table>

      <p>Note also that <code>max_routing_fee</code>, in the <code>[mostro]</code> block, now defaults to <code>0.002</code> (0.2%).</p>`,
    },
    'price': {
      title: `4.10 Bitcoin Price Sources`,
      nav: `Price sources`,
      html: `      <p>Mostro needs a BTC/fiat rate to price orders. With no <code>[price]</code> block it uses a single source, Yadio, through the now-deprecated <code>bitcoin_price_api_url</code>. Adding the block gives you several sources, combined by median with an outlier guard, so one API going down or returning a bad number does not move your prices.</p>

      <pre><code>[price]
update_interval_seconds = 300
max_price_staleness_seconds = 1800
outlier_threshold_pct = 5.0        # discard a source this far from the median (needs 3+ sources)
provider_timeout_seconds = 10
provider_failure_threshold = 3     # failures before a source is put on cooldown
provider_failure_cooldown_seconds = 120
publish_to_nostr = true            # publish aggregated rates as kind 30078

[price.providers.yadio]
enabled = true
url = "https://api.yadio.io"

[price.providers.coingecko]
enabled = true
url = "https://api.coingecko.com/api/v3"
# api_key = "CG-xxxx"              # optional, raises rate limits

[price.providers.currency_api]
enabled = true
url = "https://currency-api.pages.dev/v1"
fallback_urls = ["https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1"]
except = ["CUP", "MLC"]            # official rate only, don't mix with informal sources

[price.providers.blockchain]
enabled = true
url = "https://blockchain.info"</code></pre>

      <p>Each source takes <code>only</code> or <code>except</code> to scope which currencies it contributes, and <code>fallback_urls</code> for mirrors tried when the main URL fails. An enabled source missing a required secret fails at startup rather than silently producing no quotes.</p>

      <div class="callout tip">
        <div class="callout-title">💡 If price APIs are blocked in your country</div>
        <p>You can take rates from Nostr instead of HTTP, published by Mostro nodes you trust. This reuses the relays already in <code>[nostr]</code>, so it works wherever your node can already reach a relay. With several trusted nodes the freshest valid event wins.</p>
        <pre><code>[price.providers.nostr]
enabled = true
trusted_nodes = [
    # hex pubkeys of Mostro nodes you trust to publish accurate rates
]</code></pre>
      </div>

      <p>Operators serving Cuban pesos can add El Toque for informal-market CUP and MLC. It is opt-in, scoped to those two currencies, and needs a free token — an enabled El Toque without a <code>token</code> refuses to start.</p>

      <p>Keep <code>publish_to_nostr = true</code>. Besides feeding other nodes, the published rates tell the Mostro App which currencies your node can price at market: a code missing from them is offered at a fixed price only. To price stablecoins and bitcoin on other networks, see 4.12.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Adding any [price] block switches the price engine</div>
        <p>As soon as <code>settings.toml</code> has a <code>[price]</code> or <code>[price.providers.*]</code> table, Mostro uses the multi-source engine and ignores <code>bitcoin_price_api_url</code>. Make sure at least one market source (Yadio, CoinGecko, Currency API, Blockchain.com…) is enabled, or your node has no fiat rate and refuses every market-price order. Watch the startup log for warnings that start with <code>price:</code>.</p>
      </div>`,
    },
    'optional-blocks': {
      title: `4.11 Other Optional Blocks`,
      nav: `Optional blocks`,
      html: `      <p>More blocks you may meet in a fresh template. None is required. Three of them get a section of their own: <code>[price.providers.pegged]</code> (4.12), <code>[reputation_import]</code> / <code>[reputation_export]</code> (4.13) and <code>[health]</code> (5.4). <code>serbero_pubkey</code>, in <code>[mostro]</code>, is covered in 5.10.</p>

      <p><strong>Event retention.</strong> How long Mostro keeps each event kind before it expires. Omit the block entirely to accept the defaults.</p>
      <pre><code>[expiration]
order_days = 30        # order events (kind 38383)
rating_days = 90       # reputation history (kind 38384)
dispute_days = 90      # disputes, kept longer for auditing (kind 38386)
fee_audit_days = 365   # fee transparency (kind 8383)
dm_days = 30           # protocol-v2 direct messages (kind 14)</code></pre>

      <h4>Anti-abuse bonds</h4>
      <p><code>[anti_abuse_bond]</code> asks takers, makers or both to lock a small Lightning hold invoice next to the trade. Honest users get it back untouched; a solver can slash the bond of whoever acted in bad faith, and a share goes to the honest counterparty. Users see it as a "deposit" in the app, and the user docs explain it in their <em>Anti-Abuse Bond</em> chapter. All phases have shipped; it is disabled by default.</p>
      <pre><code>[anti_abuse_bond]
enabled = true
amount_pct = 0.01                 # bond = max(1% of the order, base_amount_sats)
base_amount_sats = 1000
apply_to = "take"                 # "take" | "make" | "both"
slash_on_waiting_timeout = false  # also slash whoever lets their step time out
slash_node_share_pct = 0.5        # share of a slashed bond the node keeps
payout_claim_window_days = 15     # time the winner has to claim their share
maker_bond_payment_timeout_seconds = 900
# bond_cltv_delta = 432           # see below</code></pre>
      <ul>
        <li>A maker who has not paid the bond yet can cancel the order, and an unpaid order expires after <code>maker_bond_payment_timeout_seconds</code>.</li>
        <li>A maker bond stays locked while the order rests in the book, so an order rests there for at most <code>bond_cltv_delta - hold_invoice_cltv_delta - 144</code> blocks (about 24 h with the defaults), whatever <code>expiration_hours</code> says.</li>
        <li><code>bond_cltv_delta</code> must be above <code>hold_invoice_cltv_delta + 144</code> and at most 864. On v0.20.2 its default is a fixed 432, so if you raised <code>hold_invoice_cltv_delta</code> to 288 or more, set it explicitly or Mostro refuses to start.</li>
        <li>Solvers slash with the bond option when they settle or cancel (Mostrix, Bosstro, or <code>mostro-cli admsettle/admcancel --slashseller/--slashbuyer</code>).</li>
      </ul>
      <p>Read the project's <code>docs/ANTI_ABUSE_BOND.md</code> before enabling it on a live node, and announce it to your users first.</p>

      <h4>Payer history (experimental)</h4>
      <p><code>[payer_history]</code> fights the triangulation scam, where a buyer pays from a third party's bank account. The buyer commits to a hash of the account they will pay from (<code>declare-payer</code>), the seller can compare it with the sender on their statement, and Mostro stores only an HMAC of it. As of v0.20.2 only the declaration is wired: the <code>require_declaration</code> gate and the history shown to sellers are not implemented yet, and no released client sends <code>declare-payer</code>. Leave it off for now.</p>
      <pre><code># [payer_history]
# enabled = false
# require_declaration = false</code></pre>

      <h4>Cashu escrow</h4>
      <p><code>[cashu]</code> is an experimental mode that runs without LND and escrows trades in Cashu tokens. It is not usable for real trading yet — trade actions after the take are still rejected — and it cannot be combined with anti-abuse bonds. Since v0.19.3 the maker picks the mint per order from an allowlist:</p>
      <pre><code># [cashu]
# enabled = false
# mint_urls = ["https://mint.example.com"]   # empty [] = any mint with a public host
# escrow_locktime_days = 15</code></pre>
      <p>The old single <code>mint_url</code> key is rejected: a config that still has it does not load.</p>`,
    },
    'pegged': {
      title: `4.12 Stablecoins and Bitcoin on Other Networks`,
      nav: `Stablecoins & other BTC`,
      html: `      <p>Since v0.20.2 a node can offer trades against six codes that are not fiat currencies: dollar stablecoins, and bitcoin on other networks. Lightning sats are always one side of the trade; the other side is paid on-chain, on Liquid, on Rootstock or on the stablecoin's network, directly between the two users.</p>

      <table class="guide-table">
        <thead><tr><th>Code</th><th>What it is</th><th>Priced as</th><th>Order amount in</th></tr></thead>
        <tbody>
          <tr><td><code>USDT</code></td><td>Tether USD</td><td>1 USD</td><td>whole coins</td></tr>
          <tr><td><code>USDC</code></td><td>USD Coin</td><td>1 USD</td><td>whole coins</td></tr>
          <tr><td><code>DOC</code></td><td>Dollar on Chain (Rootstock)</td><td>1 USD</td><td>whole coins</td></tr>
          <tr><td><code>BTC</code></td><td>Bitcoin on-chain</td><td>1 sat = 1 sat</td><td>sats</td></tr>
          <tr><td><code>LBTC</code></td><td>L-BTC on Liquid</td><td>1 sat = 1 sat</td><td>sats</td></tr>
          <tr><td><code>RBTC</code></td><td>RBTC on Rootstock</td><td>1 sat = 1 sat</td><td>sats</td></tr>
        </tbody>
      </table>

      <ul>
        <li><strong>Stablecoins</strong> are pegged 1:1 to the dollar, so a USDT order at market price is priced exactly like a USD order, premium included. The USD rate comes from your normal price sources (4.10); no extra API is called.</li>
        <li><strong>BTC, LBTC and RBTC</strong> are quoted 1:1 in sats, so they need no price API at all. An order for 100,000 means 100,000 sats of the asset (0.001 RBTC). At market price the premium is the price of the swap: a sell order (the maker sells Lightning sats) for 100,000 sats of RBTC with a 1% premium locks 99,000 Lightning sats, and the seller receives 100,000 sats of RBTC.</li>
        <li>No other code is supported: DAI, EURC and the rest are refused at startup if you list them under <code>only</code>.</li>
      </ul>

      <h4>Enabling it</h4>
      <p>You need mostrod v0.20.2 or later. Two settings work together: <code>fiat_currencies_accepted</code> says which codes orders may use, and the <code>pegged</code> provider says which of them have a market price.</p>
      <pre><code>[mostro]
# Keep your fiat currencies and add the new codes, in UPPERCASE
fiat_currencies_accepted = ['USD', 'EUR', 'USDT', 'USDC', 'DOC', 'LBTC', 'RBTC']

# A market price source for fiat (and therefore for the stablecoins).
# Required on v0.20.2 as soon as you add any [price.providers.*] table.
[price.providers.yadio]
enabled = true
url = "https://api.yadio.io"

[price.providers.pegged]
enabled = true
only = ["USDT", "USDC", "DOC", "LBTC", "RBTC"]   # or except = ["BTC"]; without either, all six</code></pre>
      <p>Restart Mostro and check the log. If you see <code>price: the pegged provider quotes ... but fiat_currencies_accepted does not list them</code>, add the missing codes: a quoted code that is not accepted publishes a rate but refuses every order. An empty <code>fiat_currencies_accepted = []</code> accepts every code.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Don't add the pegged block alone on v0.20.2</div>
        <p>Any <code>[price.providers.*]</code> table switches the node to the multi-source price engine and drops the legacy <code>bitcoin_price_api_url</code>. On v0.20.2 a <code>pegged</code> table with no market source next to it leaves the node without fiat rates: USD, EUR and USDT market orders are all refused. Always enable at least one market source, as in the example above. (The next release keeps the legacy Yadio source automatically in that case.) On v0.20.1 or older, don't add the block at all: the provider does not exist there.</p>
      </div>

      <p><strong>Fixed price only.</strong> To accept a code but not price it at market, list it in <code>fiat_currencies_accepted</code> and leave it out of <code>only</code>. Users then have to set a fixed amount of sats. That is a sensible choice for on-chain <code>BTC</code>, where network fees make small market orders awkward.</p>

      <h4>What your users see</h4>
      <p>The Mostro App 2.1.2 and later shows these codes in the currency picker under <em>Stablecoins</em> and <em>Bitcoin on other networks</em>, but only those your node accepts. BTC, LBTC and RBTC amounts are entered in sats. The payment method names the network (<code>USDT (Tron)</code>, <code>USDC (Base)</code>, <code>DOC (Rootstock)</code>, <code>LBTC (Liquid)</code>…), the seller shares a receiving address in the trade chat, and the buyer pastes the transaction ID there after paying. Mostro never checks the network or the address. mostro-cli and Mostrix can only create fixed-price orders in these codes for now.</p>

      <h4>Disputes need different evidence</h4>
      <p>Brief your solvers before you enable this. There is no bank statement: the evidence is the transaction ID pasted in the chat, which the solver checks in a block explorer for that network. For Liquid the buyer must share the <em>unblinded</em> link, because Liquid hides amounts. Transfers are irreversible, a payment on the wrong network can be lost, and the buyer pays the network fee: the seller must receive the full amount. The seller should release only after the transfer confirms. The window is the same as for fiat (about 120 blocks with the defaults, see 4.5), so a low-fee on-chain transfer can miss it.</p>

      <div class="callout tip">
        <div class="callout-title">💡 If a stablecoin loses its peg</div>
        <p>There is no automatic depeg guard yet. If USDT or USDC drifts away from one dollar, remove it from <code>only</code>, or add it to <code>except</code> if you don't use <code>only</code> (keep it in <code>fiat_currencies_accepted</code> if you still want fixed-price orders) and restart.</p>
      </div>`,
    },
    'reputation': {
      title: `4.13 Reputation Import and Export`,
      nav: `Reputation import`,
      html: `      <p>Users can bring the reputation they earned elsewhere — on the Telegram bot <strong>@lnp2pBot</strong> or on another Mostro node — into yours, so a trader who moves does not start from zero. Three figures travel: the number of ratings received, the average rating, and the date of the first trade. They arrive as an <em>attestation</em>: a small Nostr event (kind 38388) signed by the source, addressed to the user's identity and valid for 7 days. Your node adds them to the user's own reputation, and counterparties see a single merged figure.</p>
      <p>Both directions are opt-in and off by default. Import needs mostrod v0.20.0 or later; export, v0.20.1 or later. Users need the Mostro App in <strong>reputation mode</strong>: in full privacy mode there is no identity to carry a reputation.</p>

      <h4>Importing from lnp2pBot</h4>
      <p>lnp2pBot signs attestations with a dedicated key. Add it to your trust list:</p>
      <pre><code>[reputation_import]
enabled = true
max_lifetime_seconds = 604800   # longest attestation you accept (7 days; at most 30)

[[reputation_import.issuers]]
name = "lnp2pbot"               # never rename an entry once it has imports
keys = ["000004ac730537f1cf7d91f4f584a498a530a0205d35e816ebbaf23aec61e459"]
# npub1qqqqftrnq5mlrnmaj860tp9ynzjnpgpqt567s9hthter4mrpu3vsrta3em</code></pre>
      <p>Restart Mostro. Your info event (kind 38385) now carries a <code>reputation_import_issuers</code> tag, which is how the app knows it can offer the import on your node. Several community nodes already trust this key.</p>
      <p>The bot exports an account with at least 10 completed trades and 5 ratings received that is not banned. The user starts from the app (<em>Settings → Network → Reputation → Import reputation → Get it from lnp2pBot</em>), confirms in Telegram that the npub matches, and pastes back the message the bot sends.</p>

      <h4>Trusting another Mostro node</h4>
      <p>A node that exports announces its signing key in the <code>reputation_issuer</code> tag of its info event. Read it with the command in 5.4 (look for that tag), confirm it with the operator, and add an entry for it:</p>
      <pre><code>[[reputation_import.issuers]]
name = "mostro-example"         # a stable local name of your choice
keys = ["&lt;that node's reputation_issuer key, npub or hex&gt;"]</code></pre>
      <ul>
        <li>The <code>name</code> is what imports are deduplicated on. Never rename an entry that already has imports: Mostro refuses to start if a key moves to another name.</li>
        <li>A key may belong to one entry only. To follow a key rotation, add the new key to the same entry and remove the old one once its attestations have expired.</li>
        <li>Trust only sources you trust: a large imported record outweighs local ratings.</li>
      </ul>
      <p>A user can import once from each source on each node, and the import cannot be undone by the user. Figures are a snapshot: later ratings on the source do not follow.</p>

      <h4>Exporting from your node</h4>
      <p>Export lets your users carry the reputation they earned <em>on your node</em> to another one. Only ratings received on your node travel, never imported ones. The user needs 10 completed trades and 5 ratings received on your node, and must not be banned.</p>
      <p>Attestations are signed with a dedicated key, never your node's key. Generate one and keep it next to the nsec, in the environment or in <code>&lt;config-dir&gt;/.env</code>:</p>
      <pre><code># Docker Hub layout; use your own config directory otherwise
echo "MOSTRO_REPUTATION_ISSUER_SK=$(openssl rand -hex 32)" >> ~/mostro-config/.env
sudo chown 1000:1000 ~/mostro-config/.env
chmod 600 ~/mostro-config/.env</code></pre>
      <pre><code>[reputation_export]
enabled = true
issuer_key_env = "MOSTRO_REPUTATION_ISSUER_SK"
lifetime_seconds = 604800       # 1 to 604800 (7 days)</code></pre>
      <p>Mostro refuses to start if the variable is missing or invalid, if it holds your node's own key, or if its public key is also in your <code>[reputation_import]</code> list. Once it runs, your info event carries the <code>reputation_issuer</code> tag: share that key with the operators who want to trust your node. Back the key up with your other secrets. If it leaks, anyone can mint attestations in your node's name until the other operators remove it and revoke the imports.</p>

      <h4>Revoking imports and rebinding exports</h4>
      <p>Two admin RPC calls (4.7) handle the rare cases. They are accepted from loopback only; add <code>-H 'authorization: Bearer &lt;token&gt;'</code> if you set <code>auth_token</code>. Run them from a checkout of the <code>mostro</code> repository, which holds <code>proto/admin.proto</code>.</p>
      <p><strong>A trusted issuer's key leaked.</strong> First remove the key from its entry and restart, then reverse every import signed with it (add <code>"imported_after": &lt;unix time&gt;</code> to limit it to recent ones):</p>
      <pre><code>grpcurl -plaintext -import-path proto -proto admin.proto \\
  -d '{"issuer_key": "&lt;npub or hex&gt;", "reason": "key leaked"}' \\
  127.0.0.1:50051 mostro.admin.v1.AdminService/RevokeReputationImports</code></pre>
      <p>Each import is reversed exactly, ratings received since then are kept, and users can import again with an attestation from the new key.</p>
      <p><strong>A user lost the identity their export is bound to.</strong> The first export binds the account to one identity; moving it normally needs an authorization signed with the old identity, which the app produces. If the old identity is gone, you can move it yourself after verifying the person:</p>
      <pre><code>grpcurl -plaintext -import-path proto -proto admin.proto \\
  -d '{"identity": "&lt;old npub&gt;", "new_identity": "&lt;new npub&gt;", "reason": "support ticket"}' \\
  127.0.0.1:50051 mostro.admin.v1.AdminService/RebindReputationExport</code></pre>
      <p>A user who restores the same 12 words keeps the same identity and needs none of this.</p>`,
    },
    'operating': {
      title: `5. Operating Your Mostro Node`,
      nav: `5. Operating your node`,
      navShort: `5. Operation`,
      html: ``,
    },
    'disputes': {
      title: `5.1 How Disputes Work`,
      nav: `Disputes`,
      html: `      <p>Disputes are your most important operational responsibility.</p>

      <p><strong>When do disputes happen?</strong></p>
      <ul>
        <li>The buyer says they paid, the seller says they didn't receive it</li>
        <li>The seller refuses to release Bitcoin after receiving payment</li>
        <li>Either party becomes unresponsive</li>
      </ul>

      <p><strong>The dispute process:</strong></p>
      <ol>
        <li><strong>User opens a dispute</strong> — Either party clicks "Dispute" in their client</li>
        <li><strong>Mostro flags the order</strong> — Status changes to "Dispute", funds remain locked</li>
        <li><strong>Arbiter takes the case</strong> — An admin assigned to your node investigates</li>
        <li><strong>Investigation</strong> — Communicates with both parties, requests evidence</li>
        <li><strong>Resolution</strong> — Arbiter decides: release to buyer, or refund to seller. With anti-abuse bonds enabled (4.11), the arbiter can also slash the bond of whoever acted in bad faith.</li>
      </ol>

      <p>The arbiter writes to each party on a private dispute chat, which the Mostro App shows under <em>Chat → Disputes</em>. Either party can also share the key of their trade chat with the arbiter, who then reads that conversation in Mostrix's Observer tab or in Bosstro. The parties can still finish the trade on their own: if the seller releases, or both agree to a cooperative cancel, Mostro closes the dispute by itself and tells the arbiter.</p>

      <p>If you run <strong>Serbero</strong> (5.10), it alerts your arbiters the moment a dispute opens and can take the first steps with the parties. It never decides or moves funds.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Important</div>
        <p>Choose your arbiters carefully. They have the power to decide where locked funds go. Pick trusted, impartial community members. Having 2–3 arbiters is recommended.</p>
      </div>


      <h4>Solver permission levels</h4>

      <p>A solver can be registered read-only or with full powers. Both levels can take a dispute and talk to the parties, but only a read-write solver can decide where the money goes.</p>

      <table class="guide-table">
        <thead><tr><th>Registered as</th><th>Can do</th><th>Cannot do</th></tr></thead>
        <tbody>
          <tr><td><code>npub1...:read</code></td><td>Take a dispute, read it, message both parties</td><td>Settle or cancel the order</td></tr>
          <tr><td><code>npub1...:read-write</code></td><td>Everything, including settling and cancelling</td><td>—</td></tr>
        </tbody>
      </table>

      <p>A bare <code>npub1...</code> with no suffix defaults to read-write, and so does registration over the RPC interface. Start a new arbiter on <code>:read</code> while they learn the process, then re-register them read-write once you trust their judgement. A read-write solver can take over a dispute that a read-only one (or Serbero) is holding.</p>

      <p>Your arbiters can work from a terminal with Mostrix (5.2) or from an Android phone with Bosstro (5.11).</p>`,
    },
    'mostrix': {
      title: `5.2 Mostrix — Your Admin Tool`,
      nav: `Mostrix`,
      html: `      <p>Mostrix is a terminal (TUI) Mostro client with two modes: a <strong>user</strong> mode to trade, and an <strong>admin</strong> mode for dispute resolution — take disputes, chat with both parties, settle or cancel, slash bonds and add solvers. If you run a Mostro node, you need Mostrix. It talks to your node over Nostr only, never over the RPC interface.</p>

      <h4>Option A: Download Pre-built Binary (Recommended)</h4>
      <p>Download the latest release for your platform from <a href="https://github.com/MostroP2P/mostrix/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a>:</p>

      <pre><code># Linux (x86_64)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-unknown-linux-musl

# Linux (ARM64 / Raspberry Pi 4 and 5, 64-bit OS)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-unknown-linux-musl

# Linux (ARMv7 / 32-bit Raspberry Pi OS)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-armv7-unknown-linux-gnueabi

# macOS (Apple Silicon / Intel)
curl -LO https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-apple-darwin
curl -LO https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-apple-darwin

# FreeBSD: mostrix-x86_64-unknown-freebsd
# Windows: download mostrix-x86_64-pc-windows-msvc.exe from the releases page</code></pre>

      <p>Verify the download before running it, as described just below.</p>

      <div class="callout tip">
        <div class="callout-title">🔐 Verify the Release</div>
        <p>Always verify the binary before running it. Import the maintainers' keys once:</p>
        <pre><code>curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/negrunch.asc | gpg --import
curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/arkanoider.asc | gpg --import</code></pre>
        <p>Signatures are detached files named <code>manifest.txt.sig.&lt;maintainer&gt;</code>. Recent releases carry only <code>manifest.txt.sig.arkanoider</code> (key <code>2E98 6CA1 C5E7 EA16 35CD 059C 4989 CC74 15A4 3AEC</code>), so check the release page and download the ones it actually lists:</p>
        <pre><code>wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt
wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt.sig.arkanoider

# Verify each signature you downloaded
gpg --verify manifest.txt.sig.arkanoider manifest.txt

# Then check the binary's hash against the manifest
# (manifest lines carry an artifact-&lt;target&gt;/ prefix, stripped here)
sed 's#  artifact-[^/]*/#  #' manifest.txt | sha256sum -c --ignore-missing</code></pre>
        <p>One valid signature from a maintainer key you trust is enough. If a <code>wget</code> returns 404, that signature simply was not published for this release — do not treat a missing file as a verified one.</p>
      </div>

      <p>Only once a signature and the hash check out, make the binary executable and start it:</p>
      <pre><code>chmod +x mostrix-x86_64-unknown-linux-musl
./mostrix-x86_64-unknown-linux-musl</code></pre>

      <h4>Option B: Build from Source</h4>
      <p>If you prefer to compile from source or need a platform not in the releases:</p>

      <pre><code># Install dependencies (Ubuntu/Debian)
sudo apt install -y cmake build-essential pkg-config

# Install Rust (if not already installed; Mostrix needs 1.97 or newer)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Clone and build
git clone https://github.com/MostroP2P/mostrix.git
cd mostrix
cargo build --release

# Run
./target/release/mostrix</code></pre>

      <h4>First Run &amp; Configuration</h4>
      <p>On first run Mostrix creates <code>~/.mostrix/</code> with a database holding a new 12-word seed and a <code>settings.toml</code>, then shows a <strong>Backup New Keys</strong> popup with the 12 words. Write them down. A <code>settings.toml</code> placed next to the binary takes precedence (portable mode).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Important: Point Mostrix at Your Node</div>
        <p>The generated config points at Mostro's default public node. Switch it to <strong>your own node</strong>: <strong>Settings → Select Mostro Instance</strong>, then paste your node's npub or hex, or edit <code>mostro_pubkey</code> in <code>~/.mostrix/settings.toml</code> and restart.</p>
      </div>

      <p>For admin mode (dispute resolution), the relevant keys are:</p>
      <pre><code># ~/.mostrix/settings.toml
mostro_pubkey = "YOUR_MOSTRO_PUBKEY"         # hex or npub
nsec_privkey  = "nsec1..."                   # your trader identity, derived from the seed — don't edit
admin_privkey = "nsec1..."                   # a registered solver's key — see below
relays = ["wss://relay.mostro.network"]
currencies_filter = []                       # empty = show all currencies
user_mode = "admin"                          # or Settings → Switch Mode
# trusted_dm_senders = ["npub1..."]          # Serbero's npub, to see its reports (5.10)</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Which key goes in admin_privkey?</div>
        <p>Mostro accepts dispute actions from its own key (the daemon's <code>nsec_privkey</code>) and from registered solver keys. Any other key is rejected. Only the daemon key can <em>add</em> solvers, so use it just for that and keep it on the server. For everyday dispute work, register a solver key — read-write to settle or cancel — and put that one in <code>admin_privkey</code>. Never reuse <code>nsec_privkey</code>.</p>
        <pre><code>ADMIN_NSEC=nsec1&lt;daemon-key&gt; MOSTRO_PUBKEY=&lt;node-npub&gt; \\
  RELAYS=wss://relay.mostro.network \\
  mostro-cli admaddsolver -n npub1solver...</code></pre>
        <p>Mostrix's <strong>Settings → Add Dispute Solver</strong> does the same thing, with Left/Right to choose Read or Read-Write (default Read-Write).</p>
      </div>

      <h4>Admin mode in practice</h4>
      <ul>
        <li><strong>Disputes Pending</strong>: Enter takes a dispute. <kbd>Ctrl+T</kbd> takes one over from Serbero.</li>
        <li><strong>Disputes Management</strong>: Tab cycles the BUYER, SELLER and SERBERO chats. <kbd>Shift+F</kbd> finalizes: pay the buyer, refund the seller, and slash a bond when the node has them.</li>
        <li><strong>Observer</strong>: paste the trade-chat key a party shared to read their conversation.</li>
        <li><strong>Settings → Link Watchdog</strong>: links the solver to mostro-watchdog (5.3), so they get a private Telegram ping when a party writes in a dispute they took.</li>
        <li><kbd>Ctrl+H</kbd> shows context help. Quit from the <strong>Exit</strong> tab.</li>
      </ul>`,
    },
    'watchdog': {
      title: `5.3 mostro-watchdog — Telegram Alerts for Disputes and Node Health`,
      nav: `mostro-watchdog`,
      html: `      <p><code>mostro-watchdog</code> is a Telegram bot for your admin team. It watches your node over Nostr and posts to a private group or channel:</p>
      <ul>
        <li><strong>Disputes:</strong> one message per dispute, sent when it opens and edited as it goes on (taken, Serbero's steps, takeover, resolution). Each edit gets a short reply so phones still ring.</li>
        <li><strong>Node health:</strong> an alert when Mostro stops <em>working</em>, not only when it stops running: an info event gone silent, maintenance mode and, with Mostro v0.20.0 or later, LND out of sync or behind the chain, buyer payouts stuck or failing, HTLCs close to expiry and inactive channels. Only changes are posted: an alert, reminders while it lasts, and "resolved".</li>
        <li><strong>Serbero's progress</strong> on each dispute, if you run Serbero (5.10).</li>
        <li><strong>Private pings to solvers</strong> when a party writes to them in a dispute they took.</li>
      </ul>

      <p><strong>Option A: install script (recommended).</strong> It downloads the latest release, checks it against <code>manifest.txt</code> and installs to <code>/usr/local/bin</code>:</p>
      <pre><code>curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash
# or into another directory:
curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash -s -- --install-dir ~/.local/bin</code></pre>

      <p><strong>Option B: manual binary download</strong></p>
      <pre><code># Linux x86_64 (Intel/AMD); use mostro-watchdog-linux-aarch64 on ARM64
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/mostro-watchdog-linux-x86_64
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/manifest.txt
sha256sum -c manifest.txt --ignore-missing
chmod +x mostro-watchdog-linux-x86_64
sudo mv mostro-watchdog-linux-x86_64 /usr/local/bin/mostro-watchdog</code></pre>
      <p>macOS and Windows binaries are on the releases page too.</p>

      <p><strong>Option C: build from source</strong></p>
      <pre><code>sudo apt install -y cmake pkg-config libssl-dev
git clone https://github.com/MostroP2P/mostro-watchdog.git
cd mostro-watchdog
cargo build --release
sudo cp target/release/mostro-watchdog /usr/local/bin/</code></pre>

      <h4>Configuration</h4>
      <p>The watchdog keeps its state (<code>disputes.db</code>) next to <code>config.toml</code>, so give it a directory of its own:</p>
      <pre><code>sudo useradd --system --home-dir /var/lib/mostro-watchdog --shell /usr/sbin/nologin mostro-watchdog
sudo install -d -o mostro-watchdog -g mostro-watchdog -m 700 /var/lib/mostro-watchdog
curl -LO https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/config.example.toml
sudo install -o mostro-watchdog -g mostro-watchdog -m 600 config.example.toml /var/lib/mostro-watchdog/config.toml
sudo nano /var/lib/mostro-watchdog/config.toml</code></pre>
      <pre><code>[mostro]
pubkey = "YOUR_MOSTRO_PUBKEY"         # hex or npub

[nostr]
# Bootstrap relays: the watchdog reads your node's relay list (NIP-65)
# from them, then follows the relays your node advertises.
relays = ["wss://relay.mostro.network", "wss://nos.lol"]

[telegram]
bot_token = "YOUR_BOT_TOKEN"          # from @BotFather
chat_id = -1001234567890              # your admin group or channel

[health]
info_silence_threshold = 900          # 3 × Mostro's publish_mostro_info_interval (300 by default)
mostro_health_enabled = true          # needs Mostro v0.20.0+
event_alert_threshold = 0             # see below</code></pre>
      <p>To find <code>chat_id</code>, add the bot to the group, send a message there and open <code>https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code>.</p>
      <p>The older "event silence" alert fires whenever no dispute event arrived for two hours, which on most nodes is just a quiet afternoon. The info and health checks detect a stopped node reliably, so <code>0</code> turns it off.</p>

      <h4>The watchdog's Nostr key</h4>
      <p>Health details, Serbero alerts, solver pings and the watchdog's own heartbeat need a key of its own, passed in the environment only:</p>
      <pre><code>sudo sh -c 'umask 077; echo "WATCHDOG_NOSTR_PRIVATE_KEY=$(openssl rand -hex 32)" > /etc/mostro-watchdog.env'</code></pre>
      <p>Back that file up. At startup the watchdog logs its public key. Put it in Mostro's <code>settings.toml</code> and restart Mostro, so your liquidity, payout failures and HTLC expiry are encrypted to the watchdog alone:</p>
      <pre><code>[health]
watchdog_pubkey = "WATCHDOG_PUBKEY"   # hex or npub</code></pre>
      <p>This adds a public <code>p</code> tag to your health event that links your node to the watchdog's key. Without it, the watchdog still alerts on the public status.</p>

      <h4>Run it as a service</h4>
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

      <h4>Optional: Serbero and solver alerts</h4>
      <p>Add an empty section for each one you want. Both use the key above:</p>
      <pre><code>[serbero]                 # Serbero's steps on each dispute's message
[solver_notifications]    # private pings to solvers</code></pre>
      <p>For Serbero, also add the watchdog's <strong>hex</strong> public key to Serbero's <code>config.toml</code> as an observer — never as a solver — and restart Serbero. Observers get one line per step, never what the parties wrote. The watchdog finds Serbero on its own through your node's <code>serbero_pubkey</code> (5.10).</p>
      <pre><code>[[observers]]
pubkey = "WATCHDOG_PUBKEY_HEX"</code></pre>
      <p>For solver pings, each solver sends <code>/link</code> to the bot in a private chat and enters the code in Mostrix 0.3.6 or later, under <strong>Settings → Link Watchdog</strong>. The bot answers commands only in private chats: <code>/version</code>, <code>/link</code>, <code>/unlink</code>, <code>/status</code>.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Watch the watchdog</div>
        <p>A silent channel does not prove the watchdog is alive. You can run a second one on another machine, each with its <strong>own</strong> <code>WATCHDOG_NOSTR_PRIVATE_KEY</code> and the other's public key in <code>[health].peer_watchdogs</code>. Health alerts can also go to a chat of their own with <code>[health].alerts_chat_id</code>. The project's <code>config.example.toml</code> documents every option.</p>
      </div>`,
    },
    'monitoring': {
      title: `5.4 Monitoring and Node Health`,
      nav: `Monitoring`,
      html: `      <p>Your node needs to be running 24/7.</p>

      <pre><code># Native
systemctl status mostro.service
journalctl -u mostro -f
journalctl -u mostro | grep -E "(error|warn|connected)" --ignore-case

# Docker Hub (Option A)
docker ps --filter name=mostro
docker logs -f mostro

# Docker Build (Option B)
docker compose -f /opt/mostro/docker/compose.yml ps
docker compose -f /opt/mostro/docker/compose.yml logs -f mostro</code></pre>

      <h4>Running is not the same as working</h4>
      <p>In October 2026 a production node's LND stopped following the chain for about 21 hours. Mostro kept running and kept accepting trades, but every buyer payout failed. A process check, a port check or an uptime robot would have shown green the whole time.</p>
      <p>Since v0.20.0 Mostro checks this itself. Every minute it publishes a signed <strong>health event</strong> (kind 38389) with an overall status (<code>ok</code>, <code>degraded</code> or <code>down</code>), a state for each check (<code>lnd_sync</code>, <code>payouts</code>, <code>relays</code>, <code>database</code>) and LND's block height. It is on by default; this block only shows the defaults:</p>
      <pre><code>[health]
enabled = true                  # publish the health event (kind 38389)
interval = 60                   # seconds between publications, 30 to 3600
watchdog_pubkey = ""            # your watchdog's key: detailed metrics are encrypted to it (5.3)
lnd_unsynced_fail_after = 600   # must be greater than 60
auto_maintenance_on_lnd_unsynced = true
lnd_resynced_clear_after = 300</code></pre>
      <p>When LND stops being synced, Mostro protects your users on its own:</p>
      <ul>
        <li>After 60 seconds, outgoing payments (buyer payouts, dev fees, bond payouts) <strong>wait</strong> instead of failing. A waiting payout does not use up one of the buyer's payment attempts, and it goes out once LND recovers.</li>
        <li>After <code>lnd_unsynced_fail_after</code> seconds, Mostro enters maintenance mode with the reason <code>lnd_unsynced</code>: no new orders or takes, while open trades can still finish. It leaves maintenance once LND has been synced for <code>lnd_resynced_clear_after</code> seconds. Maintenance you turned on yourself (5.8) is never lifted automatically.</li>
      </ul>
      <p>The log tells the story: <code>LND reports synced_to_chain = false ...; outgoing payments wait after 60s</code>, then <code>maintenance mode ON (reason lnd_unsynced)</code>, and later <code>LND is synced to chain again</code> and <code>maintenance mode OFF</code>. Check LND with <code>lncli getinfo</code> (<code>synced_to_chain</code>, <code>block_height</code>). Set <code>auto_maintenance_on_lnd_unsynced = false</code> to opt out of the automatic maintenance.</p>
      <p>Mostro only knows what its own LND tells it, and a node stuck on a stale chain does not always know it. That is why the two readers below compare its block height with public explorers:</p>
      <ul>
        <li><strong>Private alerts:</strong> mostro-watchdog (5.3) tells your Telegram when something breaks and when it clears.</li>
        <li><strong>Public status page:</strong> <a href="https://status.mostro.network" target="_blank" rel="noopener noreferrer">status.mostro.network</a> shows the live state and 90-day uptime of every listed Mostro. Your users see it too.</li>
      </ul>

      <h4>The public status page</h4>
      <p>The page (<a href="https://github.com/MostroP2P/semaforo" target="_blank" rel="noopener noreferrer">Semáforo</a>) reads the health events straight from the relays and verifies them in the visitor's browser, with no backend. Each node gets one colour:</p>
      <table class="guide-table">
        <thead><tr><th>Colour</th><th>When</th></tr></thead>
        <tbody>
          <tr><td>🟢 Operational</td><td>Status <code>ok</code>, a fresh event, and LND less than 3 blocks behind the explorers</td></tr>
          <tr><td>🟡 Degraded</td><td>Status <code>degraded</code>, maintenance mode, or no independent block height to compare with</td></tr>
          <tr><td>🔴 Down</td><td>Status <code>down</code>, LND 3 or more blocks behind, or no valid event recently ("Not reporting")</td></tr>
          <tr><td>⚪ Not monitored</td><td>Listed, but not yet expected to publish</td></tr>
        </tbody>
      </table>
      <p>Under each node, 90 daily bars and an uptime figure come from samples taken every 10 minutes.</p>
      <p><strong>Getting your node listed.</strong> Only curated nodes are shown, because anyone can sign an always-green event:</p>
      <ol>
        <li>Your node is listed as a community on this site.</li>
        <li>It runs Mostro v0.20.0 or later with the health event on, and publishes to at least one of <code>wss://relay.mostro.network</code>, <code>wss://mostro-p2p.tech</code> or <code>wss://relay.shadowbip.com</code>.</li>
        <li>Open an issue or pull request on <a href="https://github.com/MostroP2P/semaforo" target="_blank" rel="noopener noreferrer">MostroP2P/semaforo</a> to add it to <code>trusted.json</code> with its hex pubkey, name, region and network. Your avatar is copied from your Nostr profile picture.</li>
      </ol>

      <h4>Checking your node from the outside</h4>
      <p>Your node republishes an info event (kind 38385) describing itself: fees, currencies, protocol version, maintenance flag, bond settings, Serbero and reputation keys. Reading it and the health event from a relay is the quickest way to confirm the outside world sees what you think it does.</p>
      <pre><code>cargo install nostreq nostcat
# Info event
nostreq --kinds 38385 --limit 1 --authors YOUR_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq
# Health event: status, checks, LND block height
nostreq --kinds 38389 --limit 1 --authors YOUR_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq '.tags'</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Host checks still help</div>
        <p>A host ping (<a href="https://uptimerobot.com/" target="_blank" rel="noopener noreferrer">UptimeRobot</a> or similar) still tells you when the VPS itself is unreachable. It cannot tell you whether Mostro is paying buyers; the health event can.</p>
      </div>`,
    },
    'updating': {
      title: `5.5 Updating Mostro`,
      nav: `Updating`,
      html: `      <p>Updating replaces the <code>mostrod</code> binary and nothing else: <code>settings.toml</code> and <code>mostro.db</code> stay where they are. Database migrations run on their own when the new version starts, so there is no extra step.</p>

      <h4>Before you update</h4>
      <ol>
        <li><strong>Read the <a href="https://github.com/MostroP2P/mostro/releases" target="_blank" rel="noopener noreferrer">release notes</a></strong> of the version you are moving to. Your <code>settings.toml</code> is never overwritten: compare it with the new <code>settings.tpl.toml</code>. Most new features stay off until you add them, but a missing block takes its defaults, and some defaults are on (the health event of 5.4, for example).</li>
        <li><strong>Back up the database</strong> with the commands in 5.6. You need that backup to roll back.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Coming from v0.18.x</div>
        <p>Check these before you start the new version, or it may refuse to start:</p>
        <ul>
          <li>Delete any <code>transport = "gift-wrap"</code> line (4.8). Users on old protocol-v1 clients have to update.</li>
          <li><code>escrow_deadline_margin_blocks</code> must be at least 18 and below <code>hold_invoice_cltv_delta</code> (4.9).</li>
          <li>Under <code>[cashu]</code>, <code>mint_url</code> became <code>mint_urls = [...]</code> (4.11).</li>
          <li>With anti-abuse bonds on and <code>hold_invoice_cltv_delta</code> of 288 or more, set <code>bond_cltv_delta</code> explicitly (4.11).</li>
          <li>Since v0.20.0 the health event is published by default, and Mostro may enter maintenance on its own when LND is out of sync (5.4).</li>
        </ul>
      </div>

      <h4>Docker Hub (<code>docker run</code>)</h4>
      <pre><code>export MOSTRO_TAG={{version}}
# Pull first: the running node stays up during the download
docker pull mostrop2p/mostro:$MOSTRO_TAG
docker stop mostro
docker rm mostro
docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:$MOSTRO_TAG</code></pre>
      <p>Use the same flags you installed with (drop <code>--add-host</code> if LND is on another server). If you don't remember them, check <code>docker inspect mostro</code> before removing the container.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ <code>docker restart</code> is not an update</div>
        <p><code>docker restart</code> starts the same container again, from the image it was created with. To run a new version the container has to be created again: <code>docker rm</code> + <code>docker run</code>, or <code>docker compose up -d</code> after changing the tag.</p>
      </div>

      <h4>Docker Hub (Docker Compose)</h4>
      <pre><code>export MOSTRO_TAG={{version}}
COMPOSE=~/mostro-docker/compose.yml
# Point the image line at the new tag, and check it
sed -i "s|image: mostrop2p/mostro:.*|image: mostrop2p/mostro:$MOSTRO_TAG|" $COMPOSE
grep image: $COMPOSE
docker compose -f $COMPOSE pull
# Recreates the container because the image changed
docker compose -f $COMPOSE up -d</code></pre>

      <h4>Docker Build</h4>
      <pre><code>cd /opt/mostro
git fetch --tags
git checkout {{version}}
make docker-build
make docker-down
make docker-up</code></pre>

      <h4>Native</h4>
      <pre><code>cd /opt/mostro
git fetch --tags
git checkout {{version}}
cargo build --release
install target/release/mostrod /usr/local/bin
cargo clean
systemctl restart mostro.service</code></pre>

      <h4>Check the new version</h4>
      <pre><code># Docker Hub (docker run)
docker exec mostro mostrod --version
docker logs -f mostro

# Docker Hub (Docker Compose)
docker compose -f ~/mostro-docker/compose.yml exec mostro mostrod --version
docker compose -f ~/mostro-docker/compose.yml logs -f mostro

# Docker Build
docker compose -f /opt/mostro/docker/compose.yml exec mostro mostrod --version
docker compose -f /opt/mostro/docker/compose.yml logs -f mostro

# Native
mostrod --version
journalctl -u mostro -f</code></pre>
      <p>Look for the same startup messages as on the first run (Step 11 of Option A).</p>

      <h4>Rolling back</h4>
      <p>If the new version misbehaves, go back to the previous tag. The new version may already have migrated the database, and an older <code>mostrod</code> can refuse to start with it, so restore the backup you took before updating:</p>
      <pre><code>docker stop mostro
docker rm mostro
# replace YYYYMMDD with the date of the backup taken before updating
BACKUP=/root/mostro-backups/mostro.db.YYYYMMDD
cp "$BACKUP" ~/mostro-config/mostro.db
rm -f ~/mostro-config/mostro.db-wal ~/mostro-config/mostro.db-shm
chown 1000:1000 ~/mostro-config/mostro.db
# then start the previous tag: same docker run command,
# or put the old tag back in compose.yml and run docker compose up -d</code></pre>
      <p>Docker Build and native work the same way: check out the previous tag, rebuild, and restore the database before starting.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Don't change Lightning nodes at the same time</div>
        <p>Updating Mostro is safe whenever you like. Pointing it at a <strong>different</strong> Lightning node is not: drain the escrow first, see 5.8.</p>
      </div>`,
    },
    'backups': {
      title: `5.6 Backups`,
      nav: `Backups`,
      html: `      <p>Critical files to back up: <code>settings.toml</code>, the <code>.env</code> file if you keep your nsec there (see 4.1) or your reputation export key (4.13), and <code>mostro.db</code> (order history, reputation). If you enable payer history (4.11), keep the database backups apart from the nsec: the history is keyed by it.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Don't copy a live database with cp</div>
        <p>SQLite runs in WAL mode, so recent writes live in <code>mostro.db-wal</code> until they are checkpointed. Copying only <code>mostro.db</code> while Mostro is running can produce a backup that is missing the newest trades. Use SQLite's own backup command, which is safe on a live database and writes a single consistent file.</p>
      </div>

      <pre><code># Manual backup — Docker Hub:
mkdir -p /root/mostro-backups
sqlite3 ~/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp ~/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp ~/mostro-config/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null

# Manual backup — Docker Build (Option B):
sqlite3 /opt/mostro/docker/config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/docker/config/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp /opt/mostro/docker/config/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null

# Manual backup — Native:
sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp /opt/mostro/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null</code></pre>

      <p><strong>Automated daily backup</strong> (add to crontab with <code>crontab -e</code>):</p>
      <pre><code># Docker Hub (Option A):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /root/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /root/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d); cp /root/mostro-config/.env /root/mostro-backups/env.$(date +\\%Y\\%m\\%d) 2>/dev/null

# Docker Build (Option B):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/docker/config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/docker/config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d); cp /opt/mostro/docker/config/.env /root/mostro-backups/env.$(date +\\%Y\\%m\\%d) 2>/dev/null

# Native (Option C):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d); cp /opt/mostro/.env /root/mostro-backups/env.$(date +\\%Y\\%m\\%d) 2>/dev/null</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Critical</div>
        <p>Your <code>nsec_privkey</code> in <code>settings.toml</code> IS your node's identity. If you lose it, you lose your reputation and all users must reconnect to a new identity. <strong>Keep an offline copy.</strong></p>
      </div>`,
    },
    'activity': {
      title: `5.7 Reviewing Trade Activity`,
      nav: `Activity`,
      html: `      <pre><code># Count all orders
sqlite3 /path/to/mostro.db "SELECT COUNT(*) FROM orders;"

# Recent successful trades
sqlite3 /path/to/mostro.db "SELECT id, fiat_code, fiat_amount, amount, fee, status, created_at FROM orders WHERE status = 'success' ORDER BY created_at DESC LIMIT 10;"

# Pending orders
sqlite3 /path/to/mostro.db "SELECT id, fiat_code, fiat_amount, status, created_at FROM orders WHERE status = 'pending';"

# Fee revenue: orders.fee stores each party's half, so the node's gross fee is fee*2 and the dev fee is deducted from it
sqlite3 /path/to/mostro.db "SELECT SUM(fee*2) AS gross_fees, SUM(dev_fee) AS dev_fees, SUM(fee*2 - COALESCE(dev_fee, 0)) AS net_fees FROM orders WHERE status = 'success';"</code></pre>`,
    },
    'ln-migration': {
      title: `5.8 Maintenance Mode and Changing Your Lightning Node`,
      nav: `Changing LN node`,
      html: `      <p>Hold invoices, bonds and in-flight payouts belong to the Lightning node that created them. Pointing Mostro at a different node while any of that is open would strand those trades, so the daemon <strong>refuses to start</strong> when it sees a new LND identity with escrow still bound to the old one:</p>
      <pre><code>REFUSING TO START: Lightning node changed from ... but escrow is still bound to the old node</code></pre>

      <p>Maintenance mode is how you drain first. While it is on, new orders and takes are rejected and open trades keep working, so escrow can settle. It needs the RPC interface enabled (see 4.7), and the call is accepted from loopback only: run it on the node host, or through <code>ssh -N -L 50051:127.0.0.1:50051 user@node</code>.</p>
      <p>Mostro can also enter maintenance on its own, with the reason <code>lnd_unsynced</code>, when LND falls out of sync (5.4). If you turn maintenance on while that is active, it becomes yours and the daemon will not lift it; you cannot use <code>lnd_unsynced</code> as your own reason.</p>

      <ol>
        <li>Announce the window to your users well ahead of time.</li>
        <li>Turn maintenance mode on: <code>mostro-cli admsetmaintenance -e true -r "LN node migration"</code>.</li>
        <li>Poll <code>mostro-cli admmaintenancestatus</code> until it reports <code>drained = true</code>. Pending orders expire on their own; to shorten the drain you can cancel one with <code>mostro-cli admcancelpending -o &lt;order-id&gt;</code>, which releases the maker's bond immediately. Announce that first, it is the user's order. Close long-running disputes as usual.</li>
        <li>Keep the <strong>old</strong> node online the whole time. It still has to finish in-flight payouts.</li>
        <li>Stop Mostro and back up <code>mostro.db</code>.</li>
        <li>Point <code>[lightning]</code> at the new node and leave <code>allow_node_change = false</code>.</li>
        <li>Start Mostro. It records the new pubkey. Turn maintenance mode off and place a test order.</li>
        <li>Only now decommission the old node.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ allow_node_change</div>
        <p>Set it to <code>true</code> only for disaster recovery, when the old node is gone for good. It knowingly leaves the affected trades unresolved. Moving the same node to a new host is not a node change and needs none of this.</p>
      </div>`,
    },
    'operator-cli': {
      title: `5.9 Operator Commands with mostro-cli`,
      nav: `Operator CLI`,
      html: `      <p>Mostrix is the comfortable way to work disputes, and <code>mostro-cli</code> covers the basics from a shell, plus a few operator commands Mostrix does not have. Dispute commands are signed with a Nostr key you pass as <code>ADMIN_NSEC</code>, which must be the daemon's own key or a registered solver's. The CLI reads no config file: set your node and relays in the environment, and put global flags before the subcommand.</p>

      <pre><code># Dispute work (over Nostr)
export MOSTRO_PUBKEY=npub1...            # your node
export RELAYS=wss://relay.mostro.network
export ADMIN_NSEC=nsec1...
mostro-cli listdisputes
mostro-cli admtakedispute -d &lt;dispute-id&gt;     # prints buyer and seller pubkeys
mostro-cli getadmindm -s 120
mostro-cli admsenddm -p &lt;party-pubkey&gt; -m "message to a party"
mostro-cli admsettle -o &lt;order-id&gt; [--slashseller] [--slashbuyer]   # release to the buyer
mostro-cli admcancel -o &lt;order-id&gt; [--slashseller] [--slashbuyer]   # refund the seller

# Register an arbiter, optionally read-only
mostro-cli admaddsolver -n npub1...:read</code></pre>

      <p>The slash flags only matter with anti-abuse bonds (4.11). Note the spelling: <code>--slashseller</code>, not <code>--slash-seller</code>. <code>admsenddm</code> sends a direct message from the admin key; it is not the per-dispute chat that the Mostro App, Mostrix and Bosstro use, so prefer those clients for talking to the parties.</p>

      <p>A separate group of commands goes over the admin gRPC instead of Nostr, so they need the RPC interface enabled (see 4.7) rather than <code>ADMIN_NSEC</code>. <code>MOSTRO_RPC_URL</code> defaults to <code>http://127.0.0.1:50051</code>, and <code>MOSTRO_RPC_TOKEN</code> is needed only if you set <code>auth_token</code>.</p>

      <pre><code>export MOSTRO_RPC_URL=http://127.0.0.1:50051
export MOSTRO_RPC_TOKEN=your-auth-token

mostro-cli admsetmaintenance -e true -r "reason"
mostro-cli admmaintenancestatus
mostro-cli admcancelpending -o &lt;order-id&gt;</code></pre>

      <p><code>admcancelpending</code> is worth knowing outside a migration. It cancels an order that is still pending or waiting for a bond, notifies the maker and releases every bond on it at once. Use it for an order that is clearly abandoned or mispriced, and tell the maker first — it is their order, and this is not a dispute resolution.</p>

      <p>mostro-cli has no commands yet for reputation import and export, payer history or the health event: use <code>grpcurl</code> for the reputation RPCs (4.13) and the commands in 5.4 for the health event. Install it with <code>cargo install mostro-cli</code> (Rust 1.97 or newer) or take a binary from <a href="https://github.com/MostroP2P/mostro-cli/releases" target="_blank" rel="noopener noreferrer">its releases</a>; run <code>mostro-cli &lt;command&gt; --help</code> for every flag.</p>`,
    },
    'serbero': {
      title: `5.10 Serbero — Dispute Assistant`,
      nav: `Serbero`,
      html: `      <p><a href="https://github.com/MostroP2P/serbero" target="_blank" rel="noopener noreferrer">Serbero</a> is an optional assistant for your node's disputes. You run it next to Mostro, with a Nostr key of its own. It does two jobs:</p>
      <ul>
        <li><strong>Notify (always on).</strong> Every solver you list gets a direct message within seconds of a new dispute, with reminders every 15 minutes until someone takes it.</li>
        <li><strong>Mediate (opt-in, pilot).</strong> Serbero takes the dispute, asks the buyer whether they paid and the seller whether the money arrived, gives them time to finish the trade themselves, and otherwise hands the case to a human solver with a summary and the full transcript.</li>
      </ul>
      <p>Serbero never moves funds and never decides a dispute. Mostro registers it as a <strong>read-only</strong> solver, so it cannot settle or cancel, and any read-write solver can take a dispute over from it at any time. If Serbero is down, Mostro and your solvers work exactly as before. Keep at least one human read-write solver.</p>

      <h4>Install</h4>
      <p>Each release has binaries for Linux (x86_64, aarch64) and macOS (Apple silicon), each with a SHA-256 file. The file names carry the version:</p>
      <pre><code>V=$(curl -fsSL https://api.github.com/repos/MostroP2P/serbero/releases/latest | grep -m1 '"tag_name"' | cut -d'"' -f4)
A=serbero-$V-x86_64-unknown-linux-gnu        # aarch64-unknown-linux-gnu on ARM64
curl -LO https://github.com/MostroP2P/serbero/releases/download/$V/$A.tar.gz
curl -LO https://github.com/MostroP2P/serbero/releases/download/$V/$A.tar.gz.sha256
shasum -a 256 -c $A.tar.gz.sha256
tar -xzf $A.tar.gz && cd $A        # serbero, config.sample.toml, deploy/</code></pre>
      <p>With Rust installed, <code>cargo install serbero --locked</code> works too. A Docker image (<code>ghcr.io/mostrop2p/serbero</code>) and a compose file are described in the project's README.</p>

      <h4>Configure</h4>
      <pre><code>cp config.sample.toml config.toml
nano config.toml</code></pre>
      <pre><code>[serbero]
private_key_env = "SERBERO_PRIVATE_KEY"   # names the secret; the key never goes in this file
db_path = "serbero.db"

[mostro]
pubkey = "YOUR_MOSTRO_PUBKEY_HEX"
relays = ["wss://relay.mostro.network", "wss://nos.lol"]   # relays your node publishes to

# One entry per human solver: the hex pubkey of the key their client uses
# (Mostrix: admin_privkey). Never list Serbero's own key.
[[solvers]]
pubkey = "SOLVER_PUBKEY_HEX"
permission = "write"

[notify]
renotify_after = "15m"

[mediation]
enabled = false</code></pre>

      <h4>Run it as a service</h4>
      <p>The project ships a hardened systemd unit. Download it from <code>main</code>: the copy inside the v0.2.5 archive needs systemd 251 and fails to start on Ubuntu 22.04.</p>
      <pre><code>sudo useradd --system --home-dir /var/lib/serbero --shell /usr/sbin/nologin serbero
sudo install -m 755 serbero /usr/local/bin/serbero
sudo install -d -m 755 /etc/serbero
sudo install -m 644 config.toml /etc/serbero/config.toml
sudo install -d -m 700 /etc/serbero/credentials
sudo sh -c 'umask 077; openssl rand -hex 32 > /etc/serbero/credentials/serbero_private_key'
curl -fsSLO https://raw.githubusercontent.com/MostroP2P/serbero/main/deploy/serbero.service
sudo install -m 644 serbero.service /etc/systemd/system/serbero.service
sudo systemctl daemon-reload && sudo systemctl enable --now serbero
journalctl -u serbero -f        # note the npub it logs at startup</code></pre>
      <p>Back up <code>/etc/serbero/credentials/serbero_private_key</code> offline. It is Serbero's identity: lose it and you must register a new npub.</p>

      <h4>Register it on your node</h4>
      <p>Mostro v0.19.1 or later registers Serbero for you. Add its npub to the <code>[mostro]</code> block of your <code>settings.toml</code> and restart Mostro:</p>
      <pre><code>[mostro]
serbero_pubkey = "npub1..."   # Serbero's key, npub or hex</code></pre>
      <p>At startup Mostro registers that key as a read-only solver and announces it in its info event. That announcement is how the Mostro App labels Serbero's messages and how mostro-watchdog finds it. The log confirms it: <code>Serbero npub1... configured: registered as a read-only solver</code>.</p>
      <div class="callout important">
        <div class="callout-title">⚠️ Don't add Serbero with admaddsolver</div>
        <p>A bare npub added with <code>admaddsolver</code> becomes read-write (5.1), and Mostro then refuses to start with <code>REFUSING TO START: serbero_pubkey ... is a solver with write permission</code>. It also refuses a key that belongs to a user who is not a solver, and your node's own key. Give Serbero a key of its own and let <code>serbero_pubkey</code> register it.</p>
      </div>

      <h4>Your solvers read Serbero in Mostrix</h4>
      <p>Mostrix 0.3.5 or later shows Serbero's messages in a <strong>SERBERO</strong> pane for each dispute, but only from senders the solver trusts. In each solver's <code>~/.mostrix/settings.toml</code>:</p>
      <pre><code>trusted_dm_senders = ["npub1..."]   # Serbero's npub</code></pre>
      <p>The pubkey of the solver's <code>admin_privkey</code> must be exactly the one in a <code>[[solvers]]</code> entry, and Mostrix must read at least one of Serbero's relays. To take a case over, press <kbd>Ctrl+T</kbd> on a handoff; it needs read-write permission, and Serbero stops writing at once. Bosstro (5.11) does not show Serbero's summaries yet.</p>

      <h4>Turning on mediation (pilot)</h4>
      <p>Mediation ships off. When on, Serbero takes each new dispute and introduces itself to both parties as an automated assistant, in their language (English, Spanish or Portuguese), one short question at a time. Once both have answered, it gives them 30 minutes to settle the trade themselves, then hands the case to your solvers. It never tells anyone to release or cancel.</p>
      <p>To read the replies, Serbero asks a judge model (TypeSafe's Jev) on <strong>your own</strong> paid account. The judge receives the trade roles, the amount, currency and payment method, and the message text — never public keys. Ask the provider for zero data retention, and tell your users that dispute messages are processed by an automated service. The README explains the API key and the threshold table; set <code>enabled = true</code> under <code>[mediation]</code> and restart, and the log says <code>mediation ready</code> or why not.</p>
      <p>Party messages are kind 14 events: use more than one relay, and only relays that store them, or messages sent while Serbero is offline are lost. To post Serbero's progress to your team's Telegram, register mostro-watchdog as an observer (5.3). Back up <code>serbero.db</code> privately: it holds the dispute conversations.</p>`,
    },
    'bosstro': {
      title: `5.11 Bosstro — Solving Disputes from a Phone`,
      nav: `Bosstro`,
      html: `      <p><a href="https://github.com/MostroP2P/bosstro" target="_blank" rel="noopener noreferrer">Bosstro</a> is the Android app for dispute solvers. It brings the admin side of Mostrix to a phone: a solver sees your node's pending disputes, takes one, chats with the buyer and the seller (images and PDFs included), reads the parties' own chat when one of them shares its key and, with read-write permission, pays the buyer or refunds the seller, with the bond option when your node has bonds.</p>
      <p>It is a tool for your solvers, not for trading, and it never holds your node's key. Registering solvers still happens from Mostrix or <code>mostro-cli</code> (5.2).</p>

      <h4>Install and verify</h4>
      <p>Android 7.0 or later. Download the APK from <a href="https://github.com/MostroP2P/bosstro/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a>: <code>arm64-v8a</code> for almost any phone, <code>armeabi-v7a</code> for an old 32-bit one. Check it against the release's checksum file:</p>
      <pre><code>sha256sum -c SHA256SUMS.txt --ignore-missing</code></pre>
      <p>The checksum only proves the download is complete. The signing certificate proves who built it, and Android refuses an update signed with any other key. Compare it with <a href="https://github.com/soupslurpr/AppVerifier" target="_blank" rel="noopener noreferrer">AppVerifier</a>:</p>
      <pre><code>foundation.mostro.bosstro
63:92:27:84:C2:E3:2A:F4:B6:03:0F:5E:2A:18:1F:74:9B:F6:95:E5:2F:1C:A8:45:7E:98:CB:05:D2:9E:B3:4B</code></pre>

      <h4>Add a solver</h4>
      <ol>
        <li>The solver opens Bosstro, taps <strong>Create new account</strong> (or <strong>Log in</strong> with an existing solver nsec) and sends you the npub. That key must be used for nothing else — never the key of a trading app, or both roles are linked in public.</li>
        <li>You register it, read-only to start with (5.1):
          <pre><code>ADMIN_NSEC=nsec1... mostro-cli admaddsolver -n npub1solver...:read</code></pre></li>
        <li>The solver picks your node in Bosstro: Mostro, a community from the list, or your own pubkey and relays. Bosstro learns from your node's answers whether the key is a solver and with which permission.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Current limits</div>
        <p>Bosstro speaks protocol v2 only (4.8). Version 0.1 does not show Serbero's handoff summaries and has no push notifications yet, so solvers working with Serbero still need Mostrix for those. A read-write solver can take a dispute over from Serbero in Bosstro.</p>
      </div>`,
    },
    'costs': {
      title: `6. Cost Breakdown`,
      nav: `6. Cost breakdown`,
      navShort: `6. Costs`,
      html: `      <h3>Monthly Operating Costs</h3>
      <table class="guide-table">
        <thead><tr><th>Item</th><th>Monthly Cost</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>VPS (server)</td><td>$10–24</td><td>Depends on provider and specs</td></tr>
          <tr><td>Domain name (optional)</td><td>$1–2</td><td>For a website/identity</td></tr>
          <tr><td>Lightning channel on-chain fees</td><td>Variable</td><td>Channel opening/closing</td></tr>
          <tr><td><strong>Monthly total</strong></td><td><strong>$11–26</strong></td><td>Excluding Lightning liquidity</td></tr>
        </tbody>
      </table>

      <h3>One-time / Capital Costs</h3>
      <table class="guide-table">
        <thead><tr><th>Item</th><th>Cost</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Lightning liquidity</td><td>0.01–1.0+ BTC</td><td>Locked in channels; recovered when closing</td></tr>
          <tr><td>Node hardware (if self-hosting)</td><td>$0–600</td><td>Free if using VPS; $300-600 for Start9/Umbrel</td></tr>
          <tr><td>Setup time</td><td>4–16 hours</td><td>Depending on experience level</td></tr>
        </tbody>
      </table>

      <h3>Revenue Potential</h3>
      <table class="guide-table">
        <thead><tr><th>Monthly Volume</th><th>Fee (0.6%)</th><th>Dev fee (30%)</th><th>Your net income</th></tr></thead>
        <tbody>
          <tr><td>$1,000</td><td>~$6</td><td>~$1.80</td><td>~$4.20</td></tr>
          <tr><td>$10,000</td><td>~$60</td><td>~$18</td><td>~$42</td></tr>
          <tr><td>$50,000</td><td>~$300</td><td>~$90</td><td>~$210</td></tr>
          <tr><td>$100,000</td><td>~$600</td><td>~$180</td><td>~$420</td></tr>
        </tbody>
      </table>

      <div class="callout important">
        <div class="callout-title">📝 Reality Check</div>
        <p>Most new nodes take months to build trading volume. Don't expect immediate profitability. The real value often comes from providing a service to your community, with fees as a bonus.</p>
      </div>

      <h3>Time Commitment</h3>
      <table class="guide-table">
        <thead><tr><th>Task</th><th>Frequency</th><th>Time</th></tr></thead>
        <tbody>
          <tr><td>Monitoring (check logs, status)</td><td>Daily</td><td>5–10 min</td></tr>
          <tr><td>Dispute resolution</td><td>As needed</td><td>15–60 min per dispute</td></tr>
          <tr><td>Updates</td><td>Monthly</td><td>15–30 min</td></tr>
          <tr><td>Liquidity management</td><td>Weekly</td><td>15–30 min</td></tr>
          <tr><td><strong>Estimated weekly total</strong></td><td></td><td><strong>1–3 hours</strong></td></tr>
        </tbody>
      </table>`,
    },
    'faq': {
      title: `7. Frequently Asked Questions`,
      nav: `7. FAQ`,
      navShort: `7. FAQ`,
      html: `      <h3>Do I need to be a developer to run a Mostro node?</h3>
      <p>No, but you need to be comfortable with basic command line operations (typing commands, editing text files). The Docker path (Option A) is designed to be accessible.</p>

      <h3>Can I run Mostro on a Raspberry Pi?</h3>
      <p>Technically yes (using Start9 or similar), but not recommended for production due to CPU and RAM limitations. A VPS is more reliable.</p>

      <h3>Can I use Core Lightning (CLN) instead of LND?</h3>
      <p>No. Mostro currently only supports LND because it depends on LND's specific hold invoice implementation. Support for other implementations may come in the future.</p>

      <h3>How do users connect to my Mostro?</h3>
      <p>Users need a Mostro client — the <a href="https://github.com/MostroP2P/app" target="_blank" rel="noopener noreferrer">Mostro App</a> for Android, iOS, desktop and web, or mostro-cli or Mostrix — and your Mostro's public key (npub). In the app they go to <em>Settings → Network → Mostro Node → Add your own node</em> and paste your npub; nodes listed on this site appear there already. The client communicates through Nostr relays. No direct connection needed.</p>

      <h3>Can my node still serve old (protocol v1) clients?</h3>
      <p>No. Since v0.19.0 Mostro speaks protocol v2 only (4.8). Users on an old client have to update to the Mostro App or a current Mostrix or mostro-cli.</p>

      <h3>Can my users trade USDT, Liquid or Rootstock instead of fiat?</h3>
      <p>Yes, since v0.20.2: USDT, USDC, DOC, on-chain BTC, LBTC and RBTC. You enable them one by one, and your solvers need to know how to check those transfers. See 4.12.</p>

      <h3>Can users bring their reputation from lnp2pBot or another Mostro?</h3>
      <p>Yes, if you trust the source. Turn on reputation import and add lnp2pBot's key, or the key of a Mostro node you trust (4.13). You can also let your users export the reputation they earned on your node.</p>

      <h3>Can I run multiple Mostro instances?</h3>
      <p>Yes, but each one needs its own Nostr key pair, LND node (or at least separate channels/liquidity), and configuration.</p>

      <h3>Is it legal?</h3>
      <p>It depends heavily on your jurisdiction. Mostro is software for peer-to-peer trading. In some jurisdictions, operating a P2P exchange may require licenses. <strong>Check local regulations and seek legal advice.</strong></p>

      <h3>How much bandwidth does Mostro use?</h3>
      <p>Very little — mostly small Nostr events. A few GB per month is typical even with moderate volume.</p>

      <h3>What happens if my node goes offline?</h3>
      <p>Pending orders eventually expire. Active trades with locked funds continue when you come back online. If you're offline too long, users may lose trust. Since v0.18.3 there is also an escrow deadline: if you stay down long enough for the hold invoice to approach its CLTV horizon, LND cancels it and the seller is refunded automatically. If it is your LND that falls out of sync while Mostro keeps running, payouts wait instead of failing and, after 10 minutes, the node enters maintenance on its own until LND recovers (5.4).</p>

      <h3>Can I change my Nostr key later?</h3>
      <p>You can, but you'll lose your node's identity and reputation. Users will see it as a new Mostro. Treat your key as your brand identity.</p>

      <h3>Can I lose money running a Mostro node?</h3>
      <p>Yes, it's possible: Lightning channel funds could be at risk from bugs (rare); forced channel closures during high fee periods can be costly; VPS costs are ongoing.</p>

      <h3>Is Lightning liquidity "at risk"?</h3>
      <p>Your Lightning liquidity is yours. It's not at risk from Mostro itself — hold invoices are temporary locks. However, standard Lightning Network risks apply (forced closures, stuck channels, bugs).</p>

      <h3>When will I break even?</h3>
      <p>It depends on your costs and trading volume. With $20/month in costs and 0.6% fee, you need ~$5,000/month in trades to cover costs (before the development fee). Most communities take 3–6 months to build significant volume.</p>

      <h3>Can I move Mostro to a different Lightning node?</h3>
      <p>Yes, but not by editing the config and restarting. Escrow is bound to the node that created it, so you drain it in maintenance mode first and the daemon refuses to start if you skip that. Moving the same node to a new host is not a node change and needs nothing special. See 5.8.</p>`,
    },
    'security': {
      title: `8. Security Considerations`,
      nav: `8. Security`,
      navShort: `8. Security`,
      html: `      <div class="callout important">
        <div class="callout-title">⚠️ Early-Stage Software Notice</div>
        <p><strong>Mostro is in early-stage development.</strong> While the team works hard to ensure reliability, there may be undiscovered bugs — including security bugs that could result in loss of funds. <strong>The developers are not responsible for any money loss due to software bugs.</strong></p>
        <p>Mostro is open-source and its code is open for audits. We encourage communities to promote and fund independent security audits.</p>
        <p>That said, <strong>the core escrow mechanism using Lightning hold invoices has been battle-tested since 2021</strong>, when @lnp2pBot first implemented this type of escrow. Thousands of trades have been completed successfully.</p>
      </div>

      <h3>Keep Your Node's Key Out of Reach</h3>

      <p>Your <code>nsec_privkey</code> is your node's identity, and anyone holding it can impersonate your Mostro. Prefer supplying it through the <code>MOSTRO_NSEC_PRIVKEY</code> environment variable or a <code>chmod 600</code> <code>.env</code> file over leaving it in <code>settings.toml</code> (see 4.1). Never put it on a laptop for dispute work either: register a separate solver key for that (see 5.2).</p>

      <h3>Operating Under Authoritarian Regimes</h3>

      <p>If you operate in a country with an authoritarian government, <strong>privacy is not optional — it's a security requirement.</strong></p>

      <ol>
        <li><strong>Run your Mostro node behind Tor and/or a VPN.</strong> This hides your server's IP from Nostr relays.</li>
        <li><strong>If Tor/VPN is not possible</strong> (common in developing countries with slow internet), <strong>only publish events to relays you own or trust.</strong></li>
        <li><strong>Be very careful about which relays you use.</strong> In the future, governments could create Nostr relays specifically to collect IP addresses.</li>
        <li><strong>Consider your Lightning node's privacy as well.</strong> Running LND behind Tor is possible and recommended in sensitive environments. Your info event publishes LND's pubkey and the addresses it advertises, so make LND advertise only Tor addresses.</li>
        <li><strong>Know what your node publishes.</strong> The health event (5.4) is public: status, LND block height and network, Mostro version. Setting a <code>watchdog_pubkey</code> adds a tag that links your node to that key. Turn it off with <code>[health] enabled = false</code> if that matters more than monitoring.</li>
        <li><strong>Proxy variables are not enough.</strong> Lightning-address lookups deliberately ignore <code>HTTP_PROXY</code>/<code>HTTPS_PROXY</code>. To hide the server's IP, route the whole machine through Tor or a VPN.</li>
      </ol>

      <div class="callout tip">
        <div class="callout-title">💡 Tip</div>
        <p>The beauty of Mostro being decentralized is that even if one node is shut down, others keep running. But prevention is always better than recovery. Take privacy seriously from day one.</p>
      </div>`,
    },
    'troubleshooting': {
      title: `9. Troubleshooting`,
      nav: `9. Troubleshooting`,
      navShort: `9. Troubleshooting`,
      html: `      <h3>Mostro won't start</h3>

      <h4><code>dev_fee_percentage (0.05) is below minimum (0.1)</code></h4>
      <p>Set <code>dev_fee_percentage</code> to at least <code>0.10</code> in settings.toml.</p>

      <h4>Configuration file or database not found</h4>
      <p>Make sure the <code>-d</code> flag points to the directory containing <code>settings.toml</code>. For Docker Hub: verify that <code>~/mostro-config/settings.toml</code> exists.</p>

      <h4>Mostro exits at startup with <code>Ln node error</code></h4>
      <ul>
        <li>Verify LND is running: <code>lncli getinfo</code></li>
        <li>Check that <code>lnd_grpc_host</code> matches your LND address</li>
        <li>Verify <code>tls.cert</code> and <code>mostro.macaroon</code> paths are correct</li>
        <li>Verify the macaroon carries the permissions from 2.2</li>
        <li>Docker + LND on the host: use <code>host.docker.internal</code>. Option B also needs the <code>extra_hosts</code> mapping.</li>
      </ul>

      <h4><code>REFUSING TO START: Lightning node changed</code></h4>
      <p>Mostro is pointed at a different LND identity while escrow is still open on the old one. Reconnect the old node and drain it before switching. See 5.8.</p>

      <h4><code>transport = "gift-wrap" (protocol v1) is no longer supported</code></h4>
      <p>Delete the <code>transport</code> line from <code>settings.toml</code>. See 4.8.</p>

      <h4><code>escrow_deadline_margin_blocks (X) must be at least 18 ...</code> or <code>... must be below hold_invoice_cltv_delta</code></h4>
      <p>Set the margin between 18 and <code>hold_invoice_cltv_delta</code>; the template's 24 with 144 works. See 4.9.</p>

      <h4><code>unknown field mint_url</code></h4>
      <p>In <code>[cashu]</code>, rename it to <code>mint_urls = ["..."]</code>. See 4.11.</p>

      <h4><code>anti_abuse_bond.bond_cltv_delta ... must be above hold_invoice_cltv_delta + 144</code> or <code>... must be at most 864</code></h4>
      <p>Set <code>bond_cltv_delta</code> explicitly within those bounds. On v0.20.2, bonds plus a <code>hold_invoice_cltv_delta</code> of 288 or more hit this with the default. See 4.11.</p>

      <h4><code>REFUSING TO START: serbero_pubkey ...</code></h4>
      <p>Serbero's key is already a read-write solver, belongs to a user, or is your node's own key. Give Serbero a key of its own. See 5.10.</p>

      <h4>Reputation settings stop the start</h4>
      <p>Issuer names must be unique and every key valid and listed once; an issuer key must never move to another name once it has imports. With export on, <code>MOSTRO_REPUTATION_ISSUER_SK</code> must be set, valid, different from your node's key and not in your own import list. See 4.13.</p>

      <h4>Clients don't see my orders, or can't message my node</h4>
      <p>Your node speaks protocol v2 only. A user on an old, protocol-v1-only client gets no answer and must update (4.8). Also check that clients and your node share at least one relay.</p>

      <h4>Payouts fail with "no route"</h4>
      <p>Check <code>payment_cltv_limit</code>. It must sit at least 576 blocks above <code>max_final_cltv_expiry_delta</code>, and must not exceed your LND's <code>--max-cltv-expiry</code>. See 4.9.</p>

      <h3>Connection problems</h3>

      <h4>Mostro starts but doesn't connect to relays</h4>
      <ul>
        <li>Check relay URLs (must start with <code>wss://</code>)</li>
        <li>Make sure your VPS firewall allows outbound connections on port 443</li>
        <li>Try different relays — some may be temporarily down</li>
      </ul>

      <h3>Trade problems</h3>

      <h4>A user gets "cant-do: too_many_requests" when restoring session</h4>
      <p>This happens when the user has more orders (historical + active) than the <code>max_orders_per_response</code> value in your configuration. The client tries to query all their orders at once and Mostro rejects it. <strong>This is not a ban or a temporary block</strong> — it will keep happening until you adjust the value.</p>
      <pre><code># In settings.toml, increase the limit:
max_orders_per_response = 50  # default is 10, maximum 255
</code></pre>

      <p>The value is stored as a single byte, so <code>255</code> is the ceiling. If a user has more orders than that, they need to prune their history rather than you raising the limit further.</p>

      <h4>Orders don't appear in clients</h4>
      <ul>
        <li>Check relay connections in the logs</li>
        <li>Make sure clients use the same relays as your node</li>
      </ul>

      <h4>Payments failing</h4>
      <ul>
        <li>Check liquidity: <code>lncli listchannels</code></li>
        <li>Make sure you have enough outbound capacity</li>
        <li>Check the <code>max_routing_fee</code> setting</li>
      </ul>

      <h4>Payouts are not going out, but there is no error</h4>
      <p>Check whether LND is synced: <code>lncli getinfo</code>. While it is not, Mostro holds payouts on purpose and resends them once LND recovers (5.4).</p>

      <h4>Users get "maintenance" refusals although I never enabled it</h4>
      <p><code>mostro-cli admmaintenancestatus</code> shows the reason. <code>lnd_unsynced</code> means Mostro turned it on because LND fell out of sync; it lifts it by itself 5 minutes after LND is synced again (5.4).</p>

      <h4>Dev fees are never paid</h4>
      <p>On testnet, signet or regtest that is expected: dev fees are paid on mainnet only (4.2).</p>

      <h4>Market orders in a currency are refused</h4>
      <p>Your node has no rate for it. Check the <code>price:</code> warnings in the startup log: a <code>[price]</code> block with no enabled market source, or a stablecoin quoted but not listed in <code>fiat_currencies_accepted</code>, are the usual causes. See 4.10 and 4.12.</p>

      <h3>Database problems</h3>

      <h4>Database locked errors</h4>
      <pre><code>ps aux | grep mostrod
# If multiple processes, kill the extras:
kill &lt;PID&gt;</code></pre>

      <h3>Getting help</h3>

      <ol>
        <li><strong>Check the logs first</strong> — most errors explain what went wrong</li>
        <li><strong>Telegram (Developers):</strong> <a href="https://t.me/mostro_dev" target="_blank" rel="noopener noreferrer">@mostro_dev</a></li>
        <li><strong>Telegram (Community):</strong> <a href="https://t.me/MostroP2P" target="_blank" rel="noopener noreferrer">@MostroP2P</a></li>
        <li><strong>GitHub Issues:</strong> <a href="https://github.com/MostroP2P/mostro/issues" target="_blank" rel="noopener noreferrer">github.com/MostroP2P/mostro/issues</a></li>
        <li><strong>DeepWiki:</strong> <a href="https://deepwiki.com/MostroP2P/mostro" target="_blank" rel="noopener noreferrer">deepwiki.com/MostroP2P/mostro</a></li>
      </ol>

      <p>When asking for help, always include: your Mostro version, relevant log output, and what you've already tried.</p>

      <!-- ===== APPENDIX ===== -->`,
    },
    'appendix': {
      title: `Appendix: Quick Reference`,
      nav: `Appendix`,
      html: `      <h3>Important File Locations</h3>
      <table class="guide-table">
        <thead><tr><th>File</th><th>Docker Hub</th><th>Native</th></tr></thead>
        <tbody>
          <tr><td>Configuration</td><td><code>~/mostro-config/settings.toml</code></td><td><code>/opt/mostro/settings.toml</code></td></tr>
          <tr><td>Database</td><td><code>~/mostro-config/mostro.db</code></td><td><code>/opt/mostro/mostro.db</code></td></tr>
          <tr><td>LND Cert</td><td><code>~/mostro-config/lnd/tls.cert</code></td><td>Varies (check LND config)</td></tr>
          <tr><td>LND Macaroon</td><td><code>~/mostro-config/lnd/mostro.macaroon</code></td><td>Varies (check LND config)</td></tr>
          <tr><td>Service</td><td>N/A</td><td><code>/etc/systemd/system/mostro.service</code></td></tr>
          <tr><td>Logs</td><td><code>docker logs -f mostro</code></td><td><code>journalctl -u mostro</code></td></tr>
        </tbody>
      </table>

      <h3>Essential Commands</h3>
      <pre><code># Docker
docker logs -f mostro         # View logs
docker restart mostro          # Restart
docker stop mostro             # Stop

# Native (systemd)
systemctl start mostro         # Start
systemctl stop mostro          # Stop
systemctl restart mostro       # Restart
systemctl status mostro        # View status
journalctl -u mostro -f        # View logs

# Database
sqlite3 mostro.db "SELECT COUNT(*) FROM orders;"                           # Total orders
sqlite3 mostro.db "SELECT COUNT(*) FROM orders WHERE status='success';"    # Successful trades
sqlite3 mostro.db "SELECT SUM(fee*2 - COALESCE(dev_fee, 0)) FROM orders WHERE status='success';"  # Net fees kept by the node</code></pre>

      <h3>Recommended Configuration for New Nodes</h3>
      <pre><code>[mostro]
fee = 0.006
max_order_amount = 500000
min_payment_amount = 1000
expiration_hours = 24
expiration_seconds = 900
pow = 0
dev_fee_percentage = 0.30
fiat_currencies_accepted = ['USD']  # Change to your local currency

[nostr]
relays = [
  'wss://relay.mostro.network',
  'wss://nos.lol',
  'wss://relay.nostr.band'
]</code></pre>`,
    },
  },
};

export default en;
