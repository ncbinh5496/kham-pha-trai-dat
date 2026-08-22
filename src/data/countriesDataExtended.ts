import { CountryData } from '../types';

export const EXTENDED_COUNTRIES_DATA: Record<string, CountryData> = {
  // === ĐÔNG NAM Á & CHÂU Á ===
  indonesia: {
    id: 'indonesia',
    code: 'ID',
    nameVi: 'Indonesia',
    nameEn: 'Indonesia',
    flag: '🇮🇩',
    capital: 'Jakarta (Nusantara)',
    continent: 'Châu Á',
    continentId: 'asia',
    isSoutheastAsia: true,
    relativeDirectionFromVietnam: 'Phía Nam',
    population: 'Khoảng 278 triệu người',
    populationNum: 278,
    area: '1.904.569 km²',
    areaNum: 1905,
    language: 'Tiếng Indonesia (Bahasa)',
    climate: 'Nhiệt đới xích đạo ẩm, rừng mưa xanh tốt quanh năm',
    currency: 'Rupiah Indonesia (IDR)',
    shortDescription: 'Quốc gia vạn đảo lớn nhất thế giới, xứ sở của loài rồng Komodo thời tiền sử, đền thiêng Borobudur cổ kính và những ngọn núi lửa kỳ ảo.',
    lat: -0.7893,
    lng: 113.9213,
    altitude: 2.0,
    color: '#ef4444',
    natureHighlights: [
      'Núi lửa Bromo với khung cảnh huyền ảo tựa bề mặt Mặt Trăng.',
      'Vườn quốc gia Komodo - nơi sinh sống của loài thằn lằn lớn nhất hành tinh.',
      'Đảo ngọc thiên đường Bali với những bãi biển cát trắng tuyệt mỹ.'
    ],
    cultureHighlights: [
      'Đền tháp Phật giáo Borobudur lớn nhất thế giới xây bằng đá núi lửa.',
      'Nghệ thuật nhuộm vải sáp Batik được UNESCO vinh danh.',
      'Múa rối bóng Wayang Kulit truyền thống cổ xưa.'
    ],
    foodHighlights: [
      'Cơm chiên Nasi Goreng đậm đà gia vị.',
      'Thịt nướng xiên que Satay chấm sốt đậu phộng béo ngậy.',
      'Thịt bò hầm Rendang cay nồng thơm mùi thảo mộc.'
    ],
    funFacts: [
      'Indonesia có hơn 17.500 hòn đảo lớn nhỏ hợp thành!',
      'Rồng Komodo có thể dài tới 3 mét và nặng hơn 70 kg.',
      'Nơi đây có loài hoa xác thối Rafflesia arnoldii - bông hoa đơn lẻ lớn nhất thế giới.'
    ],
    landmarks: [
      { name: 'Đền Borobudur', description: 'Kỳ quan đền tháp Phật giáo cổ đại vĩ đại tại đảo Java' },
      { name: 'Núi lửa Bromo', description: 'Ngọn núi lửa hoạt động hùng vĩ giữa biển cát mù sương' },
      { name: 'Đền Tanah Lot Bali', description: 'Ngôi đền linh thiêng tọa lạc trên mỏm đá giữa sóng biển' }
    ]
  },
  malaysia: {
    id: 'malaysia',
    code: 'MY',
    nameVi: 'Malaysia',
    nameEn: 'Malaysia',
    flag: '🇲🇾',
    capital: 'Kuala Lumpur',
    continent: 'Châu Á',
    continentId: 'asia',
    isSoutheastAsia: true,
    relativeDirectionFromVietnam: 'Phía Nam',
    population: 'Khoảng 34 triệu người',
    populationNum: 34,
    area: '330.803 km²',
    areaNum: 331,
    language: 'Tiếng Mã Lai (Bahasa Melayu), Tiếng Anh',
    climate: 'Nhiệt đới xích đạo, nóng ẩm và mưa nhiều quanh năm',
    currency: 'Ringgit Malaysia (MYR)',
    shortDescription: 'Đất nước Đông Nam Á hiện đại, nổi bật với tháp đôi Petronas chọc trời, hang động Batu rực rỡ và những cánh rừng nhiệt đới cổ xưa.',
    lat: 4.2105,
    lng: 101.9758,
    altitude: 1.8,
    color: '#0284c7',
    natureHighlights: [
      'Rừng nhiệt đới Taman Negara hơn 130 triệu năm tuổi cổ xưa hơn cả rừng Amazon.',
      'Đỉnh núi Kinabalu (4.095m) - đỉnh núi cao nhất quần đảo Mã Lai.',
      'Quần đảo Langkawi với biển xanh và hệ sinh thái rừng ngập mặn kỳ thú.'
    ],
    cultureHighlights: [
      'Tháp đôi Petronas từng là tòa tháp đôi cao nhất thế giới.',
      'Hang động Batu với tượng thần Murugan khổng lồ dát vàng rực rỡ.',
      'Sự hòa hợp văn hóa độc đáo giữa người Mã Lai, người Hoa và người Ấn.'
    ],
    foodHighlights: [
      'Cơm Nasi Lemak nấu nước cốt dừa thơm béo ăn cùng ớt sambal.',
      'Bánh mì dẹt Roti Canai chấm cà ri thơm lừng.',
      'Mì xào cay Laksa nước dùng chua cay đặc sắc.'
    ],
    funFacts: [
      'Malaysia có cây cầu treo bắc qua tán rừng Taman Negara dài hơn 530 mét.',
      'Đồng hồ trên tháp Sultan Abdul Samad được ví như tháp Big Ben của Đông Nam Á.',
      'Quả sầu riêng Musang King ngon nức tiếng có nguồn gốc từ Malaysia.'
    ],
    landmarks: [
      { name: 'Tháp đôi Petronas', description: 'Kiệt tác kiến trúc thép đôi hiện đại tại thủ đô Kuala Lumpur' },
      { name: 'Động Batu', description: 'Quần thể hang động đền thờ Ấn Độ giáo với 272 bậc thang rực rỡ' },
      { name: 'Cố đô cổ George Town (Penang)', description: 'Di sản UNESCO với những bức tranh tường nghệ thuật sống động' }
    ]
  },
  philippines: {
    id: 'philippines',
    code: 'PH',
    nameVi: 'Philippines',
    nameEn: 'Philippines',
    flag: '🇵🇭',
    capital: 'Manila',
    continent: 'Châu Á',
    continentId: 'asia',
    isSoutheastAsia: true,
    relativeDirectionFromVietnam: 'Phía Đông',
    population: 'Khoảng 117 triệu người',
    populationNum: 117,
    area: '300.000 km²',
    areaNum: 300,
    language: 'Tiếng Filipino (Tagalog), Tiếng Anh',
    climate: 'Nhiệt đới hải dương, ấm áp quanh năm và có mùa bão nhiệt đới',
    currency: 'Peso Philippines (PHP)',
    shortDescription: 'Quần đảo hơn 7.600 hòn đảo ngọc, nơi có những ngọn Đồi Socola kỳ lạ, rạn san hô Tubbataha rực rỡ và xe Jeepney đầy màu sắc.',
    lat: 12.8797,
    lng: 121.774,
    altitude: 1.8,
    color: '#eab308',
    natureHighlights: [
      'Đồi Socola (Chocolate Hills) ở Bohol với hơn 1.200 ngọn đồi cỏ đổi màu nâu vào mùa khô.',
      'Sông ngầm Puerto Princesa - một trong 7 kỳ quan thiên nhiên mới của thế giới.',
      'Bãi biển Boracay cát trắng mịn như bột tuyết.'
    ],
    cultureHighlights: [
      'Xe buýt Jeepney trang trí sặc sỡ trên khắp các nẻo đường.',
      'Ruộng bậc thang Banaue do người bản địa Ifugao tạc vào núi suốt 2.000 năm.',
      'Lễ hội Sinulog tưng bừng với âm nhạc và trang phục rực rỡ.'
    ],
    foodHighlights: [
      'Thịt kho Adobo ướp giấm tỏi đậm đà.',
      'Heo sữa quay Lechon da giòn rụm đãi tiệc.',
      'Chè đá bào Halo-Halo nhiều màu sắc mát lạnh giải nhiệt.'
    ],
    funFacts: [
      'Philippines có loài khỉ Tarsier tí hon chỉ nhỏ bằng nắm tay với đôi mắt tròn xoe.',
      'Đất nước này gồm hơn 7.640 hòn đảo nhiệt đới xinh đẹp.',
      'Philippines là một trong những quốc gia nói tiếng Anh lưu loát nhất châu Á.'
    ],
    landmarks: [
      { name: 'Đồi Socola Bohol', description: 'Kỳ quan địa chất tự nhiên với hàng ngàn quả đồi tròn đều tăm tắp' },
      { name: 'Ruộng bậc thang Banaue', description: 'Kỳ quan nông nghiệp bậc thang cổ xưa giữa núi non' },
      { name: 'Thành cổ Intramuros', description: 'Khu thành đá cổ kính thời thuộc địa Tây Ban Nha tại Manila' }
    ]
  },
  myanmar: {
    id: 'myanmar',
    code: 'MM',
    nameVi: 'Myanmar',
    nameEn: 'Myanmar',
    flag: '🇲🇲',
    capital: 'Naypyidaw',
    continent: 'Châu Á',
    continentId: 'asia',
    isSoutheastAsia: true,
    relativeDirectionFromVietnam: 'Phía Tây Bắc',
    population: 'Khoảng 55 triệu người',
    populationNum: 55,
    area: '676.578 km²',
    areaNum: 677,
    language: 'Tiếng Myanmar (Miến Điện)',
    climate: 'Nhiệt đới gió mùa, có mùa mưa và mùa khô mát mẻ',
    currency: 'Kyat Myanmar (MMK)',
    shortDescription: 'Xứ sở vạn chùa vàng linh thiêng, nổi danh với cố đô Bagan cổ kính rợp bóng khinh khí cầu, hồ Inle thanh bình và chùa Shwedagon dát vàng rực rỡ.',
    lat: 21.9162,
    lng: 95.956,
    altitude: 1.9,
    color: '#f59e0b',
    natureHighlights: [
      'Hồ Inle rộng lớn nơi ngư dân Intha chèo thuyền độc mộc bằng một chân độc đáo.',
      'Sông Ayeyarwady hùng vĩ nuôi dưỡng loài cá heo nước ngọt thông minh.',
      'Hòn đá vàng Kyaiktiyo chênh vênh trên vách núi kỳ diệu.'
    ],
    cultureHighlights: [
      'Chùa vàng Shwedagon dát hàng chục tấn vàng và đính hàng ngàn viên kim cương.',
      'Cố đô Bagan với hơn 2.000 ngôi chùa tháp gạch nung cổ kính giữa đồng bằng.',
      'Phong tục bôi bột Thanakha mát lành lên má để chống nắng và làm đẹp.'
    ],
    foodHighlights: [
      'Mì cá Mohinga - món ăn sáng quốc hồn quốc túy nấu từ cá và chuối non.',
      'Salad lá trà lên men Lahpet Thoke bùi bùi giòn rụm.',
      'Cơm Shan thơm nồng nghệ vàng ăn kèm cá khô.'
    ],
    funFacts: [
      'Cố đô Bagan từng có hơn 10.000 ngôi đền chùa Phật giáo được xây dựng từ thế kỷ 11.',
      'Người dân Myanmar thường mặc trang phục váy quấn truyền thống gọi là Longyi.',
      'Chùa Vàng Shwedagon cao 99 mét và được cho là đã tồn tại hơn 2.500 năm.'
    ],
    landmarks: [
      { name: 'Chùa Vàng Shwedagon', description: 'Ngôi chùa linh thiêng dát vàng lộng lẫy bậc nhất thế giới' },
      { name: 'Thung lũng đền tháp Bagan', description: 'Vùng đất huyền thoại với hàng ngàn bảo tháp cổ kính đón bình minh' },
      { name: 'Chùa Đá Vàng Kyaiktiyo', description: 'Tảng đá phủ vàng đứng cheo leo mép vực núi thiêng' }
    ]
  },
  brunei: {
    id: 'brunei',
    code: 'BN',
    nameVi: 'Brunei',
    nameEn: 'Brunei',
    flag: '🇧🇳',
    capital: 'Bandar Seri Begawan',
    continent: 'Châu Á',
    continentId: 'asia',
    isSoutheastAsia: true,
    relativeDirectionFromVietnam: 'Phía Đông Nam',
    population: 'Khoảng 450 ngàn người',
    populationNum: 0.45,
    area: '5.765 km²',
    areaNum: 5.8,
    language: 'Tiếng Mã Lai, Tiếng Anh',
    climate: 'Nhiệt đới xích đạo, ấm áp và mưa nhiều',
    currency: 'Đô la Brunei (BND)',
    shortDescription: 'Vương quốc thanh bình và giàu có trên đảo Borneo, nổi tiếng với cung điện hoàng gia mạ vàng tráng lệ và làng nổi Kampong Ayer lâu đời.',
    lat: 4.5353,
    lng: 114.7277,
    altitude: 1.8,
    color: '#eab308',
    natureHighlights: [
      'Vườn quốc gia Ulu Temburong với rừng nhiệt đới nguyên sinh được bảo tồn gần như nguyên vẹn.',
      'Cầu đi bộ trên ngọn cây (Canopy Walkway) ngắm nhìn toàn cảnh rừng già từ trên cao.',
      'Hệ động thực vật phong phú với loài khỉ mũi dài Proboscis độc đáo.'
    ],
    cultureHighlights: [
      'Cung điện Hoàng gia Istana Nurul Iman - cung điện có người ở lớn nhất thế giới.',
      'Thánh đường Hồi giáo Omar Ali Saifuddien nguy nga với mái vòm dát vàng ròng.',
      'Làng nổi Kampong Ayer được ví như "Venice của phương Đông".'
    ],
    foodHighlights: [
      'Ambuyat - món ăn truyền thống dẻo quánh từ bột cọ sago chấm sốt cay.',
      'Bánh bao nướng Kelupis gói lá chuối thơm lừng.',
      'Cơm gà Nasi Katok sốt cay ngọt đường phố nổi tiếng.'
    ],
    funFacts: [
      'Cung điện nhà vua Brunei có gần 1.800 phòng và 257 phòng tắm!',
      'Brunei không thu thuế thu nhập cá nhân và miễn phí y tế, giáo dục cho người dân.',
      'Hơn 70% diện tích Brunei vẫn được che phủ bởi rừng rậm nhiệt đới nguyên sinh.'
    ],
    landmarks: [
      { name: 'Thánh đường Omar Ali Saifuddien', description: 'Nhà thờ Hồi giáo lộng lẫy soi bóng bên hồ nước nhân tạo' },
      { name: 'Làng nổi Kampong Ayer', description: 'Ngôi làng nhà sàn trên mặt nước lớn nhất thế giới' },
      { name: 'Vườn quốc gia Ulu Temburong', description: 'Viên ngọc xanh sinh thái giữa lòng Borneo' }
    ]
  },
  mongolia: {
    id: 'mongolia',
    code: 'MN',
    nameVi: 'Mông Cổ',
    nameEn: 'Mongolia',
    flag: '🇲🇳',
    capital: 'Ulaanbaatar',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 3,4 triệu người',
    populationNum: 3.4,
    area: '1.564.116 km²',
    areaNum: 1564,
    language: 'Tiếng Mông Cổ',
    climate: 'Lục địa khắc nghiệt, mùa đông cực lạnh tuyết trắng, mùa hè ấm áp',
    currency: 'Tugrik Mông Cổ (MNT)',
    shortDescription: 'Xứ sở của bầu trời xanh bất tận và thảo nguyên bao la, nơi những kỵ sĩ du mục chăn thả ngựa hoang và sinh sống trong những chiếc lều Ger ấm cúng.',
    lat: 46.8625,
    lng: 103.8467,
    altitude: 2.1,
    color: '#38bdf8',
    natureHighlights: [
      'Thảo nguyên Mông Cổ mênh mông bát ngát chạy dài tới tận chân trời.',
      'Sa mạc Gobi với những đồi cát biết hát và là mỏ hóa thạch khủng long lớn nhất thế giới.',
      'Hồ Khövsgöl trong vắt chứa lượng nước ngọt khổng lồ.'
    ],
    cultureHighlights: [
      'Lối sống du mục truyền thống cùng những túp lều tròn Ger bằng nỉ ấm áp.',
      'Lễ hội Naadam tưng bừng với 3 môn thể thao truyền thống: Đua ngựa, Bắn cung và Đấu vật.',
      'Nghệ thuật hát xướng âm Khöömii độc đáo phát ra hai âm thanh cùng lúc.'
    ],
    foodHighlights: [
      'Bánh bao hấp Buuz nhân thịt cừu thơm béo nóng hổi.',
      'Sữa ngựa lên men Airag - thức uống truyền thống bổ dưỡng.',
      'Thịt cừu nướng đá nóng Khorkhog thơm lừng.'
    ],
    funFacts: [
      'Mông Cổ là quốc gia có mật độ dân số thưa thớt nhất trên thế giới.',
      'Số lượng ngựa và gia súc ở Mông Cổ nhiều gấp nhiều lần dân số con người!',
      'Nơi đây được mệnh danh là "Vùng đất của bầu trời xanh" vì có hơn 250 ngày nắng mỗi năm.'
    ],
    landmarks: [
      { name: 'Tượng Thành Cát Tư Hãn', description: 'Bức tượng kỵ sĩ cưỡi ngựa bằng thép khổng lồ cao 40m' },
      { name: 'Sa mạc Gobi', description: 'Vùng sa mạc huyền bí nơi tìm thấy vô số trứng khủng long hóa thạch' },
      { name: 'Vườn quốc gia Terelj', description: 'Thung lũng đá và đồng cỏ xanh tuyệt mỹ của người du mục' }
    ]
  },
  saudi_arabia: {
    id: 'saudi_arabia',
    code: 'SA',
    nameVi: 'Ả Rập Xê Út',
    nameEn: 'Saudi Arabia',
    flag: '🇸🇦',
    capital: 'Riyadh',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 36 triệu người',
    populationNum: 36,
    area: '2.149.690 km²',
    areaNum: 2150,
    language: 'Tiếng Ả Rập',
    climate: 'Sa mạc khô nóng, ban ngày nắng gắt, ban đêm mát lạnh',
    currency: 'Riyal Ả Rập Xê Út (SAR)',
    shortDescription: 'Vương quốc sa mạc giàu có ở Tây Á, trung tâm của thế giới Hồi giáo với thánh địa Mecca linh thiêng và ốc đảo cây chà là xanh ngát.',
    lat: 23.8859,
    lng: 45.0792,
    altitude: 2.0,
    color: '#10b981',
    natureHighlights: [
      'Sa mạc Rub al-Khali (Vùng Trống) - biển cát liền mạch lớn nhất thế giới.',
      'Ốc đảo Al-Ahsa rợp bóng hơn 2,5 triệu cây cọ chà là di sản UNESCO.',
      'Vùng núi Asir xanh mát quanh năm ở phía tây nam.'
    ],
    cultureHighlights: [
      'Thánh địa Mecca và Medina - nơi hàng triệu người hành hương mỗi năm.',
      'Thành phố cổ Hegra (Al-Ula) đẽo thẳng vào vách đá sa thạch khổng lồ.',
      'Trang phục truyền thống áo choàng Thobe trắng và khăn trùm đầu Ghutra.'
    ],
    foodHighlights: [
      'Cơm Kabsa - cơm gia vị nấu cùng thịt cừu hoặc gà và các loại hạt rang.',
      'Quả chà là ngọt bùi thưởng thức cùng cà phê Ả Rập pha thảo quả.',
      'Bánh mì dẹp nướng thơm ăn cùng sốt đậu gà Hummus.'
    ],
    funFacts: [
      'Ả Rập Xê Út là quốc gia không có bất kỳ dòng sông tự nhiên nào chảy qua quanh năm!',
      'Nước này sở hữu một trong những mỏ dầu mỏ lớn nhất hành tinh.',
      'Lạc đà một bướu là người bạn đồng hành thân thiết của cư dân sa mạc từ ngàn xưa.'
    ],
    landmarks: [
      { name: 'Thánh địa Kaaba tại Mecca', description: 'Ngôi nhà thiêng trung tâm hướng về của tín đồ Hồi giáo toàn cầu' },
      { name: 'Thành phố đá cổ Al-Ula (Hegra)', description: 'Những lăng mộ cổ đại kỳ vĩ tạc sâu vào vách núi sa mạc' },
      { name: 'Tháp Kingdom Centre', description: 'Tòa nhà chọc trời hiện đại hình cây mở nắp chai tại Riyadh' }
    ]
  },
  uae: {
    id: 'uae',
    code: 'AE',
    nameVi: 'Các Tiểu Vương quốc Ả Rập Thống nhất (UAE)',
    nameEn: 'United Arab Emirates',
    flag: '🇦🇪',
    capital: 'Abu Dhabi',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 10 triệu người',
    populationNum: 10,
    area: '83.600 km²',
    areaNum: 84,
    language: 'Tiếng Ả Rập, Tiếng Anh',
    climate: 'Sa mạc cận nhiệt đới, nhiều nắng ấm quanh năm',
    currency: 'Dirham UAE (AED)',
    shortDescription: 'Vương quốc tương lai giữa sa mạc, nổi tiếng với tòa tháp cao nhất thế giới Burj Khalifa, đảo nhân tạo hình cây cọ và công nghệ siêu hiện đại.',
    lat: 23.4241,
    lng: 53.8478,
    altitude: 1.8,
    color: '#06b6d4',
    natureHighlights: [
      'Những cồn cát sa mạc Liwa đỏ rực cao ngất ngưởng.',
      'Vùng vịnh Ả Rập với làn nước trong xanh và rừng ngập mặn ở Abu Dhabi.',
      'Trải nghiệm trượt cát và cưỡi lạc đà ngắm hoàng hôn rực rỡ.'
    ],
    cultureHighlights: [
      'Tòa tháp Burj Khalifa cao 828 mét chọc thủng những đám mây tại Dubai.',
      'Thánh đường Hồi giáo Sheikh Zayed bằng đá cẩm thạch trắng tinh khôi.',
      'Nghệ thuật huấn luyện chim ưng săn mồi truyền thống của các hoàng tử Ả Rập.'
    ],
    foodHighlights: [
      'Thịt nướng Shawarma kẹp bánh mì thơm giòn ngậy sốt tỏi.',
      'Món tráng miệng ngọt ngào Luqaimat rưới siro chà là và vừng rang.',
      'Cơm chiên gia vị Machboos thơm lừng nghệ tây.'
    ],
    funFacts: [
      'Tòa tháp Burj Khalifa cao đến mức bạn có thể ngắm hoàng hôn hai lần trong một ngày: một lần dưới chân tháp và một lần trên đỉnh tháp!',
      'Cảnh sát Dubai sử dụng những siêu xe thể thao nhanh nhất thế giới để tuần tra.',
      'Quần đảo Cây Cọ Palm Jumeirah là hòn đảo nhân tạo khổng lồ có thể nhìn thấy từ vũ trụ.'
    ],
    landmarks: [
      { name: 'Tháp Burj Khalifa', description: 'Tòa nhà nhân tạo cao nhất hành tinh (828m) tại Dubai' },
      { name: 'Thánh đường Hồi giáo Sheikh Zayed', description: 'Kiệt tác kiến trúc cẩm thạch trắng lộng lẫy tại Abu Dhabi' },
      { name: 'Đảo Cây Cọ Palm Jumeirah', description: 'Kỳ quan đảo nhân tạo hình cây cọ vươn ra biển' }
    ]
  },
  turkey: {
    id: 'turkey',
    code: 'TR',
    nameVi: 'Thổ Nhĩ Kỳ',
    nameEn: 'Turkey',
    flag: '🇹🇷',
    capital: 'Ankara',
    continent: 'Châu Á',
    continentId: 'asia',
    population: 'Khoảng 86 triệu người',
    populationNum: 86,
    area: '783.562 km²',
    areaNum: 784,
    language: 'Tiếng Thổ Nhĩ Kỳ',
    climate: 'Địa Trung Hải ôn hòa ven biển, lục địa khô ráo ở vùng cao nguyên nội địa',
    currency: 'Lira Thổ Nhĩ Kỳ (TRY)',
    shortDescription: 'Cây cầu nối liền hai lục địa Á - Âu huyền thoại, nổi tiếng với thung lũng khinh khí cầu Cappadocia, eo biển Bosphorus và thành phố cổ Istanbul.',
    lat: 38.9637,
    lng: 35.2433,
    altitude: 1.9,
    color: '#e11d48',
    natureHighlights: [
      'Thung lũng Cappadocia với những cột đá "ống khói cổ tích" kỳ lạ.',
      'Lâu đài bông Pamukkale - những bậc thang đá vôi trắng tinh chứa nước khoáng xanh ngọc.',
      'Eo biển Bosphorus xanh biếc chia cắt hai châu lục Á và Âu.'
    ],
    cultureHighlights: [
      'Thành phố Istanbul cổ kính với hàng ngàn năm lịch sử giao thoa văn hóa.',
      'Thánh đường Hagia Sophia tráng lệ với mái vòm khổng lồ.',
      'Nghệ thuật bay khinh khí cầu ngắm bình minh tuyệt mỹ tại Cappadocia.'
    ],
    foodHighlights: [
      'Thịt nướng Doner Kebab thơm phức cuộn bánh mì.',
      'Kem dẻo Dondurma dẻo quánh với màn biểu diễn vui nhộn của nghệ nhân.',
      'Kẹo dẻo hoa hồng Turkish Delight (Lokum) ngọt ngào.'
    ],
    funFacts: [
      'Istanbul là thành phố duy nhất trên thế giới nằm trải dài trên cả hai châu lục (Châu Á và Châu Âu).',
      'Hoa tulip rực rỡ có nguồn gốc từ Thổ Nhĩ Kỳ trước khi được mang sang Hà Lan.',
      'Thổ Nhĩ Kỳ là một trong những nước uống nhiều trà nhất thế giới tính theo đầu người.'
    ],
    landmarks: [
      { name: 'Thung lũng khinh khí cầu Cappadocia', description: 'Khung cảnh thần tiên với hàng trăm khinh khí cầu bay rực rỡ' },
      { name: 'Nhà thờ Hagia Sophia & Thánh đường Xanh', description: 'Kiệt tác kiến trúc tôn giáo lịch sử tại Istanbul' },
      { name: 'Ruộng bậc thang đá vôi Pamukkale', description: 'Lâu đài bông trắng muốt với suối nước khoáng ấm tự nhiên' }
    ]
  },
  spain: {
    id: 'spain',
    code: 'ES',
    nameVi: 'Tây Ban Nha',
    nameEn: 'Spain',
    flag: '🇪🇸',
    capital: 'Madrid',
    continent: 'Châu Âu',
    continentId: 'europe',
    population: 'Khoảng 48 triệu người',
    populationNum: 48,
    area: '505.990 km²',
    areaNum: 506,
    language: 'Tiếng Tây Ban Nha (Castellano)',
    climate: 'Địa Trung Hải nhiều nắng ấm áp, mùa hè rực rỡ, mùa đông ôn hòa',
    currency: 'Euro (EUR)',
    shortDescription: 'Xứ sở của những vũ điệu Flamenco nồng nàn, vương cung thánh đường Sagrada Familia tráng lệ, trận đấu bò tót kịch tính và món cơm Paella thơm lừng.',
    lat: 40.4637,
    lng: -3.7492,
    altitude: 1.8,
    color: '#ea580c',
    natureHighlights: [
      'Dãy núi Pyrenees tuyết phủ ngăn cách Tây Ban Nha và Pháp.',
      'Bờ biển Costa del Sol rực nắng với những bãi cát vàng Địa Trung Hải.',
      'Quần đảo Canary với núi lửa Teide cao nhất xứ sở bò tót.'
    ],
    cultureHighlights: [
      'Vương cung thánh đường Sagrada Familia độc nhất vô nhị của kiến trúc sư Gaudi ở Barcelona.',
      'Điệu nhảy Flamenco cuồng nhiệt với tiếng vỗ tay rộn rã và tiếng đàn guitar quyến rũ.',
      'Cung điện Alhambra lộng lẫy mang dấu ấn kiến trúc Hồi giáo Moorish.'
    ],
    foodHighlights: [
      'Cơm thập cẩm hải sản Paella vàng óng ả ướp nhụy hoa nghệ tây.',
      'Thịt heo muối xông khói Jamón Ibérico trứ danh thơm ngon hảo hạng.',
      'Bánh quẩy giòn Churros chấm sốt sô-cô-la nóng đậm đặc.'
    ],
    funFacts: [
      'Thánh đường Sagrada Familia đã được xây dựng liên tục hơn 140 năm và vẫn chưa hoàn thành!',
      'Lễ hội ném cà chua La Tomatina ở làng Buñol là cuộc chiến ném đồ ăn vui nhộn lớn nhất thế giới.',
      'Tây Ban Nha là nước sản xuất dầu ô-liu nhiều nhất hành tinh.'
    ],
    landmarks: [
      { name: 'Vương cung Thánh đường Sagrada Familia', description: 'Kiệt tác kiến trúc kỳ ảo vươn cao tại thành phố Barcelona' },
      { name: 'Cung điện Alhambra', description: 'Pháo đài cổ kính rực rỡ với vườn hoa và đài phun nước ở Granada' },
      { name: 'Bảo tàng Prado', description: 'Bảo tàng nghệ thuật hoàng gia danh giá tại Madrid' }
    ]
  },
  netherlands: {
    id: 'netherlands',
    code: 'NL',
    nameVi: 'Hà Lan',
    nameEn: 'Netherlands',
    flag: '🇳🇱',
    capital: 'Amsterdam',
    continent: 'Châu Âu',
    continentId: 'europe',
    population: 'Khoảng 18 triệu người',
    populationNum: 18,
    area: '41.543 km²',
    areaNum: 41.5,
    language: 'Tiếng Hà Lan',
    climate: 'Ôn đới hải dương, mát mẻ, mùa hè dễ chịu và mùa đông nhiều gió',
    currency: 'Euro (EUR)',
    shortDescription: 'Xứ sở hoa tulip rực rỡ, những chiếc cối xay gió khổng lồ thanh bình, hệ thống kênh đào thơ mộng và đất nước của những người yêu xe đạp.',
    lat: 52.1326,
    lng: 5.2913,
    altitude: 1.8,
    color: '#f97316',
    natureHighlights: [
      'Vườn hoa Keukenhof - thiên đường hoa mùa xuân với hơn 7 triệu bông hoa tulip khoe sắc.',
      'Vùng đất lấn biển Polder xanh ngát với những đàn bò sữa thảnh thơi gặm cỏ.',
      'Hệ thống đê biển Delta Works - kỳ quan kỹ thuật chống ngập lụt hàng đầu thế giới.'
    ],
    cultureHighlights: [
      'Những chiếc cối xay gió cổ kính Zaanse Schans quay đều theo gió.',
      'Thành phố kênh đào Amsterdam với hàng ngàn cây cầu cổ kính.',
      'Quê hương của các danh họa vĩ đại Vincent van Gogh và Rembrandt.'
    ],
    foodHighlights: [
      'Bánh quế nướng mật ong Stroopwafel dẻo ngọt kẹp siro caramel.',
      'Phô mai tròn Gouda và Edam béo ngậy được bọc sáp đỏ.',
      'Cá trích muối Herring ăn kèm hành tây thái hạt lựu.'
    ],
    funFacts: [
      'Gần 1/3 diện tích đất nước Hà Lan nằm thấp hơn mực nước biển!',
      'Hà Lan có số lượng xe đạp nhiều hơn cả dân số của cả nước.',
      'Người Hà Lan là những người có chiều cao trung bình cao nhất thế giới.'
    ],
    landmarks: [
      { name: 'Làng cối xay gió Kinderdijk & Zaanse Schans', description: 'Di sản thế giới với những cối xay gió cổ kính đứng bên bờ kênh' },
      { name: 'Vườn hoa Keukenhof', description: 'Công viên hoa tulip rực rỡ sắc màu lớn nhất hành tinh' },
      { name: 'Kênh đào Amsterdam', description: 'Hệ thống đường thủy lãng mạn với những ngôi nhà gạch xinh xắn' }
    ]
  },
  switzerland: {
    id: 'switzerland',
    code: 'CH',
    nameVi: 'Thụy Sĩ',
    nameEn: 'Switzerland',
    flag: '🇨🇭',
    capital: 'Bern',
    continent: 'Châu Âu',
    continentId: 'europe',
    population: 'Khoảng 8,9 triệu người',
    populationNum: 8.9,
    area: '41.285 km²',
    areaNum: 41.3,
    language: 'Tiếng Đức, Tiếng Pháp, Tiếng Ý, Tiếng Romansh',
    climate: 'Khí hậu núi cao ôn đới, mùa đông tuyết trắng xóa phủ kín các đỉnh núi',
    currency: 'Franc Thụy Sĩ (CHF)',
    shortDescription: 'Trái tim của dãy núi Alps tuyết trắng, đất nước của những chiếc đồng hồ chính xác nhất thế giới, sô-cô-la hảo hạng và những hồ nước xanh như pha lê.',
    lat: 46.8182,
    lng: 8.2275,
    altitude: 1.8,
    color: '#ef4444',
    natureHighlights: [
      'Đỉnh núi Matterhorn (4.478m) hình kim tự tháp tuyết hùng vĩ biểu tượng của Thụy Sĩ.',
      'Hồ Geneva và hồ Lucerne trong vắt soi bóng những ngọn núi phủ tuyết.',
      'Sông băng Aletsch - dòng sông băng lớn nhất và dài nhất dãy núi Alps.'
    ],
    cultureHighlights: [
      'Truyền thống chế tác đồng hồ cơ khí tinh xảo và chính xác hàng đầu hành tinh.',
      'Đoàn tàu đỏ Glacier Express uốn lượn qua những cây cầu cạn ngoạn mục giữa hẻm núi.',
      'Lối sống thanh bình, bảo vệ thiên nhiên và trung lập hòa bình.'
    ],
    foodHighlights: [
      'Lẩu phô mai Fondue nhúng bánh mì giòn rụm trong nồi phô mai đun chảy.',
      'Sô-cô-la sữa Thụy Sĩ mềm mịn tan ngay trong miệng.',
      'Bánh khoai tây bào chiên giòn Rösti béo thơm.'
    ],
    funFacts: [
      'Đỉnh núi Matterhorn chính là hình ảnh ngọn núi in trên bao bì sô-cô-la Toblerone nổi tiếng!',
      'Thụy Sĩ có tới 4 ngôn ngữ chính thức cùng được sử dụng.',
      'Hệ thống hầm đường bộ Gotthard ở Thụy Sĩ dài hơn 57 km là đường hầm xuyên núi dài nhất thế giới.'
    ],
    landmarks: [
      { name: 'Đỉnh núi Matterhorn', description: 'Ngọn núi biểu tượng tuyệt đẹp giữa tuyết trắng Zermatt' },
      { name: 'Cầu gỗ Chapel ở Lucerne', description: 'Cây cầu gỗ có mái che cổ nhất châu Âu bắc qua hồ nước thơ mộng' },
      { name: 'Đỉnh đèo Jungfraujoch', description: 'Được mệnh danh là Nóc nhà châu Âu với ga tàu hỏa cao nhất lục địa' }
    ]
  },
  greece: {
    id: 'greece',
    code: 'GR',
    nameVi: 'Hy Lạp',
    nameEn: 'Greece',
    flag: '🇬🇷',
    capital: 'Athens',
    continent: 'Châu Âu',
    continentId: 'europe',
    population: 'Khoảng 10,4 triệu người',
    populationNum: 10.4,
    area: '131.957 km²',
    areaNum: 132,
    language: 'Tiếng Hy Lạp',
    climate: 'Địa Trung Hải ấm áp, chan hòa ánh nắng rực rỡ và gió biển mát lành',
    currency: 'Euro (EUR)',
    shortDescription: 'Cái nôi của nền văn minh phương Tây và Thế vận hội Olympic, xứ sở của các vị thần trên đỉnh Olympus, đền Parthenon và đảo ngọc Santorini nhà trắng mái xanh.',
    lat: 39.0742,
    lng: 21.8243,
    altitude: 1.8,
    color: '#0284c7',
    natureHighlights: [
      'Đỉnh núi Olympus (2.917m) - nơi ngự trị huyền thoại của 12 vị thần Hy Lạp cổ đại.',
      'Hòn đảo thiên đường Santorini với vách đá núi lửa nhìn ra biển Aegean xanh ngắt.',
      'Hàng ngàn hòn đảo ngọc với bãi biển cát trắng nước trong như gương.'
    ],
    cultureHighlights: [
      'Đền Parthenon sừng sững trên ngọn đồi Acropolis tại thủ đô Athens.',
      'Quê hương khai sinh ra Đại hội Thể thao Olympic cổ đại và nền Dân chủ.',
      'Thần thoại Hy Lạp phong phú với những câu chuyện về thần Zeus, Athena, Hercules.'
    ],
    foodHighlights: [
      'Món nướng Moussaka xếp lớp cà tím, thịt băm và phô mai nướng vàng óng.',
      'Salad Hy Lạp tươi mát với phô mai Feta béo ngậy và quả ô-liu giòn.',
      'Bánh ngọt Baklava nhiều lớp giòn tan đẫm mật ong và hạt óc chó.'
    ],
    funFacts: [
      'Hy Lạp có hơn 6.000 hòn đảo lớn nhỏ nằm rải rác trên biển Địa Trung Hải!',
      'Ngọn đuốc Olympic được thắp sáng tại di tích Olympia cổ đại của Hy Lạp trước mỗi kỳ Thế vận hội.',
      'Không có nơi nào ở đất nước Hy Lạp cách biển quá 137 km.'
    ],
    landmarks: [
      { name: 'Thành cổ Acropolis & Đền Parthenon', description: 'Biểu tượng vĩ đại của nền văn minh cổ đại tại Athens' },
      { name: 'Đảo Santorini', description: 'Ngôi làng vách đá tuyệt mỹ với những ngôi nhà quét vôi trắng và mái vòm xanh biếc' },
      { name: 'Tu viện đá Meteora', description: 'Những tu viện cổ kính ngự trị cheo leo trên đỉnh các cột đá sa thạch khổng lồ' }
    ]
  },
  mexico: {
    id: 'mexico',
    code: 'MX',
    nameVi: 'Mexico',
    nameEn: 'Mexico',
    flag: '🇲🇽',
    capital: 'Thành phố Mexico (Mexico City)',
    continent: 'Bắc Mỹ',
    continentId: 'north_america',
    population: 'Khoảng 130 triệu người',
    populationNum: 130,
    area: '1.964.375 km²',
    areaNum: 1964,
    language: 'Tiếng Tây Ban Nha',
    climate: 'Từ nhiệt đới ẩm ở đồng bằng ven biển đến sa mạc khô hạn và khí hậu cao nguyên mát mẻ',
    currency: 'Peso Mexico (MXN)',
    shortDescription: 'Vùng đất của nền văn minh Maya và Aztec cổ đại, những kim tự tháp bậc thang kỳ bí, mũ rộng vành Sombrero và món bánh Tacos đậm đà sắc màu.',
    lat: 23.6345,
    lng: -102.5528,
    altitude: 2.0,
    color: '#16a34a',
    natureHighlights: [
      'Hẻm núi Đồng (Copper Canyon) rộng lớn và sâu hơn cả Grand Canyon của Mỹ.',
      'Khu bảo tồn bướm Monarch với hàng triệu cánh bướm cam rực rỡ di cư về trú đông.',
      'Các hố sụt tự nhiên Cenote chứa làn nước ngọt xanh trong vắt kỳ ảo giữa rừng nhiệt đới.'
    ],
    cultureHighlights: [
      'Kim tự tháp Chichen Itza của người Maya - 1 trong 7 kỳ quan thế giới mới.',
      'Lễ hội Ngày của Người Chết (Día de los Muertos) rực rỡ hoa cúc vạn thọ và mặt nạ vui nhộn.',
      'Âm nhạc Mariachi rộn ràng với đàn guitar và những chiếc mũ rộng vành Sombrero.'
    ],
    foodHighlights: [
      'Bánh Tacos vỏ ngô kẹp thịt nướng, rau mùi và sốt ớt salsa tươi ngon.',
      'Sốt bơ Guacamole béo ngậy chấm cùng bánh ngô giòn Nachos.',
      'Sô-cô-la nguyên chất có nguồn gốc đầu tiên từ người Maya cổ đại.'
    ],
    funFacts: [
      'Người Maya và Aztec ở Mexico là những người đầu tiên trên thế giới phát minh ra món sô-cô-la từ hạt ca cao!',
      'Thành phố Mexico City được xây dựng trên nền của một hồ nước cổ xưa và đang từ từ lún xuống vài cm mỗi năm.',
      'Kim tự tháp Cholula ở Mexico là kim tự tháp có thể tích lớn nhất thế giới.'
    ],
    landmarks: [
      { name: 'Kim tự tháp Maya Chichen Itza', description: 'Kỳ quan kim tự tháp bậc thang thiên văn học kỳ vĩ tại bán đảo Yucatan' },
      { name: 'Thành cổ Teotihuacan', description: 'Quần thể kim tự tháp Mặt Trời và Mặt Trăng khổng lồ' },
      { name: 'Bãi biển thiên đường Cancun', description: 'Bờ biển cát trắng ngọc bích nổi tiếng thế giới' }
    ]
  },
  peru: {
    id: 'peru',
    code: 'PE',
    nameVi: 'Peru',
    nameEn: 'Peru',
    flag: '🇵🇪',
    capital: 'Lima',
    continent: 'Nam Mỹ',
    continentId: 'south_america',
    population: 'Khoảng 34 triệu người',
    populationNum: 34,
    area: '1.285.216 km²',
    areaNum: 1285,
    language: 'Tiếng Tây Ban Nha, Tiếng Quechua, Aymara',
    climate: 'Khô hạn ở bờ biển, lạnh mát ở vùng núi cao Andes và nhiệt đới gió mùa ở rừng Amazon',
    currency: 'Sol Peru (PEN)',
    shortDescription: 'Cái nôi của Đế chế Inca huyền thoại, nơi có thành phố cổ trên mây Machu Picchu, dãy núi Cầu Vồng 7 sắc và những chú lạc đà không bướu Llama ngộ nghĩnh.',
    lat: -9.19,
    lng: -75.0152,
    altitude: 2.0,
    color: '#dc2626',
    natureHighlights: [
      'Dãy núi Cầu Vồng Vinicunca rực rỡ 7 sắc màu tự nhiên giữa núi tuyết Andes.',
      'Hồ Titicaca ở độ cao 3.812m - hồ nước ngọt lớn nằm ở vị trí cao nhất thế giới có tàu thuyền qua lại.',
      'Hẻm núi Colca sâu gấp đôi hẻm núi Grand Canyon nơi chim kền kền Andes sải cánh.'
    ],
    cultureHighlights: [
      'Thành phố cổ Machu Picchu ẩn mình giữa mây ngàn đỉnh núi Andes.',
      'Những hình vẽ bí ẩn khổng lồ Nazca trên mặt đất sa mạc chỉ nhìn thấy rõ từ máy bay.',
      'Trang phục dệt len lạc đà Alpaca sặc sỡ hoa văn của người dân bản địa.'
    ],
    foodHighlights: [
      'Ceviche - gỏi cá tươi ướp nước cốt chanh tươi chua thanh cay dịu.',
      'Hơn 3.000 giống khoai tây bản địa đủ mọi hình dáng và màu sắc.',
      'Bắp ngô tím khổng lồ dùng để nấu món nước giải khát Chicha Morada ngọt ngào.'
    ],
    funFacts: [
      'Cây khoai tây - loại lương thực quen thuộc trên toàn cầu ngày nay - có nguồn gốc thuần hóa đầu tiên tại vùng cao nguyên Peru!',
      'Thành phố Machu Picchu được xây bằng các tảng đá khổng lồ ghép khít khao đến mức không thể nhét vừa một lưỡi dao mỏng.',
      'Loài chim Condor (Kền kền Andes) ở Peru là một trong những loài chim biết bay có sải cánh lớn nhất thế giới (hơn 3 mét).'
    ],
    landmarks: [
      { name: 'Thành phố cổ Machu Picchu', description: 'Kỳ quan thế giới "Thành phố trên mây" của người Inca giữa núi rừng' },
      { name: 'Hình vẽ khổng lồ Nazca', description: 'Những mật mã hình vẽ chim, khỉ, nhện khổng lồ bí ẩn trên sa mạc' },
      { name: 'Hồ Titicaca & Đảo nổi Uros', description: 'Hồ thiêng trên mây với những ngôi làng xây hoàn toàn bằng cỏ lau sậy' }
    ]
  },
  new_zealand: {
    id: 'new_zealand',
    code: 'NZ',
    nameVi: 'New Zealand',
    nameEn: 'New Zealand',
    flag: '🇳🇿',
    capital: 'Wellington',
    continent: 'Châu Đại Dương',
    continentId: 'oceania',
    population: 'Khoảng 5,2 triệu người',
    populationNum: 5.2,
    area: '268.021 km²',
    areaNum: 268,
    language: 'Tiếng Anh, Tiếng Māori',
    climate: 'Ôn đới hải dương mát mẻ quanh năm, không khí trong lành tinh khiết',
    currency: 'Đô la New Zealand (NZD)',
    shortDescription: 'Xứ sở của dải mây trắng dài, quê hương của loài chim Kiwi ngộ nghĩnh, văn hóa thổ dân Māori độc đáo và phong cảnh núi non hồ nước tuyệt mỹ.',
    lat: -40.9006,
    lng: 174.886,
    altitude: 1.9,
    color: '#0284c7',
    natureHighlights: [
      'Vịnh hẹp Milford Sound với những thác nước đổ thẳng từ vách núi xanh ngút ngàn xuống biển.',
      'Hồ Tekapo nước màu xanh ngọc lam soi bóng đỉnh núi tuyết Aoraki / Mount Cook.',
      'Hang động Waitomo lung linh huyền ảo như bầu trời sao bởi hàng triệu chú đom đóm phát sáng.'
    ],
    cultureHighlights: [
      'Văn hóa thổ dân Māori với điệu nhảy chiến binh Haka dũng mãnh và tục xăm mặt Ta Moko.',
      'Ngôi làng cổ tích Hobbiton - phim trường xanh mướt của bộ phim "Chúa tể những chiếc nhẫn".',
      'Lối sống gắn liền với bảo tồn động vật hoang dã và thể thao mạo hiểm.'
    ],
    foodHighlights: [
      'Trái Kiwi chua ngọt giàu vitamin C nức tiếng toàn cầu.',
      'Thịt cừu nướng thảo mộc mềm thơm đậm vị.',
      'Mật ong hoa Manuka quý giá có tính kháng khuẩn tự nhiên cao.'
    ],
    funFacts: [
      'Chim Kiwi là loài chim biểu tượng của New Zealand - chúng không có cánh bay và đẻ quả trứng to bằng 20% trọng lượng cơ thể!',
      'Tại New Zealand không hề có bất kỳ loài rắn độc nào sinh sống trong tự nhiên.',
      'Tỷ lệ cừu so với người ở New Zealand từng đạt mức khoảng 5 con cừu trên mỗi một người dân.'
    ],
    landmarks: [
      { name: 'Vịnh hẹp Milford Sound', description: 'Kỳ quan thiên nhiên hùng vĩ với vách đá dựng đứng và thác nước đổ' },
      { name: 'Làng người lùn Hobbiton', description: 'Ngôi làng cổ tích xanh mướt với những ngôi nhà dưới lòng đất' },
      { name: 'Đỉnh núi Mount Cook (Aoraki)', description: 'Đỉnh núi tuyết cao nhất New Zealand giữa trời xanh' }
    ]
  },
  kenya: {
    id: 'kenya',
    code: 'KE',
    nameVi: 'Kenya',
    nameEn: 'Kenya',
    flag: '🇰🇪',
    capital: 'Nairobi',
    continent: 'Châu Phi',
    continentId: 'africa',
    population: 'Khoảng 55 triệu người',
    populationNum: 55,
    area: '580.367 km²',
    areaNum: 580,
    language: 'Tiếng Swahili, Tiếng Anh',
    climate: 'Nhiệt đới xích đạo, mát mẻ ở vùng cao nguyên, có mùa mưa và mùa khô rõ rệt',
    currency: 'Shilling Kenya (KES)',
    shortDescription: 'Trái tim của những chuyến thám hiểm hoang dã châu Phi, nơi diễn ra cuộc đại di cư vĩ đại của hàng triệu linh dương đầu bò trên thảo nguyên Masai Mara.',
    lat: -0.0236,
    lng: 37.9062,
    altitude: 1.9,
    color: '#e11d48',
    natureHighlights: [
      'Khu bảo tồn Masai Mara - sân khấu của cuộc Đại di cư (Great Migration) ngoạn mục nhất hành tinh.',
      'Núi Kenya (5.199m) - đỉnh núi tuyết phủ sừng sững ngay trên đường xích đạo.',
      'Hồ Nakuru nhuộm hồng rực rỡ bởi hàng triệu chú chim hồng hạc kiêu sa.'
    ],
    cultureHighlights: [
      'Bộ tộc du mục dũng cảm Masai với trang phục áo choàng đỏ Shúkà và điệu nhảy nhảy cao Adumu.',
      'Các vận động viên chạy marathon cự ly dài xuất sắc hàng đầu thế giới.',
      'Lời chào thân thiện "Jambo!" và câu nói nổi tiếng "Hakuna Matata" (Không có gì phải lo lắng).'
    ],
    foodHighlights: [
      'Bánh bột ngô Ugali dẻo bùi ăn cùng rau xào Sukuma Wiki.',
      'Thịt nướng thơm lừng Nyama Choma đãi khách quý.',
      'Trà đen Kenya hảo hạng pha sữa tươi nóng béo ngậy.'
    ],
    funFacts: [
      'Hàng năm, hơn 1,5 triệu con linh dương đầu bò và ngựa vằn cùng vượt sông Mara vượt qua đàn cá sấu săn mồi.',
      'Thủ đô Nairobi của Kenya là thủ đô duy nhất trên thế giới có một vườn quốc gia động vật hoang dã nằm ngay sát cạnh trung tâm thành phố!',
      'Kenya là một trong những nước xuất khẩu hoa hồng và trà đen lớn nhất thế giới.'
    ],
    landmarks: [
      { name: 'Khu bảo tồn Masai Mara', description: 'Thánh địa thảo nguyên hoang dã với cuộc đại di cư của muôn loài' },
      { name: 'Vườn quốc gia Amboseli', description: 'Đàn voi châu Phi thong thả dạo bước dưới bóng núi tuyết Kilimanjaro' },
      { name: 'Hồ Nakuru', description: 'Thiên đường của hàng triệu chú chim hồng hạc rực rỡ' }
    ]
  },
  madagascar: {
    id: 'madagascar',
    code: 'MG',
    nameVi: 'Madagascar',
    nameEn: 'Madagascar',
    flag: '🇲🇬',
    capital: 'Antananarivo',
    continent: 'Châu Phi',
    continentId: 'africa',
    population: 'Khoảng 30 triệu người',
    populationNum: 30,
    area: '587.041 km²',
    areaNum: 587,
    language: 'Tiếng Malagasy, Tiếng Pháp',
    climate: 'Nhiệt đới gió mùa, bờ biển phía đông mưa nhiều, phía tây khô ráo',
    currency: 'Ariary Madagascar (MGA)',
    shortDescription: 'Hòn đảo lớn thứ 4 thế giới nằm giữa Ấn Độ Dương, thiên đường tiến hóa độc nhất vô nhị với loài vượn cáo Lemur và đại lộ cây Baobab khổng lồ nghìn tuổi.',
    lat: -18.7669,
    lng: 46.8691,
    altitude: 1.9,
    color: '#10b981',
    natureHighlights: [
      'Đại lộ cây Baobab (Avenue of the Baobabs) với những thân cây khổng lồ sừng sững nghìn năm.',
      'Rừng đá vôi Tsingy de Bemaraha với những chóp đá sắc nhọn như dao cắm thẳng lên trời.',
      'Rừng nhiệt đới nguyên sinh nơi sinh sống của hơn 100 loài vượn cáo Lemur kỳ thú.'
    ],
    cultureHighlights: [
      'Văn hóa Malagasy độc đáo giao thoa giữa người bản địa Đông Nam Á cổ đại và cư dân Đông Phi.',
      'Nghệ thuật dệt lụa hoang dã Lamba và âm nhạc đàn vòm Valiha bằng tre.',
      'Tôn trọng thiên nhiên và tổ tiên với những phong tục truyền thống tốt đẹp.'
    ],
    foodHighlights: [
      'Cơm gạo đỏ Vary ăn kèm canh lá xanh và thịt bò bướu Zebu (Romazava).',
      'Thịt bò nướng xiên que Koba ngọt thơm bọc lá chuối.',
      'Hương vani tự nhiên Madagascar thơm ngát đứng đầu thế giới.'
    ],
    funFacts: [
      'Hơn 90% các loài động thực vật ở Madagascar hoàn toàn không thể tìm thấy ở bất kỳ nơi nào khác trên Trái Đất!',
      'Cây Baobab có thân to phình ra để trữ tới 120.000 lít nước bên trong giúp vượt qua mùa khô hạn.',
      'Vượn cáo đuôi chuông (Ring-tailed Lemur) dùng chiếc đuôi vằn đen trắng dài của mình để ra hiệu dẫn đường.'
    ],
    landmarks: [
      { name: 'Đại lộ cây Baobab', description: 'Hàng cây Baobab cổ thụ khổng lồ soi bóng dưới hoàng hôn huyền ảo' },
      { name: 'Rừng đá sắc nhọn Tsingy de Bemaraha', description: 'Mê cung đá vôi thẳng đứng kỳ vĩ di sản UNESCO' },
      { name: 'Vườn quốc gia Andasibe-Mantadia', description: 'Ngôi nhà rộn rã tiếng hót của loài vượn cáo lớn nhất Indri' }
    ]
  }
};
