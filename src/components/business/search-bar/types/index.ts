import type { ColProps, FormItemProps, InputProps } from 'element-plus';
import type { VNode } from 'vue';
import type { ComponentNameEnum } from '../enum';

export interface ExtraField {
  field: string;
  value?: any;
}
export interface FormDataOptions {
  field?: string; // 当filed 为undefined 时 代表当前项仅仅是用来占位的
  timeField?: ExtraField[];
  extraField?: ExtraField[];
  label?: string;
  value?: any;
  // 其中render函数和componentName 至少需要传递一个 render函数得优先级高于componentName
  render?: (option: FormDataOptions, form?: CommonType.Recordable<string>) => VNode;
  componentName?: ComponentNameEnum;
  colAttrs?: Partial<ColProps>;
  formItemAttrs?: Partial<FormItemProps>;
  attrs?: Partial<InputProps>;
  // attrs?: Partial<
  //   | InputProps
  //   // | SelectProps
  //   | DatePickerProps
  //   // | RemoteDataSelectProps
  //   | AutocompleteProps
  //   | CheckboxProps
  //   | InputNumberProps
  // >;
  options?: Partial<CommonType.Option>[];
  onChange?: (value: any, form: CommonType.Recordable) => void;
  onInput?: (value: any, form: CommonType.Recordable) => void;
  onSelect?: (value: any, form: CommonType.Recordable) => void;
  pageName?: string;
  keepAlive?: boolean;
  keepNotAliveField?: string[];
  visible?: boolean;
}

export type ColSizeKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
