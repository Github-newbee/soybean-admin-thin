<script lang="ts" setup>
import { type PropType, computed, onMounted, onUnmounted, ref } from 'vue';
import type { FormInstance, FormProps } from 'element-plus';
import { useEventListener } from '@vueuse/core';
import type { ExtraField, FormDataOptions } from './types';
import { ComponentNameEnum } from './enum';
import { calcCurrentColSpan, getColSpanByComponentName } from './utils';

interface Props {
  options: FormDataOptions[];
  formAttrs?: PropType<Partial<FormProps>>;
  isExpandButtonEnable?: boolean; // 是否展开按钮可用
  // isInitExpand: boolean; // 是否默认展开
  pageName: string; // 页面名称
  keepAlive?: boolean; // 是否缓存
  // keepNotAliveFiled?: string[]; // 不缓存的字段
}

interface Emits {
  (e: 'search'): void;
  (e: 'reset'): void;
}

const props = withDefaults(defineProps<Props>(), {
  isExpandButtonEnable: true,
  isInitExpand: false,
  keepAlive: false,
  keepNotAliveFiled: () => [],
  formAttrs: () => ({})
});
const emit = defineEmits<Emits>();
const form = ref<CommonType.Recordable>({});
const formRef = ref<FormInstance>();
// const realPageName = toRef(props, 'pageName');

// 搜索
const onSearch = (type?: string) => {
  console.log(form.value, 'form.value');
  if (props.pageName && props.keepAlive && type !== 'reset') {
    // setAliveField();
  }
  // emit('search', form.value);
};

// 重置
const onReset = () => {
  // clearItemToForm();
  props.options.forEach(item => {
    if (item.field) {
      form.value[item.field!] = item.value || undefined;
    }
    if (item.extraField && item.extraField.length) {
      item.extraField.forEach((it: ExtraField) => {
        form.value[it.field!] = it.value || undefined;
      });
    }
    if (item.timeField && item.timeField.length) {
      item.timeField.forEach((it: ExtraField) => {
        form.value[it.field!] = it.value || undefined;
      });
    }
  });
  emit('reset');
  formRef.value?.resetFields?.();
  onSearch('reset');
};

// 计算一行放下的表单项数量
const calcOneLineFormNum = () => {
  let colNum = 0;
  // 表单个数
  const length = props.options?.length;
  for (let i = 0; i < length; i += 1) {
    const item = props.options[i];
    colNum += calcCurrentColSpan(item);
    // 之所以是判断大于18，是因为一行是24，搜索的操作按钮需要占位6
    if (colNum > 18) {
      // 当col的值大于20时，返回当前索引
      return i;
    }
  }
  // 否则直接返回表单的长度
  return length;
};

// 显示的个数
const oneLineFormShowNum = ref(0);
// 记录展开收起的状态 true 代表展开
const isExpand = ref(true);

const isShowExpandButton = computed(() => {
  return props.isExpandButtonEnable && oneLineFormShowNum.value < props.options?.length;
});

// 计算一行能够放多少个表单项
const initOneLineButtonShowNum = () => {
  oneLineFormShowNum.value = calcOneLineFormNum();
};

const onShowItem = () => {
  isExpand.value = !isExpand.value;
};

// 判断当前表单项是否应该显示
const shouldShowItem = (item: FormDataOptions, index: number) => {
  // item可见
  const isFieldVisible = item.visible !== false;
  // 是否在可见范围内
  const isWithinVisibleRange = oneLineFormShowNum.value > index;
  // 字段是否定义
  // const isFieldDefined = Boolean(item.field);
  const isExpanded = isExpand.value;

  const shouldShowWhenExpanded = isExpanded && isFieldVisible;
  const shouldShowWhenCollapsed = !isExpanded && isWithinVisibleRange && isFieldVisible;

  return shouldShowWhenExpanded || shouldShowWhenCollapsed;
};

// 调整视口宽度时，重新计算一行能够放多少个表单项
const cleanup = useEventListener(window, 'resize', () => {
  initOneLineButtonShowNum();
});

onMounted(() => {
  initOneLineButtonShowNum();
});

onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <ElForm v-bind="formAttrs" ref="formRef" class="w-full" :model="form" @keyup.enter="onSearch">
    <ElRow class="card-wrapper bg-#fff pt-3" :gutter="10">
      <ElCol
        v-for="(item, index) in options"
        v-show="shouldShowItem(item, index)"
        :key="item.field"
        v-bind="{ ...getColSpanByComponentName(item), ...(item.colAttrs || {}) }"
      >
        <ElFormItem :class="item.label ? 'has-label' : ''" v-bind="item.formItemAttrs" :prop="item.field">
          <template #label>
            <ElTooltip effect="dark" :content="item.label" placement="top-start">
              <div class="form-label truncate">{{ item.label }}</div>
            </ElTooltip>
          </template>
          <component
            :is="item.render(item, form)"
            v-if="!!item.render"
            v-bind="item.attrs"
            v-model="form[item.field!]"
            @change="item?.onChange ? item?.onChange(form[item.field!], form) : null"
          ></component>
          <ElInput
            v-else-if="ComponentNameEnum.input === item?.componentName"
            v-model="form[item.field!]"
            placeholder="请输入"
            clearable
            class="w-full"
            v-bind="item.attrs"
          ></ElInput>
          <ElDatePicker
            v-else-if="ComponentNameEnum.datePicker === item?.componentName"
            v-model="form[item.field!]"
            placeholder="选择时间"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            clearable
          ></ElDatePicker>
        </ElFormItem>
      </ElCol>
      <ElCol class="flex-1">
        <div class="flex flex-wrap items-center justify-end">
          <div class="mb-2 mr-2">
            <ElButton type="primary" @click="onSearch()">
              <template #icon>
                <IconIcRoundSearch class="text-icon" />
              </template>
              查询
            </ElButton>
          </div>
          <div class="mb-2 mr-2">
            <ElButton @click="onReset()">
              <template #icon>
                <IconIcRoundRefresh class="text-icon" />
              </template>
              重置
            </ElButton>
          </div>
          <!-- 动态按钮 -->
          <template v-if="$slots.footerButton">
            <slot name="footerButton" />
          </template>
          <div class="mb-2 mr-2">
            <ElButton v-if="isShowExpandButton" type="primary" @click="onShowItem">
              <template #icon>
                <icon-ep:arrow-down v-if="isExpand" class="text-icon" />
                <icon-ep:arrow-up v-else class="text-icon" />
              </template>
              {{ isExpand ? '收起' : '展开' }}
            </ElButton>
          </div>
        </div>
      </ElCol>
    </ElRow>
  </ElForm>
</template>

<style lang="scss" scoped></style>
