export type WeatherDay = {
  date: string
  weekday: string
  temp: string
  condition: string
  icon: 'rain' | 'cloud' | 'sun' | 'partly'
  note: string
}

export type TransportLeg = {
  date: string
  dayLabel: string
  type: string
  code: string
  route: string
  time: string
  duration: string
  price: string
}

export type BookingItem = {
  name: string
  detail: string
  deadline: string
  urgent?: boolean
}

export type TimelineItem = {
  time: string
  title: string
  body: string
}

export type DayPlan = {
  id: string
  date: string
  weekday: string
  title: string
  weather: string
  weatherIcon: WeatherDay['icon']
  bookings: BookingItem[]
  timeline: TimelineItem[]
  callout?: string
}

export type CostRow = {
  item: string
  detail: string
  amount: string
}

export type SituationUpdate = {
  id: string
  time: string
  kind: 'weather' | 'transport' | 'booking' | 'social'
  title: string
  body: string
  action?: string
}

export const tripMeta = {
  title: '西安家庭游行程序案',
  version: 'v9',
  updatedAt: '2026-08-06 11:10',
  origin: '深圳',
  destination: '西安 · 华山',
  dates: '8月11日 — 8月15日',
  nights: '5天5晚',
  party: '3人（两大一小 · 12岁）',
  goMode: '去程飞机',
  returnMode: '返程全程高铁',
  homeNote: '8/15 当晚到家',
  changelog:
    '华山移至最后两天：先玩完西安市区 → Day3 下午去华山住 → Day4 全天爬山 → Day5 从华山北直达合肥南返程。行李全程不用跟着爬山。',
}

export const weatherDays: WeatherDay[] = [
  {
    date: '8/11',
    weekday: '周二',
    temp: '22–29°C',
    condition: '小雨转阴',
    icon: 'rain',
    note: '可能有小雨，下午陕历博（室内）不受影响',
  },
  {
    date: '8/12',
    weekday: '周三',
    temp: '19–28°C',
    condition: '阴转多云',
    icon: 'cloud',
    note: '转好，适合兵马俑户外行程',
  },
  {
    date: '8/13',
    weekday: '周四',
    temp: '18–30°C',
    condition: '晴',
    icon: 'sun',
    note: '城墙骑行与转场华山的好日子',
  },
  {
    date: '8/14',
    weekday: '周五',
    temp: '19–29°C',
    condition: '多云',
    icon: 'partly',
    note: '华山全天，山顶风大备薄外套',
  },
  {
    date: '8/15',
    weekday: '周六',
    temp: '20–31°C',
    condition: '晴',
    icon: 'sun',
    note: '返程高铁天气晴好',
  },
]

export const weatherSummary =
  '8/11 可能有小雨；8/12 起转好，8/13–15 全程晴好。比深圳凉快 5–8°C，早晚舒适。抖音上的「暴雨取消」与实况预报不一致——按预报微调室内外即可，不必取消行程。'

export const transportLegs: TransportLeg[] = [
  {
    date: '8/11',
    dayLabel: 'Day1',
    type: '飞机',
    code: 'HU7870 海南航空 B737',
    route: '深圳宝安T3 → 西安咸阳T3',
    time: '07:35 → 10:20',
    duration: '2h45m',
    price: '¥580',
  },
  {
    date: '8/13',
    dayLabel: 'Day3',
    type: '高铁',
    code: 'G字头 · 12306',
    route: '西安北 → 华山北',
    time: '~15:00 → ~15:30',
    duration: '30min',
    price: '¥54.5',
  },
  {
    date: '8/15',
    dayLabel: 'Day5 · 第1程',
    type: '高铁',
    code: 'G2230 二等座',
    route: '华山北 → 合肥南',
    time: '10:17 → 15:37',
    duration: '5h20m',
    price: '¥580',
  },
  {
    date: '8/15',
    dayLabel: 'Day5 · 换乘',
    type: '等候',
    code: '站内晚饭',
    route: '合肥南站',
    time: '15:37 → 17:56',
    duration: '2h19m',
    price: '—',
  },
  {
    date: '8/15',
    dayLabel: 'Day5 · 第2程',
    type: '高铁',
    code: 'G8397 二等座',
    route: '合肥南 → 宿松东',
    time: '17:56 → 19:41',
    duration: '1h45m',
    price: '¥122',
  },
]

export const transportNote =
  '返程改为全程高铁：取消原方案的飞机+打车换乘。华山北直达合肥南，无需中转去机场。虽比飞机多约4小时，但省安检与接驳折腾，准点率更高。'

