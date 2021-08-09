function checkNotificationPromise(): boolean {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }
  return true;
}

function handlePermission(permission: string): void {
  if (permission !== 'granted') {
    alert(
      '浏览器消息通知被禁用，将无法获取单元格执行完成的推送通知。请更新您的浏览器设置来允许 JupyterLab 向您推送通知。'
    );
  }
}

export function checkBrowserNotificationSettings(): void {
  if (!('Notification' in window)) {
    alert('当前浏览器不支持推送通知。');
  } else if (Notification.permission !== 'granted') {
    if (checkNotificationPromise()) {
      Notification.requestPermission().then(permission => {
        handlePermission(permission);
      });
    } else {
      Notification.requestPermission(permission => {
        handlePermission(permission);
      });
    }
  }
}
