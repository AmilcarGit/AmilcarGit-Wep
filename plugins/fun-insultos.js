const handler = async (m, { conn, args }) => {
  const insultos = [
    { texto: 'Eres más tonto que un zapato', nivel: 2 },
    { texto: 'Tu coeficiente intelectual es negativo', nivel: 4 },
    { texto: 'Si la estupidez fuera un deporte, serías campeón olímpico', nivel: 5 },
    { texto: 'Eres la prueba de que Dios tiene sentido del humor', nivel: 3 },
    { texto: 'Tu cerebro debe estar en huelga', nivel: 3 },
    { texto: 'Ni siquiera un GPS podría encontrar tu sentido común', nivel: 4 },
    { texto: 'Eres la versión humana de un error 404', nivel: 3 },
    { texto: 'Tu árbol genealógico es un círculo', nivel: 5 },
    { texto: 'Eres como una taza de café sin café', nivel: 2 },
    { texto: 'Si la fealdad fuera pecado, serías el papa', nivel: 4 },
    { texto: 'Tienes menos futuro que un cigarro en un pulmón', nivel: 4 },
    { texto: 'Eres el motivo por el que Wikipedia tiene advertencias', nivel: 3 },
    { texto: 'Tu vida es un spoiler de una película mala', nivel: 3 },
    { texto: 'Eres más falso que un billete de 3 euros', nivel: 2 },
    { texto: 'Si el burro volara, tú serías piloto', nivel: 4 },
    { texto: 'Tu única habilidad es ser un mal ejemplo', nivel: 3 },
    { texto: 'Eres el residuo de la evolución', nivel: 5 },
    { texto: 'Tu opinión es como un ombligo: todos tienen uno, pero no sirve para nada', nivel: 3 },
    { texto: 'Eres más aburrido que ver crecer el césped', nivel: 2 },
    { texto: 'Si la estupidez doliera, estarías en coma', nivel: 4 },
    { texto: 'Eres más lento que el WiFi de mi abuela', nivel: 3 },
    { texto: 'Tu cara parece un mapa de carreteras', nivel: 3 },
    { texto: 'Tienes la personalidad de una piedra', nivel: 2 },
    { texto: 'Si el sarcasmo fuera oxígeno, estarías en la estratosfera', nivel: 5 },
    { texto: 'Eres más denso que el plomo', nivel: 4 },
    { texto: 'Tu historia de amor es más falsa que la de los políticos', nivel: 4 },
    { texto: 'Eres el único que puede perderse en una línea recta', nivel: 3 },
    { texto: 'Tu cerebro está en modo avión', nivel: 3 },
    { texto: 'Eres más inútil que un paraguas en un tsunami', nivel: 5 },
    { texto: 'Eres el claro ejemplo de que la evolución falla', nivel: 4 },
    { texto: 'Si el talento fuera electricidad, serías un apagón', nivel: 4 },
    { texto: 'Tienes más cara que espalda', nivel: 2 },
    { texto: 'Tus ideas son tan brillantes como el carbón', nivel: 3 },
    { texto: 'Eres más pesado que el plomo', nivel: 4 },
    { texto: 'Tu existencia es un bug en la matrix', nivel: 5 },
    { texto: 'Eres más corriente que un grifo de agua', nivel: 2 },
    { texto: 'Ni en el fondo del mar tienes tanta presión', nivel: 3 },
    { texto: 'Eres más soso que pan sin sal', nivel: 2 },
    { texto: 'Si la ignorancia fuera un superpoder, serías un superhéroe', nivel: 5 },
    { texto: 'Eres más inestable que el wifi en una tormenta', nivel: 4 }
  ]

  const usuario = args[0] ? args[0].replace(/@/g, '') : m.sender.split('@')[0]
  const insulto = insultos[Math.floor(Math.random() * insultos.length)]
  const nivelOfensa = insulto.nivel
  const barras = '█'.repeat(nivelOfensa) + '░'.repeat(5 - nivelOfensa)

  const user = global.db.data.users[m.sender]
  if (!user.insultosRecibidos) user.insultosRecibidos = 0
  user.insultosRecibidos += 1

  const mensaje = [
    `╔══〔 🌼 *THEELY-MD — INSULTO* 〕══╗`,
    `║`,
    `║  🎯 *Para:* ${usuario}`,
    `║`,
    `║  💬 *"${insulto.texto}"*`,
    `║`,
    `║  📊 *Nivel de ofensa:* ${barras} ${nivelOfensa}/5`,
    `║  😂 *Insultos lanzados:* ${user.insultosRecibidos}`,
    `║`,
    `║  ⚠️ *Usar con responsabilidad*`,
    `╚══════════════════════════════════╝`
  ].join('\n')

  await m.react('😈')
  await m.reply(mensaje)
}

handler.help = ['insulto [@usuario]']
handler.tags = ['fun']
handler.command = ['insulto', 'insult']
handler.register = true
handler.desc = 'Insulta a alguien de forma graciosa'
export default handler