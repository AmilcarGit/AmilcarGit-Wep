const handler = async (m, { conn }) => {
  const moneda  = global.moneda || 'coins'
  const usuarios = Object.entries(global.db.data.users || {})
    .filter(([, u]) => u?.registered && typeof u.coin === 'number')
    .map(([jid, u]) => ({
      jid,
      nombre: u.name || jid.split('@')[0],
      total:  (u.coin || 0) + (u.bank || 0)
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)

  if (!usuarios.length) return m.reply([
    `╔══〔 🌼 *THEELY-MD — TOP* 〕══╗`,
    `║`,
    `║ ❌ *Sin datos aún~*`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const medallas = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟']

  const lista = usuarios.map((u, i) =>
    `║ ${medallas[i]} *${u.nombre}*\n║    💰 ${u.total} ${moneda}`
  ).join('\n║\n')

  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — TOP RICOS* 〕══╗`,
      `║`,
      lista,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'),
    mentions: usuarios.map(u => u.jid)
  }, { quoted: m })

  await m.react('🏆')
}

handler.help     = ['rpgtop']
handler.tags     = ['eco']
handler.command  = ['rpgtop']
handler.register = false
handler.desc     = 'Top 10 usuarios más ricos'
export default handler
