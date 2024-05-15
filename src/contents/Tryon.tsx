import cssText from "data-text:~/components/content/Tryon/style.css"
import React, { useEffect, useRef, useState } from "react"

import Tryon from "~components/content/Tryon"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  document.head.appendChild(style)
  return style
}

const TryonContent = () => {
  const [show, setShow] = useState(false)
  const [face, setFace] = useState("")
  const [sizeData, setSizeData] = useState([])
  const tryonRef = useRef(null)
  const isDragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    getStyle()

    const handleMessage = (message, sender, sendResponse) => {
      if (message.name === "showTryon") {
        setFace(message?.params?.face || "")
        setSizeData(message?.params?.sizeData || [])
        setShow(true)
        sendResponse("")
      }
      return true
    }

    chrome.runtime.onMessage.addListener(handleMessage)
    return () => chrome.runtime.onMessage.removeListener(handleMessage)
  }, [])

  useEffect(() => {
    const dragElement = tryonRef.current
    if (!dragElement) {
      return
    }

    const onMouseMove = (event) => {
      // return
      event.preventDefault() // 阻止默认行为，避免选择文本或其他元素
      if (!isDragging.current) return
      // 移除transform属性，确保元素的位置准确无误
      dragElement.style.transform = "translate(-10%, -10%)"
      const mouseX = event.clientX // 鼠标的位置
      const mouseY = event.clientY //鼠标的位置
      dragElement.style.left = `${mouseX}px`
      dragElement.style.top = `${mouseY}px`
    }

    const onMouseUp = () => {
      isDragging.current = false
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseDown = (event) => {
      isDragging.current = true
      offset.current.x =
        event.clientX - dragElement.getBoundingClientRect().left

      console.log(offset.current.x, "offset.current.x")
      offset.current.y = event.clientY - dragElement.getBoundingClientRect().top
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    }

    dragElement.addEventListener("mousedown", onMouseDown)

    return () => {
      dragElement.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [show])

  return (
    <div
      ref={tryonRef}
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        cursor: "move"
      }}>
      {1 && (
        <Tryon face={face} sizeData={sizeData} close={() => setShow(false)} />
      )}
    </div>
  )
}

export default TryonContent
