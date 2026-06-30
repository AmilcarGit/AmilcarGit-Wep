import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

const personajes = [
  // 🌌 Anime (30)
  { nombre: 'Goku', pistas: ['Saiyajin', 'Kamehameha', 'Pelo amarillo', 'Come mucho'], categoria: '🌌 Anime' },
  { nombre: 'Naruto', pistas: ['Ninja', 'Rasengan', 'Zorro dentro', 'Quiere ser Hokage'], categoria: '🌌 Anime' },
  { nombre: 'Luffy', pistas: ['Sombrero de paja', 'Goma', 'Rey de piratas', 'Gear 5'], categoria: '🌌 Anime' },
  { nombre: 'Sasuke', pistas: ['Sharingan', 'Venganza', 'Orochimaru', 'Hermano de Itachi'], categoria: '🌌 Anime' },
  { nombre: 'Ichigo', pistas: ['Espada gigante', 'Soul Reaper', 'Hollow', 'Cabello naranja'], categoria: '🌌 Anime' },
  { nombre: 'Natsu', pistas: ['Dragón', 'Fuego', 'Fairy Tail', 'Quemar todo'], categoria: '🌌 Anime' },
  { nombre: 'Eren', pistas: ['Titán', 'Ataque', 'Mikasa', 'Libertad'], categoria: '🌌 Anime' },
  { nombre: 'Gon', pistas: ['Cazador', 'Caña de pescar', 'Nen', 'Kilua'], categoria: '🌌 Anime' },
  { nombre: 'Killua', pistas: ['Electricidad', 'Cazador', 'Aguja', 'Familia asesina'], categoria: '🌌 Anime' },
  { nombre: 'Tanjiro', pistas: ['Espada de sol', 'Nezuko', 'Demonio', 'Agua'], categoria: '🌌 Anime' },
  { nombre: 'Zoro', pistas: ['3 espadas', 'Pirata', 'Verdor', 'Luffy'], categoria: '🌌 Anime' },
  { nombre: 'Sanji', pistas: ['Cocina', 'Piernas', 'Cigarro', 'Vinsmoke'], categoria: '🌌 Anime' },
  { nombre: 'Saitama', pistas: ['Calvo', 'Un golpe', 'Heroe', 'Fuerte'], categoria: '🌌 Anime' },
  { nombre: 'Midoriya', pistas: ['One For All', 'Verde', 'Era una vez', 'All Might'], categoria: '🌌 Anime' },
  { nombre: 'Bakugo', pistas: ['Explosión', 'Dinamita', 'Agresivo', 'Ajedrez'], categoria: '🌌 Anime' },
  { nombre: 'Gojo', pistas: ['Ojos vendados', 'Infinito', 'Brujería', 'Satoru'], categoria: '🌌 Anime' },
  { nombre: 'Itachi', pistas: ['Sharingan', 'Uchiha', 'Crimen', 'Hermano'], categoria: '🌌 Anime' },
  { nombre: 'Kakashi', pistas: ['Sharingan', 'Chidori', 'Lee', 'Sensei'], categoria: '🌌 Anime' },
  { nombre: 'Jiraiya', pistas: ['Sapos', 'Ero-sennin', 'Tres', 'Naruto'], categoria: '🌌 Anime' },
  { nombre: 'Madara', pistas: ['Ojo de luna', 'Indra', 'Hashirama', 'Uchiha'], categoria: '🌌 Anime' },
  { nombre: 'Todoroki', pistas: ['Medio fuego', 'Medio hielo', 'Endeavor', 'Héroe'], categoria: '🌌 Anime' },
  { nombre: 'Levi', pistas: ['Capitán', 'Limpieza', 'Titán', 'Survey Corps'], categoria: '🌌 Anime' },
  { nombre: 'Mikasa', pistas: ['Eren', 'Ackerman', 'Fuerte', 'Bufanda'], categoria: '🌌 Anime' },
  { nombre: 'Armin', pistas: ['Estratega', 'Titán', 'Colosal', 'Libro'], categoria: '🌌 Anime' },
  { nombre: 'Kirishima', pistas: ['Endurecimiento', 'Héroe', 'Alta', 'Bakugo'], categoria: '🌌 Anime' },
  { nombre: 'Denki', pistas: ['Electricidad', 'Pikachu', 'Eléctrico', 'Pokémon'], categoria: '🌌 Anime' },
  { nombre: 'Kusuo', pistas: ['Telepatía', 'Psíquico', 'Tiene poder', 'Tiene un amigo'], categoria: '🌌 Anime' },
  { nombre: 'Mob', pistas: ['Psíquico', 'Rompechico', 'De 100', 'Tiene una hermana'], categoria: '🌌 Anime' },
  { nombre: 'Rimuru', pistas: ['Slime', 'Isekai', 'Come monstruos', 'Reina'], categoria: '🌌 Anime' },
  { nombre: 'Ainz', pistas: ['Momonga', 'Tipo calavera', 'World', 'Sombra'], categoria: '🌌 Anime' },

  // 🎮 Videojuegos (30)
  { nombre: 'Mario', pistas: ['Fontanero', 'Sombrero rojo', 'Princesa', 'Peluche'], categoria: '🎮 Videojuegos' },
  { nombre: 'Pikachu', pistas: ['Electricidad', 'Amarillo', 'Pokémon', 'Mejillas'], categoria: '🎮 Videojuegos' },
  { nombre: 'Sonic', pistas: ['Erizo', 'Azul', 'Veloz', 'Anillos'], categoria: '🎮 Videojuegos' },
  { nombre: 'Kratos', pistas: ['God of War', 'Espartano', 'Hachas', 'Atreus'], categoria: '🎮 Videojuegos' },
  { nombre: 'Master Chief', pistas: ['Halo', 'Casco verde', 'Jefe maestro', 'Cortana'], categoria: '🎮 Videojuegos' },
  { nombre: 'Link', pistas: ['Zelda', 'Sword', 'Hyrule', 'Verdor'], categoria: '🎮 Videojuegos' },
  { nombre: 'Mario', pistas: ['Nintendo', 'Saltos', 'Hongos', 'Princesa Peach'], categoria: '🎮 Videojuegos' },
  { nombre: 'Steve', pistas: ['Minecraft', 'Cubico', 'Excavación', 'Bloques'], categoria: '🎮 Videojuegos' },
  { nombre: 'Cloud', pistas: ['Final Fantasy', 'Buster', 'Sword', 'Sombra'], categoria: '🎮 Videojuegos' },
  { nombre: 'Ryu', pistas: ['Street Fighter', 'Hadouken', 'Karate', 'Blanco'], categoria: '🎮 Videojuegos' },
  { nombre: 'Lara Croft', pistas: ['Tomb Raider', 'Arqueólogo', 'Pistolas', 'Tren'], categoria: '🎮 Videojuegos' },
  { nombre: 'Gordon Freeman', pistas: ['Half Life', 'Física', 'CPU', 'Gafas'], categoria: '🎮 Videojuegos' },
  { nombre: 'Solid Snake', pistas: ['Metal Gear', 'Sigilo', 'Box', 'Dobla'], categoria: '🎮 Videojuegos' },
  { nombre: 'Alyx', pistas: ['Half Life', 'Vance', 'Ciudadela', 'Hack'], categoria: '🎮 Videojuegos' },
  { nombre: 'Nathan Drake', pistas: ['Uncharted', 'Tesoro', 'Pirata', 'Treasure'], categoria: '🎮 Videojuegos' },
  { nombre: 'Spider-Man', pistas: ['Tela de araña', 'Peter Parker', 'Sling', 'NYC'], categoria: '🎮 Videojuegos' },
  { nombre: 'Geralt', pistas: ['The Witcher', 'Espada', 'El asesino', 'Yennefer'], categoria: '🎮 Videojuegos' },
  { nombre: 'Cloud', pistas: ['Espada gigante', 'Materia', 'Lanza', 'Sword'], categoria: '🎮 Videojuegos' },
  { nombre: 'Mega Man', pistas: ['Capcom', 'Robots', 'Armas', 'Rockman'], categoria: '🎮 Videojuegos' },
  { nombre: 'Kirby', pistas: ['Esfera rosa', 'Nintendo', 'Copia', 'Come y escupe'], categoria: '🎮 Videojuegos' },
  { nombre: 'Samus', pistas: ['Metroid', 'Armadura', 'Cañón', 'Chozo'], categoria: '🎮 Videojuegos' },
  { nombre: 'Donkey Kong', pistas: ['Mono', 'Cocos', 'Nintendo', 'Barrel'], categoria: '🎮 Videojuegos' },
  { nombre: 'Zelda', pistas: ['Princesa', 'Hylia', 'Sage', 'Trifuerza'], categoria: '🎮 Videojuegos' },
  { nombre: 'Marth', pistas: ['Fire Emblem', 'Espada', 'Falchion', 'Lider'], categoria: '🎮 Videojuegos' },
  { nombre: 'Pac-Man', pistas: ['Come almas', 'Laberinto', 'Arcade', 'Puntos'], categoria: '🎮 Videojuegos' },
  { nombre: 'Bison', pistas: ['SF', 'Dictador', 'Psycho', 'Capcom'], categoria: '🎮 Videojuegos' },
  { nombre: 'Ryu', pistas: ['Street', 'Hadoken', 'Tatsumaki', 'Ken'], categoria: '🎮 Videojuegos' },
  { nombre: 'Ken', pistas: ['Sigh', 'Street Fighter', 'Amigo', 'Fuego'], categoria: '🎮 Videojuegos' },
  { nombre: 'Blanka', pistas: ['Electricidad', 'Bestia', 'Street', 'Verde'], categoria: '🎮 Videojuegos' },
  { nombre: 'Yoshi', pistas: ['Nintendo', 'Dinosaurio', 'Huevos', 'Mario'], categoria: '🎮 Videojuegos' },

  // 🎬 Series y Películas (30)
  { nombre: 'Harry Potter', pistas: ['Cicatriz', 'Magia', 'Acebo', 'Voldemort'], categoria: '🎬 Series/Películas' },
  { nombre: 'Spider-Man', pistas: ['Telas', 'Araña', 'NYC', 'Stark'], categoria: '🎬 Series/Películas' },
  { nombre: 'Iron Man', pistas: ['Tony Stark', 'Armadura', 'Jarvis', 'Ferrero'], categoria: '🎬 Series/Películas' },
  { nombre: 'Batman', pistas: ['Murciélago', 'Gotham', 'Lujoso', 'Coche'], categoria: '🎬 Series/Películas' },
  { nombre: 'Superman', pistas: ['Krypton', 'S', 'Metrópolis', 'Mundo'], categoria: '🎬 Series/Películas' },
  { nombre: 'Wonder Woman', pistas: ['Mujer maravilla', 'Themyscira', 'Lazo', 'Tierra'], categoria: '🎬 Series/Películas' },
  { nombre: 'Shrek', pistas: ['Ogro', 'Pantano', 'Burro', 'Fiona'], categoria: '🎬 Series/Películas' },
  { nombre: 'Frodo', pistas: ['Anillo', 'Comunidad', 'Sauron', 'Hobbit'], categoria: '🎬 Series/Películas' },
  { nombre: 'Gandalf', pistas: ['Mago', 'Blanco', 'Frodo', 'Aragorn'], categoria: '🎬 Series/Películas' },
  { nombre: 'Aragorn', pistas: ['Ranger', 'Espada', 'Andúril', 'Gondor'], categoria: '🎬 Series/Películas' },
  { nombre: 'Jack Sparrow', pistas: ['Pirata', 'Barco', 'Brújula', 'Perla'], categoria: '🎬 Series/Películas' },
  { nombre: 'Tony Montana', pistas: ['Scarface', 'Miami', 'Muz', 'Chica'], categoria: '🎬 Series/Películas' },
  { nombre: 'T-Rex', pistas: ['Dinosaurio', 'Parque', 'Jurásico', 'Come'], categoria: '🎬 Series/Películas' },
  { nombre: 'Indiana Jones', pistas: ['Latigo', 'Sombrero', 'Arqueólogo', 'Antigua'], categoria: '🎬 Series/Películas' },
  { nombre: 'James Bond', pistas: ['007', 'Espía', 'Martini', 'M'], categoria: '🎬 Series/Películas' },
  { nombre: 'Gollum', pistas: ['Anillo', 'Mediano', 'Precioso', 'Sauron'], categoria: '🎬 Series/Películas' },
  { nombre: 'Sauron', pistas: ['Señor oscuro', 'Anillo', 'Mordor', 'Ojo'], categoria: '🎬 Series/Películas' },
  { nombre: 'Thanos', pistas: ['Guantelete', 'Infinito', 'Titan', 'Chasquido'], categoria: '🎬 Series/Películas' },
  { nombre: 'Pikachu', pistas: ['Pokémon', 'Amarillo', 'Electricidad', 'Ash'], categoria: '🎬 Series/Películas' },
  { nombre: 'Batman', pistas: ['DC', 'Mascara', 'Alfred', 'Gotham'], categoria: '🎬 Series/Películas' },
  { nombre: 'Jon Snow', pistas: ['Invierno', 'Hielo', 'Noche', 'Lobos'], categoria: '🎬 Series/Películas' },
  { nombre: 'Cersei Lannister', pistas: ['Trono', 'Leones', 'Fuego', 'Jaime'], categoria: '🎬 Series/Películas' },
  { nombre: 'Khaleesi', pistas: ['Dragones', 'Fuego', 'Tierra', 'Mesa'], categoria: '🎬 Series/Películas' },
  { nombre: 'Rick Grimes', pistas: ['Zombies', 'Comisario', 'Carl', 'Kirium'], categoria: '🎬 Series/Películas' },
  { nombre: 'Daryl', pistas: ['Crossbow', 'Wheel', 'Cazador', 'Biker'], categoria: '🎬 Series/Películas' },
  { nombre: 'Michonne', pistas: ['Samurai', 'Zombies', 'Katana', 'Miedo'], categoria: '🎬 Series/Películas' },
  { nombre: 'Lucifer Morningstar', pistas: ['Diablo', 'Cielo', 'Clubes', 'Chloe'], categoria: '🎬 Series/Películas' },
  { nombre: 'Sherlock', pistas: ['Detective', 'Baker St', 'Watson', 'Moriarty'], categoria: '🎬 Series/Películas' },
  { nombre: 'Voldemort', pistas: ['Riddle', 'Slytherin', 'Muerte', 'Harry'], categoria: '🎬 Series/Películas' },
  { nombre: 'Dumbledore', pistas: ['Fénix', 'Magia', 'Elixir', 'Albus'], categoria: '🎬 Series/Películas' },

  // 🧠 Historia y Ciencia (30)
  { nombre: 'Einstein', pistas: ['Relatividad', 'E=mc²', 'Física', 'Cabello'], categoria: '🧠 Historia' },
  { nombre: 'Da Vinci', pistas: ['Mona Lisa', 'Genio', 'Renacimiento', 'Hombre de Vitruvio'], categoria: '🧠 Historia' },
  { nombre: 'Cleopatra', pistas: ['Reina', 'Egipto', 'Serpiente', 'César'], categoria: '🧠 Historia' },
  { nombre: 'Colón', pistas: ['1492', 'América', 'España', 'Pinta'], categoria: '🧠 Historia' },
  { nombre: 'Newton', pistas: ['Manzana', 'Gravedad', 'Física', 'Óptica'], categoria: '🧠 Historia' },
  { nombre: 'Darwin', pistas: ['Evolución', 'Galápagos', 'Origen', 'Especies'], categoria: '🧠 Historia' },
  { nombre: 'Napoleón', pistas: ['Corsica', 'Francia', 'Waterloo', 'Imperio'], categoria: '🧠 Historia' },
  { nombre: 'Julio César', pistas: ['Roma', 'Iulio', 'Tercera', 'Idus'], categoria: '🧠 Historia' },
  { nombre: 'Hitler', pistas: ['Nazi', 'Alemania', 'Segunda', 'Odio'], categoria: '🧠 Historia' },
  { nombre: 'Bolívar', pistas: ['Libertador', 'América', 'Gran', 'Caracas'], categoria: '🧠 Historia' },
  { nombre: 'San Martín', pistas: ['Argentina', 'Mendoza', 'Chile', 'España'], categoria: '🧠 Historia' },
  { nombre: 'Tupac Amaru', pistas: ['Perú', 'Mártir', 'Inca', 'Rebelde'], categoria: '🧠 Historia' },
  { nombre: 'Mártin Lutero', pistas: ['Reforma', '99 tesis', 'Luteranismo', 'Alemania'], categoria: '🧠 Historia' },
  { nombre: 'Galileo', pistas: ['Telescopio', 'Júpiter', 'Italia', 'Iglesia'], categoria: '🧠 Historia' },
  { nombre: 'Pasteur', pistas: ['Vacuna', 'Médico', 'Pasteurización', 'Microbio'], categoria: '🧠 Historia' },
  { nombre: 'Curie', pistas: ['Radio', 'Polonio', 'Nobel', 'Científica'], categoria: '🧠 Historia' },
  { nombre: 'Hawking', pistas: ['Agujero negro', 'Cosmos', 'Física', 'Silla'], categoria: '🧠 Historia' },
  { nombre: 'Cristóbal', pistas: ['Colón', 'Descubrimiento', 'Isla', 'Fracaso'], categoria: '🧠 Historia' },
  { nombre: 'Ronaldo', pistas: ['Fútbol', 'Brasil', 'Goles', 'Pele'], categoria: '🧠 Historia' },
  { nombre: 'Pelé', pistas: ['Rey', 'Brasil', 'Goles', 'Mundial'], categoria: '🧠 Historia' },
  { nombre: 'Maradona', pistas: ['Dios', 'Argentina', 'Gol', 'Mano'], categoria: '🧠 Historia' },
  { nombre: 'Ali', pistas: ['Boxeo', 'Muhammad', 'Pelea', 'Grandes'], categoria: '🧠 Historia' },
  { nombre: 'Jordan', pistas: ['Baloncesto', '22', 'Tiempo', 'Cielo'], categoria: '🧠 Historia' },
  { nombre: 'Tyson', pistas: ['Boxeo', 'Mike', 'Mordida', 'Campeón'], categoria: '🧠 Historia' },
  { nombre: 'Mayweather', pistas: ['Boxeo', 'Invencible', 'Money', 'Victorias'], categoria: '🧠 Historia' },
  { nombre: 'Gates', pistas: ['Microsoft', 'Bill', 'Windows', 'Billionario'], categoria: '🧠 Historia' },
  { nombre: 'Jobs', pistas: ['Apple', 'Steve', 'Mac', 'iPhone'], categoria: '🧠 Historia' },
  { nombre: 'Musk', pistas: ['Tesla', 'SpaceX', 'Elon', 'PayPal'], categoria: '🧠 Historia' },
  { nombre: 'Zuckerberg', pistas: ['Facebook', 'Meta', 'Mark', 'Red social'], categoria: '🧠 Historia' },
  { nombre: 'Bezos', pistas: ['Amazon', 'Jeff', 'Libros', 'Rico'], categoria: '🧠 Historia' }
]

