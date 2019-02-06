import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const EMOTION_HAPPY = "Happy";
const EMOTION_ANGRY = "Angry";
const EMOTION_FEAR = "Fear";
const EMOTION_SAD = "Sad";
const EMOTION_SURPRISE = "Surprise";
const POSE_POSE1 = "Pose1";
const POSE_POSE2 = "Pose2";
const POSE_POSE3 = "Pose3";
const POSE_POSE4 = "Pose4";
const POSE_POSE5 = "Pose5";

export default new Vuex.Store({
  strict: true,
  state: {
    demoMode: true,
    otherDomainUrl: "other-domain-url-not-defined", // default: other-domain-url-not-defined
    apis: {
      users: {
        url: "users-url-not-defined" // default: users-url-not-defined
      },
      scores: {
        url: "scores-url-not-defined" // default: scores-url-not-defined
      },
      twitter: {
        url: "twitter-url-not-defined" // default: twitter-url-not-defined
      }
    },
    webcam: {
      width: 320,
      height: 240,
      lastImage: "",
      delay: 500
    },
    faceRecognition: {
      lastResult: ""
    },
    emotionRecognition: {
      lastFace: "",
      modelLoaded: false,
      lastResult: "",
      duration: 30,
      delay: 2000,
      skipEmotionAfter: 7000
    },
    posesRecognition: {
      duration: 30,
      modelLoaded: false,
      lastResult: "",
      delay: 2000,
      skipPoseAfter: 7000
    },
    currentPlayer: {
      isAnonymous: true,
      firstName: "",
      lastName: "",
      email: "",
      signedTerms: false
    },
    currentGame: {
      emotions: {
        ongoing: false,
        completed: false,
        startDate: 0,
        endDate: 0,
        lastSuccess: 0,
        currentEmotion: "",
        results: {
          happy: false,
          imageHappy: "",
          angry: false,
          imageAngry: "",
          fear: false,
          imageFear: "",
          sad: false,
          imageSad: "",
          surprise: false,
          imageSurprise: ""
        },
      },
      poses: {
        ongoing: false,
        completed: false,
        startDate: 0,
        endDate: 0,
        lastSuccess: 0,
        currentPose: "",
        results: {
          pose1: false,
          imagePose1: "",
          pose2: false,
          imagePose2: "",
          pose3: false,
          imagePose3: "",
          pose4: false,
          imagePose4: "",
          pose5: false,
          imagePose5: ""
        }
      },
      id: "",
      totalTimeWithPenalties: ""
    }
  },
  mutations: {
    setEmotionRecognitionModelLoaded(state) {
      state.emotionRecognition.modelLoaded = true;
    },
    setPosesRecognitionModelLoaded(state) {
      state.posesRecognition.modelLoaded = true;
    },
    updateLastImage(state, payload) {
      state.webcam.lastImage = payload;
    },
    updateLastFaceRecognitionResult(state, payload) {
      state.faceRecognition.lastResult = payload;
    },
    updateLastPosesRecognitionResult(state, payload) {
      state.posesRecognition.lastResult = payload;
    },
    updateLastEmotionRecognitionResult(state, payload) {
      state.emotionRecognition.lastResult = payload.result;
      state.emotionRecognition.lastFace = payload.face;
    },
    updateCurrentPlayer(state, payload) {
      state.currentPlayer.isAnonymous = false;
      state.currentPlayer.firstName = payload.firstName;
      state.currentPlayer.lastName = payload.lastName;
      state.currentPlayer.email = payload.email;
      state.currentPlayer.signedTerms = true;
    },
    clearCurrentPlayer(state) {
      state.currentPlayer.isAnonymous = true;
      state.currentPlayer.firstName = "";
      state.currentPlayer.lastName = "";
      state.currentPlayer.email = "";
      state.currentPlayer.signedTerms = false;

      state.currentGame.emotions.ongoing = false;
      state.currentGame.emotions.completed = false;
      state.currentGame.emotions.lastSuccess = 0;
      state.currentGame.emotions.startDate = 0;
      state.currentGame.emotions.endDate = 0;
      state.currentGame.emotions.results.happy = false;
      state.currentGame.emotions.results.angry = false;
      state.currentGame.emotions.results.fear = false;
      state.currentGame.emotions.results.sad = false;
      state.currentGame.emotions.results.surprise = false;
      state.currentGame.emotions.results.imageHappy = "";
      state.currentGame.emotions.results.imageAngry = "";
      state.currentGame.emotions.results.imageFear = "";
      state.currentGame.emotions.results.imageSad = "";
      state.currentGame.emotions.results.imageSurprise = "";
      state.currentGame.emotions.currentEmotion = EMOTION_HAPPY;

      state.currentGame.poses.ongoing = false;
      state.currentGame.poses.completed = false;
      state.currentGame.poses.startDate = 0;
      state.currentGame.poses.endDate = 0;
      state.currentGame.poses.lastSuccess = 0;
      state.currentGame.poses.results.pose1 = false;
      state.currentGame.poses.results.pose2 = false;
      state.currentGame.poses.results.pose3 = false;
      state.currentGame.poses.results.pose4 = false;
      state.currentGame.poses.results.pose5 = false;
      state.currentGame.poses.results.imagePose1 = "";
      state.currentGame.poses.results.imagePose2 = "";
      state.currentGame.poses.results.imagePose3 = "";
      state.currentGame.poses.results.imagePose4 = "";
      state.currentGame.poses.results.imagePose5 = "";
      state.currentGame.poses.currentPose = POSE_POSE1;

      state.currentGame.id = "";
      state.currentGame.totalTimeWithPenalties = "";
    },
    startEmotionsGame(state, payload) {
      state.currentGame.id = payload;

      state.currentGame.emotions.completed = false;
      state.currentGame.emotions.lastSuccess = 0;
      state.currentGame.emotions.startDate = 0;
      state.currentGame.emotions.endDate = 0;
      state.currentGame.emotions.results.happy = false;
      state.currentGame.emotions.results.angry = false;
      state.currentGame.emotions.results.fear = false;
      state.currentGame.emotions.results.sad = false;
      state.currentGame.emotions.results.surprise = false;
      state.currentGame.emotions.results.imageHappy = "";
      state.currentGame.emotions.results.imageAngry = "";
      state.currentGame.emotions.results.imageFear = "";
      state.currentGame.emotions.results.imageSad = "";
      state.currentGame.emotions.results.imageSurprise = "";
      state.currentGame.emotions.currentEmotion = EMOTION_HAPPY;

      state.currentGame.emotions.ongoing = true;
      state.currentGame.emotions.startDate = payload;
    },
    successHappy(state, payload) {
      state.currentGame.emotions.results.happy = true;
      state.currentGame.emotions.results.imageHappy = payload;
      state.currentGame.emotions.lastSuccess = new Date().getTime();
      state.currentGame.emotions.currentEmotion = EMOTION_ANGRY;
    },
    successAngry(state, payload) {
      state.currentGame.emotions.results.angry = true;
      state.currentGame.emotions.results.imageAngry = payload;
      state.currentGame.emotions.lastSuccess = new Date().getTime();
      state.currentGame.emotions.currentEmotion = EMOTION_FEAR;
    },
    successFear(state, payload) {
      state.currentGame.emotions.results.fear = true;
      state.currentGame.emotions.results.imageFear = payload;
      state.currentGame.emotions.lastSuccess = new Date().getTime();
      state.currentGame.emotions.currentEmotion = EMOTION_SAD;
    },
    successSad(state, payload) {
      state.currentGame.emotions.results.sad = true;
      state.currentGame.emotions.results.imageSad = payload;
      state.currentGame.emotions.lastSuccess = new Date().getTime();
      state.currentGame.emotions.currentEmotion = EMOTION_SURPRISE;
    },
    successSurprise(state, payload) {
      state.currentGame.emotions.results.surprise = true;
      state.currentGame.emotions.results.imageSurprise = payload;
      state.currentGame.emotions.ongoing = false;
      state.currentGame.emotions.completed = true;
      state.currentGame.emotions.lastSuccess = new Date().getTime();
      state.currentGame.emotions.endDate = new Date().getTime();
      state.currentGame.emotions.currentEmotion = "";
    },
    moveToNextEmotion(state) {
      state.currentGame.emotions.lastSuccess = new Date().getTime();
      switch (state.currentGame.emotions.currentEmotion) {
        case EMOTION_HAPPY:
          state.currentGame.emotions.currentEmotion = EMOTION_ANGRY;
          break;
        case EMOTION_ANGRY:
          state.currentGame.emotions.currentEmotion = EMOTION_FEAR;
          break;
        case EMOTION_FEAR:
          state.currentGame.emotions.currentEmotion = EMOTION_SAD;
          break;
        case EMOTION_SAD:
          state.currentGame.emotions.currentEmotion = EMOTION_SURPRISE;
          break;
      }
    },
    endEmotionsGame(state, payload) {
      state.currentGame.emotions.ongoing = false;
      state.currentGame.emotions.completed = true;
      state.currentGame.emotions.endDate = payload;
    },
    successPose1(state, payload) {
      state.currentGame.poses.results.pose1 = true;
      state.currentGame.poses.results.imagePose1 = payload;
      state.currentGame.poses.lastSuccess = new Date().getTime();
      state.currentGame.poses.currentPose = POSE_POSE2;
    },
    successPose2(state, payload) {
      state.currentGame.poses.results.pose2 = true;
      state.currentGame.poses.results.imagePose2 = payload;
      state.currentGame.poses.lastSuccess = new Date().getTime();
      state.currentGame.poses.currentPose = POSE_POSE3;
    },
    successPose3(state, payload) {
      state.currentGame.poses.results.pose3 = true;
      state.currentGame.poses.results.imagePose3 = payload;
      state.currentGame.poses.lastSuccess = new Date().getTime();
      state.currentGame.poses.currentPose = POSE_POSE4;
    },
    successPose4(state, payload) {
      state.currentGame.poses.results.pose4 = true;
      state.currentGame.poses.results.imagePose4 = payload;
      state.currentGame.poses.lastSuccess = new Date().getTime();
      state.currentGame.poses.currentPose = POSE_POSE5;
    },
    successPose5(state, payload) {
      state.currentGame.poses.results.pose5 = true;
      state.currentGame.poses.results.imagePose5 = payload;
      state.currentGame.poses.lastSuccess = new Date().getTime();
      state.currentGame.poses.currentPose = "";
      state.currentGame.poses.ongoing = false;
      state.currentGame.poses.completed = true;
      state.currentGame.poses.endDate = new Date().getTime();
      state.currentGame.poses.currentPose = "";
    },
    startPosesGame(state, payload) {
      state.currentGame.poses.ongoing = true;
      state.currentGame.poses.completed = false;
      state.currentGame.poses.startDate = payload;
      state.currentGame.poses.endDate = 0;
      state.currentGame.poses.lastSuccess = 0;
      state.currentGame.poses.results.pose1 = false;
      state.currentGame.poses.results.pose2 = false;
      state.currentGame.poses.results.pose3 = false;
      state.currentGame.poses.results.pose4 = false;
      state.currentGame.poses.results.pose5 = false;
      state.currentGame.poses.results.imagePose1 = "";
      state.currentGame.poses.results.imagePose2 = "";
      state.currentGame.poses.results.imagePose3 = "";
      state.currentGame.poses.results.imagePose4 = "";
      state.currentGame.poses.results.imagePose5 = "";
      state.currentGame.poses.currentPose = POSE_POSE1;
    },
    moveToNextPose(state) {
      state.currentGame.poses.lastSuccess = new Date().getTime();
      switch (state.currentGame.poses.currentPose) {
        case POSE_POSE1:
          state.currentGame.poses.currentPose = POSE_POSE2;
          break;
        case POSE_POSE2:
          state.currentGame.poses.currentPose = POSE_POSE3;
          break;
        case POSE_POSE3:
          state.currentGame.poses.currentPose = POSE_POSE4;
          break;
        case POSE_POSE4:
          state.currentGame.poses.currentPose = POSE_POSE5;
          break;
      }
    },
    endPosesGame(state, payload) {
      state.currentGame.poses.ongoing = false;
      state.currentGame.poses.completed = true;
      state.currentGame.poses.endDate = payload;
    },
    setTotalTime(state, payload) {
      state.currentGame.totalTimeWithPenalties = payload;
    }
  },
  actions: {
  },
});
