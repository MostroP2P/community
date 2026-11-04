import type { GuideTranslation } from './types';

/**
 * es translation of the node guide.
 *
 * `{{version}}` and `{{updated}}` are replaced at render time with the
 * current Mostro release tag and its month. Section order and heading levels
 * live in `./sections.ts`, not here.
 */
const es: GuideTranslation = {
  meta: {
    title: `Guía de Configuración de Nodo — Mostro Community`,
    description: `Guía completa para ejecutar tu propio nodo Mostro P2P de intercambio de Bitcoin.`,
    h1: `Ejecutando Tu Propio Nodo Mostro`,
    versionLine: `Mostro {{version}} — Guía de la Comunidad · {{updated}}`,
    tocTitle: `En esta página`,
    tocButton: `📑 Índice`,
    credit: `      <div style="text-align:center; margin-top:48px; padding:24px; border-top:1px solid var(--border);">
        <p>Esta guía es mantenida por la comunidad Mostro. ¿Encontraste un error o quieres mejorarla?<br>
        Las contribuciones son bienvenidas en <a href="https://github.com/MostroP2P/community" target="_blank" rel="noopener noreferrer">github.com/MostroP2P/community</a></p>
        <p style="color:var(--text-secondary); margin-top:12px;">Última actualización: {{updated}} · Mostro {{version}}</p>
      </div>`,
  },

  sections: {
    'what-is-mostro': {
      title: `1. ¿Qué es Mostro y por qué tu comunidad debería ejecutar uno?`,
      nav: `1. ¿Qué es Mostro?`,
      navShort: `1. ¿Qué es Mostro?`,
      html: `      <p>Mostro es un <strong>exchange peer-to-peer de Bitcoin</strong> que permite a las personas comprar y vender Bitcoin usando monedas locales (dólares, euros, pesos — cualquier moneda) sin necesidad de proporcionar documentos de identidad (KYC). Piensa en él como un mercado descentralizado donde compradores y vendedores pueden comerciar directamente.</p>

      <p>Funciona usando dos tecnologías:</p>
      <ul>
        <li><strong>Lightning Network</strong> — una capa de pagos rápidos y de bajo costo para Bitcoin (piensa en ella como la vía rápida de Bitcoin para pagos pequeños y ágiles)</li>
        <li><strong>Nostr</strong> — un protocolo de comunicación resistente a la censura (piensa en él como un sistema de mensajería que nadie puede apagar)</li>
      </ul>

      <p>Mostro actúa como un <strong>coordinador de custodia</strong> — retiene los Bitcoin del vendedor en una "caja fuerte" temporal (llamada hold invoice) hasta que el comprador confirma que ha enviado el pago en moneda local. Mostro nunca controla realmente los fondos de nadie; solo los retiene brevemente durante la operación.</p>`,
    },
    'why-run': {
      title: `¿Por qué tu comunidad querría ejecutar un nodo Mostro?`,
      nav: `¿Por qué un nodo?`,
      html: `      <ol>
        <li><strong>Ingresos por comisiones</strong> — Cada operación te genera la comisión que tú fijes (la plantilla trae 0; 0.6% es una opción común). Con 0.6%, una comunidad que hace $10,000 en operaciones mensuales gana ~$60/mes en comisiones.</li>
        <li><strong>Trading P2P sin KYC</strong> — Los miembros de tu comunidad pueden comprar y vender Bitcoin sin proporcionar documentos de identidad. Especialmente importante en regiones con monedas inestables o regulaciones restrictivas.</li>
        <li><strong>Disputas en tu idioma</strong> — Cuando una operación sale mal, <em>tu</em> comunidad la resuelve, en <em>tu</em> idioma, entendiendo <em>tus</em> métodos de pago locales.</li>
        <li><strong>Independencia</strong> — Ninguna empresa puede cerrar tu exchange. Ningún gobierno puede presionar a un único operador para cerrarlo.</li>
        <li><strong>Personalización</strong> — Tú eliges qué monedas soportar, qué métodos de pago permitir y qué comisiones cobrar.</li>
      </ol>`,
    },
    'how-it-works': {
      title: `Cómo funciona Mostro (Simplificado)`,
      nav: `Cómo funciona`,
      html: `      <div class="flow-diagram">
        <div class="flow-step"><span class="step-num">1.</span> Alice quiere VENDER Bitcoin por $50 USD <span class="arrow">→</span> Crea una orden en Mostro</div>
        <div class="flow-step"><span class="step-num">2.</span> Bob quiere COMPRAR Bitcoin con $50 USD <span class="arrow">→</span> Ve la orden de Alice y la toma</div>
        <div class="flow-step"><span class="step-num">3.</span> Mostro crea una "caja fuerte" (hold invoice) <span class="arrow">→</span> Alice envía sus Bitcoin a la caja fuerte</div>
        <div class="flow-step"><span class="step-num">4.</span> Bob envía $50 a Alice por transferencia bancaria, Zelle, efectivo, etc. <span class="arrow">→</span> Bob presiona "Fiat Enviado" en su app</div>
        <div class="flow-step"><span class="step-num">5.</span> Alice confirma que recibió los $50 <span class="arrow">→</span> Presiona "Liberar"</div>
        <div class="flow-step"><span class="step-num">6.</span> Mostro libera los Bitcoin de la caja fuerte a Bob <span class="arrow">→</span> ¡Operación completada! ✓</div>
      </div>

      <p>Si algo sale mal (ej: Bob dice que pagó pero Alice no lo recibió), cualquiera de las partes puede abrir una <strong>disputa</strong>, y los árbitros asignados de tu comunidad investigan y resuelven.</p>`,
    },
    'prerequisites': {
      title: `2. Prerequisitos — Lo que necesitas antes de empezar`,
      nav: `2. Prerequisitos`,
      navShort: `2. Prerequisitos`,
      html: ``,
    },
    'vps': {
      title: `2.1 Un Servidor (VPS)`,
      nav: `Servidor (VPS)`,
      html: `      <p>Un <strong>VPS</strong> (Servidor Virtual Privado) es una computadora en un centro de datos que funciona 24/7. Alquilarás uno para alojar tu nodo Mostro.</p>

      <p><strong>Especificaciones mínimas:</strong></p>
      <table class="guide-table">
        <thead><tr><th>Recurso</th><th>Mínimo</th><th>Recomendado</th></tr></thead>
        <tbody>
          <tr><td>CPU</td><td>2 vCPUs (compartidos)</td><td>2+ vCPUs</td></tr>
          <tr><td>RAM</td><td>2 GB</td><td>4 GB</td></tr>
          <tr><td>Almacenamiento</td><td>60 GB SSD</td><td>100 GB SSD</td></tr>
          <tr><td>Ancho de banda</td><td>3 TB/mes</td><td>3+ TB/mes</td></tr>
          <tr><td>SO</td><td>Ubuntu 22.04+ LTS</td><td>Ubuntu 24.04 LTS</td></tr>
        </tbody>
      </table>

      <p><strong>Costo mensual estimado:</strong> $10–$24/mes.</p>

      <p>Estas cifras son solo para Mostro. Si LND corre en el mismo VPS, suma al menos 2 GB de RAM y el disco que necesita su backend de Bitcoin (ver 2.2).</p>

      <p><strong>Proveedores populares de VPS:</strong></p>
      <ul>
        <li><a href="https://www.hostinger.com/" target="_blank" rel="noopener noreferrer">Hostinger</a> — desde ~$7/mes (precio promocional; la renovación puede ser mayor) (KVM 2: 2 vCPU, 8GB RAM, 100GB NVMe, 8TB bandwidth) · Acepta Bitcoin</li>
        <li><a href="https://www.hetzner.com/" target="_blank" rel="noopener noreferrer">Hetzner</a> — €3.49-8/mes (CX23 desde €3.49, buena relación calidad-precio, con base en la UE)</li>
        <li><a href="https://www.digitalocean.com/" target="_blank" rel="noopener noreferrer">Digital Ocean</a> — $24/mes (4GB RAM, 2 CPUs, 80GB SSD) o $32/mes (4GB RAM, 2 Intel CPUs, 120GB NVMe)</li>
        <li><a href="https://www.ovhcloud.com/" target="_blank" rel="noopener noreferrer">OVH</a> — ~$6-12/mes</li>
        <li><a href="https://www.linode.com/" target="_blank" rel="noopener noreferrer">Linode/Akamai</a> — $12/mes</li>
        <li><a href="https://www.lunanode.com/" target="_blank" rel="noopener noreferrer">Lunanode</a> — Acepta pagos en Bitcoin</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Consejo</div>
        <p>Muchos proveedores de VPS aceptan pagos en Bitcoin. Busca esa opción si quieres mantener coherencia con la filosofía de Bitcoin.</p>
      </div>

      <p>Necesitas sentirte cómodo conectándote a un servidor por SSH. Si nunca lo has hecho, busca un tutorial sobre "Conectarse por SSH a un VPS" — es más simple de lo que parece.</p>`,
    },
    'lnd': {
      title: `2.2 Un Nodo Lightning Network (LND)`,
      nav: `Nodo Lightning (LND)`,
      html: `      <p>Lightning Network es un sistema "capa 2" construido sobre Bitcoin que permite pagos rápidos y baratos. Para ejecutar Mostro, necesitas un <strong>nodo LND</strong> (Lightning Network Daemon) — el software Lightning específico con el que Mostro trabaja.</p>

      <p><strong>Tus opciones:</strong></p>
      <table class="guide-table">
        <thead><tr><th>Opción</th><th>Dificultad</th><th>Costo</th><th>Notas</th></tr></thead>
        <tbody>
          <tr><td>Usar un nodo LND existente</td><td><span class="badge badge-easy">Fácil</span></td><td>Gratis (si tienes uno)</td><td>Mejor si alguien ya tiene uno</td></tr>
          <tr><td>Ejecutar LND en el mismo VPS</td><td><span class="badge badge-hard">Difícil</span></td><td>VPS más grande + liquidez</td><td>4GB+ de RAM y disco para el backend de Bitcoin (ver abajo)</td></tr>
          <tr><td>Solución nodo-en-caja</td><td><span class="badge badge-medium">Medio</span></td><td>$200-600 + liquidez</td><td><a href="https://start9.com/" target="_blank" rel="noopener noreferrer">Start9</a>, <a href="https://umbrel.com/" target="_blank" rel="noopener noreferrer">Umbrel</a>, <a href="https://raspiblitz.org/" target="_blank" rel="noopener noreferrer">RaspiBlitz</a></td></tr>
          <tr><td>StartOS con paquete Mostro</td><td><span class="badge badge-easy">Más fácil</span></td><td>$300-600 + liquidez</td><td>Start9 tiene un paquete Mostro de un clic</td></tr>
          <tr><td>Usar Voltage.cloud</td><td><span class="badge badge-easy">Fácil</span></td><td>Desde ~$20/mes + liquidez</td><td><a href="https://voltage.cloud/" target="_blank" rel="noopener noreferrer">Voltage</a> — LND alojado con infraestructura administrada</td></tr>
        </tbody>
      </table>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>Mostro requiere específicamente <strong>LND</strong> (no CLN/Core Lightning, no Eclair, no LDK). Asegúrate de que tu nodo Lightning ejecute LND.</p>
      </div>

      <p><strong>Lo que necesitas de tu nodo LND:</strong></p>
      <ul>
        <li>El archivo <code>tls.cert</code> (un certificado de seguridad)</li>
        <li>Un archivo <code>mostro.macaroon</code> dedicado (un token de autenticación con solo los permisos que Mostro necesita, ver abajo)</li>
        <li>La dirección gRPC (típicamente <code>https://127.0.0.1:10009</code> si está en la misma máquina)</li>
      </ul>

      <p><strong>Genera un macaroon dedicado para Mostro.</strong> No le des a Mostro tu <code>admin.macaroon</code>: otorga control total sobre tu nodo y sus fondos. Crea un macaroon que tenga únicamente los permisos que Mostro usa (leer info del nodo, listar canales para el reporte de salud, crear/liquidar/cancelar hold invoices, enviar y rastrear pagos).</p>
      <p>Primero elige un root key ID que no esté en uso. Revocar un macaroon revoca todos los macaroons que comparten su ID, así que reutilizar uno se llevaría credenciales ajenas. El ID 0 pertenece a los macaroons propios de LND, así que elige un número libre distinto de cero y anótalo:</p>
      <pre><code>lncli listmacaroonids</code></pre>
      <p>Luego crea el macaroon con el ID que elegiste (<code>7</code> en este ejemplo, sustituye por el tuyo):</p>
      <pre><code>lncli bakemacaroon --root_key_id 7 \\
  --save_to /root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon \\
  info:read invoices:read invoices:write offchain:read offchain:write</code></pre>
      <p>Este macaroon no puede abrir ni cerrar canales, mover fondos on-chain ni cambiar la configuración de tu nodo. Si alguna vez se filtra, revócalo con <code>lncli deletemacaroonid 7</code>, usando el mismo ID con el que lo creaste, y genera uno nuevo.</p>

      <p><strong>Si no puedes escribir en el directorio de datos de LND</strong> (un contenedor, un nodo-en-caja, un nodo alojado), omite <code>--save_to</code>: <code>lncli</code> imprimirá entonces el macaroon en hex, y tú lo conviertes en archivo en el lugar donde corre Mostro. <code>lncli</code> también puede crearlo desde otra máquina, apuntando al nodo con sus credenciales de admin:</p>
      <pre><code>lncli --rpcserver=NODE_ADDRESS:10009 --tlscertpath=tls.cert --macaroonpath=admin.macaroon \\
  bakemacaroon --root_key_id 7 info:read invoices:read invoices:write offchain:read offchain:write
# copia el hex que imprime, luego:
echo "PASTE_THE_HEX_HERE" | xxd -r -p > mostro.macaroon   # apt install -y xxd si falta</code></pre>

      <h4>Cómo se conecta Mostro a LND</h4>
      <p>Mostro habla con el puerto gRPC de LND (10009 por defecto) y se autentica con <code>tls.cert</code> y el macaroon. Hay tres cosas que conviene saber antes de elegir dónde corre LND:</p>
      <ul>
        <li><strong>LND solo escucha en <code>localhost</code> por defecto.</strong> Un Mostro en la misma máquina lo alcanza en <code>https://127.0.0.1:10009</code>; cualquier otro caso (un contenedor Docker, otro servidor) necesita los pasos adicionales de abajo.</li>
        <li><strong>Mostro fija el certificado.</strong> Acepta exactamente el certificado de <code>tls.cert</code> e ignora el nombre de host, así que no necesitas <code>tlsextraip</code> ni <code>tlsextradomain</code>. Pero si LND regenera su certificado (vence a los 14 meses aproximadamente), copia el nuevo <code>tls.cert</code> a Mostro y reinícialo, o se detendrá al arrancar con <code>Ln node error</code>.</li>
        <li><strong>Sin Tor en este enlace.</strong> Mostro no puede llegar a LND a través de Tor ni de un proxy SOCKS. Un LND remoto debe ser alcanzable por la red: usa una VPN.</li>
      </ul>

      <h4>LND en el mismo VPS</h4>
      <p>Instala LND siguiendo la guía oficial (<a href="https://docs.lightning.engineering/lightning-network-tools/lnd/run-lnd" target="_blank" rel="noopener noreferrer">docs.lightning.engineering</a>), usando sus binarios de release. LND necesita una vista de la cadena de Bitcoin, y esa elección decide el tamaño de tu VPS:</p>
      <table class="guide-table">
        <thead><tr><th>Backend</th><th>Disco</th><th>Compromiso</th></tr></thead>
        <tbody>
          <tr><td><code>bitcoind</code>, nodo completo</td><td>Más de 700 GB</td><td>El más robusto. La sincronización inicial toma días.</td></tr>
          <tr><td><code>bitcoind</code>, podado</td><td>Decenas de GB</td><td>Soportado por LND y robusto; la sincronización inicial sigue tomando días.</td></tr>
          <tr><td><code>neutrino</code></td><td>Unos pocos GB</td><td>Sin nodo de Bitcoin y con un arranque rápido, pero depende de los pares desde los que se sincroniza. Un nodo neutrino que se estancó unas 21 horas es la razón por la que Mostro ahora vigila la sincronización de LND (5.4). Si lo usas, apúntalo a nodos de Bitcoin de tu confianza con <code>neutrino.connect</code> y configura las alertas de salud.</td></tr>
        </tbody>
      </table>
      <p>Luego haz que LND sea alcanzable desde Mostro. Con la instalación nativa (Opción C) nada cambia: usa <code>https://127.0.0.1:10009</code>. Con Docker (Opciones A y B) el contenedor es un host aparte, así que elige una:</p>
      <ul>
        <li><strong>Red del host (la más simple).</strong> Ejecuta el contenedor con <code>--network host</code> en lugar de <code>--add-host=host.docker.internal:host-gateway</code> (en compose, <code>network_mode: host</code> en lugar de <code>extra_hosts</code>) y configura <code>lnd_grpc_host = 'https://127.0.0.1:10009'</code>. LND sigue escuchando solo en <code>localhost</code>.</li>
        <li><strong>Mantén la red bridge</strong> y <code>host.docker.internal</code>, como en la Opción A. Entonces LND tiene que escuchar más allá de <code>localhost</code> (agrega <code>rpclisten=0.0.0.0:10009</code> a <code>lnd.conf</code>) y tu firewall debe mantener el puerto 10009 cerrado a internet, por ejemplo <code>ufw allow from 172.16.0.0/12 to any port 10009 proto tcp</code> seguido de <code>ufw deny 10009/tcp</code>.</li>
      </ul>

      <h4>LND en otro servidor o en casa</h4>
      <p>Conecta las dos máquinas con una VPN como <a href="https://www.wireguard.com/" target="_blank" rel="noopener noreferrer">WireGuard</a> o <a href="https://tailscale.com/" target="_blank" rel="noopener noreferrer">Tailscale</a>, haz que LND escuche en su dirección de la VPN (<code>rpclisten=VPN_IP:10009</code>) y configura <code>lnd_grpc_host = 'https://VPN_IP:10009'</code>. Copia <code>tls.cert</code> y el macaroon al servidor de Mostro. Abrir el puerto 10009 a internet también funciona, pero entonces el macaroon es lo único que hay entre el mundo y tu nodo: evítalo. Un nodo en casa debe estar en línea 24/7: un corte de luz o una conexión caída deja esperando las operaciones de tus usuarios.</p>

      <h4>Nodo-en-caja (Start9, Umbrel, RaspiBlitz)</h4>
      <p>Estos sistemas instalan y actualizan LND por ti, normalmente en una computadora pequeña en casa. En <strong>StartOS</strong> el camino más simple es el propio paquete de Mostro, que se conecta al servicio LND de la misma caja. Para usar el LND de la caja desde un Mostro en un VPS, usa la configuración con VPN de arriba. Cada sistema muestra los datos de conexión de LND en su propia interfaz (en StartOS, en las propiedades del servicio LND); <code>lncli</code> suele correr dentro del contenedor de LND; en Umbrel, por ejemplo, <code>sudo docker exec -it lightning_lnd_1 lncli ...</code> (verifica el nombre con <code>sudo docker ps</code>). Crea el macaroon en hex como se muestra arriba.</p>

      <h4>Voltage (LND alojado)</h4>
      <p>Voltage ejecuta LND por ti. Descarga <code>tls.cert</code> y el macaroon de admin desde el panel del nodo, úsalos solo para crear el macaroon restringido de Mostro desde tu propia máquina (ver arriba) y apunta <code>lnd_grpc_host</code> a la dirección gRPC que muestra el panel, puerto 10009. Tú sigues aportando y administrando la liquidez.</p>

      <h4>Ajustes de LND que afectan a Mostro</h4>
      <ul>
        <li><code>invoices.holdexpirydelta</code> (por defecto 12): si lo subes, sube también <code>escrow_deadline_margin_blocks</code> para que siga al menos 6 bloques por encima (4.9).</li>
        <li><code>max-cltv-expiry</code> (por defecto 2016): el <code>payment_cltv_limit</code> de Mostro no debe superarlo (4.9).</li>
        <li>Guarda a buen resguardo la semilla de la billetera de LND y el respaldo de canales: ver 5.6.</li>
      </ul>`,
    },
    'liquidity': {
      title: `2.3 Liquidez Lightning`,
      nav: `Liquidez`,
      html: `      <p>Para facilitar operaciones, tu nodo Lightning necesita <strong>canales</strong> con Bitcoin en ellos. Piensa en los canales Lightning como túneles de pago pre-financiados. El Bitcoin dentro de estos canales es tu "liquidez".</p>

      <p><strong>¿Cuánta necesitas?</strong></p>
      <table class="guide-table">
        <thead><tr><th>Volumen de trading objetivo</th><th>Liquidez sugerida</th><th>BTC aproximado</th></tr></thead>
        <tbody>
          <tr><td>Comunidad pequeña (pocas operaciones/día)</td><td>1–5 millones de sats</td><td>0.01–0.05 BTC</td></tr>
          <tr><td>Comunidad mediana</td><td>5–20 millones de sats</td><td>0.05–0.20 BTC</td></tr>
          <tr><td>Comunidad activa</td><td>20–100 millones de sats</td><td>0.20–1.0 BTC</td></tr>
        </tbody>
      </table>

      <div class="callout tip">
        <div class="callout-title">💡 Nota sobre Liquidez Lightning</div>
        <p>El Bitcoin en tus canales Lightning está bloqueado <strong>onchain</strong> pero sigue siendo altamente gastable vía Lightning Network. Muchos servicios aceptan pagos Lightning — desde cafeterías hasta proveedores VPS — haciendo tu liquidez bastante flexible para uso cotidiano.</p>
      </div>

      <p><strong>Empieza pequeño, crece incrementalmente.</strong> Comienza con lo suficiente para las necesidades iniciales de tu comunidad y monitorea el feedback. Cuando los traders reporten que las órdenes fallan por capacidad insuficiente, esa es tu señal para agregar más. Escucha a tu comunidad.</p>

      <p><strong>Obteniendo liquidez:</strong></p>
      <ul>
        <li>Abre canales a nodos bien conectados (usa <a href="https://lightningnetwork.plus/" target="_blank" rel="noopener noreferrer">Lightning Network+</a> o <a href="https://amboss.space/" target="_blank" rel="noopener noreferrer">Amboss</a> para encontrar buenos pares)</li>
        <li>Necesitas capacidad <strong>saliente</strong> (para pagar a compradores) y capacidad <strong>entrante</strong> (para recibir de vendedores). Cada operación primero recibe los sats del vendedor y luego paga al comprador, así que mantén al menos tu <code>max_order_amount</code> (4.3) de capacidad en cada dirección</li>
        <li>Obtener liquidez entrante suele ser más difícil — considera <a href="https://lightning.engineering/loop/" target="_blank" rel="noopener noreferrer">Lightning Loop</a>, <a href="https://amboss.space/magma" target="_blank" rel="noopener noreferrer">Magma</a>, o servicios de intercambio de canales</li>
      </ul>`,
    },
    'nostr-keys': {
      title: `2.4 Claves Nostr`,
      nav: `Claves Nostr`,
      html: `      <p>Tu nodo Mostro necesita su propia identidad en la red Nostr — un par de claves criptográficas con una clave pública (la dirección de tu nodo) y una clave privada (tu secreto).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>Nunca reutilices claves Nostr entre instancias de Mostro. Cada nodo necesita su propia identidad única.</p>
      </div>

      <p><strong>Generando claves Nostr seguras localmente con rana:</strong></p>
      <pre><code># Instalar Rust (si no está instalado)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Instalar rana - generador local de claves Nostr
cargo install rana

# Generar un nuevo par de claves (con frase semilla de 12 palabras)
rana --generate 12</code></pre>

      <p>Rana generará tu clave privada (nsec), tu clave pública (npub) y una frase semilla de respaldo. <strong>¡Guarda todo de forma segura!</strong> Nota: ejecutar <code>rana</code> sin argumentos inicia minería PoW (dificultad 10) que puede tardar minutos — usa <code>--generate</code> para generación instantánea. Nunca generes claves importantes usando servicios online.</p>`,
    },
    'skill-level': {
      title: `2.5 Nivel de conocimiento técnico`,
      nav: `Nivel técnico`,
      html: `      <table class="guide-table">
        <thead><tr><th>Tarea</th><th>Dificultad</th><th>Conocimientos necesarios</th></tr></thead>
        <tbody>
          <tr><td>Alquilar un VPS</td><td><span class="badge badge-easy">Fácil</span></td><td>Tarjeta de crédito, navegación web básica</td></tr>
          <tr><td>Conectarse por SSH</td><td><span class="badge badge-easy">Fácil</span></td><td>Seguir instrucciones, escribir comandos</td></tr>
          <tr><td>Instalar Docker</td><td><span class="badge badge-medium">Medio</span></td><td>Copiar y pegar comandos, solución básica de problemas</td></tr>
          <tr><td>Ejecutar Mostro (Docker)</td><td><span class="badge badge-medium">Medio</span></td><td>Editar archivos de configuración, entender rutas</td></tr>
          <tr><td>Ejecutar Mostro (nativo)</td><td><span class="badge badge-hard">Difícil</span></td><td>Administración Linux, compilación de software, systemd</td></tr>
          <tr><td>Configurar LND desde cero</td><td><span class="badge badge-hard">Difícil</span></td><td>Conocimiento significativo de Linux y redes</td></tr>
          <tr><td>Gestionar liquidez Lightning</td><td><span class="badge badge-hard">Difícil</span></td><td>Entender la economía de canales Lightning</td></tr>
        </tbody>
      </table>

      <p><strong>💡 Nuestra recomendación:</strong> Si tu comunidad tiene a alguien cómodo con la línea de comandos de Linux, puede manejar la instalación con Docker. La compilación nativa requiere experiencia en administración de sistemas. La configuración del nodo Lightning es la parte más compleja — considera pedir ayuda a alguien experimentado, o usar una solución nodo-en-caja.</p>`,
    },
    'setup': {
      title: `3. Instalación Paso a Paso`,
      nav: `3. Instalación paso a paso`,
      navShort: `3. Instalación`,
      html: `      <p>Todas las opciones de instalación comparten los mismos primeros pasos. Luego elige la opción que prefieras:</p>
      <ul>
        <li><strong>Opción A (Docker Hub):</strong> La más rápida. Sin compilar, sin clonar. <strong>Recomendada para la mayoría.</strong></li>
        <li><strong>Opción B (Docker Build):</strong> Construyes la imagen localmente desde el repositorio.</li>
        <li><strong>Opción C (Compilación nativa):</strong> Más control, mejor para sysadmins experimentados.</li>
      </ul>

      <p>Todas asumen que ya tienes: ✅ Un VPS con Ubuntu · ✅ Acceso SSH · ✅ Un nodo LND funcionando.</p>`,
    },
    'common-steps': {
      title: `Pasos Comunes (para las 3 opciones)`,
      nav: `Pasos comunes`,
      html: `      <h4>Paso 1: Conéctate a tu VPS</h4>
      <pre><code>ssh root@TU_DIRECCION_IP_DEL_VPS</code></pre>

      <h4>Paso 2: Actualiza el sistema</h4>
      <pre><code># Descargar la información más reciente de paquetes
apt update

# Instalar todas las actualizaciones disponibles
apt upgrade -y</code></pre>

      <h4>Paso 3: Instalar Docker y Docker Compose</h4>
      <div class="callout tip">
        <div class="callout-title">💡 Nota</div>
        <p>Docker es necesario para las opciones A y B. Si vas a compilar manualmente (Opción C), puedes saltar este paso.</p>
      </div>
      <pre><code># Instalar Docker con el script oficial
curl -fsSL https://get.docker.com | sh

# Verificar que Docker está instalado
docker --version

# Verificar Docker Compose
docker compose version</code></pre>

      <h4>Paso 4: Instalar herramientas adicionales</h4>
      <pre><code>apt install -y git make</code></pre>

      <p>✅ <strong>Pasos comunes completados.</strong> Ahora elige tu opción de instalación:</p>`,
    },
    'option-a': {
      title: `Opción A: Docker Hub (La más rápida — Recomendada)`,
      nav: `Opción A: Docker Hub`,
      html: `      <p>Ejecuta Mostro directamente desde Docker Hub sin clonar el repositorio ni compilar. Perfecto para deployments en VPS.</p>

      <h4>Paso 5: Crear directorio de configuración</h4>
      <pre><code>mkdir -p ~/mostro-config/lnd</code></pre>

      <h4>Paso 6: Obtener el template de configuración</h4>
      <pre><code>curl -sL https://raw.githubusercontent.com/MostroP2P/mostro/{{version}}/settings.tpl.toml \\
  -o ~/mostro-config/settings.toml</code></pre>

      <h4>Paso 7: Copiar credenciales LND</h4>
      <pre><code>cp /ruta/a/tu/tls.cert ~/mostro-config/lnd/tls.cert
cp /ruta/a/tu/mostro.macaroon ~/mostro-config/lnd/mostro.macaroon</code></pre>

      <p>Si LND está en la <strong>misma máquina</strong>, las rutas típicas son:</p>
      <ul>
        <li><code>/root/.lnd/tls.cert</code></li>
        <li><code>/root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon</code></li>
      </ul>

      <h4>Paso 8: Editar la configuración</h4>
      <pre><code>nano ~/mostro-config/settings.toml</code></pre>

      <p><strong>Cambios requeridos:</strong></p>
      <pre><code>[lightning]
lnd_cert_file = '/config/lnd/tls.cert'
lnd_macaroon_file = '/config/lnd/mostro.macaroon'
lnd_grpc_host = 'https://host.docker.internal:10009'  # Si LND en el mismo VPS
# O usar 'https://TU_IP_LND:10009' si LND en servidor diferente

[database]
url = "sqlite:///config/mostro.db"  # mostrod siempre usa &lt;directorio-de-config&gt;/mostro.db

[nostr]
nsec_privkey = 'TU_CLAVE_NSEC_AQUI'
relays = ['wss://relay.mostro.network', 'wss://nos.lol']

[mostro]
fee = 0.006                    # 0.6% comisión por operación
max_order_amount = 1000000     # Orden máxima en sats
min_payment_amount = 100       # Orden mínima en sats
fiat_currencies_accepted = ['USD', 'EUR']  # Tus monedas</code></pre>

      <p>Guardar: <code>Ctrl+X</code>, luego <code>Y</code>, luego <code>Enter</code>.</p>

      <h4>Paso 9: Ajustar permisos</h4>
      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>Evita <code>chmod 777</code>. Usa permisos mínimos.</p>
      </div>
      <pre><code>sudo chown -R 1000:1000 ~/mostro-config
chmod 700 ~/mostro-config
chmod 600 ~/mostro-config/settings.toml
chmod 600 ~/mostro-config/lnd/mostro.macaroon</code></pre>

      <h4>Paso 10: Ejecutar el contenedor</h4>
      <p><strong>Si LND está en el mismo VPS</strong> (LND debe aceptar la conexión del contenedor, o usa la red del host: ver 2.2):</p>
      <pre><code>docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:{{version}}</code></pre>

      <p><strong>Si LND está en un servidor diferente:</strong></p>
      <pre><code>docker run -d --name mostro \\
  --restart unless-stopped \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:{{version}}</code></pre>

      <h4>Paso 11: Revisar los logs</h4>
      <pre><code>docker logs -f mostro</code></pre>

      <p>Busca estos mensajes:</p>
      <ul>
        <li><code>Mostro pubkey: npub1... (hex ...)</code> — La identidad de tu nodo. Anota el npub: es lo que necesitan los usuarios y otras herramientas</li>
        <li><code>Settings correctly loaded!</code> — La configuración es válida</li>
        <li><code>Transport: nip44 (protocol v2, event kind 14)</code> — Protocolo en uso (ver 4.8)</li>
        <li><code>Recorded Lightning node identity &lt;pubkey&gt;</code> — LND alcanzado (solo el primer arranque)</li>
        <li><code>Published health event: status ok, seq N</code> — Se repite cada minuto. Al menos un relay aceptó el reporte de salud del nodo (ver 5.4)</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Nota</div>
        <p>No existe un mensaje de "conectado a LND" ni de "conectado al relay". Mostro contacta a LND durante el arranque, así que un daemon que pasa el arranque ya llegó a LND. El fallo, en cambio, es ruidoso: registra <code>Ln node error</code> y termina. Después del arranque consulta a LND cada 15 segundos y registra <code>LND did not answer GetInfo</code> si deja de responder; los pagos salientes esperan entonces hasta que vuelva (5.4). Para los relays, tu señal es la línea del evento de salud: <code>No relay accepted the health event</code> significa que ninguno lo aceptó.</p>
      </div>

      <div class="callout tip">
        <div class="callout-title">💡 Solución de problemas</div>
        <p>Si ves <code>Permission denied (os error 13)</code>, vuelve a ajustar permisos: <code>chown -R 1000:1000 ~/mostro-config</code> y reinicia: <code>docker restart mostro</code>.</p>
      </div>

      <p>🎉 <strong>¡Felicitaciones!</strong> Si ves conexiones exitosas en los logs, ¡tu nodo Mostro está funcionando!</p>

      <h4>Alternativa: Docker Compose</h4>
      <p>En lugar de un comando <code>docker run</code> largo, puedes describir el contenedor en un archivo compose. Corre la misma imagen con la misma configuración, y actualizar se reduce a cambiar el tag en una línea. Crea <code>~/mostro-docker/compose.yml</code>:</p>
      <pre><code>mkdir -p ~/mostro-docker
nano ~/mostro-docker/compose.yml</code></pre>
      <pre><code>services:
  mostro:
    image: mostrop2p/mostro:{{version}}
    container_name: mostro
    restart: unless-stopped
    extra_hosts:
      - "host.docker.internal:host-gateway"  # solo si LND corre en este VPS
    volumes:
      - \${HOME}/mostro-config:/config</code></pre>
      <p>Levántalo y sigue los logs:</p>
      <pre><code>docker compose -f ~/mostro-docker/compose.yml up -d
docker compose -f ~/mostro-docker/compose.yml logs -f mostro</code></pre>
      <p>Elige uno: <code>docker run</code> <strong>o</strong> compose, no ambos. Para actualizar cualquiera de los dos, ve a 5.5.</p>

      <div class="callout security">
        <div class="callout-title">🔒 Nota de Seguridad</div>
        <p>Usa siempre un tag de versión específica (ej. <code>mostrop2p/mostro:{{version}}</code>) en lugar de <code>:latest</code> para controlar despliegues.</p>
      </div>`,
    },
    'option-b': {
      title: `Opción B: Docker Build (Construir imagen localmente)`,
      nav: `Opción B: Docker Build`,
      html: `      <h4>Paso 5: Descargar Mostro</h4>
      <pre><code>cd /opt
git clone https://github.com/MostroP2P/mostro.git
cd mostro</code></pre>

      <h4>Paso 6: Configurar archivos</h4>
      <pre><code>cd docker
mkdir -p config
cp ../settings.tpl.toml config/settings.toml</code></pre>

      <h4>Paso 7: Editar el archivo de configuración</h4>
      <pre><code>nano config/settings.toml</code></pre>
      <p>Edita los mismos ajustes que en la Opción A, Paso 8, con una diferencia: <code>make docker-build</code> copia tu macaroon a <code>config/lnd/admin.macaroon</code>, sea cual sea su nombre original, así que apunta Mostro ahí:</p>
      <pre><code>lnd_macaroon_file = '/config/lnd/admin.macaroon'  # sigue siendo tu mostro.macaroon restringido, con otro nombre</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Si LND corre en la misma VPS</div>
        <p>A diferencia de la Opción A, el <code>docker/compose.yml</code> del repositorio no mapea <code>host.docker.internal</code>, así que en Linux ese nombre no resuelve dentro del contenedor. Agrega el mapeo al servicio <code>mostro</code> antes de construir:</p>
        <pre><code>    extra_hosts:
      - "host.docker.internal:host-gateway"</code></pre>
        <p>O apunta <code>lnd_grpc_host</code> a la IP local del host. Ten en cuenta que <code>make docker-build</code> también construye la imagen StartOS, que una VPS no necesita: solo cuesta tiempo de compilación.</p>
      </div>

      <h4>Paso 8: Construir la imagen Docker</h4>
      <pre><code>cd ..
LND_CERT_FILE=/root/.lnd/tls.cert \\
LND_MACAROON_FILE=/root/.lnd/data/chain/bitcoin/mainnet/mostro.macaroon \\
make docker-build</code></pre>

      <h4>Paso 9: Iniciar Mostro</h4>
      <pre><code># Inicia Mostro y el relay incluido. \`make docker-up\` a secas también
# inicia la imagen StartOS, que no necesitas en una VPS.
docker compose -f docker/compose.yml up -d mostro nostr-relay

# Ver estado
docker compose -f docker/compose.yml ps

# Ver logs
docker compose -f docker/compose.yml logs -f mostro</code></pre>

      <p>🎉 <strong>¡Felicitaciones!</strong> Si ves conexiones exitosas, ¡tu nodo Mostro está funcionando!</p>`,
    },
    'option-c': {
      title: `Opción C: Compilación Nativa (Para operadores técnicos)`,
      nav: `Opción C: Nativo`,
      html: `      <h4>Paso 5: Instalar Rust</h4>
      <pre><code>curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source /root/.cargo/env
rustc --version
cargo --version</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>NO instales Rust via <code>apt install rustc</code>. Siempre usa <code>rustup</code>. El paquete del sistema suele estar desactualizado.</p>
      </div>

      <h4>Paso 6: Instalar dependencias de compilación</h4>
      <pre><code>apt install -y cmake build-essential libsqlite3-dev libssl-dev \\
  pkg-config git sqlite3 protobuf-compiler</code></pre>

      <h4>Paso 7: Descargar y compilar Mostro</h4>
      <pre><code>cd /opt
git clone https://github.com/MostroP2P/mostro.git
cd mostro
cargo build --release</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Consejo</div>
        <p>Si la compilación falla por falta de RAM, agrega espacio swap:</p>
      </div>
      <pre><code>fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile</code></pre>

      <h4>Paso 8–10: Instalar, inicializar y limpiar</h4>
      <pre><code>install target/release/mostrod /usr/local/bin
cargo clean  # Ahorra 2+ GB de espacio</code></pre>

      <h4>Paso 11–12: Crear usuario y configurar</h4>
      <pre><code>adduser --disabled-login mostro
mkdir -p /opt/mostro
cp settings.tpl.toml /opt/mostro/settings.toml
nano /opt/mostro/settings.toml</code></pre>
      <p>Edita los mismos ajustes que en la Opción A, Paso 8.</p>

      <h4>Paso 13–15: Prueba, permisos y servicio systemd</h4>
      <pre><code># Prueba de ejecución
/usr/local/bin/mostrod -d /opt/mostro

# Establecer permisos
chown -R mostro:mostro /opt/mostro</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 El asistente interactivo de configuración</div>
        <p>Si ejecutas <code>mostrod</code> sin un <code>settings.toml</code> en el directorio indicado y estás en una terminal, te ofrece un menú de configuración que puede armarte el archivo y escribir el nsec en un <code>.env</code>. Sin terminal (Docker, systemd, CI) copia la plantilla, imprime dónde la dejó y termina para que la edites.</p>
      </div>

      <p>Crear el servicio systemd:</p>
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

      <p>🎉 <strong>¡Felicitaciones!</strong> Tu nodo Mostro está funcionando como servicio del sistema.</p>`,
    },
    'configuration': {
      title: `4. Configuración en Detalle`,
      nav: `4. Configuración`,
      navShort: `4. Configuración`,
      html: `      <p>El archivo <code>settings.toml</code> controla todo sobre tu nodo Mostro.</p>`,
    },
    'cfg-nostr': {
      title: `4.1 Claves Nostr — La identidad de tu nodo`,
      nav: `Claves Nostr`,
      html: `      <pre><code>[nostr]
nsec_privkey = 'TU_CLAVE_NSEC'
relays = [
  'wss://relay.mostro.network',
  'wss://nos.lol',
  'wss://relay.nostr.band'
]</code></pre>

      <p><strong>¿Qué relays usar?</strong></p>
      <ul>
        <li><code>wss://relay.mostro.network</code> — Relay propio de Mostro, recomendado</li>
        <li><code>wss://nos.lol</code> — Relay confiable y bien conectado</li>
        <li>Agrega 3–5 relays para fiabilidad. Más relays = mejor disponibilidad pero más ancho de banda.</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">💡 Consejo</div>
        <p>También puedes correr tu propio relay Nostr junto a Mostro. La vía Docker Build (Opción B) incluye uno en su <code>compose.yml</code>; la Opción A y la compilación nativa no.</p>
      </div>


      <h4>Mantener la clave fuera de settings.toml</h4>
      <p>Mostro también lee la clave desde la variable de entorno <code>MOSTRO_NSEC_PRIVKEY</code>. La precedencia es: variable de entorno, luego <code>&lt;directorio-de-config&gt;/.env</code>, luego <code>settings.toml</code>.</p>
      <pre><code># ~/mostro-config/.env  (chmod 600) — se carga automáticamente al arrancar
MOSTRO_NSEC_PRIVKEY=nsec1...

# Docker
docker run -e MOSTRO_NSEC_PRIVKEY=nsec1... ...

# Unidad systemd
Environment="MOSTRO_NSEC_PRIVKEY=nsec1..."</code></pre>
      <p>Dejar <code>nsec_privkey</code> en <code>settings.toml</code> sigue funcionando. Si usas el archivo <code>.env</code>, respáldalo con el mismo cuidado que la configuración.</p>`,
    },
    'fees': {
      title: `4.2 Comisiones — Cómo generas ingresos`,
      nav: `Comisiones`,
      html: `      <pre><code>[mostro]
fee = 0.006
dev_fee_percentage = 0.30</code></pre>

      <p><strong>Comisión de trading</strong> (<code>fee</code>): Porcentaje cobrado por operación, dividido entre comprador y vendedor.</p>
      <ul>
        <li><code>0.006</code> = 0.6% (cada parte paga 0.3%)</li>
        <li><code>0.01</code> = 1.0% (cada parte paga 0.5%)</li>
        <li><code>0</code> = gratis (bueno para hacer crecer tu base de usuarios)</li>
      </ul>

      <p><strong>Ejemplo:</strong> En una operación de 100,000 sats con <code>fee = 0.006</code>: El comprador paga 300 sats, el vendedor paga 300 sats, tu nodo gana 600 sats en total.</p>

      <p><strong>Comisión de desarrollo</strong> (<code>dev_fee_percentage</code>): Un porcentaje de <em>tus</em> ganancias por comisiones que va al desarrollo de Mostro.</p>
      <ul>
        <li><code>0.30</code> = 30% (por defecto) — de 600 sats, 180 van al fondo de desarrollo</li>
        <li>Mínimo: 10% (<code>0.10</code>), Máximo: 100% (<code>1.0</code>)</li>
        <li>Lo paga tu nodo de sus ganancias, no se cobra a los usuarios</li>
        <li>Se envía automáticamente a la dirección Lightning <code>dev@pay.mostro.foundation</code>; no hay nada que configurar</li>
        <li>Se paga solo cuando tu LND corre en <strong>mainnet</strong>. En testnet, signet o regtest los montos igual se calculan, pero no se paga nada y el log dice <code>dev fee payments are disabled</code></li>
        <li>Un pago fallido se reintenta por orden, con una separación de entre un minuto y una hora</li>
        <li>Todos los pagos son auditables públicamente a través de eventos Nostr (kind 8383)</li>
      </ul>

      <div class="callout important">
        <div class="callout-title">📝 Nota</div>
        <p>Establecer <code>dev_fee_percentage</code> por debajo de <code>0.10</code> impedirá que Mostro arranque. Este mínimo asegura financiamiento sostenible del desarrollo.</p>
      </div>`,
    },
    'limits': {
      title: `4.3 Límites de órdenes y monedas`,
      nav: `Límites`,
      html: `      <pre><code>[mostro]
max_order_amount = 1000000
min_payment_amount = 100
max_orders_per_response = 10
fiat_currencies_accepted = ['USD', 'EUR', 'ARS', 'CUP']</code></pre>

      <ul>
        <li><strong><code>max_order_amount</code>:</strong> Operación más grande en satoshis. Configúralo basándote en tu capacidad de canales Lightning.</li>
        <li><strong><code>min_payment_amount</code>:</strong> Operación mínima en satoshis. 1,000 o 10,000 es más práctico que 100. Ambos límites se comparan con los sats que la orden realmente mueve, incluida la prima o el descuento.</li>
        <li><strong><code>max_orders_per_response</code>:</strong> Cantidad máxima de órdenes que Mostro devuelve en una sola consulta. Si un usuario acumula más órdenes que este límite (por ejemplo al restaurar su sesión desde el cliente móvil), recibirá un error <code>cant-do: too_many_requests</code> y no podrá recuperar sus órdenes. Si tus usuarios operan frecuentemente, sube este valor (por ejemplo 50 o 100). El valor por defecto de 10 puede ser insuficiente.</li>
        <li><strong><code>fiat_currencies_accepted</code>:</strong> Usa <a href="https://en.wikipedia.org/wiki/ISO_4217" target="_blank" rel="noopener noreferrer">códigos ISO 4217</a>, en MAYÚSCULAS: la coincidencia es exacta. Array vacío <code>[]</code> acepta todas las monedas. Desde v0.20.2 la lista también puede incluir las stablecoins <code>USDT</code>, <code>USDC</code> y <code>DOC</code>, y bitcoin en otras redes (<code>BTC</code>, <code>LBTC</code>, <code>RBTC</code>) — mira 4.12.</li>
      </ul>`,
    },
    'profile': {
      title: `4.4 Perfil del nodo (Opcional pero recomendado)`,
      nav: `Perfil del nodo`,
      html: `      <pre><code>[mostro]
name = "LatAm Mostro"
about = "Exchange P2P de Bitcoin para Latinoamérica. Soporte en español."
picture = "https://ejemplo.com/tu-logo.png"
website = "https://sitio-de-tu-comunidad.com"</code></pre>

      <p>Estos configuran el perfil de tu Mostro en Nostr (NIP-01 kind 0 metadata). Los clientes muestran esta información para que los usuarios sepan en qué Mostro están operando.</p>`,
    },
    'timeouts': {
      title: `4.5 Tiempos y expiración`,
      nav: `Tiempos`,
      html: `      <pre><code>[mostro]
expiration_hours = 24        # Cuánto tiempo una orden sin tomar queda en el libro
max_expiration_days = 15     # La expiración más larga que un creador puede pedir
expiration_seconds = 900     # Cuánto puede esperar una orden tomada la hold invoice
                             # o la factura del comprador antes de volver al libro (15 min)

[lightning]
hold_invoice_expiration_window = 300  # Tiempo que tiene el tomador para pagar la factura o agregar una de cobro (5 min)
hold_invoice_cltv_delta = 144         # Vida del escrow, en bloques (~1 día)</code></pre>

      <p>Nota que <code>hold_invoice_expiration_window</code> pertenece a <code>[lightning]</code>: escrito bajo <code>[mostro]</code> se ignora en silencio. Debe ser mayor que 0, y también es la expiración de la factura de la fianza de un tomador.</p>

      <p>Una vez bloqueados los sats del vendedor, el comprador tiene aproximadamente <code>hold_invoice_cltv_delta - escrow_deadline_margin_blocks</code> bloques para enviar el pago: 144 − 24 = 120 bloques, unas 20 horas, con los valores por defecto. Cuando eso se agota, Mostro cancela la operación si el comprador nunca marcó el pago como enviado, o abre una disputa si lo hizo (mira 4.9). Los usuarios ven la cuenta regresiva en la app.</p>`,
    },
    'antispam': {
      title: `4.6 Anti-Spam`,
      nav: `Anti-Spam`,
      html: `      <pre><code>[mostro]
pow = 0  # 0 = deshabilitado; 10-20 = moderado. Empieza con 0.</code></pre>

      <p>Un filtro más fino es <code>pow_first_contact</code>. <code>pow</code> aplica a todos los mensajes, mientras que <code>pow_first_contact</code> aplica solo a remitentes que no forman parte de una operación activa y se verifica antes de descifrar. Así las operaciones en curso siguen siendo baratas y a los desconocidos les cuesta trabajo real:</p>
      <pre><code>[mostro]
pow = 0                  # operaciones en curso
pow_first_contact = 16   # órdenes y tomas nuevas de claves desconocidas</code></pre>
      <p>Los clientes deben minar al menos esa dificultad. Quienes usan mostro-cli tienen que poner <code>POW</code> (o <code>-p</code>) en tu valor; si no, sus órdenes nuevas y tomas se descartan sin respuesta.</p>

      <p>Un disuasivo más fuerte contra quienes toman órdenes y desaparecen es la fianza anti-abuso (mira 4.11).</p>`,
    },
    'rpc': {
      title: `4.7 Interfaz RPC de Administración (Opcional)`,
      nav: `RPC Admin`,
      html: `      <pre><code>[rpc]
enabled = false
listen_address = "127.0.0.1"
port = 50051
# auth_token = "una-cadena-larga-y-aleatoria"</code></pre>

      <p>Esta interfaz gRPC es para herramientas del operador: <code>grpcurl</code>, y <code>mostro-cli</code> para el modo mantenimiento (<code>admsetmaintenance</code>, <code>admmaintenancestatus</code>, <code>admcancelpending</code>). Mostrix <strong>no</strong> la usa: trabaja sobre Nostr, así que no necesitas RPC para resolver disputas.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Seguridad</div>
        <p>Mantén <code>listen_address</code> en <code>"127.0.0.1"</code> y nunca expongas el puerto a internet. Configura <code>auth_token</code> siempre que el puerto sea alcanzable por algo distinto de la máquina local, como un túnel SSH o un contenedor sidecar: una conexión reenviada llega como loopback, así que la dirección de escucha por sí sola no es autorización. Con un token configurado, cada llamada que modifica estado debe llevar el header <code>authorization: Bearer &lt;token&gt;</code>.</p>
      </div>

      <p>Además del modo mantenimiento, el RPC incluye las llamadas de reputación <code>RevokeReputationImports</code> y <code>RebindReputationExport</code> (mira 4.13). Ambas se aceptan solo desde loopback, y mostro-cli todavía no tiene comandos para ellas: usa <code>grpcurl</code>. mostro-cli envía <code>MOSTRO_RPC_TOKEN</code> solo a una dirección loopback o por <code>https://</code>, nunca en texto claro a un host remoto.</p>`,
    },
    'transport': {
      title: `4.8 Protocolo de Transporte`,
      nav: `Transporte`,
      html: `      <p>Desde v0.19.0 un nodo Mostro habla <strong>solo</strong> el protocolo v2: eventos kind 14 firmados con contenido cifrado NIP-44. El protocolo v1 (gift wraps NIP-59, kind 1059) se eliminó y ya no hay nada que elegir. Deja fuera la línea <code>transport</code> de <code>settings.toml</code>; la plantilla ya no la trae.</p>

      <table class="guide-table">
        <thead><tr><th>Línea en settings.toml</th><th>Resultado</th></tr></thead>
        <tbody>
          <tr><td>ninguna</td><td>Protocolo v2. Recomendado.</td></tr>
          <tr><td><code>transport = "nip44"</code></td><td>Protocolo v2. Se acepta y es inofensiva.</td></tr>
          <tr><td><code>transport = "gift-wrap"</code></td><td><strong>Mostro se niega a arrancar</strong>, con un error que te dice que borres la línea.</td></tr>
        </tbody>
      </table>

      <p>Tu nodo anuncia <code>protocol_version</code> 2 en su evento de info kind 38385. Todos los clientes actuales hablan v2: la Mostro App, Mostrix 0.3.1 o posterior, mostro-cli 0.16.2 o posterior y Bosstro. Un cliente que solo habla v1, como una versión vieja de Mostro Mobile, no recibe respuesta de tu nodo: pide a tus usuarios que actualicen.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Si actualizas desde v0.18.x</div>
        <p>Si tu <code>settings.toml</code> todavía dice <code>transport = "gift-wrap"</code>, borra esa línea antes de actualizar. La única forma de seguir atendiendo clientes de protocolo v1 es quedarte en mostrod 0.18.x, que ya no recibe correcciones.</p>
      </div>`,
    },
    'ln-safety': {
      title: `4.9 Límites de Seguridad Lightning`,
      nav: `Límites Lightning`,
      html: `      <p>Estos ajustes de <code>[lightning]</code> limitan cuánto tiempo pueden quedar bloqueados tus canales y cuántos pagos pueden estar sin resolver a la vez. Todos tienen valor por defecto, así que un archivo de configuración de una versión anterior normalmente sigue arrancando, pero una plantilla nueva los incluye y vale la pena conocerlos.</p>

      <pre><code>[lightning]
max_final_cltv_expiry_delta = 144
escrow_deadline_margin_blocks = 24
max_inflight_payouts = 100
max_inflight_payouts_per_destination = 10
payment_cltv_limit = 1008
allow_node_change = false</code></pre>

      <table class="guide-table">
        <thead><tr><th>Ajuste</th><th>Qué protege</th></tr></thead>
        <tbody>
          <tr><td><code>max_final_cltv_expiry_delta</code></td><td>Rechaza una factura de cobro cuyo CLTV final permitiría al beneficiario retener tus sats demasiado tiempo. 144 bloques (alrededor de un día) es el máximo que piden las wallets reales. Nunca lo pongas en 0: eso rechaza todas las facturas.</td></tr>
          <tr><td><code>escrow_deadline_margin_blocks</code></td><td>Margen de seguridad antes de que LND cancele automáticamente un hold invoice aceptado. Cuando la cadena se acerca a este punto, Mostro cancela la operación o abre una disputa mientras el escrow todavía existe. Desde v0.20.0 Mostro <strong>se niega a arrancar</strong> a menos que sea al menos 18 (el <code>invoices.holdexpirydelta</code> por defecto de LND, 12, más 6 bloques de holgura) y esté por debajo de <code>hold_invoice_cltv_delta</code>. Si subiste <code>holdexpirydelta</code>, mantén tú este margen al menos 6 bloques por encima. El valor se publica en tu evento de info.</td></tr>
          <tr><td><code>max_inflight_payouts</code></td><td>Tope de pagos sin resolver en todo el nodo, para que un beneficiario que nunca liquida no agote tus slots de HTLC. Un pago frenado se retrasa, nunca se descarta.</td></tr>
          <tr><td><code>max_inflight_payouts_per_destination</code></td><td>El mismo tope por pubkey de destino, y el más eficaz de los dos.</td></tr>
          <tr><td><code>payment_cltv_limit</code></td><td>Tope del timelock total de una ruta de pago. No debe superar el <code>--max-cltv-expiry</code> de tu LND y debe estar al menos 576 bloques por encima de <code>max_final_cltv_expiry_delta</code>, o los pagos legítimos fallan con "no route".</td></tr>
          <tr><td><code>allow_node_change</code></td><td>Guardia de arranque ante un cambio de nodo Lightning. Déjalo en <code>false</code> y mira 5.8.</td></tr>
        </tbody>
      </table>

      <p>Nota también que <code>max_routing_fee</code>, en el bloque <code>[mostro]</code>, ahora es <code>0.002</code> (0.2%) por defecto.</p>`,
    },
    'price': {
      title: `4.10 Fuentes de Precio de Bitcoin`,
      nav: `Fuentes de precio`,
      html: `      <p>Mostro necesita una tasa BTC/fiat para cotizar las órdenes. Sin un bloque <code>[price]</code> usa una sola fuente, Yadio, a través del ya deprecado <code>bitcoin_price_api_url</code>. Agregar el bloque te da varias fuentes, combinadas por mediana y con descarte de valores atípicos, así que una API caída o que devuelve un número malo no mueve tus precios.</p>

      <pre><code>[price]
update_interval_seconds = 300
max_price_staleness_seconds = 1800
outlier_threshold_pct = 5.0        # descarta una fuente así de lejos de la mediana (requiere 3+ fuentes)
provider_timeout_seconds = 10
provider_failure_threshold = 3     # fallos antes de dejar una fuente en enfriamiento
provider_failure_cooldown_seconds = 120
publish_to_nostr = true            # publica las tasas agregadas como kind 30078

[price.providers.yadio]
enabled = true
url = "https://api.yadio.io"

[price.providers.coingecko]
enabled = true
url = "https://api.coingecko.com/api/v3"
# api_key = "CG-xxxx"              # opcional, sube los límites de tasa

[price.providers.currency_api]
enabled = true
url = "https://currency-api.pages.dev/v1"
fallback_urls = ["https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1"]
except = ["CUP", "MLC"]            # solo tasa oficial, no mezclar con fuentes informales

[price.providers.blockchain]
enabled = true
url = "https://blockchain.info"</code></pre>

      <p>Cada fuente acepta <code>only</code> o <code>except</code> para limitar a qué monedas contribuye, y <code>fallback_urls</code> para espejos que se prueban cuando la URL principal falla. Una fuente habilitada a la que le falta un secreto requerido falla al arrancar en lugar de producir silenciosamente ninguna cotización.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Si las APIs de precio están bloqueadas en tu país</div>
        <p>Puedes tomar las tasas desde Nostr en lugar de HTTP, publicadas por nodos Mostro en los que confíes. Reutiliza los relays que ya tienes en <code>[nostr]</code>, así que funciona en cualquier lugar donde tu nodo ya alcance un relay. Con varios nodos de confianza gana el evento válido más reciente.</p>
        <pre><code>[price.providers.nostr]
enabled = true
trusted_nodes = [
    # pubkeys hex de nodos Mostro en los que confías para publicar tasas exactas
]</code></pre>
      </div>

      <p>Los operadores que atienden pesos cubanos pueden agregar El Toque para CUP y MLC del mercado informal. Es opt-in, limitado a esas dos monedas, y necesita un token gratuito: un El Toque habilitado sin <code>token</code> se niega a arrancar.</p>

      <p>Mantén <code>publish_to_nostr = true</code>. Además de alimentar a otros nodos, las tasas publicadas le dicen a la Mostro App qué monedas puede cotizar tu nodo a precio de mercado: un código que falte en ellas se ofrece solo a precio fijo. Para cotizar stablecoins y bitcoin en otras redes, mira 4.12.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Agregar cualquier bloque [price] cambia el motor de precios</div>
        <p>En cuanto <code>settings.toml</code> tiene una tabla <code>[price]</code> o <code>[price.providers.*]</code>, Mostro usa el motor multifuente e ignora <code>bitcoin_price_api_url</code>. Asegúrate de que al menos una fuente de mercado (Yadio, CoinGecko, Currency API, Blockchain.com…) esté habilitada, o tu nodo no tendrá tasa fiat y rechazará toda orden a precio de mercado. Revisa en el log de arranque las advertencias que empiezan con <code>price:</code>.</p>
      </div>`,
    },
    'optional-blocks': {
      title: `4.11 Otros Bloques Opcionales`,
      nav: `Bloques opcionales`,
      html: `      <p>Más bloques que puedes encontrar en una plantilla nueva. Ninguno es obligatorio. Tres de ellos tienen su propia sección: <code>[price.providers.pegged]</code> (4.12), <code>[reputation_import]</code> / <code>[reputation_export]</code> (4.13) y <code>[health]</code> (5.4). <code>serbero_pubkey</code>, en <code>[mostro]</code>, se cubre en 5.10.</p>

      <p><strong>Retención de eventos.</strong> Cuánto tiempo conserva Mostro cada tipo de evento antes de que expire. Omite el bloque por completo para aceptar los valores por defecto.</p>
      <pre><code>[expiration]
order_days = 30        # eventos de órdenes (kind 38383)
rating_days = 90       # historial de reputación (kind 38384)
dispute_days = 90      # disputas, se guardan más tiempo para auditoría (kind 38386)
fee_audit_days = 365   # transparencia de comisiones (kind 8383)
dm_days = 30           # mensajes directos de protocolo v2 (kind 14)</code></pre>

      <h4>Fianzas anti-abuso</h4>
      <p><code>[anti_abuse_bond]</code> pide a los tomadores, a los creadores o a ambos que bloqueen una pequeña hold invoice Lightning junto a la operación. Los usuarios honestos la recuperan intacta; un solver puede castigar (slash) la fianza de quien actuó de mala fe, y una parte va a la contraparte honesta. Los usuarios la ven como un "depósito" en la app, y la documentación para usuarios la explica en su capítulo <em>Anti-Abuse Bond</em>. Todas las fases ya se publicaron; está deshabilitada por defecto.</p>
      <pre><code>[anti_abuse_bond]
enabled = true
amount_pct = 0.01                 # fianza = max(1% de la orden, base_amount_sats)
base_amount_sats = 1000
apply_to = "take"                 # "take" | "make" | "both"
slash_on_waiting_timeout = false  # castiga también a quien deja vencer su paso
slash_node_share_pct = 0.5        # parte de una fianza castigada que se queda el nodo
payout_claim_window_days = 15     # tiempo que tiene el ganador para reclamar su parte
maker_bond_payment_timeout_seconds = 900
# bond_cltv_delta = 432           # mira abajo</code></pre>
      <ul>
        <li>Un creador que todavía no pagó la fianza puede cancelar la orden, y una orden sin pagar expira después de <code>maker_bond_payment_timeout_seconds</code>.</li>
        <li>La fianza de un creador queda bloqueada mientras la orden reposa en el libro, así que una orden reposa ahí como máximo <code>bond_cltv_delta - hold_invoice_cltv_delta - 144</code> bloques (unas 24 h con los valores por defecto), diga lo que diga <code>expiration_hours</code>.</li>
        <li><code>bond_cltv_delta</code> debe ser mayor que <code>hold_invoice_cltv_delta + 144</code> y como máximo 864. En v0.20.2 su valor por defecto es un 432 fijo, así que si subiste <code>hold_invoice_cltv_delta</code> a 288 o más, configúralo explícitamente o Mostro se niega a arrancar.</li>
        <li>Los solvers castigan con la opción de fianza al liquidar o cancelar (Mostrix, Bosstro, o <code>mostro-cli admsettle/admcancel --slashseller/--slashbuyer</code>).</li>
      </ul>
      <p>Lee el <code>docs/ANTI_ABUSE_BOND.md</code> del proyecto antes de habilitarlo en un nodo en producción, y anúncialo antes a tus usuarios.</p>

      <h4>Historial del pagador (experimental)</h4>
      <p><code>[payer_history]</code> combate la estafa de triangulación, en la que un comprador paga desde la cuenta bancaria de un tercero. El comprador se compromete con un hash de la cuenta desde la que pagará (<code>declare-payer</code>), el vendedor puede compararlo con el remitente que figura en su estado de cuenta, y Mostro guarda solo un HMAC. A partir de v0.20.2 solo la declaración está conectada: el requisito <code>require_declaration</code> y el historial que se muestra a los vendedores todavía no están implementados, y ningún cliente publicado envía <code>declare-payer</code>. Déjalo apagado por ahora.</p>
      <pre><code># [payer_history]
# enabled = false
# require_declaration = false</code></pre>

      <h4>Escrow con Cashu</h4>
      <p><code>[cashu]</code> es un modo experimental que funciona sin LND y mantiene el escrow de las operaciones en tokens Cashu. Todavía no sirve para operar de verdad — las acciones de la operación posteriores a la toma siguen siendo rechazadas — y no se puede combinar con las fianzas anti-abuso. Desde v0.19.3 el creador elige la mint por orden a partir de una lista permitida:</p>
      <pre><code># [cashu]
# enabled = false
# mint_urls = ["https://mint.example.com"]   # [] vacío = cualquier mint con host público
# escrow_locktime_days = 15</code></pre>
      <p>La antigua clave única <code>mint_url</code> se rechaza: una config que todavía la tenga no carga.</p>`,
    },
    'pegged': {
      title: `4.12 Stablecoins y Bitcoin en Otras Redes`,
      nav: `Stablecoins y otros BTC`,
      html: `      <p>Desde v0.20.2 un nodo puede ofrecer operaciones contra seis códigos que no son monedas fiat: stablecoins en dólares, y bitcoin en otras redes. Los sats Lightning siempre son uno de los lados de la operación; el otro lado se paga on-chain, en Liquid, en Rootstock o en la red de la stablecoin, directamente entre los dos usuarios.</p>

      <table class="guide-table">
        <thead><tr><th>Código</th><th>Qué es</th><th>Se cotiza como</th><th>Monto de la orden en</th></tr></thead>
        <tbody>
          <tr><td><code>USDT</code></td><td>Tether USD</td><td>1 USD</td><td>monedas enteras</td></tr>
          <tr><td><code>USDC</code></td><td>USD Coin</td><td>1 USD</td><td>monedas enteras</td></tr>
          <tr><td><code>DOC</code></td><td>Dollar on Chain (Rootstock)</td><td>1 USD</td><td>monedas enteras</td></tr>
          <tr><td><code>BTC</code></td><td>Bitcoin on-chain</td><td>1 sat = 1 sat</td><td>sats</td></tr>
          <tr><td><code>LBTC</code></td><td>L-BTC en Liquid</td><td>1 sat = 1 sat</td><td>sats</td></tr>
          <tr><td><code>RBTC</code></td><td>RBTC en Rootstock</td><td>1 sat = 1 sat</td><td>sats</td></tr>
        </tbody>
      </table>

      <ul>
        <li><strong>Las stablecoins</strong> están ancladas 1:1 al dólar, así que una orden USDT a precio de mercado se cotiza exactamente como una orden USD, prima incluida. La tasa USD viene de tus fuentes de precio normales (4.10); no se llama a ninguna API adicional.</li>
        <li><strong>BTC, LBTC y RBTC</strong> se cotizan 1:1 en sats, así que no necesitan ninguna API de precios. Una orden por 100,000 significa 100,000 sats del activo (0.001 RBTC). A precio de mercado la prima es el precio del intercambio: una orden de venta (el creador vende sats Lightning) por 100,000 sats de RBTC con una prima de 1% bloquea 99,000 sats Lightning, y el vendedor recibe 100,000 sats de RBTC.</li>
        <li>No se admite ningún otro código: DAI, EURC y el resto se rechazan al arrancar si los listas en <code>only</code>.</li>
      </ul>

      <h4>Cómo habilitarlo</h4>
      <p>Necesitas mostrod v0.20.2 o posterior. Dos ajustes trabajan juntos: <code>fiat_currencies_accepted</code> dice qué códigos pueden usar las órdenes, y el proveedor <code>pegged</code> dice cuáles de ellos tienen precio de mercado.</p>
      <pre><code>[mostro]
# Conserva tus monedas fiat y agrega los códigos nuevos, en MAYÚSCULAS
fiat_currencies_accepted = ['USD', 'EUR', 'USDT', 'USDC', 'DOC', 'LBTC', 'RBTC']

# Una fuente de precio de mercado para fiat (y por tanto para las stablecoins).
# Obligatoria en v0.20.2 en cuanto agregas cualquier tabla [price.providers.*].
[price.providers.yadio]
enabled = true
url = "https://api.yadio.io"

[price.providers.pegged]
enabled = true
only = ["USDT", "USDC", "DOC", "LBTC", "RBTC"]   # o except = ["BTC"]; sin ninguno, los seis</code></pre>
      <p>Reinicia Mostro y revisa el log. Si ves <code>price: the pegged provider quotes ... but fiat_currencies_accepted does not list them</code>, agrega los códigos que faltan: un código cotizado que no está aceptado publica una tasa pero rechaza todas las órdenes. Un <code>fiat_currencies_accepted = []</code> vacío acepta todos los códigos.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ No agregues solo el bloque pegged en v0.20.2</div>
        <p>Cualquier tabla <code>[price.providers.*]</code> cambia el nodo al motor de precios multifuente y descarta el <code>bitcoin_price_api_url</code> heredado. En v0.20.2 una tabla <code>pegged</code> sin una fuente de mercado a su lado deja al nodo sin tasas fiat: todas las órdenes de mercado en USD, EUR y USDT se rechazan. Habilita siempre al menos una fuente de mercado, como en el ejemplo de arriba. (La próxima versión conserva automáticamente la fuente Yadio heredada en ese caso.) En v0.20.1 o anterior, no agregues el bloque en absoluto: el proveedor no existe allí.</p>
      </div>

      <p><strong>Solo precio fijo.</strong> Para aceptar un código sin cotizarlo a mercado, lístalo en <code>fiat_currencies_accepted</code> y déjalo fuera de <code>only</code>. Los usuarios tienen entonces que fijar un monto de sats. Es una elección sensata para <code>BTC</code> on-chain, donde las comisiones de red hacen incómodas las órdenes pequeñas a precio de mercado.</p>

      <h4>Lo que ven tus usuarios</h4>
      <p>La Mostro App 2.1.2 y posteriores muestra estos códigos en el selector de moneda bajo <em>Stablecoins</em> y <em>Bitcoin en otras redes</em>, pero solo los que acepta tu nodo. Los montos de BTC, LBTC y RBTC se ingresan en sats. El método de pago nombra la red (<code>USDT (Tron)</code>, <code>USDC (Base)</code>, <code>DOC (Rootstock)</code>, <code>LBTC (Liquid)</code>…), el vendedor comparte una dirección de recepción en el chat de la operación, y el comprador pega ahí el ID de la transacción después de pagar. Mostro nunca verifica la red ni la dirección. Por ahora mostro-cli y Mostrix solo pueden crear órdenes de precio fijo en estos códigos.</p>

      <h4>Las disputas necesitan otra evidencia</h4>
      <p>Informa a tus solvers antes de habilitar esto. No hay estado de cuenta bancario: la evidencia es el ID de transacción pegado en el chat, que el solver verifica en un explorador de bloques de esa red. En Liquid el comprador debe compartir el enlace <em>sin cegar</em> (unblinded), porque Liquid oculta los montos. Las transferencias son irreversibles, un pago en la red equivocada puede perderse, y el comprador paga la comisión de red: el vendedor debe recibir el monto completo. El vendedor debe liberar solo después de que la transferencia se confirme. El plazo es el mismo que para fiat (unos 120 bloques con los valores por defecto, mira 4.5), así que una transferencia on-chain con comisión baja puede no llegar a tiempo.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Si una stablecoin pierde su paridad</div>
        <p>Todavía no hay una protección automática contra la pérdida de paridad (depeg). Si USDT o USDC se aleja de un dólar, quítala de <code>only</code>, o agrégala a <code>except</code> si no usas <code>only</code> (déjala en <code>fiat_currencies_accepted</code> si aún quieres órdenes de precio fijo) y reinicia.</p>
      </div>`,
    },
    'reputation': {
      title: `4.13 Importación y Exportación de Reputación`,
      nav: `Importar reputación`,
      html: `      <p>Los usuarios pueden traer a tu nodo la reputación que ganaron en otro lugar — en el bot de Telegram <strong>@lnp2pBot</strong> o en otro nodo Mostro —, para que un trader que se muda no empiece de cero. Viajan tres cifras: la cantidad de calificaciones recibidas, la calificación promedio y la fecha de la primera operación. Llegan como una <em>attestation</em> (atestación): un pequeño evento Nostr (kind 38388) firmado por la fuente, dirigido a la identidad del usuario y válido por 7 días. Tu nodo las suma a la reputación propia del usuario, y las contrapartes ven una sola cifra combinada.</p>
      <p>Ambas direcciones son opt-in y están desactivadas por defecto. La importación necesita mostrod v0.20.0 o posterior; la exportación, v0.20.1 o posterior. Los usuarios necesitan la Mostro App en <strong>modo reputación</strong>: en modo de privacidad total no hay una identidad que lleve una reputación.</p>

      <h4>Importar desde lnp2pBot</h4>
      <p>lnp2pBot firma las atestaciones con una clave dedicada. Agrégala a tu lista de confianza:</p>
      <pre><code>[reputation_import]
enabled = true
max_lifetime_seconds = 604800   # la atestación más duradera que aceptas (7 días; máximo 30)

[[reputation_import.issuers]]
name = "lnp2pbot"               # nunca renombres una entrada que ya tenga importaciones
keys = ["000004ac730537f1cf7d91f4f584a498a530a0205d35e816ebbaf23aec61e459"]
# npub1qqqqftrnq5mlrnmaj860tp9ynzjnpgpqt567s9hthter4mrpu3vsrta3em</code></pre>
      <p>Reinicia Mostro. Tu evento de info (kind 38385) ahora lleva una etiqueta <code>reputation_import_issuers</code>, que es como la app sabe que puede ofrecer la importación en tu nodo. Varios nodos de la comunidad ya confían en esta clave.</p>
      <p>El bot exporta una cuenta con al menos 10 operaciones completadas y 5 calificaciones recibidas que no esté baneada. El usuario empieza desde la app (<em>Configuración → Red → Reputación → Importar reputación → Obtenerla de lnp2pBot</em>), confirma en Telegram que el npub coincide y pega de vuelta el mensaje que le envía el bot.</p>

      <h4>Confiar en otro nodo Mostro</h4>
      <p>Un nodo que exporta anuncia su clave de firma en la etiqueta <code>reputation_issuer</code> de su evento de info. Léela con el comando de 5.4 (busca esa etiqueta), confírmala con el operador y agrega una entrada para ella:</p>
      <pre><code>[[reputation_import.issuers]]
name = "mostro-example"         # un nombre local estable que tú elijas
keys = ["&lt;that node's reputation_issuer key, npub or hex&gt;"]</code></pre>
      <ul>
        <li>El <code>name</code> es lo que se usa para deduplicar las importaciones. Nunca renombres una entrada que ya tenga importaciones: Mostro se niega a arrancar si una clave pasa a otro nombre.</li>
        <li>Una clave puede pertenecer a una sola entrada. Para seguir una rotación de claves, agrega la clave nueva a la misma entrada y quita la vieja cuando sus atestaciones hayan expirado.</li>
        <li>Confía solo en fuentes en las que confíes: un registro importado grande pesa más que las calificaciones locales.</li>
      </ul>
      <p>Un usuario puede importar una vez desde cada fuente en cada nodo, y el usuario no puede deshacer la importación. Las cifras son una instantánea: las calificaciones posteriores en la fuente no se reflejan.</p>

      <h4>Exportar desde tu nodo</h4>
      <p>La exportación permite que tus usuarios lleven a otro nodo la reputación que ganaron <em>en el tuyo</em>. Solo viajan las calificaciones recibidas en tu nodo, nunca las importadas. El usuario necesita 10 operaciones completadas y 5 calificaciones recibidas en tu nodo, y no debe estar baneado.</p>
      <p>Las atestaciones se firman con una clave dedicada, nunca con la clave de tu nodo. Genera una y guárdala junto al nsec, en el entorno o en <code>&lt;config-dir&gt;/.env</code>:</p>
      <pre><code># Estructura de Docker Hub; usa tu propio directorio de configuración en otro caso
echo "MOSTRO_REPUTATION_ISSUER_SK=$(openssl rand -hex 32)" >> ~/mostro-config/.env
sudo chown 1000:1000 ~/mostro-config/.env
chmod 600 ~/mostro-config/.env</code></pre>
      <pre><code>[reputation_export]
enabled = true
issuer_key_env = "MOSTRO_REPUTATION_ISSUER_SK"
lifetime_seconds = 604800       # de 1 a 604800 (7 días)</code></pre>
      <p>Mostro se niega a arrancar si la variable falta o no es válida, si contiene la clave propia de tu nodo, o si su clave pública también está en tu lista de <code>[reputation_import]</code>. Una vez que funciona, tu evento de info lleva la etiqueta <code>reputation_issuer</code>: comparte esa clave con los operadores que quieran confiar en tu nodo. Respalda la clave junto con tus otros secretos. Si se filtra, cualquiera puede emitir atestaciones a nombre de tu nodo hasta que los demás operadores la quiten y revoquen las importaciones.</p>

      <h4>Revocar importaciones y reasignar exportaciones</h4>
      <p>Dos llamadas RPC de administración (4.7) cubren los casos raros. Se aceptan solo desde loopback; agrega <code>-H 'authorization: Bearer &lt;token&gt;'</code> si configuraste <code>auth_token</code>. Ejecútalas desde un checkout del repositorio <code>mostro</code>, que contiene <code>proto/admin.proto</code>.</p>
      <p><strong>Se filtró la clave de un emisor de confianza.</strong> Primero quita la clave de su entrada y reinicia; luego revierte todas las importaciones firmadas con ella (agrega <code>"imported_after": &lt;unix time&gt;</code> para limitarlo a las recientes):</p>
      <pre><code>grpcurl -plaintext -import-path proto -proto admin.proto \\
  -d '{"issuer_key": "&lt;npub or hex&gt;", "reason": "key leaked"}' \\
  127.0.0.1:50051 mostro.admin.v1.AdminService/RevokeReputationImports</code></pre>
      <p>Cada importación se revierte exactamente, se conservan las calificaciones recibidas desde entonces, y los usuarios pueden volver a importar con una atestación de la clave nueva.</p>
      <p><strong>Un usuario perdió la identidad a la que está atada su exportación.</strong> La primera exportación ata la cuenta a una identidad; moverla normalmente requiere una autorización firmada con la identidad anterior, que la app produce. Si la identidad anterior ya no existe, puedes moverla tú mismo después de verificar a la persona:</p>
      <pre><code>grpcurl -plaintext -import-path proto -proto admin.proto \\
  -d '{"identity": "&lt;old npub&gt;", "new_identity": "&lt;new npub&gt;", "reason": "support ticket"}' \\
  127.0.0.1:50051 mostro.admin.v1.AdminService/RebindReputationExport</code></pre>
      <p>Un usuario que restaura las mismas 12 palabras conserva la misma identidad y no necesita nada de esto.</p>`,
    },
    'operating': {
      title: `5. Operando Tu Nodo Mostro`,
      nav: `5. Operación del nodo`,
      navShort: `5. Operación`,
      html: ``,
    },
    'disputes': {
      title: `5.1 Cómo funcionan las disputas`,
      nav: `Disputas`,
      html: `      <p>Las disputas son tu responsabilidad operativa más importante.</p>

      <p><strong>¿Cuándo ocurren las disputas?</strong></p>
      <ul>
        <li>El comprador dice que pagó, el vendedor dice que no recibió</li>
        <li>El vendedor se rehúsa a liberar los Bitcoin después de recibir el pago</li>
        <li>Una de las partes deja de responder</li>
      </ul>

      <p><strong>El proceso de disputa:</strong></p>
      <ol>
        <li><strong>El usuario abre una disputa</strong> — Una de las partes hace clic en "Disputa" en el cliente</li>
        <li><strong>Mostro marca la orden</strong> — El estado cambia a "Disputa", los fondos permanecen bloqueados</li>
        <li><strong>El árbitro toma el caso</strong> — Un admin asignado a tu nodo investiga</li>
        <li><strong>Investigación</strong> — Se comunica con ambas partes, solicita pruebas</li>
        <li><strong>Resolución</strong> — El árbitro decide: liberar al comprador, o devolver al vendedor. Con las fianzas anti-abuso habilitadas (4.11), el árbitro también puede castigar la fianza de quien actuó de mala fe.</li>
      </ol>

      <p>El árbitro escribe a cada parte en un chat privado de la disputa, que la Mostro App muestra en <em>Chat → Disputas</em>. Cualquiera de las partes también puede compartir con el árbitro la clave del chat de su operación, y entonces el árbitro lee esa conversación en la pestaña Observer de Mostrix o en Bosstro. Las partes todavía pueden terminar la operación por su cuenta: si el vendedor libera, o ambos acuerdan una cancelación cooperativa, Mostro cierra la disputa por sí mismo y se lo avisa al árbitro.</p>

      <p>Si ejecutas <strong>Serbero</strong> (5.10), este alerta a tus árbitros en cuanto se abre una disputa y puede dar los primeros pasos con las partes. Nunca decide ni mueve fondos.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante</div>
        <p>Elige a tus árbitros con cuidado. Tienen el poder de decidir a dónde van los fondos bloqueados. Elige miembros de confianza e imparciales de la comunidad. Se recomiendan 2-3 árbitros.</p>
      </div>


      <h4>Niveles de permiso de los solvers</h4>

      <p>Un solver se puede registrar como solo lectura o con poderes completos. Los dos niveles pueden tomar una disputa y hablar con las partes, pero solo un solver read-write puede decidir a dónde va el dinero.</p>

      <table class="guide-table">
        <thead><tr><th>Registrado como</th><th>Puede</th><th>No puede</th></tr></thead>
        <tbody>
          <tr><td><code>npub1...:read</code></td><td>Tomar una disputa, leerla, escribir a ambas partes</td><td>Liquidar o cancelar la orden</td></tr>
          <tr><td><code>npub1...:read-write</code></td><td>Todo, incluido liquidar y cancelar</td><td>—</td></tr>
        </tbody>
      </table>

      <p>Un <code>npub1...</code> pelado sin sufijo queda como read-write por defecto, y lo mismo pasa al registrar por la interfaz RPC. Empieza a un árbitro nuevo en <code>:read</code> mientras aprende el proceso, y vuelve a registrarlo como read-write cuando confíes en su criterio. Un solver read-write puede tomar una disputa que tenga retenida uno de solo lectura (o Serbero).</p>

      <p>Tus árbitros pueden trabajar desde una terminal con Mostrix (5.2) o desde un teléfono Android con Bosstro (5.11).</p>`,
    },
    'mostrix': {
      title: `5.2 Mostrix — Tu herramienta de administración`,
      nav: `Mostrix`,
      html: `      <p>Mostrix es un cliente Mostro de terminal (TUI) con dos modos: un modo <strong>usuario</strong> para operar, y un modo <strong>admin</strong> para resolver disputas — tomar disputas, chatear con ambas partes, liquidar o cancelar, castigar fianzas y agregar solvers. Si ejecutas un nodo Mostro, necesitas Mostrix. Habla con tu nodo solo por Nostr, nunca por la interfaz RPC.</p>

      <h4>Opción A: Descargar binario pre-compilado (Recomendado)</h4>
      <p>Descarga la última versión para tu plataforma desde <a href="https://github.com/MostroP2P/mostrix/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a>:</p>

      <pre><code># Linux (x86_64)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-unknown-linux-musl

# Linux (ARM64 / Raspberry Pi 4 y 5, SO de 64 bits)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-unknown-linux-musl

# Linux (ARMv7 / Raspberry Pi OS de 32 bits)
wget https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-armv7-unknown-linux-gnueabi

# macOS (Apple Silicon / Intel)
curl -LO https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-aarch64-apple-darwin
curl -LO https://github.com/MostroP2P/mostrix/releases/latest/download/mostrix-x86_64-apple-darwin

# FreeBSD: mostrix-x86_64-unknown-freebsd
# Windows: descarga mostrix-x86_64-pc-windows-msvc.exe desde la página de releases</code></pre>

      <p>Verifica la descarga antes de ejecutarla, como se explica justo abajo.</p>

      <div class="callout tip">
        <div class="callout-title">🔐 Verifica la Release</div>
        <p>Verifica siempre el binario antes de ejecutarlo. Importa las claves de los mantenedores una sola vez:</p>
        <pre><code>curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/negrunch.asc | gpg --import
curl https://raw.githubusercontent.com/MostroP2P/mostrix/main/keys/arkanoider.asc | gpg --import</code></pre>
        <p>Las firmas son archivos separados llamados <code>manifest.txt.sig.&lt;mantenedor&gt;</code>. Las releases recientes traen solo <code>manifest.txt.sig.arkanoider</code> (clave <code>2E98 6CA1 C5E7 EA16 35CD 059C 4989 CC74 15A4 3AEC</code>), así que revisa la página de la release y descarga las que realmente estén listadas:</p>
        <pre><code>wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt
wget https://github.com/MostroP2P/mostrix/releases/latest/download/manifest.txt.sig.arkanoider

# Verifica cada firma que descargaste
gpg --verify manifest.txt.sig.arkanoider manifest.txt

# Luego compara el hash del binario con el manifest
# (las líneas del manifest llevan un prefijo artifact-&lt;target&gt;/, que aquí se quita)
sed 's#  artifact-[^/]*/#  #' manifest.txt | sha256sum -c --ignore-missing</code></pre>
        <p>Una firma válida de una clave de mantenedor en la que confíes es suficiente. Si un <code>wget</code> devuelve 404, esa firma simplemente no se publicó para esa release: no tomes un archivo ausente como uno verificado.</p>
      </div>

      <p>Solo cuando una firma y el hash cuadren, dale permiso de ejecución al binario y arráncalo:</p>
      <pre><code>chmod +x mostrix-x86_64-unknown-linux-musl
./mostrix-x86_64-unknown-linux-musl</code></pre>

      <h4>Opción B: Compilar desde el código fuente</h4>
      <p>Si prefieres compilar desde el código fuente o necesitas una plataforma que no está en las releases:</p>

      <pre><code># Instalar dependencias (Ubuntu/Debian)
sudo apt install -y cmake build-essential pkg-config

# Instalar Rust (si no está instalado; Mostrix necesita 1.97 o posterior)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Clonar y compilar
git clone https://github.com/MostroP2P/mostrix.git
cd mostrix
cargo build --release

# Ejecutar
./target/release/mostrix</code></pre>

      <h4>Primera ejecución y configuración</h4>
      <p>En la primera ejecución Mostrix crea <code>~/.mostrix/</code> con una base de datos que guarda una semilla nueva de 12 palabras y un <code>settings.toml</code>, y luego muestra una ventana <strong>Backup New Keys</strong> con las 12 palabras. Anótalas. Un <code>settings.toml</code> colocado junto al binario tiene prioridad (modo portable).</p>

      <div class="callout important">
        <div class="callout-title">⚠️ Importante: Apunta Mostrix a tu nodo</div>
        <p>La configuración generada apunta al nodo público por defecto de Mostro. Cámbiala a <strong>tu propio nodo</strong>: <strong>Settings → Select Mostro Instance</strong>, y pega el npub o hex de tu nodo, o edita <code>mostro_pubkey</code> en <code>~/.mostrix/settings.toml</code> y reinicia.</p>
      </div>

      <p>Para el modo admin (resolución de disputas), las claves relevantes son:</p>
      <pre><code># ~/.mostrix/settings.toml
mostro_pubkey = "YOUR_MOSTRO_PUBKEY"         # hex o npub
nsec_privkey  = "nsec1..."                   # tu identidad de trader, derivada de la semilla — no la edites
admin_privkey = "nsec1..."                   # la clave de un solver registrado — ver abajo
relays = ["wss://relay.mostro.network"]
currencies_filter = []                       # vacío = mostrar todas las monedas
user_mode = "admin"                          # o Settings → Switch Mode
# trusted_dm_senders = ["npub1..."]          # npub de Serbero, para ver sus reportes (5.10)</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ ¿Qué clave va en admin_privkey?</div>
        <p>Mostro acepta acciones de disputa de su propia clave (el <code>nsec_privkey</code> del daemon) y de las claves de solvers registrados. Cualquier otra clave es rechazada. Solo la clave del daemon puede <em>agregar</em> solvers, así que úsala solo para eso y mantenla en el servidor. Para el trabajo diario con disputas, registra una clave de solver — read-write para liquidar o cancelar — y pon esa en <code>admin_privkey</code>. Nunca reutilices <code>nsec_privkey</code>.</p>
        <pre><code>ADMIN_NSEC=nsec1&lt;daemon-key&gt; MOSTRO_PUBKEY=&lt;node-npub&gt; \\
  RELAYS=wss://relay.mostro.network \\
  mostro-cli admaddsolver -n npub1solver...</code></pre>
        <p>La opción <strong>Settings → Add Dispute Solver</strong> de Mostrix hace lo mismo, con Izquierda/Derecha para elegir Read o Read-Write (por defecto Read-Write).</p>
      </div>

      <h4>El modo admin en la práctica</h4>
      <ul>
        <li><strong>Disputes Pending</strong>: Enter toma una disputa. <kbd>Ctrl+T</kbd> toma una que tenía Serbero.</li>
        <li><strong>Disputes Management</strong>: Tab recorre los chats BUYER, SELLER y SERBERO. <kbd>Shift+F</kbd> finaliza: paga al comprador, devuelve al vendedor y castiga una fianza cuando el nodo las tiene.</li>
        <li><strong>Observer</strong>: pega la clave del chat de la operación que compartió una de las partes para leer su conversación.</li>
        <li><strong>Settings → Link Watchdog</strong>: vincula al solver con mostro-watchdog (5.3), para que reciba un aviso privado por Telegram cuando una parte escribe en una disputa que tomó.</li>
        <li><kbd>Ctrl+H</kbd> muestra la ayuda contextual. Sal desde la pestaña <strong>Exit</strong>.</li>
      </ul>`,
    },
    'watchdog': {
      title: `5.3 mostro-watchdog — Alertas de Telegram para disputas y salud del nodo`,
      nav: `mostro-watchdog`,
      html: `      <p><code>mostro-watchdog</code> es un bot de Telegram para tu equipo de administración. Vigila tu nodo por Nostr y publica en un grupo o canal privado:</p>
      <ul>
        <li><strong>Disputas:</strong> un mensaje por disputa, enviado cuando se abre y editado a medida que avanza (tomada, pasos de Serbero, toma de control, resolución). Cada edición recibe una respuesta corta para que los teléfonos sigan sonando.</li>
        <li><strong>Salud del nodo:</strong> una alerta cuando Mostro deja de <em>funcionar</em>, no solo cuando deja de correr: un evento de info que se silencia, el modo mantenimiento y, con Mostro v0.20.0 o posterior, LND desincronizado o rezagado respecto a la cadena, pagos al comprador atascados o fallando, HTLCs cerca de expirar y canales inactivos. Solo se publican los cambios: una alerta, recordatorios mientras dura y "resuelto".</li>
        <li><strong>El avance de Serbero</strong> en cada disputa, si ejecutas Serbero (5.10).</li>
        <li><strong>Avisos privados a los solvers</strong> cuando una parte les escribe en una disputa que tomaron.</li>
      </ul>

      <p><strong>Opción A: script de instalación (recomendada).</strong> Descarga la última versión, la verifica contra <code>manifest.txt</code> e instala en <code>/usr/local/bin</code>:</p>
      <pre><code>curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash
# o en otro directorio:
curl -fsSL https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/install.sh | bash -s -- --install-dir ~/.local/bin</code></pre>

      <p><strong>Opción B: descarga manual del binario</strong></p>
      <pre><code># Linux x86_64 (Intel/AMD); usa mostro-watchdog-linux-aarch64 en ARM64
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/mostro-watchdog-linux-x86_64
curl -LO https://github.com/MostroP2P/mostro-watchdog/releases/latest/download/manifest.txt
sha256sum -c manifest.txt --ignore-missing
chmod +x mostro-watchdog-linux-x86_64
sudo mv mostro-watchdog-linux-x86_64 /usr/local/bin/mostro-watchdog</code></pre>
      <p>Los binarios para macOS y Windows también están en la página de releases.</p>

      <p><strong>Opción C: compilar desde código fuente</strong></p>
      <pre><code>sudo apt install -y cmake pkg-config libssl-dev
git clone https://github.com/MostroP2P/mostro-watchdog.git
cd mostro-watchdog
cargo build --release
sudo cp target/release/mostro-watchdog /usr/local/bin/</code></pre>

      <h4>Configuración</h4>
      <p>El watchdog guarda su estado (<code>disputes.db</code>) junto a <code>config.toml</code>, así que dale un directorio propio:</p>
      <pre><code>sudo useradd --system --home-dir /var/lib/mostro-watchdog --shell /usr/sbin/nologin mostro-watchdog
sudo install -d -o mostro-watchdog -g mostro-watchdog -m 700 /var/lib/mostro-watchdog
curl -LO https://raw.githubusercontent.com/MostroP2P/mostro-watchdog/main/config.example.toml
sudo install -o mostro-watchdog -g mostro-watchdog -m 600 config.example.toml /var/lib/mostro-watchdog/config.toml
sudo nano /var/lib/mostro-watchdog/config.toml</code></pre>
      <pre><code>[mostro]
pubkey = "YOUR_MOSTRO_PUBKEY"         # hex o npub

[nostr]
# Relays de arranque: el watchdog lee la lista de relays de tu nodo (NIP-65)
# desde ellos, y luego sigue los relays que tu nodo anuncia.
relays = ["wss://relay.mostro.network", "wss://nos.lol"]

[telegram]
bot_token = "YOUR_BOT_TOKEN"          # de @BotFather
chat_id = -1001234567890              # tu grupo o canal de administración

[health]
info_silence_threshold = 900          # 3 × el publish_mostro_info_interval de Mostro (300 por defecto)
mostro_health_enabled = true          # necesita Mostro v0.20.0+
event_alert_threshold = 0             # ver abajo</code></pre>
      <p>Para encontrar el <code>chat_id</code>, agrega el bot al grupo, envía un mensaje ahí y abre <code>https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code>.</p>
      <p>La antigua alerta de "silencio de eventos" salta cada vez que no llega ningún evento de disputa en dos horas, lo que en la mayoría de los nodos es solo una tarde tranquila. Las verificaciones de info y de salud detectan un nodo detenido de forma fiable, así que <code>0</code> la desactiva.</p>

      <h4>La clave Nostr del watchdog</h4>
      <p>Los detalles de salud, las alertas de Serbero, los avisos a solvers y el latido (heartbeat) propio del watchdog necesitan una clave propia, que se pasa solo por el entorno:</p>
      <pre><code>sudo sh -c 'umask 077; echo "WATCHDOG_NOSTR_PRIVATE_KEY=$(openssl rand -hex 32)" > /etc/mostro-watchdog.env'</code></pre>
      <p>Respalda ese archivo. Al arrancar, el watchdog registra su clave pública. Ponla en el <code>settings.toml</code> de Mostro y reinicia Mostro, para que tu liquidez, los fallos de pago y la expiración de HTLCs se cifren solo para el watchdog:</p>
      <pre><code>[health]
watchdog_pubkey = "WATCHDOG_PUBKEY"   # hex o npub</code></pre>
      <p>Esto agrega una etiqueta <code>p</code> pública a tu evento de salud que vincula tu nodo con la clave del watchdog. Sin ella, el watchdog igual alerta sobre el estado público.</p>

      <h4>Ejecútalo como servicio</h4>
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

      <h4>Opcional: Serbero y alertas a solvers</h4>
      <p>Agrega una sección vacía por cada una que quieras. Ambas usan la clave de arriba:</p>
      <pre><code>[serbero]                 # los pasos de Serbero en el mensaje de cada disputa
[solver_notifications]    # avisos privados a los solvers</code></pre>
      <p>Para Serbero, agrega también la clave pública <strong>hex</strong> del watchdog al <code>config.toml</code> de Serbero como observador (observer) — nunca como solver — y reinicia Serbero. Los observadores reciben una línea por paso, nunca lo que escribieron las partes. El watchdog encuentra a Serbero por su cuenta a través del <code>serbero_pubkey</code> de tu nodo (5.10).</p>
      <pre><code>[[observers]]
pubkey = "WATCHDOG_PUBKEY_HEX"</code></pre>
      <p>Para los avisos a solvers, cada solver envía <code>/link</code> al bot en un chat privado e ingresa el código en Mostrix 0.3.6 o posterior, en <strong>Settings → Link Watchdog</strong>. El bot responde a comandos solo en chats privados: <code>/version</code>, <code>/link</code>, <code>/unlink</code>, <code>/status</code>.</p>

      <div class="callout tip">
        <div class="callout-title">💡 Vigila al watchdog</div>
        <p>Un canal en silencio no prueba que el watchdog esté vivo. Puedes ejecutar un segundo en otra máquina, cada uno con su <strong>propio</strong> <code>WATCHDOG_NOSTR_PRIVATE_KEY</code> y la clave pública del otro en <code>[health].peer_watchdogs</code>. Las alertas de salud también pueden ir a un chat aparte con <code>[health].alerts_chat_id</code>. El <code>config.example.toml</code> del proyecto documenta todas las opciones.</p>
      </div>`,
    },
    'monitoring': {
      title: `5.4 Monitoreo y salud del nodo`,
      nav: `Monitoreo`,
      html: `      <p>Tu nodo necesita estar funcionando 24/7.</p>

      <pre><code># Nativo
systemctl status mostro.service
journalctl -u mostro -f
journalctl -u mostro | grep -E "(error|warn|connected)" --ignore-case

# Docker Hub (Opción A)
docker ps --filter name=mostro
docker logs -f mostro

# Docker Build (Opción B)
docker compose -f /opt/mostro/docker/compose.yml ps
docker compose -f /opt/mostro/docker/compose.yml logs -f mostro</code></pre>

      <h4>Funcionando no es lo mismo que sirviendo</h4>
      <p>En octubre de 2026 el LND de un nodo en producción dejó de seguir la cadena durante unas 21 horas. Mostro siguió corriendo y aceptando operaciones, pero todos los pagos a compradores fallaron. Una revisión del proceso, del puerto o un robot de uptime habrían mostrado verde todo el tiempo.</p>
      <p>Desde v0.20.0 Mostro lo verifica por sí mismo. Cada minuto publica un <strong>evento de salud</strong> firmado (kind 38389) con un estado general (<code>ok</code>, <code>degraded</code> o <code>down</code>), un estado por cada verificación (<code>lnd_sync</code>, <code>payouts</code>, <code>relays</code>, <code>database</code>) y la altura de bloque de LND. Viene activado por defecto; este bloque solo muestra los valores por defecto:</p>
      <pre><code>[health]
enabled = true                  # publica el evento de salud (kind 38389)
interval = 60                   # segundos entre publicaciones, de 30 a 3600
watchdog_pubkey = ""            # la clave de tu watchdog: las métricas detalladas se cifran para ella (5.3)
lnd_unsynced_fail_after = 600   # debe ser mayor que 60
auto_maintenance_on_lnd_unsynced = true
lnd_resynced_clear_after = 300</code></pre>
      <p>Cuando LND deja de estar sincronizado, Mostro protege a tus usuarios por su cuenta:</p>
      <ul>
        <li>Después de 60 segundos, los pagos salientes (pagos a compradores, dev fees, pagos de fianzas) <strong>esperan</strong> en lugar de fallar. Un pago en espera no consume uno de los intentos de pago del comprador, y sale en cuanto LND se recupera.</li>
        <li>Después de <code>lnd_unsynced_fail_after</code> segundos, Mostro entra en modo mantenimiento con el motivo <code>lnd_unsynced</code>: sin órdenes ni tomas nuevas, mientras las operaciones abiertas pueden terminar. Sale del mantenimiento cuando LND lleva sincronizado <code>lnd_resynced_clear_after</code> segundos. El mantenimiento que activaste tú mismo (5.8) nunca se levanta automáticamente.</li>
      </ul>
      <p>El log cuenta la historia: <code>LND reports synced_to_chain = false ...; outgoing payments wait after 60s</code>, luego <code>maintenance mode ON (reason lnd_unsynced)</code>, y después <code>LND is synced to chain again</code> y <code>maintenance mode OFF</code>. Revisa LND con <code>lncli getinfo</code> (<code>synced_to_chain</code>, <code>block_height</code>). Configura <code>auto_maintenance_on_lnd_unsynced = false</code> para desactivar el mantenimiento automático.</p>
      <p>Mostro solo sabe lo que le dice su propio LND, y un nodo atascado en una cadena vieja no siempre se entera. Por eso los dos lectores de abajo comparan su altura de bloque con exploradores públicos:</p>
      <ul>
        <li><strong>Alertas privadas:</strong> mostro-watchdog (5.3) avisa a tu Telegram cuando algo falla y cuando se resuelve.</li>
        <li><strong>Página de estado pública:</strong> <a href="https://status.mostro.network" target="_blank" rel="noopener noreferrer">status.mostro.network</a> muestra el estado en vivo y el uptime de 90 días de cada Mostro listado. Tus usuarios también la ven.</li>
      </ul>

      <h4>La página de estado pública</h4>
      <p>La página (<a href="https://github.com/MostroP2P/semaforo" target="_blank" rel="noopener noreferrer">Semáforo</a>) lee los eventos de salud directamente de los relays y los verifica en el navegador del visitante, sin backend. Cada nodo recibe un color:</p>
      <table class="guide-table">
        <thead><tr><th>Color</th><th>Cuándo</th></tr></thead>
        <tbody>
          <tr><td>🟢 Operational</td><td>Estado <code>ok</code>, un evento reciente, y LND a menos de 3 bloques de los exploradores</td></tr>
          <tr><td>🟡 Degraded</td><td>Estado <code>degraded</code>, modo mantenimiento, o sin una altura de bloque independiente con la cual comparar</td></tr>
          <tr><td>🔴 Down</td><td>Estado <code>down</code>, LND 3 o más bloques por detrás, o sin un evento válido reciente ("Not reporting")</td></tr>
          <tr><td>⚪ Not monitored</td><td>Listado, pero aún no se espera que publique</td></tr>
        </tbody>
      </table>
      <p>Bajo cada nodo, 90 barras diarias y una cifra de uptime provienen de muestras tomadas cada 10 minutos.</p>
      <p><strong>Cómo lograr que tu nodo aparezca.</strong> Solo se muestran nodos curados, porque cualquiera puede firmar un evento siempre en verde:</p>
      <ol>
        <li>Tu nodo está listado como comunidad en este sitio.</li>
        <li>Ejecuta Mostro v0.20.0 o posterior con el evento de salud activado, y publica en al menos uno de <code>wss://relay.mostro.network</code>, <code>wss://mostro-p2p.tech</code> o <code>wss://relay.shadowbip.com</code>.</li>
        <li>Abre un issue o pull request en <a href="https://github.com/MostroP2P/semaforo" target="_blank" rel="noopener noreferrer">MostroP2P/semaforo</a> para agregarlo a <code>trusted.json</code> con su pubkey hex, nombre, región y red. Tu avatar se copia de la foto de perfil de tu perfil Nostr.</li>
      </ol>

      <h4>Revisar tu nodo desde afuera</h4>
      <p>Tu nodo republica un evento de info (kind 38385) que se describe a sí mismo: comisiones, monedas, versión de protocolo, bandera de mantenimiento, ajustes de fianzas, claves de Serbero y de reputación. Leerlo, junto con el evento de salud, desde un relay es la forma más rápida de confirmar que el mundo exterior ve lo que crees que ve.</p>
      <pre><code>cargo install nostreq nostcat
# Evento de info
nostreq --kinds 38385 --limit 1 --authors YOUR_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq
# Evento de salud: estado, verificaciones, altura de bloque de LND
nostreq --kinds 38389 --limit 1 --authors YOUR_MOSTRO_PUBKEY_HEX \\
  | nostcat --stream wss://relay.mostro.network | jq '.tags'</code></pre>

      <div class="callout tip">
        <div class="callout-title">💡 Las revisiones del host siguen sirviendo</div>
        <p>Un ping al host (<a href="https://uptimerobot.com/" target="_blank" rel="noopener noreferrer">UptimeRobot</a> o similar) todavía te avisa cuando la VPS misma es inalcanzable. No puede decirte si Mostro está pagando a los compradores; el evento de salud sí.</p>
      </div>`,
    },
    'updating': {
      title: `5.5 Actualizando Mostro`,
      nav: `Actualización`,
      html: `      <p>Actualizar reemplaza el binario <code>mostrod</code> y nada más: <code>settings.toml</code> y <code>mostro.db</code> se quedan donde están. Las migraciones de la base de datos se aplican solas cuando arranca la nueva versión, así que no hay pasos extra.</p>

      <h4>Antes de actualizar</h4>
      <ol>
        <li><strong>Lee las <a href="https://github.com/MostroP2P/mostro/releases" target="_blank" rel="noopener noreferrer">notas de la versión</a></strong> a la que vas a actualizar. Tu <code>settings.toml</code> nunca se sobrescribe: compáralo con el nuevo <code>settings.tpl.toml</code>. La mayoría de las funciones nuevas siguen apagadas hasta que las agregas, pero un bloque que falta toma sus valores por defecto, y algunos están activados (el evento de salud de 5.4, por ejemplo).</li>
        <li><strong>Respalda la base de datos</strong> con los comandos de 5.6. Necesitas ese respaldo para volver atrás.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Si vienes de v0.18.x</div>
        <p>Revisa esto antes de iniciar la versión nueva, o puede negarse a arrancar:</p>
        <ul>
          <li>Borra cualquier línea <code>transport = "gift-wrap"</code> (4.8). Los usuarios con clientes viejos de protocolo v1 tienen que actualizar.</li>
          <li><code>escrow_deadline_margin_blocks</code> debe ser al menos 18 y estar por debajo de <code>hold_invoice_cltv_delta</code> (4.9).</li>
          <li>Bajo <code>[cashu]</code>, <code>mint_url</code> pasó a ser <code>mint_urls = [...]</code> (4.11).</li>
          <li>Con las fianzas anti-abuso activadas y un <code>hold_invoice_cltv_delta</code> de 288 o más, configura <code>bond_cltv_delta</code> explícitamente (4.11).</li>
          <li>Desde v0.20.0 el evento de salud se publica por defecto, y Mostro puede entrar en mantenimiento por su cuenta cuando LND está desincronizado (5.4).</li>
        </ul>
      </div>

      <h4>Docker Hub (<code>docker run</code>)</h4>
      <pre><code>export MOSTRO_TAG={{version}}
# Primero descarga: el nodo sigue funcionando durante la descarga
docker pull mostrop2p/mostro:$MOSTRO_TAG
docker stop mostro
docker rm mostro
docker run -d --name mostro \\
  --restart unless-stopped \\
  --add-host=host.docker.internal:host-gateway \\
  -v ~/mostro-config:/config \\
  mostrop2p/mostro:$MOSTRO_TAG</code></pre>
      <p>Usa los mismos flags con los que instalaste (quita <code>--add-host</code> si LND está en otro servidor). Si no los recuerdas, revisa <code>docker inspect mostro</code> antes de borrar el contenedor.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ <code>docker restart</code> no es una actualización</div>
        <p><code>docker restart</code> vuelve a arrancar el mismo contenedor, con la imagen con la que fue creado. Para correr una versión nueva hay que crear el contenedor otra vez: <code>docker rm</code> + <code>docker run</code>, o <code>docker compose up -d</code> después de cambiar el tag.</p>
      </div>

      <h4>Docker Hub (Docker Compose)</h4>
      <pre><code>export MOSTRO_TAG={{version}}
COMPOSE=~/mostro-docker/compose.yml
# Apunta la línea image al nuevo tag y verifícala
sed -i "s|image: mostrop2p/mostro:.*|image: mostrop2p/mostro:$MOSTRO_TAG|" $COMPOSE
grep image: $COMPOSE
docker compose -f $COMPOSE pull
# Recrea el contenedor porque cambió la imagen
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

      <h4>Verificar la nueva versión</h4>
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
      <p>Busca los mismos mensajes de arranque que en la primera ejecución (Paso 11 de la Opción A).</p>

      <h4>Volver a la versión anterior</h4>
      <p>Si la nueva versión se comporta mal, vuelve al tag anterior. La nueva versión puede haber migrado ya la base de datos, y un <code>mostrod</code> más viejo puede negarse a arrancar con ella, así que restaura el respaldo que hiciste antes de actualizar:</p>
      <pre><code>docker stop mostro
docker rm mostro
# reemplaza YYYYMMDD por la fecha del respaldo hecho antes de actualizar
BACKUP=/root/mostro-backups/mostro.db.YYYYMMDD
cp "$BACKUP" ~/mostro-config/mostro.db
rm -f ~/mostro-config/mostro.db-wal ~/mostro-config/mostro.db-shm
chown 1000:1000 ~/mostro-config/mostro.db
# luego arranca el tag anterior: mismo comando docker run,
# o vuelve a poner el tag viejo en compose.yml y corre docker compose up -d</code></pre>
      <p>Docker Build y nativo funcionan igual: haz checkout del tag anterior, recompila y restaura la base de datos antes de arrancar.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ No cambies de nodo Lightning al mismo tiempo</div>
        <p>Actualizar Mostro es seguro en cualquier momento. Apuntarlo a un nodo Lightning <strong>distinto</strong> no lo es: drena el escrow primero, mira 5.8.</p>
      </div>`,
    },
    'backups': {
      title: `5.6 Respaldos`,
      nav: `Respaldos`,
      html: `      <p>Archivos críticos para respaldar: <code>settings.toml</code>, el archivo <code>.env</code> si guardas ahí tu nsec (ver 4.1) o tu clave de exportación de reputación (4.13), y <code>mostro.db</code> (historial de órdenes, reputación). Si habilitas el historial del pagador (4.11), guarda los respaldos de la base de datos separados del nsec: el historial está indexado con él.</p>

      <div class="callout important">
        <div class="callout-title">⚠️ No copies una base de datos en uso con cp</div>
        <p>SQLite funciona en modo WAL, así que las escrituras recientes viven en <code>mostro.db-wal</code> hasta que se consolidan. Copiar solo <code>mostro.db</code> mientras Mostro está corriendo puede producir un respaldo al que le falten las operaciones más nuevas. Usa el comando de respaldo propio de SQLite, que es seguro sobre una base en uso y escribe un único archivo consistente.</p>
      </div>

      <pre><code># Respaldo manual — Docker Hub:
mkdir -p /root/mostro-backups
sqlite3 ~/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp ~/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp ~/mostro-config/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null

# Respaldo manual — Docker Build (Opción B):
sqlite3 /opt/mostro/docker/config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/docker/config/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp /opt/mostro/docker/config/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null

# Respaldo manual — Nativo:
sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +%Y%m%d)'"
cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +%Y%m%d)
cp /opt/mostro/.env /root/mostro-backups/env.$(date +%Y%m%d) 2>/dev/null</code></pre>

      <p><strong>Respaldo diario automático</strong> (agregar al crontab con <code>crontab -e</code>):</p>
      <pre><code># Docker Hub (Opción A):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /root/mostro-config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /root/mostro-config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d); cp /root/mostro-config/.env /root/mostro-backups/env.$(date +\\%Y\\%m\\%d) 2>/dev/null

# Docker Build (Opción B):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/docker/config/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/docker/config/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d); cp /opt/mostro/docker/config/.env /root/mostro-backups/env.$(date +\\%Y\\%m\\%d) 2>/dev/null

# Nativo (Opción C):
0 3 * * * mkdir -p /root/mostro-backups && sqlite3 /opt/mostro/mostro.db ".backup '/root/mostro-backups/mostro.db.$(date +\\%Y\\%m\\%d)'" && cp /opt/mostro/settings.toml /root/mostro-backups/settings.toml.$(date +\\%Y\\%m\\%d); cp /opt/mostro/.env /root/mostro-backups/env.$(date +\\%Y\\%m\\%d) 2>/dev/null</code></pre>

      <div class="callout important">
        <div class="callout-title">⚠️ Crítico</div>
        <p>Tu <code>nsec_privkey</code> en <code>settings.toml</code> ES la identidad de tu nodo. Si la pierdes, pierdes tu reputación y todos los usuarios deben reconectarse a una nueva identidad. <strong>Guarda una copia offline.</strong></p>
      </div>

      <h4>Si ejecutas tu propio LND</h4>
      <p>Los respaldos de Mostro no cubren tu nodo Lightning. Los fondos en tus canales dependen de dos respaldos de LND:</p>
      <ul>
        <li><strong>La semilla de la billetera</strong> (24 palabras, más la frase de contraseña si pusiste una), que se muestra una sola vez al crear la billetera. Anótala y guárdala offline.</li>
        <li><strong>El respaldo estático de canales</strong>, <code>channel.backup</code> (por ejemplo <code>~/.lnd/data/chain/bitcoin/mainnet/channel.backup</code>). LND lo reescribe cada vez que se abre o se cierra un canal, así que cópialo fuera de la máquina con regularidad, por ejemplo en el mismo trabajo de cron que los respaldos de Mostro. Con la semilla y este archivo puedes cerrar tus canales y recuperar los fondos en un nodo nuevo.</li>
      </ul>
      <p>Nunca respaldes ni restaures <code>channel.db</code> como forma de recuperar canales: una copia desactualizada hace que tu nodo transmita estados antiguos, y los pares pueden quedarse con todos los fondos de esos canales. Los sistemas nodo-en-caja y Voltage tienen sus propias funciones de respaldo; actívalas. La documentación de LND cubre la recuperación en detalle (<a href="https://docs.lightning.engineering/lightning-network-tools/lnd/recovery-planning-for-failure" target="_blank" rel="noopener noreferrer">planificación de la recuperación</a>).</p>`,
    },
    'activity': {
      title: `5.7 Revisando la actividad de operaciones`,
      nav: `Actividad`,
      html: `      <pre><code># Contar todas las órdenes
sqlite3 /ruta/a/mostro.db "SELECT COUNT(*) FROM orders;"

# Operaciones exitosas recientes
sqlite3 /ruta/a/mostro.db "SELECT id, fiat_code, fiat_amount, amount, fee, status, created_at FROM orders WHERE status = 'success' ORDER BY created_at DESC LIMIT 10;"

# Órdenes pendientes
sqlite3 /ruta/a/mostro.db "SELECT id, fiat_code, fiat_amount, status, created_at FROM orders WHERE status = 'pending';"

# Ingresos por comisiones: orders.fee guarda la mitad de cada parte, así que la comisión bruta del nodo es fee*2 y el dev fee se descuenta de ella
sqlite3 /ruta/a/mostro.db "SELECT SUM(fee*2) AS gross_fees, SUM(dev_fee) AS dev_fees, SUM(fee*2 - COALESCE(dev_fee, 0)) AS net_fees FROM orders WHERE status = 'success';"</code></pre>`,
    },
    'ln-migration': {
      title: `5.8 Modo Mantenimiento y Cambio de Nodo Lightning`,
      nav: `Cambiar nodo LN`,
      html: `      <p>Los hold invoices, las fianzas y los pagos en vuelo pertenecen al nodo Lightning que los creó. Apuntar Mostro a otro nodo mientras algo de eso está abierto dejaría esas operaciones colgadas, así que el daemon <strong>se niega a arrancar</strong> cuando ve una identidad LND nueva con escrow todavía ligado a la anterior:</p>
      <pre><code>REFUSING TO START: Lightning node changed from ... but escrow is still bound to the old node</code></pre>

      <p>El modo mantenimiento es la forma de drenar primero. Mientras está activo se rechazan órdenes y tomas nuevas, y las operaciones abiertas siguen funcionando para que el escrow pueda liquidarse. Requiere la interfaz RPC habilitada (ver 4.7), y la llamada se acepta solo desde loopback: ejecútala en el host del nodo, o a través de <code>ssh -N -L 50051:127.0.0.1:50051 user@node</code>.</p>
      <p>Mostro también puede entrar en mantenimiento por su cuenta, con el motivo <code>lnd_unsynced</code>, cuando LND se desincroniza (5.4). Si activas el mantenimiento mientras eso está en curso, pasa a ser tuyo y el daemon no lo levantará; no puedes usar <code>lnd_unsynced</code> como tu propio motivo.</p>

      <ol>
        <li>Anuncia la ventana a tus usuarios con bastante antelación.</li>
        <li>Activa el modo mantenimiento: <code>mostro-cli admsetmaintenance -e true -r "LN node migration"</code>.</li>
        <li>Consulta <code>mostro-cli admmaintenancestatus</code> hasta que reporte <code>drained = true</code>. Las órdenes pendientes expiran solas; para acortar el drenaje puedes cancelar una con <code>mostro-cli admcancelpending -o &lt;order-id&gt;</code>, que libera la fianza del creador de inmediato. Avísalo antes, es la orden del usuario. Cierra las disputas de larga duración como siempre.</li>
        <li>Mantén el nodo <strong>viejo</strong> en línea todo el tiempo. Todavía tiene que terminar los pagos en vuelo.</li>
        <li>Detén Mostro y respalda <code>mostro.db</code>.</li>
        <li>Apunta <code>[lightning]</code> al nodo nuevo y deja <code>allow_node_change = false</code>.</li>
        <li>Arranca Mostro. Registra la pubkey nueva. Desactiva el modo mantenimiento y prueba con una orden.</li>
        <li>Solo entonces da de baja el nodo viejo.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ allow_node_change</div>
        <p>Ponlo en <code>true</code> solo para recuperación de desastres, cuando el nodo viejo se perdió definitivamente. Deja a sabiendas las operaciones afectadas sin resolver. Mover el mismo nodo a otro host no es un cambio de nodo y no necesita nada de esto.</p>
      </div>`,
    },
    'operator-cli': {
      title: `5.9 Comandos de Operador con mostro-cli`,
      nav: `CLI de operador`,
      html: `      <p>Mostrix es la forma cómoda de trabajar las disputas, y <code>mostro-cli</code> cubre lo básico desde una terminal, además de algunos comandos de operador que Mostrix no tiene. Los comandos de disputa se firman con una clave Nostr que pasas como <code>ADMIN_NSEC</code>, y esa clave debe ser la del propio daemon o la de un solver registrado. La CLI no lee ningún archivo de configuración: define tu nodo y tus relays en el entorno, y pon los flags globales antes del subcomando.</p>

      <pre><code># Trabajo de disputas (por Nostr)
export MOSTRO_PUBKEY=npub1...            # tu nodo
export RELAYS=wss://relay.mostro.network
export ADMIN_NSEC=nsec1...
mostro-cli listdisputes
mostro-cli admtakedispute -d &lt;dispute-id&gt;     # muestra las pubkeys del comprador y del vendedor
mostro-cli getadmindm -s 120
mostro-cli admsenddm -p &lt;party-pubkey&gt; -m "mensaje a una parte"
mostro-cli admsettle -o &lt;order-id&gt; [--slashseller] [--slashbuyer]   # liberar al comprador
mostro-cli admcancel -o &lt;order-id&gt; [--slashseller] [--slashbuyer]   # reembolsar al vendedor

# Registrar un árbitro, opcionalmente de solo lectura
mostro-cli admaddsolver -n npub1...:read</code></pre>

      <p>Los flags de castigo solo importan con fianzas anti-abuso (4.11). Fíjate en la ortografía: <code>--slashseller</code>, no <code>--slash-seller</code>. <code>admsenddm</code> envía un mensaje directo desde la clave admin; no es el chat por disputa que usan la Mostro App, Mostrix y Bosstro, así que prefiere esos clientes para hablar con las partes.</p>

      <p>Otro grupo de comandos va por el gRPC de administración en lugar de Nostr, así que necesitan la interfaz RPC habilitada (ver 4.7) en vez de <code>ADMIN_NSEC</code>. <code>MOSTRO_RPC_URL</code> es por defecto <code>http://127.0.0.1:50051</code>, y <code>MOSTRO_RPC_TOKEN</code> solo hace falta si configuraste <code>auth_token</code>.</p>

      <pre><code>export MOSTRO_RPC_URL=http://127.0.0.1:50051
export MOSTRO_RPC_TOKEN=tu-token-de-auth

mostro-cli admsetmaintenance -e true -r "motivo"
mostro-cli admmaintenancestatus
mostro-cli admcancelpending -o &lt;order-id&gt;</code></pre>

      <p><code>admcancelpending</code> vale la pena conocerlo fuera de una migración. Cancela una orden que sigue pendiente o esperando una fianza, avisa al creador y libera todas las fianzas de una vez. Úsalo con una orden claramente abandonada o mal cotizada, y avísale al creador antes: es su orden, y esto no es una resolución de disputa.</p>

      <p>mostro-cli todavía no tiene comandos para la importación y exportación de reputación, el historial del pagador ni el evento de salud: usa <code>grpcurl</code> para las RPC de reputación (4.13) y los comandos de 5.4 para el evento de salud. Instálalo con <code>cargo install mostro-cli</code> (Rust 1.97 o posterior) o toma un binario de <a href="https://github.com/MostroP2P/mostro-cli/releases" target="_blank" rel="noopener noreferrer">sus releases</a>; ejecuta <code>mostro-cli &lt;command&gt; --help</code> para ver todos los flags.</p>`,
    },
    'serbero': {
      title: `5.10 Serbero — Asistente de disputas`,
      nav: `Serbero`,
      html: `      <p><a href="https://github.com/MostroP2P/serbero" target="_blank" rel="noopener noreferrer">Serbero</a> es un asistente opcional para las disputas de tu nodo. Lo ejecutas junto a Mostro, con una clave Nostr propia. Hace dos trabajos:</p>
      <ul>
        <li><strong>Notificar (siempre activo).</strong> Cada solver que listes recibe un mensaje directo a los pocos segundos de una nueva disputa, con recordatorios cada 15 minutos hasta que alguien la tome.</li>
        <li><strong>Mediar (opt-in, piloto).</strong> Serbero toma la disputa, pregunta al comprador si pagó y al vendedor si el dinero llegó, les da tiempo para terminar la operación por su cuenta y, si no, entrega el caso a un solver humano con un resumen y la transcripción completa.</li>
      </ul>
      <p>Serbero nunca mueve fondos y nunca decide una disputa. Mostro lo registra como un solver <strong>de solo lectura</strong>, así que no puede liquidar ni cancelar, y cualquier solver read-write puede tomar una disputa de sus manos en cualquier momento. Si Serbero está caído, Mostro y tus solvers funcionan exactamente como antes. Mantén al menos un solver humano read-write.</p>

      <h4>Instalación</h4>
      <p>Cada release trae binarios para Linux (x86_64, aarch64) y macOS (Apple silicon), cada uno con un archivo SHA-256. Los nombres de archivo llevan la versión:</p>
      <pre><code>V=$(curl -fsSL https://api.github.com/repos/MostroP2P/serbero/releases/latest | grep -m1 '"tag_name"' | cut -d'"' -f4)
A=serbero-$V-x86_64-unknown-linux-gnu        # aarch64-unknown-linux-gnu en ARM64
curl -LO https://github.com/MostroP2P/serbero/releases/download/$V/$A.tar.gz
curl -LO https://github.com/MostroP2P/serbero/releases/download/$V/$A.tar.gz.sha256
shasum -a 256 -c $A.tar.gz.sha256
tar -xzf $A.tar.gz && cd $A        # serbero, config.sample.toml, deploy/</code></pre>
      <p>Con Rust instalado, <code>cargo install serbero --locked</code> también funciona. Una imagen Docker (<code>ghcr.io/mostrop2p/serbero</code>) y un archivo compose se describen en el README del proyecto.</p>

      <h4>Configuración</h4>
      <pre><code>cp config.sample.toml config.toml
nano config.toml</code></pre>
      <pre><code>[serbero]
private_key_env = "SERBERO_PRIVATE_KEY"   # nombra el secreto; la clave nunca va en este archivo
db_path = "serbero.db"

[mostro]
pubkey = "YOUR_MOSTRO_PUBKEY_HEX"
relays = ["wss://relay.mostro.network", "wss://nos.lol"]   # relays en los que publica tu nodo

# Una entrada por solver humano: la pubkey hex de la clave que usa su cliente
# (Mostrix: admin_privkey). Nunca listes la clave propia de Serbero.
[[solvers]]
pubkey = "SOLVER_PUBKEY_HEX"
permission = "write"

[notify]
renotify_after = "15m"

[mediation]
enabled = false</code></pre>

      <h4>Ejecútalo como servicio</h4>
      <p>El proyecto incluye una unidad systemd endurecida. Descárgala de <code>main</code>: la copia dentro del archivo de v0.2.5 necesita systemd 251 y no arranca en Ubuntu 22.04.</p>
      <pre><code>sudo useradd --system --home-dir /var/lib/serbero --shell /usr/sbin/nologin serbero
sudo install -m 755 serbero /usr/local/bin/serbero
sudo install -d -m 755 /etc/serbero
sudo install -m 644 config.toml /etc/serbero/config.toml
sudo install -d -m 700 /etc/serbero/credentials
sudo sh -c 'umask 077; openssl rand -hex 32 > /etc/serbero/credentials/serbero_private_key'
curl -fsSLO https://raw.githubusercontent.com/MostroP2P/serbero/main/deploy/serbero.service
sudo install -m 644 serbero.service /etc/systemd/system/serbero.service
sudo systemctl daemon-reload && sudo systemctl enable --now serbero
journalctl -u serbero -f        # anota el npub que registra al arrancar</code></pre>
      <p>Respalda <code>/etc/serbero/credentials/serbero_private_key</code> sin conexión. Es la identidad de Serbero: si la pierdes, tendrás que registrar un npub nuevo.</p>

      <h4>Regístralo en tu nodo</h4>
      <p>Mostro v0.19.1 o posterior registra a Serbero por ti. Agrega su npub al bloque <code>[mostro]</code> de tu <code>settings.toml</code> y reinicia Mostro:</p>
      <pre><code>[mostro]
serbero_pubkey = "npub1..."   # la clave de Serbero, npub o hex</code></pre>
      <p>Al arrancar, Mostro registra esa clave como solver de solo lectura y la anuncia en su evento de info. Ese anuncio es como la Mostro App etiqueta los mensajes de Serbero y como mostro-watchdog lo encuentra. El log lo confirma: <code>Serbero npub1... configured: registered as a read-only solver</code>.</p>
      <div class="callout important">
        <div class="callout-title">⚠️ No agregues a Serbero con admaddsolver</div>
        <p>Un npub pelado agregado con <code>admaddsolver</code> queda como read-write (5.1), y entonces Mostro se niega a arrancar con <code>REFUSING TO START: serbero_pubkey ... is a solver with write permission</code>. También rechaza una clave que pertenece a un usuario que no es solver, y la clave propia de tu nodo. Dale a Serbero una clave propia y deja que <code>serbero_pubkey</code> lo registre.</p>
      </div>

      <h4>Tus solvers leen a Serbero en Mostrix</h4>
      <p>Mostrix 0.3.5 o posterior muestra los mensajes de Serbero en un panel <strong>SERBERO</strong> por cada disputa, pero solo de los remitentes en los que el solver confía. En el <code>~/.mostrix/settings.toml</code> de cada solver:</p>
      <pre><code>trusted_dm_senders = ["npub1..."]   # npub de Serbero</code></pre>
      <p>La pubkey del <code>admin_privkey</code> del solver debe ser exactamente la de una entrada <code>[[solvers]]</code>, y Mostrix debe leer al menos uno de los relays de Serbero. Para tomar un caso, pulsa <kbd>Ctrl+T</kbd> en un traspaso; requiere permiso read-write, y Serbero deja de escribir de inmediato. Bosstro (5.11) todavía no muestra los resúmenes de Serbero.</p>

      <h4>Activar la mediación (piloto)</h4>
      <p>La mediación viene apagada. Cuando está activa, Serbero toma cada nueva disputa y se presenta a ambas partes como un asistente automatizado, en su idioma (inglés, español o portugués), con una pregunta corta a la vez. Cuando ambos han respondido, les da 30 minutos para resolver la operación por su cuenta y luego entrega el caso a tus solvers. Nunca le dice a nadie que libere o cancele.</p>
      <p>Para leer las respuestas, Serbero consulta a un modelo juez (Jev de TypeSafe) en <strong>tu propia</strong> cuenta de pago. El juez recibe los roles de la operación, el monto, la moneda y el método de pago, y el texto del mensaje — nunca claves públicas. Pide al proveedor cero retención de datos, y avisa a tus usuarios que los mensajes de disputa los procesa un servicio automatizado. El README explica la clave de API y la tabla de umbrales; configura <code>enabled = true</code> bajo <code>[mediation]</code> y reinicia, y el log dice <code>mediation ready</code> o por qué no.</p>
      <p>Los mensajes de las partes son eventos kind 14: usa más de un relay, y solo relays que los almacenen, o los mensajes enviados mientras Serbero está desconectado se pierden. Para publicar el avance de Serbero en el Telegram de tu equipo, registra mostro-watchdog como observador (5.3). Respalda <code>serbero.db</code> de forma privada: contiene las conversaciones de las disputas.</p>`,
    },
    'bosstro': {
      title: `5.11 Bosstro — Resolver disputas desde el teléfono`,
      nav: `Bosstro`,
      html: `      <p><a href="https://github.com/MostroP2P/bosstro" target="_blank" rel="noopener noreferrer">Bosstro</a> es la app Android para solvers de disputas. Lleva el lado admin de Mostrix a un teléfono: un solver ve las disputas pendientes de tu nodo, toma una, chatea con el comprador y el vendedor (incluidas imágenes y PDFs), lee el chat propio de las partes cuando una de ellas comparte su clave y, con permiso read-write, paga al comprador o devuelve al vendedor, con la opción de fianza cuando tu nodo tiene fianzas.</p>
      <p>Es una herramienta para tus solvers, no para operar, y nunca guarda la clave de tu nodo. Registrar solvers sigue haciéndose desde Mostrix o <code>mostro-cli</code> (5.2).</p>

      <h4>Instalar y verificar</h4>
      <p>Android 7.0 o posterior. Descarga el APK desde <a href="https://github.com/MostroP2P/bosstro/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a>: <code>arm64-v8a</code> para casi cualquier teléfono, <code>armeabi-v7a</code> para uno viejo de 32 bits. Compáralo con el archivo de checksums de la release:</p>
      <pre><code>sha256sum -c SHA256SUMS.txt --ignore-missing</code></pre>
      <p>El checksum solo prueba que la descarga está completa. El certificado de firma prueba quién la compiló, y Android rechaza una actualización firmada con cualquier otra clave. Compáralo con <a href="https://github.com/soupslurpr/AppVerifier" target="_blank" rel="noopener noreferrer">AppVerifier</a>:</p>
      <pre><code>foundation.mostro.bosstro
63:92:27:84:C2:E3:2A:F4:B6:03:0F:5E:2A:18:1F:74:9B:F6:95:E5:2F:1C:A8:45:7E:98:CB:05:D2:9E:B3:4B</code></pre>

      <h4>Agregar un solver</h4>
      <ol>
        <li>El solver abre Bosstro, toca <strong>Create new account</strong> (o <strong>Log in</strong> con un nsec de solver existente) y te envía el npub. Esa clave no debe usarse para nada más — nunca la clave de una app de trading, o ambos roles quedan vinculados en público.</li>
        <li>Tú lo registras, de solo lectura para empezar (5.1):
          <pre><code>ADMIN_NSEC=nsec1... mostro-cli admaddsolver -n npub1solver...:read</code></pre></li>
        <li>El solver elige tu nodo en Bosstro: Mostro, una comunidad de la lista, o tu propia pubkey y relays. Bosstro averigua por las respuestas de tu nodo si la clave es un solver y con qué permiso.</li>
      </ol>

      <div class="callout important">
        <div class="callout-title">⚠️ Límites actuales</div>
        <p>Bosstro habla solo protocolo v2 (4.8). La versión 0.1 no muestra los resúmenes de traspaso de Serbero y todavía no tiene notificaciones push, así que los solvers que trabajan con Serbero aún necesitan Mostrix para eso. Un solver read-write puede tomar una disputa de Serbero en Bosstro.</p>
      </div>`,
    },
    'costs': {
      title: `6. Desglose de Costos`,
      nav: `6. Desglose de costos`,
      navShort: `6. Costos`,
      html: `      <h3>Costos operativos mensuales</h3>
      <table class="guide-table">
        <thead><tr><th>Concepto</th><th>Costo mensual</th><th>Notas</th></tr></thead>
        <tbody>
          <tr><td>VPS (servidor)</td><td>$10–24</td><td>Depende del proveedor y las especificaciones</td></tr>
          <tr><td>Nombre de dominio (opcional)</td><td>$1–2</td><td>Para un sitio web/identidad</td></tr>
          <tr><td>Comisiones on-chain de canales Lightning</td><td>Variable</td><td>Apertura/cierre de canales</td></tr>
          <tr><td><strong>Total mensual</strong></td><td><strong>$11–26</strong></td><td>Excluyendo liquidez Lightning</td></tr>
        </tbody>
      </table>

      <h3>Costos únicos / de capital</h3>
      <table class="guide-table">
        <thead><tr><th>Concepto</th><th>Costo</th><th>Notas</th></tr></thead>
        <tbody>
          <tr><td>Liquidez Lightning</td><td>0.01–1.0+ BTC</td><td>Bloqueado en canales; se recupera al cerrar</td></tr>
          <tr><td>Hardware del nodo (si se auto-aloja)</td><td>$0–600</td><td>Gratis si usas VPS; $300-600 para Start9/Umbrel</td></tr>
          <tr><td>Tiempo de configuración</td><td>4–16 horas</td><td>Dependiendo del nivel de experiencia</td></tr>
        </tbody>
      </table>

      <h3>Potencial de ingresos</h3>
      <table class="guide-table">
        <thead><tr><th>Volumen mensual</th><th>Comisión (0.6%)</th><th>Comisión dev (30%)</th><th>Tu ingreso neto</th></tr></thead>
        <tbody>
          <tr><td>$1,000</td><td>~$6</td><td>~$1.80</td><td>~$4.20</td></tr>
          <tr><td>$10,000</td><td>~$60</td><td>~$18</td><td>~$42</td></tr>
          <tr><td>$50,000</td><td>~$300</td><td>~$90</td><td>~$210</td></tr>
          <tr><td>$100,000</td><td>~$600</td><td>~$180</td><td>~$420</td></tr>
        </tbody>
      </table>

      <div class="callout important">
        <div class="callout-title">📝 Realidad</div>
        <p>La mayoría de los nodos nuevos tardan meses en construir volumen de operaciones. No esperes rentabilidad inmediata. El valor real suele venir de proporcionar un servicio a tu comunidad, con las comisiones como bonus.</p>
      </div>

      <h3>Compromiso de tiempo</h3>
      <table class="guide-table">
        <thead><tr><th>Tarea</th><th>Frecuencia</th><th>Tiempo</th></tr></thead>
        <tbody>
          <tr><td>Monitoreo (revisar logs, estado)</td><td>Diario</td><td>5–10 min</td></tr>
          <tr><td>Resolución de disputas</td><td>Según necesidad</td><td>15–60 min por disputa</td></tr>
          <tr><td>Actualizaciones</td><td>Mensual</td><td>15–30 min</td></tr>
          <tr><td>Gestión de liquidez</td><td>Semanal</td><td>15–30 min</td></tr>
          <tr><td><strong>Estimación semanal total</strong></td><td></td><td><strong>1–3 horas</strong></td></tr>
        </tbody>
      </table>`,
    },
    'faq': {
      title: `7. Preguntas Frecuentes`,
      nav: `7. Preguntas frecuentes`,
      navShort: `7. FAQ`,
      html: `      <h3>¿Necesito ser desarrollador para ejecutar un nodo Mostro?</h3>
      <p>No, pero necesitas sentirte cómodo con operaciones básicas de línea de comandos (escribir comandos, editar archivos de texto). La ruta Docker (Opción A) está diseñada para ser accesible.</p>

      <h3>¿Puedo ejecutar Mostro en una Raspberry Pi?</h3>
      <p>Mucha gente ejecuta LND en una Raspberry Pi 4 o 5 con un SSD, a través de Start9, Umbrel o RaspiBlitz, y el paquete Mostro de StartOS puede correr a su lado. Para un nodo del que depende tu comunidad, un VPS es más confiable que una conexión y una fuente de energía caseras. Un punto medio común es LND en casa y Mostro en un VPS, enlazados por una VPN (ver 2.2).</p>

      <h3>¿Puedo usar Core Lightning (CLN) en lugar de LND?</h3>
      <p>No. Mostro actualmente solo soporta LND, porque depende de la implementación específica de hold invoices de LND. El soporte para otras implementaciones podría llegar en el futuro.</p>

      <h3>¿Cómo se conectan los usuarios a mi Mostro?</h3>
      <p>Los usuarios necesitan un cliente Mostro — la <a href="https://github.com/MostroP2P/app" target="_blank" rel="noopener noreferrer">Mostro App</a> para Android, iOS, escritorio y web, o mostro-cli o Mostrix — y la clave pública de tu Mostro (npub). En la app van a <em>Configuración → Red → Nodo Mostro → Agregar nodo propio</em> y pegan tu npub; los nodos listados en este sitio ya aparecen ahí. El cliente se comunica a través de relays Nostr. No se necesita conexión directa.</p>

      <h3>¿Puede mi nodo seguir atendiendo clientes viejos (protocolo v1)?</h3>
      <p>No. Desde v0.19.0 Mostro habla solo protocolo v2 (4.8). Los usuarios con un cliente viejo tienen que actualizar a la Mostro App o a un Mostrix o mostro-cli actual.</p>

      <h3>¿Pueden mis usuarios operar USDT, Liquid o Rootstock en lugar de fiat?</h3>
      <p>Sí, desde v0.20.2: USDT, USDC, DOC, BTC on-chain, LBTC y RBTC. Los habilitas uno por uno, y tus solvers deben saber cómo verificar esas transferencias. Mira 4.12.</p>

      <h3>¿Pueden los usuarios traer su reputación de lnp2pBot u otro Mostro?</h3>
      <p>Sí, si confías en la fuente. Activa la importación de reputación y agrega la clave de lnp2pBot, o la de un nodo Mostro en el que confíes (4.13). También puedes permitir que tus usuarios exporten la reputación que ganaron en tu nodo.</p>

      <h3>¿Puedo ejecutar múltiples instancias de Mostro?</h3>
      <p>Sí, pero cada una necesita su propio par de claves Nostr, nodo LND (o al menos canales/liquidez separados), y configuración.</p>

      <h3>¿Es legal?</h3>
      <p>Depende mucho de tu jurisdicción. Mostro es software para trading peer-to-peer. En algunas jurisdicciones, operar un exchange P2P puede requerir licencias. <strong>Consulta las regulaciones locales y asesoría legal.</strong></p>

      <h3>¿Cuánto ancho de banda usa Mostro?</h3>
      <p>Muy poco — principalmente eventos Nostr pequeños. Unos pocos GB por mes es típico incluso con volumen moderado.</p>

      <h3>¿Qué pasa si mi nodo se desconecta?</h3>
      <p>Las órdenes pendientes eventualmente expiran. Las operaciones activas con fondos bloqueados continúan cuando vuelves a estar online. Si estás offline demasiado tiempo, los usuarios pueden perder confianza. Desde v0.18.3 también hay un plazo límite para el escrow: si el nodo queda caído lo suficiente para que el hold invoice se acerque a su horizonte CLTV, LND lo cancela y el vendedor recibe el reembolso automáticamente. Si es tu LND el que se desincroniza mientras Mostro sigue corriendo, los pagos esperan en lugar de fallar y, pasados 10 minutos, el nodo entra en mantenimiento por su cuenta hasta que LND se recupere (5.4).</p>

      <h3>¿Puedo cambiar mi clave Nostr después?</h3>
      <p>Puedes, pero perderás la identidad y reputación de tu nodo. Los usuarios lo verán como un Mostro nuevo. Trata tu clave como tu identidad de marca.</p>

      <h3>¿Puedo perder dinero ejecutando un nodo Mostro?</h3>
      <p>Sí, es posible: los fondos de canales Lightning podrían estar en riesgo por bugs (raro); el cierre forzado de canales durante períodos de comisiones altas puede ser costoso; los costos de VPS son continuos.</p>

      <h3>¿La liquidez Lightning está "en riesgo"?</h3>
      <p>Tu liquidez Lightning es tuya. No está en riesgo por Mostro en sí — las hold invoices son bloqueos temporales. Sin embargo, aplican los riesgos estándar de Lightning Network (cierres forzados, canales atascados, bugs).</p>

      <h3>¿Cuándo alcanzaré el punto de equilibrio?</h3>
      <p>Depende de tus costos y volumen de operaciones. Con $20/mes de costos y 0.6% de comisión, necesitas ~$5,000/mes en operaciones para cubrir costos (antes de la comisión de desarrollo). La mayoría de las comunidades tardan 3–6 meses en alcanzar un volumen significativo.</p>

      <h3>¿Puedo mover Mostro a otro nodo Lightning?</h3>
      <p>Sí, pero no editando la configuración y reiniciando. El escrow está ligado al nodo que lo creó, así que primero se drena en modo mantenimiento, y el daemon se niega a arrancar si te lo salteas. Mover el mismo nodo a otro host no es un cambio de nodo y no necesita nada especial. Mira 5.8.</p>`,
    },
    'security': {
      title: `8. Consideraciones de Seguridad`,
      nav: `8. Seguridad`,
      navShort: `8. Seguridad`,
      html: `      <div class="callout important">
        <div class="callout-title">⚠️ Aviso de software en etapa temprana</div>
        <p><strong>Mostro está en una etapa temprana de desarrollo.</strong> Aunque el equipo trabaja duro para asegurar confiabilidad, puede haber bugs no descubiertos — incluyendo bugs de seguridad que podrían resultar en pérdida de fondos. <strong>Los desarrolladores no son responsables de ninguna pérdida de dinero debido a bugs de software.</strong></p>
        <p>Mostro es open-source y su código está abierto a auditorías. Animamos a las comunidades a promover y financiar auditorías de seguridad independientes.</p>
        <p>Dicho esto, <strong>el mecanismo central de custodia usando hold invoices de Lightning ha sido probado en batalla desde 2021</strong>, cuando @lnp2pBot implementó por primera vez este tipo de custodia. Miles de operaciones han sido completadas exitosamente.</p>
      </div>

      <h3>Mantén la Clave de tu Nodo Fuera de Alcance</h3>

      <p>Tu <code>nsec_privkey</code> es la identidad de tu nodo, y cualquiera que la tenga puede suplantar a tu Mostro. Prefiere pasarla por la variable de entorno <code>MOSTRO_NSEC_PRIVKEY</code> o por un archivo <code>.env</code> con <code>chmod 600</code> antes que dejarla en <code>settings.toml</code> (ver 4.1). Tampoco la lleves en una laptop para atender disputas: registra una clave de solver aparte para eso (ver 5.2).</p>

      <h3>Operando bajo regímenes autoritarios</h3>

      <p>Si operas en un país con un gobierno autoritario, <strong>la privacidad no es opcional — es un requisito de seguridad.</strong></p>

      <ol>
        <li><strong>Ejecuta tu nodo Mostro detrás de Tor y/o una VPN.</strong> Esto oculta la IP de tu servidor de los relays Nostr.</li>
        <li><strong>Si Tor/VPN no es posible</strong> (común en países en desarrollo con internet lento), <strong>solo publica eventos en relays que poseas o en los que confíes.</strong></li>
        <li><strong>Ten mucho cuidado con qué relays usas.</strong> En el futuro, los gobiernos podrían crear relays Nostr específicamente para recolectar direcciones IP.</li>
        <li><strong>Considera también la privacidad de tu nodo Lightning.</strong> Ejecutar LND detrás de Tor es posible y recomendado en entornos sensibles. Tu evento de info publica la pubkey de LND y las direcciones que anuncia, así que haz que LND anuncie solo direcciones Tor.</li>
        <li><strong>Sabe qué publica tu nodo.</strong> El evento de salud (5.4) es público: estado, altura de bloque de LND y red, versión de Mostro. Configurar un <code>watchdog_pubkey</code> agrega una etiqueta que vincula tu nodo con esa clave. Desactívalo con <code>[health] enabled = false</code> si eso te importa más que el monitoreo.</li>
        <li><strong>Las variables de proxy no bastan.</strong> Las consultas de direcciones Lightning ignoran deliberadamente <code>HTTP_PROXY</code>/<code>HTTPS_PROXY</code>. Para ocultar la IP del servidor, enruta toda la máquina por Tor o una VPN.</li>
      </ol>

      <div class="callout tip">
        <div class="callout-title">💡 Consejo</div>
        <p>La belleza de que Mostro sea descentralizado es que incluso si un nodo es apagado, otros siguen funcionando. Pero la prevención siempre es mejor que la recuperación. Toma la privacidad en serio desde el primer día.</p>
      </div>`,
    },
    'troubleshooting': {
      title: `9. Solución de Problemas`,
      nav: `9. Solución de problemas`,
      navShort: `9. Problemas`,
      html: `      <h3>Mostro no arranca</h3>

      <h4><code>dev_fee_percentage (0.05) is below minimum (0.1)</code></h4>
      <p>Establece <code>dev_fee_percentage</code> en al menos <code>0.10</code> en settings.toml.</p>

      <h4>Archivo de configuración o base de datos no encontrado</h4>
      <p>Asegúrate de que el flag <code>-d</code> apunte al directorio que contiene <code>settings.toml</code>. Para Docker Hub: verifica que <code>~/mostro-config/settings.toml</code> exista.</p>

      <h4>Mostro termina al arrancar con <code>Ln node error</code></h4>
      <ul>
        <li>Verifica que LND esté ejecutándose: <code>lncli getinfo</code></li>
        <li>Revisa que <code>lnd_grpc_host</code> coincida con la dirección de tu LND</li>
        <li>Verifica que las rutas de <code>tls.cert</code> y <code>mostro.macaroon</code> sean correctas</li>
        <li>Verifica que el macaroon tenga los permisos de 2.2</li>
        <li>Docker + LND en el host: usa <code>host.docker.internal</code>. La Opción B además necesita el mapeo <code>extra_hosts</code>.</li>
      </ul>

      <h4><code>REFUSING TO START: Lightning node changed</code></h4>
      <p>Mostro apunta a una identidad LND distinta mientras hay escrow abierto en la anterior. Reconecta el nodo viejo y dr&eacute;nalo antes de cambiar. Mira 5.8.</p>

      <h4><code>transport = "gift-wrap" (protocol v1) is no longer supported</code></h4>
      <p>Borra la línea <code>transport</code> de <code>settings.toml</code>. Mira 4.8.</p>

      <h4><code>escrow_deadline_margin_blocks (X) must be at least 18 ...</code> o <code>... must be below hold_invoice_cltv_delta</code></h4>
      <p>Configura el margen entre 18 y <code>hold_invoice_cltv_delta</code>; el 24 de la plantilla con 144 funciona. Mira 4.9.</p>

      <h4><code>unknown field mint_url</code></h4>
      <p>En <code>[cashu]</code>, renómbrala a <code>mint_urls = ["..."]</code>. Mira 4.11.</p>

      <h4><code>anti_abuse_bond.bond_cltv_delta ... must be above hold_invoice_cltv_delta + 144</code> o <code>... must be at most 864</code></h4>
      <p>Configura <code>bond_cltv_delta</code> explícitamente dentro de esos límites. En v0.20.2, las fianzas más un <code>hold_invoice_cltv_delta</code> de 288 o más chocan con esto con el valor por defecto. Mira 4.11.</p>

      <h4><code>REFUSING TO START: serbero_pubkey ...</code></h4>
      <p>La clave de Serbero ya es un solver read-write, pertenece a un usuario, o es la clave propia de tu nodo. Dale a Serbero una clave propia. Mira 5.10.</p>

      <h4>Los ajustes de reputación impiden el arranque</h4>
      <p>Los nombres de emisor deben ser únicos y cada clave válida y listada una sola vez; la clave de un emisor nunca debe pasar a otro nombre una vez que tiene importaciones. Con la exportación activada, <code>MOSTRO_REPUTATION_ISSUER_SK</code> debe estar definida, ser válida, distinta de la clave de tu nodo y no estar en tu propia lista de importación. Mira 4.13.</p>

      <h4>Los clientes no ven mis órdenes o no pueden escribirle a mi nodo</h4>
      <p>Tu nodo habla solo protocolo v2. Un usuario con un cliente viejo que solo habla protocolo v1 no recibe respuesta y debe actualizar (4.8). Revisa también que los clientes y tu nodo compartan al menos un relay.</p>

      <h4>Los pagos fallan con "no route"</h4>
      <p>Revisa <code>payment_cltv_limit</code>. Debe estar al menos 576 bloques por encima de <code>max_final_cltv_expiry_delta</code> y no debe superar el <code>--max-cltv-expiry</code> de tu LND. Mira 4.9.</p>

      <h3>Problemas de conexión</h3>

      <h4>Mostro arranca pero no se conecta a los relays</h4>
      <ul>
        <li>Verifica las URLs de los relays (deben empezar con <code>wss://</code>)</li>
        <li>Asegúrate de que el firewall de tu VPS permita conexiones salientes en el puerto 443</li>
        <li>Prueba con diferentes relays — algunos pueden estar temporalmente caídos</li>
      </ul>

      <h3>Problemas con operaciones</h3>

      <h4>Un usuario recibe "cant-do: too_many_requests" al restaurar sesión</h4>
      <p>Esto ocurre cuando el usuario tiene más órdenes (históricas + activas) que el valor de <code>max_orders_per_response</code> en tu configuración. El cliente intenta consultar todas sus órdenes de golpe y Mostro lo rechaza. <strong>No es un ban ni un bloqueo temporal</strong> — le seguirá pasando hasta que ajustes el valor.</p>
      <pre><code># En settings.toml, sube el límite:
max_orders_per_response = 50  # el default es 10, el máximo 255
</code></pre>

      <p>El valor se guarda en un solo byte, así que <code>255</code> es el techo. Si un usuario tiene más órdenes que eso, tiene que depurar su historial en lugar de que tú sigas subiendo el límite.</p>

      <h4>Las órdenes no aparecen en los clientes</h4>
      <ul>
        <li>Verifica las conexiones a relays en los logs</li>
        <li>Asegúrate de que los clientes usen los mismos relays que tu nodo</li>
      </ul>

      <h4>Pagos fallando</h4>
      <ul>
        <li>Revisa la liquidez: <code>lncli listchannels</code></li>
        <li>Asegúrate de tener suficiente capacidad saliente</li>
        <li>Revisa el ajuste <code>max_routing_fee</code></li>
      </ul>

      <h4>Los pagos no salen, pero no hay ningún error</h4>
      <p>Revisa si LND está sincronizado: <code>lncli getinfo</code>. Mientras no lo esté, Mostro retiene los pagos a propósito y los reenvía cuando LND se recupera (5.4).</p>

      <h4>Los usuarios reciben rechazos por "mantenimiento" aunque nunca lo activé</h4>
      <p><code>mostro-cli admmaintenancestatus</code> muestra el motivo. <code>lnd_unsynced</code> significa que Mostro lo activó porque LND se desincronizó; lo levanta solo 5 minutos después de que LND vuelve a estar sincronizado (5.4).</p>

      <h4>Nunca se pagan los dev fees</h4>
      <p>En testnet, signet o regtest es lo esperado: los dev fees se pagan solo en mainnet (4.2).</p>

      <h4>Se rechazan las órdenes a precio de mercado en una moneda</h4>
      <p>Tu nodo no tiene tasa para ella. Revisa las advertencias <code>price:</code> en el log de arranque: un bloque <code>[price]</code> sin ninguna fuente de mercado habilitada, o una stablecoin cotizada pero no listada en <code>fiat_currencies_accepted</code>, son las causas habituales. Mira 4.10 y 4.12.</p>

      <h3>Problemas de base de datos</h3>

      <h4>Errores de base de datos bloqueada</h4>
      <pre><code>ps aux | grep mostrod
# Si hay múltiples procesos, elimina los extras:
kill &lt;PID&gt;</code></pre>

      <h3>Obteniendo ayuda</h3>

      <ol>
        <li><strong>Revisa los logs primero</strong> — la mayoría de los errores explican qué salió mal</li>
        <li><strong>Telegram (Desarrolladores):</strong> <a href="https://t.me/mostro_dev" target="_blank" rel="noopener noreferrer">@mostro_dev</a></li>
        <li><strong>Telegram (Comunidad):</strong> <a href="https://t.me/MostroP2P" target="_blank" rel="noopener noreferrer">@MostroP2P</a></li>
        <li><strong>GitHub Issues:</strong> <a href="https://github.com/MostroP2P/mostro/issues" target="_blank" rel="noopener noreferrer">github.com/MostroP2P/mostro/issues</a></li>
        <li><strong>DeepWiki:</strong> <a href="https://deepwiki.com/MostroP2P/mostro" target="_blank" rel="noopener noreferrer">deepwiki.com/MostroP2P/mostro</a></li>
      </ol>

      <p>Cuando pidas ayuda, siempre incluye: tu versión de Mostro, la salida relevante de los logs, y lo que ya intentaste.</p>

      <!-- ===== APPENDIX ===== -->`,
    },
    'appendix': {
      title: `Apéndice: Referencia Rápida`,
      nav: `Apéndice`,
      html: `      <h3>Ubicaciones importantes de archivos</h3>
      <table class="guide-table">
        <thead><tr><th>Archivo</th><th>Docker Hub</th><th>Nativo</th></tr></thead>
        <tbody>
          <tr><td>Configuración</td><td><code>~/mostro-config/settings.toml</code></td><td><code>/opt/mostro/settings.toml</code></td></tr>
          <tr><td>Base de datos</td><td><code>~/mostro-config/mostro.db</code></td><td><code>/opt/mostro/mostro.db</code></td></tr>
          <tr><td>Cert LND</td><td><code>~/mostro-config/lnd/tls.cert</code></td><td>Varía (revisar config LND)</td></tr>
          <tr><td>Macaroon LND</td><td><code>~/mostro-config/lnd/mostro.macaroon</code></td><td>Varía (revisar config LND)</td></tr>
          <tr><td>Servicio</td><td>N/A</td><td><code>/etc/systemd/system/mostro.service</code></td></tr>
          <tr><td>Logs</td><td><code>docker logs -f mostro</code></td><td><code>journalctl -u mostro</code></td></tr>
        </tbody>
      </table>

      <h3>Comandos esenciales</h3>
      <pre><code># Docker
docker logs -f mostro         # Ver logs
docker restart mostro          # Reiniciar
docker stop mostro             # Detener

# Nativo (systemd)
systemctl start mostro         # Iniciar
systemctl stop mostro          # Detener
systemctl restart mostro       # Reiniciar
systemctl status mostro        # Ver estado
journalctl -u mostro -f        # Ver logs

# Base de datos
sqlite3 mostro.db "SELECT COUNT(*) FROM orders;"                           # Total de órdenes
sqlite3 mostro.db "SELECT COUNT(*) FROM orders WHERE status='success';"    # Operaciones exitosas
sqlite3 mostro.db "SELECT SUM(fee*2 - COALESCE(dev_fee, 0)) FROM orders WHERE status='success';"  # Comisiones netas que conserva el nodo</code></pre>

      <h3>Configuración recomendada para nodos nuevos</h3>
      <pre><code>[mostro]
fee = 0.006
max_order_amount = 500000
min_payment_amount = 1000
expiration_hours = 24
expiration_seconds = 900
pow = 0
dev_fee_percentage = 0.30
fiat_currencies_accepted = ['USD']  # Cambia a tu moneda local

[nostr]
relays = [
  'wss://relay.mostro.network',
  'wss://nos.lol',
  'wss://relay.nostr.band'
]</code></pre>`,
    },
  },
};

export default es;
