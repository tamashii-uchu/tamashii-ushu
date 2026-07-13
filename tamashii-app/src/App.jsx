import { useState } from "react";
const ESS_CODE_TABLE={13:21,14:24,15:27,16:30,17:33,18:36,19:30,20:24,21:27,22:30,23:33,24:36,25:39,26:42,27:45,28:39,29:42,30:36,31:39,32:42,33:45,34:48,35:51,36:54,37:48,38:51,39:54,40:48,41:51,42:54,43:57,44:60,45:63,46:57,47:60,48:63,49:66,50:60,51:63,52:66,53:69,54:72,55:66,56:69,57:72,58:75};
const TAMASHII_HONSHITSU={21:"創造溢れるパワー",24:"無限を生み出すパワー",27:"感性と知性のエネルギー",30:"守り抜く強靱のパワー",33:"強力な転換と変容のパワー",36:"周囲を照らす輝きのパワー",39:"伝え導く魔法のパワー",42:"時代を変える改革のパワー",45:"浄化と調和のエネルギー",48:"統合と絆のエネルギー",51:"成長と進化のエネルギー",54:"回復と再生のエネルギー",57:"磨き輝くエネルギー",60:"引き寄せのエネルギー",63:"防衛と正義のエネルギー",66:"高貴なる上昇のパワー",69:"秩序と管理のエネルギー",72:"清らかなるエネルギー",75:"不屈のパワー"};
const KAMI_KEIJI={21:"地球への警告",24:"愛と改革",27:"時を超える美",30:"世界への貢献",33:"世界を動かす力",36:"創造のイマジネーション",39:"地球への警告",42:"愛と改革",45:"時を超える美",48:"世界への貢献",51:"世界を動かす力",54:"創造のイマジネーション",57:"地球への警告",60:"地球への警告",63:"地球への警告",66:"地球への警告",69:"地球への警告",72:"世界を動かす力",75:"世界への貢献"};
const TOKUSEI_MAP={"C":"我流","GB":"賞罰","Y":"相互","O":"同調","M":"同調","G":"秩序","YG":"合意","B":"合意","V":"普遍","R":"普遍"};
const CHIKYU_TABLE={0:{sp:"YG",bo:"V",mi:"M",so:"G",sp数:9,so数:5,テーマ:"直感",気質:"リズム型",感情:"面倒",守護神:"花"},1:{sp:"G",bo:"M",mi:"R",so:"C",sp数:10,so数:6,テーマ:"家",気質:"律義型",感情:"怒り",守護神:"大地"},2:{sp:"C",bo:"R",mi:"O",so:"GB",sp数:1,so数:7,テーマ:"個性",気質:"探求型",感情:"警戒",守護神:"石"},3:{sp:"GB",bo:"O",mi:"Y",so:"B",sp数:2,so数:8,テーマ:"心",気質:"リズム型",感情:"独断",守護神:"樹"},4:{sp:"B",bo:"Y",mi:"YG",so:"V",sp数:3,so数:9,テーマ:"挑戦",気質:"探求型",感情:"諦め",守護神:"太陽"},5:{sp:"V",bo:"YG",mi:"G",so:"M",sp数:4,so数:10,テーマ:"感謝",気質:"情熱型",感情:"恐れ",守護神:"火"},6:{sp:"M",bo:"G",mi:"C",so:"R",sp数:5,so数:1,テーマ:"世界観",気質:"挑戦型",感情:"抑圧",守護神:"山"},7:{sp:"R",bo:"C",mi:"GB",so:"O",sp数:6,so数:2,テーマ:"夢",気質:"個性型",感情:"劣等",守護神:"海"},8:{sp:"O",bo:"GB",mi:"B",so:"Y",sp数:7,so数:3,テーマ:"正義",気質:"律義型",感情:"悲観",守護神:"荒金"},9:{sp:"Y",bo:"B",mi:"V",so:"YG",sp数:8,so数:4,テーマ:"継続",気質:"情熱型",感情:"比較",守護神:"雨"}};
const UCHU_TABLE={0:{sp:"M",bo:"G",mi:"C",so:"R",sp数:5,so数:1,テーマ:"世界観",気質:"挑戦型",感情:"抑圧",守護神:"山"},1:{sp:"R",bo:"C",mi:"GB",so:"O",sp数:6,so数:2,テーマ:"夢",気質:"個性型",感情:"劣等",守護神:"海"},2:{sp:"O",bo:"GB",mi:"B",so:"Y",sp数:7,so数:3,テーマ:"正義",気質:"律義型",感情:"悲観",守護神:"荒金"},3:{sp:"Y",bo:"B",mi:"V",so:"YG",sp数:8,so数:4,テーマ:"継続",気質:"情熱型",感情:"比較",守護神:"雨"},4:{sp:"YG",bo:"V",mi:"M",so:"G",sp数:9,so数:5,テーマ:"直感",気質:"リズム型",感情:"面倒",守護神:"花"},5:{sp:"G",bo:"M",mi:"R",so:"C",sp数:10,so数:6,テーマ:"家",気質:"律義型",感情:"怒り",守護神:"大地"},6:{sp:"C",bo:"R",mi:"O",so:"GB",sp数:1,so数:7,テーマ:"個性",気質:"探求型",感情:"警戒",守護神:"石"},7:{sp:"GB",bo:"O",mi:"Y",so:"B",sp数:2,so数:8,テーマ:"心",気質:"リズム型",感情:"独断",守護神:"樹"},8:{sp:"B",bo:"Y",mi:"YG",so:"V",sp数:3,so数:9,テーマ:"挑戦",気質:"探求型",感情:"諦め",守護神:"太陽"},9:{sp:"V",bo:"YG",mi:"G",so:"M",sp数:4,so数:10,テーマ:"感謝",気質:"情熱型",感情:"恐れ",守護神:"火"}};
const REISEI_CLASS2={1:"自覚",2:"自尊心",3:"自己評価",4:"自己愛",5:"自己表現",6:"自己責任",7:"自意識"};
const REISEI_LEVEL={1:{1:"気力",2:"恐れ",3:"挑戦",4:"虚勢",5:"自信"},2:{1:"卑下",2:"偏見",3:"謙虚",4:"優越",5:"誇り"},3:{1:"比較",2:"未熟",3:"向上",4:"過信",5:"尊重"},4:{1:"信頼",2:"自立",3:"受容",4:"純粋",5:"手放し"},5:{1:"防衛",2:"個性",3:"理解",4:"試練",5:"直感"},6:{1:"放置",2:"自責",3:"妥協",4:"不信",5:"自立・委任"},7:{1:"迷い",2:"過敏",3:"自然体",4:"演出",5:"中立"}};
const PW_TABLE={0:{表:"使命・ビジョン",裏:"現実・試練"},1:{表:"完璧",裏:"未完成"},2:{表:"思いやり",裏:"見返り"},3:{表:"達成",裏:"恐れ"},4:{表:"冒険",裏:"退屈"},5:{表:"智慧",裏:"未知"},6:{表:"安らぎ",裏:"不安定"},7:{表:"希望",裏:"現実逃避"},8:{表:"勇気",裏:"無力感"},9:{表:"調和",裏:"対立"}};
const ANIMAL_TYPE={"惑星":"フロントチーム","光":"フロントチーム","流星":"フロントチーム","太陽":"フロントチーム","火":"クリエイトチーム","風":"クリエイトチーム","大地":"クリエイトチーム","銀河":"クリエイトチーム","海":"サポートチーム","虹":"サポートチーム","星":"サポートチーム","月":"サポートチーム"};
const UNMEI_TO_ANIMAL={1:"流星",2:"虹",3:"風",4:"大地",5:"星",6:"火",7:"流星",8:"虹",9:"風",10:"大地",11:"月",12:"惑星",13:"銀河",14:"海",15:"風",16:"大地",17:"月",18:"惑星",19:"銀河",20:"海",21:"光",22:"光",23:"海",24:"銀河",25:"銀河",26:"海",27:"光",28:"光",29:"海",30:"銀河",31:"惑星",32:"月",33:"大地",34:"風",35:"海",36:"銀河",37:"惑星",38:"月",39:"大地",40:"風",41:"虹",42:"流星",43:"火",44:"星",45:"大地",46:"風",47:"虹",48:"流星",49:"火",50:"星",51:"風",52:"太陽",53:"星",54:"火",55:"火",56:"星",57:"太陽",58:"太陽",59:"星",60:"火"};
const REISEI_TABLE={3:2,4:2,5:2,6:2,7:2,8:2,9:2,10:2,12:3,13:3,14:3,15:3,16:3,17:3,18:3,21:4,22:4,23:4,24:4,25:4,26:4,27:4,28:4,29:4,30:4,31:4,32:4,33:4,34:4,35:4,36:4,37:4,38:4,39:4,40:4,41:4,42:5,43:5,44:5,45:5,46:5,47:5,48:5,49:5,50:5,51:5,52:5,53:5,54:5,57:6,58:6,59:6,60:6,61:6,62:6,63:6,64:6,65:6,66:6,67:6,68:6,69:6,70:6,71:6,72:6,73:6,74:6,75:6,76:6,77:6,78:6};
const TAMASHII_SOGO={0:"魂のシンクロ",3:"魂の刺激",6:"魂の輝き",9:"守護の絆",12:"魂の成長",15:"魂の学び",18:"魂の安らぎ",21:"魂のひらめき",24:"魂の最強コンビ",27:"魂の尊重",30:"魂のサポーター",33:"魂の表裏",36:"魂を照らし合う",39:"魂の導き",42:"魂の進化",45:"魂のクリアリング",48:"魂の絆",51:"魂の魅力",54:"魂の回復",57:"魂の磨き",60:"魂の引き寄せ"};
const KAKO_KANKEI={0:"親子",3:"兄弟",5:"夫婦",7:"友人",9:"師弟",11:"恋人",13:"義兄弟",15:"義親子"};
const INNER_CHILD_SOLUTION={
  "面倒":"断捨離","怒り":"趣味","警戒":"観察","喜び":"傾聴",
  "諦め":"感動","悲観":"奉仕","妨害":"言語化","恐れ":"行動",
  "抑圧":"表現","劣等":"感謝","独断":"対話","比較":"無比較"
};
const ANIMAL_EMOJI={"太陽":"☀️","火":"🔥","火":"🔥","虹":"🌈","大地":"⛰️","惑星":"🪐","流星":"🌠","星":"⭐","銀河":"🌌","光":"💫","月":"🌙","海":"🌊","風":"🌪️"};
const RHYTHM_COLOR={"準備":"#a87820","実行":"#c04070","観察":"#2a7a6a","決断":"#7a4a9a"};
const C={bg:"#faf6ee",borderGold:"#d4aa40",gold:"#d4aa40",goldLight:"#c8a030",goldDim:"#b09030",accent:"#a87820",text:"#2a2418",muted:"#b0985a",teal:"#2a7a6a",purple:"#7a4a9a",pink:"#c04070"};

