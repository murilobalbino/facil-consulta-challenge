<template>
  <div class="select-group">
    <label :for="id" class="form-label">{{ label }}</label>
    <select class="form-select test-form " v-model="selectedRef" @change="$emit('handleEvent', id, $event.target.value)" :id="id" >
      <option selected>Selecione</option>
      <option :value="object.id" v-for="object in data" :key="object">
        {{ object.nome }}
      </option>
    </select>
    <label :for="id" class="form-label text-danger mt-1" v-show="false" >{{error}}</label>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from "vuex";

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions("Profissional", ["SetTemporaryValues"]),
  },
  watch: {
    selectedRef(newValue) {
      this.SetTemporaryValues({
        name: this.$props.id,
        value: newValue,
      });
      if (this.$props.id === "state-input") {
        this.$emit("push");
      }
    },
  },
  data() {
    return {
      selectedRef: "Selecione",
      states: [],
      citys: [],
    };
  },
}) 
</script>

<style lang="scss"></style>
