import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { MODAL_LEFT_SIZE } from '../utils'

const ModalLeft = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <UiEntity
      uiTransform={{
        width: MODAL_LEFT_SIZE.width,
        height: MODAL_LEFT_SIZE.height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      uiBackground={{ color: Color4.lerp(Color4.fromHexString('#D0C0B3'), Color4.fromHexString('#E3DFDC'), 0.7) }}
    >
      <UiEntity
        uiTransform={{
          width: 420,
          height: 580
        }}
        uiBackground={{
          textureMode: 'center',
          texture: {
            src: imageSrc
          }
        }}
      />
    </UiEntity>
  )
}

export default ModalLeft
