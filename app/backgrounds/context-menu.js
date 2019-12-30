chrome.contextMenus.create({
  title: "历史图片",
  contexts: ["browser_action"],
  onclick: function() {
    chrome.tabs.create({
        url: "ui/index.html#/history"
    }, (s) => {
        console.log('sfes',s)
    })
    // alert("您点击了右键菜单！");
  }
});
