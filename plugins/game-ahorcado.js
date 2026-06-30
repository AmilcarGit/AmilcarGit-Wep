const PALABRAS = [
  'whatsapp', 'javascript', 'programacion', 'computadora', 'telefono',
  'internet', 'tecnologia', 'inteligencia', 'desarrollador', 'aplicacion',
  'servidor', 'database', 'algoritmo', 'funcion', 'variable', 'biblioteca',
  'naruto', 'gohan', 'goku', 'vegeta', 'luffy', 'tanjiro', 'eren'
]

const sesiones = {}
const RECOMPENSA = { min: 80, max: 200 }
const VIDAS_MAX = 6

function dibujarAhorcado(vidas) {
  const dibujos = [
    `║ 💀 ¡Te quedaste sin vidas!`,
    `║   😣\n║  /|\\\n║  /`,
    `║   😟\n║  /|\\`,
    `║   😐\n║   |`,
    `║   🙂`,
    `║   😊`,
    `║   😄 ¡Empezando!`
  ]
  return dibujos[vidas] !== undefined ? dibujos[vidas] : dibujos[0]
}

const handler = async (m, { conn }) => {
  if (sesiones[m.chat]) return m.reply([
    `╔══〔 🌼 *THEELY-MD — AHORCADO* 〕══╗`,
    `║`,
    `║ ⚠️ Ya hay un juego activo~`,
    `║ Usa *.letra <letra>* para jugar`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const palabra = PALABRAS[Math.floor(Math.random() * PALABRAS.length)]
  const oculta  = Array(palabra.length).fill('_')

  sesiones[m.chat] = {
    palabra,
    oculta,
    vidas: VIDAS_MAX,
    intentadas: [],
    iniciador: m.sender,
    tiempo: setTimeout(() => {
      if (sesiones[m.chat]) {
        conn.sendMessage(m.chat, {
          text: `╔══〔 🌼 *THEELY-MD — AHORCADO* 〕══╗\n║\n║ ⏰ *¡Tiempo agotado!*\n║ La palabra era: *${palabra}*\n║\n╚══════════════════════════════════╝`
        })
        delete sesiones[m.chat]
      }
    }, 3 * 60 * 1000)
  }

  await m.react('🎯')
  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — AHORCADO* 〕══╗`,
      `║`,
      dibujarAhorcado(VIDAS_MAX),
      `║`,
      `║ 📝 *Palabra:* ${oculta.join(' ')}`,
      `║ ❤️ *Vidas:* ${VIDAS_MAX}`,
      `║`,
      `║ 💡 Usa *.letra <letra>* para jugar`,
      `║ ⏰ 3 minutos para terminar~`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n')
  }, { quoted: m })
}

handler.before = async (m, { conn, command, args }) => {
  if (command !== 'letra' || !sesiones[m.chat]) return false

  const sesion = sesiones[m.chat]
  const letra  = (args[0] || '').toLowerCase().trim()

  if (!letra || letra.length !== 1) {
    await m.reply(`❌ Escribe una sola letra: *.letra a*`)
    return true
  }

  if (sesion.intentadas.includes(letra)) {
    await m.reply(`⚠️ Ya intentaste esa letra~`)
    return true
  }

  sesion.intentadas.push(letra)
  const moneda = global.moneda || 'coins'

  if (sesion.palabra.includes(letra)) {
    for (let i = 0; i < sesion.palabra.length; i++) {
      if (sesion.palabra[i] === letra) sesion.oculta[i] = letra
    }

    if (!sesion.oculta.includes('_')) {
      // ── GANÓ ──
      clearTimeout(sesion.tiempo)
      const recompensa = Math.floor(Math.random() * (RECOMPENSA.max - RECOMPENSA.min + 1)) + RECOMPENSA.min

      if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = { coin: 0 }
      global.db.data.users[m.sender].coin = (global.db.data.users[m.sender].coin || 0) + recompensa
      await global.db.write()

      await m.react('🎉')
      await conn.sendMessage(m.chat, {
        text: [
          `╔══〔 🌼 *THEELY-MD — AHORCADO* 〕══╗`,
          `║`,
          `║ 🎉 *¡Ganaste!*`,
          `║`,
          `║ 📝 *Palabra:* ${sesion.palabra}`,
          `║ 👤 @${m.sender.split('@')[0]}`,
          `║ 💰 *+${recompensa}* ${moneda}`,
          `║`,
          `╚══════════════════════════════════╝`
        ].join('\n'),
        mentions: [m.sender]
      }, { quoted: m })

      delete sesiones[m.chat]
      return true
    }

    await m.react('✅')
  } else {
    sesion.vidas--

    if (sesion.vidas <= 0) {
      // ── PERDIÓ ──
      clearTimeout(sesion.tiempo)
      await m.react('💀')
      await conn.sendMessage(m.chat, {
        text: [
          `╔══〔 🌼 *THEELY-MD — AHORCADO* 〕══╗`,
          `║`,
          dibujarAhorcado(0),
          `║`,
          `║ ❌ *¡Perdiste!*`,
          `║ 📝 *Palabra era:* ${sesion.palabra}`,
          `║`,
          `╚══════════════════════════════════╝`
        ].join('\n')
      }, { quoted: m })

      delete sesiones[m.chat]
      return true
    }

    await m.react('❌')
  }

  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — AHORCADO* 〕══╗`,
      `║`,
      dibujarAhorcado(sesion.vidas),
      `║`,
      `║ 📝 *Palabra:* ${sesion.oculta.join(' ')}`,
      `║ ❤️ *Vidas:* ${sesion.vidas}`,
      `║ 🔤 *Intentadas:* ${sesion.intentadas.join(', ')}`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n')
  }, { quoted: m })

  return true
}

handler.help    = ['ahorcado', 'letra <letra>']
handler.tags    = ['game']
handler.command = ['ahorcado', 'hangman', 'letra']
handler.register = true
handler.desc    = 'Juega ahorcado y gana ElyCoins'

export default handler
