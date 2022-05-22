import { getNotificationStatus, getAlarm } from '../../source/modules/notifications.js';

describe('Alarm Tests', () => {
    test('Check alarm exists', () => {
        expect(getAlarm()).not.toBeNull();
    }),
    
    test('Check alarm has a valid url', () => {
        expect(getAlarm().src).not.toBeNull();
    });
});

//Mock the Notification API
global.Notification = ({
    requestPermission: function() {
        this.permission = 'granted';
    },
    permission: 'granted'
});

describe('Test that notification permissions', () => {
    test('are granted', () => {
        let permiss = getNotificationStatus();
        expect(permiss).toBe(true);
    }),
    
    test('are denied', () => {
        Notification.permission = 'denied';
        let permiss = getNotificationStatus();
        expect(permiss).toBe(false);
    }),
    
    test('permissions are received', () => {
        Notification.permission = 'default';
        let permiss = getNotificationStatus();
        expect(permiss).toBeTruthy();
    });
});