<template>
  <div ref="display" class="display">
    <div class="settings"></div>

    <div ref="canvas" class="canvas" :style="canvasStyles"></div>
  </div>
</template>

<style src="./display.scss" lang="scss" scoped></style>
<script src="./display.ts" lang="ts"></script>
