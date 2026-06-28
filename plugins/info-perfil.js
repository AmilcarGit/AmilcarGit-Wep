import { xpRange, levelFromExp } from '../lib/levelling.js'

const handler = async (m, { conn }) => {
  const quien  = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
  const user   = global.db.data.users[quien]
  const moneda = global.moneda || 'coins'

  if (!user) return m.reply([
    `╔══〔 🌼 *THEELY-MD — PERFIL* 〕══╗`,
    `║`,
    `║ ❌ *Usuario no encontrado~*`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const nombre   = user.name || m.pushName || 'Sin nombre'
  const edad     = user.age > 0 ? `${user.age} años` : 'No registrado'
  const nivel    = user.level || 0
  const exp      = user.exp || 0
  const coin     = user.coin || 0
  const bank     = user.bank || 0
  const diamond  = user.diamond || 0
  const warn     = user.warn || 0
  const premium  = user.premium ? '💎 Sí' : '❌ No'
  const reg      = user.registered ? '✅ Sí' : '❌ No'
  const role     = user.role || 'Nuv'

  const { min, xp } = xpRange(nivel, global.multiplier || 1)
  const expActual   = exp - min
  const expNecesaria = xp

  const bloques  = 12
  const lleno    = Math.min(Math.round((expActual / expNecesaria) * bloques), bloques)
  const barraExp = '█'.repeat(lleno) + '░'.repeat(bloques - lleno)

  const ahora = Date.now()
  const lastSeen = user.lastSeen
    ? new Date(user.lastSeen).toLocaleString('es', { timeZone: 'America/Lima' })
    : 'Desconocido'

  let pp = null
  try {
    pp = await conn.profilePictureUrl(quien, 'image')
  } catch {}

  const texto = [
    `╔══〔 🌼 *THEELY-MD — PERFIL* 〕══╗`,
    `║`,
    `║ 👤 *${nombre}*`,
    `║ 📱 @${quien.split('@')[0]}`,
    `║`,
    `╠══〔 📋 *INFO* 〕══════════════════╣`,
    `║`,
    `║ 🎂 *Edad:*      ${edad}`,
    `║ 🏷️  *Rol:*       ${role}`,
    `║ 💎 *Premium:*   ${premium}`,
    `║ 📝 *Registrado:* ${reg}`,
    `║`,
    `╠══〔 ⭐ *NIVEL* 〕══════════════════╣`,
    `║`,
    `║ ⭐ *Nivel:* ${nivel}`,
    `║ ✨ *EXP:*  ${expActual} / ${expNecesaria}`,
    `║ ${barraExp}`,
    `║`,
    `╠══〔 💰 *ECONOMÍA* 〕═══════════════╣`,
    `║`,
    `║ 👛 *Billetera:* ${coin} ${moneda}`,
    `║ 🏦 *Banco:*     ${bank} ${moneda}`,
    `║ 💎 *Diamantes:* ${diamond}`,
    `║ 💰 *Total:*     ${coin + bank} ${moneda}`,
    `║`,
    `╠══〔 📊 *STATS* 〕══════════════════╣`,
    `║`,
    `║ ⚠️  *Advertencias:* ${warn} / ${global.maxwarn || 2}`,
    `║ 🕐 *Última vez:*   ${lastSeen}`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n')

  if (pp) {
    await conn.sendMessage(m.chat, {
      image:    { url: pp },
      caption:  texto,
      mentions: [quien]
    }, { quoted: m })
  } else {
    await conn.sendMessage(m.chat, {
      text:     texto,
      mentions: [quien]
    }, { quoted: m })
  }

  await m.react('🌼')
}

handler.help     = ['perfil']
handler.tags     = ['info']
handler.command  = ['perfil', 'profile', 'yo', 'info']
handler.register = false
handler.desc     = 'Ver tu perfil completo con stats y economía'

export default handler
