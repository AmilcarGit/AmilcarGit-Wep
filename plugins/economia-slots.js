const SIMBOLOS = ['🍒','🍋','🍊','🍇','⭐','💎','🌼']
const PESOS    = [30,  25,  20,  12,  8,   4,   1  ]

function girar() {
  const total = PESOS.reduce((a, b) => a + b, 0)
  const rand  = Math.random() * total
  let acum    = 0
  for (let i = 0; i < SIMBOLOS.length; i++) {
    acum += PESOS[i]
    if (rand <= acum) return SIMBOLOS[i]
  }
  return SIMBOLOS[0]
}

const MULTIPLICADORES = {
  '🌼': 50, '💎': 20, '⭐': 10,
  '🍇': 5,  '🍊': 3,  '🍋': 2, '🍒': 1.5
}

const handler = async (m, { conn, args }) => {
  const user   = global.db.data.users[m.sender]
  const moneda = global.moneda || 'coins'
  const apuesta = parseInt(args[0])

  if (!apuesta || apuesta <= 0) return m.reply([
    `╔══〔 🌼 *THEELY-MD — SLOTS* 〕══╗`,
    `║`,
    `║ 🎰 *Uso:* .slots <apuesta>`,
    `║ 📌 Ejemplo: .slots 100`,
    `║`,
    `║ 💡 *Multiplicadores:*`,
    `║ 🌼 x50 | 💎 x20 | ⭐ x10`,
    `║ 🍇 x5  | 🍊 x3  | 🍋 x2`,
    `║ 🍒 x1.5`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  if ((user.coin || 0) < apuesta) return m.reply([
    `╔══〔 🌼 *THEELY-MD — SLOTS* 〕══╗`,
    `║`,
    `║ ❌ *Saldo insuficiente~*`,
    `║ 👛 Tienes: ${user.coin || 0} ${moneda}`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const r1 = girar(), r2 = girar(), r3 = girar()
  user.coin -= apuesta

  let resultado = ''
  let ganancia  = 0

  if (r1 === r2 && r2 === r3) {
    const mult = MULTIPLICADORES[r1] || 1.5
    ganancia   = Math.floor(apuesta * mult)
    user.coin += ganancia
    resultado  = `🎉 *¡JACKPOT! Triple ${r1}*\n║ 💰 *+${ganancia}* ${moneda} (x${mult})`
    await m.react('🎉')
  } else if (r1 === r2 || r2 === r3 || r1 === r3) {
    ganancia   = Math.floor(apuesta * 1.5)
    user.coin += ganancia
    resultado  = `✅ *¡Par ganador!*\n║ 💰 *+${ganancia}* ${moneda} (x1.5)`
    await m.react('✅')
  } else {
    resultado = `❌ *Sin suerte~*\n║ 💸 *-${apuesta}* ${moneda}`
    await m.react('❌')
  }

  await m.reply([
    `╔══〔 🌼 *THEELY-MD — SLOTS* 〕══╗`,
    `║`,
    `║ 🎰  [ ${r1} | ${r2} | ${r3} ]`,
    `║`,
    `║ ${resultado}`,
    `║ 👛 *Saldo:* ${user.coin} ${moneda}`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))
}

handler.help     = ['slots <apuesta>']
handler.tags     = ['eco']
handler.command  = ['slots', 'tragamonedas']
handler.register = true
handler.desc     = 'Juega a las tragamonedas'
export default handler
