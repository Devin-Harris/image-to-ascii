<template>
  <div ref="display" class="display">
    <display-settings
      :ascii="ascii"
      :settings="settings"
      :originalDensity="originalDensity"
      @sync-settings="handleSettingsSync($event)"
      @download-click="handleDownloadClick()"
    ></display-settings>
    <div ref="canvas" class="canvas" :style="canvasStyles"></div>
  </div>
</template>

<style src="./display.scss" lang="scss" scoped></style>
<script src="./display.ts" lang="ts"></script>
