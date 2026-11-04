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
        <li><strong>Receita de taxas</strong> — Cada operação gera a taxa que você definir (o template vem com 0; 0,6% é uma escolha comum). A 0,6%, uma comunidade que faz $10.000 em operações mensais ganha ~$60/mês em taxas.</li>
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

      <p><strong>Gere um macaroon dedicado para o Mostro.</strong> Não entregue ao Mostro o seu <code>admin.macaroon</code>: ele concede controle total sobre o seu nó e seus fundos. Crie um macaroon que contenha apenas as permissões que o Mostro realmente usa (ler informações do nó, listar canais para o relatório de saúde, criar/liquidar/cancelar hold invoices, enviar e acompanhar pagamentos).</p>
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
        <li><code>Mostro pubkey: npub1... (hex ...)</code> — A identidade do seu nó. Anote o npub: é o que os usuários e outras ferramentas precisam</li>
        <li><code>Settings correctly loaded!</code> — A configuração é válida</li>
        <li><code>Transport: nip44 (protocol v2, event kind 14)</code> — Protocolo em uso (veja 4.8)</li>
        <li><code>Recorded Lightning node identity &lt;pubkey&gt;</code> — LND alcançado (apenas na primeira execução)</li>
        <li><code>Published health event: status ok, seq N</code> — Repetida a cada minuto. Pelo menos um relay aceitou o relatório de saúde do nó (veja 5.4)</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Nota</div>
        <p>Não existe uma mensagem de "conectado ao LND" nem de "conectado ao relay". O Mostro contata o LND durante a inicialização, então um daemon que continua rodando já tem a conexão funcionando. A falha, por outro lado, é ruidosa: registra <code>Ln node error</code> e encerra. Depois da inicialização ele consulta o LND a cada 15 segundos e registra <code>LND did not answer GetInfo</code> se ele parar de responder. Para os relays, a linha do evento de saúde é o seu sinal: <code>No relay accepted the health event</code> significa que nenhum deles o aceitou.</p>
      </div>

      <div class="callout tip">
        <div class="callout-title">💡 Solução de problemas</div>
        <p>Se aparecer <code>Permission denied (os error 13)</code>, reaplique as permissões: <code>chown -R 1000:1000 ~/mostro-config</code> e reinicie: <code>docker restart mostro</code>.</p>
      </div>

      <p>🎉 <strong>Parabéns!</strong> Se vir conexões bem-sucedidas nos logs, seu nó Mostro está funcionando!</p>

      <h4>Alternativa: Docker Compose</h4>
      <p>Em vez de um comando <code>docker run</code> longo, você pode descrever o contêiner em um arquivo compose. Ele roda a mesma imagem com as mesmas configurações, e atualizar vira trocar o tag em uma linha. Crie <code>~/mostro-docker/compose.yml</code>:</p>
      <pre><code>mkdir -p ~/mostro-docker
nano ~/mostro-docker/compose.yml</code></pre>
      <pre><code>services:
  mostro:
    image: mostrop2p/mostro:{{version}}
    container_name: mostro
    restart: unless-stopped
    extra_hosts:
      - "host.docker.internal:host-gateway"  # só se o LND roda neste VPS
    volumes:
      - \${HOME}/mostro-config:/config</code></pre>
      <p>Suba e acompanhe os logs:</p>
      <pre><code>docker compose -f ~/mostro-docker/compose.yml up -d
docker compose -f ~/mostro-docker/compose.yml logs -f mostro</code></pre>
      <p>Escolha um: <code>docker run</code> <strong>ou</strong> compose, não os dois. Para atualizar qualquer um deles, veja 5.5.</p>

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
      <p>Edite as mesmas configurações da Opção A, Passo 8, com uma diferença: <code>make docker-build</code> copia o seu macaroon para <code>config/lnd/admin.macaroon</code>, seja qual for o nome original, então aponte o Mostro para lá:</p>
      <pre><code>lnd_macaroon_file = '/config/lnd/admin.macaroon'  # continua sendo o seu mostro.macaroon restrito, com outro nome</code></pre>

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
        <li>Enviada automaticamente ao endereço Lightning <code>dev@pay.mostro.foundation</code>; não há nada para configurar</li>
        <li>Paga apenas quando o seu LND roda na <strong>mainnet</strong>. Em testnet, signet ou regtest os valores ainda são calculados, mas nada é pago e o log diz <code>dev fee payments are disabled</code></li>
        <li>Um pagamento que falha é tentado de novo por ordem, com intervalos de um minuto até uma hora</li>
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
        <li><strong><code>min_payment_amount</code>:</strong> Operação mínima em satoshis. 1.000 ou 10.000 é mais prático que 100. Ambos os limites são verificados contra os sats que a ordem realmente movimenta, prêmio ou desconto incluídos.</li>
        <li><strong><code>max_orders_per_response</code>:</strong> Quantidade máxima de ordens que o Mostro retorna em uma única consulta. Se um usuário acumula mais ordens que esse limite (por exemplo ao restaurar sua sessão no cliente móvel), receberá um erro <code>cant-do: too_many_requests</code> e não conseguirá recuperar suas ordens. Se seus usuários operam com frequência, aumente esse valor (por exemplo 50 ou 100). O valor padrão de 10 pode ser insuficiente.</li>
        <li><strong><code>fiat_currencies_accepted</code>:</strong> Use <a href="https://en.wikipedia.org/wiki/ISO_4217" target="_blank" rel="noopener noreferrer">códigos ISO 4217</a>, em MAIÚSCULAS: a correspondência é exata. Array vazio <code>[]</code> aceita todas as moedas. Desde a v0.20.2 a lista também pode conter as stablecoins <code>USDT</code>, <code>USDC</code> e <code>DOC</code>, e bitcoin em outras redes (<code>BTC</code>, <code>LBTC</code>, <code>RBTC</code>) — veja 4.12.</li>
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
expiration_hours = 24        # Quanto tempo uma ordem não tomada fica no livro
max_expiration_days = 15     # Maior expiração que um criador pode pedir
expiration_seconds = 900     # Quanto tempo uma ordem tomada pode esperar pela hold invoice
                             # ou pela fatura do comprador antes de voltar ao livro (15 min)

[lightning]
hold_invoice_expiration_window = 300  # Tempo que o tomador tem para pagar a fatura ou fornecer uma de recebimento (5 min)
hold_invoice_cltv_delta = 144         # Duração do escrow, em blocos (~1 dia)</code></pre>

      <p>Note que <code>hold_invoice_expiration_window</code> pertence a <code>[lightning]</code>: escrito em <code>[mostro]</code> ele é ignorado em silêncio. Deve ser maior que 0 e também é a expiração da fatura da caução do tomador.</p>

      <p>Quando os sats do vendedor estão travados, o comprador tem aproximadamente <code>hold_invoice_cltv_delta - escrow_deadline_margin_blocks</code> blocos para enviar o pagamento: 144 − 24 = 120 blocos, cerca de 20 horas, com os padrões. Quando esse prazo acaba, o Mostro cancela a operação se o comprador nunca marcou o pagamento como enviado, ou abre uma disputa se marcou (veja 4.9). Os usuários veem a contagem regressiva no app.</p>`,
    },
    'antispam': {
      title: `4.6 Anti-Spam`,
      nav: `Anti-Spam`,
      html: `      <pre><code>[mostro]
pow = 0  # 0 = desabilitado; 10-20 = moderado. Comece com 0.</code></pre>

      <p>Um filtro mais fino é o <code>pow_first_contact</code>. <code>pow</code> se aplica a toda mensagem, enquanto <code>pow_first_contact</code> se aplica só a remetentes que não fazem parte de uma operação ativa e é verificado antes da decifragem. Assim as operações em curso seguem baratas e os desconhecidos precisam de trabalho real:</p>
      <pre><code>[mostro]
