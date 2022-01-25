export type User = {
  id: number,
  name: string,
  email: string,
  password?: string,
  image?: string,
  created_at: string,
  updated_at: string
}

export type Room = {
  id: number,
  rid: number,
  name: string,
  member?: number,
  created_at: string,
  updated_at: string
}

export type Chat ={
  id: number,
  sentence: string,
  room?: number,
  messanger?: number,
  created_at: string,
  updated_at: string
}