// ✦ コミュニケーションタイプ相性ロジック
const COMM_TYPES=["風","流星","星","太陽","火","虹","大地","惑星","海","光","銀河","月"];
const COMM_TEAMS={フロント:["惑星","流星","光","太陽"],クリエイト:["火","風","大地","銀河"],サポート:["海","虹","星","月"]};
const COMM_TEAM_COLORS={フロント:"#C9A84C",クリエイト:"#8B7355",サポート:"#2a7a6a"};
const COMM_RELATIONS=[
  {steps:1,name:"心地よい間柄",desc:"適度な距離・友達"},
  {steps:2,name:"深い共鳴の仲",desc:"本音でぶつかれる・真の親友"},
  {steps:3,name:"互いを高め合う仲",desc:"緊張・刺激を受け合う"},
  {steps:4,name:"利害が一致する仲",desc:"win-win"},
  {steps:5,name:"運命的に出会う仲",desc:"不思議な縁で引き寄せ合う"},
  {steps:6,name:"成長をもたらす仲",desc:"正反対だからこそ学ぶ"},
];

function getCommTeam(type){for(const[team,members]of Object.entries(COMM_TEAMS)){if(members.includes(type))return team;}return null;}
function getCommRelation(typeA,typeB){
  const idxA=COMM_TYPES.indexOf(typeA);const idxB=COMM_TYPES.indexOf(typeB);
  if(idxA===-1||idxB===-1)return null;
  if(typeA===typeB)return{steps:0,name:"同じ波長の仲",desc:"同じリズム・共鳴し合える関係"};
  const diff=Math.abs(idxA-idxB);const steps=Math.min(diff,12-diff);
  return COMM_RELATIONS.find(r=>r.steps===steps)||null;
}

