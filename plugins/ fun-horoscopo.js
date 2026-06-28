const SIGNOS = {
  aries:       { emoji: '♈', fechas: '21 Mar - 19 Abr' },
  tauro:       { emoji: '♉', fechas: '20 Abr - 20 May' },
  geminis:     { emoji: '♊', fechas: '21 May - 20 Jun' },
  cancer:      { emoji: '♋', fechas: '21 Jun - 22 Jul' },
  leo:         { emoji: '♌', fechas: '23 Jul - 22 Ago' },
  virgo:       { emoji: '♍', fechas: '23 Ago - 22 Sep' },
  libra:       { emoji: '♎', fechas: '23 Sep - 22 Oct' },
  escorpio:    { emoji: '♏', fechas: '23 Oct - 21 Nov' },
  sagitario:   { emoji: '♐', fechas: '22 Nov - 21 Dic' },
  capricornio: { emoji: '♑', fechas: '22 Dic - 19 Ene' },
  acuario:     { emoji: '♒', fechas: '20 Ene - 18 Feb' },
  piscis:      { emoji: '♓', fechas: '19 Feb - 20 Mar' },
}

const PREDICCIONES = [
  'Hoy es un gran día para tomar decisiones importantes~',
  'El universo tiene grandes sorpresas preparadas para ti~',
  'Evita conflictos innecesarios, la calma es tu aliada~',
  'El amor llama a tu puerta, ¡ábrela con confianza!~',
  'Tu creatividad está en su punto más alto hoy~',
  'Un encuentro inesperado cambiará tu perspectiva~',
  'Es momento de soltar lo que ya no te sirve~',
  'La fortuna sonríe a quienes se atreven hoy~',
  'Confía en tu intuición, ella nunca te falla~',
  'Hoy es un buen día para reconectar con seres queridos~',
]

const SUERTE = ['💰 Dinero', '❤️ Amor', '🌟 Trabajo', '🍀 Salud', '🎯 Metas']
const NUMEROS = () => Array.from({length: 3}, () => Math.floor(Math.random() * 99) + 1).join(' - ')
const COLORES = ['🔴 Rojo', '🔵 Azul', '🟡 Amarillo', '🟢 Verde', '🟣 Morado', '🌼 Dorado']

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    const lista = Object.entries(SIGNOS).map(([s, v]) => `║ ${v.emoji} *${s.charAt(0).toUpperCase() + s.slice(1)}* — ${v.fechas}`).join('\n')
    return m.reply([
      `╔══〔 🌼 *THEELY-MD — HORÓSCOPO* 〕══╗`,
      `║`,
      lista,
      `║`,
      `║ 💡 *${usedPrefix + command} <signo>*`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))
  }

  const signo = text.trim().toLowerCase()
  const datos = SIGNOS[signo]

  if (!datos) return m.reply([
    `╔══〔 🌼 *THEELY-MD — HORÓSCOPO* 〕══╗`,
    `║`,
    `║ ❌ *Signo no encontrado~*`,
    `║ Usa *.horoscopo* para ver la lista`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const pred   = PREDICCIONES[Math.floor(Math.random() * PREDICCIONES.length)]
  const suerte = SUERTE[Math.floor(Math.random() * SUERTE.length)]
  const color  = COLORES[Math.floor(Math.random() * COLORES.length)]
  const nums   = NUMEROS()
  const estrellas = Math.floor(Math.random() * 3) + 3
  const rating = '⭐'.repeat(estrellas) + '☆'.repeat(5 - estrellas)

  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — HORÓSCOPO* 〕══╗`,
      `║`,
      `║ ${datos.emoji} *${signo.charAt(0).toUpperCase() + signo.slice(1)}*`,
      `║ 📅 ${datos.fechas}`,
      `║`,
      `║ 🔮 *Predicción:*`,
      `║ ${pred}`,
      `║`,
      `║ ⭐ *Puntuación:* ${rating}`,
      `║ 🍀 *Suerte en:*  ${suerte}`,
      `║ 🎨 *Color:*      ${color}`,
      `║ 🔢 *Números:*    ${nums}`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n')
  }, { quoted: m })

  await m.react(datos.emoji)
}

handler.help    = ['horoscopo <signo>']
handler.tags    = ['fun']
handler.command = ['horoscopo', 'signo', 'zodiaco']
handler.desc    = 'Tu horóscopo del día'
export default handler
