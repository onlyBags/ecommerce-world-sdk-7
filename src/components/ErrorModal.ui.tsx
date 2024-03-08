import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'

interface ErrorModalProps {
  message?: string
  closeModal: () => void
}

export const ErrorModal = ({ message, closeModal }: ErrorModalProps) => {
  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}
    >
      <UiEntity
        uiTransform={{
          width: 470,
          height: 280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        uiBackground={{ color: Color4.fromHexString('#E5E5E5') }}
      >
        <UiEntity
          uiBackground={{
            textureMode: 'stretch',
            texture: {
              src: 'images/error/Error.png'
            }
          }}
          uiTransform={{ width: 50, height: 50, margin: { top: 30 } }}
        ></UiEntity>
        <UiEntity
          uiTransform={{ width: '100%', height: '20%' }}
          uiText={{ value: 'Error!', fontSize: 20, color: Color4.Black() }}
        />
        <UiEntity
          uiTransform={{ width: '100%', height: '15%', margin: { bottom: 20 } }}
          uiText={{
            value: message || 'Something went wrong, please try again later',
            fontSize: 16,
            color: Color4.Black()
          }}
        />

        <UiEntity
          uiBackground={{ color: Color4.Red() }}
          uiTransform={{ width: '50%', height: '15%' }}
          uiText={{ value: 'Ok', fontSize: 16 }}
          onMouseDown={closeModal}
        />
      </UiEntity>
    </UiEntity>
  )
}