pow = 0                  # operações em curso
pow_first_contact = 16   # novas ordens e tomadas de chaves desconhecidas</code></pre>

      <p>Um desestímulo mais forte contra quem toma ordens e some é a caução anti-abuso (veja 4.11).</p>`,
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
      </div>

      <p>Além do modo manutenção, o RPC traz as chamadas de reputação <code>RevokeReputationImports</code> e <code>RebindReputationExport</code> (veja 4.13). Ambas são aceitas apenas via loopback, e o mostro-cli ainda não tem comando para elas: use o <code>grpcurl</code>. O mostro-cli envia o <code>MOSTRO_RPC_TOKEN</code> apenas para um endereço loopback ou via <code>https://</code>, nunca em texto claro para um host remoto.</p>`,
    },
    'transport': {
      title: `4.8 Protocolo de Transporte`,
      nav: `Transporte`,
      html: `      <p>Desde a v0.19.0 um nó Mostro fala <strong>apenas</strong> o protocolo v2: eventos kind 14 assinados com conteúdo cifrado NIP-44. O protocolo v1 (gift wraps NIP-59, kind 1059) foi removido, e não há mais nada para escolher. Deixe a linha <code>transport</code> fora do <code>settings.toml</code>; o template não a tem mais.</p>

      <table class="guide-table">
        <thead><tr><th>Linha no settings.toml</th><th>Resultado</th></tr></thead>
        <tbody>
          <tr><td>nenhuma</td><td>Protocolo v2. Recomendado.</td></tr>
          <tr><td><code>transport = "nip44"</code></td><td>Protocolo v2. Aceita e inofensiva.</td></tr>
          <tr><td><code>transport = "gift-wrap"</code></td><td><strong>O Mostro se recusa a iniciar</strong>, com um erro que manda você apagar a linha.</td></tr>
        </tbody>
      </table>

      <p>Seu nó anuncia <code>protocol_version</code> 2 no seu evento de info kind 38385. Todos os clientes atuais falam v2: o Mostro App, o Mostrix 0.3.1 ou posterior, o mostro-cli 0.16.2 ou posterior e o Bosstro. Um cliente que só fala v1, como uma versão antiga do Mostro Mobile, não recebe resposta do seu nó: peça aos seus usuários que atualizem.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Atualizando da v0.18.x</div>
        <p>Se o seu <code>settings.toml</code> ainda tem <code>transport = "gift-wrap"</code>, apague essa linha antes de atualizar. A única forma de continuar atendendo clientes do protocolo v1 é ficar no mostrod 0.18.x, que já não recebe correções.</p>
      </div>`,
    },
    'ln-safety': {
      title: `4.9 Limites de Segurança Lightning`,
      nav: `Limites Lightning`,
      html: `      <p>Estas configurações de <code>[lightning]</code> limitam quanto tempo seus canais podem ficar travados e quantos pagamentos podem estar sem resolução ao mesmo tempo. Todas têm valor padrão, então um arquivo de configuração de uma versão anterior normalmente ainda inicia, mas um template novo já as inclui e vale conhecê-las.</p>

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
          <tr><td><code>escrow_deadline_margin_blocks</code></td><td>Margem de segurança antes de o LND cancelar automaticamente uma hold invoice aceita. Quando a cadeia chega tão perto, o Mostro cancela a operação ou abre uma disputa enquanto o escrow ainda existe. Desde a v0.20.0 o Mostro <strong>se recusa a iniciar</strong> a menos que ela seja de pelo menos 18 (o <code>invoices.holdexpirydelta</code> padrão do LND, 12, mais 6 blocos de folga) e menor que <code>hold_invoice_cltv_delta</code>. Se você aumentou o <code>holdexpirydelta</code>, mantenha esta margem pelo menos 6 blocos acima dele por conta própria. O valor é publicado no seu evento de info.</td></tr>
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

      <p>Operadores que atendem o peso cubano podem adicionar o El Toque para CUP e MLC do mercado informal. É opt-in, restrito a essas duas moedas, e precisa de um token gratuito: um El Toque habilitado sem <code>token</code> se recusa a iniciar.</p>

      <p>Mantenha <code>publish_to_nostr = true</code>. Além de alimentar outros nós, as taxas publicadas dizem ao Mostro App quais moedas o seu nó consegue cotar a preço de mercado: um código ausente delas é oferecido apenas a preço fixo. Para cotar stablecoins e bitcoin em outras redes, veja 4.12.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Adicionar qualquer bloco [price] troca o motor de preços</div>
        <p>Assim que o <code>settings.toml</code> tem uma tabela <code>[price]</code> ou <code>[price.providers.*]</code>, o Mostro usa o motor de várias fontes e ignora o <code>bitcoin_price_api_url</code>. Garanta que pelo menos uma fonte de mercado (Yadio, CoinGecko, Currency API, Blockchain.com…) esteja habilitada, ou seu nó fica sem taxa fiat e recusa toda ordem a preço de mercado. Observe no log de inicialização os avisos que começam com <code>price:</code>.</p>
      </div>`,
    },
    'optional-blocks': {
      title: `4.11 Outros Blocos Opcionais`,
      nav: `Blocos opcionais`,
      html: `      <p>Mais blocos que você pode encontrar num template recente. Nenhum é obrigatório. Três deles têm uma seção própria: <code>[price.providers.pegged]</code> (4.12), <code>[reputation_import]</code> / <code>[reputation_export]</code> (4.13) e <code>[health]</code> (5.4). O <code>serbero_pubkey</code>, em <code>[mostro]</code>, é tratado em 5.10.</p>

      <p><strong>Retenção de eventos.</strong> Quanto tempo o Mostro guarda cada tipo de evento antes de expirar. Omita o bloco inteiro para aceitar os padrões.</p>
      <pre><code>[expiration]
order_days = 30        # eventos de ordens (kind 38383)
rating_days = 90       # histórico de reputação (kind 38384)
dispute_days = 90      # disputas, guardadas mais tempo para auditoria (kind 38386)
fee_audit_days = 365   # transparência de taxas (kind 8383)
dm_days = 30           # mensagens diretas do protocolo v2 (kind 14)</code></pre>

      <h4>Cauções anti-abuso</h4>
      <p><code>[anti_abuse_bond]</code> pede a tomadores, criadores ou ambos que travem uma pequena hold invoice Lightning junto à operação. Os usuários honestos a recebem de volta intacta; um solver pode confiscar a caução de quem agiu de má-fé, e uma parte vai para a contraparte honesta. Os usuários a veem como um "depósito" no app, e a documentação para usuários a explica no capítulo <em>Anti-Abuse Bond</em>. Todas as fases foram liberadas; vem desabilitada por padrão.</p>
      <pre><code>[anti_abuse_bond]
enabled = true
amount_pct = 0.01                 # caução = max(1% da ordem, base_amount_sats)
base_amount_sats = 1000
apply_to = "take"                 # "take" | "make" | "both"
slash_on_waiting_timeout = false  # confisca também de quem deixa sua etapa expirar
slash_node_share_pct = 0.5        # parte da caução confiscada que o nó fica
payout_claim_window_days = 15     # tempo que o vencedor tem para reivindicar sua parte
maker_bond_payment_timeout_seconds = 900
# bond_cltv_delta = 432           # veja abaixo</code></pre>
      <ul>
        <li>Um criador que ainda não pagou a caução pode cancelar a ordem, e uma ordem não paga expira após <code>maker_bond_payment_timeout_seconds</code>.</li>
        <li>A caução do criador fica travada enquanto a ordem espera no livro, então uma ordem fica ali no máximo <code>bond_cltv_delta - hold_invoice_cltv_delta - 144</code> blocos (cerca de 24 h com os padrões), diga o que disser o <code>expiration_hours</code>.</li>
        <li><code>bond_cltv_delta</code> deve ser maior que <code>hold_invoice_cltv_delta + 144</code> e no máximo 864. Na v0.20.2 seu padrão é um 432 fixo, então se você aumentou o <code>hold_invoice_cltv_delta</code> para 288 ou mais, defina-o explicitamente ou o Mostro se recusa a iniciar.</li>
        <li>Os solvers confiscam com a opção de caução ao liquidar ou cancelar (Mostrix, Bosstro ou <code>mostro-cli admsettle/admcancel --slashseller/--slashbuyer</code>).</li>
      </ul>
      <p>Leia o <code>docs/ANTI_ABUSE_BOND.md</code> do projeto antes de habilitá-lo num nó em produção, e avise seus usuários antes.</p>

      <h4>Histórico do pagador (experimental)</h4>
      <p><code>[payer_history]</code> combate o golpe da triangulação, em que um comprador paga a partir da conta bancária de um terceiro. O comprador se compromete com um hash da conta de que vai pagar (<code>declare-payer</code>), o vendedor pode compará-lo com o remetente no seu extrato, e o Mostro guarda apenas um HMAC dele. Na v0.20.2 só a declaração está ligada: a exigência <code>require_declaration</code> e o histórico mostrado aos vendedores ainda não estão implementados, e nenhum cliente lançado envia <code>declare-payer</code>. Deixe desligado por enquanto.</p>
      <pre><code># [payer_history]
# enabled = false
# require_declaration = false</code></pre>

      <h4>Escrow com Cashu</h4>
      <p><code>[cashu]</code> é um modo experimental que roda sem LND e mantém o escrow das operações em tokens Cashu. Ainda não serve para operar de verdade — as ações da operação depois da tomada continuam sendo rejeitadas — e não pode ser combinado com as cauções anti-abuso. Desde a v0.19.3 o criador escolhe a mint por ordem a partir de uma lista permitida:</p>
      <pre><code># [cashu]
# enabled = false
# mint_urls = ["https://mint.example.com"]   # vazio [] = qualquer mint com host público
# escrow_locktime_days = 15</code></pre>
      <p>A antiga chave única <code>mint_url</code> é rejeitada: uma configuração que ainda a tenha não carrega.</p>`,
    },
    'pegged': {
      title: `4.12 Stablecoins e Bitcoin em Outras Redes`,
      nav: `Stablecoins e outros BTC`,
      html: `      <p>Desde a v0.20.2 um nó pode oferecer operações contra seis códigos que não são moedas fiat: stablecoins em dólar e bitcoin em outras redes. Os sats Lightning são sempre um dos lados da operação; o outro lado é pago on-chain, na Liquid, na Rootstock ou na rede da stablecoin, diretamente entre os dois usuários.</p>

      <table class="guide-table">
        <thead><tr><th>Código</th><th>O que é</th><th>Cotado como</th><th>Valor da ordem em</th></tr></thead>
        <tbody>
          <tr><td><code>USDT</code></td><td>Tether USD</td><td>1 USD</td><td>moedas inteiras</td></tr>
          <tr><td><code>USDC</code></td><td>USD Coin</td><td>1 USD</td><td>moedas inteiras</td></tr>
          <tr><td><code>DOC</code></td><td>Dollar on Chain (Rootstock)</td><td>1 USD</td><td>moedas inteiras</td></tr>
          <tr><td><code>BTC</code></td><td>Bitcoin on-chain</td><td>1 sat = 1 sat</td><td>sats</td></tr>
          <tr><td><code>LBTC</code></td><td>L-BTC na Liquid</td><td>1 sat = 1 sat</td><td>sats</td></tr>
          <tr><td><code>RBTC</code></td><td>RBTC na Rootstock</td><td>1 sat = 1 sat</td><td>sats</td></tr>
        </tbody>
      </table>

      <ul>
        <li><strong>As stablecoins</strong> são atreladas 1:1 ao dólar, então uma ordem de USDT a preço de mercado é cotada exatamente como uma ordem em USD, prêmio incluído. A taxa do USD vem das suas fontes de preço normais (4.10); nenhuma API extra é chamada.</li>
        <li><strong>BTC, LBTC e RBTC</strong> são cotados 1:1 em sats, então não precisam de nenhuma API de preço. Uma ordem de 100.000 significa 100.000 sats do ativo (0,001 RBTC). A preço de mercado o prêmio é o preço da troca: uma ordem de venda de 100.000 sats de RBTC com 1% de prêmio trava 99.000 sats Lightning.</li>
        <li>Nenhum outro código é suportado: DAI, EURC e os demais são recusados na inicialização se você os listar em <code>only</code>.</li>
      </ul>

      <h4>Habilitando</h4>
      <p>Você precisa do mostrod v0.20.2 ou posterior. Duas configurações trabalham juntas: <code>fiat_currencies_accepted</code> diz quais códigos as ordens podem usar, e o provedor <code>pegged</code> diz quais deles têm preço de mercado.</p>
      <pre><code>[mostro]
# Mantenha suas moedas fiat e adicione os novos códigos, em MAIÚSCULAS
fiat_currencies_accepted = ['USD', 'BRL', 'USDT', 'USDC', 'DOC', 'LBTC', 'RBTC']

# Uma fonte de preço de mercado para fiat (e portanto para as stablecoins).
# Obrigatória na v0.20.2 assim que você adiciona qualquer tabela [price.providers.*].
[price.providers.yadio]
enabled = true
url = "https://api.yadio.io"

[price.providers.pegged]
enabled = true
only = ["USDT", "USDC", "DOC", "LBTC", "RBTC"]   # ou except = ["BTC"]; sem nenhum dos dois, os seis</code></pre>
      <p>Reinicie o Mostro e confira o log. Se aparecer <code>price: the pegged provider quotes ... but fiat_currencies_accepted does not list them</code>, adicione os códigos que faltam: um código cotado que não é aceito publica uma taxa mas recusa toda ordem. Um <code>fiat_currencies_accepted = []</code> vazio aceita todos os códigos.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Não adicione o bloco pegged sozinho na v0.20.2</div>
        <p>Qualquer tabela <code>[price.providers.*]</code> troca o nó para o motor de preços de várias fontes e descarta o legado <code>bitcoin_price_api_url</code>. Na v0.20.2 uma tabela <code>pegged</code> sem uma fonte de mercado ao lado deixa o nó sem taxas fiat: as ordens a preço de mercado em USD, EUR e USDT são todas recusadas. Habilite sempre pelo menos uma fonte de mercado, como no exemplo acima. (A próxima versão mantém automaticamente a fonte Yadio legada nesse caso.) Na v0.20.1 ou anterior, não adicione o bloco: o provedor não existe nelas.</p>
      </div>

      <p><strong>Somente preço fixo.</strong> Para aceitar um código mas não cotá-lo a preço de mercado, liste-o em <code>fiat_currencies_accepted</code> e deixe-o fora de <code>only</code>. Os usuários então precisam definir um valor fixo em sats. É uma escolha sensata para o <code>BTC</code> on-chain, em que as taxas da rede tornam estranhas as ordens pequenas a preço de mercado.</p>

      <h4>O que seus usuários veem</h4>
      <p>O Mostro App 2.1.2 e posteriores mostra esses códigos no seletor de moeda, em <em>Stablecoins</em> e <em>Bitcoin em outras redes</em>, mas apenas os que o seu nó aceita. Os valores de BTC, LBTC e RBTC são digitados em sats. O método de pagamento nomeia a rede (<code>USDT (Tron)</code>, <code>USDC (Base)</code>, <code>DOC (Rootstock)</code>, <code>LBTC (Liquid)</code>…), o vendedor compartilha um endereço de recebimento no chat da operação, e o comprador cola ali o ID da transação depois de pagar. O Mostro nunca verifica a rede nem o endereço. O mostro-cli e o Mostrix por enquanto só criam ordens de preço fixo nesses códigos.</p>

      <h4>As disputas precisam de outras provas</h4>
      <p>Instrua seus solvers antes de habilitar isto. Não há extrato bancário: a prova é o ID da transação colado no chat, que o solver confere num explorador de blocos dessa rede. Na Liquid o comprador deve compartilhar o link <em>unblinded</em>, porque a Liquid oculta os valores. As transferências são irreversíveis, um pagamento na rede errada pode ser perdido, e o comprador paga a taxa de rede: o vendedor deve receber o valor completo. O vendedor só deve liberar depois que a transferência confirmar. O prazo é o mesmo do fiat (cerca de 120 blocos com os padrões, veja 4.5), então uma transferência on-chain de taxa baixa pode perdê-lo.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Se uma stablecoin perder a paridade</div>
        <p>Ainda não existe uma proteção automática contra depeg. Se o USDT ou o USDC se afastar de um dólar, remova-o de <code>only</code> (mantenha-o em <code>fiat_currencies_accepted</code> se ainda quiser ordens de preço fixo) e reinicie.</p>
      </div>`,
    },
    'reputation': {
      title: `4.13 Importação e Exportação de Reputação`,
      nav: `Importar reputação`,
      html: `      <p>Os usuários podem trazer a reputação que ganharam em outro lugar — no bot do Telegram <strong>@lnp2pBot</strong> ou em outro nó Mostro — para o seu, de modo que um trader que se muda não comece do zero. Três valores viajam: o número de avaliações recebidas, a nota média e a data da primeira operação. Chegam como uma <em>atestação</em>: um pequeno evento Nostr (kind 38388) assinado pela fonte, endereçado à identidade do usuário e válido por 7 dias. Seu nó os soma à reputação do próprio usuário, e as contrapartes veem uma única cifra combinada.</p>
      <p>Ambas as direções são opt-in e vêm desligadas por padrão. A importação exige o mostrod v0.20.0 ou posterior; a exportação, v0.20.1 ou posterior. Os usuários precisam do Mostro App em <strong>modo reputação</strong>: no modo de privacidade total não há identidade para carregar uma reputação.</p>

      <h4>Importando do lnp2pBot</h4>
      <p>O lnp2pBot assina as atestações com uma chave dedicada. Adicione-a à sua lista de confiança:</p>
      <pre><code>[reputation_import]
enabled = true
max_lifetime_seconds = 604800   # maior atestação que você aceita (7 dias; no máximo 30)

[[reputation_import.issuers]]
name = "lnp2pbot"               # nunca renomeie uma entrada que já tenha importações
keys = ["000004ac730537f1cf7d91f4f584a498a530a0205d35e816ebbaf23aec61e459"]
# npub1qqqqftrnq5mlrnmaj860tp9ynzjnpgpqt567s9hthter4mrpu3vsrta3em</code></pre>
      <p>Reinicie o Mostro. Seu evento de info (kind 38385) passa a levar uma tag <code>reputation_import_issuers</code>, que é como o app sabe que pode oferecer a importação no seu nó. Vários nós de comunidades já confiam nessa chave.</p>
      <p>O bot exporta uma conta com pelo menos 10 operações concluídas e 5 avaliações recebidas que não esteja banida. O usuário começa pelo app (<em>Configurações → Rede → Reputação → Importar reputação → Obter no lnp2pBot</em>), confirma no Telegram que o npub coincide e cola de volta a mensagem que o bot envia.</p>

      <h4>Confiando em outro nó Mostro</h4>
      <p>Um nó que exporta anuncia sua chave de assinatura na tag <code>reputation_issuer</code> do seu evento de info. Leia-a com o comando de 5.4 (procure essa tag), confirme-a com o operador e adicione uma entrada para ele:</p>
      <pre><code>[[reputation_import.issuers]]
name = "mostro-example"         # um nome local estável à sua escolha
keys = ["&lt;that node's reputation_issuer key, npub or hex&gt;"]</code></pre>
      <ul>
        <li>O <code>name</code> é o que se usa para deduplicar as importações. Nunca renomeie uma entrada que já tenha importações: o Mostro se recusa a iniciar se uma chave passar para outro nome.</li>
        <li>Uma chave pode pertencer a uma única entrada. Para acompanhar uma rotação de chave, adicione a nova chave à mesma entrada e remova a antiga quando suas atestações tiverem expirado.</li>
        <li>Confie apenas em fontes em que você confia: um histórico importado grande pesa mais que as avaliações locais.</li>
      </ul>
      <p>Um usuário pode importar uma vez de cada fonte em cada nó, e a importação não pode ser desfeita pelo usuário. Os valores são uma fotografia: as avaliações posteriores na fonte não os acompanham.</p>

      <h4>Exportando do seu nó</h4>
      <p>A exportação permite que seus usuários levem a reputação que ganharam <em>no seu nó</em> para outro. Só viajam as avaliações recebidas no seu nó, nunca as importadas. O usuário precisa de 10 operações concluídas e 5 avaliações recebidas no seu nó, e não pode estar banido.</p>
      <p>As atestações são assinadas com uma chave dedicada, nunca com a chave do seu nó. Gere uma e guarde-a junto ao nsec, no ambiente ou em <code>&lt;config-dir&gt;/.env</code>:</p>
      <pre><code># Layout do Docker Hub; use o seu próprio diretório de configuração nos demais casos
echo "MOSTRO_REPUTATION_ISSUER_SK=$(openssl rand -hex 32)" >> ~/mostro-config/.env
chmod 600 ~/mostro-config/.env</code></pre>
      <pre><code>[reputation_export]
enabled = true
issuer_key_env = "MOSTRO_REPUTATION_ISSUER_SK"
lifetime_seconds = 604800       # 1 a 604800 (7 dias)</code></pre>
      <p>O Mostro se recusa a iniciar se a variável estiver ausente ou for inválida, se contiver a chave do seu próprio nó, ou se sua chave pública também estiver na sua lista de <code>[reputation_import]</code>. Quando estiver rodando, seu evento de info passa a levar a tag <code>reputation_issuer</code>: compartilhe essa chave com os operadores que queiram confiar no seu nó. Faça backup da chave junto com seus outros segredos. Se ela vazar, qualquer pessoa pode emitir atestações em nome do seu nó até que os outros operadores a removam e revoguem as importações.</p>

      <h4>Revogando importações e reassociando exportações</h4>
      <p>Duas chamadas RPC de administração (4.7) tratam os casos raros. Elas são aceitas apenas via loopback; adicione <code>-H 'authorization: Bearer &lt;token&gt;'</code> se você definiu <code>auth_token</code>. Execute-as a partir de um checkout do repositório <code>mostro</code>, que contém o <code>proto/admin.proto</code>.</p>
      <p><strong>A chave de um emissor confiável vazou.</strong> Primeiro remova a chave da sua entrada e reinicie; depois reverta todas as importações assinadas com ela (adicione <code>"imported_after": &lt;unix time&gt;</code> para limitar às recentes):</p>
      <pre><code>grpcurl -plaintext -import-path proto -proto admin.proto \\
  -d '{"issuer_key": "&lt;npub or hex&gt;", "reason": "key leaked"}' \\
  127.0.0.1:50051 mostro.admin.v1.AdminService/RevokeReputationImports</code></pre>
      <p>Cada importação é revertida exatamente, as avaliações recebidas desde então são mantidas, e os usuários podem importar de novo com uma atestação da nova chave.</p>
      <p><strong>Um usuário perdeu a identidade à qual sua exportação está vinculada.</strong> A primeira exportação vincula a conta a uma identidade; movê-la normalmente exige uma autorização assinada com a identidade antiga, que o app produz. Se a identidade antiga se perdeu, você mesmo pode movê-la depois de verificar a pessoa:</p>
      <pre><code>grpcurl -plaintext -import-path proto -proto admin.proto \\
  -d '{"identity": "&lt;old npub&gt;", "new_identity": "&lt;new npub&gt;", "reason": "support ticket"}' \\
  127.0.0.1:50051 mostro.admin.v1.AdminService/RebindReputationExport</code></pre>
      <p>Um usuário que restaura as mesmas 12 palavras mantém a mesma identidade e não precisa de nada disso.</p>`,
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
        <li><strong>Resolução</strong> — O árbitro decide: liberar ao comprador, ou devolver ao vendedor. Com as cauções anti-abuso habilitadas (4.11), o árbitro também pode confiscar a caução de quem agiu de má-fé.</li>
      </ol>

      <p>O árbitro escreve a cada parte num chat privado da disputa, que o Mostro App mostra em <em>Chat → Disputas</em>. Qualquer uma das partes também pode compartilhar com o árbitro a chave do chat da sua operação, e então ele lê essa conversa na aba Observer do Mostrix ou no Bosstro. As partes ainda podem terminar a operação por conta própria: se o vendedor libera, ou se ambos concordam num cancelamento cooperativo, o Mostro encerra a disputa sozinho e avisa o árbitro.</p>

      <p>Se você executa o <strong>Serbero</strong> (5.10), ele avisa seus árbitros no instante em que uma disputa abre e pode dar os primeiros passos com as partes. Nunca decide nem move fundos.</p>

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

      <p>Um <code>npub1...</code> sem sufixo fica como read-write por padrão, e o mesmo vale para o registro pela interface RPC. Comece um árbitro novo em <code>:read</code> enquanto ele aprende o processo, e registre-o de novo como read-write quando você confiar no julgamento dele. Um solver read-write pode assumir uma disputa que um solver somente leitura (ou o Serbero) esteja conduzindo.</p>

      <p>Seus árbitros podem trabalhar num terminal com o Mostrix (5.2) ou num telefone Android com o Bosstro (5.11).</p>`,
    },
    'mostrix': {
      title: `5.2 Mostrix — Sua ferramenta de administração`,
      nav: `Mostrix`,
      html: `      <p>Mostrix é um cliente Mostro de terminal (TUI) com dois modos: um modo <strong>usuário</strong> para operar e um modo <strong>admin</strong> para resolver disputas — assumir disputas, conversar com as duas partes, liquidar ou cancelar, confiscar cauções e adicionar solvers. Se você executa um nó Mostro, precisa do Mostrix. Ele fala com o seu nó apenas via Nostr, nunca pela interface RPC.</p>

      <h4>Opção A: Baixar binário pré-compilado (Recomendado)</h4>
      <p>Baixe a última versão para sua plataforma em <a href="https://github.com/MostroP2P/mostrix/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a>:</p>

      <pre><code># Linux (x86_64)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-unknown-linux-musl

# Linux (ARM64 / Raspberry Pi 4 e 5, SO de 64 bits)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-unknown-linux-musl

# Linux (ARMv7 / Raspberry Pi OS de 32 bits)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-armv7-unknown-linux-gnueabi

# macOS (Apple Silicon / Intel)
curl -LO https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-apple-darwin
curl -LO https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-apple-darwin

# FreeBSD: mostrix-x86_64-unknown-freebsd
# Windows: baixe mostrix-x86_64-pc-windows-msvc.exe da página de releases</code></pre>

      <p>Verifique o download antes de executá-lo, como explicado logo abaixo.</p>

      <div class="callout tip">
        <div class="callout-title">🔐 Verifique a Release</div>
        <p>Verifique sempre o binário antes de executá-lo. Importe as chaves dos mantenedores uma única vez:</p>
        <pre><code>curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/negrunch.asc | gpg --import
curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/arkanoider.asc | gpg --import</code></pre>
        <p>As assinaturas são arquivos separados chamados <code>manifest.txt.sig.&lt;mantenedor&gt;</code>. As releases recentes trazem apenas <code>manifest.txt.sig.arkanoider</code> (chave <code>2E98 6CA1 C5E7 EA16 35CD 059C 4989 CC74 15A4 3AEC</code>), então confira a página da release e baixe as que realmente estiverem listadas:</p>
        <pre><code>wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt
wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt.sig.arkanoider

# Verifique cada assinatura que baixou
gpg --verify manifest.txt.sig.arkanoider manifest.txt

# Depois compare o hash do binário com o manifest
# (as linhas do manifest levam o prefixo artifact-&lt;target&gt;/, removido aqui)
sed 's#  artifact-[^/]*/#  #' manifest.txt | sha256sum -c --ignore-missing</code></pre>
        <p>Uma assinatura válida de uma chave de mantenedor em que você confia é suficiente. Se um <code>wget</code> retornar 404, essa assinatura simplesmente não foi publicada para essa release: não trate um arquivo ausente como um verificado.</p>
      </div>

      <p>Somente quando uma assinatura e o hash conferirem, dê permissão de execução ao binário e inicie-o:</p>
      <pre><code>chmod +x mostrix-x86_64-unknown-linux-musl
./mostrix-x86_64-unknown-linux-musl</code></pre>

      <h4>Opção B: Compilar do código fonte</h4>
      <p>Se preferir compilar do código fonte ou precisar de uma plataforma não disponível nas releases:</p>

      <pre><code># Instalar dependências (Ubuntu/Debian)
sudo apt install -y cmake build-essential pkg-config

# Instalar Rust (se ainda não instalado; o Mostrix precisa da 1.97 ou posterior)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Clonar e compilar
git clone https://github.com/MostroP2P/mostrix.git
cd mostrix
cargo build --release

# Executar
./target/release/mostrix</code></pre>

      <h4>Primeira execução e configuração</h4>
      <p>Na primeira execução o Mostrix cria o <code>~/.mostrix/</code> com um banco de dados que guarda uma nova seed de 12 palavras e um <code>settings.toml</code>, e então mostra um popup <strong>Backup New Keys</strong> com as 12 palavras. Anote-as. Um <code>settings.toml</code> colocado ao lado do binário tem precedência (modo portátil).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante: aponte o Mostrix para o seu nó</div>
        <p>A configuração gerada aponta para o nó público padrão do Mostro. Troque-o para o <strong>seu próprio nó</strong>: <strong>Settings → Select Mostro Instance</strong> e cole o npub ou hex do seu nó, ou edite <code>mostro_pubkey</code> em <code>~/.mostrix/settings.toml</code> e reinicie.</p>
      </div>

      <p>Para o modo admin (resolução de disputas), as chaves relevantes são:</p>
      <pre><code># ~/.mostrix/settings.toml
mostro_pubkey = "SUA_PUBKEY_MOSTRO"          # hex ou npub
nsec_privkey  = "nsec1..."                   # sua identidade de trader, derivada da seed — não edite
admin_privkey = "nsec1..."                   # a chave de um solver registrado — veja abaixo
relays = ["wss://relay.mostro.network"]
currencies_filter = []                       # vazio = mostrar todas as moedas
user_mode = "admin"                          # ou Settings → Switch Mode
# trusted_dm_senders = ["npub1..."]          # npub do Serbero, para ver seus relatórios (5.10)</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Qual chave vai em admin_privkey?</div>
        <p>O Mostro aceita ações de disputa da sua própria chave (o <code>nsec_privkey</code> do daemon) e de chaves de solvers registrados. Qualquer outra chave é rejeitada. Só a chave do daemon pode <em>adicionar</em> solvers, então use-a apenas para isso e mantenha-a no servidor. Para o trabalho diário com disputas, registre uma chave de solver — read-write para liquidar ou cancelar — e coloque essa em <code>admin_privkey</code>. Nunca reutilize o <code>nsec_privkey</code>.</p>
        <pre><code>ADMIN_NSEC=nsec1&lt;daemon-key&gt; MOSTRO_PUBKEY=&lt;node-npub&gt; \\
  RELAYS=wss://relay.mostro.network \\
  mostro-cli admaddsolver -n npub1solver...</code></pre>
        <p>A opção <strong>Settings → Add Dispute Solver</strong> do Mostrix faz o mesmo, com Esquerda/Direita para escolher Read ou Read-Write (padrão Read-Write).</p>
      </div>

      <h4>O modo admin na prática</h4>
      <ul>
        <li><strong>Disputes Pending</strong>: Enter assume uma disputa. <kbd>Ctrl+T</kbd> a toma do Serbero.</li>
        <li><strong>Disputes Management</strong>: Tab alterna entre os chats BUYER, SELLER e SERBERO. <kbd>Shift+F</kbd> finaliza: paga o comprador, devolve ao vendedor e confisca uma caução quando o nó as tem.</li>
        <li><strong>Observer</strong>: cole a chave do chat da operação que uma parte compartilhou para ler a conversa dela.</li>
        <li><strong>Settings → Link Watchdog</strong>: vincula o solver ao mostro-watchdog (5.3), para que receba um aviso privado no Telegram quando uma parte escrever numa disputa que ele assumiu.</li>
        <li><kbd>Ctrl+H</kbd> mostra a ajuda contextual. Saia pela aba <strong>Exit</strong>.</li>
      </ul>`,
    },
    'watchdog': {
      title: `5.3 mostro-watchdog — Alertas no Telegram para disputas e saúde do nó`,
      nav: `mostro-watchdog`,
      html: `      <p><code>mostro-watchdog</code> é um bot do Telegram para a sua equipe de administração. Ele observa seu nó via Nostr e publica num grupo ou canal privado:</p>
      <ul>
        <li><strong>Disputas:</strong> uma mensagem por disputa, enviada quando ela abre e editada à medida que avança (assumida, passos do Serbero, tomada por um solver, resolução). Cada edição recebe uma resposta curta para que os telefones continuem tocando.</li>
        <li><strong>Saúde do nó:</strong> um alerta quando o Mostro deixa de <em>funcionar</em>, não só quando deixa de rodar: um evento de info que silenciou, modo manutenção e, com o Mostro v0.20.0 ou posterior, LND fora de sincronia ou atrás da cadeia, pagamentos a compradores travados ou falhando, HTLCs perto de expirar e canais inativos. Só as mudanças são publicadas: um alerta, lembretes enquanto durar e "resolvido".</li>
        <li><strong>O progresso do Serbero</strong> em cada disputa, se você executa o Serbero (5.10).</li>
        <li><strong>Avisos privados aos solvers</strong> quando uma parte escreve a eles numa disputa que assumiram.</li>
      </ul>

      <p><strong>Opção A: script de instalação (recomendada).</strong> Ele baixa a última release, confere-a com o <code>manifest.txt</code> e instala em <code>/usr/local/bin</code>:</p>
      <pre><code>curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash
# ou em outro diretório:
curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash -s -- --install-dir ~/.local/bin</code></pre>

      <p><strong>Opção B: download manual do binário</strong></p>
      <pre><code># Linux x86_64 (Intel/AMD); use mostro-watchdog-linux-aarch64 em ARM64
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/mostro-watchdog-linux-x86_64
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/manifest.txt
sha256sum -c manifest.txt --ignore-missing
chmod +x mostro-watchdog-linux-x86_64
sudo mv mostro-watchdog-linux-x86_64 /usr/local/bin/mostro-watchdog</code></pre>
      <p>Os binários para macOS e Windows também estão na página de releases.</p>

      <p><strong>Opção C: compilar do código fonte</strong></p>
      <pre><code>sudo apt install -y cmake pkg-config libssl-dev
git clone https://github.com/MostroP2P/mostro-watchdog.git
cd mostro-watchdog
cargo build --release
sudo cp target/release/mostro-watchdog /usr/local/bin/</code></pre>

      <h4>Configuração</h4>
      <p>O watchdog guarda seu estado (<code>disputes.db</code>) ao lado do <code>config.toml</code>, então dê a ele um diretório só dele:</p>
      <pre><code>sudo useradd --system --home-dir /var/lib/mostro-watchdog --shell /usr/sbin/nologin mostro-watchdog
sudo install -d -o mostro-watchdog -g mostro-watchdog -m 700 /var/lib/mostro-watchdog
curl -LO https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/config.example.toml
sudo install -o mostro-watchdog -g mostro-watchdog -m 600 config.example.toml /var/lib/mostro-watchdog/config.toml
sudo nano /var/lib/mostro-watchdog/config.toml</code></pre>
      <pre><code>[mostro]
pubkey = "SUA_PUBKEY_MOSTRO"          # hex ou npub

[nostr]
# Relays de bootstrap: o watchdog lê a lista de relays do seu nó (NIP-65)
# neles e depois segue os relays que o seu nó anuncia.
relays = ["wss://relay.mostro.network", "wss://nos.lol"]

[telegram]
bot_token = "SEU_BOT_TOKEN"           # do @BotFather
chat_id = -1001234567890              # seu grupo ou canal de administração

[health]
info_silence_threshold = 900          # 3 × o publish_mostro_info_interval do Mostro (300 por padrão)
mostro_health_enabled = true          # exige Mostro v0.20.0+
event_alert_threshold = 0             # veja abaixo</code></pre>
      <p>Para achar o <code>chat_id</code>, adicione o bot ao grupo, envie uma mensagem ali e abra <code>https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code>.</p>
      <p>O antigo alerta de "silêncio de eventos" dispara sempre que nenhum evento de disputa chega por duas horas, o que na maioria dos nós é só uma tarde tranquila. As verificações de info e de saúde detectam um nó parado de forma confiável, então <code>0</code> o desliga.</p>

      <h4>A chave Nostr do watchdog</h4>
      <p>Os detalhes de saúde, os alertas do Serbero, os avisos aos solvers e o próprio heartbeat do watchdog precisam de uma chave só dele, passada apenas pelo ambiente:</p>
      <pre><code>sudo sh -c 'umask 077; echo "WATCHDOG_NOSTR_PRIVATE_KEY=$(openssl rand -hex 32)" > /etc/mostro-watchdog.env'</code></pre>
      <p>Faça backup desse arquivo. Na inicialização o watchdog registra sua chave pública. Coloque-a no <code>settings.toml</code> do Mostro e reinicie o Mostro, para que sua liquidez, falhas de pagamento e expiração de HTLC sejam cifradas só para o watchdog:</p>
      <pre><code>[health]
watchdog_pubkey = "WATCHDOG_PUBKEY"   # hex ou npub</code></pre>
      <p>Isso adiciona uma tag pública <code>p</code> ao seu evento de saúde que vincula o seu nó à chave do watchdog. Sem ela, o watchdog ainda alerta sobre o status público.</p>

      <h4>Executar como serviço</h4>
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

      <h4>Opcional: Serbero e alertas aos solvers</h4>
      <p>Adicione uma seção vazia para cada um que quiser. Ambos usam a chave acima:</p>
      <pre><code>[serbero]                 # passos do Serbero na mensagem de cada disputa
[solver_notifications]    # avisos privados aos solvers</code></pre>
      <p>Para o Serbero, adicione também a chave pública <strong>hex</strong> do watchdog ao <code>config.toml</code> do Serbero como observador — nunca como solver — e reinicie o Serbero. Os observadores recebem uma linha por passo, nunca o que as partes escreveram. O watchdog encontra o Serbero sozinho através do <code>serbero_pubkey</code> do seu nó (5.10).</p>
      <pre><code>[[observers]]
pubkey = "WATCHDOG_PUBKEY_HEX"</code></pre>
      <p>Para os avisos aos solvers, cada solver envia <code>/link</code> ao bot num chat privado e digita o código no Mostrix 0.3.6 ou posterior, em <strong>Settings → Link Watchdog</strong>. O bot responde a comandos apenas em chats privados: <code>/version</code>, <code>/link</code>, <code>/unlink</code>, <code>/status</code>.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Vigie o watchdog</div>
        <p>Um canal silencioso não prova que o watchdog está vivo. Você pode executar um segundo em outra máquina, cada um com a <strong>sua própria</strong> <code>WATCHDOG_NOSTR_PRIVATE_KEY</code> e a chave pública do outro em <code>[health].peer_watchdogs</code>. Os alertas de saúde também podem ir para um chat próprio com <code>[health].alerts_chat_id</code>. O <code>config.example.toml</code> do projeto documenta todas as opções.</p>
      </div>`,
    },
    'monitoring': {
      title: `5.4 Monitoramento e saúde do nó`,
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

      <h4>Rodar não é o mesmo que funcionar</h4>
      <p>Em outubro de 2026 o LND de um nó em produção deixou de acompanhar a cadeia por cerca de 21 horas. O Mostro continuou rodando e aceitando operações, mas todo pagamento a compradores falhava. Uma verificação de processo, de porta ou um robô de uptime teriam mostrado verde o tempo todo.</p>
      <p>Desde a v0.20.0 o Mostro verifica isso por conta própria. A cada minuto ele publica um <strong>evento de saúde</strong> assinado (kind 38389) com um status geral (<code>ok</code>, <code>degraded</code> ou <code>down</code>), um estado para cada verificação (<code>lnd_sync</code>, <code>payouts</code>, <code>relays</code>, <code>database</code>) e a altura de blocos do LND. Vem ativado por padrão; este bloco apenas mostra os padrões:</p>
      <pre><code>[health]
enabled = true                  # publica o evento de saúde (kind 38389)
interval = 60                   # segundos entre publicações, de 30 a 3600
watchdog_pubkey = ""            # a chave do seu watchdog: as métricas detalhadas são cifradas para ela (5.3)
lnd_unsynced_fail_after = 600   # deve ser maior que 60
auto_maintenance_on_lnd_unsynced = true
lnd_resynced_clear_after = 300</code></pre>
      <p>Quando o LND deixa de estar sincronizado, o Mostro protege seus usuários por conta própria:</p>
      <ul>
        <li>Após 60 segundos, os pagamentos de saída (pagamentos a compradores, dev fees, pagamentos de cauções) <strong>esperam</strong> em vez de falhar. Um pagamento em espera não gasta uma das tentativas de pagamento do comprador e sai assim que o LND se recupera.</li>
        <li>Após <code>lnd_unsynced_fail_after</code> segundos, o Mostro entra em modo manutenção com o motivo <code>lnd_unsynced</code>: sem novas ordens nem tomadas, enquanto as operações abertas ainda podem terminar. Ele sai da manutenção quando o LND está sincronizado há <code>lnd_resynced_clear_after</code> segundos. A manutenção que você mesmo ativou (5.8) nunca é desfeita automaticamente.</li>
      </ul>
      <p>O log conta a história: <code>LND reports synced_to_chain = false ...; outgoing payments wait after 60s</code>, depois <code>maintenance mode ON (reason lnd_unsynced)</code>, e mais tarde <code>LND is synced to chain again</code> e <code>maintenance mode OFF</code>. Verifique o LND com <code>lncli getinfo</code> (<code>synced_to_chain</code>, <code>block_height</code>). Defina <code>auto_maintenance_on_lnd_unsynced = false</code> para desativar a manutenção automática.</p>
      <p>O Mostro só sabe o que o seu próprio LND lhe diz, e um nó preso numa cadeia antiga nem sempre sabe disso. Por isso os dois leitores abaixo comparam a altura de blocos dele com exploradores públicos:</p>
      <ul>
        <li><strong>Alertas privados:</strong> o mostro-watchdog (5.3) avisa o seu Telegram quando algo quebra e quando se resolve.</li>
        <li><strong>Página de status pública:</strong> <a href="https://status.mostro.network" target="_blank" rel="noopener noreferrer">status.mostro.network</a> mostra o estado ao vivo e o uptime de 90 dias de cada Mostro listado. Seus usuários também a veem.</li>
      </ul>

      <h4>A página de status pública</h4>
      <p>A página (<a href="https://github.com/MostroP2P/semaforo" target="_blank" rel="noopener noreferrer">Semáforo</a>) lê os eventos de saúde direto dos relays e os verifica no navegador do visitante, sem backend. Cada nó recebe uma cor:</p>
      <table class="guide-table">
        <thead><tr><th>Cor</th><th>Quando</th></tr></thead>
        <tbody>
          <tr><td>🟢 Operacional</td><td>Status <code>ok</code>, um evento recente e o LND a menos de 3 blocos de atraso em relação aos exploradores</td></tr>
          <tr><td>🟡 Degradado</td><td>Status <code>degraded</code>, modo manutenção, ou nenhuma altura de blocos independente para comparar</td></tr>
          <tr><td>🔴 Fora do ar</td><td>Status <code>down</code>, LND 3 ou mais blocos atrasado, ou nenhum evento válido recente ("Not reporting")</td></tr>
          <tr><td>⚪ Não monitorado</td><td>Listado, mas ainda não se espera que publique</td></tr>
        </tbody>
      </table>
      <p>Sob cada nó, 90 barras diárias e um valor de uptime vêm de amostras coletadas a cada 10 minutos.</p>
      <p><strong>Como listar seu nó.</strong> Só são mostrados nós selecionados, porque qualquer pessoa pode assinar um evento sempre verde:</p>
      <ol>
        <li>Seu nó está listado como comunidade neste site.</li>
        <li>Ele roda o Mostro v0.20.0 ou posterior com o evento de saúde ativado, e publica em pelo menos um de <code>wss://relay.mostro.network</code>, <code>wss://mostro-p2p.tech</code> ou <code>wss://relay.shadowbip.com</code>.</li>
        <li>Abra uma issue ou pull request no <a href="https://github.com/MostroP2P/semaforo" target="_blank" rel="noopener noreferrer">MostroP2P/semaforo</a> para adicioná-lo ao <code>trusted.json</code> com sua pubkey hex, nome, região e rede. Seu avatar é copiado da foto de perfil do seu Nostr.</li>
      </ol>


      <h4>Checar seu nó de fora</h4>
      <p>Seu nó republica um evento de info (kind 38385) que se descreve: taxas, moedas, versão de protocolo, flag de manutenção, configurações de caução, chaves do Serbero e de reputação. Ler isso e o evento de saúde de um relay é o jeito mais rápido de confirmar que o mundo externo vê o que você acha que vê.</p>
      <pre><code>cargo install nostreq nostcat
# Evento de info
nostreq --kinds 38385 --limit 1 --authors SUA_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq
# Evento de saúde: status, verificações, altura de blocos do LND
nostreq --kinds 38389 --limit 1 --authors SUA_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq '.tags'</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 As verificações do host continuam úteis</div>
        <p>Um ping ao host (<a href="https://uptimerobot.com/" target="_blank" rel="noopener noreferrer">UptimeRobot</a> ou similar) continua avisando quando a própria VPS está inalcançável. Ele não diz se o Mostro está pagando os compradores; o evento de saúde diz.</p>
      </div>`,
    },
    'updating': {
      title: `5.5 Atualizando Mostro`,
      nav: `Atualização`,
      html: `      <p>Atualizar substitui o binário <code>mostrod</code> e nada mais: <code>settings.toml</code> e <code>mostro.db</code> ficam onde estão. As migrações do banco de dados rodam sozinhas quando a nova versão inicia, então não há passo extra.</p>

      <h4>Antes de atualizar</h4>
      <ol>
        <li><strong>Leia as <a href="https://github.com/MostroP2P/mostro/releases" target="_blank" rel="noopener noreferrer">notas da versão</a></strong> para a qual você vai. Seu <code>settings.toml</code> nunca é sobrescrito: compare-o com o novo <code>settings.tpl.toml</code>. A maioria dos recursos novos fica desligada até você adicioná-los, mas um bloco ausente assume seus padrões, e alguns padrões são ligados (o evento de saúde de 5.4, por exemplo).</li>
        <li><strong>Faça backup do banco de dados</strong> com os comandos de 5.6. Você precisa desse backup para voltar atrás.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Vindo da v0.18.x</div>
        <p>Confira isto antes de iniciar a nova versão, ou ela pode se recusar a iniciar:</p>
        <ul>
          <li>Apague qualquer linha <code>transport = "gift-wrap"</code> (4.8). Os usuários de clientes antigos do protocolo v1 precisam atualizar.</li>
          <li><code>escrow_deadline_margin_blocks</code> deve ser de pelo menos 18 e menor que <code>hold_invoice_cltv_delta</code> (4.9).</li>
          <li>Em <code>[cashu]</code>, <code>mint_url</code> passou a ser <code>mint_urls = [...]</code> (4.11).</li>
          <li>Com as cauções anti-abuso ligadas e <code>hold_invoice_cltv_delta</code> de 288 ou mais, defina <code>bond_cltv_delta</code> explicitamente (4.11).</li>
          <li>Desde a v0.20.0 o evento de saúde é publicado por padrão, e o Mostro pode entrar em manutenção por conta própria quando o LND está fora de sincronia (5.4).</li>
        </ul>
      </div>

      <h4>Docker Hub (<code>docker run</code>)</h4>
      <pre><code>export MOSTRO_TAG={{version}}
# Baixe primeiro: o nó continua no ar durante o download
docker pull mostrop2p/mostro:$MOSTRO_TAG
docker stop mostro
docker rm mostro
docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:$MOSTRO_TAG</code></pre>
      <p>Use as mesmas flags da instalação (remova <code>--add-host</code> se o LND está em outro servidor). Se não lembrar delas, consulte <code>docker inspect mostro</code> antes de remover o contêiner.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ <code>docker restart</code> não é uma atualização</div>
        <p><code>docker restart</code> reinicia o mesmo contêiner, com a imagem com que foi criado. Para rodar uma versão nova o contêiner precisa ser criado de novo: <code>docker rm</code> + <code>docker run</code>, ou <code>docker compose up -d</code> depois de trocar o tag.</p>
      </div>

      <h4>Docker Hub (Docker Compose)</h4>
      <pre><code>export MOSTRO_TAG={{version}}
COMPOSE=~/mostro-docker/compose.yml
# Aponte a linha image para o novo tag e confira
sed -i "s|image: mostrop2p/mostro:.*|image: mostrop2p/mostro:$MOSTRO_TAG|" $COMPOSE
grep image: $COMPOSE
docker compose -f $COMPOSE pull
# Recria o contêiner porque a imagem mudou
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

      <h4>Verificar a nova versão</h4>
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
      <p>Procure as mesmas mensagens de inicialização da primeira execução (Passo 11 da Opção A).</p>

      <h4>Voltar à versão anterior</h4>
      <p>Se a nova versão der problemas, volte ao tag anterior. A nova versão pode já ter migrado o banco de dados, e um <code>mostrod</code> mais antigo pode se recusar a iniciar com ele, então restaure o backup feito antes de atualizar:</p>
      <pre><code>docker stop mostro
docker rm mostro
# troque YYYYMMDD pela data do backup feito antes de atualizar
BACKUP=/root/mostro-backups/mostro.db.YYYYMMDD
cp "$BACKUP" ~/mostro-config/mostro.db
rm -f ~/mostro-config/mostro.db-wal ~/mostro-config/mostro.db-shm
chown 1000:1000 ~/mostro-config/mostro.db
# depois inicie o tag anterior: mesmo comando docker run,
# ou volte o tag antigo no compose.yml e rode docker compose up -d</code></pre>
      <p>Docker Build e nativo funcionam igual: faça checkout do tag anterior, recompile e restaure o banco de dados antes de iniciar.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Não troque de nó Lightning ao mesmo tempo</div>
        <p>Atualizar o Mostro é seguro a qualquer momento. Apontá-lo para um nó Lightning <strong>diferente</strong> não é: drene o escrow primeiro, veja 5.8.</p>
      </div>`,
    },
    'backups': {
      title: `5.6 Backups`,
      nav: `Backups`,
      html: `      <p>Arquivos críticos para backup: <code>settings.toml</code>, o arquivo <code>.env</code> se você guarda seu nsec ali (veja 4.1) ou a chave de exportação de reputação (4.13), e <code>mostro.db</code> (histórico de ordens, reputação). Se você habilitar o histórico do pagador (4.11), mantenha os backups do banco separados do nsec: o histórico é indexado por ele.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Não copie um banco em uso com cp</div>
        <p>O SQLite roda em modo WAL, então as escritas recentes ficam em <code>mostro.db-wal</code> até serem consolidadas. Copiar só o <code>mostro.db</code> com o Mostro rodando pode gerar um backup sem as operações mais novas. Use o comando de backup do próprio SQLite, que é seguro num banco em uso e escreve um único arquivo consistente.</p>
      </div>

      <pre><code># Backup manual — Docker Hub:
mkdir -p /root/mostro-backups
sqlite3 ~/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp ~/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp ~/mostro-config/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null

# Backup manual — Docker Build (Opção B):
sqlite3 /opt/mostro/docker/config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/docker/config/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)

# Backup manual — Nativo:
sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)</code></pre>

      <p><strong>Backup diário automático</strong> (adicione ao crontab com <code>crontab -e</code>):</p>
      <pre><code># Docker Hub (Opção A):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /root/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /root/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d)

# Docker Build (Opção B):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/docker/config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/docker/config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d)

# Nativo (Opção C):
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

      <p>O modo manutenção é a forma de drenar primeiro. Enquanto está ativo, novas ordens e tomadas são rejeitadas e as operações abertas continuam funcionando, para que o escrow possa liquidar. Requer a interface RPC habilitada (veja 4.7), e a chamada é aceita apenas via loopback: execute-a no host do nó, ou através de <code>ssh -N -L 50051:127.0.0.1:50051 user@node</code>.</p>
      <p>O Mostro também pode entrar em manutenção por conta própria, com o motivo <code>lnd_unsynced</code>, quando o LND sai de sincronia (5.4). Se você ativar a manutenção enquanto isso estiver acontecendo, ela passa a ser sua e o daemon não a desfará; você não pode usar <code>lnd_unsynced</code> como motivo próprio.</p>

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
      html: `      <p>O Mostrix é o jeito confortável de trabalhar disputas, e o <code>mostro-cli</code> cobre o básico de um shell, além de alguns comandos de operador que o Mostrix não tem. Os comandos de disputa são assinados com uma chave Nostr passada como <code>ADMIN_NSEC</code>, e ela precisa ser a do próprio daemon ou a de um solver registrado. O CLI não lê nenhum arquivo de configuração: defina seu nó e os relays no ambiente, e coloque as flags globais antes do subcomando.</p>

      <pre><code># Trabalho de disputas (via Nostr)
export MOSTRO_PUBKEY=npub1...            # seu nó
export RELAYS=wss://relay.mostro.network
export ADMIN_NSEC=nsec1...
mostro-cli listdisputes
mostro-cli admtakedispute -d &lt;dispute-id&gt;     # imprime as pubkeys do comprador e do vendedor
mostro-cli getadmindm -s 120
mostro-cli admsenddm -p &lt;party-pubkey&gt; -m "mensagem para uma parte"
mostro-cli admsettle -o &lt;order-id&gt; [--slashseller] [--slashbuyer]   # liberar para o comprador
mostro-cli admcancel -o &lt;order-id&gt; [--slashseller] [--slashbuyer]   # reembolsar o vendedor

# Registrar um árbitro, opcionalmente somente leitura
mostro-cli admaddsolver -n npub1...:read</code></pre>

      <p>As flags de confisco só importam com as cauções anti-abuso (4.11). Note a grafia: <code>--slashseller</code>, não <code>--slash-seller</code>. O <code>admsenddm</code> envia uma mensagem direta a partir da chave de admin; não é o chat por disputa que o Mostro App, o Mostrix e o Bosstro usam, então prefira esses clientes para falar com as partes.</p>

      <p>Outro grupo de comandos vai pelo gRPC de administração em vez do Nostr, então precisam da interface RPC habilitada (veja 4.7) em vez de <code>ADMIN_NSEC</code>. O <code>MOSTRO_RPC_URL</code> tem como padrão <code>http://127.0.0.1:50051</code>, e o <code>MOSTRO_RPC_TOKEN</code> só é necessário se você definiu <code>auth_token</code>.</p>

      <pre><code>export MOSTRO_RPC_URL=http://127.0.0.1:50051
export MOSTRO_RPC_TOKEN=seu-token-de-auth

mostro-cli admsetmaintenance -e true -r "motivo"
mostro-cli admmaintenancestatus
mostro-cli admcancelpending -o &lt;order-id&gt;</code></pre>

      <p>Vale conhecer o <code>admcancelpending</code> fora de uma migração. Ele cancela uma ordem que ainda está pendente ou esperando uma caução, avisa o criador e libera todas as cauções de uma vez. Use para uma ordem claramente abandonada ou mal cotada, e avise o criador antes: é a ordem dele, e isso não é uma resolução de disputa.</p>

      <p>O mostro-cli ainda não tem comandos para importação e exportação de reputação, histórico do pagador nem para o evento de saúde: use o <code>grpcurl</code> para as RPCs de reputação (4.13) e os comandos de 5.4 para o evento de saúde. Instale-o com <code>cargo install mostro-cli</code> (Rust 1.97 ou posterior) ou pegue um binário em <a href="https://github.com/MostroP2P/mostro-cli/releases" target="_blank" rel="noopener noreferrer">suas releases</a>; execute <code>mostro-cli &lt;command&gt; --help</code> para ver todas as flags.</p>`,
    },
    'serbero': {
      title: `5.10 Serbero — Assistente de disputas`,
      nav: `Serbero`,
      html: `      <p>O <a href="https://github.com/MostroP2P/serbero" target="_blank" rel="noopener noreferrer">Serbero</a> é um assistente opcional para as disputas do seu nó. Você o executa ao lado do Mostro, com uma chave Nostr própria. Ele faz dois trabalhos:</p>
      <ul>
        <li><strong>Notificar (sempre ativo).</strong> Cada solver que você listar recebe uma mensagem direta em segundos após uma nova disputa, com lembretes a cada 15 minutos até que alguém a assuma.</li>
        <li><strong>Mediar (opt-in, piloto).</strong> O Serbero assume a disputa, pergunta ao comprador se pagou e ao vendedor se o dinheiro chegou, dá a eles tempo para terminar a operação por conta própria e, se não, entrega o caso a um solver humano com um resumo e a transcrição completa.</li>
      </ul>
      <p>O Serbero nunca move fundos e nunca decide uma disputa. O Mostro o registra como um solver <strong>somente leitura</strong>, então ele não pode liquidar nem cancelar, e qualquer solver read-write pode tomar uma disputa dele a qualquer momento. Se o Serbero cair, o Mostro e seus solvers funcionam exatamente como antes. Mantenha pelo menos um solver humano read-write.</p>

      <h4>Instalar</h4>
      <p>Cada release tem binários para Linux (x86_64, aarch64) e macOS (Apple silicon), cada um com um arquivo SHA-256. Os nomes dos arquivos levam a versão:</p>
      <pre><code>V=$(curl -fsSL https://api.github.com/repos/MostroP2P/serbero/releases/latest | grep -m1 '"tag_name"' | cut -d'"' -f4)
A=serbero-$V-x86_64-unknown-linux-gnu        # aarch64-unknown-linux-gnu em ARM64
curl -LO https://github.com/MostroP2P/serbero/releases/download/$V/$A.tar.gz
curl -LO https://github.com/MostroP2P/serbero/releases/download/$V/$A.tar.gz.sha256
shasum -a 256 -c $A.tar.gz.sha256
tar -xzf $A.tar.gz && cd $A        # serbero, config.sample.toml, deploy/</code></pre>
      <p>Com o Rust instalado, <code>cargo install serbero --locked</code> também funciona. Uma imagem Docker (<code>ghcr.io/mostrop2p/serbero</code>) e um arquivo compose estão descritos no README do projeto.</p>

      <h4>Configurar</h4>
      <pre><code>cp config.sample.toml config.toml
nano config.toml</code></pre>
      <pre><code>[serbero]
private_key_env = "SERBERO_PRIVATE_KEY"   # nomeia o segredo; a chave nunca vai neste arquivo
db_path = "serbero.db"

[mostro]
pubkey = "YOUR_MOSTRO_PUBKEY_HEX"
relays = ["wss://relay.mostro.network", "wss://nos.lol"]   # relays em que o seu nó publica

# Uma entrada por solver humano: a pubkey hex da chave que o cliente dele usa
# (Mostrix: admin_privkey). Nunca liste a chave do próprio Serbero.
[[solvers]]
pubkey = "SOLVER_PUBKEY_HEX"
permission = "write"

[notify]
renotify_after = "15m"

[mediation]
enabled = false</code></pre>

      <h4>Executar como serviço</h4>
      <p>O projeto traz uma unit systemd reforçada. Baixe-a do <code>main</code>: a cópia dentro do arquivo da v0.2.5 precisa do systemd 251 e não inicia no Ubuntu 22.04.</p>
      <pre><code>sudo useradd --system --home-dir /var/lib/serbero --shell /usr/sbin/nologin serbero
sudo install -m 755 serbero /usr/local/bin/serbero
sudo install -d -m 755 /etc/serbero
sudo install -m 644 config.toml /etc/serbero/config.toml
sudo install -d -m 700 /etc/serbero/credentials
sudo sh -c 'umask 077; openssl rand -hex 32 > /etc/serbero/credentials/serbero_private_key'
curl -fsSLO https://raw.githubusercontent.com/MostroP2P/serbero/main/deploy/serbero.service
sudo install -m 644 serbero.service /etc/systemd/system/serbero.service
sudo systemctl daemon-reload && sudo systemctl enable --now serbero
journalctl -u serbero -f        # anote o npub que ele registra na inicialização</code></pre>
      <p>Faça backup de <code>/etc/serbero/credentials/serbero_private_key</code> offline. É a identidade do Serbero: se a perder, você precisa registrar um npub novo.</p>

      <h4>Registrá-lo no seu nó</h4>
      <p>O Mostro v0.19.1 ou posterior registra o Serbero para você. Adicione o npub dele ao bloco <code>[mostro]</code> do seu <code>settings.toml</code> e reinicie o Mostro:</p>
      <pre><code>[mostro]
serbero_pubkey = "npub1..."   # a chave do Serbero, npub ou hex</code></pre>
      <p>Na inicialização o Mostro registra essa chave como solver somente leitura e a anuncia no seu evento de info. Esse anúncio é como o Mostro App rotula as mensagens do Serbero e como o mostro-watchdog o encontra. O log confirma: <code>Serbero npub1... configured: registered as a read-only solver</code>.</p>
      <div class="callout important">
        <div class="callout-title">⚠️ Não adicione o Serbero com admaddsolver</div>
        <p>Um npub simples adicionado com <code>admaddsolver</code> vira read-write (5.1), e então o Mostro se recusa a iniciar com <code>REFUSING TO START: serbero_pubkey ... is a solver with write permission</code>. Ele também recusa uma chave que pertença a um usuário que não é solver, e a chave do próprio nó. Dê ao Serbero uma chave só dele e deixe o <code>serbero_pubkey</code> registrá-la.</p>
      </div>

      <h4>Seus solvers leem o Serbero no Mostrix</h4>
      <p>O Mostrix 0.3.5 ou posterior mostra as mensagens do Serbero num painel <strong>SERBERO</strong> em cada disputa, mas apenas de remetentes em quem o solver confia. No <code>~/.mostrix/settings.toml</code> de cada solver:</p>
      <pre><code>trusted_dm_senders = ["npub1..."]   # o npub do Serbero</code></pre>
      <p>A pubkey do <code>admin_privkey</code> do solver deve ser exatamente a de uma entrada <code>[[solvers]]</code>, e o Mostrix deve ler pelo menos um dos relays do Serbero. Para tomar um caso, pressione <kbd>Ctrl+T</kbd> sobre uma entrega; exige permissão read-write, e o Serbero para de escrever na hora. O Bosstro (5.11) ainda não mostra os resumos do Serbero.</p>

      <h4>Ativando a mediação (piloto)</h4>
      <p>A mediação vem desligada. Quando ligada, o Serbero assume cada nova disputa e se apresenta a ambas as partes como um assistente automatizado, no idioma delas (inglês, espanhol ou português), uma pergunta curta por vez. Quando ambos responderam, dá a eles 30 minutos para resolver a operação por conta própria e então entrega o caso aos seus solvers. Nunca diz a ninguém que libere ou cancele.</p>
      <p>Para ler as respostas, o Serbero consulta um modelo juiz (o Jev, da TypeSafe) na <strong>sua própria</strong> conta paga. O juiz recebe os papéis da operação, o valor, a moeda e o método de pagamento, e o texto das mensagens — nunca as chaves públicas. Peça ao provedor retenção zero de dados e avise seus usuários de que as mensagens da disputa são processadas por um serviço automatizado. O README explica a chave de API e a tabela de limiares; defina <code>enabled = true</code> em <code>[mediation]</code> e reinicie, e o log diz <code>mediation ready</code> ou por que não.</p>
      <p>As mensagens das partes são eventos kind 14: use mais de um relay, e apenas relays que as guardem, ou as mensagens enviadas enquanto o Serbero está offline se perdem. Para publicar o progresso do Serbero no Telegram da sua equipe, registre o mostro-watchdog como observador (5.3). Faça backup do <code>serbero.db</code> de forma privada: ele guarda as conversas das disputas.</p>`,
    },
    'bosstro': {
      title: `5.11 Bosstro — Resolvendo disputas pelo celular`,
      nav: `Bosstro`,
      html: `      <p>O <a href="https://github.com/MostroP2P/bosstro" target="_blank" rel="noopener noreferrer">Bosstro</a> é o app Android para solvers de disputas. Ele leva o lado admin do Mostrix para um telefone: o solver vê as disputas pendentes do seu nó, assume uma, conversa com o comprador e o vendedor (imagens e PDFs incluídos), lê o chat das próprias partes quando uma delas compartilha sua chave e, com permissão read-write, paga o comprador ou reembolsa o vendedor, com a opção de caução quando o seu nó tem cauções.</p>
      <p>É uma ferramenta para os seus solvers, não para operar, e nunca guarda a chave do seu nó. Registrar solvers continua sendo feito no Mostrix ou no <code>mostro-cli</code> (5.2).</p>

      <h4>Instalar e verificar</h4>
      <p>Android 7.0 ou posterior. Baixe o APK em <a href="https://github.com/MostroP2P/bosstro/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a>: <code>arm64-v8a</code> para quase qualquer telefone, <code>armeabi-v7a</code> para um antigo de 32 bits. Confira-o com o arquivo de checksums da release:</p>
      <pre><code>sha256sum -c SHA256SUMS.txt --ignore-missing</code></pre>
      <p>O checksum só prova que o download está completo. O certificado de assinatura prova quem o compilou, e o Android recusa uma atualização assinada com qualquer outra chave. Compare-o com o <a href="https://github.com/soupslurpr/AppVerifier" target="_blank" rel="noopener noreferrer">AppVerifier</a>:</p>
      <pre><code>foundation.mostro.bosstro
63:92:27:84:C2:E3:2A:F4:B6:03:0F:5E:2A:18:1F:74:9B:F6:95:E5:2F:1C:A8:45:7E:98:CB:05:D2:9E:B3:4B</code></pre>

      <h4>Adicionar um solver</h4>
      <ol>
        <li>O solver abre o Bosstro, toca em <strong>Create new account</strong> (ou <strong>Log in</strong> com um nsec de solver existente) e envia a você o npub. Essa chave não deve ser usada para mais nada — nunca a chave de um app de trading, ou os dois papéis ficam vinculados publicamente.</li>
        <li>Você a registra, somente leitura para começar (5.1):
          <pre><code>ADMIN_NSEC=nsec1... mostro-cli admaddsolver -n npub1solver...:read</code></pre></li>
        <li>O solver escolhe o seu nó no Bosstro: o Mostro, uma comunidade da lista, ou a sua própria pubkey e relays. O Bosstro descobre pelas respostas do seu nó se a chave é de um solver e com qual permissão.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Limites atuais</div>
        <p>O Bosstro fala apenas o protocolo v2 (4.8). A versão 0.1 não mostra os resumos de entrega do Serbero e ainda não tem notificações push, então os solvers que trabalham com o Serbero ainda precisam do Mostrix para isso. Um solver read-write pode tomar uma disputa do Serbero no Bosstro.</p>
      </div>`,
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
      <p>Os usuários precisam de um cliente Mostro — o <a href="https://github.com/MostroP2P/app" target="_blank" rel="noopener noreferrer">Mostro App</a> para Android, iOS, desktop e web, ou o mostro-cli ou o Mostrix — e da chave pública do seu Mostro (npub). No app eles vão a <em>Configurações → Rede → Nó Mostro → Adicionar seu próprio nó</em> e colam seu npub; os nós listados neste site já aparecem ali. O cliente se comunica através dos relays Nostr. Não é necessária conexão direta.</p>

      <h3>Meu nó ainda pode atender clientes antigos (protocolo v1)?</h3>
      <p>Não. Desde a v0.19.0 o Mostro fala apenas o protocolo v2 (4.8). Os usuários de um cliente antigo precisam atualizar para o Mostro App ou para um Mostrix ou mostro-cli atual.</p>

      <h3>Meus usuários podem operar USDT, Liquid ou Rootstock em vez de fiat?</h3>
      <p>Sim, desde a v0.20.2: USDT, USDC, DOC, BTC on-chain, LBTC e RBTC. Você os habilita um a um, e seus solvers precisam saber como conferir essas transferências. Veja 4.12.</p>

      <h3>Os usuários podem trazer a reputação do lnp2pBot ou de outro Mostro?</h3>
      <p>Sim, se você confia na fonte. Ative a importação de reputação e adicione a chave do lnp2pBot, ou a de um nó Mostro em que você confia (4.13). Você também pode deixar seus usuários exportarem a reputação que ganharam no seu nó.</p>

      <h3>Posso executar múltiplas instâncias de Mostro?</h3>
      <p>Sim, mas cada uma precisa de seu próprio par de chaves Nostr, nó LND (ou pelo menos canais/liquidez separados), e configuração.</p>

      <h3>É legal?</h3>
      <p>Depende muito da sua jurisdição. Mostro é software para trading peer-to-peer. Em algumas jurisdições, operar uma exchange P2P pode exigir licenças. <strong>Verifique as regulamentações locais e procure assessoria jurídica.</strong></p>

      <h3>Quanta largura de banda o Mostro usa?</h3>
      <p>Muito pouca — principalmente pequenos eventos Nostr. Alguns GB por mês é típico mesmo com volume moderado.</p>

      <h3>O que acontece se meu nó ficar offline?</h3>
      <p>Ordens pendentes eventualmente expiram. Operações ativas com fundos bloqueados continuam quando você volta a ficar online. Se ficar offline por muito tempo, os usuários podem perder a confiança. Desde a v0.18.3 há também um prazo para o escrow: se o nó ficar fora o tempo suficiente para a hold invoice se aproximar do seu horizonte CLTV, o LND a cancela e o vendedor é reembolsado automaticamente. Se for o seu LND que sai de sincronia enquanto o Mostro continua rodando, os pagamentos esperam em vez de falhar e, após 10 minutos, o nó entra em manutenção por conta própria até o LND se recuperar (5.4).</p>

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
        <li><strong>Considere também a privacidade do seu nó Lightning.</strong> Executar LND atrás de Tor é possível e recomendado em ambientes sensíveis. Seu evento de info publica a pubkey do LND e os endereços que ele anuncia, então faça o LND anunciar apenas endereços Tor.</li>
        <li><strong>Saiba o que o seu nó publica.</strong> O evento de saúde (5.4) é público: status, altura de blocos e rede do LND, versão do Mostro. Definir um <code>watchdog_pubkey</code> adiciona uma tag que vincula o seu nó a essa chave. Desligue-o com <code>[health] enabled = false</code> se isso importar mais que o monitoramento.</li>
        <li><strong>As variáveis de proxy não bastam.</strong> As consultas de endereços Lightning ignoram de propósito <code>HTTP_PROXY</code>/<code>HTTPS_PROXY</code>. Para ocultar o IP do servidor, encaminhe a máquina inteira pelo Tor ou por uma VPN.</li>
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

      <h4><code>transport = "gift-wrap" (protocol v1) is no longer supported</code></h4>
      <p>Apague a linha <code>transport</code> do <code>settings.toml</code>. Veja 4.8.</p>

      <h4><code>escrow_deadline_margin_blocks (X) must be at least 18 ...</code> ou <code>... must be below hold_invoice_cltv_delta</code></h4>
      <p>Defina a margem entre 18 e <code>hold_invoice_cltv_delta</code>; os 24 do template com 144 funcionam. Veja 4.9.</p>

      <h4><code>unknown field mint_url</code></h4>
      <p>Em <code>[cashu]</code>, renomeie-a para <code>mint_urls = ["..."]</code>. Veja 4.11.</p>

      <h4><code>anti_abuse_bond.bond_cltv_delta ... must be above hold_invoice_cltv_delta + 144</code> ou <code>... must be at most 864</code></h4>
      <p>Defina <code>bond_cltv_delta</code> explicitamente dentro desses limites. Na v0.20.2, as cauções com um <code>hold_invoice_cltv_delta</code> de 288 ou mais caem nisto com o valor padrão. Veja 4.11.</p>

      <h4><code>REFUSING TO START: serbero_pubkey ...</code></h4>
      <p>A chave do Serbero já é um solver read-write, pertence a um usuário ou é a chave do seu próprio nó. Dê ao Serbero uma chave só dele. Veja 5.10.</p>

      <h4>As configurações de reputação impedem a inicialização</h4>
      <p>Os nomes dos emissores devem ser únicos e cada chave válida e listada uma só vez; a chave de um emissor nunca deve passar para outro nome depois que tem importações. Com a exportação ligada, <code>MOSTRO_REPUTATION_ISSUER_SK</code> deve estar definida, ser válida, diferente da chave do seu nó e não estar na sua própria lista de importação. Veja 4.13.</p>

      <h4>Os clientes não veem minhas ordens ou não conseguem escrever para o meu nó</h4>
      <p>Seu nó fala apenas o protocolo v2. Um usuário de um cliente antigo, que só fala v1, não recebe resposta e precisa atualizar (4.8). Confira também se os clientes e o seu nó compartilham pelo menos um relay.</p>

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

      <h4>Os pagamentos não saem, mas não há erro</h4>
      <p>Confira se o LND está sincronizado: <code>lncli getinfo</code>. Enquanto não estiver, o Mostro segura os pagamentos de propósito e os reenvia quando o LND se recupera (5.4).</p>

      <h4>Os usuários recebem recusas de "manutenção" embora eu nunca a tenha ativado</h4>
      <p><code>mostro-cli admmaintenancestatus</code> mostra o motivo. <code>lnd_unsynced</code> significa que o Mostro a ativou porque o LND saiu de sincronia; ele a desfaz sozinho 5 minutos depois de o LND voltar a estar sincronizado (5.4).</p>

      <h4>As dev fees nunca são pagas</h4>
      <p>Em testnet, signet ou regtest isso é esperado: as dev fees só são pagas na mainnet (4.2).</p>

      <h4>As ordens a preço de mercado numa moeda são recusadas</h4>
      <p>Seu nó não tem taxa para ela. Confira os avisos <code>price:</code> no log de inicialização: um bloco <code>[price]</code> sem nenhuma fonte de mercado habilitada, ou uma stablecoin cotada mas não listada em <code>fiat_currencies_accepted</code>, são as causas habituais. Veja 4.10 e 4.12.</p>

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
