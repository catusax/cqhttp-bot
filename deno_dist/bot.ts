import { CqCode } from './cq_code.ts'
import { CqMessageEvent } from './cq_event.ts'

export class QBot {
    ws: WebSocket
    message_handlers: messageHandler[] = []
    at_message_handlers: atMessageHandler[] = []

    constructor(addr: string) {
        this.ws = new WebSocket(addr)
    }

    send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
        this.ws.send(data)
    }

    /** 消息事件 https://github.com/botuniverse/onebot/blob/master/v11/specs/event/message.md */
    onmessage(handler: messageHandler) {
        this.message_handlers.push(handler)
    }

    /** 被at时候的事件 https://github.com/botuniverse/onebot/blob/master/v11/specs/event/message.md */
    on_at_message(handler: atMessageHandler) {
        this.at_message_handlers.push(handler)
    }

    /** 启动bot */
    run() {
        this.ws.onopen = () => {
            console.log('connected')
        }
        this.ws.onclose = () => {
            console.log('connection closed!')
        }
        this.ws.onerror = (error_event) => {
            console.log('error!')
            console.log(error_event)
        }

        this.ws.onmessage = async (event) => {
            // if (event.data['post_type']=="message"){
            const data = JSON.parse(event.data)
            //
            if (data.post_type == 'message') {
                const message_event = new CqMessageEvent(data)
                // 消息事件
                this.message_handlers.forEach((handler) => {
                    try {
                        handler(message_event)
                    } catch (e) {
                        console.log(e)
                    }
                })

                const cqcode = new CqCode(message_event.message)
                if (cqcode.at == data.self_id) {
                    // at事件
                    this.at_message_handlers.forEach((handler) => {
                        try {
                            handler(message_event, cqcode)
                        } catch (e) {
                            console.log(e)
                        }
                    })
                }
            }
        }
    }
}

/** message事件详细信息看文档： https://github.com/botuniverse/onebot/blob/master/v11/specs/event/message.md */
export type messageHandler = (message: CqMessageEvent) => void

/**
 * at message事件
 * message: 原始message
 * cqcode： 从原始message里提取的coolq code信息
 */
export type atMessageHandler = (message: CqMessageEvent, cqcode: CqCode) => void
