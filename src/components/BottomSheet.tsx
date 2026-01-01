import { useEffect } from 'react'

export default function BottomSheet(props: {
  open: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}) {
  useEffect(() => {
    if (!props.open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [props.open])

  if (!props.open) return null

  return (
    <div className="sheetBackdrop" onClick={() => props.onClose()}>
      <div
        className="sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheetHandle" />
        <div className="sheetHeader">
          <div className="sheetHeaderTitle">{props.title}</div>
          <button className="sheetClose" type="button" onClick={() => props.onClose()}>
            Close
          </button>
        </div>
        <div className="sheetBody">{props.children}</div>
      </div>
    </div>
  )
}
