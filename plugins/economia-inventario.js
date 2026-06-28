const handler = async (m, { conn }) => {
  const quien  = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
  const user   = global.db.data.users[quien]
  const moneda = global.moneda || 'coins'
  const esTuyo = quien === m.sender

  if (!user) return m.reply([
    `╔══〔 🌼 *THEELY-MD — INVENTARIO* 〕══╗`,
    `║`,
    `║ ❌ *Usuario no encontrado~*`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const inventario = user.inventario || []

  if (inventario.length === 0) return m.reply([
    `╔══〔 🌼 *THEELY-MD — INVENTARIO* 〕══╗`,
    `║`,
    `║ 🎒 ${esTuyo ? 'Tu inventario' : `Inventario de @${quien.split('@')[0]}`}`,
    `║`,
    `║ 📭 *Vacío~*`,
    `║ Visita la *.tienda* para comprar`,
    `║ items~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'), null, { mentions: [quien] })

  const EMOJIS = {
    1: '⛏️', 2: '🥇', 3: '🛡️', 4: '🍀', 5: '💎'
  }

  const conteo = {}
  for (const item of inventario) {
    const key = item.id || item.nombre
    if (!conteo[key]) {
      conteo[key] = { ...item, cantidad: 0 }
    }
    conteo[key].cantidad++
  }

  const lista = Object.values(conteo).map(item => {
    const emoji = EMOJIS[item.id] || '📦'
    const fecha = item.fecha
      ? new Date(item.fecha).toLocaleDateString('es', { timeZone: 'America/Lima' })
      : 'Desconocida'
    return [
      `║ ${emoji} *${item.nombre}*`,
      `║    📦 Cantidad: x${item.cantidad}`,
      `║    📅 Último: ${fecha}`
    ].join('\n')
  }).join('\n║\n')

  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — INVENTARIO* 〕══╗`,
      `║`,
      `║ 🎒 ${esTuyo ? '*Tu inventario*' : `*@${quien.split('@')[0]}*`}`,
      `║ 📦 *Items:* ${inventario.length}`,
      `║`,
      `╠══〔 🛍️ *ITEMS* 〕════════════════════╣`,
      `║`,
      lista,
      `║`,
      `║ 💡 Usa *.tienda* para comprar más~`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'),
    mentions: [quien]
  }, { quoted: m })

  await m.react('🎒')
}

handler.help     = ['inventario']
handler.tags     = ['eco']
handler.command  = ['inventario', 'inv', 'mochila']
handler.register = true
handler.desc     = 'Ver tu inventario de items'

export default handler
