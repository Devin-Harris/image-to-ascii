<template>
  <div class="file-input">
    <input
      ref="input"
      type="file"
      name="file-input"
      class="file-input_input"
      :multiple="multiple"
      :accept="fileTypes"
      @change="inputChange($event)"
    />

    <button
      ref="button"
      class="file-input_button"
      @click="clickInput()"
      @dragenter.prevent="dragEnter()"
      @dragleave.prevent="dragLeave()"
      @dragover.prevent
      @drop.prevent="dropInput($event)"
    >
      <p>{{ fileInputLabel }}</p>
      <i :class="fileInputIconClass"></i>
    </button>
  </div>
</template>

<style src="./fileInput.scss" lang="scss" scoped></style>
<script src="./fileInput.ts" lang="ts"></script>
