import './style.css';
import liff from '@line/liff';

const app = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;

// 読み込み時に実行
window.onload = async () => {
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
    <p>現在ロード中です。しばらくお待ちください</p>
  `;
  liff.sendMessages([{
    type: 'text',
    text: `---Data---\n${await getGeo()}`
}])
};

function getGeo(): Promise<string> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const geo_text = formatGeoInfo(position);
                resolve(geo_text);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

function formatGeoInfo(position: any) {
    let geo_text = "緯度:" + position.coords.latitude + "\n";
    geo_text += "経度:" + position.coords.longitude + "\n";
    geo_text += "高度:" + position.coords.altitude + "\n";
    geo_text += "位置精度:" + position.coords.accuracy + "\n";
    geo_text += "高度精度:" + position.coords.altitudeAccuracy + "\n";
    geo_text += "移動方向:" + position.coords.heading + "\n";
    geo_text += "速度:" + position.coords.speed + "\n";

    let date = new Date(position.timestamp);

    geo_text += "取得時刻:" + date.toLocaleString() + "\n";
    geo_text += "OS:" + liff.getOS() + "\n";
    geo_text += "Language:" + liff.getLanguage() + "\n";

    return geo_text;
}