const YEAR_MONTH_TABLE={1926:[26,57,25,56,26,57,27,58,29,59,30,0],1927:[1,32,1,31,1,32,2,33,4,34,35,5],1928:[36,7,36,7,37,8,38,9,40,10,41,11],1929:[12,43,12,41,12,43,13,44,15,45,46,16],1930:[47,18,46,17,47,18,48,19,20,50,51,21],1931:[22,53,21,52,22,53,23,24,25,55,56,26],1932:[57,28,57,28,58,29,59,30,1,31,2,32],1933:[3,34,2,33,3,34,4,35,6,7,37,37],1934:[8,39,7,38,8,39,9,40,11,41,12,42],1935:[18,44,12,43,13,44,14,45,16,46,17,47],1936:[18,49,18,49,19,50,20,51,22,52,23,53],1937:[24,55,23,54,24,55,25,56,27,28,28,58],1938:[29,0,28,59,29,0,30,1,2,32,33,3],1939:[4,35,5,33,4,35,5,36,7,8,8,38],1940:[39,10,39,10,40,11,41,12,13,43,44,14],1941:[45,16,44,15,45,16,46,17,13,48,49,19],1942:[50,21,49,20,50,21,51,22,23,53,54,24],1943:[26,54,25,26,56,26,57,28,29,59,29,59],1944:[0,31,0,31,1,32,2,33,4,34,5,35],1945:[6,37,5,36,6,37,7,38,9,10,10,40],1946:[11,42,10,41,11,42,12,43,14,44,15,45],1947:[16,47,15,46,16,47,17,48,19,20,20,50],1948:[21,52,21,52,22,53,23,54,25,55,26,56],1949:[27,58,26,57,27,58,28,59,0,30,31,1],1950:[32,3,32,2,32,3,33,34,5,35,36,6],1951:[41,12,41,11,41,12,42,43,14,44,45,16],1952:[42,13,42,13,43,14,44,15,16,46,47,17],1953:[48,19,48,19,49,20,50,51,22,52,52,23],1954:[53,24,52,23,53,24,54,25,26,56,57,27],1955:[29,57,29,57,30,1,31,32,3,33,1,2],1956:[3,34,3,34,4,35,5,36,7,37,8,38],1957:[8,39,8,38,9,40,10,11,12,43,13,43],1958:[14,45,13,44,14,45,15,46,17,47,18,48],1959:[19,50,18,49,19,50,20,51,22,23,23,53],1960:[24,55,24,55,25,56,26,57,28,58,29,59],1961:[0,31,1,29,0,31,1,2,3,34,4,4],1962:[35,6,34,5,35,6,36,7,8,38,39,9],1963:[10,41,10,39,10,41,11,12,13,44,14,14],1964:[45,16,45,16,46,17,47,18,19,49,50,20],1965:[21,50,20,21,21,22,52,23,24,54,55,25],1966:[56,27,55,26,56,27,57,28,29,59,0,30],1967:[1,32,0,31,1,32,2,33,4,34,35,5],1968:[6,37,6,37,7,38,8,39,10,40,41,11],1969:[12,43,11,42,12,43,13,14,15,45,46,17],1970:[17,48,16,47,17,48,18,19,20,51,21,51],1971:[22,53,21,52,22,53,23,24,25,56,26,56],1972:[27,58,27,58,28,59,29,30,1,31,2,32],1973:[33,4,32,3,33,4,34,5,6,37,7,7],1974:[9,37,9,37,10,41,11,12,13,12,14,12],1975:[43,14,42,13,43,14,44,15,16,46,47,17],1976:[19,48,19,48,20,51,21,22,23,53,24,23],1977:[54,25,53,24,54,25,55,26,27,57,28,58],1978:[29,58,30,29,30,0,31,2,3,33,4,33],1979:[4,35,3,34,4,35,5,36,7,37,38,9],1980:[9,40,9,40,10,41,11,42,13,43,14,44],1981:[15,46,14,45,15,46,16,47,18,48,19,49],1982:[20,51,19,50,20,51,21,52,23,53,24,54],1983:[25,56,24,55,25,56,26,57,28,58,29,59],1984:[30,1,30,1,31,2,32,3,34,4,35,5],1985:[36,7,35,6,36,7,37,8,39,9,40,10],1986:[41,12,40,11,41,12,42,13,44,14,45,15],1987:[46,17,45,16,46,17,47,18,49,19,50,20],1988:[51,22,51,22,52,23,53,24,55,25,56,26],1989:[57,28,56,27,57,28,58,29,0,30,1,31],1990:[2,33,1,32,2,33,3,34,5,35,6,36],1991:[7,38,6,37,7,38,8,39,10,40,11,41],1992:[12,43,12,43,13,44,14,45,16,46,17,47],1993:[18,49,17,48,18,49,19,50,21,51,22,52],1994:[23,54,22,53,23,54,24,55,26,56,27,57],1995:[28,59,27,58,28,59,29,0,31,1,32,2],1996:[33,4,33,4,34,5,35,6,37,7,38,8],1997:[39,10,38,9,39,10,40,11,42,12,43,13],1998:[44,15,43,14,44,15,45,16,47,17,48,18],1999:[49,20,48,19,49,20,50,21,52,22,53,23],2000:[54,25,54,25,55,26,56,27,58,28,59,29],2001:[0,31,59,30,0,31,1,32,3,33,4,34],2002:[5,36,4,35,5,36,6,37,8,38,9,39],2003:[10,41,9,40,10,41,11,42,13,43,14,44],2004:[15,46,15,46,16,47,17,48,19,49,20,50],2005:[21,52,20,51,21,52,22,53,24,54,25,55],2006:[26,57,25,56,26,57,27,58,29,59,30,0],2007:[1,32,1,30,1,32,2,33,3,34,4,35],2008:[36,7,36,7,37,8,38,9,40,10,41,11],2009:[42,13,41,12,42,13,43,14,45,15,46,16],2010:[17,48,17,46,18,48,19,50,21,51,22,21],2011:[52,23,51,22,52,23,53,24,55,25,56,26],2012:[57,28,57,28,58,29,59,0,1,31,2,32],2013:[3,34,2,33,3,34,4,35,6,36,7,37],2014:[8,39,8,39,9,40,10,11,13,43,14,42],2015:[13,44,12,43,13,44,14,45,16,46,17,47],2016:[18,49,18,49,19,50,20,51,22,52,23,53],2017:[24,55,23,54,24,55,25,56,27,57,28,58],2018:[29,0,28,59,29,0,30,1,32,2,33,3],2019:[34,5,33,4,34,5,35,6,37,7,38,8],2020:[39,10,39,10,40,11,41,12,43,13,44,14],2021:[45,16,44,15,45,16,46,17,48,18,49,19],2022:[50,21,50,21,51,22,52,53,23,54,24,55],2023:[55,26,54,25,55,26,56,27,58,28,59,29],2024:[0,31,0,31,1,32,2,33,34,4,35,5],2025:[6,37,5,36,6,37,7,38,9,40,10,40],2026:[11,42,10,41,11,42,12,43,14,44,15,45],2027:[16,47,15,46,16,47,17,48,19,49,20,50],2028:[21,52,21,52,22,53,23,54,25,55,26,56],2029:[27,58,26,57,27,58,28,59,30,0,31,1],2030:[32,3,31,2,32,3,33,4,6,7,7,8]};

function getDobutsuDate(year,month,day){const t=YEAR_MONTH_TABLE[year];if(!t)return"—";let ym=t[month-1];if(ym===0)ym=60;const u=(ym+day)%60||60;return UNMEI_TO_ANIMAL[u]||"—";}
function getReiseiClass(e){if(e>=3&&e<=11)return 2;if(e>=12&&e<=20)return 3;if(e>=21&&e<=41)return 4;if(e>=42&&e<=56)return 5;if(e>=57&&e<=77)return 6;if(e>=78)return 7;return 2;}
function percentToLevel(p){if(p>80)return 5;if(p>50)return 4;if(p>20)return 3;if(p>10)return 2;return 1;}

