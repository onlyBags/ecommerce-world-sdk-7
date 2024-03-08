import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'

const baseImgPath = 'images/contact'
const ModalStep = ({ step }: { step: number }) => {
  const getStepImage = () => {
    switch (step) {
      case 1:
        return `${baseImgPath}/First-Step.png`
      case 2:
        return `${baseImgPath}/Second-Step.png`
      case 3:
        return `${baseImgPath}/Third-Step.png`
      default:
        return `${baseImgPath}/First-Step.png`
        break
    }
  }

  return (
    <UiEntity
      uiTransform={{
        justifyContent: 'center',
        margin: { top: 35 }
      }}
    >
      <UiEntity
        uiTransform={{
          width: 425,
          height: 53,
          justifyContent: 'center'
        }}
        uiBackground={{
          textureMode: 'center',
          texture: {
            src: getStepImage()
          }
        }}
      />
    </UiEntity>
  )
}

export default ModalStep
