const isToday = (someDate) => {
  const today = new Date()
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  )
}

const formatDate = (date) => {
  return ("0" + date).slice(-2)
}

export const getPublicationTime = (date) => {
  if (isToday(date))
    return `Сегодня, ${formatDate(date.getHours())}:${formatDate(
      date.getMinutes()
    )}`
  else
    return `${formatDate(date.getDate() + 1)}.${formatDate(
      date.getMonth() + 1
    )}, ${formatDate(date.getHours())}:${formatDate(date.getMinutes())}`
}
