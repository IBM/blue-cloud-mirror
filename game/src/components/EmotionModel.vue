<template>
  <div>
    <img id="lastimage" ref="lastimage">
    <canvas id="lastrecognizedface" ref="lastrecognizedface"/>
  </div>
</template>

<script>
import * as tf from "@tensorflow/tfjs";

export default {
  name: "emotionmodel",
  data() {
    return {
      model: {}
    };
  },
  mounted() {
    let otherDomainUrl = this.$store.state.otherDomainUrl;
    let url = "models/emotion/model.json";
    if (
      otherDomainUrl &&
      otherDomainUrl != "" &&
      otherDomainUrl != "other-domain-url-not-defined"
    ) {
      url = otherDomainUrl + url;
    }
    tf.loadModel(url).then(result => {
      this.model = result;
      this.$store.commit("setEmotionRecognitionModelLoaded");

      this.$store.watch(
        state => {
          return state.faceRecognition.lastResult;
        },
        val => {
          console.log("state.faceRecognition.lastResult changed");

          if (this.$store.state.emotionRecognition.modelLoaded == true) {
            if (this.$store.state.currentGame.emotions.ongoing == true) {
              this.lastimage = this.$refs.lastimage;
              if (this.lastimage) {
                this.lastimage.src = this.$store.state.webcam.lastImage;

                let canvas = this.$refs.lastrecognizedface;
                canvas.width = val.box.width;
                canvas.height = val.box.height;
                let canvasContext = canvas.getContext("2d");
                canvasContext.drawImage(
                  this.lastimage,
                  val.box.left,
                  val.box.top,
                  val.box.width,
                  val.box.height,
                  0,
                  0,
                  val.box.width,
                  val.box.height
                );

                let results = [val];
                let resizedDetections = results.map(res =>
                  res.forSize(
                    this.$store.state.webcam.width,
                    this.$store.state.webcam.height
                  )
                );
                this.imgToInputs(canvas).then(input => {
                  if (input) {
                    let resultEmotion = this.predictEmotion(input);
                    let payload = {
                      result: resultEmotion,
                      face: canvas.toDataURL("image/png")
                    };
                    this.$store.commit(
                      "updateLastEmotionRecognitionResult",
                      payload
                    );
                  }
                });
              }
            }
          }
        },
        {
          deep: true
        }
      );
    });
  },
  methods: {
    predictEmotion(input) {
      var LABEL_EMOTIONS = {
        0: "Angry",
        1: "Disgust",
        2: "Fear",
        3: "Happy",
        4: "Sad",
        5: "Surprise",
        6: "Neutral"
      };
      if (this.$store.state.emotionRecognition.modelLoaded == true) {
        var r = this.model.predict(input);
        var result = r.dataSync();
        var tresult = tf.tensor(result);
        var label_index = tf.argMax(tresult).dataSync()[0];
        var label_percent = result[label_index].toFixed(4) * 100;

        let readableResults = [];
        readableResults.push({
          'emotion': "Happy",
          'percent': result[3].toFixed(4) * 100
        });
        readableResults.push({
          'emotion': "Angry",
          'percent': result[0].toFixed(4) * 100
        });
        readableResults.push({
          'emotion': "Fear",
          'percent': result[2].toFixed(4) * 100
        });
        readableResults.push({
          'emotion': "Sad",
          'percent': result[4].toFixed(4) * 100
        });
        readableResults.push({
          'emotion': "Surprise",
          'percent': result[5].toFixed(4) * 100
        });

        return {
          result: readableResults,
          label: LABEL_EMOTIONS[label_index],
          percent: label_percent
        };
      } else {
        return {};
      }
    },
    prepImg(img, size) {
      const NORMALIZATION_OFFSET = tf.scalar(127.5);
      const imgTensor = tf.fromPixels(img);
      const normalized = imgTensor
        .toFloat()
        .sub(NORMALIZATION_OFFSET)
        .div(NORMALIZATION_OFFSET);
      if (imgTensor.shape[0] === size && imgTensor.shape[1] === size) {
        return normalized;
      }
      const alignCorners = true;
      return tf.image.resizeBilinear(normalized, [size, size], alignCorners);
    },
    async rgbToGrayscale(imgTensor) {
      const minTensor = imgTensor.min();
      const maxTensor = imgTensor.max();
      const min = (await minTensor.data())[0];
      const max = (await maxTensor.data())[0];
      minTensor.dispose();
      maxTensor.dispose();
      const normalized = imgTensor
        .sub(tf.scalar(min))
        .div(tf.scalar(max - min));
      let grayscale = normalized.mean(2);
      return grayscale.expandDims(2);
    },
    async imgToInputs(img) {
      let norm = await this.prepImg(img, 64);
      norm = await this.rgbToGrayscale(norm);
      return norm.reshape([1, ...norm.shape]);
    }
  }
};
</script>

<style scoped>
#lastimage {
  display: none;
}
#lastrecognizedface {
  display: none;
}
</style>
