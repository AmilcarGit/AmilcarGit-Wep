import fs from 'fs'
import { join } from 'path'
import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

const handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    const user = global.db.data.users[m.sender] || {}
    const name = await conn.getName(m.sender)

    const totalGrupos = Object.keys(global.db.data.chats || {}).filter(id => id.endsWith('@g.us')).length
    const totalUsuarios = Object.keys(global.db.data.users || {}).length

    const ahora = new Date()
    const horaPeru = new Date(ahora.toLocaleString('en-US', { timeZone: 'America/Lima' }))

    const date = horaPeru.toLocaleDateString('es', {
      day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'
    })

    const time = horaPeru.toLocaleTimeString('es', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    })

    const help = Object.values(global.plugins || {})
      .filter(p => !p.disabled && p.tags && p.tags.includes('eco'))
      .map(p => ({
        help: Array.isArray(p.help) ? p.help : [p.help],
        tags: Array.isArray(p.tags) ? p.tags : [p.tags],
        prefix: 'customPrefix' in p,
        limit: p.limit,
        premium: p.premium,
        desc: p.desc || p.description || 'Sin descripción'
      }))

    let nombreBot = 'TheEly MD'
    let bannerFinal = null

    const imagePath = join(process.cwd(), 'lib', 'TheElyMD.jpg')
    if (fs.existsSync(imagePath)) {
      bannerFinal = fs.readFileSync(imagePath)
    } else {
      const rootPath = join(process.cwd(), 'TheElyMD.jpg')
      if (fs.existsSync(rootPath)) bannerFinal = fs.readFileSync(rootPath)
    }

    const botActual = conn.user?.jid?.split('@')[0].replace(/\D/g, '')
    const configPath = join('./JadiBots', botActual, 'config.json')
    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath))
        if (config.name) nombreBot = config.name
      } catch (e) {}
    }

    const tipo = conn.user.jid === global.conn.user.jid
      ? '𝗕𝗼𝘁 𝗣𝗿𝗶𝗻𝗰𝗶𝗽𝗮𝗹'
      : '𝗦𝘂𝗯-𝗕𝗼𝘁'

    const moneda = global.moneda || '🌼 ElyCoins'
    const userCoins = user.coin || 0
    const userBank = user.bank || 0
    const userExp = user.exp || 0

    const comandosEco = help.map(menu => {
      return menu.help.map(h => {
        const cmd = menu.prefix ? h : `${_p}${h}`
        const limit = menu.limit ? '🔒' : '🔓'
        const premium = menu.premium ? '💎' : '🆓'
        return `  ${cmd}\n  ➥ ${menu.desc} ${limit} ${premium}`
      }).join('\n')
    }).filter(Boolean).join('\n\n')

    const before = `
 ❛ ━━━━━━･❪ 💰 ❫ ･━━━━━━ ❜
   🂡𝐓 𝐇 𝐄 𝐄 𝐋 𝐘 𓆆 𝐌 𝐃
   ─── 𝑬𝒄𝒐𝒏𝒐𝒎𝒊𝒂 ───
 ‧̍̊·̊‧̥°̩̥˚̩̩̥͙°̩̥‧̥·̊‧̍̊ ♡ °̩̥˚̩̩̥͙°̩̥ ·͙*̩̩͙˚̩̥̩̥*̩̩̥͙·̩̩̥͙*̩̩̥͙˚̩̥̩̥*̩̩͙‧͙ °̩̥˚̩̩̥͙°̩̥ ♡ ‧̍̊·̊‧̥°̩̥˚̩̩̥͙°̩̥‧̥·̊‧̍̊

  🌼 *¡Hola,* *${name}!*
   ${getGreeting(horaPeru.getHours())}

  📊 *TU ECONOMÍA:*
  💰 ${moneda}: ${userCoins}
  🏦 Banco: ${userBank}
  ✨ Experiencia: ${userExp}

 ‧͙⁺˚*･༓☾ 𝑻𝒉𝒆𝑬𝒍𝒚-𝑴𝑫 ☽༓･*˚⁺‧͙ 
  ║☞ 🤖  𝑩𝒐𝒕☻        ${nombreBot}
  ║☞ 🏷️  𝑴𝒐𝒅𝒐☻      ${tipo}
  ║☞ 📅  𝑭𝒆𝒄𝒉𝒂☻     ${date}
  ║☞ 🕐  𝑯𝒐𝒓𝒂☻      ${time}
  ║☞ 👥  𝑮𝒓𝒖𝒑𝒐𝒔☻    ${totalGrupos}
  ║☞ 👤  𝑼𝒔𝒖𝒂𝒓𝒊𝒐𝒔☻  ${totalUsuarios}
  ❀•°•═════ஓ๑♡๑ஓ═════•°•❀
  𓏲🇨 🇴 🇲 🇦 🇳 🇩 🇮 🇹 🇴 🇸 𓉳
    ✐☡✐☡✐☡✐☡✐☡✐☡✐☡✐☡
`

    const after = `
  ˏ⸉ˋ‿̩͙‿̩̩̽‿̩͙‿̩̥̩‿̩̩̽‿̩͙‿̩͙‿̩̩̽‿̩͙‿̩͙‿̩̩̽‿̩͙‿̩̥̩‿̩̩̽‿̩͙‘⸊ˎ

  𖥸 𝗧 𝗛 𝗘 𝗘 𝗟 𝗬 𖧷 𝗠 𝗗⇱

  _╭ᵇᵒᵗ ᴺᵘᵉᵛᵒ ᵉⁿ ᵗᵘ ʷʰᵃᵗˢᵃᵖᵖ╮_
       ᵈᵉˢᵃʳʳᵒˡˡᵃᵈᵒ ᵖᵒʳ
    ٭ᴀ ᴍ ɪ ʟ ᴄ ᴀ ʀ ɢ ɪ ᴛ
 𝑐𝑜𝑛𝑡𝑎𝑐𝑡𝑜: 51910227479 ⃝⃟
 ┈┈┈┈․° ☣ °․┈┈┈┈

  ✨ _𝗚𝗥𝗔𝗖𝗜𝗔𝗦 𝗣𝗢𝗥 𝗨𝗦𝗔𝗥 𝗧𝗵𝗲𝗘𝗹𝘆-𝗠𝗗 ⃝_
  💡 Usa .menu para ver todos los comandos
`

    const texto = `${before}\n${comandosEco}\n${after}`

    // ========== BOTONES INTERACTIVOS (FUNCIONALES) ==========
    const rows = [
      { title: '🏪 Tienda', id: `${_p}tienda` },
      { title: '📅 Daily', id: `${_p}daily` },
      { title: '💰 Banco', id: `${_p}bank` },
      { title: '🔄 Transferir', id: `${_p}transferir` },
      { title: '🌼 Menú Principal', id: `${_p}menu` }
    ]

    const buttonsMessage = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {},
          interactiveMessage: proto.Message.InteractiveMessage.create({
            header: {
              title: '🌼 THEELY-MD — ECONOMÍA',
              subtitle: 'Selecciona una opción',
              hasMediaAttachment: !!bannerFinal
            },
            body: { text: texto.trim() },
            footer: { text: '𝚃𝙷𝙴𝙴𝙻𝚈-𝙼𝙳  ·  𝙴𝚌𝚘𝚗𝚘𝚖𝚒́𝚊' },
            nativeFlowMessage: {
              buttons: [{
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: '📋 ACCIONES RÁPIDAS',
                  sections: [{
                    title: '🔽 Elige una opción',
                    rows
                  }]
                })
              }]
            }
          })
        }
      }
    }

    if (bannerFinal) {
      // Si hay imagen, se usa como header (se requiere subir la imagen como attachment)
      // Pero para simplificar, mejor enviamos solo texto con botones.
      // O puedes usar la imagen en el header si la conviertes a base64.
      // Lo dejamos como texto plano con botones.
      delete buttonsMessage.viewOnceMessage.message.interactiveMessage.header.hasMediaAttachment
    }

    const msg = generateWAMessageFromContent(m.chat, buttonsMessage, { quoted: m })
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    await m.react('💰')

  } catch (e) {
    console.error('💥 Error en menú economía:', e)
    await conn.reply(m.chat, `❌ Ocurrió un error al cargar el menú de economía.`, m)
  }
}

