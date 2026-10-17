import type {
  CostRow,
  DayPlan,
  SituationUpdate,
  TransportLeg,
  WeatherDay,
} from './xianTrip'

export const tripMeta = {
  title: '成都秋假亲子游行程序案',
  version: 'v1',
  updatedAt: '2026-10-17 19:00',
  origin: '深圳',
  destination: '成都 · 都江堰 · 青城山',
  dates: '11月16日 — 11月21日',
  nights: '5天4晚',
  party: '3人（两大一小 · 13岁）',
  goMode: '去程动卧 D964',
  returnMode: '返程高铁 G2941',
  homeNote: '11/21 当晚 22:59 到深圳北',
  changelog:
    '定版：11/16 晚 D964 动卧去、11/21 G2941 高铁回；熊猫基地拿掉（人多不好玩）；11/19 青城山前山（红叶季）；孩子请假归零，11/16 放学后直奔深圳北。',
}

export const weatherDays: WeatherDay[] = [
  {
    date: '11/17',
    weekday: '周二',
    temp: '13–17°C',
    condition: '阴',
    icon: 'cloud',
    note: '武侯祠+锦里多为户外步行，备雨伞',
  },
  {
    date: '11/18',
    weekday: '周三',
    temp: '12–16°C',
    condition: '阴转多云',
    icon: 'cloud',
    note: '都江堰全天户外，穿防风外套',
  },
  {
    date: '11/19',
    weekday: '周四',
    temp: '11–16°C',
    condition: '多云',
    icon: 'partly',
    note: '青城山前山，山上比市区低 3–5°C，红叶季',
  },
  {
    date: '11/20',
    weekday: '周五',
    temp: '12–17°C',
    condition: '阴',
    icon: 'cloud',
    note: '三星堆多为室内馆，可避雨',
  },
  {
    date: '11/21',
    weekday: '周六',
    temp: '13–17°C',
    condition: '多云转阴',
    icon: 'partly',
    note: '上午杜甫草堂，下午返程',
  },
]

export const weatherSummary =
  '11 月中下旬成都以阴天为主，白天 13–17°C、夜间 6–10°C，湿度大体感偏凉。都江堰、青城山为全天户外行程，冲锋衣+雨伞必备；武侯祠、三星堆、杜甫草堂多为室内/半室内，可灵活调换顺序避雨。'

export const transportLegs: TransportLeg[] = [
  {
    date: '11/16',
    dayLabel: '去程',
    type: '动卧',
    code: 'D964',
    route: '深圳北 → 成都东',
    time: '18:32 → 08:07+1',
    duration: '13h35m',
    price: '¥700–900/人',
  },
  {
    date: '11/18',
    dayLabel: 'Day2',
    type: '城际',
    code: '成灌线多班次',
    route: '犀浦 → 都江堰',
    time: '多班次',
    duration: '~30min',
    price: '—',
  },
  {
    date: '11/19',
    dayLabel: 'Day3',
    type: '城际',
    code: '成灌线多班次',
    route: '犀浦 → 青城山',
    time: '多班次',
    duration: '30–40min',
    price: '—',
  },
  {
    date: '11/21',
    dayLabel: '返程',
    type: '高铁',
    code: 'G2941 二等座',
    route: '成都东 → 深圳北',
    time: '15:09 → 22:59',
    duration: '7h50m',
    price: '¥740/人',
  },
]

export const transportNote =
  '去程动卧 D964 每周停运 1 天，11/16 是否开行以 12306 为准（备选 11/17 一早 G2942，07:03→14:46）。返程 G2941 11/7 开售，二等约 ¥740/人、13 岁儿童半价约 ¥370。市内及周边日游靠地铁+城际+打车。'

