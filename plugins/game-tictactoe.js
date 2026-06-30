const sesiones = {}
const RECOMPENSA = { min: 100, max: 250 }

function tableroTexto(tablero) {
  const e = (i) => tablero[i] || (i + 1)
  return [
    `║  ${e(0)} │ ${e(1)} │ ${e(2)}`,
    `║ ───┼───┼───`,
    `║  ${e(3)} │ ${e(4)} │ ${e(5)}`,
    `║ ───┼───┼───`,
    `║  ${e(6)} │ ${e(7)} │ ${e(8)}`
  ].join('\n')
}

function verificarGanador(t) {
  const lineas = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]
  for (const [a,b,c] of lineas) {
    if (t[a] && t[a] === t[b] && t[b] === t[c]) return t[a]
  }
  return t.every(c => c) ? 'empate' : null
}

const handler = async (m, { conn, args }) => {
  if (sesiones[m.chat]) return m.reply([
    `╔══〔 🌼 *THEELY-MD — 3 EN RAYA* 〕══╗`,
    `║`,
    `║ ⚠️ Ya hay una partida activa~`,
    `║ Usa *.jugar <número>* para jugar`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  const oponente = m.mentionedJid?.[0]
  if (!oponente) return m.reply([
    `╔══〔 🌼 *THEELY-MD — 3 EN RAYA* 〕══╗`,
    `║`,
    `║ 💡 *Uso:*`,
    `║ .ttt @oponente`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  if (oponente === m.sender) return m.reply(`❌ No puedes jugar contigo mismo~`)

  sesiones[m.chat] = {
    tablero: Array(9).fill(null),
    jugadorX: m.sender,
    jugadorO: oponente,
    turno: m.sender,
    tiempo: setTimeout(() => {
      if (sesiones[m.chat]) {
        conn.sendMessage(m.chat, { text: `⏰ Partida de 3 en raya cancelada por inactividad~` })
        delete sesiones[m.chat]
      }
    }, 5 * 60 * 1000)
  }

  await m.react('⭕')
  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — 3 EN RAYA* 〕══╗`,
      `║`,
      `║ ❌ @${m.sender.split('@')[0]} (X)`,
      `║ ⭕ @${oponente.split('@')[0]} (O)`,
      `║`,
      tableroTexto(Array(9).fill(null)),
      `║`,
      `║ 🎮 Turno de @${m.sender.split('@')[0]} (X)`,
      `║ 💡 Usa *.jugar <1-9>*`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'),
    mentions: [m.sender, oponente]
  }, { quoted: m })
}

handler.before = async (m, { conn, command, args }) => {
  if (command !== 'jugar' || !sesiones[m.chat]) return false

  const sesion = sesiones[m.chat]
  const moneda = global.moneda || 'coins'

  if (m.sender !== sesion.turno) {
    await m.reply(`⚠️ No es tu turno~`)
    return true
  }

  const pos = parseInt(args[0]) - 1
  if (isNaN(pos) || pos < 0 || pos > 8) {
    await m.reply(`❌ Posición inválida (1-9)~`)
    return true
  }

  if (sesion.tablero[pos]) {
    await m.reply(`❌ Esa posición ya está ocupada~`)
    return true
  }

  const simbolo = m.sender === sesion.jugadorX ? '❌' : '⭕'
  sesion.tablero[pos] = simbolo

  const resultado = verificarGanador(sesion.tablero)

  if (resultado) {
    clearTimeout(sesion.tiempo)

    if (resultado === 'empate') {
      await m.react('🤝')
      await conn.sendMessage(m.chat, {
        text: [
          `╔══〔 🌼 *THEELY-MD — 3 EN RAYA* 〕══╗`,
          `║`,
          tableroTexto(sesion.tablero),
          `║`,
          `║ 🤝 *¡Empate!*`,
          `║`,
          `╚══════════════════════════════════╝`
        ].join('\n')
      }, { quoted: m })
    } else {
      const ganador = m.sender
      const recompensa = Math.floor(Math.random() * (RECOMPENSA.max - RECOMPENSA.min + 1)) + RECOMPENSA.min

      if (!global.db.data.users[ganador]) global.db.data.users[ganador] = { coin: 0 }
      global.db.data.users[ganador].coin = (global.db.data.users[ganador].coin || 0) + recompensa
      await global.db.write()

      await m.react('🎉')
      await conn.sendMessage(m.chat, {
        text: [
          `╔══〔 🌼 *THEELY-MD — 3 EN RAYA* 〕══╗`,
          `║`,
          tableroTexto(sesion.tablero),
          `║`,
          `║ 🎉 *¡@${ganador.split('@')[0]} ganó!*`,
          `║ 💰 *+${recompensa}* ${moneda}`,
          `║`,
          `╚══════════════════════════════════╝`
        ].join('\n'),
        mentions: [ganador]
      }, { quoted: m })
    }

    delete sesiones[m.chat]
    return true
  }

  sesion.turno = sesion.turno === sesion.jugadorX ? sesion.jugadorO : sesion.jugadorX

  await m.react('✅')
  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — 3 EN RAYA* 〕══╗`,
      `║`,
      tableroTexto(sesion.tablero),
      `║`,
      `║ 🎮 Turno de @${sesion.turno.split('@')[0]}`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'),
    mentions: [sesion.turno]
  }, { quoted: m })

  return true
}

handler.help    = ['ttt @oponente', 'jugar <1-9>']
handler.tags    = ['multijugador']
handler.command = ['ttt', 'jugar', 'tictactoe']
handler.group   = true
handler.register = true
handler.desc    = '3 en raya por parejas, gana ElyCoins'

export default handler
