const handler = async (m, { conn, text }) => {
  const delay = (ms) => new Promise(res => setTimeout(res, ms))
  const pesan = m.quoted?.text || text

  if (!pesan) return m.reply([
    `╔══〔 🌼 *THEELY-MD — BROADCAST* 〕══╗`,
    `║`,
    `║ 💡 *Uso:*`,
    `║ .bcgc <mensaje>`,
    `║ O responde a un mensaje~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  await m.react('📢')

  const getGroups = await conn.groupFetchAllParticipating()
  const groups    = Object.entries(getGroups).map(([id, data]) => data.id)

  await m.reply([
    `╔══〔 🌼 *THEELY-MD — BROADCAST* 〕══╗`,
    `║`,
    `║ 📢 *Enviando mensaje...*`,
    `║ 👥 *Grupos:* ${groups.length}`,
    `║ ⏳ Por favor espera~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  let enviados  = 0
  let fallidos  = 0

  for (const id of groups) {
    await delay(500)
    try {
      await conn.sendMessage(id, {
        text: [
          `╔══〔 🌼 *THEELY-MD — BROADCAST* 〕══╗`,
          `║`,
          `║ 📢 *Mensaje oficial~*`,
          `║`,
          pesan,
          `║`,
          `║ 💫 *Powered by TheEly-MD 🌼*`,
          `╚══════════════════════════════════╝`
        ].join('\n')
      })
      enviados++
    } catch {
      fallidos++
    }
  }

  await m.react('✅')
  await m.reply([
    `╔══〔 🌼 *THEELY-MD — BROADCAST* 〕══╗`,
    `║`,
    `║ ✅ *¡Broadcast completado!*`,
    `║`,
    `║ 📨 *Enviados:* ${enviados}`,
    `║ ❌ *Fallidos:* ${fallidos}`,
    `║ 👥 *Total:*    ${groups.length}`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))
}

handler.help    = ['bcgc <mensaje>']
handler.tags    = ['creador']
handler.command = ['bcgc', 'broadcastgroup']
handler.owner   = true
handler.desc    = 'Envía un mensaje a todos los grupos'

export default handler
