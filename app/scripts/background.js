import "../backgrounds/popup"
import "../backgrounds/context-menu"



// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("收到来自content-script的消息：");
  console.log(request, sender, sendResponse);
  sendResponse("我是background，我已收到你的消息：" + JSON.stringify(request));
});

console.log(window);

const notice = options => {
  chrome.notifications.create(null, {
    type: "basic",
    iconUrl:
      "data:image/svg+xml;base64,PHN2ZyBpZD0i5Zu+5bGCXzEiIGRhdGEtbmFtZT0i5Zu+5bGCIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojNTA1ZGZmO30uY2xzLTJ7ZmlsbDojMGU4NWZmO30uY2xzLTN7ZmlsbDojMzhjMTVlO30uY2xzLTQsLmNscy01LC5jbHMtNntvcGFjaXR5OjAuMzt9LmNscy00e2ZpbGw6dXJsKCPmnKrlkb3lkI3nmoTmuJDlj5hfMTApO30uY2xzLTV7ZmlsbDp1cmwoI+acquWRveWQjeeahOa4kOWPmF8xMC0yKTt9LmNscy02e2ZpbGw6dXJsKCPmnKrlkb3lkI3nmoTmuJDlj5hfMTAtMyk7fTwvc3R5bGU+PGxpbmVhckdyYWRpZW50IGlkPSLmnKrlkb3lkI3nmoTmuJDlj5hfMTAiIHgxPSItMTY3Ni4yNiIgeTE9Ii0xNTIxLjY5IiB4Mj0iLTE1NDAuMyIgeTI9Ii0xNTIxLjY5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAuNzIsIC0wLjY5LCAwLjkxLCAwLjk0LCAyODI0LjksIDUxOS40NSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyNDJmODAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyNDJmODAiIHN0b3Atb3BhY2l0eT0iMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSLmnKrlkb3lkI3nmoTmuJDlj5hfMTAtMiIgeDE9Ii0xNjU2Ljc1IiB5MT0iLTk1OS4yNSIgeDI9Ii0xNTIzLjQ2IiB5Mj0iLTk2MS4zNSIgeGxpbms6aHJlZj0iI+acquWRveWQjeeahOa4kOWPmF8xMCIvPjxsaW5lYXJHcmFkaWVudCBpZD0i5pyq5ZG95ZCN55qE5riQ5Y+YXzEwLTMiIHgxPSI4MDMuOCIgeTE9IjMyNi41NCIgeDI9IjgwMy44IiB5Mj0iNDU0LjcyIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIDEsIDAsIDApIiB4bGluazpocmVmPSIj5pyq5ZG95ZCN55qE5riQ5Y+YXzEwIi8+PC9kZWZzPjx0aXRsZT7nlLvmnb8gNDwvdGl0bGU+PHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjY5Ljg5IDY5LjIgNjkuODkgMjIyLjk4IDMyMi4zNiA0ODUuMTQgMzIyLjM2IDMyMS42NyA2NzguNzIgMzIxLjY3IDY3OC43MiA2NzguMDMgNTA4LjEzIDY3OC4wMyA3NTEuMjcgOTMwLjUgOTMxLjE5IDkzMC41IDkzMS4xOSA2OS4yIDY5Ljg5IDY5LjIiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iOTMxLjE5IDMyMC41MSA5MzEuMTkgNjkuMiA2OS44OSA2OS4yIDY5Ljg5IDIyMi45OCAxNjMuODIgMzIwLjUxIDkzMS4xOSAzMjAuNTEiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik03MC4wOSw2OS4ybC0uMiwzNTYuMzdMNTc0LjgyLDkzMC41SDkzMS4xOVoiLz48cG9seWdvbiBjbGFzcz0iY2xzLTQiIHBvaW50cz0iNTAwLjU0IDMyMS42NyAzMjIuMzYgMzIxLjY3IDY5Ljg5IDY5LjIgMjQ3LjggNjkuMiA1MDAuNTQgMzIxLjY3Ii8+PHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjkzMS42MSA3NDQuNzIgOTMxLjYxIDkzMC41IDY3OS4xNCA2NzguMDMgNjc4LjY2IDQ5OS44NSA5MzEuNjEgNzQ0LjcyIi8+PHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjY5Ljg5IDcwMS4wOSAyOTguNjQgOTMwLjUgNjkuODkgOTMwLjUgNjkuODkgNzAxLjA5Ii8+PHBvbHlnb24gY2xhc3M9ImNscy02IiBwb2ludHM9IjY3OC43MiAzMjEuNjcgOTMxLjE5IDMyMS42NyA5MzEuMTkgNDcxLjE1IDY3Ni40IDQ3MS4xNSA2NzguNzIgMzIxLjY3Ii8+PC9zdmc+",
    title: options.title,
    message: options.message
  });
};

// 导出到全局
Object.assign(window, {
  notice
});
