const COOLDOWN = 2 * 60 * 60 * 1000

const handler = async (m, { conn }) => {
  const user   = global.db.data.users[m.sender]
  const moneda = global.moneda || 'coins'
  const quien  = m.mentionedJid?.[0] || m.quoted?.sender

  if (!quien) return m.reply([
    `╔══〔 🌼 *THEELY-MD — ROBAR* 〕══╗`,
    `║`,
    `║ 💡 *Uso:*`,
    `║ .robar @usuario`,
    `║ O responde a un mensaje~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  if (quien === m.sender) return m.reply([
    `╔══〔 🌼 *THEELY-MD — ROBAR* 〕══╗`,
    `║`,
    `║ ❌ No puedes robarte a ti mismo~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const ahora  = Date.now()
  const ultimo = user.lastcrime || 0
  const espera = COOLDOWN - (ahora - ultimo)

  if (espera > 0) {
    const h   = Math.floor(espera / 3600000)
    const min = Math.floor((espera % 3600000) / 60000)
    return m.reply([
      `╔══〔 🌼 *THEELY-MD — ROBAR* 〕══╗`,
      `║`,
      `║ ⏳ *Estás en reposo~*`,
      `║`,
      `║ 🕐 *Disponible en:*`,
      `║ ${String(h).padStart(2,'0')}h ${String(min).padStart(2,'0')}m`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))
  }

  const victima = global.db.data.users[quien]
  if (!victima || (victima.coin || 0) <= 0) return m.reply([
    `╔══〔 🌼 *THEELY-MD — ROBAR* 〕══╗`,
    `║`,
    `║ ❌ Esa persona no tiene monedas~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  user.lastcrime = ahora
  const exito    = Math.random() < 0.45

  if (exito) {
    const max     = Math.floor((victima.coin || 0) * 0.3)
    const robado  = Math.max(1, Math.floor(Math.random() * max))
    victima.coin -= robado
    user.coin     = (user.coin || 0) + robado

    await m.react('🦹')
    await conn.sendMessage(m.chat, {
      text: [
        `╔══〔 🌼 *THEELY-MD — ROBAR* 〕══╗`,
        `║`,
        `║ 🦹 *¡Robo exitoso!*`,
        `║`,
        `║ 😈 Robaste a @${quien.split('@')[0]}`,
        `║ 💰 *+${robado}* ${moneda}`,
        `║`,
        `║ 👛 *Saldo:* ${user.coin} ${moneda}`,
        `║`,
        `╚══════════════════════════════════╝`
      ].join('\n'),
      mentions: [quien]
    }, { quoted: m })

  } else {
    const multa  = Math.floor(Math.random() * 100) + 50
    user.coin    = Math.max(0, (user.coin || 0) - multa)

    await m.react('🚔')
    await conn.sendMessage(m.chat, {
      text: [
        `╔══〔 🌼 *THEELY-MD — ROBAR* 〕══╗`,
        `║`,
        `║ 🚔 *¡Te atraparon!*`,
        `║`,
        `║ 👮 Intentaste robar a @${quien.split('@')[0]}`,
        `║ 💸 *Multa:* -${multa} ${moneda}`,
        `║`,
        `║ 👛 *Saldo:* ${user.coin} ${moneda}`,
        `║`,
        `╚══════════════════════════════════╝`
      ].join('\n'),
      mentions: [quien]
    }, { quoted: m })
  }
}

handler.help     = ['robar @usuario']
handler.tags     = ['eco']
handler.command  = ['robar', 'steal', 'rob']
handler.register = true
handler.desc     = 'Intenta robar monedas a otro usuario'
export default handler
