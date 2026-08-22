import { QuizQuestion } from '../types';

export const FIND_COUNTRY_QUESTIONS: QuizQuestion[] = [
  // EASY LEVEL (Có tên châu lục, quốc kỳ, gợi ý vị trí)
  {
    id: 'find_vn',
    targetCountryId: 'vietnam',
    level: 'easy',
    questionText: 'Hãy tìm đất nước Việt Nam thân yêu của chúng ta trên quả địa cầu!',
    clues: [
      'Nằm ở khu vực Đông Nam Á (Châu Á).',
      'Đất nước có dải đất hình chữ S uốn lượn bên bờ Biển Đông.',
      'Quốc kỳ: Lá cờ đỏ sao vàng năm cánh 🇻🇳'
    ],
    correctFeedback: '🎉 Hoan hô em! Chính xác, đây là Việt Nam hình chữ S thân yêu của chúng ta!',
    hint: 'Gợi ý: Em hãy xoay địa cầu về phía châu Á, gần biển Đông nhé.'
  },
  {
    id: 'find_jp',
    targetCountryId: 'japan',
    level: 'easy',
    questionText: 'Hãy tìm đất nước Nhật Bản (Đất nước Mặt Trời mọc)!',
    clues: [
      'Nằm ở Đông Á, là một quốc đảo hình cánh cung giữa Thái Bình Dương.',
      'Nổi tiếng với ngọn núi Phú Sĩ quanh năm tuyết phủ và hoa anh đào.',
      'Quốc kỳ: Nền trắng với vòng tròn đỏ ở giữa 🇯🇵'
    ],
    correctFeedback: '🎉 Tuyệt vời! Em đã tìm đúng nước Nhật Bản xinh đẹp rồi đấy!',
    hint: 'Gợi ý: Nhật Bản nằm ở phía đông bắc của châu Á, ngoài khơi Thái Bình Dương.'
  },
  {
    id: 'find_eg',
    targetCountryId: 'egypt',
    level: 'easy',
    questionText: 'Hãy tìm đất nước Ai Cập với các Kim tự tháp kỳ vĩ!',
    clues: [
      'Nằm ở phía Đông Bắc của Châu Phi.',
      'Có dòng sông Nile dài nhất thế giới và sa mạc Sahara cát vàng.',
      'Quốc kỳ: 3 sọc đỏ - trắng - đen với biểu tượng chim ưng vàng 🇪🇬'
    ],
    correctFeedback: '🎉 Xuất sắc! Em đã đến với vùng đất Kim tự tháp Ai Cập cổ đại!',
    hint: 'Gợi ý: Xoay sang châu Phi, nhìn lên góc trên bên phải (Đông Bắc) giáp biển Địa Trung Hải.'
  },
  {
    id: 'find_br',
    targetCountryId: 'brazil',
    level: 'easy',
    questionText: 'Hãy tìm đất nước Brazil - quê hương của rừng già Amazon!',
    clues: [
      'Quốc gia lớn nhất ở Nam Mỹ.',
      'Nổi tiếng với vũ điệu Samba tưng bừng và bóng đá sôi động.',
      'Quốc kỳ: Nền xanh lá cây với hình thoi vàng và quả cầu xanh 🇧🇷'
    ],
    correctFeedback: '🎉 Chính xác! Đây là Brazil - đất nước nhiệt đới lớn nhất Nam Mỹ!',
    hint: 'Gợi ý: Xoay địa cầu sang châu Nam Mỹ, Brazil chiếm phần lớn diện tích màu xanh lá.'
  },
  {
    id: 'find_au',
    targetCountryId: 'australia',
    level: 'easy',
    questionText: 'Hãy tìm nước Australia (Úc) - xứ sở của chuột túi Kangaroo!',
    clues: [
      'Một lục địa độc lập nằm ở Châu Đại Dương ở Nam Bán Cầu.',
      'Có nhà hát Con Sò Sydney bên bờ vịnh biển tuyệt đẹp.',
      'Quốc kỳ: Nền xanh dương có cờ Vương quốc Anh nhỏ và chòm sao Nam Thập Tự 🇦🇺'
    ],
    correctFeedback: '🎉 Chuẩn luôn! Em đã tìm thấy hòn đảo lục địa Australia khổng lồ!',
    hint: 'Gợi ý: Nhìn xuống phía nam châu Á, ở giữa đại dương mênh mông.'
  },

  // MEDIUM LEVEL (Có quốc kỳ, có 1-2 đặc điểm)
  {
    id: 'find_fr',
    targetCountryId: 'france',
    level: 'medium',
    questionText: 'Hãy tìm nước Pháp - kinh đô ánh sáng và quê hương Tháp Eiffel!',
    clues: [
      'Nằm ở Tây Âu, giáp với Đại Tây Dương và Địa Trung Hải.',
      'Có đỉnh núi Mont Blanc tuyết phủ thuộc dãy Alps.',
      'Quốc kỳ: 3 sọc dọc Xanh lam - Trắng - Đỏ 🇫🇷'
    ],
    correctFeedback: '🎉 Rất giỏi! Đây là nước Pháp hoa lệ với tháp Eiffel sừng sững!',
    hint: 'Gợi ý: Ở phía Tây châu Âu, nằm đối diện với nước Anh qua eo biển Manche.'
  },
  {
    id: 'find_us',
    targetCountryId: 'united_states',
    level: 'medium',
    questionText: 'Hãy tìm Hợp chúng quốc Hoa Kỳ (Nước Mỹ)!',
    clues: [
      'Nằm ở Bắc Mỹ, trải dài từ Đại Tây Dương sang Thái Bình Dương.',
      'Có Tượng Nữ thần Tự do và hẻm núi Grand Canyon kỳ vĩ.',
      'Quốc kỳ: Cờ hoa gồm 50 ngôi sao và 13 sọc đỏ trắng 🇺🇸'
    ],
    correctFeedback: '🎉 Hoan hô! Em đã tìm đúng nước Mỹ rộng lớn rồi!',
    hint: 'Gợi ý: Nằm ở trung tâm lục địa Bắc Mỹ, kẹp giữa Canada và Mexico.'
  },
  {
    id: 'find_in',
    targetCountryId: 'india',
    level: 'medium',
    questionText: 'Hãy tìm đất nước Ấn Độ bên dòng sông Hằng linh thiêng!',
    clues: [
      'Bán đảo hình tam giác lớn nhô ra Ấn Độ Dương ở Nam Á.',
      'Phía bắc có dãy núi Himalaya cao nhất thế giới che chắn.',
      'Quốc kỳ: 3 dải màu Cam - Trắng - Xanh lá với bánh xe xanh ở giữa 🇮🇳'
    ],
    correctFeedback: '🎉 Tuyệt vời! Em đã xác định đúng đất nước Ấn Độ ngàn năm văn hiến!',
    hint: 'Gợi ý: Nằm ở phía nam châu Á, hình tam giác lớn chĩa xuống Ấn Độ Dương.'
  },
  {
    id: 'find_kr',
    targetCountryId: 'south_korea',
    level: 'medium',
    questionText: 'Hãy tìm đất nước Hàn Quốc (Xứ sở Kim Chi)!',
    clues: [
      'Nằm trên bán đảo Triều Tiên ở Đông Á.',
      'Có thủ đô Seoul hiện đại và đảo ngọc núi lửa Jeju thanh bình.',
      'Quốc kỳ: Nền trắng với biểu tượng Thái Cực tròn đỏ - xanh ở giữa 🇰🇷'
    ],
    correctFeedback: '🎉 Chính xác! Đây là Hàn Quốc - cái nôi của làn sóng âm nhạc K-Pop!',
    hint: 'Gợi ý: Nằm ngay cạnh Trung Quốc và đối diện với Nhật Bản ở Đông Á.'
  },

  // HARD LEVEL (Không có cờ, chỉ có dữ kiện tự nhiên & lịch sử địa lí)
  {
    id: 'find_ru',
    targetCountryId: 'russia',
    level: 'hard',
    questionText: 'Hãy tìm quốc gia có diện tích lớn nhất hành tinh, trải dài qua 11 múi giờ!',
    clues: [
      'Lãnh thổ rộng hơn 17 triệu km² trải dài từ Đông Âu qua toàn bộ Bắc Á.',
      'Có hồ Baikal sâu nhất thế giới và rừng Taiga bạt ngàn tuyết trắng.',
      'Thủ đô là Moskva với Quảng trường Đỏ và Điện Kremlin uy nghiêm.'
    ],
    correctFeedback: '🎉 Thật phi thường! Em đã tìm ra nước Nga - quốc gia rộng lớn nhất thế giới!',
    hint: 'Gợi ý: Nhìn lên nửa phía bắc của cả châu Âu và châu Á, đó là mảng đất màu tím khổng lồ.'
  },
  {
    id: 'find_ca',
    targetCountryId: 'canada',
    level: 'hard',
    questionText: 'Hãy tìm quốc gia có nhiều hồ nước ngọt nhất thế giới và đường bờ biển dài nhất!',
    clues: [
      'Chiếm toàn bộ nửa phía bắc của lục địa Bắc Mỹ.',
      'Biểu tượng quốc gia là chiếc lá phong đỏ và siro ngọt ngào.',
      'Thủ đô là Ottawa, có thác nước Niagara hùng vĩ.'
    ],
    correctFeedback: '🎉 Quá xuất sắc! Em đã tìm đúng đất nước lá phong đỏ Canada!',
    hint: 'Gợi ý: Lục địa Bắc Mỹ, nằm ngay phía trên nước Mỹ và sát vùng Bắc Cực.'
  },
  {
    id: 'find_za',
    targetCountryId: 'south_africa',
    level: 'hard',
    questionText: 'Hãy tìm đất nước nằm ở cực Nam của lục địa Châu Phi, nơi có Mũi Hảo Vọng!',
    clues: [
      'Được mệnh danh là "Quốc gia Cầu Vồng" với 3 thành phố thủ đô.',
      'Nơi giao thoa giữa 2 đại dương lớn: Đại Tây Dương và Ấn Độ Dương.',
      'Nổi tiếng với Núi Bàn (Table Mountain) có đỉnh phẳng như mặt bàn.'
    ],
    correctFeedback: '🎉 Tuyệt đỉnh thám hiểm! Em đã chỉ đúng đất nước Nam Phi xinh đẹp!',
    hint: 'Gợi ý: Xoay địa cầu xuống điểm thấp nhất ở đáy của châu Phi.'
  }
];

