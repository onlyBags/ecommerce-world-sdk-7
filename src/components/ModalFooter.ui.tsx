import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'

const ModalFooter = ({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) => {
  return (
    <UiEntity
      uiTransform={{
        width: 530,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: { top: 0 }
      }}
      uiBackground={{ color: Color4.White() }}
    >
      <UiEntity
        uiTransform={{ width: 300, height: 100 }}
        uiText={{
          value: 'Back',
          fontSize: 24,
          color: Color4.fromHexString('#6F6C90')
        }}
        onMouseDown={onBack}
      />
      <UiEntity
        uiTransform={{
          width: 20,
          height: 140
        }}
        uiBackground={{
          textureMode: 'center',
          texture: {
            src: 'images/payments/Line.png'
          }
        }}
      />
      <UiEntity
        uiTransform={{ width: 300, height: 100 }}
        uiText={{
          value: 'Continue',
          fontSize: 24,
          color: Color4.fromHexString('#FF2E55')
        }}
        onMouseDown={onContinue}
      />
    </UiEntity>
  )
}

export default ModalFooter
