const handler = async (m, { conn, args, text, usedPrefix, command }) => {

  if (!text) {
    return m.reply([
      `╔══〔 📝 *THEELY-MD — SETDESC* 〕══╗`,
      `║`,
      `║ 💡 *Uso:*`,
      `║ ${usedPrefix + command} <nueva descripción>`,
      `║`,
      `║ 📌 *Ejemplo:*`,
      `║ ➤ ${usedPrefix + command} Bienvenidos al grupo~`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))
  }

  try {
    const nuevaDescripcion = args.join(' ')
    await conn.groupUpdateDescription(m.chat, nuevaDescripcion)

    await conn.sendMessage(m.chat, {
      text: [
        `╔══〔 📝 *THEELY-MD — SETDESC* 〕══╗`,
        `║`,
        `║ ✅ *¡Descripción actualizada!*`,
        `║`,
        `║ 📋 *Nueva descripción:*`,
        `║ ${nuevaDescripcion}`,
        `║`,
        `╚══════════════════════════════════╝`
      ].join('\n')
    }, { quoted: m })

    await m.react('✅')

  } catch (e) {
    console.error('❌ Error al actualizar la descripción:', e.message)
    await m.react('❌')
    m.reply([
      `╔══〔 📝 *THEELY-MD — SETDESC* 〕══╗`,
      `║`,
      `║ ❌ *No se pudo cambiar la descripción~*`,
      `║`,
      `║ 💡 *Posibles causas:*`,
      `║ ➤ El bot perdió permisos de admin`,
      `║ ➤ Texto demasiado largo`,
      `║`,
      `║ 🔄 Intenta de nuevo~`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))
  }
}

handler.help     = ['setdesc <texto>']
handler.tags     = ['grupo']
handler.command  = /^(setdesk|setdesc|newdesc|descripción|descripcion)$/i
handler.group    = true
handler.admin    = true
handler.botAdmin = true
handler.desc     = 'Cambia la descripción del grupo'

export default handler
