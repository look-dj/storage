"use strict";
const fs = require("fs");
const path = require("path");
const Service = require("egg").Service;
const filePath = path.resolve(__dirname, "../public");
const faction = [
	"离阳",
	"西蜀",
	"西楚",
	"北凉",
	"儒家",
	"北莽",
	"两禅寺",
	"吴家剑冢",
	"东越",
	"南唐",
	"大魏",
	"江湖势力",
	"朝廷",
	"武当",
	"龙虎山",
	"天下道门",
	"上阴学宫",
	"武帝城",
	"烂陀山",
	"徽山大雪坪",
	"春秋十三甲",
];
const name = [
	"黄龙士",
	"李淳罡",
	"叶白夔",
	"齐玄帧",
	"齐炼华",
	"徐骁",
	"徐凤年",
	"吴素",
	"李当心",
	"李义山",
	"王初冬",
	"酆都绿袍",
	"裴南苇",
	"温华",
	"南宫仆射",
	"黄阵图",
	"褚禄山",
	"徐偃兵",
	"陈芝豹",
	"薛宋官",
	"曹长卿",
	"拓跋菩萨",
	"洪敬岩",
	"北莽女帝",
	"吕洞玄",
	"高树露",
	"王仙芝",
	"邓太阿",
	"隋斜谷",
	"洛阳",
	"洪洗象",
	"王重楼",
];
const faction_intro = [
	"冥皇开创的生命禁区，演化为一大传承，研究尸体成道之学，试图控制轮回，收集万灵之血制造出源神、源鬼及跟通天冥宝相合的怪物，与源天师、圣体的诅咒均有关。在冥皇蛰伏沉睡时曾由数位至尊在内的诸多强者掌控，帝尊时期被长生天尊入主，附属于天庭，却又因长生天尊之故背叛古天庭。分为冥皇殿、阎罗殿、镇狱殿等派系，有生死轮回等秘术。镇狱皇死后地府风流云散，而怪物、源神、源鬼围攻叶凡被灭后，地府残余势力亦消亡，然实质上只要冥皇不完全消失，地府便仍存在",
	"曾经生活在远古昆仑仙山上的种族群，包括穷奇部、烛龙部等数十个战部，昆仑山被帝尊攻破后流落到飞仙星，昆仑亦破碎，一截被帝尊带到地球",
	"紫微星域国度，为金乌一族（血统不纯）控制，种族绝技有金乌腾挪术、金乌死咒、金乌他化天域外投影显形等。后因叶曈复仇而破败，为各方势力围攻所灭",
	"神话古路彼岸的至高势力，号称神域，系神话时代囚禁神魔形成的牢笼，因受到古天尊诅咒，故利用信仰之力方面有极大危险。主宰者自号神并汲取众生信仰之力修炼，青羽天之乱后绝神，接下来在道一等人攻打下覆灭",
	"西部妖族大门派，自古传承下来，在荒古时代曾几乎号令天下，但因与人族圣体相斗而衰落，但如今仍有堪比圣地实力。在东荒北域圣城开有七大拍卖行之一的天妖宝阙",
	"圣地，又名幽冥宫，传承来自圣地下万龙巢中的太古生物，创始人有太古生物血统。于七万余年前被一位姜家神王以极道武器覆灭",
	"远古时期的三大杀手神朝之首，与帝尊所建上古天庭同名，门派绝技有行字诀、天轮眼、虚实神术、破妄术、斗转星移等。由于人世间、地狱的陷害、出卖，十几万年前被诸圣地联手剿灭，但仍有后人隐于天之村。现为叶凡重建",
	"三大杀手神朝之一，总殿在中域。门派绝技有四象绝杀、隐踪神术、杀圣剑术、秩序之剑、人间杀阵、玉石俱焚、十方皆灭等，天庭覆灭后隐没，荒古后高调出世，并投靠太古族，被叶凡联合诸圣地剿灭",
	"三大杀手神朝之一，总殿在中域。门派绝技有隐身秘术、死亡诅咒、秩序锁链、斩破苍穹、地狱镇魂曲等，在天庭覆灭后隐没，荒古后高调出世，并投靠太古族，被叶凡联合诸圣地剿灭",
	"远古神朝，古天庭最后的传承，曾占据大半个中州，却在四大皇朝出现前因图谋羽化飞升失败过程中害死狠人大帝义兄，被狠人大帝一掌灭掉",
	"由阿弥陀佛所创，自阿弥陀星域传播而来，于北斗发源于西漠须弥山，功法有往生咒，大悲咒，无畏狮子印，六字真言，掌中乾坤，伏魔经，狮子吼，一百零八罗汉伏魔大阵，八灭真经，阿含经等；后因冲击仙路失败，诸寺尽毁，西漠生灵全灭，复在阿弥陀星域移民下渐渐重建。另佛教在地球等处亦有势力",
	"南岭族落，又名蛮古战神部落。隐世却很强大，族中有《蛮武古经》，种族绝技有神箭术、血矛术、战神之怒、一念斩苍穹、战神咒等。有苍龙、白虎、玄武（圣人，绝技为王霸神拳）三大守护兽，底蕴含一尊战神",
	"东荒七大生命禁区之一，位于东荒南域，太古后形成，内有荒和荒奴。第一代荒为九世大成圣体之一，后出问题被第二代荒（疑为狠人大帝）救下",
	"东荒七大生命禁区之一，位于东荒中域，为皇级圣灵石皇所创，石皇被叶凡击杀后不死山被叶凡带到天庭。九世大成圣体之一自其中划出圣崖。",
	"东荒七大生命禁区之一，地处东荒西部地域，相传是从另一个世界坠落下来的，内有不死蟠桃树，最终被叶凡率人抹灭",
	"东荒七大生命禁区之一，自成一界，出口位于北斗。曾极度鼎盛，但十几万年前被虚空大帝击毙两人，仙路黑暗动乱中，其内轮回之主（有秘术“三界轮回”等，帝兵为一件羽化青金战衣，于战中亦毁）亦被相合的轩辕和姬子击杀，仅最后逍遥天尊昀亘死于叶凡之手，轮回海被抹灭",
	"皇族，太古前曾封印人魔，因人魔的复仇而不得已举族迁回祖星。古皇秘术有龙吟动九天等，其始祖于飞仙星仙路之战中对决叶凡而殒命",
];
const role_intro = [
	"刀甲，书法大家。北凉王妃吴素的父亲，徐凤年的外公，女婿徐骁。西楚出身，曾化名吴疆常年守于清凉山。临终前于两辽与顾剑棠一战胜之，杀尽钦天监练气士和八百侍卫。",
	"道甲。龙虎山上代掌教。五十年前一己之力屠戮殆尽魔门六位护法，自言十二岁开窍，明白自己为吕祖转世在此只为等候红衣，只因这一世自知等不到了才投胎转世，来世再等。至于到底是飞升是转世，未有定论;不过有一点江湖中人引为憾，便是这位真人直到飞升转世，都不曾跟王仙芝一较高低，否则天下第一就不会空悬了。内力高绝，能文能武。坐下一头黑虎瑞兽，灵气盎然。",
	"棋甲、书甲、算甲，又称黄三甲。江湖隐士。被公认十九道第一，草书和阴阳谶纬第一，享誉天下，曾是上阴学宫最为得意的门生，初代儒圣所收小弟子。九国大战，游说其中，一张嘴挑起许多战火。因春秋十三甲独得三甲，自诩黄三甲。与韩人猫，徐人屠并称为江湖人人得而诛之的三大魔头。呵呵姑娘的义父。布局天下。棋在棋盘外。舍弃一身境界，帮助徐凤年击杀王仙芝。最后一位春秋大魔头也在徐凤年斩龙后不久逝去。",
	"年近百岁却成名八十年，是当之无愧百年一遇的武学天才，明明具备天下第一傲视群雄的资格，以天下第二自居，这使得武林江湖上脍炙人口的十大高手排到了第十一，榜首第一的宝座空悬二十年。不带兵刃，与人交锋，只出单手。胜剑九黄，匣中名剑尽留武帝城；胜李淳罡，双指折断木马牛。江湖人视作天阁仙境人物，高不可攀。靖安王赵衡为其半个义子。自称天下第二一甲子，只为纪念当年爱惜人才，让了半柄木马牛和一世威名的李淳罡。新武评第一，为白帝降世，徐凤年入陆地神仙后出城前往北凉，与徐凤年一战后败后未选择飞升，魂魄一分为三，送江湖三份机缘，已逝。",
	"四百年前江湖第一大魔头，唯一一个曾以无敌天人之姿走过江湖的绝世人物。曾为大奉王朝皇子，因不愿继承皇位，入山求道。走火入魔后屠尽江湖一品三境高手，光陆地剑仙就杀了两个，后为秦皇转世以封山符所封。四百年后开山，在北凉与徐凤年倾力一战后无悔死去，来时无忧去时无忧。当世所云一品四境，即出自他的武学境界。",
	"六百年前的武当鼻祖，剑道天道俱是天下第一人，骑鹤上武当，以仙剑大道创武当两束道袍慧剑，寓意断烦恼斩尘根，剑道出神入化，是有名的陆地剑仙，同时也精于炼丹，诗词歌赋多有流传，墨宝只八个字“玄武当兴，鬼哭雄关”。一爱红衣八百年。",
	"北莽人。新武评第四后第七曾言羞于位列其前，柔然铁骑之主，王仙芝口中的未来江湖扛鼎之人。天生银眸无瞳，故号更漏子，因杀死齐当国被徐凤年所杀。",
	"兄长北莽大将军种神通，心性坚韧不拔，号称北莽魔道第二人，精通百家之长，熔铸一炉最终以指玄境成就一身不输天象境的杀力。但最终没金刚体魄的他便没继续一味追求杀伤力以此跻身天象境，而是在枪术上另辟蹊径，只取守势而不取攻招，力争拒敌于枪尖外。一向以离经叛道名动草原的种家二当家选择枪术作为自身武学“落叶归根处”弥补自身武道短处。他对性情相近的侄子种檀寄予厚望，在拒北关袭杀中原宗师被于新郎斩下头颅。",
	"北莽军神，外貌如庄稼汉子的绝世高手。曾在王仙芝之后列新武评第二。与麒麟真人不和，大江边上斩去麒麟真人的一具分身。在北海神兵为洛阳所毁。战平邓太阿。后与徐凤年在西域转战数月，差一线就被取下人头，因李密弼援手才保住一命，在北凉拒北关阻击徐凤年，后被徐凤年重伤不复境界。前武评四大宗师之一。",
	"曹官子，一身青衣，落魄西楚士子，曾师从西楚国师李密。久负盛名的一品高手，号称收官无敌。一心想要找到西楚公主复国，却不知公主姜泥就在徐凤年身边。被誉作“独占天象八斗风流”，在两禅寺求白衣僧李当心编新历为西楚留一线生机。后将姜泥从徐凤年身边带走。在西垒壁一举入儒圣，为复国造势。两救徐凤年偿还江南道的恩情。与公主姜泥观礼太安城尽显圣人气象。新武评第四。现评四大宗师之一。",
	"原西楚太平公主，亡国后十二岁入北凉王府，昔年贵为太平公主，今日沦为婢女，身负国仇家恨。袖中有一柄“神符”匕首。于武当写下《月下大庚角誓杀贴》，末了一句“姜泥誓杀徐凤年”，让徐凤年久不能平静。随徐凤年上武当，出北凉，游历天下。本人敬畏鬼神，却天资过人。《月下大庚角誓杀贴》，武当剑痴王小屏赞字中有剑意；随老剑神李淳罡习字，不去练剑，剑意自然足；老剑神称其剑意磅礴神似王妃；黄龙士称其天下气运第一。畏惧徐渭熊。于武当山顶与隋珠公主结怨。与徐凤年二次游历途中为曹长卿带走，互赠大凉龙雀与神符。先后遇徐凤年于北莽和太安城，随曹长卿复国西楚。前世为大秦皇帝妃子，秦皇为她负了天下。曾为帮徐凤年“落子”王仙芝。徐凤年与拓拔春隼一战陷入死境时出现救下徐凤年。入选新一轮的胭脂榜主榜。已被徐凤年带回北凉，在距北城上为十八高手擂鼓。在正文最后嫁给徐凤年。",
	"年轻目盲女琴师，原杀手榜有名的琴魔，北莽十大杀手之一，善于指玄杀金刚。在徐凤年孤身入北莽时曾受姚简、叶熙真以五百斤黄金收买对其进行狙杀。诸禄山买其点到即止，徐凤年师父李义山买活。后来随苏酥一同赴西蜀，在陈芝豹入蜀之后败于其手。与苏酥互有情意，已相许终身。在拒北关前和十七位宗师一起抵抗北莽大军。得到程白霜帮助下躲过死亡。",
	"小人屠，白衣兵仙，原名陈知报，北凉王六义子之首（“虎”）。北凉大将陈邛之子。北凉三十万铁骑威望仅次于徐骁的小人屠，枪术冷冽杀伐，上阵厮杀俱是一往无前，对敌对己都不留退路，一手将自己和昔日天下四大名将之首叶白夔共同逼入了不死不休之地，最终得胜；师从枪仙王绣，并刺死自己的师傅。爱慕徐渭熊。国战之后曾亲口拒绝皇帝自领兵马南疆封王的要求。有武器“梅子酒”（白马银枪梅子酒，纵横天下谁敌手），绝技“梅子青转紫”，试图截杀徐凤年，途中重伤徐渭熊，并与曹长卿在剑门关外有过一战。后叛出北凉，雄踞西蜀，先帝封蜀王，兵部尚书。大奉开国皇帝转世。",
	"原为江南落魄书生，被曹长卿称为表面行儒道，实则行的是法家霸道。徐凤年慧眼识珠带回北凉，李义山对其评价颇高，自评善于居于幕后运筹帷幄。后成为任职最久的北凉道经略使。",
	"徐骁贴身扈从，姓刘，师兄王绣，枪道武圣，北凉第一高手，与徐凤年亦师亦友。当年为王绣报仇找到徐骁，与老黄激战，逼迫老黄使尽八剑方能压制。也是当年王绣被杀时，只用普通木枪抵挡梅子酒才让刹那枪没有落入陈芝豹手中。曾逼退洪敬岩。在北莽开启战事后进入北凉军，对付北莽派来刺杀北凉官员的人。登榜新武评前十五。现在北凉拒北关抵抗北莽大军。",
	"六义子三犬中的狼犬，北凉军中替徐骁扛旗的猛将，贫贱行伍出身，正四品武将折冲都尉，为人老实忠厚，被陈芝豹看作是六位义子中唯一的朋友。一直看好徐凤年。凤年未及冠时，每年都向凤年讨要凤年写的对联。后担任铁浮屠主将。祥符二年在关外龙眼儿平原被洪敬岩杀死。",
	"六义子三犬中的鹰犬，绰号禄球儿。体型臃肿如球（自称入徐家军前是120多斤腱子肉的壮汉），手持三千精兵虎符的从三品千牛龙武将军。当年追随义父徐骁征战南北，为义父挡下十一剑。徐骁封王后许诺他可犯十一死罪而不死。因可以八叉手而成宫韵，被李义山称为“褚八叉”。手持三千精兵虎符的从三品千牛龙武将军，北凉军文武第一人，北凉谍报首领，现任北凉都护，坚持镇守怀阳关。拒北城一战后徐凤年亲率一万大雪龙骑军，长途奔袭，火速驰援怀阳关，只见褚禄山坐在尸骨累累的城墙走马道之上，手持凉刀拄地，生死不知。",
	"六义子第二位白熊，会用左手刀和枪。在战场上未逢敌手是整个离阳军队中能排进前三甲的高手，北凉军中第一猛人和骑战第一人。王仙芝以为他必能以刀入天象。取缔钟洪武成为骑军统领授车骑将军，统帅大雪龙骑。",
	"北凉王府的马夫，缺门牙背剑匣的老仆人。跟随徐凤年游历三年六千里，言语不多却能说出质朴的道理，徐凤年曾言没有他自己走不下三年六千里。铁匠出身，与西蜀剑皇同为隋斜谷弟子。曾经力战徐偃兵，拼尽八剑方能压制徐偃兵。因为创出剑一到剑九的九式剑法而被称为剑九黄。背负的剑匣中本有天下十大名剑中的六柄，早年曾挑战王仙芝，留下其中之一。返回北凉后，击败白发老魁，留下九剑剑谱赠予徐凤年，让他代收徒弟可以保护自己，将剑九命名为六千里以纪念三年游历。再赴武帝城挑战王仙芝，战败身死，匣中名剑尽留武帝城。他是对徐凤年影响最大的人之一。临终前屹立不倒，身面向北，留下一句遗言：“来,给少爷上酒！”。",
	"天下第一美女。谢观应的女儿，徐凤年的红颜知己。武学奇才，在徐凤年三年六千里的游历中与他相识，得到登听潮亭的机会。双刀绣冬春雷的主人。李淳罡曾断言他是日后足以与王仙芝一战的天才，曾一刀卷动漫天风雪。容颜绝世，胭脂榜将其列为天下第一，天下第二的陈渔评价为不输南宫于武道之上天赋高绝，虽未入新武评天下十五人之列，却被评为只差一楼，与江斧丁、洪敬岩为王仙芝眼中未来江湖扛鼎之人。携王生入北莽，誓要成为天下第一。在凉莽战场上救下徐凤年，使出十八停，但终生不再有使出十九停的心境，最后成了徐凤年的妻子。",
	"徐凤年的生死兄弟。寒微游侠，提一杆木剑，走一场江湖，与徐凤年三千里游历路上邂逅，跟老黄和李姑娘嬉笑打闹。后于襄樊城外与徐凤年再遇。拒绝徐凤年帮其介绍李淳罡只为一心练就自己的剑道。被黄三甲看重，传授怪人隋斜谷的两剑。入京城比剑，一连三败，得温不胜之名。战平棠溪剑仙卢白颉，一举成名。黄三甲以他钟爱的女子声色双甲李白狮和教剑恩情相胁让他杀徐凤年。温华知晓徐凤年的真实身份后，自断一臂一腿，舍弃心爱女子和有望成就陆地神仙的剑，折剑出江湖。温华是本书中江湖气最重的人物，虽惫懒无赖，然有志向，亦重情义，是真正的江湖儿女。后在家乡与一刘姓温婉女子成家。同乡有王明寅妻儿。",
	"徐凤年的弟弟，生而金刚境，根骨非凡然心智未开。老天师赵希抟到北凉时收他为弟子，带回龙虎山传授大梦春秋。收服齐玄帧座下黑虎后出龙虎山，身披新铸符甲。北莽一战成为龙象军大统领，深得军心，现统军镇守流州。剑神李淳罡曾评价为“可能成为第二个王仙芝”。",
	"整个北凉最早投入徐骁帐下的军师之一。出身寒微，被世人称为阴才，善于毒计，为徐家为北凉鞠躬尽瘁死而后已。徐凤年少年时拜其为师，是徐凤年最尊敬的人物之一。穷其一生几乎都在听潮阁中算计北凉政敌，导致身体不佳病入膏肓，临死前也给徐凤年留下十三计连环计，天下之事几乎尽在他的掌握之中。和纳兰右慈年少相交，携手同游，两人共同策划了士子北奔卧底北莽的计划，死后骨灰撒在边境，希望死后能够看到北莽被北凉攻破。",
	"北凉王妃。出自吴家剑冢，吴家上代剑冠。赵玉台为其剑婢。其父为兼具刀甲、书圣二称号的齐练华。为徐骁毅然与吴家剑冢决裂。导致本届剑冠吴六鼎刺杀徐凤年。埋剑青城山。西垒壁一袭白衣缟素亲自敲响战鼓鱼龙鼓，鼓声如雷，不破西楚鼓不绝，天下动容。姥山北凉旧部王林泉供佛白玉观音则是以王妃容貌为面相。为徐凤年留下死士两名，红薯为其一。",
	"离阳王朝硕果仅存的异姓王——北凉王。统御西北三州。十岁从军杀人，从东北锦州杀匈奴到南部灭大小六国屠七十余城再到西南镇压蛮夷十六族，征战西楚时左腿中了流矢一箭，落下了微瘸的后遗症。亲领战力第一大雪营龙骑军，御敌北莽军三十五万。在北凉“私下”交位给徐凤年后不久安详地死在床上。",
	"徐姓，名凤年，字天狼。为真武大帝降世临凡，八百年前乃大秦皇帝，皇后为洛阳。人间身份是北凉王世子，以纨绔形象著称于世，实则胸藏沟壑，腹有良谋。",
	"桃花剑神，吴家剑冢的私生子。倒骑毛驴，提一根桃花枝。明言并非不屑佩剑，只是天下少有值得他出剑的对手。三战王仙芝。受恩于吴素，在武帝城为徐凤年六剑杀六奴，赠十二飞剑，钉杀出窍天人赵宣素，偿还恩情。曾一路杀到龙虎山天师府门前。靠李淳罡借剑战平拓跋菩萨，胜洛阳，出海访仙归来，剑指南海。新武评四大宗师。前往北凉拒北关一起抵抗北莽大军。北莽用来对付徐凤年的天道镇压光柱被他凌空一剑斩去，使得光柱提早撤去。曾在天门之外悬空而停，横臂且横剑，笑问道：“试问天上仙人，谁敢来此人间？！”",
	"剑甲，十三甲之首，青衫老剑神。甲子前为四大宗师之首，五十年前与王仙芝一战，因惜才不惜自毁名声未使出剑开天门，败于王仙芝毁去木马牛，后错杀心爱女子，本欲去龙虎山向齐玄帧讨要续命丹药，经斩魔台美人西去，上山与齐玄帧论道乱了道心，境界跌落至指玄，与隋斜谷互换一臂，后被困北凉王府听潮亭二十年。于鬼门关斩出剑仙一剑逼退吴六冠。后于大雪坪一句惊世 剑来 重归剑仙之境，武帝城一战，迫王仙芝使出九分力。广陵江一战，一剑斩甲两千六，一气千里又百里，突破天人境界。临死前万里借剑邓太阿，助其突破陆地剑仙境，战平拓拔菩萨。被徐凤年誉为：只要每当你能够问心无愧的时候，比如一甲子前的青衫剑神，比如一甲子后解开心结的羊皮裘老头，总是那么轻轻松松就成为了天下第一，天下无敌的头衔那么重，也只有你李淳罡说放就放，想拿起就拿起。被江湖小宗师阮京华作诗称赞：无匣也无鞘，暗室夜常明。三尺木马牛，可折天下兵。欲知天将雨，铮铮发龙鸣。提剑走人间，百鬼夜遁行。飞过广陵江，八百蛟龙惊。世人不知何所求，那袭青衫放声笑：天不生我李淳罡，剑道万古如长夜。是当之无愧的甲子剑道第一与甲子前的天下第一。",
];
const realm = [
	"下三品",
	"中三品",
	"上三品",
	"小宗师",
	"金刚境",
	"指玄境",
	"天象境",
	"真陆地神仙",
	"伪陆地神仙",
];
const realm_intro = [
	"伤甲而不破，是下三品",
	"破六甲以下，中三品",
	"破甲八九，上三品",
	"金刚境喻释家,佛门入一品为金刚",
	"指玄境喻道家,道门入一品为指玄",
	"天象境喻儒家,儒门入一品为天象",
	"陆地神仙，为三家殊途同归",
	"一品往上，则是破碎虚空，剑开天门，或举霞飞升",
];
const weapon = [
	"木马牛",
	"梅子酒",
	"绣冬 春雷",
	"木剑",
	"大凉龙雀",
	"素王",
	"黄庐",
	"太阿",
	"胸臆",
	"定风波、巨骼",
	"扶乩",
	"蜀道剑",
	"过河卒",
	"天问",
	"墨眉",
	"非攻",
	"凌虚",
	"雪霁",
	"鲨齿",
	"渊虹",
];
const weapon_intro = [
	"无匣也无鞘，暗室夜常明。三尺木马牛，可折天下兵。欲知天将雨，铮铮发龙鸣。提剑走人间，百鬼夜遁行。飞过广陵江，八百蛟龙惊。世人不知何所求，那袭青衫放声笑：天不生我李淳罡，剑道万古如长夜！木马牛是剑神李淳罡的佩剑，出自吴家剑冢四大神兵之一，和神符，符甲一样由天外陨石打造而成。与王仙芝一战因惜才没有用出剑开天门，木马牛被王仙芝徒手折断。",
	"白衣兵圣陈芝豹的武器，分为枪身和枪头两部分。平时没有大战时，两者分开，出行的时候陈芝豹会背负枪身，与人对战时再将枪头装上。这一点可以参考齐当国死后陈芝豹返回北凉与徐凤年对战时的场景。",
	"白狐脸的随身兵器。春雷刀长二尺四寸，重一斤三两，吹毛断发可轻易破开重甲，锋利无比。绣冬刀长三尺二寸，重十斤九两，炼刀人不求锐利，反其道行之，钝锋。这是一把钝刀。",
	"以此纪念以手足换手足，折剑出江湖的温华！就算你不练剑了，也是雪中的剑仙！",
	"大凉龙雀是雪中最著名的名剑之一，早先是属于北凉王妃吴素，与这位女剑仙一起名震天下，曾经一剑破去一百六十甲，让天下英雄低头，后来吴素去世后，这把剑一直被剑侍赵玉台所守护。在第二次出游的时候，于青城山青羊宫中，赵玉台将这把宝剑交给了徐凤年，并叮嘱他，如果以后碰上了恰好学剑的好女人，就把这作为聘礼送给她，而后被徐凤年转赠给了小泥人。",
	"素王剑，既是这一代吴家剑冢家主的名号，也是他的佩剑。但是在吴家这一代的剑冠吴六鼎要出世磨砺之时，这把剑被吴老爷子假借吴六鼎之手，送给了翠花，一个只会酿酸菜，却是吴六鼎的挚爱的女子。翠花的剑道天赋比吴六鼎还要高，但凡剑法只要看一遍便能习得一二，在最后的拒北城之战前，翠花突破到了陆地剑仙境，成为天下少有的女子剑仙。",
	"黄庐剑本来是剑九黄黄阵图所有，但是在剑九黄第一次在武帝城与王仙芝相斗的时候，败了，于是黄庐剑就留在了武帝城当中。这也是剑九黄一直念念不忘的事情。但是因为需要帮徐骁看守湖底的楚狂奴，剑九黄一直没有动念再次前往武帝城当中。在徐凤年第一次游历天下回来后，楚狂奴也脱困出了湖底。剑九黄不用在看着楚狂奴以后就决定去武帝城取回黄庐剑，当然了，大家都知道，这是去送死的。在这一段话当中，徐凤年曾经问过就是插在武帝城城墙上的十大名剑当中排行第四的黄庐？这里是提到了位列第四的。但是在番外说到天下第七名剑骊珠剑之前的六大名剑的时候就没有提到黄庐剑了。此外就是剑九黄在前往武帝城之前，徐凤年曾经问过他剑匣里背的是什么，剑九黄答道是天下十大名剑的五把，本来有六把，一把黄庐在武帝城头了，所以只剩五把。但是天下十大名剑吴家剑冢那边就有六把了，他这哪儿来的六把，所以是有冲突的。在徐凤年战胜王仙芝后，从武帝城取回了黄庐剑，后来大概是给了王生。",
	"太阿剑，与木马牛、胸臆、龙雀一起树立在吴家剑冢之巅。邓太阿这个吴家剑冢的私生子被找到后就被抛到了剑山当中自生自灭，而在吴家老爷子和吴素的帮衬下，邓太阿成功的活了下来，也得到了太阿剑的认可。但是邓太阿在离开剑冢的时候并没有带走太阿剑，而是以一支桃花枝做武器，成就了桃花剑神的名号。而太阿剑也如同弃儿一般孤零零的在剑山之中。",
	"胸臆剑出现在雪中正文当中，吴老爷子说树立在吴家剑山之巅的几把名剑，木马牛在李淳罡手中断了，大凉龙雀被吴素带出剑冢现在在姜姒手中，太阿剑到了邓太阿手中，素王被吴见假借吴六鼎之手给了翠花。只有这把古剑胸臆，至今迟迟不肯认主，孤零零的树立在剑山之上。",
	"巨骼剑这把剑只出现在番外之中，提到它位列天下名剑第六位，位于骊珠剑之前。但是这个排名又与雪中正文等等有所冲突。在雪中正文当中提到了一把叫做定风波的剑，长达二十一寸三分，以求“长剑致远”的深意，是一把新铸不过二十年的剑。这把剑在洪敬岩的师父，剑气近黄青手中，是北莽第一名剑。而在黄青与徐龙象相斗之时，提到了这把剑位列天下名剑第六位。最后黄青一剑刺穿徐龙象的胸口，徐龙象一拳把黄青爆了头，徐龙象咬着定风波硬顶天雷，定风波也被天雷洗礼了，最后落入了邓太阿之手，不过貌似邓太阿没用过，毕竟有太阿剑了……",
	"扶乩剑也是一把没啥故事，被烽火遗忘的宝剑。在正文中还穿插着扶乩剑是东越剑池弟子单饵衣铸造的新剑的设定。但是主要是在拒北城剧情之前，隋斜谷来到北凉王府，说听潮阁藏着十大名剑中的“扶乩”和“蜀道”，想要吃，但是被徐凤年拒绝了。这两把剑是二姐徐渭熊最钟情的两把剑之一，所以徐凤年舍不得，但是徐渭熊却深明大义的主动送给了隋斜谷，但是最后隋斜谷最后没有收这两把剑。",
	"蜀道剑是和扶乩剑一样，被藏在听潮阁当中的十大名剑之一。在褚禄山千骑开蜀之前，就有一位青衫剑客一人一剑开蜀，这一剑名为蜀道。这一剑铸于西蜀，西蜀之剑，越古越珍，而蜀剑前三甲，就是西蜀剑皇的，还有一直位列十大名剑的“蜀道”和“雷匣”。这个“雷匣”又是一把全书当中只出现过一次的名字，没有故事没有排名，就知道他在前十。",
	"是屈原对于天地、自然和人世等一切事物现象的发问。从少羽口中可知，天问是著名铸剑师欧冶子所铸，又有著名相剑师风胡子点评，位列剑谱十大名剑之首。原属于楚国，秦一扫六合后，现为秦始皇嬴政所有。当真世上也只有天问才能配得起嬴政的地位",
	"“似剑非攻，墨眉无锋”，剧中的这句话无疑是对墨眉最贴切的描述。墨眉不仅本身特别，它的出场更为有特色———全场水墨画意境，被攻击者更是被水墨般的剑气笼罩难以脱身。没有剑锋以剑气应敌，巧妙地融合了墨家“兼爱非攻的思想”，当之无愧的德者剑！（说到这真心佩服玄机前三部的设计创作，能将历史、意境、人的性格、传达的思想等有机融合来创作一件作品。四五部新出场的设计大多偏华丽，并且趋于相同。）第三部燕丹中六魂恐咒，将墨眉传于天明。",
	"非攻号称墨家的至尊武器，拥有多种变化形态，经历代墨家巨子改良，被天明闯过墨家禁地侠道时获得，神奇无比。后落入大司命之手，大司命交给星魂，星魂为了获得蜃楼的图纸又将非攻给了公输仇。",
	"空谷临风，逸世凌虚。位列剑谱，排名第十。张良自述“青翠革质剑鞘，浑然天成，嵌一十八颗北海碧血丹心，剑身修颀秀丽，通体晶莹夺目不可逼视”。凌虚剑是《秦时明月》中少有的被描述得这么具体的兵器了，这得感谢其剑主是一位意气风发的谋圣。第五部以剑论道虽然没打成，但是从之前救天明少羽的那场战斗可以看出，张良的剑法完全就是“轻灵飘逸”的完美写照。借用胖大妈那句话“张三先生用这把剑真是太般配了！”",
	"雪霁，道家信物，位列剑谱，排名第六。外形细长，说是剑，倒不如说更像一根长长的针。雪霁现在由道家人宗掌门逍遥子执掌，是逍遥子在五年前的雪霁争夺战从天宗掌门赤松子手中赢过来的。霁：指雨雪停止，天放晴。雪霁，那便是雪停的意思，有“清扫阴霾之气”的寓意。逍遥子的剑招雪后初晴其实便有雪霁的意思，也不知道是不是道家人宗专门为雪霁定制的招式，配合雪霁使用轻松化解星魂的聚气成刃。",
];
class SqlService extends Service {
	faction() {
		let that = this;
		let { config } = that;
		return new Promise(async (resolve, reject) => {
			let images = await that.imgs();
			let src = path.join(filePath, "/faction.txt");
			console.log(src);
			function random(num) {
				return Math.floor(Math.random() * num);
			}
			let str = "";
			let status = ["繁荣", "灭亡", "衰败", "快速发展"];
			let year = [
				"186-255",
				"255-264",
				"264-278",
				"278-295",
				"295-301",
				"301-355",
			];
			let factionId = "13";
			for (let i = 1; i < 101; i++) {
				let faction_len = faction.length;
				let status_len = status.length;
				let faction_intro_len = faction_intro.length;
				let year_len = year.length;
				let name_len = name.length;
				let image_len = images.length;
				let s = `(${i},'${faction[random(faction_len)]}','${
					status[random(status_len)]
				}','${faction_intro[random(faction_intro_len)]}','${
					year[random(year_len)]
				}','${name[random(name_len)]}','${
					images[random(image_len)]
				}','1600241901485','${factionId}'),\n`;
				str += s;
			}
			fs.writeFile(src, str, function (err) {
				if (err) {
					console.log(err);
					reject(err);
					return;
				}
				let link = `${config.site}/public/${path.parse(src).base}`;
				resolve({ link });
			});
		});
	}
	role() {
		let that = this;
		let { config } = that;
		// (1,'','dd','dd','男','北凉','dd','1600241012046',9),
		return new Promise(async (resolve, reject) => {
			let images = await that.imgs();
			let src = path.join(filePath, "role.txt");
			function random(num) {
				return Math.floor(Math.random() * num);
			}
			let sex = ["男", "女"];
			let str = "";
			let roleId = "12";
			for (let i = 1; i < 101; i++) {
				let faction_len = faction.length;
				let name_len = name.length;
				let role_intro_len = role_intro.length;
				let realm_len = realm.length;
				let image_len = images.length;
				let s = `(${i},'${images[random(image_len)]}','${
					name[random(name_len)]
				}','${role_intro[random(role_intro_len)]}','${
					sex[random(2)]
				}','${faction[random(faction_len)]}','${
					realm[random(realm_len)]
				}','1600241901485','${roleId}'),\n`;
				str += s;
			}
			fs.writeFile(src, str, function (err) {
				if (err) {
					console.log(err);
					reject(err);
					return;
				}
				let link = `${config.site}/public/${path.parse(src).base}`;
				resolve({ link });
			});
		});
	}
	weapon() {
		let that = this;
		let { config } = that;
		return new Promise(async (resolve, reject) => {
			let images = await that.imgs();
			let src = path.join(filePath, "weapon.txt");
			function random(num) {
				return Math.floor(Math.random() * num);
			}
			let str = "";
			for (let i = 1; i < 51; i++) {
        let image_len = images.length;
				let name_len = name.length;
				let weapon_len = weapon.length;
				let weapon_intro_len = weapon_intro.length;
				let s = `(${i},'${weapon[random(weapon_len)]}','${
					weapon_intro[random(weapon_intro_len)]
				}','${name[random(name_len)]}','${
					images[random(image_len)]
				}','${new Date().valueOf()}','${i}'),\n`;
				str += s;
			}
			fs.writeFile(src, str, function (err) {
				if (err) {
					console.log(err);
					reject(err);
					return;
				}
				let link = `${config.site}/public/${path.parse(src).base}`;
				resolve({ link });
			});
		});
	}
	realm() {
		let that = this;
		let { config } = that;
		return new Promise(async (resolve, reject) => {
			let images = await that.imgs();
			let src = path.join(filePath, "realm.txt");
			function random(num) {
				return Math.floor(Math.random() * num);
			}
			let str = "";
			let realmId = "9";
			for (let i = 1; i < 31; i++) {
				let realm_intro_len = realm_intro.length;
				let realm_len = realm.length;
				let image_len = images.length;
				let s = `(${i},'1600241901485','${realm[random(realm_len)]}','${
					realm_intro[random(realm_intro_len)]
				}','${images[random(image_len)]}','${realmId}'),\n`;
				str += s;
			}
			fs.writeFile(src, str, function (err) {
				if (err) {
					console.log(err);
					reject(err);
					return;
				}
				let link = `${config.site}/public/${path.parse(src).base}`;
				resolve({ link });
			});
		});
	}
	imgs(state = false) {
		let { app } = this;
		return new Promise(async (resolve, reject) => {
			let images = await app.mysql.select("file_list");
			let src = path.join(filePath, "images.txt");
			let arr = [];
			images.forEach((item) => {
				arr.push(item.link);
			});
			resolve(arr);
			if (!state) return;
			fs.writeFile(src, arr, function (err) {
				if (err) {
					console.log(err);
					reject(err);
					return;
				}
			});
		});
	}
}
module.exports = SqlService;