function crearMensaje(chat, text, userId, m, opciones = []) {
  const rows = opciones.map((nombre, index) => ({
    title: nombre,
    id: `adivina_${index}_${userId}`
  }))

  const buttons = [{
    name: 'single_select',
    buttonParamsJson: JSON.stringify({
      title: '🎯 ELIGE UN PERSONAJE',
      sections: [{
        title: '🔽 Opciones disponibles',
        rows
      }]
    })
  }]

  return generateWAMessageFromContent(chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {},
        interactiveMessage: proto.Message.InteractiveMessage.create({
          header: {
            title: '🌼 THEELY-MD — ADIVINA',
            subtitle: '¿Quién es el personaje?',
            hasMediaAttachment: false
          },
          body: { text },
          footer: { text: '🎮 Powered by TheEly-MD 🌼' },
          nativeFlowMessage: { buttons }
        })
      }
    }
  }, { quoted: m })
}

let handler = async (m, { conn }) => {
  const randomPersonaje = personajes[Math.floor(Math.random() * personajes.length)]
  const opciones = personajes.sort(() => Math.random() - 0.5).slice(0, 4)
  if (!opciones.includes(randomPersonaje)) opciones[Math.floor(Math.random() * 4)] = randomPersonaje

  global.adivina = global.adivina || {}
  global.adivina[m.sender] = {
    personaje: randomPersonaje,
    opciones: opciones,
    pistaNivel: 0,
    inicio: Date.now()
  }

  const pista = randomPersonaje.pistas[0]
  const texto = [
    `╔══〔 🌼 *ADIVINA EL PERSONAJE* 〕══╗`,
    `║`,
    `║ 📂 *Categoría:* ${randomPersonaje.categoria}`,
    `║ 🔍 *Pista 1/4:* ${pista}`,
    `║ ⭐ *Pistas usadas:* 0/4`,
    `║`,
    `║ 👇 *Elige el personaje que creas*`,
    `║`,
    ...opciones.map(o => `║ • ${o}`),
    `║`,
    `║ 💡 *Tienes 4 pistas disponibles*`,
    `║ 📌 *Escribe .pista para más ayuda*`,
    `╚══════════════════════════════════╝`
  ].join('\n')

  const msg = crearMensaje(m.chat, texto, m.sender, m, opciones)
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

handler.before = async (m, { conn }) => {
  const nativeFlow = m.message?.interactiveResponseMessage?.nativeFlowResponseMessage
  if (!nativeFlow) return

  try {
    const data = JSON.parse(nativeFlow.paramsJson || '{}')
    const id = data.id
    if (!id?.startsWith('adivina_')) return

    const [, respuestaIndex, userId] = id.split('_')
    const juego = global.adivina?.[userId]
    if (!juego) {
      await conn.sendMessage(m.chat, { text: '❌ *No hay juego activo.* Usa .adivina para empezar.' }, { quoted: m })
      return true
    }

    const seleccion = parseInt(respuestaIndex)
    const opcionElegida = juego.opciones[seleccion]
    const correcta = opcionElegida === juego.personaje.nombre

    const tiempoSeg = Math.floor((Date.now() - juego.inicio) / 1000)
    const moneda = global.moneda || '🌼 ElyCoins'

    let mensaje = [
      `╔══〔 🌼 *ADIVINA EL PERSONAJE* 〕══╗`,
      `║`,
      correcta ? `║ ✅ *¡CORRECTO!* 🎉` : `║ ❌ *¡INCORRECTO!*`,
      `║`,
      `║ 🎯 *Personaje:* ${juego.personaje.nombre}`,
      `║ 📂 *Categoría:* ${juego.personaje.categoria}`,
      `║ ⏱️ *Tiempo:* ${tiempoSeg}s`,
      `║`
    ]

    if (correcta) {
      const xp = Math.floor(Math.random() * 40) + 20
      const coins = Math.floor(Math.random() * 80) + 30
      const user = global.db.data.users[userId]
      if (!user) global.db.data.users[userId] = { exp: 0, coin: 0 }
      user.exp = (user.exp || 0) + xp
      user.coin = (user.coin || 0) + coins
      await global.db.write()
      mensaje.push(`║ 🎁 *Premios:* +${xp} XP  +${coins} ${moneda}`)
    } else {
      mensaje.push(`║ 💡 *Pistas disponibles: 4/4*`)
    }

    mensaje.push(
      `║`,
      `║ 💡 Usa .adivina para jugar otra vez`,
      `╚══════════════════════════════════╝`
    )

    delete global.adivina[userId]
    await conn.sendMessage(m.chat, { text: mensaje.join('\n') }, { quoted: m })
    await m.react(correcta ? '✅' : '❌')
    return true

  } catch (e) {
    console.error('❌ Error en adivina:', e.message)
  }
}

handler.command = ['adivina']
handler.tags    = ['game']
handler.help    = ['adivina']
handler.register = true
handler.desc    = 'Adivina el personaje con pistas'

export default handler