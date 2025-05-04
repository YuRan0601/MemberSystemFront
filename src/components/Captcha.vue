<template>
    <div class="captcha-container" @click="generateCode" title="點擊刷新驗證碼">
      <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  
  const props = defineProps({
    length: { type: Number, default: 5 },
    width: { type: Number, default: 120 },
    height: { type: Number, default: 40 }
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const canvas = ref(null)
  const code = ref('')
  
  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let newCode = ''
    for (let i = 0; i < props.length; i++) {
      newCode += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    code.value = newCode
    emit('update:modelValue', newCode)
    drawCode()
  }
  
  const drawCode = () => {
    const ctx = canvas.value.getContext('2d')
    ctx.clearRect(0, 0, props.width, props.height)
  
    // 背景
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, props.width, props.height)
  
    // 干擾線
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = getRandomColor()
      ctx.beginPath()
      ctx.moveTo(Math.random() * props.width, Math.random() * props.height)
      ctx.lineTo(Math.random() * props.width, Math.random() * props.height)
      ctx.stroke()
    }
  
    // 驗證碼字元
    ctx.font = '20px Arial'
    ctx.textBaseline = 'middle'
    for (let i = 0; i < code.value.length; i++) {
      ctx.fillStyle = getRandomColor()
      const x = 10 + i * (props.width / props.length - 5)
      const y = props.height / 2
      const angle = (Math.random() - 0.5) * 0.4
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.fillText(code.value[i], 0, 0)
      ctx.restore()
    }
  }
  
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 150)
    const g = Math.floor(Math.random() * 150)
    const b = Math.floor(Math.random() * 150)
    return `rgb(${r}, ${g}, ${b})`
  }
  
  onMounted(() => {
    generateCode()
  })
  </script>
  
  <style scoped>
  .captcha-container {
    cursor: pointer;
    display: inline-block;
    user-select: none;
  }
  </style>
  