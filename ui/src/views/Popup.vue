<template>
  <div class="popup-page">
    <div class="bg">
      <h1>Picture Portal</h1>
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
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0];
      cos.sliceUploadFile(
        {
          Bucket: '', // Bucket 格式：test-1250000000
          Region: '',
          Key: 'lemontree2020/'+ file.name,
          Body: file,
          onTaskReady: function(tid) {
            console.log(tid)
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
  width: 320px;
  height: 360px;
  user-select: none;
}
.popup-page h1 {
  text-align: center;
  color: #333;
}
</style>
