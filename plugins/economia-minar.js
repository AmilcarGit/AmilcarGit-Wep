const MINERALES = [
  { nombre: 'Carbón',     emoji: '🪨', min: 10,  max: 50,  prob: 40 },
  { nombre: 'Hierro',     emoji: '⚙️',  min: 30,  max: 80,  prob: 30 },
  { nombre: 'Oro',        emoji: '🥇', min: 80,  max: 150, prob: 15 },
  { nombre: 'Esmeralda',  emoji: '💚', min: 150, max: 250, prob: 10 },
  { nombre: 'Diamante',   emoji: '💎', min: 300, max: 500, prob: 4  },
  { nombre: 'Cristal Ely',emoji: '🌼', min: 600, max: 999, prob: 1  },
]

const EVENTOS = [
  '⛏️ Excavaste profundo y encontraste',
  '🪨 Rompiste una roca y descubriste',
  '🔦 Tu linterna iluminó un depósito de',
  '💥 Una explosión reveló un filón de',
  '🌋 Las profundidades te regalaron',
]

const COOLDOWN = 30 * 60 * 1000

function elegirMineral() {
  const rand = Math.random() * 100
  let acum   = 0
  for (const m of MINERALES) {
    acum += m.prob
    if (rand <= acum) return m
  }
  return MINERALES[0]
}

const handler = async (m, { conn }) => {
  const user   = global.db.data.users[m.sender]
  const moneda = global.moneda || 'coins'
  const ahora  = Date.now()
  const ultimo = user.lastmining || 0
  const espera = COOLDOWN - (ahora - ultimo)

  if (espera > 0) {
    const min = Math.floor(espera / 60000)
    const s   = Math.floor((espera % 60000) / 1000)
    return m.reply([
      `╔══〔 🌼 *THEELY-MD — MINA* 〕══╗`,
      `║`,
      `║ ⏳ *La mina está en descanso~*`,
      `║`,
      `║ 🕐 *Disponible en:*`,
      `║ ${String(min).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))
  }

  const mineral  = elegirMineral()
  const evento   = EVENTOS[Math.floor(Math.random() * EVENTOS.length)]
  const ganancia = Math.floor(Math.random() * (mineral.max - mineral.min + 1)) + mineral.min

  user.coin       = (user.coin || 0) + ganancia
  user.lastmining = ahora

  await m.react('⛏️')
  await m.reply([
    `╔══〔 🌼 *THEELY-MD — MINA* 〕══╗`,
    `║`,
    `║ ⛏️ *¡Minería completada!*`,
    `║`,
    `║ ${evento}`,
    `║ ${mineral.emoji} *${mineral.nombre}*`,
    `║`,
    `║ 💰 *+${ganancia}* ${moneda}`,
    `║ 👛 *Billetera:* ${user.coin} ${moneda}`,
    `║`,
    `║ ⏰ Vuelve en 30 minutos~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))
}

handler.help     = ['minar']
handler.tags     = ['eco']
handler.command  = ['minar', 'mina', 'mine']
handler.register = true
handler.desc     = 'Mina minerales para ganar monedas'

export default handler
