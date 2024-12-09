<template>
  <div>
    <canvas
      id="temperatureChart"
      width="400"
      height="200"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, type PropType } from 'vue';
  import Chart from 'chart.js/auto';
  import { useTranslateStore } from '@/stores/translate';

  const props = defineProps({
    temperatures: {
      type: Array as PropType<number[]>,
      required: true,
    },
    labels: {
      type: Array as PropType<string[]>,
      required: true,
    },
  });

  const temperatureChart = ref<Chart | null>(null);
  const translate = useTranslateStore();

  function renderTemperatureChart(data: number[], labels: string[]) {
    const roundedData = data.map((temp) => Math.round(temp * 2) / 2);
    const ctx = document.getElementById(
      'temperatureChart'
    ) as HTMLCanvasElement;

    if (temperatureChart.value) {
      temperatureChart.value.destroy();
    }

    temperatureChart.value = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: translate.getTranslation('temperatureWithUnit') as string,
            data: roundedData,
            borderColor: 'rgba(7, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.formattedValue} °C`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: translate.getTranslation('time') as string,
            },
          },
          y: {
            title: {
              display: true,
              text: translate.getTranslation('temperatureWithUnit') as string,
            },
            beginAtZero: true,
          },
        },
      },
    });
  }

  watch(
    [() => props.temperatures, () => props.labels],
    ([newTemperatures, newLabels]) => {
      renderTemperatureChart(newTemperatures, newLabels);
    }
  );

  onMounted(() => {
    renderTemperatureChart(props.temperatures, props.labels);
  });
</script>

<style scoped>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }

  canvas {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    div {
      padding: 10px;
    }

    canvas {
      max-width: 90%;
      border-radius: 6px;
    }
  }
</style>
