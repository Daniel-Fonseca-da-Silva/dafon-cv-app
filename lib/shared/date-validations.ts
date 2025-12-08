export function validateDate(
  dateString: string,
  field: 'startDate' | 'endDate',
  errorMessages: {
    startDateError: string
    endDateError: string
  }
): string | undefined {
  if (!dateString) return undefined

  const selectedDate = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  selectedDate.setHours(0, 0, 0, 0)

  if (field === 'startDate') {
    if (selectedDate >= today) {
      return errorMessages.startDateError
    }
  } else if (field === 'endDate') {
    if (selectedDate >= today) {
      return errorMessages.endDateError
    }
  }

  return undefined
}
