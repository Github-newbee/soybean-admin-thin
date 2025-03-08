<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { fetchPutChangePassword } from '@/service/api';
import { useForm, useFormRules } from '@/hooks/common/form';

const { userInfo, resetStore } = useAuthStore();
const { formRef, validate } = useForm();
const { formRules } = useFormRules();

const rules = ref({
  password: formRules.pwd
});

const model = reactive({
  username: userInfo.username,
  password: ''
});

const onPutChangePassword = async () => {
  await validate();
  const { error } = await fetchPutChangePassword({ password: model.password });
  if (!error) {
    window.$message?.success('修改成功,即将退出登录');
    setTimeout(() => {
      resetStore();
    }, 1000);
  }
};
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <ElCard class="sm:flex-1-hidden card-wrapper" body-class="ht50">
      <template #header>
        <div class="flex items-center justify-between">
          <p>用户信息</p>
        </div>
      </template>
      <div class="mx-auto mt-100px max-w-400px">
        <ElForm
          ref="formRef"
          class="text-center"
          :model="model"
          :rules="rules"
          label-position="right"
          :label-width="80"
        >
          <ElFormItem :label="$t('page.manage.user.username')" prop="username">
            <ElInput v-model="model.username" :placeholder="$t('page.manage.user.form.username')" disabled />
          </ElFormItem>
          <ElFormItem label="密码" prop="password">
            <ElInput v-model="model.password" clearable />
          </ElFormItem>
          <ElButton class="w-full" type="primary" @click="onPutChangePassword">修改</ElButton>
        </ElForm>
      </div>
    </ElCard>
  </div>
</template>

<style scoped></style>
