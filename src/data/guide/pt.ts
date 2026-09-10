import type { GuideTranslation } from './types';

/**
 * pt translation of the node guide.
 *
 * `{{version}}` and `{{updated}}` are replaced at render time with the
 * current Mostro release tag and its month. Section order and heading levels
 * live in `./sections.ts`, not here.
 */
const pt: GuideTranslation = {
  meta: {
    title: `Guia de Configuração do Nó — Mostro Community`,
    description: `Guia completo para executar seu próprio nó Mostro P2P de troca de Bitcoin.`,
    h1: `Executando Seu Próprio Nó Mostro`,
    versionLine: `Mostro {{version}} — Guia da Comunidade · {{updated}}`,
    tocTitle: `Nesta página`,
    tocButton: `📑 Índice`,
    credit: `      <div style="text-align:center; margin-top:48px; padding:24px; border-top:1px solid var(--border);">
        <p>Este guia é mantido pela comunidade Mostro. Encontrou um erro ou quer melhorá-lo?<br>
        Contribuições são bem-vindas em <a href="https://github.com/MostroP2P/community" target="_blank" rel="noopener noreferrer">github.com/MostroP2P/community</a></p>
        <p style="color:var(--text-secondary); margin-top:12px;">Última atualização: {{updated}} · Mostro {{version}}</p>
      </div>`,
  },

  sections: {
    'what-is-mostro': {
      title: `1. O que é Mostro e por que sua comunidade deveria executar um?`,
      nav: `1. O que é Mostro?`,
      navShort: `1. O que é Mostro?`,
      html: `      <p>Mostro é uma <strong>exchange peer-to-peer de Bitcoin</strong> que permite às pessoas comprar e vender Bitcoin usando moedas locais (dólares, euros, reais — qualquer moeda) sem precisar fornecer documentos de identidade (KYC). Pense nele como um marketplace descentralizado onde compradores e vendedores podem negociar diretamente.</p>

      <p>Funciona usando duas tecnologias:</p>
      <ul>
        <li><strong>Lightning Network</strong> — uma camada de pagamentos rápidos e de baixo custo para Bitcoin (pense nela como a via expressa do Bitcoin para pagamentos pequenos e ágeis)</li>
        <li><strong>Nostr</strong> — um protocolo de comunicação resistente à censura (pense nele como um sistema de mensagens que ninguém pode desligar)</li>
      </ul>

      <p>Mostro atua como um <strong>coordenador de custódia</strong> — retém os Bitcoin do vendedor em um "cofre" temporário (chamado hold invoice) até que o comprador confirme que enviou o pagamento em moeda local. Mostro nunca controla realmente os fundos de ninguém; apenas os retém brevemente durante a negociação.</p>`,
    },
    'why-run': {
      title: `Por que sua comunidade iria querer executar um nó Mostro?`,
      nav: `Por que um nó?`,
      html: `      <ol>
        <li><strong>Receita de taxas</strong> — Cada operação gera uma taxa (0,6% por padrão). Se sua comunidade faz $10.000 em operações mensais, são ~$60/mês em taxas.</li>
        <li><strong>Trading P2P sem KYC</strong> — Os membros da sua comunidade podem comprar e vender Bitcoin sem fornecer documentos de identidade. Especialmente importante em regiões com moedas instáveis ou regulamentações restritivas.</li>
        <li><strong>Disputas no seu idioma</strong> — Quando uma operação dá errado, a <em>sua</em> comunidade resolve, no <em>seu</em> idioma, entendendo os <em>seus</em> métodos de pagamento locais.</li>
        <li><strong>Independência</strong> — Nenhuma empresa pode fechar sua exchange. Nenhum governo pode pressionar um único operador a fechá-la.</li>
        <li><strong>Personalização</strong> — Você escolhe quais moedas suportar, quais métodos de pagamento permitir e quais taxas cobrar.</li>
      </ol>`,
    },
    'how-it-works': {
      title: `Como Mostro Funciona (Simplificado)`,
      nav: `Como funciona`,
      html: `      <div class="flow-diagram">
        <div class="flow-step"><span class="step-num">1.</span> Alice quer VENDER Bitcoin por $50 USD <span class="arrow">→</span> Cria uma ordem no Mostro</div>
        <div class="flow-step"><span class="step-num">2.</span> Bob quer COMPRAR Bitcoin com $50 USD <span class="arrow">→</span> Vê a ordem de Alice e a aceita</div>
        <div class="flow-step"><span class="step-num">3.</span> Mostro cria um "cofre" (hold invoice) <span class="arrow">→</span> Alice envia seus Bitcoin para o cofre</div>
        <div class="flow-step"><span class="step-num">4.</span> Bob envia $50 para Alice via transferência bancária, Pix, dinheiro, etc. <span class="arrow">→</span> Bob pressiona "Fiat Enviado" no app</div>
        <div class="flow-step"><span class="step-num">5.</span> Alice confirma que recebeu os $50 <span class="arrow">→</span> Pressiona "Liberar"</div>
        <div class="flow-step"><span class="step-num">6.</span> Mostro libera os Bitcoin do cofre para Bob <span class="arrow">→</span> Operação concluída! ✓</div>
      </div>

      <p>Se algo der errado (ex: Bob diz que pagou mas Alice não recebeu), qualquer uma das partes pode abrir uma <strong>disputa</strong>, e os árbitros designados da sua comunidade investigam e resolvem.</p>`,
    },
    'prerequisites': {
      title: `2. Pré-requisitos — O que você precisa antes de começar`,
      nav: `2. Pré-requisitos`,
      navShort: `2. Pré-requisitos`,
      html: ``,
    },
    'vps': {
      title: `2.1 Um Servidor (VPS)`,
      nav: `Servidor (VPS)`,
      html: `      <p>Um <strong>VPS</strong> (Servidor Virtual Privado) é um computador em um data center que funciona 24/7. Você alugará um para hospedar seu nó Mostro.</p>

      <p><strong>Especificações mínimas:</strong></p>
      <table class="guide-table">
        <thead><tr><th>Recurso</th><th>Mínimo</th><th>Recomendado</th></tr></thead>
        <tbody>
          <tr><td>CPU</td><td>2 vCPUs (compartilhadas)</td><td>2+ vCPUs</td></tr>
          <tr><td>RAM</td><td>2 GB</td><td>4 GB</td></tr>
          <tr><td>Armazenamento</td><td>60 GB SSD</td><td>100 GB SSD</td></tr>
          <tr><td>Largura de banda</td><td>3 TB/mês</td><td>3+ TB/mês</td></tr>
          <tr><td>SO</td><td>Ubuntu 22.04+ LTS</td><td>Ubuntu 24.04 LTS</td></tr>
        </tbody>
      </table>

      <p><strong>Custo mensal estimado:</strong> $10–$24/mês.</p>

      <p><strong>Provedores de VPS populares:</strong></p>
      <ul>
        <li><a href="https://www.hostinger.com/" target="_blank" rel="noopener noreferrer">Hostinger</a> — a partir de ~$7/mês (preço promocional; renovação pode ser maior) (KVM 2: 2 vCPU, 8GB RAM, 100GB NVMe, 8TB largura de banda) · Aceita Bitcoin</li>
        <li><a href="https://www.hetzner.com/" target="_blank" rel="noopener noreferrer">Hetzner</a> — €3,49-8/mês (CX23 a partir de €3,49, bom custo-benefício, baseado na UE)</li>
        <li><a href="https://www.digitalocean.com/" target="_blank" rel="noopener noreferrer">Digital Ocean</a> — $24/mês (4GB RAM, 2 CPUs, 80GB SSD) ou $32/mês (4GB RAM, 2 Intel CPUs, 120GB NVMe)</li>
        <li><a href="https://www.ovhcloud.com/" target="_blank" rel="noopener noreferrer">OVH</a> — ~$6-12/mês</li>
        <li><a href="https://www.linode.com/" target="_blank" rel="noopener noreferrer">Linode/Akamai</a> — $12/mês</li>
        <li><a href="https://www.lunanode.com/" target="_blank" rel="noopener noreferrer">Lunanode</a> — Aceita pagamentos em Bitcoin</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Dica</div>
        <p>Muitos provedores de VPS aceitam pagamentos em Bitcoin. Procure essa opção se quiser manter coerência com a filosofia Bitcoin.</p>
      </div>

      <p>Você precisa se sentir confortável conectando-se a um servidor via SSH. Se nunca fez isso, procure um tutorial sobre "Conectar via SSH a um VPS" — é mais simples do que parece.</p>`,
    },
    'lnd': {
      title: `2.2 Um Nó Lightning Network (LND)`,
      nav: `Nó Lightning (LND)`,
      html: `      <p>Lightning Network é um sistema "camada 2" construído sobre o Bitcoin que permite pagamentos rápidos e baratos. Para executar o Mostro, você precisa de um <strong>nó LND</strong> (Lightning Network Daemon) — o software Lightning específico com o qual o Mostro trabalha.</p>

      <p><strong>Suas opções:</strong></p>
      <table class="guide-table">
        <thead><tr><th>Opção</th><th>Dificuldade</th><th>Custo</th><th>Notas</th></tr></thead>
        <tbody>
          <tr><td>Usar um nó LND existente</td><td><span class="badge badge-easy">Fácil</span></td><td>Grátis (se tiver um)</td><td>Melhor se alguém já tem um</td></tr>
          <tr><td>Executar LND no mesmo VPS</td><td><span class="badge badge-hard">Difícil</span></td><td>Mesmo VPS + liquidez</td><td>Requer VPS com 4GB+ RAM</td></tr>
          <tr><td>Solução nó-em-caixa</td><td><span class="badge badge-medium">Médio</span></td><td>$200-600 + liquidez</td><td><a href="https://start9.com/" target="_blank" rel="noopener noreferrer">Start9</a>, <a href="https://umbrel.com/" target="_blank" rel="noopener noreferrer">Umbrel</a>, <a href="https://raspiblitz.org/" target="_blank" rel="noopener noreferrer">RaspiBlitz</a></td></tr>
          <tr><td>StartOS com pacote Mostro</td><td><span class="badge badge-easy">Mais fácil</span></td><td>$300-600 + liquidez</td><td>Start9 tem um pacote Mostro de um clique</td></tr>
          <tr><td>Usar Voltage.cloud</td><td><span class="badge badge-easy">Fácil</span></td><td>A partir de ~$20/mês + liquidez</td><td><a href="https://voltage.cloud/" target="_blank" rel="noopener noreferrer">Voltage</a> — LND hospedado com infraestrutura gerenciada</td></tr>
        </tbody>
      </table>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>Mostro requer especificamente <strong>LND</strong> (não CLN/Core Lightning, não Eclair, não LDK). Certifique-se de que seu nó Lightning execute LND.</p>
      </div>

      <p><strong>O que você precisa do seu nó LND:</strong></p>
      <ul>
        <li>O arquivo <code>tls.cert</code> (um certificado de segurança)</li>
        <li>Um arquivo <code>mostro.macaroon</code> dedicado (um token de autenticação apenas com as permissões que o Mostro precisa, veja abaixo)</li>
        <li>O endereço gRPC (tipicamente <code>https://127.0.0.1:10009</code> se na mesma máquina)</li>
      </ul>

      <p><strong>Gere um macaroon dedicado para o Mostro.</strong> Não entregue ao Mostro o seu <code>admin.macaroon</code>: ele concede controle total sobre o seu nó e seus fundos. Crie um macaroon que contenha apenas as permissões que o Mostro realmente usa (ler informações do nó, criar/liquidar/cancelar hold invoices, enviar e acompanhar pagamentos).</p>
      <p>Primeiro escolha um root key ID que ainda não esteja em uso. Revogar um macaroon revoga todos os macaroons que compartilham o seu ID, então reaproveitar um levaria embora credenciais alheias. O ID 0 pertence aos macaroons do próprio LND, então escolha um número livre diferente de zero e anote-o:</p>
      <pre><code>lncli listmacaroonids</code></pre>
      <p>Depois crie o macaroon com o ID escolhido (<code>7</code> neste exemplo, substitua pelo seu):</p>
      <pre><code>lncli bakemacaroon --root_key_id 7 \\
  --save_to /root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon \\
  info:read invoices:read invoices:write offchain:read offchain:write</code></pre>
      <p>Este macaroon não pode abrir ou fechar canais, mover fundos on-chain nem alterar a configuração do seu nó. Se algum dia vazar, revogue-o com <code>lncli deletemacaroonid 7</code>, usando o mesmo ID com que o criou, e gere um novo.</p>`,
    },
    'liquidity': {
      title: `2.3 Liquidez Lightning`,
      nav: `Liquidez`,
      html: `      <p>Para facilitar as operações, seu nó Lightning precisa de <strong>canais</strong> com Bitcoin neles. Pense nos canais Lightning como túneis de pagamento pré-financiados. O Bitcoin dentro desses canais é sua "liquidez".</p>

      <p><strong>Quanto você precisa?</strong></p>
      <table class="guide-table">
        <thead><tr><th>Volume de trading alvo</th><th>Liquidez sugerida</th><th>BTC aproximado</th></tr></thead>
        <tbody>
          <tr><td>Comunidade pequena (poucas operações/dia)</td><td>1–5 milhões de sats</td><td>0,01–0,05 BTC</td></tr>
          <tr><td>Comunidade média</td><td>5–20 milhões de sats</td><td>0,05–0,20 BTC</td></tr>
          <tr><td>Comunidade ativa</td><td>20–100 milhões de sats</td><td>0,20–1,0 BTC</td></tr>
        </tbody>
      </table>

      <div class="callout tip">
        <div class="callout-title">💡 Nota sobre Liquidez Lightning</div>
        <p>O Bitcoin nos seus canais Lightning está bloqueado <strong>onchain</strong> mas continua altamente utilizável via Lightning Network. Muitos serviços aceitam pagamentos Lightning — de cafeterias a provedores de VPS — tornando sua liquidez bastante flexível para uso cotidiano.</p>
      </div>

      <p><strong>Comece pequeno, cresça gradualmente.</strong> Comece com o suficiente para as necessidades iniciais da sua comunidade e monitore o feedback. Quando os traders reportarem falhas em ordens por capacidade insuficiente, esse é o sinal para adicionar mais. Ouça sua comunidade.</p>

      <p><strong>Obtendo liquidez:</strong></p>
      <ul>
        <li>Abra canais para nós bem conectados (use <a href="https://lightningnetwork.plus/" target="_blank" rel="noopener noreferrer">Lightning Network+</a> ou <a href="https://amboss.space/" target="_blank" rel="noopener noreferrer">Amboss</a> para encontrar bons pares)</li>
        <li>Você precisa de capacidade <strong>de saída</strong> (para pagar compradores) e capacidade <strong>de entrada</strong> (para receber de vendedores)</li>
        <li>Obter liquidez de entrada geralmente é mais difícil — considere <a href="https://lightning.engineering/loop/" target="_blank" rel="noopener noreferrer">Lightning Loop</a>, <a href="https://amboss.space/magma" target="_blank" rel="noopener noreferrer">Magma</a>, ou serviços de troca de canais</li>
      </ul>`,
    },
    'nostr-keys': {
      title: `2.4 Chaves Nostr`,
      nav: `Chaves Nostr`,
      html: `      <p>Seu nó Mostro precisa de sua própria identidade na rede Nostr — um par de chaves criptográficas com uma chave pública (o endereço do seu nó) e uma chave privada (seu segredo).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>Nunca reutilize chaves Nostr entre instâncias de Mostro. Cada nó precisa de sua própria identidade única.</p>
      </div>

      <p><strong>Gerando chaves Nostr seguras localmente com rana:</strong></p>
      <pre><code># Instalar Rust (se não estiver instalado)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Instalar rana - gerador local de chaves Nostr
cargo install rana

# Gerar um novo par de chaves (com frase seed de 12 palavras)
rana --generate 12</code></pre>

      <p>O Rana gerará sua chave privada (nsec), chave pública (npub) e uma frase seed de backup. <strong>Guarde tudo com segurança!</strong> Nota: executar <code>rana</code> sem argumentos inicia mineração PoW (dificuldade 10) que pode levar minutos — use <code>--generate</code> para geração instantânea. Nunca gere chaves importantes usando serviços online.</p>`,
    },
    'skill-level': {
      title: `2.5 Nível de conhecimento técnico`,
      nav: `Nível técnico`,
      html: `      <table class="guide-table">
        <thead><tr><th>Tarefa</th><th>Dificuldade</th><th>Conhecimentos necessários</th></tr></thead>
        <tbody>
          <tr><td>Alugar um VPS</td><td><span class="badge badge-easy">Fácil</span></td><td>Cartão de crédito, navegação web básica</td></tr>
          <tr><td>Conectar via SSH</td><td><span class="badge badge-easy">Fácil</span></td><td>Seguir instruções, digitar comandos</td></tr>
          <tr><td>Instalar Docker</td><td><span class="badge badge-medium">Médio</span></td><td>Copiar e colar comandos, resolução básica de problemas</td></tr>
          <tr><td>Executar Mostro (Docker)</td><td><span class="badge badge-medium">Médio</span></td><td>Editar arquivos de configuração, entender caminhos</td></tr>
          <tr><td>Executar Mostro (nativo)</td><td><span class="badge badge-hard">Difícil</span></td><td>Administração Linux, compilação de software, systemd</td></tr>
          <tr><td>Configurar LND do zero</td><td><span class="badge badge-hard">Difícil</span></td><td>Conhecimento significativo de Linux e redes</td></tr>
          <tr><td>Gerenciar liquidez Lightning</td><td><span class="badge badge-hard">Difícil</span></td><td>Entender a economia de canais Lightning</td></tr>
        </tbody>
      </table>

      <p><strong>💡 Nossa recomendação:</strong> Se sua comunidade tem alguém confortável com a linha de comando Linux, essa pessoa pode lidar com a instalação Docker. A compilação nativa requer experiência em administração de sistemas. A configuração do nó Lightning é a parte mais complexa — considere pedir ajuda a alguém experiente, ou usar uma solução nó-em-caixa.</p>`,
    },
    'setup': {
      title: `3. Instalação Passo a Passo`,
      nav: `3. Instalação passo a passo`,
      navShort: `3. Instalação`,
      html: `      <p>Todas as opções de instalação compartilham os mesmos primeiros passos. Depois escolha a opção que preferir:</p>
      <ul>
        <li><strong>Opção A (Docker Hub):</strong> A mais rápida. Sem compilar, sem clonar. <strong>Recomendada para a maioria.</strong></li>
        <li><strong>Opção B (Docker Build):</strong> Construa a imagem localmente a partir do repositório.</li>
        <li><strong>Opção C (Compilação nativa):</strong> Mais controle, melhor para sysadmins experientes.</li>
      </ul>

      <p>Todas assumem que você já tem: ✅ Um VPS com Ubuntu · ✅ Acesso SSH · ✅ Um nó LND funcionando.</p>`,
    },
    'common-steps': {
      title: `Passos Comuns (para as 3 opções)`,
      nav: `Passos comuns`,
      html: `      <h4>Passo 1: Conecte-se ao seu VPS</h4>
      <pre><code>ssh root@SEU_ENDERECO_IP_DO_VPS</code></pre>

      <h4>Passo 2: Atualize o sistema</h4>
      <pre><code># Baixar as informações mais recentes dos pacotes
apt update

# Instalar todas as atualizações disponíveis
apt upgrade -y</code></pre>

      <h4>Passo 3: Instalar Docker e Docker Compose</h4>
      <div class="callout tip">
        <div class="callout-title">💡 Nota</div>
        <p>Docker é necessário para as opções A e B. Se for compilar manualmente (Opção C), pode pular este passo.</p>
      </div>
      <pre><code># Instalar Docker com o script oficial
curl -fsSL https://get.docker.com | sh

# Verificar se Docker está instalado
docker --version

# Verificar Docker Compose
docker compose version</code></pre>

      <h4>Passo 4: Instalar ferramentas adicionais</h4>
      <pre><code>apt install -y git make</code></pre>

      <p>✅ <strong>Passos comuns concluídos.</strong> Agora escolha sua opção de instalação:</p>`,
    },
    'option-a': {
      title: `Opção A: Docker Hub (A mais rápida — Recomendada)`,
      nav: `Opção A: Docker Hub`,
      html: `      <p>Execute o Mostro diretamente do Docker Hub sem clonar o repositório ou compilar. Perfeito para deployments em VPS.</p>

      <h4>Passo 5: Criar diretório de configuração</h4>
      <pre><code>mkdir -p ~/mostro-config/lnd</code></pre>

      <h4>Passo 6: Obter o template de configuração</h4>
      <pre><code>curl -sL https://raw.githubusercontent.com/MostroP2P/mostro/{{version}}/settings.tpl.toml \\
  -o ~/mostro-config/settings.toml</code></pre>

      <h4>Passo 7: Copiar credenciais LND</h4>
      <pre><code>cp /caminho/para/seu/tls.cert ~/mostro-config/lnd/tls.cert
cp /caminho/para/seu/mostro.macaroon ~/mostro-config/lnd/mostro.macaroon</code></pre>

      <p>Se o LND está na <strong>mesma máquina</strong>, os caminhos típicos são:</p>
      <ul>
        <li><code>/root/.lnd/tls.cert</code></li>
        <li><code>/root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon</code></li>
      </ul>

      <h4>Passo 8: Editar a configuração</h4>
      <pre><code>nano ~/mostro-config/settings.toml</code></pre>

      <p><strong>Alterações necessárias:</strong></p>
      <pre><code>[lightning]
lnd_cert_file = '/config/lnd/tls.cert'
lnd_macaroon_file = '/config/lnd/mostro.macaroon'
lnd_grpc_host = 'https://host.docker.internal:10009'  # Se LND no mesmo VPS
# Ou usar 'https://SEU_IP_LND:10009' se LND em servidor diferente

[database]
url = "sqlite:///config/mostro.db"  # o mostrod sempre usa &lt;diretório-de-config&gt;/mostro.db

[nostr]
nsec_privkey = 'SUA_CHAVE_NSEC_AQUI'
relays = ['wss://relay.mostro.network', 'wss://nos.lol']

[mostro]
fee = 0.006                    # 0,6% taxa por operação
max_order_amount = 1000000     # Ordem máxima em sats
min_payment_amount = 100       # Ordem mínima em sats
fiat_currencies_accepted = ['USD', 'BRL']  # Suas moedas</code></pre>

      <p>Salvar: <code>Ctrl+X</code>, depois <code>Y</code>, depois <code>Enter</code>.</p>

      <h4>Passo 9: Ajustar permissões</h4>
      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>Evite <code>chmod 777</code>. Use permissões mínimas.</p>
      </div>
      <pre><code>sudo chown -R 1000:1000 ~/mostro-config
chmod 700 ~/mostro-config
chmod 600 ~/mostro-config/settings.toml
chmod 600 ~/mostro-config/lnd/mostro.macaroon</code></pre>

      <h4>Passo 10: Executar o container</h4>
      <p><strong>Se o LND está no mesmo VPS:</strong></p>
      <pre><code>docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:{{version}}</code></pre>

      <p><strong>Se o LND está em um servidor diferente:</strong></p>
      <pre><code>docker run -d --name mostro \\
  --restart unless-stopped \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:{{version}}</code></pre>

      <h4>Passo 11: Verificar os logs</h4>
      <pre><code>docker logs -f mostro</code></pre>

      <p>Procure estas mensagens:</p>
      <ul>
        <li><code>Settings correctly loaded!</code> — A configuração é válida</li>
        <li><code>Transport: nip44 (protocol v2, event kind 14)</code> — Protocolo em uso (veja 4.8)</li>
        <li><code>Connected to 'wss://...'</code> — Relay Nostr estabelecido</li>
        <li><code>Recorded Lightning node identity &lt;pubkey&gt;</code> — LND alcançado (apenas na primeira execução)</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Nota</div>
        <p>Não existe uma mensagem de "conectado ao LND". O Mostro contata o LND durante a inicialização, então um daemon que continua rodando já tem a conexão funcionando. A falha, por outro lado, é ruidosa: registra <code>Ln node error</code> e encerra.</p>
      </div>

      <div class="callout tip">
        <div class="callout-title">💡 Solução de problemas</div>
        <p>Se aparecer <code>Permission denied (os error 13)</code>, reaplique as permissões: <code>chown -R 1000:1000 ~/mostro-config</code> e reinicie: <code>docker restart mostro</code>.</p>
      </div>

      <p>🎉 <strong>Parabéns!</strong> Se vir conexões bem-sucedidas nos logs, seu nó Mostro está funcionando!</p>

      <h4>Atualização (Docker Hub)</h4>
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
        <div class="callout-title">🔒 Nota de Segurança</div>
        <p>Use sempre uma tag de versão específica (ex: <code>mostrop2p/mostro:{{version}}</code>) em vez de <code>:latest</code> para controlar os deployments.</p>
      </div>`,
    },
    'option-b': {
      title: `Opção B: Docker Build (Construir imagem localmente)`,
      nav: `Opção B: Docker Build`,
      html: `      <h4>Passo 5: Baixar Mostro</h4>
      <pre><code>cd /opt
git clone https://github.com/MostroP2P/mostro.git
cd mostro</code></pre>

      <h4>Passo 6: Configurar arquivos</h4>
      <pre><code>cd docker
mkdir -p config
cp ../settings.tpl.toml config/settings.toml</code></pre>

      <h4>Passo 7: Editar o arquivo de configuração</h4>
      <pre><code>nano config/settings.toml</code></pre>
      <p>Edite as mesmas configurações da Opção A, Passo 8.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Se o LND roda na mesma VPS</div>
        <p>Diferente da Opção A, o <code>docker/compose.yml</code> do repositório não mapeia <code>host.docker.internal</code>, então no Linux esse nome não resolve dentro do container. Adicione o mapeamento ao serviço <code>mostro</code> antes de compilar:</p>
        <pre><code>    extra_hosts:
      - "host.docker.internal:host-gateway"</code></pre>
        <p>Ou aponte <code>lnd_grpc_host</code> para o IP local do host. Note que <code>make docker-build</code> também compila a imagem StartOS, que uma VPS não precisa: custa apenas tempo de compilação.</p>
      </div>

      <h4>Passo 8: Construir a imagem Docker</h4>
      <pre><code>cd ..
LND_CERT_FILE=/root/.lnd/tls.cert \\
LND_MACAROON_FILE=/root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon \\
make docker-build</code></pre>

      <h4>Passo 9: Iniciar Mostro</h4>
      <pre><code># Inicia o Mostro e o relay incluído. \`make docker-up\` sozinho também
# inicia a imagem StartOS, que você não precisa numa VPS.
docker compose -f docker/compose.yml up -d mostro nostr-relay

# Verificar status
docker compose -f docker/compose.yml ps

# Ver logs
docker compose -f docker/compose.yml logs -f mostro</code></pre>

      <p>🎉 <strong>Parabéns!</strong> Se vir conexões bem-sucedidas, seu nó Mostro está funcionando!</p>`,
    },
    'option-c': {
      title: `Opção C: Compilação Nativa (Para operadores técnicos)`,
      nav: `Opção C: Nativo`,
      html: `      <h4>Passo 5: Instalar Rust</h4>
      <pre><code>curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source /root/.cargo/env
rustc --version
cargo --version</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>NÃO instale Rust via <code>apt install rustc</code>. Sempre use <code>rustup</code>. O pacote do sistema geralmente está desatualizado.</p>
      </div>

      <h4>Passo 6: Instalar dependências de compilação</h4>
      <pre><code>apt install -y cmake build-essential libsqlite3-dev libssl-dev \\
  pkg-config git sqlite3 protobuf-compiler</code></pre>

      <h4>Passo 7: Baixar e compilar Mostro</h4>
      <pre><code>cd /opt
git clone https://github.com/MostroP2P/mostro.git
cd mostro
cargo build --release</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Dica</div>
        <p>Se a compilação falhar por falta de RAM, adicione espaço swap:</p>
      </div>
      <pre><code>fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile</code></pre>

      <h4>Passos 8–10: Instalar, inicializar e limpar</h4>
      <pre><code>install target/release/mostrod /usr/local/bin
cargo clean  # Economiza 2+ GB de espaço</code></pre>

      <h4>Passos 11–12: Criar usuário e configurar</h4>
      <pre><code>adduser --disabled-login mostro
mkdir -p /opt/mostro
cp settings.tpl.toml /opt/mostro/settings.toml
nano /opt/mostro/settings.toml</code></pre>
      <p>Edite as mesmas configurações da Opção A, Passo 8.</p>

      <h4>Passos 13–15: Teste, permissões e serviço systemd</h4>
      <pre><code># Teste de execução
/usr/local/bin/mostrod -d /opt/mostro

# Definir permissões
chown -R mostro:mostro /opt/mostro</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 O assistente interativo de configuração</div>
        <p>Se você rodar o <code>mostrod</code> sem um <code>settings.toml</code> no diretório indicado e estiver num terminal, ele oferece um menu de configuração que pode montar o arquivo para você e escrever o nsec num <code>.env</code>. Sem terminal (Docker, systemd, CI) ele copia o template, imprime onde o deixou e encerra para você editar.</p>
      </div>

      <p>Criar o serviço systemd:</p>
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

      <p>🎉 <strong>Parabéns!</strong> Seu nó Mostro está executando como serviço do sistema.</p>`,
    },
    'configuration': {
      title: `4. Configuração em Detalhe`,
      nav: `4. Configuração`,
      navShort: `4. Configuração`,
      html: `      <p>O arquivo <code>settings.toml</code> controla tudo sobre seu nó Mostro.</p>`,
    },
    'cfg-nostr': {
      title: `4.1 Chaves Nostr — A identidade do seu nó`,
      nav: `Chaves Nostr`,
      html: `      <pre><code>[nostr]
nsec_privkey = 'SUA_CHAVE_NSEC'
relays = [
  'wss://relay.mostro.network',
  'wss://nos.lol',
  'wss://relay.nostr.band'
]</code></pre>

      <p><strong>Quais relays usar?</strong></p>
      <ul>
        <li><code>wss://relay.mostro.network</code> — Relay próprio do Mostro, recomendado</li>
        <li><code>wss://nos.lol</code> — Relay confiável e bem conectado</li>
        <li>Adicione 3–5 relays para confiabilidade. Mais relays = melhor disponibilidade mas mais largura de banda.</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Dica</div>
        <p>Você também pode rodar seu próprio relay Nostr ao lado do Mostro. O caminho Docker Build (Opção B) inclui um no seu <code>compose.yml</code>; a Opção A e a compilação nativa não.</p>
      </div>


      <h4>Manter a chave fora do settings.toml</h4>
      <p>O Mostro também lê a chave da variável de ambiente <code>MOSTRO_NSEC_PRIVKEY</code>. A precedência é: variável de ambiente, depois <code>&lt;diretório-de-config&gt;/.env</code>, depois <code>settings.toml</code>.</p>
      <pre><code># ~/mostro-config/.env  (chmod 600) — carregado automaticamente na inicialização
MOSTRO_NSEC_PRIVKEY=nsec1...

# Docker
docker run -e MOSTRO_NSEC_PRIVKEY=nsec1... ...

# Unidade systemd
Environment="MOSTRO_NSEC_PRIVKEY=nsec1..."</code></pre>
      <p>Deixar <code>nsec_privkey</code> no <code>settings.toml</code> continua funcionando. Se usar o arquivo <code>.env</code>, faça backup dele com o mesmo cuidado da configuração.</p>`,
    },
    'fees': {
      title: `4.2 Taxas — Como você gera receita`,
      nav: `Taxas`,
      html: `      <pre><code>[mostro]
fee = 0.006
dev_fee_percentage = 0.30</code></pre>

      <p><strong>Taxa de trading</strong> (<code>fee</code>): Percentual cobrado por operação, dividido entre comprador e vendedor.</p>
      <ul>
        <li><code>0.006</code> = 0,6% (cada parte paga 0,3%)</li>
        <li><code>0.01</code> = 1,0% (cada parte paga 0,5%)</li>
        <li><code>0</code> = grátis (bom para fazer crescer sua base de usuários)</li>
      </ul>

      <p><strong>Exemplo:</strong> Em uma operação de 100.000 sats com <code>fee = 0.006</code>: O comprador paga 300 sats, o vendedor paga 300 sats, seu nó ganha 600 sats no total.</p>

      <p><strong>Taxa de desenvolvimento</strong> (<code>dev_fee_percentage</code>): Um percentual dos <em>seus</em> ganhos de taxas que vai para o desenvolvimento do Mostro.</p>
      <ul>
        <li><code>0.30</code> = 30% (padrão) — de 600 sats, 180 vão para o fundo de desenvolvimento</li>
        <li>Mínimo: 10% (<code>0.10</code>), Máximo: 100% (<code>1.0</code>)</li>
        <li>Paga pelo seu nó dos seus ganhos, não cobrada dos usuários</li>
        <li>Todos os pagamentos auditáveis publicamente via eventos Nostr (kind 8383)</li>
      </ul>

      <div class="callout important">
        <div class="callout-title">📝 Nota</div>
        <p>Definir <code>dev_fee_percentage</code> abaixo de <code>0.10</code> impedirá o Mostro de iniciar. Este mínimo garante financiamento sustentável do desenvolvimento.</p>
      </div>`,
    },
    'limits': {
      title: `4.3 Limites de ordens e moedas`,
      nav: `Limites`,
      html: `      <pre><code>[mostro]
max_order_amount = 1000000
min_payment_amount = 100
max_orders_per_response = 10
fiat_currencies_accepted = ['USD', 'BRL', 'ARS', 'CUP']</code></pre>

      <ul>
        <li><strong><code>max_order_amount</code>:</strong> Maior operação em satoshis. Configure baseado na capacidade dos seus canais Lightning.</li>
        <li><strong><code>min_payment_amount</code>:</strong> Operação mínima em satoshis. 1.000 ou 10.000 é mais prático que 100.</li>
        <li><strong><code>max_orders_per_response</code>:</strong> Quantidade máxima de ordens que o Mostro retorna em uma única consulta. Se um usuário acumula mais ordens que esse limite (por exemplo ao restaurar sua sessão no cliente móvel), receberá um erro <code>cant-do: too_many_requests</code> e não conseguirá recuperar suas ordens. Se seus usuários operam com frequência, aumente esse valor (por exemplo 50 ou 100). O valor padrão de 10 pode ser insuficiente.</li>
        <li><strong><code>fiat_currencies_accepted</code>:</strong> Use <a href="https://en.wikipedia.org/wiki/ISO_4217" target="_blank" rel="noopener noreferrer">códigos ISO 4217</a>. Array vazio <code>[]</code> aceita todas as moedas.</li>
      </ul>`,
    },
    'profile': {
      title: `4.4 Perfil do nó (Opcional mas recomendado)`,
      nav: `Perfil do nó`,
      html: `      <pre><code>[mostro]
name = "Brasil Mostro"
about = "Exchange P2P de Bitcoin para o Brasil. Suporte em português."
picture = "https://exemplo.com/seu-logo.png"
website = "https://site-da-sua-comunidade.com"</code></pre>

      <p>Estes configuram o perfil do seu Mostro no Nostr (NIP-01 kind 0 metadata). Os clientes exibem essas informações para que os usuários saibam em qual Mostro estão operando.</p>`,
    },
    'timeouts': {
      title: `4.5 Tempos e expiração`,
      nav: `Tempos`,
      html: `      <pre><code>[mostro]
expiration_hours = 24        # Quanto tempo uma ordem fica aberta
expiration_seconds = 900     # Tempo para completar (15 min)
hold_invoice_expiration_window = 300  # Tempo que o tomador tem para pagar a fatura ou fornecer uma de recebimento (5 min)</code></pre>`,
    },
    'antispam': {
      title: `4.6 Anti-Spam`,
      nav: `Anti-Spam`,
      html: `      <pre><code>[mostro]
pow = 0  # 0 = desabilitado; 10-20 = moderado. Comece com 0.</code></pre>`,
    },
    'rpc': {
      title: `4.7 Interface RPC de Administração (Opcional)`,
      nav: `RPC Admin`,
      html: `      <pre><code>[rpc]
enabled = false
listen_address = "127.0.0.1"
port = 50051
# auth_token = "uma-string-longa-e-aleatoria"</code></pre>

      <p>Esta interface gRPC é para ferramentas do operador: <code>grpcurl</code>, e <code>mostro-cli</code> para o modo manutenção (<code>admsetmaintenance</code>, <code>admmaintenancestatus</code>, <code>admcancelpending</code>). O Mostrix <strong>não</strong> a usa: ele trabalha sobre Nostr, então você não precisa de RPC para resolver disputas.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Segurança</div>
        <p>Mantenha <code>listen_address</code> em <code>"127.0.0.1"</code> e nunca exponha a porta à internet. Configure <code>auth_token</code> sempre que a porta for alcançável por algo diferente da máquina local, como um túnel SSH ou um container sidecar: uma conexão encaminhada chega como loopback, então o endereço de escuta por si só não é autorização. Com um token configurado, toda chamada que modifica estado deve levar o header <code>authorization: Bearer &lt;token&gt;</code>.</p>
      </div>`,
    },
    'transport': {
      title: `4.8 Protocolo de Transporte`,
      nav: `Transporte`,
      html: `      <p>Um nó Mostro fala <strong>um único</strong> protocolo, escolhido aqui:</p>
      <pre><code>[mostro]
transport = "nip44"</code></pre>

      <table class="guide-table">
        <thead><tr><th>Valor</th><th>Protocolo</th><th>Kind visível no relay</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td><code>"nip44"</code></td><td>v2 — eventos kind 14 assinados com conteúdo cifrado NIP-44</td><td><code>14</code></td><td>Padrão, inclusive para uma config sem a linha <code>transport</code></td></tr>
          <tr><td><code>"gift-wrap"</code></td><td>v1 — gift wraps NIP-59</td><td><code>1059</code></td><td>Descontinuado, apenas opt-in, removido na v0.19.0</td></tr>
        </tbody>
      </table>

      <p>Seu nó anuncia qual protocolo fala no seu evento de info kind 38385, então clientes compatíveis escolhem o formato por conta própria. Mostro Mobile, Mostrix e mostro-cli suportam v2.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Só se você precisa atender clientes antigos</div>
        <p>Escreva <code>transport = "gift-wrap"</code> apenas para continuar atendendo clientes que só falam o protocolo v1 durante a transição. Nunca é selecionado automaticamente e desaparece na v0.19.0, depois disso seu nó roda apenas v2. Deixe o padrão a menos que tenha um motivo específico.</p>
      </div>

      <p>O transporte v2 também permite um filtro anti-spam mais fino que o de 4.6. <code>pow</code> se aplica a toda mensagem, enquanto <code>pow_first_contact</code> se aplica só a remetentes que não fazem parte de uma operação ativa e é verificado antes da decifragem. Assim as operações em curso seguem baratas e os desconhecidos precisam de trabalho real:</p>
      <pre><code>[mostro]
pow = 0                  # operações em curso
pow_first_contact = 16   # novas ordens e tomadas de chaves desconhecidas</code></pre>`,
    },
    'ln-safety': {
      title: `4.9 Limites de Segurança Lightning`,
      nav: `Limites Lightning`,
      html: `      <p>Estas configurações de <code>[lightning]</code> limitam quanto tempo seus canais podem ficar travados e quantos pagamentos podem estar sem resolução ao mesmo tempo. Todas têm valor padrão, então um arquivo de configuração de uma versão anterior ainda inicia, mas um template novo já as inclui e vale conhecê-las.</p>

      <pre><code>[lightning]
max_final_cltv_expiry_delta = 144
escrow_deadline_margin_blocks = 24
max_inflight_payouts = 100
max_inflight_payouts_per_destination = 10
payment_cltv_limit = 1008
allow_node_change = false</code></pre>

      <table class="guide-table">
        <thead><tr><th>Configuração</th><th>O que protege</th></tr></thead>
        <tbody>
          <tr><td><code>max_final_cltv_expiry_delta</code></td><td>Rejeita uma fatura de recebimento cujo CLTV final permitiria ao beneficiário reter seus sats por muito tempo. 144 blocos (cerca de um dia) é o máximo que carteiras reais pedem. Nunca coloque 0: isso rejeita toda fatura.</td></tr>
          <tr><td><code>escrow_deadline_margin_blocks</code></td><td>Margem de segurança antes de o LND cancelar automaticamente uma hold invoice aceita. Deve superar com folga o <code>invoices.holdexpirydelta</code> do seu nó, que por padrão é 12.</td></tr>
          <tr><td><code>max_inflight_payouts</code></td><td>Teto de pagamentos sem resolução no nó inteiro, para que um beneficiário que nunca liquida não esgote seus slots de HTLC. Um pagamento contido é atrasado, nunca descartado.</td></tr>
          <tr><td><code>max_inflight_payouts_per_destination</code></td><td>O mesmo teto por pubkey de destino, e o mais eficaz dos dois.</td></tr>
          <tr><td><code>payment_cltv_limit</code></td><td>Teto do timelock total de uma rota de pagamento. Não deve exceder o <code>--max-cltv-expiry</code> do seu LND e deve ficar pelo menos 576 blocos acima de <code>max_final_cltv_expiry_delta</code>, ou pagamentos legítimos falham com "no route".</td></tr>
          <tr><td><code>allow_node_change</code></td><td>Guarda de inicialização para troca de nó Lightning. Deixe em <code>false</code> e veja 5.8.</td></tr>
        </tbody>
      </table>

      <p>Note também que <code>max_routing_fee</code>, no bloco <code>[mostro]</code>, agora tem padrão <code>0.002</code> (0,2%).</p>`,
    },
    'price': {
      title: `4.10 Fontes de Preço do Bitcoin`,
      nav: `Fontes de preço`,
      html: `      <p>O Mostro precisa de uma taxa BTC/fiat para cotar as ordens. Sem um bloco <code>[price]</code> ele usa uma única fonte, a Yadio, através do já descontinuado <code>bitcoin_price_api_url</code>. Adicionar o bloco te dá várias fontes, combinadas por mediana e com descarte de valores atípicos, então uma API fora do ar ou devolvendo um número ruim não move seus preços.</p>

      <pre><code>[price]
update_interval_seconds = 300
max_price_staleness_seconds = 1800
outlier_threshold_pct = 5.0        # descarta uma fonte a essa distância da mediana (precisa de 3+ fontes)
provider_timeout_seconds = 10
provider_failure_threshold = 3     # falhas antes de deixar uma fonte de molho
provider_failure_cooldown_seconds = 120
publish_to_nostr = true            # publica as taxas agregadas como kind 30078

[price.providers.yadio]
enabled = true
url = "https://api.yadio.io"

[price.providers.coingecko]
enabled = true
url = "https://api.coingecko.com/api/v3"
# api_key = "CG-xxxx"              # opcional, aumenta os limites de taxa

[price.providers.currency_api]
enabled = true
url = "https://currency-api.pages.dev/v1"
fallback_urls = ["https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1"]
except = ["CUP", "MLC"]            # só taxa oficial, não misturar com fontes informais

[price.providers.blockchain]
enabled = true
url = "https://blockchain.info"</code></pre>

      <p>Cada fonte aceita <code>only</code> ou <code>except</code> para limitar a quais moedas contribui, e <code>fallback_urls</code> para espelhos tentados quando a URL principal falha. Uma fonte habilitada sem um segredo obrigatório falha na inicialização em vez de silenciosamente não produzir cotação alguma.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Se as APIs de preço estão bloqueadas no seu país</div>
        <p>Você pode pegar as taxas do Nostr em vez de HTTP, publicadas por nós Mostro em que você confia. Isso reaproveita os relays que já estão em <code>[nostr]</code>, então funciona em qualquer lugar onde seu nó já alcance um relay. Com vários nós confiáveis, vence o evento válido mais recente.</p>
        <pre><code>[price.providers.nostr]
enabled = true
trusted_nodes = [
    # pubkeys hex de nós Mostro em que você confia para publicar taxas exatas
]</code></pre>
      </div>

      <p>Operadores que atendem o peso cubano podem adicionar o El Toque para CUP e MLC do mercado informal. É opt-in, restrito a essas duas moedas, e precisa de um token gratuito: um El Toque habilitado sem <code>token</code> se recusa a iniciar.</p>`,
    },
    'optional-blocks': {
      title: `4.11 Outros Blocos Opcionais`,
      nav: `Blocos opcionais`,
      html: `      <p>Mais três blocos que você pode encontrar num template recente. Nenhum é obrigatório.</p>

      <p><strong>Retenção de eventos.</strong> Quanto tempo o Mostro guarda cada tipo de evento antes de expirar. Omita o bloco inteiro para aceitar os padrões.</p>
      <pre><code>[expiration]
order_days = 30        # eventos de ordens (kind 38383)
rating_days = 90       # histórico de reputação (kind 38384)
dispute_days = 90      # disputas, guardadas mais tempo para auditoria (kind 38386)
fee_audit_days = 365   # transparência de taxas (kind 8383)
dm_days = 30           # mensagens diretas do protocolo v2 (kind 14)</code></pre>

      <p><strong>Cauções anti-abuso</strong> (<code>[anti_abuse_bond]</code>) podem exigir uma caução por hold invoice dos tomadores, dos criadores ou de ambos, para que abandonar uma operação tenha custo. Desabilitado por padrão e ainda em liberação por fases. Leia o <code>docs/ANTI_ABUSE_BOND.md</code> do projeto antes de habilitá-lo num nó em produção.</p>

      <p><strong>Escrow com Cashu</strong> (<code>[cashu]</code>) é um modo experimental que roda sem LND e mantém o escrow em tokens Cashu de uma única mint. Ainda não serve para operar de verdade, as ações de trade continuam sendo rejeitadas, e não pode ser combinado com as cauções anti-abuso. Mencionado aqui para você saber o que é esse bloco quando o vir.</p>`,
    },
    'operating': {
      title: `5. Operando Seu Nó Mostro`,
      nav: `5. Operação do nó`,
      navShort: `5. Operação`,
      html: ``,
    },
    'disputes': {
      title: `5.1 Como funcionam as disputas`,
      nav: `Disputas`,
      html: `      <p>Disputas são sua responsabilidade operacional mais importante.</p>

      <p><strong>Quando ocorrem disputas?</strong></p>
      <ul>
        <li>O comprador diz que pagou, o vendedor diz que não recebeu</li>
        <li>O vendedor se recusa a liberar os Bitcoin após receber o pagamento</li>
        <li>Uma das partes deixa de responder</li>
      </ul>

      <p><strong>O processo de disputa:</strong></p>
      <ol>
        <li><strong>O usuário abre uma disputa</strong> — Uma das partes clica "Disputa" no cliente</li>
        <li><strong>Mostro marca a ordem</strong> — O status muda para "Disputa", os fundos permanecem bloqueados</li>
        <li><strong>O árbitro assume o caso</strong> — Um admin designado ao seu nó investiga</li>
        <li><strong>Investigação</strong> — Comunica-se com ambas as partes, solicita provas</li>
        <li><strong>Resolução</strong> — O árbitro decide: liberar ao comprador, ou devolver ao vendedor</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>Escolha seus árbitros com cuidado. Eles têm o poder de decidir para onde vão os fundos bloqueados. Escolha membros confiáveis e imparciais da comunidade. Recomenda-se 2-3 árbitros.</p>
      </div>


      <h4>Níveis de permissão dos solvers</h4>

      <p>Um solver pode ser registrado como somente leitura ou com poderes completos. Os dois níveis podem assumir uma disputa e falar com as partes, mas só um solver read-write pode decidir para onde vai o dinheiro.</p>

      <table class="guide-table">
        <thead><tr><th>Registrado como</th><th>Pode</th><th>Não pode</th></tr></thead>
        <tbody>
          <tr><td><code>npub1...:read</code></td><td>Assumir uma disputa, ler, escrever para ambas as partes</td><td>Liquidar ou cancelar a ordem</td></tr>
          <tr><td><code>npub1...:read-write</code></td><td>Tudo, incluindo liquidar e cancelar</td><td>—</td></tr>
        </tbody>
      </table>

      <p>Um <code>npub1...</code> sem sufixo fica como read-write por padrão, e o mesmo vale para o registro pela interface RPC. Comece um árbitro novo em <code>:read</code> enquanto ele aprende o processo, e registre-o de novo como read-write quando você confiar no julgamento dele.</p>`,
    },
    'mostrix': {
      title: `5.2 Mostrix — Sua ferramenta de administração`,
      nav: `Mostrix`,
      html: `      <p>Mostrix é um cliente baseado em terminal (TUI) para resolução de disputas. Se você executa um nó Mostro, precisa do Mostrix.</p>

      <h4>Opção A: Baixar binário pré-compilado (Recomendado)</h4>
      <p>Baixe a última versão para sua plataforma em <a href="https://github.com/MostroP2P/mostrix/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a>:</p>

      <pre><code># Linux (x86_64)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-unknown-linux-musl
chmod +x mostrix-x86_64-unknown-linux-musl
./mostrix-x86_64-unknown-linux-musl

# Linux (ARM64 / Raspberry Pi 4)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-unknown-linux-musl
chmod +x mostrix-aarch64-unknown-linux-musl
./mostrix-aarch64-unknown-linux-musl

# Windows
# Baixe mostrix-x86_64-pc-windows-gnu.exe da página de releases</code></pre>

      <div class="callout tip">
        <div class="callout-title">🔐 Verifique a Release</div>
        <p>Verifique sempre o binário antes de executá-lo. Importe as chaves dos mantenedores uma única vez:</p>
        <pre><code>curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/negrunch.asc | gpg --import
curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/arkanoider.asc | gpg --import</code></pre>
        <p>As assinaturas são arquivos separados chamados <code>manifest.txt.sig.&lt;mantenedor&gt;</code>. Não toda release traz as duas, então confira a página da release e baixe as que realmente estiverem listadas:</p>
        <pre><code>wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt
wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt.sig.arkanoider

# Verifique cada assinatura que baixou
gpg --verify manifest.txt.sig.arkanoider manifest.txt

# Depois compare o hash do binário com o manifest
shasum -a 256 mostrix-x86_64-unknown-linux-musl
grep mostrix-x86_64-unknown-linux-musl manifest.txt</code></pre>
        <p>Uma assinatura válida de uma chave de mantenedor em que você confia é suficiente. Se um <code>wget</code> retornar 404, essa assinatura simplesmente não foi publicada para essa release: não trate um arquivo ausente como um verificado.</p>
      </div>

      <h4>Opção B: Compilar do código fonte</h4>
      <p>Se preferir compilar do código fonte ou precisar de uma plataforma não disponível nas releases:</p>

      <pre><code># Instalar dependências (Ubuntu/Debian)
sudo apt install -y cmake build-essential pkg-config

# Instalar Rust (se ainda não instalado)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Clonar e compilar
git clone https://github.com/MostroP2P/mostrix.git
cd mostrix
cargo build --release

# Executar
./target/release/mostrix</code></pre>

      <h4>Primeira execução e configuração</h4>
      <p>Na primeira execução, Mostrix <strong>gera automaticamente</strong> um arquivo <code>~/.mostrix/settings.toml</code> com valores padrão sensatos, incluindo um novo par de chaves Nostr. Seu <code>npub</code> gerado será exibido no terminal.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante: Configure sua pubkey do Mostro</div>
        <p>A configuração auto-gerada usa a <strong>pubkey oficial do Mostro</strong> por padrão. Você deve alterá-la para a <strong>pubkey do seu próprio nó Mostro</strong>:</p>
        <pre><code># Editar a configuração
nano ~/.mostrix/settings.toml

# Altere esta linha para a pubkey do SEU nó Mostro:
mostro_pubkey = "SUA_PUBKEY_MOSTRO_HEX"</code></pre>
      </div>

      <p>Para modo admin (resolução de disputas), configure também:</p>
      <pre><code># ~/.mostrix/settings.toml
mostro_pubkey = "SUA_PUBKEY_MOSTRO_HEX"
nsec_privkey = "nsec1sua_chave_pessoal"      # Auto-gerada na primeira execução
admin_privkey = "nsec1sua_chave_admin"        # O nsec do próprio daemon — veja abaixo
relays = ["wss://relay.mostro.network"]
currencies_filter = []                        # Vazio = mostrar todas as moedas
user_mode = "admin"                           # Habilitar modo admin</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Qual chave vai em admin_privkey?</div>
        <p>O Mostro reconhece o operador pela <strong>própria</strong> chave, então <code>admin_privkey</code> tem que ser o <code>nsec_privkey</code> do daemon, aquele cuja pubkey você colocou em <code>mostro_pubkey</code>. Uma chave pessoal é rejeitada.</p>
        <p>Essa chave é a identidade do seu nó, então evite carregá-la num laptop. Registre uma chave de solver separada e use essa para as disputas. Só a chave do operador pode adicionar solvers:</p>
        <pre><code>ADMIN_NSEC=nsec1... mostro-cli admaddsolver -n npub1solver...</code></pre>
        <p>A opção <strong>Settings → Add Dispute Solver</strong> do Mostrix faz o mesmo.</p>
      </div>`,
    },
    'watchdog': {
      title: `5.3 mostro-watchdog — Notificações de disputas no Telegram`,
      nav: `mostro-watchdog`,
      html: `      <p><code>mostro-watchdog</code> monitora seu nó Mostro para disputas e envia alertas instantâneos via Telegram. Essencial para tempos de resposta rápidos.</p>

      <p><strong>Opção A: Instalação automática (Recomendada)</strong></p>
      <pre><code># Baixe e execute o script de instalação
curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash</code></pre>

      <p><strong>Opção B: Download manual do binário</strong></p>
      <pre><code># Linux x86_64 (Intel/AMD)
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/mostro-watchdog-linux-x86_64
chmod +x mostro-watchdog-linux-x86_64
sudo mv mostro-watchdog-linux-x86_64 /usr/local/bin/mostro-watchdog

# Linux ARM64 (Raspberry Pi, servidores ARM)
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/mostro-watchdog-linux-aarch64
chmod +x mostro-watchdog-linux-aarch64
sudo mv mostro-watchdog-linux-aarch64 /usr/local/bin/mostro-watchdog</code></pre>

      <p><strong>Opção C: Compilar do código fonte</strong></p>
      <pre><code>git clone https://github.com/MostroP2P/mostro-watchdog.git
cd mostro-watchdog
cargo build --release
sudo cp target/release/mostro-watchdog /usr/local/bin/</code></pre>

      <p><strong>Configuração:</strong></p>
      <pre><code>cp config.example.toml config.toml
nano config.toml</code></pre>

      <pre><code>[mostro]
pubkey = "SUA_PUBKEY_MOSTRO"

[nostr]
relays = ["wss://relay.mostro.network", "wss://nos.lol"]

[telegram]
bot_token = "SEU_BOT_TOKEN"
chat_id = -1001234567890</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Dica</div>
        <p>Execute <code>mostro-watchdog</code> como serviço systemd junto ao seu nó Mostro para monitoramento 24/7.</p>
      </div>`,
    },
    'monitoring': {
      title: `5.4 Monitoramento de uptime`,
      nav: `Monitoramento`,
      html: `      <p>Seu nó precisa estar funcionando 24/7.</p>

      <pre><code># Nativo
systemctl status mostro.service
journalctl -u mostro -f
journalctl -u mostro | grep -E "(error|warn|connected)" --ignore-case

# Docker Hub (Opção A)
docker ps --filter name=mostro
docker logs -f mostro

# Docker Build (Opção B)
docker compose -f /opt/mostro/docker/compose.yml ps
docker compose -f /opt/mostro/docker/compose.yml logs -f mostro</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Dica pro</div>
        <p>Configure um monitor de uptime simples usando <a href="https://uptimerobot.com/" target="_blank" rel="noopener noreferrer">UptimeRobot</a> (nível gratuito) ou um cron job que te alerte se o Mostro cair.</p>
      </div>


      <h4>Checar seu nó de fora</h4>
      <p>Seu nó republica um evento de info (kind 38385) que se descreve: taxas, moedas, versão de protocolo, flag de manutenção. Ler isso de um relay é o jeito mais rápido de confirmar que o mundo externo vê o que você acha que vê.</p>
      <pre><code>cargo install nostreq nostcat
nostreq --kinds 38385 --limit 1 --authors SUA_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq</code></pre>`,
    },
    'updating': {
      title: `5.5 Atualizando Mostro`,
      nav: `Atualização`,
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
        <div class="callout-title">💡 Dica</div>
        <p>Sempre faça backup do banco de dados antes de atualizar.</p>
      </div>

      <div class="callout important">
        <div class="callout-title">⚠️ Não troque de nó Lightning ao mesmo tempo</div>
        <p>Atualizar o Mostro é seguro a qualquer momento. Apontá-lo para um nó Lightning <strong>diferente</strong> não é: drene o escrow primeiro, veja 5.8.</p>
      </div>`,
    },
    'backups': {
      title: `5.6 Backups`,
      nav: `Backups`,
      html: `      <p>Arquivos críticos para backup: <code>settings.toml</code>, o arquivo <code>.env</code> se você guarda seu nsec ali (veja 4.1), e <code>mostro.db</code> (histórico de ordens, reputação).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Não copie um banco em uso com cp</div>
        <p>O SQLite roda em modo WAL, então as escritas recentes ficam em <code>mostro.db-wal</code> até serem consolidadas. Copiar só o <code>mostro.db</code> com o Mostro rodando pode gerar um backup sem as operações mais novas. Use o comando de backup do próprio SQLite, que é seguro num banco em uso e escreve um único arquivo consistente.</p>
      </div>

      <pre><code># Backup manual — Docker Hub:
mkdir -p /root/mostro-backups
sqlite3 ~/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp ~/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp ~/mostro-config/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null

# Backup manual — Nativo:
sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)</code></pre>

      <p><strong>Backup diário automático</strong> (adicione ao crontab com <code>crontab -e</code>):</p>
      <pre><code># Docker Hub (Opção A):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /root/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /root/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d)

# Nativo (Opção C) / Docker Build (Opção B):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d)</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Crítico</div>
        <p>Sua <code>nsec_privkey</code> no <code>settings.toml</code> É a identidade do seu nó. Se perdê-la, perde sua reputação e todos os usuários devem reconectar-se a uma nova identidade. <strong>Guarde uma cópia offline.</strong></p>
      </div>`,
    },
    'activity': {
      title: `5.7 Revisando a atividade de operações`,
      nav: `Atividade`,
      html: `      <pre><code># Contar todas as ordens
sqlite3 /caminho/para/mostro.db "SELECT COUNT(*) FROM orders;"

# Operações bem-sucedidas recentes
sqlite3 /caminho/para/mostro.db "SELECT id, fiat_code, fiat_amount, amount, fee, status, created_at FROM orders WHERE status = 'success' ORDER BY created_at DESC LIMIT 10;"

# Ordens pendentes
sqlite3 /caminho/para/mostro.db "SELECT id, fiat_code, fiat_amount, status, created_at FROM orders WHERE status = 'pending';"

# Receita de taxas: orders.fee guarda a metade de cada parte, então a taxa bruta do nó é fee*2 e a dev fee é descontada dela
sqlite3 /caminho/para/mostro.db "SELECT SUM(fee*2) AS gross_fees, SUM(dev_fee) AS dev_fees, SUM(fee*2 - COALESCE(dev_fee, 0)) AS net_fees FROM orders WHERE status = 'success';"</code></pre>`,
    },
    'ln-migration': {
      title: `5.8 Modo Manutenção e Troca de Nó Lightning`,
      nav: `Trocar nó LN`,
      html: `      <p>Hold invoices, cauções e pagamentos em voo pertencem ao nó Lightning que os criou. Apontar o Mostro para outro nó enquanto algo disso está aberto deixaria essas operações penduradas, então o daemon <strong>se recusa a iniciar</strong> quando vê uma identidade LND nova com escrow ainda ligado à anterior:</p>
      <pre><code>REFUSING TO START: Lightning node changed from ... but escrow is still bound to the old node</code></pre>

      <p>O modo manutenção é a forma de drenar primeiro. Enquanto está ativo, novas ordens e tomadas são rejeitadas e as operações abertas continuam funcionando, para que o escrow possa liquidar. Requer a interface RPC habilitada (veja 4.7).</p>

      <ol>
        <li>Anuncie a janela aos seus usuários com bastante antecedência.</li>
        <li>Ative o modo manutenção: <code>mostro-cli admsetmaintenance -e true -r "LN node migration"</code>.</li>
        <li>Consulte <code>mostro-cli admmaintenancestatus</code> até reportar <code>drained = true</code>. Ordens pendentes expiram sozinhas; para encurtar a drenagem você pode cancelar uma com <code>mostro-cli admcancelpending -o &lt;order-id&gt;</code>, que libera a caução do criador na hora. Anuncie antes, é a ordem do usuário. Feche as disputas de longa duração como sempre.</li>
        <li>Mantenha o nó <strong>antigo</strong> online todo o tempo. Ele ainda tem que terminar os pagamentos em voo.</li>
        <li>Pare o Mostro e faça backup de <code>mostro.db</code>.</li>
        <li>Aponte <code>[lightning]</code> para o nó novo e deixe <code>allow_node_change = false</code>.</li>
        <li>Inicie o Mostro. Ele registra a pubkey nova. Desative o modo manutenção e teste com uma ordem.</li>
        <li>Só então desative o nó antigo.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ allow_node_change</div>
        <p>Coloque <code>true</code> apenas para recuperação de desastre, quando o nó antigo se perdeu de vez. Isso deixa deliberadamente as operações afetadas sem resolução. Mover o mesmo nó para outro host não é troca de nó e não precisa de nada disso.</p>
      </div>`,
    },
    'operator-cli': {
      title: `5.9 Comandos de Operador com mostro-cli`,
      nav: `CLI de operador`,
      html: `      <p>O Mostrix é o jeito confortável de trabalhar disputas, mas o <code>mostro-cli</code> cobre o mesmo terreno de um shell e tem alguns comandos que o Mostrix não tem. Os comandos de disputa são assinados com uma chave Nostr passada como <code>ADMIN_NSEC</code>, e ela precisa ser a do próprio daemon ou a de um solver registrado.</p>

      <pre><code># Trabalho de disputas (via Nostr, precisa de ADMIN_NSEC)
export ADMIN_NSEC=nsec1...
mostro-cli listdisputes
mostro-cli admtakedispute -d &lt;dispute-id&gt;
mostro-cli admsenddm -p &lt;npub&gt; -m "mensagem para uma parte"
mostro-cli admsettle -o &lt;order-id&gt;      # liberar para o comprador
mostro-cli admcancel -o &lt;order-id&gt;      # reembolsar o vendedor

# Registrar um árbitro, opcionalmente somente leitura
mostro-cli admaddsolver -n npub1...:read</code></pre>

      <p>Outro grupo de comandos vai pelo gRPC de administração em vez do Nostr, então precisam de <code>MOSTRO_RPC_URL</code> e <code>MOSTRO_RPC_TOKEN</code> em vez de <code>ADMIN_NSEC</code>, e da interface RPC habilitada (veja 4.7).</p>

      <pre><code>export MOSTRO_RPC_URL=http://127.0.0.1:50051
export MOSTRO_RPC_TOKEN=seu-token-de-auth

mostro-cli admsetmaintenance -e true -r "motivo"
mostro-cli admmaintenancestatus
mostro-cli admcancelpending -o &lt;order-id&gt;</code></pre>

      <p>Vale conhecer o <code>admcancelpending</code> fora de uma migração. Ele cancela uma ordem que ainda está pendente ou esperando a caução de um tomador, avisa o criador e libera todas as cauções de uma vez. Use para uma ordem claramente abandonada ou mal cotada, e avise o criador antes: é a ordem dele, e isso não é uma resolução de disputa.</p>`,
    },
    'costs': {
      title: `6. Análise de Custos`,
      nav: `6. Análise de custos`,
      navShort: `6. Custos`,
      html: `      <h3>Custos operacionais mensais</h3>
      <table class="guide-table">
        <thead><tr><th>Item</th><th>Custo mensal</th><th>Notas</th></tr></thead>
        <tbody>
          <tr><td>VPS (servidor)</td><td>$10–24</td><td>Depende do provedor e especificações</td></tr>
          <tr><td>Nome de domínio (opcional)</td><td>$1–2</td><td>Para um site/identidade</td></tr>
          <tr><td>Taxas on-chain de canais Lightning</td><td>Variável</td><td>Abertura/fechamento de canais</td></tr>
          <tr><td><strong>Total mensal</strong></td><td><strong>$11–26</strong></td><td>Excluindo liquidez Lightning</td></tr>
        </tbody>
      </table>

      <h3>Custos únicos / de capital</h3>
      <table class="guide-table">
        <thead><tr><th>Item</th><th>Custo</th><th>Notas</th></tr></thead>
        <tbody>
          <tr><td>Liquidez Lightning</td><td>0,01–1,0+ BTC</td><td>Bloqueado em canais; recuperado ao fechar</td></tr>
          <tr><td>Hardware do nó (se auto-hospedado)</td><td>$0–600</td><td>Grátis se usar VPS; $300-600 para Start9/Umbrel</td></tr>
          <tr><td>Tempo de configuração</td><td>4–16 horas</td><td>Dependendo do nível de experiência</td></tr>
        </tbody>
      </table>

      <h3>Potencial de receita</h3>
      <table class="guide-table">
        <thead><tr><th>Volume mensal</th><th>Taxa (0,6%)</th><th>Taxa dev (30%)</th><th>Sua receita líquida</th></tr></thead>
        <tbody>
          <tr><td>$1.000</td><td>~$6</td><td>~$1,80</td><td>~$4,20</td></tr>
          <tr><td>$10.000</td><td>~$60</td><td>~$18</td><td>~$42</td></tr>
          <tr><td>$50.000</td><td>~$300</td><td>~$90</td><td>~$210</td></tr>
          <tr><td>$100.000</td><td>~$600</td><td>~$180</td><td>~$420</td></tr>
        </tbody>
      </table>

      <div class="callout important">
        <div class="callout-title">📝 Realidade</div>
        <p>A maioria dos nós novos leva meses para construir volume de operações. Não espere lucratividade imediata. O valor real geralmente vem de fornecer um serviço à sua comunidade, com as taxas como bônus.</p>
      </div>

      <h3>Compromisso de tempo</h3>
      <table class="guide-table">
        <thead><tr><th>Tarefa</th><th>Frequência</th><th>Tempo</th></tr></thead>
        <tbody>
          <tr><td>Monitoramento (verificar logs, status)</td><td>Diário</td><td>5–10 min</td></tr>
          <tr><td>Resolução de disputas</td><td>Conforme necessário</td><td>15–60 min por disputa</td></tr>
          <tr><td>Atualizações</td><td>Mensal</td><td>15–30 min</td></tr>
          <tr><td>Gerenciamento de liquidez</td><td>Semanal</td><td>15–30 min</td></tr>
          <tr><td><strong>Estimativa semanal total</strong></td><td></td><td><strong>1–3 horas</strong></td></tr>
        </tbody>
      </table>`,
    },
    'faq': {
      title: `7. Perguntas Frequentes`,
      nav: `7. Perguntas frequentes`,
      navShort: `7. FAQ`,
      html: `      <h3>Preciso ser desenvolvedor para executar um nó Mostro?</h3>
      <p>Não, mas precisa se sentir confortável com operações básicas de linha de comando (digitar comandos, editar arquivos de texto). O caminho Docker (Opção A) foi projetado para ser acessível.</p>

      <h3>Posso executar Mostro em um Raspberry Pi?</h3>
      <p>Tecnicamente sim (usando Start9 ou similar), mas não é recomendado para produção devido às limitações de CPU e RAM. Um VPS é mais confiável.</p>

      <h3>Posso usar Core Lightning (CLN) em vez de LND?</h3>
      <p>Não. Mostro atualmente suporta apenas LND, porque depende da implementação específica de hold invoices do LND. O suporte para outras implementações pode chegar no futuro.</p>

      <h3>Como os usuários se conectam ao meu Mostro?</h3>
      <p>Os usuários precisam de um app cliente Mostro (como Mostro Mobile ou mostro-cli) e da chave pública do seu Mostro (npub). Eles adicionam sua npub ao cliente, e o cliente se comunica através dos relays Nostr. Não é necessária conexão direta.</p>

      <h3>Posso executar múltiplas instâncias de Mostro?</h3>
      <p>Sim, mas cada uma precisa de seu próprio par de chaves Nostr, nó LND (ou pelo menos canais/liquidez separados), e configuração.</p>

      <h3>É legal?</h3>
      <p>Depende muito da sua jurisdição. Mostro é software para trading peer-to-peer. Em algumas jurisdições, operar uma exchange P2P pode exigir licenças. <strong>Verifique as regulamentações locais e procure assessoria jurídica.</strong></p>

      <h3>Quanta largura de banda o Mostro usa?</h3>
      <p>Muito pouca — principalmente pequenos eventos Nostr. Alguns GB por mês é típico mesmo com volume moderado.</p>

      <h3>O que acontece se meu nó ficar offline?</h3>
      <p>Ordens pendentes eventualmente expiram. Operações ativas com fundos bloqueados continuam quando você volta a ficar online. Se ficar offline por muito tempo, os usuários podem perder a confiança. Desde a v0.18.3 há também um prazo para o escrow: se o nó ficar fora o tempo suficiente para a hold invoice se aproximar do seu horizonte CLTV, o LND a cancela e o vendedor é reembolsado automaticamente.</p>

      <h3>Posso mudar minha chave Nostr depois?</h3>
      <p>Pode, mas perderá a identidade e reputação do seu nó. Os usuários o verão como um Mostro novo. Trate sua chave como sua identidade de marca.</p>

      <h3>Posso perder dinheiro executando um nó Mostro?</h3>
      <p>Sim, é possível: os fundos dos canais Lightning podem estar em risco por bugs (raro); o fechamento forçado de canais durante períodos de taxas altas pode ser custoso; os custos de VPS são contínuos.</p>

      <h3>A liquidez Lightning está "em risco"?</h3>
      <p>Sua liquidez Lightning é sua. Não está em risco pelo Mostro em si — hold invoices são bloqueios temporários. No entanto, aplicam-se os riscos padrão da Lightning Network (fechamentos forçados, canais travados, bugs).</p>

      <h3>Quando vou atingir o ponto de equilíbrio?</h3>
      <p>Depende dos seus custos e volume de operações. Com $20/mês de custos e 0,6% de taxa, você precisa de ~$5.000/mês em operações para cobrir custos (antes da taxa de desenvolvimento). A maioria das comunidades leva 3–6 meses para construir volume significativo.</p>

      <h3>Posso mover o Mostro para outro nó Lightning?</h3>
      <p>Sim, mas não editando a configuração e reiniciando. O escrow está ligado ao nó que o criou, então primeiro se drena em modo manutenção, e o daemon se recusa a iniciar se você pular isso. Mover o mesmo nó para outro host não é troca de nó e não precisa de nada especial. Veja 5.8.</p>`,
    },
    'security': {
      title: `8. Considerações de Segurança`,
      nav: `8. Segurança`,
      navShort: `8. Segurança`,
      html: `      <div class="callout important">
        <div class="callout-title">⚠️ Aviso de software em estágio inicial</div>
        <p><strong>Mostro está em estágio inicial de desenvolvimento.</strong> Embora a equipe trabalhe duro para garantir confiabilidade, pode haver bugs não descobertos — incluindo bugs de segurança que podem resultar em perda de fundos. <strong>Os desenvolvedores não são responsáveis por qualquer perda de dinheiro devido a bugs de software.</strong></p>
        <p>Mostro é open-source e seu código está aberto para auditorias. Encorajamos as comunidades a promover e financiar auditorias de segurança independentes.</p>
        <p>Dito isso, <strong>o mecanismo central de custódia usando hold invoices Lightning tem sido testado em batalha desde 2021</strong>, quando o @lnp2pBot implementou pela primeira vez esse tipo de custódia. Milhares de operações foram concluídas com sucesso.</p>
      </div>

      <h3>Mantenha a Chave do Seu Nó Fora de Alcance</h3>

      <p>Sua <code>nsec_privkey</code> é a identidade do seu nó, e qualquer um que a tenha pode se passar pelo seu Mostro. Prefira fornecê-la pela variável de ambiente <code>MOSTRO_NSEC_PRIVKEY</code> ou por um arquivo <code>.env</code> com <code>chmod 600</code> em vez de deixá-la no <code>settings.toml</code> (veja 4.1). Também não a leve num laptop para atender disputas: registre uma chave de solver separada para isso (veja 5.2).</p>

      <h3>Operando sob regimes autoritários</h3>

      <p>Se você opera em um país com governo autoritário, <strong>privacidade não é opcional — é um requisito de segurança.</strong></p>

      <ol>
        <li><strong>Execute seu nó Mostro atrás de Tor e/ou uma VPN.</strong> Isso oculta o IP do seu servidor dos relays Nostr.</li>
        <li><strong>Se Tor/VPN não é possível</strong> (comum em países em desenvolvimento com internet lenta), <strong>publique eventos apenas em relays que você possui ou confia.</strong></li>
        <li><strong>Tenha muito cuidado com quais relays você usa.</strong> No futuro, governos podem criar relays Nostr especificamente para coletar endereços IP.</li>
        <li><strong>Considere também a privacidade do seu nó Lightning.</strong> Executar LND atrás de Tor é possível e recomendado em ambientes sensíveis.</li>
      </ol>

      <div class="callout tip">
        <div class="callout-title">💡 Dica</div>
        <p>A beleza de o Mostro ser descentralizado é que mesmo se um nó for desligado, outros continuam funcionando. Mas a prevenção é sempre melhor que a recuperação. Leve a privacidade a sério desde o primeiro dia.</p>
      </div>`,
    },
    'troubleshooting': {
      title: `9. Solução de Problemas`,
      nav: `9. Solução de problemas`,
      navShort: `9. Problemas`,
      html: `      <h3>Mostro não inicia</h3>

      <h4><code>dev_fee_percentage (0.05) is below minimum (0.1)</code></h4>
      <p>Defina <code>dev_fee_percentage</code> em pelo menos <code>0.10</code> no settings.toml.</p>

      <h4>Arquivo de configuração ou banco de dados não encontrado</h4>
      <p>Certifique-se de que o flag <code>-d</code> aponte para o diretório contendo <code>settings.toml</code>. Para Docker Hub: verifique se <code>~/mostro-config/settings.toml</code> existe.</p>

      <h4>O Mostro encerra na inicialização com <code>Ln node error</code></h4>
      <ul>
        <li>Verifique se o LND está executando: <code>lncli getinfo</code></li>
        <li>Confira se <code>lnd_grpc_host</code> corresponde ao endereço do seu LND</li>
        <li>Verifique se os caminhos de <code>tls.cert</code> e <code>mostro.macaroon</code> estão corretos</li>
        <li>Verifique se o macaroon tem as permissões de 2.2</li>
        <li>Docker + LND no host: use <code>host.docker.internal</code>. A Opção B precisa também do mapeamento <code>extra_hosts</code>.</li>
      </ul>

      <h4><code>REFUSING TO START: Lightning node changed</code></h4>
      <p>O Mostro aponta para uma identidade LND diferente enquanto há escrow aberto na anterior. Reconecte o nó antigo e drene-o antes de trocar. Veja 5.8.</p>

      <h4>Os clientes não veem minhas ordens ou não conseguem escrever para o meu nó</h4>
      <p>Confira a linha <code>Transport:</code> nos seus logs. Um nó em <code>nip44</code> é invisível para clientes que só falam o protocolo v1, e um nó em <code>gift-wrap</code> é invisível para clientes v2. Veja 4.8.</p>

      <h4>Os pagamentos falham com "no route"</h4>
      <p>Confira <code>payment_cltv_limit</code>. Deve ficar pelo menos 576 blocos acima de <code>max_final_cltv_expiry_delta</code> e não deve exceder o <code>--max-cltv-expiry</code> do seu LND. Veja 4.9.</p>

      <h3>Problemas de conexão</h3>

      <h4>Mostro inicia mas não conecta aos relays</h4>
      <ul>
        <li>Verifique as URLs dos relays (devem começar com <code>wss://</code>)</li>
        <li>Certifique-se de que o firewall do seu VPS permite conexões de saída na porta 443</li>
        <li>Tente relays diferentes — alguns podem estar temporariamente fora do ar</li>
      </ul>

      <h3>Problemas com operações</h3>

      <h4>Um usuário recebe "cant-do: too_many_requests" ao restaurar sessão</h4>
      <p>Isso acontece quando o usuário tem mais ordens (históricas + ativas) que o valor de <code>max_orders_per_response</code> na sua configuração. O cliente tenta consultar todas as ordens de uma vez e o Mostro rejeita. <strong>Não é um ban nem um bloqueio temporário</strong> — continuará acontecendo até que você ajuste o valor.</p>
      <pre><code># Em settings.toml, aumente o limite:
max_orders_per_response = 50  # o padrão é 10, o máximo 255
</code></pre>

      <p>O valor é guardado em um único byte, então <code>255</code> é o teto. Se um usuário tem mais ordens que isso, ele precisa limpar o histórico em vez de você seguir subindo o limite.</p>

      <h4>Ordens não aparecem nos clientes</h4>
      <ul>
        <li>Verifique as conexões com relays nos logs</li>
        <li>Certifique-se de que os clientes usem os mesmos relays que seu nó</li>
      </ul>

      <h4>Pagamentos falhando</h4>
      <ul>
        <li>Verifique a liquidez: <code>lncli listchannels</code></li>
        <li>Certifique-se de ter capacidade de saída suficiente</li>
        <li>Verifique a configuração <code>max_routing_fee</code></li>
      </ul>

      <h3>Problemas de banco de dados</h3>

      <h4>Erros de banco de dados bloqueado</h4>
      <pre><code>ps aux | grep mostrod
# Se houver múltiplos processos, encerre os extras:
kill &lt;PID&gt;</code></pre>

      <h3>Obtendo ajuda</h3>

      <ol>
        <li><strong>Verifique os logs primeiro</strong> — a maioria dos erros explica o que deu errado</li>
        <li><strong>Telegram (Desenvolvedores):</strong> <a href="https://t.me/mostro_dev" target="_blank" rel="noopener noreferrer">@mostro_dev</a></li>
        <li><strong>Telegram (Comunidade):</strong> <a href="https://t.me/MostroP2P" target="_blank" rel="noopener noreferrer">@MostroP2P</a></li>
        <li><strong>GitHub Issues:</strong> <a href="https://github.com/MostroP2P/mostro/issues" target="_blank" rel="noopener noreferrer">github.com/MostroP2P/mostro/issues</a></li>
        <li><strong>DeepWiki:</strong> <a href="https://deepwiki.com/MostroP2P/mostro" target="_blank" rel="noopener noreferrer">deepwiki.com/MostroP2P/mostro</a></li>
      </ol>

      <p>Ao pedir ajuda, sempre inclua: sua versão do Mostro, a saída relevante dos logs, e o que já tentou.</p>

      <!-- ===== APPENDIX ===== -->`,
    },
    'appendix': {
      title: `Apêndice: Referência Rápida`,
      nav: `Apêndice`,
      html: `      <h3>Localizações importantes de arquivos</h3>
      <table class="guide-table">
        <thead><tr><th>Arquivo</th><th>Docker Hub</th><th>Nativo</th></tr></thead>
        <tbody>
          <tr><td>Configuração</td><td><code>~/mostro-config/settings.toml</code></td><td><code>/opt/mostro/settings.toml</code></td></tr>
          <tr><td>Banco de dados</td><td><code>~/mostro-config/mostro.db</code></td><td><code>/opt/mostro/mostro.db</code></td></tr>
          <tr><td>Cert LND</td><td><code>~/mostro-config/lnd/tls.cert</code></td><td>Varia (verifique config LND)</td></tr>
          <tr><td>Macaroon LND</td><td><code>~/mostro-config/lnd/mostro.macaroon</code></td><td>Varia (verifique config LND)</td></tr>
          <tr><td>Serviço</td><td>N/A</td><td><code>/etc/systemd/system/mostro.service</code></td></tr>
          <tr><td>Logs</td><td><code>docker logs -f mostro</code></td><td><code>journalctl -u mostro</code></td></tr>
        </tbody>
      </table>

      <h3>Comandos essenciais</h3>
      <pre><code># Docker
docker logs -f mostro         # Ver logs
docker restart mostro          # Reiniciar
docker stop mostro             # Parar

# Nativo (systemd)
systemctl start mostro         # Iniciar
systemctl stop mostro          # Parar
systemctl restart mostro       # Reiniciar
systemctl status mostro        # Ver status
journalctl -u mostro -f        # Ver logs

# Banco de dados
sqlite3 mostro.db "SELECT COUNT(*) FROM orders;"                           # Total de ordens
sqlite3 mostro.db "SELECT COUNT(*) FROM orders WHERE status='success';"    # Operações bem-sucedidas
sqlite3 mostro.db "SELECT SUM(fee*2 - COALESCE(dev_fee, 0)) FROM orders WHERE status='success';"  # Taxas líquidas mantidas pelo nó</code></pre>

      <h3>Configuração recomendada para nós novos</h3>
      <pre><code>[mostro]
fee = 0.006
max_order_amount = 500000
min_payment_amount = 1000
expiration_hours = 24
expiration_seconds = 900
pow = 0
dev_fee_percentage = 0.30
fiat_currencies_accepted = ['BRL']  # Mude para sua moeda local

[nostr]
relays = [
  'wss://relay.mostro.network',
  'wss://nos.lol',
  'wss://relay.nostr.band'
]</code></pre>`,
    },
  },
};

export default pt;