handler.command = ['menueco', 'economia', 'eco', 'menuconomia']
handler.tags = ['main']
handler.help = ['menueco']
handler.desc = 'Muestra el menú de economía del bot'
handler.register = false
handler.limit = false

export default handler

function getGreeting(hour) {
  const greetings = {
    0: 'Una madrugada tranquila para ti~',
    1: 'La noche está en su punto más sereno~',
    2: 'Hora perfecta para descansar la mente~',
    3: 'Aún de madrugada, pero aquí estoy contigo~',
    4: 'El amanecer ya casi llega~',
    5: 'Buenos días tempraneros~',
    6: 'El cielo empieza a iluminarse~',
    7: '¡Buenos días! Que tengas un excelente día~',
    8: 'Hora del desayuno, no lo olvides~',
    9: 'Una mañana productiva te espera~',
    10: 'Media mañana llena de energía~',
    11: 'Ya casi es mediodía, sigue así~',
    12: '¡Feliz mediodía! Hora de almorzar~',
    13: 'Buenas tardes, espero la estés pasando bien~',
    14: 'Una tarde tranquila y agradable~',
    15: 'Momento perfecto para un café~',
    16: 'La tarde avanza, no te canses~',
    17: 'El atardecer se acerca, disfrútalo~',
    18: 'Hora de relajarse un poco~',
    19: 'La noche se acerca poco a poco~',
    20: 'Buenas noches, cuídate mucho~',
    21: 'La noche ha comenzado, descansa pronto~',
    22: 'Hora de ir bajando el ritmo~',
    23: 'Último tramo del día, ¡buenas noches!'
  }
  return greetings[hour] || 'que tengas un día increíble~'
}