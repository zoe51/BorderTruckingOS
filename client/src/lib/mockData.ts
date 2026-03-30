// ===== 司机信息 =====
export const driverInfo = {
  name: "王建国",
  avatar: "王",
  plate: "豫B·58723",
  route: "莫斯科线",
  status: "行驶中",
  totalTrips: 24,
  complianceRate: 98,
  totalKm: 32000,
  phone: "+86 138****5678",
  company: "河南跨欧物流",
};

// ===== 行程数据 =====
export const tripData = {
  speed: 74,
  destination: "莫斯科",
  destinationRu: "Москва",
  eta: "18:42",
  distance: 342,
  fuel: 67,
  speedLimit: 90,
  status: "normal" as const, // normal | warning | emergency
  statusText: "行驶正常",
  statusTextRu: "Всё в норме",
};

// ===== 加油推荐 =====
export const fuelRecommendation = {
  station: "Лукойл",
  distance: 12,
  pricePerLiter: 52.3,
  currency: "₽",
  savings: 47,
  savingsCurrency: "¥",
};

// ===== 证件管理 =====
export const documents = [
  { id: 1, name: "护照", nameRu: "Паспорт", expiry: "2027.06.12", status: "valid" as const, icon: "passport" },
  { id: 2, name: "国际驾照", nameRu: "Международные права", expiry: "2025.11.30", status: "expiring" as const, icon: "license" },
  { id: 3, name: "TIR 通行证", nameRu: "Карнет TIR", number: "TIR-2024-0832", status: "valid" as const, icon: "tir" },
  { id: 4, name: "保险单", nameRu: "Страховой полис", expiry: "2025.03.15", issuer: "PICC", status: "valid" as const, icon: "insurance" },
];

// ===== 车辆档案 =====
export const vehicleInfo = {
  plate: "豫B·58723",
  brand: "重汽 HOWO",
  axles: 6,
  weight: 49,
  lastMaintenance: "2024.09.10",
  mileage: "12万km",
};

// ===== 费用记录 =====
export const expenses = {
  currentTrip: {
    fuel: 2840,
    toll: 620,
    parking: 0,
    fine: 0,
    repair: 0,
    total: 3460,
  },
  pendingApproval: {
    type: "维修申请",
    amount: 680,
    status: "待审批",
  },
};

// ===== 事件列表 =====
export const events = [
  {
    id: 1,
    type: "inspection" as const,
    title: "路检通知",
    titleRu: "Проверка на дороге",
    description: "前方23km处有路检站，请准备好证件",
    time: "14:32",
    status: "pending" as const,
    priority: "medium" as const,
  },
  {
    id: 2,
    type: "emergency" as const,
    title: "轮胎气压异常",
    titleRu: "Давление в шинах",
    description: "右后轮气压偏低，建议尽快检查",
    time: "13:15",
    status: "processing" as const,
    priority: "high" as const,
  },
  {
    id: 3,
    type: "fine" as const,
    title: "超速罚款",
    titleRu: "Штраф за превышение",
    description: "M7公路超速罚款 ₽3,000，需在7日内缴纳",
    time: "昨天 09:40",
    status: "pending" as const,
    priority: "medium" as const,
  },
  {
    id: 4,
    type: "breakdown" as const,
    title: "刹车片更换",
    titleRu: "Замена тормозных колодок",
    description: "已在Казань维修站完成更换，费用¥680",
    time: "03-28 16:20",
    status: "completed" as const,
    priority: "low" as const,
  },
  {
    id: 5,
    type: "accident" as const,
    title: "轻微刮蹭事故",
    titleRu: "Мелкое ДТП",
    description: "停车场轻微刮蹭，已拍照取证并上报",
    time: "03-27 11:05",
    status: "completed" as const,
    priority: "low" as const,
  },
];

// ===== 沿途服务 =====
export const nearbyServices = [
  { id: 1, type: "gas" as const, name: "Лукойл АЗС", distance: 12, rating: 4.2, price: "52.3₽/L" },
  { id: 2, type: "rest" as const, name: "Дорожный сервис", distance: 8, rating: 3.8, facilities: "餐厅 停车场" },
  { id: 3, type: "repair" as const, name: "ТрансСервис", distance: 35, rating: 4.5, speciality: "中国卡车" },
  { id: 4, type: "gas" as const, name: "Газпромнефть", distance: 45, rating: 4.0, price: "54.1₽/L" },
  { id: 5, type: "rest" as const, name: "АЗС Лукойл", distance: 14, rating: 4.1, facilities: "加油 停车" },
];

// ===== 疲劳预警推荐休息点 =====
export const restStops = [
  { name: "Дорожный сервис", distance: 8, facilities: "餐厅 停车场", type: "rest" as const },
  { name: "АЗС Лукойл", distance: 14, facilities: "加油 停车", type: "gas" as const },
];

// ===== 翻译常用场景 =====
export const translationScenes = [
  { id: 1, name: "边检应答话术", nameRu: "Пограничный контроль" },
  { id: 2, name: "加油站沟通", nameRu: "На заправке" },
  { id: 3, name: "事故现场对话", nameRu: "На месте ДТП" },
  { id: 4, name: "维修站沟通", nameRu: "В автосервисе" },
  { id: 5, name: "问路常用语", nameRu: "Спросить дорогу" },
];

// ===== 维修记录 =====
export const maintenanceRecords = [
  { date: "2024.09.10", type: "常规保养", mileage: "12万km", cost: 1200, location: "郑州总部" },
  { date: "2024.07.22", type: "轮胎更换", mileage: "10.8万km", cost: 3600, location: "Казань" },
  { date: "2024.05.15", type: "刹车片更换", mileage: "9.5万km", cost: 680, location: "Москва" },
];

// ===== 行前检查项 =====
export const preCheckItems = {
  documents: [
    { name: "护照", status: "valid" as const },
    { name: "国际驾照", status: "expiring" as const },
    { name: "TIR通行证", status: "valid" as const },
    { name: "保险单", status: "valid" as const },
    { name: "运输许可证", status: "valid" as const },
  ],
  cargo: [
    { name: "货物申报单", status: "valid" as const },
    { name: "危化品检查", status: "not_applicable" as const },
    { name: "超重超限检查", status: "valid" as const },
  ],
  vehicle: [
    { name: "车辆年检", status: "valid" as const },
    { name: "轴重匹配", status: "valid" as const },
    { name: "制动系统", status: "valid" as const },
    { name: "灯光系统", status: "valid" as const },
  ],
};

// ===== 路线方案 =====
export const routeOptions = [
  { id: 1, name: "推荐路线", distance: 342, time: "4h 38min", toll: 620, fuel: 2840, risk: "low" as const },
  { id: 2, name: "最快路线", distance: 328, time: "4h 12min", toll: 890, fuel: 2960, risk: "medium" as const },
  { id: 3, name: "最省路线", distance: 378, time: "5h 15min", toll: 340, fuel: 2680, risk: "low" as const },
];
