import COS from "cos-js-sdk-v5";

class CosUtil {
  config = {};
  cos = {};
  constructor() {
    this.init();
  }
  /**
   * 初始化
   */
  init() {
    window.chrome.storage.sync.get("userConfig", storage => {
      this.config = storage.userConfig;
      this.cos = new COS({
        SecretId: this.config.SecretId,
        SecretKey: this.config.SecretKey
      });
    });
  }

  /**
   * 上传文件
   * @param {File} file 文件对象
   * @param {Object} options 回调选项
   *   @param {Function} options.onTaskReady
   *   @param {Function} options.onHashProgress
   *   @param {Function} options.onProgress
   * @param {Function} cb 上传完成，成功或者失败
   */
  uploadFile(file, options, cb) {
    this.cos.sliceUploadFile(
      {
        Bucket: this.config.Bucket, // Bucket 格式：test-1250000000
        Region: this.config.Region,
        Key: "picture-portal/" + file.name,
        Body: file,
        onTaskReady: options.onTaskReady,
        onHashProgress: options.onHashProgress,
        onProgress: options.onProgress
      },
      cb
    );
  }
}

export default new CosUtil();
