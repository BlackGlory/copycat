import classNames from 'classnames'

export function TextInput(
  props: Omit<
    React.ComponentPropsWithoutRef<'input'>
  , 'type'
  >
) {
  return (
    <input
      {...props}
      type='text'
      className={
        classNames(
          'border pl-1 w-full h-full disabled:bg-gray-300'
        , props.className
        )
      }
    />
  )
}
