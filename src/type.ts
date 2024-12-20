// 定义枚举
export enum TAB {
  TRY_ON = 1,
  SIZE = 2
}

export interface BearStore {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
  updateBears: (newBears: number) => void
}

export interface TabStore {
  activeTab: TAB
  setActiveTab: (tab: number) => void
}

export interface TryOnStore {
  base64Result: string
  setBase64Result: (base64: any) => void
  sence: string
  setSence: (sence: string) => void
}

type Body = {
  bust: string
  waist: string
  hip: string
}
export interface BodyStore {
  body: Body
  setBody: (body: Body) => void
}

export interface UnitStore {
  unit: "in" | "cm"
  setUnit: (unit: "in" | "cm") => void
}
