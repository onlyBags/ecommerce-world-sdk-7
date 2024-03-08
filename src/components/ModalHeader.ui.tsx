import ReactEcs, { Label, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'

let checkboxChecked = false

const ModalHeader = ({
  title,
  subtitle,
  onToggleCheckbox
}: {
  title: string
  subtitle?: string
  onToggleCheckbox?: (checked: boolean) => void
}) => {
  const handleCheckboxClick = () => {
    checkboxChecked = !checkboxChecked
    onToggleCheckbox?.(checkboxChecked)
  }
  return (
    <UiEntity
      uiTransform={{
        height: subtitle ? 100 : 50,
        width: '100%',
        margin: { top: 15 },
        padding: {
          left: 20
        },
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <UiEntity
        uiTransform={{
          height: 50,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <UiEntity>
          <Label value={title} fontSize={24} textAlign="top-left" color={Color4.fromHexString('#121417')} />
        </UiEntity>
        {/* {!!onToggleCheckbox && (
          <UiEntity uiTransform={{ display: 'flex', alignItems: 'center', padding: { left: 20 } }}>
            <UiEntity
              onMouseDown={handleCheckboxClick}
              uiTransform={{
                width: 15,
                height: 53
              }}
              uiBackground={{
                textureMode: 'center',
                texture: {
                  src: checkboxChecked ? 'images/contact/CheckBoxFilled.png' : 'images/contact/CheckBoxEmpty.png'
                }
              }}
            />
            <UiEntity
              onMouseDown={handleCheckboxClick}
              uiTransform={{ width: 120, height: 53 }}
              uiText={{ value: ' Same Shipping Address', color: Color4.fromHexString('#1C1C1C'), fontSize: 10 }}
            />
          </UiEntity>
        )} */}
      </UiEntity>
      {subtitle && (
        <UiEntity
          uiTransform={{
            height: 20,
            margin: { top: 0 }
          }}
          uiText={{
            value: subtitle,
            fontSize: 12,
            color: Color4.fromHexString('#121417'),
            textAlign: 'bottom-left'
          }}
        />
      )}
    </UiEntity>
  )
}

export default ModalHeader
