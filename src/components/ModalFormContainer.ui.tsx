import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'

const ModalFormContainer = ({ children }: { children: ReactEcs.JSX.Element }) => (
  <UiEntity
    uiTransform={{
      flexDirection: 'column',
      padding: { left: 20, bottom: 5 },
      margin: { top: 5 },
      height: 425
    }}
  >
    {children}
  </UiEntity>
)

export default ModalFormContainer