export const days: DayPlan[] = [
  {
    id: 'day1',
    date: '11/17',
    weekday: '周二',
    title: '抵达成都 · 武侯祠 + 锦里 + 宽窄巷子',
    weather: '13–17°C · 阴',
    weatherIcon: 'cloud',
    bookings: [
      {
        name: '武侯祠',
        detail: '¥50×2+¥25 → 官方渠道提前预约',
        deadline: '提前1天',
      },
      {
        name: '酒店',
        detail: '春熙路/太古里附近 4 晚 → 携程',
        deadline: '11/1 前',
        urgent: true,
      },
      {
        name: '锦里 / 宽窄巷子',
        detail: '免费，免预约',
        deadline: '无需',
      },
    ],
    timeline: [
      {
        time: '08:07',
        title: '抵达成都东',
        body: 'D964 准点到。地铁 7 号线换乘 2 号线到春熙路约 40 分钟。',
      },
      {
        time: '09:30 — 11:00',
        title: '酒店寄存行李 + 休整',
        body: '住春熙路/太古里附近。先寄存行李，动卧睡一晚后上午放慢节奏。',
      },
      {
        time: '13:00 — 16:30',
        title: '武侯祠',
        body: '三国主题博物馆：汉昭烈庙、武侯祠、惠陵。约 2–3 小时，惠陵（刘备墓）在内。',
      },
      {
        time: '16:30 — 18:30',
        title: '锦里',
        body: '武侯祠旁步行即达。钟水饺、三大炮、糖油果子；傍晚灯亮后更有味道。',
      },
      {
        time: '19:30 — 21:30',
        title: '宽窄巷子',
        body: '宽巷子老成都、窄巷子文艺、井巷子市井。夜景+茶馆，不赶时间。',
      },
    ],
    callout: '第一天别贪多：动卧一晚 + 上午休整，下午从武侯祠开始慢慢逛。',
  },
  {
    id: 'day2',
    date: '11/18',
    weekday: '周三',
    title: '都江堰一日游',
    weather: '12–16°C · 阴转多云',
    weatherIcon: 'cloud',
    bookings: [
      {
        name: '都江堰门票',
        detail: '淡季 ¥60×2+¥30 → 提前 7 天 20:00 开抢',
        deadline: '11/11 20:00',
        urgent: true,
      },
      {
        name: '学生票',
        detail: '孩子带身份证/学生证，现场核验',
        deadline: '当天',
      },
    ],
    timeline: [
      {
        time: '07:30 — 08:30',
        title: '出发',
        body: '地铁 2 号线到犀浦，换乘成灌线到都江堰站，再公交/打车到景区。',
      },
      {
        time: '09:00 — 12:00',
        title: '都江堰景区',
        body: '离堆公园 → 宝瓶口 → 飞沙堰 → 鱼嘴。两千年水利工程至今仍在灌溉成都平原。',
      },
      {
        time: '12:00 — 13:30',
        title: '南桥午餐',
        body: '南桥附近河鲜馆子；尤兔头、乔一乔。',
      },
      {
        time: '14:00 — 17:00',
        title: '继续游览 + 返程',
        body: '17:30 停止售票，注意返程时间。回市区后太古里一带晚餐。',
      },
    ],
    callout: '都江堰 11/11 20:00 开抢预约，定好闹钟；全天户外，雨伞必备。',
  },
  {
    id: 'day3',
    date: '11/19',
    weekday: '周四',
    title: '青城山前山一日游',
    weather: '11–16°C · 多云',
    weatherIcon: 'partly',
    bookings: [
      {
        name: '青城山门票',
        detail: '¥80×2+¥40',
        deadline: '提前1天',
      },
      {
        name: '索道',
        detail: '单程 ¥35 / 往返 ¥60；步行上山约 2 小时',
        deadline: '现场',
      },
    ],
    timeline: [
      {
        time: '07:30 — 08:30',
        title: '出发',
        body: '犀浦 → 青城山站，30–40 分钟，再摆渡车到景区门口。',
      },
      {
        time: '09:00 — 15:00',
        title: '前山游览',
        body: '建福宫 → 天然图画 → 天师洞 → 上清宫 → 老君阁。道教名山，11 月红叶季、银杏金黄。',
      },
      {
        time: '15:00 — 17:00',
        title: '下山返程',
        body: '17:00 闭园，注意下山时间。回市区休整。',
      },
    ],
    callout: '11 月青城山红叶季、游客少；山上比市区低 3–5°C，多穿一件。',
  },
  {
    id: 'day4',
    date: '11/20',
    weekday: '周五',
    title: '三星堆博物馆',
    weather: '12–17°C · 阴',
    weatherIcon: 'cloud',
    bookings: [
      {
        name: '三星堆门票',
        detail: '¥72×2+¥36 → 提前 7 天 20:00 开抢',
        deadline: '11/13 20:00',
        urgent: true,
      },
    ],
    timeline: [
      {
        time: '08:00 — 09:30',
        title: '前往广汉',
        body: '成都东高铁到广汉北约半小时再打车，或市区直通车大巴；当天往返。',
      },
      {
        time: '10:00 — 16:00',
        title: '三星堆博物馆',
        body: '青铜大立人、纵目面具、金杖、金面罩。新馆很大，至少留 4 小时；讲解器值得租。',
      },
      {
        time: '16:30 — 18:30',
        title: '返程',
        body: '回成都。晚上去太古里/春熙路，成都最后的完整晚上。',
      },
    ],
    callout: '三星堆 11/13 20:00 开抢；馆内至少 4 小时，别赶，当天别排别的。',
  },
  {
    id: 'day5',
    date: '11/21',
    weekday: '周六',
    title: '杜甫草堂 + 返程',
    weather: '13–17°C · 多云转阴',
    weatherIcon: 'partly',
    bookings: [
      {
        name: '杜甫草堂',
        detail: '¥50×2+¥25',
        deadline: '当天',
      },
      {
        name: 'G2941',
        detail: '成都东 → 深圳北，二等 ¥740×2+¥370 → 12306',
        deadline: '11/7 开售',
        urgent: true,
      },
    ],
    timeline: [
      {
        time: '09:00 — 12:00',
        title: '杜甫草堂',
        body: '诗圣故居：大雅堂、工部祠、浣花祠堂。2–3 小时，行程收尾不赶。',
      },
      {
        time: '12:00 — 13:30',
        title: '午餐 + 取行李',
        body: '回酒店取行李，地铁 2 号线转 7 号线到成都东，预留 1 小时。',
      },
      {
        time: '15:09 — 22:59',
        title: 'G2941 返程',
        body: '7 小时 50 分，二等座。22:59 到深圳北，当晚到家。',
      },
    ],
  },
]

