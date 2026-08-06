export type Moment = {
  id: string
  author: string
  from: string
  place: string
  when: string
  weatherTruth: string
  joy: string
  tip: string
  likes: number
  replies: number
  image: string
  imageAlt: string
  tripLink?: string
}

export const moments: Moment[] = [
  {
    id: 'm1',
    author: '小林一家',
    from: '深圳出发',
    place: '西安 · 大唐不夜城',
    when: 'Day1 · 小雨夜',
    weatherTruth: '社媒说暴雨，实况只是小雨——雨中灯倒影反而更美',
    joy: '差点因为抖音取消，还好对照了预报。孩子在不倒翁姐姐面前站了很久，我们拍了一整段安静的快乐。',
    tip: '天黑后再去；小雨不用躲，带一把伞就够。',
    likes: 128,
    replies: 16,
    image:
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '西安夜景灯火',
    tripLink: '/trip/xian',
  },
  {
    id: 'm2',
    author: '阿哲',
    from: '杭州出发',
    place: '华山 · 西上北下',
    when: 'Day4 · 多云',
    weatherTruth: '山顶约 15°C，比市区体感低一截——薄外套比防晒霜更关键',
    joy: '行李寄在山下酒店，整个人轻了。南峰风很大，但一家人并肩走完，比任何打卡更踏实。',
    tip: '家庭游选西上北下；别拖着箱子上山。',
    likes: 96,
    replies: 11,
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '山间云雾与湖面',
    tripLink: '/trip/xian',
  },
  {
    id: 'm3',
    author: 'Mia',
    from: '成都出发',
    place: '西安 · 陕历博',
    when: '雨天备选变主线',
    weatherTruth: '把户外改到室内，不是妥协，是按实况重新排序',
    joy: '三彩骆驼俑前排了短队。讲解员讲到盛唐时，爸爸突然说：这趟没白来。',
    tip: '雨天优先室内馆；陕历博抢票定闹钟。',
    likes: 74,
    replies: 9,
    image:
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '古建筑街巷氛围',
  },
  {
    id: 'm4',
    author: '周周',
    from: '合肥换乘',
    place: '返程高铁 G2230',
    when: 'Day5 · 晴',
    weatherTruth: '取消飞机+打车后，准点率与体感都更稳',
    joy: '华山北上车，孩子睡过一程，合肥南吃了顿站内晚饭。到家时还亮着灯——这才是想要的旅行收尾。',
    tip: '换乘留 2 小时缓冲，比追最早一班更安心。',
    likes: 61,
    replies: 7,
    image:
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '高铁站台与列车',
    tripLink: '/trip/xian',
  },
]

export const trustPillars = [
  {
    title: '数据可核对',
    body: '天气、交通、预约窗口都能追溯来源。建议给出依据，不只给结论。',
  },
  {
    title: '行程可改版',
    body: '情况变化时说明「改了什么、为什么改、费用怎么变」，像可信的路书编辑。',
  },
  {
    title: '快乐可分享',
    body: '真实走过的人留下足迹：不是炫富打卡，而是可复用的喜悦与避坑。',
  },
  {
    title: '社区有边界',
    body: '鼓励亲历分享，抑制恐慌标题党。热议会与实况并排出现，供大家对照。',
  },
]
