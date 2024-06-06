<template>
  <div>
    <q-select
        :label="label"
        :options="options"
        v-model="selectedValue"
        @input="handleChange"
        outlined
        dense
    />
  </div>
</template>

<script>
export default {
  name: 'InputSelect',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      selectedValue: this.value
    }
  },
  methods: {
    handleChange() {
      this.$emit('input', this.selectedValue);
    }
  },
  watch: {
    value(newValue) {
      this.selectedValue = newValue;
    }
  }
}
</script>

<style scoped>
/* Adicione estilos conforme necessário */
</style>