export const GUESS_COUNTRY_QUESTIONS: QuizQuestion[] = [
  {
    id: 'guess_1',
    targetCountryId: 'japan',
    level: 'easy',
    questionText: 'Tôi là quốc gia nào?',
    clues: [
      'Tôi nằm ở châu Á, là một quốc đảo giữa Thái Bình Dương.',
      'Tôi có ngọn núi Phú Sĩ quanh năm phủ tuyết trắng.',
      'Thủ đô của tôi là Tokyo nhộn nhịp.',
      'Mọi người rất thích hoa anh đào và món Sushi của tôi.'
    ],
    options: ['japan', 'vietnam', 'south_korea', 'china'],
    correctFeedback: '🎉 Chính xác! Đó chính là Nhật Bản - xứ sở hoa anh đào!',
    hint: 'Đất nước này có tàu cao tốc Shinkansen chạy rất nhanh.'
  },
  {
    id: 'guess_2',
    targetCountryId: 'vietnam',
    level: 'easy',
    questionText: 'Tôi là quốc gia nào?',
    clues: [
      'Lãnh thổ của tôi có hình chữ S uốn lượn bên bờ Biển Đông.',
      'Tôi có Vịnh Hạ Long - kỳ quan thiên nhiên thế giới.',
      'Thủ đô của tôi là Hà Nội ngàn năm văn hiến.',
      'Trang phục truyền thống của tôi là Áo dài thướt tha.'
    ],
    options: ['thailand', 'vietnam', 'laos', 'cambodia'],
    correctFeedback: '🎉 Hoan hô! Đó chính là Việt Nam yêu dấu của chúng ta!',
    hint: 'Món ăn nổi tiếng thế giới của đất nước này là Phở và Bánh mì.'
  },
  {
    id: 'guess_3',
    targetCountryId: 'egypt',
    level: 'easy',
    questionText: 'Tôi là quốc gia nào?',
    clues: [
      'Tôi nằm ở góc Đông Bắc của Châu Phi.',
      'Tôi có dòng sông Nile dài nhất thế giới chảy qua.',
      'Tôi có các Kim tự tháp khổng lồ và Tượng Nhân sư bí ẩn.',
      'Thủ đô của tôi là Cairo.'
    ],
    options: ['south_africa', 'france', 'egypt', 'brazil'],
    correctFeedback: '🎉 Đúng rồi! Đó là đất nước Ai Cập cổ đại huyền bí!',
    hint: 'Nơi có các vị vua Pharaoh và chữ tượng hình trên giấy cói.'
  },
  {
    id: 'guess_4',
    targetCountryId: 'france',
    level: 'medium',
    questionText: 'Tôi là quốc gia nào?',
    clues: [
      'Tôi nằm ở Tây Âu, được mệnh danh là Kinh đô Ánh sáng.',
      'Thủ đô Paris của tôi có ngọn tháp Eiffel bằng sắt nổi tiếng thế giới.',
      'Bảo tàng Louvre của tôi lưu giữ bức tranh nàng Mona Lisa.',
      'Bánh sừng bò (Croissant) của tôi rất thơm bơ.'
    ],
    options: ['germany', 'italy', 'united_kingdom', 'france'],
    correctFeedback: '🎉 Rất chuẩn! Đó là nước Pháp hoa lệ và lãng mạn!',
    hint: 'Quốc kỳ của nước này gồm 3 sọc dọc: Xanh - Trắng - Đỏ.'
  },
  {
    id: 'guess_5',
    targetCountryId: 'brazil',
    level: 'medium',
    questionText: 'Tôi là quốc gia nào?',
    clues: [
      'Tôi là quốc gia lớn nhất ở Nam Mỹ.',
      'Tôi có khu rừng mưa nhiệt đới Amazon - "Lá phổi xanh của Trái Đất".',
      'Đội tuyển bóng đá của tôi từng 5 lần vô địch World Cup.',
      'Tôi có tượng Chúa Cứu Thế dang tay trên đỉnh núi tại Rio de Janeiro.'
    ],
    options: ['argentina', 'brazil', 'canada', 'australia'],
    correctFeedback: '🎉 Tuyệt vời! Đó chính là Brazil - xứ sở vũ điệu Samba!',
    hint: 'Ngôn ngữ chính thức của đất nước này là tiếng Bồ Đào Nha.'
  },
  {
    id: 'guess_6',
    targetCountryId: 'australia',
    level: 'medium',
    questionText: 'Tôi là quốc gia nào?',
    clues: [
      'Tôi vừa là một quốc gia, vừa là một lục địa độc lập ở Nam Bán Cầu.',
      'Tôi là ngôi nhà tự nhiên duy nhất của chuột túi Kangaroo và gấu Koala.',
      'Tôi có Nhà hát Con Sò Opera Sydney hình cánh buồm trắng.',
      'Thủ đô của tôi là Canberra.'
    ],
    options: ['united_states', 'australia', 'united_kingdom', 'singapore'],
    correctFeedback: '🎉 Quá chuẩn! Đó là nước Australia (Úc) xinh đẹp!',
    hint: 'Nơi có rạn san hô Great Barrier Reef lớn nhất thế giới.'
  },
  {
    id: 'guess_7',
    targetCountryId: 'indonesia',
    level: 'easy',
    questionText: 'Tôi là quốc gia nào?',
    clues: [
      'Tôi là quốc gia vạn đảo lớn nhất thế giới ở Đông Nam Á.',
      'Tôi có đảo ngọc Bali thiên đường nghỉ dưỡng và đền cổ Borobudur.',
      'Tôi là quê hương của loài rồng Komodo khổng lồ.',
      'Quốc kỳ: 2 sọc ngang Đỏ và Trắng 🇮🇩'
    ],
    options: ['philippines', 'malaysia', 'indonesia', 'thailand'],
    correctFeedback: '🎉 Chính xác! Đó là đất nước vạn đảo Indonesia!',
    hint: 'Quốc gia láng giềng Đông Nam Á gồm hơn 17.000 hòn đảo.'
  },
  {
    id: 'guess_8',
    targetCountryId: 'mexico',
    level: 'medium',
    questionText: 'Tôi là quốc gia nào?',
    clues: [
      'Tôi nằm ở phía nam lục địa Bắc Mỹ.',
      'Tôi là cái nôi của nền văn minh Maya và Aztec rực rỡ với Kim tự tháp Chichen Itza.',
      'Món bánh kẹp Taco và sốt quả bơ Guacamole của tôi nổi tiếng thế giới.',
      'Quốc kỳ: 3 sọc Xanh lá - Trắng - Đỏ với hình đại bàng quắp rắn 🇲🇽'
    ],
    options: ['brazil', 'mexico', 'spain', 'argentina'],
    correctFeedback: '🎉 Tuyệt vời! Đó chính là đất nước Mexico sôi động!',
    hint: 'Nằm ngay phía nam của Hợp chúng quốc Hoa Kỳ.'
  },
  {
    id: 'guess_9',
    targetCountryId: 'switzerland',
    level: 'hard',
    questionText: 'Tôi là quốc gia nào?',
    clues: [
      'Tôi là quốc gia nằm giữa dãy núi Alps hùng vĩ ở Châu Âu.',
      'Tôi nổi tiếng với đồng hồ cơ chính xác, phô mai Fondue và sô-cô-la hảo hạng.',
      'Tôi có ngọn núi chóp nhọn Matterhorn phủ tuyết trắng xóa.',
      'Quốc kỳ: Hình vuông màu đỏ với dấu chữ thập màu trắng 🇨🇭'
    ],
    options: ['germany', 'switzerland', 'sweden', 'norway'],
    correctFeedback: '🎉 Rất xuất sắc! Đó là đất nước Thụy Sĩ thanh bình!',
    hint: 'Đất nước nổi tiếng trung lập và có dãy núi Alps đẹp như tranh vẽ.'
  }
];

