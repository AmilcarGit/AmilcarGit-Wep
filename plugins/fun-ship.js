const handler = async (m, { conn, usedPrefix, command }) => {
  const mencionados = m.mentionedJid || []
  const persona1    = mencionados[0] || m.sender
  const persona2    = mencionados[1] || m.quoted?.sender

  if (!persona2 || persona1 === persona2) return m.reply([
    `╔══〔 🌼 *THEELY-MD — SHIP* 〕══╗`,
    `║`,
    `║ 💡 *Uso:*`,
    `║ ${usedPrefix + command} @usuario1 @usuario2`,
    `║`,
    `║ 📌 Ejemplo:`,
    `║ .ship @Ely @Amilcar`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const user1 = global.db.data.users[persona1]
  const user2 = global.db.data.users[persona2]

  const nombre1 = user1?.name || persona1.split('@')[0]
  const nombre2 = user2?.name || persona2.split('@')[0]

  const semilla   = (persona1 + persona2).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const pct       = semilla % 101
  const bloques   = 10
  const lleno     = Math.round((pct / 100) * bloques)
  const barra     = '💗'.repeat(lleno) + '🖤'.repeat(bloques - lleno)

  let emoji, frase
  if (pct >= 80) { emoji = '💘'; frase = '¡Amor perfecto! Son el uno para el otro~' }
  else if (pct >= 60) { emoji = '💕'; frase = '¡Muy buena compatibilidad!~' }
  else if (pct >= 40) { emoji = '💛'; frase = 'Hay potencial, ¡no se rindan!~' }
  else if (pct >= 20) { emoji = '🤍'; frase = 'Compatibilidad baja, pero todo es posible~' }
  else { emoji = '💔'; frase = 'Hmm... quizás solo amigos~' }

  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — SHIP* 〕══╗`,
      `║`,
      `║ ${emoji} *Compatibilidad~*`,
      `║`,
      `║ 👤 *${nombre1}*`,
      `║ 💞   x`,
      `║ 👤 *${nombre2}*`,
      `║`,
      `║ ${barra}`,
      `║ 💯 *${pct}%*`,
      `║`,
      `║ 💌 ${frase}`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'),
    mentions: [persona1, persona2]
  }, { quoted: m })

  await m.react(emoji)
}

handler.help    = ['ship @usuario1 @usuario2']
handler.tags    = ['fun']
handler.command = ['ship', 'love', 'compatibilidad']
handler.desc    = 'Calcula la compatibilidad entre dos usuarios'
export default handler
