import axios from 'axios'

const handler = async (m, { conn, text, usedPrefix, command }) => {
    // ──────────────────────────────────────────
    // VALIDAR QUERY
    // ──────────────────────────────────────────
    let query = text ? text.trim() : (m.quoted?.text || null)
    if (!query) {
        return conn.reply(m.chat, 
            `╭━━━〔 📸 *TIKTOK IMAGES* 〕━━⬣\n┃\n┃ ❌ *¿Qué imágenes buscas?*\n┃\n┃ 📝 *Ejemplo:*\n┃ ${usedPrefix + command} Chaewon\n┃\n┃ 💡 También puedes responder\n┃ a un mensaje con el texto\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣`, 
            m
        )
    }

    await m.react('📸')

    try {
        // ──────────────────────────────────────────
        // BUSCAR IMÁGENES
        // ──────────────────────────────────────────
        const { data } = await axios.get(
            `https://api.delirius.store/search/tiktoksearchimages?query=${encodeURIComponent(query)}`
        )

        if (!data.status || !data.data.length) {
            await m.react('❌')
            return conn.reply(m.chat,
                `╭━━━〔 📸 *TIKTOK IMAGES* 〕━━⬣\n┃\n┃ 🔍 *Sin resultados*\n┃\n┃ No encontré imágenes para\n┃ *"${query}"*\n┃\n┃ 💡 Intenta con otra palabra\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣`,
                m
            )
        }

        // ──────────────────────────────────────────
        // PROCESAR RESULTADOS
        // ──────────────────────────────────────────
        const res = data.data[0]
        const fotos = res.download 
        const totalFotos = fotos.length
        const fotosMostrar = Math.min(totalFotos, 6)

        // ──────────────────────────────────────────
        // INFORMACIÓN DEL POST
        // ──────────────────────────────────────────
        let info = [
            `╭━━━〔 📸 *TIKTOK IMAGES* 〕━━⬣`,
            `┃`,
            `┃ 📝 *Descripción:*`,
            `┃ ${res.title || 'Sin descripción'}`,
            `┃`,
            `┃ 👤 *Usuario:* ${res.author}`,
            `┃ ❤️ *Likes:* ${res.likes.toLocaleString()}`,
            `┃ 📸 *Fotos:* ${totalFotos}`,
            `┃`,
            `┃ 🌸 Mostrando ${fotosMostrar} foto${fotosMostrar > 1 ? 's' : ''}`,
            `┃`,
            `╰━━━━━━━━━━━━━━━━━━━━━━⬣`
        ].join('\n')

        // ──────────────────────────────────────────
        // ENVIAR PRIMERA IMAGEN CON CAPTION
        // ──────────────────────────────────────────
        await conn.sendMessage(m.chat, { 
            image: { url: fotos[0] }, 
            caption: info 
        }, { quoted: m })

        // ──────────────────────────────────────────
        // ENVIAR IMÁGENES ADICIONALES
        // ──────────────────────────────────────────
        if (fotos.length > 1) {
            for (let i = 1; i < fotosMostrar; i++) {
                await new Promise(resolve => setTimeout(resolve, 800))
                await conn.sendMessage(m.chat, { 
                    image: { url: fotos[i] } 
                }, { quoted: m })
            }
        }

        await m.react('🌸')

    } catch (e) {
        console.error('❌ Error en TikTok Images:', e.message)
        await m.react('❌')
        conn.reply(m.chat,
            `╭━━━〔 ❌ *ERROR* 〕━━⬣\n┃\n┃ ❌ *Error al procesar~*\n┃\n┃ 🌸 Intenta de nuevo más tarde\n┃ 💡 O usa otra palabra clave\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣`,
            m
        )
    }
}

handler.help = ['tiktokimg']
handler.tags = ['search']
handler.command = /^(tiktokimg|ttimg|ttsearch)$/i
handler.register = true
handler.desc = 'Busca imágenes de TikTok por palabra clave'

export default handler