function calculate(name,year,month,day){
  const HOSEI={0:5,1:6,2:7,3:8,4:9,5:0,6:1,7:2,8:3,9:4};
  const code8=String(year+5508)+String(month).padStart(2,"0")+String(day).padStart(2,"0");
  const digits8=code8.split("").map(Number);
  const codeNo=digits8.reduce((a,b)=>a+b,0);
  const essNum=ESS_CODE_TABLE[codeNo]||39;
  const isUchuType=essNum%2===0;
  const isIonized=(codeNo%2===0)!==(essNum%2===0);
  const typeLabel=isUchuType?(isIonized?"発信型（パラレル）":"発信型"):(isIonized?"受信型（パラレル）":"受信型");
  const table=isUchuType?UCHU_TABLE:CHIKYU_TABLE;
  let s=digits8.map(String).join('');
  for(let i=0;i<digits8.length;i++){const comp=String(HOSEI[digits8[i]]);const pos=s.indexOf(comp);if(pos!==-1&&s[pos]!==' ')s=s.slice(0,pos)+' '+s.slice(pos+1);}
  let u=s;
  const code8str=digits8.map(String).join('');
  for(let i=0;i<code8str.length;i++){const digit=code8str[i];const countU=u.split('').filter(c=>c===digit).length;if(countU>1){let v=u;const idx1=v.indexOf(digit);const idx2=v.indexOf(digit,idx1+1);v=v.slice(0,idx2)+' '+v.slice(idx2+1);const idx3=v.indexOf(digit);u=idx3!==-1?v.slice(0,idx3)+' '+v.slice(idx3+1):v;}}
  const rawCodes=[...new Set(u.split('').filter(c=>c!==' '&&c!=='').map(Number).filter(n=>!isNaN(n)))];
  const codes=rawCodes.length===0?[0]:rawCodes;
  const isMu=rawCodes.length===0;
  const shadowCodeForMu=isMu?(essNum-codeNo-Math.floor(codeNo/10)-(codeNo%10))%10:null;
  const codesForDisplay=(isMu&&shadowCodeForMu!==null&&shadowCodeForMu!==0)?[0,shadowCodeForMu]:codes;
  const codesData=codesForDisplay.map(c=>table[c]||table[0]);
  const kakoTeemas=[...new Set(codesData.map(d=>d.テーマ))];
  const guardians=[...new Set(codesData.map(d=>d.守護神))];
  const kishitsu=[...new Set(codesData.map(d=>d.気質))];
  const tokusei=[...new Set(codesForDisplay.map((c,i)=>TOKUSEI_MAP[codesData[i].sp]||"—"))];
  const kanjo=[...new Set(codesData.map(d=>d.感情))];
  const honshitsu=TAMASHII_HONSHITSU[essNum]||"伝導のパワー";
  const keiji=KAMI_KEIJI[essNum]||"—";
  const reiseiClass=getReiseiClass(essNum);
  const konjoKadai=REISEI_CLASS2[reiseiClass]||"自己愛";
  const waveBase=REISEI_TABLE[essNum]||4;
  const currentYear=new Date().getFullYear();
  const age=currentYear-year;
  const codesDataForWave=codes.map(c=>table[c]||table[0]);
  const sumSoNum=codesDataForWave.reduce((a,d)=>a+(d.so数||5),0);
  const AA2=waveBase*sumSoNum;
  const sumSpNum=codesDataForWave.reduce((a,d)=>a+(d.sp数||5),0);
  const O10=AA2>0?Math.floor(sumSpNum/AA2*100):0;
  const U48=O10<101?O10:O10-100;
  const AB3=O10>100?1:0;
  const AC3=waveBase+AB3;
  const wave=Math.max(0,Math.floor(age/AC3));
  const wavePct=U48;
  const kadaiLevel=percentToLevel(wavePct);
  const kadaiWord=REISEI_LEVEL[reiseiClass]?.[kadaiLevel]||"—";
  const codeNoD1=Math.floor(codeNo/10);
  const codeNoD2=codeNo%10;
  const shadowVal=essNum-codeNo-codeNoD1-codeNoD2;
  const muVal=isUchuType?shadowVal:0;
  const shadowCode=shadowVal>0?shadowVal%10:null;
  const sameParity=(codeNo%2===0)===(essNum%2===0);
  const isRawEmpty=codes.length===1&&codes[0]===0&&shadowVal>0;
  const hasShadow=shadowVal>0&&shadowCode!==null&&(isRawEmpty||!sameParity);
  const shadowData=(hasShadow&&shadowCode!==null)?(table[shadowCode]||null):null;
  const shadowActive=hasShadow&&shadowData!==null;
  let shadowReiseiClass=null;
  let shadowKadaiLevelVal=kadaiLevel;
  if(shadowActive&&shadowData){
    const shadowNumForZ50=isUchuType?(shadowData.so数||1):(shadowData.sp数||0);
    const shadowSoChikyu=CHIKYU_TABLE[shadowCode]?.so数||1;
    const Z50=shadowNumForZ50/waveBase;
    const Z51=Math.floor(Z50*shadowSoChikyu*100);
    const Z52=isUchuType?Z51-(100-wavePct):Z51-wavePct;
    const Z53=Math.floor(Z52/100);
    const Z55=Z53-7*Math.floor(Z53/7);
    const Z56=isUchuType?waveBase+1+Z55:waveBase-1-Z55;
    let sc=Z56>7?Z56-7:(Z56<0?Z56+8:Z56);
    shadowReiseiClass=sc>=1&&sc<=7?sc:null;
    const Z57=isUchuType?Z52-100*Z53:100-(Z52-100*Z53);
    shadowKadaiLevelVal=percentToLevel(Z57);
  }
  const shadowKadaiWord=shadowReiseiClass?(REISEI_LEVEL[shadowReiseiClass]?.[shadowKadaiLevelVal]||"—"):null;
  const shadowKonjoKadai=shadowReiseiClass?(REISEI_CLASS2[shadowReiseiClass]||"—"):null;
  const shadowGuardian=shadowActive?shadowData.守護神:null;
  const shadowTeema=shadowActive?shadowData.テーマ:null;
  const tamashiiAge=waveBase*sumSoNum;
  const allCodesForBalance=[...codesData];
  if(!isMu&&shadowActive&&shadowData)allCodesForBalance.push(shadowData);
  const colorArray=allCodesForBalance.flatMap(d=>[d.sp,d.bo,d.mi,d.so]);
  const balance={仕事:colorArray.filter(c=>c==='R').length,対人:colorArray.filter(c=>c==='GB').length,お金:colorArray.filter(c=>c==='B').length,愛情:colorArray.filter(c=>c==='V').length,身体:colorArray.filter(c=>c==='G').length};
  const codesSum=codes.reduce((a,b)=>a+b,0);
  let pwNum=codesSum;
  if(pwNum>=10)pwNum=Math.floor(pwNum/10)+(pwNum%10);
  if(pwNum>=10)pwNum=Math.floor(pwNum/10)+(pwNum%10);
  const pwData=PW_TABLE[pwNum]||PW_TABLE[0];
  const dobutsu=getDobutsuDate(year,month,day);
  const animalType=ANIMAL_TYPE[dobutsu]||"—";
  return{name,year,month,day,codeNo,essNum,isUchuType,isIonized,typeLabel,codes,codesData,honshitsu,keiji,reiseiClass,konjoKadai,kadaiWord,wave,wavePct,waveBase,kakoTeemas,guardians,kishitsu,tokusei,kanjo,pwData,shadowVal,muVal,hasShadow,shadowGuardian,shadowTeema,shadowKonjoKadai,shadowKadaiWord,shadowData,dobutsu,animalType,balance,tamashiiAge,isMu};
}

function getSoulCycle(birthYear,currentYear,waveBase,isUchuType){
  const RT={4:{chikyu:{1:"実行",2:"観察",3:"決断",4:"準備"},uchu:{1:"観察",2:"決断",3:"準備",4:"実行"}},5:{chikyu:{1:"実行",2:"観察",3:"決断",4:"準備",5:"準備"},uchu:{1:"観察",2:"決断",3:"準備",4:"準備",5:"実行"}},6:{chikyu:{1:"実行",2:"観察",3:"決断",4:"決断",5:"準備",6:"準備"},uchu:{1:"観察",2:"決断",3:"決断",4:"準備",5:"準備",6:"実行"}}};
  const cyclePos=((currentYear-birthYear)%waveBase)+1;
  const typeKey=isUchuType?"uchu":"chikyu";
  const rhythmTable=RT[waveBase]?.[typeKey]||RT[5][typeKey];
  return{cyclePos,rhythm:rhythmTable[cyclePos]||"準備"};
}

function calculateAisho(rA,rB){
  const essDiff=Math.abs(rA.essNum-rB.essNum);
  const sogoLabel=TAMASHII_SOGO[essDiff]||`差${essDiff}`;
  const getCS=(r)=>r.isMu&&r.shadowVal>0?r.shadowVal%10:r.codes.reduce((a,b)=>a+b,0);
  const codeDiff=Math.abs(getCS(rA)-getCS(rB));
  const isFutatgo=codeDiff===0;
  const kakoLabel=isFutatgo?"双子":KAKO_KANKEI[codeDiff]!==undefined?KAKO_KANKEI[codeDiff]:"初";
  return{isFutatgo,essDiff,sogoLabel,codeDiff,kakoLabel};
}

function SectionTitle({children}){
  return(<div style={{fontSize:"10px",letterSpacing:"0.4em",color:C.gold,marginBottom:"16px",marginTop:"40px",display:"flex",alignItems:"center",gap:"12px",opacity:0.9}}>{children}<div style={{flex:1,height:"1px",background:`linear-gradient(90deg,${C.gold},transparent)`}}/></div>);
}

