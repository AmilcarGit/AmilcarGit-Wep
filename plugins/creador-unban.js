const handler = async (m, { conn, usedPrefix, command }) => {
  const quien = m.mentionedJid?.[0] || m.quoted?.sender

  if (!quien) return m.reply([
    `╔══〔 🌼 *THEELY-MD — UNBAN* 〕══╗`,
    `║`,
    `║ 💡 *Uso:*`,
    `║ ${usedPrefix}unban @usuario`,
    `║ O responde a un mensaje~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const user = global.db.data.users[quien]

  if (!user || !user.banned) return m.reply([
    `╔══〔 🌼 *THEELY-MD — UNBAN* 〕══╗`,
    `║`,
    `║ ⚠️ @${quien.split('@')[0]} no está`,
    `║ baneado del bot~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'), null, { mentions: [quien] })

  global.db.data.users[quien].banned       = false
  global.db.data.users[quien].bannedReason = ''
  await global.db.write()

  await m.react('✅')
  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — UNBAN* 〕══╗`,
      `║`,
      `║ ✅ *¡Usuario desbaneado!*`,
      `║`,
      `║ 🟢 @${quien.split('@')[0]}`,
      `║ Ya puede usar comandos`,
      `║ del bot nuevamente~`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'),
    mentions: [quien]
  }, { quoted: m })
}

handler.help    = ['unban @usuario']
handler.tags    = ['creador']
handler.command = ['unban', 'desbanear']
handler.rowner  = true
handler.desc    = 'Desbanea a un usuario'

export default handler
