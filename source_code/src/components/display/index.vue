<template>
  <div ref="display" class="display">
    <div v-if="loading" class="loading">
      <i class="fa fa-spinner fa-spin"></i>
    </div>

    <display-settings
      :ascii="ascii"
      :settings="settings"
      :originalDensity="originalDensity"
      @sync-settings="handleSettingsSync($event)"
      @download-click="handleDownloadClick()"
    ></display-settings>
    <div
      v-show="settings.showingAscii"
      ref="canvas"
      class="canvas"
      :style="canvasStyles"
    ></div>
    <img
      v-if="!settings.showingAscii"
      class="original-image"
      :src="urlOfImageFile"
      alt="image"
    />
  </div>
</template>

<style src="./display.scss" lang="scss" scoped></style>
<script src="./display.ts" lang="ts"></script>
