const RAREZAS_VALOR = {
  comun: 1, raro: 2, epico: 3, legendario: 4, mitico: 5, ely_especial: 10
}

const handler = async (m, { conn }) => {
  const usuarios = Object.entries(global.db.data.users || {})
    .filter(([, u]) => u?.coleccion?.length > 0)
    .map(([jid, u]) => {
      const puntos = u.coleccion.reduce((acc, c) => acc + (RAREZAS_VALOR[c.rareza] || 0), 0)
      const miticos = u.coleccion.filter(c => c.rareza === 'mitico' || c.rareza === 'ely_especial').length
      return {
        jid,
        nombre: u.name || jid.split('@')[0],
        total: u.coleccion.length,
        puntos,
        miticos
      }
    })
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 10)

  if (!usuarios.length) return m.reply([
    `╔══〔 🌼 *THEELY-MD — GACHA TOP* 〕══╗`,
    `║`,
    `║ ❌ *Sin datos aún~*`,
    `║ Usa *.gacha* para empezar`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const medallas = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟']

  const lista = usuarios.map((u, i) =>
    `║ ${medallas[i]} *${u.nombre}*\n║    🎴 ${u.total} cartas | ⭐ ${u.puntos} pts | 🔴 ${u.miticos} míticos`
  ).join('\n║\n')

  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — GACHA TOP* 〕══╗`,
      `║`,
      lista,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'),
    mentions: usuarios.map(u => u.jid)
  }, { quoted: m })

  await m.react('🏆')
}

handler.help     = ['gachatop']
handler.tags     = ['gacha']
handler.command  = ['gachatop', 'topgacha', 'gacharank']
handler.register = true
handler.desc     = 'Ranking de mejores colecciones gacha'
export default handler
