<script setup>
import { ref, computed } from "vue";

const emit = defineEmits([
  "click:prevent",
  "click:append",
  "update:modelValue",
  "click:input",
  "value",
]);
const props = defineProps({
  prependIcon: {
    type: String,
    default: null,
  },
  prefix: {
    type: String,
    default: null,
  },
  appendIcon: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: null,
  },
  message: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  success: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    default: null,
  },
  clickablePrevent: {
    type: Boolean,
    default: false,
  },
  clickableAppend: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  background: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: null,
  },
  height: { type: String, default: null },
  innerLabel: {
    type: String,
    default: null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number],
    default: null,
  },
  showMessage: {
    type: Boolean,
    default: false,
  },
});

const classes = computed(() => [
  "input",
  {
    "input--prepend-icon": props.prependIcon,
    "input--append-icon": props.appendIcon,
    "input--success": props.success,
    "input--error": props.error,
    "input--disabled": props.disabled,
    "input--readonly": props.readonly,
    "input--background": props.background,
  },
]);
const update = (newValue) => {
  emit("update:modelValue", newValue);
  emit("value", newValue);
};
</script>

<template>
  <div :class="classes" :style="{ width: props.width ? `${props.width}px` : null }">
    <div v-if="props.label" class="input__label font-weight-bold mb-1">{{ props.label }}</div>
    <div class="input__body">
      <div v-if="props.prependIcon" @click="$emit('click:prevent')" :class="[
        'input__prepend-icon',
        { 'input__prepend-icon--clickable': props.clickablePrevent },
      ]">
        <!-- <s-icon size="20" :icon="props.prependIcon"></s-icon> -->
      </div>
      <div class="input__input">


        <textarea class="input__input__text" :style="{ height: props.height ? `${props.height}px` : null }"
          :type="props.type" :placeholder="props.placeholder" :value="props.modelValue || props.value"
          :disabled="props.disabled" :readonly="props.readonly" @click="$emit('click:input')"
          @input="(event) => update(event.target.value)">
      </textarea>
        <div v-if="props.innerLabel" class="input__inner-label">
          {{ props.innerLabel }}
        </div>
      </div>
      <div @click="$emit('click:append')" :class="[
        'input__append-icon',
        { 'input__append-icon--clickable': props.clickableAppend },
      ]">
        <slot name="append"></slot>
      </div>
    </div>
    <div v-if="props.showMessage" class="input__message">
      {{ props.showMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input {

  // .input__label
  &__label {
    // font-weight: 500;
    // font-size: 12px;
    // line-height: 15px;
    // letter-spacing: 0.135px;
    // color: var(--secondary);
    // padding-bottom: 4px;
  }

  // .input__body
  &__body {
    border-radius: 4px;
    position: relative;
  }

  // .input__prepend-icon
  &__prepend-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--secondary);
  }

  // .input__append-icon
  &__append-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
    color: #575b5f;
  }

  // .input__input
  &__input {
    width: 100%;
    display: flex;
    align-items: center;

    input:focus {
      // border: 1px solid #1132f5;
    }

    &__text,
    button {
      &:focus {
        border: 1px solid #1132f5;

      }

      width: 100%;
      padding: 10px;
      background-color: transparent;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: 0.135px;
      color: var(--secondary);
      text-align: left;
      flex: 1 1;
      // background-color: #f0f1f5;
      border-radius: 4px;
      border: 1px solid #c9cacb;

      &::placeholder,
      .placeholder {
        color: #919396;
      }

      &[type="submit"] {
        cursor: pointer;
      }
    }
  }

  // .input__message
  &__message {
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.4px;
    padding-top: 4px;
    color: red;
    text-align: left;
  }

  &__prepend-icon-clickable,
  &__append-icon-clickable {
    cursor: pointer;
    pointer-events: all;
  }

  &--prepend-icon {
    .input__input {
      input {
        padding-left: 38px;
      }
    }
  }

  &--append-icon {
    .input__input {

      input,
      button {
        padding-right: 38px;
      }
    }
  }

  &--success {
    .input__label {
      color: blue;
    }

    .input__body {
      border-color: blue;
    }

    .input__prepend-icon {
      color: blue;
    }

    .input__append-icon {
      color: blue;
    }

    .input__message {
      color: blue;
    }
  }

  &--error {
    animation: 0.2s invalid forwards;


    .input__input__button,
    .input_number_box,
    .input__input__text {
      border: 1px solid red;

    }

    .input__label {
      color: red;
    }

    .input__body {
      border-color: red;
    }

    .input__prepend-icon {
      color: red;
    }

    .input__append-icon {
      color: red;
    }

    .input__message {
      color: red;
    }
  }

  &__append-icon--clickable {
    pointer-events: all;
    cursor: pointer;
  }

  &__inner-label {
    color: var(--primary);
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.135px;
    padding-right: 10px;
  }

  &--disabled {
    .input__label {
      color: var(--secondary);
    }

    .input__body {
      border-color: var(--secondary-400);
      background-color: var(--secondary-200);
    }

    .input__input {

      input,
      button {
        color: var(--secondary-400);
        cursor: not-allowed;
        pointer-events: all !important;

        &::placeholder {
          color: var(--secondary-400);
        }
      }
    }

    .input__prepend-icon {
      color: var(--secondary-400);
    }

    .input__append-icon {
      color: var(--secondary-400);
    }

    .input__message {
      color: var(--secondary-400);
    }
  }

  &--readonly {
    .input__label {
      color: var(--secondary);
    }

    .input__body {
      border-color: var(--secondary-200);
      background-color: transparent;
    }

    .input__input {

      input,
      button {
        color: var(--secondary);
        font-weight: 500;

        &::placeholder {
          color: var(--secondary-400);
        }
      }
    }

    .input__prepend-icon {
      opacity: 0;
      visibility: hidden;
    }

    .input__append-icon {
      opacity: 0;
      visibility: hidden;
    }

    .input__message {
      color: var(--secondary-400);
    }
  }

  &--background {
    .input__body {
      // background-color: var(--primary-200);
    }
  }
}

@keyframes invalid {
  0% {
    transform: translateX(0px);
  }

  25% {
    transform: translateX(5px);
  }

  50% {
    transform: translateX(0px);
  }

  75% {
    transform: translateX(-5px);
  }

  100% {
    transform: translateX(0px);
  }
}

.input_number_box {
  background: #f0f1f5;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  display: flex;
  padding: 13px;
  gap: 0.2rem;


  input {
    width: 100%;
    background-color: #f0f1f5;
    outline: none;

  }

  .prefix {
    margin-top: 1px;
    font-weight: 500;
  }
}
</style>
