import {
  getNotificationStatus,
  getAlarm,
} from "../../source/modules/notifications.js";

describe(".getAlarm()", () => {
  test("alarm exists", () => {
    expect(getAlarm()).not.toBeNull();
  });
  test("alarm with valid url", () => {
    expect(getAlarm().src).not.toBeNull();
  });
});

//Mock the Notification API
global.Notification = {
  requestPermission: function () {
    this.permission = "granted";
  },
  permission: "granted",
};

describe(".getNotificationStatus()", () => {
  test("permissions granted", () => {
    let permiss = getNotificationStatus();
    expect(permiss).toBe(true);
  });
  test("permissions denied", () => {
    Notification.permission = "denied";
    let permiss = getNotificationStatus();
    expect(permiss).toBe(false);
  });
  test("permissions received", () => {
    Notification.permission = "default";
    let permiss = getNotificationStatus();
    expect(permiss).toBeTruthy();
  });
});
