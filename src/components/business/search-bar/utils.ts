import type { ColSizeObject } from 'element-plus';
import { breakpointsElement, useBreakpoints } from '@vueuse/core';
import { add } from '@/utils/decimal';
import { isObject } from '@/utils/is';
import type { ColSizeKeys, FormDataOptions } from './types';
import { ComponentNameEnum } from './enum';

export function getColSpanByComponentName(option: FormDataOptions) {
  if (option.componentName === ComponentNameEnum.datePicker) {
    return {
      xl: 12,
      lg: 18,
      md: 24,
      sm: 24,
      xs: 24
    };
  }
  return {
    xl: 3,
    lg: 4,
    md: 6,
    sm: 8,
    xs: 8
  };
}

export function calcCurrentColSpan(option: FormDataOptions) {
  const colObj = getColSpanByComponentName(option);
  const breakpoints = useBreakpoints(breakpointsElement);
  const colType = breakpoints.active().value as ColSizeKeys;
  // 获取自定义搜索框宽度信息
  const getObject = (key: ColSizeKeys): ColSizeObject => {
    const colAttr = option?.colAttrs?.[key];
    // 如果是对象{xl: 8, lg: 8, md: 8, sm: 8, xs: 8} 直接返回
    if (isObject(colAttr)) {
      return colAttr;
    }
    console.log('🚀 ~ getObject ~ colObj:', colObj, key, colObj[key]);
    // 否则使用span占位(el-col组件)
    return { span: colAttr ?? colObj[key], offset: 0 };
  };
  if (Reflect.has(option, 'visible') && !option?.visible) {
    return 0;
  }
  const item = getObject(colType);
  return add(item.offset, item.span);
}
