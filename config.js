import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['51910227479', 'AmilcarGit', true],
  ['51910227479'],
]

global.mods = []
global.prems = []

global.namebot = '𝚃𝙷𝙴𝙴𝙻𝚈-𝙼𝙳'
global.packname = '𝚃𝙷𝙴𝙴𝙻𝚈-𝙼𝙳 🌼'
global.author = 'AmilcarGit| © 𝟸𝟶𝟸𝟼'
global.moneda = '𝚃𝙷𝙴𝙴𝙻𝚈-𝙼𝙳'

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16'
global.vs = '2.2.0'
global.sessions = 'sessions'
global.jadi = 'subtheely'
global.yukiJadibts = true

global.namecanal = '🌼'
global.idcanal = '120363410616526428@newsletter'
global.idcanal2 = '120363410616526428@newsletter'
global.canal = 'https://whatsapp.com/channel/0029Vb8G49lKmCPR44sIOE1i'
global.canalreg = '120363410616526428@newsletter'

global.ch = {
  ch1: '120363410616526428@newsletter'
}

global.multiplier = 69
global.maxwarn = 2

global.APIs = {
  adonix: { url: "https://api-adonix.ultraplus.click", key: "Yuki-WaBot" },
  vreden: { url: "https://api.vreden.web.id", key: null },
  nekolabs: { url: "https://api.nekolabs.web.id", key: null },
  siputzx: { url: "https://api.siputzx.my.id", key: null },
  delirius: { url: "https://api.delirius.store", key: null },
  ootaizumi: { url: "https://api.ootaizumi.web.id", key: null },
  stellar: { url: "https://api.stellarwa.xyz", key: "YukiWaBot", key2: '1bcd4698ce6c75217275c9607f01fd99' },
  apifaa: { url: "https://api-faa.my.id", key: null },
  xyro: { url: "https://api.xyro.site", key: null },
  yupra: { url: "https://api.yupra.my.id", key: null }
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.yellowBright("🌼 Se actualizó 'config.js'"))
  import(`file://${file}?update=${Date.now()}`)
})
