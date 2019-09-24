import { inject } from 'src/app/util/inject';
import { ToastController } from '@ionic/angular';

const toasts: any[] = [];

const toast = async (
  message: string|any, duration: number = 3000,
  position: 'top' | 'bottom' | 'middle' = 'top',
  close: string = null
): Promise<any> => {
  const toastCtrl: ToastController = await inject(ToastController);
  let t = await toastCtrl.create({
    message,
    position,
    duration,
    showCloseButton: close != null,
    closeButtonText: close
  });
  if (!toasts.length) await t.present();
  toasts.push(t);
  t.onDidDismiss().then(() => {
    toasts.shift();
    if (toasts.length) toasts.shift().present();
  });

  return t;
};

export { toast };
