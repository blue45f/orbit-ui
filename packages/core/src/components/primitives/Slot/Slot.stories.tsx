import { Plug, slotted } from './Slot'

export default {
  args: {},
  title: 'internal/Slot',
}

const Slotted = slotted(['prefix', 'suffix'], ({ slots }) => {
  return (
    <div style={{ background: '#fff' }}>
      {slots.prefix}
      {Boolean(slots.prefix && slots.suffix) && <span> | </span>}
      {slots.suffix}
      <hr />
      {slots.default}
    </div>
  )
})

export const 기본: React.FC = () => {
  return (
    <Slotted>
      <span>default test 123</span>
      <Plug key="prefix" name="prefix">
        hi!
      </Plug>
      <Plug key="suffix" name="suffix">
        bye!
      </Plug>
      <br />
      <span>default test 456</span>
    </Slotted>
  )
}