export const days: DayPlan[] = [
  {
    id: 'day1',
    date: '8/11',
    weekday: '周二',
    title: '深圳飞西安 + 陕历博 + 大雁塔夜景',
    weather: '22–29°C · 小雨转阴',
    weatherIcon: 'rain',
    bookings: [
      {
        name: '陕历博',
        detail: '免费，提前5天 → 公众号「陕西历史博物馆」17:00 放票',
        deadline: '8/6 17:00',
        urgent: true,
      },
      {
        name: '大雁塔',
        detail: '¥25×2+¥13 → 现场扫码，无需预约',
        deadline: '无需',
      },
      {
        name: '备选',
        detail: '抢不到陕历博 → 西安博物院（小雁塔，免费免预约）',
        deadline: '—',
      },
    ],
    timeline: [
      {
        time: '07:35 — 10:20',
        title: '深圳飞西安 · HU7870',
        body: '海南航空，10:20 到达咸阳机场 T3。地铁 14 号线换乘 2 号线到钟楼约 1h；或机场大巴 25 元/人。',
      },
      {
        time: '11:30 — 13:00',
        title: '酒店入住 + 午餐',
        body: '推荐住钟楼/永宁门附近（地铁 2 号线沿线）。住宿参考 ¥350–400/晚。',
      },
      {
        time: '14:00 — 17:00',
        title: '陕西历史博物馆',
        body: '室内参观不受下雨影响。镇馆之宝：镶金兽首玛瑙杯、鎏金舞马衔杯纹银壶、三彩载乐骆驼俑。',
      },
      {
        time: '17:30 — 19:00',
        title: '大雁塔 + 北广场',
        body: '登塔俯瞰西安；北广场有亚洲最大音乐喷泉。',
      },
      {
        time: '19:30 — 22:00',
        title: '大唐不夜城',
        body: '天黑后再去。小雨灯光倒影更有韵味。美食：长安大排档。',
      },
    ],
    callout: '天气判断：社媒说暴雨，预报只是小雨转阴——室内馆藏优先，夜景照常，无需取消。',
  },
  {
    id: 'day2',
    date: '8/12',
    weekday: '周三',
    title: '兵马俑 + 华清宫 + 回民街',
    weather: '19–28°C · 阴转多云',
    weatherIcon: 'cloud',
    bookings: [
      {
        name: '兵马俑',
        detail: '¥120×2，12岁免票但必须预约 →「秦始皇帝陵博物院」',
        deadline: '8/5 已过',
        urgent: true,
      },
      {
        name: '华清宫',
        detail: '¥120×2+¥60学生 →「华清宫景区」',
        deadline: '8/5 已过',
        urgent: true,
      },
    ],
    timeline: [
      {
        time: '07:30 — 08:30',
        title: '出发兵马俑',
        body: '地铁 9 号线→华清池站→613 路。8:30 开门就到，避开旅行团。行李留西安酒店。',
      },
      {
        time: '08:30 — 12:00',
        title: '秦始皇帝陵博物院',
        body: '反向路线：丽山园→铜车马→三号坑→二号坑→一号坑。务必请官方讲解 ¥90。',
      },
      {
        time: '14:00 — 16:30',
        title: '华清宫',
        body: '兵马俑→华清宫有免费摆渡或 613 公交，约 10 分钟。',
      },
      {
        time: '19:00 — 21:30',
        title: '回民街 / 大皮院 + 永兴坊',
        body: '避坑：主街人多价贵，走进大皮院、定家小巷找老店。',
      },
    ],
    callout: '紧急：兵马俑+华清宫预约日已过，立刻去公众号捡漏退票。',
  },
  {
    id: 'day3',
    date: '8/13',
    weekday: '周四',
    title: '城墙骑行 + 钟鼓楼 → 下午去华山',
    weather: '18–30°C · 晴',
    weatherIcon: 'sun',
    bookings: [
      {
        name: '城墙',
        detail: '门票¥54×2+¥27，骑行¥45×3 →「遇见城墙」',
        deadline: '8/11',
      },
      {
        name: '华山高铁',
        detail: '西安北→华山北 ¥54.5/人 → 12306，选下午 15:00 左右',
        deadline: '现在就买',
        urgent: true,
      },
      {
        name: '华山住宿',
        detail: '华阴市酒店 ¥150–250/晚 × 2晚',
        deadline: '现在预订',
      },
    ],
    timeline: [
      {
        time: '09:00 — 12:00',
        title: '西安城墙骑行',
        body: '永宁门登城，环城一周约 14km。',
      },
      {
        time: '13:30 — 14:30',
        title: '钟鼓楼（可选）+ 退房',
        body: '不登楼在广场拍照免费。回酒店取行李。',
      },
      {
        time: '15:00 — 15:30',
        title: '西安北 → 华山北',
        body: '高铁 30min。入住华山脚下，行李寄存，明天轻装上山。',
      },
    ],
  },
  {
    id: 'day4',
    date: '8/14',
    weekday: '周五',
    title: '华山全天',
    weather: '19–29°C · 多云',
    weatherIcon: 'partly',
    bookings: [
      {
        name: '华山门票',
        detail: '套票¥360×2+¥180儿童 →「华山旅游服务平台」',
        deadline: '8/7',
        urgent: true,
      },
    ],
    timeline: [
      {
        time: '06:30 — 07:00',
        title: '酒店早餐',
        body: '只带登山必备：水、食物、防晒、外套。行李留前台。',
      },
      {
        time: '07:30 — 15:30',
        title: '华山 · 西上北下',
        body: '西峰索道上→南峰→东峰→中峰→北峰索道下。山顶风大可能 15°C。',
      },
      {
        time: '16:00 —',
        title: '回酒店休息',
        body: '今晚继续住同一酒店，第二天从容返程。',
      },
    ],
    callout: '行李策略：全程不用跟着爬山。下完山回酒店取行李即可。',
  },
  {
    id: 'day5',
    date: '8/15',
    weekday: '周六',
    title: '华山北 → 合肥南 → 宿松东 · 当晚到家',
    weather: '20–31°C · 晴',
    weatherIcon: 'sun',
    bookings: [
      {
        name: 'G2230',
        detail: '华山北→合肥南 10:17–15:37，¥580×3',
        deadline: '现在就买',
        urgent: true,
      },
      {
        name: 'G8397',
        detail: '合肥南→宿松东 17:56–19:41，¥122×3',
        deadline: '现在就买',
        urgent: true,
      },
    ],
    timeline: [
      {
        time: '10:17 — 15:37',
        title: 'G2230 高铁',
        body: '华山北直达合肥南，5h20m。无需去机场。',
      },
      {
        time: '15:37 — 17:56',
        title: '合肥南换乘',
        body: '缓冲 2h19m，站内吃晚饭。若 G2230 晚点，可改签 D2147。',
      },
      {
        time: '17:56 — 19:41',
        title: 'G8397 到宿松东',
        body: '距县城 3.7km，打车约 ¥15 / 10 分钟到家。',
      },
    ],
  },
]

