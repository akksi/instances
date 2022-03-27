export const get = async (url: string) => {
  const response = await fetch(url)

  if (response.status === 200) {
    return response.json()
  }

  return []
}

export const del = async (url: string) => {
  const response = await fetch(url, {method: 'DELETE'})

  if (response.status === 200) {
    return true
  }

  return false
}

export const put = async (url: string, data: any) => {
  const response = await fetch(
    url,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  if (response.status === 200) {
    return true
  }

  return false
}
