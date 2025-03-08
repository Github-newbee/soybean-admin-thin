import { ref } from 'vue';
import type { FormDataOptions } from '@/components/business/search-bar/types';
import { ComponentNameEnum } from '@/components/business/search-bar/enum';

export const useSearchBar = () => {
  const options = ref<FormDataOptions[]>([
    {
      field: 'username',
      value: '',
      attrs: {
        placeholder: '请输入xxxx'
      },
      // 自定义宽度
      // colAttrs: {
      //   xl: 8,
      //   lg: 8,
      //   md: 8,
      //   sm: 8,
      //   xs: 8
      // },
      componentName: ComponentNameEnum.input
    },
    {
      field: 'username',
      value: '',
      attrs: {
        placeholder: '请输入账号'
      },
      componentName: ComponentNameEnum.input
    },
    {
      field: 'username',
      value: '',
      attrs: {
        placeholder: '请输入账号'
      },
      componentName: ComponentNameEnum.input
    },
    {
      field: '',
      colAttrs: {
        xl: 3,
        lg: 4,
        md: 10,
        sm: 10,
        xs: 10
      },
      value: [],
      attrs: {
        placeholder: '请选择时间'
      },
      componentName: ComponentNameEnum.datePicker
    },
    {
      field: 'username',
      value: '',
      attrs: {
        placeholder: '请输入账号'
      },
      componentName: ComponentNameEnum.input
    },
    {
      field: 'username',
      value: '',
      attrs: {
        placeholder: '请输入账号'
      },
      componentName: ComponentNameEnum.input
    },
    {
      field: 'username',
      value: '',
      attrs: {
        placeholder: '请输入账号'
      },
      componentName: ComponentNameEnum.input
    },
    {
      field: 'username',
      value: '',
      attrs: {
        placeholder: '请输入账号'
      },
      componentName: ComponentNameEnum.input
    },
    {
      field: 'username',
      value: '',
      attrs: {
        placeholder: '请输入账号'
      },
      componentName: ComponentNameEnum.input
    },
    {
      field: 'username',
      value: '',
      attrs: {
        placeholder: '请输入账号'
      },
      componentName: ComponentNameEnum.input
    },
    {
      field: 'username',
      value: '',
      attrs: {
        placeholder: '请输入账号'
      },
      componentName: ComponentNameEnum.input
    }
  ]);

  return {
    options
  };
};
