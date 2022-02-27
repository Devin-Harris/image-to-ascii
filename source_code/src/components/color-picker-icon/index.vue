<template>
  <div class="color-picker-icon">
    <div class="color-picker-icon_icon" :style="{'background-color': color}" @click="toggleColorPicker()"></div>
    <ColorPicker
      v-if="colorPickerOpen"
      class="color-picker-icon_picker"
      theme="dark"
      :color="color"
      @changeColor="changeColor"
    />
  </div>
</template>

<style src="./color-picker-icon.scss" lang="scss"></style>
<script src="./color-picker-icon.ts" lang="ts"></script>