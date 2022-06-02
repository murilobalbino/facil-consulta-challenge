<template>
  <div>
    <label :for="id" class="form-label ">{{ label }}</label>
    <div class="input-group" :class="`${size}`">
      <!-- border-danger -->
      <input
          type="text"
          class="form-control test-form"
          :id="id"
          :placeholder="placeholder"
          v-maska="mask"
          :maxlength="maxlength"

          @blur="(mask)
            ? SetTemporaryValues({
              name: id,
              value: $event.target.dataset.maskRawValue
            })
            : SetTemporaryValues({
              name: id,
              value: $event.target.value
            })
"
      />
    </div>
    <label :for="id" class="form-label text-danger mt-1" v-show="false">{{ error }}</label>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

let temporaryValue = ""


export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    mask: {
      type: String,
      required: false
    },
    maxlength: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    error: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: false,
      default: 'w-100',
    },
  },
  methods: {
    ...mapActions("Profissional",["SetTemporaryValues"]),
    pushValues: (action, getter, value, name) => {
      action(getter.push({
        name: name,
        value: value
      }))
    },
  },
  computed: {
    ...mapGetters("Profissional", ["getTemporaryValues"])
  },
  data() {
    return {
      temporaryValue
    }
  }
}
</script>

<style lang="scss">
.select-group,
.input-group {
  width: 45%;

  .form-select,
  .form-control {
    border-color: var(--bs-primary);

    &:focus {
      box-shadow: none;
    }
  }
}

.form-control {
  &.wrong {
    border-color: var(--bs-danger);
  }
}
</style>