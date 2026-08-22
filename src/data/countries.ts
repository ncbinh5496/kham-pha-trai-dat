import { CountryData } from '../types';
import { EXTENDED_COUNTRIES_DATA } from './countriesDataExtended';
import { EXTENDED_COUNTRIES_DATA_2 } from './countriesDataExtended2';

export const BASE_COUNTRIES_DATA: Record<string, CountryData> = {
  vietnam: {
    id: 'vietnam',
    code: 'VN',
    nameVi: 'Việt Nam',
    nameEn: 'Vietnam',
    flag: '🇻🇳',
    capital: 'Hà Nội',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 100 triệu người',
    populationNum: 100,
    area: '331.212 km²',
    areaNum: 331,
    language: 'Tiếng Việt',
    climate: 'Nhiệt đới gió mùa, bốn mùa ở miền Bắc và hai mùa mưa - nắng ở miền Nam',
    currency: 'Việt Nam Đồng (VND)',
    shortDescription: 'Đất nước hình chữ S thân thương bên bờ Biển Đông, với hàng ngàn năm lịch sử, rừng vàng biển bạc và con người mến khách.',
    lat: 14.0583,
    lng: 108.2772,
    altitude: 1.8,
    color: '#ef4444',
    isSoutheastAsia: true,
    natureHighlights: [
      'Vịnh Hạ Long - kỳ quan thiên nhiên thế giới với hàng ngàn đảo đá vôi.',
      'Đỉnh Fansipan (3.143m) - được mệnh danh là Nóc nhà Đông Dương.',
      'Động Sơn Đoòng - hang động tự nhiên lớn nhất thế giới ở Quảng Bình.',
      'Đồng bằng sông Cửu Long - vựa lúa trù phú bạt ngàn.'
    ],
    cultureHighlights: [
      'Trang phục truyền thống Áo dài thướt tha, nón lá che nghiêng.',
      'Tết Nguyên Đán rực rỡ với bánh chưng, hoa đào và hoa mai.',
      'Nghệ thuật múa rối nước độc đáo trên mặt nước làng quê.'
    ],
    foodHighlights: [
      'Phở truyền thống với nước dùng thơm lừng thảo mộc.',
      'Bánh mì Việt Nam giòn rụm nổi tiếng khắp năm châu.',
      'Gỏi cuốn tôm thịt thanh mát chấm tương đậm đà.'
    ],
    funFacts: [
      'Bờ biển Việt Nam dài hơn 3.260 km hình chữ S uốn lượn.',
      'Việt Nam là một trong những nước xuất khẩu gạo và cà phê hàng đầu thế giới.',
      'Hang Sơn Đoòng lớn đến mức có thể chứa được một tòa nhà chọc trời 40 tầng!'
    ],
    landmarks: [
      { name: 'Vịnh Hạ Long', description: 'Kỳ quan thiên nhiên thế giới với hàng nghìn đảo ngọc' },
      { name: 'Hoàng thành Thăng Long', description: 'Di sản lịch sử ngàn năm văn hiến tại Thủ đô Hà Nội' },
      { name: 'Cố đô Huế & Phố cổ Hội An', description: 'Những nét đẹp văn hóa di sản miền Trung' }
    ]
  },
  japan: {
    id: 'japan',
    code: 'JP',
    nameVi: 'Nhật Bản',
    nameEn: 'Japan',
    flag: '🇯🇵',
    capital: 'Tokyo',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 125 triệu người',
    populationNum: 125,
    area: '377.975 km²',
    areaNum: 378,
    language: 'Tiếng Nhật',
    climate: 'Ôn đới, 4 mùa rõ rệt, mùa đông có tuyết rơi trắng xóa',
    currency: 'Yên Nhật (JPY)',
    shortDescription: 'Đất nước Mặt Trời mọc nổi tiếng với núi Phú Sĩ hùng vĩ, hoa anh đào rực rỡ và những công nghệ robot hiện đại hàng đầu.',
    lat: 36.2048,
    lng: 138.2529,
    altitude: 1.8,
    color: '#f43f5e',
    relativeDirectionFromVietnam: 'Phía Đông Bắc',
    natureHighlights: [
      'Núi Phú Sĩ (3.776m) - ngọn núi lửa thiêng quanh năm phủ tuyết trắng.',
      'Mùa hoa anh đào (Sakura) nở rộ biến khắp nẻo đường thành sắc hồng.',
      'Hàng ngàn suối nước nóng Onsen tự nhiên giữa thiên nhiên.'
    ],
    cultureHighlights: [
      'Trang phục truyền thống Kimono tuyệt đẹp trong các dịp lễ hội.',
      'Tinh thần võ sĩ đạo Samurai và nghệ thuật xếp giấy Origami.',
      'Phim hoạt hình Anime và truyện tranh Manga được yêu thích toàn cầu.'
    ],
    foodHighlights: [
      'Sushi và Sashimi tươi ngon từ cá biển sạch.',
      'Mì Ramen nước dùng đậm đà nấu công phu.',
      'Bánh gạo Mochi dẻo thơm nhiều vị ngọt ngào.'
    ],
    funFacts: [
      'Tàu cao tốc Shinkansen có thể chạy tới 320 km/h và cực kỳ đúng giờ.',
      'Nhật Bản gồm hơn 6.800 hòn đảo lớn nhỏ hợp thành.',
      'Có những hòn đảo ở Nhật mèo sống đông hơn cả người!'
    ],
    landmarks: [
      { name: 'Núi Phú Sĩ', description: 'Biểu tượng thiên nhiên thiêng liêng của xứ sở Phù Tang' },
      { name: 'Tháp Tokyo', description: 'Tháp truyền hình cao chọc trời rực sáng về đêm' },
      { name: 'Cố đô Kyoto', description: 'Nơi lưu giữ hàng trăm ngôi đền chùa cổ kính' }
    ]
  },
  china: {
    id: 'china',
    code: 'CN',
    nameVi: 'Trung Quốc',
    nameEn: 'China',
    flag: '🇨🇳',
    capital: 'Bắc Kinh (Beijing)',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 1,4 tỷ người',
    populationNum: 1400,
    area: '9.596.960 km²',
    areaNum: 9597,
    language: 'Tiếng Trung (Quan thoại)',
    climate: 'Đa dạng từ ôn đới phía bắc đến cận nhiệt đới phía nam, có sa mạc khô hạn và cao nguyên lạnh giá',
    currency: 'Nhân dân tệ (CNY)',
    shortDescription: 'Quốc gia rộng lớn với nền văn minh ngàn năm, Vạn Lý Trường Thành uốn lượn và loài gấu trúc khổng lồ đáng yêu.',
    lat: 35.8617,
    lng: 104.1954,
    altitude: 2.2,
    color: '#eab308',
    isVietnamNeighbor: true,
    neighborBorderDetail: 'Có chung đường biên giới đất liền dài khoảng 1.449 km ở phía Bắc với Việt Nam.',
    relativeDirectionFromVietnam: 'Phía Bắc',
    natureHighlights: [
      'Sông Dương Tử (Trường Giang) - con sông dài nhất châu Á (6.300 km).',
      'Dãy núi Hoàng Sơn huyền ảo bồng bềnh trong biển mây.',
      'Rừng tre Tứ Xuyên - ngôi nhà xanh mát của loài gấu trúc.'
    ],
    cultureHighlights: [
      'Vạn Lý Trường Thành dài hàng ngàn km xây dựng qua nhiều triều đại.',
      'Nghệ thuật thư pháp, trà đạo và kinh kịch truyền thống.',
      'Lễ hội Tết Trung thu và Tết Nguyên Đán rực rỡ đèn lồng đỏ.'
    ],
    foodHighlights: [
      'Vịt quay Bắc Kinh da giòn óng ả.',
      'Há cảo, sủi cảo Dimsum thơm lừng khay tre.',
      'Mì kéo Lan Châu sợi dẻo dai làm tại chỗ.'
    ],
    funFacts: [
      'Gấu trúc khổng lồ chỉ sống tự nhiên ở các vùng rừng tre Trung Quốc.',
      'Trung Quốc là cái nôi phát minh ra giấy, la bàn, thuốc súng và nghề in.',
      'Vạn Lý Trường Thành dài hơn 21.000 km nếu tính toàn bộ các nhánh tường thành!'
    ],
    landmarks: [
      { name: 'Vạn Lý Trường Thành', description: 'Công trình kiến trúc vĩ đại uốn lượn qua các dãy núi' },
      { name: 'Tử Cấm Thành', description: 'Cung điện hoàng gia lộng lẫy thời Minh - Thanh' },
      { name: 'Đội quân Đất Nung Tây An', description: 'Hàng ngàn bức tượng binh lính cổ xưa dưới lòng đất' }
    ]
  },
  south_korea: {
    id: 'south_korea',
    code: 'KR',
    nameVi: 'Hàn Quốc',
    nameEn: 'South Korea',
    flag: '🇰🇷',
    capital: 'Seoul',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 51 triệu người',
    populationNum: 51,
    area: '100.210 km²',
    areaNum: 100,
    language: 'Tiếng Hàn',
    climate: 'Ôn đới 4 mùa rõ rệt, mùa thu lá vàng lá đỏ tuyệt đẹp',
    currency: 'Won Hàn Quốc (KRW)',
    shortDescription: 'Xứ sở Kim Chi năng động, cái nôi của làn sóng âm nhạc K-Pop, các bộ phim truyền hình nổi tiếng và trang phục Hanbok duyên dáng.',
    lat: 35.9078,
    lng: 127.7669,
    altitude: 1.8,
    color: '#06b6d4',
    natureHighlights: [
      'Đảo Jeju xinh đẹp với núi lửa Hallasan và bãi biển đá đen kỳ thú.',
      'Vườn quốc gia Seoraksan rực rỡ sắc phong đỏ mùa thu.',
      'Vịnh Suncheonman trù phú với thảm lau sậy bạt ngàn.'
    ],
    cultureHighlights: [
      'Trang phục truyền thống Hanbok nhiều màu sắc trang nhã.',
      'Làn sóng văn hóa Hallyu với âm nhạc K-Pop và vũ đạo sôi động.',
      'Chữ viết Hangeul khoa học do vua Sejong sáng tạo.'
    ],
    foodHighlights: [
      'Kim chi cay giòn lên men tốt cho sức khỏe.',
      'Cơm trộn Bibimbap đầy ắp rau củ và trứng.',
      'Thịt nướng Bulgogi và bánh gạo cay Tteokbokki hấp dẫn.'
    ],
    funFacts: [
      'Hàn Quốc là một trong những quốc gia có tốc độ Internet nhanh nhất thế giới.',
      'Người Hàn Quốc có văn hóa chào hỏi gập người rất kính trọng lễ phép.',
      'Hòn đảo ngọc Jeju từng được bình chọn là 1 trong 7 kỳ quan thiên nhiên mới của thế giới.'
    ],
    landmarks: [
      { name: 'Cung điện Gyeongbokgung', description: 'Hoàng cung cổ kính tráng lệ giữa lòng Seoul' },
      { name: 'Tháp N Seoul', description: 'Đài quan sát ngắm toàn cảnh thủ đô và cây cầu khóa tình yêu' },
      { name: 'Đảo Jeju', description: 'Hòn đảo núi lửa thanh bình và thơ mộng' }
    ]
  },
  thailand: {
    id: 'thailand',
    code: 'TH',
    nameVi: 'Thái Lan',
    nameEn: 'Thailand',
    flag: '🇹🇭',
    capital: 'Bangkok',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 70 triệu người',
    populationNum: 70,
    area: '513.120 km²',
    areaNum: 513,
    language: 'Tiếng Thái',
    climate: 'Nhiệt đới ẩm gió mùa, nóng ấm quanh năm',
    currency: 'Baht Thái (THB)',
    shortDescription: 'Xứ sở Chùa Vàng thân thiện với nụ cười hiền hậu, những ngôi chùa dát vàng lấp lánh và lễ hội té nước Songkran vui nhộn.',
    lat: 15.87,
    lng: 100.9925,
    altitude: 1.8,
    color: '#f97316',
    isSoutheastAsia: true,
    relativeDirectionFromVietnam: 'Phía Tây',
    natureHighlights: [
      'Vịnh Phang Nga với những ngọn núi đá vôi nhô lên từ làn nước xanh ngọc.',
      'Các bãi biển nhiệt đới tuyệt đẹp ở Phuket và Koh Samui.',
      'Rừng nhiệt đới rậm rạp phía Bắc nơi loài voi sinh sống tự do.'
    ],
    cultureHighlights: [
      'Hàng ngàn ngôi chùa Phật giáo với mái ngói cong dát vàng rực rỡ.',
      'Lễ hội Songkran - tưng bừng té nước chúc phúc vào dịp năm mới.',
      'Điệu múa Thái uyển chuyển với trang phục lấp lánh truyền thống.'
    ],
    foodHighlights: [
      'Tom Yum Goong - canh tôm chua cay đậm đà nước cốt dừa.',
      'Pad Thai - hủ tiếu xào tôm đậu phộng chua ngọt.',
      'Xôi xoài béo ngậy nước cốt dừa và mè rang thơm.'
    ],
    funFacts: [
      'Tên đầy đủ của thủ đô Bangkok là tên thủ đô dài nhất trên thế giới!',
      'Thái Lan là quốc gia Đông Nam Á duy nhất chưa từng bị phương Tây đô hộ.',
      'Voi là biểu tượng quốc gia thiêng liêng được người dân Thái Lan hết sức yêu quý.'
    ],
    landmarks: [
      { name: 'Cung điện Hoàng Gia Grand Palace', description: 'Khu phức hợp đền đài dát vàng lộng lẫy tại Bangkok' },
      { name: 'Chùa Wat Arun', description: 'Ngôi chùa Bình Minh soi bóng bên dòng sông Chao Phraya' },
      { name: 'Chợ nổi Damnoen Saduak', description: 'Nét văn hóa buôn bán nhộn nhịp trên ghe thuyền' }
    ]
  },
  singapore: {
    id: 'singapore',
    code: 'SG',
    nameVi: 'Singapore',
    nameEn: 'Singapore',
    flag: '🇸🇬',
    capital: 'Singapore',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 5,9 triệu người',
    populationNum: 5.9,
    area: '728 km²',
    areaNum: 0.73,
    language: 'Tiếng Anh, Mã Lai, Quan thoại, Tamil',
    climate: 'Xích đạo nóng ẩm, mưa nhiều quanh năm',
    currency: 'Đô la Singapore (SGD)',
    shortDescription: 'Đảo quốc Sư Tử xanh - sạch - đẹp hàng đầu thế giới, với những khu vườn tương lai hiện đại và cảng biển sầm uất.',
    lat: 1.3521,
    lng: 103.8198,
    altitude: 1.8,
    color: '#10b981',
    natureHighlights: [
      'Gardens by the Bay - siêu cây năng lượng mặt trời khổng lồ và nhà kính mái vòm.',
      'Vườn bách thảo Singapore Botanical Gardens di sản UNESCO.',
      'Khu bảo tồn thiên nhiên Bukit Timah với đồi rừng nhiệt đới nguyên sinh.'
    ],
    cultureHighlights: [
      'Sự giao thoa văn hóa đặc sắc giữa cộng đồng người Hoa, Mã Lai, Ấn Độ.',
      'Tượng Merlion - sinh vật đầu sư tử mình cá biểu tượng của đất nước.',
      'Lối sống hiện đại, văn minh và ý thức bảo vệ môi trường rất cao.'
    ],
    foodHighlights: [
      'Cơm gà Hải Nam gà luộc mọng nước ăn cùng cơm nấu nước luộc gà thơm béo.',
      'Cua sốt ớt (Chilli Crab) cay nồng ăn kèm bánh bao chiên.',
      'Bánh mì nướng Kaya kẹp bơ uống cùng trà sữa Teh Tarik.'
    ],
    funFacts: [
      'Singapore là một trong những thành phố nhiều cây xanh nhất thế giới, được mệnh danh là Thành phố trong vườn.',
      'Đảo quốc này không có tài nguyên khoáng sản nhưng là trung tâm tài chính và cảng biển nhộn nhịp bậc nhất.',
      'Tại Singapore, việc xả rác hay nhai kẹo cao su bừa bãi bị cấm rất nghiêm ngặt.'
    ],
    landmarks: [
      { name: 'Marina Bay Sands', description: 'Tòa nhà biểu tượng với bể bơi vô cực trên tầng 57 hình con thuyền' },
      { name: 'Công viên Merlion', description: 'Nơi đặt tượng Sư tử biển phun nước ra vịnh' },
      { name: 'Sân bay Changi & Thác nước Jewel', description: 'Sân bay đẹp nhất thế giới với thác nước trong nhà cao 40m' }
    ]
  },
  india: {
    id: 'india',
    code: 'IN',
    nameVi: 'Ấn Độ',
    nameEn: 'India',
    flag: '🇮🇳',
    capital: 'New Delhi',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 1,43 tỷ người',
    populationNum: 1430,
    area: '3.287.263 km²',
    areaNum: 3287,
    language: 'Tiếng Hindi, Tiếng Anh và hơn 20 ngôn ngữ chính thức',
    climate: 'Nhiệt đới và cận nhiệt đới gió mùa, có mùa mưa lũ và mùa khô nóng bức',
    currency: 'Rupee Ấn Độ (INR)',
    shortDescription: 'Cái nôi văn minh cổ xưa bên sông Hằng linh thiêng, quê hương của đền Taj Mahal cẩm thạch trắng và các lễ hội sắc màu rực rỡ.',
    lat: 20.5937,
    lng: 78.9629,
    altitude: 2.0,
    color: '#f59e0b',
    natureHighlights: [
      'Dãy Himalaya hùng vĩ chắn phía bắc với nhiều đỉnh tuyết cao nhất hành tinh.',
      'Sông Hằng (Ganges) dài 2.525 km mang nguồn sống cho hàng trăm triệu cư dân.',
      'Rừng nhiệt đới nơi loài hổ Bengal dũng mãnh và voi Ấn Độ sinh sống.'
    ],
    cultureHighlights: [
      'Lăng mộ Taj Mahal - kiệt tác đá cẩm thạch trắng biểu tượng của tình yêu vĩnh cửu.',
      'Lễ hội sắc màu Holi - người dân tung bột màu rực rỡ chào đón mùa xuân.',
      'Trang phục truyền thống Saree rực rỡ và nghệ thuật tập Yoga bắt nguồn từ đây.'
    ],
    foodHighlights: [
      'Cà ri thơm nồng với hàng chục loại gia vị tự nhiên bổ dưỡng.',
      'Bánh mì Naan nướng trong lò đất tandoori nóng hổi.',
      'Trà sữa gia vị Masala Chai thơm lừng quế, hồi và gừng.'
    ],
    funFacts: [
      'Số 0 trong toán học và cờ vua sơ khai có nguồn gốc phát minh từ Ấn Độ cổ đại.',
      'Ấn Độ là nước sản xuất nhiều phim ảnh nhất thế giới (Kinh đô điện ảnh Bollywood).',
      'Loài bò được xem là con vật linh thiêng và được tôn trọng đi lại tự do trên đường phố.'
    ],
    landmarks: [
      { name: 'Lăng Taj Mahal', description: 'Kỳ quan thế giới xây bằng đá cẩm thạch trắng tinh xảo' },
      { name: 'Cố đô Varanasi', description: 'Thành phố cổ thiêng liêng bên dòng sông Hằng' },
      { name: 'Pháo đài Đỏ Red Fort', description: 'Công trình pháo đài sa thạch đỏ đồ sộ ở Delhi' }
    ]
  },
  france: {
    id: 'france',
    code: 'FR',
    nameVi: 'Pháp',
    nameEn: 'France',
    flag: '🇫🇷',
    capital: 'Paris',
    continent: 'Châu Âu',
    continentId: 'europe',
    population: 'Khoảng 68 triệu người',
    populationNum: 68,
    area: '551.695 km²',
    areaNum: 552,
    language: 'Tiếng Pháp',
    climate: 'Ôn đới hải dương phía tây, Địa Trung Hải ấm áp phía nam',
    currency: 'Euro (EUR)',
    shortDescription: 'Kinh đô ánh sáng và nghệ thuật của châu Âu, quê hương của Tháp Eiffel, bảo tàng Louvre và những cánh đồng hoa oải hương ngát hương.',
    lat: 46.2276,
    lng: 2.2137,
    altitude: 1.8,
    color: '#3b82f6',
    natureHighlights: [
      'Đỉnh Mont Blanc (4.808m) - nóc nhà của dãy núi Alps phủ băng tuyết trắng xóa.',
      'Bờ biển Côte d’Azur (French Riviera) nước xanh ngọc bích miền Nam.',
      'Cánh đồng hoa oải hương tím ngắt bất tận ở xứ Provence thơ mộng.'
    ],
    cultureHighlights: [
      'Tháp Eiffel sừng sững bên dòng sông Seine êm đềm ở Paris.',
      'Bảo tàng Louvre lưu giữ bức tranh nàng Mona Lisa trứ danh của Leonardo da Vinci.',
      'Thời trang cao cấp thế giới và tinh thần nghệ thuật lãng mạn.'
    ],
    foodHighlights: [
      'Bánh mì Croissant (bánh sừng bò) giòn xốp thơm bơ.',
      'Hàng trăm loại phô mai trứ danh từ sữa bò và dê.',
      'Bánh ngọt Macaron đầy màu sắc tinh tế ngọt ngào.'
    ],
    funFacts: [
      'Pháp là quốc gia đón lượng khách du lịch quốc tế đông nhất thế giới mỗi năm.',
      'Tháp Eiffel cao hơn 300m và vào mùa hè có thể cao thêm 15cm do kim loại nở vì nhiệt!',
      'Nước Pháp có hơn 1.000 loại phô mai khác nhau.'
    ],
    landmarks: [
      { name: 'Tháp Eiffel', description: 'Biểu tượng kiến trúc sắt thép tráng lệ của thủ đô Paris' },
      { name: 'Bảo tàng Louvre', description: 'Bảo tàng nghệ thuật lớn nhất thế giới với kim tự tháp kính' },
      { name: 'Cung điện Versailles', description: 'Lâu đài hoàng gia nguy nga với những khu vườn tuyệt mỹ' }
    ]
  },
  united_kingdom: {
    id: 'united_kingdom',
    code: 'GB',
    nameVi: 'Vương Quốc Anh',
    nameEn: 'United Kingdom',
    flag: '🇬🇧',
    capital: 'London',
    continent: 'Châu Âu',
    continentId: 'europe',
    population: 'Khoảng 67 triệu người',
    populationNum: 67,
    area: '242.495 km²',
    areaNum: 242,
    language: 'Tiếng Anh',
    climate: 'Ôn đới hải dương, mát mẻ, nhiều mây và thường có mưa nhẹ',
    currency: 'Bảng Anh (GBP)',
    shortDescription: 'Xứ sở sương mù cổ kính với tháp đồng hồ Big Ben, những lâu đài hoàng gia uy nghiêm và quê hương của môn thể thao bóng đá hiện đại.',
    lat: 55.3781,
    lng: -3.436,
    altitude: 1.8,
    color: '#6366f1',
    natureHighlights: [
      'Cao nguyên Scotland hoang sơ với những hồ nước sâu huyền bí như Loch Ness.',
      'Vách đá phấn trắng Dover dựng đứng sừng sững bên bờ biển.',
      'Vùng hồ Lake District thơ mộng từng là nguồn cảm hứng cho nhiều nhà thơ.'
    ],
    cultureHighlights: [
      'Gia đình Hoàng gia Anh với cung điện Buckingham và nghi thức đổi gác trang trọng.',
      'Tháp đồng hồ Big Ben và xe buýt 2 tầng đỏ rực trên đường phố London.',
      'Quê hương của nhà đại văn hào William Shakespeare và truyện phù thủy Harry Potter.'
    ],
    foodHighlights: [
      'Fish and Chips - cá tẩm bột chiên giòn ăn cùng khoai tây chiên.',
      'Bữa trà chiều (Afternoon Tea) với bánh nướng Scone kẹp mứt kem.',
      'Bánh Pudding nướng kiểu Yorkshire cho bữa ăn Chủ Nhật.'
    ],
    funFacts: [
      'Đồng hồ Big Ben thực chất là tên quả chuông nặng 13,7 tấn bên trong tháp Elizabeth!',
      'Môn bóng đá, bóng bàn và quần vợt hiện đại đều bắt nguồn từ nước Anh.',
      'Kinh tuyến số 0 (Kinh tuyến gốc Greenwich) đi qua đài thiên văn London.'
    ],
    landmarks: [
      { name: 'Tháp Big Ben & Cầu Tháp Tower Bridge', description: 'Biểu tượng lịch sử bắc qua sông Thames ở London' },
      { name: 'Cung điện Buckingham', description: 'Nơi ở chính thức của Hoàng gia Anh' },
      { name: 'Bãi đá cổ Stonehenge', description: 'Vòng tròn cự thạch bí ẩn hàng ngàn năm tuổi' }
    ]
  },
  germany: {
    id: 'germany',
    code: 'DE',
    nameVi: 'Đức',
    nameEn: 'Germany',
    flag: '🇩🇪',
    capital: 'Berlin',
    continent: 'Châu Âu',
    continentId: 'europe',
    population: 'Khoảng 84 triệu người',
    populationNum: 84,
    area: '357.022 km²',
    areaNum: 357,
    language: 'Tiếng Đức',
    climate: 'Ôn đới lục địa, mùa hè ấm áp, mùa đông mát lạnh có tuyết',
    currency: 'Euro (EUR)',
    shortDescription: 'Cường quốc kỹ thuật hàng đầu châu Âu, nổi tiếng với những tòa lâu đài cổ tích, rừng Đen huyền bí và những chiếc xe hơi siêu bền.',
    lat: 51.1657,
    lng: 10.4515,
    altitude: 1.8,
    color: '#8b5cf6',
    natureHighlights: [
      'Rừng Đen (Black Forest) - khu rừng thông rậm rạp xanh thẫm quanh năm.',
      'Dãy núi Alps ở bang Bavaria với những hồ nước trong veo như pha lê.',
      'Dòng sông Rhine lãng mạn chảy qua thung lũng với những đồi nho bát ngát.'
    ],
    cultureHighlights: [
      'Lâu đài Neuschwanstein cổ tích là nguồn cảm hứng cho lâu đài Disney.',
      'Quê hương của các nhà soạn nhạc thiên tài Beethoven và Bach.',
      'Cổng Brandenburg lịch sử biểu tượng cho sự thống nhất nước Đức.'
    ],
    foodHighlights: [
      'Xúc xích Đức Bratwurst nướng thơm phức ăn cùng mù tạt.',
      'Bánh mì tròn xoắn Brezel rắc muối giòn thơm.',
      'Bánh ngọt Rừng Đen (Black Forest Cake) với quả anh đào mọng nước.'
    ],
    funFacts: [
      'Đức có hơn 20.000 lâu đài cổ nằm rải rác khắp đất nước!',
      'Hệ thống đường cao tốc Autobahn của Đức có nhiều đoạn không giới hạn tốc độ tối đa.',
      'Cây thông Noel trang trí trong dịp Giáng sinh bắt nguồn từ phong tục nước Đức cổ xưa.'
    ],
    landmarks: [
      { name: 'Lâu đài Neuschwanstein', description: 'Tòa lâu đài cổ tích tuyệt đẹp giữa núi non Bavaria' },
      { name: 'Cổng Brandenburg', description: 'Biểu tượng lịch sử hòa bình tại thủ đô Berlin' },
      { name: 'Nhà thờ chính tòa Köln', description: 'Kiệt tác kiến trúc Gothic khổng lồ sừng sững bên sông' }
    ]
  },
  italy: {
    id: 'italy',
    code: 'IT',
    nameVi: 'Italia (Ý)',
    nameEn: 'Italy',
    flag: '🇮🇹',
    capital: 'Roma',
    continent: 'Châu Âu',
    continentId: 'europe',
    population: 'Khoảng 59 triệu người',
    populationNum: 59,
    area: '301.340 km²',
    areaNum: 301,
    language: 'Tiếng Ý',
    climate: 'Địa Trung Hải ấm áp, nhiều nắng vàng rực rỡ',
    currency: 'Euro (EUR)',
    shortDescription: 'Đất nước hình chiếc ủng duyên dáng bên bờ Địa Trung Hải, bảo tàng sống của La Mã cổ đại với Đấu trường Colosseum và món Pizza tuyệt hảo.',
    lat: 41.8719,
    lng: 12.5674,
    altitude: 1.8,
    color: '#ec4899',
    natureHighlights: [
      'Bờ biển Amalfi dựng đứng với những ngôi nhà rực rỡ sắc màu nhìn ra biển.',
      'Dãy núi đá vôi Dolomites tuyệt mỹ thuộc dãy Alps.',
      'Núi lửa Vesuvius và Etna - những ngọn núi lửa hoạt động nổi tiếng châu Âu.'
    ],
    cultureHighlights: [
      'Đấu trường La Mã Colosseum - kỳ quan kiến trúc cổ đại nơi diễn ra các trận đấu lịch sử.',
      'Thành phố nổi Venice lãng mạn di chuyển hoàn toàn bằng thuyền Gondola.',
      'Tháp nghiêng Pisa kỳ lạ đứng vững suốt hàng trăm năm.'
    ],
    foodHighlights: [
      'Bánh Pizza nướng củi giòn rụm với phô mai Mozzarella kéo sợi.',
      'Mì Spaghetti sốt bò băm thơm lừng lá quế tây.',
      'Kem Gelato mát lạnh nhiều vị trái cây tự nhiên đậm đà.'
    ],
    funFacts: [
      'Đất nước Italia có hình dáng bản đồ trông giống hệt một chiếc ủng cao gót đang đá một quả bóng (đảo Sicily)!',
      'Italia có số lượng Di sản Thế giới UNESCO nhiều nhất thế giới.',
      'Thành Vatican - quốc gia độc lập nhỏ nhất thế giới nằm trọn bên trong lòng thủ đô Roma.'
    ],
    landmarks: [
      { name: 'Đấu trường Colosseum', description: 'Đấu trường La Mã cổ đại vĩ đại bậc nhất thế giới' },
      { name: 'Tháp nghiêng Pisa', description: 'Tháp chuông đá cẩm thạch nghiêng kỳ lạ nổi tiếng' },
      { name: 'Kênh đào Venice', description: 'Thành phố kênh đào xinh đẹp lướt thuyền ngắm cảnh' }
    ]
  },
  egypt: {
    id: 'egypt',
    code: 'EG',
    nameVi: 'Ai Cập',
    nameEn: 'Egypt',
    flag: '🇪🇬',
    capital: 'Cairo',
    continent: 'Châu Phi',
    continentId: 'africa',
    population: 'Khoảng 110 triệu người',
    populationNum: 110,
    area: '1.002.450 km²',
    areaNum: 1002,
    language: 'Tiếng Ả Rập',
    climate: 'Sa mạc khô nóng quanh năm, rất ít mưa',
    currency: 'Bảng Ai Cập (EGP)',
    shortDescription: 'Xứ sở của các Pharaoh quyền uy, Kim tự tháp Giza kỳ vĩ, Tượng Nhân sư bí ẩn và dòng sông Nile dài nhất hành tinh.',
    lat: 26.8206,
    lng: 30.8025,
    altitude: 1.8,
    color: '#d97706',
    natureHighlights: [
      'Sông Nile (6.650 km) - dòng sông dài nhất thế giới nuôi dưỡng nền văn minh cổ đại.',
      'Sa mạc Sahara bao la với những cồn cát vàng óng ả.',
      'Biển Đỏ với những rạn san hô rực rỡ là thiên đường lặn biển.'
    ],
    cultureHighlights: [
      'Đại Kim tự tháp Giza - kỳ quan cổ đại duy nhất còn tồn tại đến ngày nay.',
      'Tượng Nhân sư lớn tạc từ đá tảng hình đầu người mình sư tử.',
      'Chữ tượng hình Ai Cập cổ khắc trên giấy cói Papyrus và tường lăng mộ.'
    ],
    foodHighlights: [
      'Koshari - món ăn quốc dân kết hợp cơm, mì, đậu lăng và sốt cà chua tỏi cay.',
      'Falafel đậu gà chiên vàng giòn rụm kẹp bánh mì dẹp pita.',
      'Bánh mì nướng nóng hổi Aish Baladi ăn kèm sốt mè tahini.'
    ],
    funFacts: [
      'Kim tự tháp Giza được xây dựng từ hơn 2 triệu khối đá nặng hàng tấn mà không dùng xi măng!',
      'Người Ai Cập cổ đại tôn sùng loài mèo và coi mèo là loài vật bảo vệ mang lại may mắn.',
      'Họ đã phát minh ra giấy làm từ cây cói Papyrus và lịch 365 ngày từ hàng ngàn năm trước.'
    ],
    landmarks: [
      { name: 'Quần thể Kim tự tháp Giza & Tượng Nhân sư', description: 'Kỳ quan kiến trúc khổng lồ ngàn năm tuổi giữa sa mạc' },
      { name: 'Đền Luxor & Thung lũng các vị Vua', description: 'Nơi chôn cất các vị vua Pharaoh cổ đại' },
      { name: 'Kênh đào Suez', description: 'Tuyến đường thủy quốc tế quan trọng nối Địa Trung Hải và Biển Đỏ' }
    ]
  },
  united_states: {
    id: 'united_states',
    code: 'US',
    nameVi: 'Hoa Kỳ (Mỹ)',
    nameEn: 'United States',
    flag: '🇺🇸',
    capital: 'Washington, D.C.',
    continent: 'Bắc Mỹ',
    continentId: 'north_america',
    population: 'Khoảng 335 triệu người',
    populationNum: 335,
    area: '9.833.517 km²',
    areaNum: 9834,
    language: 'Tiếng Anh',
    climate: 'Rất đa dạng: từ băng tuyết Alaska, nhiệt đới Hawaii, đến sa mạc Nevada và ôn đới lục địa',
    currency: 'Đô la Mỹ (USD)',
    shortDescription: 'Cường quốc kinh tế - khoa học rộng lớn trải dài 50 bang, nổi tiếng với Tượng Nữ thần Tự do, hẻm núi Grand Canyon và thung lũng Silicon.',
    lat: 37.0902,
    lng: -95.7129,
    altitude: 2.2,
    color: '#0284c7',
    natureHighlights: [
      'Hẻm núi Grand Canyon sâu hun hút do sông Colorado bào mòn hàng triệu năm.',
      'Vườn quốc gia Yellowstone với những mạch nước phun nước nóng kỳ ảo.',
      'Rừng cây cự thạch khổng lồ Sequoia - những sinh vật sống to lớn nhất hành tinh.'
    ],
    cultureHighlights: [
      'Tượng Nữ thần Tự do giơ cao ngọn đuốc hy vọng tại cảng New York.',
      'Kinh đô điện ảnh Hollywood và các công viên giải trí Disneyland thần tiên.',
      'Nơi thám hiểm không gian vũ trụ NASA đưa phi hành gia lên Mặt Trăng.'
    ],
    foodHighlights: [
      'Bánh Burger kẹp thịt bò nướng phô mai béo ngậy.',
      'Bánh táo nướng truyền thống Apple Pie thơm mùi quế.',
      'Sườn nướng BBQ xốt đậm đà thơm lừng.'
    ],
    funFacts: [
      'Quốc kỳ Mỹ có 50 ngôi sao trắng đại diện cho 50 bang của đất nước.',
      'Mỹ là quốc gia đầu tiên đưa con người bước chân lên bề mặt Mặt Trăng (năm 1969).',
      'Cây General Sherman ở bang California là cây gỗ đơn thân lớn nhất thế giới.'
    ],
    landmarks: [
      { name: 'Tượng Nữ thần Tự do', description: 'Món quà tình bạn từ nước Pháp, biểu tượng của tự do tại New York' },
      { name: 'Hẻm núi Grand Canyon', description: 'Kỳ quan địa chất khổng lồ với những vách đá đỏ rực rỡ' },
      { name: 'Cầu Cổng Vàng (Golden Gate)', description: 'Cây cầu treo màu cam rực rỡ nối qua vịnh San Francisco' }
    ]
  },
  canada: {
    id: 'canada',
    code: 'CA',
    nameVi: 'Canada',
    nameEn: 'Canada',
    flag: '🇨🇦',
    capital: 'Ottawa',
    continent: 'Bắc Mỹ',
    continentId: 'north_america',
    population: 'Khoảng 40 triệu người',
    populationNum: 40,
    area: '9.984.670 km²',
    areaNum: 9985,
    language: 'Tiếng Anh, Tiếng Pháp',
    climate: 'Lạnh giá phía bắc, ôn đới phía nam, mùa đông tuyết phủ dày lý tưởng trượt tuyết',
    currency: 'Đô la Canada (CAD)',
    shortDescription: 'Xứ sở lá phong đỏ thanh bình, quốc gia lớn thứ nhì thế giới với hàng vạn hồ nước trong xanh, thác Niagara hùng vĩ và gấu trắng Bắc Cực.',
    lat: 56.1304,
    lng: -106.3468,
    altitude: 2.3,
    color: '#e11d48',
    natureHighlights: [
      'Thác Niagara cuồn cuộn nước chảy khổng lồ giữa biên giới Canada và Mỹ.',
      'Hồ Louise trong vườn quốc gia Banff với nước hồ xanh ngọc bích soi bóng núi tuyết.',
      'Vùng Bắc Cực hoang dã nơi gấu Bắc Cực và cực quang phương Bắc rực rỡ xuất hiện.'
    ],
    cultureHighlights: [
      'Biểu tượng lá phong đỏ (Maple Leaf) trên quốc kỳ và văn hóa nước này.',
      'Môn thể thao khúc côn cầu trên băng (Ice Hockey) được toàn dân yêu thích.',
      'Đất nước đa văn hóa, hòa bình và người dân nổi tiếng thân thiện.'
    ],
    foodHighlights: [
      'Siro cây phong (Maple Syrup) ngọt thanh tự nhiên ăn cùng bánh nướng pancake.',
      'Món Poutine - khoai tây chiên phủ phô mai dẻo quánh và nước sốt thịt bò gravy.',
      'Bánh tart bơ đường ngọt ngào nướng giòn tan.'
    ],
    funFacts: [
      'Canada có nhiều hồ nước ngọt hơn tất cả các quốc gia còn lại trên thế giới cộng lại!',
      'Đường bờ biển của Canada dài nhất thế giới với hơn 202.000 km.',
      'Tên Canada bắt nguồn từ chữ "Kanata" trong tiếng thổ dân cổ có nghĩa là "ngôi làng".'
    ],
    landmarks: [
      { name: 'Thác Niagara', description: 'Hệ thống thác nước hùng vĩ bậc nhất hành tinh' },
      { name: 'Vườn quốc gia Banff & Hồ Moraine', description: 'Thiên đường núi tuyết đá Rockies và hồ nước xanh ngọc' },
      { name: 'Tháp CN Tower', description: 'Tháp truyền hình cao chọc trời nhìn ra hồ Ontario ở Toronto' }
    ]
  },
  brazil: {
    id: 'brazil',
    code: 'BR',
    nameVi: 'Brazil',
    nameEn: 'Brazil',
    flag: '🇧🇷',
    capital: 'Brasília',
    continent: 'Nam Mỹ',
    continentId: 'south_america',
    population: 'Khoảng 215 triệu người',
    populationNum: 215,
    area: '8.515.767 km²',
    areaNum: 8516,
    language: 'Tiếng Bồ Đào Nha',
    climate: 'Nhiệt đới và cận nhiệt đới ấm nóng, mưa nhiều ở vùng rừng nhiệt đới',
    currency: 'Real Brazil (BRL)',
    shortDescription: 'Xứ sở của vũ điệu Samba nóng bỏng, lễ hội hóa trang Carnival rực rỡ sắc màu, rừng già nhiệt đới Amazon và vương quốc bóng đá thế giới.',
    lat: -14.235,
    lng: -51.9253,
    altitude: 2.2,
    color: '#22c55e',
    natureHighlights: [
      'Rừng mưa nhiệt đới Amazon - "lá phổi xanh của Trái Đất" lớn nhất hành tinh.',
      'Sông Amazon với lượng nước chảy khổng lồ gấp nhiều lần các con sông khác.',
      'Thác Iguazu hùng vĩ gồm 275 ngọn thác nước đổ ầm vang giữa rừng già.'
    ],
    cultureHighlights: [
      'Tượng Chúa Cứu Thế Cristo Redentor khổng lồ dang tay trên đỉnh núi Corcovado.',
      'Lễ hội hóa trang Carnival lớn nhất thế giới với âm nhạc Samba tưng bừng.',
      'Bóng đá là niềm đam mê cuồng nhiệt (đội tuyển vô địch World Cup 5 lần).'
    ],
    foodHighlights: [
      'Feijoada - món hầm đậu đen với thịt thơm ngon truyền thống.',
      'Bánh phô mai nướng Pão de queijo dẻo dai thơm lừng.',
      'Sinh tố quả Açaí từ rừng Amazon bổ dưỡng ăn kèm chuối và ngũ cốc.'
    ],
    funFacts: [
      'Rừng Amazon sản xuất ra khoảng 20% lượng khí oxy của cả Trái Đất!',
      'Brazil là quốc gia xuất khẩu cà phê lớn nhất thế giới trong hơn 150 năm qua.',
      'Sông Amazon có những loài sinh vật kỳ thú như cá heo hồng nước ngọt và cá piranha.'
    ],
    landmarks: [
      { name: 'Tượng Chúa Cứu Thế', description: 'Bức tượng khổng lồ dang tay che chở thành phố Rio de Janeiro' },
      { name: 'Rừng mưa Amazon', description: 'Khu rừng nhiệt đới rộng lớn và đa dạng sinh học nhất Trái Đất' },
      { name: 'Thác nước Iguazu', description: 'Kỳ quan thác nước trắng xóa giữa biên giới Brazil và Argentina' }
    ]
  },
  australia: {
    id: 'australia',
    code: 'AU',
    nameVi: 'Australia (Úc)',
    nameEn: 'Australia',
    flag: '🇦🇺',
    capital: 'Canberra',
    continent: 'Châu Đại Dương',
    continentId: 'oceania',
    population: 'Khoảng 26 triệu người',
    populationNum: 26,
    area: '7.692.024 km²',
    areaNum: 7692,
    language: 'Tiếng Anh',
    climate: 'Đa dạng, phần lớn nội địa là sa mạc khô nóng, ven biển mát mẻ ôn hòa',
    currency: 'Đô la Úc (AUD)',
    shortDescription: 'Xứ sở chuột túi Kangaroo và gấu túi Koala đáng yêu, nhà hát Con Sò Sydney độc đáo và rạn san hô Great Barrier Reef lớn nhất hành tinh.',
    lat: -25.2744,
    lng: 133.7751,
    altitude: 2.0,
    color: '#0ea5e9',
    natureHighlights: [
      'Rạn san hô Great Barrier Reef dài hơn 2.300 km nhìn thấy được từ ngoài vũ trụ.',
      'Khối đá thiêng sa thạch đỏ Uluru (Ayers Rock) sừng sững giữa sa mạc trung tâm.',
      'Rừng bạch đàn xanh ngát là nơi sinh sống của gấu túi Koala.'
    ],
    cultureHighlights: [
      'Nhà hát Opera Sydney (Nhà hát Con Sò) với kiến trúc cánh buồm trắng trên vịnh biển.',
      'Văn hóa thổ dân bản địa cổ xưa với nhạc cụ Didgeridoo và tranh chấm điểm.',
      'Lối sống yêu thích thể thao ngoài trời, lướt sóng và cắm trại thiên nhiên.'
    ],
    foodHighlights: [
      'Bánh Pavlova xốp mềm phủ kem tươi và trái cây kiwi, dâu tây.',
      'Bánh thịt nướng Meat Pie nóng giòn thơm ngậy.',
      'Bơ Vegemite đặc trưng phết bánh mì nướng cho bữa sáng.'
    ],
    funFacts: [
      'Australia vừa là một quốc gia vừa là một châu lục độc lập duy nhất trên thế giới.',
      'Số lượng chuột túi Kangaroo ở Úc còn nhiều hơn cả số dân số người sinh sống!',
      'Úc có loài thú mỏ vịt và thú lông nhím kỳ lạ - loài thú duy nhất đẻ trứng thay vì đẻ con.'
    ],
    landmarks: [
      { name: 'Nhà hát Opera Sydney', description: 'Kiệt tác kiến trúc thế giới hình cánh buồm đón gió' },
      { name: 'Rạn san hô Great Barrier Reef', description: 'Thế giới sinh vật biển san hô kỳ vĩ nhất dưới lòng đại dương' },
      { name: 'Khối đá Uluru', description: 'Tảng đá sa thạch khổng lồ đổi màu theo ánh mặt trời' }
    ]
  },
  russia: {
    id: 'russia',
    code: 'RU',
    nameVi: 'Nga',
    nameEn: 'Russia',
    flag: '🇷🇺',
    capital: 'Moskva (Moscow)',
    continent: 'Châu Âu',
    continentId: 'europe',
    population: 'Khoảng 144 triệu người',
    populationNum: 144,
    area: '17.098.242 km²',
    areaNum: 17098,
    language: 'Tiếng Nga',
    climate: 'Hàn đới và ôn đới lục địa, mùa đông Siberia cực kỳ lạnh giá với băng tuyết',
    currency: 'Rúp Nga (RUB)',
    shortDescription: 'Quốc gia có diện tích lớn nhất hành tinh trải dài qua cả 2 châu lục Á - Âu, nổi tiếng với Quảng trường Đỏ, hồ Baikal sâu nhất và búp bê Matryoshka.',
    lat: 61.524,
    lng: 105.3188,
    altitude: 2.4,
    color: '#a855f7',
    natureHighlights: [
      'Hồ Baikal ở Siberia - hồ nước ngọt sâu nhất và chứa nhiều nước ngọt nhất thế giới.',
      'Rừng Taiga lá kim bạt ngàn bao phủ hàng triệu cây số vuông.',
      'Đỉnh Elbrus (5.642m) thuộc dãy Kavkaz - đỉnh núi cao nhất châu Âu.'
    ],
    cultureHighlights: [
      'Quảng trường Đỏ và Điện Kremlin uy nghiêm tại thủ đô Moskva.',
      'Nhà thờ Thánh Basil với những mái vòm củ hành nhiều màu sắc rực rỡ như cổ tích.',
      'Búp bê gỗ Matryoshka lồng vào nhau khéo léo và điệu múa Ba lê Nga đỉnh cao.'
    ],
    foodHighlights: [
      'Súp củ dền đỏ Borscht ăn cùng kem chua Smetana.',
      'Bánh bao nướng Pirozhki nhân thịt và khoai tây nóng hổi.',
      'Bánh xèo Blini cuộn mứt dâu rừng hoặc bơ ngọt.'
    ],
    funFacts: [
      'Nước Nga rộng lớn đến mức có tới 11 múi giờ khác nhau!',
      'Hồ Baikal chứa khoảng 20% lượng nước ngọt chưa đóng băng trên toàn Trái Đất.',
      'Tuyến đường sắt xuyên Siberia dài 9.289 km là tuyến tàu hỏa dài nhất hành tinh.'
    ],
    landmarks: [
      { name: 'Quảng trường Đỏ & Điện Kremlin', description: 'Trung tâm lịch sử chính trị và văn hóa của nước Nga' },
      { name: 'Nhà thờ Thánh Basil', description: 'Kiến trúc mái vòm củ hành rực rỡ như lâu đài cổ tích' },
      { name: 'Hồ Baikal', description: 'Hồ nước trong vắt và sâu nhất hành tinh giữa rừng tuyết Siberia' }
    ]
  },
  south_africa: {
    id: 'south_africa',
    code: 'ZA',
    nameVi: 'Nam Phi',
    nameEn: 'South Africa',
    flag: '🇿🇦',
    capital: 'Pretoria, Cape Town, Bloemfontein',
    continent: 'Châu Phi',
    continentId: 'africa',
    population: 'Khoảng 60 triệu người',
    populationNum: 60,
    area: '1.221.037 km²',
    areaNum: 1221,
    language: 'Tiếng Zulu, Xhosa, Afrikaans, Tiếng Anh và 7 ngôn ngữ khác',
    climate: 'Địa Trung Hải phía tây nam, cận nhiệt đới phía đông, mát mẻ dễ chịu',
    currency: 'Rand Nam Phi (ZAR)',
    shortDescription: 'Quốc gia Cầu Vồng đa sắc tộc ở cực nam châu Phi, nơi có Núi Bàn hùng vĩ, Mũi Hảo Vọng lịch sử và những công viên động vật hoang dã kỳ thú.',
    lat: -30.5595,
    lng: 22.9375,
    altitude: 1.8,
    color: '#84cc16',
    natureHighlights: [
      'Núi Bàn (Table Mountain) có đỉnh phẳng lỳ như mặt bàn nhìn ra đại dương.',
      'Vườn quốc gia Kruger nơi sinh sống tự do của 5 loài động vật lớn: Sư tử, Voi, Báo, Tê giác, Trâu rừng.',
      'Mũi Hảo Vọng nơi sóng biển hai đại dương Thái Bình Dương và Đại Tây Dương giao thoa.'
    ],
    cultureHighlights: [
      'Được mệnh danh là "Quốc gia Cầu Vồng" vì sự đa dạng văn hóa và sắc tộc chung sống.',
      'Quê hương của vị lãnh tụ hòa bình Nelson Mandela.',
      'Âm nhạc trống truyền thống châu Phi rộn rã và điệu nhảy sôi động.'
    ],
    foodHighlights: [
      'Thịt nướng ngoài trời Braai thơm lừng của người dân Nam Phi.',
      'Thịt sấy khô Biltong ăn vặt giàu dinh dưỡng.',
      'Bánh nướng Malva Pudding ngào đường ngọt ngào.'
    ],
    funFacts: [
      'Nam Phi là quốc gia duy nhất trên thế giới có tới 3 thành phố thủ đô cùng lúc!',
      'Tại bãi biển Boulders ở Cape Town, có cả một đàn chim cánh cụt châu Phi sinh sống trên bãi cát ấm áp.',
      'Viên kim cương lớn nhất thế giới (Cullinan nặng hơn 3.100 carat) được tìm thấy ở Nam Phi.'
    ],
    landmarks: [
      { name: 'Núi Bàn (Table Mountain)', description: 'Ngọn núi biểu tượng với đỉnh phẳng nhìn ra vịnh Cape Town' },
      { name: 'Mũi Hảo Vọng (Cape of Good Hope)', description: 'Mũi đất lịch sử nổi tiếng trên các hải trình thám hiểm thế giới' },
      { name: 'Vườn quốc gia Kruger', description: 'Khu bảo tồn thiên nhiên hoang dã nổi tiếng thế giới' }
    ]
  },
  laos: {
    id: 'laos',
    code: 'LA',
    nameVi: 'Lào',
    nameEn: 'Laos',
    flag: '🇱🇦',
    capital: 'Viêng Chăn (Vientiane)',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 7,5 triệu người',
    populationNum: 7.5,
    area: '236.800 km²',
    areaNum: 237,
    language: 'Tiếng Lào',
    climate: 'Nhiệt đới gió mùa, có mùa mưa và mùa khô rõ rệt',
    currency: 'Kip Lào (LAK)',
    shortDescription: 'Đất nước Triệu Voi láng giềng thân thiết của Việt Nam, nổi tiếng với cố đô Luang Prabang yên bình, tháp That Luang vàng óng và điệu múa Lăm-vông.',
    lat: 19.8563,
    lng: 102.4955,
    altitude: 1.8,
    color: '#fbbf24',
    isVietnamNeighbor: true,
    isSoutheastAsia: true,
    neighborBorderDetail: 'Có chung đường biên giới đất liền dài nhất với Việt Nam (khoảng 2.169 km) ở phía Tây.',
    relativeDirectionFromVietnam: 'Phía Tây',
    natureHighlights: [
      'Dòng sông Mê Kông uốn lượn chảy dọc chiều dài đất nước tạo nên vùng 4.000 đảo Si Phan Don.',
      'Thác Kuang Si với nhiều tầng nước màu xanh ngọc bích mát lạnh giữa rừng già.',
      'Cao nguyên Xiêng Khoảng trù phú và những dãy núi đá vôi hùng vĩ.'
    ],
    cultureHighlights: [
      'Tháp Pha That Luang dát vàng - biểu tượng văn hóa Phật giáo của đất nước Lào.',
      'Nghi lễ khất thực sáng sớm thanh tịnh tại cố đô Luang Prabang.',
      'Lễ hội té nước Bunpimay mừng năm mới và hoa Chăm-pa thơm ngát.'
    ],
    foodHighlights: [
      'Lạp (Laap) - món gỏi thịt băm trộn thính gạo và rau thơm thanh vị.',
      'Xôi nếp dẻo thơm đựng trong giỏ tre nhỏ (Khao Niew).',
      'Tam Mak Houng - gỏi đu đủ giòn cay đậm đà.'
    ],
    funFacts: [
      'Lào là quốc gia duy nhất ở Đông Nam Á hoàn toàn không giáp biển.',
      'Đất nước này từng mang tên cổ "Vương quốc Vạn Tượng" (Đất nước Triệu Voi).',
      'Cánh đồng Chum bí ẩn ở Xiêng Khoảng có hàng ngàn chiếc chum đá khổng lồ ngàn năm tuổi.'
    ],
    landmarks: [
      { name: 'Tháp Pha That Luang', description: 'Biểu tượng quốc gia linh thiêng dát vàng tại Viêng Chăn' },
      { name: 'Cố đô Luang Prabang', description: 'Di sản thế giới cổ kính bên bờ sông Mê Kông' },
      { name: 'Khải hoàn môn Patuxay', description: 'Tượng đài chiến thắng mang nét kiến trúc Lào độc đáo' }
    ]
  },
  cambodia: {
    id: 'cambodia',
    code: 'KH',
    nameVi: 'Campuchia',
    nameEn: 'Cambodia',
    flag: '🇰🇭',
    capital: 'Phnôm Pênh (Phnom Penh)',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 17 triệu người',
    populationNum: 17,
    area: '181.035 km²',
    areaNum: 181,
    language: 'Tiếng Khmer',
    climate: 'Nhiệt đới gió mùa nóng ẩm quanh năm',
    currency: 'Riel Campuchia (KHR)',
    shortDescription: 'Xứ sở Chùa Tháp huyền bí, nơi có quần thể đền Angkor Wat vĩ đại, hồ Tonlé Sap rộng lớn và điệu múa Apsara cổ điển quyến rũ.',
    lat: 12.5657,
    lng: 104.991,
    altitude: 1.8,
    color: '#38bdf8',
    isVietnamNeighbor: true,
    isSoutheastAsia: true,
    neighborBorderDetail: 'Có chung đường biên giới đất liền dài khoảng 1.258 km ở phía Tây Nam với Việt Nam.',
    relativeDirectionFromVietnam: 'Phía Tây Nam',
    natureHighlights: [
      'Biển Hồ Tonlé Sap - hồ nước ngọt lớn nhất Đông Nam Á với hệ sinh thái cá trù phú.',
      'Dãy núi Đậu Khấu (Cardamom) với rừng nhiệt đới nguyên sinh hoang dã.',
      'Bờ biển Sihanoukville và những hòn đảo hoang sơ rợp bóng dừa.'
    ],
    cultureHighlights: [
      'Quần thể đền Angkor Wat - di tích tôn giáo lớn nhất thế giới bằng đá sa thạch.',
      'Đền Bayon kỳ bí với hàng trăm nụ cười bằng đá trầm mặc.',
      'Điệu múa cổ điển Hoàng gia Apsara với những động tác tay uyển chuyển.'
    ],
    foodHighlights: [
      'Amok cá hấp nước cốt dừa và lá chuối béo ngậy.',
      'Hủ tiếu Nam Vang (Kuy Teav) nước dùng xương hầm ngọt thanh.',
      'Côn trùng chiên giòn rụm - món ăn đường phố độc đáo.'
    ],
    funFacts: [
      'Angkor Wat là công trình tôn giáo duy nhất được in trực tiếp lên quốc kỳ của một quốc gia.',
      'Biển Hồ Tonlé Sap có hiện tượng dòng nước đổi chiều chảy ngược vào mùa lũ rất kỳ lạ.',
      'Chữ Khmer có bảng chữ cái dài nhất thế giới với 74 ký tự!'
    ],
    landmarks: [
      { name: 'Quần thể Angkor Wat', description: 'Kiệt tác kiến trúc đền tháp đá vĩ đại nhất Đông Nam Á' },
      { name: 'Đền Ta Prohm', description: 'Ngôi đền cổ huyền bí bị rễ cây cổ thụ khổng lồ bao trùm' },
      { name: 'Cung điện Hoàng gia Campuchia', description: 'Hoàng cung nguy nga với Chùa Bạc lát hàng ngàn viên bạc' }
    ]
  },
  argentina: {
    id: 'argentina',
    code: 'AR',
    nameVi: 'Argentina',
    nameEn: 'Argentina',
    flag: '🇦🇷',
    capital: 'Buenos Aires',
    continent: 'Nam Mỹ',
    continentId: 'south_america',
    population: 'Khoảng 46 triệu người',
    populationNum: 46,
    area: '2.780.400 km²',
    areaNum: 2780,
    language: 'Tiếng Tây Ban Nha',
    climate: 'Từ cận nhiệt đới phía bắc đến ôn đới và hàn đới băng giá phía cực nam',
    currency: 'Peso Argentina (ARS)',
    shortDescription: 'Xứ sở vũ điệu Tango say đắm, quê hương của những danh thủ bóng đá huyền thoại, vùng thảo nguyên Pampas bao la và sông băng Perito Moreno kỳ vĩ.',
    lat: -38.4161,
    lng: -63.6167,
    altitude: 2.1,
    color: '#38bdf8',
    natureHighlights: [
      'Sông băng Perito Moreno ở Patagonia với những bức tường băng xanh ngọc khổng lồ.',
      'Đỉnh Aconcagua (6.961m) thuộc dãy Andes - đỉnh núi cao nhất châu Mỹ.',
      'Thảo nguyên Pampas mênh mông nơi những chàng cao bồi Gaucho chăn thả đàn bò.'
    ],
    cultureHighlights: [
      'Vũ điệu Tango nồng nàn bắt nguồn từ các khu phố cảng Buenos Aires.',
      'Niềm đam mê bóng đá bất tận với các huyền thoại Maradona và Lionel Messi.',
      'Uống trà thảo mộc Yerba Mate cùng người thân trong bình bầu bằng ống hút kim loại.'
    ],
    foodHighlights: [
      'Thịt bò nướng Asado truyền thống đậm vị mọng nước.',
      'Bánh gối nướng Empanadas nhân thịt băm thơm lừng.',
      'Kẹo sữa dẻo ngọt Dulce de Leche nổi tiếng.'
    ],
    funFacts: [
      'Thành phố Ushuaia ở miền nam Argentina được coi là "Thành phố tận cùng thế giới" - nơi gần Nam Cực nhất có người sinh sống.',
      'Argentina có đỉnh núi cao nhất châu Mỹ (Aconcagua) và vùng trũng sâu nhất Nam Mỹ (Laguna del Carbón).',
      'Đội tuyển bóng đá Argentina đã 3 lần đăng quang ngôi vô địch thế giới World Cup.'
    ],
    landmarks: [
      { name: 'Sông băng Perito Moreno', description: 'Bức tường băng khổng lồ xanh ngắt ngoạn mục tại Patagonia' },
      { name: 'Thác Iguazu phía Argentina', description: 'Khu vực họng quỷ Garganta del Diablo nước đổ dữ dội' },
      { name: 'Khu phố rực rỡ La Boca', description: 'Những ngôi nhà sơn nhiều màu sắc rực rỡ và các nghệ sĩ nhảy Tango' }
    ]
  }
};

