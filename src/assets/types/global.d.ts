export {}

declare global {
  type Params<T> = {
    page: number
    size: number
    order: string
    uid?: number
    search?: string
    privilege_type?: number[]
  } & T

  type Info = {
    live: {
      start: number
      end: number | null
      room: {
        title: string
        area: string
        sub_area: string
      }
    }
    danmu: {
      total_count: number
      user_count: number
    }
    guard: {
      total_count: number
      total_price: number
      privilege_type: 1 | 2 | 3
    }[]
    gift: {
      total_count: number
      user_count: number
      price: number
    }
    chat: {
      total_count: number
      user_count: number
      price: number
    }
    watch: number
    rank: number
    like: number
    fans: number
    entry: number
  }

  type PaginatedResponse<T> = {
    count: number
    results: T[]
  }

  type Danmu = {
    uid: number
    avatar: string
    username: string
    username_color: string
    level: number
    level_color: number
    level_rank: string
    title: string
    title_old: string
    medal: string
    medal_level: string
    medal_color: number
    medal_roomer: string
    medal_room_id: number
    medal_special: string
    admin_type: 0 | 1 | 2
    vip_type: 0 | 1 | 2
    privilege_type: 0 | 1 | 2 | 3
    message_type: 0 | 1 | 2
    text: string
    text_color: number
    emoticon: Record<string, string>
    is_lottery: boolean
    timestamp: number
  }

  type Guard = {
    uid: number
    username: string
    privilege_type: 0 | 1 | 2 | 3
    guard_num: number
    guard_name: string
    guard_price: number
    timestamp_start: number
    timestamp_end: number
  }

  type Gift = {
    uid: number
    avatar: string
    username: string
    privilege_type: 0 | 1 | 2 | 3
    gift_id: number
    gift_name: string
    gift_type: number
    gift_action: string
    gift_num: number
    gift_coin: 0 | 1
    gift_price: number
    gift_total_price: number
    timestamp: number
  }

  type Entry = {
    uid: number
    username: string
    username_color: string
    privilege_type: 0 | 1 | 2 | 3
    medal: string
    medal_level: string
    medal_color: number
    medal_room_id: number
    medal_special: string
    timestamp: number
  }

  type Chat = {
    uid: number
    avatar: string
    username: string
    level: number
    privilege_type: 0 | 1 | 2 | 3
    chat_id: string
    chat_name: string
    chat_price: number
    chat_message: string
    chat_icon: string
    chat_image: string
    chat_color: string
    chat_price_color: string
    chat_bottom_color: string
    timestamp_start: number
  }

  type Award = {
    award_name: string
    award_users: {
      num: number
      uid: number
      face: string
      color: number
      uname: string
      level: number
    }[]
    timestamp: number
  }

  type Point = {
    timestamp: number
    count: number
  }

  type Live = {
    timestamp_start: number
    timestamp_end: number | null
  }
}
