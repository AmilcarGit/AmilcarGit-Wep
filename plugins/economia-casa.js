const NIVELES_CASA = [
  { nivel: 0, nombre: 'Sin casa',       emoji: '🏚️', precio: 0,    bono: 0   },
  { nivel: 1, nombre: 'Cabaña',         emoji: '🛖',  precio: 500,  bono: 10  },
  { nivel: 2, nombre: 'Casa pequeña',   emoji: '🏠',  precio: 1500, bono: 25  },
  { nivel: 3, nombre: 'Casa grande',    emoji: '🏡',  precio: 3000, bono: 50  },
  { nivel: 4, nombre: 'Mansión',        emoji: '🏰',  precio: 7000, bono: 100 },
  { nivel: 5, nombre: 'Palacio 🌼',     emoji: '🏯',  precio: 15000,bono: 200 },
]

const handler = async (m, { conn, args, usedPrefix }) => {
  const user   = global.db.data.users[m.sender]
  const moneda = global.moneda || 'coins'
  const accion = (args[0] || '').toLowerCase()

  const nivelActual = user.casa || 0
  const casaActual  = NIVELES_CASA[nivelActual]
  const casaSig     = NIVELES_CASA[nivelActual + 1]

  if (!accion || accion === 'ver') {
    return m.reply([
      `╔══〔 🌼 *THEELY-MD — CASA* 〕══╗`,
      `║`,
      `║ 🏠 *Tu propiedad actual:*`,
      `║ ${casaActual.emoji} *${casaActual.nombre}*`,
      `║ 💰 *Bono diario:* +${casaActual.bono} ${moneda}`,
      `║`,
      casaSig ? [
        `╠══〔 ⬆️ *MEJORA* 〕══════════════════╣`,
        `║`,
        `║ ${casaSig.emoji} *${casaSig.nombre}*`,
        `║ 💰 *Precio:* ${casaSig.precio} ${moneda}`,
        `║ 📈 *Bono:*   +${casaSig.bono} ${moneda}/día`,
        `║`,
        `║ 💡 *${usedPrefix}casa mejorar* para subir`,
        `║`
      ].join('\n') : `║ 🏆 *¡Tienes la mejor casa!*\n║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))
  }

  if (accion === 'mejorar') {
    if (!casaSig) return m.reply([
      `╔══〔 🌼 *THEELY-MD — CASA* 〕══╗`,
      `║`,
      `║ 🏆 *¡Ya tienes el Palacio!*`,
      `║ No hay mejoras disponibles~`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))

    if ((user.coin || 0) < casaSig.precio) return m.reply([
      `╔══〔 🌼 *THEELY-MD — CASA* 〕══╗`,
      `║`,
      `║ ❌ *Saldo insuficiente~*`,
      `║ 💰 Precio: ${casaSig.precio} ${moneda}`,
      `║ 👛 Tienes: ${user.coin || 0} ${moneda}`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))

    user.coin -= casaSig.precio
    user.casa  = nivelActual + 1

    await m.react('🏠')
    return m.reply([
      `╔══〔 🌼 *THEELY-MD — CASA* 〕══╗`,
      `║`,
      `║ ✅ *¡Casa mejorada!*`,
      `║`,
      `║ ${casaSig.emoji} *${casaSig.nombre}*`,
      `║ 💰 *-${casaSig.precio}* ${moneda}`,
      `║ 📈 *Bono diario:* +${casaSig.bono} ${moneda}`,
      `║`,
      `║ 👛 *Saldo:* ${user.coin} ${moneda}`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))
  }

  if (accion === 'lista') {
    const lista = NIVELES_CASA.slice(1).map(c =>
      `║ ${c.emoji} *Nv.${c.nivel} ${c.nombre}*\n║    💰 ${c.precio} ${moneda} | 📈 +${c.bono}/día`
    ).join('\n║\n')

    return m.reply([
      `╔══〔 🌼 *THEELY-MD — CASAS* 〕══╗`,
      `║`,
      lista,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))
  }

  m.reply([
    `╔══〔 🌼 *THEELY-MD — CASA* 〕══╗`,
    `║`,
    `║ 💡 *Comandos:*`,
    `║ ${usedPrefix}casa ver`,
    `║ ${usedPrefix}casa mejorar`,
    `║ ${usedPrefix}casa lista`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))
}

handler.help     = ['casa [ver/mejorar/lista]']
handler.tags     = ['eco']
handler.command  = ['casa', 'house', 'hogar']
handler.register = true
handler.desc     = 'Gestiona tu casa y gana bonos diarios'
export default handler
