import type { PlasmoMessaging } from "@plasmohq/messaging"

const config = {}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  //@ts-ignore
  let email = req.body
  const cookie = await chrome.cookies.get({
    url: `11`,
    name: `22`
  })
  let token
  if (cookie) {
    const my_string = decodeURIComponent(cookie.value)
    token = JSON.parse(my_string).jwt
    const data = await fetch(
      `https://finderio.500apps.com/finderio/v1/verify/${email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((res) => res.json())
    res.send(data)
  } else {
    res.send(false)
  }
}

export default handler
