
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '../src/data/rappers.json');

// Helper to create rapper object
function createRapper(id, name, region, tags, bio, discography = [], social = {}) {
    // Check for local image (requires running this script from project root or adjusting path)
    // Note: In the build process, we just generate the path string.
    // The convention will be: /images/rappers/{sanitized_name}.jpg

    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const localImagePath = `/images/rappers/${sanitizedName}.jpg`;

    // In a real scenario we might check fs.existsSync, but here we'll assume 
    // the user (or us) places files with this naming convention.
    // However, to avoid broken images for those that don't exist, we can check.
    const systemPath = path.join(__dirname, '../public/images/rappers', `${sanitizedName}.jpg`);
    let image = `https://placehold.co/600x400/18181b/a1a1aa?text=${encodeURIComponent(name)}`;

    try {
        if (fs.existsSync(systemPath)) {
            image = localImagePath;
        }
    } catch (e) {
        // ignore error
    }

    return {
        id: String(id),
        name,
        region,
        tags: tags.split(',').map(t => t.trim()),
        bio,
        discography,
        social,
        image
    };
}

const rappers = [
    // --- Hokkaido (北海道) ---
    createRapper(1, "THA BLUE HERB", "北海道", "Legend, Underground, Conscious", "札幌を拠点に活動する伝説的なヒップホップグループ。BOSS THE MCのリリックは哲学的。", ["STILLING, STILL DREAMING"]),
    createRapper(2, "B.I.G. JOE", "北海道", "Legend, Lyricist", "北海道を代表するリリシスト。深いメッセージを発信する。", ["THE LOST DOPE"]),
    createRapper(3, "HOKT", "北海道", "N.C.B.B, Gangsta", "北のヒップホップシーンを牽引するN.C.B.Bのリーダー。", ["G IN RHYMES"]),
    createRapper(4, "YOUNG DAIS", "北海道", "N.C.B.B, Actor", "俳優としても活動。『TOKYO TRIBE』主演。", ["PLAYLIST"]),
    createRapper(5, "SHUREN the FIRE", "北海道", "Underground, Jazz Rap", "独特なフローとジャズを基調としたトラックで異彩を放つ。", ["My Words Laugh Behind The Mask"]),
    createRapper(6, "LARGE IRON", "北海道", "MIC JACK PRODUCTION", "重厚なラップスタイル。"),
    createRapper(7, "Ry-lax", "北海道", "Asahikawa, BCDMG", "旭川出身。BCDMG所属の実力派。", ["CONTROL"]),
    createRapper(8, "Power Wave", "北海道", "Reggae, Rap", "レゲエとラップを横断するスタイル。"),

    // --- Aomori (青森県) ---
    createRapper(9, "Authority", "青森県", "AH1, Mainstream", "青森出身。バトルでの活躍を経て音源制作に注力。AH1出演。", ["EMERGENCE"]),
    createRapper(10, "SI-RUDE", "青森県", "Underground", "青森のローカルシーンを長年支える。"),

    // --- Iwate (岩手県) ---
    createRapper(11, "MAKA", "岩手県", "Reggae, Rap", "岩手出身。レゲエとヒップホップのエッセンス。"),
    createRapper(12, "J-MACK", "岩手県", "Local, Gangsta", "岩手のストリートシーン。"),

    // --- Miyagi (宮城県) ---
    createRapper(13, "GAGLE", "宮城県", "Legend, Jazzy", "仙台を拠点にする伝説的ユニット。", ["3 MEN ON WAX"]),
    createRapper(14, "HUNGER", "宮城県", "GAGLE, Skillful", "高速かつ精確なラップスキル。"),
    createRapper(15, "TERRY", "宮城県", "Sendai, Emotional", "等身大のメッセージソング。"),
    createRapper(16, "Moment Joon", "宮城県", "Immigrant, Political", "移民としての視点から鋭い社会批評。", ["Passport & Garcon"]),

    // --- Akita (秋田県) ---
    createRapper(17, "Lunv Loyal", "秋田県", "New Wave, Trap, POP YOURS", "秋田出身。哀愁漂うリリックとメロディ。POP YOURS出演。", ["ZERO"]),
    createRapper(18, "R羅", "秋田県", "Old School", "秋田のヒップホップシーンの先駆者。"),

    // --- Yamagata (山形県) ---
    createRapper(19, "葉花源吸", "山形県", "Local, Humorous", "山形弁を巧みに操るスタイル。"),
    createRapper(20, "V-1", "山形県", "Local, Street", "山形の現場を沸かせる。"),

    // --- Fukushima (福島県) ---
    createRapper(21, "FOX", "福島県", "Local, Conscious", "福島の現状や心情をリアルに綴る。"),
    createRapper(22, "JAG-ME", "福島県", "Underground, Skill", "東北のアンダーグラウンド。"),

    // --- Ibaraki (茨城県) ---
    createRapper(23, "Lunch Time Speax", "茨城県", "Legend, Mito", "水戸独自のシーンを築いた伝説。", ["Blue Print Maneuver"]),
    createRapper(24, "ShowyRENZO", "茨城県", "Showy, New Wave, STARZ", "茨城出身。Showyのメンバー。若者からカルト的人気。STARZファイナリスト周辺。"),
    createRapper(25, "WOODSMAN", "茨城県", "Local, Nature", "土臭いビートとラップ。"),

    // --- Tochigi (栃木県) ---
    createRapper(26, "SATORU", "栃木県", "Gangsta, Brasil, POP YOURS", "栃木・足利出身。ブラジルルーツの攻撃的なスタイルで話題。POP YOURS出演。", ["SATORU"]),
    createRapper(27, "KA-Y", "栃木県", "Local", "栃木のストリート。"),

    // --- Gunma (群馬県) ---
    createRapper(28, "Fuji Taito", "群馬県", "Briza, Drill, POP YOURS", "群馬出身。重厚なドリルサウンドと低音ボイス。POP YOURS出演。", ["Crows"]),
    createRapper(29, "GEORGE TIGER ONE", "群馬県", "Reggae, Rap", "群馬の重鎮。"),
    createRapper(30, "ESPERANZA", "群馬県", "Group, Local", "群馬拠点。"),

    // --- Saitama (埼玉県) ---
    createRapper(31, "NAMEDARUMA", "埼玉県", "Group, Gangsta, Kumagaya", "熊谷拠点の「舐達麻」。リアルなストリートライフ。", ["GODBREATH BUDDHACESS"]),
    createRapper(32, "BADSAIKUSH", "埼玉県", "NAMEDARUMA, Lyricist", "舐達麻のリーダー格。"),
    createRapper(33, "G-PLANTS", "埼玉県", "NAMEDARUMA, Flow", "舐達麻のメンバー。"),
    createRapper(34, "DELTA9KID", "埼玉県", "NAMEDARUMA, Cool", "舐達麻のメンバー。"),
    createRapper(35, "KENNY-G", "埼玉県", "Gangsta, Outlaw", "リアルなアウトロースタイル。"),
    createRapper(36, "Loota", "埼玉県", "Cloud Rap, International", "Keith Ape「It G Ma」で世界的に有名。"),

    // --- Chiba (千葉県) ---
    createRapper(37, "Bonbero", "千葉県", "Skill, Fast, POP YOURS", "千葉出身。圧倒的な高速ラップとスキル。POP YOURS出演。", ["Knock it Down"]),
    createRapper(38, "Tade Dust", "千葉県", "Skill, POP YOURS", "Bonberoとの共作も多い実力派。", ["Smartweed"]),
    createRapper(39, "eyden", "千葉県", "Rapstar Champion, Cool", "千葉出身。ラップスタア誕生2021王者。POP YOURS出演。", ["T.B.T."]),
    createRapper(40, "SKY-HI", "千葉県", "BMSG, CEO", "BMSG社長。高速ラップ。", ["八面六臂"]),
    createRapper(41, "RAU DEF", "千葉県", "Skill", "実力派ラッパー。"),
    createRapper(42, "DELI", "千葉県", "NITRO MICROPHONE UNDERGROUND", "千葉・松戸出身。現在は市議会議員。"),
    createRapper(43, "MIKRIS", "千葉県", "Team 44 Blox, Mad", "千葉を代表するマッドなラッパー。"),

    // --- Tokyo (東京都) ---
    createRapper(44, "Kohjiya", "東京都", "Nagasaki, Rapstar Winner, POP YOURS", "長崎出身だが東京拠点。RAPSTAR 2024優勝。音楽性の幅広さが魅力。", ["DREAM"]),
    createRapper(45, "Kaneee", "東京都", "POP YOURS, Rookie", "ラップ歴わずかでSTUTSに見出されPOP YOURS出演を果たしたシンデレラボーイ。", ["Canvas"]),
    createRapper(46, "JUMADIBA", "東京都", "UK Garage, Grime, POP YOURS", "UKガラージやグライムを取り入れた最新鋭のスタイル。", ["Kusabi"]),
    createRapper(47, "kZm", "東京都", "YENTOWN, Neo Tokyo, POP YOURS", "YENTOWN。常に新しいサウンドを提示するトレンドセッター。", ["DIMENSION"]),
    createRapper(48, "PETZ", "東京都", "YENTOWN, Cloud Rap", "YENTOWN。浮遊感のあるラップ。"),
    createRapper(49, "JNKMN", "東京都", "YENTOWN, Heavy", "YENTOWN。重厚なラップ。"),
    createRapper(50, "Awich", "東京都", "Okinawa, Queen, POP YOURS", "沖縄出身。東京のクイーン。POP YOURSヘッドライナー。", ["Queendom"]),
    createRapper(51, "IO", "東京都", "KANDYTOWN, Cool, POP YOURS", "KANDYTOWN。スタイリッシュなラップ。", ["Soul Long"]),
    createRapper(52, "KEIJU", "東京都", "KANDYTOWN, Melodic, POP YOURS", "KANDYTOWN。メロディアスなヒット曲多数。", ["T.A.T.O."]),
    createRapper(53, "Gottz", "東京都", "KANDYTOWN, Trap", "KANDYTOWN。ライブでの盛り上がりは随一。"),
    createRapper(54, "MUD", "東京都", "KANDYTOWN, Reggae vibe", "KANDYTOWN。レゲエのエッセンス。"),
    createRapper(55, "Hideyoshi", "東京都", "Tokyo Young Vision, Emo", "Tokyo Young Vision。エモーショナルな楽曲。", ["Dead End Adventure"]),
    createRapper(56, "Ralph", "東京都", "Grime, Power, POP YOURS", "UKグライムを日本で体現する。", ["BLACK BANDANA"]),
    createRapper(57, "BIM", "東京都", "CreativeDrugStore, Chill", "CreativeDrugStore。リラックスした雰囲気。", ["The Beam"]),
    createRapper(58, "VaVa", "東京都", "CreativeDrugStore, Producer", "ビートメイクもこなす奇才。", ["VVORLD"]),
    createRapper(59, "in-d", "東京都", "CreativeDrugStore", "THE OTOGIBANASHI'S。"),
    createRapper(60, "JUBEE", "東京都", "CreativeDrugStore, Rock", "ミクスチャーロックとの融合。"),
    createRapper(61, "PUNPEE", "東京都", "PSG, Legend, Subculture", "板橋出身。シーンの重要人物。", ["MODERN TIMES"]),
    createRapper(62, "5lack", "東京都", "PSG, Genius", "PUNPEEの弟。天才的なグルーヴ。", ["My Space"]),
    createRapper(63, "ZORN", "東京都", "Katsushika, Lyricist", "葛飾区出身。生活を歌う。", ["新小岩"]),
    createRapper(64, "SALU", "東京都", "Fluent", "日本語と英語を自由に行き来する。"),
    createRapper(65, "AKLO", "東京都", "Skill", "高度なラップスキル。"),
    createRapper(66, "KOHH", "東京都", "Oji, Legend", "世界的な影響力を持つ。現在は千葉雄喜。", ["MONOCHROME"]),
    createRapper(67, "Peterparker69", "東京都", "Hyperpop, Example, POP YOURS", "JillianとY ohtrixpointneverによるデュオ。"),
    createRapper(68, "STARKIDS", "東京都", "Hyperpop, Group, POP YOURS", "多国籍クリエイティブ集団。ハイパーポップ。", ["POP"]),
    createRapper(69, "Tokyo Young Vision", "東京都", "Group, Trap, POP YOURS", "Hideyoshiらが所属するクルー。"),
    createRapper(70, "ShowyVICTOR", "東京都", "Showy, New Wave", "Showyのメンバー。"),
    createRapper(71, "Worldwide Skippa", "東京都", "Skippa, AH1", "AH1出演。強烈なキャラクター。"),
    createRapper(72, "kkeinflo", "東京都", "New Wave, Melodic", "SoundCloudで話題。"),
    createRapper(73, "JMK", "東京都", "Drill, Dark", "東京ドリルシーン。"),
    createRapper(74, "Bene Baby", "東京都", "Kawaii, Trap", "ヒーローに憧れる独特の世界観。", ["Bene Baby"]),
    createRapper(75, "Skaai", "東京都", "Kyushu, Intelligent, POP YOURS", "アメリカ育ち。インテリジェンスなラップ。", ["BEANIE"]),
    createRapper(76, "Bleecker Chrome", "東京都", "R&B, Rap", "洗練されたサウンド。"),
    createRapper(77, "Yvng Patra", "東京都", "Cool, Dark, POP YOURS", "クールなトラップスタイル。", ["20"]),
    createRapper(78, "Xansei", "東京都", "Producer, Rap", "海外品質のトラック。"),
    createRapper(79, "Hezron", "東京都", "Rapstar Finalist, Trap", "低音ボイスが魅力。RAPSTARファイナリスト。"),
    createRapper(80, "valknee", "東京都", "Zoomgals", "K-POPロジックを取り入れたスタイル。"),
    createRapper(81, "Marukido", "東京都", "Zoomgals", "サブカルチャー要素。"),
    createRapper(82, "Haruko Tajima", "東京都", "Zoomgals", "ニューウェーブギャル。"),
    createRapper(83, "AkkoGorilla", "東京都", "Feminist", "パワフルなメッセージ。"),
    createRapper(84, "KIKUMARU", "東京都", "KANDYTOWN", "KANDYTOWNメンバー。"),
    createRapper(85, "Dony Joint", "東京都", "KANDYTOWN", "KANDYTOWNメンバー。"),
    createRapper(86, "Neetz", "東京都", "KANDYTOWN", "サウンドの要。"),
    createRapper(87, "Holly Q", "東京都", "KANDYTOWN", "俳優・上杉柊平。"),
    createRapper(88, "BSC", "東京都", "KANDYTOWN", "KANDYTOWNメンバー。"),
    createRapper(89, "Minnesotah", "東京都", "KANDYTOWN", "DJ。"),
    createRapper(90, "MASATO", "東京都", "KANDYTOWN", "KANDYTOWNメンバー。"),
    createRapper(91, "Novel Core", "東京都", "BMSG, Major", "メジャーシーンで活躍。"),
    createRapper(92, "edhiii boi", "東京都", "BMSG, High School", "高校生ラッパー。"),
    createRapper(93, "Amateras", "東京都", "Rich", "金持ちキャラ。"),
    createRapper(94, "Gokou Kuyt", "東京都", "Otaku, Cute", "アニメ・ゲームの世界観。"),
    createRapper(95, "who28", "東京都", "Emo", "エモーショナルな楽曲。"),
    createRapper(96, "Kenayeboi", "東京都", "Ambition", "期待の若手。"),
    createRapper(97, "RYOH", "東京都", "Local", "東京の若手。"),
    createRapper(98, "JUA", "東京都", "Model", "モデルとしても活動。"),
    createRapper(99, "Tohji", "東京都", "Mall Boyz, Icon, POP YOURS", "圧倒的なカリスマ性。", ["Angel"]),
    createRapper(100, "gummyboy", "東京都", "Mall Boyz", "メロウなスタイル。"),
    createRapper(101, "Stei", "東京都", "Mall Boyz", "プロデューサー。"),
    createRapper(102, "Yaona Sui", "東京都", "Mall Boyz", "Mall Boyz周辺。"),
    createRapper(103, "Salvador Mani", "東京都", "Trap", "独自のトラップ。"),
    createRapper(104, "Squash Squad", "東京都", "Trap, Legend", "トラップの先駆者。"),
    createRapper(105, "VITO FOCCACIO", "東京都", "Squash Squad", "Squash Squadメンバー。"),
    createRapper(106, "Mummy-D", "東京都", "RHYMESTER", "ベテラン。"),
    createRapper(107, "ZEEBRA", "東京都", "Legend", "日本のヒップホップの父。"),

    // --- Kanagawa (神奈川県) ---
    createRapper(108, "T-Pablow", "神奈川県", "BAD HOP, AH1", "川崎出身。BAD HOPリーダー。AH1ヘッドライナー。", ["Mobb Life"]),
    createRapper(109, "YZERR", "神奈川県", "BAD HOP, POP YOURS", "川崎出身。BAD HOPの頭脳。", ["Rich or Die"]),
    createRapper(110, "Benjazzy", "神奈川県", "BAD HOP, Skill", "随一のラップスキル。"),
    createRapper(111, "Tiji Jojo", "神奈川県", "BAD HOP", "メロディアスなフロー。"),
    createRapper(112, "Bark", "神奈川県", "BAD HOP", "BAD HOPメンバー。"),
    createRapper(113, "G-K.I.D", "神奈川県", "BAD HOP", "BAD HOPメンバー。"),
    createRapper(114, "Vingo", "神奈川県", "BAD HOP", "BAD HOPメンバー。"),
    createRapper(115, "Yellow Pato", "神奈川県", "BAD HOP", "BAD HOPメンバー。"),
    createRapper(116, "LEX", "神奈川県", "Shonan, New Wave, POP YOURS", "湘南出身。爆発的な人気。POP YOURS出演。", ["LiFE"]),
    createRapper(117, "JP THE WAVY", "神奈川県", "Shonan, POP YOURS", "世界基準のヒットメーカー。", ["LIFE IS WAVY"]),
    createRapper(118, "Leon Fanourakis", "神奈川県", "Yokohama, Trap", "日本語ラップの枠を超える。", ["T-Rex"]),
    createRapper(119, "SANTAWORLDVIEW", "神奈川県", "Yokohama", "高いエネルギー。"),
    createRapper(120, "LANA", "神奈川県", "Shonan, POP YOURS", "湘南出身。圧倒的な歌唱力。POP YOURS出演。", ["TURN IT UP"]),
    createRapper(121, "Only U", "神奈川県", "Yokohama, Melodic, POP YOURS", "横浜出身。ポジティブなバイブス。", ["POPCORN"]),
    createRapper(122, "Yokosquad", "神奈川県", "Yokohama, Trap, Squad", "横浜拠点のクルー。"),
    createRapper(123, "Candee", "神奈川県", "Kawasaki, Self-Made, AH1", "川崎出身。AH1出演。"),
    createRapper(124, "Carz", "神奈川県", "Yokohama, Rapstar Finalist", "RAPSTARファイナリスト。"),
    createRapper(125, "JAKEN", "神奈川県", "Reggae, Rap", "レゲエ・ラップ。"),
    createRapper(126, "OZROSAURUS", "神奈川県", "Yokohama, Legend", "横浜のレジェンド。", ["ROLLIN' 045"]),
    createRapper(127, "MACCHO", "神奈川県", "OZROSAURUS", "ハマの大怪獣。"),
    createRapper(128, "dodo", "神奈川県", "Kawasaki, Geek", "自宅録音のヒットメーカー。", ["importance"]),
    createRapper(129, "SOTA", "神奈川県", "BMSG, Dance", "BE:FIRSTメンバー。"),
    createRapper(130, "ASOBOiSM", "神奈川県", "Female", "OLラッパー。"),
    createRapper(131, "KOWICHI", "神奈川県", "Kawasaki", "ヒットメーカー。"),
    createRapper(132, "DJ TY-KOH", "神奈川県", "Kawasaki", "AH1 MC。"),
    createRapper(133, "NORIKIYO", "神奈川県", "Sagamihara", "ストーリーテラー。", ["EXIT"]),
    createRapper(134, "BRON-K", "神奈川県", "Sagamihara", "天才的なメロディセンス。", ["奇妙な果実"]),
    createRapper(135, "ICE BAHN", "神奈川県", "Yokohama, Legend", "FORK擁するグループ。韻へのこだわり。", ["LEGACY"]),
    createRapper(136, "DINARY DELTA FORCE", "神奈川県", "Fujisawa", "藤沢MOSS VILLAGE。", ["SOUNDTRACK TO THE BED TOWN"]),
    createRapper(137, "BLAHRMY", "神奈川県", "Fujisawa", "SHEEF THE 3RD, MILES WORD。"),

    // --- Niigata (新潟県) ---
    createRapper(138, "USU", "新潟県", "Legend", "新潟のシーンを支える。"),
    createRapper(139, "KW5SHINE", "新潟県", "Local", "新潟拠点。"),

    // --- Toyama (富山県) ---
    createRapper(140, "NAO", "富山県", "Local", "富山代表。"),
    // Removed RACK (Battle)

    // --- Ishikawa (石川県) ---
    createRapper(141, "addginjahzz", "石川県", "Group", "石川拠点。"),
    createRapper(142, "YOUNG BIZZY", "石川県", "Local", "金沢拠点。"),

    // --- Fukui (福井県) ---
    createRapper(143, "EL REY", "福井県", "Local", "福井代表。"),
    // Removed BUCHI (Battle)

    // --- Yamanashi (山梨県) ---
    createRapper(144, "田我流", "山梨県", "Stillichimiya", "生活とユーモア。", ["B級映画のように2"]),
    createRapper(145, "Young Hastle", "山梨県", "Muscle", "筋肉ラッパー。"),
    createRapper(146, "stillichimiya", "山梨県", "Group, Legend", "一宮町のクルー。Big Ben, MMM, Mr.麿。"),

    // --- Nagano (長野県) ---
    createRapper(147, "Wura", "長野県", "Local", "長野のベテラン。"),
    createRapper(148, "Rawoku", "長野県", "Local", "長野の次世代。"),
    // Removed MC Nigari (Battle)

    // --- Gifu (岐阜県) ---
    // Yellow Bucks moved to Aichi
    createRapper(149, "HARD VERK", "岐阜県", "Local", "岐阜を支える。"),
    createRapper(150, "TOSHI MAMUSH", "岐阜県", "Street", "岐阜のストリート。"),

    // --- Shizuoka (静岡県) ---
    createRapper(151, "Elle Teresa", "静岡県", "Numazu, Kawaii, POP YOURS", "沼津出身。世界的にも注目されるフィメールラッパー。POP YOURS出演。", ["Kawaii Bubbly Lovely"]),
    createRapper(152, "Shoco", "静岡県", "Local", "静岡拠点。"),
    createRapper(153, "CRAY-G", "静岡県", "West Coast", "静岡ウェッサイ。"),

    // --- Aichi (愛知県) ---
    createRapper(154, "\u00A5ellow Bucks", "愛知県", "Nagoya, TTTG, AH1", "高山出身だが名古屋拠点。現在のシーンのトップランナー。AH1ヘッドライナー。", ["Jungle"]),
    createRapper(155, "AK-69", "愛知県", "Nagoya, Legend", "アリーナ級アーティスト。", ["The Independent King"]),
    createRapper(156, "TOKONA-X", "愛知県", "Nagoya, Legend", "伝説のラッパー。", ["トウカイXテイオー"]),
    createRapper(157, "Campanella", "愛知県", "Komaki, Abstract, POP YOURS", "小牧出身。独創的なスタイル。", ["PEASTA"]),
    createRapper(158, "C.O.S.A.", "愛知県", "Chiryu, AH1", "知立出身。無骨なリリック。", ["Chiryu-Yonkers"]),
    createRapper(159, "MaRI", "愛知県", "Brasil, AH1", "ブラジルルーツ。AH1出演。"),
    createRapper(160, "homarelanka", "愛知県", "Nagoya, POP YOURS", "名古屋のアンダーグラウンド。POP YOURS出演。"),
    createRapper(161, "NEI", "愛知県", "Nagoya", "ドープなスタイル。"),
    createRapper(162, "Andre", "愛知県", "Nagoya", "若手実力派。"),
    createRapper(163, "RYOKI", "愛知県", "BMSG", "BE:FIRSTメンバー。"),
    createRapper(164, "PERSIA", "愛知県", "Reggae, Rap", "圧倒的な歌唱力。"),
    createRapper(165, "SOCKS", "愛知県", "Nagoya", "独特のキャラ。"),
    createRapper(166, "Crystal Boy", "愛知県", "nobodyknows+", "「ココロオドル」。"),
    createRapper(167, "G.CUE", "愛知県", "Gangsta", "名古屋の重鎮。"),
    createRapper(168, "Mr.OZ", "愛知県", "Gangsta", "低音ボイス。"),

    // --- Mie (三重県) ---
    createRapper(169, "YUKSTA-ILL", "三重県", "Suzuka", "圧倒的なスキル。", ["NEO TOKAI ON THE LINE"]),
    createRapper(170, "Kick a Show", "三重県", "Singer", "歌とラップの融合。"),

    // --- Shiga (滋賀県) ---
    createRapper(171, "SHY-PK", "滋賀県", "Local", "滋賀拠点。"),
    createRapper(172, "SNIPE", "滋賀県", "Underground", "実力派。"),

    // --- Kyoto (京都府) ---
    createRapper(173, "ANARCHY", "京都府", "Mukaijima, Legend, AH1", "レジェンド。AH1出演。", ["Rob the World"]),
    createRapper(174, "Daichi Yamamoto", "京都府", "Artistic, POP YOURS", "芸術的なセンス。POP YOURS出演。", ["Andless"]),
    createRapper(175, "Ruff Neck", "京都府", "Mukaijima", "ANARCHYのクルー。"),
    createRapper(176, "13ELL", "京都府", "Club", "クラブヒット。"),
    createRapper(177, "孫GONG", "京都府", "Outlaw", "ジャパニーズマゲニーズ。"),
    createRapper(178, "Ramasu", "京都府", "Local", "京都の現場。"),

    // --- Osaka (大阪府) ---
    createRapper(179, "WILYWNKA", "大阪府", "Hentai Shinshi, AH1", "変態紳士クラブ。トップスター。", ["PAUSE"]),
    createRapper(180, "Jin Dogg", "大阪府", "Ikuno, Emo, POP YOURS, AH1", "生野出身。激しいライブパフォーマンス。POP YOURS出演。", ["SAD JAKE"]),
    createRapper(181, "guca owl", "大阪府", "Chilled, POP YOURS, AH1", "東大阪出身。独特のグルーヴ。POP YOURS出演。", ["ROBIN HOOD STREET"]),
    createRapper(182, "RED EYE", "大阪府", "Suminoe, POP YOURS", "高校生ラップ選手権出身。POP YOURS出演。", ["LIVING"]),
    createRapper(183, "MC TYSON", "大阪府", "Suminoe, AH1", "パワフルなラップ。AH1出演。"),
    createRapper(184, "KVI BABA", "大阪府", "Toyonaka, Emo, POP YOURS", "豊中出身。エモーショナルな楽曲。POP YOURS出演。"),
    createRapper(185, "MFS", "大阪府", "Drill, POP YOURS", "「BOW」がヒット。POP YOURS出演。"),
    createRapper(186, "Choppa Capone", "大阪府", "West Osaka, POP YOURS", "西成スタイル。POP YOURS出演。"),
    createRapper(187, "VIGORMAN", "大阪府", "Reggae", "変態紳士クラブ。"),
    createRapper(188, "SHINGO★西成", "大阪府", "Nishinari, Legend", "西成の顔。"),
    createRapper(189, "韻踏合組合", "大阪府", "Legend, Hifumi", "大阪の重鎮。"),
    createRapper(190, "JAGGLA", "大阪府", "Tornado", "ジャパニーズマゲニーズ。"),
    createRapper(191, "Cz TIGER", "大阪府", "Tornado", "トラップスタイル。"),
    createRapper(192, "S-kaine", "大阪府", "Dark", "渋い声とビート選び。"),
    createRapper(193, "CYBER RUI", "大阪府", "Cyber, POP YOURS", "サイバーな世界観。POP YOURS出演。"),
    createRapper(194, "Taiyoh", "大阪府", "MaisonDe, POP YOURS", "MaisonDe。POP YOURS出演。"),
    createRapper(195, "lj", "大阪府", "MaisonDe", "MaisonDe。"),
    createRapper(196, "Pune", "大阪府", "MaisonDe", "MaisonDe。"),
    createRapper(197, "kojikoji", "大阪府", "Singer", "客演多数。"),
    createRapper(198, "BASI", "大阪府", "In-Sist, Chill", "韻シスト。"),
    createRapper(199, "TERRY THE AKI-06", "大阪府", "Legend", "裏庭スタイル。"),
    createRapper(200, "Young Coco", "大阪府", "Trap", "海外プロデューサーと共作。"),
    createRapper(201, "Eric.B.Jr", "大阪府", "Badass, AH1", "悪ガキスタイル。AH1出演。"),
    createRapper(202, "REAL-T", "大阪府", "Ikuno", "リアルな言葉。"),
    createRapper(203, "Umeda Cypher", "大阪府", "Group", "梅田サイファー（KZ, peko, KBD, KennyDoes, R-指定, KOPERU）。高いスキル。"),

    // --- Hyogo (兵庫県) ---
    createRapper(204, "Shurkn Pap", "兵庫県", "Himeji, MaisonDe", "姫路出身。バイラルヒット多数。", ["The Paparazzi"]),
    createRapper(205, "week dudus", "兵庫県", "Himeji, POP YOURS", "姫路出身。変幻自在のフロウ。POP YOURS出演。", ["VEGA"]),
    createRapper(206, "Merry Delo", "兵庫県", "Himeji", "姫路出身。"),
    createRapper(207, "SNEEEZE", "兵庫県", "Kobe", "神戸の実力派。"),
    createRapper(208, "JINDOGG", "兵庫県", "Amagasaki", "尼崎レペゼン曲もあり。"),
    createRapper(209, "空音", "兵庫県", "Amagasaki", "「Hug」が大ヒット。"),
    createRapper(210, "GeG", "兵庫県", "Producer", "変態紳士クラブ。"),
    createRapper(211, "小林勝行", "兵庫県", "Kobe", "リアルな表現。"),
    createRapper(212, "神門", "兵庫県", "Poetry", "ポエトリースタイル。"),

    // --- Nara (奈良県) ---
    createRapper(213, "HI-KING TAKASE", "奈良県", "Skill", "独特のリズム感。"),
    createRapper(214, "SPARKEY", "奈良県", "Battle", "奈良のバトルMC。（今回は楽曲フォーカスだが奈良の代表枠として維持、楽曲もリリースあり）"),

    // --- Wakayama (和歌山県) ---
    createRapper(215, "DAISUKE", "和歌山県", "Local", "和歌山拠点。"),
    // Removed SURRY (Battle)

    // --- Tottori (鳥取県) ---
    createRapper(216, "OGK", "鳥取県", "Local", "山陰の重鎮。"),
    // Removed JAKE (Battle)

    // --- Shimane (島根県) ---
    createRapper(217, "SKRYU", "島根県", "Melodic, Funny, POP YOURS", "島根出身。キャッチーなメロディとユーモア。POP YOURS出演。", ["SCREW"]),
    createRapper(218, "KOWREE", "島根県", "Local, Skill", "山陰の実力派。"),
    createRapper(219, "COJO", "島根県", "Local", "島根の若手。"),

    // --- Okayama (岡山県) ---
    createRapper(220, "紅桜", "岡山県", "Tsuyama, Enka", "津山出身。演歌のようなブルース。", ["紅桜"]),
    createRapper(221, "YAS", "岡山県", "Tsuyama", "津山のボス。"),
    createRapper(222, "FEIDA-WAN", "岡山県", "Spit", "スピッター。"),
    createRapper(223, "HANABI", "岡山県", "Duo", "岡山拠点。"),

    // --- Hiroshima (広島県) ---
    createRapper(224, "DOUGH BOY", "広島県", "West Coast", "広島ウェッサイ。"),
    createRapper(225, "MULBE", "広島県", "Boom Bap", "黒いグルーヴ。"),
    createRapper(226, "K-OUT", "広島県", "Local", "広島ストリート。"),

    // --- Yamaguchi (山口県) ---
    createRapper(227, "BUPPON", "山口県", "Lyricist", "深いリリック。", ["蓄積タイムラグ"]),
    createRapper(228, "BEZALEL", "山口県", "Local", "山口拠点。"),

    // --- Tokushima (徳島県) ---
    createRapper(229, "Watson", "徳島県", "Real, POP YOURS, AH1", "徳島出身。金なしコネなしからの成り上がり。POP YOURS出演。", ["FR FR"]),
    createRapper(230, "T-STONE", "徳島県", "Voice", "ハスキーボイス。"),

    // --- Kagawa (香川県) ---
    createRapper(231, "KUYA MIGUEL", "香川県", "Local", "香川の若手。"),
    createRapper(232, "MIC MASTER T", "香川県", "Local", "香川のベテラン。"),

    // --- Ehime (愛媛県) ---
    createRapper(233, "K-JAY", "愛媛県", "Local", "愛媛のMC。"),
    // Removed Disry (Battle)

    // --- Kochi (高知県) ---
    createRapper(234, "Seven", "高知県", "Local", "高知拠点。"),
    createRapper(235, "MP", "高知県", "Local", "高知のラッパー。"),

    // --- Fukuoka (福岡県) ---
    createRapper(236, "DADA", "福岡県", "High School, POP YOURS, AH1", "「High School Dropout」がヒット。POP YOURS、AH1出演。", ["Mine"]),
    createRapper(237, "Deep Leaf", "福岡県", "Group, POP YOURS", "福岡の若手クルー。POP YOURS出演。"),
    createRapper(238, "Rin音", "福岡県", "Pop", "「snow jam」。"),
    createRapper(239, "SHITAKILI IX", "福岡県", "Legend", "親不孝通りの伝説。"),
    createRapper(240, "FREEZ", "福岡県", "Underground", "親不孝のアンダーグラウンドキング。"),
    createRapper(241, "Olive Oil", "福岡県", "Producer", "世界的ビートメイカー。"),
    createRapper(242, "PEAVIS", "福岡県", "Skill", "福岡の次世代。"),
    createRapper(243, "YELLADIGOS", "福岡県", "Group", "PEAVIS所属。"),
    createRapper(244, "NF Zessho", "福岡県", "Skill", "玄人好み。"),
    createRapper(245, "Bank.Somsaart", "福岡県", "Trap", "福岡トラップ。"),
    createRapper(246, "Mega Shinnosuke", "福岡県", "Pop", "ジャンルレス。"),

    // --- Saga (佐賀県) ---
    createRapper(247, "HONOTO", "佐賀県", "Local", "佐賀拠点。"),
    createRapper(248, "DUCK BILL", "佐賀県", "Local", "佐賀のストリート。"),

    // --- Nagasaki (長崎県) ---
    createRapper(249, "Kohjiya", "長崎県", "Rapstar Winner, POP YOURS", "長崎出身。RAPSTAR 2024優勝。POP YOURS出演。", ["DREAM"]),
    createRapper(250, "REIDAM", "長崎県", "Oyakofuko", "親不孝の実力派。"),
    createRapper(251, "MARCO", "長崎県", "Local", "長崎拠点。"),

    // --- Kumamoto (熊本県) ---
    createRapper(252, "SPARTA", "熊本県", "Skater, Video", "ビデオグラファー出身。", ["3"]),
    createRapper(253, "餓鬼レンジャー", "熊本県", "Legend", "熊本のベテラン。"),
    createRapper(254, "WHISKY BOYZ", "熊本県", "Group", "熊本の若手。"),

    // --- Oita (大分県) ---
    createRapper(255, "ケンチンミン", "大分県", "Chill", "大分出身。"),
    createRapper(256, "18scott", "大分県", "Kanagawa", "神奈川活動だが大分ルーツ。"),
    createRapper(257, "O.G", "大分県", "Local", "大分のローカル。"),

    // --- Miyazaki (宮崎県) ---
    createRapper(258, "GADORO", "宮崎県", "Lyricist, AH1", "宮崎出身。言葉の重み。AH1出演。", ["四畳半"]),
    createRapper(259, "J-REXXX", "宮崎県", "Reggae", "宮崎出身のラガマフィン。"),
    // Removed MOL53 (Battle)

    // --- Kagoshima (鹿児島県) ---
    createRapper(260, "OWL BEATS", "鹿児島県", "Producer", "鹿児島拠点ビートメイカー。"),
    createRapper(261, "泰尊", "鹿児島県", "Local", "鹿児島の魂。"),

    // --- Okinawa (沖縄県) ---
    createRapper(262, "OZworld", "沖縄県", "Cyber, POP YOURS, AH1", "嘉手納出身。独特の世界観。POP YOURS出演。", ["OZWORLD"]),
    createRapper(263, "CHICO CARLITO", "沖縄県", "Sunny, AH1", "那覇出身。陽気なキャラクター。AH1出演。", ["Carlito's Way"]),
    createRapper(264, "RITTO", "沖縄県", "Unique", "石垣島出身。"),
    createRapper(265, "唾奇", "沖縄県", "Chill", "那覇出身。"),
    createRapper(266, "SugLawd Familiar", "沖縄県", "Group, Viral", "「Longiness」がヒット。"),
    createRapper(267, "MuKuRo", "沖縄県", "Dope", "沖縄のドープなスラング。"),
    createRapper(268, "3liyen", "沖縄県", "AH1", "AH1出演。"),
    createRapper(269, "Yvngboi P", "沖縄県", "AH1", "AH1出演。"),
    createRapper(270, "Pxrge Trxxxper", "沖縄県", "AH1", "AH1出演。"),
    createRapper(271, "Rude-α", "沖縄県", "Pop", "メジャーデビュー。"),
    createRapper(272, "D.D.S", "沖縄県", "U.S.K", "粘っこいフロー。"),

    // --- Additional Notables from Lists (POP YOURS, STARZ, AH1) ---
    createRapper(273, "7", "東京都", "Female, POP YOURS", "POP YOURS出演。"),
    createRapper(274, "Ashley", "東京都", "Female, POP YOURS, AH1", "POP YOURS, AH1出演。"),
    createRapper(275, "a子", "東京都", "Indie, POP YOURS", "POP YOURS出演。"),
    createRapper(276, "D3adStock", "神奈川県", "Rapstar Finalist", "RAPSTAR 2024ファイナリスト。"),
    createRapper(277, "L.I.P", "京都府", "AH1", "AH1出演。"),
    createRapper(278, "RKN", "東京都", "AH1", "AH1出演。"),
    createRapper(279, "Sirogaras", "東京都", "AH1", "AH1出演。"),
    createRapper(280, "Sugar Goose", "東京都", "Group, AH1", "AH1出演。"),
    createRapper(281, "Yayoi Daimon", "東京都", "Female, POP YOURS", "POP YOURS出演。"),
    createRapper(282, "Tokyo Young Vision", "東京都", "Group, POP YOURS", "Hideyoshi等が所属。"),
    createRapper(283, "STARKIDS", "東京都", "Hyperpop, POP YOURS", "POP YOURS出演。"),
    createRapper(284, "Peterparker69", "東京都", "Hyperpop, POP YOURS", "POP YOURS出演。"),
    createRapper(285, "Kenayeboi", "東京都", "Ambition", "期待の若手。"),
    createRapper(286, "Charlu", "東京都", "Female, Rapstar Finalist", "RAPSTAR 2024ファイナリスト。")
];

const jsonContent = JSON.stringify(rappers, null, 4);

fs.writeFileSync(outputPath, jsonContent, 'utf8');
console.log(`Successfully generated ${rappers.length} rappers data to ${outputPath}`);
