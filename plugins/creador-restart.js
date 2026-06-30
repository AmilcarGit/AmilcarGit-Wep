const handler = async (m, { conn }) => {
  await m.react('🔄')
  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — RESTART* 〕══╗`,
      `║`,
      `║ 🔄 *Reiniciando el bot...*`,
      `║ ⏳ Esto tomará unos segundos~`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n')
  }, { quoted: m })

  setTimeout(() => {
    if (process.send) {
      process.send('reset')
    } else {
      process.exit(0)
    }
  }, 1500)
}

handler.help    = ['restart']
handler.tags    = ['creador']
handler.command = ['restart', 'reiniciar']
handler.rowner  = true
handler.desc    = 'Reinicia el bot completamente'

export default handler
