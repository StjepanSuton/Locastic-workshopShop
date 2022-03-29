export const formatToLocalCurrency = (price: number) => {
  return price.toFixed(2).replace('.', ',')
}

export const formatSubtotalToLocalCurrency = (price: number) => {
  return price.toLocaleString('de-DE', { minimumFractionDigits: 2 })
}

export const formatToLocalDate = (date: string) => {
  return new Date(date).toLocaleDateString('de-DE').replaceAll('/', '.') + '.'
}

export const formatToLocalDay = (date: string) => {
  return (
    new Date(date).toLocaleString('en-us', { weekday: 'long' }).slice(0, 3) +
    ' ' +
    new Date(date).toLocaleDateString('de-DE').replaceAll('/', '.') +
    '.'
  )
}

export const formatToLocalTime = (date: string) => {
  return new Date(date).toLocaleTimeString('de-DE').slice(0, 5).replaceAll('/', ':')
}

export const formatFirstLetterToUpperCase = (name: string) => {
  return name.toUpperCase().slice(0, 1) + name.toLowerCase().slice(1, name.length)
}
