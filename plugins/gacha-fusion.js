const RAREZAS_ORDEN = ['comun', 'raro', 'epico', 'legendario', 'mitico']
const RAREZAS_EMOJI = {
  comun: '⚪', raro: '🔵', epico: '🟣', legendario: '🟡', mitico: '🔴', ely_especial: '🌼'
}
const REQUERIDOS = 5 // necesita 5 duplicados para fusionar

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const user = global.db.data.users[m.sender]

  if (!text) return m.reply([
    `╔══〔 🌼 *THEELY-MD — FUSIÓN* 〕══╗`,
    `║`,
    `║ 💡 *Uso:*`,
    `║ ${usedPrefix + command} <nombre del personaje>`,
    `║`,
    `║ 📌 *Regla:*`,
    `║ Necesitas *${REQUERIDOS} copias* del mismo`,
    `║ personaje para fusionarlo y subir`,
    `║ su rareza al siguiente nivel~`,
    `║`,
    `║ 📌 *Ejemplo:*`,
    `║ ${usedPrefix + command} Krillin`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const coleccion = user.coleccion || []
  const nombreBuscado = text.trim().toLowerCase()

  const copias = coleccion.filter(c => c.nombre.toLowerCase().includes(nombreBuscado))

  if (copias.length === 0) return m.reply([
    `╔══〔 🌼 *THEELY-MD — FUSIÓN* 〕══╗`,
    `║`,
    `║ ❌ *No tienes ese personaje~*`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const personaje = copias[0]
  const rarezaActual = personaje.rareza

  if (rarezaActual === 'mitico' || rarezaActual === 'ely_especial') return m.reply([
    `╔══〔 🌼 *THEELY-MD — FUSIÓN* 〕══╗`,
    `║`,
    `║ 🏆 *¡Rareza máxima alcanzada!*`,
    `║ Este personaje ya no se puede`,
    `║ fusionar más~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  if (copias.length < REQUERIDOS) return m.reply([
    `╔══〔 🌼 *THEELY-MD — FUSIÓN* 〕══╗`,
    `║`,
    `║ ❌ *Copias insuficientes~*`,
    `║`,
    `║ ${RAREZAS_EMOJI[rarezaActual]} *${personaje.nombre}*`,
    `║ 📦 Tienes: ${copias.length}/${REQUERIDOS}`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  // ── Fusionar: quitar 5 copias, dar 1 de rareza superior ──
  const indiceRareza = RAREZAS_ORDEN.indexOf(rarezaActual)
  const nuevaRareza  = RAREZAS_ORDEN[indiceRareza + 1]

  let eliminados = 0
  global.db.data.users[m.sender].coleccion = coleccion.filter(c => {
    if (c.nombre.toLowerCase().includes(nombreBuscado) && eliminados < REQUERIDOS) {
      eliminados++
      return false
    }
    return true
  })

  const personajeFusionado = {
    nombre: personaje.nombre + ' ✨',
    origen: personaje.origen,
    rareza: nuevaRareza,
    fecha: Date.now()
  }

  global.db.data.users[m.sender].coleccion.push(personajeFusionado)
  await global.db.write()

  await m.react('✨')
  await m.reply([
    `╔══〔 🌼 *THEELY-MD — FUSIÓN* 〕══╗`,
    `║`,
    `║ ✨ *¡Fusión exitosa!*`,
    `║`,
    `║ ${RAREZAS_EMOJI[rarezaActual]} ${personaje.nombre} x${REQUERIDOS}`,
    `║          ⬇️`,
    `║ ${RAREZAS_EMOJI[nuevaRareza]} *${personajeFusionado.nombre}*`,
    `║`,
    `║ 🎉 *¡Subió de rareza!*`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))
}

handler.help     = ['fusion <personaje>']
handler.tags     = ['gacha']
handler.command  = ['fusion', 'fusionar', 'craft']
handler.register = true
handler.desc     = 'Fusiona 5 duplicados para subir su rareza'
export default handler
