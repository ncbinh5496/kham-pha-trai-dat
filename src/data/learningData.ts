// Static educational content and quiz question data for Geography learning modules

export interface DirectNeighborInfo {
  countryId: string;
  direction: string;
  borderLength: string;
  significance: string;
  badgeColor: string;
}

export interface NeighborQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DirectionQuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correct: string;
  explanation: string;
}

export interface HemispherePracticeItem {
  countryId: string;
  expected: 'north' | 'south' | 'both';
  reason: string;
}

// 3 Direct land neighbors of Vietnam
export const DIRECT_NEIGHBORS: DirectNeighborInfo[] = [
  {
    countryId: 'china',
    direction: 'Phía Bắc',
    borderLength: '1.449 km',
    significance: 'Biên giới phía Bắc tiếp giáp với 7 tỉnh của Việt Nam (Điện Biên, Lai Châu, Lào Cai, Hà Giang, Cao Bằng, Lạng Sơn, Quảng Ninh).',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  },
  {
    countryId: 'laos',
    direction: 'Phía Tây',
    borderLength: '2.169 km',
    significance: 'Đường biên giới đất liền dài nhất với nước ta, trải dài dọc dãy núi Trường Sơn hùng vĩ qua 10 tỉnh thành.',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  },
  {
    countryId: 'cambodia',
    direction: 'Phía Tây Nam',
    borderLength: '1.258 km',
    significance: 'Biên giới phía Tây Nam gắn liền với vùng đồng bằng sông Cửu Long màu mỡ và các tỉnh Nam Bộ, Tây Nguyên.',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40'
  }
];

// Elementary Geography Quiz Questions for Vietnam & Neighbors
export const NEIGHBOR_QUIZ_QUESTIONS: NeighborQuizQuestion[] = [
  {
    id: 'q1',
    question: 'Việt Nam có chung đường biên giới trên đất liền với những quốc gia nào?',
    options: [
      'Trung Quốc, Lào, Campuchia',
      'Thái Lan, Lào, Campuchia',
      'Trung Quốc, Myanmar, Lào',
      'Indonesia, Malaysia, Philippines'
    ],
    correctIndex: 0,
    explanation: 'Việt Nam có 3 nước láng giềng giáp đất liền: Trung Quốc (phía Bắc), Lào (phía Tây) và Campuchia (phía Tây Nam).'
  },
  {
    id: 'q2',
    question: 'Quốc gia nào có đường biên giới trên đất liền DÀI NHẤT với Việt Nam?',
    options: [
      'Trung Quốc (1.449 km)',
      'Lào (2.169 km)',
      'Campuchia (1.258 km)',
      'Thái Lan (0 km)'
    ],
    correctIndex: 1,
    explanation: 'Lào là nước có đường biên giới đất liền dài nhất với Việt Nam, dài khoảng 2.169 km dọc theo dải Trường Sơn.'
  },
  {
    id: 'q3',
    question: 'Ở phía Đông và phía Nam, phần đất liền Việt Nam tiếp giáp với vùng biển nào?',
    options: [
      'Biển Đông',
      'Biển Nhật Bản',
      'Biển Đỏ',
      'Ấn Độ Dương'
    ],
    correctIndex: 0,
    explanation: 'Toàn bộ phía Đông, Nam và Tây Nam nước ta giáp với vùng Biển Đông giàu đẹp với bờ biển dài 3.260 km.'
  },
  {
    id: 'q4',
    question: 'Khu vực Đông Nam Á hiện nay bao gồm bao nhiêu quốc gia?',
    options: [
      '9 quốc gia',
      '10 quốc gia',
      '11 quốc gia',
      '12 quốc gia'
    ],
    correctIndex: 2,
    explanation: 'Đông Nam Á gồm 11 quốc gia: Việt Nam, Lào, Campuchia, Thái Lan, Myanmar, Malaysia, Singapore, Indonesia, Philippines, Brunei và Timor-Leste.'
  }
];