function InputForm({onSubmit,buttonLabel}){
  const[name,setName]=useState("");const[year,setYear]=useState("");const[month,setMonth]=useState("");const[day,setDay]=useState("");const[error,setError]=useState("");
  const handle=()=>{const y=parseInt(year),m=parseInt(month),d=parseInt(day);if(!name){setError("お名前を入力してください");return;}if(!y||y<1900||y>2100){setError("正しい年を入力してください");return;}if(!m||m<1||m>12){setError("正しい月を入力してください");return;}if(!d||d<1||d>31){setError("正しい日を入力してください");return;}setError("");onSubmit(name,y,m,d);};
  const inp={width:"100%",background:"#fff",border:`1px solid ${C.borderGold}`,borderRadius:"4px",padding:"14px 18px",color:C.text,fontSize:"16px",boxSizing:"border-box",outline:"none",fontFamily:"inherit"};
  const lbl={display:"block",fontSize:"10px",letterSpacing:"0.25em",color:C.gold,marginBottom:"10px"};
  return(<div><div style={{marginBottom:"20px"}}><label style={lbl}>お名前</label><input style={inp} value={name} onChange={e=>setName(e.target.value)} placeholder="お名前"/></div><div style={{marginBottom:"20px"}}><label style={lbl}>生年月日（西暦）</label><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px"}}><input style={inp} value={year} onChange={e=>setYear(e.target.value)} placeholder="年" type="number"/><input style={inp} value={month} onChange={e=>setMonth(e.target.value)} placeholder="月" type="number" min="1" max="12"/><input style={inp} value={day} onChange={e=>setDay(e.target.value)} placeholder="日" type="number" min="1" max="31"/></div></div>{error&&<p style={{color:"#c04030",fontSize:"13px",marginBottom:"12px"}}>{error}</p>}<button style={{width:"100%",padding:"16px",background:`linear-gradient(135deg,#c8a030,#e0c060)`,border:`1px solid ${C.gold}`,borderRadius:"4px",color:"#2a2010",fontSize:"13px",letterSpacing:"0.3em",cursor:"pointer",fontFamily:"inherit"}} onClick={handle}>{buttonLabel}</button></div>);
}

function KojinResult({result}){
  const card={background:`linear-gradient(135deg,#ffffff,#fdf8f0)`,border:`1px solid ${C.borderGold}`,borderRadius:"4px",padding:"22px",marginBottom:"14px",boxShadow:`0 8px 32px rgba(200,160,48,0.15)`};
  const currentYear=new Date().getFullYear();
  const cycles=[];
  for(let y=currentYear-1;y<=currentYear+3;y++){const{cyclePos,rhythm}=getSoulCycle(result.year,y,result.waveBase,result.isUchuType);cycles.push({year:y,cyclePos,rhythm});}
  const EMOJI={"準備":"🌱","実行":"🌸","観察":"🍂","決断":"⭐"};
  const LABEL={"準備":"種まき","実行":"開花","観察":"収穫","決断":"選択"};
  return(<div>
    <div style={{textAlign:"center",padding:"32px 24px",background:`linear-gradient(160deg,#f5edd8,#fdf8f0)`,borderRadius:"4px",border:`1px solid ${C.borderGold}`,marginBottom:"8px"}}>
      <div style={{fontSize:"10px",color:C.muted,letterSpacing:"0.4em",marginBottom:"12px"}}>鑑定結果 — Soul Reading</div>
      <div style={{fontSize:"clamp(20px,5vw,28px)",fontWeight:"700",color:"#2a2010",letterSpacing:"0.15em",marginBottom:"8px"}}>{result.name} 様</div>
      <div style={{fontSize:"13px",color:C.muted}}>{result.year}年 {result.month}月 {result.day}日生まれ</div>
      <div style={{display:"inline-block",marginTop:"12px",padding:"4px 16px",border:`1px solid ${C.borderGold}`,fontSize:"11px",color:C.gold,letterSpacing:"0.2em"}}>{result.typeLabel}</div>
    </div>
    <SectionTitle>✦ 魂の本質</SectionTitle>
    <div style={{...card,textAlign:"center"}}>
      <div style={{fontSize:"10px",color:C.muted,letterSpacing:"0.2em",marginBottom:"6px"}}>魂の才能</div>
      <div style={{fontSize:"clamp(20px,5vw,30px)",fontWeight:"700",color:"#2a2010"}}>{result.honshitsu}</div>
      <div style={{marginTop:"12px",padding:"6px 16px",background:"rgba(200,168,74,0.06)",border:`1px solid ${C.borderGold}`,display:"inline-block"}}>
        <span style={{fontSize:"10px",color:C.muted}}>魂の役割　</span><span style={{color:"#2a2010",fontWeight:"600"}}>{result.keiji}</span>
      </div>
    </div>
    <SectionTitle>✦ コミュニケーション</SectionTitle>
    <div style={{...card,textAlign:"center"}}>
      <div style={{fontSize:"10px",color:C.muted,marginBottom:"8px"}}>コミュニケーションタイプ</div>
      <div style={{fontSize:"40px",marginBottom:"8px"}}>{ANIMAL_EMOJI[result.dobutsu]||"✨"}</div>
      <div style={{fontSize:"clamp(20px,5vw,28px)",fontWeight:"700"}}>{result.dobutsu}</div>
      <div style={{display:"inline-block",marginTop:"10px",padding:"4px 14px",border:`1px solid ${C.borderGold}`,fontSize:"11px",color:C.gold,letterSpacing:"0.2em"}}>{result.animalType}</div>
    </div>
    <SectionTitle>✦ 今世のテーマ</SectionTitle>
    <div style={card}>
      <div style={{fontSize:"10px",color:C.muted,marginBottom:"8px"}}>今世のテーマ</div>
      <div style={{fontSize:"clamp(20px,5vw,28px)",fontWeight:"700",color:C.teal}}>{result.konjoKadai}<span style={{color:C.purple,fontSize:"clamp(16px,4vw,22px)"}}>（{result.kadaiWord}）</span></div>
      {result.shadowKonjoKadai&&<div style={{marginTop:"12px",paddingTop:"12px",borderTop:`1px solid rgba(212,170,64,0.2)`}}><div style={{fontSize:"10px",color:C.muted,marginBottom:"8px"}}>今世のテーマ（影）</div><div style={{fontSize:"clamp(16px,4vw,22px)",fontWeight:"700",color:C.teal}}>{result.shadowKonjoKadai}<span style={{color:C.purple}}>（{result.shadowKadaiWord}）</span></div></div>}
      <div style={{marginTop:"16px"}}><div style={{display:"flex",justifyContent:"space-between",fontSize:"11px",color:C.muted,marginBottom:"6px"}}><span>魂の年齢</span><span style={{fontSize:"14px",fontWeight:"600",color:C.accent}}>{result.tamashiiAge}歳</span></div><div style={{height:"4px",background:"#ede0c0",borderRadius:"2px",overflow:"hidden"}}><div style={{height:"100%",width:`${result.wavePct}%`,background:`linear-gradient(90deg,${C.goldDim},${C.goldLight})`}}/></div></div>
    </div>
    <SectionTitle>✦ 基本資質</SectionTitle>
    <div style={{...card,marginBottom:"12px"}}>
      <div style={{fontSize:"10px",color:C.muted,letterSpacing:"0.2em",marginBottom:"10px"}}>カルマ（{result.kakoTeemas.length}つ）</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
        {result.kakoTeemas.map((t,i)=><div key={i} style={{padding:"5px 14px",borderRadius:"20px",background:"rgba(122,74,154,0.12)",border:`1px solid ${C.purple}`,color:C.purple,fontSize:"13px",fontWeight:"600"}}>{t}</div>)}
        {result.shadowTeema&&!result.isMu&&<div style={{padding:"5px 14px",borderRadius:"20px",background:"rgba(122,74,154,0.06)",border:`1px dashed ${C.purple}`,color:C.purple,fontSize:"13px",fontWeight:"600"}}>{result.shadowTeema}</div>}
      </div>
    </div>
    <div style={{...card,marginBottom:"12px"}}>
      <div style={{fontSize:"10px",color:C.muted,letterSpacing:"0.2em",marginBottom:"10px"}}>守護神（{result.guardians.length}柱）</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
        {result.guardians.map((g,i)=><div key={i} style={{padding:"5px 14px",borderRadius:"20px",background:"rgba(201,168,76,0.12)",border:`1px solid ${C.gold}`,color:"#2a2010",fontSize:"13px",fontWeight:"600"}}>{g}</div>)}
        {result.shadowGuardian&&!result.isMu&&<div style={{padding:"5px 14px",borderRadius:"20px",background:"rgba(201,168,76,0.06)",border:`1px dashed ${C.gold}`,color:"#2a2010",fontSize:"13px",fontWeight:"600"}}>{result.shadowGuardian}</div>}
      </div>
    </div>
    <div style={{...card,padding:"0"}}>
      {[{label:"魂の個性",value:result.kishitsu.join(" / "),color:C.text},{label:"魂の基準",value:result.tokusei.join(" / "),color:C.text},{label:"インナーチャイルド",value:result.kanjo.map(k=>INNER_CHILD_SOLUTION[k]||k).join(" / "),color:C.pink},...(result.hasShadow?[{label:"無 / 影",value:`無(${result.muVal}) / 影(${result.shadowVal})`,color:C.muted}]:[])].map((row,i,arr)=>(
        <div key={i} style={{display:"flex",alignItems:"center",padding:"14px 20px",borderBottom:i<arr.length-1?`1px solid rgba(212,170,64,0.15)`:"none"}}>
          <div style={{fontSize:"10px",color:C.muted,letterSpacing:"0.15em",width:"120px",flexShrink:0}}>{row.label}</div>
          <div style={{fontSize:"14px",fontWeight:"600",color:row.color,flex:1}}>{row.value}</div>
        </div>
      ))}
    </div>
    <SectionTitle>✦ 魂の求め</SectionTitle>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
      <div style={{...card,background:"linear-gradient(160deg,#fdf8f0,#f5edd8)"}}><div style={{fontSize:"10px",color:C.muted,marginBottom:"6px"}}>理想（陽）</div><div style={{fontWeight:"700",fontSize:"16px"}}>{result.pwData.表}</div></div>
      <div style={{...card,background:"#f8f3e8"}}><div style={{fontSize:"10px",color:C.muted,marginBottom:"6px"}}>課題（陰）</div><div style={{fontWeight:"700",fontSize:"16px",color:C.muted}}>{result.pwData.裏}</div></div>
    </div>
    <SectionTitle>✦ 魂のサイクル</SectionTitle>
    <div style={{...card,overflowX:"auto"}}>
      <div style={{display:"flex",gap:"6px",paddingBottom:"8px"}}>
        {cycles.map((c,i)=>{const isNow=c.year===currentYear;const color=RHYTHM_COLOR[c.rhythm]||C.accent;return(<div key={i} style={{flex:"0 0 auto",textAlign:"center",minWidth:"72px"}}><div style={{fontSize:"10px",color:isNow?C.gold:C.muted,fontWeight:isNow?"700":"400",marginBottom:"6px"}}>{c.year}</div><div style={{padding:"12px 6px",borderRadius:"6px",background:isNow?`rgba(212,170,64,0.15)`:"#f5edd8",border:isNow?`2px solid ${C.gold}`:`1px solid #e8d890`,position:"relative"}}>{isNow&&<div style={{position:"absolute",top:"-10px",left:"50%",transform:"translateX(-50%)",fontSize:"9px",color:C.gold,fontWeight:"700",whiteSpace:"nowrap"}}>NOW</div>}<div style={{fontSize:"22px",marginBottom:"4px"}}>{EMOJI[c.rhythm]}</div><div style={{fontSize:"11px",fontWeight:"700",color}}>{LABEL[c.rhythm]}</div></div></div>);})}
      </div>
    </div>
    <SectionTitle>✦ 魂のバランス</SectionTitle>
    <div style={card}>
      {[{area:"行動",key:"仕事"},{area:"対人",key:"対人"},{area:"自立",key:"お金"},{area:"愛情",key:"愛情"},{area:"身体",key:"身体"}].map((item,i)=>{
        const val=result.balance[item.key]||0;
        const gc=(idx)=>{if(idx>=val)return"rgba(212,170,64,0.1)";if(idx===0)return val===1?"#f5d060":val===2?"#ff9040":"#ff4040";if(idx===1)return val===2?"#ff9040":"#ff4040";return"#ff4040";};
        return(<div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 0",borderBottom:i<4?`1px solid rgba(212,170,64,0.12)`:"none"}}>
          <div style={{fontSize:"13px",fontWeight:"600",color:"#4a3c28",width:"36px",flexShrink:0}}>{item.area}</div>
          <div style={{display:"flex",gap:"6px",flex:1}}>{[0,1,2].map(idx=><div key={idx} style={{flex:1,height:"28px",borderRadius:"3px",background:gc(idx),border:`1px solid ${gc(idx)}`}}/>)}</div>
          <div style={{fontSize:"11px",color:val===0?"#6090ff":val===1?"#f5d060":val<=2?"#ff9040":"#ff4040",width:"60px",flexShrink:0,textAlign:"right"}}>{val===0?"不足":val===1?"✦ ベスト":val===2?"多め":"過多"}</div>
        </div>);
      })}
    </div>
  </div>);
}

function CommAishoSection({typeA, typeB}) {
  const relation = getCommRelation(typeA, typeB);
  const teamA = getCommTeam(typeA);
  const teamB = getCommTeam(typeB);
  if (!relation) return null;
  const sameTeam = teamA === teamB;
  const card={background:`linear-gradient(135deg,#ffffff,#fdf8f0)`,border:`1px solid ${C.borderGold}`,borderRadius:"4px",padding:"22px",marginBottom:"14px",boxShadow:`0 8px 32px rgba(200,160,48,0.15)`};
  return (
    <div style={card}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"20px",marginBottom:"16px"}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"28px"}}>{ANIMAL_EMOJI[typeA]||"✨"}</div>
          <div style={{fontSize:"14px",fontWeight:"700",color:C.text}}>{typeA}</div>
          <div style={{fontSize:"9px",color:COMM_TEAM_COLORS[teamA],marginTop:"2px"}}>{teamA}チーム</div>
        </div>
        <div style={{fontSize:"18px",color:C.gold}}>✦</div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"28px"}}>{ANIMAL_EMOJI[typeB]||"✨"}</div>
          <div style={{fontSize:"14px",fontWeight:"700",color:C.text}}>{typeB}</div>
          <div style={{fontSize:"9px",color:COMM_TEAM_COLORS[teamB],marginTop:"2px"}}>{teamB}チーム</div>
        </div>
      </div>
      <div style={{height:"1px",background:`rgba(212,170,64,0.3)`,margin:"0 0 16px"}}/>
      <div style={{textAlign:"center"}}>
        {relation.steps>0&&<div style={{fontSize:"10px",color:C.muted,marginBottom:"6px",letterSpacing:"0.2em"}}>軌道距離 {relation.steps}つ</div>}
        <div style={{fontSize:"clamp(18px,4vw,24px)",fontWeight:"700",color:C.gold,marginBottom:"4px"}}>{relation.name}</div>
        <div style={{fontSize:"12px",color:C.muted,marginBottom:"12px"}}>{relation.desc}</div>
        <div style={{padding:"8px 14px",background:sameTeam?"rgba(201,168,76,0.1)":"rgba(42,122,106,0.08)",border:`1px solid ${sameTeam?C.borderGold:C.teal}`,borderRadius:"4px",fontSize:"11px",color:sameTeam?C.accent:C.teal}}>
          {sameTeam?`✦ 同じ${teamA}チーム — 似た思考・価値観を持つ間柄`:`💫 ${teamA}チーム × ${teamB}チーム — 異なるエネルギーが交わる`}
        </div>
      </div>
    </div>
  );
}

