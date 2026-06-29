import fetch from 'node-fetch'

const API_KEY = 'dvyer506422062605'
const API_URL = 'https://dv-yer-api.online/apkmoddl'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const busqueda = args.join(' ').trim()

  if (!busqueda) return m.reply([
    `╔══〔 📱 *THEELY-MD — APK MOD* 〕══╗`,
    `║`,
    `║ 💡 *Uso:*`,
    `║ ${usedPrefix + command} <nombre del juego/app>`,
    `║`,
    `║ 📌 *Ejemplos:*`,
    `║ ${usedPrefix + command} free fire`,
    `║ ${usedPrefix + command} subway surfers`,
    `║`,
    `╚══════════════════════════════════╝`
  ].join('\n'))

  await m.react('🔍')

  try {
    const res = await fetch(`${API_URL}?q=${encodeURIComponent(busqueda)}&pick=1&apikey=${API_KEY}`, {
      headers: { 'User-Agent': 'TheElyMD/2.0' },
      timeout: 15000
    })

    if (!res.ok) throw new Error(`Servidor respondió: ${res.status}`)
    const json = await res.json()
    if (!json.ok) throw new Error('No se encontraron resultados')

    const {
      title, version, description, developer, category,
      requirements, filesize, published_at, icon,
      download_url, filename
    } = json

    const info = [
      `╔══〔 📱 *${title.toUpperCase()}* 〕══╗`,
      `║`,
      `║ 🆔 *Versión:*       ${version}`,
      `║ 👨‍💻 *Desarrollador:* ${developer}`,
      `║ 📂 *Categoría:*     ${category}`,
      `║ 📦 *Tamaño:*        ${filesize}`,
      `║ 📱 *Requisitos:*    ${requirements}`,
      `║ 📅 *Publicado:*     ${published_at}`,
      `║`,
      `║ 📝 *Descripción:*`,
      `║ ${description.replace(/\n/g, ' ').slice(0, 250)}...`,
      `║`,
      `║ ⏳ *Descargando archivo...*`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n')

    if (icon) {
      try {
        await conn.sendMessage(m.chat, { image: { url: icon }, caption: info }, { quoted: m })
      } catch {
        await conn.sendMessage(m.chat, { text: info }, { quoted: m })
      }
    } else {
      await conn.sendMessage(m.chat, { text: info }, { quoted: m })
    }

    await m.react('📥')

    await conn.sendMessage(m.chat, {
      document: { url: download_url },
      mimetype: 'application/vnd.android.package-archive',
      fileName: filename || `${title.replace(/\s+/g, '_')}_v${version}.apk`,
      caption: [
        `╔══〔 ✅ *THEELY-MD — DESCARGA* 〕══╗`,
        `║`,
        `║ 📱 *App:*     ${title}`,
        `║ 🆔 *Versión:* ${version}`,
        `║ 📦 *Tamaño:*  ${filesize}`,
        `║`,
        `║ 💡 *Instrucciones:*`,
        `║ • Habilita "Orígenes desconocidos"`,
        `║ • Abre el archivo para instalar`,
        `║`,
        `║ 💫 *Powered by TheEly-MD 🌼*`,
        `╚══════════════════════════════════╝`
      ].join('\n')
    }, { quoted: m })

    await m.react('✅')

  } catch (err) {
    console.error('❌ Error APKMOD:', err)
    await m.react('❌')
    await m.reply([
      `╔══〔 🌼 *THEELY-MD — APK MOD* 〕══╗`,
      `║`,
      `║ ❌ *Error al procesar~*`,
      `║ ${(err.message || 'No se pudo procesar').slice(0, 80)}`,
      `║`,
      `║ 💡 Intenta con otro nombre o`,
      `║ verifica que la búsqueda sea`,
      `║ correcta~`,
      `║`,
      `╚══════════════════════════════════╝`
    ].join('\n'))
  }
}

handler.help    = ['apkmod <nombre>']
handler.tags    = ['descargas']
handler.command = ['apkmod', 'apk']
handler.desc    = 'Busca y descarga APKs modificadas'

export default handler