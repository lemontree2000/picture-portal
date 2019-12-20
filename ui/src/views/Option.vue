<template>
  <div class="option">
    <h3>私有图床云配置</h3>
    <p>目前只支持腾讯云对象存储，插件为无服务架构，配置信息不会上传服务器，为避免泄露，请勿将配置信息告诉他人。</p>
    <ul>
      <li>
        <label for="SecretId">
          SecretId
          <span>*</span>
        </label>
        <input
          :type="inputType"
          id="SecretId"
          v-model="userConfig.SecretId"
          placeholder="请输入SecretId"
        />
        <p class="error">{{formErrors.SecretIdError}}</p>
      </li>
      <li>
        <label for="SecretKey">
          SecretKey
          <span>*</span>
        </label>
        <input
          :type="inputType"
          id="SecretKey"
          v-model="userConfig.SecretKey"
          placeholder="请输入SecretKey"
        />
        <p class="error">{{formErrors.SecretKeyError}}</p>
      </li>
      <li>
        <label for="Bucket">
          Bucket
          <span>*</span>
        </label>
        <input :type="inputType" id="Bucket" v-model="userConfig.Bucket" placeholder="请输入Bucket" />
        <p class="error">{{formErrors.BucketError}}</p>
      </li>
      <li>
        <label for="Region">
          Region
          <span>*</span>
        </label>
        <input :type="inputType" id="Region" v-model="userConfig.Region" placeholder="请输入Region" />
        <p class="error">{{formErrors.RegionError}}</p>
      </li>
      <!-- <li>
        <label for="folder">文件夹名称(选填)</label>
        <input type="text" id="folder" v-model="userConfig.folder" placeholder="请输入文件夹名称" />
      </li>-->
    </ul>
    <div class="button" @click="saveConfig">保存配置</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userConfig: {},
      formErrors: {},
      inputType: "text"
    };
  },
  async created() {
    chrome.storage.sync.get("userConfig", storage => {
      if (storage.userConfig) {
        this.userConfig = storage.userConfig;
        this.inputType = "password";
      }
    });
  },
  methods: {
    // 保存配置
    async saveConfig() {
      const isVaild = this.vaildform();
      if (!isVaild) return;
      chrome.storage.sync.set({ userConfig: this.userConfig }, () => {
        const bg = chrome.extension.getBackgroundPage();
        bg &&
          bg.notice({
            title: "提示",
            message: "保存成功"
          });
      });
    },
    // 校验配置
    vaildform() {
      let isVaild = true;
      for (const n in this.userConfig) {
        const value = this.userConfig[n];
        if (value === "") {
          this.$set(this.formErrors, n + "Error", n + "不能为空");
          isVaild = false;
        }
      }
      return isVaild;
    }
  }
};
</script>

<style>
p,
h3,
ul,
li {
  padding: 0;
  margin: 0;
}

.option {
  border-top: 1px solid #dedede;
  font-size: 14px;
  padding: 0 20px 20px;
}
.option h3 {
  font-weight: 600;
  line-height: 45px;
}
.option p {
  color: #ccc;
  font-size: 12px;
}
ul,
li {
  list-style: none;
}
.option li p.error {
  color: red;
  height: 20px;
  line-height: 20px;
  min-width: 1px;
}
.option li input {
  width: 100%;
}
.option li label {
  display: block;
  color: #333;
}
.option label span {
  color: red;
}
.option .button {
  height: 40px;
  border: none;
  width: 150px;
  background: #36f;
  color: #fff;
  text-shadow: none;
  border-radius: 2px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  user-select: none;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
