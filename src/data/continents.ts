import { ContinentData } from '../types';

export const CONTINENTS_DATA: Record<string, ContinentData> = {
  asia: {
    id: 'asia',
    nameVi: 'Châu Á',
    nameEn: 'Asia',
    icon: '🌏',
    lat: 34.0479,
    lng: 100.6197,
    altitude: 2.3,
    area: '44,58 triệu km²',
    population: 'Hơn 4,7 tỷ người (đông dân nhất)',
    countryCount: 48,
    color: '#fbbf24',
    description: 'Châu lục lớn nhất và đông dân nhất hành tinh, cái nôi của nhiều nền văn minh cổ đại rực rỡ và có đỉnh núi Everest cao nhất thế giới.',
    highlights: [
      'Có nóc nhà thế giới: Đỉnh Everest (8.848m) thuộc dãy Himalaya.',
      'Chiếm 30% diện tích đất liền và gần 60% dân số toàn thế giới.',
      'Việt Nam chúng ta nằm ở khu vực Đông Nam Á thuộc châu Á.',
      'Có cả những sa mạc khô cằn (Gobi, Ả Rập) lẫn rừng mưa nhiệt đới trù phú.'
    ],
    representativeCountries: ['vietnam', 'japan', 'china', 'south_korea', 'thailand', 'singapore', 'indonesia', 'malaysia', 'philippines', 'india', 'saudi_arabia', 'uae', 'turkey', 'mongolia', 'nepal', 'laos', 'cambodia', 'myanmar', 'brunei']
  },
  europe: {
    id: 'europe',
    nameVi: 'Châu Âu',
    nameEn: 'Europe',
    icon: '🌍',
    lat: 54.526,
    lng: 15.2551,
    altitude: 2.0,
    area: '10,18 triệu km²',
    population: 'Khoảng 750 triệu người',
    countryCount: 44,
    color: '#60a5fa',
    description: 'Châu lục có nền văn hóa lâu đời với những lâu đài cổ tích nguy nga, bảo tàng nghệ thuật danh tiếng và nền khoa học hiện đại phát triển.',
    highlights: [
      'Được mệnh danh là "Lục địa già" với nhiều di sản lịch sử kiến trúc.',
      'Có dãy núi Alps tuyết trắng tuyệt đẹp chảy qua nhiều quốc gia.',
      'Hầu hết các nước châu Âu sử dụng chung đồng tiền Euro.',
      'Nơi diễn ra nhiều cuộc cách mạng công nghiệp làm thay đổi thế giới.'
    ],
    representativeCountries: ['france', 'united_kingdom', 'germany', 'italy', 'spain', 'netherlands', 'switzerland', 'greece', 'sweden', 'norway', 'russia']
  },
  africa: {
    id: 'africa',
    nameVi: 'Châu Phi',
    nameEn: 'Africa',
    icon: '🌍',
    lat: 1.6508,
    lng: 17.6791,
    altitude: 2.3,
    area: '30,37 triệu km²',
    population: 'Hơn 1,4 tỷ người',
    countryCount: 54,
    color: '#f97316',
    description: 'Vùng đất của sa mạc cát vàng Sahara bao la, dòng sông Nile dài nhất hành tinh và những thảo nguyên Savanna trù phú động vật hoang dã.',
    highlights: [
      'Có sa mạc nhiệt đới lớn nhất: Sa mạc Sahara cát vàng mênh mông.',
      'Có dòng sông Nile (6.650 km) dài nhất thế giới.',
      'Thiên đường của các loài động vật hoang dã như Sư tử, Voi châu Phi, Hươu cao cổ.',
      'Châu lục có số lượng quốc gia nhiều nhất trên thế giới (54 nước).'
    ],
    representativeCountries: ['egypt', 'south_africa', 'kenya', 'madagascar', 'morocco', 'tanzania']
  },
  north_america: {
    id: 'north_america',
    nameVi: 'Bắc Mỹ',
    nameEn: 'North America',
    icon: '🌎',
    lat: 44.5886,
    lng: -101.3468,
    altitude: 2.3,
    area: '24,71 triệu km²',
    population: 'Khoảng 590 triệu người',
    countryCount: 23,
    color: '#34d399',
    description: 'Châu lục trù phú với nền kinh tế khoa học kỹ thuật hàng đầu, những hồ nước ngọt khổng lồ, dãy núi Rockies và hẻm núi Grand Canyon kỳ vĩ.',
    highlights: [
      'Có hệ thống 5 Hồ Lớn (Great Lakes) chứa lượng nước ngọt khổng lồ.',
      'Quốc gia Canada có đường bờ biển dài nhất thế giới.',
      'Nơi hội tụ nền kinh tế mạnh nhất hành tinh và công nghệ không gian hiện đại.',
      'Thác nước Niagara ngoạn mục nối giữa hai quốc gia Mỹ và Canada.'
    ],
    representativeCountries: ['united_states', 'canada', 'mexico', 'cuba']
  },
  south_america: {
    id: 'south_america',
    nameVi: 'Nam Mỹ',
    nameEn: 'South America',
    icon: '🌎',
    lat: -14.6048,
    lng: -57.6562,
    altitude: 2.3,
    area: '17,84 triệu km²',
    population: 'Khoảng 430 triệu người',
    countryCount: 12,
    color: '#a78bfa',
    description: 'Châu lục của rừng mưa nhiệt đới Amazon bạt ngàn, dãy núi dài nhất thế giới Andes và những lễ hội vũ điệu Latinh tưng bừng sắc màu.',
    highlights: [
      'Rừng mưa Amazon được ví như "Lá phổi xanh của Trái Đất".',
      'Dãy núi Andes dài nhất thế giới trên đất liền (hơn 7.000 km).',
      'Thác nước Angel ở Venezuela là thác nước đổ tự do cao nhất thế giới (979m).',
      'Cái nôi của những vũ điệu Samba và Tango quyến rũ.'
    ],
    representativeCountries: ['brazil', 'argentina', 'peru', 'chile', 'colombia']
  },
  oceania: {
    id: 'oceania',
    nameVi: 'Châu Đại Dương',
    nameEn: 'Oceania',
    icon: '🌏',
    lat: -22.7359,
    lng: 140.0188,
    altitude: 2.2,
    area: '8,52 triệu km²',
    population: 'Khoảng 45 triệu người',
    countryCount: 14,
    color: '#38bdf8',
    description: 'Châu lục nhỏ nhất bao gồm lục địa Australia và hàng ngàn hòn đảo thiên đường san hô rải rác giữa lòng Thái Bình Dương bao la.',
    highlights: [
      'Châu lục có diện tích đất liền nhỏ nhất nhưng diện tích biển bao la nhất.',
      'Có rạn san hô Great Barrier Reef lớn nhất hành tinh.',
      'Quê hương độc nhất vô nhị của loài chuột túi Kangaroo và gấu túi Koala.',
      'Bao gồm các đảo quốc tuyệt đẹp như New Zealand, Fiji, Samoa.'
    ],
    representativeCountries: ['australia', 'new_zealand']
  },
  antarctica: {
    id: 'antarctica',
    nameVi: 'Châu Nam Cực',
    nameEn: 'Antarctica',
    icon: '❄️',
    lat: -82.8628,
    lng: 135.0,
    altitude: 2.3,
    area: '14,2 triệu km²',
    population: 'Chỉ có các nhà khoa học nghiên cứu (1.000 - 4.000 người)',
    countryCount: 0,
    color: '#e2e8f0',
    description: 'Châu lục lạnh nhất, nhiều gió bão nhất và khô hạn nhất thế giới, được bao phủ bởi lớp băng dày hàng ngàn mét và ngôi nhà của loài chim cánh cụt Hoàng đế.',
    highlights: [
      'Lớp băng tuyết ở đây chiếm tới 90% lượng băng tuyết trên toàn Trái Đất.',
      'Nhiệt độ thấp nhất từng đo được tại đây là -89,2°C!',
      'Không có cư dân bản địa sinh sống cố định, chỉ có các trạm nghiên cứu khoa học quốc tế.',
      'Vương quốc của hàng triệu chú chim cánh cụt Hoàng đế dũng cảm.'
    ],
    representativeCountries: []
  }
};
