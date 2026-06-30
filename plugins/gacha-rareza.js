
const RAREZAS = {
  comun:        { nombre: 'Común',        emoji: '⚪', prob: 50,   color: '⚪' },
  raro:         { nombre: 'Raro',         emoji: '🔵', prob: 30,   color: '🔵' },
  epico:        { nombre: 'Épico',        emoji: '🟣', prob: 13,   color: '🟣' },
  legendario:   { nombre: 'Legendario',   emoji: '🟡', prob: 6,    color: '🟡' },
  mitico:       { nombre: 'Mítico',       emoji: '🔴', prob: 0.9,  color: '🔴' },
  ely_especial: { nombre: 'Ely Especial', emoji: '🌼', prob: 0.1,  color: '🌼' },
}

const handler = async (m, { conn }) => {
  const lista = Object.values(RAREZAS).map(r =>
    `║ ${r.emoji} *${r.nombre}*\n║    🎲 Probabilidad: ${r.prob}%`
  ).join('\n║\n')

  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — RAREZAS* 〕══╗`,
      `║`,
      `║ 🎴 *Sistema de rarezas del gacha~*`,
      `║`,
      lista,
      `║`,
      `║ 💡 Usa *.gacha* para hacer tiradas`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n')
  }, { quoted: m })

  await m.react('🎴')
}

handler.help    = ['rareza']
handler.tags    = ['gacha']
handler.command = ['rareza', 'rarezas', 'rates']
handler.register = true
handler.desc    = 'Muestra las probabilidades del gacha'

export default handler
export { RAREZAS }
