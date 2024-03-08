import config from './config.js'
import { EcommerceWsData, joystickData } from './types.js'
const { wsUrl } = config

export default class WebSocketEvents {
  private wsEvents: WebSocket
  private wsJoystick: WebSocket
  private infoCb: (message: string) => void
  private joystickCb: (data: joystickData) => void
  constructor(datasource: number, wallet: string, infoCb: () => void, joystickCb: (data: joystickData) => void) {
    this.wsEvents = new WebSocket(`${wsUrl}?datasource=${datasource}&wallet=${wallet}`)
    this.wsJoystick = new WebSocket(`${wsUrl}?datasource=${datasource}&joystick=true`)
    this.infoCb = infoCb
    this.joystickCb = joystickCb
    this.initWebsockets()
  }

  private async initWebsockets() {
    try {
      this.wsEvents.onopen = () => {
        console.log(`Connected to DG-Live-WS-Events`)
      }
      this.wsJoystick.onopen = () => {
        console.log(`Connected to DG-Live-WS-Joystick`)
      }
      this.wsEvents.onmessage = (evt) => {
        this.onMessage(evt)
      }
      this.wsEvents.onclose = () => {
        console.log(`Disconnected from DG-Live-WS-Events`)
      }
      this.wsJoystick.onmessage = (evt) => {
        const data: any = typeof evt.data === 'string' ? JSON.parse(evt.data) : evt.data
        this.joystickCb(data)
      }

      this.wsJoystick.onclose = () => {
        console.log(`Disconnected from DG-Live-WS-Joystick`)
      }
    } catch (err: any) {
      console.log('initWS:err', err)
      throw err
    }
  }
  private onMessage(ev: any) {
    const data: EcommerceWsData = typeof ev.data === 'string' ? JSON.parse(ev.data) : ev.data
    if (data.status === 'success') {
      const message = `Order ${data.orderId} has been successfully paid!`
      this.infoCb(message)
    } else console.log('onMessage:err', ev)
  }
}
