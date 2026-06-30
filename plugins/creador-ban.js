const handler = async (m, { conn, usedPrefix, command }) => {
  const quien = m.mentionedJid?.[0] || m.quoted?.sender

  if (!quien) return m.reply([
    `╔══〔 🌼 *THEELY-MD — BAN* 〕══╗`,
    `║`,
    `║ 💡 *Uso:*`,
    `║ ${usedPrefix}ban @usuario`,
    `║ O responde a un mensaje~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  if (!global.db.data.users[quien]) {
    global.db.data.users[quien] = { coin: 0, exp: 0, registered: false }
  }

  if (global.db.data.users[quien].banned) return m.reply([
    `╔══〔 🌼 *THEELY-MD — BAN* 〕══╗`,
    `║`,
    `║ ⚠️ @${quien.split('@')[0]} ya está`,
    `║ baneado del bot~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'), null, { mentions: [quien] })

  global.db.data.users[quien].banned       = true
  global.db.data.users[quien].bannedReason = 'Baneado por el owner'
  await global.db.write()

  await m.react('🔨')
  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — BAN* 〕══╗`,
      `║`,
      `║ 🔨 *¡Usuario baneado!*`,
      `║`,
      `║ 🚫 @${quien.split('@')[0]}`,
      `║ Ya no puede usar comandos`,
      `║ del bot en ningún chat~`,
      `║`,
      `║ 💡 *${usedPrefix}unban* para revertir`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'),
    mentions: [quien]
  }, { quoted: m })
}

handler.help    = ['ban @usuario']
handler.tags    = ['creador']
handler.command = ['ban', 'banear']
handler.rowner  = true
handler.desc    = 'Banea a un usuario globalmente del bot'

export default handler
