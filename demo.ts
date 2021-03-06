// @ts-ignore
// import {QBot, CqMessageEvent} from 'https://cdn.jsdelivr.net/gh/coolrc136/cqhttp-bot@main/deno_dist/mod.ts'
// @ts-ignore
import { QBot, CqMessageEvent, QuickReply } from './src/mod'


const bot = new QBot("ws://111.111.111.111:6700?access_token=123456")


async function help(msg: CqMessageEvent, command: string): Promise<QuickReply> {
  // tslint:disable-next-line: no-shadowed-variable
  let help = `使用说明:
  [命令]`
  plugins.forEach(element => {
    if (element.descripion) {
      help += '\n  ' + element.descripion
    }
  });

  return msg.quick_reply(help)
}

async function nothing(msg: CqMessageEvent, command: string): Promise<QuickReply> {
  return msg.quick_reply(`at我干啥`)
}

type Plugin = {
  regex: RegExp
  handler: (msg: CqMessageEvent, command: string) => Promise<QuickReply>
  descripion: string | null
}

// 从上到下搜索，只执行第一个匹配到的正则
const plugins: Plugin[] = [
  {
    regex: /^$/,
    handler: nothing,
    descripion: null
  },
  {
    regex: /^help/,
    handler: help,
    descripion: "help: 帮助文档"
  }
]


function regex_match(msg: CqMessageEvent) {
  plugins.forEach(async (item) => {
    if (item.regex.test(msg.message)) {
      const resp = await item.handler(msg, msg.message)
      bot.send(JSON.stringify(resp))
      return
    }
  })
  // bot.send(msg.quick_reply('[CQ:image,file=https://http.cat/404]')) //404
}

bot.onmessage(regex_match)
bot.run()