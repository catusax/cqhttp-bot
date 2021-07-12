# cqhttp-bot
使用正向 websocket 的 cqhttp bot

## 使用
```ts
// echo bot
import {QBot, CqMessageEvent} from 'https://cdn.jsdelivr.net/gh/coolrc136/cqhttp-bot@main/mod.ts'

const bot = new QBot("ws://111.111.111.111:6700?access_token=123456")

bot.onmessage(msg=> {
    bot.send(msg.quick_reply(msg.message))
})
bot.run()
```