export const costs: CostRow[] = [
  {
    item: '去程动卧 D964',
    detail: '深圳北 → 成都东，3 人',
    amount: '¥2,100–2,700',
  },
  {
    item: '返程高铁 G2941',
    detail: '成都东 → 深圳北，二等 2 大 1 小',
    amount: '¥1,850',
  },
  {
    item: '酒店 4 晚',
    detail: '春熙路/太古里附近',
    amount: '¥1,600–2,400',
  },
  {
    item: '门票',
    detail: '武侯祠 + 都江堰 + 青城山 + 三星堆 + 杜甫草堂',
    amount: '约¥960',
  },
  {
    item: '餐饮市内交通',
    detail: '5 天',
    amount: '¥1,500–2,000',
  },
]

export const costTotal = '¥8,700–11,200'
export const costPerPerson = '约¥2,900–3,700/人'

export const tips: string[] = [
  '11/1 前拍板：11/2 抢 D964 卧铺（在线选铺要下铺），11/7 抢 G2941。',
  '都江堰（11/11）、三星堆（11/13）提前 7 天 20:00 开抢，定闹钟。',
  '孩子带身份证 + 学生证，学生票现场核验。',
  '11 月成都阴冷：冲锋衣 + 毛衣 + 雨伞，青城山上再加一件。',
  'D964 每周停运 1 天，11/16 是否开行以 12306 为准，备选 G2942。',
  '11/16 孩子正常上学，放学后直奔深圳北，提前安排好接人。',
]

export const situations: SituationUpdate[] = [
  {
    id: 'c-s1',
    time: '10/17',
    kind: 'booking',
    title: '抢票日历已排好',
    body: '11/1 拍板 → 11/2 D964 卧铺 → 11/7 G2941 → 11/11 都江堰 → 11/13 三星堆。全部定好闹钟。',
    action: '查看抢票日历',
  },
  {
    id: 'c-s2',
    time: '10/17',
    kind: 'transport',
    title: 'D964 每周停运 1 天',
    body: '11/16 是否开行以 12306 为准。备选：11/17 一早 G2942（07:03 → 14:46），当天中午到成都。',
    action: '查看交通时刻表',
  },
  {
    id: 'c-s3',
    time: '10/17',
    kind: 'weather',
    title: '11 月成都阴冷策略',
    body: '白天 13–17°C、夜间 6–10°C，阴天多湿度大。都江堰、青城山纯户外，雨具必备；三星堆、武侯祠多为室内，可调换顺序避雨。',
    action: '打开天气',
  },
  {
    id: 'c-s4',
    time: '10/17',
    kind: 'social',
    title: '青城山红叶季人少',
    body: '11 月是青城山红叶季，银杏金黄、游客比国庆少一大截。熊猫基地已拿掉（人多不好玩），行程更松弛。',
  },
]
