const handler = async (m, { conn, args, usedPrefix, command }) => {
  const todos    = Object.entries(global.db.data.users || {})
  const pagina   = parseInt(args[0]) || 1
  const porPagina = 15

  const registrados = todos.filter(([, u]) => u?.registered)

  if (!registrados.length) return m.reply([
    `╔══〔 🌼 *THEELY-MD — USUARIOS* 〕══╗`,
    `║`,
    `║ ❌ *No hay usuarios registrados~*`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const totalPaginas = Math.ceil(registrados.length / porPagina)
  const pagActual    = Math.min(Math.max(pagina, 1), totalPaginas)
  const inicio       = (pagActual - 1) * porPagina
  const usuariosPag  = registrados.slice(inicio, inicio + porPagina)

  const lista = usuariosPag.map(([jid, u], i) => {
    const numero  = jid.split('@')[0].split(':')[0]
    const nombre  = u.name || 'Sin nombre'
    const premium = u.premium ? '👑' : ''
    const coins   = u.coin || 0
    return `║ ${inicio + i + 1}. *${nombre}* ${premium}\n║    📱 +${numero} | 💰 ${coins}`
  }).join('\n║\n')

  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — USUARIOS* 〕══╗`,
      `║`,
      `║ 👥 *Total registrados:* ${registrados.length}`,
      `║ 📄 *Página:* ${pagActual}/${totalPaginas}`,
      `║`,
      `╠══〔 📋 *LISTA* 〕═══════════════════╣`,
      `║`,
      lista,
      `║`,
      totalPaginas > 1 ? `║ 💡 *${usedPrefix + command} <página>* para navegar` : '',
      `║`,
      `╚══════════════════════════════════╝`
    ].filter(Boolean).join('\n')
  }, { quoted: m })

  await m.react('👥')
}

handler.help    = ['listausers [página]']
handler.tags    = ['creador']
handler.command = ['listausers', 'listusers', 'usuarios']
handler.rowner  = true
handler.desc    = 'Lista todos los usuarios registrados'

export default handler