export const COUNTRIES_DATA: Record<string, CountryData> = {
  ...BASE_COUNTRIES_DATA,
  ...EXTENDED_COUNTRIES_DATA,
  ...EXTENDED_COUNTRIES_DATA_2
};

export const DEFAULT_COUNTRY_DATA: CountryData = {
  id: 'unknown',
  code: 'UN',
  nameVi: 'Quốc gia trên Trái Đất',
  nameEn: 'World Country',
  flag: '🌍',
  capital: 'Đang cập nhật',
  continent: 'Trái Đất',
  continentId: 'asia',
  population: 'Đang cập nhật',
  populationNum: 0,
  area: 'Đang cập nhật',
  areaNum: 0,
  language: 'Đang cập nhật',
  climate: 'Đang cập nhật',
  currency: 'Đang cập nhật',
  shortDescription: 'Thông tin chi tiết về quốc gia này đang được cập nhật.',
  lat: 0,
  lng: 0,
  altitude: 1.8,
  natureHighlights: ['Thông tin chi tiết về quốc gia này đang được cập nhật.'],
  cultureHighlights: ['Thông tin chi tiết về quốc gia này đang được cập nhật.'],
  foodHighlights: ['Thông tin chi tiết về quốc gia này đang được cập nhật.'],
  funFacts: ['Thông tin chi tiết về quốc gia này đang được cập nhật.'],
  landmarks: []
};

export const VIETNAM_COORDINATES = {
  lat: 14.0583,
  lng: 108.2772,
  altitude: 1.85
};
