<template>
  <div class="size-control">
    <div class="sizes">
      <div class="size width">
        <p>W</p>
        <input
          min="1"
          type="number"
          :value="width"
          @change="handleWidthChange($event)"
        />
      </div>
      <div class="size height">
        <p>H</p>
        <input
          min="1"
          type="number"
          :value="height"
          @change="handleHeightChange($event)"
        />
      </div>
    </div>
    <div class="lock-container">
      <div class="lines top-lines">
        <div class="horizontal-line"></div>
        <div class="vertical-line"></div>
      </div>
      <i
        class="fa"
        :class="{ 'fa-lock': lockAspectRatio, 'fa-unlock': !lockAspectRatio }"
        @click="toggleLockAspectRatio()"
      ></i>
      <div class="lines bottom-lines">
        <div class="vertical-line"></div>
        <div class="horizontal-line"></div>
      </div>
    </div>
  </div>
</template>

<style src="./size-control.scss" lang="scss" scoped></style>
<script src="./size-control.ts" lang="ts"></script>