export interface TeacherQuickQuestion {
  category: string;
  question: string;
  answer: string;
}

export const TEACHER_QUICK_QUESTIONS: TeacherQuickQuestion[] = [
  {
    category: 'Châu lục & Dân số',
    question: 'Châu lục nào có diện tích và dân số lớn nhất Trái Đất?',
    answer: 'Châu Á (diện tích hơn 44 triệu km², chiếm hơn 60% dân số thế giới).'
  },
  {
    category: 'Địa hình & Núi non',
    question: 'Đỉnh núi cao nhất thế giới tên là gì và nằm ở dãy núi nào?',
    answer: 'Đỉnh Everest (cao 8.848,86 m) thuộc dãy núi Himalaya ở Châu Á.'
  },
  {
    category: 'Việt Nam & Láng giềng',
    question: 'Việt Nam trên đất liền tiếp giáp với 3 quốc gia nào?',
    answer: 'Trung Quốc (phía Bắc), Lào (phía Tây), Campuchia (phía Tây Nam).'
  },
  {
    category: 'Đường địa lí đặc biệt',
    question: 'Đường Xích đạo (0°) chia Trái Đất thành hai bán cầu nào?',
    answer: 'Bán cầu Bắc và Bán cầu Nam. Khí hậu quanh Xích đạo thường nóng ẩm.'
  },
  {
    category: 'Đại dương thế giới',
    question: 'Đại dương nào có diện tích lớn nhất và sâu nhất hành tinh?',
    answer: 'Thái Bình Dương (chiếm 1/3 diện tích bề mặt Trái Đất).'
  },
  {
    category: 'Hệ sinh thái',
    question: 'Vì sao rừng nhiệt đới Amazon lại được mệnh danh là "Lá phổi xanh của Trái Đất"?',
    answer: 'Vì rừng Amazon sản sinh ra lượng oxy dồi dào và lưu trữ lượng carbon khổng lồ.'
  },
  {
    category: 'Kinh tuyến gốc',
    question: 'Kinh tuyến gốc 0° đi qua đài thiên văn Greenwich thuộc quốc gia nào?',
    answer: 'Vương quốc Anh (Châu Âu).'
  }
];
