const VERDADES = [
  '¿Cuál es tu mayor miedo?',
  '¿Alguna vez has mentido a tu mejor amigo?',
  '¿De quién estás enamorado/a secretamente?',
  '¿Cuál es la cosa más vergonzosa que has hecho?',
  '¿Cuántas personas has besado?',
  '¿Has llorado por una serie o película?',
  '¿Cuál es tu mayor arrepentimiento?',
  '¿Tienes algún apodo secreto?',
  '¿Cuál es la mentira más grande que has dicho?',
  '¿A quién de aquí le guardarías un secreto?',
  '¿Alguna vez has hecho trampa en un examen?',
  '¿Cuál es tu mayor inseguridad?',
]

const RETOS = [
  'Escribe "Soy un pato" y envíalo al grupo~',
  'Di tu contraseña favorita con letras cambiadas~',
  'Escribe con los codos un mensaje~',
  'Haz 10 sentadillas y manda el audio~',
  'Escribe un poema de 4 líneas ahora mismo~',
  'Di 5 cosas buenas de la persona a tu derecha~',
  'Canta los primeros 10 segundos de tu canción favorita~',
  'Escribe un mensaje de amor a cualquier persona del grupo~',
  'Nombra 3 países sin la letra A en 10 segundos~',
  'Haz una imitación de alguien del grupo~',
  'Escribe una historia de 3 líneas ahora~',
  'Di el nombre completo de tu crush~',
]

const handler = async (m, { conn, command }) => {
  const esVerdad = command === 'verdad' || command === 'truth'
  const lista    = esVerdad ? VERDADES : RETOS
  const elegido  = lista[Math.floor(Math.random() * lista.length)]
  const emoji    = esVerdad ? '🤔' : '🎯'
  const titulo   = esVerdad ? 'VERDAD' : 'RETO'

  await conn.sendMessage(m.chat, {
    text: [
      `╔══〔 🌼 *THEELY-MD — ${titulo}* 〕══╗`,
      `║`,
      `║ ${emoji} *${titulo}:*`,
      `║`,
      `║ ${elegido}`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n')
  }, { quoted: m })

  await m.react(emoji)
}

handler.help    = ['verdad / reto']
handler.tags    = ['fun']
handler.command = ['verdad', 'reto', 'truth', 'dare', 'tor']
handler.desc    = 'Verdad o reto aleatorio'
export default handler
