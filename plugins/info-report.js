const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text && !m.quoted) return m.reply([
    `╔══〔 🌼 *THEELY-MD — REPORT* 〕══╗`,
    `║`,
    `║ 💡 *Uso:*`,
    `║ ${usedPrefix + command} <descripción del problema>`,
    `║`,
    `║ 📌 *Ejemplo:*`,
    `║ ${usedPrefix + command} El comando .play no funciona`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const reporte = m.quoted?.text || text
  const sender  = m.sender.split('@')[0]
  const chat    = m.isGroup ? m.chat : 'Chat privado'
  const fecha   = new Date().toLocaleString('es', { timeZone: 'America/Lima' })

  await m.react('📨')

  // ── Enviar al owner ──
  for (const [numero] of global.owner) {
    const ownerJid = numero.includes('@') ? numero : `${numero}@s.whatsapp.net`
    await conn.sendMessage(ownerJid, {
      text: [
        `╔══〔 🌼 *THEELY-MD — REPORTE* 〕══╗`,
        `║`,
        `║ 📨 *Nuevo reporte recibido~*`,
        `║`,
        `║ 👤 *Usuario:* @${sender}`,
        `║ 💬 *Chat:*    ${chat}`,
        `║ 🕐 *Fecha:*   ${fecha}`,
        `║`,
        `║ 📝 *Descripción:*`,
        `║ ${reporte}`,
        `║`,
        `╚══════════════════════════════════╝`
      ].join('\n'),
      mentions: [m.sender]
    }).catch(() => {})
  }

  await m.react('✅')
  await m.reply([
    `╔══〔 🌼 *THEELY-MD — REPORT* 〕══╗`,
    `║`,
    `║ ✅ *¡Reporte enviado!*`,
    `║`,
    `║ 📨 Tu reporte fue enviado al`,
    `║ creador del bot~`,
    `║`,
    `║ 💡 Espera respuesta pronto 🌼`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))
}

handler.help     = ['report <problema>']
handler.tags     = ['info']
handler.command  = ['report', 'reportar', 'bug']
handler.desc     = 'Reporta un problema al creador del bot'

export default handler
