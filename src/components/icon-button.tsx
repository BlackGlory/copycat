import classNames from 'classnames'

export function IconButton(props: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      {...props}
      className={
        classNames(
          'border w-6 h-6 inline-flex justify-center items-center'
        , 'hover:bg-gray-300 disabled:bg-gray-300'
        , 'text-gray-700 hover:text-gray-900'
        , props.className
        )
      }
    />
  )
}