function AishoResult({resultA,resultB,aisho}){
  const card={background:`linear-gradient(135deg,#ffffff,#fdf8f0)`,border:`1px solid ${C.borderGold}`,borderRadius:"4px",padding:"22px",marginBottom:"14px",boxShadow:`0 8px 32px rgba(200,160,48,0.15)`};
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"8px"}}>
      {[resultA,resultB].map((r,i)=><div key={i} style={{textAlign:"center",padding:"20px 12px",background:`linear-gradient(160deg,#f5edd8,#fdf8f0)`,borderRadius:"4px",border:`1px solid ${C.borderGold}`}}><div style={{fontSize:"9px",color:C.muted,letterSpacing:"0.3em",marginBottom:"8px"}}>{i===0?"あなた":"お相手"}</div><div style={{fontSize:"clamp(14px,3vw,18px)",fontWeight:"700",color:"#2a2010",marginBottom:"6px"}}>{r.name}</div><div style={{fontSize:"11px",color:C.muted}}>{r.year}/{r.month}/{r.day}</div><div style={{fontSize:"12px",color:C.teal,fontWeight:"600",marginTop:"6px"}}>{r.honshitsu}</div></div>)}
    </div>
    <div style={{textAlign:"center",fontSize:"28px",margin:"16px 0"}}>{aisho.isFutatgo?"✨":"💫"}</div>
    <SectionTitle>✦ 魂の相性</SectionTitle>
    <div style={{...card,textAlign:"center"}}><div style={{fontSize:"10px",color:C.muted,marginBottom:"8px"}}>魂の相性</div><div style={{fontSize:"clamp(22px,6vw,34px)",fontWeight:"700",color:C.gold}}>{aisho.sogoLabel}</div></div>
    <SectionTitle>✦ 過去生の関係</SectionTitle>
    <div style={{...card,textAlign:"center"}}><div style={{fontSize:"10px",color:C.muted,marginBottom:"8px"}}>過去生の関係</div><div style={{fontSize:"clamp(22px,6vw,34px)",fontWeight:"700",color:C.purple}}>{aisho.kakoLabel}</div>{aisho.kakoLabel!=="初"&&<div style={{fontSize:"12px",color:C.muted,marginTop:"8px"}}>前世からの深い縁があります</div>}</div>
    <SectionTitle>✦ コミュニケーション相性</SectionTitle>
    <CommAishoSection typeA={resultA.dobutsu} typeB={resultB.dobutsu} />
    <SectionTitle>✦ お二人の基本情報</SectionTitle>
    {[resultA,resultB].map((r,i)=><div key={i} style={{...card,marginBottom:"12px"}}><div style={{fontSize:"11px",color:C.gold,letterSpacing:"0.2em",marginBottom:"12px",fontWeight:"600"}}>{i===0?"▶ あなた":"▶ お相手"}　{r.name}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}><div style={{background:"#f5edd8",borderRadius:"4px",padding:"12px"}}><div style={{fontSize:"9px",color:C.muted,marginBottom:"4px"}}>魂の力</div><div style={{fontSize:"13px",fontWeight:"600",color:C.accent}}>{r.honshitsu}</div></div><div style={{background:"#f5edd8",borderRadius:"4px",padding:"12px"}}><div style={{fontSize:"9px",color:C.muted,marginBottom:"4px"}}>今生の課題</div><div style={{fontSize:"13px",fontWeight:"600",color:C.teal}}>{r.konjoKadai}</div></div><div style={{background:"#f5edd8",borderRadius:"4px",padding:"12px"}}><div style={{fontSize:"9px",color:C.muted,marginBottom:"4px"}}>コミュニケーション</div><div style={{fontSize:"13px",fontWeight:"600"}}>{ANIMAL_EMOJI[r.dobutsu]||"✨"} {r.dobutsu}</div></div><div style={{background:"#f5edd8",borderRadius:"4px",padding:"12px"}}><div style={{fontSize:"9px",color:C.muted,marginBottom:"4px"}}>タイプ</div><div style={{fontSize:"13px",fontWeight:"600",color:C.muted}}>{r.typeLabel}</div></div></div></div>)}
  </div>);
}


