
const handler = async (m, { conn }) => {
    const user = global.db.data.users[m.sender]
    const moneda = global.moneda || '🌼 ElyCoins'

    // Cooldown de 30 segundos
    const cooldown = 30 * 1000
    const ultimaPesca = user.ultimaPesca || 0
    if (Date.now() - ultimaPesca < cooldown) {
        const tiempoRestante = Math.ceil((cooldown - (Date.now() - ultimaPesca)) / 1000)
        return m.reply(`⏳ *Espera ${tiempoRestante} segundos para pescar de nuevo*`)
    }

    // Posibles resultados
    const resultados = [
        { tipo: 'pescado', nombre: '🐟 Pescado fresco', monedas: 10, emoji: '🐟' },
        { tipo: 'pescado', nombre: '🐠 Pescado tropical', monedas: 20, emoji: '🐠' },
        { tipo: 'pescado', nombre: '🐡 Pez globo', monedas: 15, emoji: '🐡' },
        { tipo: 'tesoro', nombre: '💎 Tesoro hundido', monedas: 50, emoji: '💎' },
        { tipo: 'nada', nombre: '👟 Una bota vieja', monedas: 0, emoji: '👟' },
        { tipo: 'nada', nombre: '🍃 Algas', monedas: 0, emoji: '🌿' }
    ]

    const resultado = resultados[Math.floor(Math.random() * resultados.length)]
    user.ultimaPesca = Date.now()

    let mensaje = `╔══〔 *THEELY-MD — PESCAR* 〕══╗\n║\n║ 🎣 *Lanzaste la caña...*\n║`

    if (resultado.tipo === 'nada') {
        mensaje += `\n║ ${resultado.emoji} *${resultado.nombre}*\n║ 😅 *No pescaste nada útil*`
    } else {
        // Agregar al inventario
        if (!user.inventario) user.inventario = []
        user.inventario.push({
            id: resultado.tipo,
            nombre: resultado.nombre,
            fecha: Date.now()
        })

        // Bonus de monedas
        if (resultado.monedas > 0) {
            user.coin = (user.coin || 0) + resultado.monedas
        }

        mensaje += `\n║ ${resultado.emoji} *${resultado.nombre}*\n║ 💰 +${resultado.monedas} ${moneda}`
    }

    mensaje += `\n║ 💵 Saldo: ${user.coin || 0} ${moneda}\n║\n╚══════════════════════════════════╝`

    await m.react('🎣')
    await m.reply(mensaje)
}

handler.help = ['pescar']
handler.tags = ['eco']
handler.command = ['pescar', 'fish']
handler.register = true
handler.desc = 'Pesca para obtener items y monedas'
export default handler