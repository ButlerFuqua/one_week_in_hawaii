<template>
  <section>
    <div class="wave wave1"></div>
    <div class="wave wave2"></div>
    <div class="wave wave3"></div>
    <div class="wave wave4"></div>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: relative;
  width: 100%;
  height: 100%;
  background: none;
  overflow: hidden;

  & .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: url("~assets/images/wave.png");
    background-size: 600px 100px;
  }
  & .wave.wave1 {
    animation: animate 30s linear infinite;
    z-index: 600;
    opacity: 1;
    animation-delay: 0s;
    bottom: 0;
  }
  & .wave.wave2 {
    animation: animate2 15s linear infinite;
    z-index: 999;
    opacity: 0.5;
    animation-delay: -5s;
    bottom: 10px;
  }
  & .wave.wave3 {
    animation: animate 30s linear infinite;
    z-index: 998;
    opacity: 0.2;
    animation-delay: -2s;
    bottom: 15px;
  }
  & .wave.wave2 {
    animation: animate2 15s linear infinite;
    z-index: 997;
    opacity: 0.7;
    animation-delay: -5s;
    bottom: 20px;
  }
}
@keyframes animate {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 600px;
  }
}
@keyframes animate2 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -600px;
  }
}
</style>