export const costs: CostRow[] = [
  { item: '去程机票', detail: '深圳→西安 HU7870 ¥580×3', amount: '¥1,740' },
  { item: '返程高铁', detail: 'G2230 + G8397', amount: '¥2,106' },
  { item: '华山去程高铁', detail: '西安北→华山北 ¥54.5×3', amount: '¥164' },
  { item: '西安住宿', detail: '2晚 ¥350×2', amount: '¥700' },
  { item: '华山住宿', detail: '2晚 ¥180×2', amount: '¥360' },
  { item: '景点门票等', detail: '兵马俑/华清宫/华山/城墙等', amount: '¥2,028' },
  { item: '餐饮', detail: '5天 × ¥150/天 × 3人', amount: '¥2,250' },
  { item: '市内交通', detail: '地铁+公交+打车', amount: '¥250' },
]

export const costTotal = '¥9,598'
export const costPerPerson = '¥3,199'

export const tips = [
  '预约总览：8/5 兵马俑+华清宫（捡漏）→ 8/6 陕历博 → 8/7 华山门票 → 现在买高铁票 → 8/11 城墙',
  '兵马俑不听讲解≈看泥人：请官方讲解',
  '华山选西上北下，适合家庭；别选玉泉院徒步上山',
  '回民街避坑：主街贵，走大皮院、定家小巷',
  '大唐不夜城天黑再去；小雨灯光倒影反而更美',
]

export const situations: SituationUpdate[] = [
  {
    id: 's1',
    time: '刚刚',
    kind: 'social',
    title: '抖音热议「西安暴雨」',
    body: '短视频标题夸张。对照中央气象台与本地预报：8/11 仅为小雨转阴，其后转晴。建议保留行程，把户外段后移。',
    action: '查看天气对照',
  },
  {
    id: 's2',
    time: '今天 11:10',
    kind: 'transport',
    title: '返程已改为全程高铁',
    body: '取消飞机+打车方案。G2230 华山北→合肥南，再转 G8397 到宿松东，当晚到家，人均交通更省心。',
    action: '查看交通时刻表',
  },
  {
    id: 's3',
    time: '今天 11:10',
    kind: 'booking',
    title: '行程结构更新到 v9',
    body: '华山移至最后两天，西安市区先闭环。行李 Day3 起寄存在华山酒店，爬山不拖箱。',
    action: '查看变更说明',
  },
  {
    id: 's4',
    time: '待办',
    kind: 'weather',
    title: 'Day1 小雨策略已写好',
    body: '下午陕历博（室内）→ 傍晚大雁塔 → 夜游大唐不夜城。雨中灯光可作为加分项，不必改日。',
    action: '打开 Day1',
  },
]
