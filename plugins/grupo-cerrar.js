import { delay } from "@whiskeysockets/baileys"

let handler = async (m, { conn, text, args, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) {
    await conn.sendMessage(m.chat, { 
      text: '❌ *Solo disponible en grupos*\nTheEly-MD solo puede activar el modo silencioso en grupos.'
    })
    return
  }

  if (!isAdmin) {
    await conn.sendMessage(m.chat, { 
      text: '⚡ *Acceso denegado*\nSolo los administradores pueden activar el modo silencioso.'
    })
    return
  }

  if (!isBotAdmin) {
    await conn.sendMessage(m.chat, { 
      text: '⚠️ *Permisos insuficientes*\nTheEly-MD necesita ser administrador para controlar el grupo.'
    })
    return
  }

  if (!args[0]) {
    await conn.sendMessage(m.chat, { 
      text: '❓ *Uso correcto:*\n.cerrar 10 segundos\n.cerrar 5 minutos\n.cerrar 1 hora'
    })
    return
  }

  let tiempoTexto = text.toLowerCase()
  let tiempoMs
  let unidad = ''
  let tiempoSegundos = 0

  if (tiempoTexto.includes("segundo")) {
    let segundos = parseInt(args[0])
    if (isNaN(segundos) || segundos <= 0) return await conn.sendMessage(m.chat, { text: '❌ *Segundos inválidos*' })
    tiempoMs = segundos * 1000
    tiempoSegundos = segundos
    unidad = segundos === 1 ? 'segundo' : 'segundos'
  } else if (tiempoTexto.includes("minuto")) {
    let minutos = parseInt(args[0])
    if (isNaN(minutos) || minutos <= 0) return await conn.sendMessage(m.chat, { text: '❌ *Minutos inválidos*' })
    tiempoMs = minutos * 60 * 1000
    tiempoSegundos = minutos * 60
    unidad = minutos === 1 ? 'minuto' : 'minutos'
  } else if (tiempoTexto.includes("hora")) {
    let horas = parseInt(args[0])
    if (isNaN(horas) || horas <= 0) return await conn.sendMessage(m.chat, { text: '❌ *Horas inválidas*' })
    tiempoMs = horas * 60 * 60 * 1000
    tiempoSegundos = horas * 60 * 60
    unidad = horas === 1 ? 'hora' : 'horas'
  } else {
    return await conn.sendMessage(m.chat, { text: '❓ *Especifica el tiempo*\nsegundos / minutos / horas' })
  }

  try {
    await m.react('🔒')
    await m.react('🌼')

    await conn.groupSettingUpdate(m.chat, 'announcement')

    const cierreMsg = await conn.sendMessage(m.chat, {
      text: `╔══〔 🌼 *THEELY-MD* 〕══╗\n║ 🔒 MODO SILENCIOSO ACTIVADO\n╚══════════════════════╝\n\n⏰ *Duración:* ${args[0]} ${unidad}\n⏳ La cuenta regresiva ha comenzado...`
    })

    const formatTiempo = (segundos) => {
      if (segundos < 60) return `${segundos} segundos`
      else if (segundos < 3600) {
        const min = Math.floor(segundos / 60)
        const sec = segundos % 60
        return `${min} minuto${min !== 1 ? 's' : ''}${sec > 0 ? ' ' + sec + ' segundo' + (sec !== 1 ? 's' : '') : ''}`
      } else {
        const h = Math.floor(segundos / 3600)
        const min = Math.floor((segundos % 3600) / 60)
        return `${h} hora${h !== 1 ? 's' : ''}${min > 0 ? ' ' + min + ' minuto' + (min !== 1 ? 's' : '') : ''}`
      }
    }

    const crearBarra = (porcentaje) => {
      const barras = 20
      const lleno = Math.round((porcentaje / 100) * barras)
      return '█'.repeat(lleno) + '░'.repeat(barras - lleno)
    }

    let segundosRestantes = tiempoSegundos

    const cuentaRegresiva = async () => {
      while (segundosRestantes > 0) {
        await delay(20000)
        segundosRestantes -= 20
        if (segundosRestantes <= 0) break
        const porcentaje = ((tiempoSegundos - segundosRestantes) / tiempoSegundos) * 100
        const tiempoFormateado = formatTiempo(segundosRestantes)
        const barra = crearBarra(porcentaje)
        try {
          await conn.sendMessage(m.chat, {
            text: `╔══〔 🌼 *THEELY-MD* 〕══╗\n║ ⏳ TIEMPO RESTANTE\n╚══════════════════════╝\n\n${barra} ${Math.round(porcentaje)}%\n🕐 ${tiempoFormateado}\n🌼 TheEly-MD mantiene el grupo silencioso...`,
            edit: cierreMsg.key
          })
        } catch {}
      }
    }
    cuentaRegresiva()

    await delay(tiempoMs)

    try {
      await conn.sendMessage(m.chat, {
        text: `╔══〔 🌼 *THEELY-MD* 〕══╗\n║ ✅ CUENTA REGRESIVA COMPLETADA\n╚══════════════════════╝\n\n████████████████████ 100%\n⏰ Duración cumplida\n🌼 TheEly-MD restaura permisos...`,
        edit: cierreMsg.key
      })
    } catch {}

    await delay(1000)
    await conn.groupSettingUpdate(m.chat, 'not_announcement')

    await m.react('✅')
    await m.react('🎉')

    await conn.sendMessage(m.chat, {
      text: `╔══〔 🌼 *THEELY-MD* 〕══╗\n║ 🎊 MODO SILENCIOSO FINALIZADO\n╚══════════════════════╝\n\n✅ *Duración:* ${args[0]} ${unidad}\n⏱️ Tiempo exacto cumplido\n🌼 Todos pueden hablar nuevamente.\n\n✨ Gracias por confiar en TheEly-MD.`
    })

    const celebraciones = ['✨', '🎉', '⚡', '🔥', '🌟']
    for (let emoji of celebraciones) {
      await delay(500)
      await m.react(emoji)
    }

  } catch (error) {
    console.error('Error en cerrar grupo:', error)
    await m.react('❌')
    try { await conn.groupSettingUpdate(m.chat, 'not_announcement') } catch {}
    await conn.sendMessage(m.chat, { text: '❌ *Error en la cuenta regresiva*\nEl grupo ha sido reabierto automáticamente.' })
  }
}

handler.help     = ['cerrar <tiempo> segundos/minutos/horas']
handler.tags     = ['grupo']
handler.command  = /^cerrar$/i
handler.group    = true
handler.admin    = true
handler.botAdmin = true
handler.desc     = 'Cierra el grupo por un tiempo determinado'

export default handler