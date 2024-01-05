
import Toast from 'react-native-simple-toast';

export default (msg: any) => {
    if(typeof msg !== 'string'){
        Toast.showWithGravity("错误的消息提醒", Toast.LONG, Toast.CENTER);
        return;
    }
    Toast.showWithGravity(msg, Toast.LONG, Toast.CENTER);
}