<template>
  <div class="popup-page">
    <div class="bg">
      <h1>
        <img src="../assets/portal.png" alt width="30" /> Picture Portal
      </h1>
    </div>
    <div class="upload-tasks">
      <ul>
        <li class="task-item">
          <div class="file-input">
            <input type="file" accept=".jpg, .png, .gif" @change="handleFileChange" />
            <img :src="src" width="100%" alt />
          </div>
          <ul class="url-types">
            <li class="url-item">
              <span>URL</span>
              <input readonly type="text" placeholder="普通url" />
              <div>复制</div>
            </li>
            <li class="url-item">
              <span>HTML</span>
              <input readonly type="text" placeholder="html格式" />
              <div>复制</div>
            </li>
            <li class="url-item">
              <span>Markdown</span>
              <input readonly type="text" placeholder="md格式" />
              <div>复制</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import cosInstance from "../utils/cos";

export default {
  data() {
    return {
      src: ""
    };
  },
  created() {
    document.title = "Picture Portal - 个人云图床";
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.src = e.target.result;
      };
      reader.readAsDataURL(file);
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
        }
      );
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
  width: 120px;
  height: 120px;
  border-radius: 3px;
  border: 1px solid #ccc;
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
</style>
