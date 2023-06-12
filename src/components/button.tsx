import classNames from 'classnames'

export function Button(props: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      {...props}
      className={
        classNames(
          'border py-1 px-4 hover:bg-gray-300 disabled:bg-gray-300'
        , props.className
        )
      }
    />
  )
}
