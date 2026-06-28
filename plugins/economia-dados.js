const handler = async (m, { conn, args }) => {
  const user    = global.db.data.users[m.sender]
  const moneda  = global.moneda || 'coins'
  const apuesta = parseInt(args[0])

  if (!apuesta || apuesta <= 0) return m.reply([
    `╔══〔 🌼 *THEELY-MD — DADOS* 〕══╗`,
    `║`,
    `║ 🎲 *Uso:* .dados <apuesta>`,
    `║ 📌 Ejemplo: .dados 150`,
    `║`,
    `║ 💡 *Reglas:*`,
    `║ 🎲 Tú vs el Bot`,
    `║ Mayor número gana~`,
    `║ Empate → devuelve apuesta`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  if ((user.coin || 0) < apuesta) return m.reply([
    `╔══〔 🌼 *THEELY-MD — DADOS* 〕══╗`,
    `║`,
    `║ ❌ *Saldo insuficiente~*`,
    `║ 👛 Tienes: ${user.coin || 0} ${moneda}`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const CARAS = ['⚀','⚁','⚂','⚃','⚄','⚅']
  const dadoTu  = Math.floor(Math.random() * 6) + 1
  const dadoBot = Math.floor(Math.random() * 6) + 1

  let resultado, emoji
  if (dadoTu > dadoBot) {
    user.coin += apuesta
    resultado  = `🎉 *¡Ganaste!*\n║ 💰 *+${apuesta}* ${moneda}`
    emoji      = '🎉'
  } else if (dadoTu < dadoBot) {
    user.coin -= apuesta
    resultado  = `😢 *¡Perdiste!*\n║ 💸 *-${apuesta}* ${moneda}`
    emoji      = '😢'
  } else {
    resultado  = `🤝 *¡Empate!*\n║ 💰 Apuesta devuelta`
    emoji      = '🤝'
  }

  await m.react(emoji)
  await m.reply([
    `╔══〔 🌼 *THEELY-MD — DADOS* 〕══╗`,
    `║`,
    `║ 🎲 *¡A rodar los dados!*`,
    `║`,
    `║ 👤 *Tú:*  ${CARAS[dadoTu - 1]} (${dadoTu})`,
    `║ 🤖 *Bot:* ${CARAS[dadoBot - 1]} (${dadoBot})`,
    `║`,
    `║ ${resultado}`,
    `║ 👛 *Saldo:* ${user.coin} ${moneda}`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))
}

handler.help     = ['dados <apuesta>']
handler.tags     = ['eco']
handler.command  = ['dados', 'dice', 'dado']
handler.register = true
handler.desc     = 'Juega a los dados contra el bot'
export default handler
