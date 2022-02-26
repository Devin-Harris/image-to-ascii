<template>
  <div class="slider-toggle">
    <div
      class="slider-toggle_button"
      :class="{ 'slider-toggle_button_slide': value }"
      @click="toggleSlider()"
    >
      <div class="slider-toggle_button_circle"></div>
    </div>
  </div>
</template>

<style src="./slider-toggle.scss" lang="scss" scoped></style>
<script src="./slider-toggle.ts" lang="ts"></script>
