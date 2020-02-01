/*--------------------
 * 定数
 *--------------------*/
/**特等(開会式) */
const spOpenWn  = ['B1246854381', 'B1231301532'];
/**特等（閉会式）*/
const spCloseWn = ['B1231668186', 'B1230894016'];
/**特等（競技） */
const spCompitition = ['B***3457391'];
/**1等 */
const no1Wn = ['*****895123'];
/**2等 */
const no2Wn = ['*******9406'];
/**3等 */
const no3Wn = [ '*********67', '*********37', '*********16'];
document.addEventListener('DOMContentLoaded', function() {
  //クリックイベント：結果表示
  document.getElementById('gmOutput').addEventListener('click', gmJudge, false);
  //クリックイベント：入力蘭追加
  document.getElementById('addTextArea').addEventListener('click', addTextArea, false);


});

/** 入力結果を判定し、出力 */
function gmJudge() {
  let form = document.forms.mainForm;
  let target="";
  let list = [];
  let kekka = [];
  let areaNum = document.getElementsByClassName("js_letterNumber");
  for (let i=0; i<areaNum.length; i++) {
    list[i] = document.getElementById("box" + i).value;
  }

  for (let i=0; i<list.length; i++) {
    flag = wnJudge(spOpenWn, list[i]);
    if (flag==true) {
      kekka[i] ='特等（開会式）当選！';
      continue;
    }
    flag = wnJudge(spCloseWn, list[i]);
    if (flag==true) {
      kekka[i] ='特等（閉会式）当選！';
      continue;
    }
    flag = wnJudge(spCompitition, list[i]);
    if (flag==true) {
      kekka[i] ='特等（競技観戦）当選！';
      continue;
    }
    flag = wnJudge(no1Wn, list[i]);
    if (flag==true) {
      kekka[i] ='1等当選！';
      continue;
    }
    flag = wnJudge(no2Wn, list[i]);
    if (flag==true) {
      kekka[i] ='2等当選！';
      continue;
    }
    flag = wnJudge(no3Wn, list[i]);
    if (flag==true) {
      kekka[i] ='3等当選！';
      continue;
    }
    kekka[i] = 'はずれ';
  }

  //結果を出力
  for (let i=0; i<areaNum.length; i++) {
    target = document.getElementById("ans" + i);
    target.innerHTML = kekka[i];
  }
};

/** ＊を含む判定
 * @param wn 当選番号
 * @param num 確認番号
 * @returns 当選有無(true/false)
 */
function wnJudge(wn, num) {
  /**番号の桁数 */
  let numLeng = wn[0].length;
  /**当選判定 */
  let flag = null;

  //当選パターン数だけ繰り返す
  for(let i=0; i<wn.length; i++) {
    flag = true;
    //桁数だけ繰り返す
    for (let j=0; j<numLeng; j++) {
      //＊は比較しない
      if ('*' == wn[i][j]) {
        //nothing
      //1文字ずつ比較
      } else if (wn[i][j] != num[j]){
        flag = false;
        break;
      }
    }
    //文字が全て一致した場合flagはtrueのまま
    if (flag) {
      //当選(true)を返す
      return flag;
    }
  }
  return flag;
};

/** 入力欄を追加するイベント */
function addTextArea() {
  //入力欄の数
  let turm = document.getElementsByClassName('js_letterNumber').length;
  //追加する入力欄の数
  let num = 10;

  console.log(turm);

  for (let i=0; i<num; i++, turm++) {
    let tr = document.createElement('tr');
    let tdL = document.createElement('td');
    let tdR = document.createElement('td');
    let input = document.createElement('input');
    let p = document.createElement('p');
    let div = document.createElement('div');
  
    tr.className = 'table-block';
    tdL.className = 't-left';
    tdR.className = 't-right';
    input.type = 'text';
    input.name = 'box' + turm;
    input.id = 'box' + turm;
    input.className = 'js_letterNumber';
    p.id = 'ans' + turm;
    div.className = 'text-box';

    div.appendChild(input);
    tdL.appendChild(div);
    tdR.appendChild(p);
    tr.appendChild(tdL);
    tr.appendChild(tdR);
    document.getElementById('inputTableBody').appendChild(tr);

  }



};
