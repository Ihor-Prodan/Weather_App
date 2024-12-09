<template>
  <div
    v-if="visible"
    class="modal-overlay"
    @click="handleOverlayClick"
  >
    <div
      class="modal-content"
      @click.stop
    >
      <header class="modal-header">
        <h3>{{ title }}</h3>
        <button
          class="close-button"
          @click="close"
        >
          &times;
        </button>
      </header>
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
      <footer class="modal-footer">
        <button
          class="confirm-button"
          @click="close"
        >
          OK
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits } from 'vue';

  defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Notification',
    },
    message: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits(['close']);

  function close() {
    emit('close');
  }

  function handleOverlayClick() {
    close();
  }
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 400px;
    max-width: 90%;
    animation: fadeIn 0.3s ease;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .modal-header h3 {
    margin: 0;
  }

  .close-button {
    background: transparent;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
  }

  .modal-body {
    margin-bottom: 20px;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
  }

  .confirm-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .confirm-button:hover {
    background-color: #0056b3;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
