<template>
  <a-form
    :model="model"
    :layout="layout"
    @submit="onSubmit"
    @reset="onReset"
    @keyup.enter="onAutoSubmit"
  >
    <a-grid :cols="numCol" :col-gap="16" :row-gap="16" :collapsed="isCollapsed">
      <!-- Form Items -->
      <template v-for="(item, index) in allItems" :key="index">
        <a-grid-item>
          <component :is="item" />
        </a-grid-item>
      </template>

      <!-- Button Group as a Suffix Item -->
      <a-grid-item suffix class="button-group-col">
        <a-space>
          <a-button v-if="!hideResetBtn" type="secondary" @click="onReset">
            <template #icon v-if="showButtonIcon">
              <IconRefresh />
            </template>
            {{ resetText || "重置" }}
          </a-button>
          <a-button v-if="!hideSearchBtn" type="primary" @click="onSubmit">
            <template #icon v-if="showButtonIcon">
              <IconSearch />
            </template>
            {{ searchText || "查询" }}
          </a-button>
          <a-button v-if="showToggleBtn" type="text" @click="toggleCollapse">
            <template #icon>
              <IconUp v-if="!isCollapsed" />
              <IconDown v-else />
            </template>
            {{ isCollapsed ? expandText || "展开" : collapseText || "收起" }}
          </a-button>
          <slot name="extra" />
        </a-space>
      </a-grid-item>
    </a-grid>
    <slot v-if="false" />
  </a-form>
</template>

<script setup lang="ts">
import { ref, computed, useSlots, VNode } from "vue";
import {
  IconSearch,
  IconRefresh,
  IconDown,
  IconUp,
} from "@arco-design/web-vue/es/icon";
import { Grid as AGrid, GridItem as AGridItem } from "@arco-design/web-vue";

const props = defineProps({
  model: { type: Object, required: true },
  layout: { type: String, default: "inline" },
  searchText: { type: String, default: "" },
  resetText: { type: String, default: "" },
  expandText: { type: String, default: "" },
  collapseText: { type: String, default: "" },
  hideSearchBtn: { type: Boolean, default: false },
  hideResetBtn: { type: Boolean, default: false },
  showButtonIcon: { type: Boolean, default: false },
  numCol: { type: Number, default: 4 },
});

const emit = defineEmits(["submit", "reset", "auto-submit"]);
const slots = useSlots();

const isCollapsed = ref(true);

const allItems = computed<VNode[]>(() => {
  if (!slots.default) return [];
  return slots
    .default()
    .filter(
      (node) => typeof node.type === "object" && node.type.name !== "Tooltip"
    );
});

const showToggleBtn = computed(() => allItems.value.length >= props.numCol);

const onSubmit = () => emit("submit", { ...props.model });
const onReset = () => emit("reset");
const onAutoSubmit = () => emit("auto-submit", { ...props.model });

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.button-group-col {
  text-align: right;
  white-space: nowrap;
}

:deep(.arco-form-item) {
  margin-bottom: 0;
  width: 100%;
}
</style>
