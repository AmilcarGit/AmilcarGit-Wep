import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

const EMOJIS = ['🍎','🍌','🍇','🍓','🍑','🍒','🥝','🍍']

function generarTablero() {
  const pares = [...EMOJIS, ...EMOJIS]
  for (let i = pares.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pares[i], pares[j]] = [pares[j], pares[i]]
  }
  return pares
}

function tableroVisual(tablero, descubiertas, encontradas) {
  return tablero.map((_, i) => {
    if (encontradas.includes(i)) return tablero[i]
    if (descubiertas.includes(i)) return tablero[i]
    return '🔲'
  }).reduce((acc, e, i) => {
    acc += e + ' '
    if ((i + 1) % 4 === 0) acc += '\n║ '
    return acc
  }, '')
}

function crearMensaje(chat, text, userId, m, tablero, encontradas) {
  const rows = tablero.map((_, i) => ({
    title: encontradas.includes(i) ? `✅ Casilla ${i + 1} (encontrada)` : `🔲 Casilla ${i + 1}`,
    id: `memoria_${i}_${userId}`
  })).filter(r => !r.title.includes('encontrada'))

  const buttons = [{
    name: 'single_select',
    buttonParamsJson: JSON.stringify({
      title: '🎴 ELIGE UNA CASILLA',
      sections: [{ title: '🃏 Tablero (16 casillas)', rows }]
    })
  }]

  return generateWAMessageFromContent(chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {},
        interactiveMessage: proto.Message.InteractiveMessage.create({
          header: { title: '🌼 THEELY-MD — MEMORIA', subtitle: 'Encuentra las parejas', hasMediaAttachment: false },
          body: { text },
          footer: { text: '🎮 Powered by TheEly-MD 🌼' },
          nativeFlowMessage: { buttons }
        })
      }
    }
  }, { quoted: m })
}

let handler = async (m, { conn }) => {
  global.memoria = global.memoria || {}

  if (global.memoria[m.sender]) return m.reply([
    `╔══〔 🌼 *MEMORIA* 〕══╗`,
    `║`,
    `║ ⚠️ Ya tienes un juego activo~`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const tablero = generarTablero()

  global.memoria[m.sender] = {
    tablero,
    descubiertas: [],
    encontradas: [],
    intentos: 0,
    inicio: Date.now()
  }

  await m.react('🎴')

  const text = [
    `╔══〔 🌼 *MEMORIA* 〕══╗`,
    `║`,
    `║ ${tableroVisual(tablero, [], [])}`,
    `║`,
    `║ 🔲 *Pares encontrados:* 0/8`,
    `║`,
    `║ 👇 *Elige la primera casilla~*`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n')

  const msg = crearMensaje(m.chat, text, m.sender, m, tablero, [])
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

handler.before = async (m, { conn }) => {
  const nativeFlow = m.message?.interactiveResponseMessage?.nativeFlowResponseMessage
  if (!nativeFlow) return

  try {
    const data = JSON.parse(nativeFlow.paramsJson || '{}')
    const id = data.id
    if (!id?.startsWith('memoria_')) return

    const [, pos, userId] = id.split('_')
    const game = global.memoria?.[userId]
    if (!game) {
      await conn.sendMessage(m.chat, { text: `❌ No hay juego activo~ Usa *.memoria*` }, { quoted: m })
      return true
    }

    const posicion = parseInt(pos)
    const moneda = global.moneda || 'coins'

    if (game.encontradas.includes(posicion) || game.descubiertas.includes(posicion)) {
      await conn.sendMessage(m.chat, { text: `⚠️ Esa casilla ya fue revelada~` }, { quoted: m })
      return true
    }

    game.descubiertas.push(posicion)

    if (game.descubiertas.length === 2) {
      game.intentos++
      const [a, b] = game.descubiertas

      if (game.tablero[a] === game.tablero[b]) {
        game.encontradas.push(a, b)
        game.descubiertas = []

        if (game.encontradas.length === game.tablero.length) {
          const tiempoSeg = Math.floor((Date.now() - game.inicio) / 1000)
          const recompensa = Math.max(50, 300 - (game.intentos * 10))

          if (!global.db.data.users[userId]) global.db.data.users[userId] = { coin: 0 }
          global.db.data.users[userId].coin = (global.db.data.users[userId].coin || 0) + recompensa
          await global.db.write()

          const text = [
            `╔══〔 🌼 *MEMORIA* 〕══╗`,
            `║`,
            `║ ${tableroVisual(game.tablero, [], game.encontradas)}`,
            `║`,
            `║ 🏆 *¡Completado!*`,
            `║ ⏱️ *Tiempo:* ${tiempoSeg}s`,
            `║ 🔄 *Intentos:* ${game.intentos}`,
            `║ 💰 *+${recompensa}* ${moneda}`,
            `║`,
            `╚══════════════════════════════════╝`
          ].join('\n')

          delete global.memoria[userId]
          await conn.sendMessage(m.chat, { text }, { quoted: m })
          await m.react('🏆')
          return true
        }

        const text = [
          `╔══〔 🌼 *MEMORIA* 〕══╗`,
          `║`,
          `║ ${tableroVisual(game.tablero, [], game.encontradas)}`,
          `║`,
          `║ ✅ *¡Pareja encontrada!*`,
          `║ 🔲 *Pares:* ${game.encontradas.length / 2}/8`,
          `║`,
          `╚══════════════════════════════════╝`
        ].join('\n')

        await m.react('✅')
        const msg = crearMensaje(m.chat, text, userId, m, game.tablero, game.encontradas)
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
        return true
      } else {
        const text = [
          `╔══〔 🌼 *MEMORIA* 〕══╗`,
          `║`,
          `║ ${tableroVisual(game.tablero, game.descubiertas, game.encontradas)}`,
          `║`,
          `║ ❌ *No coinciden~*`,
          `║ 🔲 *Pares:* ${game.encontradas.length / 2}/8`,
          `║`,
          `╚══════════════════════════════════╝`
        ].join('\n')

        game.descubiertas = []
        await m.react('❌')
        const msg = crearMensaje(m.chat, text, userId, m, game.tablero, game.encontradas)
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
        return true
      }
    }

    const text = [
      `╔══〔 🌼 *MEMORIA* 〕══╗`,
      `║`,
      `║ ${tableroVisual(game.tablero, game.descubiertas, game.encontradas)}`,
      `║`,
      `║ 👇 *Elige la segunda casilla~*`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n')

    const msg = crearMensaje(m.chat, text, userId, m, game.tablero, game.encontradas)
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    return true

  } catch (e) {
    console.error('❌ Error en memoria:', e.message)
  }
}

handler.command = ['memoria', 'memory']
handler.tags    = ['game']
handler.help    = ['memoria']
handler.register = true
handler.desc    = 'Encuentra las parejas y gana ElyCoins'

export default handler
