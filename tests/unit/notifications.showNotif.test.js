<<<<<<< HEAD:source/__tests__/notifications.showNotif.test.js
import { showNotif } from '../modules/notifications';
=======
import { showNotif } from '..source/modules/notifications';
>>>>>>> fixing-pipeline:tests/unit/notifications.showNotif.test.js

describe('Test notification body is correct', () => {
    test('when a long break begins', () => {
        let body = showNotif('Long Break State');
        expect(body).toBe('You have completed a pomo! Your long break begins now :)');  
    }),

    test('when a short break begins', () => {
        let body = showNotif('Short Break State');
        expect(body).toBe('You have completed a pomo! Your short break begins now :)');
    }), 

    test('when a break ends', () => {
        let body = showNotif('Work State');
        expect(body).toBe('Your break has ended. A new pomo begins now :)');
    });
});