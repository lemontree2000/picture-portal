<template>
  <div class="popup-page">
    <div class="bg">
      <h1><img src="../assets/portal.png" alt width="30" /> Picture Portal</h1>
    </div>
    <div class="upload-tasks">
      <ul>
        <li class="task-item" v-for="(item, i) in list" :key="i">
          <div class="file-input">
            <input
              type="file"
              accept=".jpg, .png, .gif, .webp"
              @change="handleFileChange($event, item)"
            />
            <img :src="item.url" alt class="image" />
          </div>
          <ul class="url-types">
            <li class="url-item">
              <span>URL</span>
              <input
                readonly
                type="text"
                :value="item.prefixUrl.normal"
                placeholder="普通url"
              />
              <div
                class="copy-btn"
                :data-clipboard-text="item.prefixUrl.normal"
              >
                复制
              </div>
            </li>
            <li class="url-item">
              <span>HTML</span>
              <input
                readonly
                type="text"
                :value="item.prefixUrl.html"
                placeholder="html格式"
              />
              <div class="copy-btn" :data-clipboard-text="item.prefixUrl.html">
                复制
              </div>
            </li>
            <li class="url-item">
              <span>Markdown</span>
              <input
                readonly
                type="text"
                :value="item.prefixUrl.md"
                placeholder="md格式"
              />
              <div class="copy-btn" :data-clipboard-text="item.prefixUrl.md">
                复制
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="history-btn">history</div>
  </div>
</template>

<script>
import cosInstance from "../utils/cos";
import { createImagePrefix } from "../utils/index";
import ClipboardJS from "clipboard";

export default {
  data() {
    return {
      list: [
        {
          url: require("../assets/picture-placeholder.png"),
          prefixUrl: {
            normal: "",
            html: "",
            md: ""
          }
        }
      ]
    };
  },
  created() {
    document.title = "Picture Portal - 个人云图床";
  },
  methods: {
    async handleFileChange(e, fileItem) {
      const file = e.target.files[0];
      console.log(file);
      if (!file) return;
      fileItem.url = await this.readFile(file);
      cosInstance.uploadFile(
        file,
        {
          onTaskReady: function(tid) {
            console.log(tid);
          },
          onHashProgress: function(progressData) {
            console.log("onHashProgress", JSON.stringify(progressData));
          },
          onProgress: function(progressData) {
            console.log("onProgress", JSON.stringify(progressData));
          }
        },
        (err, data) => {
          console.log(err || data);
          if (err) {
            console.error(err);
            return;
          }
          fileItem.prefixUrl = createImagePrefix(data.Location, file);
          this.initClipboardJS();
        }
      );
    },
    async readFile(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    initClipboardJS() {
      this.clipboard = new ClipboardJS(".copy-btn");
      this.clipboard.on("success", function() {
        const bg = window.chrome.extension.getBackgroundPage();
        bg &&
          bg.notice({
            title: "提示",
            message: "复制成功"
          });
      });
    }
  }
};
</script>

<style scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.popup-page {
  user-select: none;
  max-width: 80%;
  margin: 0 auto;
}
.popup-page .bg {
  height: 60px;
}
.popup-page h1 {
  text-align: center;
  color: #333;
  line-height: 32px;
}
.popup-page h1 img {
  vertical-align: text-bottom;
}
.upload-tasks .task-item,
.url-types .url-item {
  color: #333;
  font-size: 14px;
  display: flex;
  width: 100%;
}
.url-types {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.task-item .file-input {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.file-input img.image {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  object-fit: cover;
}
.file-input input {
  opacity: 0;
  display: block;
  width: 100%;
  height: 100%;
}
.url-item span {
  width: 90px;
  text-align: right;
}
.url-item input {
  border: none;
  border-bottom: 1px solid #dedede;
  flex: 1;
  margin: 0 10px;
  color: #a5a5a5;
}
.url-item div {
  width: 45px;
  height: 25px;
  font-size: 12px;
  line-height: 25px;
  text-align: center;
  background: #36f;
  color: #fff;
  border-radius: 2px;
  cursor: pointer;
}
.url-item input:focus {
  outline: none;
}
.history-btn {
  position: fixed;
  right: 0;
  bottom: 40px;
  height: 30px;
  width: 70px;
  border: 1px solid #ccc;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
</style>
