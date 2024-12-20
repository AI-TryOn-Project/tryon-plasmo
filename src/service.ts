const urls = {
  tryOn: "https://tryon-advanced.tianlong.co.uk/upload/images",
  sizeRecommedation: "https://api.tianlong.co.uk/get-size-guide"
}
type EnhanceTryOnData = {
  age: string
  bodyShape: string
  ethnic: string
  sex: "female" | "male"
  skinColor: string
}

type GetTryOnParams = {
  face: string
  model: string
  prompt?: string
  enhanceTryOnData?: EnhanceTryOnData
}

type GetSizeRecommedationParams = {
  height: number
  weight: number
}
// 获取token
const token = "eyJhbG"
export const request = async <T>(
  domain: string,
  params: any
): Promise<T | false> => {
  try {
    const response = await fetch(domain, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      console.error("Request failed:", response.statusText)
      return false
    }

    const data = (await response.json()) as T
    return data
  } catch (error) {
    console.error("Error:", error)
    return false
  }
}

export const getTryOn = async (
  params: GetTryOnParams
): Promise<{ image: string; status: string }> => {
  const response = await request<{ image: string; status: string }>(
    urls.tryOn,
    params
  )
  if (response === false) {
    throw new Error("Request failed")
  }
  return response
}

export const getSizeRecommedation = async (
  params: GetSizeRecommedationParams
) => {
  return request(urls.sizeRecommedation, params)
}