// Direction Questions for Elementary Students
export const DIRECTION_QUESTIONS: DirectionQuizQuestion[] = [
  {
    id: 'd1',
    prompt: 'Quy ước phương hướng trên bản đồ: Phía TRÊN của bản đồ là hướng nào?',
    options: ['Hướng Bắc', 'Hướng Nam', 'Hướng Đông', 'Hướng Tây'],
    correct: 'Hướng Bắc',
    explanation: 'Theo quy ước chuẩn của bản đồ địa lí: Phía trên là hướng Bắc, phía dưới là hướng Nam.'
  },
  {
    id: 'd2',
    prompt: 'Phía BÊN PHẢI của bản đồ chỉ hướng nào?',
    options: ['Hướng Tây', 'Hướng Đông', 'Hướng Bắc', 'Hướng Nam'],
    correct: 'Hướng Đông',
    explanation: 'Bên phải của bản đồ là hướng Đông (nơi Mặt Trời mọc), bên trái là hướng Tây.'
  },
  {
    id: 'd3',
    prompt: 'Trung Quốc nằm ở hướng nào so với Việt Nam?',
    options: ['Phía Bắc', 'Phía Nam', 'Phía Đông', 'Phía Tây'],
    correct: 'Phía Bắc',
    explanation: 'Trung Quốc nằm ở phía trên (phía Bắc) của dải đất hình chữ S Việt Nam.'
  },
  {
    id: 'd4',
    prompt: 'Nước Lào nằm ở hướng nào so với Việt Nam?',
    options: ['Phía Đông', 'Phía Tây', 'Phía Nam', 'Phía Bắc'],
    correct: 'Phía Tây',
    explanation: 'Nước Lào nằm dọc theo sườn Tây dãy Trường Sơn, tức là ở phía Tây của Việt Nam.'
  },
  {
    id: 'd5',
    prompt: 'Quần đảo Hoàng Sa và Trường Sa nằm ở hướng nào so với đất liền Việt Nam?',
    options: ['Phía Tây', 'Phía Bắc', 'Phía Đông', 'Phía Nam'],
    correct: 'Phía Đông',
    explanation: 'Hai quần đảo Hoàng Sa và Trường Sa nằm giữa vùng Biển Đông ở phía Đông của nước ta.'
  },
  {
    id: 'd6',
    prompt: 'Nhật Bản nằm ở hướng nào so với Việt Nam?',
    options: ['Phía Tây Nam', 'Phía Đông Bắc', 'Phía Tây Bắc', 'Phía Nam'],
    correct: 'Phía Đông Bắc',
    explanation: 'Nhật Bản nằm ở phía Đông Bắc của Việt Nam trên bản đồ châu Á.'
  },
  {
    id: 'd7',
    prompt: 'Nước Campuchia nằm ở hướng nào so với Việt Nam?',
    options: ['Phía Bắc', 'Phía Tây Nam', 'Phía Đông', 'Phía Đông Nam'],
    correct: 'Phía Tây Nam',
    explanation: 'Campuchia tiếp giáp với các tỉnh miền Nam và Tây Nguyên, nằm ở phía Tây Nam của Việt Nam.'
  }
];

// Verified geographical hemisphere data
export const HEMISPHERE_PRACTICE_COUNTRIES: HemispherePracticeItem[] = [
  { 
    countryId: 'vietnam', 
    expected: 'north', 
    reason: 'Việt Nam nằm hoàn toàn ở Bắc bán cầu (từ khoảng 8°30\'B đến 23°23\'B), phía trên đường Xích đạo.' 
  },
  { 
    countryId: 'indonesia', 
    expected: 'both', 
    reason: 'Indonesia nằm vắt ngang đường Xích đạo (0°), có các đảo nằm ở cả Bắc bán cầu (Bắc Sumatra, Bắc Borneo, Bắc Sulawesi...) và Nam bán cầu (Java, Bali, Nam Sumatra...).' 
  },
  { 
    countryId: 'brazil', 
    expected: 'both', 
    reason: 'Phần lớn lãnh thổ Brazil nằm ở Nam bán cầu, nhưng đường Xích đạo đi qua phía Bắc đất nước (gần thành phố Macapá và cửa sông Amazon), nên thuộc cả 2 bán cầu.' 
  },
  { 
    countryId: 'australia', 
    expected: 'south', 
    reason: 'Australia nằm hoàn toàn ở Nam bán cầu, vì thế mùa hè ở đây (tháng 12 - tháng 2) ngược lại với mùa đông ở Việt Nam.' 
  },
  { 
    countryId: 'russia', 
    expected: 'north', 
    reason: 'Nga là quốc gia rộng lớn nhất thế giới, nằm hoàn toàn ở Bắc bán cầu trải dài đến tận Bắc Cực.' 
  },
  { 
    countryId: 'south_africa', 
    expected: 'south', 
    reason: 'Nam Phi nằm ở cực nam của châu lục châu Phi, thuộc hoàn toàn Nam bán cầu.' 
  },
  { 
    countryId: 'japan', 
    expected: 'north', 
    reason: 'Nhật Bản là quốc đảo nằm ở vùng ôn đới Bắc bán cầu thuộc khu vực Đông Á.' 
  }
];