function CommAishoTab({C}){
  const [typeA,setTypeA]=React.useState("");
  const [typeB,setTypeB]=React.useState("");
  const rel=typeA&&typeB?getCommRelation(typeA,typeB):null;
  const teamColors={"フロント":"#C9A84C","クリエイト":"#8B7355","サポート":"#6B8E8E"};
  const teams={"フロント":["惑星","流星","光","太陽"],"クリエイト":["火","風","大地","銀河"],"サポート":["海","虹","星","月"]};
  const getTeam=t=>{for(const[team,members]of Object.entries(teams)){if(members.includes(t))return team;}return null;};
  return(
    <div style={{padding:"20px",maxWidth:"600px",margin:"0 auto"}}>
      <h2 style={{color:C.gold,textAlign:"center",marginBottom:"20px",fontSize:"18px"}}>コミュニケーションタイプ相性診断</h2>
      {["A","B"].map((label,li)=>(
        <div key={label} style={{marginBottom:"16px"}}>
          <div style={{color:C.gold,marginBottom:"8px",fontSize:"13px"}}>タイプ{label}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
            {COMM_TYPES.map(t=>{
              const team=getTeam(t);
              const tc=teamColors[team]||C.gold;
              const sel=li===0?typeA===t:typeB===t;
              return(
                <button key={t} onClick={()=>li===0?setTypeA(t):setTypeB(t)}
                  style={{padding:"8px 14px",borderRadius:"20px",border:`1.5px solid ${sel?tc:"#ddd"}`,
                  background:sel?tc:"white",color:sel?"white":C.text,cursor:"pointer",fontSize:"13px",fontWeight:sel?"bold":"normal"}}>
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {rel&&(
        <div style={{marginTop:"24px",padding:"20px",borderRadius:"12px",background:`linear-gradient(135deg,${rel.color||"#C9A84C"}22,${rel.color||"#C9A84C"}44)`,border:`1.5px solid ${rel.color||"#C9A84C"}`,textAlign:"center"}}>
          <div style={{fontSize:"28px",fontWeight:"bold",color:rel.color||"#C9A84C",marginBottom:"8px"}}>{rel.name}</div>
          <div style={{fontSize:"14px",color:C.text,marginBottom:"8px"}}>{rel.desc}</div>
          <div style={{fontSize:"13px",color:"#888"}}>{typeA} × {typeB}　距離：{rel.steps}つ</div>
        </div>
      )}
    </div>
  );
}

export default function App(){
  const[activeTab,setActiveTab]=useState("kojin");
  const[kojinResult,setKojinResult]=useState(null);
  const[kojinAnim,setKojinAnim]=useState(false);
  const[aishoStep,setAishoStep]=useState(1);
  const[resultA,setResultA]=useState(null);
  const[resultB,setResultB]=useState(null);
  const[aishoResult,setAishoResult]=useState(null);
  const[aishoAnim,setAishoAnim]=useState(false);
  const handleKojin=(name,y,m,d)=>{setKojinAnim(false);setTimeout(()=>{setKojinResult(calculate(name,y,m,d));setKojinAnim(true);},50);};
  const handleAishoA=(name,y,m,d)=>{setResultA(calculate(name,y,m,d));setAishoStep(2);};
  const handleAishoB=(name,y,m,d)=>{const rB=calculate(name,y,m,d);setResultB(rB);setAishoAnim(false);setTimeout(()=>{setAishoResult(calculateAisho(resultA,rB));setAishoStep(3);setAishoAnim(true);},50);};
  const resetAisho=()=>{setAishoStep(1);setResultA(null);setResultB(null);setAishoResult(null);};
  const tabStyle=(tab)=>({flex:1,padding:"14px 8px",background:activeTab===tab?`linear-gradient(135deg,#c8a030,#e0c060)`:"transparent",border:"none",borderBottom:activeTab===tab?"none":`1px solid ${C.borderGold}`,color:activeTab===tab?"#2a2010":C.muted,fontSize:"11px",letterSpacing:"0.2em",cursor:"pointer",fontFamily:"inherit",fontWeight:"600"});
  return(<><style>{`
  @media print {
    .no-print { display: none !important; }
    button { display: none !important; }
    .tab-bar { display: none !important; }
    .print-header,
    .print-header *,
    .print-header::before,
    .print-header::after { 
      background: white !important; 
      background-image: none !important;
      background-color: white !important;
      box-shadow: none !important;
    }
    * { 
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      font-size: 7.5pt !important;
      line-height: 1.2 !important;
      margin: 0 !important;
      padding: 2px 4px !important;
    }
    @page { 
      size: A4 portrait;
      margin: 6mm;
    }
    h1, [style*="clamp(24"] { font-size: 14pt !important; }
    [style*="clamp(20"] { font-size: 11pt !important; }
    [style*="clamp(18"] { font-size: 10pt !important; }
    [style*="clamp(16"] { font-size: 9pt !important; }
    [style*="fontSize:"40"] { font-size: 18pt !important; }
    [style*="fontSize:"32"] { font-size: 12pt !important; }
    [style*="fontSize:"28"] { font-size: 11pt !important; }
    [style*="fontSize:"22"] { font-size: 9pt !important; }
    [style*="gap:"14"] { gap: 4px !important; }
    [style*="gap:"12"] { gap: 4px !important; }
    [style*="padding:"32"] { padding: 4px !important; }
    [style*="padding:"22"] { padding: 6px !important; }
    [style*="marginBottom:"14"] { margin-bottom: 4px !important; }
    [style*="marginTop:"40"] { margin-top: 6px !important; }
    [style*="height:"4px"] { height: 2px !important; }
    svg { width: 80px !important; height: 40px !important; }
  }
`}</style><div style={{minHeight:"100vh",background:`linear-gradient(160deg,#faf6ee,#f5edd8,#faf6ee)`,color:C.text,fontFamily:"'Georgia','Yu Mincho','Noto Serif JP',serif"}}>
    <div className="print-header" style={{textAlign:"center",padding:"52px 24px 32px",borderBottom:`1px solid ${C.borderGold}`,background:`linear-gradient(180deg,#f0e8d0 0%,#faf6ee 60%,transparent 100%)`,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,transparent 0%,${C.gold} 20%,#c8a030 50%,${C.gold} 80%,transparent 100%)`}}/>
      <div style={{marginBottom:"16px",display:"flex",justifyContent:"center"}}>
        <svg width="180" height="90" viewBox="0 0 180 90">
          <defs><linearGradient id="symGold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f5d060"/><stop offset="100%" stopColor="#c8a030"/></linearGradient></defs>
          {[8,16,24].map((r,i)=><circle key={i} cx="90" cy="48" r={r} fill="none" stroke="#c8a030" strokeWidth="0.7" opacity={0.9-i*0.25} strokeDasharray={i>0?"4,3":"none"}/>)}
          <circle cx="90" cy="48" r="3" fill="#f5d060"/>
          <path d="M40,28 L42,34 L48,34 L43,38 L45,44 L40,40 L35,44 L37,38 L32,34 L38,34Z" fill="none" stroke="url(#symGold)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          {[[115,22],[132,35],[122,52],[140,20],[145,42],[128,60],[108,65]].map(([x,y],i)=><g key={i}><line x1={x} y1={y-4} x2={x} y2={y+4} stroke="#c8a030" strokeWidth="0.9" strokeLinecap="round" opacity="0.65"/><line x1={x-4} y1={y} x2={x+4} y2={y} stroke="#c8a030" strokeWidth="0.9" strokeLinecap="round" opacity="0.65"/></g>)}
        </svg>
      </div>
      <h1 style={{fontSize:"clamp(24px,5vw,42px)",fontWeight:"700",letterSpacing:"0.2em",background:`linear-gradient(135deg,#8a6010 0%,#d4aa40 40%,#f5d060 70%,#c8a030 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:"0 0 10px"}}>宇宙星波学</h1>
      <p style={{fontSize:"10px",color:C.gold,letterSpacing:"0.4em",margin:0,opacity:0.8}}>UCHU SEIBA GAKU</p>
    </div>
    <div style={{display:"flex",borderBottom:`1px solid ${C.borderGold}`,background:"#faf6ee",position:"sticky",top:0,zIndex:10}}>
      <button style={tabStyle("kojin")} onClick={()=>setActiveTab("kojin")}>個人鑑定</button>
      <button style={tabStyle("aisho")} onClick={()=>setActiveTab("aisho")}>相性診断</button>
      <button style={tabStyle("comm_aisho")} onClick={()=>setActiveTab("comm_aisho")}>コミュ相性</button>
    </div>
    <div style={{maxWidth:"640px",margin:"0 auto",padding:"0 24px 80px"}}>
      {activeTab==="kojin"&&<div><div className="no-print" style={{padding:"32px 0 24px"}}><InputForm onSubmit={handleKojin} buttonLabel="鑑 定 す る"/></div>{kojinResult&&<div style={{opacity:kojinAnim?1:0,transform:kojinAnim?"translateY(0)":"translateY(20px)",transition:"all 0.5s ease"}}><KojinResult result={kojinResult}/><div style={{textAlign:"center",marginTop:"40px"}}><button onClick={()=>window.print()} style={{padding:"14px 32px",background:"linear-gradient(135deg,#c8a030,#e0c060)",border:`1px solid ${C.gold}`,borderRadius:"4px",color:"#2a2010",fontSize:"13px",letterSpacing:"0.3em",cursor:"pointer",fontFamily:"inherit"}}>✦ 鑑定書を印刷する</button></div></div>}</div>}
      {activeTab==="aisho"&&<div>
        {aishoStep===1&&<div style={{padding:"32px 0 24px"}}><div style={{textAlign:"center",marginBottom:"24px"}}><div style={{fontSize:"10px",color:C.gold,letterSpacing:"0.3em"}}>STEP 1 / 2</div><div style={{fontSize:"16px",color:C.text,marginTop:"8px"}}>あなたの情報を入力</div></div><InputForm onSubmit={handleAishoA} buttonLabel="次 へ →"/></div>}
        {aishoStep===2&&<div style={{padding:"32px 0 24px"}}><div style={{textAlign:"center",marginBottom:"24px"}}><div style={{fontSize:"10px",color:C.gold,letterSpacing:"0.3em"}}>STEP 2 / 2</div><div style={{fontSize:"16px",color:C.text,marginTop:"8px"}}>お相手の情報を入力</div><div style={{marginTop:"8px",padding:"8px 16px",background:"rgba(200,168,74,0.1)",border:`1px solid ${C.borderGold}`,borderRadius:"4px",fontSize:"12px",color:C.muted}}>✓ {resultA?.name} さんの情報を受け取りました</div></div><InputForm onSubmit={handleAishoB} buttonLabel="相 性 を 診 断"/><button onClick={resetAisho} style={{width:"100%",marginTop:"12px",padding:"12px",background:"transparent",border:`1px solid ${C.borderGold}`,borderRadius:"4px",color:C.muted,fontSize:"12px",cursor:"pointer",fontFamily:"inherit"}}>← 最初からやり直す</button></div>}
        {aishoStep===3&&aishoResult&&<div style={{opacity:aishoAnim?1:0,transform:aishoAnim?"translateY(0)":"translateY(20px)",transition:"all 0.5s ease",paddingTop:"24px"}}><AishoResult resultA={resultA} resultB={resultB} aisho={aishoResult}/><button onClick={resetAisho} style={{width:"100%",marginTop:"24px",padding:"14px",background:"transparent",border:`1px solid ${C.borderGold}`,borderRadius:"4px",color:C.muted,fontSize:"12px",cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.2em"}}>✦ もう一度診断する</button></div>}
      </div>}
      {activeTab==="comm_aisho"&&<div style={{paddingTop:"24px"}}><CommAishoTab C={C}/></div>}
    </div>
  </div></>);
}
