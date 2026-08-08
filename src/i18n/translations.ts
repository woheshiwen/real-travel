export const langs = ['en', 'zh', 'fr', 'ja', 'ko'] as const
export type Lang = (typeof langs)[number]

export const langNames: Record<Lang, string> = {
  en: 'English',
  zh: '中文',
  fr: 'Français',
  ja: '日本語',
  ko: '한국어',
}

// ── Flat key → translations ──
// Keys are organized by domain: nav.* hero.* landing.* plan.* trip.* community.* calendar.* footer.*

const t: Record<string, Record<Lang, string>> = {
  // ── SiteChrome / Nav ──
  'nav.home':     { en: 'Home',        zh: '首页',      fr: 'Accueil',        ja: 'ホーム',        ko: '홈' },
  'nav.trip':     { en: 'Trip',        zh: '路书',      fr: 'Itinéraire',     ja: '旅程',          ko: '여정' },
  'nav.moments':  { en: 'Moments',     zh: '足迹',      fr: 'Moments',        ja: '思い出',        ko: '추억' },
  'nav.plan':     { en: 'Start Planning', zh: '开始规划', fr: 'Planifier',     ja: '計画を始める',  ko: '계획 시작' },
  'nav.preview':  { en: 'See Example', zh: '先看示例',  fr: "Voir l'exemple", ja: '例を見る',      ko: '예제 보기' },
  'brand.zh':     { en: 'Real Travel', zh: '真程',      fr: 'Real Travel',    ja: '真程',          ko: '진정' },
  'brand.en':     { en: 'Real Travel', zh: 'Real Travel', fr: 'Real Travel',  ja: 'Real Travel',   ko: 'Real Travel' },

  // ── CinematicHero ──
  'hero.title.zh':   { en: 'Travel you can trust — places you can feel.', zh: '值得信任的出行，值得分享的风景。', fr: 'Des voyages de confiance — des lieux à ressentir.', ja: '信頼できる旅、感じられる風景。', ko: '신뢰할 수 있는 여행, 느낄 수 있는 풍경.' },
  'hero.title.en':   { en: 'Travel you can trust — places you can feel.', zh: 'Travel you can trust — places you can feel.', fr: 'Travel you can trust — places you can feel.', ja: 'Travel you can trust — places you can feel.', ko: 'Travel you can trust — places you can feel.' },
  'hero.lede.zh':    { en: 'Live weather and departure transport shape an itinerary you can revise — then drop into your calendar.', zh: '结合出发地交通与目的地实况天气，生成可改版的路书；定好后一键导入日历。', fr: 'Météo en direct et transports de départ façonnent un itinéraire révisable — puis dans votre calendrier.', ja: '出発地の交通と目的地の実況天気から、改版可能な旅程を生成。確定後はカレンダーにワンタップでインポート。', ko: '출발지 교통과 목적지 실황 날씨로 수정 가능한 여정을 만들고, 확정 후 캘린더에 원터치로 가져오세요.' },
  'hero.lede.en':    { en: 'Live weather and departure transport shape an itinerary you can revise — then drop into your calendar.', zh: 'Live weather and departure transport shape an itinerary you can revise — then drop into your calendar.', fr: 'Live weather and departure transport shape an itinerary you can revise — then drop into your calendar.', ja: 'Live weather and departure transport shape an itinerary you can revise — then drop into your calendar.', ko: 'Live weather and departure transport shape an itinerary you can revise — then drop into your calendar.' },
  'hero.cta.plan':   { en: 'Plan My Trip', zh: '生成我的行程', fr: 'Planifier mon voyage', ja: '旅程を計画', ko: '여정 계획하기' },
  'hero.cta.xian':   { en: 'Xi\'an Example', zh: '西安示例', fr: 'Exemple Xi\'an', ja: '西安の例', ko: '시안 예제' },

  // ── Landing ──
  'landing.truth.eyebrow':    { en: 'Live Conditions', zh: '实况对照', fr: 'Conditions en direct', ja: '実況对照', ko: '실황 대조' },
  'landing.truth.title':      { en: 'Beyond social panic — verifiable judgment.', zh: '社媒恐慌之外，还有可核对的判断。', fr: 'Au-delà de la panique sociale — un jugement vérifiable.', ja: 'SNSのパニックを超えて、検証可能な判断を。', ko: '소셜 미디어의 공포 너머, 검증 가능한 판단.' },
  'landing.truth.text':       { en: 'Real Travel puts trending discussion side-by-side with forecasts — keep, adjust, or revise, all clearly explained.', zh: '真程把热议与预报放在一起看——保留、微调还是改版，都写得清楚。', fr: 'Real Travel place les discussions tendance à côté des prévisions — garder, ajuster ou réviser, tout est clairement expliqué.', ja: '真程は話題の議論と予報を並べて表示——維持、微調整、改版のいずれも明確に説明します。', ko: '진정은 화제의 논의와 예보를 나란히 보여줍니다 — 유지, 조정, 수정 모두 명확히 설명됩니다.' },
  'landing.truth.live':       { en: 'LIVE', zh: 'LIVE', fr: 'EN DIRECT', ja: 'LIVE', ko: 'LIVE' },
  'landing.truth.api':        { en: 'API', zh: 'API', fr: 'API', ja: 'API', ko: 'API' },

  'landing.principles.eyebrow': { en: 'Principles', zh: '产品原则', fr: 'Principes', ja: '製品原則', ko: '제품 원칙' },
  'landing.principles.title':  { en: 'Build something people can use and trust.', zh: '先做成大家用得上、信得过的系统。', fr: 'Construire quelque chose que les gens peuvent utiliser et en qui ils peuvent avoir confiance.', ja: 'みんなが使えて、信頼できるシステムをまず作る。', ko: '모두가 사용하고 신뢰할 수 있는 시스템을 먼저 만듭니다.' },
  'landing.principles.text':   { en: 'Not another trending travel site. Real Travel is built for long-term verifiability, revisability, and shareability — grounding decisions in facts, keeping joy in the community.', zh: '不是又一个热点旅游站。真程要长期可核对、可改版、可分享——让决策站在实况上，让快乐留在社区里。', fr: "Pas un autre site de voyage tendance. Real Travel est conçu pour la vérifiabilité, la révisabilité et le partage à long terme — ancrer les décisions dans les faits, garder la joie dans la communauté.", ja: 'ただの話題の旅行サイトではありません。真程は長期的な検証可能性、改版可能性、共有可能性を目指します——判断は実況に基づき、喜びはコミュニティに残します。', ko: '또 다른 트렌디한 여행 사이트가 아닙니다. 진정은 장기적인 검증 가능성, 수정 가능성, 공유 가능성을 위해 설계되었습니다 — 결정은 사실에 기반하고, 기쁨은 커뮤니티에 남깁니다.' },

  'landing.how.eyebrow':  { en: 'How It Works', zh: '工作方式', fr: 'Fonctionnement', ja: '仕組み', ko: '작동 방식' },
  'landing.how.title':    { en: 'Practical system + interactive platform.', zh: '实用系统 + 交互平台。', fr: 'Système pratique + plateforme interactive.', ja: '実用的なシステム＋インタラクティブなプラットフォーム。', ko: '실용적인 시스템 + 인터랙티브 플랫폼.' },

  'landing.moments.eyebrow': { en: 'Footprint Square', zh: '足迹广场', fr: 'Place des empreintes', ja: '足跡広場', ko: '발자국 광장' },
  'landing.moments.title':   { en: 'Joy people are sharing right now.', zh: '大家正在分享的快乐。', fr: 'La joie que les gens partagent en ce moment.', ja: 'みんなが今共有している喜び。', ko: '사람들이 지금 공유하는 기쁨.' },
  'landing.moments.text':    { en: 'What witnesses leave behind isn\'t clickbait — it\'s verifiable judgment, and joy worth passing on.', zh: '亲历者留下的不是夸张标题，而是可对照的实况判断，和一段想传下去的喜悦。', fr: "Ce que les témoins laissent derrière eux, ce n'est pas du putaclic — c'est un jugement vérifiable, et une joie qui mérite d'être transmise.", ja: '体験者が残すのは誇張されたタイトルではなく、对照可能な実況判断と、伝えたい喜びです。', ko: '목격자가 남기는 것은 클릭베이트가 아니라 검증 가능한 판단과 전하고 싶은 기쁨입니다.' },

  'landing.cta.title':  { en: 'From sample itinerary to real community.', zh: '从示例行程，走到真实社区。', fr: "De l'itinéraire exemple à la vraie communauté.", ja: 'サンプル旅程から、本当のコミュニティへ。', ko: '샘플 여정에서 진짜 커뮤니티로.' },
  'landing.cta.text':   { en: 'Open the Xi\'an family trip first, then visit Footprint Square to see how fellow travelers made decisions and captured joy.', zh: '先打开西安家庭游路书，再去足迹广场看看同行人怎么做决定、怎么把快乐留下来。', fr: "Ouvrez d'abord le voyage familial à Xi'an, puis visitez la Place des empreintes pour voir comment les autres voyageurs ont pris leurs décisions et capturé leur joie.", ja: 'まず西安家族旅行の旅程を開き、それから足跡広場で仲間の旅行者がどう判断し、喜びを残したかを見てみましょう。', ko: '먼저 시안 가족 여행 여정을 열고, 발자국 광장에서 동료 여행자들이 어떻게 결정을 내리고 기쁨을 남겼는지 확인하세요.' },
  'landing.cta.open':   { en: 'Open Sample Trip', zh: '打开示例行程', fr: "Ouvrir l'exemple", ja: 'サンプル旅程を開く', ko: '샘플 여정 열기' },
  'landing.cta.community': { en: 'Visit Footprint Square', zh: '进入足迹广场', fr: 'Visiter la Place', ja: '足跡広場へ', ko: '발자국 광장 방문' },

  'landing.footer.tagline': { en: 'Travel by truth — leave joy for those who follow.', zh: '按实况出行，把快乐留给后来者。', fr: 'Voyagez selon la vérité — laissez la joie à ceux qui suivent.', ja: '実況に従って旅をし、後に続く人に喜びを残そう。', ko: '실황에 따라 여행하고, 뒤따르는 이들에게 기쁨을 남기세요.' },

  // ── Plan Page ──
  'plan.eyebrow':       { en: 'New Trip', zh: '新建行程', fr: 'Nouveau voyage', ja: '新規旅程', ko: '새 여정' },
  'plan.title':         { en: 'Tell us your constraints — the rest is up to live data and AI.', zh: '告诉我们约束，剩下的交给实况与 AI。', fr: 'Dites-nous vos contraintes — le reste est confié aux données en direct et à l\'IA.', ja: '制約を教えてください——残りは実況データとAIにお任せを。', ko: '제약 조건을 알려주세요 — 나머지는 실황 데이터와 AI가 처리합니다.' },
  'plan.subtitle':      { en: 'First collect origin, dates, and travel companions. In the demo, a full "Shenzhen → Xi\'an Family Trip" itinerary will be generated, showing how weather and transport shape recommendations.', zh: '先收集出发地、日期和同行人。演示阶段会生成「深圳 → 西安家庭游」完整路书，并展示天气 / 交通如何影响建议。', fr: 'Collectez d\'abord l\'origine, les dates et les compagnons. En démo, un itinéraire complet « Shenzhen → Xi\'an en famille » sera généré, montrant comment la météo et les transports influencent les recommandations.', ja: 'まず出発地、日付、同行者を収集します。デモでは「深圳→西安家族旅行」の完全な旅程が生成され、天気や交通が提案にどう影響するかが表示されます。', ko: '먼저 출발지, 날짜, 동행자를 수집합니다. 데모에서는 "선전 → 시안 가족 여행" 전체 여정이 생성되어 날씨와 교통이 추천에 어떻게 영향을 미치는지 보여줍니다.' },
  'plan.origin':        { en: 'Origin', zh: '出发地', fr: 'Origine', ja: '出発地', ko: '출발지' },
  'plan.destination':   { en: 'Destination', zh: '目的地', fr: 'Destination', ja: '目的地', ko: '목적지' },
  'plan.startDate':     { en: 'Start Date', zh: '出发日期', fr: 'Date de départ', ja: '出発日', ko: '출발일' },
  'plan.endDate':       { en: 'Return Date', zh: '返回日期', fr: 'Date de retour', ja: '帰着日', ko: '귀환일' },
  'plan.party':         { en: 'Travel Companions', zh: '同行人', fr: 'Compagnons', ja: '同行者', ko: '동행자' },
  'plan.homeStop':      { en: 'Return Stopover (optional)', zh: '返程落脚点（可选）', fr: 'Escale retour (optionnel)', ja: '帰路の立ち寄り先（任意）', ko: '귀환 경유지 (선택)' },
  'plan.interests':     { en: 'Preferences', zh: '偏好', fr: 'Préférences', ja: '好み', ko: '선호' },
  'plan.interests.museum':   { en: 'Museums', zh: '博物馆', fr: 'Musées', ja: '博物館', ko: '박물관' },
  'plan.interests.nature':   { en: 'Nature', zh: '自然风光', fr: 'Nature', ja: '自然', ko: '자연' },
  'plan.interests.food':     { en: 'Food', zh: '美食', fr: 'Gastronomie', ja: 'グルメ', ko: '미식' },
  'plan.interests.family':   { en: 'Family-friendly', zh: '亲子友好', fr: 'Famille', ja: '家族向け', ko: '가족 친화' },
  'plan.interests.easy':     { en: 'Low Walking', zh: '少走路', fr: 'Peu de marche', ja: '歩き少なめ', ko: '적은 도보' },
  'plan.interests.night':    { en: 'Night Views', zh: '夜景', fr: 'Vues nocturnes', ja: '夜景', ko: '야경' },
  'plan.submit':        { en: 'Generate Dynamic Itinerary', zh: '生成动态行程', fr: "Générer l'itinéraire", ja: '動的旅程を生成', ko: '동적 여정 생성' },
  'plan.submitting':    { en: 'Combining weather & transport data…', zh: '正在结合天气与交通生成…', fr: 'Combinaison des données météo & transport…', ja: '天気と交通データを組み合わせ中…', ko: '날씨와 교통 데이터 결합 중…' },

  // ── Trip Page ──
  'trip.banner.title':  { en: 'Actionable itinerary generated', zh: '已生成可执行路书', fr: 'Itinéraire exploitable généré', ja: '実行可能な旅程が生成されました', ko: '실행 가능한 여정 생성됨' },
  'trip.banner.text':   { en: 'Below is a Shenzhen → Xi\'an family trip example. You can import it directly into your calendar with ticket-purchase alarms.', zh: '以下为深圳出发西安家庭游示例，可直接导入日历与抢票闹钟。', fr: "Voici un exemple de voyage familial Shenzhen → Xi'an. Vous pouvez l'importer directement dans votre calendrier avec des alarmes d'achat de billets.", ja: '以下は深圳発西安家族旅行の例です。カレンダーに直接インポートして、チケット購入アラームを設定できます。', ko: '아래는 선전 출발 시안 가족 여행 예제입니다. 캘린더에 직접 가져와 티켓 구매 알람을 설정할 수 있습니다.' },
  'trip.banner.dismiss':{ en: 'Got it', zh: '知道了', fr: 'Compris', ja: '了解', ko: '알겠습니다' },
  'trip.source.api':    { en: 'Connected to API', zh: '已连接后台', fr: 'Connecté à l\'API', ja: 'API接続済み', ko: 'API 연결됨' },
  'trip.source.demo':   { en: 'Demo Data', zh: '演示数据', fr: 'Données démo', ja: 'デモデータ', ko: '데모 데이터' },
  'trip.cost.total':    { en: 'Total (3 people)', zh: '3人合计', fr: 'Total (3 pers.)', ja: '合計（3名）', ko: '총액 (3인)' },
  'trip.cost.perPerson':{ en: 'per person', zh: '人均约', fr: 'par personne', ja: '一人あたり約', ko: '1인당 약' },
  'trip.days.label':    { en: 'Trip Duration', zh: '行程天数', fr: 'Durée du voyage', ja: '旅程日数', ko: '여행 기간' },
  'trip.days.count':    { en: 'days', zh: '天', fr: 'jours', ja: '日間', ko: '일' },
  'trip.urgent.label':  { en: 'Urgent Tasks', zh: '待办抢票', fr: 'Tâches urgentes', ja: '緊急タスク', ko: '긴급 작업' },
  'trip.urgent.count':  { en: 'urgent', zh: '项紧急', fr: 'urgent(s)', ja: '件緊急', ko: '건 긴급' },
  'trip.urgent.note':   { en: 'Calendar import adds triple alarms', zh: '导入日历自动带三重闹钟', fr: "L'importation ajoute trois alarmes", ja: 'カレンダーインポートで三重アラーム付き', ko: '캘린더 가져오기 시 삼중 알람 추가' },
  'trip.weather.label':  { en: 'Day 1 Weather', zh: '首日天气', fr: 'Météo Jour 1', ja: '初日の天気', ko: '첫날 날씨' },
  'trip.weather.note':   { en: ', see weather strip below', zh: '，其后见天气条', fr: ', voir la bande météo', ja: '、以降は天気ストリップ参照', ko: ', 이후 날씨 스트립 참조' },
  'trip.weather.title':  { en: 'Weather Strip', zh: '天气实况条', fr: 'Bande météo', ja: '天気実況ストリップ', ko: '날씨 실황 스트립' },
  'trip.weather.pill':   { en: 'vs Social Media', zh: '对照社媒', fr: 'vs Réseaux sociaux', ja: 'SNS对照', ko: 'SNS 대조' },
  'trip.situations.title': { en: 'Live Updates & Advice', zh: '动态情况与建议', fr: 'Mises à jour & conseils', ja: '動的状況とアドバイス', ko: '실시간 업데이트 및 조언' },
  'trip.situations.pill':  { en: 'Revisable in real-time', zh: '随实情改版', fr: 'Révisable en temps réel', ja: '実情に応じて改版', ko: '실시간 수정 가능' },
  'trip.days.title':     { en: 'Daily Itinerary', zh: '每日行程', fr: 'Itinéraire quotidien', ja: '日別旅程', ko: '일일 여정' },
  'trip.days.countLabel':{ en: 'bookings', zh: '项预约', fr: 'réservations', ja: '件予約', ko: '건 예약' },
  'trip.days.segments':  { en: 'segments', zh: '段安排', fr: 'segments', ja: '区間', ko: '구간' },
  'trip.transport.title':{ en: 'Transport Timetable', zh: '全程交通时刻表', fr: 'Horaires de transport', ja: '全区間交通時刻表', ko: '전체 교통 시간표' },
  'trip.transport.th.date': { en: 'Date', zh: '日期', fr: 'Date', ja: '日付', ko: '날짜' },
  'trip.transport.th.type': { en: 'Type', zh: '类型', fr: 'Type', ja: '種類', ko: '유형' },
  'trip.transport.th.code': { en: 'Code', zh: '班次', fr: 'Code', ja: '便名', ko: '편명' },
  'trip.transport.th.route':{ en: 'Route', zh: '路线', fr: 'Itinéraire', ja: '経路', ko: '경로' },
  'trip.transport.th.time': { en: 'Time', zh: '时间', fr: 'Heure', ja: '時間', ko: '시간' },
  'trip.transport.th.duration':{ en: 'Duration', zh: '时长', fr: 'Durée', ja: '所要時間', ko: '소요 시간' },
  'trip.transport.th.price':{ en: 'Price/person', zh: '票价/人', fr: 'Prix/pers.', ja: '料金/人', ko: '요금/인' },
  'trip.costs.title':    { en: 'Cost Estimate', zh: '费用估算', fr: 'Estimation des coûts', ja: '費用見積もり', ko: '비용 추정' },
  'trip.costs.totalRow': { en: 'Total', zh: '合计', fr: 'Total', ja: '合計', ko: '합계' },
  'trip.costs.totalDetail': { en: 'Total for 3 people', zh: '3人总费用', fr: 'Total pour 3 pers.', ja: '3名合計', ko: '3인 총비용' },
  'trip.tips.title':     { en: 'Practical Tips', zh: '实用提示', fr: 'Conseils pratiques', ja: '実用 tips', ko: '실용 팁' },
  'trip.replan.eyebrow': { en: 'After Trust — Sharing', zh: '信任之后，是分享', fr: 'Après la confiance — le partage', ja: '信頼のあとは、共有', ko: '신뢰 다음은 공유' },
  'trip.replan.title':   { en: 'Finish this trip — then leave joy for those who follow.', zh: '走完这趟，把快乐留给后来者。', fr: 'Terminez ce voyage — puis laissez la joie à ceux qui suivent.', ja: 'この旅を終えたら、後に続く人に喜びを残そう。', ko: '이 여행을 마친 후, 뒤따르는 이들에게 기쁨을 남기세요.' },
  'trip.replan.text':    { en: 'Conditions verified, itinerary revisable, alarms set. After your trip, share the rain-lit streets and the peace of arriving home — for the next traveler.', zh: '实况可核对、行程可改版、闹钟已就位。走完之后，把雨中灯火与当晚到家的安心，分享给下一个出发的人。', fr: 'Conditions vérifiées, itinéraire révisable, alarmes réglées. Après votre voyage, partagez les rues éclairées par la pluie et la paix du retour — pour le prochain voyageur.', ja: '実況は検証可能、旅程は改版可能、アラームはセット済み。旅の後は、雨に濡れた灯りと家に着いた安心を、次の出発者に共有してください。', ko: '실황 검증 완료, 여정 수정 가능, 알람 설정 완료. 여행 후에는 비 오는 거리의 불빛과 집에 도착한 안도감을 다음 여행자와 공유하세요.' },
  'trip.replan.share':   { en: 'Share This Joy', zh: '分享这段快乐', fr: 'Partager cette joie', ja: 'この喜びを共有', ko: '이 기쁨 공유하기' },
  'trip.replan.again':   { en: 'Plan Another', zh: '再生成一版', fr: 'En planifier un autre', ja: '別の旅程を計画', ko: '다른 여정 계획' },
  'trip.cta.calendar':   { en: 'Add to Calendar', zh: '加入日历', fr: 'Ajouter au calendrier', ja: 'カレンダーに追加', ko: '캘린더에 추가' },
  'trip.booking.deadline': { en: 'Buy: ', zh: '抢票 / 购买：', fr: 'Acheter : ', ja: '購入：', ko: '구매: ' },
  'trip.aria.overview':  { en: 'Trip Overview', zh: '行程概览', fr: 'Aperçu du voyage', ja: '旅程概要', ko: '여정 개요' },
  'trip.aria.dateSelect':{ en: 'Select Date', zh: '选择日期', fr: 'Sélectionner la date', ja: '日付を選択', ko: '날짜 선택' },

  // kind labels
  'kind.weather':  { en: 'Weather', zh: '天气', fr: 'Météo', ja: '天気', ko: '날씨' },
  'kind.transport':{ en: 'Transport', zh: '交通', fr: 'Transport', ja: '交通', ko: '교통' },
  'kind.booking':  { en: 'Booking', zh: '预约', fr: 'Réservation', ja: '予約', ko: '예약' },
  'kind.social':   { en: 'Social Media', zh: '社媒', fr: 'Réseaux sociaux', ja: 'SNS', ko: '소셜 미디어' },

  // ── Community Page ──
  'community.eyebrow':      { en: 'Footprint Square', zh: '足迹广场', fr: 'Place des empreintes', ja: '足跡広場', ko: '발자국 광장' },
  'community.title':        { en: 'Leave the joy of the road for the next traveler.', zh: '把路上的快乐，留给下一个出发的人。', fr: 'Laissez la joie de la route au prochain voyageur.', ja: '道中の喜びを、次の出発者に残そう。', ko: '길 위의 기쁨을 다음 여행자에게 남기세요.' },
  'community.intro':         { en: 'Real Travel doesn\'t just generate itineraries — it aspires to be a trusted platform: make decisions with real data, share peace of mind and joy through firsthand accounts. Currently {count} footprints, {total} resonances.', zh: '真程不只生成行程，也希望成为值得信任的交互平台：用实况做决策，用亲历分享传递安心与喜悦。目前已有 {count} 段足迹，累计 {total} 次共鸣。', fr: 'Real Travel ne fait pas que générer des itinéraires — il aspire à être une plateforme de confiance : prenez des décisions avec des données réelles, partagez la tranquillité et la joie à travers des récits de première main. Actuellement {count} empreintes, {total} résonances.', ja: '真程は旅程を生成するだけでなく、信頼できるプラットフォームを目指します：実データで判断し、実体験を通じて安心と喜びを共有します。現在 {count} 件の足跡、累計 {total} 回の共鳴。', ko: '진정은 여정을 생성할 뿐만 아니라 신뢰할 수 있는 플랫폼을 지향합니다: 실제 데이터로 결정하고, 직접 경험을 통해 안심과 기쁨을 공유합니다. 현재 {count}개의 발자국, 누적 {total}회의 공감.' },
  'community.share':         { en: 'Share My Joy', zh: '写下我的快乐', fr: 'Partager ma joie', ja: '私の喜びを書く', ko: '내 기쁨 공유하기' },
  'community.planFirst':     { en: 'Plan a Trip First', zh: '先生成一趟行程', fr: "Planifier d'abord", ja: 'まず旅程を計画', ko: '먼저 여정 계획하기' },
  'community.fromApi':       { en: 'From API', zh: '来自后台', fr: "Depuis l'API", ja: 'APIから', ko: 'API에서' },
  'community.justShared':    { en: 'Just shared', zh: '刚刚分享', fr: 'Vient de partager', ja: '今共有しました', ko: '방금 공유함' },
  'community.moment.truth':  { en: 'Weather reality check: ', zh: '', fr: 'Vérification météo : ', ja: '天気実況：', ko: '날씨 실황: ' },
  'community.moment.label':  { en: 'Takeaway: ', zh: '可带走：', fr: 'À retenir : ', ja: '持ち帰り：', ko: '가져갈 팁: ' },
  'community.resonate':      { en: 'Resonate', zh: '共鸣', fr: 'Résonance', ja: '共鳴', ko: '공감' },
  'community.reply':         { en: 'Reply', zh: '回应', fr: 'Répondre', ja: '返信', ko: '답글' },
  'community.seeTrip':       { en: 'See related trip', zh: '查看关联行程', fr: 'Voir le voyage lié', ja: '関連旅程を見る', ko: '관련 여정 보기' },
  'community.now':           { en: 'Now', zh: '此刻', fr: 'Maintenant', ja: '今', ko: '지금' },
  'community.defaultTruth':  { en: 'Based on weather I verified myself', zh: '按自己核对过的实况出发', fr: 'Basé sur la météo que j\'ai vérifiée', ja: '自分で確認した実況に基づく', ko: '내가 직접 확인한 날씨 기준' },
  'community.defaultTip':    { en: 'Leave your honest feelings for the next traveler.', zh: '把真实感受留给后来的同行人。', fr: 'Laissez vos sentiments honnêtes au prochain voyageur.', ja: '正直な気持ちを後の同行者に残しましょう。', ko: '솔직한 느낌을 다음 여행자에게 남기세요.' },

  // ── Community Composer ──
  'composer.title':         { en: 'Share a moment of real joy', zh: '分享一段真实的快乐', fr: 'Partagez un moment de vraie joie', ja: '本当の喜びの瞬間を共有', ko: '진짜 기쁨의 순간을 공유하세요' },
  'composer.close':         { en: 'Close', zh: '关闭', fr: 'Fermer', ja: '閉じる', ko: '닫기' },
  'composer.hint':          { en: 'Share your firsthand experience. Please include the weather/transport judgments you verified — this helps future travelers build trust.', zh: '欢迎分享亲历感受。请尽量附上你核对过的天气/交通判断，帮助后来者建立信任。', fr: 'Partagez votre expérience directe. Veuillez inclure les jugements météo/transport que vous avez vérifiés — cela aide les futurs voyageurs à établir la confiance.', ja: 'あなたの直接体験を共有してください。確認した天気/交通の判断も添えてください——後の旅行者が信頼を築く助けになります。', ko: '직접 경험을 공유하세요. 확인한 날씨/교통 판단을 함께 적어주세요 — 미래의 여행자가 신뢰를 쌓는 데 도움이 됩니다.' },
  'composer.place':         { en: 'Place', zh: '地点', fr: 'Lieu', ja: '場所', ko: '장소' },
  'composer.placeHint':     { en: 'e.g. Xi\'an · Giant Wild Goose Pagoda', zh: '例如：西安 · 大唐不夜城', fr: 'ex: Xi\'an · Grande Pagode', ja: '例：西安·大唐不夜城', ko: '예: 시안 · 대안탑' },
  'composer.truth':         { en: 'Weather/transport reality (optional)', zh: '实况判断（可选）', fr: 'Réalité météo/transport (optionnel)', ja: '実況判断（任意）', ko: '실황 판단 (선택)' },
  'composer.truthHint':     { en: 'e.g. Forecast was light rain — night views still worth it', zh: '例如：预报小雨，夜景仍值得去', fr: 'ex: Prévision de pluie légère — les vues nocturnes valent toujours le coup', ja: '例：小雨予報だったが夜景はそれでも価値あり', ko: '예: 가벼운 비 예보였지만 야경은 여전히 가치 있음' },
  'composer.joy':           { en: 'The joy I want to share', zh: '我想分享的快乐', fr: 'La joie que je veux partager', ja: '共有したい喜び', ko: '공유하고 싶은 기쁨' },
  'composer.joyHint':       { en: 'What happened in that moment? Why is it worth remembering?', zh: '那一刻发生了什么？为什么值得留下？', fr: "Que s'est-il passé à ce moment ? Pourquoi cela vaut-il la peine d'être retenu ?", ja: 'その瞬間に何が起きましたか？なぜ残す価値がありますか？', ko: '그 순간 무슨 일이 있었나요? 왜 기억할 가치가 있나요?' },
  'composer.tip':           { en: 'One tip for future travelers (optional)', zh: '给后来者的一句提示（可选）', fr: 'Un conseil pour les futurs voyageurs (optionnel)', ja: '後の旅行者への一言 tips（任意）', ko: '미래 여행자를 위한 팁 (선택)' },
  'composer.tipHint':       { en: 'e.g. Go after dark — rain makes the lights even more beautiful', zh: '例如：天黑后再去，雨中灯光更美', fr: 'ex: Allez après la tombée de la nuit — la pluie rend les lumières encore plus belles', ja: '例：暗くなってから行くと、雨で灯りがより美しく', ko: '예: 어두워진 후에 가세요 — 비가 불빛을 더욱 아름답게 만듭니다' },
  'composer.submit':        { en: 'Publish to Footprint Square', zh: '发布到足迹广场', fr: 'Publier sur la Place', ja: '足跡広場に投稿', ko: '발자국 광장에 게시' },

  // ── Shared labels ──
  'community.me':           { en: 'Me', zh: '我', fr: 'Moi', ja: '私', ko: '나' },
  'community.imageAlt':     { en: 'Road trip scenery', zh: '旅途公路与远山', fr: 'Paysage de voyage', ja: '旅の風景', ko: '여행 풍경' },
  'community.feedLabel':    { en: 'Footprint Feed', zh: '足迹动态', fr: "Fil d'empreintes", ja: '足跡フィード', ko: '발자국 피드' },
  'community.nowLabel':     { en: 'Now', zh: '此刻', fr: 'Maintenant', ja: '今', ko: '지금' },

  // ── Calendar Export ──
  'calendar.title':       { en: 'One-Click Calendar & Alarms', zh: '一键加入日历与闹钟', fr: 'Calendrier & alarmes en un clic', ja: 'ワンクリックでカレンダー＆アラーム', ko: '원클릭 캘린더 및 알람' },
  'calendar.lede':        { en: 'Open the exported file with your phone calendar: itinerary events appear on schedule, ticket-purchase windows get triple reminders (1 day before / 10 min / 1 min), and transport legs include departure and boarding alerts.', zh: '导出后用手机日历打开即可：行程按时间落到日程上，抢票窗口会带提前一天 / 10 分钟 / 1 分钟三重提醒，交通班次带出发与进站提醒。', fr: "Ouvrez le fichier exporté avec le calendrier de votre téléphone : les événements apparaissent à l'heure, les fenêtres d'achat de billets reçoivent un triple rappel (1 jour avant / 10 min / 1 min), et les trajets incluent des alertes de départ et d'embarquement.", ja: '書き出したファイルをスマホのカレンダーで開くだけ：旅程イベントがスケジュールに表示され、チケット購入枠には三重リマインダー（1日前/10分前/1分前）が付き、交通区間には出発・乗車アラートが含まれます。', ko: '내보낸 파일을 휴대폰 캘린더로 열기만 하면 됩니다: 여정 이벤트가 일정에 표시되고, 티켓 구매 창에는 삼중 알림(1일 전/10분/1분)이, 교통 구간에는 출발 및 탑승 알림이 포함됩니다.' },
  'calendar.events':      { en: 'Events', zh: '行程事件', fr: 'Événements', ja: 'イベント', ko: '이벤트' },
  'calendar.alarms':      { en: 'Alarms', zh: '抢票闹钟', fr: 'Alarmes', ja: 'アラーム', ko: '알람' },
  'calendar.transport':   { en: 'Transports', zh: '交通班次', fr: 'Transports', ja: '交通', ko: '교통' },
  'calendar.reminder':    { en: 'Reminder before event', zh: '行程提前提醒', fr: 'Rappel avant événement', ja: 'イベント前リマインダー', ko: '이벤트 전 알림' },
  'calendar.minutes':     { en: 'min', zh: '分钟', fr: 'min', ja: '分', ko: '분' },
  'calendar.include':     { en: 'Include', zh: '包含内容', fr: 'Inclure', ja: '含める', ko: '포함' },
  'calendar.include.bookings': { en: 'Ticket Alarms', zh: '抢票提醒', fr: 'Alarmes billets', ja: 'チケットアラーム', ko: '티켓 알람' },
  'calendar.include.transport':{ en: 'Transport Legs', zh: '交通班次', fr: 'Trajets', ja: '交通区間', ko: '교통 구간' },
  'calendar.download.all':{ en: 'Download Full .ics', zh: '下载完整行程 .ics', fr: 'Télécharger .ics complet', ja: '完全な.icsをダウンロード', ko: '전체 .ics 다운로드' },
  'calendar.download.day':{ en: 'Download This Day Only', zh: '只下载当天', fr: 'Télécharger ce jour', ja: 'この日だけダウンロード', ko: '오늘만 다운로드' },
  'calendar.done.full':   { en: 'Full itinerary calendar downloaded', zh: '已下载完整行程日历', fr: 'Calendrier complet téléchargé', ja: '完全な旅程カレンダーをダウンロードしました', ko: '전체 여정 캘린더 다운로드 완료' },
  'calendar.done.day':    { en: 'Day calendar downloaded', zh: '已下载当日日历', fr: 'Calendrier du jour téléchargé', ja: '当日カレンダーをダウンロードしました', ko: '당일 캘린더 다운로드 완료' },
  'calendar.done.note':   { en: 'Open the file on your phone to import into your system calendar (iOS Calendar / Google Calendar / Huawei·Xiaomi Calendar all supported).', zh: '在手机上打开文件即可导入系统日历（iOS 日历 / Google 日历 / 华为·小米日历均支持）。', fr: 'Ouvrez le fichier sur votre téléphone pour l\'importer dans votre calendrier système (iOS / Google / Huawei·Xiaomi pris en charge).', ja: 'スマホでファイルを開いてシステムカレンダーにインポートできます（iOSカレンダー/Googleカレンダー/Huawei·Xiaomiカレンダー対応）。', ko: '휴대폰에서 파일을 열어 시스템 캘린더로 가져오세요 (iOS 캘린더 / Google 캘린더 / 화웨이·샤오미 캘린더 모두 지원).' },

  // ── Amap one-tap nav (Xi’an self-drive test) ──
  'amap.title': { en: 'Open in Amap', zh: '一键打开高德导航', fr: 'Ouvrir dans Amap', ja: '高徳マップで開く', ko: '가오더 지도에서 열기' },
  'amap.pill':  { en: 'Gaode', zh: '高德', fr: 'Gaode', ja: '高徳', ko: '가오더' },
  'amap.lede':  {
    en: 'Self-drive segments for the Xi’an sample. Tap to plan the route in Amap (opens the app on phone if installed). Place names stay in Chinese so Amap can match them.',
    zh: '西安示例里的自驾路段。点一下用高德规划路线（手机上若已安装会尝试调起 App）。地点名用中文，方便高德匹配。',
    fr: 'Segments en voiture de l’exemple Xi’an. Appuyez pour ouvrir l’itinéraire dans Amap (lance l’app sur mobile si installée). Les noms restent en chinois pour le matching.',
    ja: '西安サンプルの自家用車区間。タップで高徳マップにルートを開きます（端末にアプリがあれば起動を試みます）。地名はマッチングのため中国語のままです。',
    ko: '시안 샘플의 자가운전 구간입니다. 탭하면 가오더에서 경로를 엽니다(앱이 있으면 실행 시도). 매칭을 위해 지명은 중국어를 유지합니다.',
  },
  'amap.scope':     { en: 'Show', zh: '显示范围', fr: 'Afficher', ja: '表示', ko: '표시' },
  'amap.scope.day': { en: 'Selected day', zh: '当天路段', fr: 'Jour sélectionné', ja: '選択中の日', ko: '선택한 날' },
  'amap.scope.all': { en: 'All drive legs', zh: '全部自驾', fr: 'Tous les trajets', ja: '全ドライブ', ko: '전체 운전' },
  'amap.open':      { en: 'Open in Amap', zh: '打开高德', fr: 'Ouvrir Amap', ja: '高徳で開く', ko: '가오더 열기' },
  'amap.done':      {
    en: 'Amap opened in a new tab. On mobile, confirm if prompted to switch to the app.',
    zh: '已在新标签打开高德。手机上如提示跳转 App，确认即可。',
    fr: 'Amap s’est ouvert dans un nouvel onglet. Sur mobile, confirmez le passage à l’app si demandé.',
    ja: '新しいタブで高徳が開きました。モバイルではアプリへ切り替える確認が出たら許可してください。',
    ko: '새 탭에서 가오더가 열렸습니다. 모바일에서 앱 전환 확인이 뜨면 허용하세요.',
  },
  'amap.leg.day1.airport': { en: 'Day 1 · Airport → hotel', zh: 'Day1 · 机场 → 酒店', fr: 'Jour 1 · Aéroport → hôtel', ja: 'Day1 · 空港→ホテル', ko: 'Day1 · 공항 → 호텔' },
  'amap.leg.day1.airport.note': {
    en: 'Optional transfer if you rent a car or book a driver at Xianyang T3.',
    zh: '若在咸阳 T3 租车或约司机，用这条导航回钟楼酒店。',
    fr: 'Transfert optionnel si vous louez une voiture ou un chauffeur à Xianyang T3.',
    ja: '咸陽T3でレンタカー／運転手を使う場合の送迎ルート。',
    ko: '셴양 T3에서 렌터카나 기사를 쓸 때의 선택 이동 구간.',
  },
  'amap.leg.day2.morning': { en: 'Day 2 · Hotel → Terracotta', zh: 'Day2 · 酒店 → 兵马俑', fr: 'Jour 2 · Hôtel → Terracotta', ja: 'Day2 · ホテル→兵馬俑', ko: 'Day2 · 호텔 → 병마용' },
  'amap.leg.day2.morning.note': {
    en: 'Leave luggage at the Xi’an hotel. Aim for opening time to skip tour groups.',
    zh: '行李留西安酒店。尽量赶开门，躲开旅行团。',
    fr: 'Laissez les bagages à l’hôtel. Visez l’ouverture pour éviter les groupes.',
    ja: '荷物は西安のホテルへ。開館に合わせて団体を避ける。',
    ko: '짐은 시안 호텔에. 개장 시간에 맞춰 단체 관광을 피하세요.',
  },
  'amap.leg.day2.afternoon': { en: 'Day 2 · Terracotta → Huaqing → Muslim Quarter', zh: 'Day2 · 兵马俑 → 华清宫 → 回民街', fr: 'Jour 2 · Terracotta → Huaqing → Quartier musulman', ja: 'Day2 · 兵馬俑→華清宮→回民街', ko: 'Day2 · 병마용 → 화청궁 → 회민가' },
  'amap.leg.day2.afternoon.note': {
    en: 'One via point (Huaqing Palace), then back into the city for dinner.',
    zh: '华清宫作途经点（高德仅支持一个途经点），再回城吃晚饭。',
    fr: 'Un point de passage (Huaqing), puis retour en ville pour le dîner.',
    ja: '華清宮を経由（高徳は経由1点まで）、その後市内で夕食。',
    ko: '화청궁을 경유(가오더는 경유 1곳)한 뒤 시내로 돌아와 저녁.',
  },

  // ── Loader Steps (CinematicHero) ──
  'loader.1': { en: 'Read origin transport & constraints', zh: '读取出发地交通与约束', fr: 'Lire le transport d\'origine et les contraintes', ja: '出発地の交通と制約を読み取り', ko: '출발지 교통 및 제약 조건 읽기' },
  'loader.2': { en: 'Compare live destination weather',       zh: '对照目的地实况天气',            fr: 'Comparer la météo en direct de la destination', ja: '目的地の実況天気を对照',       ko: '목적지 실황 날씨 대조' },
  'loader.3': { en: 'Walk into case-study landmarks',         zh: '走进旅行案例的标志景点',        fr: 'Explorer les lieux emblématiques des études de cas', ja: '事例のランドマークを歩く',     ko: '사례 연구 랜드마크 탐방' },
  'loader.4': { en: 'Build a revisable itinerary from truth', zh: '按实况生成可改版路书',          fr: 'Construire un itinéraire révisable à partir des faits', ja: '実況から改版可能な旅程を構築', ko: '실황에서 수정 가능한 여정 구축' },
  'loader.5': { en: 'Export to calendar with reminders',      zh: '一键导入日历与提醒',            fr: 'Exporter vers le calendrier avec rappels', ja: 'リマインダー付きでカレンダーにエクスポート', ko: '알림과 함께 캘린더로 내보내기' },

  // ── How It Works Steps ──
  'step.1': { en: 'Generate an executable itinerary from weather, transport, and constraints', zh: '按天气、交通与约束生成可执行路书', fr: 'Générer un itinéraire exécutable à partir de la météo, des transports et des contraintes', ja: '天気・交通・制約から実行可能な旅程を生成', ko: '날씨, 교통, 제약 조건에서 실행 가능한 여정 생성' },
  'step.2': { en: 'Propose revisions with clear rationale when conditions change', zh: '情况变化时提出改版，并写清依据', fr: 'Proposer des révisions avec une justification claire lorsque les conditions changent', ja: '状況変化時に根拠を明記して改版を提案', ko: '상황 변화 시 명확한 근거와 함께 수정 제안' },
  'step.3': { en: 'One-click calendar import with automatic ticket-purchase alarms', zh: '一键导入日历，抢票闹钟自动就位', fr: 'Importation en un clic dans le calendrier avec alarmes automatiques d\'achat de billets', ja: 'ワンクリックでカレンダーにインポート、チケット購入アラーム自動設定', ko: '원클릭 캘린더 가져오기, 티켓 구매 알람 자동 설정' },
}

export function translate(key: string, lang: Lang): string {
  const entry = t[key]
  if (!entry) {
    console.warn(`[i18n] Missing key: ${key}`)
    return key
  }
  return entry[lang] ?? entry.en
}

// Helper with template params like {count}
export function translateWith(key: string, lang: Lang, params: Record<string, string | number>): string {
  let text = translate(key, lang)
  for (const [k, v] of Object.entries(params)) {
    text = text.replace(`{${k}}`, String(v))
  }
  return text
}
