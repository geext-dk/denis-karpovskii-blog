import { format, parseISO } from 'date-fns'

export interface DateProps {
  dateString: string
  className?: string
}

export default function Date({
  dateString,
  className,
}: DateProps): JSX.Element {
  const date = parseISO(dateString)
  return (
    <time className={className} dateTime={dateString}>
      {format(date, 'yyyy-MM-dd')}
    </time>
  )
}
