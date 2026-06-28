const COFRES = [
  { nombre: 'Carbón',    emoji: '🪨', min: 5,   max: 30,  prob: 40 },
  { nombre: 'Monedas',   emoji: '💰', min: 50,  max: 150, prob: 30 },
  { nombre: 'Gemas',     emoji: '💜', min: 150, max: 300, prob: 15 },
  { nombre: 'Oro',       emoji: '🥇', min: 300, max: 500, prob: 10 },
  { nombre: 'Diamantes', emoji: '💎', min: 500, max: 800, prob: 4  },
  { nombre: 'Cristal Ely',emoji:'🌼', min: 800, max: 999, prob: 1  },
]

const COOLDOWN = 8 * 60 * 60 * 1000

function elegirRecompensa() {
  const total = COFRES.reduce((a, b) => a + b.prob, 0)
  const rand  = Math.random() * total
  let acum    = 0
  for (const c of COFRES) {
    acum += c.prob
    if (rand <= acum) return c
  }
  return COFRES[0]
}

const handler = async (m, { conn }) => {
  const user   = global.db.data.users[m.sender]
  const moneda = global.moneda || 'coins'
  const ahora  = Date.now()
  const ultimo = user.lastcofre || 0
  const espera = COOLDOWN - (ahora - ultimo)

  if (espera > 0) {
    const h   = Math.floor(espera / 3600000)
    const min = Math.floor((espera % 3600000) / 60000)
    return m.reply([
      `╔══〔 🌼 *THEELY-MD — COFRE* 〕══╗`,
      `║`,
      `║ ⏳ *Cofre en recarga~*`,
      `║`,
      `║ 🕐 *Disponible en:*`,
      `║ ${String(h).padStart(2,'0')}h ${String(min).padStart(2,'0')}m`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))
  }

  const recompensa = elegirRecompensa()
  const ganancia   = Math.floor(Math.random() * (recompensa.max - recompensa.min + 1)) + recompensa.min

  user.coin      = (user.coin || 0) + ganancia
  user.lastcofre = ahora

  await m.react('🎁')
  await m.reply([
    `╔══〔 🌼 *THEELY-MD — COFRE* 〕══╗`,
    `║`,
    `║ 🎁 *¡Cofre abierto!*`,
    `║`,
    `║ ${recompensa.emoji} *${recompensa.nombre}*`,
    `║ 💰 *+${ganancia}* ${moneda}`,
    `║`,
    `║ 👛 *Saldo:* ${user.coin} ${moneda}`,
    `║ ⏰ Vuelve en 8 horas~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))
}

handler.help     = ['cofre']
handler.tags     = ['eco']
handler.command  = ['cofre', 'chest', 'caja']
handler.register = true
handler.desc     = 'Abre un cofre de recompensas cada 8h'
export default handler
