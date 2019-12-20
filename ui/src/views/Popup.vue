<template>
  <div class="popup-page">
    <div class="bg">
      <h1><img src="../assets/portal.png" alt="" width="30"> Picture Portal</h1>
    </div>
    <input type="file" @change="handleFileChange" />
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "",
  SecretKey: ""
});

export default {
  created() {
    console.log(cos);
    document.title = "Picture Portal - 个人云图床";
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0];
      cos.sliceUploadFile(
        {
          Bucket: "", // Bucket 格式：test-1250000000
          Region: "",
          Key: "lemontree2000/" + file.name,
          Body: file,
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
        function(err, data) {
          console.log(err || data);
        }
      );
    }
  }
};
</script>

<style scoped>
.popup-page {
  user-select: none;
}
.popup-page h1 {
  text-align: center;
  color: #333;
  line-height: 32px;
}
.popup-page h1 img {
  vertical-align: text-bottom;
}
</style>
