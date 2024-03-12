import './style.css';
import liff from '@line/liff';
import LIFFInspectorPlugin from '@line/liff-inspector';
import { sendLiffMessage } from './sendMSG';

const app = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;

let Token = '';
// 読み込み時に実行
window.onload = async () => {
  const url = new URL(window.location.href);
  const param = url.searchParams
  if (param.get('debug') === 'true') {
    console.log('Debug Mode!!!:', param.get('liff.state'));
    liff.use(new LIFFInspectorPlugin());
  }
  // LIFFの初期化
  await liff.init({liffId: import.meta.env.VITE_LIFF_ID});
  // ログインしていない場合はログイン画面にリダイレクト
  if (!liff.isLoggedIn()) {
    liff.login();
    console.log('ログインしていません');
    return;
  }
  // ユーザー情報の取得
  const profile = await liff.getProfile();
  Token = liff.getAccessToken()||'';
  // ユーザー情報を表示
  app.innerHTML = `
    <h4>${profile.displayName}さんようこそ!!</h4>
    <p>ここでは様々なLINEのツールを作っていきます</p>
    <p>あなたのとーくんはこちら!!</p>
    <input type="text" id="aaa" value="${Token}" disabled>
    <p>現在のルームIDです</p>
    <input type="text" id="aaa" value="${liff.getContext()?.userId||liff.getContext()?.roomId}" disabled>
  `;
};

const msgbtn = document.querySelector('#msgbtn');
msgbtn?.addEventListener('click', () => {
  const naiyou = document.getElementById('aaa') as HTMLInputElement;
  sendLiffMessage(Token,naiyou.value);
});