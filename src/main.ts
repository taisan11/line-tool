import './style.css';
import liff from '@line/liff';
import LIFFInspectorPlugin from '@line/liff-inspector';

const app = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;

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
  // ユーザー情報を表示
  app.innerHTML = `
    <h4>${profile.displayName}さんようこそ!!</h4>
    <p>ここでは様々なLINEのツールを作っていきます</p>
  `;
};