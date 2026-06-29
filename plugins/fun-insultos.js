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
    { texto: 'Eres más inestable que el wifi en una tormenta', nivel: 4 },
    { texto: 'Tu cerebro es como una antena sin señal', nivel: 3 },
    { texto: 'Eres más plano que una hoja de papel', nivel: 2 },
    { texto: 'Tienes menos chispa que un fósforo mojado', nivel: 3 },
    { texto: 'Si la inteligencia fuera oro, serías un ladrillo', nivel: 4 },
    { texto: 'Eres la personificación de un sueño frustrado', nivel: 4 },
    { texto: 'Tu vida es un meme sin gracia', nivel: 3 },
    { texto: 'Eres más transparente que el vidrio', nivel: 2 },
    { texto: 'Tus habilidades sociales son como un pez sin agua', nivel: 3 },
    { texto: 'Si el mundo fuera un videojuego, tú serías el tutorial', nivel: 4 },
    { texto: 'Eres más predecible que el clima en Londres', nivel: 2 },
    { texto: 'Tu existencia es un ruido de fondo', nivel: 3 },
    { texto: 'Eres más cortante que un cuchillo de plástico', nivel: 2 },
    { texto: 'Tienes la profundidad de un charco', nivel: 3 },
    { texto: 'Si la paciencia fuera una virtud, serías un santo', nivel: 4 },
    { texto: 'Eres el error que nadie quiere reportar', nivel: 4 },
    { texto: 'Tu creatividad es como un lápiz sin punta', nivel: 3 },
    { texto: 'Eres más frío que un iglú en invierno', nivel: 3 },
    { texto: 'Tus palabras son como ecos en el vacío', nivel: 2 },
    { texto: 'Si la belleza fuera una moneda, serías pobre', nivel: 4 },
    { texto: 'Eres más confuso que un laberinto sin salida', nivel: 3 },
    { texto: 'Tu actitud es un meme muerto', nivel: 3 },
    { texto: 'Eres más hueco que una flauta', nivel: 2 },
    { texto: 'Tienes menos gracia que un payaso triste', nivel: 3 },
    { texto: 'Si la originalidad existiera, la habrías perdido hace años', nivel: 4 },
    { texto: 'Eres el pañuelo que nadie quiere usar', nivel: 2 },
    { texto: 'Tu presencia es un bug en la matrix', nivel: 5 },
    { texto: 'Eres más viejo que el hilo negro', nivel: 2 },
    { texto: 'Tus ideas son recicladas de un 2x1', nivel: 3 },
    { texto: 'Si la seguridad fuera una vacuna, serías un placebo', nivel: 4 },
    { texto: 'Eres el spoiler de tu propia historia', nivel: 3 },
    { texto: 'Tu sentido del humor está en cuarentena', nivel: 3 },
    { texto: 'Eres más duro que un pan de ayer', nivel: 2 },
    { texto: 'Tienes menos ritmo que un robot sin batería', nivel: 3 },
    { texto: 'Si la vida fuera una broma, tú serías el remate', nivel: 5 },
    { texto: 'Eres más lento que un caracol en huelga', nivel: 3 },
    { texto: 'Tu energía es como una vela apagada', nivel: 2 },
    { texto: 'Eres el apagón de la fiesta', nivel: 3 },
    { texto: 'Tienes más problemas que un libro de matemáticas', nivel: 4 },
    { texto: 'Si la honestidad fuera moneda, no tendrías ni para un chicle', nivel: 4 },
    { texto: 'Eres más redundante que un eco', nivel: 2 },
    { texto: 'Tu lógica es como un rompecabezas sin piezas', nivel: 4 },
    { texto: 'Eres el chiste malo de la reunión', nivel: 3 },
    { texto: 'Tienes menos encanto que una piedra en el zapato', nivel: 3 },
    { texto: 'Si la ambición fuera un camino, estarías en un callejón sin salida', nivel: 4 },
    { texto: 'Eres el error de traducción de la vida', nivel: 4 },
    { texto: 'Tu voz es como papel de lija en una pizarra', nivel: 3 },
    { texto: 'Eres más falso que un billete de monopoly', nivel: 3 },
    { texto: 'Tienes menos visión que un topo con gafas', nivel: 3 },
    { texto: 'Si la diversión existiera, tú serías su antítesis', nivel: 4 },
    { texto: 'Eres el martes en una semana de vacaciones', nivel: 2 },
    { texto: 'Tu entusiasmo es como un globo desinflado', nivel: 3 },
    { texto: 'Eres más pesado que una conversación con un político', nivel: 4 },
    { texto: 'Tienes menos estilo que un calcetín de cuadros', nivel: 3 },
    { texto: 'Si la empatía fuera un árbol, serías un cactus', nivel: 4 },
    { texto: 'Eres más inútil que un cenicero en una moto', nivel: 5 },
    { texto: 'Tus argumentos son como agua en un colador', nivel: 4 },
    { texto: 'Eres la prueba de que Dios es un programador con bugs', nivel: 5 },
    { texto: 'Tienes menos gracia que un monólogo de político', nivel: 3 },
    { texto: 'Eres más raro que un perro verde', nivel: 2 },
    { texto: 'Tu talento es invisible, como el aire', nivel: 3 },
    { texto: 'Si la inteligencia fuera wifi, estarías sin cobertura', nivel: 5 },
    { texto: 'Eres el error 500 de la humanidad', nivel: 5 },
    { texto: 'Tienes menos luz que un callejón oscuro', nivel: 3 },
    { texto: 'Eres la decepción en formato humano', nivel: 4 }
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