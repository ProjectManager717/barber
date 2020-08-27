// @flow
import firebase from 'react-native-firebase';
import { Linking, NativeModules } from 'react-native'

const NOTIFICATION_CHANNEL_ID = '2100'
const NOTIFICATION_CHANNEL_NAME = 'MI DOC'

export default async (message) => {
    const { data } = message
    console.log('BackgroundMessage', JSON.stringify(message))
    return Promise.resolve();
}

const buildNotification = async () => {
    try {
        // await firebase.initializeApp()
        const channel = new firebase.notifications.Android.Channel(NOTIFICATION_CHANNEL_ID, NOTIFICATION_CHANNEL_NAME, firebase.notifications.Android.Importance.Max)
            .setDescription(NOTIFICATION_CHANNEL_NAME);

        // Create the channel
        await firebase.notifications().android.createChannel(channel);

        const notification = new firebase.notifications.Notification()
            .setNotificationId('notificationId')
            .setTitle('My notification title')
            .setBody('My notification body')
            .setData({
                key1: 'value1',
                key2: 'value2',
            });

        notification
            .android.setChannelId(NOTIFICATION_CHANNEL_ID)
            .android.setSmallIcon('ic_launcher');

        await firebase.notifications().displayNotification(notification)
    } catch (error) {
        console.log('BackgroundMessage', 'buildNotification', 'error', error)
    }
}
