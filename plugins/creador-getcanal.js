const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply([
    `╔══〔 🌼 *THEELY-MD — CANAL* 〕══╗`,
    `║`,
    `║ 💡 *Uso:*`,
    `║ ${usedPrefix + command} <link del canal>`,
    `║`,
    `║ 📌 *Ejemplo:*`,
    `║ ${usedPrefix + command} https://whatsapp.com/channel/...`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  try {
    const info = await conn.newsletterInfo(text.trim())
    const id   = info?.id || info?.jid || 'No encontrado'
    const name = info?.name || info?.subject || 'Sin nombre'

    await m.reply([
      `╔══〔 🌼 *THEELY-MD — CANAL* 〕══╗`,
      `║`,
      `║ ✅ *Canal encontrado~*`,
      `║`,
      `║ 📛 *Nombre:* ${name}`,
      `║ 🆔 *ID:* ${id}`,
      `║`,
      `║ 💡 Copia el ID para tu config.js`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))

  } catch (e) {
    m.reply([
      `╔══〔 🌼 *THEELY-MD — CANAL* 〕══╗`,
      `║`,
      `║ ❌ *No se pudo obtener el canal~*`,
      `║ ${e.message.slice(0, 80)}`,
      `║`,
      `║ 💡 Verifica que el link sea válido`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))
  }
}

handler.help     = ['getcanal <link>']
handler.tags     = ['owner']
handler.command  = ['getcanal', 'canalid', 'newsletterid']
handler.rowner   = true
handler.desc     = 'Obtiene el ID interno de un canal de WhatsApp'

export default handler
